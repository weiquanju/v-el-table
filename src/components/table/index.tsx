import { ElTable } from 'element-plus'
import { SetupContext } from 'vue'
import { eventsTransform } from '../utils'
import columnRender from './columnRender'
import { TableBasicProps } from './TableType'

export default function Table({ tableEvents = {}, table, columns, columnSlots = {} }: TableBasicProps, { slots: { append } }: SetupContext) {
  const slots = {
    default: (scope: any) => columnRender({ columns: columns as any, slots: columnSlots }),
    append: append,
  }
  return <ElTable {...eventsTransform(tableEvents)} {...table} v-slots={slots}></ElTable>
}
