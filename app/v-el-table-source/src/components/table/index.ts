import { ElTable, ElTableColumn } from 'element-plus'
import { type FunctionalComponent, h, type SetupContext } from 'vue'
import { eventsTransform } from '../utils'
import type { GenericTable, TableBasicProps, TableColumnSlots } from './type'
export type * from './type'

const VElTable = function <T>(
  { events = {}, table = { data: [], tableLayout: 'auto' }, columns = [] }: TableBasicProps<T>,
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
} as FunctionalComponent<TableBasicProps>

export default VElTable as GenericTable
