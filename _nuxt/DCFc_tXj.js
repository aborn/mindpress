import{at as r,au as n,x as c,K as d,G as o,aV as m,aD as f,aE as x,I as p}from"./Bqnd1YEV.js";import{u as v}from"./Dvlp8htJ.js";import{a as b}from"./eKH4vHJG.js";import{b as h}from"./blSOxsGD.js";const g={wrapper:{horizontal:"inline-flex -space-x-px",vertical:"inline-flex flex-col -space-y-px"},rounded:"rounded-md",shadow:"shadow-sm",orientation:{"rounded-none":{horizontal:{start:"rounded-s-none",end:"rounded-e-none"},vertical:{start:"rounded-t-none",end:"rounded-b-none"}},"rounded-sm":{horizontal:{start:"rounded-s-sm",end:"rounded-e-sm"},vertical:{start:"rounded-t-sm",end:"rounded-b-sm"}},rounded:{horizontal:{start:"rounded-s",end:"rounded-e"},vertical:{start:"rounded-t",end:"rounded-b"}},"rounded-md":{horizontal:{start:"rounded-s-md",end:"rounded-e-md"},vertical:{start:"rounded-t-md",end:"rounded-b-md"}},"rounded-lg":{horizontal:{start:"rounded-s-lg",end:"rounded-e-lg"},vertical:{start:"rounded-t-lg",end:"rounded-b-lg"}},"rounded-xl":{horizontal:{start:"rounded-s-xl",end:"rounded-e-xl"},vertical:{start:"rounded-t-xl",end:"rounded-b-xl"}},"rounded-2xl":{horizontal:{start:"rounded-s-2xl",end:"rounded-e-2xl"},vertical:{start:"rounded-t-2xl",end:"rounded-b-2xl"}},"rounded-3xl":{horizontal:{start:"rounded-s-3xl",end:"rounded-e-3xl"},vertical:{start:"rounded-t-3xl",end:"rounded-b-3xl"}},"rounded-full":{horizontal:{start:"rounded-s-full",end:"rounded-e-full"},vertical:{start:"rounded-t-full",end:"rounded-b-full"}}}},z=r(n.ui.strategy,n.ui.button,h),y=r(n.ui.strategy,n.ui.buttonGroup,g),_=c({name:"ButtonGroup",inheritAttrs:!1,props:{size:{type:String,default:null,validator(e){return Object.keys(z.size).includes(e)}},orientation:{type:String,default:"horizontal",validator(e){return["horizontal","vertical"].includes(e)}},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},setup(e,{slots:u}){const{ui:t,attrs:a}=v("buttonGroup",d(e,"ui"),y),l=o(()=>m(u)),s=o(()=>f(x(t.value.wrapper[e.orientation],t.value.rounded,t.value.shadow),e.class)),i=o(()=>t.value.orientation[t.value.rounded][e.orientation]);return b({orientation:d(e,"orientation"),size:d(e,"size"),ui:t,rounded:i}),()=>p("div",{class:s.value,...a.value},l.value)}});export{_ as default};
