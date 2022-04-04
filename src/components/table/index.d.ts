import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { TableProps } from 'element-plus/lib/components/table/src/table/defaults'
import { EventsHandlers } from '../interfaces'
import { DefineComponent, Slot } from 'vue'

export type Slots = Readonly<{ default?: Slot; header?: Slot }>

export type ColumnSlots = {
  [name: string]: Slots
}

export interface TableBasicProps<T = any> {
  tableEvents?: EventsHandlers
  columns: Partial<TableColumnCtx<T>>[]
  columnSlots?: ColumnSlots
  table: TableProps<T>
}

export type FormatterArgObject<T = any, Cell = any> = { row: T; column: TableColumnCtx<T>; cellValue: Cell; index: number }

export type FormatterArgArray<T = any, Cell = any> = [row: T, column: TableColumnCtx<T>, cellValue: Cell, index: number]

type TableBasic = DefineComponent<TableBasicProps>

export default TableBasic
