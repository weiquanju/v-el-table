declare class I18N {
    locale: import("vue").Ref<string>;
    translations: {
        [key: string]: {
            [key: string]: string;
        };
    };
    constructor(locale: string);
    getTranslation(key: string): import("vue").ComputedRef<string>;
    t(key: string): import("vue").ComputedRef<string>;
    getLocale(): import("vue").Ref<string>;
    setLocale(locale: string): void;
    setTranslations(translations: {
        [key: string]: {
            [key: string]: string;
        };
    }): void;
    setLocalization(localization: {
        [key: string]: string;
    }): void;
    setTranslationByLocale(locale: string, translation: {
        [key: string]: string;
    }): void;
}
export declare const i18n: I18N;
export {};
