import{_ as l}from"./CljSnIbu.js";import p from"./DQoSqI46.js";import{D as d}from"./DshPJGOp.js";import{q as u,E as f,c as v,b as a,a as r,w as h,f as n,F as y,H as w,Z as D,o as k,t as x}from"./DtMEWqXq.js";import"./6AadfNYY.js";import"./DlY6kt6F.js";import"./6bm_RRcn.js";import"./Dp-LMrGz.js";const B={class:"container"},C={class:"article-title"},F={__name:"m",async setup(E){let t,o;const s=u(d),{data:e}=([t,o]=f(async()=>w("serv",async()=>{try{return await $fetch("/api/parse",{method:"POST",cors:!0,body:{id:"content:_servercontent.md",content:s.value}})}catch{return e.value}})),t=await t,o(),t);return(c,M)=>{const _=l,i=D("MarkdownRenderer"),m=p;return k(),v(y,null,[a(_),r("main",B,[a(m,{value:n(e)},{default:h(()=>[r("div",C,x(n(e).title),1),a(i,{value:n(e)},null,8,["value"])]),_:1},8,["value"])])],64)}}};export{F as default};