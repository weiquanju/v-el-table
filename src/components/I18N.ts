import { computed, reactive, ref } from 'vue'

class I18N {
  locale = ref('en')
  translations: { [key: string]: { [key: string]: string } }
  constructor(locale: string) {
    this.locale.value = locale
    this.translations = reactive({
      en: {
        reset: 'reset',
        query: 'query',
      },
      'zh-cn': {
        reset: '重置',
        query: '查询',
      },
    })
  }
  getTranslation(key: string) {
    return computed(() => this.translations[this.locale.value][key])
  }
  t(key: string) {
    return this.getTranslation(key)
  }
  getLocale() {
    return this.locale
  }
  setLocale(locale: string) {
    this.locale.value = locale
  }
  setTranslations(translations: { [key: string]: { [key: string]: string } }) {
    for (const locale in translations) {
      this.translations[locale] = translations[locale]
    }
  }
  setLocalization(localization: { [key: string]: string }) {
    this.translations[this.locale.value] = localization
  }
  setTranslationByLocale(locale: string, translation: { [key: string]: string }) {
    this.translations[locale] = translation
  }
}

export default new I18N('en')
