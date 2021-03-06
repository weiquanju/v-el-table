import { DefineComponent, Slot, VNode } from 'vue'
import { FormItemRule } from 'element-plus/lib/components/form/src/form.type'
import { EventsHandlers, ObjectType, ComponentType } from '../interfaces'

export type ComponentSize = 'default' | 'small' | 'large'

export type ElFormProps<M = ObjectType> = {
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

export type ElFormItemProps<M = ObjectType> = {
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

export type ElFormItemSlots = {
  label?: Slot
  error?: Slot
}

export type FormItemProps = {
  itemProps?: ElFormItemProps & ElFormItemSlots
  inputProps?: Record<string, any>
  inputComponent: ComponentType
  inputEvents?: EventsHandlers
  inputChildren?: string | VNode[]
  visible?: boolean
  remoteHandler?: <Return = Promise<any>>(itemContext: FormItemProps) => Return
  remoteParams?: object
} & Record<string, any>

export type FormProps = {
  class?: string | CSSModuleClasses
  style?: string | CSSModuleClasses
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

export declare type VElForm = DefineComponent<FormProps>

export default VElForm

// export as namespace
