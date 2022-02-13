import { onMounted, onUnmounted, reactive, ref, SetupContext } from 'vue'
import style from './defaultLayout.module.css'
import './defaultLayout.css'
export const LayoutDefault = (props: never, { slots }: SetupContext) => {
  const box = ref(null as null | HTMLDivElement)
  const resize = () => {
    if (!box.value?.offsetWidth) return
    const { style } = box.value
    style.setProperty('--tp-column-num', Math.floor(box.value?.offsetWidth / 300).toString())
  }
  window.addEventListener('resize', resize)
  onMounted(resize)
  onUnmounted(() => {
    window.removeEventListener('resize', resize)
  })
  return (
    <>
      <div class={style.tp}>
        <div class={style.tpHeader}>
          <div class={style.tpTitle}>{slots.title && slots.title()}</div>
          <div class={style.tpBtn}>{slots.btn && slots.btn()}</div>
        </div>
        <div class="tp_filter_x001" ref={box}>
          {slots.filter && slots.filter()}
        </div>
        <div class={style.tpTable}>{slots.table && slots.table()}</div>
        <div class={style.tpPagination}>{slots.pagination && slots.pagination()}</div>
      </div>
    </>
  )
}
