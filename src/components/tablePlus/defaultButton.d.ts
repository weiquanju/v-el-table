import { ButtonProps } from 'element-plus'
import { Ref } from 'vue'
import { Writable } from '../interfaces'
import * as Icons from '@element-plus/icons-vue'

export type ButtonKey = 'query' | 'reset' | string

export interface Button {
  key: ButtonKey
}

export interface ButtonConfig extends Button {
  name: string | Ref<string>
  buttonProps?: Partial<Writable<ButtonProps>>
  icon: keyof typeof Icons
  events?: any
}

export interface ButtonVNode extends Button {
  nodeParams: any[]
}

export type ButtonType = ButtonConfig | ButtonVNode
