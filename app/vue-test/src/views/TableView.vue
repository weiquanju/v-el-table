<script setup lang="tsx">
import type { TableColumn } from 'node_modules/v-el-table/table/type';

type DataType = { id: number; value: string }
const tableProps = reactive({
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
                return <ElButton text type="primary" onClick={() => console.log('To Edit',scope.row)}>Edit</ElButton>
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
})
</script>
<template>
    <VELTable v-bind="tableProps" />
</template>