import { ElTableColumn } from 'element-plus'
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { ColumnSlots } from '../table/index.d'

function columnRender<T = any>({ columns, slots }: { columns: TableColumnCtx<T>[]; slots?: ColumnSlots }) {
  return columns.map((column) => {
    if (column.columns) {
      const newSlot = {
        default: (scope: any) => columnRender<T>({ columns: column.columns, slots }),
        header: (scope: any) => (slots ? slots[column.prop].header : undefined),
      }
      return <ElTableColumn {...column} v-slots={newSlot}></ElTableColumn>
    } else {
      return <ElTableColumn {...column} v-slots={slots && slots[column.prop]}></ElTableColumn>
    }
  })
}
export default columnRender
