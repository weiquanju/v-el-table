import type { App } from 'vue';
import VElForm from './form';
import VElTable from './table';
import VElTablePlus from './table-plus';
declare const _default: {
    install: <Options extends {
        [x: string]: string | number;
    }>(app: App<Element>, options?: Options | undefined) => void;
};
export default _default;
export { VElForm, VElTable, VElTablePlus };
