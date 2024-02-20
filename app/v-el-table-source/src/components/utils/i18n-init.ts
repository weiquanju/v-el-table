// import { useGlobalConfig } from 'element-plus'
import { ref, type Ref, watchEffect, type WatchOptionsBase, type WatchStopHandle } from 'vue'
import { i18n } from './I18N'

// const local: Ref<any> = useGlobalConfig('locale') || ref({ name: '' })
/*使用ElementPlus语言配置*/
export const lang: Ref<string> = ref('en')

// 加载后，开始监听
let stopHandle: WatchStopHandle | undefined = undefined

export const watchLang = ()=>{
  if (!stopHandle) {
    stopHandle = watchEffect(
      () => {
        i18n.setLocale(lang.value)
      },
      { immediate: true } as WatchOptionsBase,
    )
  }
}

export const stopWatchLang = () => {
  if (stopHandle) {
    stopHandle()
  }
}