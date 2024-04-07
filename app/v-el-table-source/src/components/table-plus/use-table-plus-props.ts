import { h, isRef, unref, nextTick, type SetupContext } from 'vue'
import type { VElTablePlusProps } from './type'
import { resetValue, toCamelCaseProp, unRefRecord } from '../utils'
import { ElPagination, type TableProps } from 'element-plus'
import Table from '../table'
import type { LayoutSlots } from './default-layout'
import { checkResponse, checkTableData, getPagination, getTableHeaderSlots } from './utils'

export const useTablePlusProps = <TableDataItem = unknown, FormData extends object = object>(
  p: VElTablePlusProps<TableDataItem, FormData>,
  setupContext: SetupContext
) => {
  const props = toCamelCaseProp(
    p as unknown as Parameters<typeof toCamelCaseProp>[0]
  ) as unknown as VElTablePlusProps<TableDataItem, FormData>

  const query = async () => {
    const data = await props.query({
      pageSize: pagination.pageSize,
      currentPage: pagination.currentPage,
      ...(unref(props.formProps)?.form?.model || {}),
      ...(props.queryParams || {})
    } as Parameters<typeof props.query>[0])

    const { res, total, currentPage } = checkResponse(data, props.responsePath)

    checkTableData(props.tableProps)

    const { data: tableData = {} } = props.tableProps.table as Omit<
      TableProps<TableDataItem>,
      'context'
    >
    if (isRef(tableData)) {
      tableData.value = res as TableDataItem[]
    } else if (props.tableProps.table) {
      props.tableProps.table.data = res as TableDataItem[]
    }

    pagination.total = total
    pagination.currentPage = currentPage
  }

  const reset = () => {
    if (props.formProps?.form?.model) resetValue(props.formProps.form.model)
  }

  const pagination = getPagination(query, props.pagination)

  const slots: LayoutSlots = {
    ...getTableHeaderSlots(
      query,
      reset,
      props.formProps,
      props.title,
      props.buttons,
      props.hideDefaultButton
    ),
    table: () => h(Table, unRefRecord(props.tableProps) as any),
    pagination: () => h(ElPagination, pagination as Parameters<typeof h>[1])
  } as unknown as LayoutSlots

  const exposed = { query, reset }

  if (typeof props.getExpose === 'function') {
    props.getExpose(exposed)
  }

  nextTick(() => {
    if (unref(props.initQuery) === true) {
      query()
    }
  })

  return { props, slots }
}
