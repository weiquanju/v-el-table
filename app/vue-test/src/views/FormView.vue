<script setup lang="tsx">
import { reactive } from 'vue';
import { ElOption } from 'element-plus';
import type { VElFormProps } from 'v-el-table';

const configure: VElFormProps = reactive({
    form: {
        model: {
            name: 'v-el-table',
            components: 'small'
        },
        labelWidth: 100
    },
    fields: [
        {
            itemProps: { prop: 'name', label: 'Name' },
            inputComponent: 'el-input',
            inputProps: { type: 'text', placeholder: 'Please input' },
            inputEvents: {
                change: (...args: unknown[]) => console.log(...args)
            }
        },
        {
            itemProps: { prop: 'components', label: 'Components' },
            inputComponent: 'ElSelect',
            inputProps: { type: 'text', placeholder: 'Please Select a component' },
            inputEvents: {
                change: (...args: unknown[]) => console.log(...args)
            },
            inputChildren: () => <>{['v-el-form', 'v-el-table', 'v-el-table-plus'].map((val) =>
                <ElOption
                    label={val}
                    value={val}
                />)}</>
        }
    ]
})
</script>
<template>
    <VElForm v-bind="configure" />
</template>