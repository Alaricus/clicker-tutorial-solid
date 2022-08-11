(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))i(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerpolicy&&(s.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?s.credentials="include":l.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(l){if(l.ep)return;l.ep=!0;const s=n(l);fetch(l.href,s)}})();const $={},Ee=(e,t)=>e===t,C=Symbol("solid-proxy"),ae=Symbol("solid-track"),q={equals:Ee};let Te=we;const P={},x=1,R=2,de={owned:null,cleanups:null,context:null,owner:null};var g=null;let D=null,h=null,v=null,y=null,S=null,te=0;function F(e,t){const n=h,i=g,l=e.length===0,s=l?de:{owned:null,cleanups:null,context:null,owner:t||i},r=l?e:()=>e(()=>le(s));g=s,h=null;try{return ie(r,!0)}finally{h=n,g=i}}function K(e,t){t=t?Object.assign({},q,t):q;const n={value:e,observers:null,observerSlots:null,pending:P,comparator:t.equals||void 0},i=l=>(typeof l=="function"&&(l=l(n.pending!==P?n.pending:n.value)),ne(n,l));return[pe.bind(n),i]}function M(e,t,n){const i=be(e,t,!1,x);Q(i)}function W(e,t,n){n=n?Object.assign({},q,n):q;const i=be(e,t,!0,0);return i.pending=P,i.observers=null,i.observerSlots=null,i.comparator=n.equals||void 0,Q(i),pe.bind(i)}function he(e){if(v)return e();let t;const n=v=[];try{t=e()}finally{v=null}return ie(()=>{for(let i=0;i<n.length;i+=1){const l=n[i];if(l.pending!==P){const s=l.pending;l.pending=P,ne(l,s)}}},!1),t}function J(e){let t,n=h;return h=null,t=e(),h=n,t}function ge(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function ye(){return h}function pe(){const e=D;if(this.sources&&(this.state||e)){const t=y;y=null,this.state===x||e?Q(this):U(this),y=t}if(h){const t=this.observers?this.observers.length:0;h.sources?(h.sources.push(this),h.sourceSlots.push(t)):(h.sources=[this],h.sourceSlots=[t]),this.observers?(this.observers.push(h),this.observerSlots.push(h.sources.length-1)):(this.observers=[h],this.observerSlots=[h.sources.length-1])}return this.value}function ne(e,t,n){if(v)return e.pending===P&&v.push(e),e.pending=t,t;if(e.comparator&&e.comparator(e.value,t))return t;let i=!1;return e.value=t,e.observers&&e.observers.length&&ie(()=>{for(let l=0;l<e.observers.length;l+=1){const s=e.observers[l];i&&D.disposed.has(s),(i&&!s.tState||!i&&!s.state)&&(s.pure?y.push(s):S.push(s),s.observers&&Ae(s)),i||(s.state=x)}if(y.length>1e6)throw y=[],new Error},!1),t}function Q(e){if(!e.fn)return;le(e);const t=g,n=h,i=te;h=g=e,ve(e,e.value,i),h=n,g=t}function ve(e,t,n){let i;try{i=e.fn(t)}catch(l){Se(l)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?ne(e,i):e.value=i,e.updatedAt=n)}function be(e,t,n,i=x,l){const s={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:g,context:null,pure:n};return g===null||g!==de&&(g.owned?g.owned.push(s):g.owned=[s]),s}function me(e){const t=D;if(e.state===0||t)return;if(e.state===R||t)return U(e);if(e.suspense&&J(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<te);)(e.state||t)&&n.push(e);for(let i=n.length-1;i>=0;i--)if(e=n[i],e.state===x||t)Q(e);else if(e.state===R||t){const l=y;y=null,U(e,n[0]),y=l}}function ie(e,t){if(y)return e();let n=!1;t||(y=[]),S?n=!0:S=[],te++;try{const i=e();return _e(n),i}catch(i){y||(S=null),Se(i)}}function _e(e){y&&(we(y),y=null),!e&&(S.length?he(()=>{Te(S),S=null}):S=null)}function we(e){for(let t=0;t<e.length;t++)me(e[t])}function U(e,t){const n=D;e.state=0;for(let i=0;i<e.sources.length;i+=1){const l=e.sources[i];l.sources&&(l.state===x||n?l!==t&&me(l):(l.state===R||n)&&U(l,t))}}function Ae(e){const t=D;for(let n=0;n<e.observers.length;n+=1){const i=e.observers[n];(!i.state||t)&&(i.state=R,i.pure?y.push(i):S.push(i),i.observers&&Ae(i))}}function le(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),i=e.sourceSlots.pop(),l=n.observers;if(l&&l.length){const s=l.pop(),r=n.observerSlots.pop();i<l.length&&(s.sourceSlots[r]=i,l[i]=s,n.observerSlots[i]=r)}}if(e.owned){for(t=0;t<e.owned.length;t++)le(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Se(e){throw e}const je=Symbol("fallback");function oe(e){for(let t=0;t<e.length;t++)e[t]()}function De(e,t,n={}){let i=[],l=[],s=[],r=0,o=t.length>1?[]:null;return ge(()=>oe(s)),()=>{let c=e()||[],f,u;return c[ae],J(()=>{let a=c.length,p,b,E,L,I,m,w,A,N;if(a===0)r!==0&&(oe(s),s=[],i=[],l=[],r=0,o&&(o=[])),n.fallback&&(i=[je],l[0]=F(xe=>(s[0]=xe,n.fallback())),r=1);else if(r===0){for(l=new Array(a),u=0;u<a;u++)i[u]=c[u],l[u]=F(d);r=a}else{for(E=new Array(a),L=new Array(a),o&&(I=new Array(a)),m=0,w=Math.min(r,a);m<w&&i[m]===c[m];m++);for(w=r-1,A=a-1;w>=m&&A>=m&&i[w]===c[A];w--,A--)E[A]=l[w],L[A]=s[w],o&&(I[A]=o[w]);for(p=new Map,b=new Array(A+1),u=A;u>=m;u--)N=c[u],f=p.get(N),b[u]=f===void 0?-1:f,p.set(N,u);for(f=m;f<=w;f++)N=i[f],u=p.get(N),u!==void 0&&u!==-1?(E[u]=l[f],L[u]=s[f],o&&(I[u]=o[f]),u=b[u],p.set(N,u)):s[f]();for(u=m;u<a;u++)u in E?(l[u]=E[u],s[u]=L[u],o&&(o[u]=I[u],o[u](u))):l[u]=F(d);l=l.slice(0,r=a),i=c.slice(0)}return l});function d(a){if(s[u]=a,o){const[p,b]=K(u);return o[u]=b,t(c[u],p)}return t(c[u])}}}function _(e,t){return J(()=>e(t||{}))}function B(){return!0}const Le={get(e,t,n){return t===C?n:e.get(t)},has(e,t){return e.has(t)},set:B,deleteProperty:B,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:B,deleteProperty:B}},ownKeys(e){return e.keys()}};function Z(e){return(e=typeof e=="function"?e():e)==null?{}:e}function re(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const i=Z(e[n])[t];if(i!==void 0)return i}},has(t){for(let n=e.length-1;n>=0;n--)if(t in Z(e[n]))return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(Z(e[n])));return[...new Set(t)]}},Le)}function Ie(e){const t="fallback"in e&&{fallback:()=>e.fallback};return W(De(()=>e.each,e.children,t||void 0))}function Be(e){let t=!1;const n=W(()=>e.when,void 0,{equals:(i,l)=>t?i===l:!i==!l});return W(()=>{const i=n();if(i){const l=e.children;return(t=typeof l=="function"&&l.length>0)?J(()=>l(i)):l}return e.fallback})}function Fe(e,t){return W(e,void 0,t?void 0:{equals:t})}function qe(e,t,n){let i=n.length,l=t.length,s=i,r=0,o=0,c=t[l-1].nextSibling,f=null;for(;r<l||o<s;){if(t[r]===n[o]){r++,o++;continue}for(;t[l-1]===n[s-1];)l--,s--;if(l===r){const u=s<i?o?n[o-1].nextSibling:n[s-o]:c;for(;o<s;)e.insertBefore(n[o++],u)}else if(s===o)for(;r<l;)(!f||!f.has(t[r]))&&t[r].remove(),r++;else if(t[r]===n[s-1]&&n[o]===t[l-1]){const u=t[--l].nextSibling;e.insertBefore(n[o++],t[r++].nextSibling),e.insertBefore(n[--s],u),t[l]=n[s]}else{if(!f){f=new Map;let d=o;for(;d<s;)f.set(n[d],d++)}const u=f.get(t[r]);if(u!=null)if(o<u&&u<s){let d=r,a=1,p;for(;++d<l&&d<s&&!((p=f.get(t[d]))==null||p!==u+a);)a++;if(a>u-o){const b=t[r];for(;o<u;)e.insertBefore(n[o++],b)}else e.replaceChild(n[o++],t[r++])}else r++;else t[r++].remove()}}}const ue="_$DX_DELEGATE";function Re(e,t,n){let i;return F(l=>{i=l,t===document?e():k(t,e(),t.firstChild?null:void 0,n)}),()=>{i(),t.textContent=""}}function Y(e,t,n){const i=document.createElement("template");i.innerHTML=e;let l=i.content.firstChild;return n&&(l=l.firstChild),l}function $e(e,t=window.document){const n=t[ue]||(t[ue]=new Set);for(let i=0,l=e.length;i<l;i++){const s=e[i];n.has(s)||(n.add(s),t.addEventListener(s,Me))}}function Ke(e,t){t==null?e.removeAttribute("class"):e.className=t}function k(e,t,n,i){if(n!==void 0&&!i&&(i=[]),typeof t!="function")return G(e,t,i,n);M(l=>G(e,t(),l,n),i)}function Me(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),$.registry&&!$.done&&($.done=!0,document.querySelectorAll("[id^=pl-]").forEach(i=>i.remove()));n!==null;){const i=n[t];if(i&&!n.disabled){const l=n[`${t}Data`];if(l!==void 0?i.call(n,l,e):i.call(n,e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function G(e,t,n,i,l){for($.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const s=typeof t,r=i!==void 0;if(e=r&&n[0]&&n[0].parentNode||e,s==="string"||s==="number"){if($.context)return n;if(s==="number"&&(t=t.toString()),r){let o=n[0];o&&o.nodeType===3?o.data=t:o=document.createTextNode(t),n=O(e,n,i,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||s==="boolean"){if($.context)return n;n=O(e,n,i)}else{if(s==="function")return M(()=>{let o=t();for(;typeof o=="function";)o=o();n=G(e,o,n,i)}),()=>n;if(Array.isArray(t)){const o=[],c=n&&Array.isArray(n);if(z(o,t,n,l))return M(()=>n=G(e,o,n,i,!0)),()=>n;if($.context){for(let f=0;f<o.length;f++)if(o[f].parentNode)return n=o}if(o.length===0){if(n=O(e,n,i),r)return n}else c?n.length===0?ce(e,o,i):qe(e,n,o):(n&&O(e),ce(e,o));n=o}else if(t instanceof Node){if($.context&&t.parentNode)return n=r?[t]:t;if(Array.isArray(n)){if(r)return n=O(e,n,i,t);O(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function z(e,t,n,i){let l=!1;for(let s=0,r=t.length;s<r;s++){let o=t[s],c=n&&n[s];if(o instanceof Node)e.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))l=z(e,o,c)||l;else if(typeof o=="function")if(i){for(;typeof o=="function";)o=o();l=z(e,Array.isArray(o)?o:[o],c)||l}else e.push(o),l=!0;else{const f=String(o);c&&c.nodeType===3&&c.data===f?e.push(c):e.push(document.createTextNode(f))}}return l}function ce(e,t,n){for(let i=0,l=t.length;i<l;i++)e.insertBefore(t[i],n)}function O(e,t,n,i){if(n===void 0)return e.textContent="";const l=i||document.createTextNode("");if(t.length){let s=!1;for(let r=t.length-1;r>=0;r--){const o=t[r];if(l!==o){const c=o.parentNode===e;!s&&!r?c?e.replaceChild(l,o):e.insertBefore(l,n):c&&o.remove()}else s=!0}}else e.insertBefore(l,n);return[l]}const ke=Symbol("store-raw"),V=Symbol("store-node"),We=Symbol("store-name");function Ce(e,t){let n=e[C];if(!n){Object.defineProperty(e,C,{value:n=new Proxy(e,Ve)});const i=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let s=0,r=i.length;s<r;s++){const o=i[s];if(l[o].get){const c=l[o].get.bind(n);Object.defineProperty(e,o,{get:c})}}}return n}function H(e){let t;return e!=null&&typeof e=="object"&&(e[C]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function j(e,t=new Set){let n,i,l,s;if(n=e!=null&&e[ke])return n;if(!H(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let r=0,o=e.length;r<o;r++)l=e[r],(i=j(l,t))!==l&&(e[r]=i)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const r=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let c=0,f=r.length;c<f;c++)s=r[c],!o[s].get&&(l=e[s],(i=j(l,t))!==l&&(e[s]=i))}return e}function se(e){let t=e[V];return t||Object.defineProperty(e,V,{value:t={}}),t}function ee(e,t,n){return e[t]||(e[t]=Oe(n,!0))}function Ue(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===C||t===V||t===We||(delete n.value,delete n.writable,n.get=()=>e[C][t]),n}function Ne(e){if(ye()){const t=se(e);(t._||(t._=Oe()))()}}function Ge(e){return Ne(e),Reflect.ownKeys(e)}function Oe(e,t){const[n,i]=K(e,t?{internal:!0}:{equals:!1,internal:!0});return n.$=i,n}const Ve={get(e,t,n){if(t===ke)return e;if(t===C)return n;if(t===ae)return Ne(e);const i=se(e),l=i[t];let s=l?i[t]():e[t];if(t===V||t==="__proto__")return s;if(!l){const r=Object.getOwnPropertyDescriptor(e,t);ye()&&(typeof s!="function"||e.hasOwnProperty(t))&&!(r&&r.get)&&(s=ee(i,t,s)())}return H(s)?Ce(s):s},set(){return!0},deleteProperty(){return!0},ownKeys:Ge,getOwnPropertyDescriptor:Ue};function X(e,t,n){if(e[t]===n)return;const i=e[t],l=e.length;n===void 0?delete e[t]:e[t]=n;let s=se(e),r;(r=ee(s,t,i))&&r.$(()=>n),Array.isArray(e)&&e.length!==l&&(r=ee(s,"length",l))&&r.$(e.length),(r=s._)&&r.$()}function Pe(e,t){const n=Object.keys(t);for(let i=0;i<n.length;i+=1){const l=n[i];X(e,l,t[l])}}function He(e,t){if(typeof t=="function"&&(t=t(e)),t=j(t),Array.isArray(t)){if(e===t)return;let n=0,i=t.length;for(;n<i;n++){const l=t[n];e[n]!==l&&X(e,n,l)}X(e,"length",i)}else Pe(e,t)}function T(e,t,n=[]){let i,l=e;if(t.length>1){i=t.shift();const r=typeof i,o=Array.isArray(e);if(Array.isArray(i)){for(let c=0;c<i.length;c++)T(e,[i[c]].concat(t),n);return}else if(o&&r==="function"){for(let c=0;c<e.length;c++)i(e[c],c)&&T(e,[c].concat(t),n);return}else if(o&&r==="object"){const{from:c=0,to:f=e.length-1,by:u=1}=i;for(let d=c;d<=f;d+=u)T(e,[d].concat(t),n);return}else if(t.length>1){T(e[i],t,[i].concat(n));return}l=e[i],n=[i].concat(n)}let s=t[0];typeof s=="function"&&(s=s(l,n),s===l)||i===void 0&&s==null||(s=j(s),i===void 0||H(l)&&H(s)&&!Array.isArray(s)?Pe(l,s):X(e,i,s))}function Xe(...[e,t]){const n=j(e||{}),i=Array.isArray(n),l=Ce(n);function s(...r){he(()=>{i&&r.length===1?He(n,r[0]):T(n,r)})}return[l,s]}const Je=Y('<div class="clicker"><h1></h1><button class="buy" type="button">click button</button></div>'),Qe=e=>(()=>{const t=Je.cloneNode(!0),n=t.firstChild,i=n.nextSibling;return k(n,()=>Intl.NumberFormat().format(e.amount)),i.$$click=()=>e.update(),t})();$e(["click"]);const Ye=Y('<div class="clicker"><div class="info"><h2></h2><p></p></div><button type="button"></button></div>'),Ze=Y('<button class="sell" type="button">-</button>'),ze=e=>_(Be,{get when(){return e.netWorth>=e.cost},fallback:null,get children(){const t=Ye.cloneNode(!0),n=t.firstChild,i=n.firstChild,l=i.nextSibling,s=n.nextSibling;return k(i,()=>`${Intl.NumberFormat().format(e.amount)} \xD7 ${e.id}clicker`),k(l,()=>`this ${e.id}clicker buys and sells for ${Intl.NumberFormat().format(e.cost)}`),s.$$click=()=>e.update(e.id),k(s,()=>`buy ${e.id}clicker`),k(t,(()=>{const r=Fe(()=>e.amount>0,!0);return()=>r()&&(()=>{const o=Ze.cloneNode(!0);return o.$$click=()=>e.update(e.id,!1),o})()})(),null),M(()=>Ke(s,`buy ${e.clicks>=e.cost?void 0:"disabled"}`)),t}});$e(["click"]);const et=Y('<div class="game"><div class="banner">This is an accompanying example to a clicker game tutorial using SolidJS. See<a href="https://github.com/Alaricus/clicker-tutorial-solid">GitHub</a>for more details.</div></div>'),fe={amount:0},tt=[{id:"auto",cost:10,amount:0},{id:"double",cost:20,amount:0},{id:"multi",cost:100,amount:0},{id:"mega",cost:1e3,amount:0},{id:"ultra",cost:1e4,amount:0},{id:"monster",cost:1e5,amount:0}],nt=()=>{const[e,t]=K(fe),[n,i]=K(fe),[l,s]=Xe(tt),r=()=>{t({amount:e().amount+1}),i({amount:n().amount+1})},o=(u,d=!0)=>{const a=d?1:-1,p=l.find(b=>b.id===u);p&&t({amount:e().amount-p.cost*a}),s(b=>b.id===u,"amount",b=>b+1*a)},f=setInterval(()=>{const u=l.reduce((d,a)=>d+a.amount*(a.cost*.1),0);t({amount:u+e().amount}),i({amount:u+n().amount})},1e3);return ge(()=>clearInterval(f)),(()=>{const u=et.cloneNode(!0);return u.firstChild,k(u,_(Qe,re(e,{update:r})),null),k(u,_(Ie,{each:l,children:d=>_(ze,re(d,{update:o,get clicks(){return e().amount},get netWorth(){return n().amount}}))}),null),u})()};Re(()=>_(nt,{}),document.getElementById("root"));