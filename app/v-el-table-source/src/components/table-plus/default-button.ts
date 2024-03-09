import * as ElementIcons from '@element-plus/icons-vue'
import { eventsTransform, unRefRecord } from '../utils'
import { ElButton } from 'element-plus'
import { h, isRef, unref } from 'vue'
import { i18n } from '../utils'
import type { ButtonConfig, ButtonType } from './default-button-type'
import type { ToRef } from '../interfaces'

const createButton = ({ name, icon, events = {}, buttonProps = {} }: ButtonConfig) => {
  const key = !icon ? null : (unref(icon) as keyof typeof ElementIcons)
  return h(
    ElButton,
    { ...eventsTransform(events), ...unRefRecord(buttonProps) } as Parameters<typeof h>[1],
    {
      icon: () => key && h(ElementIcons[key]),
      default: () => unref(name)
    }
  )
}

/**@todo 定义按钮组件 */
export const getDefaultButtons = ({
  hideDefaultButton,
  buttons = [],
  reset,
  query
}: {
  hideDefaultButton?: ToRef<boolean | string>
  buttons?: ButtonType[]
  query: () => void
  reset: () => void
}) => {
  const isHide = hideDefaultButton ? unref<boolean | string>(hideDefaultButton) : hideDefaultButton
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

  return [...defaultButton, ...buttons].map((button: ButtonType) => {
    if (Array.isArray(button)) {
      const [component, ...params] = button
      let unrefParams = params.map(unRefRecord)
      return h(component, ...(unrefParams as any))
    } else if (typeof button === 'function'){
      return h(button)
    }
    return createButton(button as ButtonConfig)
  })
}
