import{_ as v}from"./BRbgi_u6.js";import{_ as h}from"./B33YwSN6.js";import{b as g,d as y}from"./tRb40OuR.js";import{k as b,r as u,g as k,o as c,c as d,b as p,a,O as w,J as S,K as x,F as M,i as E}from"./Bcke0M3m.js";import{M as T}from"./DshPJGOp.js";import{u as B}from"./Xa9XhfQa.js";import"./vW2sQkLc.js";import"./DvDH6DOc.js";import"./CYXPtRsx.js";const C={class:"container"},N=a("button",{class:"outline",style:{"margin-left":".5rem",height:"2.5rem",width:"10rem"}},"Search",-1),q=["innerHTML"],D={class:"articles"},j=b({__name:"index",setup(F){const l=u(""),i=g(k().public.minpress),o=u(""),t=u([]);console.log("search....."),console.log("mode===>"+i.mode);function f(m){const n=i.searchUrl+"?q="+m;console.log(n),i.mode===T.SSG?(t.value=[],o.value="no markdown file find."+i.mode):B(n,{key:n+m},"$9f7SGOEuTp").then(r=>{const e=r.data.value;console.log(e),e&&e.totalElements>0?(t.value=e.content.map(s=>y(s)),o.value='find <span style="color:red">'+e.totalElements+"</span> markdown files.",console.log(t.value),console.log(o.value)):(t.value=[],o.value="no markdown file find.")},r=>{o.value="http request error. "+r,t.value=[]})}function _(){console.log("submit... q="+l.value),l.value&&f(l.value)}return(m,n)=>{const r=v,e=h;return c(),d("div",null,[p(r),a("main",C,[a("form",{onSubmit:w(_,["prevent"]),style:{display:"flex","justify-content":"center","margin-bottom":"0rem"}},[S(a("input",{type:"text",style:{height:"2.5rem"},"onUpdate:modelValue":n[0]||(n[0]=s=>l.value=s),placeholder:"Please input your keyword."},null,512),[[x,l.value]]),N],32),a("label",{style:{"margin-bottom":"1rem"},innerHTML:o.value},null,8,q),a("div",D,[(c(!0),d(M,null,E(t.value,s=>(c(),d("div",{class:"article",key:s.id},[p(e,{item:s},null,8,["item"])]))),128))])])])}}});export{j as default};
