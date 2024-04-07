import type { App } from 'vue'
import VElForm from './form'
import VElTable from './table'
import VElTablePlus from './table-plus'


export * from './utils'
export * from './auto-import'

export type * from './form/type'
export type * from './table/type'
export type * from './table-plus/type'
export type * from './table-tabs/type'
export type * from './table-plus/default-button-type'
export * from './table-plus/config'
export * from './table-plus/default-button'
export * from './table-plus/default-layout'

export { default as VElForm } from './form'
export { default as VElTable } from './table'
export { default as VElTablePlus }  from './table-plus'
export { default as VElTableTabs }  from './table-tabs'

export default {
  install: <Options extends { [k in string]: string | number }>(app: App<Element>, options?: Options) => {
    app.component('VElForm', VElForm)
    app.component('VElTable', VElTable)
    app.component('VElTablePlus', VElTablePlus)
  },
}
