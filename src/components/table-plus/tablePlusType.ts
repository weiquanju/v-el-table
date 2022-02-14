import { DefineComponent, FunctionalComponent } from 'vue'
import { FormProps } from '../form/interfaces'
import { TableBasicProps } from '../table/TableType'

export interface PaginationProps {
  currentPage: number
  pageSizes: number[]
  pageSize: number
  layout: string
  total: number
}

export type QueryFnType<T = any> = (formAndPage: any & { currentPage: number; pageSize: number }) => Promise<T>

export interface TablePlusProps {
  title?: string
  layout?: DefineComponent | FunctionalComponent | /**组件调用处提示语法错误,因此使用any兼容😂 */ any
  pagination?: PaginationProps
  formProps: FormProps
  tableProps: TableBasicProps
  query: QueryFnType
  responsePath?: string
  extraQueryParams?: any
  buttons?: {
    query?: string
    reset?: string
    config?: string
    add?: string
    edit?: string
    delete?: string
  }
}
