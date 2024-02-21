import type { FormItemRule } from 'element-plus'
import type { ObjectType } from '../interfaces'
import type { Slot } from 'vue'

export type ComponentSize = 'default' | 'small' | 'large'

export type ElFormProps<M extends ObjectType = ObjectType> = {
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

export type ElFormItemProps<
  // form model data
  D extends ObjectType | unknown = ObjectType,
  // prop类型自动推导
  P = D extends ObjectType ? keyof D : string
> = {
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
