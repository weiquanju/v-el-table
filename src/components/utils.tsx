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
  Object.entries(handlers).forEach(([key, handler]) => map.set(`on${key.charAt(0).toUpperCase()}${key.substring(1)}`, handler))
  return Object.fromEntries(map)
}

export const toCamelCase = (str: string) => {
  return str.replace(/[-_ ](\w)|(^\w)/g, (all, one) => {
    return !one ? all.toLowerCase() : one.toUpperCase()
  })
}

export const toCamelCaseProp = (props: { [key: string]: any }) => {
  const propKeys = Object.keys(props)
  return Object.fromEntries(
    propKeys.map((key: string) => {
      const value = props[key]
      if (propKeys.find((key) => /-/.test(key))) {
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
export const at = (path: string, obj: any) => {
  const parts = path.split('.')
  let result = obj
  try {
    for (let i = 0; i < parts.length; i++) {
      result = result[parts[i]]
    }
    return result
  } catch (error) {
    console.error(error)
  }
}
