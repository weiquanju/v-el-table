import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/components/index.ts'),
        form: path.resolve(__dirname, 'src/components/form/index.ts'),
        table: path.resolve(__dirname, 'src/components/table/index.ts'),
        utils: path.resolve(__dirname, 'src/components/utils/index.ts'),
        'table-plus': path.resolve(__dirname, 'src/components/tablePlus/index.ts'),
      },
      name: 'v-el-table',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const map: Record<string, 'cjs' | 'mjs'> = {
          commonjs: 'cjs',
          cjs: 'cjs',
          es: 'mjs',
          esm: 'mjs',
        }
        if (entryName === 'index') {
          return `${entryName}.${map[format]}`
        } else {
          return `${entryName}/index.${map[format]}`
        }
      },
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [/^@?vue/, /^@?element-plus/gi],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          '@element-plus/icons-vue': 'Icons',
          'element-plus/es/components/index': 'ElComponents',
          'element-plus': 'ElementPlus',
        },
        exports: 'named',
      },
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
})
