import v from"./C6fQ1ifX.js";import{a5 as w,_ as y,at as C,au as d,x as k,K as _,G as x,aD as $,aE as b,o as l,q as h,a as N,c as u,F as S,k as m,b as B,b0 as T,w as j,s as I,aw as p,R as U,l as V,T as z}from"./Bqnd1YEV.js";import{u as A}from"./Dvlp8htJ.js";import"./GV5k4iql.js";import"./CBFedrLV.js";import"./D5MsSU-S.js";import"./BTaUj5aw.js";import"./CgVkkDzh.js";import"./y2sVCqiy.js";import"./CTZ2Hakn.js";import"./eKH4vHJG.js";import"./blSOxsGD.js";import"./QwubxqEi.js";const D={wrapper:"fixed flex flex-col justify-end z-[55]",position:"bottom-0 end-0",width:"w-full sm:w-96",container:"px-4 sm:px-6 py-6 space-y-3 overflow-y-auto"};function E(){const e=w("notifications",()=>[]);function i(s){const o={id:new Date().getTime().toString(),...s};return e.value.findIndex(n=>n.id===o.id)===-1&&e.value.push(o),o}function a(s){e.value=e.value.filter(o=>o.id!==s)}function r(s,o){const t=e.value.findIndex(n=>n.id===s);if(t!==-1){const n=e.value[t];e.value.splice(t,1,{...n,...o})}}function c(){e.value=[]}return{add:i,remove:a,update:r,clear:c}}const F=C(d.ui.strategy,d.ui.notifications,D),O=k({components:{UNotification:v},inheritAttrs:!1,props:{class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},setup(e){const{ui:i,attrs:a}=A("notifications",_(e,"ui"),F),r=E(),c=w("notifications",()=>[]),s=x(()=>$(b(i.value.wrapper,i.value.position,i.value.width),e.class));return{ui:i,attrs:a,toast:r,notifications:c,wrapperClass:s}}});function R(e,i,a,r,c,s){const o=v;return l(),h(z,{to:"body"},[N("div",p({class:e.wrapperClass,role:"region"},e.attrs),[e.notifications.length?(l(),u("div",{key:0,class:U(e.ui.container)},[(l(!0),u(S,null,m(e.notifications,t=>(l(),u("div",{key:t.id},[B(o,p({ref_for:!0},t,{class:t.click&&"cursor-pointer",onClick:n=>t.click&&t.click(t),onClose:n=>e.toast.remove(t.id)}),T({_:2},[m(e.$slots,(n,f)=>({name:f,fn:j(g=>[I(e.$slots,f,p({ref_for:!0},g))])}))]),1040,["class","onClick","onClose"])]))),128))],2)):V("",!0)],16)])}const ee=y(O,[["render",R]]);export{ee as default};