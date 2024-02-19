import type { ButtonProps } from 'element-plus'
import { type Ref, h } from 'vue'
import type { Writable, EventsHandlers } from '../interfaces'
import * as Icons from '@element-plus/icons-vue'

export interface ButtonConfig {
  key?: string
  name: string | Ref<string>
  buttonProps?: Partial<Writable<ButtonProps>>
  icon: keyof typeof Icons
  events?: EventsHandlers
}

export type ButtonType = ButtonConfig | Parameters<typeof h>
