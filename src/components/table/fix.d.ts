import { CSSProperties } from 'vue'
import { TreeNode, SummaryMethod, ColumnCls, ColumnStyle, Sort } from 'element-plus/es/components/table/src/table/defaults'

export type CellStyle<T> = CSSProperties | ((data: { row: T; rowIndex: number; column: TableColumnCtx<T>; columnIndex: number }) => CSSProperties)

export type CellCls<T> = string | ((data: { row: T; rowIndex: number; column: TableColumnCtx<T>; columnIndex: number }) => string)

export type Layout = 'fixed' | 'auto' | string

export interface TableProps<T> {
  data: T[]
  size?: string
  height?: string | number
  maxHeight?: string | number
  fit?: boolean
  stripe?: boolean
  border?: boolean
  rowKey?: string | ((row: T) => string)
  showHeader?: boolean
  showSummary?: boolean
  sumText?: string
  summaryMethod?: SummaryMethod<T>
  rowClassName?: ColumnCls<T>
  rowStyle?: ColumnStyle<T>
  cellClassName?: CellCls<T>
  cellStyle?: CellStyle<T>
  headerRowClassName?: ColumnCls<T>
  headerRowStyle?: ColumnStyle<T>
  headerCellClassName?: CellCls<T>
  headerCellStyle?: CellStyle<T>
  highlightCurrentRow?: boolean
  currentRowKey?: string | number
  emptyText?: string
  expandRowKeys?: any[]
  defaultExpandAll?: boolean
  defaultSort?: Sort
  tooltipEffect?: string
  spanMethod?: (data: { row: T; rowIndex: number; column: TableColumnCtx<T>; columnIndex: number }) =>
    | number[]
    | {
        rowspan: number
        colspan: number
      }
  selectOnIndeterminate?: boolean
  indent?: number
  treeProps?: {
    hasChildren?: string
    children?: string
  }
  lazy?: boolean
  load?: (row: T, treeNode: TreeNode, resolve: (data: T[]) => void) => void
  style?: CSSProperties
  tableLayout: Layout
}
