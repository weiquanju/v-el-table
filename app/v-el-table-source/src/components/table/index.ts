import { ElTable, ElTableColumn } from 'element-plus'
import { h, type SetupContext } from 'vue'
import { eventsTransform } from '../utils'
import type { VElGenericTable, VElTableProps, TableColumnSlots } from './type'
export type * from './type'

function Table<T>(
  { events = {}, table = { data: [], tableLayout: 'auto' }, columns = [] }: VElTableProps<T>,
  { slots: { append } }: SetupContext
) {
  const slots = {
    default: () =>
      columns.map((column) => {
        const { default: d, header } = column as TableColumnSlots<T>
        const props = column
        return h(ElTableColumn, props, { default: d, header })
      }),
    append: append
  }
  return h(ElTable as Parameters<typeof h>[0], { ...eventsTransform(events), ...table }, slots)
}

export const VElTable = Table as VElGenericTable

export default VElTable
