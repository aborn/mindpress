import{_ as h}from"./DkH8iBq4.js";import{_ as y}from"./C1Fuc6Vz.js";import{m as b,b as x,u as k}from"./BH4uEDJ4.js";import{f as B,u as C,r as n,g as L,c as o,b as p,a as r,F as w,K as E,o as l}from"./B8q98hMu.js";import"./Cmeso5cp.js";import"./DvDH6DOc.js";import"./Bnze3QL2.js";const F={class:"container"},N=["innerHTML"],T={class:"articles"},S={__name:"[...tag]",async setup(H){let t,c;const d=b(B().public.minpress),m=C().params.tag[0],e=n([]),i=d.searchUrl+"?tag="+m;console.log(i);const{data:a}=([t,c]=L(()=>k(i,"$fhlUj39IgL")),t=await t,c(),t);if(a.value.totalElements>0){const s=n([]);s.value=a.value.content.map(u=>x(u)),e.value=s.value}else e.value=[];const f=n('find <span style="color:red">'+a.value.totalElements+'</span> markdown files contains tag: <span style="color:red">'+m+"</span>.");return(s,u)=>{const g=h,v=y;return l(),o("div",null,[p(g),r("main",F,[r("label",{style:{"margin-bottom":"1rem"},innerHTML:f.value},null,8,N),r("div",T,[(l(!0),o(w,null,E(e.value,_=>(l(),o("div",{class:"article",key:_.id},[p(v,{item:_},null,8,["item"])]))),128))])])])}}};export{S as default};