import {
  ElSelect,
  ElInput,
  ElSwitch,
  ElCheckboxGroup,
  ElCheckbox,
  ElTimeSelect,
  ElTimePicker,
  ElDatePicker,
  ElRadioGroup,
  ElSlider,
  ElColorPicker,
  ElCalendar,
} from 'element-plus'
import { DefineComponent } from 'vue'
import { FormProps, FormItemProps, ComponentName, EventsHandlers } from './interfaces'

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

const mapComponents = {
  ElSelect,
  ElInput,
  ElSwitch,
  ElCheckboxGroup,
  ElCheckbox,
  ElTimeSelect,
  ElTimePicker,
  ElDatePicker,
  ElRadioGroup,
  ElSlider,
  ElColorPicker,
  ElCalendar,
}

export const isComponentName = (name: string): name is ComponentName => Object.keys(mapComponents).includes(name)

export const inputRender = (field: FormItemProps, formProps: FormProps) => {
  const { prop, label = '' } = field?.itemProps || {}
  if (!prop) {
    throw new Error(`${label || 'undefined label'} of 'FormItemProps.itemProps.prop' in form is undefined!`)
  }
  const { model } = formProps.form
  const { inputProps = {}, remoteHandler, children = '' } = field

  if (remoteHandler) {
    remoteHandler(field)
  }

  // 如果是字符串类型
  if (typeof field.inputComponent === 'string') {
    const name = toPascalNameStyle(field.inputComponent)
    if (!isComponentName(name)) {
      throw new Error(`Error component name: ${name} .`)
    }
    const Component = mapComponents[name]
    return (
      <Component {...inputProps} {...eventsTransform(field.inputEvents)} v-model={model[prop]}>
        {children}
      </Component>
    )
  }

  // 如果是组件类型
  if (isComponentName((field.inputComponent as DefineComponent).name)) {
    const Component = field.inputComponent as DefineComponent
    return (
      <Component {...inputProps} {...eventsTransform(field.inputEvents)} v-model={model[prop]}>
        {children}
      </Component>
    )
  }

  // 是VNode类型
  return field.inputComponent
}
