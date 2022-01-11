import { DefineComponent, VNode } from 'vue'
import { FormItemRule } from 'element-plus/lib/components/form/src/form.type'
import { ComponentSize } from 'element-plus/lib/utils/types'

type Model = Record<string, any> | any

export type ElFormProps<M = Model> = {
  model: M
  rules?: Partial<Record<string, FormItemRule | FormItemRule[]>>
  labelPosition?: string
  labelWidth?: string | number
  labelSuffix?: string
  inline?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  showMessage?: boolean
  size?: ComponentSize
  disabled?: boolean
  validateOnRuleChange?: boolean
  hideRequiredAsterisk?: boolean
  scrollToError?: boolean
}

export type ElFormItemProps<M = Model> = {
  label?: string
  labelWidth?: string | number
  prop?: string & keyof M
  required?: boolean
  rules?: FormItemRule | FormItemRule[]
  error?: string
  validateStatus?: string
  for?: string
  inlineMessage?: boolean | string
  showMessage?: boolean
  size?: ComponentSize
}

export type EventsHandlers = Record<string, (...args: any[]) => void>

export type Component = string | VNode | DefineComponent

export type FormItemProps = {
  itemProps?: ElFormItemProps
  inputProps?: Record<string, any>
  inputComponent: Component
  inputEvents?: EventsHandlers
  children?: string | VNode | VNode[] | Record<string, (...args: any[]) => VNode>
  visible?: boolean
  remoteHandler?: <Return = Promise<any>>(itemContext: FormItemProps) => Return
  remoteParams?: object
} & Record<string, any>

export type FormProps = {
  form: ElFormProps
  events?: EventsHandlers
  fields: FormItemProps[]
}

export type ComponentName =
  | 'ElCalendar'
  | 'ElSelect'
  | 'ElInput'
  | 'ElSwitch'
  | 'ElCheckboxGroup'
  | 'ElCheckbox'
  | 'ElTimeSelect'
  | 'ElTimePicker'
  | 'ElDatePicker'
  | 'ElRadioGroup'
  | 'ElSlider'
  | 'ElColorPicker'

type Form = DefineComponent<FormProps>

export default Form

// export as namespace
