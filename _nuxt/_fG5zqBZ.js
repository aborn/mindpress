import{_ as oe}from"./y2sVCqiy.js";import ue from"./GV5k4iql.js";import{_ as le}from"./D5MsSU-S.js";import re from"./Cv8MLPOi.js";import{u as me}from"./BeIXggyZ.js";import{x as N,r as w,G as P,J as fe,B as se,P as ge,aG as be,H as E,y as Me,_ as ye,at as Ie,au as X,K as Y,av as he,A as x,aD as Se,aE as ke,S as $,o as S,q as A,w as T,b as L,R,s as ee,a as _,c as D,V as we,ax as Pe,aw as H,l as F,F as z,k as J,aW as Re,t as te,d as Te}from"./Bqnd1YEV.js";import{o as y,u as De,A as U,I as q,N as ae,a as b,l as Ce}from"./CLxQNszB.js";import{w as Oe}from"./trRuBVvh.js";import{s as Ae}from"./GJ4jZYhg.js";import{p as Ee}from"./BfdHdbMS.js";import{i as Ne,u as Be,f as $e,c as k}from"./1QwdQRqm.js";import{t as Le,i as j,l as He}from"./SdFXca3d.js";import{w as Fe,h as je,v as Ue,N as ne,_ as ie,O as Ke}from"./zo7u9E_j.js";import{d as _e,u as ze}from"./Dvlp8htJ.js";import{u as Je}from"./CUG16fyr.js";import{g as Ve}from"./CTZ2Hakn.js";import"./CBFedrLV.js";import"./QwubxqEi.js";var qe=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(qe||{}),Ge=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(Ge||{});function Qe(e){requestAnimationFrame(()=>requestAnimationFrame(e))}let de=Symbol("MenuContext");function K(e){let f=Me(de,null);if(f===null){let g=new Error(`<${e} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(g,K),g}return f}let We=N({name:"Menu",props:{as:{type:[Object,String],default:"template"}},setup(e,{slots:f,attrs:g}){let M=w(1),v=w(null),m=w(null),t=w([]),o=w(""),s=w(null),p=w(1);function I(a=r=>r){let r=s.value!==null?t.value[s.value]:null,u=Ke(a(t.value.slice()),l=>y(l.dataRef.domRef)),i=r?u.indexOf(r):null;return i===-1&&(i=null),{items:u,activeItemIndex:i}}let d={menuState:M,buttonRef:v,itemsRef:m,items:t,searchQuery:o,activeItemIndex:s,activationTrigger:p,closeMenu:()=>{M.value=1,s.value=null},openMenu:()=>M.value=0,goToItem(a,r,u){let i=I(),l=$e(a===k.Specific?{focus:k.Specific,id:r}:{focus:a},{resolveItems:()=>i.items,resolveActiveIndex:()=>i.activeItemIndex,resolveId:n=>n.id,resolveDisabled:n=>n.dataRef.disabled});o.value="",s.value=l,p.value=u??1,t.value=i.items},search(a){let r=o.value!==""?0:1;o.value+=a.toLowerCase();let u=(s.value!==null?t.value.slice(s.value+r).concat(t.value.slice(0,s.value+r)):t.value).find(l=>l.dataRef.textValue.startsWith(o.value)&&!l.dataRef.disabled),i=u?t.value.indexOf(u):-1;i===-1||i===s.value||(s.value=i,p.value=1)},clearSearch(){o.value=""},registerItem(a,r){let u=I(i=>[...i,{id:a,dataRef:r}]);t.value=u.items,s.value=u.activeItemIndex,p.value=1},unregisterItem(a){let r=I(u=>{let i=u.findIndex(l=>l.id===a);return i!==-1&&u.splice(i,1),u});t.value=r.items,s.value=r.activeItemIndex,p.value=1}};return Oe([v,m],(a,r)=>{var u;d.closeMenu(),Fe(r,je.Loose)||(a.preventDefault(),(u=y(v))==null||u.focus())},P(()=>M.value===0)),fe(de,d),Le(P(()=>De(M.value,{0:j.Open,1:j.Closed}))),()=>{let a={open:M.value===0,close:d.closeMenu};return U({ourProps:{},theirProps:e,slot:a,slots:f,attrs:g,name:"Menu"})}}}),Ze=N({name:"MenuButton",props:{disabled:{type:Boolean,default:!1},as:{type:[Object,String],default:"button"},id:{type:String,default:null}},setup(e,{attrs:f,slots:g,expose:M}){var v;let m=(v=e.id)!=null?v:`headlessui-menu-button-${q()}`,t=K("MenuButton");M({el:t.buttonRef,$el:t.buttonRef});function o(d){switch(d.key){case b.Space:case b.Enter:case b.ArrowDown:d.preventDefault(),d.stopPropagation(),t.openMenu(),E(()=>{var a;(a=y(t.itemsRef))==null||a.focus({preventScroll:!0}),t.goToItem(k.First)});break;case b.ArrowUp:d.preventDefault(),d.stopPropagation(),t.openMenu(),E(()=>{var a;(a=y(t.itemsRef))==null||a.focus({preventScroll:!0}),t.goToItem(k.Last)});break}}function s(d){switch(d.key){case b.Space:d.preventDefault();break}}function p(d){e.disabled||(t.menuState.value===0?(t.closeMenu(),E(()=>{var a;return(a=y(t.buttonRef))==null?void 0:a.focus({preventScroll:!0})})):(d.preventDefault(),t.openMenu(),Qe(()=>{var a;return(a=y(t.itemsRef))==null?void 0:a.focus({preventScroll:!0})})))}let I=Ae(P(()=>({as:e.as,type:f.type})),t.buttonRef);return()=>{var d;let a={open:t.menuState.value===0},{...r}=e,u={ref:t.buttonRef,id:m,type:I.value,"aria-haspopup":"menu","aria-controls":(d=y(t.itemsRef))==null?void 0:d.id,"aria-expanded":t.menuState.value===0,onKeydown:o,onKeyup:s,onClick:p};return U({ourProps:u,theirProps:r,slot:a,attrs:f,slots:g,name:"MenuButton"})}}}),Xe=N({name:"MenuItems",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:null}},setup(e,{attrs:f,slots:g,expose:M}){var v;let m=(v=e.id)!=null?v:`headlessui-menu-items-${q()}`,t=K("MenuItems"),o=w(null);M({el:t.itemsRef,$el:t.itemsRef}),Ne({container:P(()=>y(t.itemsRef)),enabled:P(()=>t.menuState.value===0),accept(a){return a.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:a.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(a){a.setAttribute("role","none")}});function s(a){var r;switch(o.value&&clearTimeout(o.value),a.key){case b.Space:if(t.searchQuery.value!=="")return a.preventDefault(),a.stopPropagation(),t.search(a.key);case b.Enter:if(a.preventDefault(),a.stopPropagation(),t.activeItemIndex.value!==null){let u=t.items.value[t.activeItemIndex.value];(r=y(u.dataRef.domRef))==null||r.click()}t.closeMenu(),ie(y(t.buttonRef));break;case b.ArrowDown:return a.preventDefault(),a.stopPropagation(),t.goToItem(k.Next);case b.ArrowUp:return a.preventDefault(),a.stopPropagation(),t.goToItem(k.Previous);case b.Home:case b.PageUp:return a.preventDefault(),a.stopPropagation(),t.goToItem(k.First);case b.End:case b.PageDown:return a.preventDefault(),a.stopPropagation(),t.goToItem(k.Last);case b.Escape:a.preventDefault(),a.stopPropagation(),t.closeMenu(),E(()=>{var u;return(u=y(t.buttonRef))==null?void 0:u.focus({preventScroll:!0})});break;case b.Tab:a.preventDefault(),a.stopPropagation(),t.closeMenu(),E(()=>Ue(y(t.buttonRef),a.shiftKey?ne.Previous:ne.Next));break;default:a.key.length===1&&(t.search(a.key),o.value=setTimeout(()=>t.clearSearch(),350));break}}function p(a){switch(a.key){case b.Space:a.preventDefault();break}}let I=He(),d=P(()=>I!==null?(I.value&j.Open)===j.Open:t.menuState.value===0);return()=>{var a,r;let u={open:t.menuState.value===0},{...i}=e,l={"aria-activedescendant":t.activeItemIndex.value===null||(a=t.items.value[t.activeItemIndex.value])==null?void 0:a.id,"aria-labelledby":(r=y(t.buttonRef))==null?void 0:r.id,id:m,onKeydown:s,onKeyup:p,role:"menu",tabIndex:0,ref:t.itemsRef};return U({ourProps:l,theirProps:i,slot:u,attrs:f,slots:g,features:ae.RenderStrategy|ae.Static,visible:d.value,name:"MenuItems"})}}}),Ye=N({name:"MenuItem",inheritAttrs:!1,props:{as:{type:[Object,String],default:"template"},disabled:{type:Boolean,default:!1},id:{type:String,default:null}},setup(e,{slots:f,attrs:g,expose:M}){var v;let m=(v=e.id)!=null?v:`headlessui-menu-item-${q()}`,t=K("MenuItem"),o=w(null);M({el:o,$el:o});let s=P(()=>t.activeItemIndex.value!==null?t.items.value[t.activeItemIndex.value].id===m:!1),p=Ee(o),I=P(()=>({disabled:e.disabled,get textValue(){return p()},domRef:o}));se(()=>t.registerItem(m,I)),ge(()=>t.unregisterItem(m)),be(()=>{t.menuState.value===0&&s.value&&t.activationTrigger.value!==0&&E(()=>{var n,c;return(c=(n=y(o))==null?void 0:n.scrollIntoView)==null?void 0:c.call(n,{block:"nearest"})})});function d(n){if(e.disabled)return n.preventDefault();t.closeMenu(),ie(y(t.buttonRef))}function a(){if(e.disabled)return t.goToItem(k.Nothing);t.goToItem(k.Specific,m)}let r=Be();function u(n){r.update(n)}function i(n){r.wasMoved(n)&&(e.disabled||s.value||t.goToItem(k.Specific,m,0))}function l(n){r.wasMoved(n)&&(e.disabled||s.value&&t.goToItem(k.Nothing))}return()=>{let{disabled:n,...c}=e,h={active:s.value,disabled:n,close:t.closeMenu};return U({ourProps:{id:m,ref:o,role:"menuitem",tabIndex:n===!0?void 0:-1,"aria-disabled":n===!0?!0:void 0,onClick:d,onFocus:a,onPointerenter:u,onMouseenter:u,onPointermove:i,onMousemove:i,onPointerleave:l,onMouseleave:l},theirProps:{...g,...c},slot:h,attrs:g,slots:f,name:"MenuItem"})}}});const V=Ie(X.ui.strategy,X.ui.dropdown,_e),xe=N({components:{HMenu:We,HMenuButton:Ze,HMenuItems:Xe,HMenuItem:Ye,UIcon:ue,UAvatar:le,UKbd:re},inheritAttrs:!1,props:{items:{type:Array,default:()=>[]},mode:{type:String,default:"click",validator:e=>["click","hover"].includes(e)},open:{type:Boolean,default:void 0},disabled:{type:Boolean,default:!1},popper:{type:Object,default:()=>({})},openDelay:{type:Number,default:()=>V.default.openDelay},closeDelay:{type:Number,default:()=>V.default.closeDelay},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},emits:["update:open"],setup(e,{emit:f}){const{ui:g,attrs:M}=ze("dropdown",Y(e,"ui"),V,Y(e,"class")),v=P(()=>he(e.mode==="hover"?{offsetDistance:0}:{},e.popper,g.value.popper)),[m,t]=Je(v.value),o=w(null);let s=null,p=null;se(()=>{var c,h;const l=(c=m.value)==null?void 0:c.$.provides;if(!l)return;const n=Object.getOwnPropertySymbols(l);o.value=n.length&&l[n[0]],e.open&&((h=o.value)==null||h.openMenu())});const I=P(()=>{var h,C,O;if(e.mode!=="hover")return{};const l=((h=e.popper)==null?void 0:h.offsetDistance)||((C=g.value.popper)==null?void 0:C.offsetDistance)||8,n=(O=v.value.placement)==null?void 0:O.split("-")[0],c=`${l}px`;return n==="top"||n==="bottom"?{paddingTop:c,paddingBottom:c}:n==="left"||n==="right"?{paddingLeft:c,paddingRight:c}:{paddingTop:c,paddingBottom:c,paddingLeft:c,paddingRight:c}});function d(l){!l.cancelable||!o.value||(o.value.menuState===0?o.value.closeMenu():o.value.openMenu())}function a(){e.mode!=="hover"||!o.value||(p&&(clearTimeout(p),p=null),o.value.menuState!==0&&(s=s||setTimeout(()=>{o.value.openMenu&&o.value.openMenu(),s=null},e.openDelay)))}function r(){e.mode!=="hover"||!o.value||(s&&(clearTimeout(s),s=null),o.value.menuState!==1&&(p=p||setTimeout(()=>{o.value.closeMenu&&o.value.closeMenu(),p=null},e.closeDelay)))}function u(l,n,{href:c,navigate:h,close:C,isExternal:O}){n.click&&n.click(l),c&&!O&&(h(l),C())}x(()=>e.open,(l,n)=>{o.value&&(n===void 0||l===n||(l?o.value.openMenu():o.value.closeMenu()))}),x(()=>{var l;return(l=o.value)==null?void 0:l.menuState},(l,n)=>{n===void 0||l===n||f("update:open",l===0)});const i=oe;return Ce(()=>me("$ctlRmIk4j0")),{ui:g,attrs:M,popper:v,trigger:m,container:t,containerStyle:I,onTouchStart:d,onMouseEnter:a,onMouseLeave:r,onClick:u,getNuxtLinkProps:Ve,twMerge:Se,twJoin:ke,NuxtLink:i}}}),et=["disabled"];function tt(e,f,g,M,v,m){const t=$("HMenuButton"),o=ue,s=le,p=re,I=$("HMenuItem"),d=oe,a=$("HMenuItems"),r=$("HMenu");return S(),A(r,H({as:"div",class:e.ui.wrapper},e.attrs,{onMouseleave:e.onMouseLeave}),{default:T(({open:u})=>[L(t,{ref:"trigger",as:"div",disabled:e.disabled,class:R(e.ui.trigger),role:"button",onMouseenter:e.onMouseEnter,onTouchstartPassive:e.onTouchStart},{default:T(()=>[ee(e.$slots,"default",{open:u,disabled:e.disabled},()=>[_("button",{disabled:e.disabled}," Open ",8,et)])]),_:2},1032,["disabled","class","onMouseenter","onTouchstartPassive"]),u&&e.items.length?(S(),D("div",{key:0,ref:"container",class:R([e.ui.container,e.ui.width]),style:we(e.containerStyle),onMouseenter:f[0]||(f[0]=(...i)=>e.onMouseEnter&&e.onMouseEnter(...i))},[L(Pe,H({appear:""},e.ui.transition),{default:T(()=>[_("div",null,[e.popper.arrow?(S(),D("div",{key:0,"data-popper-arrow":"",class:R(Object.values(e.ui.arrow))},null,2)):F("",!0),L(a,{class:R([e.ui.base,e.ui.divide,e.ui.ring,e.ui.rounded,e.ui.shadow,e.ui.background,e.ui.height]),static:""},{default:T(()=>[(S(!0),D(z,null,J(e.items,(i,l)=>(S(),D("div",{key:l,class:R(e.ui.padding)},[(S(!0),D(z,null,J(i,(n,c)=>(S(),A(d,H({key:c,ref_for:!0},e.getNuxtLinkProps(n),{custom:""}),{default:T(({href:h,target:C,rel:O,navigate:pe,isExternal:ce,isActive:G})=>[L(I,{disabled:n.disabled},{default:T(({active:Q,disabled:W,close:ve})=>[(S(),A(Re(h?"a":"button"),{href:W?void 0:h,rel:O,target:C,class:R(e.twMerge(e.twJoin(e.ui.item.base,e.ui.item.padding,e.ui.item.size,e.ui.item.rounded,Q||G?e.ui.item.active:e.ui.item.inactive,W&&e.ui.item.disabled),n.class)),onClick:B=>e.onClick(B,n,{href:h,navigate:pe,close:ve,isExternal:ce})},{default:T(()=>[ee(e.$slots,n.slot||"item",{item:n},()=>{var B;return[n.icon?(S(),A(o,{key:0,name:n.icon,class:R(e.twMerge(e.twJoin(e.ui.item.icon.base,Q||G?e.ui.item.icon.active:e.ui.item.icon.inactive),n.iconClass))},null,8,["name","class"])):n.avatar?(S(),A(s,H({key:1,ref_for:!0},{size:e.ui.item.avatar.size,...n.avatar},{class:e.ui.item.avatar.base}),null,16,["class"])):F("",!0),_("span",{class:R(e.twMerge(e.ui.item.label,n.labelClass))},te(n.label),3),(B=n.shortcuts)!=null&&B.length?(S(),D("span",{key:2,class:R(e.ui.item.shortcuts)},[(S(!0),D(z,null,J(n.shortcuts,Z=>(S(),A(p,{key:Z},{default:T(()=>[Te(te(Z),1)]),_:2},1024))),128))],2)):F("",!0)]})]),_:2},1032,["href","rel","target","class","onClick"]))]),_:2},1032,["disabled"])]),_:2},1040))),128))],2))),128))]),_:3},8,["class"])])]),_:3},16)],38)):F("",!0)]),_:3},16,["class","onMouseleave"])}const It=ye(xe,[["render",tt]]);export{It as default};