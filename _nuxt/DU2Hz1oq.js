import{_ as h}from"./CljSnIbu.js";import{_ as y}from"./Cds5CbeD.js";import{b,d as C}from"./CvIXsaFB.js";import{D as k,C as B,q as o,E,c as n,b as _,a as r,F as L,A as w,G as x,o as l}from"./DtMEWqXq.js";import"./6AadfNYY.js";import"./DVxX04re.js";import"./E7OSl0e4.js";import"./CAZilBRX.js";import"./gJIN9SAJ.js";const F={class:"container"},N=["innerHTML"],T={class:"articles"},P={__name:"[...tag]",async setup($){let t,c;const d=b(k().public.mindpress),i=B().params.tag[0],e=o([]),m=d.searchUrl+"?tag="+i;console.log(m);const{data:a}=([t,c]=E(()=>x(m,"$fhlUj39IgL")),t=await t,c(),t);if(a.value.totalElements>0){const s=o([]);s.value=a.value.content.map(u=>C(u)),e.value=s.value}else e.value=[];const f=o('find <span style="color:red">'+a.value.totalElements+'</span> markdown files contains tag: <span style="color:red">'+i+"</span>.");return(s,u)=>{const g=h,v=y;return l(),n("div",null,[_(g),r("main",F,[r("label",{style:{"margin-bottom":"1rem"},innerHTML:f.value},null,8,N),r("div",T,[(l(!0),n(L,null,w(e.value,p=>(l(),n("div",{class:"article",key:p.id},[_(v,{item:p},null,8,["item"])]))),128))])])])}}};export{P as default};