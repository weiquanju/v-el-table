import { h, isRef, unref, nextTick, type SetupContext } from 'vue'
import { ElPagination, type TabPaneName, type TabsProps } from 'element-plus'

import type { VElGenericTableTabs, VElTableTabsProps } from './type'
import { VElTabs } from './tabs'

import { resetValue, toCamelCaseProp, unRefRecord } from '../utils'

import Table from '../table'
import { LayoutDefault } from '../table-plus/default-layout'
import {
  checkResponse,
  checkTableData,
  getPagination,
  getTableHeaderSlots
} from '../table-plus/utils'

const TableTabs = <TableDataItem = unknown, FormData extends object = object>(
  p: VElTableTabsProps<TableDataItem, FormData>,
  setupContext: SetupContext
) => {
  const props = toCamelCaseProp(
    p as unknown as Parameters<typeof toCamelCaseProp>[0]
  ) as unknown as VElTableTabsProps<TableDataItem, FormData>

  const reset = () => {
    if (props.formProps?.form?.model) resetValue(props.formProps.form.model)
  }

  const query = async () => {
    const data = tabPages.find(({ name }) => name === unref(props.tabsCurrent))
    if (data) return data.query()
    return Promise.resolve()
  }
  const exposed = { query: query, reset }

  if (typeof props.getExpose === 'function') {
    props.getExpose(exposed)
  }

  const tabPages = props.tabs.map((item) => {
    async function query() {
      const { queryParams = {} } =
        props.tabs.find(({ name }) => name === unref(props.tabsCurrent)) || {}
      const { form } = unref(props.formProps) || {}

      const data = await props.query({
        pageSize: pagination.pageSize,
        currentPage: pagination.currentPage,
        ...(form?.model || {}),
        ...unRefRecord(queryParams),
        [unref(props.tabsQueryKey)]: unref(props.tabsCurrent)
      })

      const { res, total, currentPage } = checkResponse(data, props.responsePath)

      const tab = props.tabs.find(({ name }) => name === unref(props.tabsCurrent))

      if (tab) {
        checkTableData(tab)

        const { data: tableData } = tab.table || {}
        if (isRef(tableData)) {
          tableData.value = res as TableDataItem[]
        } else if (tab.table?.data) {
          tab.table.data = res as TableDataItem[]
        }
      }

      pagination.total = total
      pagination.currentPage = currentPage
    }

    const pagination = getPagination(query, item.pagination)

    return { name: item.name, query, pagination }
  })

  const table = () => {
    const data = props.tabs.find(({ name }) => name === unref(props.tabsCurrent))

    const ret = [
      h(
        VElTabs as Parameters<typeof h>[0],
        {
          list: props.tabs,
          modelValue: unref(props.tabsCurrent),
          'onUpdate:modelValue': (val: TabPaneName) => {
            if (isRef(props.tabsCurrent)) {
              props.tabsCurrent.value = val
            } else {
              props.tabsCurrent = val
            }
          },
          onTabChange: () => query()
        } as Partial<TabsProps>
      ),
      data
        ? h(Table, {
            columns: data.columns,
            events: data.events,
            table: unRefRecord(data.table)
          } as any)
        : null
    ]
    return ret
  }
  const pagination = () => {
    const data = tabPages.find(({ name }) => name === unref(props.tabsCurrent))
    return data && h(ElPagination, data.pagination as Parameters<typeof h>[1])
  }

  nextTick(() => {
    if (unref(props.initQuery) === true) {
      query()
    }
  })

  return h('div', [
    h(props.layout || LayoutDefault, props.layoutProps as Parameters<typeof h>[1], {
      ...setupContext.slots,
      ...{
        ...getTableHeaderSlots(
          query,
          reset,
          props.formProps,
          props.title,
          props.buttons,
          props.hideDefaultButton
        ),
        table,
        pagination
      }
    })
  ])
}

const VElTableTabs = TableTabs as VElGenericTableTabs

export default VElTableTabs
