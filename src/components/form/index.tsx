import { FormProps } from './interfaces'
import { ElForm, ElFormItem } from 'element-plus'
import { inputRender } from './utils'
import { eventsTransform } from '../utils'
import { DefineComponent, h, SetupContext } from 'vue'

export default function VElForm(props: FormProps, ctx: SetupContext) {
  const children = props.fields
    .filter(({ visible = true }) => visible)
    .map((field) => h(ElFormItem as any, field.itemProps, { default: () => inputRender(field, props) }))

  const model = (val: any) => {
    props.form.model = val
  }

  return h(ElForm, { ...props.form, ...eventsTransform(props.events), 'onUpdate:model': model }, { default: () => children })
}
