import{_ as f}from"./Drqx__TC.js";import{_ as v}from"./3IvXPGcf.js";import{m as g,b as h,c as y}from"./N8Y1yk_7.js";import{r as l,f as x,g as _,c as m,b as u,a as p,F as C,i as B,o as c}from"./BlMadqvk.js";import{M as E}from"./g2xh0qhU.js";import{u as M}from"./CIZBEhsU.js";import{q as N}from"./BeUnMnH9.js";import{u as S}from"./hBCKhDG5.js";import"./DtjBQjbn.js";import"./DvDH6DOc.js";import"./C5XdvImd.js";const b={class:"container"},k={class:"articles"},O={__name:"index",async setup(w){let t,s;const r=l([]),n=g(x().public.minpress);if(console.log(n),n.mode===E.static){console.log("static mode");const{data:e}=([t,s]=_(()=>M("home",()=>N().find())),t=await t,s(),t),a=e.value.map(o=>h(o));r.value=a}else{console.log("server mode");const{data:e}=([t,s]=_(()=>S(n.metaUrl,"$PslAyef5YX")),t=await t,s(),t);if(e.value.totalElements>0){const a=l([]);a.value=e.value.content.map(o=>y(o)),r.value=a.value}}return(e,a)=>{const o=f,d=v;return c(),m("div",null,[u(o),p("main",b,[p("div",k,[(c(!0),m(C,null,B(r.value,i=>(c(),m("div",{class:"article",key:i.id},[u(d,{item:i},null,8,["item"])]))),128))])])])}}};export{O as default};
