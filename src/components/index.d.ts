import { App } from 'vue'
import VElFrom from './form/interfaces'
import VElTable from './table/TableType'
import VElTablePlus from './tablePlus/tablePlusType'

function install(app: App<Element>, options: any): void

export default { install }

export { VElTable, VElFrom, VElTablePlus }
