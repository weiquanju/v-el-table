import { FormProps } from './index.d'
import { ElForm, ElFormItem } from 'element-plus'
import { inputRender } from './utils'
import { eventsTransform } from '../utils'
import { FunctionalComponent, h, SetupContext } from 'vue'

const VElForm = function (props: FormProps, ctx: SetupContext) {
  const { fields = [] } = props
  const children = fields
    .filter(({ visible = true }) => visible)
    .map((field) =>
      h(ElFormItem as any, field.itemProps, {
        default: () => inputRender(field, props),
        label: typeof field.itemProps?.label === 'function' ? field.itemProps.label : undefined,
        error: typeof field.itemProps?.error === 'function' ? field.itemProps.error : undefined,
      }),
    )

  const model = (val: any) => {
    props.form.model = val
  }

  return h(ElForm, { ...props.form, ...eventsTransform(props.events), 'onUpdate:model': model }, { default: () => children })
} as FunctionalComponent<FormProps>
export default VElForm
