import{G as S,f as J,E as me,A as j,a_ as ne,ag as be,P as re,x as W,r as $,z as ge,J as ue,B as le,I as G,F as xe,aG as Y,y as de,H as B,D as Se,ab as k}from"./Bqnd1YEV.js";import{d as Oe,e as Ie}from"./DVWFxZ_b.js";import{o as te,t as ie}from"./B08LnwSc.js";import{u as N,o as I,E as Re,A as q,T as oe,I as Z,N as Q,a as V}from"./CLxQNszB.js";import{w as ye,n as Ce}from"./trRuBVvh.js";import{s as we}from"./GJ4jZYhg.js";import{c as D,f as ae,i as Ee,u as Te}from"./1QwdQRqm.js";import{f as Me,u as ze}from"./2shzdUvR.js";import{t as Pe,i as X,l as De}from"./SdFXca3d.js";import{i as Ae,O as $e}from"./zo7u9E_j.js";function H(o,v,t){let n=t.initialDeps??[],e;return()=>{var a,i,l,f;let h;t.key&&((a=t.debug)!=null&&a.call(t))&&(h=Date.now());const p=o();if(!(p.length!==n.length||p.some((M,R)=>n[R]!==M)))return e;n=p;let C;if(t.key&&((i=t.debug)!=null&&i.call(t))&&(C=Date.now()),e=v(...p),t.key&&((l=t.debug)!=null&&l.call(t))){const M=Math.round((Date.now()-h)*100)/100,R=Math.round((Date.now()-C)*100)/100,A=R/16,F=(P,m)=>{for(P=String(P);P.length<m;)P=" "+P;return P};console.info(`%c⏱ ${F(R,5)} /${F(M,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*A,120))}deg 100% 31%);`,t==null?void 0:t.key)}return(f=t==null?void 0:t.onChange)==null||f.call(t,e),e}}function ee(o,v){if(o===void 0)throw new Error("Unexpected undefined");return o}const Fe=(o,v)=>Math.abs(o-v)<1,Ve=(o,v,t)=>{let n;return function(...e){o.clearTimeout(n),n=o.setTimeout(()=>v.apply(this,e),t)}},_e=o=>o,ke=o=>{const v=Math.max(o.startIndex-o.overscan,0),t=Math.min(o.endIndex+o.overscan,o.count-1),n=[];for(let e=v;e<=t;e++)n.push(e);return n},Be=(o,v)=>{const t=o.scrollElement;if(!t)return;const n=o.targetWindow;if(!n)return;const e=i=>{const{width:l,height:f}=i;v({width:Math.round(l),height:Math.round(f)})};if(e(t.getBoundingClientRect()),!n.ResizeObserver)return()=>{};const a=new n.ResizeObserver(i=>{const l=i[0];if(l!=null&&l.borderBoxSize){const f=l.borderBoxSize[0];if(f){e({width:f.inlineSize,height:f.blockSize});return}}e(t.getBoundingClientRect())});return a.observe(t,{box:"border-box"}),()=>{a.unobserve(t)}},se={passive:!0},je=typeof window>"u"?!0:"onscrollend"in window,Le=(o,v)=>{const t=o.scrollElement;if(!t)return;const n=o.targetWindow;if(!n)return;let e=0;const a=je?()=>{}:Ve(n,()=>{v(e,!1)},o.options.isScrollingResetDelay),i=h=>()=>{e=t[o.options.horizontal?"scrollLeft":"scrollTop"],a(),v(e,h)},l=i(!0),f=i(!1);return f(),t.addEventListener("scroll",l,se),t.addEventListener("scrollend",f,se),()=>{t.removeEventListener("scroll",l),t.removeEventListener("scrollend",f)}},Ne=(o,v,t)=>{if(v!=null&&v.borderBoxSize){const n=v.borderBoxSize[0];if(n)return Math.round(n[t.options.horizontal?"inlineSize":"blockSize"])}return Math.round(o.getBoundingClientRect()[t.options.horizontal?"width":"height"])},We=(o,{adjustments:v=0,behavior:t},n)=>{var e,a;const i=o+v;(a=(e=n.scrollElement)==null?void 0:e.scrollTo)==null||a.call(e,{[n.options.horizontal?"left":"top"]:i,behavior:t})};class Ke{constructor(v){this.unsubs=[],this.scrollElement=null,this.targetWindow=null,this.isScrolling=!1,this.scrollToIndexTimeoutId=null,this.measurementsCache=[],this.itemSizeCache=new Map,this.pendingMeasuredCacheIndexes=[],this.scrollRect=null,this.scrollOffset=null,this.scrollDirection=null,this.scrollAdjustments=0,this.elementsCache=new Map,this.observer=(()=>{let t=null;const n=()=>t||(!this.targetWindow||!this.targetWindow.ResizeObserver?null:t=new this.targetWindow.ResizeObserver(e=>{e.forEach(a=>{this._measureElement(a.target,a)})}));return{disconnect:()=>{var e;return(e=n())==null?void 0:e.disconnect()},observe:e=>{var a;return(a=n())==null?void 0:a.observe(e,{box:"border-box"})},unobserve:e=>{var a;return(a=n())==null?void 0:a.unobserve(e)}}})(),this.range=null,this.setOptions=t=>{Object.entries(t).forEach(([n,e])=>{typeof e>"u"&&delete t[n]}),this.options={debug:!1,initialOffset:0,overscan:1,paddingStart:0,paddingEnd:0,scrollPaddingStart:0,scrollPaddingEnd:0,horizontal:!1,getItemKey:_e,rangeExtractor:ke,onChange:()=>{},measureElement:Ne,initialRect:{width:0,height:0},scrollMargin:0,gap:0,indexAttribute:"data-index",initialMeasurementsCache:[],lanes:1,isScrollingResetDelay:150,enabled:!0,...t}},this.notify=(t,n)=>{var e,a;const{startIndex:i,endIndex:l}=this.range??{startIndex:void 0,endIndex:void 0},f=this.calculateRange();(t||i!==(f==null?void 0:f.startIndex)||l!==(f==null?void 0:f.endIndex))&&((a=(e=this.options).onChange)==null||a.call(e,this,n))},this.cleanup=()=>{this.unsubs.filter(Boolean).forEach(t=>t()),this.unsubs=[],this.scrollElement=null,this.targetWindow=null,this.observer.disconnect(),this.elementsCache.clear()},this._didMount=()=>()=>{this.cleanup()},this._willUpdate=()=>{var t;const n=this.options.enabled?this.options.getScrollElement():null;if(this.scrollElement!==n){if(this.cleanup(),!n){this.notify(!1,!1);return}this.scrollElement=n,this.scrollElement&&"ownerDocument"in this.scrollElement?this.targetWindow=this.scrollElement.ownerDocument.defaultView:this.targetWindow=((t=this.scrollElement)==null?void 0:t.window)??null,this._scrollToOffset(this.getScrollOffset(),{adjustments:void 0,behavior:void 0}),this.unsubs.push(this.options.observeElementRect(this,e=>{this.scrollRect=e,this.notify(!1,!1)})),this.unsubs.push(this.options.observeElementOffset(this,(e,a)=>{this.scrollAdjustments=0,this.scrollDirection=a?this.getScrollOffset()<e?"forward":"backward":null,this.scrollOffset=e;const i=this.isScrolling;this.isScrolling=a,this.notify(i!==a,a)}))}},this.getSize=()=>this.options.enabled?(this.scrollRect=this.scrollRect??this.options.initialRect,this.scrollRect[this.options.horizontal?"width":"height"]):(this.scrollRect=null,0),this.getScrollOffset=()=>this.options.enabled?(this.scrollOffset=this.scrollOffset??(typeof this.options.initialOffset=="function"?this.options.initialOffset():this.options.initialOffset),this.scrollOffset):(this.scrollOffset=null,0),this.getFurthestMeasurement=(t,n)=>{const e=new Map,a=new Map;for(let i=n-1;i>=0;i--){const l=t[i];if(e.has(l.lane))continue;const f=a.get(l.lane);if(f==null||l.end>f.end?a.set(l.lane,l):l.end<f.end&&e.set(l.lane,!0),e.size===this.options.lanes)break}return a.size===this.options.lanes?Array.from(a.values()).sort((i,l)=>i.end===l.end?i.index-l.index:i.end-l.end)[0]:void 0},this.getMeasurementOptions=H(()=>[this.options.count,this.options.paddingStart,this.options.scrollMargin,this.options.getItemKey,this.options.enabled],(t,n,e,a,i)=>(this.pendingMeasuredCacheIndexes=[],{count:t,paddingStart:n,scrollMargin:e,getItemKey:a,enabled:i}),{key:!1}),this.getMeasurements=H(()=>[this.getMeasurementOptions(),this.itemSizeCache],({count:t,paddingStart:n,scrollMargin:e,getItemKey:a,enabled:i},l)=>{var f;if(!i)return this.measurementsCache=[],this.itemSizeCache.clear(),[];this.measurementsCache.length===0&&(this.measurementsCache=this.options.initialMeasurementsCache,this.measurementsCache.forEach(u=>{this.itemSizeCache.set(u.key,u.size)}));const h=this.pendingMeasuredCacheIndexes.length>0?Math.min(...this.pendingMeasuredCacheIndexes):0;this.pendingMeasuredCacheIndexes=[];const p=this.measurementsCache.slice(0,h);for(let u=h;u<t;u++){let C=(f=this.measurementsCache[u])==null?void 0:f.measureElement;C||(C=z=>{const d=a(u),x=this.elementsCache.get(d);if(!z){x&&(this.observer.unobserve(x),this.elementsCache.delete(d));return}x!==z&&(x&&this.observer.unobserve(x),this.observer.observe(z),this.elementsCache.set(d,z)),z.isConnected&&this.resizeItem(u,this.options.measureElement(z,void 0,this))});const M=a(u),R=this.options.lanes===1?p[u-1]:this.getFurthestMeasurement(p,u),A=R?R.end+this.options.gap:n+e,F=l.get(M),P=typeof F=="number"?F:this.options.estimateSize(u),m=A+P,y=R?R.lane:u%this.options.lanes;p[u]={index:u,start:A,size:P,end:m,key:M,lane:y,measureElement:C}}return this.measurementsCache=p,p},{key:!1,debug:()=>this.options.debug}),this.calculateRange=H(()=>[this.getMeasurements(),this.getSize(),this.getScrollOffset()],(t,n,e)=>this.range=t.length>0&&n>0?Ue({measurements:t,outerSize:n,scrollOffset:e}):null,{key:!1,debug:()=>this.options.debug}),this.getIndexes=H(()=>[this.options.rangeExtractor,this.calculateRange(),this.options.overscan,this.options.count],(t,n,e,a)=>n===null?[]:t({startIndex:n.startIndex,endIndex:n.endIndex,overscan:e,count:a}),{key:!1,debug:()=>this.options.debug}),this.indexFromElement=t=>{const n=this.options.indexAttribute,e=t.getAttribute(n);return e?parseInt(e,10):(console.warn(`Missing attribute name '${n}={index}' on measured element.`),-1)},this._measureElement=(t,n)=>{const e=this.indexFromElement(t),a=this.getMeasurements()[e];if(!a||!t.isConnected){this.elementsCache.forEach((l,f)=>{l===t&&(this.observer.unobserve(t),this.elementsCache.delete(f))});return}const i=this.elementsCache.get(a.key);i!==t&&(i&&this.observer.unobserve(i),this.observer.observe(t),this.elementsCache.set(a.key,t)),this.resizeItem(e,this.options.measureElement(t,n,this))},this.resizeItem=(t,n)=>{const e=this.getMeasurements()[t];if(!e)return;const a=this.itemSizeCache.get(e.key)??e.size,i=n-a;i!==0&&((this.shouldAdjustScrollPositionOnItemSizeChange!==void 0?this.shouldAdjustScrollPositionOnItemSizeChange(e,i,this):e.start<this.getScrollOffset()+this.scrollAdjustments)&&this._scrollToOffset(this.getScrollOffset(),{adjustments:this.scrollAdjustments+=i,behavior:void 0}),this.pendingMeasuredCacheIndexes.push(e.index),this.itemSizeCache=new Map(this.itemSizeCache.set(e.key,n)),this.notify(!0,!1))},this.measureElement=t=>{t&&this._measureElement(t,void 0)},this.getVirtualItems=H(()=>[this.getIndexes(),this.getMeasurements()],(t,n)=>{const e=[];for(let a=0,i=t.length;a<i;a++){const l=t[a],f=n[l];e.push(f)}return e},{key:!1,debug:()=>this.options.debug}),this.getVirtualItemForOffset=t=>{const n=this.getMeasurements();if(n.length!==0)return ee(n[ce(0,n.length-1,e=>ee(n[e]).start,t)])},this.getOffsetForAlignment=(t,n)=>{const e=this.getSize(),a=this.getScrollOffset();n==="auto"&&(t<=a?n="start":t>=a+e?n="end":n="start"),n==="start"?t=t:n==="end"?t=t-e:n==="center"&&(t=t-e/2);const i=this.options.horizontal?"scrollWidth":"scrollHeight",f=(this.scrollElement?"document"in this.scrollElement?this.scrollElement.document.documentElement[i]:this.scrollElement[i]:0)-e;return Math.max(Math.min(f,t),0)},this.getOffsetForIndex=(t,n="auto")=>{t=Math.max(0,Math.min(t,this.options.count-1));const e=this.getMeasurements()[t];if(!e)return;const a=this.getSize(),i=this.getScrollOffset();if(n==="auto")if(e.end>=i+a-this.options.scrollPaddingEnd)n="end";else if(e.start<=i+this.options.scrollPaddingStart)n="start";else return[i,n];const l=n==="end"?e.end+this.options.scrollPaddingEnd:e.start-this.options.scrollPaddingStart;return[this.getOffsetForAlignment(l,n),n]},this.isDynamicMode=()=>this.elementsCache.size>0,this.cancelScrollToIndex=()=>{this.scrollToIndexTimeoutId!==null&&this.targetWindow&&(this.targetWindow.clearTimeout(this.scrollToIndexTimeoutId),this.scrollToIndexTimeoutId=null)},this.scrollToOffset=(t,{align:n="start",behavior:e}={})=>{this.cancelScrollToIndex(),e==="smooth"&&this.isDynamicMode()&&console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."),this._scrollToOffset(this.getOffsetForAlignment(t,n),{adjustments:void 0,behavior:e})},this.scrollToIndex=(t,{align:n="auto",behavior:e}={})=>{t=Math.max(0,Math.min(t,this.options.count-1)),this.cancelScrollToIndex(),e==="smooth"&&this.isDynamicMode()&&console.warn("The `smooth` scroll behavior is not fully supported with dynamic size.");const a=this.getOffsetForIndex(t,n);if(!a)return;const[i,l]=a;this._scrollToOffset(i,{adjustments:void 0,behavior:e}),e!=="smooth"&&this.isDynamicMode()&&this.targetWindow&&(this.scrollToIndexTimeoutId=this.targetWindow.setTimeout(()=>{if(this.scrollToIndexTimeoutId=null,this.elementsCache.has(this.options.getItemKey(t))){const[h]=ee(this.getOffsetForIndex(t,l));Fe(h,this.getScrollOffset())||this.scrollToIndex(t,{align:l,behavior:e})}else this.scrollToIndex(t,{align:l,behavior:e})}))},this.scrollBy=(t,{behavior:n}={})=>{this.cancelScrollToIndex(),n==="smooth"&&this.isDynamicMode()&&console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."),this._scrollToOffset(this.getScrollOffset()+t,{adjustments:void 0,behavior:n})},this.getTotalSize=()=>{var t;const n=this.getMeasurements();let e;return n.length===0?e=this.options.paddingStart:e=this.options.lanes===1?((t=n[n.length-1])==null?void 0:t.end)??0:Math.max(...n.slice(-this.options.lanes).map(a=>a.end)),e-this.options.scrollMargin+this.options.paddingEnd},this._scrollToOffset=(t,{adjustments:n,behavior:e})=>{this.options.scrollToFn(t,{behavior:e,adjustments:n},this)},this.measure=()=>{var t,n;this.itemSizeCache=new Map,(n=(t=this.options).onChange)==null||n.call(t,this,!1)},this.setOptions(v)}}const ce=(o,v,t,n)=>{for(;o<=v;){const e=(o+v)/2|0,a=t(e);if(a<n)o=e+1;else if(a>n)v=e-1;else return e}return o>0?o-1:0};function Ue({measurements:o,outerSize:v,scrollOffset:t}){const n=o.length-1,a=ce(0,n,l=>o[l].start,t);let i=a;for(;i<n&&o[i].end<t+v;)i++;return{startIndex:a,endIndex:i}}function He(o){const v=new Ke(J(o)),t=me(v),n=v._didMount();return j(()=>J(o).getScrollElement(),e=>{e&&v._willUpdate()},{immediate:!0}),j(()=>J(o),e=>{v.setOptions({...e,onChange:(a,i)=>{var l;ne(t),(l=e.onChange)==null||l.call(e,a,i)}}),v._willUpdate(),ne(t)},{immediate:!0}),be(n),t}function qe(o){return He(S(()=>({observeElementRect:Be,observeElementOffset:Le,scrollToFn:We,...J(o)})))}function Je(){let o=te();return re(()=>o.dispose()),o}function Ge(){let o=Je();return v=>{o.dispose(),o.nextFrame(v)}}var ve=(o=>(o[o.Left=0]="Left",o[o.Right=2]="Right",o))(ve||{}),Ye={};function Qe(o,v){return o===v}var Xe=(o=>(o[o.Open=0]="Open",o[o.Closed=1]="Closed",o))(Xe||{}),Ze=(o=>(o[o.Single=0]="Single",o[o.Multi=1]="Multi",o))(Ze||{}),et=(o=>(o[o.Pointer=0]="Pointer",o[o.Focus=1]="Focus",o[o.Other=2]="Other",o))(et||{});let fe=Symbol("ComboboxContext");function K(o){let v=de(fe,null);if(v===null){let t=new Error(`<${o} /> is missing a parent <Combobox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,K),t}return v}let pe=Symbol("VirtualContext"),tt=W({name:"VirtualProvider",setup(o,{slots:v}){let t=K("VirtualProvider"),n=S(()=>{let l=I(t.optionsRef);if(!l)return{start:0,end:0};let f=window.getComputedStyle(l);return{start:parseFloat(f.paddingBlockStart||f.paddingTop),end:parseFloat(f.paddingBlockEnd||f.paddingBottom)}}),e=qe(S(()=>({scrollPaddingStart:n.value.start,scrollPaddingEnd:n.value.end,count:t.virtual.value.options.length,estimateSize(){return 40},getScrollElement(){return I(t.optionsRef)},overscan:12}))),a=S(()=>{var l;return(l=t.virtual.value)==null?void 0:l.options}),i=$(0);return j([a],()=>{i.value+=1}),ue(pe,t.virtual.value?e:null),()=>[G("div",{style:{position:"relative",width:"100%",height:`${e.value.getTotalSize()}px`},ref:l=>{if(l){if(typeof process<"u"&&Ye.JEST_WORKER_ID!==void 0||t.activationTrigger.value===0)return;t.activeOptionIndex.value!==null&&t.virtual.value.options.length>t.activeOptionIndex.value&&e.value.scrollToIndex(t.activeOptionIndex.value)}}},e.value.getVirtualItems().map(l=>Se(v.default({option:t.virtual.value.options[l.index],open:t.comboboxState.value===0})[0],{key:`${i.value}-${l.index}`,"data-index":l.index,"aria-setsize":t.virtual.value.options.length,"aria-posinset":l.index+1,style:{position:"absolute",top:0,left:0,transform:`translateY(${l.start}px)`,overflowAnchor:"none"}})))]}}),vt=W({name:"Combobox",emits:{"update:modelValue":o=>!0},props:{as:{type:[Object,String],default:"template"},disabled:{type:[Boolean],default:!1},by:{type:[String,Function],nullable:!0,default:null},modelValue:{type:[Object,String,Number,Boolean],default:void 0},defaultValue:{type:[Object,String,Number,Boolean],default:void 0},form:{type:String,optional:!0},name:{type:String,optional:!0},nullable:{type:Boolean,default:!1},multiple:{type:[Boolean],default:!1},immediate:{type:[Boolean],default:!1},virtual:{type:Object,default:null}},inheritAttrs:!1,setup(o,{slots:v,attrs:t,emit:n}){let e=$(1),a=$(null),i=$(null),l=$(null),f=$(null),h=$({static:!1,hold:!1}),p=$([]),u=$(null),C=$(2),M=$(!1);function R(s=c=>c){let c=u.value!==null?p.value[u.value]:null,b=s(p.value.slice()),g=b.length>0&&b[0].dataRef.order.value!==null?b.sort((T,_)=>T.dataRef.order.value-_.dataRef.order.value):$e(b,T=>I(T.dataRef.domRef)),E=c?g.indexOf(c):null;return E===-1&&(E=null),{options:g,activeOptionIndex:E}}let A=S(()=>o.multiple?1:0),F=S(()=>o.nullable),[P,m]=Oe(S(()=>o.modelValue),s=>n("update:modelValue",s),S(()=>o.defaultValue)),y=S(()=>P.value===void 0?N(A.value,{1:[],0:void 0}):P.value),z=null,d=null;function x(s){return N(A.value,{0(){return m==null?void 0:m(s)},1:()=>{let c=k(r.value.value).slice(),b=k(s),g=c.findIndex(E=>r.compare(b,k(E)));return g===-1?c.push(b):c.splice(g,1),m==null?void 0:m(c)}})}let w=S(()=>{});j([w],([s],[c])=>{if(r.virtual.value&&s&&c&&u.value!==null){let b=s.indexOf(c[u.value]);b!==-1?u.value=b:u.value=null}});let r={comboboxState:e,value:y,mode:A,compare(s,c){if(typeof o.by=="string"){let b=o.by;return(s==null?void 0:s[b])===(c==null?void 0:c[b])}return o.by===null?Qe(s,c):o.by(s,c)},calculateIndex(s){return r.virtual.value?o.by===null?r.virtual.value.options.indexOf(s):r.virtual.value.options.findIndex(c=>r.compare(c,s)):p.value.findIndex(c=>r.compare(c.dataRef.value,s))},defaultValue:S(()=>o.defaultValue),nullable:F,immediate:S(()=>!1),virtual:S(()=>null),inputRef:i,labelRef:a,buttonRef:l,optionsRef:f,disabled:S(()=>o.disabled),options:p,change(s){m(s)},activeOptionIndex:S(()=>{if(M.value&&u.value===null&&(r.virtual.value?r.virtual.value.options.length>0:p.value.length>0)){if(r.virtual.value){let c=r.virtual.value.options.findIndex(b=>{var g;return!((g=r.virtual.value)!=null&&g.disabled(b))});if(c!==-1)return c}let s=p.value.findIndex(c=>!c.dataRef.disabled);if(s!==-1)return s}return u.value}),activationTrigger:C,optionsPropsRef:h,closeCombobox(){M.value=!1,!o.disabled&&e.value!==1&&(e.value=1,u.value=null)},openCombobox(){if(M.value=!0,!o.disabled&&e.value!==0){if(r.value.value){let s=r.calculateIndex(r.value.value);s!==-1&&(u.value=s)}e.value=0}},setActivationTrigger(s){C.value=s},goToOption(s,c,b){M.value=!1,z!==null&&cancelAnimationFrame(z),z=requestAnimationFrame(()=>{if(o.disabled||f.value&&!h.value.static&&e.value===1)return;if(r.virtual.value){u.value=s===D.Specific?c:ae({focus:s},{resolveItems:()=>r.virtual.value.options,resolveActiveIndex:()=>{var T,_;return(_=(T=r.activeOptionIndex.value)!=null?T:r.virtual.value.options.findIndex(L=>{var U;return!((U=r.virtual.value)!=null&&U.disabled(L))}))!=null?_:null},resolveDisabled:T=>r.virtual.value.disabled(T),resolveId(){throw new Error("Function not implemented.")}}),C.value=b??2;return}let g=R();if(g.activeOptionIndex===null){let T=g.options.findIndex(_=>!_.dataRef.disabled);T!==-1&&(g.activeOptionIndex=T)}let E=s===D.Specific?c:ae({focus:s},{resolveItems:()=>g.options,resolveActiveIndex:()=>g.activeOptionIndex,resolveId:T=>T.id,resolveDisabled:T=>T.dataRef.disabled});u.value=E,C.value=b??2,p.value=g.options})},selectOption(s){let c=p.value.find(g=>g.id===s);if(!c)return;let{dataRef:b}=c;x(b.value)},selectActiveOption(){if(r.activeOptionIndex.value!==null){if(r.virtual.value)x(r.virtual.value.options[r.activeOptionIndex.value]);else{let{dataRef:s}=p.value[r.activeOptionIndex.value];x(s.value)}r.goToOption(D.Specific,r.activeOptionIndex.value)}},registerOption(s,c){let b=ge({id:s,dataRef:c});if(r.virtual.value){p.value.push(b);return}d&&cancelAnimationFrame(d);let g=R(E=>(E.push(b),E));u.value===null&&r.isSelected(c.value.value)&&(g.activeOptionIndex=g.options.indexOf(b)),p.value=g.options,u.value=g.activeOptionIndex,C.value=2,g.options.some(E=>!I(E.dataRef.domRef))&&(d=requestAnimationFrame(()=>{let E=R();p.value=E.options,u.value=E.activeOptionIndex}))},unregisterOption(s,c){if(z!==null&&cancelAnimationFrame(z),c&&(M.value=!0),r.virtual.value){p.value=p.value.filter(g=>g.id!==s);return}let b=R(g=>{let E=g.findIndex(T=>T.id===s);return E!==-1&&g.splice(E,1),g});p.value=b.options,u.value=b.activeOptionIndex,C.value=2},isSelected(s){return N(A.value,{0:()=>r.compare(k(r.value.value),k(s)),1:()=>k(r.value.value).some(c=>r.compare(k(c),k(s)))})},isActive(s){return u.value===r.calculateIndex(s)}};ye([i,l,f],()=>r.closeCombobox(),S(()=>e.value===0)),ue(fe,r),Pe(S(()=>N(e.value,{0:X.Open,1:X.Closed})));let O=S(()=>{var s;return(s=I(i))==null?void 0:s.closest("form")});return le(()=>{j([O],()=>{if(!O.value||o.defaultValue===void 0)return;function s(){r.change(o.defaultValue)}return O.value.addEventListener("reset",s),()=>{var c;(c=O.value)==null||c.removeEventListener("reset",s)}},{immediate:!0})}),()=>{var s,c,b;let{name:g,disabled:E,form:T,..._}=o,L={open:e.value===0,disabled:E,activeIndex:r.activeOptionIndex.value,activeOption:r.activeOptionIndex.value===null?null:r.virtual.value?r.virtual.value.options[(s=r.activeOptionIndex.value)!=null?s:0]:(b=(c=r.options.value[r.activeOptionIndex.value])==null?void 0:c.dataRef.value)!=null?b:null,value:y.value};return G(xe,[...g!=null&&y.value!=null?Ie({[g]:y.value}).map(([U,he])=>G(Me,Re({features:ze.Hidden,key:U,as:"input",type:"hidden",hidden:!0,readOnly:!0,form:T,disabled:E,name:U,value:he}))):[],q({theirProps:{...t,...oe(_,["by","defaultValue","immediate","modelValue","multiple","nullable","onUpdate:modelValue","virtual"])},ourProps:{},slot:L,slots:v,attrs:t,name:"Combobox"})])}}}),ft=W({name:"ComboboxButton",props:{as:{type:[Object,String],default:"button"},id:{type:String,default:null}},setup(o,{attrs:v,slots:t,expose:n}){var e;let a=(e=o.id)!=null?e:`headlessui-combobox-button-${Z()}`,i=K("ComboboxButton");n({el:i.buttonRef,$el:i.buttonRef});function l(p){i.disabled.value||(i.comboboxState.value===0?i.closeCombobox():(p.preventDefault(),i.openCombobox()),B(()=>{var u;return(u=I(i.inputRef))==null?void 0:u.focus({preventScroll:!0})}))}function f(p){switch(p.key){case V.ArrowDown:p.preventDefault(),p.stopPropagation(),i.comboboxState.value===1&&i.openCombobox(),B(()=>{var u;return(u=i.inputRef.value)==null?void 0:u.focus({preventScroll:!0})});return;case V.ArrowUp:p.preventDefault(),p.stopPropagation(),i.comboboxState.value===1&&(i.openCombobox(),B(()=>{i.value.value||i.goToOption(D.Last)})),B(()=>{var u;return(u=i.inputRef.value)==null?void 0:u.focus({preventScroll:!0})});return;case V.Escape:if(i.comboboxState.value!==0)return;p.preventDefault(),i.optionsRef.value&&!i.optionsPropsRef.value.static&&p.stopPropagation(),i.closeCombobox(),B(()=>{var u;return(u=i.inputRef.value)==null?void 0:u.focus({preventScroll:!0})});return}}let h=we(S(()=>({as:o.as,type:v.type})),i.buttonRef);return()=>{var p,u;let C={open:i.comboboxState.value===0,disabled:i.disabled.value,value:i.value.value},{...M}=o,R={ref:i.buttonRef,id:a,type:h.value,tabindex:"-1","aria-haspopup":"listbox","aria-controls":(p=I(i.optionsRef))==null?void 0:p.id,"aria-expanded":i.comboboxState.value===0,"aria-labelledby":i.labelRef.value?[(u=I(i.labelRef))==null?void 0:u.id,a].join(" "):void 0,disabled:i.disabled.value===!0?!0:void 0,onKeydown:f,onClick:l};return q({ourProps:R,theirProps:M,slot:C,attrs:v,slots:t,name:"ComboboxButton"})}}}),pt=W({name:"ComboboxInput",props:{as:{type:[Object,String],default:"input"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},displayValue:{type:Function},defaultValue:{type:String,default:void 0},id:{type:String,default:null}},emits:{change:o=>!0},setup(o,{emit:v,attrs:t,slots:n,expose:e}){var a;let i=(a=o.id)!=null?a:`headlessui-combobox-input-${Z()}`,l=K("ComboboxInput"),f=S(()=>Ae(I(l.inputRef))),h={value:!1};e({el:l.inputRef,$el:l.inputRef});function p(){l.change(null);let d=I(l.optionsRef);d&&(d.scrollTop=0),l.goToOption(D.Nothing)}let u=S(()=>{var d;let x=l.value.value;return I(l.inputRef)?typeof o.displayValue<"u"&&x!==void 0?(d=o.displayValue(x))!=null?d:"":typeof x=="string"?x:"":""});le(()=>{j([u,l.comboboxState,f],([d,x],[w,r])=>{if(h.value)return;let O=I(l.inputRef);O&&((r===0&&x===1||d!==w)&&(O.value=d),requestAnimationFrame(()=>{var s;if(h.value||!O||((s=f.value)==null?void 0:s.activeElement)!==O)return;let{selectionStart:c,selectionEnd:b}=O;Math.abs((b??0)-(c??0))===0&&c===0&&O.setSelectionRange(O.value.length,O.value.length)}))},{immediate:!0}),j([l.comboboxState],([d],[x])=>{if(d===0&&x===1){if(h.value)return;let w=I(l.inputRef);if(!w)return;let r=w.value,{selectionStart:O,selectionEnd:s,selectionDirection:c}=w;w.value="",w.value=r,c!==null?w.setSelectionRange(O,s,c):w.setSelectionRange(O,s)}})});let C=$(!1);function M(){C.value=!0}function R(){te().nextFrame(()=>{C.value=!1})}let A=Ge();function F(d){switch(h.value=!0,A(()=>{h.value=!1}),d.key){case V.Enter:if(h.value=!1,l.comboboxState.value!==0||C.value)return;if(d.preventDefault(),d.stopPropagation(),l.activeOptionIndex.value===null){l.closeCombobox();return}l.selectActiveOption(),l.mode.value===0&&l.closeCombobox();break;case V.ArrowDown:return h.value=!1,d.preventDefault(),d.stopPropagation(),N(l.comboboxState.value,{0:()=>l.goToOption(D.Next),1:()=>l.openCombobox()});case V.ArrowUp:return h.value=!1,d.preventDefault(),d.stopPropagation(),N(l.comboboxState.value,{0:()=>l.goToOption(D.Previous),1:()=>{l.openCombobox(),B(()=>{l.value.value||l.goToOption(D.Last)})}});case V.Home:if(d.shiftKey)break;return h.value=!1,d.preventDefault(),d.stopPropagation(),l.goToOption(D.First);case V.PageUp:return h.value=!1,d.preventDefault(),d.stopPropagation(),l.goToOption(D.First);case V.End:if(d.shiftKey)break;return h.value=!1,d.preventDefault(),d.stopPropagation(),l.goToOption(D.Last);case V.PageDown:return h.value=!1,d.preventDefault(),d.stopPropagation(),l.goToOption(D.Last);case V.Escape:if(h.value=!1,l.comboboxState.value!==0)return;d.preventDefault(),l.optionsRef.value&&!l.optionsPropsRef.value.static&&d.stopPropagation(),l.nullable.value&&l.mode.value===0&&l.value.value===null&&p(),l.closeCombobox();break;case V.Tab:if(h.value=!1,l.comboboxState.value!==0)return;l.mode.value===0&&l.activationTrigger.value!==1&&l.selectActiveOption(),l.closeCombobox();break}}function P(d){v("change",d),l.nullable.value&&l.mode.value===0&&d.target.value===""&&p(),l.openCombobox()}function m(d){var x,w,r;let O=(x=d.relatedTarget)!=null?x:ie.find(s=>s!==d.currentTarget);if(h.value=!1,!((w=I(l.optionsRef))!=null&&w.contains(O))&&!((r=I(l.buttonRef))!=null&&r.contains(O))&&l.comboboxState.value===0)return d.preventDefault(),l.mode.value===0&&(l.nullable.value&&l.value.value===null?p():l.activationTrigger.value!==1&&l.selectActiveOption()),l.closeCombobox()}function y(d){var x,w,r;let O=(x=d.relatedTarget)!=null?x:ie.find(s=>s!==d.currentTarget);(w=I(l.buttonRef))!=null&&w.contains(O)||(r=I(l.optionsRef))!=null&&r.contains(O)||l.disabled.value||l.immediate.value&&l.comboboxState.value!==0&&(l.openCombobox(),te().nextFrame(()=>{l.setActivationTrigger(1)}))}let z=S(()=>{var d,x,w,r;return(r=(w=(x=o.defaultValue)!=null?x:l.defaultValue.value!==void 0?(d=o.displayValue)==null?void 0:d.call(o,l.defaultValue.value):null)!=null?w:l.defaultValue.value)!=null?r:""});return()=>{var d,x,w,r,O,s,c;let b={open:l.comboboxState.value===0},{displayValue:g,onChange:E,...T}=o,_={"aria-controls":(d=l.optionsRef.value)==null?void 0:d.id,"aria-expanded":l.comboboxState.value===0,"aria-activedescendant":l.activeOptionIndex.value===null?void 0:l.virtual.value?(x=l.options.value.find(L=>!l.virtual.value.disabled(L.dataRef.value)&&l.compare(L.dataRef.value,l.virtual.value.options[l.activeOptionIndex.value])))==null?void 0:x.id:(w=l.options.value[l.activeOptionIndex.value])==null?void 0:w.id,"aria-labelledby":(s=(r=I(l.labelRef))==null?void 0:r.id)!=null?s:(O=I(l.buttonRef))==null?void 0:O.id,"aria-autocomplete":"list",id:i,onCompositionstart:M,onCompositionend:R,onKeydown:F,onInput:P,onFocus:y,onBlur:m,role:"combobox",type:(c=t.type)!=null?c:"text",tabIndex:0,ref:l.inputRef,defaultValue:z.value,disabled:l.disabled.value===!0?!0:void 0};return q({ourProps:_,theirProps:T,slot:b,attrs:t,slots:n,features:Q.RenderStrategy|Q.Static,name:"ComboboxInput"})}}}),ht=W({name:"ComboboxOptions",props:{as:{type:[Object,String],default:"ul"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},hold:{type:[Boolean],default:!1}},setup(o,{attrs:v,slots:t,expose:n}){let e=K("ComboboxOptions"),a=`headlessui-combobox-options-${Z()}`;n({el:e.optionsRef,$el:e.optionsRef}),Y(()=>{e.optionsPropsRef.value.static=o.static}),Y(()=>{e.optionsPropsRef.value.hold=o.hold});let i=De(),l=S(()=>i!==null?(i.value&X.Open)===X.Open:e.comboboxState.value===0);Ee({container:S(()=>I(e.optionsRef)),enabled:S(()=>e.comboboxState.value===0),accept(h){return h.getAttribute("role")==="option"?NodeFilter.FILTER_REJECT:h.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(h){h.setAttribute("role","none")}});function f(h){h.preventDefault()}return()=>{var h,p,u;let C={open:e.comboboxState.value===0},M={"aria-labelledby":(u=(h=I(e.labelRef))==null?void 0:h.id)!=null?u:(p=I(e.buttonRef))==null?void 0:p.id,id:a,ref:e.optionsRef,role:"listbox","aria-multiselectable":e.mode.value===1?!0:void 0,onMousedown:f},R=oe(o,["hold"]);return q({ourProps:M,theirProps:R,slot:C,attrs:v,slots:e.virtual.value&&e.comboboxState.value===0?{...t,default:()=>[G(tt,{},t.default)]}:t,features:Q.RenderStrategy|Q.Static,visible:l.value,name:"ComboboxOptions"})}}}),mt=W({name:"ComboboxOption",props:{as:{type:[Object,String],default:"li"},value:{type:[Object,String,Number,Boolean]},disabled:{type:Boolean,default:!1},order:{type:[Number],default:null}},setup(o,{slots:v,attrs:t,expose:n}){let e=K("ComboboxOption"),a=`headlessui-combobox-option-${Z()}`,i=$(null),l=S(()=>o.disabled);n({el:i,$el:i});let f=S(()=>{var m;return e.virtual.value?e.activeOptionIndex.value===e.calculateIndex(o.value):e.activeOptionIndex.value===null?!1:((m=e.options.value[e.activeOptionIndex.value])==null?void 0:m.id)===a}),h=S(()=>e.isSelected(o.value)),p=de(pe,null),u=S(()=>({disabled:o.disabled,value:o.value,domRef:i,order:S(()=>o.order)}));le(()=>e.registerOption(a,u)),re(()=>e.unregisterOption(a,f.value)),Y(()=>{let m=I(i);m&&(p==null||p.value.measureElement(m))}),Y(()=>{e.comboboxState.value===0&&f.value&&(e.virtual.value||e.activationTrigger.value!==0&&B(()=>{var m,y;return(y=(m=I(i))==null?void 0:m.scrollIntoView)==null?void 0:y.call(m,{block:"nearest"})}))});function C(m){m.preventDefault(),m.button===ve.Left&&(l.value||(e.selectOption(a),Ce()||requestAnimationFrame(()=>{var y;return(y=I(e.inputRef))==null?void 0:y.focus({preventScroll:!0})}),e.mode.value===0&&e.closeCombobox()))}function M(){var m;if(o.disabled||(m=e.virtual.value)!=null&&m.disabled(o.value))return e.goToOption(D.Nothing);let y=e.calculateIndex(o.value);e.goToOption(D.Specific,y)}let R=Te();function A(m){R.update(m)}function F(m){var y;if(!R.wasMoved(m)||o.disabled||(y=e.virtual.value)!=null&&y.disabled(o.value)||f.value)return;let z=e.calculateIndex(o.value);e.goToOption(D.Specific,z,0)}function P(m){var y;R.wasMoved(m)&&(o.disabled||(y=e.virtual.value)!=null&&y.disabled(o.value)||f.value&&(e.optionsPropsRef.value.hold||e.goToOption(D.Nothing)))}return()=>{let{disabled:m}=o,y={active:f.value,selected:h.value,disabled:m},z={id:a,ref:i,role:"option",tabIndex:m===!0?void 0:-1,"aria-disabled":m===!0?!0:void 0,"aria-selected":h.value,disabled:void 0,onMousedown:C,onFocus:M,onPointerenter:A,onMouseenter:A,onPointermove:F,onMousemove:F,onPointerleave:P,onMouseleave:P},d=oe(o,["order","value"]);return q({ourProps:z,theirProps:d,slot:y,attrs:t,slots:v,name:"ComboboxOption"})}}});export{pt as i,vt as l,ft as n,mt as r,ht as u};