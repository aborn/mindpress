import{_ as f}from"./NavBar-e809156c.mjs";import{_ as h,y as u,z as b,o as s,i as c,k as x,n as r,G as k,H as w,J as v,K as S,e as C,f as D,L as m,q as y,c as N,s as T,M as g,N as A,O as B}from"./entry-7dcd00f0.mjs";import{D as I}from"./consts-95c98e81.mjs";const O={__name:"live",async setup(o,{expose:a}){a();let n,e;const _=u(I),{data:i,refresh:l}=([n,e]=b(async()=>N("playground",async()=>{try{return await $fetch("/api/parse",{method:"POST",cors:!0,body:{id:"content:_file.md",content:_.value}})}catch{return i.value}})),n=await n,e(),n),d=u("Preview"),t=u(["Preview","AST"]),p={content:_,doc:i,refresh:l,tab:d,tabs:t};return Object.defineProperty(p,"__isScriptSetup",{enumerable:!1,value:!0}),p}},P=o=>(A("data-v-49a2cd2e"),o=o(),B(),o),M={class:"live-playground"},V={class:"live-content"},E={class:"live-tabs"},z=["onClick"],K=P(()=>r("div",null,"Content is empty.",-1)),L={key:1,style:{padding:"1rem"}};function R(o,a,n,e,_,i){const l=f,d=T;return s(),c(v,null,[x(l),r("main",M,[k(r("textarea",{class:"live-textarea","onUpdate:modelValue":a[0]||(a[0]=t=>e.content=t),onInput:a[1]||(a[1]=(...t)=>e.refresh&&e.refresh(...t))},null,544),[[w,e.content]]),r("div",V,[r("div",E,[(s(!0),c(v,null,S(e.tabs,t=>(s(),c("button",{key:t,class:g(["outline",{active:t===e.tab}]),onClick:p=>e.tab=t},y(t),11,z))),128))]),e.tab==="Preview"?(s(),C(d,{key:0,value:e.doc},{empty:D(()=>[K]),_:1},8,["value"])):m("",!0),e.tab==="AST"?(s(),c("pre",L,y(e.doc),1)):m("",!0)])])],64)}var H=h(O,[["render",R],["__scopeId","data-v-49a2cd2e"]]);export{H as default};
