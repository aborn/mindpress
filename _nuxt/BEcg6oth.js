import{_ as M}from"./CwJNXQ4A.js";import{_ as N}from"./lpxAn8BS.js";import{_ as S}from"./DS0j5Zy6.js";import{_ as B}from"./BlyzYL4v.js";import{b as F,c as q,d as D}from"./CvIXsaFB.js";import{h as E,q as u,D as P,o as p,c as v,b as _,a as d,I as V,W as U,X as I,f as L,w as $,d as G,B as H,z as y,F as O,A as R}from"./xU66j0Gh.js";import{c as j,s as x}from"./Gc76Izq1.js";import{M as g}from"./DshPJGOp.js";import{b as z}from"./CJPUELYX.js";import"./BlKNQJ4q.js";import"./DvDH6DOc.js";import"./BUI-ftJx.js";import"./D5SWTNgg.js";import"./CAZilBRX.js";import"./Ccn6XVQG.js";const A={class:"container"},W=["innerHTML"],X={class:"articles"},ue=E({__name:"index",setup(J){const c=u(""),i=F(P().public.minpress),a=u(""),s=u([]),m=u(!1);console.log("search....."),console.log("mode===>"+i.mode);const h=u(1),T=j();function b(r){const o=r;if(console.log("----onchanged:"+o),!r||r.length==0||i.mode!==g.FCM)return;const t="/api/md/search",n=performance.now();x({pageNo:h.value,url:t,q:o,autoSuggest:!0}).then(e=>{e&&(console.log(e),(performance.now()-n).toFixed(2))},e=>{console.warn(e)})}function k(r){const o=i.searchUrl+"?q="+r;if(console.log(o),i.mode===g.SSG)s.value=[],a.value="no markdown file find."+i.mode,m.value=!1;else if(i.mode===g.FCM)try{const t="/api/md/search";let n=performance.now();m.value=!0,x({pageNo:h.value,url:t,q:r,highlight:!0}).then(e=>{if(e){s.value=e.map(C=>q(C));let l=(performance.now()-n).toFixed(2);a.value='find <span style="color:red">'+e.length+`</span> markdown files. Time cost: ${l} milliseconds.`}else a.value='find <span style="color:red">0</span> markdown files.';m.value=!1},e=>{m.value=!1})}catch(t){console.warn(t)}else z(o,{key:o+r},"$9f7SGOEuTp").then(t=>{const n=t.data.value;console.log(n),n&&n.totalElements>0?(s.value=n.content.map(e=>D(e)),a.value='find <span style="color:red">'+n.totalElements+"</span> markdown files.",console.log(s.value),console.log(a.value)):(s.value=[],a.value="no markdown file find.")},t=>{a.value="http request error. "+t,s.value=[]})}function w(){if(console.log("submit... q="+c.value),!c.value){s.value=[],a.value="";return}k(c.value)}return(r,o)=>{const t=M,n=N,e=S,f=B;return p(),v("div",null,[_(t),d("main",A,[d("form",{onSubmit:V(w,["prevent"]),style:{display:"flex","justify-content":"center","margin-bottom":"0rem"}},[U(d("input",{type:"text",style:{height:"2.5rem"},"onUpdate:modelValue":o[0]||(o[0]=l=>c.value=l),placeholder:"Please input your keyword.",onInput:o[1]||(o[1]=l=>L(T)(()=>b(l.target.value),500))},null,544),[[I,c.value]]),_(n,{onClick:w,icon:"i-heroicons-magnifying-glass-16-solid",style:{width:"10rem","margin-left":"10px"},block:""},{default:$(()=>[G("Search")]),_:1})],32),d("label",{style:{"margin-bottom":"1rem"},innerHTML:a.value},null,8,W),m.value?(p(),H(e,{key:0,animation:"carousel"})):y("",!0),d("div",X,[m.value?y("",!0):(p(!0),v(O,{key:0},R(s.value,l=>(p(),v("div",{class:"article",key:l.id},[_(f,{item:l},null,8,["item"])]))),128))])])])}}});export{ue as default};
