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
import { h } from 'vue'
import { toPascalNameStyle, eventsTransform } from '../utils'
import { FormProps, FormItemProps, ComponentName } from './interfaces'

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

const componentKey = Object.keys(mapComponents)

export const isComponentName = (name: string): name is ComponentName => componentKey.includes(name)

export const inputRender = (field: FormItemProps, formProps: FormProps) => {
  const { prop, label = '' } = field?.itemProps || {}
  if (!prop) {
    throw new Error(`${label || 'undefined label'} of 'FormItemProps.itemProps.prop' in form is undefined!`)
  }
  const { model } = formProps.form
  const { inputProps = {}, remoteHandler, children } = field

  if (remoteHandler) {
    remoteHandler(field)
  }

  let Component: any = field.inputComponent //DefineComponent | FunctionalComponent | typeof defineAsyncComponent | ElComponent | JSX.Element | VNode

  // 如果是字符串类型
  if (typeof field.inputComponent === 'string') {
    const name = toPascalNameStyle(field.inputComponent)
    if (!isComponentName(name)) {
      throw new Error(`Error component name: ${name} .`)
    }
    Component = mapComponents[name]
  }

  const modelValue = (val: any) => {
    model[prop] = val
  }

  return h(
    Component,
    {
      ...inputProps,
      ...eventsTransform(field.inputEvents),
      modelValue: model[prop],
      'onUpdate:modelValue': modelValue,
    },
    { default: () => children },
  )
}
