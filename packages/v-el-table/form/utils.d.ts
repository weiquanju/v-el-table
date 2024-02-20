import type { FormProps, FormItemProps, ComponentName } from './type';
export declare const isComponentName: (name: string) => name is ComponentName;
export declare const inputRender: (field: FormItemProps, formProps: FormProps) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
