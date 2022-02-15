import { App } from 'vue'
import VElFrom, { ElFormProps, ElFormItemProps, FormProps, ComponentName } from './components/form/interfaces'
import TableBasic, { FormatterArgArray, FormatterArgObject, TableBasicProps, ColumnSlots, Slots, Slot } from './components/table/TableType'
import TablePlus, { TablePlusProps, QueryFnType, DataPath, PaginationProps } from './components/tablePlus/tablePlusType'
export declare namespace VElTable {
  export default TableBasic
  export { FormatterArgArray, FormatterArgObject, TableBasicProps, ColumnSlots, Slots, Slot }
}

export declare namespace VElFrom {
  export default VElFrom
  export { ElFormProps, ElFormItemProps, FormProps, ComponentName }
}

export declare namespace VElTablePlus {
  export default TablePlus
  export { TablePlusProps, QueryFnType, DataPath, PaginationProps }
}

export { VElTable, VElFrom, VElTablePlus }

export default (app: App<Element>, options: any) => void 0
