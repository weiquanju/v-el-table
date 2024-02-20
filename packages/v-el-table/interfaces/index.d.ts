import type { Component, DefineComponent, ConcreteComponent, FunctionalComponent, SetupContext, RenderFunction } from 'vue';
export type ObjectType = Record<PropertyKey, unknown | string | number | boolean | undefined | null | (() => void)>;
export type EventsHandlers = Record<string, (...args: unknown[]) => void>;
export type ComponentType = string | Component | DefineComponent | ConcreteComponent | FunctionalComponent;
export type Setup = <Props = unknown, Data = object>(props: Readonly<Props>, ctx: SetupContext) => RenderFunction | Data;
export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
};
