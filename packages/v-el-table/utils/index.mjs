var u = Object.defineProperty;
var f = (n, t, e) => t in n ? u(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var c = (n, t, e) => (f(n, typeof t != "symbol" ? t + "" : t, e), e);
import { ref as l, reactive as i, computed as h, watchEffect as p, isReactive as v, toRef as w } from "vue";
class g {
  constructor(t) {
    c(this, "locale", l("en"));
    c(this, "translations");
    this.locale.value = t, this.translations = i({
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
    return h(() => this.translations[this.locale.value][t]);
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
const m = new g("en"), d = l("en");
let o;
const C = () => {
  o || (o = p(
    () => {
      m.setLocale(d.value);
    },
    { immediate: !0 }
  ));
}, b = () => {
  o && o();
}, j = (n) => n.replace(/[-_ ](\w)|(^\w)/g, (t, e) => (e || t).toUpperCase()), E = (n) => {
  if (!n)
    return {};
  const t = /* @__PURE__ */ new Map();
  return Object.entries(n).forEach(([e, r]) => t.set(a(`on-${e}`), r)), Object.fromEntries(t);
}, a = (n) => n.replace(/[-_ ](\w)|(^\w)/g, (t, e) => e ? e.toUpperCase() : t.toLowerCase()), O = (n) => {
  const t = Object.keys(n);
  return v(n) ? i(
    Object.fromEntries(
      t.map((e) => {
        const r = w(n, e);
        return t.find((s) => /[-_ ]/.test(s)) ? [a(e), r] : [e, r];
      })
    )
  ) : Object.fromEntries(
    t.map((e) => {
      const r = n[e];
      return t.find((s) => /[-_ ]/.test(s)) ? [a(e), r] : [e, r];
    })
  );
}, T = (n) => {
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
function _(n, t) {
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
  _ as at,
  E as eventsTransform,
  m as i18n,
  d as lang,
  T as resetValue,
  b as stopWatchLang,
  a as toCamelCase,
  O as toCamelCaseProp,
  j as toPascalNameStyle,
  C as watchLang
};
//# sourceMappingURL=index.mjs.map
