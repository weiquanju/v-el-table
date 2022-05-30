// import { useGlobalConfig } from 'element-plus'
import { ref, Ref, watchEffect, WatchOptionsBase, WatchStopHandle } from 'vue'
import I18N from './I18N'

// const local: Ref<any> = useGlobalConfig('locale') || ref({ name: '' })
/*使用ElementPlus语言配置*/
export const lang: Ref<string> = ref('en')

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
