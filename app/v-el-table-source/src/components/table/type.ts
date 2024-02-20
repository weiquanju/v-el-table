import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type { EventsHandlers } from '../interfaces'
import type { Slot } from 'vue'
import type { TableProps } from 'element-plus'

export declare type TableColumnSlots = { default?: Slot; header?: Slot }

export declare type TableColumn<T = unknown> = Partial<TableColumnCtx<T>> & TableColumnSlots

export interface TableBasicProps<T = unknown> {
  events?: EventsHandlers
  columns: TableColumn[]
  table: TableProps<T>
}

export declare type FormatterArgObject<T = unknown, Cell = unknown> = {
  row: T
  column: TableColumnCtx<T>
  cellValue: Cell
  index: number
}

export declare type FormatterArgArray<T = unknown, Cell = unknown> = [
  row: T,
  column: TableColumnCtx<T>,
  cellValue: Cell,
  index: number
]
