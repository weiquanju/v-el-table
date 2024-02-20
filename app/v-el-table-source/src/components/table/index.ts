import { ElTable, ElTableColumn } from 'element-plus'
import { type FunctionalComponent, h, type SetupContext } from 'vue'
import { eventsTransform } from '../utils'
import type { TableBasicProps, TableColumnSlots } from './type'
export type * from './type'

const VElTable = function <D, T extends TableBasicProps<D>>(
  { events = {}, table = { data: [], tableLayout: 'auto' }, columns = [] }: T,
  { slots: { append } }: SetupContext,
) {
  const slots = {
    default: () =>
      columns.map((column) => {
        const { default: d, header } = column as TableColumnSlots
        const props = column
        return h(ElTableColumn, props, { default: d, header })
      }),
    append: append,
  }
  return h(ElTable as Parameters<typeof h>[0], { ...eventsTransform(events), ...table }, slots)
} as FunctionalComponent<TableBasicProps>
export default VElTable
