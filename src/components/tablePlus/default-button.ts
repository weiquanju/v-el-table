import * as ElementIcons from '@element-plus/icons-vue'
import type { TablePlusProps } from './type'
import { resetValue, eventsTransform } from '../utils'
import { ElButton } from 'element-plus'
import { h, isRef } from 'vue'
import { i18n } from '../utils'
import type { ButtonConfig } from './default-button-type'

const createButton = ({ name, icon, events = {}, buttonProps = {} }: ButtonConfig) =>
  h(
    ElButton,
    { ...eventsTransform(events), ...buttonProps },
    {
      icon: () => h(ElementIcons[icon]),
      default: () => (isRef(name) ? name.value : name),
    },
  )

/**@todo 定义按钮组件 */
export const getDefaultButtons = ({ props, query }: { props: TablePlusProps; query: () => void }) => {
  const defaultButton: ButtonConfig[] = [
    {
      key: 'query',
      name: i18n.t('query'),
      icon: 'Search',
      events: {
        click: query,
      },
    },
    {
      key: 'reset',
      name: i18n.t('reset'),
      icon: 'CircleClose',
      events: { click: () => resetValue(props.formProps.form.model) },
    },
  ]

  return [...defaultButton, ...(props.buttons || [])].map((button) => {
    if (Array.isArray(button)) {
      const [component, ...params] = button
      return h(component, ...params)
    }
    return createButton(button as ButtonConfig)
  })
}
