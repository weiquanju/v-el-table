import type { TableColumnCtx, TableProps } from 'element-plus'
import type {
  EventsHandlers,
  GenericCommonType,
  GenericCtx,
  GenericRenderNodeType,
  GenericReturnInstance,
  ToRefRecord
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

export declare type TableColumn<T = unknown> = Partial<ToRefRecord<ElTableColumnProps<T>> & TableColumnSlots<T>>

export declare interface VElTableProps<TableDataItem = unknown> {
  events?: EventsHandlers
  columns: TableColumn<TableDataItem>[]
  table?: Partial<ToRefRecord<Omit<TableProps<TableDataItem>, 'context'>>>
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

export declare type VElGenericTable = <TableDataItem = unknown>(
  props: VElTableProps<TableDataItem> & GenericCommonType,
  ctx?: GenericCtx,
  expose?: (exposed: import('vue').ShallowUnwrapRef<{}>) => void,
  setup?: Promise<GenericReturnInstance<VElTableProps<TableDataItem>>>
) => GenericRenderNodeType & {
  __ctx?: GenericReturnInstance<VElTableProps<TableDataItem>>
}
