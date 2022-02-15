import { App, FunctionalComponent } from 'vue'
import VElForm from './form'
import VElTable from './table'
import VElTablePlus from './tablePlus'

export default {
  install: (app: App<Element>, options: any) => {
    app.component('VElForm', VElForm)
    app.component('VElTable', VElTable as FunctionalComponent)
    app.component('VElTablePlus', VElTablePlus as FunctionalComponent)
  },
}

export { VElForm, VElTable, VElTablePlus }
