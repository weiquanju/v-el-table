import { FormProps } from './interfaces'
import { ElForm, ElFormItem } from 'element-plus'
import { inputRender } from './utils'
import { eventsTransform } from '../utils'

export default function Form(props: FormProps) {
  const children = props.fields
    .filter(({ visible = true }) => visible)
    .map((field) => {
      const { itemProps = {} } = field
      return (
        <ElFormItem
          label={itemProps.label}
          labelWidth={itemProps.labelWidth}
          required={itemProps.required}
          rules={itemProps.rules}
          error={itemProps.error}
          validateStatus={itemProps.validateStatus}
          for={itemProps.for}
          inlineMessage={itemProps.inlineMessage}
          showMessage={itemProps.showMessage}
          size={itemProps.size}
        >
          {inputRender(field, props)}
        </ElFormItem>
      )
    })

  return (
    <ElForm
      rules={props.form.rules}
      labelPosition={props.form.labelPosition}
      labelWidth={props.form.labelWidth}
      labelSuffix={props.form.labelSuffix}
      inline={props.form.inline}
      inlineMessage={props.form.inlineMessage}
      statusIcon={props.form.statusIcon}
      v-model={props.form.model}
      {
        /**
         * @link https://github.com/vuejs/jsx-next/issues/217#issuecomment-743046201 How to use v-bind without arguments in jsx?
         * 绑定事件
         */
        ...eventsTransform(props.events)
      }
    >
      {children}
    </ElForm>
  )
}
