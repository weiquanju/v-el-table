import type { VElGenericForm, VElFormProps, FormItemProps } from './type'
import { ElForm, ElFormItem } from 'element-plus'
import { inputRender } from './utils'
import { eventsTransform, unRefRecord } from '../utils'
import { h, isProxy, reactive, unref, type VNodeProps, type VNodeRef } from 'vue'
import type { InferComponentProps } from '../interfaces'

type ItemProps = InferComponentProps<typeof ElFormItem>

function Form<T extends object>(props: VElFormProps<T>) {
  if(!isProxy(props.form.model)) {
    props.form.model = reactive(props.form.model) as T
  }
  const { fields = [] } = props
  const children = fields
    .filter(({ visible = true }) => unref(visible))
    .map((field: FormItemProps<T>) =>
      h(ElFormItem, unRefRecord<ItemProps>(field.itemProps as ItemProps), {
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
        ...unRefRecord(props.form),
        ...eventsTransform(props.events),
        ref: (props.getInstance || props.form.ref) as unknown as VNodeRef,
        'onUpdate:model': model
      } as VNodeProps,
      { default: () => children }
    )
  ])
}

const VElForm = Form as VElGenericForm

export default VElForm
