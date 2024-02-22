import type { FormItemRule } from 'element-plus'
import type { ObjectType } from '../interfaces'
import type { Slot } from 'vue'

export declare type ComponentSize = 'default' | 'small' | 'large'

export declare interface ElFormProps<M extends object = object> extends ObjectType {
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

export declare interface ElFormItemProps<
  // form model data
  D = unknown,
  // prop类型自动推导
  P = D extends object ? keyof D : string
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
