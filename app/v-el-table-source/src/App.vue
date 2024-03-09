<script setup lang="tsx">
import VElForm from './components/form'
import Table from './components/table'
import TablePlus from './components/table-plus'
import type { ElFormProps, FormItemProps, VElFormProps } from './components/form/type'
import { type SetupContext, h, reactive, ref } from 'vue'
import { ElInput, type FormInstance } from 'element-plus'
import type { VElTableProps } from './components/table/type'
import type { VElTablePlusProps } from './components/table-plus/type'
import { i18n } from './components'
i18n.setLocale('zh-cn')
const formRef = ref<FormInstance>()

interface FormType {
  name: string
}

const myLabel = ref('姓名el-input')

const reactivePlaceholder = ref('Please input')

setTimeout(() => {
  myLabel.value = '姓名el-input changed'
  reactivePlaceholder.value = 'Please input name'
}, 1000)

const formFields: FormItemProps<FormType>[] = [
  {
    itemProps: { prop: 'name', label: myLabel },
    inputComponent: 'el-input',
    inputProps: { type: 'text', placeholder: reactivePlaceholder },
    inputEvents: {
      focus: (...args: unknown[]) => console.log('formRef', formRef.value?.validate)
    }
  },
  {
    itemProps: { prop: 'name', label: '姓名ElInput' },
    inputComponent: 'ElInput',
    inputProps: { type: 'text', placeholder: 'Please input' },
  },
  {
    itemProps: { prop: 'name', label: '姓名JSX' },
    inputComponent: () => <ElInput type="input" modelValue={config.form.model.name}></ElInput>,
    inputProps: { type: 'text', placeholder: 'Please input' },
  }
]
const formConfig: ElFormProps<FormType> = {
  model: { name: 'User Name' }
}
const config = reactive<VElFormProps<FormType>>({
  getInstance: (r: FormInstance) => {
    formRef.value = r
  },
  form: formConfig,
  fields: formFields
})



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

const Layout = (props: never, { slots }: SetupContext) => (
  <>
    <div class="header">{slots.header && slots.header()}</div>
    <div class="title">{slots.title && slots.title()}</div>
    <div class="filter">{slots.filter && slots.filter()}</div>
    <div class="btn">{slots.btn && slots.btn()}</div>
    <div class="table">{slots.table && slots.table()}</div>
    <div class="pagination">{slots.pagination && slots.pagination()}</div>
    <div class="footer">{slots.footer && slots.footer()}</div>
  </>
)


const disabled = ref(true)

setTimeout(() => {
  disabled.value = false
}, 1000)

const tablePlusConfig: VElTablePlusProps<TableDataItem, FormData> = reactive({
  title: '',
  query: (data: { currentPage: number }) => {
    // console.log('query', data)
    return Promise.resolve({
      payload: {
        data: Array.from(Array(10)).map((i, index) => {
          const n = (data.currentPage - 1) * 10 + index + 1
          return { id: n, value: `line ${n}` }
        }),
        total: 20,
        page: data.currentPage,
      },
      status: 'success', code: 0
    })
  },
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
      buttonProps: { disabled },
      events: { click: () => console.log('Hello world!') },
    },
    ['button', { class: 'el-button' }, 'remove'],
    () => <>
      <button class="el-button">hi</button>
    </>
  ],
  tableProps: { ...tableProps },
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
})

function MyInputString(props: { modelValue: string }, ctx: SetupContext) {
  return h('input', { value: props.modelValue, onInput: (e: Event & { target: { value: unknown } }) => ctx.emit('update:modelValue', e.target?.value) })
}
const name = ref('Han Meimei')
</script>

<template>
  <h2>MyInputString</h2>
  <MyInputString v-model="name" />
  <div>{{ name }}</div>

  <h2>TablePlus</h2>
  <TablePlus :title="tablePlusConfig.title" :form-props="tablePlusConfig.formProps"
    :table-props="tablePlusConfig.tableProps" :query="tablePlusConfig.query" :buttons="tablePlusConfig.buttons"
    :response-path="tablePlusConfig.responsePath">
  </TablePlus>
  <h2>TablePlus hideDefaultButton</h2>
  <TablePlus v-bind='tablePlusConfig' hideDefaultButton></TablePlus>
  <h2>TablePlus - 自定义布局</h2>
  <TablePlus v-bind='tablePlusConfig' :layout="Layout"></TablePlus>

  <h2>Table</h2>
  <Table :table="tableProps.table" :columns="tableProps.columns" :events="tableProps.events"></Table>

  <h2>Form</h2>
  <VElForm v-bind="config"></VElForm>
</template>
