import type { FormItemRule } from 'element-plus'
import type { ObjectType, ToProxyRecord } from '../interfaces'
import type { Slot } from 'vue'

export declare type ComponentSize = 'default' | 'small' | 'large'

declare interface ElFormPropsBase extends ObjectType {
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
export declare interface ElFormProps<M extends object = object>
  extends Partial<ToProxyRecord<ElFormPropsBase>> {
  model: M
}

export declare interface ElFormItemProps<
  // form model data
  D extends object | unknown = object,
  // prop类型自动推导
  P = D extends object ? string | keyof D : string
> {
  label?: string | Slot
  labelWidth?: string | number
  prop?: P
  required?: boolean
  rules?: FormItemRule | FormItemRule[]
  error?: string | Slot
  validateStatus?: string
  for?: string
  inlineMessage?: boolean | string
  showMessage?: boolean
  size?: ComponentSize
}
