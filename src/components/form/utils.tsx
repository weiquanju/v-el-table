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
import { DefineComponent, h, FunctionalComponent, defineAsyncComponent } from 'vue'
import { EventsHandlers, Setup } from '../interfaces'
import { FormProps, FormItemProps, ComponentName } from './interfaces'

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

export const isComponent = (componentLike: unknown): componentLike is DefineComponent =>
  typeof (componentLike as { setup: Setup }).setup === 'function'
export const isFunctionComponent = (componentLike: unknown): componentLike is FunctionalComponent | typeof defineAsyncComponent =>
  typeof componentLike === 'function'

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
  if (isFunctionComponent(field.inputComponent) || isComponent(field.inputComponent)) {
    const Component = field.inputComponent as DefineComponent | FunctionalComponent | typeof defineAsyncComponent
    return (
      <Component {...inputProps} {...eventsTransform(field.inputEvents)} v-model={model[prop]}>
        {children}
      </Component>
    )
  }

  // JSX 或 VNode
  return h(
    field.inputComponent as DefineComponent | JSX.Element,
    { ...inputProps, ...eventsTransform(field.inputEvents), modelValue: model[prop] },
    children,
  )
}
