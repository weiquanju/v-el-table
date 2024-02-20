import Components from 'unplugin-vue-components/vite'
import VElTableComponents from 'v-el-table/auto-import'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Components({
      resolvers: [VElTableComponents, ElementPlusResolver()]
    })
  ]
})
