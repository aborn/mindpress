import{au as P,h as N,q as R,a0 as w,s as T,av as E,aw as U,M as O,ax as D,R as S,$ as q,ay as I,az as V,aA as F,j as y,aB as k,aj as z,a8 as H,D as M,ae as $,ak as Q}from"./DVzZLM5D.js";async function L(t,r=P()){const{path:s,matched:m}=r.resolve(t);if(!m.length||(r._routePreloaded||(r._routePreloaded=new Set),r._routePreloaded.has(s)))return;const e=r._preloadPromises=r._preloadPromises||[];if(e.length>4)return Promise.all(e).then(()=>L(t,r));r._routePreloaded.add(s);const a=m.map(i=>{var n;return(n=i.components)==null?void 0:n.default}).filter(i=>typeof i=="function");for(const i of a){const n=Promise.resolve(i()).catch(()=>{}).finally(()=>e.splice(e.indexOf(n)));e.push(n)}await Promise.all(e)}const W=(...t)=>t.find(r=>r!==void 0);function G(t){const r=t.componentName||"NuxtLink";function s(e,a){if(!e||t.trailingSlash!=="append"&&t.trailingSlash!=="remove")return e;if(typeof e=="string")return _(e,t.trailingSlash);const i="path"in e&&e.path!==void 0?e.path:a(e).path;return{...e,name:void 0,path:_(i,t.trailingSlash)}}function m(e){const a=P(),i=M(),n=y(()=>!!e.target&&e.target!=="_self"),o=y(()=>{const c=e.to||e.href||"";return typeof c=="string"&&k(c,{acceptRelative:!0})}),p=q("RouterLink"),h=p&&typeof p!="string"?p.useLink:void 0,d=y(()=>{if(e.external)return!0;const c=e.to||e.href||"";return typeof c=="object"?!1:c===""||o.value}),u=y(()=>{const c=e.to||e.href||"";return d.value?c:s(c,a.resolve)}),f=d.value||h==null?void 0:h({...e,to:u}),g=y(()=>{var c;if(!u.value||o.value)return u.value;if(d.value){const v=typeof u.value=="object"?A(u.value):u.value;return s(v,a.resolve)}return typeof u.value=="object"?((c=a.resolve(u.value))==null?void 0:c.href)??null:s(z(i.app.baseURL,u.value),a.resolve)});return{to:u,hasTarget:n,isAbsoluteUrl:o,isExternal:d,href:g,isActive:(f==null?void 0:f.isActive)??y(()=>u.value===a.currentRoute.value.path),isExactActive:(f==null?void 0:f.isExactActive)??y(()=>u.value===a.currentRoute.value.path),route:(f==null?void 0:f.route)??y(()=>a.resolve(u.value)),async navigate(){await H(g.value,{replace:e.replace,external:d.value||n.value})}}}return N({name:r,props:{to:{type:[String,Object],default:void 0,required:!1},href:{type:[String,Object],default:void 0,required:!1},target:{type:String,default:void 0,required:!1},rel:{type:String,default:void 0,required:!1},noRel:{type:Boolean,default:void 0,required:!1},prefetch:{type:Boolean,default:void 0,required:!1},noPrefetch:{type:Boolean,default:void 0,required:!1},activeClass:{type:String,default:void 0,required:!1},exactActiveClass:{type:String,default:void 0,required:!1},prefetchedClass:{type:String,default:void 0,required:!1},replace:{type:Boolean,default:void 0,required:!1},ariaCurrentValue:{type:String,default:void 0,required:!1},external:{type:Boolean,default:void 0,required:!1},custom:{type:Boolean,default:void 0,required:!1}},useLink:m,setup(e,{slots:a}){const i=P(),{to:n,href:o,navigate:p,isExternal:h,hasTarget:d,isAbsoluteUrl:u}=m(e),f=R(!1),g=R(null),c=v=>{var b;g.value=e.custom?(b=v==null?void 0:v.$el)==null?void 0:b.nextElementSibling:v==null?void 0:v.$el};if(e.prefetch!==!1&&e.noPrefetch!==!0&&e.target!=="_blank"&&!K()){const b=w();let x,l=null;T(()=>{const j=J();E(()=>{x=U(()=>{var C;(C=g==null?void 0:g.value)!=null&&C.tagName&&(l=j.observe(g.value,async()=>{l==null||l(),l=null;const B=typeof n.value=="string"?n.value:h.value?A(n.value):i.resolve(n.value).fullPath;await Promise.all([b.hooks.callHook("link:prefetch",B).catch(()=>{}),!h.value&&!d.value&&L(n.value,i).catch(()=>{})]),f.value=!0}))})})}),O(()=>{x&&D(x),l==null||l(),l=null})}return()=>{var x;if(!h.value&&!d.value){const l={ref:c,to:n.value,activeClass:e.activeClass||t.activeClass,exactActiveClass:e.exactActiveClass||t.exactActiveClass,replace:e.replace,ariaCurrentValue:e.ariaCurrentValue,custom:e.custom};return e.custom||(f.value&&(l.class=e.prefetchedClass||t.prefetchedClass),l.rel=e.rel||void 0),S(q("RouterLink"),l,a.default)}const v=e.target||null,b=W(e.noRel?"":e.rel,t.externalRelAttribute,u.value||d.value?"noopener noreferrer":"")||null;return e.custom?a.default?a.default({href:o.value,navigate:p,get route(){if(!o.value)return;const l=new URL(o.value,window.location.href);return{path:l.pathname,fullPath:l.pathname,get query(){return I(l.search)},hash:l.hash,params:{},name:void 0,matched:[],redirectedFrom:void 0,meta:{},href:o.value}},rel:b,target:v,isExternal:h.value||d.value,isActive:!1,isExactActive:!1}):null:S("a",{ref:g,href:o.value||null,rel:b,target:v},(x=a.default)==null?void 0:x.call(a))}}})}const Y=G(V);function _(t,r){const s=r==="append"?$:Q;return k(t)&&!t.startsWith("http")?t:s(t,!0)}function J(){const t=w();if(t._observer)return t._observer;let r=null;const s=new Map,m=(a,i)=>(r||(r=new IntersectionObserver(n=>{for(const o of n){const p=s.get(o.target);(o.isIntersecting||o.intersectionRatio>0)&&p&&p()}})),s.set(a,i),r.observe(a),()=>{s.delete(a),r.unobserve(a),s.size===0&&(r.disconnect(),r=null)});return t._observer={observe:m}}function K(){const t=navigator.connection;return!!(t&&(t.saveData||/2g/.test(t.effectiveType)))}function A(t){return F(t.path||"",t.query||{})+(t.hash?"#"+t.hash:"")}export{Y as _};
