import { App } from 'vue'
import HelloWorld from './HelloWorld.vue'

export default {
  install: (app: App<Element>, options: any) => {
    app.provide('HelloWorld', options)
    app.component('HelloWorld', HelloWorld)
  },
}
