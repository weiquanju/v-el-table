import { ElTabs, ElTabPane, type TabsEmits, type TabsProps } from 'element-plus'
import { h, type FunctionalComponent, type SetupContext } from 'vue'

export interface VElTabListItem {
  label: string
  name: any
}
export interface VElTabProps extends Partial<TabsProps> {
  list: VElTabListItem[]
}

export const VElTabs = (
  { list, ...props }: VElTabProps,
  ctx?: SetupContext
): FunctionalComponent<VElTabProps, TabsEmits> => {
  return h(
    ElTabs,
    { ...props, 'onUpdate:modelValue': (val) => ctx?.emit('update:modelValue', val) },
    () => list.map(({ label, name }) => h(ElTabPane, { label, name }))
  ) as any
}
