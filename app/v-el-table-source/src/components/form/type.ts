import type { VNodeChild } from 'vue'
import type {
  EventsHandlers,
  ComponentType,
  RenderFunction,
  VueComponentType,
  ObjectType
} from '../interfaces'
import type { ElFormProps, ElFormItemProps } from './type-fix'

export * from './type-fix'

export declare type InputComponent = ComponentType | ComponentName | ComponentInputs

export declare type FormItemProps<
  FormData extends object = object,
  T extends InputComponent = InputComponent,
  P extends Record<string, unknown> = Record<string, unknown>,
  S extends VNodeChild | VNodeChild[] | RenderFunction = VNodeChild | VNodeChild[] | RenderFunction
> = {
  itemProps?: ElFormItemProps<FormData>
  inputProps?: T extends VueComponentType ? InferComponentProps<T, P> : P
  inputComponent: T
  inputEvents?: T extends VueComponentType ? InferComponentEmits<T, EventsHandlers> : EventsHandlers
  inputChildren?: T extends VueComponentType ? InferComponentSlots<T, S> : S
  visible?: boolean
  remoteHandler?: <T = unknown, R = Promise<T>>(itemContext: FormItemProps<FormData>) => R
  remoteParams?: object
} & object

export declare type VElFormProps<FormData extends object = object> = {
  form: ElFormProps<FormData>
  events?: EventsHandlers
  fields: FormItemProps<FormData>[]
}

export declare type ComponentName =
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
  | 'Calendar'
  | 'Select'
  | 'Input'
  | 'Switch'
  | 'CheckboxGroup'
  | 'Checkbox'
  | 'TimeSelect'
  | 'TimePicker'
  | 'DatePicker'
  | 'RadioGroup'
  | 'Slider'
  | 'ColorPicker'
  | 'el-calendar'
  | 'el-select'
  | 'el-input'
  | 'el-switch'
  | 'el-checkbox-group'
  | 'el-checkbox'
  | 'el-time-select'
  | 'el-time-picker'
  | 'el-date-picker'
  | 'el-radio-group'
  | 'el-slider'
  | 'el-color-picker'
  | 'calendar'
  | 'select'
  | 'input'
  | 'switch'
  | 'checkbox-group'
  | 'checkbox'
  | 'time-select'
  | 'time-picker'
  | 'date-picker'
  | 'radio-group'
  | 'slider'
  | 'color-picker'

export declare type ComponentInputs =
  | (typeof import('element-plus'))['ElCalendar']
  | (typeof import('element-plus'))['ElSelect']
  | (typeof import('element-plus'))['ElInput']
  | (typeof import('element-plus'))['ElSwitch']
  | (typeof import('element-plus'))['ElCheckboxGroup']
  | (typeof import('element-plus'))['ElCheckbox']
  | (typeof import('element-plus'))['ElTimeSelect']
  | (typeof import('element-plus'))['ElTimePicker']
  | (typeof import('element-plus'))['ElDatePicker']
  | (typeof import('element-plus'))['ElRadioGroup']
  | (typeof import('element-plus'))['ElSlider']
  | (typeof import('element-plus'))['ElColorPicker']

export declare type InferComponentProps<T extends VueComponentType, Default = unknown> =
  T extends VueComponentType<infer Props> ? Partial<Props> : Default

export declare type InferComponentEmits<T extends VueComponentType, Default = unknown> =
  T extends VueComponentType<{}, infer E> ? Partial<E> : Default

export declare type InferComponentSlots<T extends VueComponentType, Default = unknown> =
  T extends VueComponentType<{}, {}, infer S> ? Partial<S> : Default
