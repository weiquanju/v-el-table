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
    ['Form', { from: 'v-el-table', name: 'VElForm' }],
    ['Table', { from: 'v-el-table', name: 'VElTable' }],
    ['TablePlus', { from: 'v-el-table', name: 'VElTablePlus' }],
    ['TableTabs', { from: 'v-el-table', name: 'VElTableTabs' }]
  ])
  //下划线风格转为驼峰
  const name = componentName.replace(/-(\w)/g, (m, m1) => m1.toUpperCase()).slice(3)
  if (resolveMap.has(name)) {
    const resolve = resolveMap.get(name)
    if (resolve) return resolve
  }
}

export default resolver
