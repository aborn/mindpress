import D from"./BmbmPTqz.js";import{_ as M}from"./y2sVCqiy.js";import N from"./GV5k4iql.js";import{x as j,o as i,c as r,a as s,b as p,w as k,t as u,F as h,k as y,f as d,q as w,d as x,a0 as T}from"./Bqnd1YEV.js";import{p as S}from"./CS_T3frf.js";const $={class:"card-content-title"},q={key:0,class:"card-content-title"},A=["innerHTML"],U={key:1,class:"card-content-title"},V={class:"card-content-desc"},E={key:0,class:"card-content-desc"},F=["innerHTML"],z={key:1,class:"card-content-desc"},I={class:"card-footer"},O={class:"card-footer-date"},R={class:"card-footer-item"},G={class:"card-footer-author"},Y=j({__name:"PostCard",props:{item:{type:Object,required:!0}},setup(n){const m=n,v=P(),L=H(),f=b();function b(){return S(m.item.permalink||m.item._path)}function H(){const t=[],e=m.item.authors;if(e){const o=e.length;e.forEach((l,c)=>{t.length<5&&(t.push(l.name),c!==o-1&&c!==2&&t.push("|"))})}return t}function P(){let t=m.item.tag||m.item.tags||m.item.category;return t||[]}function B(t){if(!t)return"";const e=50,o=t.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/),l=t.trim().substring(0,e*2);let c="";t.trim().length>e*2&&(c="...");const a=t.trim().substring(0,e);let g="";return o&&t.trim().length>e&&(g="..."),o?a+g:l+c}function _(t){if(!t)return"";const e={year:"numeric",month:"long",day:"numeric"};return new Date(t).toLocaleDateString("en",e)}function C(t){const o=new URL("http://localhost/"+t).searchParams.get("id");console.log("link:"+t+"  id:"+o),o?T({path:t,query:{id:o}}):T({path:t})}return(t,e)=>{const o=D,l=M,c=N;return i(),r(h,null,[s("div",{class:"card-content",onClick:e[0]||(e[0]=a=>C(`${d(f)}`))},[p(l,{to:`${d(f)}`,style:{"text-decoration":"none !important"}},{default:k(()=>[s("h2",$,[n.item.highlightTitle?(i(),r("h2",q,[s("span",{innerHTML:n.item.highlightTitle},null,8,A)])):(i(),r("h2",U,u(n.item.title),1))]),s("div",null,[(i(!0),r(h,null,y(d(v),a=>(i(),w(o,{key:a,ui:{rounded:"rounded-full"},size:"xs",style:{"margin-right":"5px"}},{default:k(()=>[x(u(a),1)]),_:2},1024))),128))]),s("div",V,[n.item.highlightHtml?(i(),r("p",E,[s("span",{innerHTML:n.item.highlightHtml},null,8,F)])):(i(),r("p",z,u(B(n.item.description)),1))])]),_:1},8,["to"])]),s("div",I,[s("div",O,[s("span",R,[p(c,{name:"i-heroicons-calendar-days"})]),x(" "+u(n.item.date?_(n.item.date):_(n.item.mtime)),1)]),s("div",G,[(i(!0),r(h,null,y(d(L),a=>(i(),r("span",{class:"card-footer-author-item",key:a},u(a),1))),128))])])],64)}}});export{Y as _};