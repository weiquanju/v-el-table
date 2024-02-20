/**
 *
 * @param {string} componentName
 * @returns
 */
function resolver(componentName: string) {
  //匹配v-el VEl vel VEL
  // eslint-disable-next-line no-useless-escape
  if (/^v\-?el\-?\w+/i.test(componentName) === false) {
    return
  }
  const resolveMap = new Map([
    ['Form', 'v-el-table/form'],
    ['Table', 'v-el-table/table'],
    ['TablePlus', 'v-el-table/table-plus'],
  ])
  //下划线风格转为驼峰
  const name = componentName.replace(/-(\w)/g, (m, m1) => m1.toUpperCase()).slice(3)
  if (resolveMap.has(name)) {
    const from = resolveMap.get(name)
    if (from) return { from, name: 'default' /*components/button.vue默认以default方式导出*/ }
  }
}

export default resolver
