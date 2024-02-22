import type { DefineComponent, FunctionalComponent } from 'vue'
import type { VElFormProps } from '../form/type'
import type { TableBasicProps } from '../table/type'
import type { ButtonType } from './default-button-type'
import type { ObjectType } from '../interfaces'

export declare interface PaginationProps {
  currentPage: number
  pageSizes: number[]
  pageSize: number
  layout: string
  total: number
}

export declare interface DataPath {
  data: string
  currentPage: string
  total: string
}

export declare type QueryFnType<T = unknown> = (formAndPage: unknown & { currentPage: number; pageSize: number }) => Promise<T>

export declare type ResponsePathType = {
  data?: string
  currentPage?: string
  total?: string
}

export declare interface TablePlusProps<T = unknown> {
  title?: string
  layout?: DefineComponent | FunctionalComponent | /**组件调用处提示语法错误,因此使用unknown兼容😂 */ unknown
  layoutProps?: ObjectType
  pagination?: PaginationProps
  formProps: VElFormProps
  tableProps: TableBasicProps<T>
  initQuery?: boolean
  query: QueryFnType
  responsePath?: ResponsePathType
  queryParams?: unknown
  buttons?: ButtonType[]
}
