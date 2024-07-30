import G from"./GV5k4iql.js";import V from"./BTaUj5aw.js";import{u as Y}from"./BeIXggyZ.js";import{x as k,r as g,J as q,G as b,B as J,P as Q,aG as x,y as W,_ as ee,at as X,au as O,K,A as te,S as C,o as D,c as $,F as oe,k as ne,q as z,w as y,b as S,W as T,s as P,aw as U,R as I,ax as se,d as j,t as M,M as le,X as ae}from"./Bqnd1YEV.js";import{I as N,u as R,o as h,A,N as F,a as B,l as re}from"./CLxQNszB.js";import{s as ue}from"./GJ4jZYhg.js";import{t as ie,i as w,l as ce}from"./SdFXca3d.js";import{u as pe,o as de}from"./Dvlp8htJ.js";import{b as fe}from"./blSOxsGD.js";import"./CBFedrLV.js";import"./CgVkkDzh.js";import"./y2sVCqiy.js";import"./CTZ2Hakn.js";import"./eKH4vHJG.js";const me={wrapper:"w-full flex flex-col",container:"w-full flex flex-col",item:{base:"",size:"text-sm",color:"text-gray-500 dark:text-gray-400",padding:"pt-1.5 pb-3",icon:"ms-auto transform transition-transform duration-200 flex-shrink-0"},transition:{enterActiveClass:"overflow-hidden transition-[height] duration-200 ease-out",leaveActiveClass:"overflow-hidden transition-[height] duration-200 ease-out"},default:{openIcon:"i-heroicons-chevron-down-20-solid",closeIcon:"",class:"mb-1.5 w-full",variant:"soft",truncate:!0}};var ve=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(ve||{});let Z=Symbol("DisclosureContext");function L(e){let c=W(Z,null);if(c===null){let d=new Error(`<${e} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(d,L),d}return c}let _=Symbol("DisclosurePanelContext");function ge(){return W(_,null)}let ye=k({name:"Disclosure",props:{as:{type:[Object,String],default:"template"},defaultOpen:{type:[Boolean],default:!1}},setup(e,{slots:c,attrs:d}){let u=g(e.defaultOpen?0:1),o=g(null),p=g(null),a={buttonId:g(`headlessui-disclosure-button-${N()}`),panelId:g(`headlessui-disclosure-panel-${N()}`),disclosureState:u,panel:o,button:p,toggleDisclosure(){u.value=R(u.value,{0:1,1:0})},closeDisclosure(){u.value!==1&&(u.value=1)},close(l){a.closeDisclosure();let i=l?l instanceof HTMLElement?l:l.value instanceof HTMLElement?h(l):h(a.button):h(a.button);i==null||i.focus()}};return q(Z,a),ie(b(()=>R(u.value,{0:w.Open,1:w.Closed}))),()=>{let{defaultOpen:l,...i}=e,f={open:u.value===0,close:a.close};return A({theirProps:i,ourProps:{},slot:f,slots:c,attrs:d,name:"Disclosure"})}}}),he=k({name:"DisclosureButton",props:{as:{type:[Object,String],default:"button"},disabled:{type:[Boolean],default:!1},id:{type:String,default:null}},setup(e,{attrs:c,slots:d,expose:u}){let o=L("DisclosureButton"),p=ge(),a=b(()=>p===null?!1:p.value===o.panelId.value);J(()=>{a.value||e.id!==null&&(o.buttonId.value=e.id)}),Q(()=>{a.value||(o.buttonId.value=null)});let l=g(null);u({el:l,$el:l}),a.value||x(()=>{o.button.value=l.value});let i=ue(b(()=>({as:e.as,type:c.type})),l);function f(){var t;e.disabled||(a.value?(o.toggleDisclosure(),(t=h(o.button))==null||t.focus()):o.toggleDisclosure())}function v(t){var n;if(!e.disabled)if(a.value)switch(t.key){case B.Space:case B.Enter:t.preventDefault(),t.stopPropagation(),o.toggleDisclosure(),(n=h(o.button))==null||n.focus();break}else switch(t.key){case B.Space:case B.Enter:t.preventDefault(),t.stopPropagation(),o.toggleDisclosure();break}}function r(t){switch(t.key){case B.Space:t.preventDefault();break}}return()=>{var t;let n={open:o.disclosureState.value===0},{id:s,...m}=e,E=a.value?{ref:l,type:i.value,onClick:f,onKeydown:v}:{id:(t=o.buttonId.value)!=null?t:s,ref:l,type:i.value,"aria-expanded":o.disclosureState.value===0,"aria-controls":o.disclosureState.value===0||h(o.panel)?o.panelId.value:void 0,disabled:e.disabled?!0:void 0,onClick:f,onKeydown:v,onKeyup:r};return A({ourProps:E,theirProps:m,slot:n,attrs:c,slots:d,name:"DisclosureButton"})}}}),be=k({name:"DisclosurePanel",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:null}},setup(e,{attrs:c,slots:d,expose:u}){let o=L("DisclosurePanel");J(()=>{e.id!==null&&(o.panelId.value=e.id)}),Q(()=>{o.panelId.value=null}),u({el:o.panel,$el:o.panel}),q(_,o.panelId);let p=ce(),a=b(()=>p!==null?(p.value&w.Open)===w.Open:o.disclosureState.value===0);return()=>{var l;let i={open:o.disclosureState.value===0,close:o.close},{id:f,...v}=e,r={id:(l=o.panelId.value)!=null?l:f,ref:o.panel};return A({ourProps:r,theirProps:v,slot:i,attrs:c,slots:d,features:F.RenderStrategy|F.Static,visible:a.value,name:"DisclosurePanel"})}}});const H=X(O.ui.strategy,O.ui.accordion,me),De=X(O.ui.strategy,O.ui.button,fe),Se=k({components:{HDisclosure:ye,HDisclosureButton:he,HDisclosurePanel:be,UIcon:G,UButton:V},inheritAttrs:!1,props:{items:{type:Array,default:()=>[]},defaultOpen:{type:Boolean,default:!1},openIcon:{type:String,default:()=>H.default.openIcon},unmount:{type:Boolean,default:!1},closeIcon:{type:String,default:()=>H.default.closeIcon},multiple:{type:Boolean,default:!1},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},emits:["open"],setup(e,{emit:c}){const{ui:d,attrs:u}=pe("accordion",K(e,"ui"),H,K(e,"class")),o=b(()=>De),p=g([]),a=b(()=>p.value.map(({open:t})=>t));te(a,(t,n)=>{for(const s in t){const m=n[s],E=t[s];!m&&E&&c("open",s)}},{immediate:!0});function l(t,n){!e.items[t].closeOthers&&e.multiple||p.value.forEach(s=>{s.open&&s.close(n.target)})}function i(t,n){const s=t;s.style.height="0",s.offsetHeight,s.style.height=s.scrollHeight+"px",s.addEventListener("transitionend",n,{once:!0})}function f(t){const n=t;n.style.height=n.scrollHeight+"px",n.offsetHeight}function v(t){const n=t;n.style.height="auto"}function r(t,n){const s=t;s.style.height="0",s.addEventListener("transitionend",n,{once:!0})}return re(()=>Y("$SZ7s8siktv")),{ui:d,uiButton:o,attrs:u,buttonRefs:p,closeOthers:l,omit:de,onEnter:i,onBeforeLeave:f,onAfterEnter:v,onLeave:r}}}),Ie={key:1};function Be(e,c,d,u,o,p){const a=G,l=V,i=C("HDisclosureButton"),f=C("HDisclosurePanel"),v=C("HDisclosure");return D(),$("div",{class:I(e.ui.wrapper)},[(D(!0),$(oe,null,ne(e.items,(r,t)=>(D(),z(v,{key:t,as:"div",class:I(e.ui.container),"default-open":e.defaultOpen||r.defaultOpen},{default:y(({open:n,close:s})=>[S(i,{ref_for:!0,ref:()=>e.buttonRefs[t]={open:n,close:s},as:"template",disabled:r.disabled,onClick:m=>e.closeOthers(t,m),onKeydown:[T(m=>e.closeOthers(t,m),["enter"]),T(m=>e.closeOthers(t,m),["space"])]},{default:y(()=>[P(e.$slots,"default",{item:r,index:t,open:n,close:s},()=>[S(l,U({ref_for:!0},{...e.omit(e.ui.default,["openIcon","closeIcon"]),...e.attrs,...e.omit(r,["slot","disabled","content","defaultOpen"])}),{trailing:y(()=>[S(a,{name:n&&e.closeIcon?e.closeIcon:e.openIcon,class:I([n&&!e.closeIcon?"-rotate-180":"",e.uiButton.icon.size[r.size||e.uiButton.default.size],e.ui.item.icon])},null,8,["name","class"])]),_:2},1040)])]),_:2},1032,["disabled","onClick","onKeydown"]),S(se,U({ref_for:!0},e.ui.transition,{onEnter:e.onEnter,onAfterEnter:e.onAfterEnter,onBeforeLeave:e.onBeforeLeave,onLeave:e.onLeave}),{default:y(()=>[e.unmount?(D(),z(f,{key:0,class:I([e.ui.item.base,e.ui.item.size,e.ui.item.color,e.ui.item.padding]),unmount:""},{default:y(()=>[P(e.$slots,r.slot||"item",{item:r,index:t,open:n,close:s},()=>[j(M(r.content),1)])]),_:2},1032,["class"])):le((D(),$("div",Ie,[S(f,{class:I([e.ui.item.base,e.ui.item.size,e.ui.item.color,e.ui.item.padding]),static:""},{default:y(()=>[P(e.$slots,r.slot||"item",{item:r,index:t,open:n,close:s},()=>[j(M(r.content),1)])]),_:2},1032,["class"])],512)),[[ae,n]])]),_:2},1040,["onEnter","onAfterEnter","onBeforeLeave","onLeave"])]),_:2},1032,["class","default-open"]))),128))],2)}const je=ee(Se,[["render",Be]]);export{je as default};