
<a href="https://v-el-table.anbine.com/">
    <img src="./public/zip.png" height="48px" width="auto" alt="" />
</a>
<br/>
<a href="https://www.npmjs.com/package/v-el-table">
    <img src="https://img.shields.io/badge/npm-0.1.0--beta.43-brightgreen">
</a>


**V-El-Table** is a easy and rich **table** plugin by **Vue** witch is extends from **Element Plu**s.

## Getting Started

[Element Plus](https://element-plus.org) needs bot installed first. [How to install Element Plus?](https://element-plus.org/en-US/guide/installation.html)

install v-el-table

```sh
# Choose a package manager you like.

# NPM
$ npm install v-el-table --save

# Yarn
$ yarn add v-el-table

# pnpm
$ pnpm install v-el-table
```

## Features

- Configurable parameters
- Components: VElFormPlus, VElTable, VElTablePlus
- ES Module and CommonJS support
- Volar compatibility with type hints
- Automatic component import
- JSX friendly

## Usage

[中文文档](https://v-el-table.anbine.com/)

### v-el-form

```vue
<script setup lang="tsx">
import { reactive } from 'vue';
import { ElOption } from 'element-plus';
import type { FormItemProps, FormProps } from 'v-el-table/form/type';
import VElForm from 'v-el-table/form';

const configure: FormProps = reactive({
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
    ] as unknown as FormItemProps[]
})
</script>
<template>
    <VElForm v-bind="configure" />
</template>
```


### v-el-table

```vue
<script setup lang="tsx">
import { reactive } from 'vue';
import VELTable from 'v-el-table/table'
import type { TableColumn } from 'v-el-table/table/type';
import { ElButton } from 'element-plus';

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
```

### v-el-table-plus

```vue
<script setup lang="tsx">
import { reactive } from 'vue';
import { ElButton } from 'element-plus';
import type { FormProps } from './components/form/type';
import VElTablePlus from './components/tablePlus';
import type { TableColumn } from './components/table/type';
import type { TablePlusProps } from './components/tablePlus/type';

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
```

## Contribution

Please read [Contributing Guide](./.github/contributing.md).

## License

MIT

Copyright (c) 2021-present, Quanju Wei
