import d from"./9xNAS3po.js";import{i as c,R as l,C as u}from"./DrStkkU3.js";import"./I3G31Tuv.js";import"./BMB_-4OD.js";import"./DvDH6DOc.js";import"./kVQ6IzbF.js";const p=(r,t)=>u("pre",null,JSON.stringify({message:"You should use slots with <ContentList>",slot:r,data:t},null,2)),h=c({name:"ContentList",props:{path:{type:String,required:!1,default:void 0},query:{type:Object,required:!1,default:void 0}},render(r){const t=l(),{path:f,query:a}=r,m={...a||{},path:f||(a==null?void 0:a.path)||"/"};return u(d,m,{default:t!=null&&t.default?({data:e,refresh:o,isPartial:n})=>t.default({list:e,refresh:o,isPartial:n,...this.$attrs}):e=>p("default",e.data),empty:e=>t!=null&&t.empty?t.empty(e):p("default",e==null?void 0:e.data),"not-found":e=>{var o;return t!=null&&t["not-found"]?(o=t==null?void 0:t["not-found"])==null?void 0:o.call(t,e):p("not-found",e==null?void 0:e.data)}})}}),S=h;export{S as default};
