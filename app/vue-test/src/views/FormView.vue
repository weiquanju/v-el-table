<script setup lang="tsx">
import { reactive } from 'vue';
import { ElOption, type FormInstance } from 'element-plus';
import type { VElFormProps } from 'v-el-table';

const formRef = ref<FormInstance>()

const model = reactive({
    name: 'v-el-table',
    components: 'small'
})

const labelWidth = ref(100)

setTimeout(() => {
    labelWidth.value = 200
}, 1000)

const configure: VElFormProps = {
    getInstance: (r: FormInstance) => (formRef.value = r),
    form: {
        model,
        labelWidth,
    },
    fields: [
        {
            itemProps: { prop: 'name', label: 'Name' },
            inputComponent: 'el-input',
            inputProps: { type: 'text', placeholder: 'Please input' },
            inputEvents: {
                change: (...args: unknown[]) => console.log(formRef.value, ...args)
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
}
</script>
<template>
    <VElForm v-bind="configure" />
</template>