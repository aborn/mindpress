import{_ as V}from"./CwJNXQ4A.js";import{_ as B,o as d,c as f,W as S,X as U,a as v,a4 as x,a5 as R,F as E,A as O,y as I,t as P,h as z,q as g,D as H,b as C,I as K,f as _,Z as j,w as G,d as W,B as X,z as T}from"./xU66j0Gh.js";import{_ as Z}from"./lpxAn8BS.js";import{_ as $}from"./DS0j5Zy6.js";import{_ as J}from"./BlyzYL4v.js";import{s as L,c as Q}from"./Gc76Izq1.js";import{b as Y,c as ee,d as te}from"./CvIXsaFB.js";import{M as b}from"./DshPJGOp.js";import{b as oe}from"./CJPUELYX.js";import"./BlKNQJ4q.js";import"./DvDH6DOc.js";import"./BUI-ftJx.js";import"./D5SWTNgg.js";import"./CAZilBRX.js";import"./Ccn6XVQG.js";const se={name:"SearchAutocomplete",props:{items:{type:Array,required:!1,default:()=>[]},isAsync:{type:Boolean,required:!1,default:!1}},data(){return{isOpen:!1,results:[],search:"",isLoading:!1,arrowCounter:-1}},watch:{items:function(a,n){a.length!==n.length&&(this.results=a,this.isLoading=!1)}},mounted(){document.addEventListener("click",this.handleClickOutside)},destroyed(){document.removeEventListener("click",this.handleClickOutside)},methods:{setResult(a){this.search=a,this.isOpen=!1},filterResults(){this.results=this.items.filter(a=>a.toLowerCase().indexOf(this.search.toLowerCase())>-1)},onChange(){this.$emit("input",this.search),this.isAsync?this.isLoading=!0:(this.filterResults(),this.isOpen=!0)},handleClickOutside(a){this.$el.contains(a.target)||(this.isOpen=!1,this.arrowCounter=-1)},onArrowDown(){this.arrowCounter<this.results.length&&(this.arrowCounter=this.arrowCounter+1)},onArrowUp(){this.arrowCounter>0&&(this.arrowCounter=this.arrowCounter-1)},onEnter(){console.log(" ---- selected ! "+this.results[this.arrowCounter]),console.log(" -- origin value:"+this.search);const a=this.results[this.arrowCounter];a&&(this.search=a),this.$emit("search",this.search),this.isOpen=!1,this.arrowCounter=-1}}},ne={class:"autocomplete"},re={id:"autocomplete-results",class:"autocomplete-results"},ae={key:0,class:"loading"},ie=["onClick"];function le(a,n,y,c,o,t){return d(),f("div",ne,[S(v("input",{type:"text",onInput:n[0]||(n[0]=(...e)=>t.onChange&&t.onChange(...e)),"onUpdate:modelValue":n[1]||(n[1]=e=>o.search=e),onKeydown:[n[2]||(n[2]=x((...e)=>t.onArrowDown&&t.onArrowDown(...e),["down"])),n[3]||(n[3]=x((...e)=>t.onArrowUp&&t.onArrowUp(...e),["up"])),n[4]||(n[4]=x((...e)=>t.onEnter&&t.onEnter(...e),["enter"]))],style:{"margin-bottom":"0px"}},null,544),[[U,o.search]]),S(v("ul",re,[o.isLoading?(d(),f("li",ae," Loading results... ")):(d(!0),f(E,{key:1},O(o.results,(e,w)=>(d(),f("li",{key:w,onClick:h=>t.setResult(e),class:I(["autocomplete-result",{"is-active":w===o.arrowCounter}])},P(e),11,ie))),128))],512),[[R,o.isOpen]])])}const ue=B(se,[["render",le]]),ce={class:"container"},me=["innerHTML"],de={class:"articles"},Le=z({__name:"index",setup(a){const n=g([]),y=g(1),c=g(""),o=g(""),t=g([]),e=g(!1),w=Q(),h=Y(H().public.minpress);function D(s){console.log(s);const i=typeof s=="string"?s:s.target.value;c.value=i,w(()=>q(i),500)}function M(s){console.log("------ searchAction ---"),console.log(s),c.value=s,A(s)}function q(s){const i=s;if(o.value="",e.value=!1,console.log("----onchanged:"+i),!s||s.length==0||h.mode!==b.FCM)return;const l="/api/md/search",u=performance.now();L({pageNo:y.value,url:l,q:i,autoSuggest:!0}).then(r=>{if(console.log(r),r){(performance.now()-u).toFixed(2);const p=r.map(m=>m.suggestion);console.log(p),n.value=p}},r=>{console.warn(r)})}function A(s){const i=h.searchUrl+"?q="+s;if(console.log(i),h.mode===b.SSG)t.value=[],o.value="no markdown file find."+h.mode,e.value=!1;else if(h.mode===b.FCM)try{const l="/api/md/search";let u=performance.now();e.value=!0,L({pageNo:y.value,url:l,q:s}).then(r=>{if(r){t.value=r.map(m=>ee(m));let p=(performance.now()-u).toFixed(2);o.value='find <span style="color:red">'+r.length+`</span> markdown files. Time cost: ${p} milliseconds.`}else o.value='find <span style="color:red">0</span> markdown files.';e.value=!1},r=>{e.value=!1})}catch(l){console.warn(l)}else oe(i,{key:i+s},"$cedS7FE3FC").then(l=>{const u=l.data.value;console.log(u),u&&u.totalElements>0?(t.value=u.content.map(r=>te(r)),o.value='find <span style="color:red">'+u.totalElements+"</span> markdown files.",console.log(t.value),console.log(o.value)):(t.value=[],o.value="no markdown file find.")},l=>{o.value="http request error. "+l,t.value=[]})}function F(){if(console.log("--now submit... q="+c.value),!c.value){t.value=[],o.value="";return}A(c.value)}function N(){console.log("--form submit, do nothing... q="+c.value)}return(s,i)=>{const l=V,u=ue,r=Z,k=$,p=J;return d(),f("div",null,[C(l),v("main",ce,[v("form",{onSubmit:K(N,["prevent"]),style:{display:"flex","justify-content":"center","margin-bottom":"0rem"}},[C(u,{items:_(n),onInput:D,modelValue:_(c),"onUpdate:modelValue":i[0]||(i[0]=m=>j(c)?c.value=m:null),onSearch:M},null,8,["items","modelValue"]),C(r,{onClick:F,icon:"i-heroicons-magnifying-glass-16-solid",style:{width:"10rem","margin-left":"10px",height:"3.0rem"},block:""},{default:G(()=>[W("Search")]),_:1})],32),v("label",{style:{"margin-bottom":"1rem","margin-top":"1rem"},innerHTML:_(o)},null,8,me),_(e)?(d(),X(k,{key:0,animation:"carousel"})):T("",!0),v("div",de,[_(e)?T("",!0):(d(!0),f(E,{key:0},O(_(t),m=>(d(),f("div",{class:"article",key:m.id},[C(p,{item:m},null,8,["item"])]))),128))])])])}}});export{Le as default};
