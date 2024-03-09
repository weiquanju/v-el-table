import type { VNodeChild } from 'vue'
import type { EventsHandlers, ComponentType, RenderFunction, VueComponentType, InferComponentProps, InferComponentEmits, InferComponentSlots, ToRefRecord, ToRef } from '../interfaces'
import type { ElFormProps, ElFormItemProps } from './type-fix'
import type {
  GenericCommonType,
  GenericCtx,
  GenericRenderNodeType,
  GenericReturnInstance
} from '../interfaces'
import type { FormInstance } from 'element-plus'

export * from './type-fix'

export declare type InputComponent = ComponentType | ComponentName | ComponentInputs

export declare type FormItemProps<
  FormData extends object = object,
  T extends InputComponent = InputComponent,
  P extends Record<string, unknown> = Record<string, unknown>,
  S extends VNodeChild | VNodeChild[] | RenderFunction = VNodeChild | VNodeChild[] | RenderFunction
> = {
  itemProps?: ToRefRecord<ElFormItemProps<FormData>>
  inputProps?: ToRefRecord<T extends VueComponentType ? InferComponentProps<T, P> : P>
  inputComponent: T
  inputEvents?: T extends VueComponentType ? InferComponentEmits<T, EventsHandlers> : EventsHandlers
  inputChildren?: T extends VueComponentType ? InferComponentSlots<T, S> : S
  visible?: ToRef<boolean>
  remoteHandler?: <T = unknown, R = Promise<T>>(itemContext: FormItemProps<FormData>) => R
  remoteParams?: object
} & object

export declare type VElFormProps<FormData extends object = object> = {
  getInstance?: (r: FormInstance) => void
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
  | 'ElTree'
  | 'ElTreeSelect'
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
  | 'Tree'
  | 'TreeSelect'
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
  | 'tree'
  | 'tree-select'

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
  | (typeof import('element-plus'))['ElTree']
  | (typeof import('element-plus'))['ElTreeSelect']


export declare type VElGenericForm = <FormData extends object>(
  props: VElFormProps<FormData> & GenericCommonType,
  ctx?: GenericCtx,
  expose?: (exposed: import('vue').ShallowUnwrapRef<{}>) => void,
  setup?: Promise<GenericReturnInstance<VElFormProps<FormData>>>
) => GenericRenderNodeType & { __ctx?: GenericReturnInstance<VElFormProps<FormData>> }
