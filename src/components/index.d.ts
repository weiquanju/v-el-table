import { App } from 'vue'
import VElForm from './form'
import VElTable from './table'
import VElTablePlus from './tablePlus'

interface VElTablePlugin {
  install: (app: App<Element>, options: any) => void
}

export default VElTablePlugin

export { VElForm, VElTable, VElTablePlus }
declare module 'v-el-table' {
  export const VElForm: VElForm
  export const VElTable: VElTable
  export const VElTablePlus: VElTablePlus
}
