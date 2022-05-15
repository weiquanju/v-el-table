import { App } from 'vue'
import VElForm from '../src/components/form'
import VElTable from '../src/components/table'
import VElTablePlus from '../src/components/tablePlus'

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
