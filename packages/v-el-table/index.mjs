import m from "./form/index.mjs";
import { ref as r, watchEffect as n } from "vue";
import { i18n as a } from "./utils/index.mjs";
import f from "./table/index.mjs";
import i from "./table-plus/index.mjs";
const t = r("en");
let o;
o || (o = n(
  () => {
    a.setLocale(t.value);
  },
  { immediate: !0 }
));
const d = {
  install: (e, l) => {
    e.component("VElForm", m), e.component("VElTable", f), e.component("VElTablePlus", i), l && typeof l.lang == "string" && (t.value = l.lang);
  }
};
export {
  m as VElForm,
  f as VElTable,
  i as VElTablePlus,
  d as default
};
//# sourceMappingURL=index.mjs.map
