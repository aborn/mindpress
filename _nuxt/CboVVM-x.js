import{_ as b}from"./DEla3lQn.js";import x from"./BKUUq0CD.js";import{_ as C,r as p,i as S,c as l,b as D,a,M as N,N as T,f as e,Q as g,F as m,k as A,q as B,w as I,l as v,t as f,m as M,o as s,R as P,p as R,e as V}from"./Bqnd1YEV.js";import{D as $}from"./DshPJGOp.js";import"./y2sVCqiy.js";import"./D0jRPI4g.js";import"./6bm_RRcn.js";import"./NPkJpnse.js";const E=o=>(R("data-v-316f8ba6"),o=o(),V(),o),O={class:"live-playground"},F={class:"live-content"},q={class:"live-tabs"},z=["onClick"],K=E(()=>a("div",null,"Content is empty.",-1)),L={key:1,style:{padding:"1rem"}},Q={__name:"live",async setup(o){let n,d;const r=p($),{data:_,refresh:u}=([n,d]=S(async()=>M("playground",async()=>{try{return await $fetch("/api/parse",{method:"POST",cors:!0,body:{id:"content:_file.md",content:r.value}})}catch{return _.value}})),n=await n,d(),n),i=p("Preview"),y=p(["Preview","AST"]);return(h,c)=>{const w=b,k=x;return s(),l(m,null,[D(w),a("main",O,[N(a("textarea",{class:"live-textarea","onUpdate:modelValue":c[0]||(c[0]=t=>g(r)?r.value=t:null),onInput:c[1]||(c[1]=(...t)=>e(u)&&e(u)(...t))},null,544),[[T,e(r)]]),a("div",F,[a("div",q,[(s(!0),l(m,null,A(e(y),t=>(s(),l("button",{key:t,class:P(["outline",{active:t===e(i)}]),onClick:U=>i.value=t},f(t),11,z))),128))]),e(i)==="Preview"?(s(),B(k,{key:0,value:e(_)},{empty:I(()=>[K]),_:1},8,["value"])):v("",!0),e(i)==="AST"?(s(),l("pre",L,f(e(_)),1)):v("",!0)])])],64)}}},ee=C(Q,[["__scopeId","data-v-316f8ba6"]]);export{ee as default};