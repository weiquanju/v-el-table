import { h, SetupContext } from 'vue'
import { ElPagination, ElButtonGroup } from 'element-plus'
import Form from '../form'
import Table from '../table'
import { TablePlusProps } from './tablePlusType'
import { at, toCamelCaseProp } from '../utils'
import { paginationDefault } from './config'
import { LayoutDefault } from './defaultLayout'
import { getDefaultButtons } from './defaultButton'

/**
 * @todo feat:
 * 支持单元格编辑
 * 支持CURD
 * 组件插槽支持
 */
export default (props: TablePlusProps, ctx: SetupContext) => {
  const propsCamelCase = toCamelCaseProp(props) as TablePlusProps

  const pagination = Object.assign(paginationDefault, props.pagination)

  const queryParams = {
    pageSize: pagination.pageSize,
    currentPage: pagination.currentPage,
    ...propsCamelCase.formProps.form.model,
    ...(propsCamelCase.extraQueryParams || {}),
  }

  const query = async () => {
    const data = await props.query(queryParams)
    const res = (props.responsePath && at(props.responsePath, data, (msg: string) => console.error(msg))) || data
    res && (props.tableProps.table.data = res)
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
      />
    ),
  }

  return h(props.layout || LayoutDefault, null, slots)
}
