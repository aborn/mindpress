import{_ as v}from"./vW2sQkLc.js";import{k as D,o,c as r,a as i,b as P,w as C,t as m,F as u,i as A,u as h,d as N,P as L}from"./Bcke0M3m.js";const E={class:"card-content-title"},w={key:0,class:"card-content-title"},I=["innerHTML"],R={key:1,class:"card-content-title"},V={class:"card-content-desc"},B={key:0,class:"card-content-desc"},U=["innerHTML"],q={key:1,class:"card-content-desc"},M={class:"card-footer"},H={class:"card-footer-date"},O=i("img",{style:{"max-width":"12.5px","margin-right":"0.1rem"},src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABQElEQVRoge2aWwqDMBBFb4u76DraNfjl5lvpv49VCLYfTiRiHkajGWUOBDEOM7l5DYYAy8kB1AB+VCqqi8Xe/kcqLYge7Cz+R5Rz23tS//eIDUmKLqQA0GI+vL6esdmHllD/LbV5hkuEKWAsAVv8Ny7lvp5Zah9KqP/J90uuER81PfWeqC22a4jm3zeUOaZ7/R4JMcS/tb2x5/zeyBphTWaoO9P0Grn0iNwOb8U6JjPnMiMiQrghQrghQrghQrghQrghQriRQsgLQAn/mVVJtsEc9c++RIQqH4ef5IcPPcUx/QspMrLpHTbJhSyNIyeNp0aEcEOEbEDtNL7tV7f1kkLIl54d7ImwI5tyTYCj8sgLQ8b2ZfU3gKfDT/KEGAtJiKwRIdzQ9/IWwAPnWvCtqbLAcJNgrxsNsUsDyxUOgQN/Ae4C203zZCwAAAAASUVORK5CYII="},null,-1),j={class:"card-footer-author"},K=D({__name:"PostCard",props:{item:{type:Object,required:!0}},setup(e){const c=e,y=x(),k=_(),d=p();function p(){return c.item.permalink||c.item._path}function _(){const t=[],n=c.item.authors;if(n){const s=n.length;n.forEach((a,l)=>{t.length<5&&(t.push(a.name),l!==s-1&&l!==2&&t.push("|"))})}return t}function x(){let t=c.item.tag||c.item.tags||c.item.category;return t||[]}function T(t){const s=t.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/),a=t.trim().substring(0,50*2);let l="";t.trim().length>50*2&&(l="...");const b=t.trim().substring(0,50);let f="";return s&&t.trim().length>50&&(f="..."),s?b+f:a+l}function g(t){if(!t)return"";const n={year:"numeric",month:"long",day:"numeric"};return new Date(t).toLocaleDateString("en",n)}function Q(t){const s=new URL("http://localhost/"+t).searchParams.get("id");console.log("link:"+t+"  id:"+s),s?L({path:t,query:{id:s}}):L({path:t})}return(t,n)=>{const s=v;return o(),r(u,null,[i("div",{class:"card-content",onClick:n[0]||(n[0]=a=>Q(`${h(d)}`))},[P(s,{to:`${h(d)}`,style:{"text-decoration":"none !important"}},{default:C(()=>[i("h2",E,[e.item.highlightTitle?(o(),r("h2",w,[i("span",{innerHTML:e.item.highlightTitle},null,8,I)])):(o(),r("h2",R,m(e.item.title),1))]),i("div",null,[(o(!0),r(u,null,A(h(y),a=>(o(),r("span",{class:"card-content-tag",key:a},m(a),1))),128))]),i("div",V,[e.item.highlightHtml?(o(),r("p",B,[i("span",{innerHTML:e.item.highlightHtml},null,8,U)])):(o(),r("p",q,m(T(e.item.description)),1))])]),_:1},8,["to"])]),i("div",M,[i("div",H,[O,N(" "+m(e.item.date?g(e.item.date):g(e.item.mtime)),1)]),i("div",j,[(o(!0),r(u,null,A(h(k),a=>(o(),r("span",{class:"card-footer-author-item",key:a},m(a),1))),128))])])],64)}}});export{K as _};