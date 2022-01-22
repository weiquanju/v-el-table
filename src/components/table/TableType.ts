import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { TableProps } from 'element-plus/lib/components/table/src/table/defaults'
import { EventsHandlers } from '../interfaces'
import { VNode } from 'vue'
type Slot = (...args: any[]) => VNode[] | JSX.Element | VNode
export type Slots = Readonly<{ default?: Slot; header?: Slot }>

export type ColumnSlots = {
  [name: string]: Slots
}

export interface TableBasicProp<T = any> {
  tableEvents?: EventsHandlers
  columns: Partial<TableColumnCtx<T>>[]
  columnSlots?: ColumnSlots
  table: TableProps<T>
}

export type FormatterArgObject<T = any, Cell = any> = { row: T; column: TableColumnCtx<T>; cellValue: Cell; index: number }

export type FormatterArgArray<T = any, Cell = any> = [row: T, column: TableColumnCtx<T>, cellValue: Cell, index: number]
