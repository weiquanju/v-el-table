import { DefineComponent, FunctionalComponent } from 'vue'
import { FormProps } from '../form/interfaces'
import { TableBasicProps } from '../table/index.d'

export interface PaginationProps {
  currentPage: number
  pageSizes: number[]
  pageSize: number
  layout: string
  total: number
}

export interface DataPath {
  data: string
  currentPage: string
  total: string
}

export type QueryFnType<T = any> = (formAndPage: any & { currentPage: number; pageSize: number }) => Promise<T>

export interface TablePlusProps {
  title?: string
  layout?: DefineComponent | FunctionalComponent | /**组件调用处提示语法错误,因此使用any兼容😂 */ any
  layoutProps?: any
  pagination?: PaginationProps
  formProps: FormProps
  tableProps: TableBasicProps
  query: QueryFnType
  responsePath?: string
  queryParams?: any
  buttons?: {
    query?: string
    reset?: string
    config?: string
    add?: string
    edit?: string
    delete?: string
  }
}

type TablePlus = DefineComponent<TablePlusProps>

export default TablePlus
