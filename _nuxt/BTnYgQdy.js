import{_ as B,m as M,g as v,h as z,i as P,j as A,k as H,l as N,o as i,c as s,r as D,d as j,t as u,n as U,a as o,b as S,w as $,F as x,A as C,f as _,B as I,aa as L}from"./DKuRiMMa.js";import{u as V,_ as q}from"./DKve-f8A.js";import{u as E}from"./CnVSmGKH.js";import{_ as F}from"./DOVrwbPH.js";const R={base:"inline-flex items-center",rounded:"rounded-md",font:"font-medium",size:{xs:"text-xs px-1.5 py-0.5",sm:"text-xs px-2 py-1",md:"text-sm px-2 py-1",lg:"text-sm px-2.5 py-1.5"},color:{white:{solid:"ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white dark:bg-gray-900"},gray:{solid:"ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800"},black:{solid:"text-white dark:text-gray-900 bg-gray-900 dark:bg-white"}},variant:{solid:"bg-{color}-500 dark:bg-{color}-400 text-white dark:text-gray-900",outline:"text-{color}-500 dark:text-{color}-400 ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400",soft:"bg-{color}-50 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400",subtle:"bg-{color}-50 dark:bg-{color}-400 dark:bg-opacity-10 text-{color}-500 dark:text-{color}-400 ring-1 ring-inset ring-{color}-500 dark:ring-{color}-400 ring-opacity-25 dark:ring-opacity-25"},default:{size:"sm",variant:"solid",color:"primary"}},l=M(v.ui.strategy,v.ui.badge,R),G=z({inheritAttrs:!1,props:{size:{type:String,default:()=>l.default.size,validator(t){return Object.keys(l.size).includes(t)}},color:{type:String,default:()=>l.default.color,validator(t){return[...v.ui.colors,...Object.keys(l.color)].includes(t)}},variant:{type:String,default:()=>l.default.variant,validator(t){return[...Object.keys(l.variant),...Object.values(l.color).flatMap(r=>Object.keys(r))].includes(t)}},label:{type:[String,Number],default:null},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},setup(t){const{ui:r,attrs:h}=V("badge",P(t,"ui"),l),{size:y,rounded:g}=E({ui:r,props:t}),p=A(()=>{var k,b;const m=((b=(k=r.value.color)==null?void 0:k[t.color])==null?void 0:b[t.variant])||r.value.variant[t.variant];return H(N(r.value.base,r.value.font,g.value,r.value.size[y.value],m==null?void 0:m.replaceAll("{color}",t.color)),t.class)});return{attrs:h,badgeClass:p}}});function J(t,r,h,y,g,p){return i(),s("span",U({class:t.badgeClass},t.attrs),[D(t.$slots,"default",{},()=>[j(u(t.label),1)])],16)}const K=B(G,[["render",J]]),Q={class:"card-content-title"},W={key:0,class:"card-content-title"},X=["innerHTML"],Y={key:1,class:"card-content-title"},Z={class:"card-content-desc"},tt={key:0,class:"card-content-desc"},et=["innerHTML"],rt={key:1,class:"card-content-desc"},at={class:"card-footer"},nt={class:"card-footer-date"},ot={class:"card-footer-item"},it={class:"card-footer-author"},ut=z({__name:"PostCard",props:{item:{type:Object,required:!0}},setup(t){const r=t,h=k(),y=m(),g=p();function p(){return r.item.permalink||r.item._path}function m(){const e=[],a=r.item.authors;if(a){const n=a.length;a.forEach((f,d)=>{e.length<5&&(e.push(f.name),d!==n-1&&d!==2&&e.push("|"))})}return e}function k(){let e=r.item.tag||r.item.tags||r.item.category;return e||[]}function b(e){if(!e)return"";const a=50,n=e.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/),f=e.trim().substring(0,a*2);let d="";e.trim().length>a*2&&(d="...");const c=e.trim().substring(0,a);let T="";return n&&e.trim().length>a&&(T="..."),n?c+T:f+d}function w(e){if(!e)return"";const a={year:"numeric",month:"long",day:"numeric"};return new Date(e).toLocaleDateString("en",a)}function O(e){const n=new URL("http://localhost/"+e).searchParams.get("id");console.log("link:"+e+"  id:"+n),n?L({path:e,query:{id:n}}):L({path:e})}return(e,a)=>{const n=K,f=F,d=q;return i(),s(x,null,[o("div",{class:"card-content",onClick:a[0]||(a[0]=c=>O(`${_(g)}`))},[S(f,{to:`${_(g)}`,style:{"text-decoration":"none !important"}},{default:$(()=>[o("h2",Q,[t.item.highlightTitle?(i(),s("h2",W,[o("span",{innerHTML:t.item.highlightTitle},null,8,X)])):(i(),s("h2",Y,u(t.item.title),1))]),o("div",null,[(i(!0),s(x,null,C(_(h),c=>(i(),I(n,{key:c,ui:{rounded:"rounded-full"},size:"xs",style:{"margin-right":"5px"}},{default:$(()=>[j(u(c),1)]),_:2},1024))),128))]),o("div",Z,[t.item.highlightHtml?(i(),s("p",tt,[o("span",{innerHTML:t.item.highlightHtml},null,8,et)])):(i(),s("p",rt,u(b(t.item.description)),1))])]),_:1},8,["to"])]),o("div",at,[o("div",nt,[o("span",ot,[S(d,{name:"i-heroicons-calendar-days"})]),j(" "+u(t.item.date?w(t.item.date):w(t.item.mtime)),1)]),o("div",it,[(i(!0),s(x,null,C(_(y),c=>(i(),s("span",{class:"card-footer-author-item",key:c},u(c),1))),128))])])],64)}}});export{ut as _};