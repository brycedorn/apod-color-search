(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();function w(){}function se(t){return t()}function F(){return Object.create(null)}function E(t){t.forEach(se)}function be(t){return typeof t=="function"}function le(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let M;function K(t,e){return M||(M=document.createElement("a")),M.href=e,t===M.href}function ye(t){return Object.keys(t).length===0}function v(t,e){t.appendChild(e)}function g(t,e,o){t.insertBefore(e,o||null)}function m(t){t.parentNode.removeChild(t)}function ve(t,e){for(let o=0;o<t.length;o+=1)t[o]&&t[o].d(e)}function b(t){return document.createElement(t)}function k(t){return document.createTextNode(t)}function A(){return k(" ")}function ie(){return k("")}function U(t,e,o,r){return t.addEventListener(e,o,r),()=>t.removeEventListener(e,o,r)}function p(t,e,o){o==null?t.removeAttribute(e):t.getAttribute(e)!==o&&t.setAttribute(e,o)}function O(t,e,o){e in t?t[e]=typeof t[e]=="boolean"&&o===""?!0:o:p(t,e,o)}function $e(t){return Array.from(t.childNodes)}function ce(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}let V;function x(t){V=t}const $=[],G=[],L=[],J=[],xe=Promise.resolve();let j=!1;function we(){j||(j=!0,xe.then(ae))}function B(t){L.push(t)}const N=new Set;let S=0;function ae(){const t=V;do{for(;S<$.length;){const e=$[S];S++,x(e),ke(e.$$)}for(x(null),$.length=0,S=0;G.length;)G.pop()();for(let e=0;e<L.length;e+=1){const o=L[e];N.has(o)||(N.add(o),o())}L.length=0}while($.length);for(;J.length;)J.pop()();j=!1,N.clear(),x(t)}function ke(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(B)}}const T=new Set;let Ce;function ue(t,e){t&&t.i&&(T.delete(t),t.i(e))}function Ee(t,e,o,r){if(t&&t.o){if(T.has(t))return;T.add(t),Ce.c.push(()=>{T.delete(t),r&&(o&&t.d(1),r())}),t.o(e)}else r&&r()}function Me(t){t&&t.c()}function fe(t,e,o,r){const{fragment:n,on_mount:s,on_destroy:l,after_update:u}=t.$$;n&&n.m(e,o),r||B(()=>{const i=s.map(se).filter(be);l?l.push(...i):E(i),t.$$.on_mount=[]}),u.forEach(B)}function de(t,e){const o=t.$$;o.fragment!==null&&(E(o.on_destroy),o.fragment&&o.fragment.d(e),o.on_destroy=o.fragment=null,o.ctx=[])}function Se(t,e){t.$$.dirty[0]===-1&&($.push(t),we(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function he(t,e,o,r,n,s,l,u=[-1]){const i=V;x(t);const c=t.$$={fragment:null,ctx:null,props:s,update:w,not_equal:n,bound:F(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(i?i.$$.context:[])),callbacks:F(),dirty:u,skip_bound:!1,root:e.target||i.$$.root};l&&l(c.root);let _=!1;if(c.ctx=o?o(t,e.props||{},(f,a,...d)=>{const Y=d.length?d[0]:a;return c.ctx&&n(c.ctx[f],c.ctx[f]=Y)&&(!c.skip_bound&&c.bound[f]&&c.bound[f](Y),_&&Se(t,f)),a}):[],c.update(),_=!0,E(c.before_update),c.fragment=r?r(c.ctx):!1,e.target){if(e.hydrate){const f=$e(e.target);c.fragment&&c.fragment.l(f),f.forEach(m)}else c.fragment&&c.fragment.c();e.intro&&ue(t.$$.fragment),fe(t,e.target,e.anchor,e.customElement),ae()}x(i)}class pe{$destroy(){de(this,1),this.$destroy=w}$on(e,o){const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(o),()=>{const n=r.indexOf(o);n!==-1&&r.splice(n,1)}}$set(e){this.$$set&&!ye(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const C=(t,e=0,o=1)=>t>o?o:t<e?e:t,h=(t,e=0,o=Math.pow(10,e))=>Math.round(o*t)/o,He=t=>Ne(z(t)),z=t=>(t[0]==="#"&&(t=t.substr(1)),t.length<6?{r:parseInt(t[0]+t[0],16),g:parseInt(t[1]+t[1],16),b:parseInt(t[2]+t[2],16),a:1}:{r:parseInt(t.substr(0,2),16),g:parseInt(t.substr(2,2),16),b:parseInt(t.substr(4,2),16),a:1}),Le=t=>Oe(Ae(t)),Te=({h:t,s:e,v:o,a:r})=>{const n=(200-e)*o/100;return{h:h(t),s:h(n>0&&n<200?e*o/100/(n<=100?n:200-n)*100:0),l:h(n/2),a:h(r,2)}},D=t=>{const{h:e,s:o,l:r}=Te(t);return`hsl(${e}, ${o}%, ${r}%)`},Ae=({h:t,s:e,v:o,a:r})=>{t=t/360*6,e=e/100,o=o/100;const n=Math.floor(t),s=o*(1-e),l=o*(1-(t-n)*e),u=o*(1-(1-t+n)*e),i=n%6;return{r:h([o,l,s,s,u,o][i]*255),g:h([u,o,o,l,s,s][i]*255),b:h([s,s,u,o,o,l][i]*255),a:h(r,2)}},I=t=>{const e=t.toString(16);return e.length<2?"0"+e:e},Oe=({r:t,g:e,b:o})=>"#"+I(t)+I(e)+I(o),Ne=({r:t,g:e,b:o,a:r})=>{const n=Math.max(t,e,o),s=n-Math.min(t,e,o),l=s?n===t?(e-o)/s:n===e?2+(o-t)/s:4+(t-e)/s:0;return{h:h(60*(l<0?l+6:l)),s:h(n?s/n*100:0),v:h(n/255*100),a:r}},me=(t,e)=>{if(t===e)return!0;for(const o in t)if(t[o]!==e[o])return!1;return!0},Ie=(t,e)=>t.toLowerCase()===e.toLowerCase()?!0:me(z(t),z(e)),Q={},ge=t=>{let e=Q[t];return e||(e=document.createElement("template"),e.innerHTML=t,Q[t]=e),e},X=(t,e,o)=>{t.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:o}))};let y=!1;const R=t=>"touches"in t,Pe=t=>y&&!R(t)?!1:(y||(y=R(t)),!0),W=(t,e)=>{const o=R(e)?e.touches[0]:e,r=t.el.getBoundingClientRect();X(t.el,"move",t.getMove({x:C((o.pageX-(r.left+window.pageXOffset))/r.width),y:C((o.pageY-(r.top+window.pageYOffset))/r.height)}))},qe=(t,e)=>{const o=e.keyCode;o>40||t.xy&&o<37||o<33||(e.preventDefault(),X(t.el,"move",t.getMove({x:o===39?.01:o===37?-.01:o===34?.05:o===33?-.05:o===35?1:o===36?-1:0,y:o===40?.01:o===38?-.01:0},!0)))};class _e{constructor(e,o,r,n){const s=ge(`<div role="slider" tabindex="0" part="${o}" ${r}><div part="${o}-pointer"></div></div>`);e.appendChild(s.content.cloneNode(!0));const l=e.querySelector(`[part=${o}]`);l.addEventListener("mousedown",this),l.addEventListener("touchstart",this),l.addEventListener("keydown",this),this.el=l,this.xy=n,this.nodes=[l.firstChild,l]}set dragging(e){const o=e?document.addEventListener:document.removeEventListener;o(y?"touchmove":"mousemove",this),o(y?"touchend":"mouseup",this)}handleEvent(e){switch(e.type){case"mousedown":case"touchstart":if(e.preventDefault(),!Pe(e)||!y&&e.button!=0)return;this.el.focus(),W(this,e),this.dragging=!0;break;case"mousemove":case"touchmove":e.preventDefault(),W(this,e);break;case"mouseup":case"touchend":this.dragging=!1;break;case"keydown":qe(this,e);break}}style(e){e.forEach((o,r)=>{for(const n in o)this.nodes[r].style.setProperty(n,o[n])})}}class je extends _e{constructor(e){super(e,"hue",'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"',!1)}update({h:e}){this.h=e,this.style([{left:`${e/360*100}%`,color:D({h:e,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuenow",`${h(e)}`)}getMove(e,o){return{h:o?C(this.h+e.x*360,0,360):360*e.x}}}class Be extends _e{constructor(e){super(e,"saturation",'aria-label="Color"',!0)}update(e){this.hsva=e,this.style([{top:`${100-e.v}%`,left:`${e.s}%`,color:D(e)},{"background-color":D({h:e.h,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuetext",`Saturation ${h(e.s)}%, Brightness ${h(e.v)}%`)}getMove(e,o){return{s:o?C(this.hsva.s+e.x*100,0,100):e.x*100,v:o?C(this.hsva.v-e.y*100,0,100):Math.round(100-e.y*100)}}}const ze=':host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;display:flex;place-content:center center;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{content:"";width:100%;height:100%;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}',De="[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}",Re="[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}",H=Symbol("same"),P=Symbol("color"),Z=Symbol("hsva"),q=Symbol("update"),ee=Symbol("parts"),te=Symbol("css"),oe=Symbol("sliders");class Ve extends HTMLElement{static get observedAttributes(){return["color"]}get[te](){return[ze,De,Re]}get[oe](){return[Be,je]}get color(){return this[P]}set color(e){if(!this[H](e)){const o=this.colorModel.toHsva(e);this[q](o),this[P]=e}}constructor(){super();const e=ge(`<style>${this[te].join("")}</style>`),o=this.attachShadow({mode:"open"});o.appendChild(e.content.cloneNode(!0)),o.addEventListener("move",this),this[ee]=this[oe].map(r=>new r(o))}connectedCallback(){if(this.hasOwnProperty("color")){const e=this.color;delete this.color,this.color=e}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(e,o,r){const n=this.colorModel.fromAttr(r);this[H](n)||(this.color=n)}handleEvent(e){const o=this[Z],r={...o,...e.detail};this[q](r);let n;!me(r,o)&&!this[H](n=this.colorModel.fromHsva(r))&&(this[P]=n,X(this,"color-changed",{value:n}))}[H](e){return this.color&&this.colorModel.equal(e,this.color)}[q](e){this[Z]=e,this[ee].forEach(o=>o.update(e))}}const Xe={defaultColor:"#000",toHsva:He,fromHsva:Le,equal:Ie,fromAttr:t=>t};class Ye extends Ve{get colorModel(){return Xe}}class Fe extends Ye{}customElements.define("hex-color-picker",Fe);function ne(t,e,o){const r=t.slice();return r[5]=e[o],r}function Ke(t){let e,o,r;return{c(){e=b("h2"),o=k("No matches for "),r=k(t[0]),p(e,"class","svelte-iowimp")},m(n,s){g(n,e,s),v(e,o),v(e,r)},p(n,s){s&1&&ce(r,n[0])},d(n){n&&m(e)}}}function Ue(t){let e,o=t[1],r=[];for(let n=0;n<o.length;n+=1)r[n]=re(ne(t,o,n));return{c(){for(let n=0;n<r.length;n+=1)r[n].c();e=ie()},m(n,s){for(let l=0;l<r.length;l+=1)r[l].m(n,s);g(n,e,s)},p(n,s){if(s&2){o=n[1];let l;for(l=0;l<o.length;l+=1){const u=ne(n,o,l);r[l]?r[l].p(u,s):(r[l]=re(u),r[l].c(),r[l].m(e.parentNode,e))}for(;l<r.length;l+=1)r[l].d(1);r.length=o.length}},d(n){ve(r,n),n&&m(e)}}}function re(t){let e,o=t[5].title+"",r,n,s,l,u;return{c(){e=b("h2"),r=k(o),n=A(),s=b("img"),p(e,"class","svelte-iowimp"),K(s.src,l=t[5].url)||p(s,"src",l),p(s,"alt",u=t[1].title)},m(i,c){g(i,e,c),v(e,r),g(i,n,c),g(i,s,c)},p(i,c){c&2&&o!==(o=i[5].title+"")&&ce(r,o),c&2&&!K(s.src,l=i[5].url)&&p(s,"src",l),c&2&&u!==(u=i[1].title)&&p(s,"alt",u)},d(i){i&&m(e),i&&m(n),i&&m(s)}}}function Ge(t){let e,o,r,n,s,l,u,i;function c(a,d){return a[1].length>0?Ue:Ke}let _=c(t),f=_(t);return{c(){e=b("div"),o=b("hex-color-picker"),r=A(),n=b("input"),s=A(),f.c(),l=ie(),O(o,"color",t[0]),O(o,"class","svelte-iowimp"),p(e,"id","color-picker"),p(e,"class","svelte-iowimp"),p(n,"type","text"),p(n,"placeholder",t[0]),n.value=t[0],p(n,"class","svelte-iowimp")},m(a,d){g(a,e,d),v(e,o),g(a,r,d),g(a,n,d),g(a,s,d),f.m(a,d),g(a,l,d),u||(i=[U(o,"color-changed",t[2]),U(n,"change",t[3])],u=!0)},p(a,[d]){d&1&&O(o,"color",a[0]),d&1&&p(n,"placeholder",a[0]),d&1&&n.value!==a[0]&&(n.value=a[0]),_===(_=c(a))&&f?f.p(a,d):(f.d(1),f=_(a),f&&(f.c(),f.m(l.parentNode,l)))},i:w,o:w,d(a){a&&m(e),a&&m(r),a&&m(n),a&&m(s),f.d(a),a&&m(l),u=!1,E(i)}}}let Je="https://acs-api.deno.dev";function Qe(t,e,o){let r="#ff00dd",n=[];async function s(){const i=await fetch(`${Je}/search/${r.replace("#","")}`),{data:c,error:_}=await i.json();_?console.error(_):o(1,n=c)}function l(i){o(0,r=i.detail.value),s()}function u(i){o(0,r=i.target.value),s()}return[r,n,l,u]}class We extends pe{constructor(e){super(),he(this,e,Qe,Ge,le,{})}}function Ze(t){let e,o,r,n,s;return n=new We({}),{c(){e=b("main"),o=b("h1"),o.textContent="APOD Color Search",r=A(),Me(n.$$.fragment)},m(l,u){g(l,e,u),v(e,o),v(e,r),fe(n,e,null),s=!0},p:w,i(l){s||(ue(n.$$.fragment,l),s=!0)},o(l){Ee(n.$$.fragment,l),s=!1},d(l){l&&m(e),de(n)}}}class et extends pe{constructor(e){super(),he(this,e,null,Ze,le,{})}}new et({target:document.getElementById("app")});
