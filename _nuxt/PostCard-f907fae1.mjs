import{_ as A,o as c,i as m,n as a,k as d,f as g,q as h,F as l,K as f,v as _,g as p}from"./entry-bece9766.mjs";const y={props:{item:{type:Object,required:!0}},data:function(){return{tags:this.assembyTags(),authors:this.assembyAuthors(),link:this.prelink()}},methods:{prelink(){return this.item.permalink||this.item._path},assembyAuthors(){let t=[];this.item.author&&t.push(this.item.author),Array.isArray(this.item.authors)&&this.item.authors.forEach(r=>{t.push(r)});let s=[];const e=t.length;return t.forEach((r,i)=>{s.push(r.name),i!==e-1&&s.push("|")}),s},assembyTags(){let t=this.item.tag||this.item.tags||this.item.category;return t||["MindPress"]},formatDesc(t){const e=t.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/),r=t.trim().substr(0,50*2);let i="";t.trim().length>50*2&&(i="...");const n=t.trim().substr(0,50);let u="";return e&&t.trim().length>50&&(u="..."),e?n+u:r+i},formatDate(t){if(!t)return"";const s={year:"numeric",month:"long",day:"numeric"};return new Date(t).toLocaleDateString("en",s)}}},k={class:"card-content"},L={class:"card-content-title"},D={class:"card-content-desc"},x={class:"card-footer"},b={class:"card-footer-date"},Q=a("img",{style:{"max-width":"12.5px","margin-right":"0.1rem"},src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABQElEQVRoge2aWwqDMBBFb4u76DraNfjl5lvpv49VCLYfTiRiHkajGWUOBDEOM7l5DYYAy8kB1AB+VCqqi8Xe/kcqLYge7Cz+R5Rz23tS//eIDUmKLqQA0GI+vL6esdmHllD/LbV5hkuEKWAsAVv8Ny7lvp5Zah9KqP/J90uuER81PfWeqC22a4jm3zeUOaZ7/R4JMcS/tb2x5/zeyBphTWaoO9P0Grn0iNwOb8U6JjPnMiMiQrghQrghQrghQrghQrghQriRQsgLQAn/mVVJtsEc9c++RIQqH4ef5IcPPcUx/QspMrLpHTbJhSyNIyeNp0aEcEOEbEDtNL7tV7f1kkLIl54d7ImwI5tyTYCj8sgLQ8b2ZfU3gKfDT/KEGAtJiKwRIdzQ9/IWwAPnWvCtqbLAcJNgrxsNsUsDyxUOgQN/Ae4C203zZCwAAAAASUVORK5CYII="},null,-1),E={class:"card-footer-author"};function v(t,s,e,r,i,n){const u=p;return c(),m(l,null,[a("div",k,[d(u,{to:`${t.link}`,style:{"text-decoration":"none !important"}},{default:g(()=>[a("h2",L,h(e.item.title),1),a("div",null,[(c(!0),m(l,null,f(t.tags,o=>(c(),m("span",{class:"card-content-tag",key:o},h(o),1))),128))]),a("p",D,h(n.formatDesc(e.item.description)),1)]),_:1},8,["to"])]),a("div",x,[a("div",b,[Q,_(" "+h(e.item.date?n.formatDate(e.item.date):n.formatDate(e.item.mtime)),1)]),a("div",E,[(c(!0),m(l,null,f(t.authors,o=>(c(),m("span",{class:"card-footer-author-item",key:o},h(o),1))),128))])])],64)}var I=A(y,[["render",v]]);export{I as _};
