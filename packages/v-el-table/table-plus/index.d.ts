import { type FunctionalComponent } from 'vue';
import type { TablePlusProps } from './type';
export type * from './type';
export * from './config';
export * from './default-button';
export * from './default-layout';
/**
 * @todo feat:
 * 支持单元格编辑
 * 支持CURD
 * 组件插槽支持
 */
declare const VElTablePlus: FunctionalComponent<TablePlusProps>;
export default VElTablePlus;
