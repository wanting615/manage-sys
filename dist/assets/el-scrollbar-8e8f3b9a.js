import{Z as re,o as I,_ as se,k as ne}from"./el-input-8b7241ab.js";import{b as D,_ as Y,u as J,t as oe,G as W,z as le,d as ie,C as R,c as U,n as ce,e as ue}from"./base-54b2e543.js";import{d as O,i as fe,a as v,m as k,k as me,R as K,o as B,n as $,w as ee,B as ve,A as X,q as L,b as p,U as j,M as de,T as he,c as te,e as F,F as pe,I as V,Q as G,p as be,r as ge,j as ye,ao as Se,h as we,G as ze,s as Te,P as Ee}from"./index-00ae2104.js";var _e=/\s/;function ke(t){for(var n=t.length;n--&&_e.test(t.charAt(n)););return n}var xe=/^\s+/;function Ce(t){return t&&t.slice(0,ke(t)+1).replace(xe,"")}var q=0/0,He=/^[-+]0x[0-9a-f]+$/i,Ne=/^0b[01]+$/i,Re=/^0o[0-7]+$/i,Be=parseInt;function Q(t){if(typeof t=="number")return t;if(re(t))return q;if(I(t)){var n=typeof t.valueOf=="function"?t.valueOf():t;t=I(n)?n+"":n}if(typeof t!="string")return t===0?t:+t;t=Ce(t);var l=Ne.test(t);return l||Re.test(t)?Be(t.slice(2),l?2:8):He.test(t)?q:+t}var Le=function(){return se.Date.now()};const A=Le;var Pe="Expected a function",Me=Math.max,Oe=Math.min;function et(t,n,l){var o,f,m,i,c,r,d=0,b=!1,s=!1,g=!0;if(typeof t!="function")throw new TypeError(Pe);n=Q(n)||0,I(l)&&(b=!!l.leading,s="maxWait"in l,m=s?Me(Q(l.maxWait)||0,n):m,g="trailing"in l?!!l.trailing:g);function y(a){var e=o,u=f;return o=f=void 0,d=a,i=t.apply(u,e),i}function T(a){return d=a,c=setTimeout(S,n),b?y(a):i}function x(a){var e=a-r,u=a-d,h=n-e;return s?Oe(h,m-u):h}function E(a){var e=a-r,u=a-d;return r===void 0||e>=n||e<0||s&&u>=m}function S(){var a=A();if(E(a))return w(a);c=setTimeout(S,x(a))}function w(a){return c=void 0,g&&o?y(a):(o=f=void 0,i)}function C(){c!==void 0&&clearTimeout(c),d=0,o=r=f=c=void 0}function H(){return c===void 0?i:w(A())}function z(){var a=A(),e=E(a);if(o=arguments,f=this,r=a,e){if(c===void 0)return T(r);if(s)return clearTimeout(c),c=setTimeout(S,n),y(r)}return c===void 0&&(c=setTimeout(S,n)),i}return z.cancel=C,z.flush=H,z}const tt=t=>["",...ne].includes(t),_=4,Ae={vertical:{offset:"offsetHeight",scroll:"scrollTop",scrollSize:"scrollHeight",size:"height",key:"vertical",axis:"Y",client:"clientY",direction:"top"},horizontal:{offset:"offsetWidth",scroll:"scrollLeft",scrollSize:"scrollWidth",size:"width",key:"horizontal",axis:"X",client:"clientX",direction:"left"}},Ie=({move:t,size:n,bar:l})=>({[l.size]:n,transform:`translate${l.axis}(${t}%)`}),ae=Symbol("scrollbarContextKey"),We=D({vertical:Boolean,size:String,move:Number,ratio:{type:Number,required:!0},always:Boolean}),$e="Thumb",Xe=O({__name:"thumb",props:We,setup(t){const n=t,l=fe(ae),o=J("scrollbar");l||oe($e,"can not inject scrollbar context");const f=v(),m=v(),i=v({}),c=v(!1);let r=!1,d=!1,b=le?document.onselectstart:null;const s=k(()=>Ae[n.vertical?"vertical":"horizontal"]),g=k(()=>Ie({size:n.size,move:n.move,bar:s.value})),y=k(()=>f.value[s.value.offset]**2/l.wrapElement[s.value.scrollSize]/n.ratio/m.value[s.value.offset]),T=a=>{var e;if(a.stopPropagation(),a.ctrlKey||[1,2].includes(a.button))return;(e=window.getSelection())==null||e.removeAllRanges(),E(a);const u=a.currentTarget;u&&(i.value[s.value.axis]=u[s.value.offset]-(a[s.value.client]-u.getBoundingClientRect()[s.value.direction]))},x=a=>{if(!m.value||!f.value||!l.wrapElement)return;const e=Math.abs(a.target.getBoundingClientRect()[s.value.direction]-a[s.value.client]),u=m.value[s.value.offset]/2,h=(e-u)*100*y.value/f.value[s.value.offset];l.wrapElement[s.value.scroll]=h*l.wrapElement[s.value.scrollSize]/100},E=a=>{a.stopImmediatePropagation(),r=!0,document.addEventListener("mousemove",S),document.addEventListener("mouseup",w),b=document.onselectstart,document.onselectstart=()=>!1},S=a=>{if(!f.value||!m.value||r===!1)return;const e=i.value[s.value.axis];if(!e)return;const u=(f.value.getBoundingClientRect()[s.value.direction]-a[s.value.client])*-1,h=m.value[s.value.offset]-e,N=(u-h)*100*y.value/f.value[s.value.offset];l.wrapElement[s.value.scroll]=N*l.wrapElement[s.value.scrollSize]/100},w=()=>{r=!1,i.value[s.value.axis]=0,document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",w),z(),d&&(c.value=!1)},C=()=>{d=!1,c.value=!!n.size},H=()=>{d=!0,c.value=r};me(()=>{z(),document.removeEventListener("mouseup",w)});const z=()=>{document.onselectstart!==b&&(document.onselectstart=b)};return W(K(l,"scrollbarElement"),"mousemove",C),W(K(l,"scrollbarElement"),"mouseleave",H),(a,e)=>(B(),$(he,{name:p(o).b("fade"),persisted:""},{default:ee(()=>[ve(X("div",{ref_key:"instance",ref:f,class:L([p(o).e("bar"),p(o).is(p(s).key)]),onMousedown:x},[X("div",{ref_key:"thumb",ref:m,class:L(p(o).e("thumb")),style:j(p(g)),onMousedown:T},null,38)],34),[[de,a.always||c.value]])]),_:1},8,["name"]))}});var Z=Y(Xe,[["__file","/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue"]]);const je=D({always:{type:Boolean,default:!0},width:String,height:String,ratioX:{type:Number,default:1},ratioY:{type:Number,default:1}}),De=O({__name:"bar",props:je,setup(t,{expose:n}){const l=t,o=v(0),f=v(0);return n({handleScroll:i=>{if(i){const c=i.offsetHeight-_,r=i.offsetWidth-_;f.value=i.scrollTop*100/c*l.ratioY,o.value=i.scrollLeft*100/r*l.ratioX}}}),(i,c)=>(B(),te(pe,null,[F(Z,{move:o.value,ratio:i.ratioX,size:i.width,always:i.always},null,8,["move","ratio","size","always"]),F(Z,{move:f.value,ratio:i.ratioY,size:i.height,vertical:"",always:i.always},null,8,["move","ratio","size","always"])],64))}});var Ye=Y(De,[["__file","/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue"]]);const Ue=D({height:{type:[String,Number],default:""},maxHeight:{type:[String,Number],default:""},native:{type:Boolean,default:!1},wrapStyle:{type:ie([String,Object,Array]),default:""},wrapClass:{type:[String,Array],default:""},viewClass:{type:[String,Array],default:""},viewStyle:{type:[String,Array,Object],default:""},noresize:Boolean,tag:{type:String,default:"div"},always:Boolean,minSize:{type:Number,default:20}}),Ke={scroll:({scrollTop:t,scrollLeft:n})=>[t,n].every(R)},Fe="ElScrollbar",Ve=O({name:Fe}),Ge=O({...Ve,props:Ue,emits:Ke,setup(t,{expose:n,emit:l}){const o=t,f=J("scrollbar");let m,i;const c=v(),r=v(),d=v(),b=v("0"),s=v("0"),g=v(),y=v(1),T=v(1),x=k(()=>{const e={};return o.height&&(e.height=U(o.height)),o.maxHeight&&(e.maxHeight=U(o.maxHeight)),[o.wrapStyle,e]}),E=k(()=>[o.wrapClass,f.e("wrap"),{[f.em("wrap","hidden-default")]:!o.native}]),S=k(()=>[f.e("view"),o.viewClass]),w=()=>{var e;r.value&&((e=g.value)==null||e.handleScroll(r.value),l("scroll",{scrollTop:r.value.scrollTop,scrollLeft:r.value.scrollLeft}))};function C(e,u){Ee(e)?r.value.scrollTo(e):R(e)&&R(u)&&r.value.scrollTo(e,u)}const H=e=>{R(e)&&(r.value.scrollTop=e)},z=e=>{R(e)&&(r.value.scrollLeft=e)},a=()=>{if(!r.value)return;const e=r.value.offsetHeight-_,u=r.value.offsetWidth-_,h=e**2/r.value.scrollHeight,N=u**2/r.value.scrollWidth,P=Math.max(h,o.minSize),M=Math.max(N,o.minSize);y.value=h/(e-h)/(P/(e-P)),T.value=N/(u-N)/(M/(u-M)),s.value=P+_<e?`${P}px`:"",b.value=M+_<u?`${M}px`:""};return V(()=>o.noresize,e=>{e?(m==null||m(),i==null||i()):({stop:m}=ce(d,a),i=W("resize",a))},{immediate:!0}),V(()=>[o.maxHeight,o.height],()=>{o.native||G(()=>{var e;a(),r.value&&((e=g.value)==null||e.handleScroll(r.value))})}),be(ae,ge({scrollbarElement:c,wrapElement:r})),ye(()=>{o.native||G(()=>{a()})}),Se(()=>a()),n({wrapRef:r,update:a,scrollTo:C,setScrollTop:H,setScrollLeft:z,handleScroll:w}),(e,u)=>(B(),te("div",{ref_key:"scrollbarRef",ref:c,class:L(p(f).b())},[X("div",{ref_key:"wrapRef",ref:r,class:L(p(E)),style:j(p(x)),onScroll:w},[(B(),$(ze(e.tag),{ref_key:"resizeRef",ref:d,class:L(p(S)),style:j(e.viewStyle)},{default:ee(()=>[we(e.$slots,"default")]),_:3},8,["class","style"]))],38),e.native?Te("v-if",!0):(B(),$(Ye,{key:0,ref_key:"barRef",ref:g,height:s.value,width:b.value,always:e.always,"ratio-x":T.value,"ratio-y":y.value},null,8,["height","width","always","ratio-x","ratio-y"]))],2))}});var qe=Y(Ge,[["__file","/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue"]]);const at=ue(qe);export{at as E,et as d,tt as i};