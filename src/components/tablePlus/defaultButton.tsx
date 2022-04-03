import { ElButton } from 'element-plus'
import { Search, CircleClose, SetUp, CirclePlus /**, Delete, Edit */ } from '@element-plus/icons-vue'
import { TablePlusProps } from './index.d'
import { resetValue, eventsTransform, at } from '../utils'

export const getDefaultButtons = ({ props, query }: { props: TablePlusProps; query: () => void }) => {
  const iconStyle = { width: '1em', height: '1em', marginRight: '0.3em' }

  const btnSet = Object.keys(props?.buttons || {})
  const buttons = [
    {
      name: 'query',
      icon: <Search style={iconStyle} />,
      events: {
        click: query,
      },
    },
    {
      name: 'reset',
      icon: <CircleClose style={iconStyle} />,
      events: { click: () => resetValue(props.formProps.form.model) },
    },
    {
      name: 'config',
      icon: <SetUp style={iconStyle} />,
    },
    {
      name: 'add',
      icon: <CirclePlus style={iconStyle} />,
    },
    // {
    //   name: 'edit',
    //   icon: <Edit style={iconStyle} />,
    // },
    // {
    //   name: 'delete',
    //   icon: <Delete style={iconStyle} />,
    // },
  ]
  const { buttons: buttonNames } = props
  return buttons
    .filter(({ name }) => (btnSet.length ? btnSet.includes(name) : true))
    .map(({ name, icon, events = {} }) => (
      <ElButton {...eventsTransform(events)}>
        {icon}
        {(buttonNames && (buttonNames as any)[name]) || ''}
      </ElButton>
    ))
}
