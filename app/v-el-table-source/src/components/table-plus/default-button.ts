import * as ElementIcons from '@element-plus/icons-vue'
import { eventsTransform } from '../utils'
import { ElButton } from 'element-plus'
import { h, isRef } from 'vue'
import { i18n } from '../utils'
import type { ButtonConfig, ButtonType } from './default-button-type'

const createButton = ({ name, icon, events = {}, buttonProps = {} }: ButtonConfig) =>
  h(
    ElButton,
    { ...eventsTransform(events), ...buttonProps },
    {
      icon: () => h(ElementIcons[icon]),
      default: () => (isRef(name) ? name.value : name)
    }
  )

/**@todo 定义按钮组件 */
export const getDefaultButtons = ({
  buttons = [],
  reset,
  query
}: {
  buttons?: ButtonType[]
  query: () => void
  reset: () => void
}) => {
  const defaultButton: ButtonConfig[] = [
    {
      key: 'query',
      name: i18n.t('query'),
      icon: 'Search',
      events: {
        click: query
      }
    },
    {
      key: 'reset',
      name: i18n.t('reset'),
      icon: 'CircleClose',
      events: { click: reset }
    }
  ]

  return [...defaultButton, ...buttons].map((button) => {
    if (Array.isArray(button)) {
      const [component, ...params] = button
      return h(component, ...params)
    }
    return createButton(button as ButtonConfig)
  })
}
