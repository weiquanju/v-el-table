// common interfaces

import { Component, DefineComponent, ConcreteComponent, FunctionalComponent, SetupContext, RenderFunction } from 'vue'

export type ObjectType = Record<string, any> | any

export type EventsHandlers = Record<string, (...args: any[]) => void>

export type ComponentType = string | Component | DefineComponent | JSX.Element | ConcreteComponent | FunctionalComponent

export type Setup = <Props = any, Data = object>(props: Readonly<Props>, ctx: SetupContext) => RenderFunction | Data
