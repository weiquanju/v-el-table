import { h, type SetupContext } from 'vue'
import type { VElGenericTablePlus, VElTablePlusProps } from './type'
import { LayoutDefault } from './default-layout'
import { useTablePlusProps } from './use-table-plus-props'

/**
 * @todo feat:
 * 支持单元格编辑
 * 支持CURD
 * 组件插槽支持
 */
const TablePlus = <TableDataItem = unknown, FormData extends object = object>(
  p: VElTablePlusProps<TableDataItem, FormData>,
  setupContext: SetupContext
) => {
  const { props, slots } = useTablePlusProps(p, setupContext)
  return h('div', [
    h(props.layout || LayoutDefault, props.layoutProps as Parameters<typeof h>[1], {
      ...setupContext.slots,
      ...slots
    })
  ])
}

const VElTablePlus = TablePlus as VElGenericTablePlus

export default VElTablePlus
