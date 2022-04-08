import { DefineComponent, h, reactive, SetupContext } from 'vue'
import { ElPagination, ElButtonGroup } from 'element-plus'
import Form from '../form'
import Table from '../table'
import { TablePlusProps } from './index.d'
import { at, eventsTransform, toCamelCaseProp } from '../utils'
import { dataPath, paginationDefault } from './config'
import { LayoutDefault } from './defaultLayout'
import { getDefaultButtons } from './defaultButton'

/**
 * @todo feat:
 * 支持单元格编辑
 * 支持CURD
 * 组件插槽支持
 */
export default function VElTablePlus(props: TablePlusProps, ctx: SetupContext) {
  // const props = toCamelCaseProp(props) as TablePlusProps

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
    const res = (props.responsePath && at(path.data, data)) || data
    res && (props.tableProps.table.data = res)
    const total = at(path.total, data) || 0
    const currentPage = at(path.currentPage, data) || 1
    pagination.total = total
    pagination.currentPage = currentPage
  }

  const pagination = reactive(
    Object.assign(paginationDefault, props.pagination, {
      onSizeChange: query,
      onCurrentChange: query,
    }),
  )

  const slots = {
    title: () => props.title,
    btn: () => h(ElButtonGroup, null, getDefaultButtons({ props: props, query })), //查询 重置 查询配置 表格配置 表格导出 收起/展开 新增 编辑 删除
    filter: () => h(Form, props.formProps),
    table: () => h(Table, props.tableProps),
    pagination: () => h(ElPagination, pagination),
  }

  return h(props.layout || LayoutDefault, null, slots)
}
