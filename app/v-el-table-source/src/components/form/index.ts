import type { VElFormProps } from './type'
import { ElForm, ElFormItem } from 'element-plus'
import { inputRender } from './utils'
import { eventsTransform } from '../utils'
import { h, type VNodeProps, type FunctionalComponent } from 'vue'
export type * from './type'

const VElForm: FunctionalComponent<VElFormProps> = function (props: VElFormProps) {
  const { fields = [] } = props
  const children = fields
    .filter(({ visible = true }) => visible)
    .map((field) =>
      h(ElFormItem, field.itemProps as VNodeProps, {
        default: () => inputRender(field, props),
        label: typeof field.itemProps?.label === 'function' ? field.itemProps.label : undefined,
        error: typeof field.itemProps?.error === 'function' ? field.itemProps.error : undefined
      })
    )

  const model = <T extends object = object>(val: T) => {
    props.form.model = val
  }

  return h(
    ElForm,
    { ...props.form, ...eventsTransform(props.events), 'onUpdate:model': model } as VNodeProps,
    { default: () => children }
  )
}

export default VElForm
