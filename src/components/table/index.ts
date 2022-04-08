import { ElTable, ElTableColumn } from 'element-plus'
import { FunctionalComponent, h, SetupContext } from 'vue'
import { eventsTransform } from '../utils'
import { TableBasicProps, TableColumnSlots } from './index.d'
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

const VElTable = function ({ events = {}, table = {}, columns = [] }: TableBasicProps, { slots: { append } }: SetupContext) {
  const slots = {
    default: () =>
      columns.map((column) => {
        const { default: d, header } = column as TableColumnSlots
        const props = column as TableColumnCtx<any>
        return h(ElTableColumn, props, { default: d, header })
      }),
    append: append,
  }
  return h(ElTable, { ...eventsTransform(events), ...table }, slots)
} as FunctionalComponent<TableBasicProps>
export default VElTable
