import type { TabPaneName } from 'element-plus'
import type { PaginationProps, VElTablePlusProps } from '../table-plus/type'
import type { VElTabListItem } from './tabs'
import type { VElTableProps } from '../table/type'
import type {
  GenericCommonType,
  GenericCtx,
  GenericRenderNodeType,
  GenericReturnInstance,
  ToRefRecord
} from '../interfaces'
import type { ToRef } from 'vue'

export interface TabItem<TableDataItem> extends VElTabListItem, VElTableProps<TableDataItem> {
  queryParams?: any
  pagination?: Partial<ToRefRecord<PaginationProps>>
}

export declare interface VElTableTabsProps<TableDataItem, FormData extends object = object>
  extends Omit<
    VElTablePlusProps<TableDataItem, FormData>,
    'tableProps' | 'queryParams' | 'pagination'
  > {
  tabs: TabItem<TableDataItem>[]
  tabsCurrent: ToRef<TabPaneName> | TabPaneName
  tabsQueryKey: ToRef<string> | string
}

export declare type VElGenericTableTabs = <T, FormData extends object = object>(
  props: VElTableTabsProps<T, FormData> & GenericCommonType,
  ctx?: GenericCtx,
  expose?: (exposed: import('vue').ShallowUnwrapRef<{}>) => void,
  setup?: Promise<GenericReturnInstance<VElTableTabsProps<T, FormData>>>
) => GenericRenderNodeType & {
  __ctx?: GenericReturnInstance<VElTableTabsProps<T, FormData>>
}
