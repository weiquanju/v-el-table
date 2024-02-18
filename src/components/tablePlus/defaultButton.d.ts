import type { ButtonProps } from 'element-plus'
import { type Ref, h } from 'vue'
import type { Writable } from '../interfaces'
import * as Icons from '@element-plus/icons-vue'

export type ButtonKey = 'query' | 'reset' | string

export interface Button {
  key: ButtonKey
}

export interface ButtonConfig extends Button {
  name: string | Ref<string>
  buttonProps?: Partial<Writable<ButtonProps>>
  icon: keyof typeof Icons
  events?: EventsHandlers
}

export interface ButtonVNode extends Button {
  nodeParams: Parameters<typeof h>
}

export type ButtonType = ButtonConfig | ButtonVNode
