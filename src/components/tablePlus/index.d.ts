import type { DefineComponent, FunctionalComponent } from 'vue'
import type { FormProps } from '../form/index.d'
import type { TableBasicProps } from '../table/index.d'
import type { ButtonType, ButtonKey } from './defaultButton.d'
import type { ObjectType } from '../interfaces'

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

export type QueryFnType<T = unknown> = (formAndPage: unknown & { currentPage: number; pageSize: number }) => Promise<T>

export type ResponsePathType = {
  data?: string
  currentPage?: string
  total?: string
}

export interface TablePlusProps<T = unknown> {
  title?: string
  layout?: DefineComponent | FunctionalComponent | /**组件调用处提示语法错误,因此使用unknown兼容😂 */ unknown
  layoutProps?: ObjectType
  pagination?: PaginationProps
  formProps: FormProps
  tableProps: TableBasicProps<T>
  initQuery?: boolean
  query: QueryFnType
  responsePath?: ResponsePathType
  queryParams?: unknown
  includeButtons?: ButtonKey[]
  buttons?: ButtonType[]
}

declare type TablePlus = DefineComponent<TablePlusProps>

export default TablePlus
