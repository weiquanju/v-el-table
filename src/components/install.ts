import { App, FunctionalComponent } from 'vue'
import HelloWorld from './HelloWorld.vue'
import Form from './form'
import Table from './table'
import TablePlus from './tablePlus'

export default {
  install: (app: App<Element>, options: any) => {
    app.provide('HelloWorld', options)
    app.component('HelloWorld', HelloWorld)
    app.component('VElForm', Form)
    app.component('VElTable', Table as FunctionalComponent)
    app.component('VElTablePlus', TablePlus as FunctionalComponent)
  },
}
