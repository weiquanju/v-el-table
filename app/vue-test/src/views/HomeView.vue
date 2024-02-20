
<script setup lang="tsx">
import { reactive } from 'vue';
import { ElButton } from 'element-plus';
import VElTablePlus, { type TablePlusProps } from 'v-el-table/table-plus';
import type { TableColumn } from 'node_modules/v-el-table/table/type';
import type { FormProps } from 'node_modules/v-el-table/form/type';

type DataType = { id: number; value: string }

const tablePlusConfig = reactive<TablePlusProps>({
  title: '',
  query: (data: { currentPage: number }) => {
    console.log('query', data)
    return Promise.resolve({
      payload: {
        data: Array.from(Array(10)).map((i, index) => {
          const n = (data.currentPage - 1) * 10 + index + 1
          return { id: n, value: `line ${n}` }
        }),
        total: 20,
        page: data.currentPage,
      }, status: 'success', code: 0
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
      name: 'create',
      icon: 'Plus',
      events: { click: () => console.log('To add one!') },
    },
    ['button', { class: 'el-button' }, 'del']
  ],
  tableProps: {
    table: {
      border: true,
      data: [{ id: 1, value: 'Hello table!' } as DataType], tableLayout: 'fixed' as 'fixed' | 'auto'
    },
    columns: [
      { prop: 'id', label: 'id' },
      { prop: 'value', label: 'Value' },
      {
        prop: 'end',
        label: 'Operation',
        default: (scope: { row: DataType, column: TableColumn<DataType>, $index: number }) => {
          return <ElButton text type="primary" onClick={() => console.log(scope.row)}>Edit</ElButton>
        },
        header() {
          return 'Operation'
        }
      }
    ] as TableColumn[],
    events: {
      cellClick(...args: unknown[]) {
        console.log('cellClick', ...args)
      }
    }
  },
  formProps: {
    form: {
      model: {
        id: '1',
      }
    },
    fields: [
      {
        itemProps: { prop: 'id', label: 'ID' },
        inputComponent: 'el-input',
        inputProps: { type: 'text', placeholder: 'Please input ID' },
        inputEvents: {}
      },
    ]
  } as unknown as FormProps
})

</script>
<template>
  <VElTablePlus v-bind="tablePlusConfig" />
</template>