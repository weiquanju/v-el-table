import type { VElFormProps } from '../form/type'
import type { TableBasicProps } from '../table/type'
import type { ButtonType } from './default-button-type'
import type { ObjectType } from '../interfaces'
import type {
  GenericCommonType,
  GenericCtx,
  GenericRenderNodeType,
  GenericReturnInstance
} from '../interfaces'

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

export declare type QueryFnType<P = unknown> = (
  formAndPage: P & { currentPage: number; pageSize: number }
) => Promise<unknown>

export declare type ResponsePathType = {
  data?: string
  currentPage?: string
  total?: string
}

export declare interface TablePlusProps<
  TableDataItem,
  FormData extends object = object,
  TableProps extends TableBasicProps<TableDataItem> = TableBasicProps<TableDataItem>
> {
  title?: string
  layout?: unknown //| DefineComponent | FunctionalComponent
  layoutProps?: unknown | ObjectType
  pagination?: PaginationProps
  formProps: VElFormProps<FormData>
  tableProps: TableProps<TableDataItem>
  initQuery?: boolean
  query: QueryFnType<FormData>
  responsePath?: ResponsePathType
  queryParams?: unknown
  buttons?: ButtonType[]
}

export declare type GenericTablePlus = <
  T,
  FormData extends object = object,
  TableProps extends TableBasicProps<T> = TableBasicProps<T>
>(
  props: TablePlusProps<T, FormData, TableProps> & GenericCommonType,
  ctx?: GenericCtx,
  expose?: (exposed: import('vue').ShallowUnwrapRef<{}>) => void,
  setup?: Promise<GenericReturnInstance<TablePlusProps<T, FormData, TableProps>>>
) => GenericRenderNodeType & {
  __ctx?: GenericReturnInstance<TablePlusProps<T, FormData, TableProps>>
}
