import{u as b}from"./BeIXggyZ.js";import{Y as T,G as k,S as B,h as A}from"./DerS2tO6.js";import{l as D}from"./CLxQNszB.js";import{u as H}from"./Dvlp8htJ.js";import{_ as V,at as $,au as y,x as R,K as g,G as v,S as s,o as h,q as w,w as t,b as p,aw as d,a as m,R as r,l as S,s as F}from"./Bqnd1YEV.js";import"./DQ-5P4DG.js";import"./zo7u9E_j.js";import"./trRuBVvh.js";import"./2shzdUvR.js";import"./B08LnwSc.js";import"./CxIZtCgj.js";import"./SdFXca3d.js";const L={wrapper:"relative z-50",inner:"fixed inset-0 overflow-y-auto",container:"flex min-h-full items-end sm:items-center justify-center text-center",padding:"p-4 sm:p-0",margin:"sm:my-8",base:"relative text-left rtl:text-right flex flex-col",overlay:{base:"fixed inset-0 transition-opacity",background:"bg-gray-200/75 dark:bg-gray-800/75",transition:{enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0"}},background:"bg-white dark:bg-gray-900",ring:"",rounded:"rounded-lg",shadow:"shadow-xl",width:"w-full sm:max-w-lg",height:"",fullscreen:"w-screen h-screen",transition:{enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"}},O=$(y.ui.strategy,y.ui.modal,L),P=R({components:{HDialog:T,HDialogPanel:k,TransitionRoot:B,TransitionChild:A},inheritAttrs:!1,props:{modelValue:{type:Boolean,default:!1},appear:{type:Boolean,default:!1},overlay:{type:Boolean,default:!0},transition:{type:Boolean,default:!0},preventClose:{type:Boolean,default:!1},fullscreen:{type:Boolean,default:!1},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},emits:["update:modelValue","close","close-prevented","after-leave"],setup(e,{emit:a}){const{ui:l,attrs:f}=H("modal",g(e,"ui"),O,g(e,"class")),i=v({get(){return e.modelValue},set(o){a("update:modelValue",o)}}),c=v(()=>e.transition?{...l.value.transition}:{});function n(o){if(e.preventClose){a("close-prevented");return}i.value=o,a("close")}const u=()=>{a("after-leave")};return D(()=>b("$HAJMhYDoe7")),{ui:l,attrs:f,isOpen:i,transitionClass:c,onAfterLeave:u,close:n}}});function j(e,a,l,f,i,c){const n=s("TransitionChild"),u=s("HDialogPanel"),o=s("HDialog"),C=s("TransitionRoot");return h(),w(C,{appear:e.appear,show:e.isOpen,as:"template",onAfterLeave:e.onAfterLeave},{default:t(()=>[p(o,d({class:e.ui.wrapper},e.attrs,{onClose:e.close}),{default:t(()=>[e.overlay?(h(),w(n,d({key:0,as:"template",appear:e.appear},e.ui.overlay.transition),{default:t(()=>[m("div",{class:r([e.ui.overlay.base,e.ui.overlay.background])},null,2)]),_:1},16,["appear"])):S("",!0),m("div",{class:r(e.ui.inner)},[m("div",{class:r([e.ui.container,!e.fullscreen&&e.ui.padding])},[p(n,d({as:"template",appear:e.appear},e.transitionClass),{default:t(()=>[p(u,{class:r([e.ui.base,e.ui.background,e.ui.ring,e.ui.shadow,e.fullscreen?e.ui.fullscreen:[e.ui.width,e.ui.height,e.ui.rounded,e.ui.margin]])},{default:t(()=>[F(e.$slots,"default")]),_:3},8,["class"])]),_:3},16,["appear"])],2)],2)]),_:3},16,["class","onClose"])]),_:3},8,["appear","show","onAfterLeave"])}const W=V(P,[["render",j]]);export{W as default};
