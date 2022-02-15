import { App } from 'vue'
import VElFrom from './components/form/interfaces'
import VElTable from './components/table/TableType'
import VElTablePlus from './components/tablePlus/tablePlusType'

function install(app: App<Element>, options: any): void

export default { install }

export { VElTable, VElFrom, VElTablePlus }
