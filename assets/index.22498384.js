(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerpolicy&&(l.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?l.credentials="include":n.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(n){if(n.ep)return;n.ep=!0;const l=o(n);fetch(n.href,l)}})();function w(){}function he(t){return t()}function ee(){return Object.create(null)}function M(t){t.forEach(he)}function ve(t){return typeof t=="function"}function ye(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let H;function te(t,e){return H||(H=document.createElement("a")),H.href=e,t===H.href}function xe(t){return Object.keys(t).length===0}function x(t,e){t.appendChild(e)}function _(t,e,o){t.insertBefore(e,o||null)}function b(t){t.parentNode.removeChild(t)}function $e(t,e){for(let o=0;o<t.length;o+=1)t[o]&&t[o].d(e)}function v(t){return document.createElement(t)}function q(t){return document.createTextNode(t)}function P(){return q(" ")}function pe(){return q("")}function oe(t,e,o,r){return t.addEventListener(e,o,r),()=>t.removeEventListener(e,o,r)}function m(t,e,o){o==null?t.removeAttribute(e):t.getAttribute(e)!==o&&t.setAttribute(e,o)}function D(t,e,o){e in t?t[e]=typeof t[e]=="boolean"&&o===""?!0:o:m(t,e,o)}function we(t){return Array.from(t.childNodes)}function ke(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function I(t,e,o,r){o===null?t.style.removeProperty(e):t.style.setProperty(e,o,r?"important":"")}let G;function C(t){G=t}const k=[],ne=[],N=[],re=[],Ce=Promise.resolve();let X=!1;function Ee(){X||(X=!0,Ce.then(me))}function Y(t){N.push(t)}const j=new Set;let A=0;function me(){const t=G;do{for(;A<k.length;){const e=k[A];A++,C(e),Me(e.$$)}for(C(null),k.length=0,A=0;ne.length;)ne.pop()();for(let e=0;e<N.length;e+=1){const o=N[e];j.has(o)||(j.add(o),o())}N.length=0}while(k.length);for(;re.length;)re.pop()();X=!1,j.clear(),C(t)}function Me(t){if(t.fragment!==null){t.update(),M(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Y)}}const Le=new Set;function Se(t,e){t&&t.i&&(Le.delete(t),t.i(e))}function Te(t,e,o,r){const{fragment:n,on_mount:l,on_destroy:s,after_update:f}=t.$$;n&&n.m(e,o),r||Y(()=>{const d=l.map(he).filter(ve);s?s.push(...d):M(d),t.$$.on_mount=[]}),f.forEach(Y)}function He(t,e){const o=t.$$;o.fragment!==null&&(M(o.on_destroy),o.fragment&&o.fragment.d(e),o.on_destroy=o.fragment=null,o.ctx=[])}function Ae(t,e){t.$$.dirty[0]===-1&&(k.push(t),Ee(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Oe(t,e,o,r,n,l,s,f=[-1]){const d=G;C(t);const c=t.$$={fragment:null,ctx:null,props:l,update:w,not_equal:n,bound:ee(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(d?d.$$.context:[])),callbacks:ee(),dirty:f,skip_bound:!1,root:e.target||d.$$.root};s&&s(c.root);let h=!1;if(c.ctx=o?o(t,e.props||{},(a,u,...i)=>{const p=i.length?i[0]:u;return c.ctx&&n(c.ctx[a],c.ctx[a]=p)&&(!c.skip_bound&&c.bound[a]&&c.bound[a](p),h&&Ae(t,a)),u}):[],c.update(),h=!0,M(c.before_update),c.fragment=r?r(c.ctx):!1,e.target){if(e.hydrate){const a=we(e.target);c.fragment&&c.fragment.l(a),a.forEach(b)}else c.fragment&&c.fragment.c();e.intro&&Se(t.$$.fragment),Te(t,e.target,e.anchor,e.customElement),me()}C(d)}class Ne{$destroy(){He(this,1),this.$destroy=w}$on(e,o){const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(o),()=>{const n=r.indexOf(o);n!==-1&&r.splice(n,1)}}$set(e){this.$$set&&!xe(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const E=(t,e=0,o=1)=>t>o?o:t<e?e:t,g=(t,e=0,o=Math.pow(10,e))=>Math.round(o*t)/o,Pe=t=>je(F(t)),F=t=>(t[0]==="#"&&(t=t.substr(1)),t.length<6?{r:parseInt(t[0]+t[0],16),g:parseInt(t[1]+t[1],16),b:parseInt(t[2]+t[2],16),a:1}:{r:parseInt(t.substr(0,2),16),g:parseInt(t.substr(2,2),16),b:parseInt(t.substr(4,2),16),a:1}),Ie=t=>De(Be(t)),qe=({h:t,s:e,v:o,a:r})=>{const n=(200-e)*o/100;return{h:g(t),s:g(n>0&&n<200?e*o/100/(n<=100?n:200-n)*100:0),l:g(n/2),a:g(r,2)}},K=t=>{const{h:e,s:o,l:r}=qe(t);return`hsl(${e}, ${o}%, ${r}%)`},Be=({h:t,s:e,v:o,a:r})=>{t=t/360*6,e=e/100,o=o/100;const n=Math.floor(t),l=o*(1-e),s=o*(1-(t-n)*e),f=o*(1-(1-t+n)*e),d=n%6;return{r:g([o,s,l,l,f,o][d]*255),g:g([f,o,o,s,l,l][d]*255),b:g([l,l,f,o,o,s][d]*255),a:g(r,2)}},z=t=>{const e=t.toString(16);return e.length<2?"0"+e:e},De=({r:t,g:e,b:o})=>"#"+z(t)+z(e)+z(o),je=({r:t,g:e,b:o,a:r})=>{const n=Math.max(t,e,o),l=n-Math.min(t,e,o),s=l?n===t?(e-o)/l:n===e?2+(o-t)/l:4+(t-e)/l:0;return{h:g(60*(s<0?s+6:s)),s:g(n?l/n*100:0),v:g(n/255*100),a:r}},ge=(t,e)=>{if(t===e)return!0;for(const o in t)if(t[o]!==e[o])return!1;return!0},ze=(t,e)=>t.toLowerCase()===e.toLowerCase()?!0:ge(F(t),F(e)),se={},be=t=>{let e=se[t];return e||(e=document.createElement("template"),e.innerHTML=t,se[t]=e),e},J=(t,e,o)=>{t.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:o}))};let $=!1;const U=t=>"touches"in t,Re=t=>$&&!U(t)?!1:($||($=U(t)),!0),le=(t,e)=>{const o=U(e)?e.touches[0]:e,r=t.el.getBoundingClientRect();J(t.el,"move",t.getMove({x:E((o.pageX-(r.left+window.pageXOffset))/r.width),y:E((o.pageY-(r.top+window.pageYOffset))/r.height)}))},Ve=(t,e)=>{const o=e.keyCode;o>40||t.xy&&o<37||o<33||(e.preventDefault(),J(t.el,"move",t.getMove({x:o===39?.01:o===37?-.01:o===34?.05:o===33?-.05:o===35?1:o===36?-1:0,y:o===40?.01:o===38?-.01:0},!0)))};class _e{constructor(e,o,r,n){const l=be(`<div role="slider" tabindex="0" part="${o}" ${r}><div part="${o}-pointer"></div></div>`);e.appendChild(l.content.cloneNode(!0));const s=e.querySelector(`[part=${o}]`);s.addEventListener("mousedown",this),s.addEventListener("touchstart",this),s.addEventListener("keydown",this),this.el=s,this.xy=n,this.nodes=[s.firstChild,s]}set dragging(e){const o=e?document.addEventListener:document.removeEventListener;o($?"touchmove":"mousemove",this),o($?"touchend":"mouseup",this)}handleEvent(e){switch(e.type){case"mousedown":case"touchstart":if(e.preventDefault(),!Re(e)||!$&&e.button!=0)return;this.el.focus(),le(this,e),this.dragging=!0;break;case"mousemove":case"touchmove":e.preventDefault(),le(this,e);break;case"mouseup":case"touchend":this.dragging=!1;break;case"keydown":Ve(this,e);break}}style(e){e.forEach((o,r)=>{for(const n in o)this.nodes[r].style.setProperty(n,o[n])})}}class Xe extends _e{constructor(e){super(e,"hue",'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"',!1)}update({h:e}){this.h=e,this.style([{left:`${e/360*100}%`,color:K({h:e,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuenow",`${g(e)}`)}getMove(e,o){return{h:o?E(this.h+e.x*360,0,360):360*e.x}}}class Ye extends _e{constructor(e){super(e,"saturation",'aria-label="Color"',!0)}update(e){this.hsva=e,this.style([{top:`${100-e.v}%`,left:`${e.s}%`,color:K(e)},{"background-color":K({h:e.h,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuetext",`Saturation ${g(e.s)}%, Brightness ${g(e.v)}%`)}getMove(e,o){return{s:o?E(this.hsva.s+e.x*100,0,100):e.x*100,v:o?E(this.hsva.v-e.y*100,0,100):Math.round(100-e.y*100)}}}const Fe=':host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;display:flex;place-content:center center;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{content:"";width:100%;height:100%;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}',Ke="[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}",Ue="[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}",O=Symbol("same"),R=Symbol("color"),ie=Symbol("hsva"),V=Symbol("update"),ce=Symbol("parts"),ae=Symbol("css"),ue=Symbol("sliders");class Ge extends HTMLElement{static get observedAttributes(){return["color"]}get[ae](){return[Fe,Ke,Ue]}get[ue](){return[Ye,Xe]}get color(){return this[R]}set color(e){if(!this[O](e)){const o=this.colorModel.toHsva(e);this[V](o),this[R]=e}}constructor(){super();const e=be(`<style>${this[ae].join("")}</style>`),o=this.attachShadow({mode:"open"});o.appendChild(e.content.cloneNode(!0)),o.addEventListener("move",this),this[ce]=this[ue].map(r=>new r(o))}connectedCallback(){if(this.hasOwnProperty("color")){const e=this.color;delete this.color,this.color=e}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(e,o,r){const n=this.colorModel.fromAttr(r);this[O](n)||(this.color=n)}handleEvent(e){const o=this[ie],r={...o,...e.detail};this[V](r);let n;!ge(r,o)&&!this[O](n=this.colorModel.fromHsva(r))&&(this[R]=n,J(this,"color-changed",{value:n}))}[O](e){return this.color&&this.colorModel.equal(e,this.color)}[V](e){this[ie]=e,this[ce].forEach(o=>o.update(e))}}const Je={defaultColor:"#000",toHsva:Pe,fromHsva:Ie,equal:ze,fromAttr:t=>t};class Qe extends Ge{get colorModel(){return Je}}class We extends Qe{}customElements.define("hex-color-picker",We);function Ze(t,e,o){var r=o||{},n=r.noTrailing,l=n===void 0?!1:n,s=r.noLeading,f=s===void 0?!1:s,d=r.debounceMode,c=d===void 0?void 0:d,h,a=!1,u=0;function i(){h&&clearTimeout(h)}function p(L){var S=L||{},y=S.upcomingOnly,B=y===void 0?!1:y;i(),a=!B}function Q(){for(var L=arguments.length,S=new Array(L),y=0;y<L;y++)S[y]=arguments[y];var B=this,W=Date.now()-u;if(a)return;function T(){u=Date.now(),e.apply(B,S)}function Z(){h=void 0}!f&&c&&!h&&T(),i(),c===void 0&&W>t?f?(u=Date.now(),l||(h=setTimeout(c?Z:T,t))):T():l!==!0&&(h=setTimeout(c?Z:T,c===void 0?t-W:t))}return Q.cancel=p,Q}function et(t,e,o){var r=o||{},n=r.atBegin,l=n===void 0?!1:n;return Ze(t,e,{debounceMode:l!==!1})}function fe(t,e,o){const r=t.slice();return r[8]=e[o],r}function tt(t){let e;return{c(){e=v("h2"),e.textContent="No matches found.",m(e,"class","svelte-1hmbsmh")},m(o,r){_(o,e,r)},p:w,d(o){o&&b(e)}}}function ot(t){let e;return{c(){e=v("h2"),e.textContent="Loading...",m(e,"class","svelte-1hmbsmh")},m(o,r){_(o,e,r)},p:w,d(o){o&&b(e)}}}function nt(t){let e,o=t[2],r=[];for(let n=0;n<o.length;n+=1)r[n]=de(fe(t,o,n));return{c(){for(let n=0;n<r.length;n+=1)r[n].c();e=pe()},m(n,l){for(let s=0;s<r.length;s+=1)r[s].m(n,l);_(n,e,l)},p(n,l){if(l&6){o=n[2];let s;for(s=0;s<o.length;s+=1){const f=fe(n,o,s);r[s]?r[s].p(f,l):(r[s]=de(f),r[s].c(),r[s].m(e.parentNode,e))}for(;s<r.length;s+=1)r[s].d(1);r.length=o.length}},d(n){$e(r,n),n&&b(e)}}}function de(t){let e,o,r=t[8].title+"",n,l,s,f,d,c,h;return{c(){e=v("a"),o=v("h2"),n=q(r),l=P(),s=v("img"),c=P(),m(o,"class","svelte-1hmbsmh"),te(s.src,f=t[8].url)||m(s,"src",f),m(s,"alt",d=t[8].title),m(e,"href",h=t[8].url),I(e,"--color",t[1]),m(e,"class","svelte-1hmbsmh")},m(a,u){_(a,e,u),x(e,o),x(o,n),x(e,l),x(e,s),x(e,c)},p(a,u){u&4&&r!==(r=a[8].title+"")&&ke(n,r),u&4&&!te(s.src,f=a[8].url)&&m(s,"src",f),u&4&&d!==(d=a[8].title)&&m(s,"alt",d),u&4&&h!==(h=a[8].url)&&m(e,"href",h),u&2&&I(e,"--color",a[1])},d(a){a&&b(e)}}}function rt(t){let e,o,r,n,l,s,f,d,c;function h(i,p){return i[2].length>0?nt:i[3]?ot:tt}let a=h(t),u=a(t);return{c(){e=v("h1"),o=q("APOD Color Search"),r=P(),n=v("div"),l=v("hex-color-picker"),s=P(),u.c(),f=pe(),I(e,"--color",t[1]),m(e,"class","svelte-1hmbsmh"),D(l,"color",t[0]),D(l,"class","svelte-1hmbsmh"),m(n,"id","color-picker"),m(n,"class","svelte-1hmbsmh")},m(i,p){_(i,e,p),x(e,o),_(i,r,p),_(i,n,p),x(n,l),_(i,s,p),u.m(i,p),_(i,f,p),d||(c=[oe(l,"mouseup",t[4]),oe(l,"color-changed",t[5])],d=!0)},p(i,[p]){p&2&&I(e,"--color",i[1]),p&1&&D(l,"color",i[0]),a===(a=h(i))&&u?u.p(i,p):(u.d(1),u=a(i),u&&(u.c(),u.m(f.parentNode,f)))},i:w,o:w,d(i){i&&b(e),i&&b(r),i&&b(n),i&&b(s),u.d(i),i&&b(f),d=!1,M(c)}}}const st="https://acs-api.deno.dev";function lt(t,e,o){let r="#ff00dd",n="",l=[],s=!1;async function f(){const a=await fetch(`${st}/search/${r.replace("#","")}`),{data:u,error:i}=await a.json();i?console.error(i):(o(2,l=u),console.log(l),l.length>0&&o(1,n=r)),o(3,s=!1)}function d(a){o(0,r=a.detail.value)}function c(){o(3,s=!0),o(2,l=[]),o(1,n=""),f()}const h=et(100,d);return[r,n,l,s,c,h]}class it extends Ne{constructor(e){super(),Oe(this,e,lt,rt,ye,{})}}new it({target:document.getElementById("app")});