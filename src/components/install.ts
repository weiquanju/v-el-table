import { App, FunctionalComponent } from 'vue'
import HelloWorld from './HelloWorld.vue'
import VElForm from './form'
import VElTable from './table'
import VElTablePlus from './tablePlus'

export { VElForm, VElTable, VElTablePlus }

export default {
  install: (app: App<Element>, options: any) => {
    app.provide('HelloWorld', options)
    app.component('HelloWorld', HelloWorld)
    app.component('VElForm', VElForm)
    app.component('VElTable', VElTable as FunctionalComponent)
    app.component('VElTablePlus', VElTablePlus as FunctionalComponent)
  },
}
