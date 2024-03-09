// common interfaces

import type {
  Component,
  DefineComponent,
  FunctionalComponent,
  SetupContext,
  VNodeChild,
  ComputedOptions,
  MethodOptions,
  EmitsOptions,
  SlotsType,
  ComponentOptionsMixin,
  unref,
} from 'vue'

export * from './generic'

export declare type FunctionType = (...args: any[]) => any

export declare type RenderFunction<TT = void> = <T extends TT = TT>(ctx: T) => VNodeChild[]

export declare type ObjectType = Record<
  PropertyKey,
  unknown | string | number | boolean | undefined | null | FunctionType
>

export declare type EventsHandlers<K extends string = string> = Record<K, FunctionType>

export declare type ComponentType = string | Component | DefineComponent | FunctionalComponent

export declare type VueComponentType<
  /**
   * @param Props 组件属性
   */
  P = unknown,
  /**
   * @param Emits 组件事件
   */
  E extends EmitsOptions | Record<string, any[]> = {},
  /**
   * @param Slots 组件插槽
   */
  S extends Record<string, any> | SlotsType = Record<string, any>
> =
  | Component<P, unknown, unknown, ComputedOptions, MethodOptions, E, S>
  | DefineComponent<
      P,
      {},
      {},
      ComputedOptions,
      MethodOptions,
      ComponentOptionsMixin,
      ComponentOptionsMixin,
      EmitsOptions,
      string,
      unknown,
      unknown,
      unknown,
      S
    >
  | FunctionalComponent<P, E, S>

export declare type Setup = <Props = unknown, Data = object>(
  props: Readonly<Props>,
  ctx: SetupContext
) => RenderFunction | Data

export declare type Writable<T> = { -readonly [P in keyof T]: T[P] }

export declare type ToRef<T> = T extends number | string | boolean | undefined | null
  ? Parameters<typeof unref<T>>[0] 
  : T

export declare type ToRefRecord<T> = T extends { [P in keyof any]: any }
  ? { [K in keyof T]: ToRef<T[K]> }
  : ToRef<T>

export declare type ToUnProxyRecord<T> = T extends ToRefRecord<infer P> ? P : T 

export declare type InferComponentProps<T extends VueComponentType, Default = unknown> =
  T extends VueComponentType<infer Props> ? Partial<Props> : Default

export declare type InferComponentEmits<T extends VueComponentType, Default = unknown> =
  T extends VueComponentType<{}, infer E> ? Partial<E> : Default

export declare type InferComponentSlots<T extends VueComponentType, Default = unknown> =
  T extends VueComponentType<{}, {}, infer S> ? Partial<S> : Default
