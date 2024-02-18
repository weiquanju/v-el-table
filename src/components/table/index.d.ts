import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type { EventsHandlers } from '../interfaces'
import type { DefineComponent, Slot } from 'vue'
import type { TableProps } from 'element-plus'

export type TableColumnSlots = { default?: Slot; header?: Slot }

export type TableColumn<T = unknown> = Partial<TableColumnCtx<T>> & TableColumnSlots

export interface TableBasicProps<T = unknown> {
  events?: EventsHandlers
  columns: TableColumn[]
  table: TableProps<T>
}

export type FormatterArgObject<T = unknown, Cell = unknown> = { row: T; column: TableColumnCtx<T>; cellValue: Cell; index: number }

export type FormatterArgArray<T = unknown, Cell = unknown> = [row: T, column: TableColumnCtx<T>, cellValue: Cell, index: number]

declare type TableBasic = DefineComponent<TableBasicProps>

export default TableBasic
