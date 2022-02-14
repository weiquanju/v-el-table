<script setup lang="tsx">
import Form from './components/form'
import Table from './components/table'
import TablePlus from './components/tablePlus'
import { FormProps } from './components/form/interfaces'
import { reactive, ref, SetupContext } from 'vue';
import { ElInput } from 'element-plus';

const model = ref({ name: 'zhangsan', num: 1 })
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
      inputComponent: ElInput,
      inputProps: { type: 'text', placeholder: 'Please input' },
      inputEvents: {
        change: (...args: any) => console.log(...args)
      }
    },
    {
      itemProps: { prop: 'name', label: '姓名' },
      inputComponent: <ElInput type="input" modelValue={model.value.name}></ElInput>,
      inputProps: { type: 'text', placeholder: 'Please input' },
      inputEvents: {
        change: (...args: any) => console.log(...args)
      }
    }
  ]
} as FormProps)

const tableProps = reactive({
  table: { data: [{ id: 1, value: 'Hello table!' }] },
  columns: [
    { prop: 'id', label: 'id' },
    { prop: 'value', label: '值' },
    { prop: 'end', label: '操作' }
  ],
  columnSlots: {
    end: {
      default: (scope: { row: any, column: any, $index: number }) => {
        return <button onClick={() => console.log(scope)}>click</button>
      }
    }
  }
})

const Layout = (props: never, { slots }: SetupContext) => (
  <>
    <div class="header">{slots.header && slots.header()}</div>
    <div class="title">{slots.title && slots.title()}</div>
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


const tablePlusConfig = reactive({
  query: (data: any) => {
    console.log('query', data)
    return Promise.resolve({
      data: [{ id: 1, value: 'Hello list item!' }],
      total: 40,
      page: data.currentPage,
    })
  },
  responsePath: 'data',
  buttons: {
    //query:'查询',reset:'重置'
  },
  tableProps: {
    table: { data: [{ id: 1, value: 'Hello table!' }] } as Response<TestDataType>,
    columns: [
      { prop: 'id', label: 'id' },
      { prop: 'value', label: '值' },
      { prop: 'end', label: '操作' }
    ],
    columnSlots: {
      end: {
        default: (scope: { row: any, column: any, $index: number }) => {
          return <button onClick={() => console.log(scope)}>click</button>
        }
      }
    }
  },
  formProps: {
    form: {
      model: {
        id:'1',
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
</script>

<template>
  <TablePlus v-bind="tablePlusConfig">Hello</TablePlus>
  <!--@todo markdown文档方式展示说明示例。目前使用 hr 进行特性示例分割 -->
  <hr/>
  <TablePlus :layout="Layout" v-bind="tablePlusConfig">Hello</TablePlus>
  <hr/>
  <Table v-bind="tableProps"></Table>
  <hr/>
  <Form v-bind="config"></Form>
</template>
