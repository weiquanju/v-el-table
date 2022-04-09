import { h, onMounted, onUnmounted, reactive, ref, SetupContext } from 'vue'
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
  return h('div', { class: style.tp }, [
    h('div', { class: style.tpHeader }, [
      h('div', { class: style.tpTitle }, [slots.title && slots.title()]),
      h('div', { class: style.tpBtn }, [slots.btn && slots.btn()]),
    ]),
    h('div', { class: 'tp_filter_x001', ref: box }, [slots.filter && slots.filter()]),
    h('div', { class: style.tpTable }, [slots.table && slots.table()]),
    h('div', { class: style.tpPagination }, [slots.pagination && slots.pagination()]),
  ])
}
