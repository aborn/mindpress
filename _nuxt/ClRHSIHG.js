import{_ as h}from"./rvCgThOu.js";import{_ as R}from"./C8HSeN-P.js";import{b as y,i as D,c as M,d as x}from"./B8nuDwwN.js";import{r as u,g as B,h as p,c as i,b as _,a as d,F as C,i as q,o as m}from"./C5ARwiQw.js";import{u as E}from"./DLTHsheE.js";import{M as L}from"./g2xh0qhU.js";import{u as N}from"./ClCTB_41.js";import{q as S}from"./BN2BvHYS.js";import{u as U}from"./znh9Ul9i.js";import"./DS2iaWxb.js";import"./DvDH6DOc.js";import"./DCrnXRIs.js";const b={class:"container"},k={class:"articles"},G={__name:"index",async setup(w){let e,a;const r=u([]),n=y(B().public.minpress),c=E(),f=c.protocol+"//"+c.host;console.log(n),console.log(f);let v=D(c.hostname);if(console.log("isDevMode:"+v),n.mode===L.static){console.log("static mode");const{data:t}=([e,a]=p(()=>N("home",()=>S().sort({_id:1}).find())),e=await e,a(),e),o=t.value.map(s=>M(s));r.value=o}else{console.log("server mode");const{data:t}=([e,a]=p(()=>U(n.metaUrl,"$PslAyef5YX")),e=await e,a(),e);if(t.value.totalElements>0){const o=u([]);o.value=t.value.content.map(s=>x(s)),r.value=o.value}}return(t,o)=>{const s=h,g=R;return m(),i("div",null,[_(s),d("main",b,[d("div",k,[(m(!0),i(C,null,q(r.value,l=>(m(),i("div",{class:"article",key:l.id},[_(g,{item:l},null,8,["item"])]))),128))])])])}}};export{G as default};
