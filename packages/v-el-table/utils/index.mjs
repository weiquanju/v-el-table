var i = Object.defineProperty;
var a = (n, t, e) => t in n ? i(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var o = (n, t, e) => (a(n, typeof t != "symbol" ? t + "" : t, e), e);
import { ref as u, reactive as l, computed as f, isReactive as h, toRef as p } from "vue";
class v {
  constructor(t) {
    o(this, "locale", u("en"));
    o(this, "translations");
    this.locale.value = t, this.translations = l({
      en: {
        reset: "reset",
        query: "query"
      },
      "zh-cn": {
        reset: "重置",
        query: "查询"
      }
    });
  }
  getTranslation(t) {
    return f(() => this.translations[this.locale.value][t]);
  }
  t(t) {
    return this.getTranslation(t);
  }
  getLocale() {
    return this.locale;
  }
  setLocale(t) {
    this.locale.value = t;
  }
  setTranslations(t) {
    for (const e in t)
      this.translations[e] = t[e];
  }
  setLocalization(t) {
    this.translations[this.locale.value] = t;
  }
  setTranslationByLocale(t, e) {
    this.translations[t] = e;
  }
}
const y = new v("en"), C = (n) => n.replace(/[-_ ](\w)|(^\w)/g, (t, e) => (e || t).toUpperCase()), b = (n) => {
  if (!n)
    return {};
  const t = /* @__PURE__ */ new Map();
  return Object.entries(n).forEach(([e, r]) => t.set(c(`on-${e}`), r)), Object.fromEntries(t);
}, c = (n) => n.replace(/[-_ ](\w)|(^\w)/g, (t, e) => e ? e.toUpperCase() : t.toLowerCase()), g = (n) => {
  const t = Object.keys(n);
  return h(n) ? l(
    Object.fromEntries(
      t.map((e) => {
        const r = p(n, e);
        return t.find((s) => /[-_ ]/.test(s)) ? [c(e), r] : [e, r];
      })
    )
  ) : Object.fromEntries(
    t.map((e) => {
      const r = n[e];
      return t.find((s) => /[-_ ]/.test(s)) ? [c(e), r] : [e, r];
    })
  );
}, j = (n) => {
  for (const t in n) {
    if (n[t] !== null && typeof n[t] == "object") {
      const e = n[t];
      if (typeof e.constructor == "function") {
        n[t] = new e.constructor();
        continue;
      }
    }
    n[t] = void 0;
  }
  return n;
};
function d(n, t) {
  const e = n.split(".");
  let r = t;
  try {
    for (let s = 0; s < e.length; s++) {
      if ([void 0, null].includes(r))
        return r;
      r = r[e[s]];
    }
    return r;
  } catch (s) {
    console.error(s);
  }
}
export {
  d as at,
  b as eventsTransform,
  y as i18n,
  j as resetValue,
  c as toCamelCase,
  g as toCamelCaseProp,
  C as toPascalNameStyle
};
//# sourceMappingURL=index.mjs.map
