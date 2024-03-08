import {
  ElCalendar,
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
  ElTree,
  ElTreeSelect
} from 'element-plus'
import { h, isRef, toValue } from 'vue'
import { toPascalNameStyle, eventsTransform, unProxyRecord } from '../utils'
import type { VElFormProps, FormItemProps, ComponentName } from './type'

const ElComponents = {
  ElCalendar,
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
  ElTree,
  ElTreeSelect
}

const componentKey = Object.keys(ElComponents)

export const isComponentName = (name: string): name is ComponentName => componentKey.includes(name)

export const inputRender = <T extends object = object>(
  field: FormItemProps<T>,
  formProps: VElFormProps<T>
) => {
  const { model } = formProps.form
  const { inputProps = {}, remoteHandler, inputChildren } = field

  if (remoteHandler) {
    remoteHandler(field)
  }

  let Component: Parameters<typeof h>[0] = field.inputComponent

  // 如果是字符串类型
  if (typeof field.inputComponent === 'string') {
    let name = toPascalNameStyle(field.inputComponent)
    if (name.startsWith('El') === false) name = `El${name}`
    if (!isComponentName(name)) {
      throw new Error(`Error component name: ${name} .`)
    }
    Component = ElComponents[name as keyof typeof ElComponents] as Parameters<typeof h>[0]
  }

  const modelValue = (val: T[keyof T]) => {
    if (!field?.itemProps?.prop) return
    const key = toValue(field.itemProps.prop) as keyof T

    const item = model[key]
    if(isRef(item)){
      item.value = val
    }else{
      model[key] = val
    }
  }

  return h(
    Component,
    {
      ...unProxyRecord(inputProps),
      ...eventsTransform(field.inputEvents),
      modelValue: field?.itemProps?.prop ? model[field.itemProps.prop as keyof T] : undefined,
      'onUpdate:modelValue': modelValue
    },
    { default: typeof inputChildren === 'function' ? inputChildren : () => inputChildren }
  )
}
