import type { EventsHandlers, ObjectType } from '../interfaces';
export * from './I18N';
export * from './i18n-init';
export declare const toPascalNameStyle: (str: string) => string;
/**
 * @link https://github.com/vuejs/jsx-next/issues/217#issuecomment-743046201 How to use v-bind without arguments in jsx?
 * 将event handlers 由 {click:(event)=>xxx} 转为 {onClick:(event)=>xxx}
 */
export declare const eventsTransform: (handlers?: EventsHandlers) => EventsHandlers;
export declare const toCamelCase: (str: string) => string;
export declare const toCamelCaseProp: (props: {
    [key: string]: unknown;
}) => {
    [k: string]: unknown;
};
export declare const resetValue: <T = ObjectType>(formData: T) => T;
/**
 * @example
 * const path = 'a.b.c'
 * const obj = { a: { b: { c: 1 } } }
 * console.log(at(path, obj))
 */
export declare function at<T = unknown>(path: string, obj: unknown): T | null | undefined;
