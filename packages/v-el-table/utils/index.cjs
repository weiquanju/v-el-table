"use strict";var c=Object.defineProperty;var i=(r,e,t)=>e in r?c(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var l=(r,e,t)=>(i(r,typeof e!="symbol"?e+"":e,t),t);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const o=require("vue");class u{constructor(e){l(this,"locale",o.ref("en"));l(this,"translations");this.locale.value=e,this.translations=o.reactive({en:{reset:"reset",query:"query"},"zh-cn":{reset:"重置",query:"查询"}})}getTranslation(e){return o.computed(()=>this.translations[this.locale.value][e])}t(e){return this.getTranslation(e)}getLocale(){return this.locale}setLocale(e){this.locale.value=e}setTranslations(e){for(const t in e)this.translations[t]=e[t]}setLocalization(e){this.translations[this.locale.value]=e}setTranslationByLocale(e,t){this.translations[e]=t}}const f=new u("en"),v=r=>r.replace(/[-_ ](\w)|(^\w)/g,(e,t)=>(t||e).toUpperCase()),h=r=>{if(!r)return{};const e=new Map;return Object.entries(r).forEach(([t,n])=>e.set(a(`on-${t}`),n)),Object.fromEntries(e)},a=r=>r.replace(/[-_ ](\w)|(^\w)/g,(e,t)=>t?t.toUpperCase():e.toLowerCase()),p=r=>{const e=Object.keys(r);return o.isReactive(r)?o.reactive(Object.fromEntries(e.map(t=>{const n=o.toRef(r,t);return e.find(s=>/[-_ ]/.test(s))?[a(t),n]:[t,n]}))):Object.fromEntries(e.map(t=>{const n=r[t];return e.find(s=>/[-_ ]/.test(s))?[a(t),n]:[t,n]}))},C=r=>{for(const e in r){if(r[e]!==null&&typeof r[e]=="object"){const t=r[e];if(typeof t.constructor=="function"){r[e]=new t.constructor;continue}}r[e]=void 0}return r};function m(r,e){const t=r.split(".");let n=e;try{for(let s=0;s<t.length;s++){if([void 0,null].includes(n))return n;n=n[t[s]]}return n}catch(s){console.error(s)}}exports.at=m;exports.eventsTransform=h;exports.i18n=f;exports.resetValue=C;exports.toCamelCase=a;exports.toCamelCaseProp=p;exports.toPascalNameStyle=v;
//# sourceMappingURL=index.cjs.map
