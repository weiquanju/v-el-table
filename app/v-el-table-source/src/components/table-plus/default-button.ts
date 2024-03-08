import * as ElementIcons from '@element-plus/icons-vue'
import { eventsTransform } from '../utils'
import { ElButton } from 'element-plus'
import { h, isRef, toValue } from 'vue'
import { i18n } from '../utils'
import type { ButtonConfig, ButtonType } from './default-button-type'
import type { ToProxy } from '../interfaces'

const createButton = ({ name, icon, events = {}, buttonProps = {} }: ButtonConfig) => {
  const key = !icon ? null : toValue<keyof typeof ElementIcons>(icon as any)
  return h(ElButton, { ...eventsTransform(events), ...buttonProps } as Parameters<typeof h>[1], {
    icon: () => key && h(ElementIcons[key]),
    default: () => toValue(name)
  })
}

/**@todo 定义按钮组件 */
export const getDefaultButtons = ({
  hideDefaultButton,
  buttons = [],
  reset,
  query
}: {
  hideDefaultButton?: ToProxy<boolean | string>
  buttons?: ButtonType[]
  query: () => void
  reset: () => void
}) => {
  const isHide = hideDefaultButton
    ? toValue<boolean | string>(hideDefaultButton)
    : hideDefaultButton
  const defaultButton: ButtonConfig[] =
    isHide === true || isHide === ''
      ? []
      : [
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
