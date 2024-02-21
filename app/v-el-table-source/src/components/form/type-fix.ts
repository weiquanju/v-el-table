import type { FormItemRule } from 'element-plus'
import type { ObjectType } from '../interfaces'

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