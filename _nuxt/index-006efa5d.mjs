import{_ as v}from"./NavBar-e809156c.mjs";import{_ as x}from"./PostCard-02d16ce9.mjs";import{m as y,b as g,u as h}from"./utils-f98b8b20.mjs";import{_ as S,y as c,l as C,z as m,o as _,i,k as u,n as p,J as b,K as k,c as B,A as E}from"./entry-7dcd00f0.mjs";import{M as N}from"./consts-95c98e81.mjs";const w={__name:"index",async setup(d,{expose:l}){l();let e,t;const n=c([]),s=y(C().public.minpress);if(console.log(s),s.mode===N.static){console.log("static mode");const{data:a}=([e,t]=m(()=>B("home",()=>E().find())),e=await e,t(),e);n.value=a.value}else{console.log("server mode");const{data:a}=([e,t]=m(()=>h(s.metaUrl)),e=await e,t(),e);if(a.value.totalElements>0){const o=c([]);o.value=a.value.content.map(f=>g(f)),n.value=o.value}}const r={articles:n,mp:s,ref:c};return Object.defineProperty(r,"__isScriptSetup",{enumerable:!1,value:!0}),r}},A={class:"container"},D={class:"articles"};function M(d,l,e,t,n,s){const r=v,a=x;return _(),i("div",null,[u(r),p("main",A,[p("div",D,[(_(!0),i(b,null,k(t.articles,o=>(_(),i("div",{class:"article",key:o.id},[u(a,{item:o},null,8,["item"])]))),128))])])])}var V=S(w,[["render",M]]);export{V as default};
