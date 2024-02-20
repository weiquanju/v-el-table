import { ElFormItem as d, ElForm as P } from "element-plus";
import * as u from "element-plus/es/components/index";
import { h as a } from "vue";
import { toPascalNameStyle as E, eventsTransform as l } from "../utils/index.mjs";
const C = Object.keys(u), b = (o) => C.includes(o), y = (o, p) => {
  const { prop: n, label: s = "" } = (o == null ? void 0 : o.itemProps) || {};
  if (!n)
    throw new Error(`${s || "undefined label"} of 'FormItemProps.itemProps.prop' in form is undefined!`);
  const { model: t } = p.form, { inputProps: m = {}, remoteHandler: e, inputChildren: c } = o;
  e && e(o);
  let i = o.inputComponent;
  if (typeof o.inputComponent == "string") {
    const r = E(o.inputComponent);
    if (!b(r))
      throw new Error(`Error component name: ${r} .`);
    i = u[r];
  }
  const f = (r) => {
    t[n] = r;
  };
  return a(
    i,
    {
      ...m,
      ...l(o.inputEvents),
      modelValue: t[n],
      "onUpdate:modelValue": f
    },
    { default: c }
  );
}, F = function(o) {
  const { fields: p = [] } = o, n = p.filter(({ visible: t = !0 }) => t).map(
    (t) => {
      var m, e;
      return a(d, t.itemProps, {
        default: () => y(t, o),
        label: typeof ((m = t.itemProps) == null ? void 0 : m.label) == "function" ? t.itemProps.label : void 0,
        error: typeof ((e = t.itemProps) == null ? void 0 : e.error) == "function" ? t.itemProps.error : void 0
      });
    }
  ), s = (t) => {
    o.form.model = t;
  };
  return a(P, { ...o.form, ...l(o.events), "onUpdate:model": s }, { default: () => n });
};
export {
  F as default
};
//# sourceMappingURL=index.mjs.map
