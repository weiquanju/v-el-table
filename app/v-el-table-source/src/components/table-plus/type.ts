import type { VElFormProps } from '../form/type'
import type { VElTableProps } from '../table/type'
import type { ButtonType } from './default-button-type'
import type { ObjectType, ToRef, ToRefRecord } from '../interfaces'
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
  formAndPage: P & { currentPage: number; pageSize: number } & { [k: string]: any }
) => Promise<unknown>

export declare type ResponsePathType = {
  data?: string
  currentPage?: string
  total?: string
}

export declare interface VElTablePlusProps<TableDataItem, FormData extends object = object> {
  title?: ToRef<string> | string
  layout?: unknown //| DefineComponent | FunctionalComponent
  layoutProps?: unknown | ToRefRecord<ObjectType>
  pagination?: ToRefRecord<PaginationProps>
  formProps?: VElFormProps<FormData>
  tableProps: VElTableProps<TableDataItem>
  initQuery?: ToRef<boolean>
  query: QueryFnType<Partial<FormData>>
  responsePath?: ResponsePathType
  queryParams?: unknown
  hideDefaultButton?: ToRef<boolean>
  buttons?: ButtonType[]
  getExpose?: (expose: TablePlusExpose) => void
}

export declare interface TablePlusExpose {
  query: () => Promise<void>
  reset: () => void
}

export declare type VElGenericTablePlus = <T, FormData extends object = object>(
  props: VElTablePlusProps<T, FormData> & GenericCommonType,
  ctx?: GenericCtx,
  expose?: (exposed: import('vue').ShallowUnwrapRef<{}>) => void,
  setup?: Promise<GenericReturnInstance<VElTablePlusProps<T, FormData>>>
) => GenericRenderNodeType & {
  __ctx?: GenericReturnInstance<VElTablePlusProps<T, FormData>>
}
