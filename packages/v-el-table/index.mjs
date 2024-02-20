import e from "./form/index.mjs";
import { lang as o } from "./utils/index.mjs";
import { at as p, eventsTransform as c, i18n as V, resetValue as E, stopWatchLang as P, toCamelCase as T, toCamelCaseProp as b, toPascalNameStyle as x, watchLang as C } from "./utils/index.mjs";
import l from "./table/index.mjs";
import r from "./table-plus/index.mjs";
import { LayoutDefault as h, dataPath as y, getDefaultButtons as D, paginationDefault as L } from "./table-plus/index.mjs";
const u = {
  install: (t, a) => {
    t.component("VElForm", e), t.component("VElTable", l), t.component("VElTablePlus", r), a && typeof a.lang == "string" && (o.value = a.lang);
  }
};
export {
  h as LayoutDefault,
  e as VElForm,
  l as VElTable,
  r as VElTablePlus,
  p as at,
  y as dataPath,
  u as default,
  c as eventsTransform,
  D as getDefaultButtons,
  V as i18n,
  o as lang,
  L as paginationDefault,
  E as resetValue,
  P as stopWatchLang,
  T as toCamelCase,
  b as toCamelCaseProp,
  x as toPascalNameStyle,
  C as watchLang
};
//# sourceMappingURL=index.mjs.map
