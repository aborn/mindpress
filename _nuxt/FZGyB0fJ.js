import{_ as R}from"./DhxGM-In.js";import{_ as S}from"./BnDMShb6.js";import{b as q,c as p,d as C}from"./C5_q3zaJ.js";import{q as d,D as w,E as m,c,b as _,a as f,F as x,A as B,o as i}from"./CkKUN-gI.js";import{u as E}from"./fr_IZDNv.js";import{M as v}from"./DshPJGOp.js";import{u as L}from"./D5KLXizm.js";import{q as M}from"./CVwFFDci.js";import{u as h}from"./7PmQpK_M.js";import"./C9gYeooy.js";import"./DvDH6DOc.js";import"./BNI-NvG4.js";import"./BgYbQyXo.js";import"./BQkc-AXV.js";const k={class:"container"},A={class:"articles"},j={__name:"index",async setup(D){let t,s;const r=d([]),n=q(w().public.minpress),l=E(),g=l.protocol+"//"+l.host;if(console.log(n),console.log(g),console.log("mode===>"+n.mode),n.mode===v.SSG){if(r.value.length<=0){const{data:e}=([t,s]=m(()=>L("home",()=>M().sort({_id:1}).find())),t=await t,s(),t);console.log("--------data SSG-----");const a=e.value.map(o=>p(o));r.value=a}}else if(n.mode===v.FCM)try{const{data:e}=([t,s]=m(()=>h("/api/md/query","$PslAyef5YX")),t=await t,s(),t),a=e.value.map(o=>p(o));r.value=a}catch(e){console.warn(e)}else{const{data:e}=([t,s]=m(()=>h(n.metaUrl,"$6PO73qLRkI")),t=await t,s(),t);if(e.value.totalElements>0){const a=d([]);a.value=e.value.content.map(o=>C(o)),r.value=a.value}}return(e,a)=>{const o=R,y=S;return i(),c("div",null,[_(o),f("main",k,[f("div",A,[(i(!0),c(x,null,B(r.value,u=>(i(),c("div",{class:"article",key:u.id},[_(y,{item:u},null,8,["item"])]))),128))])])])}}};export{j as default};
