import { isRef, isReactive, reactive, toRef, unref } from 'vue'
import type { EventsHandlers, ObjectType, ToUnProxyRecord } from '../interfaces'
import type { FormItemProps, InputComponent } from '../form/type'

export * from './I18N'

export const toPascalNameStyle = (str: string) =>
  str.replace(/[-_ ](\w)|(^\w)/g, (all, one) => {
    return (!one ? all : one).toUpperCase()
  })

/**
 * @link https://github.com/vuejs/jsx-next/issues/217#issuecomment-743046201 How to use v-bind without arguments in jsx?
 * 将event handlers 由 {click:(event)=>xxx} 转为 {onClick:(event)=>xxx}
 */
export const eventsTransform = <T extends InputComponent = InputComponent>(
  handlers?: FormItemProps<ObjectType, T>['inputEvents']
) => {
  if (!handlers || typeof handlers !== 'object') {
    return {} as EventsHandlers
  }
  const map = new Map<string, (...args: unknown[]) => void>()
  Object.entries(handlers).forEach(([key, handler]) => map.set(toCamelCase(`on-${key}`), handler))
  return Object.fromEntries(map)
}

export const toCamelCase = (str: string) => {
  return str.replace(/[-_ ](\w)|(^\w)/g, (all, one) => {
    return !one ? all.toLowerCase() : one.toUpperCase()
  })
}

export const toCamelCaseProp = (props: { [key: string]: unknown }) => {
  const propKeys = Object.keys(props)
  if (isReactive(props)) {
    return reactive(
      Object.fromEntries(
        propKeys.map((key: string) => {
          const value = toRef(props, key)
          if (propKeys.find((key) => /[-_ ]/.test(key))) {
            return [toCamelCase(key), value]
          }
          return [key, value]
        })
      )
    )
  }
  return Object.fromEntries(
    propKeys.map((key: string) => {
      const value = props[key]
      if (propKeys.find((key) => /[-_ ]/.test(key))) {
        return [toCamelCase(key), value]
      }
      return [key, value]
    })
  )
}

export const resetValue = <T = ObjectType>(formData: T) => {
  for (const key in formData) {
    // object类型处理，避免object类型被置为undifined，避免业务层因数据类型改变出现异常的情况
    if (formData[key] !== null && typeof formData[key] === 'object') {
      //数组、对象、函数类型
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const val = formData[key] as any
      if (typeof val.constructor === 'function') {
        formData[key] = new val.constructor()
        continue
      }
    }
    ;(formData[key] as unknown) = undefined
  }
  return formData
}
/**
 * @example
 * const path = 'a.b.c'
 * const obj = { a: { b: { c: 1 } } }
 * console.log(at(path, obj))
 */
export function at<T = unknown>(path: string, obj: unknown) {
  const parts = path.split('.')
  let result = obj
  try {
    for (let i = 0; i < parts.length; i++) {
      if ([undefined, null].includes(result as undefined | null)) {
        return result as undefined | null
      } else {
        result = (result as ObjectType)[parts[i]]
      }
    }
    return result as T
  } catch (error) {
    console.error(error)
  }
}

export function unRefRecord<T = any>(data: T): ToUnProxyRecord<T> {
  if (data !== null && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        return [key, unref(value)]
      })
    ) as ToUnProxyRecord<T>
  } else {
    return (isRef(data) ? unref(data) : data) as ToUnProxyRecord<T>
  }
}
