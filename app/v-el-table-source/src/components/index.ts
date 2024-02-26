import type { App } from 'vue'
import VElForm from './form'
import VElTable from './table'
import VElTablePlus from './table-plus'

export * from './form'
export * from './table'
export * from './utils'
export * from './table-plus'
export * from './auto-import'

export default {
  install: <Options extends { [k in string]: string | number }>(app: App<Element>, options?: Options) => {
    app.component('VElForm', VElForm)
    app.component('VElTable', VElTable)
    app.component('VElTablePlus', VElTablePlus)
  },
}
