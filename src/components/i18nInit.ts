import { useGlobalConfig } from 'element-plus'
import { ref, Ref, toRef, watchEffect, WatchOptionsBase, WatchStopHandle } from 'vue'
import I18N from './I18N'

const local = (useGlobalConfig('locale') as Ref<{ name: string }> | undefined) || ref({ name: 'en' })
/*使用ElementPlus语言配置*/
export const lang: Ref<string> = toRef(local.value, 'name')

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
