import { h, reactive } from 'vue'
import { ElPagination, ElButtonGroup } from 'element-plus'
import Form from '../form'
import Table from '../table'
import type { VElGenericTablePlus, VElTablePlusProps } from './type'
import { at, resetValue, toCamelCaseProp } from '../utils'
import { dataPath, paginationDefault } from './config'
import { LayoutDefault } from './default-layout'
import { getDefaultButtons } from './default-button'


/**
 * @todo feat:
 * 支持单元格编辑
 * 支持CURD
 * 组件插槽支持
 */
const TablePlus = <TableDataItem = unknown, FormData extends object = object>(
  p: VElTablePlusProps<TableDataItem, FormData>
) => {
  // console.log(Object.keys(props))
  const props = toCamelCaseProp(
    p as unknown as Parameters<typeof toCamelCaseProp>[0]
  ) as unknown as VElTablePlusProps<TableDataItem, FormData>

  const getQueryParams = () =>
    ({
      pageSize: pagination.pageSize,
      currentPage: pagination.currentPage,
      ...(props.formProps?.form?.model || {}),
      ...(props.queryParams || {})
    }) as Parameters<typeof props.query>[0]

  const query = async () => {
    // 文件路径配置
    const path = Object.assign({}, dataPath, props.responsePath)

    const data = await props.query(getQueryParams())
    const res = at<unknown[]>(path.data, data) || []
    const total = at<number>(path.total, data) || 0
    const currentPage = at<number>(path.currentPage, data) || 1

    if (total === undefined || total === null || isNaN(total)) {
      console.warn(`merged path data`, JSON.stringify(path))
      throw new Error(
        'Get `total` param error when query data.Please check VElTablePlus configuration parameter `responsePath`.'
      )
    }
    if (currentPage === undefined || currentPage === null || isNaN(currentPage)) {
      console.warn(`merged path data`, JSON.stringify(path))
      throw new Error(
        'Get `currentPage` param error when query data.Please check VElTablePlus configuration parameter `responsePath`.'
      )
    }
    if (res === undefined || res === null) {
      console.warn(`merged path data`, JSON.stringify(path))
      throw new Error(
        'Get `data` param error when query data.Please check VElTablePlus configuration parameter `responsePath`.'
      )
    }

    props.tableProps.table.data = res as TableDataItem[]
    pagination.total = total
    pagination.currentPage = currentPage
  }

  const reset = () => {
    if (props.formProps?.form?.model) resetValue(props.formProps.form.model)
  }

  const exposed = { query, reset }

  if (typeof props.getExpose === 'function') {
    props.getExpose(exposed)
  }

  const pagination = reactive(
    Object.assign(paginationDefault, props.pagination, {
      onSizeChange(size: number) {
        if (pagination.pageSize !== size) {
          pagination.pageSize = size
          query()
        }
      },
      'onUpdate:page-size'(size: number) {
        if (pagination.pageSize !== size) {
          pagination.pageSize = size
          query()
        }
      },
      onCurrentChange(page: number) {
        if (pagination.currentPage !== page) {
          pagination.currentPage = page
          query()
        }
      },
      'onUpdate:current-page'(page: number) {
        if (pagination.currentPage !== page) {
          pagination.currentPage = page
          query()
        }
      }
    })
  )

  const slots = {
    title: () => props.title,
    btn: () =>
      h(ElButtonGroup, null, {
        default: () => getDefaultButtons({ hideDefaultButton: props.hideDefaultButton, buttons: props.buttons, query, reset })
      }), //查询 重置 查询配置 表格配置 表格导出 收起/展开 新增 编辑 删除
    filter: () => (!props.formProps ? null : h(Form, props.formProps as any)),
    table: () => h(Table, props.tableProps as any),
    pagination: () => h(ElPagination, pagination)
  }

  if (props.initQuery === true) {
    query()
  }

  return h(props.layout || LayoutDefault, props.layoutProps as Parameters<typeof h>[1], slots)
}

const VElTablePlus = TablePlus as VElGenericTablePlus

export default VElTablePlus
