<script setup lang="tsx">
import type { VElTableProps } from 'v-el-table';
import { ElButton } from 'element-plus'

interface TableData { id: number; value: string }

const idLabel = ref('id')

setTimeout(() => {
    idLabel.value = 'ID'
}, 1000)


const data = reactive([{ id: 1, value: 'Hello table!' }])

const tableProps: VElTableProps<TableData> = {
    table: {
        border: true,
        data,
        tableLayout: 'fixed'
    },
    columns: [
        { prop: 'id', label: idLabel },
        { prop: 'value', label: 'Value' },
        {
            prop: 'end',
            label: 'Operation',
            default: (props) => {
                return <ElButton text type="primary" onClick={() => console.log('To Edit', props.row)}>Edit</ElButton>
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
}
</script>
<template>
    <VElTable v-bind="tableProps" />
</template>