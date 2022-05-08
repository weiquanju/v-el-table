import * as Icons from '@element-plus/icons-vue'
import { TablePlusProps } from './index.d'
import { resetValue, eventsTransform } from '../utils'
import { ElButton } from 'element-plus'
import { h, isRef, ref } from 'vue'
import I18N from '../I18N'
import { Button, ButtonConfig, ButtonVNode, ButtonType } from './defaultButton.d'

export const isButtonVNode = (button: Button): button is ButtonVNode => {
  return 'nodeParams' in button
}

/**@todo 定义按钮组件 */
export const getDefaultButtons = ({ props, query }: { props: TablePlusProps; query: () => void }) => {
  const defaultButton: ButtonConfig[] = [
    {
      key: 'query',
      name: I18N.t('query'),
      icon: 'Search',
      events: {
        click: query,
      },
    },
    {
      key: 'reset',
      name: I18N.t('reset'),
      icon: 'CircleClose',
      events: { click: () => resetValue(props.formProps.form.model) },
    },
    // {
    //   name: 'config',
    //   icon: 'SetUp',
    // },
    // {
    //   name: 'add',
    //   icon: 'CirclePlus',
    // },
    // {
    //   name: 'edit',
    //   icon: 'Edit',
    // },
    // {
    //   name: 'delete',
    //   icon: 'Delete',
    // },
  ]

  const buttons = ref<ButtonType[]>([...defaultButton, ...(props.buttons || [])])

  const createButton = ({ name, icon, events = {}, buttonProps = {} }: ButtonConfig) =>
    h(
      ElButton,
      { ...eventsTransform(events), ...buttonProps },
      {
        icon: () => h(Icons[icon]),
        default: () => (isRef(name) ? name.value : name),
      },
    )
  return buttons.value
    .filter(({ key }: any) => (props.includeButtons ? props.includeButtons.includes(key) : true))
    .map((button) => {
      if (isButtonVNode(button)) {
        const [component, ...rest] = button.nodeParams
        return h(component, ...rest)
      }
      return createButton(button)
    })
}
