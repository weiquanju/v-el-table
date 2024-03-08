import type { VElGenericForm, VElFormProps, FormItemProps } from './type'
import { ElForm, ElFormItem } from 'element-plus'
import { inputRender } from './utils'
import { eventsTransform, unProxyRecord } from '../utils'
import { h, toValue, type VNodeProps } from 'vue'
import type { InferComponentProps } from '../interfaces'

type ItemProps = InferComponentProps<typeof ElFormItem>

function Form<T extends object>(props: VElFormProps<T>) {
  const { fields = [] } = props
  const children = fields
    .filter(({ visible = true }) => toValue(visible))
    .map((field: FormItemProps<T>) =>
      h(ElFormItem, unProxyRecord<ItemProps>(field.itemProps as ItemProps), {
        default: () => inputRender(field, props),
        label: typeof field.itemProps?.label === 'function' ? field.itemProps.label : undefined,
        error: typeof field.itemProps?.error === 'function' ? field.itemProps.error : undefined
      })
    )

  const model = (val: VElFormProps<T>['form']['model']) => {
    props.form.model = val
  }

  return h('div', [
    h(
      ElForm,
      {
        ...unProxyRecord(props.form),
        ...eventsTransform(props.events),
        'onUpdate:model': model
      } as VNodeProps,
      { default: () => children }
    )
  ])
}

const VElForm = Form as VElGenericForm

export default VElForm
