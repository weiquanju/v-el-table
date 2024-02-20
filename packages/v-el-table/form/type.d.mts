import type { Slot, VNode } from 'vue';
import type { EventsHandlers, ComponentType } from '../interfaces';
import type { ElFormProps, ElFormItemProps } from './type-fix';
export declare type ElFormItemSlots = {
    label?: Slot;
    error?: Slot;
};
export declare type FormItemProps = {
    itemProps?: ElFormItemProps & ElFormItemSlots;
    inputProps?: Record<string, unknown>;
    inputComponent: ComponentType;
    inputEvents?: EventsHandlers;
    inputChildren?: string | VNode[] | (() => VNode[] | VNode);
    visible?: boolean;
    remoteHandler?: <Return = Promise<unknown>>(itemContext: FormItemProps) => Return;
    remoteParams?: object;
} & Record<string, unknown>;
export declare type FormProps = {
    form: ElFormProps;
    events?: EventsHandlers;
    fields: FormItemProps[];
};
export declare type ComponentName = 'ElCalendar' | 'ElSelect' | 'ElInput' | 'ElSwitch' | 'ElCheckboxGroup' | 'ElCheckbox' | 'ElTimeSelect' | 'ElTimePicker' | 'ElDatePicker' | 'ElRadioGroup' | 'ElSlider' | 'ElColorPicker';
