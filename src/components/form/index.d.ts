import type { DefineComponent, Slot, VNode } from 'vue'
import type { EventsHandlers, ComponentType } from '../interfaces'
import type { ElFormProps, ElFormItemProps } from 'fix.d'

export type ElFormItemSlots = {
  label?: Slot
  error?: Slot
}

export type FormItemProps = {
  itemProps?: ElFormItemProps & ElFormItemSlots
  inputProps?: Record<string, unknown>
  inputComponent: ComponentType
  inputEvents?: EventsHandlers
  inputChildren?: string | VNode[]
  visible?: boolean
  remoteHandler?: <Return = Promise<unknown>>(itemContext: FormItemProps) => Return
  remoteParams?: object
} & Record<string, unknown>

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
