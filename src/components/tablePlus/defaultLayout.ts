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

  return h('div', { class: [style.tp, 'v-el-table'] }, [
    h('div', { class: [style.tpHeader, 'v-el-table-header'] }, [
      h('div', { class: [style.tpTitle, 'v-el-table-title'] }, [slots.title && slots.title()]),
      h('div', { class: [style.tpBtn, 'v-el-table-button'] }, [slots.btn && slots.btn()]),
    ]),
    h('div', { class: ['tp_filter_x001', 'v-el-table-filter'], ref: box }, [slots.filter && slots.filter()]),
    h('div', { class: [style.tpTable, 'v-el-table-main'] }, [slots.table && slots.table()]),
    h('div', { class: [style.tpPagination, 'v-el-table-pagination'] }, [slots.pagination && slots.pagination()]),
  ])
}
