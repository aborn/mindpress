import{h as O}from"./DvDH6DOc.js";import{D as U,y as $,S as x,U as n}from"./B5I_lrM_.js";import{u as C}from"./Cm5kZlTA.js";function S(s,r,c){const[t={},u]=typeof r=="string"?[{},r]:[r,c],e=U(()=>n(s)),a=t.key||O([u,typeof e.value=="string"?e.value:"",...E(t)]);if(!a||typeof a!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+a);if(!s)throw new Error("[nuxt] [useFetch] request is missing.");const i=a===u?"$f"+a:a;if(!t.baseURL&&typeof e.value=="string"&&e.value[0]==="/"&&e.value[1]==="/")throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:y,lazy:d,default:b,transform:g,pick:w,watch:h,immediate:v,getCachedData:D,deep:_,dedupe:k,...T}=t,l=$({...x,...T,cache:typeof t.cache=="boolean"?void 0:t.cache}),F={server:y,lazy:d,default:b,transform:g,pick:w,immediate:v,getCachedData:D,deep:_,dedupe:k,watch:h===!1?[]:[l,e,...h||[]]};let o;return C(i,()=>{var p;(p=o==null?void 0:o.abort)==null||p.call(o),o=typeof AbortController<"u"?new AbortController:{};const m=n(t.timeout);let f;return m&&(f=setTimeout(()=>o.abort(),m),o.signal.onabort=()=>clearTimeout(f)),(t.$fetch||globalThis.$fetch)(e.value,{signal:o.signal,...l}).finally(()=>{clearTimeout(f)})},F)}function E(s){var c;const r=[((c=n(s.method))==null?void 0:c.toUpperCase())||"GET",n(s.baseURL)];for(const t of[s.params||s.query]){const u=n(t);if(!u)continue;const e={};for(const[a,i]of Object.entries(u))e[n(a)]=n(i);r.push(e)}return r}export{S as u};
