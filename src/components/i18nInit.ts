import { configProviderContextKey, useGlobalConfig } from 'element-plus'
import { Ref, watchEffect, WatchOptionsBase, WatchStopHandle } from 'vue'
import I18N from './I18N'

/*使用ElementPlus语言配置*/
const lang: Ref<string> = useGlobalConfig(configProviderContextKey as any, 'en')

// 加载后，开始监听
let stopHandle: WatchStopHandle | undefined = undefined
if (!stopHandle) {
  stopHandle = watchEffect(
    () => {
      I18N.setLocale(lang.value)
    },
    { immediate: true } as WatchOptionsBase,
  )
}
