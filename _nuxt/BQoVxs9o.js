import{h as O}from"./DvDH6DOc.js";import{A as $,s as x,P as A,Q as n}from"./DSrgcA0t.js";import{u as C}from"./ChP2O-cM.js";function R(a,r,u){const[t={},c]=typeof r=="string"?[{},r]:[r,u],e=$(()=>n(a)),s=t.key||O([c,typeof e.value=="string"?e.value:"",...E(t)]);if(!s||typeof s!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+s);if(!a)throw new Error("[nuxt] [useFetch] request is missing.");const i=s===c?"$f"+s:s;if(!t.baseURL&&typeof e.value=="string"&&e.value[0]==="/"&&e.value[1]==="/")throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:l,lazy:y,default:d,transform:b,pick:g,watch:f,immediate:w,getCachedData:v,deep:_,dedupe:k,...D}=t,h=x({...A,...D,cache:typeof t.cache=="boolean"?void 0:t.cache}),F={server:l,lazy:y,default:d,transform:b,pick:g,immediate:w,getCachedData:v,deep:_,dedupe:k,watch:f===!1?[]:[h,e,...f||[]]};let o;return C(i,()=>{var m;(m=o==null?void 0:o.abort)==null||m.call(o),o=typeof AbortController<"u"?new AbortController:{};const p=n(t.timeout);return p&&setTimeout(()=>o.abort(),p),(t.$fetch||globalThis.$fetch)(e.value,{signal:o.signal,...h})},F)}function E(a){var u;const r=[((u=n(a.method))==null?void 0:u.toUpperCase())||"GET",n(a.baseURL)];for(const t of[a.params||a.query]){const c=n(t);if(!c)continue;const e={};for(const[s,i]of Object.entries(c))e[n(s)]=n(i);r.push(e)}return r}export{R as u};
