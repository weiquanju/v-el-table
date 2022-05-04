import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { TableProps } from 'element-plus/lib/components/table/src/table/defaults'
import { EventsHandlers } from '../interfaces'
import { DefineComponent, Slot } from 'vue'

export type TableColumnSlots = { default?: Slot; header?: Slot }

export type TableColumn<T = any> = Partial<TableColumnCtx<T>> & TableColumnSlots

export interface TableBasicProps<T = any> {
  events?: EventsHandlers
  columns: TableColumn<T>[]
  table: Partial<TableProps<T>>
}

export type FormatterArgObject<T = any, Cell = any> = { row: T; column: TableColumnCtx<T>; cellValue: Cell; index: number }

export type FormatterArgArray<T = any, Cell = any> = [row: T, column: TableColumnCtx<T>, cellValue: Cell, index: number]

declare type TableBasic = DefineComponent<TableBasicProps>

export default TableBasic
