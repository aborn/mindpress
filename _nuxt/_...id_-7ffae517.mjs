import{_ as N}from"./NavBar-02981f6b.mjs";import{_ as b,E as V,o as g,e as S,f,r as w,F as A,x as k,l as B,z as T,y as m,i as M,k as p,n as h,G as U,H as j,q,I,J as P,g as F,v as J}from"./entry-ad12b9e4.mjs";import{m as C,s as R,u as O}from"./utils-c77ca9fc.mjs";const $={name:V,props:{placeholder:String,tag:{type:String,default:"span"}}};function z(l,i,s,t,n,c){const o=A;return g(),S(o,{placeholder:s.placeholder,"placeholder-tag":s.tag},{default:f(()=>[w(l.$slots,"default")]),_:3},8,["placeholder","placeholder-tag"])}var G=b($,[["render",z]]);const H={data:()=>({hint:"",articleid:"",title:"",mp:{}}),methods:{changeAction(l){},saveAction(l){const t=k().params.id[0]||this.articleid,n=JSON.stringify(R(l));console.log(n),n.title&&n.title!==""&&(this.title=n.title);const c=this.title;console.log("--- now save event triggled. articleid="+t+"---");const o=t+"t"+new Date;console.log(this.mp),O(this.mp.contentUrl,{key:o,method:"POST",headers:{"Content-Type":"application/json"},body:{articleid:t,content:l,title:c,extInfo:n,pub:!0}}).then(r=>{const e=r.data.value,a=r.error.value;console.log(e),console.log(a),this.hint=e?e.msg:a,e&&e.success&&(this.hint=e.msg+" ,Time:"+new Date,e.ext&&e.ext.articleid&&(console.log(e.ext.articleid),this.articleid=e.ext.articleid))},r=>{console.log("exception..."),console.log(r)})}}},L=Object.assign(H,{__name:"[...id]",async setup(l,{expose:i}){i();let s,t;const n=k(),c=n.params.id,o=c[0],r=["github"],e=C(B().public.minpress),a=e.contentUrl+"/"+o;console.log(a);const _={content:"",id:0},{data:v}=o?([s,t]=T(()=>O(a)),s=await s,t(),s):_,x=d=>d.value?{content:d.value.content,title:d.value.title,id:d.value.id,msg:"success",status:!0}:(console.log("error in http"),{content:"",id:0,msg:"error http fetch content, articleid="+o,status:!1,title:""}),u=o?x(v):_,D=m(u.content),E=m(u.title),y={route:n,articleids:c,articleid:o,toolbarsExclude:r,mp:e,url:a,defaultData:_,data:v,processData:x,pData:u,mkdContent:D,title:E,ref:m,MdEditor:P,mpConfig:C};return Object.defineProperty(y,"__isScriptSetup",{enumerable:!1,value:!0}),y}}),K={class:"container"},Q=J("Article Detail");function W(l,i,s,t,n,c){const o=N,r=F,e=G;return g(),M("div",null,[p(o),h("main",K,[U(h("input",{id:"title",name:"title",style:{height:"2.5rem"},placeholder:"Article title","onUpdate:modelValue":i[0]||(i[0]=a=>t.title=a),required:""},null,512),[[j,t.title]]),h("label",null,q(l.hint),1),t.articleid?(g(),S(r,{key:0,to:`/article/${t.articleid}`,class:"secondary",target:"_blank"},{default:f(()=>[Q]),_:1},8,["to"])):I("",!0),p(e,{placeholder:"loading...",tag:"span"},{default:f(()=>[p(t.MdEditor,{modelValue:t.mkdContent,"onUpdate:modelValue":i[1]||(i[1]=a=>t.mkdContent=a),theme:l.$colorMode.value,toolbarsExclude:t.toolbarsExclude,style:{height:"480px"},onOnChange:c.changeAction,onOnSave:c.saveAction},null,8,["modelValue","theme","onOnChange","onOnSave"])]),_:1})])])}var tt=b(L,[["render",W]]);export{tt as default};
