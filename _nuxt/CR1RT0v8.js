import{_ as M}from"./DWIaiIum.js";import{_ as T}from"./_SUrem8a.js";import{_ as C}from"./B1Drrn0t.js";import{_ as N}from"./Cq2O5JPV.js";import{b as S,c as B,d as E}from"./CvIXsaFB.js";import{h as q,q as i,D,s as F,o as f,c as v,b as _,a as p,I as P,W as V,X as $,w as I,d as U,B as L,z as y,F as G,A as H}from"./y9hZV2dk.js";import{M as k}from"./DshPJGOp.js";import{s as O}from"./DtSV_3PH.js";import{b as R}from"./BnSMmSmG.js";import"./Bla2xrMe.js";import"./DvDH6DOc.js";import"./BD7kVLlh.js";import"./BxEKBr3u.js";import"./CAZilBRX.js";import"./DU6H5t7H.js";const j={class:"container"},z=["innerHTML"],A={class:"articles"},me=q({__name:"index",setup(W){const m=i(""),c=S(D().public.minpress),e=i(""),o=i([]),s=i(!1),d=i(null);console.log("search....."),console.log("mode===>"+c.mode);const w=i(1);F(()=>{d&&d.value&&d.value.focus()});function x(u){const l=c.searchUrl+"?q="+u;if(console.log(l),c.mode===k.SSG)o.value=[],e.value="no markdown file find."+c.mode,s.value=!1;else if(c.mode===k.FCM)try{const t="/api/md/search";let a=performance.now();s.value=!0,e.value="",o.value=[],O({pageNo:w.value,url:t,q:u,highlight:!0}).then(n=>{if(n){o.value=n.map(b=>B(b));let r=(performance.now()-a).toFixed(2);e.value=`Mindpress found <span style="color:red">${n.length}</span> files (key:<span style="color:red">${u}</span>). Time cost: ${r} milliseconds.`}else e.value='find <span style="color:red">0</span> markdown files.';s.value=!1},n=>{s.value=!1})}catch(t){console.warn(t)}else R(l,{key:l+u},"$9f7SGOEuTp").then(t=>{const a=t.data.value;console.log(a),a&&a.totalElements>0?(o.value=a.content.map(n=>E(n)),e.value='find <span style="color:red">'+a.totalElements+"</span> markdown files.",console.log(o.value),console.log(e.value)):(o.value=[],e.value="no markdown file find.")},t=>{e.value="http request error. "+t,o.value=[]})}function h(){if(console.log("submit... q="+m.value),!m.value){o.value=[],e.value="";return}x(m.value)}return(u,l)=>{const t=M,a=T,n=C,g=N;return f(),v("div",null,[_(t),p("main",j,[p("form",{onSubmit:P(h,["prevent"]),style:{display:"flex","justify-content":"center","margin-bottom":"0rem"}},[V(p("input",{ref_key:"searchInput",ref:d,type:"text",style:{height:"2.5rem"},"onUpdate:modelValue":l[0]||(l[0]=r=>m.value=r),placeholder:"Please input your keyword."},null,512),[[$,m.value]]),_(a,{onClick:h,icon:"i-heroicons-magnifying-glass-16-solid",style:{width:"10rem","margin-left":"10px"},block:""},{default:I(()=>[U("Search")]),_:1})],32),p("label",{style:{"margin-bottom":"1rem"},innerHTML:e.value},null,8,z),s.value?(f(),L(n,{key:0,animation:"carousel"})):y("",!0),p("div",A,[s.value?y("",!0):(f(!0),v(G,{key:0},H(o.value,r=>(f(),v("div",{class:"article",key:r.id},[_(g,{item:r},null,8,["item"])]))),128))])])])}}});export{me as default};