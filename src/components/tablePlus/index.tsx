import { h, reactive, SetupContext } from 'vue'
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
  const propsCamelCase = toCamelCaseProp(props) as TablePlusProps

  const pagination = reactive(Object.assign(paginationDefault, props.pagination))

  const getQueryParams = () => ({
    pageSize: pagination.pageSize,
    currentPage: pagination.currentPage,
    ...propsCamelCase.formProps.form.model,
    ...(propsCamelCase.extraQueryParams || {}),
  })

  const query = async () => {
    // 文件路径配置
    const path = Object.assign({}, dataPath, propsCamelCase.responsePath)

    const data = await props.query(getQueryParams())
    const res = (props.responsePath && at(path.data, data)) || data
    res && (props.tableProps.table.data = res)
    const total = at(path.total, data) || 0
    const currentPage = at(path.currentPage, data) || 1
    pagination.total = total
    pagination.currentPage = currentPage
  }

  const paginationEvents = {
    sizeChange: query,
    currentChange: query,
  }

  const slots = {
    title: () => props.title,
    btn: () => <ElButtonGroup>{getDefaultButtons({ props: propsCamelCase, query })}</ElButtonGroup>, //查询 重置 查询配置 表格配置 表格导出 收起/展开 新增 编辑 删除
    filter: () => <Form {...propsCamelCase.formProps} />,
    table: () => <Table {...propsCamelCase.tableProps} />,
    pagination: () => (
      <ElPagination
        v-model:currentPage={pagination.currentPage}
        v-model:pageSize={pagination.pageSize}
        pageSizes={pagination.pageSizes}
        layout={pagination.layout}
        total={pagination.total}
        {...eventsTransform(paginationEvents)}
      />
    ),
  }

  return h(props.layout || LayoutDefault, null, slots)
}
