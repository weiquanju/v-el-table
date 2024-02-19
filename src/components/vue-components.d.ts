declare module 'vue' {
  export interface GlobalComponents {
    VElForm: (typeof import('../src/components/form'))['default']
    VElTable: (typeof import('../src/components/table'))['default']
    VElTablePlus: (typeof import('../src/components/tablePlus'))['default']
  }
}

export {}
