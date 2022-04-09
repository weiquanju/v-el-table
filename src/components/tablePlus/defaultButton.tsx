import { ElButton } from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import { TablePlusProps } from './index.d'
import { resetValue, eventsTransform } from '../utils'
import { h } from 'vue'

export type ButtonConfig = {
  name: string
  icon: keyof typeof Icons
  events?: any
}

export const getDefaultButtons = ({ props, query }: { props: TablePlusProps; query: () => void }) => {
  const iconStyle = { width: '1em', height: '1em', marginRight: '0.3em' }

  const btnSet = Object.keys(props?.buttons || {})
  const buttons: ButtonConfig[] = [
    {
      name: 'query',
      icon: 'Search',
      events: {
        click: query,
      },
    },
    {
      name: 'reset',
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
      icon: () => h(Icons[icon], { style: iconStyle }),
      default: () => name,
    }),
  )
}
