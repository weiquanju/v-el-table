import { h, isReactive, isRef, reactive, unref } from 'vue'
import type { ToRef, ToRefRecord } from '../interfaces'
import { dataPath, paginationDefault } from './config'
import type { PaginationProps, ResponsePathType } from './type'
import {
  at,
  getDefaultButtons,
  type ButtonType,
  type VElFormProps,
  type VElTableProps,
  unRefRecord
} from '..'
import { ElButtonGroup } from 'element-plus'
import Form from '../form'

export const getPagination = (
  query: () => Promise<void>,
  propsPagination?:  Partial<ToRefRecord<PaginationProps>>
) => {
  const pagination = reactive(
    Object.assign({ ...paginationDefault }, propsPagination, {
      onSizeChange(size: number) {
        if (pagination.pageSize !== size) {
          pagination.pageSize = size
          query()
        }
      },
      'onUpdate:page-size'(size: number) {
        if (pagination.pageSize !== size) {
          pagination.pageSize = size
          query()
        }
      },
      onCurrentChange(page: number) {
        if (pagination.currentPage !== page) {
          pagination.currentPage = page
          query()
        }
      },
      'onUpdate:current-page'(page: number) {
        if (pagination.currentPage !== page) {
          pagination.currentPage = page
          query()
        }
      }
    })
  )
  return pagination
}

export const checkResponse = (data: any, responsePath?: ResponsePathType) => {
  // 文件路径配置
  const path = Object.assign({}, dataPath, responsePath)
  const res = at<unknown[]>(path.data, data) || []
  const total = at<number>(path.total, data) || 0
  const currentPage = at<number>(path.currentPage, data) || 1

  if (total === undefined || total === null || isNaN(total)) {
    console.warn(`merged path data`, JSON.stringify(path))
    throw new Error(
      'Get `total` param error when query data.Please check VElTablePlus configuration parameter `responsePath`.'
    )
  }
  if (currentPage === undefined || currentPage === null || isNaN(currentPage)) {
    console.warn(`merged path data`, JSON.stringify(path))
    throw new Error(
      'Get `currentPage` param error when query data.Please check VElTablePlus configuration parameter `responsePath`.'
    )
  }
  if (res === undefined || res === null) {
    console.warn(`merged path data`, JSON.stringify(path))
    throw new Error(
      'Get `data` param error when query data.Please check VElTablePlus configuration parameter `responsePath`.'
    )
  }

  return { total, res, currentPage }
}

export const checkTableData = <TableDataItem>(tableProps: VElTableProps<TableDataItem>) => {
  if (!tableProps.table) {
    tableProps.table = {}
  }
  if (!tableProps.table.data) {
    tableProps.table.data = [] as TableDataItem[]
  }
  const { data } = tableProps.table
  if (!isReactive(data) || !isRef(data)) {
    tableProps.table.data = reactive(data) as TableDataItem[]
  }
}

export const getTableHeaderSlots = <FormData extends object = object>(
  query: () => Promise<void>,
  reset: () => void,
  formProps?: VElFormProps<FormData>,
  title?: ToRef<string> | string,
  buttons?: ButtonType[],
  hideDefaultButton?: ToRef<boolean>
) => {
  return {
    title: () => unref(title),
    btn: () =>
      h(ElButtonGroup, null, {
        default: () =>
          getDefaultButtons({
            hideDefaultButton: hideDefaultButton,
            buttons: buttons,
            query,
            reset
          })
      }), //查询 重置 查询配置 表格配置 表格导出 收起/展开 新增 编辑 删除
    filter: () => (!formProps ? null : h(Form, unRefRecord(formProps) as any))
  }
}
