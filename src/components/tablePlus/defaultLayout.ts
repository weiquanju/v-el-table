import { h, nextTick, ref, SetupContext } from 'vue'
import style from './defaultLayout.module.css'
import './defaultLayout.css'
export const LayoutDefault = (props: never, { slots }: SetupContext) => {
  nextTick(() => {
    init()
  })
  const box = ref(null as null | HTMLDivElement)

  const init = () => {
    if (!box.value?.offsetWidth) {
      return
    }

    const resize = () => {
      if (!box.value) return
      const { style } = box.value
      const columnNum = Math.floor(box.value?.offsetWidth / 300)
      style.setProperty('--tp-column-num', columnNum.toString())
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(box.value)
  }

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
