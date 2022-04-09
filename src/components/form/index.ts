import { FormProps } from './interfaces'
import { ElForm, ElFormItem } from 'element-plus'
import { inputRender } from './utils'
import { eventsTransform } from '../utils'
import { FunctionalComponent, h, SetupContext } from 'vue'

const VElForm = function (props: FormProps, ctx: SetupContext) {
  const { fields = [] } = props
  const children = fields
    .filter(({ visible = true }) => visible)
    .map((field) => h(ElFormItem as any, field.itemProps, { default: () => inputRender(field, props) }))

  const model = (val: any) => {
    props.form.model = val
  }

  return h(ElForm, { ...props.form, ...eventsTransform(props.events), 'onUpdate:model': model }, { default: () => children })
} as FunctionalComponent<FormProps>
export default VElForm
