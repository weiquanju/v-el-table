<script setup lang="tsx">
import Form from './components/form'
import Table from './components/table'
import TablePlus from './components/tablePlus'
import { FormProps } from './components/form/index.d'
import { h, reactive, ref, SetupContext } from 'vue'
import { ElInput } from 'element-plus'
import { TableColumn } from './components/table/index.d'
import { TablePlusProps } from './components/tablePlus/index.d'



const model = ref({ name: 'User Name', num: 1 })
const config = reactive({
  form: {
    model: model
  },
  fields: [
    {
      itemProps: { prop: 'name', label: '姓名' },
      inputComponent: 'el-input',
      inputProps: { type: 'text', placeholder: 'Please input' },
      inputEvents: {
        change: (...args: any) => console.log(...args)
      }
    },
    {
      itemProps: { prop: 'name', label: '姓名' },
      inputComponent: 'ElInput',
      inputProps: { type: 'text', placeholder: 'Please input' },
      inputEvents: {
        change: (...args: any) => console.log(...args)
      }
    },
    {
      itemProps: { prop: 'name', label: '姓名' },
      inputComponent: () => <ElInput type="input" modelValue={model.value.name}></ElInput>,
      inputProps: { type: 'text', placeholder: 'Please input' },
      inputEvents: {
        change: (...args: any) => console.log(...args)
      }
    }
  ]
} as unknown as FormProps)


type DataType = { id: number; value: string }
const tableProps = reactive({
  table: { data: [{ id: 1, value: 'Hello table!' } as DataType], tableLayout: 'fixed' as 'fixed' | 'auto' },
  columns: [
    { prop: 'id', label: 'id' },
    { prop: 'value', label: '值' },
    {
      prop: 'end', label: '操作', default: (scope: { row: DataType, column: TableColumn<DataType>, $index: number }) => {
        return <button onClick={() => console.log(scope)}>click</button>
      }, header() {
        return 'hello'
      }
    }
  ] as TableColumn<DataType>[],
  events: {
    cellClick(...args: any[]) {
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

interface TestDataType {
  id: number;
  value: string;
}
interface Response<Data> { data: Data[] }


const tablePlusConfig = reactive<TablePlusProps<DataType>>({
  title: '',
  query: (data: any) => {
    console.log('query', data)
    return Promise.resolve({
      data: [{ id: 1, value: 'Hello list item!' }],
      total: 40,
      page: data.currentPage,
    })
  },
  includeButtons: ['query'],
  responsePath: 'data',
  buttons: [
    {
      key: 'add',
      name: '新增',
      icon: 'CircleClose',
      events: { click: () => console.log('Hello world!') },
    },
    { key: 'remove', nodeParams: ['button', { class: 'el-button' }, 'remove'] }
  ],
  tableProps,
  formProps: {
    form: {
      model: {
        id: '1',
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
  } as FormProps
})

function MyInputString(props: { modelValue: string }, ctx: SetupContext) {
  return h('input', { value: props.modelValue, onInput: (e: any) => ctx.emit('update:modelValue', e.target.value) })
}
const name = ref('Han Meimei')
</script>

<template>
  <h2>MyInputString</h2>
  <MyInputString v-model="name" />
  <div>{{ name }}</div>

  <h2>TablePlus</h2>
  <TablePlus
:title="tablePlusConfig.title" :form-props="tablePlusConfig.formProps"
    :table-props="tablePlusConfig.tableProps" :query="tablePlusConfig.query"
    :response-path="tablePlusConfig.responsePath" :buttons="tablePlusConfig.buttons"></TablePlus>

  <h2>TablePlus - 自定义布局</h2>
  <TablePlus v-bind='tablePlusConfig' :layout="Layout" hidden-default-button></TablePlus>

  <h2>Table</h2>
  <Table :table="tableProps.table" :columns="tableProps.columns" :events="tableProps.events"></Table>

  <h2>Form</h2>
  <Form v-bind="config"></Form>
</template>
