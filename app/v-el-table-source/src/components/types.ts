declare module 'vue' {
  export interface GlobalComponents {
    VElForm: (typeof import('./form'))['default']
    VElTable: (typeof import('./table'))['default']
    VElTablePlus: (typeof import('./table-plus'))['default']
  }
}

export {}
