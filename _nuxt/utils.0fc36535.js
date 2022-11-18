import{h as T}from"./index.9bb628c0.js";import{u as D}from"./asyncData.ce69310f.js";import{u as m,j as U,W as _}from"./entry.7c820767.js";function W(t,e,o){const[a={},c]=typeof e=="string"?[{},e]:[e,o],s=a.key||T([c,m(a.baseURL),typeof t=="string"?t:"",m(a.params)]);if(!s||typeof s!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+s);if(!t)throw new Error("[nuxt] [useFetch] request is missing.");const i=s===c?"$f"+s:s,r=U(()=>{let u=t;return typeof u=="function"&&(u=u()),m(u)}),{server:n,lazy:p,default:d,transform:y,pick:h,watch:k,immediate:b,...g}=a,f=_({...g,cache:typeof a.cache=="boolean"?void 0:a.cache}),w={server:n,lazy:p,default:d,transform:y,pick:h,immediate:b,watch:[f,r,...k||[]]};let l;return D(i,()=>{var u;return(u=l==null?void 0:l.abort)==null||u.call(l),l=typeof AbortController<"u"?new AbortController:{},$fetch(r.value,{signal:l.signal,...f})},w)}const L=t=>({articleid:t.articleid,authors:[{name:t.createBy,link:t.createBy}],category:t.category,createBy:t.createBy,createTime:t.createTime,editlink:"/edit/"+t.articleid,date:t.createTime,description:t.desc,id:t.id,isPublic:t.isPublic===1,likeCount:t.likeCountVo||0,permalink:"/article/"+t.articleid,reviewInfo:t.reviewInfo,status:t.status,space:t.space,tags:t.tags?t.tags.split(","):[],title:t.title,updateTime:t.updateTime,_type:"markdown"}),P=t=>({title:t.title,description:t.description,permalink:t.permalink?t.permalink:t._path,date:t.date?t.date:new Date,createTime:t.date?t.date:new Date,id:t._id,articleid:t._id}),V=t=>({mode:t.mode,contentUrl:t.baseUrl+"content",metaUrl:t.baseUrl+"meta",spaceUrl:t.baseUrl+"space",searchUrl:t.baseUrl+"search"}),j=(t,e)=>t?new Date(t).toLocaleDateString(e||"en",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"}):"",x=t=>{let e=t.split(`
`),o=0,a={},c=["title","author","categories","category","tags","tag","date","permalink","desc"],s=0;for(var i=0;i<e.length&&!(e[i].trim()==="---"&&(o++,s++,o===2));i++)if(e[i].includes(":")){let r=e[i].split(/:(.*)/s),n=r[0].trim(),p=r[1].trim();n==="author"?a[n]=O(p):c.indexOf(n)>=0&&(a[n]=p)}if(!a.desc){let r="",n=0;for(var i=s;i<e.length;i++)if(n>0&&(r+=e[i]),e[i].trim().startsWith("#")){if(n>0)break;n=i+1}a.desc=r}return a},O=t=>{let e=t.trim().startsWith("{")&&t.trim().endsWith("}")?t.substring(t.indexOf("{")+1,t.indexOf("}")):t,o={};for(let a of e.split(","))if(a.includes(":")){let c=a.split(":");o[c[0].trim()]=c[1].trim()}return o};export{j as a,L as b,P as c,V as m,x as s,W as u};
