import { ElCalendar as d, ElSelect as P, ElInput as f, ElSwitch as C, ElCheckboxGroup as b, ElCheckbox as h, ElTimeSelect as k, ElTimePicker as y, ElDatePicker as v, ElRadioGroup as w, ElSlider as S, ElColorPicker as F, ElFormItem as V, ElForm as x } from "element-plus";
import { h as s } from "vue";
import { toPascalNameStyle as I, eventsTransform as i } from "../utils/index.mjs";
const a = {
  ElCalendar: d,
  ElSelect: P,
  ElInput: f,
  ElSwitch: C,
  ElCheckboxGroup: b,
  ElCheckbox: h,
  ElTimeSelect: k,
  ElTimePicker: y,
  ElDatePicker: v,
  ElRadioGroup: w,
  ElSlider: S,
  ElColorPicker: F
}, T = Object.keys(a), G = (o) => T.includes(o), N = (o, l) => {
  const { prop: t, label: p = "" } = (o == null ? void 0 : o.itemProps) || {};
  if (!t)
    throw new Error(
      `${p || "undefined label"} of 'FormItemProps.itemProps.prop' in form is undefined!`
    );
  const { model: e } = l.form, { inputProps: m = {}, remoteHandler: n, inputChildren: u } = o;
  n && n(o);
  let c = o.inputComponent;
  if (typeof o.inputComponent == "string") {
    const r = I(o.inputComponent);
    if (!G(r))
      throw new Error(`Error component name: ${r} .`);
    c = a[r];
  }
  const E = (r) => {
    e[t] = r;
  };
  return s(
    c,
    {
      ...m,
      ...i(o.inputEvents),
      modelValue: e[t],
      "onUpdate:modelValue": E
    },
    { default: u }
  );
}, g = function(o) {
  const { fields: l = [] } = o, t = l.filter(({ visible: e = !0 }) => e).map(
    (e) => {
      var m, n;
      return s(V, e.itemProps, {
        default: () => N(e, o),
        label: typeof ((m = e.itemProps) == null ? void 0 : m.label) == "function" ? e.itemProps.label : void 0,
        error: typeof ((n = e.itemProps) == null ? void 0 : n.error) == "function" ? e.itemProps.error : void 0
      });
    }
  ), p = (e) => {
    o.form.model = e;
  };
  return s(x, { ...o.form, ...i(o.events), "onUpdate:model": p }, { default: () => t });
};
export {
  g as default
};
//# sourceMappingURL=index.mjs.map
