import type { FormProps } from './index.d'
import { ElForm, ElFormItem } from 'element-plus'
import { inputRender } from './utils'
import { eventsTransform } from '../utils'
import { type FunctionalComponent, h, type VNodeProps } from 'vue'
import type { ObjectType } from '../interfaces'

const VElForm = function (props: FormProps) {
  const { fields = [] } = props
  const children = fields
    .filter(({ visible = true }) => visible)
    .map((field) =>
      h(ElFormItem, field.itemProps as VNodeProps, {
        default: () => inputRender(field, props),
        label: typeof field.itemProps?.label === 'function' ? field.itemProps.label : undefined,
        error: typeof field.itemProps?.error === 'function' ? field.itemProps.error : undefined,
      }),
    )

  const model = (val: ObjectType) => {
    props.form.model = val
  }

  return h(ElForm, { ...props.form, ...eventsTransform(props.events), 'onUpdate:model': model } as VNodeProps, { default: () => children })
} as FunctionalComponent<FormProps>
export default VElForm
