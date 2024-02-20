function s(l) {
  if (/^v\-?el\-?\w+/i.test(l) === !1)
    return;
  const a = /* @__PURE__ */ new Map([
    ["Form", "v-el-table/form"],
    ["Table", "v-el-table/table"],
    ["TablePlus", "v-el-table/table-plus"]
  ]), t = l.replace(/-(\w)/g, (e, r) => r.toUpperCase()).slice(3);
  if (a.has(t)) {
    const e = a.get(t);
    if (e)
      return {
        from: e,
        name: "default"
        /*components/button.vue默认以default方式导出*/
      };
  }
}
export {
  s as default
};
//# sourceMappingURL=index.mjs.map
