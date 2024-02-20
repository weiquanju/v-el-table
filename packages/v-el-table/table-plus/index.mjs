import { nextTick as d, ref as P, h as r, isRef as b, reactive as v } from "vue";
import { ElButton as y, ElButtonGroup as h, ElPagination as w } from "element-plus";
import _ from "../form/index.mjs";
import T from "../table/index.mjs";
import { i18n as m, resetValue as S, eventsTransform as z, toCamelCaseProp as E, at as g } from "../utils/index.mjs";
import * as B from "@element-plus/icons-vue";
const k = {
  currentPage: 1,
  pageSizes: [10, 20, 30, 40, 50],
  pageSize: 10,
  layout: "total, sizes, prev, pager, next, jumper",
  total: 0
}, q = {
  data: "data",
  currentPage: "page",
  total: "total"
}, N = "_tp_iw8wy_1", O = "_tpHeader_iw8wy_11", C = "_tpTitle_iw8wy_19", V = "_tpBtn_iw8wy_25", x = "_tpTable_iw8wy_33", G = "_tpPagination_iw8wy_39", s = {
  tp: N,
  tpHeader: O,
  tpTitle: C,
  tpBtn: V,
  tpTable: x,
  tpPagination: G
}, H = (i, { slots: e }) => {
  d(() => {
    n();
  });
  const o = P(null), n = () => {
    var t;
    if (!((t = o.value) != null && t.offsetWidth))
      return;
    const a = () => {
      var l;
      if (!o.value)
        return;
      const { style: c } = o.value, u = Math.floor(((l = o.value) == null ? void 0 : l.offsetWidth) / 300);
      c.setProperty("--tp-column-num", u.toString());
    };
    new ResizeObserver(a).observe(o.value);
  };
  return r("div", { class: [s.tp, "v-el-table"] }, [
    r("div", { class: [s.tpHeader, "v-el-table-header"] }, [
      r("div", { class: [s.tpTitle, "v-el-table-title"] }, [e.title && e.title()]),
      r("div", { class: [s.tpBtn, "v-el-table-button"] }, [e.btn && e.btn()])
    ]),
    r("div", { class: ["tp_filter_x001", "v-el-table-filter"], ref: o }, [e.filter && e.filter()]),
    r("div", { class: [s.tpTable, "v-el-table-main"] }, [e.table && e.table()]),
    r("div", { class: [s.tpPagination, "v-el-table-pagination"] }, [e.pagination && e.pagination()])
  ]);
}, j = ({ name: i, icon: e, events: o = {}, buttonProps: n = {} }) => r(
  y,
  { ...z(o), ...n },
  {
    icon: () => r(B[e]),
    default: () => b(i) ? i.value : i
  }
), D = ({ props: i, query: e }) => [...[
  {
    key: "query",
    name: m.t("query"),
    icon: "Search",
    events: {
      click: e
    }
  },
  {
    key: "reset",
    name: m.t("reset"),
    icon: "CircleClose",
    events: { click: () => S(i.formProps.form.model) }
  }
], ...i.buttons || []].map((n) => {
  if (Array.isArray(n)) {
    const [a, ...p] = n;
    return r(a, ...p);
  }
  return j(n);
}), W = function(i) {
  const e = E(i), o = () => ({
    pageSize: a.pageSize,
    currentPage: a.currentPage,
    ...e.formProps.form.model,
    ...e.queryParams || {}
  }), n = async () => {
    const t = Object.assign({}, q, e.responsePath), c = await e.query(o()), u = g(t.data, c) || [], l = g(t.total, c) || 0, f = g(t.currentPage, c) || 1;
    if (l === void 0 || isNaN(l))
      throw console.warn("merged path data", JSON.stringify(t)), new Error("Get `total` param error when query data.Please check VElTablePlus configuration parameter `responsePath`.");
    if (f === void 0 || isNaN(f))
      throw console.warn("merged path data", JSON.stringify(t)), new Error("Get `currentPage` param error when query data.Please check VElTablePlus configuration parameter `responsePath`.");
    if (u === void 0)
      throw console.warn("merged path data", JSON.stringify(t)), new Error("Get `data` param error when query data.Please check VElTablePlus configuration parameter `responsePath`.");
    e.tableProps.table.data = u, a.total = l, a.currentPage = f;
  }, a = v(
    Object.assign(k, e.pagination, {
      onSizeChange(t) {
        a.pageSize !== t && (a.pageSize = t, n());
      },
      "onUpdate:page-size"(t) {
        a.pageSize !== t && (a.pageSize = t, n());
      },
      onCurrentChange(t) {
        a.currentPage !== t && (a.currentPage = t, n());
      },
      "onUpdate:current-page"(t) {
        a.currentPage !== t && (a.currentPage = t, n());
      }
    })
  ), p = {
    title: () => e.title,
    btn: () => r(h, null, { default: () => D({ props: e, query: n }) }),
    //查询 重置 查询配置 表格配置 表格导出 收起/展开 新增 编辑 删除
    filter: () => r(_, e.formProps),
    table: () => r(T, e.tableProps),
    pagination: () => r(w, a)
  };
  return e.initQuery === !0 && n(), r(e.layout || H, e.layoutProps, p);
};
export {
  H as LayoutDefault,
  q as dataPath,
  W as default,
  D as getDefaultButtons,
  k as paginationDefault
};
//# sourceMappingURL=index.mjs.map
