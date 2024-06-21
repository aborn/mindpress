import{_ as O,u as U}from"./Comx4sti.js";import{_ as R}from"./1o8Ddfcl.js";import{_ as L,h as P,o as s,B as c,w as S,r as f,a3 as z,a5 as N,n as k,H,a as V,a6 as D,m as M,g as B,i as Q,j as l,k as T,l as C,y as w,z as I,c as E,t as G}from"./RXETUc0K.js";import{i as J}from"./DvDH6DOc.js";import{u as F}from"./Bs7rpeSV.js";const q={to:{type:[String,Object],default:void 0,required:!1},href:{type:[String,Object],default:void 0,required:!1},target:{type:String,default:void 0,required:!1},rel:{type:String,default:void 0,required:!1},noRel:{type:Boolean,default:void 0,required:!1},prefetch:{type:Boolean,default:void 0,required:!1},noPrefetch:{type:Boolean,default:void 0,required:!1},activeClass:{type:String,default:void 0,required:!1},exactActiveClass:{type:String,default:void 0,required:!1},prefetchedClass:{type:String,default:void 0,required:!1},replace:{type:Boolean,default:void 0,required:!1},ariaCurrentValue:{type:String,default:void 0,required:!1},external:{type:Boolean,default:void 0,required:!1}},K=e=>Object.keys(q).reduce((a,i)=>(e[i]!==void 0&&(a[i]=e[i]),a),{}),W={base:"focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0",font:"font-medium",rounded:"rounded-md",truncate:"text-left break-all line-clamp-1",block:"w-full flex justify-center items-center",inline:"inline-flex items-center",size:{"2xs":"text-xs",xs:"text-xs",sm:"text-sm",md:"text-sm",lg:"text-sm",xl:"text-base"},gap:{"2xs":"gap-x-1",xs:"gap-x-1.5",sm:"gap-x-1.5",md:"gap-x-2",lg:"gap-x-2.5",xl:"gap-x-2.5"},padding:{"2xs":"px-2 py-1",xs:"px-2.5 py-1.5",sm:"px-2.5 py-1.5",md:"px-3 py-2",lg:"px-3.5 py-2.5",xl:"px-3.5 py-2.5"},square:{"2xs":"p-1",xs:"p-1.5",sm:"p-1.5",md:"p-2",lg:"p-2.5",xl:"p-2.5"},color:{white:{solid:"shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",ghost:"text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-900 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"},gray:{solid:"shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",ghost:"text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",link:"text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"},black:{solid:"shadow-sm text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",link:"text-gray-900 dark:text-white underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"}},variant:{solid:"shadow-sm text-white dark:text-gray-900 bg-{color}-500 hover:bg-{color}-600 disabled:bg-{color}-500 dark:bg-{color}-400 dark:hover:bg-{color}-500 dark:disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400",outline:"ring-1 ring-inset ring-current text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",soft:"text-{color}-500 dark:text-{color}-400 bg-{color}-50 hover:bg-{color}-100 disabled:bg-{color}-50 dark:bg-{color}-950 dark:hover:bg-{color}-900 dark:disabled:bg-{color}-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",ghost:"text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",link:"text-{color}-500 hover:text-{color}-600 disabled:text-{color}-500 dark:text-{color}-400 dark:hover:text-{color}-500 dark:disabled:text-{color}-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400"},icon:{base:"flex-shrink-0",loading:"animate-spin",size:{"2xs":"h-4 w-4",xs:"h-4 w-4",sm:"h-5 w-5",md:"h-5 w-5",lg:"h-5 w-5",xl:"h-6 w-6"}},default:{size:"sm",variant:"solid",color:"primary",loadingIcon:"i-heroicons-arrow-path-20-solid"}},X=P({inheritAttrs:!1,props:{...q,as:{type:String,default:"button"},type:{type:String,default:"button"},disabled:{type:Boolean,default:null},active:{type:Boolean,default:void 0},exact:{type:Boolean,default:!1},exactQuery:{type:Boolean,default:!1},exactHash:{type:Boolean,default:!1},inactiveClass:{type:String,default:void 0}},setup(e){function n(a,i,{isActive:r,isExactActive:d}){return e.exactQuery&&!J(a.query,i.query)||e.exactHash&&a.hash!==i.hash?e.inactiveClass:e.exact&&d||!e.exact&&r?e.activeClass:e.inactiveClass}return{resolveLinkClass:n}}}),Y=["href","aria-disabled","role","rel","target","onClick"];function Z(e,n,a,i,r,d){const o=R;return e.to?(s(),c(o,k({key:1},e.$props,{custom:""}),{default:S(({route:u,href:b,target:m,rel:h,navigate:p,isActive:v,isExactActive:y,isExternal:x})=>[V("a",k(e.$attrs,{href:e.disabled?void 0:b,"aria-disabled":e.disabled?"true":void 0,role:e.disabled?"link":void 0,rel:h,target:m,class:e.active!==void 0?e.active?e.activeClass:e.inactiveClass:e.resolveLinkClass(u,e._.provides[D]||e.$route,{isActive:v,isExactActive:y}),onClick:g=>!x&&!e.disabled&&p(g)}),[f(e.$slots,"default",z(N({isActive:e.active!==void 0?e.active:e.exact?y:v})))],16,Y)]),_:3},16)):(s(),c(H(e.as),k({key:0,type:e.type,disabled:e.disabled},e.$attrs,{class:e.active?e.activeClass:e.inactiveClass}),{default:S(()=>[f(e.$slots,"default",z(N({isActive:e.active})))]),_:3},16,["type","disabled","class"]))}const A=L(X,[["render",Z]]),t=M(B.ui.strategy,B.ui.button,W),_=P({components:{UIcon:O,ULink:A},inheritAttrs:!1,props:{...q,type:{type:String,default:"button"},block:{type:Boolean,default:!1},label:{type:String,default:null},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},padded:{type:Boolean,default:!0},size:{type:String,default:()=>t.default.size,validator(e){return Object.keys(t.size).includes(e)}},color:{type:String,default:()=>t.default.color,validator(e){return[...B.ui.colors,...Object.keys(t.color)].includes(e)}},variant:{type:String,default:()=>t.default.variant,validator(e){return[...Object.keys(t.variant),...Object.values(t.color).flatMap(n=>Object.keys(n))].includes(e)}},icon:{type:String,default:null},loadingIcon:{type:String,default:()=>t.default.loadingIcon},leadingIcon:{type:String,default:null},trailingIcon:{type:String,default:null},trailing:{type:Boolean,default:!1},leading:{type:Boolean,default:!1},square:{type:Boolean,default:!1},truncate:{type:Boolean,default:!1},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},setup(e,{slots:n}){const{ui:a,attrs:i}=U("button",Q(e,"ui"),t),{size:r,rounded:d}=F({ui:a,props:e}),o=l(()=>e.icon&&e.leading||e.icon&&!e.trailing||e.loading&&!e.trailing||e.leadingIcon),u=l(()=>e.icon&&e.trailing||e.loading&&e.trailing||e.trailingIcon),b=l(()=>e.square||!n.default&&!e.label),m=l(()=>{var $,j;const g=((j=($=a.value.color)==null?void 0:$[e.color])==null?void 0:j[e.variant])||a.value.variant[e.variant];return T(C(a.value.base,a.value.font,d.value,a.value.size[r.value],a.value.gap[r.value],e.padded&&a.value[b.value?"square":"padding"][r.value],g==null?void 0:g.replaceAll("{color}",e.color),e.block?a.value.block:a.value.inline),e.class)}),h=l(()=>e.loading?e.loadingIcon:e.leadingIcon||e.icon),p=l(()=>e.loading&&!o.value?e.loadingIcon:e.trailingIcon||e.icon),v=l(()=>C(a.value.icon.base,a.value.icon.size[r.value],e.loading&&a.value.icon.loading)),y=l(()=>C(a.value.icon.base,a.value.icon.size[r.value],e.loading&&!o.value&&a.value.icon.loading)),x=l(()=>K(e));return{ui:a,attrs:i,isLeading:o,isTrailing:u,isSquare:b,buttonClass:m,leadingIconName:h,trailingIconName:p,leadingIconClass:v,trailingIconClass:y,linkProps:x}}});function ee(e,n,a,i,r,d){const o=O,u=A;return s(),c(u,k({type:e.type,disabled:e.disabled||e.loading,class:e.buttonClass},{...e.linkProps,...e.attrs}),{default:S(()=>[f(e.$slots,"leading",{disabled:e.disabled,loading:e.loading},()=>[e.isLeading&&e.leadingIconName?(s(),c(o,{key:0,name:e.leadingIconName,class:w(e.leadingIconClass),"aria-hidden":"true"},null,8,["name","class"])):I("",!0)]),f(e.$slots,"default",{},()=>[e.label?(s(),E("span",{key:0,class:w([e.truncate?e.ui.truncate:""])},G(e.label),3)):I("",!0)]),f(e.$slots,"trailing",{disabled:e.disabled,loading:e.loading},()=>[e.isTrailing&&e.trailingIconName?(s(),c(o,{key:0,name:e.trailingIconName,class:w(e.trailingIconClass),"aria-hidden":"true"},null,8,["name","class"])):I("",!0)])]),_:3},16,["type","disabled","class"])}const ne=L(_,[["render",ee]]);export{ne as _,W as b};
