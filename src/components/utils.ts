import { isReactive, reactive, toRef } from 'vue'
import { EventsHandlers } from './interfaces'

export const toPascalNameStyle = (str: string) =>
  str.replace(/[-_ ](\w)|(^\w)/g, (all, one) => {
    return (!one ? all : one).toUpperCase()
  })

/**
 * @link https://github.com/vuejs/jsx-next/issues/217#issuecomment-743046201 How to use v-bind without arguments in jsx?
 * 将event handlers 由 {click:(event)=>xxx} 转为 {onClick:(event)=>xxx}
 */
export const eventsTransform = (handlers?: EventsHandlers) => {
  if (!handlers) {
    return {} as EventsHandlers
  }
  const map = new Map<string, (...args: any[]) => void>()
  Object.entries(handlers).forEach(([key, handler]) => map.set(toCamelCase(`on-${key}`), handler))
  return Object.fromEntries(map)
}

export const toCamelCase = (str: string) => {
  return str.replace(/[-_ ](\w)|(^\w)/g, (all, one) => {
    return !one ? all.toLowerCase() : one.toUpperCase()
  })
}

export const toCamelCaseProp = (props: { [key: string]: any }) => {
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
        }),
      ),
    )
  }
  return Object.fromEntries(
    propKeys.map((key: string) => {
      const value = props[key]
      if (propKeys.find((key) => /[-_ ]/.test(key))) {
        return [toCamelCase(key), value]
      }
      return [key, value]
    }),
  )
}

export const resetValue = (formData: any) => {
  for (const key in formData) {
    // object类型处理，避免object类型被置为undifined，避免业务层因数据类型改变出现异常的情况
    if (formData[key] !== null && typeof formData[key] === 'object') {
      //数组、对象、函数类型
      formData[key] = new formData[key].constructor()
      continue
    }
    formData[key] = undefined
  }
  return formData
}
/**
 * @example
 * const path = 'a.b.c'
 * const obj = { a: { b: { c: 1 } } }
 * console.log(at(path, obj))
 */
export function at<T = any>(path: string, obj: any) {
  const parts = path.split('.')
  let result = obj
  try {
    for (let i = 0; i < parts.length; i++) {
      result = result[parts[i]]
    }
    return result as T
  } catch (error) {
    console.error(error)
  }
}
