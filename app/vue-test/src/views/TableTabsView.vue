<script setup lang="tsx">
import { reactive, ref } from 'vue'
import { i18n, VElTableTabs, type VElTableProps, type VElTableTabsProps } from 'v-el-table'

i18n.setLocale('zh-cn')


interface TableDataItem { id: number, value: string }
interface FormData { id: number, value: string }


const tableProps = reactive<VElTableProps<TableDataItem>>({
  table: { data: [{ id: 1, value: 'Hello table!' }], tableLayout: 'fixed' as 'fixed' | 'auto' },
  columns: [
    { prop: 'id', label: 'id' },
    { prop: 'value', label: '值' },
    {
      prop: 'end', label: '操作',
      default: (props) => {
        return <button onClick={() => console.log(props)}>click</button>
      },
      header(props) {
        // console.log(props)
        return 'hello'
      }
    }
  ],
  events: {
    cellClick(...args: unknown[]) {
      console.log('cellClick', ...args)
    }
  }
})

const tableTabsConfig: VElTableTabsProps<TableDataItem, FormData> = {
  title: '',
  query: (data) => {
    // console.log('query', data)
    return Promise.resolve({
      payload: {
        data: Array.from(Array(10)).map((i, index) => {
          const n = (data.currentPage - 1) * 10 + index + 1
          return { id: n, value: `${data.find} ${n}` }
        }),
        total: 20,
        page: data.currentPage,
      },
      status: 'success', code: 0
    })
  },
  tabs: [{ label: '完成订单', name: 'finish', ...tableProps }, { label: '支付完成', name: 'pay', ...tableProps }],
  tabsCurrent: ref('finish'),
  tabsQueryKey: 'find',
  responsePath: {
    data: 'payload.data',
    currentPage: 'payload.page',
    total: 'payload.total',
  },
  buttons: [
    {
      key: 'add',
      name: '新增',
      icon: 'CircleClose',
      events: { click: () => console.log('Hello world!') },
    },
    ['button', { class: 'el-button' }, 'remove'],
    () => <>
      <button class="el-button">hi</button>
    </>
  ],
  formProps: {
    form: {
      model: {
        id: 1,
        value: ''
      }
    },
    fields: [
      {
        itemProps: { prop: 'id', label: 'ID' },
        inputComponent: 'el-input',
        inputProps: { type: 'text', placeholder: 'Please input ID' },
        inputEvents: {}
      },
      {
        itemProps: { prop: 'value', label: '值' },
        inputComponent: 'el-input',
        inputEvents: {}
      },
    ]
  }
}

</script>

<template>
  <VElTableTabs v-bind='tableTabsConfig' />
</template>
