var v=Object.defineProperty;var r=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable;var p=(e,t,a)=>t in e?v(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,s=(e,t)=>{for(var a in t||(t={}))m.call(t,a)&&p(e,a,t[a]);if(r)for(var a of r(t))g.call(t,a)&&p(e,a,t[a]);return e};import{j as d,a as y,w as l,b as u,d as w,t as C,c as N,u as $,h as j}from"./entry-bece9766.mjs";const T=e=>{const t=e==null?void 0:e.params(),a=l(t?`/navigation/${u(t)}`:"/navigation");return $fetch(a,{method:"GET",responseType:"json",params:{_params:d(t||{}),previewToken:y("previewToken").value}})};var b=w({props:{query:{type:Object,required:!1,default:void 0}},async setup(e){const{query:t}=C(e),{data:a,refresh:n}=await N(`content-navigation-${u(t.value)}`,()=>T(t.value));return{data:a,refresh:n}},render(e){var i;const t=$(),{query:a,data:n,refresh:f}=e,o=(c,h)=>j("pre",null,JSON.stringify({message:"You should use slots with <ContentNavigation>",slot:c,data:h},null,2));return(t==null?void 0:t.empty)&&(!n||!(n!=null&&n.length))?((i=t==null?void 0:t.empty)==null?void 0:i.call(t,s({query:a},this.$attrs)))||o("empty",{query:a,data:n}):t!=null&&t.default?t.default(s({navigation:n,refresh:f},this.$attrs)):o("default",n)}});export{b as default};
