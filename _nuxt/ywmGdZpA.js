const g=t=>{const i={articleid:t.articleid,authors:[{name:t.createBy,link:t.createBy}],category:t.category,createBy:t.createBy,createTime:t.createTime,editlink:"/edit/"+t.articleid,date:t.createTime,description:t.desc,id:t.id,isPublic:t.isPublic===1,likeCount:t.likeCountVo||0,permalink:"/article/"+t.articleid,reviewInfo:t.reviewInfo,status:t.status,space:t.space,tags:t.tags?t.tags.split(","):[],title:t.title,updateTime:t.updateTime,_type:"markdown"};if(t.highlight)for(let n in t.highlight){let e="";t.highlight.hasOwnProperty(n)&&(e+=t.highlight[n].join(" "));const o='<span style="color:red">',r=e.indexOf(o),a="</span>",s=e.lastIndexOf(a),l=100+o.length;if(r>=0){const c=r-10>0?r-10:0;let h=r+l>e.length?e.length-1:r+l;s>0&&(h=s+a.length>e.length?e.length-1:s+a.length);const u=e.substring(c,h);n==="content"?i.highlightHtml=u:n==="title"&&(i.highlightTitle=e)}}return i},d=t=>t==="localhost"||t==="127.0.0.1",f=(t,i)=>({title:t.title,description:t.description,permalink:t.permalink,link:t.permalink?t.permalink:i?t._id?"/article/"+t._id:t._path:t._path?t._path:"/article/"+t._id,date:t.date?t.date:new Date,createTime:t.date?t.date:new Date,id:t._id,articleid:t._id,author:t.author,_path:t._path,_id:t._id,authors:t.authors?t.authors:t.author?[t.author]:[]}),m=t=>({mode:t.mode,contentUrl:t.baseUrl+"content",metaUrl:t.baseUrl+"meta",spaceUrl:t.baseUrl+"space",searchUrl:t.baseUrl+"search"}),k=(t,i)=>t?new Date(t).toLocaleDateString(i||"en",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"}):"",y=t=>{let i=t.split(`
`),n=0,e={},o=["title","author","categories","category","tags","tag","date","permalink","desc"],r=0;for(var a=0;a<i.length&&!(i[a].trim()==="---"&&(n++,r++,n===2));a++)if(i[a].includes(":")){let s=i[a].split(/:(.*)/s),l=s[0].trim(),c=s[1].trim();l==="author"?e[l]=p(c):o.indexOf(l)>=0&&(e[l]=c)}if(!e.desc){let s="",l=0;for(var a=r;a<i.length;a++)if(l>0&&(s+=i[a]),i[a].trim().startsWith("#")){if(l>0)break;l=a+1}e.desc=s}return e},p=t=>{let i=t.trim().startsWith("{")&&t.trim().endsWith("}")?t.substring(t.indexOf("{")+1,t.indexOf("}")):t,n={};for(let e of i.split(","))if(e.includes(":")){let o=e.split(":");n[o[0].trim()]=o[1].trim()}return n};export{k as a,f as b,g as c,d as i,m,y as s};
