// common interfaces

import { DefineComponent, VNode } from 'vue'

export type ObjectType = Record<string, any> | any

export type EventsHandlers = Record<string, (...args: any[]) => void>

export type Component<T = any> = string | VNode | DefineComponent<T>
