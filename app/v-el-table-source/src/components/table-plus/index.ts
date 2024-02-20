import { h, reactive, type FunctionalComponent } from 'vue'
import { ElPagination, ElButtonGroup } from 'element-plus'
import Form from '../form'
import Table from '../table'
import type { TablePlusProps } from './type'
import { at, toCamelCaseProp } from '../utils'
import { dataPath, paginationDefault } from './config'
import { LayoutDefault } from './default-layout'
import { getDefaultButtons } from './default-button'
export type * from './type'
export * from './config'
export * from './default-button'
export * from './default-layout'

/**
 * @todo feat:
 * 支持单元格编辑
 * 支持CURD
 * 组件插槽支持
 */
const VElTablePlus: FunctionalComponent<TablePlusProps> = function (p: TablePlusProps) {
  // console.log(Object.keys(props))
  const props = toCamelCaseProp(p as unknown as Parameters<typeof toCamelCaseProp>[0]) as unknown as TablePlusProps

  const getQueryParams = () => ({
    pageSize: pagination.pageSize,
    currentPage: pagination.currentPage,
    ...props.formProps.form.model,
    ...(props.queryParams || {}),
  })

  const query = async () => {
    // 文件路径配置
    const path = Object.assign({}, dataPath, props.responsePath)

    const data = await props.query(getQueryParams())
    const res = at<unknown[]>(path.data, data) || []
    const total = at<number>(path.total, data) || 0
    const currentPage = at<number>(path.currentPage, data) || 1

    if (total === undefined || isNaN(total)) {
      console.warn(`merged path data`, JSON.stringify(path))
      throw new Error('Get `total` param error when query data.Please check VElTablePlus configuration parameter `responsePath`.')
    }
    if (currentPage === undefined || isNaN(currentPage)) {
      console.warn(`merged path data`, JSON.stringify(path))
      throw new Error('Get `currentPage` param error when query data.Please check VElTablePlus configuration parameter `responsePath`.')
    }
    if (res === undefined) {
      console.warn(`merged path data`, JSON.stringify(path))
      throw new Error('Get `data` param error when query data.Please check VElTablePlus configuration parameter `responsePath`.')
    }

    props.tableProps.table.data = res
    pagination.total = total
    pagination.currentPage = currentPage
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
      },
    }),
  )

  const slots = {
    title: () => props.title,
    btn: () => h(ElButtonGroup, null, { default: () => getDefaultButtons({ props, query }) }), //查询 重置 查询配置 表格配置 表格导出 收起/展开 新增 编辑 删除
    filter: () => h(Form, props.formProps),
    table: () => h(Table, props.tableProps),
    pagination: () => h(ElPagination, pagination),
  }

  if (props.initQuery === true) {
    query()
  }

  return h(props.layout || LayoutDefault, props.layoutProps, slots)
}
export default VElTablePlus
