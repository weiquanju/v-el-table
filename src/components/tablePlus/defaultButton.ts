import * as Icons from '@element-plus/icons-vue'
import { TablePlusProps } from './index.d'
import { resetValue, eventsTransform } from '../utils'
import { ElButton } from 'element-plus'
import { h, isRef, Ref } from 'vue'
import I18N from '../I18N'

export type ButtonConfig = {
  name: string | Ref<string>
  icon: keyof typeof Icons
  events?: any
}

/**@todo 定义按钮组件 */
// export type ButtonComponentc  cx               c
export const getDefaultButtons = ({ props, query }: { props: TablePlusProps; query: () => void }) => {
  const buttons: ButtonConfig[] = [
    {
      name: I18N.t('query'),
      icon: 'Search',
      events: {
        click: query,
      },
    },
    {
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
  return buttons.map(({ name, icon, events = {} }) =>
    h(ElButton, eventsTransform(events), {
      icon: () => h(Icons[icon]),
      default: () => (isRef(name) ? name.value : name),
    }),
  )
}
