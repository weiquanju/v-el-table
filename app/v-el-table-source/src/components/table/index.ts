import { ElTable, ElTableColumn } from 'element-plus'
import { h, type SetupContext } from 'vue'
import { eventsTransform, unProxyRecord } from '../utils'
import type { VElGenericTable, VElTableProps, TableColumnSlots } from './type'

function Table<T>(
  { events = {}, table = { data: [], tableLayout: 'auto' }, columns = [] }: VElTableProps<T>,
  { slots: { append } }: SetupContext
) {
  const slots = {
    default: () =>
      columns.map((column) => {
        const { default: d, header } = column as TableColumnSlots<T>
        const props = unProxyRecord({ ...column, default: undefined, header: undefined })
        return h(ElTableColumn, props as Parameters<typeof h>[1], { default: d, header })
      }),
    append: append
  }
  return h('div', [
    h(
      ElTable as Parameters<typeof h>[0],
      {
        ...eventsTransform(events),
        ...unProxyRecord(table)
      },
      slots
    )
  ])
}

const VElTable = Table as VElGenericTable

export default VElTable
