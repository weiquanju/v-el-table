import type { TableColumnCtx, TableProps } from 'element-plus'
import type {
  EventsHandlers,
  GenericCommonType,
  GenericCtx,
  GenericRenderNodeType,
  GenericReturnInstance
} from '../interfaces'
import type { VNodeChild } from 'vue'

export declare type TableColumnSlots<T> = {
  default?: (props: SlotProps<T>) => VNodeChild | VNodeChild[]
  header?: (props: Pick<SlotProps<T>, '$index' | 'column'>) => VNodeChild | VNodeChild[]
}

export declare interface SlotProps<T> {
  $index: number
  cellIndex: number
  column: TableColumnCtx<T>
  expanded: boolean
  row: T
}

export declare type ElTableColumnProps<T> = Pick<
  TableColumnCtx<T>,
  | 'type'
  | 'index'
  | 'label'
  | 'columnKey'
  | 'prop'
  | 'width'
  | 'minWidth'
  | 'fixed'
  | 'renderHeader'
  | 'sortable'
  | 'sortMethod'
  | 'sortBy'
  | 'sortOrders'
  | 'resizable'
  | 'formatter'
  | 'showOverflowTooltip'
  | 'align'
  | 'headerAlign'
  | 'className'
  | 'labelClassName'
  | 'selectable'
  | 'reserveSelection'
  | 'filters'
  | 'filterPlacement'
  | 'filterClassName'
  | 'filterMultiple'
  | 'filterMethod'
  | 'filteredValue'
>

export declare type TableColumn<T = unknown> = Partial<ElTableColumnProps<T> & TableColumnSlots<T>>

export declare interface TableBasicProps<TableDataItem = unknown> {
  events?: EventsHandlers
  columns: TableColumn<TableDataItem>[]
  table: Omit<TableProps<TableDataItem>, 'context'>
}

export declare type FormatterArgObject<T = unknown, Cell = unknown> = {
  row: T
  column: TableColumn<T>
  cellValue: Cell
  index: number
}

export declare type FormatterArgArray<T = unknown, Cell = unknown> = [
  row: T,
  column: TableColumn<T>,
  cellValue: Cell,
  index: number
]

export declare type GenericTable = <TableDataItem = unknown>(
  props: TableBasicProps<TableDataItem> & GenericCommonType,
  ctx?: GenericCtx,
  expose?: (exposed: import('vue').ShallowUnwrapRef<{}>) => void,
  setup?: Promise<GenericReturnInstance<TableBasicProps<TableDataItem>>>
) => GenericRenderNodeType & {
  __ctx?: GenericReturnInstance<TableBasicProps<TableDataItem>>
}
