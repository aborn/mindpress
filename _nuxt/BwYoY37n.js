import{_ as b}from"./C2QMvkF5.js";import k from"./C1lMPacq.js";import{_ as C,q as p,E as S,c as l,b as A,a as s,W as B,X as D,f as t,Z as T,F as m,A as g,B as I,w as N,z as v,t as f,o,y as E,p as P,e as V}from"./CRC3xU_A.js";import{D as M}from"./DshPJGOp.js";import{u as O}from"./CfXWV_d_.js";import"./CBblR6-z.js";import"./DY5avcip.js";import"./6bm_RRcn.js";import"./C6ihqJsh.js";import"./DvDH6DOc.js";const R=a=>(P("data-v-316f8ba6"),a=a(),V(),a),$={class:"live-playground"},z={class:"live-content"},F={class:"live-tabs"},W=["onClick"],X=R(()=>s("div",null,"Content is empty.",-1)),q={key:1,style:{padding:"1rem"}},K={__name:"live",async setup(a){let n,d;const r=p(M),{data:_,refresh:u}=([n,d]=S(async()=>O("playground",async()=>{try{return await $fetch("/api/parse",{method:"POST",cors:!0,body:{id:"content:_file.md",content:r.value}})}catch{return _.value}})),n=await n,d(),n),i=p("Preview"),y=p(["Preview","AST"]);return(h,c)=>{const w=b,x=k;return o(),l(m,null,[A(w),s("main",$,[B(s("textarea",{class:"live-textarea","onUpdate:modelValue":c[0]||(c[0]=e=>T(r)?r.value=e:null),onInput:c[1]||(c[1]=(...e)=>t(u)&&t(u)(...e))},null,544),[[D,t(r)]]),s("div",z,[s("div",F,[(o(!0),l(m,null,g(t(y),e=>(o(),l("button",{key:e,class:E(["outline",{active:e===t(i)}]),onClick:L=>i.value=e},f(e),11,W))),128))]),t(i)==="Preview"?(o(),I(x,{key:0,value:t(_)},{empty:N(()=>[X]),_:1},8,["value"])):v("",!0),t(i)==="AST"?(o(),l("pre",q,f(t(_)),1)):v("",!0)])])],64)}}},ot=C(K,[["__scopeId","data-v-316f8ba6"]]);export{ot as default};