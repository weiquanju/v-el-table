import { App } from 'vue'
import VElFrom from './form/interfaces'
import VElTable from './table/index.d'
import VElTablePlus from './tablePlus/index'

interface VElTablePlugin {
  install: (app: App<Element>, options: any) => void
}

export default VElTablePlugin

export { VElTable, VElFrom, VElTablePlus }
