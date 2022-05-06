import { DefineComponent, FunctionalComponent } from 'vue'
import { FormProps } from '../form/index.d'
import { TableBasicProps } from '../table/index.d'
import { ButtonType, ButtonKey } from './defaultButton.d'

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

export type ResponsePathType = {
  data?: string
  currentPage?: string
  total?: string
}

export interface TablePlusProps<T = any> {
  title?: string
  layout?: DefineComponent | FunctionalComponent | /**组件调用处提示语法错误,因此使用any兼容😂 */ any
  layoutProps?: any
  pagination?: PaginationProps
  formProps: FormProps
  tableProps: TableBasicProps<T>
  query: QueryFnType
  responsePath?: ResponsePathType
  queryParams?: any
  includeButtons?: ButtonKey[]
  buttons?: ButtonType[]
}

declare type TablePlus = DefineComponent<TablePlusProps>

export default TablePlus
