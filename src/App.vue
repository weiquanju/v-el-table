<script setup lang="tsx">
import Form from './components/form'
import Table from './components/table'
import { FormProps } from './components/form/interfaces'
import { reactive, ref } from 'vue';
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
</script>

<template>
  <Table v-bind="tableProps"></Table>
  <Form v-bind="config"></Form>
</template>
