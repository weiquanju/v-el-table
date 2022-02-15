import VElFrom, { ElFormProps, ElFormItemProps, FormProps, ComponentName } from './components/form/interfaces.ts'
import TableBasic, { FormatterArgArray, FormatterArgObject, TableBasicProps, ColumnSlots, Slots, Slot } from './components/table/TableType.ts'
import TablePlus, { TablePlusProps, QueryFnType, DataPath, PaginationProps } from './components/tablePlus/tablePlusType.ts'
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

export default { VElTable, VElFrom, VElTablePlus }
