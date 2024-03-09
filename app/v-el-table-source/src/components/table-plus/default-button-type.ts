import type { ButtonProps } from 'element-plus'
import { type Ref, h } from 'vue'
import type { Writable, EventsHandlers, ToRefRecord, ToRef, RenderFunction } from '../interfaces'
import * as ElementIcons from '@element-plus/icons-vue'
export type * from './default-button-type'

export declare interface ButtonConfig {
  key?: string
  name: ToRef<string>
  buttonProps?: Partial<ToRefRecord<Writable<ButtonProps>>>
  icon?: ToRef<keyof typeof ElementIcons>
  events?: EventsHandlers
}

export declare type ButtonType = ButtonConfig | Parameters<typeof h> | RenderFunction
