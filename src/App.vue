<script setup lang="tsx">
import Form from './components/form'
import { FormProps } from './components/form/interfaces'
import { reactive } from 'vue';
import { ElInput } from 'element-plus';
const config: FormProps = reactive({
  form: { model: { name: 'zhangsan', num: 1 } },
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
    }
  ]
})
</script>

<template>
  <Form v-bind="config"></Form>
</template>
