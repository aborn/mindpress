import{_ as P}from"./DBljpKhT.js";import{_ as C}from"./DgydWD8w.js";import{l as M,o as i,c,a,b as _,w as N,t as l,F as h,D as p,f as u,d as j,a1 as y}from"./0VmqX8Pe.js";const w={class:"card-content-title"},S={key:0,class:"card-content-title"},B=["innerHTML"],V={key:1,class:"card-content-title"},$={class:"card-content-desc"},q={key:0,class:"card-content-desc"},A=["innerHTML"],E={key:1,class:"card-content-desc"},F={class:"card-footer"},U={class:"card-footer-date"},I={class:"card-footer-item"},O={class:"card-footer-author"},J=M({__name:"PostCard",props:{item:{type:Object,required:!0}},setup(n){const r=n,k=v(),L=T(),d=x();function x(){return r.item.permalink||r.item._path}function T(){const t=[],o=r.item.authors;if(o){const s=o.length;o.forEach((m,e)=>{t.length<5&&(t.push(m.name),e!==s-1&&e!==2&&t.push("|"))})}return t}function v(){let t=r.item.tag||r.item.tags||r.item.category;return t||[]}function b(t){const s=t.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/),m=t.trim().substring(0,50*2);let e="";t.trim().length>50*2&&(e="...");const H=t.trim().substring(0,50);let g="";return s&&t.trim().length>50&&(g="..."),s?H+g:m+e}function f(t){if(!t)return"";const o={year:"numeric",month:"long",day:"numeric"};return new Date(t).toLocaleDateString("en",o)}function D(t){const s=new URL("http://localhost/"+t).searchParams.get("id");console.log("link:"+t+"  id:"+s),s?y({path:t,query:{id:s}}):y({path:t})}return(t,o)=>{const s=P,m=C;return i(),c(h,null,[a("div",{class:"card-content",onClick:o[0]||(o[0]=e=>D(`${u(d)}`))},[_(s,{to:`${u(d)}`,style:{"text-decoration":"none !important"}},{default:N(()=>[a("h2",w,[n.item.highlightTitle?(i(),c("h2",S,[a("span",{innerHTML:n.item.highlightTitle},null,8,B)])):(i(),c("h2",V,l(n.item.title),1))]),a("div",null,[(i(!0),c(h,null,p(u(k),e=>(i(),c("span",{class:"card-content-tag",key:e},l(e),1))),128))]),a("div",$,[n.item.highlightHtml?(i(),c("p",q,[a("span",{innerHTML:n.item.highlightHtml},null,8,A)])):(i(),c("p",E,l(b(n.item.description)),1))])]),_:1},8,["to"])]),a("div",F,[a("div",U,[a("span",I,[_(m,{name:"i-heroicons-calendar-days"})]),j(" "+l(n.item.date?f(n.item.date):f(n.item.mtime)),1)]),a("div",O,[(i(!0),c(h,null,p(u(L),e=>(i(),c("span",{class:"card-footer-author-item",key:e},l(e),1))),128))])])],64)}}});export{J as _};
