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

export const isComponentName = (name: string): name is ComponentName =>
  [
    'ElCalendar',
    'ElSelect',
    'ElInput',
    'ElSwitch',
    'ElCheckboxGroup',
    'ElCheckbox',
    'ElTimeSelect',
    'ElTimePicker',
    'ElDatePicker',
    'ElRadioGroup',
    'ElSlider',
    'ElColorPicker',
  ].includes(name)

export const inputRender = (field: FormItemProps, formProps: FormProps) => {
  if (typeof field.inputComponent !== 'string') {
    return <component is={field.inputComponent} />
  }
  const { prop, label = '' } = field?.itemProps || {}
  if (!prop) {
    throw new Error(`${label || 'undefined label'} of 'FormItemProps.itemProps.prop' in form is undefined!`)
  }
  const { model } = formProps.form
  const name = toPascalNameStyle(field.inputComponent)
  if (!isComponentName(name)) {
    throw new Error(`Error component name: ${name} .`)
  }
  const { inputProps = {}, remoteHandler, children = '' } = field
  if (remoteHandler) {
    remoteHandler(field)
  }
  switch (name) {
    case 'ElInput':
      return (
        <ElInput {...inputProps} {...eventsTransform(field.inputEvents)} v-model={model[prop]}>
          {children}
        </ElInput>
      )
    case 'ElCalendar':
      return (
        <ElCalendar {...inputProps} {...eventsTransform(field.inputEvents)} v-model={model[prop]}>
          {children}
        </ElCalendar>
      )
    case 'ElSwitch':
      return (
        <ElSwitch {...inputProps} {...eventsTransform(field.inputEvents)} v-model={model[prop]}>
          {children}
        </ElSwitch>
      )
    case 'ElCheckboxGroup':
      return (
        <ElCheckboxGroup {...inputProps} {...eventsTransform(field.inputEvents)} v-model={model[prop]}>
          {children}
        </ElCheckboxGroup>
      )
    case 'ElCheckbox':
      return (
        <ElCheckbox {...inputProps} {...eventsTransform(field.inputEvents)} v-model={model[prop]}>
          {children}
        </ElCheckbox>
      )
    case 'ElSelect':
      return (
        <ElSelect {...inputProps} {...eventsTransform(field.inputEvents)} v-model={model[prop]}>
          {children}
        </ElSelect>
      )
    case 'ElTimePicker':
      return (
        <ElTimePicker {...inputProps} {...eventsTransform(field.inputEvents)} v-model={model[prop]}>
          {children}
        </ElTimePicker>
      )
    case 'ElTimeSelect':
      return (
        <ElTimeSelect {...inputProps} {...eventsTransform(field.inputEvents)} v-model={model[prop]}>
          {children}
        </ElTimeSelect>
      )
    case 'ElDatePicker':
      return (
        <ElDatePicker {...inputProps} {...eventsTransform(field.inputEvents)} v-model={model[prop]}>
          {children}
        </ElDatePicker>
      )
    case 'ElRadioGroup':
      return (
        <ElRadioGroup {...inputProps} {...eventsTransform(field.inputEvents)} v-model={model[prop]}>
          {children}
        </ElRadioGroup>
      )
    case 'ElSlider':
      return (
        <ElSlider {...inputProps} {...eventsTransform(field.inputEvents)} v-model={model[prop]}>
          {children}
        </ElSlider>
      )
    case 'ElColorPicker':
      return (
        <ElColorPicker {...inputProps} {...eventsTransform(field.inputEvents)} v-model={model[prop]}>
          {children}
        </ElColorPicker>
      )
  }
}
