import{_ as b}from"./BRbgi_u6.js";import k from"./DUB9k5xc.js";import{_ as C,r as p,h as S,c as l,b as D,a as s,J as T,K as g,u as t,L as A,F as m,i as B,q as I,w as N,j as v,t as f,o,M,p as P,e as V}from"./Bcke0M3m.js";import{D as E}from"./DshPJGOp.js";import{u as O}from"./CYXPtRsx.js";import"./vW2sQkLc.js";import"./B03MZnid.js";import"./C-v3KzvZ.js";import"./o6DK2QtV.js";import"./DvDH6DOc.js";const R=a=>(P("data-v-316f8ba6"),a=a(),V(),a),$={class:"live-playground"},F={class:"live-content"},K={class:"live-tabs"},L=["onClick"],j=R(()=>s("div",null,"Content is empty.",-1)),q={key:1,style:{padding:"1rem"}},z={__name:"live",async setup(a){let n,d;const r=p(E),{data:_,refresh:u}=([n,d]=S(async()=>O("playground",async()=>{try{return await $fetch("/api/parse",{method:"POST",cors:!0,body:{id:"content:_file.md",content:r.value}})}catch{return _.value}})),n=await n,d(),n),i=p("Preview"),y=p(["Preview","AST"]);return(h,c)=>{const w=b,x=k;return o(),l(m,null,[D(w),s("main",$,[T(s("textarea",{class:"live-textarea","onUpdate:modelValue":c[0]||(c[0]=e=>A(r)?r.value=e:null),onInput:c[1]||(c[1]=(...e)=>t(u)&&t(u)(...e))},null,544),[[g,t(r)]]),s("div",F,[s("div",K,[(o(!0),l(m,null,B(t(y),e=>(o(),l("button",{key:e,class:M(["outline",{active:e===t(i)}]),onClick:J=>i.value=e},f(e),11,L))),128))]),t(i)==="Preview"?(o(),I(x,{key:0,value:t(_)},{empty:N(()=>[j]),_:1},8,["value"])):v("",!0),t(i)==="AST"?(o(),l("pre",q,f(t(_)),1)):v("",!0)])])],64)}}},ot=C(z,[["__scopeId","data-v-316f8ba6"]]);export{ot as default};
