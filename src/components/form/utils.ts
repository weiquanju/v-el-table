import * as ElComponents from 'element-plus/es/components/index'
import { h } from 'vue'
import { toPascalNameStyle, eventsTransform } from '../utils'
import type { FormProps, FormItemProps, ComponentName } from './type'

const componentKey = Object.keys(ElComponents)

export const isComponentName = (name: string): name is ComponentName => componentKey.includes(name)

export const inputRender = (field: FormItemProps, formProps: FormProps) => {
  const { prop, label = '' } = field?.itemProps || {}
  if (!prop) {
    throw new Error(`${label || 'undefined label'} of 'FormItemProps.itemProps.prop' in form is undefined!`)
  }
  const { model } = formProps.form
  const { inputProps = {}, remoteHandler, inputChildren } = field

  if (remoteHandler) {
    remoteHandler(field)
  }

  let Component: Parameters<typeof h>[0] = field.inputComponent

  // 如果是字符串类型
  if (typeof field.inputComponent === 'string') {
    const name = toPascalNameStyle(field.inputComponent)
    if (!isComponentName(name)) {
      throw new Error(`Error component name: ${name} .`)
    }
    Component = ElComponents[name] as Parameters<typeof h>[0]
  }

  const modelValue = (val: unknown) => {
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
    { default: () => inputChildren },
  )
}
