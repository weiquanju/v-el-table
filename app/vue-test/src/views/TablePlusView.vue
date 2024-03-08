<script setup lang="tsx">
import { reactive } from 'vue'
import { ElButton } from 'element-plus'
import type { TableColumn, VElTablePlusProps } from 'v-el-table'
import type { ToProxy } from 'node_modules/v-el-table/interfaces';

interface TableData { id: number; value: string }

interface FormData { id: number }

const hideDefaultButton = ref(false)

setTimeout(() => {
  hideDefaultButton.value = true
}, 1000)


const tablePlusConfig: VElTablePlusProps<TableData, FormData> = {
  hideDefaultButton: hideDefaultButton as ToProxy<boolean>,
  title: 'My Table',
  query: (data: { currentPage: number }) => {
    console.log('query', data)
    return Promise.resolve({
      payload: {
        data: Array.from(Array(10)).map((i, index) => {
          const n = (data.currentPage - 1) * 10 + index + 1
          return { id: n, value: `line ${n}` }
        }),
        total: 20,
        page: data.currentPage
      },
      status: 'success',
      code: 0
    })
  },
  responsePath: {
    data: 'payload.data',
    currentPage: 'payload.page',
    total: 'payload.total'
  },
  buttons: [
    {
      key: 'add',
      name: 'create',
      icon: 'Plus',
      events: { click: () => console.log('To add one!') }
    },
    ['button', { class: 'el-button' }, 'del']
  ],
  tableProps: {
    table: {
      border: true,
      data: reactive([{ id: 1, value: 'Hello table!' }]),
      tableLayout: 'fixed' as 'fixed' | 'auto'
    },
    columns: [
      { prop: 'id', label: 'id' },
      { prop: 'value', label: 'Value' },
      {
        label: 'Operation',
        default: (scope: { row: TableData; column: TableColumn<TableData>; $index: number }) => {
          return (
            <ElButton text type="primary" onClick={() => console.log(scope.row)}>
              Edit
            </ElButton>
          )
        },
        header() {
          return 'Operation'
        }
      }
    ],
    events: {
      cellClick(...args: unknown[]) {
        console.log('cellClick', ...args)
      }
    }
  },
  formProps: {
    form: {
      model: {
        id: 1
      }
    },
    fields: [
      {
        itemProps: { prop: 'id', label: 'ID' },
        inputComponent: 'el-input',
        inputProps: { type: 'text', placeholder: 'Please input ID' },
        inputEvents: {}
      }
    ]
  }
}
</script>
<template>
  <VElTablePlus v-bind="tablePlusConfig" />
</template>