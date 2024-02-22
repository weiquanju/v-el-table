import type { ButtonProps } from 'element-plus'
import { type Ref, h } from 'vue'
import type { Writable, EventsHandlers } from '../interfaces'
import * as ElementIcons from '@element-plus/icons-vue'
export type * from './default-button-type'

export declare interface ButtonConfig {
  key?: string
  name: string | Ref<string>
  buttonProps?: Partial<Writable<ButtonProps>>
  icon: keyof typeof ElementIcons
  events?: EventsHandlers
}

export declare type ButtonType = ButtonConfig | Parameters<typeof h>
