import{U as d,K as s,j as r,s as o,Y as l,a1 as v}from"./DVzZLM5D.js";function p({ui:a,props:i}){const u=v();if(d("ButtonGroupContextConsumer",!0),s("ButtonGroupContextConsumer",!1))return{size:r(()=>i.size),rounded:r(()=>a.value.rounded)};let n=u.parent,e;for(;n&&!e;){if(n.type.name==="ButtonGroup"){e=s(`group-${n.uid}`);break}n=n.parent}const t=r(()=>e==null?void 0:e.value.children.indexOf(u));return o(()=>{e==null||e.value.register(u)}),l(()=>{e==null||e.value.unregister(u)}),{size:r(()=>(e==null?void 0:e.value.size)||i.size),rounded:r(()=>!e||t.value===-1?a.value.rounded:e.value.children.length===1?e.value.ui.rounded:t.value===0?e.value.rounded.start:t.value===e.value.children.length-1?e.value.rounded.end:"rounded-none")}}export{p as u};
