var Ux=Object.defineProperty,kx=Object.defineProperties;var Bx=Object.getOwnPropertyDescriptors;var Zm=Object.getOwnPropertySymbols;var Vx=Object.prototype.hasOwnProperty,Hx=Object.prototype.propertyIsEnumerable;var Km=(n,e,t)=>e in n?Ux(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,sn=(n,e)=>{for(var t in e||={})Vx.call(e,t)&&Km(n,t,e[t]);if(Zm)for(var t of Zm(e))Hx.call(e,t)&&Km(n,t,e[t]);return n},Un=(n,e)=>kx(n,Bx(e));var Cr=(n,e,t)=>new Promise((i,r)=>{var s=c=>{try{a(t.next(c))}catch(l){r(l)}},o=c=>{try{a(t.throw(c))}catch(l){r(l)}},a=c=>c.done?i(c.value):Promise.resolve(c.value).then(s,o);a((t=t.apply(n,e)).next())});function Jm(n,e){return Object.is(n,e)}var Gt=null,oc=!1,ac=1,Ji=Symbol("SIGNAL");function Je(n){let e=Gt;return Gt=n,e}var lc={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function vd(n){if(oc)throw new Error("");if(Gt===null)return;Gt.consumerOnSignalRead(n);let e=Gt.nextProducerIndex++;if(ds(Gt),e<Gt.producerNode.length&&Gt.producerNode[e]!==n&&To(Gt)){let t=Gt.producerNode[e];uc(t,Gt.producerIndexOfThis[e])}Gt.producerNode[e]!==n&&(Gt.producerNode[e]=n,Gt.producerIndexOfThis[e]=To(Gt)?ig(n,Gt,e):0),Gt.producerLastReadVersion[e]=n.version}function zx(){ac++}function Qm(n){if(!(To(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===ac)){if(!n.producerMustRecompute(n)&&!Md(n)){n.dirty=!1,n.lastCleanEpoch=ac;return}n.producerRecomputeValue(n),n.dirty=!1,n.lastCleanEpoch=ac}}function eg(n){if(n.liveConsumerNode===void 0)return;let e=oc;oc=!0;try{for(let t of n.liveConsumerNode)t.dirty||Gx(t)}finally{oc=e}}function tg(){return Gt?.consumerAllowSignalWrites!==!1}function Gx(n){n.dirty=!0,eg(n),n.consumerMarkedDirty?.(n)}function _d(n){return n&&(n.nextProducerIndex=0),Je(n)}function xd(n,e){if(Je(e),!(!n||n.producerNode===void 0||n.producerIndexOfThis===void 0||n.producerLastReadVersion===void 0)){if(To(n))for(let t=n.nextProducerIndex;t<n.producerNode.length;t++)uc(n.producerNode[t],n.producerIndexOfThis[t]);for(;n.producerNode.length>n.nextProducerIndex;)n.producerNode.pop(),n.producerLastReadVersion.pop(),n.producerIndexOfThis.pop()}}function Md(n){ds(n);for(let e=0;e<n.producerNode.length;e++){let t=n.producerNode[e],i=n.producerLastReadVersion[e];if(i!==t.version||(Qm(t),i!==t.version))return!0}return!1}function ng(n){if(ds(n),To(n))for(let e=0;e<n.producerNode.length;e++)uc(n.producerNode[e],n.producerIndexOfThis[e]);n.producerNode.length=n.producerLastReadVersion.length=n.producerIndexOfThis.length=0,n.liveConsumerNode&&(n.liveConsumerNode.length=n.liveConsumerIndexOfThis.length=0)}function ig(n,e,t){if(rg(n),ds(n),n.liveConsumerNode.length===0)for(let i=0;i<n.producerNode.length;i++)n.producerIndexOfThis[i]=ig(n.producerNode[i],n,i);return n.liveConsumerIndexOfThis.push(t),n.liveConsumerNode.push(e)-1}function uc(n,e){if(rg(n),ds(n),n.liveConsumerNode.length===1)for(let i=0;i<n.producerNode.length;i++)uc(n.producerNode[i],n.producerIndexOfThis[i]);let t=n.liveConsumerNode.length-1;if(n.liveConsumerNode[e]=n.liveConsumerNode[t],n.liveConsumerIndexOfThis[e]=n.liveConsumerIndexOfThis[t],n.liveConsumerNode.length--,n.liveConsumerIndexOfThis.length--,e<n.liveConsumerNode.length){let i=n.liveConsumerIndexOfThis[e],r=n.liveConsumerNode[e];ds(r),r.producerIndexOfThis[i]=e}}function To(n){return n.consumerIsAlwaysLive||(n?.liveConsumerNode?.length??0)>0}function ds(n){n.producerNode??=[],n.producerIndexOfThis??=[],n.producerLastReadVersion??=[]}function rg(n){n.liveConsumerNode??=[],n.liveConsumerIndexOfThis??=[]}function sg(n){let e=Object.create(Wx);e.computation=n;let t=()=>{if(Qm(e),vd(e),e.value===cc)throw e.error;return e.value};return t[Ji]=e,t}var gd=Symbol("UNSET"),yd=Symbol("COMPUTING"),cc=Symbol("ERRORED"),Wx=Un(sn({},lc),{value:gd,dirty:!0,error:null,equal:Jm,producerMustRecompute(n){return n.value===gd||n.value===yd},producerRecomputeValue(n){if(n.value===yd)throw new Error("Detected cycle in computations.");let e=n.value;n.value=yd;let t=_d(n),i;try{i=n.computation()}catch(r){i=cc,n.error=r}finally{xd(n,t)}if(e!==gd&&e!==cc&&i!==cc&&n.equal(e,i)){n.value=e;return}n.value=i,n.version++}});function jx(){throw new Error}var og=jx;function ag(){og()}function cg(n){og=n}var $x=null;function lg(n){let e=Object.create(dg);e.value=n;let t=()=>(vd(e),e.value);return t[Ji]=e,t}function Sd(n,e){tg()||ag(),n.equal(n.value,e)||(n.value=e,qx(n))}function ug(n,e){tg()||ag(),Sd(n,e(n.value))}var dg=Un(sn({},lc),{equal:Jm,value:void 0});function qx(n){n.version++,zx(),eg(n),$x?.()}function dn(n){return typeof n=="function"}function dc(n){let t=n(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var fc=dc(n=>function(t){n(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function Co(n,e){if(n){let t=n.indexOf(e);0<=t&&n.splice(t,1)}}var fn=class n{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let s of t)s.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(dn(i))try{i()}catch(s){e=s instanceof fc?s.errors:[s]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let s of r)try{fg(s)}catch(o){e=e??[],o instanceof fc?e=[...e,...o.errors]:e.push(o)}}if(e)throw new fc(e)}}add(e){var t;if(e&&e!==this)if(this.closed)fg(e);else{if(e instanceof n){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&Co(t,e)}remove(e){let{_finalizers:t}=this;t&&Co(t,e),e instanceof n&&e._removeParent(this)}};fn.EMPTY=(()=>{let n=new fn;return n.closed=!0,n})();var bd=fn.EMPTY;function hc(n){return n instanceof fn||n&&"closed"in n&&dn(n.remove)&&dn(n.add)&&dn(n.unsubscribe)}function fg(n){dn(n)?n():n.unsubscribe()}var kn={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var fs={setTimeout(n,e,...t){let{delegate:i}=fs;return i?.setTimeout?i.setTimeout(n,e,...t):setTimeout(n,e,...t)},clearTimeout(n){let{delegate:e}=fs;return(e?.clearTimeout||clearTimeout)(n)},delegate:void 0};function hg(n){fs.setTimeout(()=>{let{onUnhandledError:e}=kn;if(e)e(n);else throw n})}function Ed(){}var pg=wd("C",void 0,void 0);function mg(n){return wd("E",void 0,n)}function gg(n){return wd("N",n,void 0)}function wd(n,e,t){return{kind:n,value:e,error:t}}var Ar=null;function hs(n){if(kn.useDeprecatedSynchronousErrorHandling){let e=!Ar;if(e&&(Ar={errorThrown:!1,error:null}),n(),e){let{errorThrown:t,error:i}=Ar;if(Ar=null,t)throw i}}else n()}function yg(n){kn.useDeprecatedSynchronousErrorHandling&&Ar&&(Ar.errorThrown=!0,Ar.error=n)}var Dr=class extends fn{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,hc(e)&&e.add(this)):this.destination=Zx}static create(e,t,i){return new ps(e,t,i)}next(e){this.isStopped?Cd(gg(e),this):this._next(e)}error(e){this.isStopped?Cd(mg(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?Cd(pg,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},Xx=Function.prototype.bind;function Td(n,e){return Xx.call(n,e)}var Ad=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(i){pc(i)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(i){pc(i)}else pc(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){pc(t)}}},ps=class extends Dr{constructor(e,t,i){super();let r;if(dn(e)||!e)r={next:e??void 0,error:t??void 0,complete:i??void 0};else{let s;this&&kn.useDeprecatedNextContext?(s=Object.create(e),s.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&Td(e.next,s),error:e.error&&Td(e.error,s),complete:e.complete&&Td(e.complete,s)}):r=e}this.destination=new Ad(r)}};function pc(n){kn.useDeprecatedSynchronousErrorHandling?yg(n):hg(n)}function Yx(n){throw n}function Cd(n,e){let{onStoppedNotification:t}=kn;t&&fs.setTimeout(()=>t(n,e))}var Zx={closed:!0,next:Ed,error:Yx,complete:Ed};var vg=typeof Symbol=="function"&&Symbol.observable||"@@observable";function _g(n){return n}function xg(n){return n.length===0?_g:n.length===1?n[0]:function(t){return n.reduce((i,r)=>r(i),t)}}var Dd=(()=>{class n{constructor(t){t&&(this._subscribe=t)}lift(t){let i=new n;return i.source=this,i.operator=t,i}subscribe(t,i,r){let s=Jx(t)?t:new ps(t,i,r);return hs(()=>{let{operator:o,source:a}=this;s.add(o?o.call(s,a):a?this._subscribe(s):this._trySubscribe(s))}),s}_trySubscribe(t){try{return this._subscribe(t)}catch(i){t.error(i)}}forEach(t,i){return i=Mg(i),new i((r,s)=>{let o=new ps({next:a=>{try{t(a)}catch(c){s(c),o.unsubscribe()}},error:s,complete:r});this.subscribe(o)})}_subscribe(t){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(t)}[vg](){return this}pipe(...t){return xg(t)(this)}toPromise(t){return t=Mg(t),new t((i,r)=>{let s;this.subscribe(o=>s=o,o=>r(o),()=>i(s))})}}return n.create=e=>new n(e),n})();function Mg(n){var e;return(e=n??kn.Promise)!==null&&e!==void 0?e:Promise}function Kx(n){return n&&dn(n.next)&&dn(n.error)&&dn(n.complete)}function Jx(n){return n&&n instanceof Dr||Kx(n)&&hc(n)}function Qx(n){return dn(n?.lift)}function Sg(n){return e=>{if(Qx(e))return e.lift(function(t){try{return n(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function bg(n,e,t,i,r){return new Id(n,e,t,i,r)}var Id=class extends Dr{constructor(e,t,i,r,s,o){super(e),this.onFinalize=s,this.shouldUnsubscribe=o,this._next=t?function(a){try{t(a)}catch(c){e.error(c)}}:super._next,this._error=r?function(a){try{r(a)}catch(c){e.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};var Eg=dc(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var Qi=(()=>{class n extends Dd{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let i=new mc(this,this);return i.operator=t,i}_throwIfClosed(){if(this.closed)throw new Eg}next(t){hs(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(t)}})}error(t){hs(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:i}=this;for(;i.length;)i.shift().error(t)}})}complete(){hs(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:i,isStopped:r,observers:s}=this;return i||r?bd:(this.currentObservers=null,s.push(t),new fn(()=>{this.currentObservers=null,Co(s,t)}))}_checkFinalizedStatuses(t){let{hasError:i,thrownError:r,isStopped:s}=this;i?t.error(r):s&&t.complete()}asObservable(){let t=new Dd;return t.source=this,t}}return n.create=(e,t)=>new mc(e,t),n})(),mc=class extends Qi{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,e)}error(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&i!==void 0?i:bd}};var Ao=class extends Qi{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:i}=this;if(e)throw t;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};function Rd(n,e){return Sg((t,i)=>{let r=0;t.subscribe(bg(i,s=>{i.next(n.call(e,s,r++))}))})}var eM="https://g.co/ng/security#xss",at=class extends Error{constructor(e,t){super(Uf(e,t)),this.code=e}};function Uf(n,e){return`${`NG0${Math.abs(n)}`}${e?": "+e:""}`}function tM(n){return{toString:n}.toString()}var Do=globalThis;function Mt(n){for(let e in n)if(n[e]===Mt)return e;throw Error("Could not find renamed property on target object.")}function Nn(n){if(typeof n=="string")return n;if(Array.isArray(n))return"["+n.map(Nn).join(", ")+"]";if(n==null)return""+n;if(n.overriddenName)return`${n.overriddenName}`;if(n.name)return`${n.name}`;let e=n.toString();if(e==null)return""+e;let t=e.indexOf(`
`);return t===-1?e:e.substring(0,t)}function wg(n,e){return n==null||n===""?e===null?"":e:e==null||e===""?n:n+" "+e}var nM=Mt({__forward_ref__:Mt});function a0(n){return n.__forward_ref__=a0,n.toString=function(){return Nn(this())},n}function Vn(n){return iM(n)?n():n}function iM(n){return typeof n=="function"&&n.hasOwnProperty(nM)&&n.__forward_ref__===a0}function Ct(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function kf(n){return Tg(n,c0)||Tg(n,l0)}function Tg(n,e){return n.hasOwnProperty(e)?n[e]:null}function rM(n){let e=n&&(n[c0]||n[l0]);return e||null}function Cg(n){return n&&(n.hasOwnProperty(Ag)||n.hasOwnProperty(sM))?n[Ag]:null}var c0=Mt({\u0275prov:Mt}),Ag=Mt({\u0275inj:Mt}),l0=Mt({ngInjectableDef:Mt}),sM=Mt({ngInjectorDef:Mt}),bt=class{constructor(e,t){this._desc=e,this.ngMetadataName="InjectionToken",this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=Ct({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function u0(n){return n&&!!n.\u0275providers}var oM=Mt({\u0275cmp:Mt}),aM=Mt({\u0275dir:Mt}),cM=Mt({\u0275pipe:Mt});var Dg=Mt({\u0275fac:Mt}),Io=Mt({__NG_ELEMENT_ID__:Mt}),Ig=Mt({__NG_ENV_ID__:Mt});function bc(n){return typeof n=="string"?n:n==null?"":String(n)}function lM(n){return typeof n=="function"?n.name||n.toString():typeof n=="object"&&n!=null&&typeof n.type=="function"?n.type.name||n.type.toString():bc(n)}function uM(n,e){let t=e?`. Dependency path: ${e.join(" > ")} > ${n}`:"";throw new at(-200,n)}function Bf(n,e){throw new at(-201,!1)}var Qe=function(n){return n[n.Default=0]="Default",n[n.Host=1]="Host",n[n.Self=2]="Self",n[n.SkipSelf=4]="SkipSelf",n[n.Optional=8]="Optional",n}(Qe||{}),$d;function d0(){return $d}function ii(n){let e=$d;return $d=n,e}function f0(n,e,t){let i=kf(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&Qe.Optional)return null;if(e!==void 0)return e;Bf(n,"Injector")}var dM={},Ro=dM,fM="__NG_DI_FLAG__",Ec="ngTempTokenPath",hM="ngTokenPath",pM=/\n/gm,mM="\u0275",Rg="__source",xs;function gM(){return xs}function ms(n){let e=xs;return xs=n,e}function yM(n,e=Qe.Default){if(xs===void 0)throw new at(-203,!1);return xs===null?f0(n,void 0,e):xs.get(n,e&Qe.Optional?null:void 0,e)}function ft(n,e=Qe.Default){return(d0()||yM)(Vn(n),e)}function Wt(n,e=Qe.Default){return ft(n,Hc(e))}function Hc(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function qd(n){let e=[];for(let t=0;t<n.length;t++){let i=Vn(n[t]);if(Array.isArray(i)){if(i.length===0)throw new at(900,!1);let r,s=Qe.Default;for(let o=0;o<i.length;o++){let a=i[o],c=vM(a);typeof c=="number"?c===-1?r=a.token:s|=c:r=a}e.push(ft(r,s))}else e.push(ft(i))}return e}function vM(n){return n[fM]}function _M(n,e,t,i){let r=n[Ec];throw e[Rg]&&r.unshift(e[Rg]),n.message=xM(`
`+n.message,r,t,i),n[hM]=r,n[Ec]=null,n}function xM(n,e,t,i=null){n=n&&n.charAt(0)===`
`&&n.charAt(1)==mM?n.slice(2):n;let r=Nn(e);if(Array.isArray(e))r=e.map(Nn).join(" -> ");else if(typeof e=="object"){let s=[];for(let o in e)if(e.hasOwnProperty(o)){let a=e[o];s.push(o+":"+(typeof a=="string"?JSON.stringify(a):Nn(a)))}r=`{${s.join(", ")}}`}return`${t}${i?"("+i+")":""}[${r}]: ${n.replace(pM,`
  `)}`}function No(n,e){let t=n.hasOwnProperty(Dg);return t?n[Dg]:null}function MM(n,e,t){if(n.length!==e.length)return!1;for(let i=0;i<n.length;i++){let r=n[i],s=e[i];if(t&&(r=t(r),s=t(s)),s!==r)return!1}return!0}function SM(n){return n.flat(Number.POSITIVE_INFINITY)}function Vf(n,e){n.forEach(t=>Array.isArray(t)?Vf(t,e):e(t))}function h0(n,e,t){e>=n.length?n.push(t):n.splice(e,0,t)}function wc(n,e){return e>=n.length-1?n.pop():n.splice(e,1)[0]}function bM(n,e,t,i){let r=n.length;if(r==e)n.push(t,i);else if(r===1)n.push(i,n[0]),n[0]=t;else{for(r--,n.push(n[r-1],n[r]);r>e;){let s=r-2;n[r]=n[s],r--}n[e]=t,n[e+1]=i}}function EM(n,e,t){let i=qo(n,e);return i>=0?n[i|1]=t:(i=~i,bM(n,i,e,t)),i}function Nd(n,e){let t=qo(n,e);if(t>=0)return n[t|1]}function qo(n,e){return wM(n,e,1)}function wM(n,e,t){let i=0,r=n.length>>t;for(;r!==i;){let s=i+(r-i>>1),o=n[s<<t];if(e===o)return s<<t;o>e?r=s:i=s+1}return~(r<<t)}var Po={},Rr=[],Lo=new bt(""),p0=new bt("",-1),m0=new bt(""),Tc=class{get(e,t=Ro){if(t===Ro){let i=new Error(`NullInjectorError: No provider for ${Nn(e)}!`);throw i.name="NullInjectorError",i}return t}},g0=function(n){return n[n.OnPush=0]="OnPush",n[n.Default=1]="Default",n}(g0||{}),oi=function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n}(oi||{}),bs=function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n}(bs||{});function TM(n,e,t){let i=n.length;for(;;){let r=n.indexOf(e,t);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let s=e.length;if(r+s===i||n.charCodeAt(r+s)<=32)return r}t=r+1}}function Xd(n,e,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let s=t[i++],o=t[i++],a=t[i++];n.setAttribute(e,o,a,s)}else{let s=r,o=t[++i];AM(s)?n.setProperty(e,s,o):n.setAttribute(e,s,o),i++}}return i}function CM(n){return n===3||n===4||n===6}function AM(n){return n.charCodeAt(0)===64}function Hf(n,e){if(!(e===null||e.length===0))if(n===null||n.length===0)n=e.slice();else{let t=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?Ng(n,t,r,null,e[++i]):Ng(n,t,r,null,null))}}return n}function Ng(n,e,t,i,r){let s=0,o=n.length;if(e===-1)o=-1;else for(;s<n.length;){let a=n[s++];if(typeof a=="number"){if(a===e){o=-1;break}else if(a>e){o=s-1;break}}}for(;s<n.length;){let a=n[s];if(typeof a=="number")break;if(a===t){if(i===null){r!==null&&(n[s+1]=r);return}else if(i===n[s+1]){n[s+2]=r;return}}s++,i!==null&&s++,r!==null&&s++}o!==-1&&(n.splice(o,0,e),s=o+1),n.splice(s++,0,t),i!==null&&n.splice(s++,0,i),r!==null&&n.splice(s++,0,r)}var y0="ng-template";function DM(n,e,t,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&TM(e[r+1].toLowerCase(),t,0)!==-1)return!0}else if(zf(n))return!1;if(r=e.indexOf(1,r),r>-1){let s;for(;++r<e.length&&typeof(s=e[r])=="string";)if(s.toLowerCase()===t)return!0}return!1}function zf(n){return n.type===4&&n.value!==y0}function IM(n,e,t){let i=n.type===4&&!t?y0:n.value;return e===i}function RM(n,e,t){let i=4,r=n.attrs,s=r!==null?LM(r):0,o=!1;for(let a=0;a<e.length;a++){let c=e[a];if(typeof c=="number"){if(!o&&!Bn(i)&&!Bn(c))return!1;if(o&&Bn(c))continue;o=!1,i=c|i&1;continue}if(!o)if(i&4){if(i=2|i&1,c!==""&&!IM(n,c,t)||c===""&&e.length===1){if(Bn(i))return!1;o=!0}}else if(i&8){if(r===null||!DM(n,r,c,t)){if(Bn(i))return!1;o=!0}}else{let l=e[++a],u=NM(c,r,zf(n),t);if(u===-1){if(Bn(i))return!1;o=!0;continue}if(l!==""){let d;if(u>s?d="":d=r[u+1].toLowerCase(),i&2&&l!==d){if(Bn(i))return!1;o=!0}}}}return Bn(i)||o}function Bn(n){return(n&1)===0}function NM(n,e,t,i){if(e===null)return-1;let r=0;if(i||!t){let s=!1;for(;r<e.length;){let o=e[r];if(o===n)return r;if(o===3||o===6)s=!0;else if(o===1||o===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(o===4)break;if(o===0){r+=4;continue}}r+=s?1:2}return-1}else return FM(e,n)}function PM(n,e,t=!1){for(let i=0;i<e.length;i++)if(RM(n,e[i],t))return!0;return!1}function LM(n){for(let e=0;e<n.length;e++){let t=n[e];if(CM(t))return e}return n.length}function FM(n,e){let t=n.indexOf(4);if(t>-1)for(t++;t<n.length;){let i=n[t];if(typeof i=="number")return-1;if(i===e)return t;t++}return-1}function Pg(n,e){return n?":not("+e.trim()+")":e}function OM(n){let e=n[0],t=1,i=2,r="",s=!1;for(;t<n.length;){let o=n[t];if(typeof o=="string")if(i&2){let a=n[++t];r+="["+o+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+o:i&4&&(r+=" "+o);else r!==""&&!Bn(o)&&(e+=Pg(s,r),r=""),i=o,s=s||!Bn(i);t++}return r!==""&&(e+=Pg(s,r)),e}function UM(n){return n.map(OM).join(",")}function kM(n){let e=[],t=[],i=1,r=2;for(;i<n.length;){let s=n[i];if(typeof s=="string")r===2?s!==""&&e.push(s,n[++i]):r===8&&t.push(s);else{if(!Bn(r))break;r=s}i++}return{attrs:e,classes:t}}function v0(n){return tM(()=>{let e=zM(n),t=Un(sn({},e),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===g0.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&n.dependencies||null,getStandaloneInjector:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||oi.Emulated,styles:n.styles||Rr,_:null,schemas:n.schemas||null,tView:null,id:""});GM(t);let i=n.dependencies;return t.directiveDefs=Fg(i,!1),t.pipeDefs=Fg(i,!0),t.id=WM(t),t})}function BM(n){return Es(n)||_0(n)}function VM(n){return n!==null}function Lg(n,e){if(n==null)return Po;let t={};for(let i in n)if(n.hasOwnProperty(i)){let r=n[i],s,o,a=bs.None;Array.isArray(r)?(a=r[0],s=r[1],o=r[2]??s):(s=r,o=r),e?(t[s]=a!==bs.None?[i,a]:i,e[s]=o):t[s]=i}return t}function Es(n){return n[oM]||null}function _0(n){return n[aM]||null}function x0(n){return n[cM]||null}function HM(n){let e=Es(n)||_0(n)||x0(n);return e!==null?e.standalone:!1}function zM(n){let e={};return{type:n.type,providersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:e,inputTransforms:null,inputConfig:n.inputs||Po,exportAs:n.exportAs||null,standalone:n.standalone===!0,signals:n.signals===!0,selectors:n.selectors||Rr,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,findHostDirectiveDefs:null,hostDirectives:null,inputs:Lg(n.inputs,e),outputs:Lg(n.outputs),debugInfo:null}}function GM(n){n.features?.forEach(e=>e(n))}function Fg(n,e){if(!n)return null;let t=e?x0:BM;return()=>(typeof n=="function"?n():n).map(i=>t(i)).filter(VM)}function WM(n){let e=0,t=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,n.consts,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery].join("|");for(let r of t)e=Math.imul(31,e)+r.charCodeAt(0)<<0;return e+=2147483648,"c"+e}function M0(n){return{\u0275providers:n}}function jM(...n){return{\u0275providers:S0(!0,n),\u0275fromNgModule:!0}}function S0(n,...e){let t=[],i=new Set,r,s=o=>{t.push(o)};return Vf(e,o=>{let a=o;Yd(a,s,[],i)&&(r||=[],r.push(a))}),r!==void 0&&b0(r,s),t}function b0(n,e){for(let t=0;t<n.length;t++){let{ngModule:i,providers:r}=n[t];Gf(r,s=>{e(s,i)})}}function Yd(n,e,t,i){if(n=Vn(n),!n)return!1;let r=null,s=Cg(n),o=!s&&Es(n);if(!s&&!o){let c=n.ngModule;if(s=Cg(c),s)r=c;else return!1}else{if(o&&!o.standalone)return!1;r=n}let a=i.has(r);if(o){if(a)return!1;if(i.add(r),o.dependencies){let c=typeof o.dependencies=="function"?o.dependencies():o.dependencies;for(let l of c)Yd(l,e,t,i)}}else if(s){if(s.imports!=null&&!a){i.add(r);let l;try{Vf(s.imports,u=>{Yd(u,e,t,i)&&(l||=[],l.push(u))})}finally{}l!==void 0&&b0(l,e)}if(!a){let l=No(r)||(()=>new r);e({provide:r,useFactory:l,deps:Rr},r),e({provide:m0,useValue:r,multi:!0},r),e({provide:Lo,useValue:()=>ft(r),multi:!0},r)}let c=s.providers;if(c!=null&&!a){let l=n;Gf(c,u=>{e(u,l)})}}else return!1;return r!==n&&n.providers!==void 0}function Gf(n,e){for(let t of n)u0(t)&&(t=t.\u0275providers),Array.isArray(t)?Gf(t,e):e(t)}var $M=Mt({provide:String,useValue:Mt});function E0(n){return n!==null&&typeof n=="object"&&$M in n}function qM(n){return!!(n&&n.useExisting)}function XM(n){return!!(n&&n.useFactory)}function Zd(n){return typeof n=="function"}var zc=new bt(""),yc={},YM={},Pd;function Wf(){return Pd===void 0&&(Pd=new Tc),Pd}var tr=class{},Cc=class extends tr{get destroyed(){return this._destroyed}constructor(e,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,this.records=new Map,this._ngOnDestroyHooks=new Set,this._onDestroyHooks=[],this._destroyed=!1,Jd(e,o=>this.processProvider(o)),this.records.set(p0,gs(void 0,this)),r.has("environment")&&this.records.set(tr,gs(void 0,this));let s=this.records.get(zc);s!=null&&typeof s.value=="string"&&this.scopes.add(s.value),this.injectorDefTypes=new Set(this.get(m0,Rr,Qe.Self))}destroy(){this.assertNotDestroyed(),this._destroyed=!0;let e=Je(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),Je(e)}}onDestroy(e){return this.assertNotDestroyed(),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){this.assertNotDestroyed();let t=ms(this),i=ii(void 0),r;try{return e()}finally{ms(t),ii(i)}}get(e,t=Ro,i=Qe.Default){if(this.assertNotDestroyed(),e.hasOwnProperty(Ig))return e[Ig](this);i=Hc(i);let r,s=ms(this),o=ii(void 0);try{if(!(i&Qe.SkipSelf)){let c=this.records.get(e);if(c===void 0){let l=tS(e)&&kf(e);l&&this.injectableDefInScope(l)?c=gs(Kd(e),yc):c=null,this.records.set(e,c)}if(c!=null)return this.hydrate(e,c)}let a=i&Qe.Self?Wf():this.parent;return t=i&Qe.Optional&&t===Ro?null:t,a.get(e,t)}catch(a){if(a.name==="NullInjectorError"){if((a[Ec]=a[Ec]||[]).unshift(Nn(e)),s)throw a;return _M(a,e,"R3InjectorError",this.source)}else throw a}finally{ii(o),ms(s)}}resolveInjectorInitializers(){let e=Je(null),t=ms(this),i=ii(void 0),r;try{let s=this.get(Lo,Rr,Qe.Self);for(let o of s)o()}finally{ms(t),ii(i),Je(e)}}toString(){let e=[],t=this.records;for(let i of t.keys())e.push(Nn(i));return`R3Injector[${e.join(", ")}]`}assertNotDestroyed(){if(this._destroyed)throw new at(205,!1)}processProvider(e){e=Vn(e);let t=Zd(e)?e:Vn(e&&e.provide),i=KM(e);if(!Zd(e)&&e.multi===!0){let r=this.records.get(t);r||(r=gs(void 0,yc,!0),r.factory=()=>qd(r.multi),this.records.set(t,r)),t=e,r.multi.push(e)}this.records.set(t,i)}hydrate(e,t){let i=Je(null);try{return t.value===yc&&(t.value=YM,t.value=t.factory()),typeof t.value=="object"&&t.value&&eS(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{Je(i)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=Vn(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function Kd(n){let e=kf(n),t=e!==null?e.factory:No(n);if(t!==null)return t;if(n instanceof bt)throw new at(204,!1);if(n instanceof Function)return ZM(n);throw new at(204,!1)}function ZM(n){if(n.length>0)throw new at(204,!1);let t=rM(n);return t!==null?()=>t.factory(n):()=>new n}function KM(n){if(E0(n))return gs(void 0,n.useValue);{let e=JM(n);return gs(e,yc)}}function JM(n,e,t){let i;if(Zd(n)){let r=Vn(n);return No(r)||Kd(r)}else if(E0(n))i=()=>Vn(n.useValue);else if(XM(n))i=()=>n.useFactory(...qd(n.deps||[]));else if(qM(n))i=()=>ft(Vn(n.useExisting));else{let r=Vn(n&&(n.useClass||n.provide));if(QM(n))i=()=>new r(...qd(n.deps));else return No(r)||Kd(r)}return i}function gs(n,e,t=!1){return{factory:n,value:e,multi:t?[]:void 0}}function QM(n){return!!n.deps}function eS(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function tS(n){return typeof n=="function"||typeof n=="object"&&n instanceof bt}function Jd(n,e){for(let t of n)Array.isArray(t)?Jd(t,e):t&&u0(t)?Jd(t.\u0275providers,e):e(t)}function nS(){return d0()!==void 0||gM()!=null}function iS(n){return typeof n=="function"}var Ii=0,ke=1,Ie=2,Yt=3,Hn=4,Gn=5,Fo=6,Oo=7,Jt=8,ws=9,ai=10,on=11,Uo=12,Og=13,Rs=14,ci=15,Xo=16,ys=17,Ci=18,Gc=19,w0=20,er=21,Ld=22,Nr=23,zn=25,T0=1;var Pr=7,Ac=8,Ts=9,Qt=10,jf=function(n){return n[n.None=0]="None",n[n.HasTransplantedViews=2]="HasTransplantedViews",n}(jf||{});function Ms(n){return Array.isArray(n)&&typeof n[T0]=="object"}function Ri(n){return Array.isArray(n)&&n[T0]===!0}function C0(n){return(n.flags&4)!==0}function $f(n){return n.componentOffset>-1}function qf(n){return(n.flags&1)===1}function Yo(n){return!!n.template}function rS(n){return(n[Ie]&512)!==0}var Qd=class{constructor(e,t,i){this.previousValue=e,this.currentValue=t,this.firstChange=i}isFirstChange(){return this.firstChange}};function A0(n,e,t,i){e!==null?e.applyValueToInputSignal(e,i):n[t]=i}function sS(){return D0}function D0(n){return n.type.prototype.ngOnChanges&&(n.setInput=aS),oS}sS.ngInherit=!0;function oS(){let n=R0(this),e=n?.current;if(e){let t=n.previous;if(t===Po)n.previous=e;else for(let i in e)t[i]=e[i];n.current=null,this.ngOnChanges(e)}}function aS(n,e,t,i,r){let s=this.declaredInputs[i],o=R0(n)||cS(n,{previous:Po,current:null}),a=o.current||(o.current={}),c=o.previous,l=c[s];a[s]=new Qd(l&&l.currentValue,t,c===Po),A0(n,e,r,t)}var I0="__ngSimpleChanges__";function R0(n){return n[I0]||null}function cS(n,e){return n[I0]=e}var Ug=null;var ri=function(n,e,t){Ug?.(n,e,t)},lS="svg",uS="math",dS=!1;function fS(){return dS}function li(n){for(;Array.isArray(n);)n=n[Ii];return n}function N0(n,e){return li(e[n])}function Wn(n,e){return li(e[n.index])}function Xf(n,e){return n.data[e]}function Ns(n,e){let t=e[n];return Ms(t)?t:t[Ii]}function hS(n){return(n[Ie]&4)===4}function Yf(n){return(n[Ie]&128)===128}function pS(n){return Ri(n[Yt])}function Dc(n,e){return e==null?null:n[e]}function P0(n){n[ys]=0}function mS(n){n[Ie]&1024||(n[Ie]|=1024,Yf(n)&&ko(n))}function gS(n,e){for(;n>0;)e=e[Rs],n--;return e}function Zf(n){return!!(n[Ie]&9216||n[Nr]?.dirty)}function ef(n){n[ai].changeDetectionScheduler?.notify(1),Zf(n)?ko(n):n[Ie]&64&&(fS()?(n[Ie]|=1024,ko(n)):n[ai].changeDetectionScheduler?.notify())}function ko(n){n[ai].changeDetectionScheduler?.notify();let e=Bo(n);for(;e!==null&&!(e[Ie]&8192||(e[Ie]|=8192,!Yf(e)));)e=Bo(e)}function L0(n,e){if((n[Ie]&256)===256)throw new at(911,!1);n[er]===null&&(n[er]=[]),n[er].push(e)}function yS(n,e){if(n[er]===null)return;let t=n[er].indexOf(e);t!==-1&&n[er].splice(t,1)}function Bo(n){let e=n[Yt];return Ri(e)?e[Yt]:e}var $e={lFrame:z0(null),bindingsEnabled:!0,skipHydrationRootTNode:null};function vS(){return $e.lFrame.elementDepthCount}function _S(){$e.lFrame.elementDepthCount++}function xS(){$e.lFrame.elementDepthCount--}function F0(){return $e.bindingsEnabled}function MS(){return $e.skipHydrationRootTNode!==null}function SS(n){return $e.skipHydrationRootTNode===n}function bS(){$e.skipHydrationRootTNode=null}function vt(){return $e.lFrame.lView}function ui(){return $e.lFrame.tView}function nr(n){return $e.lFrame.contextLView=n,n[Jt]}function ir(n){return $e.lFrame.contextLView=null,n}function Ni(){let n=O0();for(;n!==null&&n.type===64;)n=n.parent;return n}function O0(){return $e.lFrame.currentTNode}function ES(){let n=$e.lFrame,e=n.currentTNode;return n.isParent?e:e.parent}function Zo(n,e){let t=$e.lFrame;t.currentTNode=n,t.isParent=e}function U0(){return $e.lFrame.isParent}function wS(){$e.lFrame.isParent=!1}function TS(){let n=$e.lFrame,e=n.bindingRootIndex;return e===-1&&(e=n.bindingRootIndex=n.tView.bindingStartIndex),e}function CS(){return $e.lFrame.bindingIndex}function AS(n){return $e.lFrame.bindingIndex=n}function Wc(){return $e.lFrame.bindingIndex++}function k0(n){let e=$e.lFrame,t=e.bindingIndex;return e.bindingIndex=e.bindingIndex+n,t}function DS(){return $e.lFrame.inI18n}function IS(n,e){let t=$e.lFrame;t.bindingIndex=t.bindingRootIndex=n,tf(e)}function RS(){return $e.lFrame.currentDirectiveIndex}function tf(n){$e.lFrame.currentDirectiveIndex=n}function NS(n){let e=$e.lFrame.currentDirectiveIndex;return e===-1?null:n[e]}function B0(){return $e.lFrame.currentQueryIndex}function Kf(n){$e.lFrame.currentQueryIndex=n}function PS(n){let e=n[ke];return e.type===2?e.declTNode:e.type===1?n[Gn]:null}function V0(n,e,t){if(t&Qe.SkipSelf){let r=e,s=n;for(;r=r.parent,r===null&&!(t&Qe.Host);)if(r=PS(s),r===null||(s=s[Rs],r.type&10))break;if(r===null)return!1;e=r,n=s}let i=$e.lFrame=H0();return i.currentTNode=e,i.lView=n,!0}function Jf(n){let e=H0(),t=n[ke];$e.lFrame=e,e.currentTNode=t.firstChild,e.lView=n,e.tView=t,e.contextLView=n,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function H0(){let n=$e.lFrame,e=n===null?null:n.child;return e===null?z0(n):e}function z0(n){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=e),e}function G0(){let n=$e.lFrame;return $e.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var W0=G0;function Qf(){let n=G0();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function LS(n){return($e.lFrame.contextLView=gS(n,$e.lFrame.contextLView))[Jt]}function rr(){return $e.lFrame.selectedIndex}function Lr(n){$e.lFrame.selectedIndex=n}function FS(){let n=$e.lFrame;return Xf(n.tView,n.selectedIndex)}function OS(){return $e.lFrame.currentNamespace}var j0=!0;function eh(){return j0}function th(n){j0=n}function US(n,e,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:s}=e.type.prototype;if(i){let o=D0(e);(t.preOrderHooks??=[]).push(n,o),(t.preOrderCheckHooks??=[]).push(n,o)}r&&(t.preOrderHooks??=[]).push(0-n,r),s&&((t.preOrderHooks??=[]).push(n,s),(t.preOrderCheckHooks??=[]).push(n,s))}function nh(n,e){for(let t=e.directiveStart,i=e.directiveEnd;t<i;t++){let s=n.data[t].type.prototype,{ngAfterContentInit:o,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=s;o&&(n.contentHooks??=[]).push(-t,o),a&&((n.contentHooks??=[]).push(t,a),(n.contentCheckHooks??=[]).push(t,a)),c&&(n.viewHooks??=[]).push(-t,c),l&&((n.viewHooks??=[]).push(t,l),(n.viewCheckHooks??=[]).push(t,l)),u!=null&&(n.destroyHooks??=[]).push(t,u)}}function vc(n,e,t){$0(n,e,3,t)}function _c(n,e,t,i){(n[Ie]&3)===t&&$0(n,e,t,i)}function Fd(n,e){let t=n[Ie];(t&3)===e&&(t&=16383,t+=1,n[Ie]=t)}function $0(n,e,t,i){let r=i!==void 0?n[ys]&65535:0,s=i??-1,o=e.length-1,a=0;for(let c=r;c<o;c++)if(typeof e[c+1]=="number"){if(a=e[c],i!=null&&a>=i)break}else e[c]<0&&(n[ys]+=65536),(a<s||s==-1)&&(kS(n,t,e,c),n[ys]=(n[ys]&4294901760)+c+2),c++}function kg(n,e){ri(4,n,e);let t=Je(null);try{e.call(n)}finally{Je(t),ri(5,n,e)}}function kS(n,e,t,i){let r=t[i]<0,s=t[i+1],o=r?-t[i]:t[i],a=n[o];r?n[Ie]>>14<n[ys]>>16&&(n[Ie]&3)===e&&(n[Ie]+=16384,kg(a,s)):kg(a,s)}var Ss=-1,Vo=class{constructor(e,t,i){this.factory=e,this.resolving=!1,this.canSeeViewProviders=t,this.injectImpl=i}};function BS(n){return n instanceof Vo}function VS(n){return(n.flags&8)!==0}function HS(n){return(n.flags&16)!==0}function q0(n){return n!==Ss}function Ic(n){return n&32767}function zS(n){return n>>16}function Rc(n,e){let t=zS(n),i=e;for(;t>0;)i=i[Rs],t--;return i}var nf=!0;function Bg(n){let e=nf;return nf=n,e}var GS=256,X0=GS-1,Y0=5,WS=0,si={};function jS(n,e,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:t.hasOwnProperty(Io)&&(i=t[Io]),i==null&&(i=t[Io]=WS++);let r=i&X0,s=1<<r;e.data[n+(r>>Y0)]|=s}function Z0(n,e){let t=K0(n,e);if(t!==-1)return t;let i=e[ke];i.firstCreatePass&&(n.injectorIndex=e.length,Od(i.data,n),Od(e,null),Od(i.blueprint,null));let r=ih(n,e),s=n.injectorIndex;if(q0(r)){let o=Ic(r),a=Rc(r,e),c=a[ke].data;for(let l=0;l<8;l++)e[s+l]=a[o+l]|c[o+l]}return e[s+8]=r,s}function Od(n,e){n.push(0,0,0,0,0,0,0,0,e)}function K0(n,e){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||e[n.injectorIndex+8]===null?-1:n.injectorIndex}function ih(n,e){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let t=0,i=null,r=e;for(;r!==null;){if(i=ny(r),i===null)return Ss;if(t++,r=r[Rs],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return Ss}function $S(n,e,t){jS(n,e,t)}function J0(n,e,t){if(t&Qe.Optional||n!==void 0)return n;Bf(e,"NodeInjector")}function Q0(n,e,t,i){if(t&Qe.Optional&&i===void 0&&(i=null),!(t&(Qe.Self|Qe.Host))){let r=n[ws],s=ii(void 0);try{return r?r.get(e,i,t&Qe.Optional):f0(e,i,t&Qe.Optional)}finally{ii(s)}}return J0(i,e,t)}function ey(n,e,t,i=Qe.Default,r){if(n!==null){if(e[Ie]&2048&&!(i&Qe.Self)){let o=ZS(n,e,t,i,si);if(o!==si)return o}let s=ty(n,e,t,i,si);if(s!==si)return s}return Q0(e,t,i,r)}function ty(n,e,t,i,r){let s=XS(t);if(typeof s=="function"){if(!V0(e,n,i))return i&Qe.Host?J0(r,t,i):Q0(e,t,i,r);try{let o;if(o=s(i),o==null&&!(i&Qe.Optional))Bf(t);else return o}finally{W0()}}else if(typeof s=="number"){let o=null,a=K0(n,e),c=Ss,l=i&Qe.Host?e[ci][Gn]:null;for((a===-1||i&Qe.SkipSelf)&&(c=a===-1?ih(n,e):e[a+8],c===Ss||!Hg(i,!1)?a=-1:(o=e[ke],a=Ic(c),e=Rc(c,e)));a!==-1;){let u=e[ke];if(Vg(s,a,u.data)){let d=qS(a,e,t,o,i,l);if(d!==si)return d}c=e[a+8],c!==Ss&&Hg(i,e[ke].data[a+8]===l)&&Vg(s,a,e)?(o=u,a=Ic(c),e=Rc(c,e)):a=-1}}return r}function qS(n,e,t,i,r,s){let o=e[ke],a=o.data[n+8],c=i==null?$f(a)&&nf:i!=o&&(a.type&3)!==0,l=r&Qe.Host&&s===a,u=xc(a,o,t,c,l);return u!==null?Cs(e,o,u,a):si}function xc(n,e,t,i,r){let s=n.providerIndexes,o=e.data,a=s&1048575,c=n.directiveStart,l=n.directiveEnd,u=s>>20,d=i?a:a+u,f=r?a+u:l;for(let h=d;h<f;h++){let g=o[h];if(h<c&&t===g||h>=c&&g.type===t)return h}if(r){let h=o[c];if(h&&Yo(h)&&h.type===t)return c}return null}function Cs(n,e,t,i){let r=n[t],s=e.data;if(BS(r)){let o=r;o.resolving&&uM(lM(s[t]));let a=Bg(o.canSeeViewProviders);o.resolving=!0;let c,l=o.injectImpl?ii(o.injectImpl):null,u=V0(n,i,Qe.Default);try{r=n[t]=o.factory(void 0,s,n,i),e.firstCreatePass&&t>=i.directiveStart&&US(t,s[t],e)}finally{l!==null&&ii(l),Bg(a),o.resolving=!1,W0()}}return r}function XS(n){if(typeof n=="string")return n.charCodeAt(0)||0;let e=n.hasOwnProperty(Io)?n[Io]:void 0;return typeof e=="number"?e>=0?e&X0:YS:e}function Vg(n,e,t){let i=1<<n;return!!(t[e+(n>>Y0)]&i)}function Hg(n,e){return!(n&Qe.Self)&&!(n&Qe.Host&&e)}var Ir=class{constructor(e,t){this._tNode=e,this._lView=t}get(e,t,i){return ey(this._tNode,this._lView,e,Hc(i),t)}};function YS(){return new Ir(Ni(),vt())}function ZS(n,e,t,i,r){let s=n,o=e;for(;s!==null&&o!==null&&o[Ie]&2048&&!(o[Ie]&512);){let a=ty(s,o,t,i|Qe.Self,si);if(a!==si)return a;let c=s.parent;if(!c){let l=o[w0];if(l){let u=l.get(t,si,i);if(u!==si)return u}c=ny(o),o=o[Rs]}s=c}return r}function ny(n){let e=n[ke],t=e.type;return t===2?e.declTNode:t===1?n[Gn]:null}function zg(n,e=null,t=null,i){let r=KS(n,e,t,i);return r.resolveInjectorInitializers(),r}function KS(n,e=null,t=null,i,r=new Set){let s=[t||Rr,jM(n)];return i=i||(typeof n=="object"?void 0:Nn(n)),new Cc(s,e||Wf(),i||null,r)}var rh=(()=>{class n{static{this.THROW_IF_NOT_FOUND=Ro}static{this.NULL=new Tc}static create(t,i){if(Array.isArray(t))return zg({name:""},i,t,"");{let r=t.name??"";return zg({name:r},t.parent,t.providers,r)}}static{this.\u0275prov=Ct({token:n,providedIn:"any",factory:()=>ft(p0)})}static{this.__NG_ELEMENT_ID__=-1}}return n})();var JS="ngOriginalError";function Ud(n){return n[JS]}var Ai=class{constructor(){this._console=console}handleError(e){let t=this._findOriginalError(e);this._console.error("ERROR",e),t&&this._console.error("ORIGINAL ERROR",t)}_findOriginalError(e){let t=e&&Ud(e);for(;t&&Ud(t);)t=Ud(t);return t||null}},iy=new bt("",{providedIn:"root",factory:()=>Wt(Ai).handleError.bind(void 0)}),ry=(()=>{class n{static{this.__NG_ELEMENT_ID__=QS}static{this.__NG_ENV_ID__=t=>t}}return n})(),rf=class extends ry{constructor(e){super(),this._lView=e}onDestroy(e){return L0(this._lView,e),()=>yS(this._lView,e)}};function QS(){return new rf(vt())}function eb(){return Ps(Ni(),vt())}function Ps(n,e){return new Ko(Wn(n,e))}var Ko=(()=>{class n{constructor(t){this.nativeElement=t}static{this.__NG_ELEMENT_ID__=eb}}return n})();function tb(n){return n instanceof Ko?n.nativeElement:n}var sf=class extends Qi{constructor(e=!1){super(),this.destroyRef=void 0,this.__isAsync=e,nS()&&(this.destroyRef=Wt(ry,{optional:!0})??void 0)}emit(e){let t=Je(null);try{super.next(e)}finally{Je(t)}}subscribe(e,t,i){let r=e,s=t||(()=>null),o=i;if(e&&typeof e=="object"){let c=e;r=c.next?.bind(c),s=c.error?.bind(c),o=c.complete?.bind(c)}this.__isAsync&&(s=kd(s),r&&(r=kd(r)),o&&(o=kd(o)));let a=super.subscribe({next:r,error:s,complete:o});return e instanceof fn&&e.add(a),a}};function kd(n){return e=>{setTimeout(n,void 0,e)}}var vs=sf;function nb(){return this._results[Symbol.iterator]()}var of=class n{get changes(){return this._changes??=new vs}constructor(e=!1){this._emitDistinctChangesOnly=e,this.dirty=!0,this._onDirty=void 0,this._results=[],this._changesDetected=!1,this._changes=void 0,this.length=0,this.first=void 0,this.last=void 0;let t=n.prototype;t[Symbol.iterator]||(t[Symbol.iterator]=nb)}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let i=SM(e);(this._changesDetected=!MM(this._results,i,t))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.emit(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}};function sy(n){return(n.flags&128)===128}var oy=new Map,ib=0;function rb(){return ib++}function sb(n){oy.set(n[Gc],n)}function ob(n){oy.delete(n[Gc])}var Gg="__ngContext__";function Fr(n,e){Ms(e)?(n[Gg]=e[Gc],sb(e)):n[Gg]=e}function ay(n){return ly(n[Uo])}function cy(n){return ly(n[Hn])}function ly(n){for(;n!==null&&!Ri(n);)n=n[Hn];return n}var af;function uy(n){af=n}function ab(){if(af!==void 0)return af;if(typeof document<"u")return document;throw new at(210,!1)}var sh=new bt("",{providedIn:"root",factory:()=>cb}),cb="ng",oh=new bt(""),Ls=new bt("",{providedIn:"platform",factory:()=>"unknown"});var ah=new bt("",{providedIn:"root",factory:()=>ab().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var lb="h",ub="b";var db=()=>null;function ch(n,e,t=!1){return db(n,e,t)}var dy=!1,fb=new bt("",{providedIn:"root",factory:()=>dy});var cf=class{constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${eM})`}};function lh(n){return n instanceof cf?n.changingThisBreaksApplicationSecurity:n}var Di=function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n}(Di||{}),hb;function uh(n,e){return hb(n,e)}function _s(n,e,t,i,r){if(i!=null){let s,o=!1;Ri(i)?s=i:Ms(i)&&(o=!0,i=i[Ii]);let a=li(i);n===0&&t!==null?r==null?my(e,t,a):Nc(e,t,a,r||null,!0):n===1&&t!==null?Nc(e,t,a,r||null,!0):n===2?Ib(e,a,o):n===3&&e.destroyNode(a),s!=null&&Nb(e,n,s,t,r)}}function pb(n,e){return n.createText(e)}function mb(n,e,t){n.setValue(e,t)}function fy(n,e,t){return n.createElement(e,t)}function gb(n,e){hy(n,e),e[Ii]=null,e[Gn]=null}function yb(n,e,t,i,r,s){i[Ii]=r,i[Gn]=e,$c(n,i,t,1,r,s)}function hy(n,e){e[ai].changeDetectionScheduler?.notify(1),$c(n,e,e[on],2,null,null)}function vb(n){let e=n[Uo];if(!e)return Bd(n[ke],n);for(;e;){let t=null;if(Ms(e))t=e[Uo];else{let i=e[Qt];i&&(t=i)}if(!t){for(;e&&!e[Hn]&&e!==n;)Ms(e)&&Bd(e[ke],e),e=e[Yt];e===null&&(e=n),Ms(e)&&Bd(e[ke],e),t=e&&e[Hn]}e=t}}function _b(n,e,t,i){let r=Qt+i,s=t.length;i>0&&(t[r-1][Hn]=e),i<s-Qt?(e[Hn]=t[r],h0(t,Qt+i,e)):(t.push(e),e[Hn]=null),e[Yt]=t;let o=e[Xo];o!==null&&t!==o&&xb(o,e);let a=e[Ci];a!==null&&a.insertView(n),ef(e),e[Ie]|=128}function xb(n,e){let t=n[Ts],r=e[Yt][Yt][ci];e[ci]!==r&&(n[Ie]|=jf.HasTransplantedViews),t===null?n[Ts]=[e]:t.push(e)}function py(n,e){let t=n[Ts],i=t.indexOf(e);t.splice(i,1)}function Ho(n,e){if(n.length<=Qt)return;let t=Qt+e,i=n[t];if(i){let r=i[Xo];r!==null&&r!==n&&py(r,i),e>0&&(n[t-1][Hn]=i[Hn]);let s=wc(n,Qt+e);gb(i[ke],i);let o=s[Ci];o!==null&&o.detachView(s[ke]),i[Yt]=null,i[Hn]=null,i[Ie]&=-129}return i}function jc(n,e){if(!(e[Ie]&256)){let t=e[on];t.destroyNode&&$c(n,e,t,3,null,null),vb(e)}}function Bd(n,e){if(e[Ie]&256)return;let t=Je(null);try{e[Ie]&=-129,e[Ie]|=256,e[Nr]&&ng(e[Nr]),Sb(n,e),Mb(n,e),e[ke].type===1&&e[on].destroy();let i=e[Xo];if(i!==null&&Ri(e[Yt])){i!==e[Yt]&&py(i,e);let r=e[Ci];r!==null&&r.detachView(n)}ob(e)}finally{Je(t)}}function Mb(n,e){let t=n.cleanup,i=e[Oo];if(t!==null)for(let s=0;s<t.length-1;s+=2)if(typeof t[s]=="string"){let o=t[s+3];o>=0?i[o]():i[-o].unsubscribe(),s+=2}else{let o=i[t[s+1]];t[s].call(o)}i!==null&&(e[Oo]=null);let r=e[er];if(r!==null){e[er]=null;for(let s=0;s<r.length;s++){let o=r[s];o()}}}function Sb(n,e){let t;if(n!=null&&(t=n.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=e[t[i]];if(!(r instanceof Vo)){let s=t[i+1];if(Array.isArray(s))for(let o=0;o<s.length;o+=2){let a=r[s[o]],c=s[o+1];ri(4,a,c);try{c.call(a)}finally{ri(5,a,c)}}else{ri(4,r,s);try{s.call(r)}finally{ri(5,r,s)}}}}}function bb(n,e,t){return Eb(n,e.parent,t)}function Eb(n,e,t){let i=e;for(;i!==null&&i.type&40;)e=i,i=e.parent;if(i===null)return t[Ii];{let{componentOffset:r}=i;if(r>-1){let{encapsulation:s}=n.data[i.directiveStart+r];if(s===oi.None||s===oi.Emulated)return null}return Wn(i,t)}}function Nc(n,e,t,i,r){n.insertBefore(e,t,i,r)}function my(n,e,t){n.appendChild(e,t)}function Wg(n,e,t,i,r){i!==null?Nc(n,e,t,i,r):my(n,e,t)}function wb(n,e,t,i){n.removeChild(e,t,i)}function dh(n,e){return n.parentNode(e)}function Tb(n,e){return n.nextSibling(e)}function Cb(n,e,t){return Db(n,e,t)}function Ab(n,e,t){return n.type&40?Wn(n,t):null}var Db=Ab,jg;function fh(n,e,t,i){let r=bb(n,i,e),s=e[on],o=i.parent||e[Gn],a=Cb(o,i,e);if(r!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)Wg(s,r,t[c],a,!1);else Wg(s,r,t,a,!1);jg!==void 0&&jg(s,i,e,t,r)}function Mc(n,e){if(e!==null){let t=e.type;if(t&3)return Wn(e,n);if(t&4)return lf(-1,n[e.index]);if(t&8){let i=e.child;if(i!==null)return Mc(n,i);{let r=n[e.index];return Ri(r)?lf(-1,r):li(r)}}else{if(t&32)return uh(e,n)()||li(n[e.index]);{let i=gy(n,e);if(i!==null){if(Array.isArray(i))return i[0];let r=Bo(n[ci]);return Mc(r,i)}else return Mc(n,e.next)}}}return null}function gy(n,e){if(e!==null){let i=n[ci][Gn],r=e.projection;return i.projection[r]}return null}function lf(n,e){let t=Qt+n+1;if(t<e.length){let i=e[t],r=i[ke].firstChild;if(r!==null)return Mc(i,r)}return e[Pr]}function Ib(n,e,t){let i=dh(n,e);i&&wb(n,i,e,t)}function hh(n,e,t,i,r,s,o){for(;t!=null;){let a=i[t.index],c=t.type;if(o&&e===0&&(a&&Fr(li(a),i),t.flags|=2),(t.flags&32)!==32)if(c&8)hh(n,e,t.child,i,r,s,!1),_s(e,n,r,a,s);else if(c&32){let l=uh(t,i),u;for(;u=l();)_s(e,n,r,u,s);_s(e,n,r,a,s)}else c&16?Rb(n,e,i,t,r,s):_s(e,n,r,a,s);t=o?t.projectionNext:t.next}}function $c(n,e,t,i,r,s){hh(t,i,n.firstChild,e,r,s,!1)}function Rb(n,e,t,i,r,s){let o=t[ci],c=o[Gn].projection[i.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];_s(e,n,r,u,s)}else{let l=c,u=o[Yt];sy(i)&&(l.flags|=128),hh(n,e,l,u,r,s,!0)}}function Nb(n,e,t,i,r){let s=t[Pr],o=li(t);s!==o&&_s(e,n,i,s,r);for(let a=Qt;a<t.length;a++){let c=t[a];$c(c[ke],c,n,e,i,s)}}function Pb(n,e,t,i,r){if(e)r?n.addClass(t,i):n.removeClass(t,i);else{let s=i.indexOf("-")===-1?void 0:Di.DashCase;r==null?n.removeStyle(t,i,s):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),s|=Di.Important),n.setStyle(t,i,r,s))}}function Lb(n,e,t){n.setAttribute(e,"style",t)}function yy(n,e,t){t===""?n.removeAttribute(e,"class"):n.setAttribute(e,"class",t)}function vy(n,e,t){let{mergedAttrs:i,classes:r,styles:s}=t;i!==null&&Xd(n,e,i),r!==null&&yy(n,e,r),s!==null&&Lb(n,e,s)}var Pi={};function ct(n=1){_y(ui(),vt(),rr()+n,!1)}function _y(n,e,t,i){if(!i)if((e[Ie]&3)===3){let s=n.preOrderCheckHooks;s!==null&&vc(e,s,t)}else{let s=n.preOrderHooks;s!==null&&_c(e,s,0,t)}Lr(t)}function qc(n,e=Qe.Default){let t=vt();if(t===null)return ft(n,e);let i=Ni();return ey(i,t,Vn(n),e)}function xy(n,e,t,i,r,s){let o=Je(null);try{let a=null;r&bs.SignalBased&&(a=e[i][Ji]),a!==null&&a.transformFn!==void 0&&(s=a.transformFn(s)),r&bs.HasDecoratorInputTransform&&(s=n.inputTransforms[i].call(e,s)),n.setInput!==null?n.setInput(e,a,s,t,i):A0(e,a,i,s)}finally{Je(o)}}function Fb(n,e){let t=n.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)Lr(~r);else{let s=r,o=t[++i],a=t[++i];IS(o,s);let c=e[s];a(2,c)}}}finally{Lr(-1)}}function Xc(n,e,t,i,r,s,o,a,c,l,u){let d=e.blueprint.slice();return d[Ii]=r,d[Ie]=i|4|128|8|64,(l!==null||n&&n[Ie]&2048)&&(d[Ie]|=2048),P0(d),d[Yt]=d[Rs]=n,d[Jt]=t,d[ai]=o||n&&n[ai],d[on]=a||n&&n[on],d[ws]=c||n&&n[ws]||null,d[Gn]=s,d[Gc]=rb(),d[Fo]=u,d[w0]=l,d[ci]=e.type==2?n[ci]:d,d}function Yc(n,e,t,i,r){let s=n.data[e];if(s===null)s=Ob(n,e,t,i,r),DS()&&(s.flags|=32);else if(s.type&64){s.type=t,s.value=i,s.attrs=r;let o=ES();s.injectorIndex=o===null?-1:o.injectorIndex}return Zo(s,!0),s}function Ob(n,e,t,i,r){let s=O0(),o=U0(),a=o?s:s&&s.parent,c=n.data[e]=zb(n,a,t,e,i,r);return n.firstChild===null&&(n.firstChild=c),s!==null&&(o?s.child==null&&c.parent!==null&&(s.child=c):s.next===null&&(s.next=c,c.prev=s)),c}function My(n,e,t,i){if(t===0)return-1;let r=e.length;for(let s=0;s<t;s++)e.push(i),n.blueprint.push(i),n.data.push(null);return r}function Sy(n,e,t,i,r){let s=rr(),o=i&2;try{Lr(-1),o&&e.length>zn&&_y(n,e,zn,!1),ri(o?2:0,r),t(i,r)}finally{Lr(s),ri(o?3:1,r)}}function by(n,e,t){if(C0(e)){let i=Je(null);try{let r=e.directiveStart,s=e.directiveEnd;for(let o=r;o<s;o++){let a=n.data[o];if(a.contentQueries){let c=t[o];a.contentQueries(1,c,o)}}}finally{Je(i)}}}function Ey(n,e,t){F0()&&(Yb(n,e,t,Wn(t,e)),(t.flags&64)===64&&Dy(n,e,t))}function wy(n,e,t=Wn){let i=e.localNames;if(i!==null){let r=e.index+1;for(let s=0;s<i.length;s+=2){let o=i[s+1],a=o===-1?t(e,n):n[o];n[r++]=a}}}function Ty(n){let e=n.tView;return e===null||e.incompleteFirstPass?n.tView=ph(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):e}function ph(n,e,t,i,r,s,o,a,c,l,u){let d=zn+i,f=d+r,h=Ub(d,f),g=typeof l=="function"?l():l;return h[ke]={type:n,blueprint:h,template:t,queries:null,viewQuery:a,declTNode:e,data:h.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof s=="function"?s():s,pipeRegistry:typeof o=="function"?o():o,firstChild:null,schemas:c,consts:g,incompleteFirstPass:!1,ssrId:u}}function Ub(n,e){let t=[];for(let i=0;i<e;i++)t.push(i<n?null:Pi);return t}function kb(n,e,t,i){let s=i.get(fb,dy)||t===oi.ShadowDom,o=n.selectRootElement(e,s);return Bb(o),o}function Bb(n){Vb(n)}var Vb=()=>null;function Hb(n,e,t,i){let r=Ny(e);r.push(t),n.firstCreatePass&&Py(n).push(i,r.length-1)}function zb(n,e,t,i,r,s){let o=e?e.injectorIndex:-1,a=0;return MS()&&(a|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:o,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:s,mergedAttrs:null,localNames:null,initialInputs:void 0,inputs:null,outputs:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function $g(n,e,t,i,r){for(let s in e){if(!e.hasOwnProperty(s))continue;let o=e[s];if(o===void 0)continue;i??={};let a,c=bs.None;Array.isArray(o)?(a=o[0],c=o[1]):a=o;let l=s;if(r!==null){if(!r.hasOwnProperty(s))continue;l=r[s]}n===0?qg(i,t,l,a,c):qg(i,t,l,a)}return i}function qg(n,e,t,i,r){let s;n.hasOwnProperty(t)?(s=n[t]).push(e,i):s=n[t]=[e,i],r!==void 0&&s.push(r)}function Gb(n,e,t){let i=e.directiveStart,r=e.directiveEnd,s=n.data,o=e.attrs,a=[],c=null,l=null;for(let u=i;u<r;u++){let d=s[u],f=t?t.get(d):null,h=f?f.inputs:null,g=f?f.outputs:null;c=$g(0,d.inputs,u,c,h),l=$g(1,d.outputs,u,l,g);let y=c!==null&&o!==null&&!zf(e)?rE(c,u,o):null;a.push(y)}c!==null&&(c.hasOwnProperty("class")&&(e.flags|=8),c.hasOwnProperty("style")&&(e.flags|=16)),e.initialInputs=a,e.inputs=c,e.outputs=l}function Wb(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function jb(n,e,t,i,r,s,o,a){let c=Wn(e,t),l=e.inputs,u;!a&&l!=null&&(u=l[i])?(mh(n,t,u,i,r),$f(e)&&$b(t,e.index)):e.type&3?(i=Wb(i),r=o!=null?o(r,e.value||"",i):r,s.setProperty(c,i,r)):e.type&12}function $b(n,e){let t=Ns(e,n);t[Ie]&16||(t[Ie]|=64)}function Cy(n,e,t,i){if(F0()){let r=i===null?null:{"":-1},s=Kb(n,t),o,a;s===null?o=a=null:[o,a]=s,o!==null&&Ay(n,e,t,o,r,a),r&&Jb(t,i,r)}t.mergedAttrs=Hf(t.mergedAttrs,t.attrs)}function Ay(n,e,t,i,r,s){for(let l=0;l<i.length;l++)$S(Z0(t,e),n,i[l].type);eE(t,n.data.length,i.length);for(let l=0;l<i.length;l++){let u=i[l];u.providersResolver&&u.providersResolver(u)}let o=!1,a=!1,c=My(n,e,i.length,null);for(let l=0;l<i.length;l++){let u=i[l];t.mergedAttrs=Hf(t.mergedAttrs,u.hostAttrs),tE(n,t,e,c,u),Qb(c,u,r),u.contentQueries!==null&&(t.flags|=4),(u.hostBindings!==null||u.hostAttrs!==null||u.hostVars!==0)&&(t.flags|=64);let d=u.type.prototype;!o&&(d.ngOnChanges||d.ngOnInit||d.ngDoCheck)&&((n.preOrderHooks??=[]).push(t.index),o=!0),!a&&(d.ngOnChanges||d.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(t.index),a=!0),c++}Gb(n,t,s)}function qb(n,e,t,i,r){let s=r.hostBindings;if(s){let o=n.hostBindingOpCodes;o===null&&(o=n.hostBindingOpCodes=[]);let a=~e.index;Xb(o)!=a&&o.push(a),o.push(t,i,s)}}function Xb(n){let e=n.length;for(;e>0;){let t=n[--e];if(typeof t=="number"&&t<0)return t}return 0}function Yb(n,e,t,i){let r=t.directiveStart,s=t.directiveEnd;$f(t)&&nE(e,t,n.data[r+t.componentOffset]),n.firstCreatePass||Z0(t,e),Fr(i,e);let o=t.initialInputs;for(let a=r;a<s;a++){let c=n.data[a],l=Cs(e,n,a,t);if(Fr(l,e),o!==null&&iE(e,a-r,l,c,t,o),Yo(c)){let u=Ns(t.index,e);u[Jt]=Cs(e,n,a,t)}}}function Dy(n,e,t){let i=t.directiveStart,r=t.directiveEnd,s=t.index,o=RS();try{Lr(s);for(let a=i;a<r;a++){let c=n.data[a],l=e[a];tf(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&Zb(c,l)}}finally{Lr(-1),tf(o)}}function Zb(n,e){n.hostBindings!==null&&n.hostBindings(1,e)}function Kb(n,e){let t=n.directiveRegistry,i=null,r=null;if(t)for(let s=0;s<t.length;s++){let o=t[s];if(PM(e,o.selectors,!1))if(i||(i=[]),Yo(o))if(o.findHostDirectiveDefs!==null){let a=[];r=r||new Map,o.findHostDirectiveDefs(o,a,r),i.unshift(...a,o);let c=a.length;uf(n,e,c)}else i.unshift(o),uf(n,e,0);else r=r||new Map,o.findHostDirectiveDefs?.(o,i,r),i.push(o)}return i===null?null:[i,r]}function uf(n,e,t){e.componentOffset=t,(n.components??=[]).push(e.index)}function Jb(n,e,t){if(e){let i=n.localNames=[];for(let r=0;r<e.length;r+=2){let s=t[e[r+1]];if(s==null)throw new at(-301,!1);i.push(e[r],s)}}}function Qb(n,e,t){if(t){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)t[e.exportAs[i]]=n;Yo(e)&&(t[""]=n)}}function eE(n,e,t){n.flags|=1,n.directiveStart=e,n.directiveEnd=e+t,n.providerIndexes=e}function tE(n,e,t,i,r){n.data[i]=r;let s=r.factory||(r.factory=No(r.type,!0)),o=new Vo(s,Yo(r),qc);n.blueprint[i]=o,t[i]=o,qb(n,e,i,My(n,t,r.hostVars,Pi),r)}function nE(n,e,t){let i=Wn(e,n),r=Ty(t),s=n[ai].rendererFactory,o=16;t.signals?o=4096:t.onPush&&(o=64);let a=Zc(n,Xc(n,r,null,o,i,e,null,s.createRenderer(i,t),null,null,null));n[e.index]=a}function iE(n,e,t,i,r,s){let o=s[e];if(o!==null)for(let a=0;a<o.length;){let c=o[a++],l=o[a++],u=o[a++],d=o[a++];xy(i,t,c,l,u,d)}}function rE(n,e,t){let i=null,r=0;for(;r<t.length;){let s=t[r];if(s===0){r+=4;continue}else if(s===5){r+=2;continue}if(typeof s=="number")break;if(n.hasOwnProperty(s)){i===null&&(i=[]);let o=n[s];for(let a=0;a<o.length;a+=3)if(o[a]===e){i.push(s,o[a+1],o[a+2],t[r+1]);break}}r+=2}return i}function Iy(n,e,t,i){return[n,!0,0,e,null,i,null,t,null,null]}function Ry(n,e){let t=n.contentQueries;if(t!==null){let i=Je(null);try{for(let r=0;r<t.length;r+=2){let s=t[r],o=t[r+1];if(o!==-1){let a=n.data[o];Kf(s),a.contentQueries(2,e[o],o)}}}finally{Je(i)}}}function Zc(n,e){return n[Uo]?n[Og][Hn]=e:n[Uo]=e,n[Og]=e,e}function df(n,e,t){Kf(0);let i=Je(null);try{e(n,t)}finally{Je(i)}}function Ny(n){return n[Oo]||(n[Oo]=[])}function Py(n){return n.cleanup||(n.cleanup=[])}function Ly(n,e){let t=n[ws],i=t?t.get(Ai,null):null;i&&i.handleError(e)}function mh(n,e,t,i,r){for(let s=0;s<t.length;){let o=t[s++],a=t[s++],c=t[s++],l=e[o],u=n.data[o];xy(u,l,i,a,c,r)}}function Fy(n,e,t){let i=N0(e,n);mb(n[on],i,t)}function sE(n,e){let t=Ns(e,n),i=t[ke];oE(i,t);let r=t[Ii];r!==null&&t[Fo]===null&&(t[Fo]=ch(r,t[ws])),gh(i,t,t[Jt])}function oE(n,e){for(let t=e.length;t<n.blueprint.length;t++)e.push(n.blueprint[t])}function gh(n,e,t){Jf(e);try{let i=n.viewQuery;i!==null&&df(1,i,t);let r=n.template;r!==null&&Sy(n,e,r,1,t),n.firstCreatePass&&(n.firstCreatePass=!1),e[Ci]?.finishViewCreation(n),n.staticContentQueries&&Ry(n,e),n.staticViewQueries&&df(2,n.viewQuery,t);let s=n.components;s!==null&&aE(e,s)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{e[Ie]&=-5,Qf()}}function aE(n,e){for(let t=0;t<e.length;t++)sE(n,e[t])}function Kc(n,e,t,i){let r=Je(null);try{let s=e.tView,a=n[Ie]&4096?4096:16,c=Xc(n,s,t,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),l=n[e.index];c[Xo]=l;let u=n[Ci];return u!==null&&(c[Ci]=u.createEmbeddedView(s)),gh(s,c,t),c}finally{Je(r)}}function Oy(n,e){let t=Qt+e;if(t<n.length)return n[t]}function zo(n,e){return!e||e.firstChild===null||sy(n)}function Jc(n,e,t,i=!0){let r=e[ke];if(_b(r,e,n,t),i){let o=lf(t,n),a=e[on],c=dh(a,n[Pr]);c!==null&&yb(r,n[Gn],a,e,c,o)}let s=e[Fo];s!==null&&s.firstChild!==null&&(s.firstChild=null)}function Uy(n,e){let t=Ho(n,e);return t!==void 0&&jc(t[ke],t),t}function Pc(n,e,t,i,r=!1){for(;t!==null;){let s=e[t.index];s!==null&&i.push(li(s)),Ri(s)&&cE(s,i);let o=t.type;if(o&8)Pc(n,e,t.child,i);else if(o&32){let a=uh(t,e),c;for(;c=a();)i.push(c)}else if(o&16){let a=gy(e,t);if(Array.isArray(a))i.push(...a);else{let c=Bo(e[ci]);Pc(c[ke],c,a,i,!0)}}t=r?t.projectionNext:t.next}return i}function cE(n,e){for(let t=Qt;t<n.length;t++){let i=n[t],r=i[ke].firstChild;r!==null&&Pc(i[ke],i,r,e)}n[Pr]!==n[Ii]&&e.push(n[Pr])}var ky=[];function lE(n){return n[Nr]??uE(n)}function uE(n){let e=ky.pop()??Object.create(fE);return e.lView=n,e}function dE(n){n.lView[Nr]!==n&&(n.lView=null,ky.push(n))}var fE=Un(sn({},lc),{consumerIsAlwaysLive:!0,consumerMarkedDirty:n=>{ko(n.lView)},consumerOnSignalRead(){this.lView[Nr]=this}}),By=100;function Vy(n,e=!0,t=0){let i=n[ai],r=i.rendererFactory,s=!1;s||r.begin?.();try{hE(n,t)}catch(o){throw e&&Ly(n,o),o}finally{s||(r.end?.(),i.inlineEffectRunner?.flush())}}function hE(n,e){ff(n,e);let t=0;for(;Zf(n);){if(t===By)throw new at(103,!1);t++,ff(n,1)}}function pE(n,e,t,i){let r=e[Ie];if((r&256)===256)return;let s=!1;!s&&e[ai].inlineEffectRunner?.flush(),Jf(e);let o=null,a=null;!s&&mE(n)&&(a=lE(e),o=_d(a));try{P0(e),AS(n.bindingStartIndex),t!==null&&Sy(n,e,t,2,i);let c=(r&3)===3;if(!s)if(c){let d=n.preOrderCheckHooks;d!==null&&vc(e,d,null)}else{let d=n.preOrderHooks;d!==null&&_c(e,d,0,null),Fd(e,0)}if(gE(e),Hy(e,0),n.contentQueries!==null&&Ry(n,e),!s)if(c){let d=n.contentCheckHooks;d!==null&&vc(e,d)}else{let d=n.contentHooks;d!==null&&_c(e,d,1),Fd(e,1)}Fb(n,e);let l=n.components;l!==null&&Gy(e,l,0);let u=n.viewQuery;if(u!==null&&df(2,u,i),!s)if(c){let d=n.viewCheckHooks;d!==null&&vc(e,d)}else{let d=n.viewHooks;d!==null&&_c(e,d,2),Fd(e,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),e[Ld]){for(let d of e[Ld])d();e[Ld]=null}s||(e[Ie]&=-73)}catch(c){throw ko(e),c}finally{a!==null&&(xd(a,o),dE(a)),Qf()}}function mE(n){return n.type!==2}function Hy(n,e){for(let t=ay(n);t!==null;t=cy(t))for(let i=Qt;i<t.length;i++){let r=t[i];zy(r,e)}}function gE(n){for(let e=ay(n);e!==null;e=cy(e)){if(!(e[Ie]&jf.HasTransplantedViews))continue;let t=e[Ts];for(let i=0;i<t.length;i++){let r=t[i],s=r[Yt];mS(r)}}}function yE(n,e,t){let i=Ns(e,n);zy(i,t)}function zy(n,e){Yf(n)&&ff(n,e)}function ff(n,e){let i=n[ke],r=n[Ie],s=n[Nr],o=!!(e===0&&r&16);if(o||=!!(r&64&&e===0),o||=!!(r&1024),o||=!!(s?.dirty&&Md(s)),s&&(s.dirty=!1),n[Ie]&=-9217,o)pE(i,n,i.template,n[Jt]);else if(r&8192){Hy(n,1);let a=i.components;a!==null&&Gy(n,a,1)}}function Gy(n,e,t){for(let i=0;i<e.length;i++)yE(n,e[i],t)}function yh(n){for(n[ai].changeDetectionScheduler?.notify();n;){n[Ie]|=64;let e=Bo(n);if(rS(n)&&!e)return n;n=e}return null}var Go=class{get rootNodes(){let e=this._lView,t=e[ke];return Pc(t,e,t.firstChild,[])}constructor(e,t,i=!0){this._lView=e,this._cdRefInjectingView=t,this.notifyErrorHandler=i,this._appRef=null,this._attachedToViewContainer=!1}get context(){return this._lView[Jt]}set context(e){this._lView[Jt]=e}get destroyed(){return(this._lView[Ie]&256)===256}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[Yt];if(Ri(e)){let t=e[Ac],i=t?t.indexOf(this):-1;i>-1&&(Ho(e,i),wc(t,i))}this._attachedToViewContainer=!1}jc(this._lView[ke],this._lView)}onDestroy(e){L0(this._lView,e)}markForCheck(){yh(this._cdRefInjectingView||this._lView)}detach(){this._lView[Ie]&=-129}reattach(){ef(this._lView),this._lView[Ie]|=128}detectChanges(){this._lView[Ie]|=1024,Vy(this._lView,this.notifyErrorHandler)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new at(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null,hy(this._lView[ke],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new at(902,!1);this._appRef=e,ef(this._lView)}},Lc=(()=>{class n{static{this.__NG_ELEMENT_ID__=xE}}return n})(),vE=Lc,_E=class extends vE{constructor(e,t,i){super(),this._declarationLView=e,this._declarationTContainer=t,this.elementRef=i}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,t){return this.createEmbeddedViewImpl(e,t)}createEmbeddedViewImpl(e,t,i){let r=Kc(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:t,dehydratedView:i});return new Go(r)}};function xE(){return vh(Ni(),vt())}function vh(n,e){return n.type&4?new _E(e,n,Ps(n,e)):null}var JN=new RegExp(`^(\\d+)*(${ub}|${lb})*(.*)`);var ME=()=>null;function Wo(n,e){return ME(n,e)}var hf=class{},pf=class{},Fc=class{};function SE(n){let e=Error(`No component factory found for ${Nn(n)}.`);return e[bE]=n,e}var bE="ngComponent";var mf=class{resolveComponentFactory(e){throw SE(e)}},_h=(()=>{class n{static{this.NULL=new mf}}return n})(),jo=class{};var EE=(()=>{class n{static{this.\u0275prov=Ct({token:n,providedIn:"root",factory:()=>null})}}return n})(),Vd={};var Xg=new Set;function Fs(n){Xg.has(n)||(Xg.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}function Yg(...n){}function wE(){let n=typeof Do.requestAnimationFrame=="function",e=Do[n?"requestAnimationFrame":"setTimeout"],t=Do[n?"cancelAnimationFrame":"clearTimeout"];if(typeof Zone<"u"&&e&&t){let i=e[Zone.__symbol__("OriginalDelegate")];i&&(e=i);let r=t[Zone.__symbol__("OriginalDelegate")];r&&(t=r)}return{nativeRequestAnimationFrame:e,nativeCancelAnimationFrame:t}}var en=class n{constructor({enableLongStackTrace:e=!1,shouldCoalesceEventChangeDetection:t=!1,shouldCoalesceRunChangeDetection:i=!1}){if(this.hasPendingMacrotasks=!1,this.hasPendingMicrotasks=!1,this.isStable=!0,this.onUnstable=new vs(!1),this.onMicrotaskEmpty=new vs(!1),this.onStable=new vs(!1),this.onError=new vs(!1),typeof Zone>"u")throw new at(908,!1);Zone.assertZonePatched();let r=this;r._nesting=0,r._outer=r._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(r._inner=r._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(r._inner=r._inner.fork(Zone.longStackTraceZoneSpec)),r.shouldCoalesceEventChangeDetection=!i&&t,r.shouldCoalesceRunChangeDetection=i,r.lastRequestAnimationFrameId=-1,r.nativeRequestAnimationFrame=wE().nativeRequestAnimationFrame,AE(r)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get("isAngularZone")===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new at(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new at(909,!1)}run(e,t,i){return this._inner.run(e,t,i)}runTask(e,t,i,r){let s=this._inner,o=s.scheduleEventTask("NgZoneEvent: "+r,e,TE,Yg,Yg);try{return s.runTask(o,t,i)}finally{s.cancelTask(o)}}runGuarded(e,t,i){return this._inner.runGuarded(e,t,i)}runOutsideAngular(e){return this._outer.run(e)}},TE={};function xh(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function CE(n){n.isCheckStableRunning||n.lastRequestAnimationFrameId!==-1||(n.lastRequestAnimationFrameId=n.nativeRequestAnimationFrame.call(Do,()=>{n.fakeTopEventTask||(n.fakeTopEventTask=Zone.root.scheduleEventTask("fakeTopEventTask",()=>{n.lastRequestAnimationFrameId=-1,gf(n),n.isCheckStableRunning=!0,xh(n),n.isCheckStableRunning=!1},void 0,()=>{},()=>{})),n.fakeTopEventTask.invoke()}),gf(n))}function AE(n){let e=()=>{CE(n)};n._inner=n._inner.fork({name:"angular",properties:{isAngularZone:!0},onInvokeTask:(t,i,r,s,o,a)=>{if(DE(a))return t.invokeTask(r,s,o,a);try{return Zg(n),t.invokeTask(r,s,o,a)}finally{(n.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&e(),Kg(n)}},onInvoke:(t,i,r,s,o,a,c)=>{try{return Zg(n),t.invoke(r,s,o,a,c)}finally{n.shouldCoalesceRunChangeDetection&&e(),Kg(n)}},onHasTask:(t,i,r,s)=>{t.hasTask(r,s),i===r&&(s.change=="microTask"?(n._hasPendingMicrotasks=s.microTask,gf(n),xh(n)):s.change=="macroTask"&&(n.hasPendingMacrotasks=s.macroTask))},onHandleError:(t,i,r,s)=>(t.handleError(r,s),n.runOutsideAngular(()=>n.onError.emit(s)),!1)})}function gf(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.lastRequestAnimationFrameId!==-1?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function Zg(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function Kg(n){n._nesting--,xh(n)}function DE(n){return!Array.isArray(n)||n.length!==1?!1:n[0].data?.__ignore_ng_zone__===!0}var Wy=(()=>{class n{constructor(){this.handler=null,this.internalCallbacks=[]}execute(){this.executeInternalCallbacks(),this.handler?.execute()}executeInternalCallbacks(){let t=[...this.internalCallbacks];this.internalCallbacks.length=0;for(let i of t)i()}ngOnDestroy(){this.handler?.destroy(),this.handler=null,this.internalCallbacks.length=0}static{this.\u0275prov=Ct({token:n,providedIn:"root",factory:()=>new n})}}return n})();function yf(n,e,t){let i=t?n.styles:null,r=t?n.classes:null,s=0;if(e!==null)for(let o=0;o<e.length;o++){let a=e[o];if(typeof a=="number")s=a;else if(s==1)r=wg(r,a);else if(s==2){let c=a,l=e[++o];i=wg(i,c+": "+l+";")}}t?n.styles=i:n.stylesWithoutHost=i,t?n.classes=r:n.classesWithoutHost=r}var vf=class extends _h{constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let t=Es(e);return new Oc(t,this.ngModule)}};function Jg(n){let e=[];for(let t in n){if(!n.hasOwnProperty(t))continue;let i=n[t];i!==void 0&&e.push({propName:Array.isArray(i)?i[0]:i,templateName:t})}return e}function IE(n){let e=n.toLowerCase();return e==="svg"?lS:e==="math"?uS:null}var _f=class{constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,i){i=Hc(i);let r=this.injector.get(e,Vd,i);return r!==Vd||t===Vd?r:this.parentInjector.get(e,t,i)}},Oc=class extends Fc{get inputs(){let e=this.componentDef,t=e.inputTransforms,i=Jg(e.inputs);if(t!==null)for(let r of i)t.hasOwnProperty(r.propName)&&(r.transform=t[r.propName]);return i}get outputs(){return Jg(this.componentDef.outputs)}constructor(e,t){super(),this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=UM(e.selectors),this.ngContentSelectors=e.ngContentSelectors?e.ngContentSelectors:[],this.isBoundToModule=!!t}create(e,t,i,r){let s=Je(null);try{r=r||this.ngModule;let o=r instanceof tr?r:r?.injector;o&&this.componentDef.getStandaloneInjector!==null&&(o=this.componentDef.getStandaloneInjector(o)||o);let a=o?new _f(e,o):e,c=a.get(jo,null);if(c===null)throw new at(407,!1);let l=a.get(EE,null),u=a.get(Wy,null),d=a.get(hf,null),f={rendererFactory:c,sanitizer:l,inlineEffectRunner:null,afterRenderEventManager:u,changeDetectionScheduler:d},h=c.createRenderer(null,this.componentDef),g=this.componentDef.selectors[0][0]||"div",y=i?kb(h,i,this.componentDef.encapsulation,a):fy(h,g,IE(g)),p=512;this.componentDef.signals?p|=4096:this.componentDef.onPush||(p|=16);let m=null;y!==null&&(m=ch(y,a,!0));let M=ph(0,null,null,1,0,null,null,null,null,null,null),b=Xc(null,M,null,p,null,null,f,h,a,null,m);Jf(b);let S,C;try{let T=this.componentDef,D,_=null;T.findHostDirectiveDefs?(D=[],_=new Map,T.findHostDirectiveDefs(T,D,_),D.push(T)):D=[T];let E=RE(b,y),W=NE(E,y,T,D,b,f,h);C=Xf(M,zn),y&&FE(h,T,y,i),t!==void 0&&OE(C,this.ngContentSelectors,t),S=LE(W,T,D,_,b,[UE]),gh(M,b,null)}finally{Qf()}return new xf(this.componentType,S,Ps(C,b),b,C)}finally{Je(s)}}},xf=class extends pf{constructor(e,t,i,r,s){super(),this.location=i,this._rootLView=r,this._tNode=s,this.previousInputValues=null,this.instance=t,this.hostView=this.changeDetectorRef=new Go(r,void 0,!1),this.componentType=e}setInput(e,t){let i=this._tNode.inputs,r;if(i!==null&&(r=i[e])){if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let s=this._rootLView;mh(s[ke],s,r,e,t),this.previousInputValues.set(e,t);let o=Ns(this._tNode.index,s);yh(o)}}get injector(){return new Ir(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function RE(n,e){let t=n[ke],i=zn;return n[i]=e,Yc(t,i,2,"#host",null)}function NE(n,e,t,i,r,s,o){let a=r[ke];PE(i,n,e,o);let c=null;e!==null&&(c=ch(e,r[ws]));let l=s.rendererFactory.createRenderer(e,t),u=16;t.signals?u=4096:t.onPush&&(u=64);let d=Xc(r,Ty(t),null,u,r[n.index],n,s,l,null,null,c);return a.firstCreatePass&&uf(a,n,i.length-1),Zc(r,d),r[n.index]=d}function PE(n,e,t,i){for(let r of n)e.mergedAttrs=Hf(e.mergedAttrs,r.hostAttrs);e.mergedAttrs!==null&&(yf(e,e.mergedAttrs,!0),t!==null&&vy(i,t,e))}function LE(n,e,t,i,r,s){let o=Ni(),a=r[ke],c=Wn(o,r);Ay(a,r,o,t,null,i);for(let u=0;u<t.length;u++){let d=o.directiveStart+u,f=Cs(r,a,d,o);Fr(f,r)}Dy(a,r,o),c&&Fr(c,r);let l=Cs(r,a,o.directiveStart+o.componentOffset,o);if(n[Jt]=r[Jt]=l,s!==null)for(let u of s)u(l,e);return by(a,o,r),l}function FE(n,e,t,i){if(i)Xd(n,t,["ng-version","17.3.12"]);else{let{attrs:r,classes:s}=kM(e.selectors[0]);r&&Xd(n,t,r),s&&s.length>0&&yy(n,t,s.join(" "))}}function OE(n,e,t){let i=n.projection=[];for(let r=0;r<e.length;r++){let s=t[r];i.push(s!=null?Array.from(s):null)}}function UE(){let n=Ni();nh(vt()[ke],n)}var Mh=(()=>{class n{static{this.__NG_ELEMENT_ID__=kE}}return n})();function kE(){let n=Ni();return $y(n,vt())}var BE=Mh,jy=class extends BE{constructor(e,t,i){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=i}get element(){return Ps(this._hostTNode,this._hostLView)}get injector(){return new Ir(this._hostTNode,this._hostLView)}get parentInjector(){let e=ih(this._hostTNode,this._hostLView);if(q0(e)){let t=Rc(e,this._hostLView),i=Ic(e),r=t[ke].data[i+8];return new Ir(r,t)}else return new Ir(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=Qg(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-Qt}createEmbeddedView(e,t,i){let r,s;typeof i=="number"?r=i:i!=null&&(r=i.index,s=i.injector);let o=Wo(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(t||{},s,o);return this.insertImpl(a,r,zo(this._hostTNode,o)),a}createComponent(e,t,i,r,s){let o=e&&!iS(e),a;if(o)a=t;else{let g=t||{};a=g.index,i=g.injector,r=g.projectableNodes,s=g.environmentInjector||g.ngModuleRef}let c=o?e:new Oc(Es(e)),l=i||this.parentInjector;if(!s&&c.ngModule==null){let y=(o?l:this.parentInjector).get(tr,null);y&&(s=y)}let u=Es(c.componentType??{}),d=Wo(this._lContainer,u?.id??null),f=d?.firstChild??null,h=c.create(l,r,f,s);return this.insertImpl(h.hostView,a,zo(this._hostTNode,d)),h}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(e,t,i){let r=e._lView;if(pS(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let c=r[Yt],l=new jy(c,c[Gn],c[Yt]);l.detach(l.indexOf(e))}}let s=this._adjustIndex(t),o=this._lContainer;return Jc(o,r,s,i),e.attachToViewContainerRef(),h0(Hd(o),s,e),e}move(e,t){return this.insert(e,t)}indexOf(e){let t=Qg(this._lContainer);return t!==null?t.indexOf(e):-1}remove(e){let t=this._adjustIndex(e,-1),i=Ho(this._lContainer,t);i&&(wc(Hd(this._lContainer),t),jc(i[ke],i))}detach(e){let t=this._adjustIndex(e,-1),i=Ho(this._lContainer,t);return i&&wc(Hd(this._lContainer),t)!=null?new Go(i):null}_adjustIndex(e,t=0){return e??this.length+t}};function Qg(n){return n[Ac]}function Hd(n){return n[Ac]||(n[Ac]=[])}function $y(n,e){let t,i=e[n.index];return Ri(i)?t=i:(t=Iy(i,e,null,n),e[n.index]=t,Zc(e,t)),HE(t,e,n,i),new jy(t,n,e)}function VE(n,e){let t=n[on],i=t.createComment(""),r=Wn(e,n),s=dh(t,r);return Nc(t,s,i,Tb(t,r),!1),i}var HE=WE,zE=()=>!1;function GE(n,e,t){return zE(n,e,t)}function WE(n,e,t,i){if(n[Pr])return;let r;t.type&8?r=li(i):r=VE(e,t),n[Pr]=r}var Mf=class n{constructor(e){this.queryList=e,this.matches=null}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},Sf=class n{constructor(e=[]){this.queries=e}createEmbeddedView(e){let t=e.queries;if(t!==null){let i=e.contentQueries!==null?e.contentQueries[0]:t.length,r=[];for(let s=0;s<i;s++){let o=t.getByIndex(s),a=this.queries[o.indexInDeclarationView];r.push(a.clone())}return new n(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)Sh(e,t).matches!==null&&this.queries[t].setDirty()}},bf=class{constructor(e,t,i=null){this.flags=t,this.read=i,typeof e=="string"?this.predicate=JE(e):this.predicate=e}},Ef=class n{constructor(e=[]){this.queries=e}elementStart(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(e){let t=null;for(let i=0;i<this.length;i++){let r=t!==null?t.length:0,s=this.getByIndex(i).embeddedTView(e,r);s&&(s.indexInDeclarationView=i,t!==null?t.push(s):t=[s])}return t!==null?new n(t):null}template(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},wf=class n{constructor(e,t=-1){this.metadata=e,this.matches=null,this.indexInDeclarationView=-1,this.crossesNgTemplate=!1,this._appliesToNextNode=!0,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(e,t){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,t),new n(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==t;)i=i.parent;return t===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,t){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let s=i[r];this.matchTNodeWithReadOption(e,t,jE(t,s)),this.matchTNodeWithReadOption(e,t,xc(t,e,s,!1,!1))}else i===Lc?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,xc(t,e,i,!1,!1))}matchTNodeWithReadOption(e,t,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===Ko||r===Mh||r===Lc&&t.type&4)this.addMatch(t.index,-2);else{let s=xc(t,e,r,!1,!1);s!==null&&this.addMatch(t.index,s)}else this.addMatch(t.index,i)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function jE(n,e){let t=n.localNames;if(t!==null){for(let i=0;i<t.length;i+=2)if(t[i]===e)return t[i+1]}return null}function $E(n,e){return n.type&11?Ps(n,e):n.type&4?vh(n,e):null}function qE(n,e,t,i){return t===-1?$E(e,n):t===-2?XE(n,e,i):Cs(n,n[ke],t,e)}function XE(n,e,t){if(t===Ko)return Ps(e,n);if(t===Lc)return vh(e,n);if(t===Mh)return $y(e,n)}function qy(n,e,t,i){let r=e[Ci].queries[i];if(r.matches===null){let s=n.data,o=t.matches,a=[];for(let c=0;o!==null&&c<o.length;c+=2){let l=o[c];if(l<0)a.push(null);else{let u=s[l];a.push(qE(e,u,o[c+1],t.metadata.read))}}r.matches=a}return r.matches}function Tf(n,e,t,i){let r=n.queries.getByIndex(t),s=r.matches;if(s!==null){let o=qy(n,e,r,t);for(let a=0;a<s.length;a+=2){let c=s[a];if(c>0)i.push(o[a/2]);else{let l=s[a+1],u=e[-c];for(let d=Qt;d<u.length;d++){let f=u[d];f[Xo]===f[Yt]&&Tf(f[ke],f,l,i)}if(u[Ts]!==null){let d=u[Ts];for(let f=0;f<d.length;f++){let h=d[f];Tf(h[ke],h,l,i)}}}}}return i}function YE(n,e){return n[Ci].queries[e].queryList}function ZE(n,e,t){let i=new of((t&4)===4);return Hb(n,e,i,i.destroy),(e[Ci]??=new Sf).queries.push(new Mf(i))-1}function KE(n,e,t){let i=ui();return i.firstCreatePass&&(QE(i,new bf(n,e,t),-1),(e&2)===2&&(i.staticViewQueries=!0)),ZE(i,vt(),e)}function JE(n){return n.split(",").map(e=>e.trim())}function QE(n,e,t){n.queries===null&&(n.queries=new Ef),n.queries.track(new wf(e,t))}function Sh(n,e){return n.queries.getByIndex(e)}function ew(n,e){let t=n[ke],i=Sh(t,e);return i.crossesNgTemplate?Tf(t,n,e,[]):qy(t,n,i,e)}function hn(n,e){Fs("NgSignals");let t=lg(n),i=t[Ji];return e?.equal&&(i.equal=e.equal),t.set=r=>Sd(i,r),t.update=r=>ug(i,r),t.asReadonly=tw.bind(t),t}function tw(){let n=this[Ji];if(n.readonlyFn===void 0){let e=()=>this();e[Ji]=n,n.readonlyFn=e}return n.readonlyFn}var As=class{};var Uc=class extends As{constructor(e){super(),this.componentFactoryResolver=new vf(this),this.instance=null;let t=new Cc([...e.providers,{provide:As,useValue:this},{provide:_h,useValue:this.componentFactoryResolver}],e.parent||Wf(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function nw(n,e,t=null){return new Uc({providers:n,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var Xy=(()=>{class n{constructor(){this.taskId=0,this.pendingTasks=new Set,this.hasPendingTasks=new Ao(!1)}get _hasPendingTasks(){return this.hasPendingTasks.value}add(){this._hasPendingTasks||this.hasPendingTasks.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),t}remove(t){this.pendingTasks.delete(t),this.pendingTasks.size===0&&this._hasPendingTasks&&this.hasPendingTasks.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this._hasPendingTasks&&this.hasPendingTasks.next(!1)}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=Ct({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function iw(n,e,t){return n[e]=t}function rw(n,e){return n[e]}function Or(n,e,t){let i=n[e];return Object.is(i,t)?!1:(n[e]=t,!0)}function sw(n,e,t,i){let r=Or(n,e,t);return Or(n,e+1,i)||r}function ow(n){return(n.flags&32)===32}function aw(n,e,t,i,r,s,o,a,c){let l=e.consts,u=Yc(e,n,4,o||null,Dc(l,a));Cy(e,t,u,Dc(l,c)),nh(e,u);let d=u.tView=ph(2,u,i,r,s,e.directiveRegistry,e.pipeRegistry,null,e.schemas,l,null);return e.queries!==null&&(e.queries.template(e,u),d.queries=e.queries.embeddedTView(u)),u}function Ds(n,e,t,i,r,s,o,a){let c=vt(),l=ui(),u=n+zn,d=l.firstCreatePass?aw(u,l,c,e,t,i,r,s,o):l.data[u];Zo(d,!1);let f=cw(l,c,d,n);eh()&&fh(l,c,f,d),Fr(f,c);let h=Iy(f,c,f,d);return c[u]=h,Zc(c,h),GE(h,d,c),qf(d)&&Ey(l,c,d),o!=null&&wy(c,d,a),Ds}var cw=lw;function lw(n,e,t,i){return th(!0),e[on].createComment("")}function uw(n,e,t,i){return Or(n,Wc(),t)?e+bc(t)+i:Pi}function dw(n,e,t,i,r,s){let o=CS(),a=sw(n,o,t,r);return k0(2),a?e+bc(t)+i+bc(r)+s:Pi}function gc(n,e){return n<<17|e<<2}function Ur(n){return n>>17&32767}function fw(n){return(n&2)==2}function hw(n,e){return n&131071|e<<17}function Cf(n){return n|2}function Is(n){return(n&131068)>>2}function zd(n,e){return n&-131069|e<<2}function pw(n){return(n&1)===1}function Af(n){return n|1}function mw(n,e,t,i,r,s){let o=s?e.classBindings:e.styleBindings,a=Ur(o),c=Is(o);n[i]=t;let l=!1,u;if(Array.isArray(t)){let d=t;u=d[1],(u===null||qo(d,u)>0)&&(l=!0)}else u=t;if(r)if(c!==0){let f=Ur(n[a+1]);n[i+1]=gc(f,a),f!==0&&(n[f+1]=zd(n[f+1],i)),n[a+1]=hw(n[a+1],i)}else n[i+1]=gc(a,0),a!==0&&(n[a+1]=zd(n[a+1],i)),a=i;else n[i+1]=gc(c,0),a===0?a=i:n[c+1]=zd(n[c+1],i),c=i;l&&(n[i+1]=Cf(n[i+1])),e0(n,u,i,!0),e0(n,u,i,!1),gw(e,u,n,i,s),o=gc(a,c),s?e.classBindings=o:e.styleBindings=o}function gw(n,e,t,i,r){let s=r?n.residualClasses:n.residualStyles;s!=null&&typeof e=="string"&&qo(s,e)>=0&&(t[i+1]=Af(t[i+1]))}function e0(n,e,t,i){let r=n[t+1],s=e===null,o=i?Ur(r):Is(r),a=!1;for(;o!==0&&(a===!1||s);){let c=n[o],l=n[o+1];yw(c,e)&&(a=!0,n[o+1]=i?Af(l):Cf(l)),o=i?Ur(l):Is(l)}a&&(n[t+1]=i?Cf(r):Af(r))}function yw(n,e){return n===null||e==null||(Array.isArray(n)?n[1]:n)===e?!0:Array.isArray(n)&&typeof e=="string"?qo(n,e)>=0:!1}function bh(n,e,t){let i=vt(),r=Wc();if(Or(i,r,e)){let s=ui(),o=FS();jb(s,o,i,n,e,i[on],t,!1)}return bh}function t0(n,e,t,i,r){let s=e.inputs,o=r?"class":"style";mh(n,t,s[o],o,i)}function Qc(n,e,t){return Yy(n,e,t,!1),Qc}function Jo(n,e){return Yy(n,e,null,!0),Jo}function Yy(n,e,t,i){let r=vt(),s=ui(),o=k0(2);if(s.firstUpdatePass&&_w(s,n,o,i),e!==Pi&&Or(r,o,e)){let a=s.data[rr()];Ew(s,a,r,r[on],n,r[o+1]=ww(e,t),i,o)}}function vw(n,e){return e>=n.expandoStartIndex}function _w(n,e,t,i){let r=n.data;if(r[t+1]===null){let s=r[rr()],o=vw(n,t);Tw(s,i)&&e===null&&!o&&(e=!1),e=xw(r,s,e,i),mw(r,s,e,t,o,i)}}function xw(n,e,t,i){let r=NS(n),s=i?e.residualClasses:e.residualStyles;if(r===null)(i?e.classBindings:e.styleBindings)===0&&(t=Gd(null,n,e,t,i),t=$o(t,e.attrs,i),s=null);else{let o=e.directiveStylingLast;if(o===-1||n[o]!==r)if(t=Gd(r,n,e,t,i),s===null){let c=Mw(n,e,i);c!==void 0&&Array.isArray(c)&&(c=Gd(null,n,e,c[1],i),c=$o(c,e.attrs,i),Sw(n,e,i,c))}else s=bw(n,e,i)}return s!==void 0&&(i?e.residualClasses=s:e.residualStyles=s),t}function Mw(n,e,t){let i=t?e.classBindings:e.styleBindings;if(Is(i)!==0)return n[Ur(i)]}function Sw(n,e,t,i){let r=t?e.classBindings:e.styleBindings;n[Ur(r)]=i}function bw(n,e,t){let i,r=e.directiveEnd;for(let s=1+e.directiveStylingLast;s<r;s++){let o=n[s].hostAttrs;i=$o(i,o,t)}return $o(i,e.attrs,t)}function Gd(n,e,t,i,r){let s=null,o=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<o&&(s=e[a],i=$o(i,s.hostAttrs,r),s!==n);)a++;return n!==null&&(t.directiveStylingLast=a),i}function $o(n,e,t){let i=t?1:2,r=-1;if(e!==null)for(let s=0;s<e.length;s++){let o=e[s];typeof o=="number"?r=o:r===i&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),EM(n,o,t?!0:e[++s]))}return n===void 0?null:n}function Ew(n,e,t,i,r,s,o,a){if(!(e.type&3))return;let c=n.data,l=c[a+1],u=pw(l)?n0(c,e,t,r,Is(l),o):void 0;if(!kc(u)){kc(s)||fw(l)&&(s=n0(c,null,t,r,a,o));let d=N0(rr(),t);Pb(i,o,d,r,s)}}function n0(n,e,t,i,r,s){let o=e===null,a;for(;r>0;){let c=n[r],l=Array.isArray(c),u=l?c[1]:c,d=u===null,f=t[r+1];f===Pi&&(f=d?Rr:void 0);let h=d?Nd(f,i):u===i?f:void 0;if(l&&!kc(h)&&(h=Nd(c,i)),kc(h)&&(a=h,o))return a;let g=n[r+1];r=o?Ur(g):Is(g)}if(e!==null){let c=s?e.residualClasses:e.residualStyles;c!=null&&(a=Nd(c,i))}return a}function kc(n){return n!==void 0}function ww(n,e){return n==null||n===""||(typeof e=="string"?n=n+e:typeof n=="object"&&(n=Nn(lh(n)))),n}function Tw(n,e){return(n.flags&(e?8:16))!==0}var Df=class{destroy(e){}updateValue(e,t){}swap(e,t){let i=Math.min(e,t),r=Math.max(e,t),s=this.detach(r);if(r-i>1){let o=this.detach(i);this.attach(i,s),this.attach(r,o)}else this.attach(i,s)}move(e,t){this.attach(t,this.detach(e))}};function Wd(n,e,t,i,r){return n===t&&Object.is(e,i)?1:Object.is(r(n,e),r(t,i))?-1:0}function Cw(n,e,t){let i,r,s=0,o=n.length-1;if(Array.isArray(e)){let a=e.length-1;for(;s<=o&&s<=a;){let c=n.at(s),l=e[s],u=Wd(s,c,s,l,t);if(u!==0){u<0&&n.updateValue(s,l),s++;continue}let d=n.at(o),f=e[a],h=Wd(o,d,a,f,t);if(h!==0){h<0&&n.updateValue(o,f),o--,a--;continue}let g=t(s,c),y=t(o,d),p=t(s,l);if(Object.is(p,y)){let m=t(a,f);Object.is(m,g)?(n.swap(s,o),n.updateValue(o,f),a--,o--):n.move(o,s),n.updateValue(s,l),s++;continue}if(i??=new Bc,r??=r0(n,s,o,t),If(n,i,s,p))n.updateValue(s,l),s++,o++;else if(r.has(p))i.set(g,n.detach(s)),o--;else{let m=n.create(s,e[s]);n.attach(s,m),s++,o++}}for(;s<=a;)i0(n,i,t,s,e[s]),s++}else if(e!=null){let a=e[Symbol.iterator](),c=a.next();for(;!c.done&&s<=o;){let l=n.at(s),u=c.value,d=Wd(s,l,s,u,t);if(d!==0)d<0&&n.updateValue(s,u),s++,c=a.next();else{i??=new Bc,r??=r0(n,s,o,t);let f=t(s,u);if(If(n,i,s,f))n.updateValue(s,u),s++,o++,c=a.next();else if(!r.has(f))n.attach(s,n.create(s,u)),s++,o++,c=a.next();else{let h=t(s,l);i.set(h,n.detach(s)),o--}}}for(;!c.done;)i0(n,i,t,n.length,c.value),c=a.next()}for(;s<=o;)n.destroy(n.detach(o--));i?.forEach(a=>{n.destroy(a)})}function If(n,e,t,i){return e!==void 0&&e.has(i)?(n.attach(t,e.get(i)),e.delete(i),!0):!1}function i0(n,e,t,i,r){if(If(n,e,i,t(i,r)))n.updateValue(i,r);else{let s=n.create(i,r);n.attach(i,s)}}function r0(n,e,t,i){let r=new Set;for(let s=e;s<=t;s++)r.add(i(s,n.at(s)));return r}var Bc=class{constructor(){this.kvMap=new Map,this._vMap=void 0}has(e){return this.kvMap.has(e)}delete(e){if(!this.has(e))return!1;let t=this.kvMap.get(e);return this._vMap!==void 0&&this._vMap.has(t)?(this.kvMap.set(e,this._vMap.get(t)),this._vMap.delete(t)):this.kvMap.delete(e),!0}get(e){return this.kvMap.get(e)}set(e,t){if(this.kvMap.has(e)){let i=this.kvMap.get(e);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,t)}else this.kvMap.set(e,t)}forEach(e){for(let[t,i]of this.kvMap)if(e(i,t),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),e(i,t)}}};function Eh(n,e,t){Fs("NgControlFlow");let i=vt(),r=Wc(),s=Lf(i,zn+n),o=0;if(Or(i,r,e)){let a=Je(null);try{if(Uy(s,o),e!==-1){let c=Ff(i[ke],zn+e),l=Wo(s,c.tView.ssrId),u=Kc(i,c,t,{dehydratedView:l});Jc(s,u,o,zo(c,l))}}finally{Je(a)}}else{let a=Oy(s,o);a!==void 0&&(a[Jt]=t)}}var Rf=class{constructor(e,t,i){this.lContainer=e,this.$implicit=t,this.$index=i}get $count(){return this.lContainer.length-Qt}};function wh(n){return n}function Qo(n,e){return e}var Nf=class{constructor(e,t,i){this.hasEmptyBlock=e,this.trackByFn=t,this.liveCollection=i}};function kr(n,e,t,i,r,s,o,a,c,l,u,d,f){Fs("NgControlFlow");let h=c!==void 0,g=vt(),y=a?o.bind(g[ci][Jt]):o,p=new Nf(h,y);g[zn+n]=p,Ds(n+1,e,t,i,r,s),h&&Ds(n+2,c,l,u,d,f)}var Pf=class extends Df{constructor(e,t,i){super(),this.lContainer=e,this.hostLView=t,this.templateTNode=i,this.needsIndexUpdate=!1}get length(){return this.lContainer.length-Qt}at(e){return this.getLView(e)[Jt].$implicit}attach(e,t){let i=t[Fo];this.needsIndexUpdate||=e!==this.length,Jc(this.lContainer,t,e,zo(this.templateTNode,i))}detach(e){return this.needsIndexUpdate||=e!==this.length-1,Aw(this.lContainer,e)}create(e,t){let i=Wo(this.lContainer,this.templateTNode.tView.ssrId);return Kc(this.hostLView,this.templateTNode,new Rf(this.lContainer,t,e),{dehydratedView:i})}destroy(e){jc(e[ke],e)}updateValue(e,t){this.getLView(e)[Jt].$implicit=t}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let e=0;e<this.length;e++)this.getLView(e)[Jt].$index=e}getLView(e){return Dw(this.lContainer,e)}};function Br(n){let e=Je(null),t=rr();try{let i=vt(),r=i[ke],s=i[t];if(s.liveCollection===void 0){let a=t+1,c=Lf(i,a),l=Ff(r,a);s.liveCollection=new Pf(c,i,l)}else s.liveCollection.reset();let o=s.liveCollection;if(Cw(o,n,s.trackByFn),o.updateIndexes(),s.hasEmptyBlock){let a=Wc(),c=o.length===0;if(Or(i,a,c)){let l=t+2,u=Lf(i,l);if(c){let d=Ff(r,l),f=Wo(u,d.tView.ssrId),h=Kc(i,d,void 0,{dehydratedView:f});Jc(u,h,0,zo(d,f))}else Uy(u,0)}}}finally{Je(e)}}function Lf(n,e){return n[e]}function Aw(n,e){return Ho(n,e)}function Dw(n,e){return Oy(n,e)}function Ff(n,e){return Xf(n,e)}function Iw(n,e,t,i,r,s){let o=e.consts,a=Dc(o,r),c=Yc(e,n,2,i,a);return Cy(e,t,c,Dc(o,s)),c.attrs!==null&&yf(c,c.attrs,!1),c.mergedAttrs!==null&&yf(c,c.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,c),c}function Re(n,e,t,i){let r=vt(),s=ui(),o=zn+n,a=r[on],c=s.firstCreatePass?Iw(o,s,r,e,t,i):s.data[o],l=Rw(s,r,c,a,e,n);r[o]=l;let u=qf(c);return Zo(c,!0),vy(a,l,c),!ow(c)&&eh()&&fh(s,r,l,c),vS()===0&&Fr(l,r),_S(),u&&(Ey(s,r,c),by(s,c,r)),i!==null&&wy(r,c),Re}function Le(){let n=Ni();U0()?wS():(n=n.parent,Zo(n,!1));let e=n;SS(e)&&bS(),xS();let t=ui();return t.firstCreatePass&&(nh(t,n),C0(n)&&t.queries.elementEnd(n)),e.classesWithoutHost!=null&&VS(e)&&t0(t,e,vt(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&HS(e)&&t0(t,e,vt(),e.stylesWithoutHost,!1),Le}function el(n,e,t,i){return Re(n,e,t,i),Le(),el}var Rw=(n,e,t,i,r,s)=>(th(!0),fy(i,r,OS()));function ea(){return vt()}var Vc="en-US";var Nw=Vc;function Pw(n){typeof n=="string"&&(Nw=n.toLowerCase().replace(/_/g,"-"))}function Li(n,e,t,i){let r=vt(),s=ui(),o=Ni();return Fw(s,r,r[on],o,n,e,i),Li}function Lw(n,e,t,i){let r=n.cleanup;if(r!=null)for(let s=0;s<r.length-1;s+=2){let o=r[s];if(o===t&&r[s+1]===i){let a=e[Oo],c=r[s+2];return a.length>c?a[c]:null}typeof o=="string"&&(s+=2)}return null}function Fw(n,e,t,i,r,s,o){let a=qf(i),l=n.firstCreatePass&&Py(n),u=e[Jt],d=Ny(e),f=!0;if(i.type&3||o){let y=Wn(i,e),p=o?o(y):y,m=d.length,M=o?S=>o(li(S[i.index])):i.index,b=null;if(!o&&a&&(b=Lw(n,e,r,i.index)),b!==null){let S=b.__ngLastListenerFn__||b;S.__ngNextListenerFn__=s,b.__ngLastListenerFn__=s,f=!1}else{s=o0(i,e,u,s,!1);let S=t.listen(p,r,s);d.push(s,S),l&&l.push(r,M,m,m+1)}}else s=o0(i,e,u,s,!1);let h=i.outputs,g;if(f&&h!==null&&(g=h[r])){let y=g.length;if(y)for(let p=0;p<y;p+=2){let m=g[p],M=g[p+1],C=e[m][M].subscribe(s),T=d.length;d.push(s,C),l&&l.push(r,i.index,T,-(T+1))}}}function s0(n,e,t,i){let r=Je(null);try{return ri(6,e,t),t(i)!==!1}catch(s){return Ly(n,s),!1}finally{ri(7,e,t),Je(r)}}function o0(n,e,t,i,r){return function s(o){if(o===Function)return i;let a=n.componentOffset>-1?Ns(n.index,e):e;yh(a);let c=s0(e,t,i,o),l=s.__ngNextListenerFn__;for(;l;)c=s0(e,t,l,o)&&c,l=l.__ngNextListenerFn__;return r&&c===!1&&o.preventDefault(),c}}function jn(n=1){return LS(n)}function Zy(n,e,t){KE(n,e,t)}function Ky(n){let e=vt(),t=ui(),i=B0();Kf(i+1);let r=Sh(t,i);if(n.dirty&&hS(e)===((r.metadata.flags&2)===2)){if(r.matches===null)n.reset([]);else{let s=ew(e,i);n.reset(s,tb),n.notifyOnChanges()}return!0}return!1}function Jy(){return YE(vt(),B0())}function Ye(n,e=""){let t=vt(),i=ui(),r=n+zn,s=i.firstCreatePass?Yc(i,r,1,e,null):i.data[r],o=Ow(i,t,s,e,n);t[r]=o,eh()&&fh(i,t,o,s),Zo(s,!1)}var Ow=(n,e,t,i,r)=>(th(!0),pb(e[on],i));function Fi(n){return Mn("",n,""),Fi}function Mn(n,e,t){let i=vt(),r=uw(i,n,e,t);return r!==Pi&&Fy(i,rr(),r),Mn}function Th(n,e,t,i,r){let s=vt(),o=dw(s,n,e,t,i,r);return o!==Pi&&Fy(s,rr(),o),Th}var Uw=(()=>{class n{constructor(t){this._injector=t,this.cachedInjectors=new Map}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=S0(!1,t.type),r=i.length>0?nw([i],this._injector,`Standalone[${t.type.name}]`):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static{this.\u0275prov=Ct({token:n,providedIn:"environment",factory:()=>new n(ft(tr))})}}return n})();function Qy(n){Fs("NgStandalone"),n.getStandaloneInjector=e=>e.get(Uw).getOrCreateStandaloneInjector(n)}function ev(n,e,t){let i=TS()+n,r=vt();return r[i]===Pi?iw(r,i,t?e.call(t):e()):rw(r,i)}var tv=new bt("");function Ch(n){return!!n&&typeof n.then=="function"}function nv(n){return!!n&&typeof n.subscribe=="function"}var kw=new bt(""),iv=(()=>{class n{constructor(){this.initialized=!1,this.done=!1,this.donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i}),this.appInits=Wt(kw,{optional:!0})??[]}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let s=r();if(Ch(s))t.push(s);else if(nv(s)){let o=new Promise((a,c)=>{s.subscribe({complete:a,error:c})});t.push(o)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=Ct({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})(),Bw=new bt("");function Vw(){cg(()=>{throw new at(600,!1)})}function Hw(n){return n.isBoundToModule}function zw(n,e,t){try{let i=t();return Ch(i)?i.catch(r=>{throw e.runOutsideAngular(()=>n.handleError(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>n.handleError(i)),i}}var Ah=(()=>{class n{constructor(){this._bootstrapListeners=[],this._runningTick=!1,this._destroyed=!1,this._destroyListeners=[],this._views=[],this.internalErrorHandler=Wt(iy),this.afterRenderEffectManager=Wt(Wy),this.externalTestViews=new Set,this.beforeRender=new Qi,this.afterTick=new Qi,this.componentTypes=[],this.components=[],this.isStable=Wt(Xy).hasPendingTasks.pipe(Rd(t=>!t)),this._injector=Wt(tr)}get destroyed(){return this._destroyed}get injector(){return this._injector}bootstrap(t,i){let r=t instanceof Fc;if(!this._injector.get(iv).done){let f=!r&&HM(t),h=!1;throw new at(405,h)}let o;r?o=t:o=this._injector.get(_h).resolveComponentFactory(t),this.componentTypes.push(o.componentType);let a=Hw(o)?void 0:this._injector.get(As),c=i||o.selector,l=o.create(rh.NULL,[],c,a),u=l.location.nativeElement,d=l.injector.get(tv,null);return d?.registerApplication(u),l.onDestroy(()=>{this.detachView(l.hostView),jd(this.components,l),d?.unregisterApplication(u)}),this._loadComponent(l),l}tick(){this._tick(!0)}_tick(t){if(this._runningTick)throw new at(101,!1);let i=Je(null);try{this._runningTick=!0,this.detectChangesInAttachedViews(t)}catch(r){this.internalErrorHandler(r)}finally{this.afterTick.next(),this._runningTick=!1,Je(i)}}detectChangesInAttachedViews(t){let i=0,r=this.afterRenderEffectManager;for(;;){if(i===By)throw new at(103,!1);if(t){let s=i===0;this.beforeRender.next(s);for(let{_lView:o,notifyErrorHandler:a}of this._views)Gw(o,s,a)}if(i++,r.executeInternalCallbacks(),![...this.externalTestViews.keys(),...this._views].some(({_lView:s})=>Of(s))&&(r.execute(),![...this.externalTestViews.keys(),...this._views].some(({_lView:s})=>Of(s))))break}}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;jd(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView),this.tick(),this.components.push(t);let i=this._injector.get(Bw,[]);[...this._bootstrapListeners,...i].forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._bootstrapListeners=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>jd(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new at(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}warnIfDestroyed(){}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=Ct({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function jd(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function Gw(n,e,t){!e&&!Of(n)||Ww(n,t,e)}function Of(n){return Zf(n)}function Ww(n,e,t){let i;t?(i=0,n[Ie]|=1024):n[Ie]&64?i=0:i=1,Vy(n,e,i)}var jw=(()=>{class n{constructor(){this.zone=Wt(en),this.applicationRef=Wt(Ah)}initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.zone.run(()=>{this.applicationRef.tick()})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=Ct({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function $w(n){return[{provide:en,useFactory:n},{provide:Lo,multi:!0,useFactory:()=>{let e=Wt(jw,{optional:!0});return()=>e.initialize()}},{provide:Lo,multi:!0,useFactory:()=>{let e=Wt(Zw);return()=>{e.initialize()}}},{provide:iy,useFactory:qw}]}function qw(){let n=Wt(en),e=Wt(Ai);return t=>n.runOutsideAngular(()=>e.handleError(t))}function Xw(n){let e=$w(()=>new en(Yw(n)));return M0([[],e])}function Yw(n){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:n?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:n?.runCoalescing??!1}}var Zw=(()=>{class n{constructor(){this.subscription=new fn,this.initialized=!1,this.zone=Wt(en),this.pendingTasks=Wt(Xy)}initialize(){if(this.initialized)return;this.initialized=!0;let t=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(t=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{en.assertNotInAngularZone(),queueMicrotask(()=>{t!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(t),t=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{en.assertInAngularZone(),t??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=Ct({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function Kw(){return typeof $localize<"u"&&$localize.locale||Vc}var Dh=new bt("",{providedIn:"root",factory:()=>Wt(Dh,Qe.Optional|Qe.SkipSelf)||Kw()});var rv=new bt("");var Sc=null;function Jw(n=[],e){return rh.create({name:e,providers:[{provide:zc,useValue:"platform"},{provide:rv,useValue:new Set([()=>Sc=null])},...n]})}function Qw(n=[]){if(Sc)return Sc;let e=Jw(n);return Sc=e,Vw(),eT(e),e}function eT(n){n.get(oh,null)?.forEach(t=>t())}function sv(n){try{let{rootComponent:e,appProviders:t,platformProviders:i}=n,r=Qw(i),s=[Xw(),...t||[]],a=new Uc({providers:s,parent:r,debugName:"",runEnvironmentInitializers:!1}).injector,c=a.get(en);return c.run(()=>{a.resolveInjectorInitializers();let l=a.get(Ai,null),u;c.runOutsideAngular(()=>{u=c.onError.subscribe({next:h=>{l.handleError(h)}})});let d=()=>a.destroy(),f=r.get(rv);return f.add(d),a.onDestroy(()=>{u.unsubscribe(),f.delete(d)}),zw(l,c,()=>{let h=a.get(iv);return h.runInitializers(),h.donePromise.then(()=>{let g=a.get(Dh,Vc);Pw(g||Vc);let y=a.get(Ah);return e!==void 0&&y.bootstrap(e),y})})})}catch(e){return Promise.reject(e)}}function ta(n,e){Fs("NgSignals");let t=sg(n);return e?.equal&&(t[Ji].equal=e.equal),t}var ov=null;function Ih(){return ov}function av(n){ov??=n}var nl=class{};var sr=new bt("");function cv(n,e){e=encodeURIComponent(e);for(let t of n.split(";")){let i=t.indexOf("="),[r,s]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()===e)return decodeURIComponent(s)}return null}var lv="browser",nT="server";function Rh(n){return n===nT}var il=class{};var Lh=class extends nl{constructor(){super(...arguments),this.supportsDOMEvents=!0}},Fh=class n extends Lh{static makeCurrent(){av(new n)}onAndCancel(e,t,i){return e.addEventListener(t,i),()=>{e.removeEventListener(t,i)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.parentNode&&e.parentNode.removeChild(e)}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=rT();return t==null?null:sT(t)}resetBaseElement(){na=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return cv(document.cookie,e)}},na=null;function rT(){return na=na||document.querySelector("base"),na?na.getAttribute("href"):null}function sT(n){return new URL(n,document.baseURI).pathname}var oT=(()=>{class n{build(){return new XMLHttpRequest}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=Ct({token:n,factory:n.\u0275fac})}}return n})(),Oh=new bt(""),hv=(()=>{class n{constructor(t,i){this._zone=i,this._eventNameToPlugin=new Map,t.forEach(r=>{r.manager=this}),this._plugins=t.slice().reverse()}addEventListener(t,i,r){return this._findPluginFor(i).addEventListener(t,i,r)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(s=>s.supports(t)),!i)throw new at(5101,!1);return this._eventNameToPlugin.set(t,i),i}static{this.\u0275fac=function(i){return new(i||n)(ft(Oh),ft(en))}}static{this.\u0275prov=Ct({token:n,factory:n.\u0275fac})}}return n})(),rl=class{constructor(e){this._doc=e}},Nh="ng-app-id",pv=(()=>{class n{constructor(t,i,r,s={}){this.doc=t,this.appId=i,this.nonce=r,this.platformId=s,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=Rh(s),this.resetHostNodes()}addStyles(t){for(let i of t)this.changeUsageCount(i,1)===1&&this.onStyleAdded(i)}removeStyles(t){for(let i of t)this.changeUsageCount(i,-1)<=0&&this.onStyleRemoved(i)}ngOnDestroy(){let t=this.styleNodesInDOM;t&&(t.forEach(i=>i.remove()),t.clear());for(let i of this.getAllStyles())this.onStyleRemoved(i);this.resetHostNodes()}addHost(t){this.hostNodes.add(t);for(let i of this.getAllStyles())this.addStyleToHost(t,i)}removeHost(t){this.hostNodes.delete(t)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(t){for(let i of this.hostNodes)this.addStyleToHost(i,t)}onStyleRemoved(t){let i=this.styleRef;i.get(t)?.elements?.forEach(r=>r.remove()),i.delete(t)}collectServerRenderedStyles(){let t=this.doc.head?.querySelectorAll(`style[${Nh}="${this.appId}"]`);if(t?.length){let i=new Map;return t.forEach(r=>{r.textContent!=null&&i.set(r.textContent,r)}),i}return null}changeUsageCount(t,i){let r=this.styleRef;if(r.has(t)){let s=r.get(t);return s.usage+=i,s.usage}return r.set(t,{usage:i,elements:[]}),i}getStyleElement(t,i){let r=this.styleNodesInDOM,s=r?.get(i);if(s?.parentNode===t)return r.delete(i),s.removeAttribute(Nh),s;{let o=this.doc.createElement("style");return this.nonce&&o.setAttribute("nonce",this.nonce),o.textContent=i,this.platformIsServer&&o.setAttribute(Nh,this.appId),t.appendChild(o),o}}addStyleToHost(t,i){let r=this.getStyleElement(t,i),s=this.styleRef,o=s.get(i)?.elements;o?o.push(r):s.set(i,{elements:[r],usage:1})}resetHostNodes(){let t=this.hostNodes;t.clear(),t.add(this.doc.head)}static{this.\u0275fac=function(i){return new(i||n)(ft(sr),ft(sh),ft(ah,8),ft(Ls))}}static{this.\u0275prov=Ct({token:n,factory:n.\u0275fac})}}return n})(),Ph={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/MathML/"},kh=/%COMP%/g,mv="%COMP%",aT=`_nghost-${mv}`,cT=`_ngcontent-${mv}`,lT=!0,uT=new bt("",{providedIn:"root",factory:()=>lT});function dT(n){return cT.replace(kh,n)}function fT(n){return aT.replace(kh,n)}function gv(n,e){return e.map(t=>t.replace(kh,n))}var uv=(()=>{class n{constructor(t,i,r,s,o,a,c,l=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=s,this.doc=o,this.platformId=a,this.ngZone=c,this.nonce=l,this.rendererByCompId=new Map,this.platformIsServer=Rh(a),this.defaultRenderer=new ia(t,o,c,this.platformIsServer)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;this.platformIsServer&&i.encapsulation===oi.ShadowDom&&(i=Un(sn({},i),{encapsulation:oi.Emulated}));let r=this.getOrCreateRenderer(t,i);return r instanceof sl?r.applyToHost(t):r instanceof ra&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,s=r.get(i.id);if(!s){let o=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.platformIsServer;switch(i.encapsulation){case oi.Emulated:s=new sl(c,l,i,this.appId,u,o,a,d);break;case oi.ShadowDom:return new Uh(c,l,t,i,o,a,this.nonce,d);default:s=new ra(c,l,i,u,o,a,d);break}r.set(i.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}static{this.\u0275fac=function(i){return new(i||n)(ft(hv),ft(pv),ft(sh),ft(uT),ft(sr),ft(Ls),ft(en),ft(ah))}}static{this.\u0275prov=Ct({token:n,factory:n.\u0275fac})}}return n})(),ia=class{constructor(e,t,i,r){this.eventManager=e,this.doc=t,this.ngZone=i,this.platformIsServer=r,this.data=Object.create(null),this.throwOnSyntheticProps=!0,this.destroyNode=null}destroy(){}createElement(e,t){return t?this.doc.createElementNS(Ph[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(dv(e)?e.content:e).appendChild(t)}insertBefore(e,t,i){e&&(dv(e)?e.content:e).insertBefore(t,i)}removeChild(e,t){e&&e.removeChild(t)}selectRootElement(e,t){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new at(-5104,!1);return t||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,i,r){if(r){t=r+":"+t;let s=Ph[r];s?e.setAttributeNS(s,t,i):e.setAttribute(t,i)}else e.setAttribute(t,i)}removeAttribute(e,t,i){if(i){let r=Ph[i];r?e.removeAttributeNS(r,t):e.removeAttribute(`${i}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,i,r){r&(Di.DashCase|Di.Important)?e.style.setProperty(t,i,r&Di.Important?"important":""):e.style[t]=i}removeStyle(e,t,i){i&Di.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,i){e!=null&&(e[t]=i)}setValue(e,t){e.nodeValue=t}listen(e,t,i){if(typeof e=="string"&&(e=Ih().getGlobalEventTarget(this.doc,e),!e))throw new Error(`Unsupported event target ${e} for event ${t}`);return this.eventManager.addEventListener(e,t,this.decoratePreventDefault(i))}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;(this.platformIsServer?this.ngZone.runGuarded(()=>e(t)):e(t))===!1&&t.preventDefault()}}};function dv(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Uh=class extends ia{constructor(e,t,i,r,s,o,a,c){super(e,s,o,c),this.sharedStylesHost=t,this.hostEl=i,this.shadowRoot=i.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let l=gv(r.id,r.styles);for(let u of l){let d=document.createElement("style");a&&d.setAttribute("nonce",a),d.textContent=u,this.shadowRoot.appendChild(d)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,i){return super.insertBefore(this.nodeOrShadowRoot(e),t,i)}removeChild(e,t){return super.removeChild(this.nodeOrShadowRoot(e),t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},ra=class extends ia{constructor(e,t,i,r,s,o,a,c){super(e,s,o,a),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r,this.styles=c?gv(c,i.styles):i.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles)}},sl=class extends ra{constructor(e,t,i,r,s,o,a,c){let l=r+"-"+i.id;super(e,t,i,s,o,a,c,l),this.contentAttr=dT(l),this.hostAttr=fT(l)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let i=super.createElement(e,t);return super.setAttribute(i,this.contentAttr,""),i}},hT=(()=>{class n extends rl{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r){return t.addEventListener(i,r,!1),()=>this.removeEventListener(t,i,r)}removeEventListener(t,i,r){return t.removeEventListener(i,r)}static{this.\u0275fac=function(i){return new(i||n)(ft(sr))}}static{this.\u0275prov=Ct({token:n,factory:n.\u0275fac})}}return n})(),fv=["alt","control","meta","shift"],pT={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},mT={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},gT=(()=>{class n extends rl{constructor(t){super(t)}supports(t){return n.parseEventName(t)!=null}addEventListener(t,i,r){let s=n.parseEventName(i),o=n.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Ih().onAndCancel(t,s.domEventName,o))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let s=n._normalizeKey(i.pop()),o="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),o="code."),fv.forEach(l=>{let u=i.indexOf(l);u>-1&&(i.splice(u,1),o+=l+".")}),o+=s,i.length!=0||s.length===0)return null;let c={};return c.domEventName=r,c.fullKey=o,c}static matchEventFullKeyCode(t,i){let r=pT[t.key]||t.key,s="";return i.indexOf("code.")>-1&&(r=t.code,s="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),fv.forEach(o=>{if(o!==r){let a=mT[o];a(t)&&(s+=o+".")}}),s+=r,s===i)}static eventCallback(t,i,r){return s=>{n.matchEventFullKeyCode(s,t)&&r.runGuarded(()=>i(s))}}static _normalizeKey(t){return t==="esc"?"escape":t}static{this.\u0275fac=function(i){return new(i||n)(ft(sr))}}static{this.\u0275prov=Ct({token:n,factory:n.\u0275fac})}}return n})();function yv(n,e){return sv(sn({rootComponent:n},yT(e)))}function yT(n){return{appProviders:[...ST,...n?.providers??[]],platformProviders:MT}}function vT(){Fh.makeCurrent()}function _T(){return new Ai}function xT(){return uy(document),document}var MT=[{provide:Ls,useValue:lv},{provide:oh,useValue:vT,multi:!0},{provide:sr,useFactory:xT,deps:[]}];var ST=[{provide:zc,useValue:"root"},{provide:Ai,useFactory:_T,deps:[]},{provide:Oh,useClass:hT,multi:!0,deps:[sr,en,Ls]},{provide:Oh,useClass:gT,multi:!0,deps:[sr]},uv,pv,hv,{provide:jo,useExisting:uv},{provide:il,useClass:oT,deps:[]},[]];var vv={providers:[]};var ol=(()=>{class n{constructor(){this.simSpeed=hn(2),this.isPaused=hn(!1),this.simMinutes=hn(8*60),this.totalProcessed=hn(0),this.inSystem=hn(0),this.laneOccupancies=hn([0,0,0,0,0,0]),this.laneDetails=hn([{processing:!1,remaining:0,queueCount:0},{processing:!1,remaining:0,queueCount:0},{processing:!1,remaining:0,queueCount:0},{processing:!1,remaining:0,queueCount:0},{processing:!1,remaining:0,queueCount:0},{processing:!1,remaining:0,queueCount:0}]),this.zone8Total=ta(()=>this.laneOccupancies().reduce((t,i)=>t+i,0)),this.trucksPastLight=hn(0),this.manualLight=hn(null),this.isGreen=ta(()=>{let t=this.manualLight();return t!==null?t:this.trucksPastLight()<24}),this.distributionLog=hn([]),this.timeString=ta(()=>{let t=Math.floor(this.simMinutes()),i=Math.floor(t/60)%24,r=t%60;return`${String(i).padStart(2,"0")}:${String(r).padStart(2,"0")}`}),this.simHour=ta(()=>Math.floor(this.simMinutes()/60)%24),this.HOURLY={0:8,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:114,9:244,10:375,11:431,12:395,13:437,14:514,15:488,16:532,17:551,18:521,19:351,20:544,21:501,22:400,23:223},this.intensity=hn(1),this.laneDelays=hn([0,0,0,0,0,0]),this.waitingQueue=hn(0)}setIntensity(t){this.intensity.set(t)}getSpawnIntervalSeconds(){let t=this.HOURLY[this.simHour()]??0;if(t<=0)return 9999;let r=t/30/60*this.intensity();return r<=0?9999:1/r/this.simSpeed()}adjustLaneDelay(t,i){this.laneDelays.update(r=>{let s=[...r];return s[t]=Math.max(-15,Math.min(60,s[t]+i)),s})}setSpeed(t){this.simSpeed.set(t)}setPaused(t){this.isPaused.set(t)}setTime(t){this.simMinutes.set(t*60)}tickTime(t){this.isPaused()||this.simMinutes.update(i=>i+t*this.simSpeed())}truckEntered(){this.inSystem.update(t=>t+1)}truckPassedLight(){this.trucksPastLight.update(t=>t+1)}truckExited(){this.inSystem.update(t=>Math.max(0,t-1)),this.trucksPastLight.update(t=>Math.max(0,t-1)),this.totalProcessed.update(t=>t+1)}updateLanes(t,i,r){this.laneOccupancies.set([...t]),this.laneDetails.set([...i]),this.waitingQueue.set(r)}toggleLight(){let t=this.manualLight();t===null?this.manualLight.set(!1):t===!1?this.manualLight.set(!0):this.manualLight.set(null)}logDistribution(t,i){let r={truckId:t,lane:i,time:this.timeString()};this.distributionLog.update(s=>[r,...s].slice(0,15))}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=Ct({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();var du="183";var o_=0,Tp=1,a_=2;var $a=1,fu=2,yo=3,Jn=0,ln=1,un=2,xi=0,jr=1,Cp=2,Ap=3,Dp=4,c_=5;var fr=100,l_=101,u_=102,d_=103,f_=104,h_=200,p_=201,m_=202,g_=203,Ul=204,kl=205,y_=206,v_=207,__=208,x_=209,M_=210,S_=211,b_=212,E_=213,w_=214,Bl=0,Vl=1,Hl=2,$r=3,zl=4,Gl=5,Wl=6,jl=7,Ip=0,T_=1,C_=2,Qn=0,Rp=1,Np=2,Pp=3,qa=4,Lp=5,Fp=6,Op=7,fp="attached",A_="detached",hp=300,xr=301,es=302,hu=303,pu=304,Xa=306,pi=1e3,Ln=1001,to=1002,Rt=1003,mu=1004;var ts=1005;var wt=1006,vo=1007;var ei=1008;var vn=1009,Up=1010,kp=1011,_o=1012,gu=1013,ti=1014,Dn=1015,Mi=1016,yu=1017,vu=1018,xo=1020,Bp=35902,Vp=35899,Hp=1021,zp=1022,In=1023,mi=1026,Mr=1027,_u=1028,xu=1029,ns=1030,Mu=1031;var Su=1033,Ya=33776,Za=33777,Ka=33778,Ja=33779,bu=35840,Eu=35841,wu=35842,Tu=35843,Cu=36196,Au=37492,Du=37496,Iu=37488,Ru=37489,Nu=37490,Pu=37491,Lu=37808,Fu=37809,Ou=37810,Uu=37811,ku=37812,Bu=37813,Vu=37814,Hu=37815,zu=37816,Gu=37817,Wu=37818,ju=37819,$u=37820,qu=37821,Xu=36492,Yu=36494,Zu=36495,Ku=36283,Ju=36284,Qu=36285,ed=36286;var qr=2300,Xr=2301,Ol=2302,pp=2303,mp=2400,gp=2401,yp=2402,D_=2500;var Gp=0,Qa=1,Mo=2,I_=3200;var Wp=0,R_=1,Yi="",kt="srgb",Zt="srgb-linear",ya="linear",rt="srgb";var Wr=7680;var vp=519,N_=512,P_=513,L_=514,td=515,F_=516,O_=517,nd=518,U_=519,$l=35044;var jp="300 es",Zn=2e3,no=2001;function bT(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ET(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function io(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function k_(){let n=io("canvas");return n.style.display="block",n}var xv={},ro=null;function va(...n){let e="THREE."+n.shift();ro?ro("log",e,...n):console.log(e,...n)}function B_(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Se(...n){n=B_(n);let e="THREE."+n.shift();if(ro)ro("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ce(...n){n=B_(n);let e="THREE."+n.shift();if(ro)ro("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function _a(...n){let e=n.join(" ");e in xv||(xv[e]=!0,Se(...n))}function V_(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var H_={[Bl]:Vl,[Hl]:Wl,[zl]:jl,[$r]:Gl,[Vl]:Bl,[Wl]:Hl,[jl]:zl,[Gl]:$r},Wi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Mv=1234567,ma=Math.PI/180,Yr=180/Math.PI;function Kn(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]+"-"+tn[e&255]+tn[e>>8&255]+"-"+tn[e>>16&15|64]+tn[e>>24&255]+"-"+tn[t&63|128]+tn[t>>8&255]+"-"+tn[t>>16&255]+tn[t>>24&255]+tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]).toLowerCase()}function Ke(n,e,t){return Math.max(e,Math.min(t,n))}function $p(n,e){return(n%e+e)%e}function wT(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function TT(n,e,t){return n!==e?(t-n)/(e-n):0}function ga(n,e,t){return(1-t)*n+t*e}function CT(n,e,t,i){return ga(n,e,1-Math.exp(-t*i))}function AT(n,e=1){return e-Math.abs($p(n,e*2)-e)}function DT(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function IT(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function RT(n,e){return n+Math.floor(Math.random()*(e-n+1))}function NT(n,e){return n+Math.random()*(e-n)}function PT(n){return n*(.5-Math.random())}function LT(n){n!==void 0&&(Mv=n);let e=Mv+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function FT(n){return n*ma}function OT(n){return n*Yr}function UT(n){return(n&n-1)===0&&n!==0}function kT(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function BT(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function VT(n,e,t,i,r){let s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+i)/2),u=o((e+i)/2),d=s((e-i)/2),f=o((e-i)/2),h=s((i-e)/2),g=o((i-e)/2);switch(r){case"XYX":n.set(a*u,c*d,c*f,a*l);break;case"YZY":n.set(c*f,a*u,c*d,a*l);break;case"ZXZ":n.set(c*d,c*f,a*u,a*l);break;case"XZX":n.set(a*u,c*g,c*h,a*l);break;case"YXY":n.set(c*h,a*u,c*g,a*l);break;case"ZYZ":n.set(c*g,c*h,a*u,a*l);break;default:Se("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Yn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function lt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Sr={DEG2RAD:ma,RAD2DEG:Yr,generateUUID:Kn,clamp:Ke,euclideanModulo:$p,mapLinear:wT,inverseLerp:TT,lerp:ga,damp:CT,pingpong:AT,smoothstep:DT,smootherstep:IT,randInt:RT,randFloat:NT,randFloatSpread:PT,seededRandom:LT,degToRad:FT,radToDeg:OT,isPowerOfTwo:UT,ceilPowerOfTwo:kT,floorPowerOfTwo:BT,setQuaternionFromProperEuler:VT,normalize:lt,denormalize:Yn},Ne=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},En=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],f=s[o+0],h=s[o+1],g=s[o+2],y=s[o+3];if(d!==y||c!==f||l!==h||u!==g){let p=c*f+l*h+u*g+d*y;p<0&&(f=-f,h=-h,g=-g,y=-y,p=-p);let m=1-a;if(p<.9995){let M=Math.acos(p),b=Math.sin(M);m=Math.sin(m*M)/b,a=Math.sin(a*M)/b,c=c*m+f*a,l=l*m+h*a,u=u*m+g*a,d=d*m+y*a}else{c=c*m+f*a,l=l*m+h*a,u=u*m+g*a,d=d*m+y*a;let M=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=M,l*=M,u*=M,d*=M}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=s[o],f=s[o+1],h=s[o+2],g=s[o+3];return e[t]=a*g+u*d+c*h-l*f,e[t+1]=c*g+u*f+l*d-a*h,e[t+2]=l*g+u*h+a*f-c*d,e[t+3]=u*g-a*d-c*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),d=a(s/2),f=c(i/2),h=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"YXZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"ZXY":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"ZYX":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"YZX":this._x=f*u*d+l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d-f*h*g;break;case"XZY":this._x=f*u*d-l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d+f*h*g;break;default:Se("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-c)*h,this._y=(s-l)*h,this._z=(o-r)*h}else if(i>a&&i>d){let h=2*Math.sqrt(1+i-a-d);this._w=(u-c)/h,this._x=.25*h,this._y=(r+o)/h,this._z=(s+l)/h}else if(a>d){let h=2*Math.sqrt(1+a-i-d);this._w=(s-l)/h,this._x=(r+o)/h,this._y=.25*h,this._z=(c+u)/h}else{let h=2*Math.sqrt(1+d-i-a);this._w=(o-r)/h,this._x=(s+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Sv.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Sv.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+c*l+o*d-a*u,this.y=i+c*u+a*l-s*d,this.z=r+c*d+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Bh.copy(this).projectOnVector(e),this.sub(Bh)}reflect(e){return this.sub(Bh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Bh=new R,Sv=new En,Be=class n{constructor(e,t,i,r,s,o,a,c,l){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],d=i[7],f=i[2],h=i[5],g=i[8],y=r[0],p=r[3],m=r[6],M=r[1],b=r[4],S=r[7],C=r[2],T=r[5],D=r[8];return s[0]=o*y+a*M+c*C,s[3]=o*p+a*b+c*T,s[6]=o*m+a*S+c*D,s[1]=l*y+u*M+d*C,s[4]=l*p+u*b+d*T,s[7]=l*m+u*S+d*D,s[2]=f*y+h*M+g*C,s[5]=f*p+h*b+g*T,s[8]=f*m+h*S+g*D,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,f=a*c-u*s,h=l*s-o*c,g=t*d+i*f+r*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=d*y,e[1]=(r*l-u*i)*y,e[2]=(a*i-r*o)*y,e[3]=f*y,e[4]=(u*t-r*c)*y,e[5]=(r*s-a*t)*y,e[6]=h*y,e[7]=(i*c-l*t)*y,e[8]=(o*t-i*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Vh.makeScale(e,t)),this}rotate(e){return this.premultiply(Vh.makeRotation(-e)),this}translate(e,t){return this.premultiply(Vh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Vh=new Be,bv=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ev=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function HT(){let n={enabled:!0,workingColorSpace:Zt,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===rt&&(r.r=Gi(r.r),r.g=Gi(r.g),r.b=Gi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===rt&&(r.r=eo(r.r),r.g=eo(r.g),r.b=eo(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Yi?ya:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return _a("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return _a("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Zt]:{primaries:e,whitePoint:i,transfer:ya,toXYZ:bv,fromXYZ:Ev,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:kt},outputColorSpaceConfig:{drawingBufferColorSpace:kt}},[kt]:{primaries:e,whitePoint:i,transfer:rt,toXYZ:bv,fromXYZ:Ev,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:kt}}}),n}var Ze=HT();function Gi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function eo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Os,ql=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Os===void 0&&(Os=io("canvas")),Os.width=e.width,Os.height=e.height;let r=Os.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Os}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=io("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Gi(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Gi(t[i]/255)*255):t[i]=Gi(t[i]);return{data:t,width:e.width,height:e.height}}else return Se("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},zT=0,so=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zT++}),this.uuid=Kn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Hh(r[o].image)):s.push(Hh(r[o]))}else s=Hh(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function Hh(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ql.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Se("Texture: Unable to serialize Texture."),{})}var GT=0,zh=new R,_n=(()=>{class n extends Wi{constructor(t=n.DEFAULT_IMAGE,i=n.DEFAULT_MAPPING,r=Ln,s=Ln,o=wt,a=ei,c=In,l=vn,u=n.DEFAULT_ANISOTROPY,d=Yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:GT++}),this.uuid=Kn(),this.name="",this.source=new so(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=s,this.magFilter=o,this.minFilter=a,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=l,this.offset=new Ne(0,0),this.repeat=new Ne(1,1),this.center=new Ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(zh).x}get height(){return this.source.getSize(zh).y}get depth(){return this.source.getSize(zh).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let i in t){let r=t[i];if(r===void 0){Se(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}let s=this[i];if(s===void 0){Se(`Texture.setValues(): property '${i}' does not exist.`);continue}s&&r&&s.isVector2&&r.isVector2||s&&r&&s.isVector3&&r.isVector3||s&&r&&s.isMatrix3&&r.isMatrix3?s.copy(r):this[i]=r}}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==hp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case pi:t.x=t.x-Math.floor(t.x);break;case Ln:t.x=t.x<0?0:1;break;case to:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case pi:t.y=t.y-Math.floor(t.y);break;case Ln:t.y=t.y<0?0:1;break;case to:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}return n.DEFAULT_IMAGE=null,n.DEFAULT_MAPPING=hp,n.DEFAULT_ANISOTROPY=1,n})(),_t=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],h=c[5],g=c[9],y=c[2],p=c[6],m=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-y)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+y)<.1&&Math.abs(g+p)<.1&&Math.abs(l+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(l+1)/2,S=(h+1)/2,C=(m+1)/2,T=(u+f)/4,D=(d+y)/4,_=(g+p)/4;return b>S&&b>C?b<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(b),r=T/i,s=D/i):S>C?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=T/r,s=_/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=D/s,r=_/s),this.set(i,r,s,t),this}let M=Math.sqrt((p-g)*(p-g)+(d-y)*(d-y)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(d-y)/M,this.z=(f-u)/M,this.w=Math.acos((l+h+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Xl=class extends Wi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new _n(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:wt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new so(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},wn=class extends Xl{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},xa=class extends _n{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Yl=class extends _n{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Oe=class n{constructor(e,t,i,r,s,o,a,c,l,u,d,f,h,g,y,p){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,u,d,f,h,g,y,p)}set(e,t,i,r,s,o,a,c,l,u,d,f,h,g,y,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=d,m[14]=f,m[3]=h,m[7]=g,m[11]=y,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,i=e.elements,r=1/Us.setFromMatrixColumn(e,0).length(),s=1/Us.setFromMatrixColumn(e,1).length(),o=1/Us.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let f=o*u,h=o*d,g=a*u,y=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=h+g*l,t[5]=f-y*l,t[9]=-a*c,t[2]=y-f*l,t[6]=g+h*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*u,h=c*d,g=l*u,y=l*d;t[0]=f+y*a,t[4]=g*a-h,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-g,t[6]=y+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*u,h=c*d,g=l*u,y=l*d;t[0]=f-y*a,t[4]=-o*d,t[8]=g+h*a,t[1]=h+g*a,t[5]=o*u,t[9]=y-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*u,h=o*d,g=a*u,y=a*d;t[0]=c*u,t[4]=g*l-h,t[8]=f*l+y,t[1]=c*d,t[5]=y*l+f,t[9]=h*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,h=o*l,g=a*c,y=a*l;t[0]=c*u,t[4]=y-f*d,t[8]=g*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=h*d+g,t[10]=f-y*d}else if(e.order==="XZY"){let f=o*c,h=o*l,g=a*c,y=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+y,t[5]=o*u,t[9]=h*d-g,t[2]=g*d-h,t[6]=a*u,t[10]=y*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(WT,e,jT)}lookAt(e,t,i){let r=this.elements;return Sn.subVectors(e,t),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),or.crossVectors(i,Sn),or.lengthSq()===0&&(Math.abs(i.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),or.crossVectors(i,Sn)),or.normalize(),al.crossVectors(Sn,or),r[0]=or.x,r[4]=al.x,r[8]=Sn.x,r[1]=or.y,r[5]=al.y,r[9]=Sn.y,r[2]=or.z,r[6]=al.z,r[10]=Sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],d=i[5],f=i[9],h=i[13],g=i[2],y=i[6],p=i[10],m=i[14],M=i[3],b=i[7],S=i[11],C=i[15],T=r[0],D=r[4],_=r[8],E=r[12],W=r[1],A=r[5],F=r[9],U=r[13],G=r[2],B=r[6],H=r[10],O=r[14],Q=r[3],Z=r[7],le=r[11],pe=r[15];return s[0]=o*T+a*W+c*G+l*Q,s[4]=o*D+a*A+c*B+l*Z,s[8]=o*_+a*F+c*H+l*le,s[12]=o*E+a*U+c*O+l*pe,s[1]=u*T+d*W+f*G+h*Q,s[5]=u*D+d*A+f*B+h*Z,s[9]=u*_+d*F+f*H+h*le,s[13]=u*E+d*U+f*O+h*pe,s[2]=g*T+y*W+p*G+m*Q,s[6]=g*D+y*A+p*B+m*Z,s[10]=g*_+y*F+p*H+m*le,s[14]=g*E+y*U+p*O+m*pe,s[3]=M*T+b*W+S*G+C*Q,s[7]=M*D+b*A+S*B+C*Z,s[11]=M*_+b*F+S*H+C*le,s[15]=M*E+b*U+S*O+C*pe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],h=e[14],g=e[3],y=e[7],p=e[11],m=e[15],M=c*h-l*f,b=a*h-l*d,S=a*f-c*d,C=o*h-l*u,T=o*f-c*u,D=o*d-a*u;return t*(y*M-p*b+m*S)-i*(g*M-p*C+m*T)+r*(g*b-y*C+m*D)-s*(g*S-y*T+p*D)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],h=e[11],g=e[12],y=e[13],p=e[14],m=e[15],M=t*a-i*o,b=t*c-r*o,S=t*l-s*o,C=i*c-r*a,T=i*l-s*a,D=r*l-s*c,_=u*y-d*g,E=u*p-f*g,W=u*m-h*g,A=d*p-f*y,F=d*m-h*y,U=f*m-h*p,G=M*U-b*F+S*A+C*W-T*E+D*_;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/G;return e[0]=(a*U-c*F+l*A)*B,e[1]=(r*F-i*U-s*A)*B,e[2]=(y*D-p*T+m*C)*B,e[3]=(f*T-d*D-h*C)*B,e[4]=(c*W-o*U-l*E)*B,e[5]=(t*U-r*W+s*E)*B,e[6]=(p*S-g*D-m*b)*B,e[7]=(u*D-f*S+h*b)*B,e[8]=(o*F-a*W+l*_)*B,e[9]=(i*W-t*F-s*_)*B,e[10]=(g*T-y*S+m*M)*B,e[11]=(d*S-u*T-h*M)*B,e[12]=(a*E-o*A-c*_)*B,e[13]=(t*A-i*E+r*_)*B,e[14]=(y*b-g*C-p*M)*B,e[15]=(u*C-d*b+f*M)*B,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,d=a+a,f=s*l,h=s*u,g=s*d,y=o*u,p=o*d,m=a*d,M=c*l,b=c*u,S=c*d,C=i.x,T=i.y,D=i.z;return r[0]=(1-(y+m))*C,r[1]=(h+S)*C,r[2]=(g-b)*C,r[3]=0,r[4]=(h-S)*T,r[5]=(1-(f+m))*T,r[6]=(p+M)*T,r[7]=0,r[8]=(g+b)*D,r[9]=(p-M)*D,r[10]=(1-(f+y))*D,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let o=Us.set(r[0],r[1],r[2]).length(),a=Us.set(r[4],r[5],r[6]).length(),c=Us.set(r[8],r[9],r[10]).length();s<0&&(o=-o),$n.copy(this);let l=1/o,u=1/a,d=1/c;return $n.elements[0]*=l,$n.elements[1]*=l,$n.elements[2]*=l,$n.elements[4]*=u,$n.elements[5]*=u,$n.elements[6]*=u,$n.elements[8]*=d,$n.elements[9]*=d,$n.elements[10]*=d,t.setFromRotationMatrix($n),i.x=o,i.y=a,i.z=c,this}makePerspective(e,t,i,r,s,o,a=Zn,c=!1){let l=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r),g,y;if(c)g=s/(o-s),y=o*s/(o-s);else if(a===Zn)g=-(o+s)/(o-s),y=-2*o*s/(o-s);else if(a===no)g=-o/(o-s),y=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Zn,c=!1){let l=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),h=-(i+r)/(i-r),g,y;if(c)g=1/(o-s),y=o/(o-s);else if(a===Zn)g=-2/(o-s),y=-(o+s)/(o-s);else if(a===no)g=-1/(o-s),y=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Us=new R,$n=new Oe,WT=new R(0,0,0),jT=new R(1,1,1),or=new R,al=new R,Sn=new R,wv=new Oe,Tv=new En,hr=(()=>{class n{constructor(t=0,i=0,r=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,s=this._order){return this._x=t,this._y=i,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let s=t.elements,o=s[0],a=s[4],c=s[8],l=s[1],u=s[5],d=s[9],f=s[2],h=s[6],g=s[10];switch(i){case"XYZ":this._y=Math.asin(Ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(c,g),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-Ke(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(c,g));break;case"XZY":this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-d,g),this._y=0);break;default:Se("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return wv.makeRotationFromQuaternion(t),this.setFromRotationMatrix(wv,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return Tv.setFromEuler(this),this.setFromQuaternion(Tv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return n.DEFAULT_ORDER="XYZ",n})(),oo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},$T=0,Cv=new R,ks=new En,Oi=new Oe,cl=new R,sa=new R,qT=new R,XT=new En,Av=new R(1,0,0),Dv=new R(0,1,0),Iv=new R(0,0,1),Rv={type:"added"},YT={type:"removed"},Bs={type:"childadded",child:null},Gh={type:"childremoved",child:null},Nt=(()=>{class n extends Wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$T++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new R,i=new hr,r=new En,s=new R(1,1,1);function o(){r.setFromEuler(i,!1)}function a(){i.setFromQuaternion(r,void 0,!1)}i._onChange(o),r._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Oe},normalMatrix:{value:new Be}}),this.matrix=new Oe,this.matrixWorld=new Oe,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new oo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return ks.setFromAxisAngle(t,i),this.quaternion.multiply(ks),this}rotateOnWorldAxis(t,i){return ks.setFromAxisAngle(t,i),this.quaternion.premultiply(ks),this}rotateX(t){return this.rotateOnAxis(Av,t)}rotateY(t){return this.rotateOnAxis(Dv,t)}rotateZ(t){return this.rotateOnAxis(Iv,t)}translateOnAxis(t,i){return Cv.copy(t).applyQuaternion(this.quaternion),this.position.add(Cv.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(Av,t)}translateY(t){return this.translateOnAxis(Dv,t)}translateZ(t){return this.translateOnAxis(Iv,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Oi.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?cl.copy(t):cl.set(t,i,r);let s=this.parent;this.updateWorldMatrix(!0,!1),sa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Oi.lookAt(sa,cl,this.up):Oi.lookAt(cl,sa,this.up),this.quaternion.setFromRotationMatrix(Oi),s&&(Oi.extractRotation(s.matrixWorld),ks.setFromRotationMatrix(Oi),this.quaternion.premultiply(ks.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Ce("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Rv),Bs.child=t,this.dispatchEvent(Bs),Bs.child=null):Ce("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(YT),Gh.child=t,this.dispatchEvent(Gh),Gh.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Oi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Oi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Oi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Rv),Bs.child=t,this.dispatchEvent(Bs),Bs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,s=this.children.length;r<s;r++){let a=this.children[r].getObjectByProperty(t,i);if(a!==void 0)return a}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sa,t,qT),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sa,XT,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let i=t.x,r=t.y,s=t.z,o=this.matrix.elements;o[12]+=i-o[0]*i-o[4]*r-o[8]*s,o[13]+=r-o[1]*i-o[5]*r-o[9]*s,o[14]+=s-o[2]*i-o[6]*r-o[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>Un(sn({},c),{boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>sn({},c)),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function o(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let l=c.shapes;if(Array.isArray(l))for(let u=0,d=l.length;u<d;u++){let f=l[u];o(t.shapes,f)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let l=0,u=this.material.length;l<u;l++)c.push(o(t.materials,this.material[l]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){let l=this.animations[c];s.animations.push(o(t.animations,l))}}if(i){let c=a(t.geometries),l=a(t.materials),u=a(t.textures),d=a(t.images),f=a(t.shapes),h=a(t.skeletons),g=a(t.animations),y=a(t.nodes);c.length>0&&(r.geometries=c),l.length>0&&(r.materials=l),u.length>0&&(r.textures=u),d.length>0&&(r.images=d),f.length>0&&(r.shapes=f),h.length>0&&(r.skeletons=h),g.length>0&&(r.animations=g),y.length>0&&(r.nodes=y)}return r.object=s,r;function a(c){let l=[];for(let u in c){let d=c[u];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let s=t.children[r];this.add(s.clone())}return this}}return n.DEFAULT_UP=new R(0,1,0),n.DEFAULT_MATRIX_AUTO_UPDATE=!0,n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,n})(),$t=class extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}},ZT={type:"move"},ao=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let y of e.hand.values()){let p=t.getJointPose(y,i),m=this._getHandJoint(l,y);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,g=.005;l.inputState.pinching&&f>h+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=h-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ZT)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new $t;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},z_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ar={h:0,s:0,l:0},ll={h:0,s:0,l:0};function Wh(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var we=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ze.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Ze.workingColorSpace){if(e=$p(e,1),t=Ke(t,0,1),i=Ke(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Wh(o,s,e+1/3),this.g=Wh(o,s,e),this.b=Wh(o,s,e-1/3)}return Ze.colorSpaceToWorking(this,r),this}setStyle(e,t=kt){function i(s){s!==void 0&&parseFloat(s)<1&&Se("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Se("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Se("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){let i=z_[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Se("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gi(e.r),this.g=Gi(e.g),this.b=Gi(e.b),this}copyLinearToSRGB(e){return this.r=eo(e.r),this.g=eo(e.g),this.b=eo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return Ze.workingToColorSpace(nn.copy(this),e),Math.round(Ke(nn.r*255,0,255))*65536+Math.round(Ke(nn.g*255,0,255))*256+Math.round(Ke(nn.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(nn.copy(this),t);let i=nn.r,r=nn.g,s=nn.b,o=Math.max(i,r,s),a=Math.min(i,r,s),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(nn.copy(this),t),e.r=nn.r,e.g=nn.g,e.b=nn.b,e}getStyle(e=kt){Ze.workingToColorSpace(nn.copy(this),e);let t=nn.r,i=nn.g,r=nn.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ar),this.setHSL(ar.h+e,ar.s+t,ar.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ar),e.getHSL(ll);let i=ga(ar.h,ll.h,t),r=ga(ar.s,ll.s,t),s=ga(ar.l,ll.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},nn=new we;we.NAMES=z_;var Ma=class n{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new we(e),this.density=t}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Sa=class extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hr,this.environmentIntensity=1,this.environmentRotation=new hr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},qn=new R,Ui=new R,jh=new R,ki=new R,Vs=new R,Hs=new R,Nv=new R,$h=new R,qh=new R,Xh=new R,Yh=new _t,Zh=new _t,Kh=new _t,zi=class n{constructor(e=new R,t=new R,i=new R){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),qn.subVectors(e,t),r.cross(qn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){qn.subVectors(r,t),Ui.subVectors(i,t),jh.subVectors(e,t);let o=qn.dot(qn),a=qn.dot(Ui),c=qn.dot(jh),l=Ui.dot(Ui),u=Ui.dot(jh),d=o*l-a*a;if(d===0)return s.set(0,0,0),null;let f=1/d,h=(l*c-a*u)*f,g=(o*u-a*c)*f;return s.set(1-h-g,g,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,ki)===null?!1:ki.x>=0&&ki.y>=0&&ki.x+ki.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,ki)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ki.x),c.addScaledVector(o,ki.y),c.addScaledVector(a,ki.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return Yh.setScalar(0),Zh.setScalar(0),Kh.setScalar(0),Yh.fromBufferAttribute(e,t),Zh.fromBufferAttribute(e,i),Kh.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Yh,s.x),o.addScaledVector(Zh,s.y),o.addScaledVector(Kh,s.z),o}static isFrontFacing(e,t,i,r){return qn.subVectors(i,t),Ui.subVectors(e,t),qn.cross(Ui).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qn.subVectors(this.c,this.b),Ui.subVectors(this.a,this.b),qn.cross(Ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;Vs.subVectors(r,i),Hs.subVectors(s,i),$h.subVectors(e,i);let c=Vs.dot($h),l=Hs.dot($h);if(c<=0&&l<=0)return t.copy(i);qh.subVectors(e,r);let u=Vs.dot(qh),d=Hs.dot(qh);if(u>=0&&d<=u)return t.copy(r);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(i).addScaledVector(Vs,o);Xh.subVectors(e,s);let h=Vs.dot(Xh),g=Hs.dot(Xh);if(g>=0&&h<=g)return t.copy(s);let y=h*l-c*g;if(y<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(Hs,a);let p=u*g-h*d;if(p<=0&&d-u>=0&&h-g>=0)return Nv.subVectors(s,r),a=(d-u)/(d-u+(h-g)),t.copy(r).addScaledVector(Nv,a);let m=1/(p+y+f);return o=y*m,a=f*m,t.copy(i).addScaledVector(Vs,o).addScaledVector(Hs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Tn=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Xn):Xn.fromBufferAttribute(s,o),Xn.applyMatrix4(e.matrixWorld),this.expandByPoint(Xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ul.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ul.copy(i.boundingBox)),ul.applyMatrix4(e.matrixWorld),this.union(ul)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xn),Xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(oa),dl.subVectors(this.max,oa),zs.subVectors(e.a,oa),Gs.subVectors(e.b,oa),Ws.subVectors(e.c,oa),cr.subVectors(Gs,zs),lr.subVectors(Ws,Gs),Vr.subVectors(zs,Ws);let t=[0,-cr.z,cr.y,0,-lr.z,lr.y,0,-Vr.z,Vr.y,cr.z,0,-cr.x,lr.z,0,-lr.x,Vr.z,0,-Vr.x,-cr.y,cr.x,0,-lr.y,lr.x,0,-Vr.y,Vr.x,0];return!Jh(t,zs,Gs,Ws,dl)||(t=[1,0,0,0,1,0,0,0,1],!Jh(t,zs,Gs,Ws,dl))?!1:(fl.crossVectors(cr,lr),t=[fl.x,fl.y,fl.z],Jh(t,zs,Gs,Ws,dl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Bi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Bi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Bi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Bi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Bi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Bi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Bi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Bi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Bi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Bi=[new R,new R,new R,new R,new R,new R,new R,new R],Xn=new R,ul=new Tn,zs=new R,Gs=new R,Ws=new R,cr=new R,lr=new R,Vr=new R,oa=new R,dl=new R,fl=new R,Hr=new R;function Jh(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Hr.fromArray(n,s);let a=r.x*Math.abs(Hr.x)+r.y*Math.abs(Hr.y)+r.z*Math.abs(Hr.z),c=e.dot(Hr),l=t.dot(Hr),u=i.dot(Hr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var Ft=new R,hl=new Ne,KT=0,Ut=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:KT++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=$l,this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)hl.fromBufferAttribute(this,t),hl.applyMatrix3(e),this.setXY(t,hl.x,hl.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Yn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=lt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),r=lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),r=lt(r,this.array),s=lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$l&&(e.usage=this.usage),e}};var ba=class extends Ut{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Ea=class extends Ut{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var It=class extends Ut{constructor(e,t,i){super(new Float32Array(e),t,i)}},JT=new Tn,aa=new R,Qh=new R,pn=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):JT.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;aa.subVectors(e,this.center);let t=aa.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(aa,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(aa.copy(e.center).add(Qh)),this.expandByPoint(aa.copy(e.center).sub(Qh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},QT=0,Pn=new Oe,ep=new Nt,js=new R,bn=new Tn,ca=new Tn,jt=new R,qt=class n extends Wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:QT++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(bT(e)?Ea:ba)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Be().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Pn.makeRotationFromQuaternion(e),this.applyMatrix4(Pn),this}rotateX(e){return Pn.makeRotationX(e),this.applyMatrix4(Pn),this}rotateY(e){return Pn.makeRotationY(e),this.applyMatrix4(Pn),this}rotateZ(e){return Pn.makeRotationZ(e),this.applyMatrix4(Pn),this}translate(e,t,i){return Pn.makeTranslation(e,t,i),this.applyMatrix4(Pn),this}scale(e,t,i){return Pn.makeScale(e,t,i),this.applyMatrix4(Pn),this}lookAt(e){return ep.lookAt(e),ep.updateMatrix(),this.applyMatrix4(ep.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(js).negate(),this.translate(js.x,js.y,js.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new It(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Se("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Tn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ce("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];bn.setFromBufferAttribute(s),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ce('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ce("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let i=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];ca.setFromBufferAttribute(a),this.morphTargetsRelative?(jt.addVectors(bn.min,ca.min),bn.expandByPoint(jt),jt.addVectors(bn.max,ca.max),bn.expandByPoint(jt)):(bn.expandByPoint(ca.min),bn.expandByPoint(ca.max))}bn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)jt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(jt));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)jt.fromBufferAttribute(a,l),c&&(js.fromBufferAttribute(e,l),jt.add(js)),r=Math.max(r,i.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ce('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ce("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ut(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let _=0;_<i.count;_++)a[_]=new R,c[_]=new R;let l=new R,u=new R,d=new R,f=new Ne,h=new Ne,g=new Ne,y=new R,p=new R;function m(_,E,W){l.fromBufferAttribute(i,_),u.fromBufferAttribute(i,E),d.fromBufferAttribute(i,W),f.fromBufferAttribute(s,_),h.fromBufferAttribute(s,E),g.fromBufferAttribute(s,W),u.sub(l),d.sub(l),h.sub(f),g.sub(f);let A=1/(h.x*g.y-g.x*h.y);isFinite(A)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(d,-h.y).multiplyScalar(A),p.copy(d).multiplyScalar(h.x).addScaledVector(u,-g.x).multiplyScalar(A),a[_].add(y),a[E].add(y),a[W].add(y),c[_].add(p),c[E].add(p),c[W].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let _=0,E=M.length;_<E;++_){let W=M[_],A=W.start,F=W.count;for(let U=A,G=A+F;U<G;U+=3)m(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let b=new R,S=new R,C=new R,T=new R;function D(_){C.fromBufferAttribute(r,_),T.copy(C);let E=a[_];b.copy(E),b.sub(C.multiplyScalar(C.dot(E))).normalize(),S.crossVectors(T,E);let A=S.dot(c[_])<0?-1:1;o.setXYZW(_,b.x,b.y,b.z,A)}for(let _=0,E=M.length;_<E;++_){let W=M[_],A=W.start,F=W.count;for(let U=A,G=A+F;U<G;U+=3)D(e.getX(U+0)),D(e.getX(U+1)),D(e.getX(U+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ut(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);let r=new R,s=new R,o=new R,a=new R,c=new R,l=new R,u=new R,d=new R;if(e)for(let f=0,h=e.count;f<h;f+=3){let g=e.getX(f+0),y=e.getX(f+1),p=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,y),o.fromBufferAttribute(t,p),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,y),l.fromBufferAttribute(i,p),a.add(u),c.add(u),l.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(y,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)jt.fromBufferAttribute(e,t),jt.normalize(),e.setXYZ(t,jt.x,jt.y,jt.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u),h=0,g=0;for(let y=0,p=c.length;y<p;y++){a.isInterleavedBufferAttribute?h=c[y]*a.data.stride+a.offset:h=c[y]*u;for(let m=0;m<u;m++)f[g++]=l[h++]}return new Ut(f,u,d)}if(this.index===null)return Se("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,i);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let u=0,d=l.length;u<d;u++){let f=l[u],h=e(f,i);c.push(h)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){let h=l[d];u.push(h.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],d=s[l];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=$l,this.updateRanges=[],this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},an=new R,pr=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)an.fromBufferAttribute(this,t),an.applyMatrix4(e),this.setXYZ(t,an.x,an.y,an.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)an.fromBufferAttribute(this,t),an.applyNormalMatrix(e),this.setXYZ(t,an.x,an.y,an.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)an.fromBufferAttribute(this,t),an.transformDirection(e),this.setXYZ(t,an.x,an.y,an.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Yn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=lt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Yn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),r=lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),i=lt(i,this.array),r=lt(r,this.array),s=lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){va("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Ut(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){va("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},eC=0,cn=class extends Wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:eC++}),this.uuid=Kn(),this.name="",this.type="Material",this.blending=jr,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ul,this.blendDst=kl,this.blendEquation=fr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=$r,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wr,this.stencilZFail=Wr,this.stencilZPass=Wr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Se(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Se(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==jr&&(i.blending=this.blending),this.side!==Jn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ul&&(i.blendSrc=this.blendSrc),this.blendDst!==kl&&(i.blendDst=this.blendDst),this.blendEquation!==fr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==$r&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Wr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Wr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},co=class extends cn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},$s,la=new R,qs=new R,Xs=new R,Ys=new Ne,ua=new Ne,G_=new Oe,pl=new R,da=new R,ml=new R,Pv=new Ne,tp=new Ne,Lv=new Ne,wa=class extends Nt{constructor(e=new co){if(super(),this.isSprite=!0,this.type="Sprite",$s===void 0){$s=new qt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Zr(t,5);$s.setIndex([0,1,2,0,2,3]),$s.setAttribute("position",new pr(i,3,0,!1)),$s.setAttribute("uv",new pr(i,2,3,!1))}this.geometry=$s,this.material=e,this.center=new Ne(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ce('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),qs.setFromMatrixScale(this.matrixWorld),G_.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Xs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&qs.multiplyScalar(-Xs.z);let i=this.material.rotation,r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));let o=this.center;gl(pl.set(-.5,-.5,0),Xs,o,qs,r,s),gl(da.set(.5,-.5,0),Xs,o,qs,r,s),gl(ml.set(.5,.5,0),Xs,o,qs,r,s),Pv.set(0,0),tp.set(1,0),Lv.set(1,1);let a=e.ray.intersectTriangle(pl,da,ml,!1,la);if(a===null&&(gl(da.set(-.5,.5,0),Xs,o,qs,r,s),tp.set(0,1),a=e.ray.intersectTriangle(pl,ml,da,!1,la),a===null))return;let c=e.ray.origin.distanceTo(la);c<e.near||c>e.far||t.push({distance:c,point:la.clone(),uv:zi.getInterpolation(la,pl,da,ml,Pv,tp,Lv,new Ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function gl(n,e,t,i,r,s){Ys.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(ua.x=s*Ys.x-r*Ys.y,ua.y=r*Ys.x+s*Ys.y):ua.copy(Ys),n.copy(e),n.x+=ua.x,n.y+=ua.y,n.applyMatrix4(G_)}var Vi=new R,np=new R,yl=new R,ur=new R,ip=new R,vl=new R,rp=new R,mr=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Vi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Vi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Vi.copy(this.origin).addScaledVector(this.direction,t),Vi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){np.copy(e).add(t).multiplyScalar(.5),yl.copy(t).sub(e).normalize(),ur.copy(this.origin).sub(np);let s=e.distanceTo(t)*.5,o=-this.direction.dot(yl),a=ur.dot(this.direction),c=-ur.dot(yl),l=ur.lengthSq(),u=Math.abs(1-o*o),d,f,h,g;if(u>0)if(d=o*c-a,f=o*a-c,g=s*u,d>=0)if(f>=-g)if(f<=g){let y=1/u;d*=y,f*=y,h=d*(d+o*f+2*a)+f*(o*d+f+2*c)+l}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-s,-c),s),h=f*(f+2*c)+l):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(np).addScaledVector(yl,f),h}intersectSphere(e,t){Vi.subVectors(e.center,this.origin);let i=Vi.dot(this.direction),r=Vi.dot(Vi)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Vi)!==null}intersectTriangle(e,t,i,r,s){ip.subVectors(t,e),vl.subVectors(i,e),rp.crossVectors(ip,vl);let o=this.direction.dot(rp),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ur.subVectors(this.origin,e);let c=a*this.direction.dot(vl.crossVectors(ur,vl));if(c<0)return null;let l=a*this.direction.dot(ip.cross(ur));if(l<0||c+l>o)return null;let u=-a*ur.dot(rp);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Cn=class extends cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hr,this.combine=Ip,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Fv=new Oe,zr=new mr,_l=new pn,Ov=new R,xl=new R,Ml=new R,Sl=new R,sp=new R,bl=new R,Uv=new R,El=new R,mt=class extends Nt{constructor(e=new qt,t=new Cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){bl.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=a[c],d=s[c];u!==0&&(sp.fromBufferAttribute(d,e),o?bl.addScaledVector(sp,u):bl.addScaledVector(sp.sub(t),u))}t.add(bl)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_l.copy(i.boundingSphere),_l.applyMatrix4(s),zr.copy(e.ray).recast(e.near),!(_l.containsPoint(zr.origin)===!1&&(zr.intersectSphere(_l,Ov)===null||zr.origin.distanceToSquared(Ov)>(e.far-e.near)**2))&&(Fv.copy(s).invert(),zr.copy(e.ray).applyMatrix4(Fv),!(i.boundingBox!==null&&zr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,zr)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let p=f[g],m=o[p.materialIndex],M=Math.max(p.start,h.start),b=Math.min(a.count,Math.min(p.start+p.count,h.start+h.count));for(let S=M,C=b;S<C;S+=3){let T=a.getX(S),D=a.getX(S+1),_=a.getX(S+2);r=wl(this,m,e,i,l,u,d,T,D,_),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),y=Math.min(a.count,h.start+h.count);for(let p=g,m=y;p<m;p+=3){let M=a.getX(p),b=a.getX(p+1),S=a.getX(p+2);r=wl(this,o,e,i,l,u,d,M,b,S),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let p=f[g],m=o[p.materialIndex],M=Math.max(p.start,h.start),b=Math.min(c.count,Math.min(p.start+p.count,h.start+h.count));for(let S=M,C=b;S<C;S+=3){let T=S,D=S+1,_=S+2;r=wl(this,m,e,i,l,u,d,T,D,_),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let g=Math.max(0,h.start),y=Math.min(c.count,h.start+h.count);for(let p=g,m=y;p<m;p+=3){let M=p,b=p+1,S=p+2;r=wl(this,o,e,i,l,u,d,M,b,S),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}};function tC(n,e,t,i,r,s,o,a){let c;if(e.side===ln?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===Jn,a),c===null)return null;El.copy(a),El.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(El);return l<t.near||l>t.far?null:{distance:l,point:El.clone(),object:n}}function wl(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,xl),n.getVertexPosition(c,Ml),n.getVertexPosition(l,Sl);let u=tC(n,e,t,i,xl,Ml,Sl,Uv);if(u){let d=new R;zi.getBarycoord(Uv,xl,Ml,Sl,d),r&&(u.uv=zi.getInterpolatedAttribute(r,a,c,l,d,new Ne)),s&&(u.uv1=zi.getInterpolatedAttribute(s,a,c,l,d,new Ne)),o&&(u.normal=zi.getInterpolatedAttribute(o,a,c,l,d,new R),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new R,materialIndex:0};zi.getNormal(xl,Ml,Sl,f.normal),u.face=f,u.barycoord=d}return u}var kv=new R,Bv=new _t,Vv=new _t,nC=new R,Hv=new Oe,Tl=new R,op=new pn,zv=new Oe,ap=new mr,Ta=class extends mt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=fp,this.bindMatrix=new Oe,this.bindMatrixInverse=new Oe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Tn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Tl),this.boundingBox.expandByPoint(Tl)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new pn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Tl),this.boundingSphere.expandByPoint(Tl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,r=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),op.copy(this.boundingSphere),op.applyMatrix4(r),e.ray.intersectsSphere(op)!==!1&&(zv.copy(r).invert(),ap.copy(e.ray).applyMatrix4(zv),!(this.boundingBox!==null&&ap.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ap)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new _t,t=this.geometry.attributes.skinWeight;for(let i=0,r=t.count;i<r;i++){e.fromBufferAttribute(t,i);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===fp?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===A_?this.bindMatrixInverse.copy(this.bindMatrix).invert():Se("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,r=this.geometry;Bv.fromBufferAttribute(r.attributes.skinIndex,e),Vv.fromBufferAttribute(r.attributes.skinWeight,e),kv.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let o=Vv.getComponent(s);if(o!==0){let a=Bv.getComponent(s);Hv.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),t.addScaledVector(nC.copy(kv).applyMatrix4(Hv),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},lo=class extends Nt{constructor(){super(),this.isBone=!0,this.type="Bone"}},uo=class extends _n{constructor(e=null,t=1,i=1,r,s,o,a,c,l=Rt,u=Rt,d,f){super(null,o,a,c,l,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Gv=new Oe,iC=new Oe,Ca=class n{constructor(e=[],t=[]){this.uuid=Kn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Se("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,r=this.bones.length;i<r;i++)this.boneInverses.push(new Oe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let i=new Oe;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,t=this.boneInverses,i=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){let a=e[s]?e[s].matrixWorld:iC;Gv.multiplyMatrices(a,t[s]),Gv.toArray(i,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new n(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let i=new uo(t,e,e,In,Dn);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,r=e.bones.length;i<r;i++){let s=e.bones[i],o=t[s];o===void 0&&(Se("Skeleton: No bone found with UUID:",s),o=new lo),this.bones.push(o),this.boneInverses.push(new Oe().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,i=this.boneInverses;for(let r=0,s=t.length;r<s;r++){let o=t[r];e.bones.push(o.uuid);let a=i[r];e.boneInverses.push(a.toArray())}return e}},gr=class extends Ut{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Zs=new Oe,Wv=new Oe,Cl=[],jv=new Tn,rC=new Oe,fa=new mt,ha=new pn,Aa=class extends mt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new gr(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,rC)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Tn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Zs),jv.copy(e.boundingBox).applyMatrix4(Zs),this.boundingBox.union(jv)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new pn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Zs),ha.copy(e.boundingSphere).applyMatrix4(Zs),this.boundingSphere.union(ha)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(fa.geometry=this.geometry,fa.material=this.material,fa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ha.copy(this.boundingSphere),ha.applyMatrix4(i),e.ray.intersectsSphere(ha)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Zs),Wv.multiplyMatrices(i,Zs),fa.matrixWorld=Wv,fa.raycast(e,Cl);for(let o=0,a=Cl.length;o<a;o++){let c=Cl[o];c.instanceId=s,c.object=this,t.push(c)}Cl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new gr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new uo(new Float32Array(r*this.count),r,this.count,_u,Dn));let s=this.morphTexture.source.data.data,o=0;for(let l=0;l<i.length;l++)o+=i[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=r*e;s[c]=a,s.set(i,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},cp=new R,sC=new R,oC=new Be,fi=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=cp.subVectors(i,t).cross(sC.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(cp),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||oC.getNormalMatrix(e),r=this.coplanarPoint(cp).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Gr=new pn,aC=new Ne(.5,.5),Al=new R,fo=class{constructor(e=new fi,t=new fi,i=new fi,r=new fi,s=new fi,o=new fi){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Zn,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],d=s[5],f=s[6],h=s[7],g=s[8],y=s[9],p=s[10],m=s[11],M=s[12],b=s[13],S=s[14],C=s[15];if(r[0].setComponents(l-o,h-u,m-g,C-M).normalize(),r[1].setComponents(l+o,h+u,m+g,C+M).normalize(),r[2].setComponents(l+a,h+d,m+y,C+b).normalize(),r[3].setComponents(l-a,h-d,m-y,C-b).normalize(),i)r[4].setComponents(c,f,p,S).normalize(),r[5].setComponents(l-c,h-f,m-p,C-S).normalize();else if(r[4].setComponents(l-c,h-f,m-p,C-S).normalize(),t===Zn)r[5].setComponents(l+c,h+f,m+p,C+S).normalize();else if(t===no)r[5].setComponents(c,f,p,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Gr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Gr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Gr)}intersectsSprite(e){Gr.center.set(0,0,0);let t=aC.distanceTo(e.center);return Gr.radius=.7071067811865476+t,Gr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Gr)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Al.x=r.normal.x>0?e.max.x:e.min.x,Al.y=r.normal.y>0?e.max.y:e.min.y,Al.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Al)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ho=class extends cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new we(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Zl=new R,Kl=new R,$v=new Oe,pa=new mr,Dl=new pn,lp=new R,qv=new R,Kr=class extends Nt{constructor(e=new qt,t=new ho){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Zl.fromBufferAttribute(t,r-1),Kl.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Zl.distanceTo(Kl);e.setAttribute("lineDistance",new It(i,1))}else Se("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Dl.copy(i.boundingSphere),Dl.applyMatrix4(r),Dl.radius+=s,e.ray.intersectsSphere(Dl)===!1)return;$v.copy(r).invert(),pa.copy(e.ray).applyMatrix4($v);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){let h=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let y=h,p=g-1;y<p;y+=l){let m=u.getX(y),M=u.getX(y+1),b=Il(this,e,pa,c,m,M,y);b&&t.push(b)}if(this.isLineLoop){let y=u.getX(g-1),p=u.getX(h),m=Il(this,e,pa,c,y,p,g-1);m&&t.push(m)}}else{let h=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let y=h,p=g-1;y<p;y+=l){let m=Il(this,e,pa,c,y,y+1,y);m&&t.push(m)}if(this.isLineLoop){let y=Il(this,e,pa,c,g-1,h,g-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Il(n,e,t,i,r,s,o){let a=n.geometry.attributes.position;if(Zl.fromBufferAttribute(a,r),Kl.fromBufferAttribute(a,s),t.distanceSqToSegment(Zl,Kl,lp,qv)>i)return;lp.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(lp);if(!(l<e.near||l>e.far))return{distance:l,point:qv.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}var Xv=new R,Yv=new R,Da=class extends Kr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Xv.fromBufferAttribute(t,r),Yv.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Xv.distanceTo(Yv);e.setAttribute("lineDistance",new It(i,1))}else Se("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ia=class extends Kr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},po=class extends cn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Zv=new Oe,_p=new mr,Rl=new pn,Nl=new R,Ra=class extends Nt{constructor(e=new qt,t=new po){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Rl.copy(i.boundingSphere),Rl.applyMatrix4(r),Rl.radius+=s,e.ray.intersectsSphere(Rl)===!1)return;Zv.copy(r).invert(),_p.copy(e.ray).applyMatrix4(Zv);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,d=i.attributes.position;if(l!==null){let f=Math.max(0,o.start),h=Math.min(l.count,o.start+o.count);for(let g=f,y=h;g<y;g++){let p=l.getX(g);Nl.fromBufferAttribute(d,p),Kv(Nl,p,c,r,e,t,this)}}else{let f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let g=f,y=h;g<y;g++)Nl.fromBufferAttribute(d,g),Kv(Nl,g,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Kv(n,e,t,i,r,s,o){let a=_p.distanceSqToPoint(n);if(a<t){let c=new R;_p.closestPointToPoint(n,c),c.applyMatrix4(i);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Na=class extends _n{constructor(e=[],t=xr,i,r,s,o,a,c,l,u){super(e,t,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Jr=class extends _n{constructor(e,t,i,r,s,o,a,c,l){super(e,t,i,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},yr=class extends _n{constructor(e,t,i=ti,r,s,o,a=Rt,c=Rt,l,u=mi,d=1){if(u!==mi&&u!==Mr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new so(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Jl=class extends yr{constructor(e,t=ti,i=xr,r,s,o=Rt,a=Rt,c,l=mi){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Pa=class extends _n{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},et=class n extends qt{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],u=[],d=[],f=0,h=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new It(l,3)),this.setAttribute("normal",new It(u,3)),this.setAttribute("uv",new It(d,2));function g(y,p,m,M,b,S,C,T,D,_,E){let W=S/D,A=C/_,F=S/2,U=C/2,G=T/2,B=D+1,H=_+1,O=0,Q=0,Z=new R;for(let le=0;le<H;le++){let pe=le*A-U;for(let de=0;de<B;de++){let He=de*W-F;Z[y]=He*M,Z[p]=pe*b,Z[m]=G,l.push(Z.x,Z.y,Z.z),Z[y]=0,Z[p]=0,Z[m]=T>0?1:-1,u.push(Z.x,Z.y,Z.z),d.push(de/D),d.push(1-le/_),O+=1}}for(let le=0;le<_;le++)for(let pe=0;pe<D;pe++){let de=f+pe+B*le,He=f+pe+B*(le+1),St=f+(pe+1)+B*(le+1),xt=f+(pe+1)+B*le;c.push(de,He,xt),c.push(He,St,xt),Q+=6}a.addGroup(h,Q,E),h+=Q,f+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var mn=class n extends qt{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let u=[],d=[],f=[],h=[],g=0,y=[],p=i/2,m=0;M(),o===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new It(d,3)),this.setAttribute("normal",new It(f,3)),this.setAttribute("uv",new It(h,2));function M(){let S=new R,C=new R,T=0,D=(t-e)/i;for(let _=0;_<=s;_++){let E=[],W=_/s,A=W*(t-e)+e;for(let F=0;F<=r;F++){let U=F/r,G=U*c+a,B=Math.sin(G),H=Math.cos(G);C.x=A*B,C.y=-W*i+p,C.z=A*H,d.push(C.x,C.y,C.z),S.set(B,D,H).normalize(),f.push(S.x,S.y,S.z),h.push(U,1-W),E.push(g++)}y.push(E)}for(let _=0;_<r;_++)for(let E=0;E<s;E++){let W=y[E][_],A=y[E+1][_],F=y[E+1][_+1],U=y[E][_+1];(e>0||E!==0)&&(u.push(W,A,U),T+=3),(t>0||E!==s-1)&&(u.push(A,F,U),T+=3)}l.addGroup(m,T,0),m+=T}function b(S){let C=g,T=new Ne,D=new R,_=0,E=S===!0?e:t,W=S===!0?1:-1;for(let F=1;F<=r;F++)d.push(0,p*W,0),f.push(0,W,0),h.push(.5,.5),g++;let A=g;for(let F=0;F<=r;F++){let G=F/r*c+a,B=Math.cos(G),H=Math.sin(G);D.x=E*H,D.y=p*W,D.z=E*B,d.push(D.x,D.y,D.z),f.push(0,W,0),T.x=B*.5+.5,T.y=H*.5*W+.5,h.push(T.x,T.y),g++}for(let F=0;F<r;F++){let U=C+F,G=A+F;S===!0?u.push(G,G+1,U):u.push(G+1,G,U),_+=3}l.addGroup(m,_,S===!0?1:2),m+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},La=class n extends mn{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var ji=class n extends qt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,d=e/a,f=t/c,h=[],g=[],y=[],p=[];for(let m=0;m<u;m++){let M=m*f-o;for(let b=0;b<l;b++){let S=b*d-s;g.push(S,-M,0),y.push(0,0,1),p.push(b/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let M=0;M<a;M++){let b=M+l*m,S=M+l*(m+1),C=M+1+l*(m+1),T=M+1+l*m;h.push(b,S,T),h.push(S,C,T)}this.setIndex(h),this.setAttribute("position",new It(g,3)),this.setAttribute("normal",new It(y,3)),this.setAttribute("uv",new It(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var mo=class n extends qt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,u=[],d=new R,f=new R,h=[],g=[],y=[],p=[];for(let m=0;m<=i;m++){let M=[],b=m/i,S=0;m===0&&o===0?S=.5/t:m===i&&c===Math.PI&&(S=-.5/t);for(let C=0;C<=t;C++){let T=C/t;d.x=-e*Math.cos(r+T*s)*Math.sin(o+b*a),d.y=e*Math.cos(o+b*a),d.z=e*Math.sin(r+T*s)*Math.sin(o+b*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),y.push(f.x,f.y,f.z),p.push(T+S,1-b),M.push(l++)}u.push(M)}for(let m=0;m<i;m++)for(let M=0;M<t;M++){let b=u[m][M+1],S=u[m][M],C=u[m+1][M],T=u[m+1][M+1];(m!==0||o>0)&&h.push(b,S,T),(m!==i-1||c<Math.PI)&&h.push(S,C,T)}this.setIndex(h),this.setAttribute("position",new It(g,3)),this.setAttribute("normal",new It(y,3)),this.setAttribute("uv",new It(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function is(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Se("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function rn(n){let e={};for(let t=0;t<n.length;t++){let i=is(n[t]);for(let r in i)e[r]=i[r]}return e}function cC(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function qp(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}var W_={clone:is,merge:rn},lC=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,uC=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,An=class extends cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lC,this.fragmentShader=uC,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=is(e.uniforms),this.uniformsGroups=cC(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},Ql=class extends An{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},qe=class extends cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wp,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},gn=class extends qe{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ke(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new we(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new we(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new we(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var eu=class extends cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=I_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},tu=class extends cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Pl(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function dC(n){function e(r,s){return n[r]-n[s]}let t=n.length,i=new Array(t);for(let r=0;r!==t;++r)i[r]=r;return i.sort(e),i}function Jv(n,e,t){let i=n.length,r=new n.constructor(i);for(let s=0,o=0;o!==i;++s){let a=t[s]*e;for(let c=0;c!==e;++c)r[o++]=n[a+c]}return r}function j_(n,e,t,i){let r=1,s=n[0];for(;s!==void 0&&s[i]===void 0;)s=n[r++];if(s===void 0)return;let o=s[i];if(o!==void 0)if(Array.isArray(o))do o=s[i],o!==void 0&&(e.push(s.time),t.push(...o)),s=n[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[i],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=n[r++];while(s!==void 0);else do o=s[i],o!==void 0&&(e.push(s.time),t.push(o)),s=n[r++];while(s!==void 0)}var gi=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},nu=class extends gi{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:mp,endingEnd:mp}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case gp:s=e,a=2*t-i;break;case yp:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case gp:o=e,c=2*i-t;break;case yp:o=1,c=i+r[1]-r[0];break;default:o=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,g=(i-t)/(r-t),y=g*g,p=y*g,m=-f*p+2*f*y-f*g,M=(1+f)*p+(-1.5-2*f)*y+(-.5+f)*g+1,b=(-1-h)*p+(1.5+h)*y+.5*g,S=h*p-h*y;for(let C=0;C!==a;++C)s[C]=m*o[u+C]+M*o[l+C]+b*o[c+C]+S*o[d+C];return s}},iu=class extends gi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(i-t)/(r-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[l+f]*d+o[c+f]*u;return s}},ru=class extends gi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},su=class extends gi{interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this.settings||this.DefaultSettings_,d=u.inTangents,f=u.outTangents;if(!d||!f){let y=(i-t)/(r-t),p=1-y;for(let m=0;m!==a;++m)s[m]=o[l+m]*p+o[c+m]*y;return s}let h=a*2,g=e-1;for(let y=0;y!==a;++y){let p=o[l+y],m=o[c+y],M=g*h+y*2,b=f[M],S=f[M+1],C=e*h+y*2,T=d[C],D=d[C+1],_=(i-t)/(r-t),E,W,A,F,U;for(let G=0;G<8;G++){E=_*_,W=E*_,A=1-_,F=A*A,U=F*A;let H=U*t+3*F*_*b+3*A*E*T+W*r-i;if(Math.abs(H)<1e-10)break;let O=3*F*(b-t)+6*A*_*(T-b)+3*E*(r-T);if(Math.abs(O)<1e-10)break;_=_-H/O,_=Math.max(0,Math.min(1,_))}s[y]=U*p+3*F*_*S+3*A*E*D+W*m}return s}},yn=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Pl(t,this.TimeBufferType),this.values=Pl(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Pl(e.times,Array),values:Pl(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new ru(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new iu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new nu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new su(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case qr:t=this.InterpolantFactoryMethodDiscrete;break;case Xr:t=this.InterpolantFactoryMethodLinear;break;case Ol:t=this.InterpolantFactoryMethodSmooth;break;case pp:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Se("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return qr;case this.InterpolantFactoryMethodLinear:return Xr;case this.InterpolantFactoryMethodSmooth:return Ol;case this.InterpolantFactoryMethodBezier:return pp}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ce("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(Ce("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){Ce("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Ce("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&ET(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){Ce("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Ol,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*i,f=d-i,h=d+i;for(let g=0;g!==i;++g){let y=t[d+g];if(y!==t[f+g]||y!==t[h+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*i,f=o*i;for(let h=0;h!==i;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};yn.prototype.ValueTypeName="";yn.prototype.TimeBufferType=Float32Array;yn.prototype.ValueBufferType=Float32Array;yn.prototype.DefaultInterpolation=Xr;var $i=class extends yn{constructor(e,t,i){super(e,t,i)}};$i.prototype.ValueTypeName="bool";$i.prototype.ValueBufferType=Array;$i.prototype.DefaultInterpolation=qr;$i.prototype.InterpolantFactoryMethodLinear=void 0;$i.prototype.InterpolantFactoryMethodSmooth=void 0;var Fa=class extends yn{constructor(e,t,i,r){super(e,t,i,r)}};Fa.prototype.ValueTypeName="color";var yi=class extends yn{constructor(e,t,i,r){super(e,t,i,r)}};yi.prototype.ValueTypeName="number";var ou=class extends gi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)En.slerpFlat(s,0,o,l-a,o,l,c);return s}},vi=class extends yn{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new ou(this.times,this.values,this.getValueSize(),e)}};vi.prototype.ValueTypeName="quaternion";vi.prototype.InterpolantFactoryMethodSmooth=void 0;var qi=class extends yn{constructor(e,t,i){super(e,t,i)}};qi.prototype.ValueTypeName="string";qi.prototype.ValueBufferType=Array;qi.prototype.DefaultInterpolation=qr;qi.prototype.InterpolantFactoryMethodLinear=void 0;qi.prototype.InterpolantFactoryMethodSmooth=void 0;var _i=class extends yn{constructor(e,t,i,r){super(e,t,i,r)}};_i.prototype.ValueTypeName="vector";var Oa=class{constructor(e="",t=-1,i=[],r=D_){this.name=e,this.tracks=i,this.duration=t,this.blendMode=r,this.uuid=Kn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,r=1/(e.fps||1);for(let o=0,a=i.length;o!==a;++o)t.push(hC(i[o]).scale(r));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],i=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=i.length;s!==o;++s)t.push(yn.toJSON(i[s]));return r}static CreateFromMorphTargetSequence(e,t,i,r){let s=t.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);let u=dC(c);c=Jv(c,1,u),l=Jv(l,1,u),!r&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new yi(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/i))}return new this(e,-1,o)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let r=e;i=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<i.length;r++)if(i[r].name===t)return i[r];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let r={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],u=l.name.match(s);if(u&&u.length>1){let d=u[1],f=r[d];f||(r[d]=f=[]),f.push(l)}}let o=[];for(let a in r)o.push(this.CreateFromMorphTargetSequence(a,r[a],t,i));return o}static parseAnimation(e,t){if(Se("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Ce("AnimationClip: No animation in JSONLoader data."),null;let i=function(d,f,h,g,y){if(h.length!==0){let p=[],m=[];j_(h,p,m,g),p.length!==0&&y.push(new d(f,p,m))}},r=[],s=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let d=0;d<l.length;d++){let f=l[d].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let h={},g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let y=0;y<f[g].morphTargets.length;y++)h[f[g].morphTargets[y]]=-1;for(let y in h){let p=[],m=[];for(let M=0;M!==f[g].morphTargets.length;++M){let b=f[g];p.push(b.time),m.push(b.morphTarget===y?1:0)}r.push(new yi(".morphTargetInfluence["+y+"]",p,m))}c=h.length*o}else{let h=".bones["+t[d].name+"]";i(_i,h+".position",f,"pos",r),i(vi,h+".quaternion",f,"rot",r),i(_i,h+".scale",f,"scl",r)}}return r.length===0?null:new this(s,c,r,a)}resetDuration(){let e=this.tracks,t=0;for(let i=0,r=e.length;i!==r;++i){let s=this.tracks[i];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function fC(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return yi;case"vector":case"vector2":case"vector3":case"vector4":return _i;case"color":return Fa;case"quaternion":return vi;case"bool":case"boolean":return $i;case"string":return qi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function hC(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=fC(n.type);if(n.times===void 0){let t=[],i=[];j_(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}var hi={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(Qv(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!Qv(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Qv(n){try{let e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var au=class{constructor(e,t,i){let r=this,s=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=l.length;d<f;d+=2){let h=l[d],g=l[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},$_=new au,rs=(()=>{class n{constructor(t){this.manager=t!==void 0?t:$_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,i){let r=this;return new Promise(function(s,o){r.load(t,s,i,o)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}return n.DEFAULT_MATERIAL_NAME="__DEFAULT",n})(),Hi={},xp=class extends Error{constructor(e,t){super(e),this.response=t}},go=class extends rs{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=hi.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Hi[e]!==void 0){Hi[e].push({onLoad:t,onProgress:i,onError:r});return}Hi[e]=[],Hi[e].push({onLoad:t,onProgress:i,onError:r});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Se("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=Hi[e],d=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),h=f?parseInt(f):0,g=h!==0,y=0,p=new ReadableStream({start(m){M();function M(){d.read().then(({done:b,value:S})=>{if(b)m.close();else{y+=S.byteLength;let C=new ProgressEvent("progress",{lengthComputable:g,loaded:y,total:h});for(let T=0,D=u.length;T<D;T++){let _=u[T];_.onProgress&&_.onProgress(C)}m.enqueue(S),M()}},b=>{m.error(b)})}}});return new Response(p)}else throw new xp(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a==="")return l.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return l.arrayBuffer().then(g=>h.decode(g))}}}).then(l=>{hi.add(`file:${e}`,l);let u=Hi[e];delete Hi[e];for(let d=0,f=u.length;d<f;d++){let h=u[d];h.onLoad&&h.onLoad(l)}}).catch(l=>{let u=Hi[e];if(u===void 0)throw this.manager.itemError(e),l;delete Hi[e];for(let d=0,f=u.length;d<f;d++){let h=u[d];h.onError&&h.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ks=new WeakMap,cu=class extends rs{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=hi.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let d=Ks.get(o);d===void 0&&(d=[],Ks.set(o,d)),d.push({onLoad:t,onError:r})}return o}let a=io("img");function c(){u(),t&&t(this);let d=Ks.get(this)||[];for(let f=0;f<d.length;f++){let h=d[f];h.onLoad&&h.onLoad(this)}Ks.delete(this),s.manager.itemEnd(e)}function l(d){u(),r&&r(d),hi.remove(`image:${e}`);let f=Ks.get(this)||[];for(let h=0;h<f.length;h++){let g=f[h];g.onError&&g.onError(d)}Ks.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),hi.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}};var Ua=class extends rs{constructor(e){super(e)}load(e,t,i,r){let s=new _n,o=new cu(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}},Qr=class extends Nt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var up=new Oe,e_=new R,t_=new R,ka=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ne(512,512),this.mapType=vn,this.map=null,this.mapPass=null,this.matrix=new Oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fo,this._frameExtents=new Ne(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;e_.setFromMatrixPosition(e.matrixWorld),t.position.copy(e_),t_.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(t_),t.updateMatrixWorld(),up.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(up,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===no||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(up)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ll=new R,Fl=new En,di=new R,Ba=class extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Oe,this.projectionMatrix=new Oe,this.projectionMatrixInverse=new Oe,this.coordinateSystem=Zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ll,Fl,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ll,Fl,di.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Ll,Fl,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ll,Fl,di.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},dr=new R,n_=new Ne,i_=new Ne,Ot=class extends Ba{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Yr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ma*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yr*2*Math.atan(Math.tan(ma*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){dr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(dr.x,dr.y).multiplyScalar(-e/dr.z),dr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(dr.x,dr.y).multiplyScalar(-e/dr.z)}getViewSize(e,t){return this.getViewBounds(e,n_,i_),t.subVectors(i_,n_)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ma*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Mp=class extends ka{constructor(){super(new Ot(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=Yr*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Va=class extends Qr{constructor(e,t,i=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.target=new Nt,this.distance=i,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Mp}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Sp=class extends ka{constructor(){super(new Ot(90,1,.5,500)),this.isPointLightShadow=!0}},Ha=class extends Qr{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Sp}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},vr=class extends Ba{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},bp=class extends ka{constructor(){super(new vr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},_r=class extends Qr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.target=new Nt,this.shadow=new bp}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},za=class extends Qr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Xi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var dp=new WeakMap,Ga=class extends rs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Se("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Se("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=hi.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(l=>{if(dp.has(o)===!0)r&&r(dp.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(l),s.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return hi.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){r&&r(l),dp.set(c,l),hi.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});hi.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Js=-90,Qs=1,lu=class extends Nt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ot(Js,Qs,e,t);r.layers=this.layers,this.add(r);let s=new Ot(Js,Qs,e,t);s.layers=this.layers,this.add(s);let o=new Ot(Js,Qs,e,t);o.layers=this.layers,this.add(o);let a=new Ot(Js,Qs,e,t);a.layers=this.layers,this.add(a);let c=new Ot(Js,Qs,e,t);c.layers=this.layers,this.add(c);let l=new Ot(Js,Qs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===Zn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===no)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},uu=class extends Ot{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Xp="\\[\\]\\.:\\/",pC=new RegExp("["+Xp+"]","g"),Yp="[^"+Xp+"]",mC="[^"+Xp.replace("\\.","")+"]",gC=/((?:WC+[\/:])*)/.source.replace("WC",Yp),yC=/(WCOD+)?/.source.replace("WCOD",mC),vC=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Yp),_C=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Yp),xC=new RegExp("^"+gC+yC+vC+_C+"$"),MC=["material","materials","bones","map"],Ep=class{constructor(e,t,i){let r=i||Et.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Et=(()=>{class n{constructor(t,i,r){this.path=i,this.parsedPath=r||n.parseTrackName(i),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new n.Composite(t,i,r):new n(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(pC,"")}static parseTrackName(t){let i=xC.exec(t);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},s=r.nodeName&&r.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let o=r.nodeName.substring(s+1);MC.indexOf(o)!==-1&&(r.nodeName=r.nodeName.substring(0,s),r.objectName=o)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(o){for(let a=0;a<o.length;a++){let c=o[a];if(c.name===i||c.uuid===i)return c;let l=r(c.children);if(l)return l}return null},s=r(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)t[i++]=r[s]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,s=i.propertyName,o=i.propertyIndex;if(t||(t=n.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Se("PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=i.objectIndex;switch(r){case"materials":if(!t.material){Ce("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ce("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ce("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===u){u=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ce("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ce("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){Ce("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(u!==void 0){if(t[u]===void 0){Ce("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let a=t[s];if(a===void 0){let u=i.nodeName;Ce("PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",t);return}let c=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?c=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(o!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ce("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ce("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[o]!==void 0&&(o=t.morphTargetDictionary[o])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return n.Composite=Ep,n})();Et.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Et.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Et.prototype.GetterByBindingType=[Et.prototype._getValue_direct,Et.prototype._getValue_array,Et.prototype._getValue_arrayElement,Et.prototype._getValue_toArray];Et.prototype.SetterByBindingTypeAndVersioning=[[Et.prototype._setValue_direct,Et.prototype._setValue_direct_setNeedsUpdate,Et.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_array,Et.prototype._setValue_array_setNeedsUpdate,Et.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_arrayElement,Et.prototype._setValue_arrayElement_setNeedsUpdate,Et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_fromArray,Et.prototype._setValue_fromArray_setNeedsUpdate,Et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var cL=new Float32Array(1);var r_=new Oe,Wa=class{constructor(e,t,i=0,r=1/0){this.ray=new mr(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new oo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ce("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return r_.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(r_),this}intersectObject(e,t=!0,i=[]){return wp(e,this,i,t),i.sort(s_),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)wp(e[r],this,i,t);return i.sort(s_),i}};function s_(n,e){return n.distance-e.distance}function wp(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let s=n.children;for(let o=0,a=s.length;o<a;o++)wp(s[o],e,t,!0)}}var ja=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Se("THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function Zp(n,e,t,i){let r=SC(i);switch(t){case Hp:return n*e;case _u:return n*e/r.components*r.byteLength;case xu:return n*e/r.components*r.byteLength;case ns:return n*e*2/r.components*r.byteLength;case Mu:return n*e*2/r.components*r.byteLength;case zp:return n*e*3/r.components*r.byteLength;case In:return n*e*4/r.components*r.byteLength;case Su:return n*e*4/r.components*r.byteLength;case Ya:case Za:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ka:case Ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Eu:case Tu:return Math.max(n,16)*Math.max(e,8)/4;case bu:case wu:return Math.max(n,8)*Math.max(e,8)/2;case Cu:case Au:case Iu:case Ru:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Du:case Nu:case Pu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Lu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fu:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ou:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Uu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ku:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Bu:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Vu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Hu:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case zu:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Gu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Wu:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ju:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case $u:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case qu:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Xu:case Yu:case Zu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ku:case Ju:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Qu:case ed:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function SC(n){switch(n){case vn:case Up:return{byteLength:1,components:1};case _o:case kp:case Mi:return{byteLength:2,components:1};case yu:case vu:return{byteLength:2,components:4};case ti:case gu:case Dn:return{byteLength:4,components:1};case Bp:case Vp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:du}}));typeof window<"u"&&(window.__THREE__?Se("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=du);function mx(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function bC(n){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,d=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),a.onUploadCallback();let h;if(l instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=n.SHORT;else if(l instanceof Uint32Array)h=n.UNSIGNED_INT;else if(l instanceof Int32Array)h=n.INT;else if(l instanceof Int8Array)h=n.BYTE;else if(l instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){let u=c.array,d=c.updateRanges;if(n.bindBuffer(l,a),d.length===0)n.bufferSubData(l,0,u);else{d.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<d.length;h++){let g=d[f],y=d[h];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++f,d[f]=y)}d.length=f+1;for(let h=0,g=d.length;h<g;h++){let y=d[h];n.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var EC=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wC=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,TC=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,CC=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,AC=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,DC=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,IC=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,RC=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,NC=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,PC=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,LC=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,FC=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,OC=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,UC=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,kC=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,BC=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,VC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,HC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zC=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,GC=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,WC=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,jC=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,$C=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,qC=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,XC=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,YC=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ZC=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,KC=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,JC=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,QC=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,eA="gl_FragColor = linearToOutputTexel( gl_FragColor );",tA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,nA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,iA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,rA=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,oA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,aA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,uA=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dA=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hA=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pA=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mA=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gA=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,yA=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vA=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_A=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xA=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,MA=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,SA=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,bA=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,EA=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wA=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,TA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,CA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,AA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,DA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,IA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,RA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,NA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,PA=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,LA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,FA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,OA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,UA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,kA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,BA=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,VA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,HA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zA=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,GA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,WA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$A=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,XA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,YA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ZA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,KA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,JA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,QA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,eD=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tD=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,nD=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,iD=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rD=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sD=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,oD=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,aD=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cD=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,lD=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,uD=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,dD=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fD=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hD=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pD=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mD=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gD=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,yD=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,vD=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,_D=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xD=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,MD=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,SD=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,bD=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ED=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wD=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,TD=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,CD=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,AD=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,DD=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ID=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,RD=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ND=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,PD=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,LD=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,FD=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,OD=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,UD=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,kD=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,BD=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,VD=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HD=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,zD=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GD=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,WD=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jD=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$D=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qD=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,XD=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,YD=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ZD=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KD=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,JD=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,QD=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eI=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tI=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nI=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ze={alphahash_fragment:EC,alphahash_pars_fragment:wC,alphamap_fragment:TC,alphamap_pars_fragment:CC,alphatest_fragment:AC,alphatest_pars_fragment:DC,aomap_fragment:IC,aomap_pars_fragment:RC,batching_pars_vertex:NC,batching_vertex:PC,begin_vertex:LC,beginnormal_vertex:FC,bsdfs:OC,iridescence_fragment:UC,bumpmap_pars_fragment:kC,clipping_planes_fragment:BC,clipping_planes_pars_fragment:VC,clipping_planes_pars_vertex:HC,clipping_planes_vertex:zC,color_fragment:GC,color_pars_fragment:WC,color_pars_vertex:jC,color_vertex:$C,common:qC,cube_uv_reflection_fragment:XC,defaultnormal_vertex:YC,displacementmap_pars_vertex:ZC,displacementmap_vertex:KC,emissivemap_fragment:JC,emissivemap_pars_fragment:QC,colorspace_fragment:eA,colorspace_pars_fragment:tA,envmap_fragment:nA,envmap_common_pars_fragment:iA,envmap_pars_fragment:rA,envmap_pars_vertex:sA,envmap_physical_pars_fragment:gA,envmap_vertex:oA,fog_vertex:aA,fog_pars_vertex:cA,fog_fragment:lA,fog_pars_fragment:uA,gradientmap_pars_fragment:dA,lightmap_pars_fragment:fA,lights_lambert_fragment:hA,lights_lambert_pars_fragment:pA,lights_pars_begin:mA,lights_toon_fragment:yA,lights_toon_pars_fragment:vA,lights_phong_fragment:_A,lights_phong_pars_fragment:xA,lights_physical_fragment:MA,lights_physical_pars_fragment:SA,lights_fragment_begin:bA,lights_fragment_maps:EA,lights_fragment_end:wA,logdepthbuf_fragment:TA,logdepthbuf_pars_fragment:CA,logdepthbuf_pars_vertex:AA,logdepthbuf_vertex:DA,map_fragment:IA,map_pars_fragment:RA,map_particle_fragment:NA,map_particle_pars_fragment:PA,metalnessmap_fragment:LA,metalnessmap_pars_fragment:FA,morphinstance_vertex:OA,morphcolor_vertex:UA,morphnormal_vertex:kA,morphtarget_pars_vertex:BA,morphtarget_vertex:VA,normal_fragment_begin:HA,normal_fragment_maps:zA,normal_pars_fragment:GA,normal_pars_vertex:WA,normal_vertex:jA,normalmap_pars_fragment:$A,clearcoat_normal_fragment_begin:qA,clearcoat_normal_fragment_maps:XA,clearcoat_pars_fragment:YA,iridescence_pars_fragment:ZA,opaque_fragment:KA,packing:JA,premultiplied_alpha_fragment:QA,project_vertex:eD,dithering_fragment:tD,dithering_pars_fragment:nD,roughnessmap_fragment:iD,roughnessmap_pars_fragment:rD,shadowmap_pars_fragment:sD,shadowmap_pars_vertex:oD,shadowmap_vertex:aD,shadowmask_pars_fragment:cD,skinbase_vertex:lD,skinning_pars_vertex:uD,skinning_vertex:dD,skinnormal_vertex:fD,specularmap_fragment:hD,specularmap_pars_fragment:pD,tonemapping_fragment:mD,tonemapping_pars_fragment:gD,transmission_fragment:yD,transmission_pars_fragment:vD,uv_pars_fragment:_D,uv_pars_vertex:xD,uv_vertex:MD,worldpos_vertex:SD,background_vert:bD,background_frag:ED,backgroundCube_vert:wD,backgroundCube_frag:TD,cube_vert:CD,cube_frag:AD,depth_vert:DD,depth_frag:ID,distance_vert:RD,distance_frag:ND,equirect_vert:PD,equirect_frag:LD,linedashed_vert:FD,linedashed_frag:OD,meshbasic_vert:UD,meshbasic_frag:kD,meshlambert_vert:BD,meshlambert_frag:VD,meshmatcap_vert:HD,meshmatcap_frag:zD,meshnormal_vert:GD,meshnormal_frag:WD,meshphong_vert:jD,meshphong_frag:$D,meshphysical_vert:qD,meshphysical_frag:XD,meshtoon_vert:YD,meshtoon_frag:ZD,points_vert:KD,points_frag:JD,shadow_vert:QD,shadow_frag:eI,sprite_vert:tI,sprite_frag:nI},oe={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new Ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new Ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},bi={basic:{uniforms:rn([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:rn([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new we(0)},envMapIntensity:{value:1}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:rn([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:rn([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:rn([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new we(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:rn([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:rn([oe.points,oe.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:rn([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:rn([oe.common,oe.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:rn([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:rn([oe.sprite,oe.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distance:{uniforms:rn([oe.common,oe.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distance_vert,fragmentShader:ze.distance_frag},shadow:{uniforms:rn([oe.lights,oe.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};bi.physical={uniforms:rn([bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new Ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new Ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new Ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};var id={r:0,b:0,g:0},ss=new hr,iI=new Oe;function rI(n,e,t,i,r,s){let o=new we(0),a=r===!0?0:1,c,l,u=null,d=0,f=null;function h(M){let b=M.isScene===!0?M.background:null;if(b&&b.isTexture){let S=M.backgroundBlurriness>0;b=e.get(b,S)}return b}function g(M){let b=!1,S=h(M);S===null?p(o,a):S&&S.isColor&&(p(S,1),b=!0);let C=n.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,s):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function y(M,b){let S=h(b);S&&(S.isCubeTexture||S.mapping===Xa)?(l===void 0&&(l=new mt(new et(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:is(bi.backgroundCube.uniforms),vertexShader:bi.backgroundCube.vertexShader,fragmentShader:bi.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(C,T,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),ss.copy(b.backgroundRotation),ss.x*=-1,ss.y*=-1,ss.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ss.y*=-1,ss.z*=-1),l.material.uniforms.envMap.value=S,l.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(iI.makeRotationFromEuler(ss)),l.material.toneMapped=Ze.getTransfer(S.colorSpace)!==rt,(u!==S||d!==S.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,f=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new mt(new ji(2,2),new An({name:"BackgroundMaterial",uniforms:is(bi.background.uniforms),vertexShader:bi.background.vertexShader,fragmentShader:bi.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(S.colorSpace)!==rt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,f=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,b){M.getRGB(id,qp(n)),t.buffers.color.setClear(id.r,id.g,id.b,b,s)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,b=1){o.set(M),a=b,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,p(o,a)},render:g,addToRenderList:y,dispose:m}}function sI(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null),s=r,o=!1;function a(A,F,U,G,B){let H=!1,O=d(A,G,U,F);s!==O&&(s=O,l(s.object)),H=h(A,G,U,B),H&&g(A,G,U,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,S(A,F,U,G),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return n.createVertexArray()}function l(A){return n.bindVertexArray(A)}function u(A){return n.deleteVertexArray(A)}function d(A,F,U,G){let B=G.wireframe===!0,H=i[F.id];H===void 0&&(H={},i[F.id]=H);let O=A.isInstancedMesh===!0?A.id:0,Q=H[O];Q===void 0&&(Q={},H[O]=Q);let Z=Q[U.id];Z===void 0&&(Z={},Q[U.id]=Z);let le=Z[B];return le===void 0&&(le=f(c()),Z[B]=le),le}function f(A){let F=[],U=[],G=[];for(let B=0;B<t;B++)F[B]=0,U[B]=0,G[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:U,attributeDivisors:G,object:A,attributes:{},index:null}}function h(A,F,U,G){let B=s.attributes,H=F.attributes,O=0,Q=U.getAttributes();for(let Z in Q)if(Q[Z].location>=0){let pe=B[Z],de=H[Z];if(de===void 0&&(Z==="instanceMatrix"&&A.instanceMatrix&&(de=A.instanceMatrix),Z==="instanceColor"&&A.instanceColor&&(de=A.instanceColor)),pe===void 0||pe.attribute!==de||de&&pe.data!==de.data)return!0;O++}return s.attributesNum!==O||s.index!==G}function g(A,F,U,G){let B={},H=F.attributes,O=0,Q=U.getAttributes();for(let Z in Q)if(Q[Z].location>=0){let pe=H[Z];pe===void 0&&(Z==="instanceMatrix"&&A.instanceMatrix&&(pe=A.instanceMatrix),Z==="instanceColor"&&A.instanceColor&&(pe=A.instanceColor));let de={};de.attribute=pe,pe&&pe.data&&(de.data=pe.data),B[Z]=de,O++}s.attributes=B,s.attributesNum=O,s.index=G}function y(){let A=s.newAttributes;for(let F=0,U=A.length;F<U;F++)A[F]=0}function p(A){m(A,0)}function m(A,F){let U=s.newAttributes,G=s.enabledAttributes,B=s.attributeDivisors;U[A]=1,G[A]===0&&(n.enableVertexAttribArray(A),G[A]=1),B[A]!==F&&(n.vertexAttribDivisor(A,F),B[A]=F)}function M(){let A=s.newAttributes,F=s.enabledAttributes;for(let U=0,G=F.length;U<G;U++)F[U]!==A[U]&&(n.disableVertexAttribArray(U),F[U]=0)}function b(A,F,U,G,B,H,O){O===!0?n.vertexAttribIPointer(A,F,U,B,H):n.vertexAttribPointer(A,F,U,G,B,H)}function S(A,F,U,G){y();let B=G.attributes,H=U.getAttributes(),O=F.defaultAttributeValues;for(let Q in H){let Z=H[Q];if(Z.location>=0){let le=B[Q];if(le===void 0&&(Q==="instanceMatrix"&&A.instanceMatrix&&(le=A.instanceMatrix),Q==="instanceColor"&&A.instanceColor&&(le=A.instanceColor)),le!==void 0){let pe=le.normalized,de=le.itemSize,He=e.get(le);if(He===void 0)continue;let St=He.buffer,xt=He.type,X=He.bytesPerElement,ne=xt===n.INT||xt===n.UNSIGNED_INT||le.gpuType===gu;if(le.isInterleavedBufferAttribute){let se=le.data,Ve=se.stride,Ae=le.offset;if(se.isInstancedInterleavedBuffer){for(let Pe=0;Pe<Z.locationSize;Pe++)m(Z.location+Pe,se.meshPerAttribute);A.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Pe=0;Pe<Z.locationSize;Pe++)p(Z.location+Pe);n.bindBuffer(n.ARRAY_BUFFER,St);for(let Pe=0;Pe<Z.locationSize;Pe++)b(Z.location+Pe,de/Z.locationSize,xt,pe,Ve*X,(Ae+de/Z.locationSize*Pe)*X,ne)}else{if(le.isInstancedBufferAttribute){for(let se=0;se<Z.locationSize;se++)m(Z.location+se,le.meshPerAttribute);A.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let se=0;se<Z.locationSize;se++)p(Z.location+se);n.bindBuffer(n.ARRAY_BUFFER,St);for(let se=0;se<Z.locationSize;se++)b(Z.location+se,de/Z.locationSize,xt,pe,de*X,de/Z.locationSize*se*X,ne)}}else if(O!==void 0){let pe=O[Q];if(pe!==void 0)switch(pe.length){case 2:n.vertexAttrib2fv(Z.location,pe);break;case 3:n.vertexAttrib3fv(Z.location,pe);break;case 4:n.vertexAttrib4fv(Z.location,pe);break;default:n.vertexAttrib1fv(Z.location,pe)}}}}M()}function C(){E();for(let A in i){let F=i[A];for(let U in F){let G=F[U];for(let B in G){let H=G[B];for(let O in H)u(H[O].object),delete H[O];delete G[B]}}delete i[A]}}function T(A){if(i[A.id]===void 0)return;let F=i[A.id];for(let U in F){let G=F[U];for(let B in G){let H=G[B];for(let O in H)u(H[O].object),delete H[O];delete G[B]}}delete i[A.id]}function D(A){for(let F in i){let U=i[F];for(let G in U){let B=U[G];if(B[A.id]===void 0)continue;let H=B[A.id];for(let O in H)u(H[O].object),delete H[O];delete B[A.id]}}}function _(A){for(let F in i){let U=i[F],G=A.isInstancedMesh===!0?A.id:0,B=U[G];if(B!==void 0){for(let H in B){let O=B[H];for(let Q in O)u(O[Q].object),delete O[Q];delete B[H]}delete U[G],Object.keys(U).length===0&&delete i[F]}}}function E(){W(),o=!0,s!==r&&(s=r,l(s.object))}function W(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:E,resetDefaultState:W,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfObject:_,releaseStatesOfProgram:D,initAttributes:y,enableAttribute:p,disableUnusedAttributes:M}}function oI(n,e,t){let i;function r(l){i=l}function s(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function o(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function a(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let h=0;for(let g=0;g<d;g++)h+=u[g];t.update(h,i,1)}function c(l,u,d,f){if(d===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{h.multiDrawArraysInstancedWEBGL(i,l,0,u,0,f,0,d);let g=0;for(let y=0;y<d;y++)g+=u[y]*f[y];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function aI(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let D=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(D){return!(D!==In&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(D){let _=D===Mi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==vn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==Dn&&!_)}function c(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(Se("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:S,maxSamples:C,samples:T}}function cI(n){let e=this,t=null,i=0,r=!1,s=!1,o=new fi,a=new Be,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||i!==0||r;return r=f,i=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){let g=d.clippingPlanes,y=d.clipIntersection,p=d.clipShadows,m=n.get(d);if(!r||g===null||g.length===0||s&&!p)s?u(null):l();else{let M=s?0:i,b=M*4,S=m.clippingState||null;c.value=S,S=u(g,f,b,h);for(let C=0;C!==b;++C)S[C]=t[C];m.clippingState=S,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,g){let y=d!==null?d.length:0,p=null;if(y!==0){if(p=c.value,g!==!0||p===null){let m=h+y*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let b=0,S=h;b!==y;++b,S+=4)o.copy(d[b]).applyMatrix4(M,a),o.normal.toArray(p,S),p[S+3]=o.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,p}}var br=4,q_=[.125,.215,.35,.446,.526,.582],as=20,lI=256,ec=new vr,X_=new we,Kp=null,Jp=0,Qp=0,em=!1,uI=new R,sd=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=uI}=s;Kp=this._renderer.getRenderTarget(),Jp=this._renderer.getActiveCubeFace(),Qp=this._renderer.getActiveMipmapLevel(),em=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=K_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Z_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Kp,Jp,Qp),this._renderer.xr.enabled=em,e.scissorTest=!1,So(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===xr||e.mapping===es?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Kp=this._renderer.getRenderTarget(),Jp=this._renderer.getActiveCubeFace(),Qp=this._renderer.getActiveMipmapLevel(),em=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:wt,minFilter:wt,generateMipmaps:!1,type:Mi,format:In,colorSpace:Zt,depthBuffer:!1},r=Y_(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Y_(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=dI(s)),this._blurMaterial=hI(s,e,t),this._ggxMaterial=fI(s,e,t)}return r}_compileMaterial(e){let t=new mt(new qt,e);this._renderer.compile(t,ec)}_sceneToCubeUV(e,t,i,r,s){let c=new Ot(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(X_),d.toneMapping=Qn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new mt(new et,new Cn({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,p=y.material,m=!1,M=e.background;M?M.isColor&&(p.color.copy(M),e.background=null,m=!0):(p.color.copy(X_),m=!0);for(let b=0;b<6;b++){let S=b%3;S===0?(c.up.set(0,l[b],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[b],s.y,s.z)):S===1?(c.up.set(0,0,l[b]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[b],s.z)):(c.up.set(0,l[b],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[b]));let C=this._cubeSize;So(r,S*C,b>2?C:0,C,C),d.setRenderTarget(r),m&&d.render(y,c),d.render(e,c)}d.toneMapping=h,d.autoClear=f,e.background=M}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===xr||e.mapping===es;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=K_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Z_());let s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=e;let c=this._cubeSize;So(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,ec)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let c=o.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),f=0+l*1.25,h=d*f,{_lodMax:g}=this,y=this._sizeLods[i],p=3*y*(i>g-br?i-g+br:0),m=4*(this._cubeSize-y);c.envMap.value=e.texture,c.roughness.value=h,c.mipInt.value=g-t,So(s,p,m,3*y,2*y),r.setRenderTarget(s),r.render(a,ec),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-i,So(e,p,m,3*y,2*y),r.setRenderTarget(e),r.render(a,ec)}_blur(e,t,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Ce("blur direction must be either latitudinal or longitudinal!");let u=3,d=this._lodMeshes[r];d.material=l;let f=l.uniforms,h=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*as-1),y=s/g,p=isFinite(s)?1+Math.floor(u*y):as;p>as&&Se(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${as}`);let m=[],M=0;for(let D=0;D<as;++D){let _=D/y,E=Math.exp(-_*_/2);m.push(E),D===0?M+=E:D<p&&(M+=2*E)}for(let D=0;D<m.length;D++)m[D]=m[D]/M;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:b}=this;f.dTheta.value=g,f.mipInt.value=b-i;let S=this._sizeLods[r],C=3*S*(r>b-br?r-b+br:0),T=4*(this._cubeSize-S);So(t,C,T,3*S,2*S),c.setRenderTarget(t),c.render(d,ec)}};function dI(n){let e=[],t=[],i=[],r=n,s=n-br+1+q_.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);e.push(a);let c=1/a;o>n-br?c=q_[o-n+br-1]:o===0&&(c=0),t.push(c);let l=1/(a-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,g=6,y=3,p=2,m=1,M=new Float32Array(y*g*h),b=new Float32Array(p*g*h),S=new Float32Array(m*g*h);for(let T=0;T<h;T++){let D=T%3*2/3-1,_=T>2?0:-1,E=[D,_,0,D+2/3,_,0,D+2/3,_+1,0,D,_,0,D+2/3,_+1,0,D,_+1,0];M.set(E,y*g*T),b.set(f,p*g*T);let W=[T,T,T,T,T,T];S.set(W,m*g*T)}let C=new qt;C.setAttribute("position",new Ut(M,y)),C.setAttribute("uv",new Ut(b,p)),C.setAttribute("faceIndex",new Ut(S,m)),i.push(new mt(C,null)),r>br&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Y_(n,e,t){let i=new wn(n,e,t);return i.texture.mapping=Xa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function So(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function fI(n,e,t){return new An({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:lI,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:cd(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function hI(n,e,t){let i=new Float32Array(as),r=new R(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:as,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:cd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function Z_(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function K_(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function cd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var od=class extends wn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Na(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new et(5,5,5),s=new An({name:"CubemapFromEquirect",uniforms:is(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ln,blending:xi});s.uniforms.tEquirect.value=t;let o=new mt(r,s),a=t.minFilter;return t.minFilter===ei&&(t.minFilter=wt),new lu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}};function pI(n){let e=new WeakMap,t=new WeakMap,i=null;function r(f,h=!1){return f==null?null:h?o(f):s(f)}function s(f){if(f&&f.isTexture){let h=f.mapping;if(h===hu||h===pu)if(e.has(f)){let g=e.get(f).texture;return a(g,f.mapping)}else{let g=f.image;if(g&&g.height>0){let y=new od(g.height);return y.fromEquirectangularTexture(n,f),e.set(f,y),f.addEventListener("dispose",l),a(y.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){let h=f.mapping,g=h===hu||h===pu,y=h===xr||h===es;if(g||y){let p=t.get(f),m=p!==void 0?p.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return i===null&&(i=new sd(n)),p=g?i.fromEquirectangular(f,p):i.fromCubemap(f,p),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),p.texture;if(p!==void 0)return p.texture;{let M=f.image;return g&&M&&M.height>0||y&&M&&c(M)?(i===null&&(i=new sd(n)),p=g?i.fromEquirectangular(f):i.fromCubemap(f),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),f.addEventListener("dispose",u),p.texture):null}}}return f}function a(f,h){return h===hu?f.mapping=xr:h===pu&&(f.mapping=es),f}function c(f){let h=0,g=6;for(let y=0;y<g;y++)f[y]!==void 0&&h++;return h===g}function l(f){let h=f.target;h.removeEventListener("dispose",l);let g=e.get(h);g!==void 0&&(e.delete(h),g.dispose())}function u(f){let h=f.target;h.removeEventListener("dispose",u);let g=t.get(h);g!==void 0&&(t.delete(h),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function mI(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&_a("WebGLRenderer: "+i+" extension not supported."),r}}}function gI(n,e,t,i){let r={},s=new WeakMap;function o(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete r[f.id];let h=s.get(f);h&&(e.remove(h),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function c(d){let f=d.attributes;for(let h in f)e.update(f[h],n.ARRAY_BUFFER)}function l(d){let f=[],h=d.index,g=d.attributes.position,y=0;if(g===void 0)return;if(h!==null){let M=h.array;y=h.version;for(let b=0,S=M.length;b<S;b+=3){let C=M[b+0],T=M[b+1],D=M[b+2];f.push(C,T,T,D,D,C)}}else{let M=g.array;y=g.version;for(let b=0,S=M.length/3-1;b<S;b+=3){let C=b+0,T=b+1,D=b+2;f.push(C,T,T,D,D,C)}}let p=new(g.count>=65535?Ea:ba)(f,1);p.version=y;let m=s.get(d);m&&e.remove(m),s.set(d,p)}function u(d){let f=s.get(d);if(f){let h=d.index;h!==null&&f.version<h.version&&l(d)}else l(d);return s.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function yI(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,h){n.drawElements(i,h,s,f*o),t.update(h,i,1)}function l(f,h,g){g!==0&&(n.drawElementsInstanced(i,h,s,f*o,g),t.update(h,i,g))}function u(f,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,f,0,g);let p=0;for(let m=0;m<g;m++)p+=h[m];t.update(p,i,1)}function d(f,h,g,y){if(g===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)l(f[m]/o,h[m],y[m]);else{p.multiDrawElementsInstancedWEBGL(i,h,0,s,f,0,y,0,g);let m=0;for(let M=0;M<g;M++)m+=h[M]*y[M];t.update(m,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function vI(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:Ce("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function _I(n,e,t){let i=new WeakMap,r=new _t;function s(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(a);if(f===void 0||f.count!==d){let W=function(){_.dispose(),i.delete(a),a.removeEventListener("dispose",W)};var h=W;f!==void 0&&f.texture.dispose();let g=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],S=0;g===!0&&(S=1),y===!0&&(S=2),p===!0&&(S=3);let C=a.attributes.position.count*S,T=1;C>e.maxTextureSize&&(T=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);let D=new Float32Array(C*T*4*d),_=new xa(D,C,T,d);_.type=Dn,_.needsUpdate=!0;let E=S*4;for(let A=0;A<d;A++){let F=m[A],U=M[A],G=b[A],B=C*T*4*A;for(let H=0;H<F.count;H++){let O=H*E;g===!0&&(r.fromBufferAttribute(F,H),D[B+O+0]=r.x,D[B+O+1]=r.y,D[B+O+2]=r.z,D[B+O+3]=0),y===!0&&(r.fromBufferAttribute(U,H),D[B+O+4]=r.x,D[B+O+5]=r.y,D[B+O+6]=r.z,D[B+O+7]=0),p===!0&&(r.fromBufferAttribute(G,H),D[B+O+8]=r.x,D[B+O+9]=r.y,D[B+O+10]=r.z,D[B+O+11]=G.itemSize===4?r.w:1)}}f={count:d,texture:_,size:new Ne(C,T)},i.set(a,f),a.addEventListener("dispose",W)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];let y=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",y),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function xI(n,e,t,i,r){let s=new WeakMap;function o(l){let u=r.render.frame,d=l.geometry,f=e.get(l,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return f}function a(){s=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var MI={[Rp]:"LINEAR_TONE_MAPPING",[Np]:"REINHARD_TONE_MAPPING",[Pp]:"CINEON_TONE_MAPPING",[qa]:"ACES_FILMIC_TONE_MAPPING",[Fp]:"AGX_TONE_MAPPING",[Op]:"NEUTRAL_TONE_MAPPING",[Lp]:"CUSTOM_TONE_MAPPING"};function SI(n,e,t,i,r){let s=new wn(e,t,{type:n,depthBuffer:i,stencilBuffer:r}),o=new wn(e,t,{type:Mi,depthBuffer:!1,stencilBuffer:!1}),a=new qt;a.setAttribute("position",new It([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new It([0,2,0,0,2,0],2));let c=new Ql({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new mt(a,c),u=new vr(-1,1,1,-1,0,1),d=null,f=null,h=!1,g,y=null,p=[],m=!1;this.setSize=function(M,b){s.setSize(M,b),o.setSize(M,b);for(let S=0;S<p.length;S++){let C=p[S];C.setSize&&C.setSize(M,b)}},this.setEffects=function(M){p=M,m=p.length>0&&p[0].isRenderPass===!0;let b=s.width,S=s.height;for(let C=0;C<p.length;C++){let T=p[C];T.setSize&&T.setSize(b,S)}},this.begin=function(M,b){if(h||M.toneMapping===Qn&&p.length===0)return!1;if(y=b,b!==null){let S=b.width,C=b.height;(s.width!==S||s.height!==C)&&this.setSize(S,C)}return m===!1&&M.setRenderTarget(s),g=M.toneMapping,M.toneMapping=Qn,!0},this.hasRenderPass=function(){return m},this.end=function(M,b){M.toneMapping=g,h=!0;let S=s,C=o;for(let T=0;T<p.length;T++){let D=p[T];if(D.enabled!==!1&&(D.render(M,C,S,b),D.needsSwap!==!1)){let _=S;S=C,C=_}}if(d!==M.outputColorSpace||f!==M.toneMapping){d=M.outputColorSpace,f=M.toneMapping,c.defines={},Ze.getTransfer(d)===rt&&(c.defines.SRGB_TRANSFER="");let T=MI[f];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=S.texture,M.setRenderTarget(y),M.render(l,u),y=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){s.dispose(),o.dispose(),a.dispose(),c.dispose()}}var gx=new _n,im=new yr(1,1),yx=new xa,vx=new Yl,_x=new Na,J_=[],Q_=[],ex=new Float32Array(16),tx=new Float32Array(9),nx=new Float32Array(4);function Eo(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=J_[r];if(s===void 0&&(s=new Float32Array(r),J_[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Bt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Vt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ld(n,e){let t=Q_[e];t===void 0&&(t=new Int32Array(e),Q_[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function bI(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function EI(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2fv(this.addr,e),Vt(t,e)}}function wI(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;n.uniform3fv(this.addr,e),Vt(t,e)}}function TI(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4fv(this.addr,e),Vt(t,e)}}function CI(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Bt(t,i))return;nx.set(i),n.uniformMatrix2fv(this.addr,!1,nx),Vt(t,i)}}function AI(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Bt(t,i))return;tx.set(i),n.uniformMatrix3fv(this.addr,!1,tx),Vt(t,i)}}function DI(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Bt(t,i))return;ex.set(i),n.uniformMatrix4fv(this.addr,!1,ex),Vt(t,i)}}function II(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function RI(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2iv(this.addr,e),Vt(t,e)}}function NI(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;n.uniform3iv(this.addr,e),Vt(t,e)}}function PI(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4iv(this.addr,e),Vt(t,e)}}function LI(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function FI(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2uiv(this.addr,e),Vt(t,e)}}function OI(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;n.uniform3uiv(this.addr,e),Vt(t,e)}}function UI(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4uiv(this.addr,e),Vt(t,e)}}function kI(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(im.compareFunction=t.isReversedDepthBuffer()?nd:td,s=im):s=gx,t.setTexture2D(e||s,r)}function BI(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||vx,r)}function VI(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||_x,r)}function HI(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||yx,r)}function zI(n){switch(n){case 5126:return bI;case 35664:return EI;case 35665:return wI;case 35666:return TI;case 35674:return CI;case 35675:return AI;case 35676:return DI;case 5124:case 35670:return II;case 35667:case 35671:return RI;case 35668:case 35672:return NI;case 35669:case 35673:return PI;case 5125:return LI;case 36294:return FI;case 36295:return OI;case 36296:return UI;case 35678:case 36198:case 36298:case 36306:case 35682:return kI;case 35679:case 36299:case 36307:return BI;case 35680:case 36300:case 36308:case 36293:return VI;case 36289:case 36303:case 36311:case 36292:return HI}}function GI(n,e){n.uniform1fv(this.addr,e)}function WI(n,e){let t=Eo(e,this.size,2);n.uniform2fv(this.addr,t)}function jI(n,e){let t=Eo(e,this.size,3);n.uniform3fv(this.addr,t)}function $I(n,e){let t=Eo(e,this.size,4);n.uniform4fv(this.addr,t)}function qI(n,e){let t=Eo(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function XI(n,e){let t=Eo(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function YI(n,e){let t=Eo(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function ZI(n,e){n.uniform1iv(this.addr,e)}function KI(n,e){n.uniform2iv(this.addr,e)}function JI(n,e){n.uniform3iv(this.addr,e)}function QI(n,e){n.uniform4iv(this.addr,e)}function e1(n,e){n.uniform1uiv(this.addr,e)}function t1(n,e){n.uniform2uiv(this.addr,e)}function n1(n,e){n.uniform3uiv(this.addr,e)}function i1(n,e){n.uniform4uiv(this.addr,e)}function r1(n,e,t){let i=this.cache,r=e.length,s=ld(t,r);Bt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=im:o=gx;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function s1(n,e,t){let i=this.cache,r=e.length,s=ld(t,r);Bt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||vx,s[o])}function o1(n,e,t){let i=this.cache,r=e.length,s=ld(t,r);Bt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||_x,s[o])}function a1(n,e,t){let i=this.cache,r=e.length,s=ld(t,r);Bt(i,s)||(n.uniform1iv(this.addr,s),Vt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||yx,s[o])}function c1(n){switch(n){case 5126:return GI;case 35664:return WI;case 35665:return jI;case 35666:return $I;case 35674:return qI;case 35675:return XI;case 35676:return YI;case 5124:case 35670:return ZI;case 35667:case 35671:return KI;case 35668:case 35672:return JI;case 35669:case 35673:return QI;case 5125:return e1;case 36294:return t1;case 36295:return n1;case 36296:return i1;case 35678:case 36198:case 36298:case 36306:case 35682:return r1;case 35679:case 36299:case 36307:return s1;case 35680:case 36300:case 36308:case 36293:return o1;case 36289:case 36303:case 36311:case 36292:return a1}}var rm=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=zI(t.type)}},sm=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=c1(t.type)}},om=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},tm=/(\w+)(\])?(\[|\.)?/g;function ix(n,e){n.seq.push(e),n.map[e.id]=e}function l1(n,e,t){let i=n.name,r=i.length;for(tm.lastIndex=0;;){let s=tm.exec(i),o=tm.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){ix(t,l===void 0?new rm(a,n,e):new sm(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new om(a),ix(t,d)),t=d}}}var bo=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);l1(a,c,this)}let r=[],s=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function rx(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var u1=37297,d1=0;function f1(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var sx=new Be;function h1(n){Ze._getMatrix(sx,Ze.workingColorSpace,n);let e=`mat3( ${sx.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(n)){case ya:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Se("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function ox(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+f1(n.getShaderSource(e),a)}else return s}function p1(n,e){let t=h1(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var m1={[Rp]:"Linear",[Np]:"Reinhard",[Pp]:"Cineon",[qa]:"ACESFilmic",[Fp]:"AgX",[Op]:"Neutral",[Lp]:"Custom"};function g1(n,e){let t=m1[e];return t===void 0?(Se("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var rd=new R;function y1(){Ze.getLuminanceCoefficients(rd);let n=rd.x.toFixed(4),e=rd.y.toFixed(4),t=rd.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function v1(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(nc).join(`
`)}function _1(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function x1(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function nc(n){return n!==""}function ax(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cx(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var M1=/^[ \t]*#include +<([\w\d./]+)>/gm;function am(n){return n.replace(M1,b1)}var S1=new Map;function b1(n,e){let t=ze[e];if(t===void 0){let i=S1.get(e);if(i!==void 0)t=ze[i],Se('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return am(t)}var E1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lx(n){return n.replace(E1,w1)}function w1(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ux(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var T1={[$a]:"SHADOWMAP_TYPE_PCF",[yo]:"SHADOWMAP_TYPE_VSM"};function C1(n){return T1[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var A1={[xr]:"ENVMAP_TYPE_CUBE",[es]:"ENVMAP_TYPE_CUBE",[Xa]:"ENVMAP_TYPE_CUBE_UV"};function D1(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":A1[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var I1={[es]:"ENVMAP_MODE_REFRACTION"};function R1(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":I1[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var N1={[Ip]:"ENVMAP_BLENDING_MULTIPLY",[T_]:"ENVMAP_BLENDING_MIX",[C_]:"ENVMAP_BLENDING_ADD"};function P1(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":N1[n.combine]||"ENVMAP_BLENDING_NONE"}function L1(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function F1(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=C1(t),l=D1(t),u=R1(t),d=P1(t),f=L1(t),h=v1(t),g=_1(s),y=r.createProgram(),p,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(nc).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(nc).join(`
`),m.length>0&&(m+=`
`)):(p=[ux(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(nc).join(`
`),m=[ux(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Qn?"#define TONE_MAPPING":"",t.toneMapping!==Qn?ze.tonemapping_pars_fragment:"",t.toneMapping!==Qn?g1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,p1("linearToOutputTexel",t.outputColorSpace),y1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(nc).join(`
`)),o=am(o),o=ax(o,t),o=cx(o,t),a=am(a),a=ax(a,t),a=cx(a,t),o=lx(o),a=lx(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===jp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===jp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let b=M+p+o,S=M+m+a,C=rx(r,r.VERTEX_SHADER,b),T=rx(r,r.FRAGMENT_SHADER,S);r.attachShader(y,C),r.attachShader(y,T),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function D(A){if(n.debug.checkShaderErrors){let F=r.getProgramInfoLog(y)||"",U=r.getShaderInfoLog(C)||"",G=r.getShaderInfoLog(T)||"",B=F.trim(),H=U.trim(),O=G.trim(),Q=!0,Z=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,y,C,T);else{let le=ox(r,C,"vertex"),pe=ox(r,T,"fragment");Ce("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+B+`
`+le+`
`+pe)}else B!==""?Se("WebGLProgram: Program Info Log:",B):(H===""||O==="")&&(Z=!1);Z&&(A.diagnostics={runnable:Q,programLog:B,vertexShader:{log:H,prefix:p},fragmentShader:{log:O,prefix:m}})}r.deleteShader(C),r.deleteShader(T),_=new bo(r,y),E=x1(r,y)}let _;this.getUniforms=function(){return _===void 0&&D(this),_};let E;this.getAttributes=function(){return E===void 0&&D(this),E};let W=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=r.getProgramParameter(y,u1)),W},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=d1++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=C,this.fragmentShader=T,this}var O1=0,cm=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new lm(e),t.set(e,i)),i}},lm=class{constructor(e){this.id=O1++,this.code=e,this.usedTimes=0}};function U1(n,e,t,i,r,s){let o=new oo,a=new cm,c=new Set,l=[],u=new Map,d=i.logarithmicDepthBuffer,f=i.precision,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function y(_,E,W,A,F){let U=A.fog,G=F.geometry,B=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?A.environment:null,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,O=e.get(_.envMap||B,H),Q=O&&O.mapping===Xa?O.image.height:null,Z=h[_.type];_.precision!==null&&(f=i.getMaxPrecision(_.precision),f!==_.precision&&Se("WebGLProgram.getParameters:",_.precision,"not supported, using",f,"instead."));let le=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,pe=le!==void 0?le.length:0,de=0;G.morphAttributes.position!==void 0&&(de=1),G.morphAttributes.normal!==void 0&&(de=2),G.morphAttributes.color!==void 0&&(de=3);let He,St,xt,X;if(Z){let ot=bi[Z];He=ot.vertexShader,St=ot.fragmentShader}else He=_.vertexShader,St=_.fragmentShader,a.update(_),xt=a.getVertexShaderID(_),X=a.getFragmentShaderID(_);let ne=n.getRenderTarget(),se=n.state.buffers.depth.getReversed(),Ve=F.isInstancedMesh===!0,Ae=F.isBatchedMesh===!0,Pe=!!_.map,Ht=!!_.matcap,tt=!!O,st=!!_.aoMap,ht=!!_.lightMap,Ge=!!_.bumpMap,At=!!_.normalMap,I=!!_.displacementMap,Lt=!!_.emissiveMap,it=!!_.metalnessMap,gt=!!_.roughnessMap,xe=_.anisotropy>0,w=_.clearcoat>0,v=_.dispersion>0,P=_.iridescence>0,q=_.sheen>0,Y=_.transmission>0,$=xe&&!!_.anisotropyMap,me=w&&!!_.clearcoatMap,ie=w&&!!_.clearcoatNormalMap,Te=w&&!!_.clearcoatRoughnessMap,De=P&&!!_.iridescenceMap,K=P&&!!_.iridescenceThicknessMap,ee=q&&!!_.sheenColorMap,ge=q&&!!_.sheenRoughnessMap,ve=!!_.specularMap,ue=!!_.specularColorMap,We=!!_.specularIntensityMap,N=Y&&!!_.transmissionMap,re=Y&&!!_.thicknessMap,te=!!_.gradientMap,he=!!_.alphaMap,J=_.alphaTest>0,j=!!_.alphaHash,ye=!!_.extensions,Fe=Qn;_.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Fe=n.toneMapping);let yt={shaderID:Z,shaderType:_.type,shaderName:_.name,vertexShader:He,fragmentShader:St,defines:_.defines,customVertexShaderID:xt,customFragmentShaderID:X,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:f,batching:Ae,batchingColor:Ae&&F._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&F.instanceColor!==null,instancingMorph:Ve&&F.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Zt,alphaToCoverage:!!_.alphaToCoverage,map:Pe,matcap:Ht,envMap:tt,envMapMode:tt&&O.mapping,envMapCubeUVHeight:Q,aoMap:st,lightMap:ht,bumpMap:Ge,normalMap:At,displacementMap:I,emissiveMap:Lt,normalMapObjectSpace:At&&_.normalMapType===R_,normalMapTangentSpace:At&&_.normalMapType===Wp,metalnessMap:it,roughnessMap:gt,anisotropy:xe,anisotropyMap:$,clearcoat:w,clearcoatMap:me,clearcoatNormalMap:ie,clearcoatRoughnessMap:Te,dispersion:v,iridescence:P,iridescenceMap:De,iridescenceThicknessMap:K,sheen:q,sheenColorMap:ee,sheenRoughnessMap:ge,specularMap:ve,specularColorMap:ue,specularIntensityMap:We,transmission:Y,transmissionMap:N,thicknessMap:re,gradientMap:te,opaque:_.transparent===!1&&_.blending===jr&&_.alphaToCoverage===!1,alphaMap:he,alphaTest:J,alphaHash:j,combine:_.combine,mapUv:Pe&&g(_.map.channel),aoMapUv:st&&g(_.aoMap.channel),lightMapUv:ht&&g(_.lightMap.channel),bumpMapUv:Ge&&g(_.bumpMap.channel),normalMapUv:At&&g(_.normalMap.channel),displacementMapUv:I&&g(_.displacementMap.channel),emissiveMapUv:Lt&&g(_.emissiveMap.channel),metalnessMapUv:it&&g(_.metalnessMap.channel),roughnessMapUv:gt&&g(_.roughnessMap.channel),anisotropyMapUv:$&&g(_.anisotropyMap.channel),clearcoatMapUv:me&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:ie&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:De&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:K&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:ee&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:ge&&g(_.sheenRoughnessMap.channel),specularMapUv:ve&&g(_.specularMap.channel),specularColorMapUv:ue&&g(_.specularColorMap.channel),specularIntensityMapUv:We&&g(_.specularIntensityMap.channel),transmissionMapUv:N&&g(_.transmissionMap.channel),thicknessMapUv:re&&g(_.thicknessMap.channel),alphaMapUv:he&&g(_.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(At||xe),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!G.attributes.uv&&(Pe||he),fog:!!U,useFog:_.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||G.attributes.normal===void 0&&At===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:se,skinning:F.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:de,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&W.length>0,shadowMapType:n.shadowMap.type,toneMapping:Fe,decodeVideoTexture:Pe&&_.map.isVideoTexture===!0&&Ze.getTransfer(_.map.colorSpace)===rt,decodeVideoTextureEmissive:Lt&&_.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(_.emissiveMap.colorSpace)===rt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===un,flipSided:_.side===ln,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ye&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&_.extensions.multiDraw===!0||Ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return yt.vertexUv1s=c.has(1),yt.vertexUv2s=c.has(2),yt.vertexUv3s=c.has(3),c.clear(),yt}function p(_){let E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(let W in _.defines)E.push(W),E.push(_.defines[W]);return _.isRawShaderMaterial===!1&&(m(E,_),M(E,_),E.push(n.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function m(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function M(_,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),_.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),_.push(o.mask)}function b(_){let E=h[_.type],W;if(E){let A=bi[E];W=W_.clone(A.uniforms)}else W=_.uniforms;return W}function S(_,E){let W=u.get(E);return W!==void 0?++W.usedTimes:(W=new F1(n,E,_,r),l.push(W),u.set(E,W)),W}function C(_){if(--_.usedTimes===0){let E=l.indexOf(_);l[E]=l[l.length-1],l.pop(),u.delete(_.cacheKey),_.destroy()}}function T(_){a.remove(_)}function D(){a.dispose()}return{getParameters:y,getProgramCacheKey:p,getUniforms:b,acquireProgram:S,releaseProgram:C,releaseShaderCache:T,programs:l,dispose:D}}function k1(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function B1(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function dx(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function fx(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function a(f,h,g,y,p,m){let M=n[e];return M===void 0?(M={id:f.id,object:f,geometry:h,material:g,materialVariant:o(f),groupOrder:y,renderOrder:f.renderOrder,z:p,group:m},n[e]=M):(M.id=f.id,M.object=f,M.geometry=h,M.material=g,M.materialVariant=o(f),M.groupOrder=y,M.renderOrder=f.renderOrder,M.z=p,M.group=m),e++,M}function c(f,h,g,y,p,m){let M=a(f,h,g,y,p,m);g.transmission>0?i.push(M):g.transparent===!0?r.push(M):t.push(M)}function l(f,h,g,y,p,m){let M=a(f,h,g,y,p,m);g.transmission>0?i.unshift(M):g.transparent===!0?r.unshift(M):t.unshift(M)}function u(f,h){t.length>1&&t.sort(f||B1),i.length>1&&i.sort(h||dx),r.length>1&&r.sort(h||dx)}function d(){for(let f=e,h=n.length;f<h;f++){let g=n[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:d,sort:u}}function V1(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new fx,n.set(i,[o])):r>=s.length?(o=new fx,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function H1(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new we};break;case"SpotLight":t={position:new R,direction:new R,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new R,halfWidth:new R,halfHeight:new R};break}return n[e.id]=t,t}}}function z1(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var G1=0;function W1(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function j1(n){let e=new H1,t=z1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new R);let r=new R,s=new Oe,o=new Oe;function a(l){let u=0,d=0,f=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let h=0,g=0,y=0,p=0,m=0,M=0,b=0,S=0,C=0,T=0,D=0;l.sort(W1);for(let E=0,W=l.length;E<W;E++){let A=l[E],F=A.color,U=A.intensity,G=A.distance,B=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===ns?B=A.shadow.map.texture:B=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)u+=F.r*U,d+=F.g*U,f+=F.b*U;else if(A.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(A.sh.coefficients[H],U);D++}else if(A.isDirectionalLight){let H=e.get(A);if(H.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let O=A.shadow,Q=t.get(A);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,i.directionalShadow[h]=Q,i.directionalShadowMap[h]=B,i.directionalShadowMatrix[h]=A.shadow.matrix,M++}i.directional[h]=H,h++}else if(A.isSpotLight){let H=e.get(A);H.position.setFromMatrixPosition(A.matrixWorld),H.color.copy(F).multiplyScalar(U),H.distance=G,H.coneCos=Math.cos(A.angle),H.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),H.decay=A.decay,i.spot[y]=H;let O=A.shadow;if(A.map&&(i.spotLightMap[C]=A.map,C++,O.updateMatrices(A),A.castShadow&&T++),i.spotLightMatrix[y]=O.matrix,A.castShadow){let Q=t.get(A);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,i.spotShadow[y]=Q,i.spotShadowMap[y]=B,S++}y++}else if(A.isRectAreaLight){let H=e.get(A);H.color.copy(F).multiplyScalar(U),H.halfWidth.set(A.width*.5,0,0),H.halfHeight.set(0,A.height*.5,0),i.rectArea[p]=H,p++}else if(A.isPointLight){let H=e.get(A);if(H.color.copy(A.color).multiplyScalar(A.intensity),H.distance=A.distance,H.decay=A.decay,A.castShadow){let O=A.shadow,Q=t.get(A);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,Q.shadowCameraNear=O.camera.near,Q.shadowCameraFar=O.camera.far,i.pointShadow[g]=Q,i.pointShadowMap[g]=B,i.pointShadowMatrix[g]=A.shadow.matrix,b++}i.point[g]=H,g++}else if(A.isHemisphereLight){let H=e.get(A);H.skyColor.copy(A.color).multiplyScalar(U),H.groundColor.copy(A.groundColor).multiplyScalar(U),i.hemi[m]=H,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=oe.LTC_FLOAT_1,i.rectAreaLTC2=oe.LTC_FLOAT_2):(i.rectAreaLTC1=oe.LTC_HALF_1,i.rectAreaLTC2=oe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let _=i.hash;(_.directionalLength!==h||_.pointLength!==g||_.spotLength!==y||_.rectAreaLength!==p||_.hemiLength!==m||_.numDirectionalShadows!==M||_.numPointShadows!==b||_.numSpotShadows!==S||_.numSpotMaps!==C||_.numLightProbes!==D)&&(i.directional.length=h,i.spot.length=y,i.rectArea.length=p,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=S+C-T,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=D,_.directionalLength=h,_.pointLength=g,_.spotLength=y,_.rectAreaLength=p,_.hemiLength=m,_.numDirectionalShadows=M,_.numPointShadows=b,_.numSpotShadows=S,_.numSpotMaps=C,_.numLightProbes=D,i.version=G1++)}function c(l,u){let d=0,f=0,h=0,g=0,y=0,p=u.matrixWorldInverse;for(let m=0,M=l.length;m<M;m++){let b=l[m];if(b.isDirectionalLight){let S=i.directional[d];S.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(p),d++}else if(b.isSpotLight){let S=i.spot[h];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(p),h++}else if(b.isRectAreaLight){let S=i.rectArea[g];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(p),o.identity(),s.copy(b.matrixWorld),s.premultiply(p),o.extractRotation(s),S.halfWidth.set(b.width*.5,0,0),S.halfHeight.set(0,b.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){let S=i.point[f];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){let S=i.hemi[y];S.direction.setFromMatrixPosition(b.matrixWorld),S.direction.transformDirection(p),y++}}}return{setup:a,setupView:c,state:i}}function hx(n){let e=new j1(n),t=[],i=[];function r(u){l.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function $1(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new hx(n),e.set(r,[a])):s>=o.length?(a=new hx(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var q1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,X1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Y1=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],Z1=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],px=new Oe,tc=new R,nm=new R;function K1(n,e,t){let i=new fo,r=new Ne,s=new Ne,o=new _t,a=new eu,c=new tu,l={},u=t.maxTextureSize,d={[Jn]:ln,[ln]:Jn,[un]:un},f=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ne},radius:{value:4}},vertexShader:q1,fragmentShader:X1}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let g=new qt;g.setAttribute("position",new Ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new mt(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$a;let m=this.type;this.render=function(T,D,_){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===fu&&(Se("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=$a);let E=n.getRenderTarget(),W=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),F=n.state;F.setBlending(xi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let U=m!==this.type;U&&D.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(B=>B.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,B=T.length;G<B;G++){let H=T[G],O=H.shadow;if(O===void 0){Se("WebGLShadowMap:",H,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;r.copy(O.mapSize);let Q=O.getFrameExtents();r.multiply(Q),s.copy(O.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Q.x),r.x=s.x*Q.x,O.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Q.y),r.y=s.y*Q.y,O.mapSize.y=s.y));let Z=n.state.buffers.depth.getReversed();if(O.camera._reversedDepth=Z,O.map===null||U===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===yo){if(H.isPointLight){Se("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new wn(r.x,r.y,{format:ns,type:Mi,minFilter:wt,magFilter:wt,generateMipmaps:!1}),O.map.texture.name=H.name+".shadowMap",O.map.depthTexture=new yr(r.x,r.y,Dn),O.map.depthTexture.name=H.name+".shadowMapDepth",O.map.depthTexture.format=mi,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Rt,O.map.depthTexture.magFilter=Rt}else H.isPointLight?(O.map=new od(r.x),O.map.depthTexture=new Jl(r.x,ti)):(O.map=new wn(r.x,r.y),O.map.depthTexture=new yr(r.x,r.y,ti)),O.map.depthTexture.name=H.name+".shadowMap",O.map.depthTexture.format=mi,this.type===$a?(O.map.depthTexture.compareFunction=Z?nd:td,O.map.depthTexture.minFilter=wt,O.map.depthTexture.magFilter=wt):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Rt,O.map.depthTexture.magFilter=Rt);O.camera.updateProjectionMatrix()}let le=O.map.isWebGLCubeRenderTarget?6:1;for(let pe=0;pe<le;pe++){if(O.map.isWebGLCubeRenderTarget)n.setRenderTarget(O.map,pe),n.clear();else{pe===0&&(n.setRenderTarget(O.map),n.clear());let de=O.getViewport(pe);o.set(s.x*de.x,s.y*de.y,s.x*de.z,s.y*de.w),F.viewport(o)}if(H.isPointLight){let de=O.camera,He=O.matrix,St=H.distance||de.far;St!==de.far&&(de.far=St,de.updateProjectionMatrix()),tc.setFromMatrixPosition(H.matrixWorld),de.position.copy(tc),nm.copy(de.position),nm.add(Y1[pe]),de.up.copy(Z1[pe]),de.lookAt(nm),de.updateMatrixWorld(),He.makeTranslation(-tc.x,-tc.y,-tc.z),px.multiplyMatrices(de.projectionMatrix,de.matrixWorldInverse),O._frustum.setFromProjectionMatrix(px,de.coordinateSystem,de.reversedDepth)}else O.updateMatrices(H);i=O.getFrustum(),S(D,_,O.camera,H,this.type)}O.isPointLightShadow!==!0&&this.type===yo&&M(O,_),O.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(E,W,A)};function M(T,D){let _=e.update(y);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new wn(r.x,r.y,{format:ns,type:Mi})),f.uniforms.shadow_pass.value=T.map.depthTexture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(D,null,_,f,y,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(D,null,_,h,y,null)}function b(T,D,_,E){let W=null,A=_.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(A!==void 0)W=A;else if(W=_.isPointLight===!0?c:a,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){let F=W.uuid,U=D.uuid,G=l[F];G===void 0&&(G={},l[F]=G);let B=G[U];B===void 0&&(B=W.clone(),G[U]=B,D.addEventListener("dispose",C)),W=B}if(W.visible=D.visible,W.wireframe=D.wireframe,E===yo?W.side=D.shadowSide!==null?D.shadowSide:D.side:W.side=D.shadowSide!==null?D.shadowSide:d[D.side],W.alphaMap=D.alphaMap,W.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,W.map=D.map,W.clipShadows=D.clipShadows,W.clippingPlanes=D.clippingPlanes,W.clipIntersection=D.clipIntersection,W.displacementMap=D.displacementMap,W.displacementScale=D.displacementScale,W.displacementBias=D.displacementBias,W.wireframeLinewidth=D.wireframeLinewidth,W.linewidth=D.linewidth,_.isPointLight===!0&&W.isMeshDistanceMaterial===!0){let F=n.properties.get(W);F.light=_}return W}function S(T,D,_,E,W){if(T.visible===!1)return;if(T.layers.test(D.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&W===yo)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,T.matrixWorld);let U=e.update(T),G=T.material;if(Array.isArray(G)){let B=U.groups;for(let H=0,O=B.length;H<O;H++){let Q=B[H],Z=G[Q.materialIndex];if(Z&&Z.visible){let le=b(T,Z,E,W);T.onBeforeShadow(n,T,D,_,U,le,Q),n.renderBufferDirect(_,null,U,le,T,Q),T.onAfterShadow(n,T,D,_,U,le,Q)}}}else if(G.visible){let B=b(T,G,E,W);T.onBeforeShadow(n,T,D,_,U,B,null),n.renderBufferDirect(_,null,U,B,T,null),T.onAfterShadow(n,T,D,_,U,B,null)}}let F=T.children;for(let U=0,G=F.length;U<G;U++)S(F[U],D,_,E,W)}function C(T){T.target.removeEventListener("dispose",C);for(let _ in l){let E=l[_],W=T.target.uuid;W in E&&(E[W].dispose(),delete E[W])}}}function J1(n,e){function t(){let N=!1,re=new _t,te=null,he=new _t(0,0,0,0);return{setMask:function(J){te!==J&&!N&&(n.colorMask(J,J,J,J),te=J)},setLocked:function(J){N=J},setClear:function(J,j,ye,Fe,yt){yt===!0&&(J*=Fe,j*=Fe,ye*=Fe),re.set(J,j,ye,Fe),he.equals(re)===!1&&(n.clearColor(J,j,ye,Fe),he.copy(re))},reset:function(){N=!1,te=null,he.set(-1,0,0,0)}}}function i(){let N=!1,re=!1,te=null,he=null,J=null;return{setReversed:function(j){if(re!==j){let ye=e.get("EXT_clip_control");j?ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.ZERO_TO_ONE_EXT):ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.NEGATIVE_ONE_TO_ONE_EXT),re=j;let Fe=J;J=null,this.setClear(Fe)}},getReversed:function(){return re},setTest:function(j){j?ne(n.DEPTH_TEST):se(n.DEPTH_TEST)},setMask:function(j){te!==j&&!N&&(n.depthMask(j),te=j)},setFunc:function(j){if(re&&(j=H_[j]),he!==j){switch(j){case Bl:n.depthFunc(n.NEVER);break;case Vl:n.depthFunc(n.ALWAYS);break;case Hl:n.depthFunc(n.LESS);break;case $r:n.depthFunc(n.LEQUAL);break;case zl:n.depthFunc(n.EQUAL);break;case Gl:n.depthFunc(n.GEQUAL);break;case Wl:n.depthFunc(n.GREATER);break;case jl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}he=j}},setLocked:function(j){N=j},setClear:function(j){J!==j&&(J=j,re&&(j=1-j),n.clearDepth(j))},reset:function(){N=!1,te=null,he=null,J=null,re=!1}}}function r(){let N=!1,re=null,te=null,he=null,J=null,j=null,ye=null,Fe=null,yt=null;return{setTest:function(ot){N||(ot?ne(n.STENCIL_TEST):se(n.STENCIL_TEST))},setMask:function(ot){re!==ot&&!N&&(n.stencilMask(ot),re=ot)},setFunc:function(ot,wi,Ti){(te!==ot||he!==wi||J!==Ti)&&(n.stencilFunc(ot,wi,Ti),te=ot,he=wi,J=Ti)},setOp:function(ot,wi,Ti){(j!==ot||ye!==wi||Fe!==Ti)&&(n.stencilOp(ot,wi,Ti),j=ot,ye=wi,Fe=Ti)},setLocked:function(ot){N=ot},setClear:function(ot){yt!==ot&&(n.clearStencil(ot),yt=ot)},reset:function(){N=!1,re=null,te=null,he=null,J=null,j=null,ye=null,Fe=null,yt=null}}}let s=new t,o=new i,a=new r,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,h=[],g=null,y=!1,p=null,m=null,M=null,b=null,S=null,C=null,T=null,D=new we(0,0,0),_=0,E=!1,W=null,A=null,F=null,U=null,G=null,B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,O=0,Q=n.getParameter(n.VERSION);Q.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(Q)[1]),H=O>=1):Q.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),H=O>=2);let Z=null,le={},pe=n.getParameter(n.SCISSOR_BOX),de=n.getParameter(n.VIEWPORT),He=new _t().fromArray(pe),St=new _t().fromArray(de);function xt(N,re,te,he){let J=new Uint8Array(4),j=n.createTexture();n.bindTexture(N,j),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ye=0;ye<te;ye++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(re,0,n.RGBA,1,1,he,0,n.RGBA,n.UNSIGNED_BYTE,J):n.texImage2D(re+ye,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,J);return j}let X={};X[n.TEXTURE_2D]=xt(n.TEXTURE_2D,n.TEXTURE_2D,1),X[n.TEXTURE_CUBE_MAP]=xt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[n.TEXTURE_2D_ARRAY]=xt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),X[n.TEXTURE_3D]=xt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ne(n.DEPTH_TEST),o.setFunc($r),Ge(!1),At(Tp),ne(n.CULL_FACE),st(xi);function ne(N){u[N]!==!0&&(n.enable(N),u[N]=!0)}function se(N){u[N]!==!1&&(n.disable(N),u[N]=!1)}function Ve(N,re){return d[N]!==re?(n.bindFramebuffer(N,re),d[N]=re,N===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=re),N===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=re),!0):!1}function Ae(N,re){let te=h,he=!1;if(N){te=f.get(re),te===void 0&&(te=[],f.set(re,te));let J=N.textures;if(te.length!==J.length||te[0]!==n.COLOR_ATTACHMENT0){for(let j=0,ye=J.length;j<ye;j++)te[j]=n.COLOR_ATTACHMENT0+j;te.length=J.length,he=!0}}else te[0]!==n.BACK&&(te[0]=n.BACK,he=!0);he&&n.drawBuffers(te)}function Pe(N){return g!==N?(n.useProgram(N),g=N,!0):!1}let Ht={[fr]:n.FUNC_ADD,[l_]:n.FUNC_SUBTRACT,[u_]:n.FUNC_REVERSE_SUBTRACT};Ht[d_]=n.MIN,Ht[f_]=n.MAX;let tt={[h_]:n.ZERO,[p_]:n.ONE,[m_]:n.SRC_COLOR,[Ul]:n.SRC_ALPHA,[M_]:n.SRC_ALPHA_SATURATE,[__]:n.DST_COLOR,[y_]:n.DST_ALPHA,[g_]:n.ONE_MINUS_SRC_COLOR,[kl]:n.ONE_MINUS_SRC_ALPHA,[x_]:n.ONE_MINUS_DST_COLOR,[v_]:n.ONE_MINUS_DST_ALPHA,[S_]:n.CONSTANT_COLOR,[b_]:n.ONE_MINUS_CONSTANT_COLOR,[E_]:n.CONSTANT_ALPHA,[w_]:n.ONE_MINUS_CONSTANT_ALPHA};function st(N,re,te,he,J,j,ye,Fe,yt,ot){if(N===xi){y===!0&&(se(n.BLEND),y=!1);return}if(y===!1&&(ne(n.BLEND),y=!0),N!==c_){if(N!==p||ot!==E){if((m!==fr||S!==fr)&&(n.blendEquation(n.FUNC_ADD),m=fr,S=fr),ot)switch(N){case jr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Cp:n.blendFunc(n.ONE,n.ONE);break;case Ap:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Dp:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ce("WebGLState: Invalid blending: ",N);break}else switch(N){case jr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Cp:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ap:Ce("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dp:Ce("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ce("WebGLState: Invalid blending: ",N);break}M=null,b=null,C=null,T=null,D.set(0,0,0),_=0,p=N,E=ot}return}J=J||re,j=j||te,ye=ye||he,(re!==m||J!==S)&&(n.blendEquationSeparate(Ht[re],Ht[J]),m=re,S=J),(te!==M||he!==b||j!==C||ye!==T)&&(n.blendFuncSeparate(tt[te],tt[he],tt[j],tt[ye]),M=te,b=he,C=j,T=ye),(Fe.equals(D)===!1||yt!==_)&&(n.blendColor(Fe.r,Fe.g,Fe.b,yt),D.copy(Fe),_=yt),p=N,E=!1}function ht(N,re){N.side===un?se(n.CULL_FACE):ne(n.CULL_FACE);let te=N.side===ln;re&&(te=!te),Ge(te),N.blending===jr&&N.transparent===!1?st(xi):st(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);let he=N.stencilWrite;a.setTest(he),he&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Lt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):se(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(N){W!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),W=N)}function At(N){N!==o_?(ne(n.CULL_FACE),N!==A&&(N===Tp?n.cullFace(n.BACK):N===a_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):se(n.CULL_FACE),A=N}function I(N){N!==F&&(H&&n.lineWidth(N),F=N)}function Lt(N,re,te){N?(ne(n.POLYGON_OFFSET_FILL),(U!==re||G!==te)&&(U=re,G=te,o.getReversed()&&(re=-re),n.polygonOffset(re,te))):se(n.POLYGON_OFFSET_FILL)}function it(N){N?ne(n.SCISSOR_TEST):se(n.SCISSOR_TEST)}function gt(N){N===void 0&&(N=n.TEXTURE0+B-1),Z!==N&&(n.activeTexture(N),Z=N)}function xe(N,re,te){te===void 0&&(Z===null?te=n.TEXTURE0+B-1:te=Z);let he=le[te];he===void 0&&(he={type:void 0,texture:void 0},le[te]=he),(he.type!==N||he.texture!==re)&&(Z!==te&&(n.activeTexture(te),Z=te),n.bindTexture(N,re||X[N]),he.type=N,he.texture=re)}function w(){let N=le[Z];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(N){Ce("WebGLState:",N)}}function P(){try{n.compressedTexImage3D(...arguments)}catch(N){Ce("WebGLState:",N)}}function q(){try{n.texSubImage2D(...arguments)}catch(N){Ce("WebGLState:",N)}}function Y(){try{n.texSubImage3D(...arguments)}catch(N){Ce("WebGLState:",N)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(N){Ce("WebGLState:",N)}}function me(){try{n.compressedTexSubImage3D(...arguments)}catch(N){Ce("WebGLState:",N)}}function ie(){try{n.texStorage2D(...arguments)}catch(N){Ce("WebGLState:",N)}}function Te(){try{n.texStorage3D(...arguments)}catch(N){Ce("WebGLState:",N)}}function De(){try{n.texImage2D(...arguments)}catch(N){Ce("WebGLState:",N)}}function K(){try{n.texImage3D(...arguments)}catch(N){Ce("WebGLState:",N)}}function ee(N){He.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),He.copy(N))}function ge(N){St.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),St.copy(N))}function ve(N,re){let te=l.get(re);te===void 0&&(te=new WeakMap,l.set(re,te));let he=te.get(N);he===void 0&&(he=n.getUniformBlockIndex(re,N.name),te.set(N,he))}function ue(N,re){let he=l.get(re).get(N);c.get(re)!==he&&(n.uniformBlockBinding(re,he,N.__bindingPointIndex),c.set(re,he))}function We(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},Z=null,le={},d={},f=new WeakMap,h=[],g=null,y=!1,p=null,m=null,M=null,b=null,S=null,C=null,T=null,D=new we(0,0,0),_=0,E=!1,W=null,A=null,F=null,U=null,G=null,He.set(0,0,n.canvas.width,n.canvas.height),St.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ne,disable:se,bindFramebuffer:Ve,drawBuffers:Ae,useProgram:Pe,setBlending:st,setMaterial:ht,setFlipSided:Ge,setCullFace:At,setLineWidth:I,setPolygonOffset:Lt,setScissorTest:it,activeTexture:gt,bindTexture:xe,unbindTexture:w,compressedTexImage2D:v,compressedTexImage3D:P,texImage2D:De,texImage3D:K,updateUBOMapping:ve,uniformBlockBinding:ue,texStorage2D:ie,texStorage3D:Te,texSubImage2D:q,texSubImage3D:Y,compressedTexSubImage2D:$,compressedTexSubImage3D:me,scissor:ee,viewport:ge,reset:We}}function Q1(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ne,u=new WeakMap,d,f=new WeakMap,h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,v){return h?new OffscreenCanvas(w,v):io("canvas")}function y(w,v,P){let q=1,Y=xe(w);if((Y.width>P||Y.height>P)&&(q=P/Math.max(Y.width,Y.height)),q<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let $=Math.floor(q*Y.width),me=Math.floor(q*Y.height);d===void 0&&(d=g($,me));let ie=v?g($,me):d;return ie.width=$,ie.height=me,ie.getContext("2d").drawImage(w,0,0,$,me),Se("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+$+"x"+me+")."),ie}else return"data"in w&&Se("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),w;return w}function p(w){return w.generateMipmaps}function m(w){n.generateMipmap(w)}function M(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(w,v,P,q,Y=!1){if(w!==null){if(n[w]!==void 0)return n[w];Se("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let $=v;if(v===n.RED&&(P===n.FLOAT&&($=n.R32F),P===n.HALF_FLOAT&&($=n.R16F),P===n.UNSIGNED_BYTE&&($=n.R8)),v===n.RED_INTEGER&&(P===n.UNSIGNED_BYTE&&($=n.R8UI),P===n.UNSIGNED_SHORT&&($=n.R16UI),P===n.UNSIGNED_INT&&($=n.R32UI),P===n.BYTE&&($=n.R8I),P===n.SHORT&&($=n.R16I),P===n.INT&&($=n.R32I)),v===n.RG&&(P===n.FLOAT&&($=n.RG32F),P===n.HALF_FLOAT&&($=n.RG16F),P===n.UNSIGNED_BYTE&&($=n.RG8)),v===n.RG_INTEGER&&(P===n.UNSIGNED_BYTE&&($=n.RG8UI),P===n.UNSIGNED_SHORT&&($=n.RG16UI),P===n.UNSIGNED_INT&&($=n.RG32UI),P===n.BYTE&&($=n.RG8I),P===n.SHORT&&($=n.RG16I),P===n.INT&&($=n.RG32I)),v===n.RGB_INTEGER&&(P===n.UNSIGNED_BYTE&&($=n.RGB8UI),P===n.UNSIGNED_SHORT&&($=n.RGB16UI),P===n.UNSIGNED_INT&&($=n.RGB32UI),P===n.BYTE&&($=n.RGB8I),P===n.SHORT&&($=n.RGB16I),P===n.INT&&($=n.RGB32I)),v===n.RGBA_INTEGER&&(P===n.UNSIGNED_BYTE&&($=n.RGBA8UI),P===n.UNSIGNED_SHORT&&($=n.RGBA16UI),P===n.UNSIGNED_INT&&($=n.RGBA32UI),P===n.BYTE&&($=n.RGBA8I),P===n.SHORT&&($=n.RGBA16I),P===n.INT&&($=n.RGBA32I)),v===n.RGB&&(P===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),P===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),v===n.RGBA){let me=Y?ya:Ze.getTransfer(q);P===n.FLOAT&&($=n.RGBA32F),P===n.HALF_FLOAT&&($=n.RGBA16F),P===n.UNSIGNED_BYTE&&($=me===rt?n.SRGB8_ALPHA8:n.RGBA8),P===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),P===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function S(w,v){let P;return w?v===null||v===ti||v===xo?P=n.DEPTH24_STENCIL8:v===Dn?P=n.DEPTH32F_STENCIL8:v===_o&&(P=n.DEPTH24_STENCIL8,Se("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ti||v===xo?P=n.DEPTH_COMPONENT24:v===Dn?P=n.DEPTH_COMPONENT32F:v===_o&&(P=n.DEPTH_COMPONENT16),P}function C(w,v){return p(w)===!0||w.isFramebufferTexture&&w.minFilter!==Rt&&w.minFilter!==wt?Math.log2(Math.max(v.width,v.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?v.mipmaps.length:1}function T(w){let v=w.target;v.removeEventListener("dispose",T),_(v),v.isVideoTexture&&u.delete(v)}function D(w){let v=w.target;v.removeEventListener("dispose",D),W(v)}function _(w){let v=i.get(w);if(v.__webglInit===void 0)return;let P=w.source,q=f.get(P);if(q){let Y=q[v.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&E(w),Object.keys(q).length===0&&f.delete(P)}i.remove(w)}function E(w){let v=i.get(w);n.deleteTexture(v.__webglTexture);let P=w.source,q=f.get(P);delete q[v.__cacheKey],o.memory.textures--}function W(w){let v=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let Y=0;Y<v.__webglFramebuffer[q].length;Y++)n.deleteFramebuffer(v.__webglFramebuffer[q][Y]);else n.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)n.deleteFramebuffer(v.__webglFramebuffer[q]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let P=w.textures;for(let q=0,Y=P.length;q<Y;q++){let $=i.get(P[q]);$.__webglTexture&&(n.deleteTexture($.__webglTexture),o.memory.textures--),i.remove(P[q])}i.remove(w)}let A=0;function F(){A=0}function U(){let w=A;return w>=r.maxTextures&&Se("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),A+=1,w}function G(w){let v=[];return v.push(w.wrapS),v.push(w.wrapT),v.push(w.wrapR||0),v.push(w.magFilter),v.push(w.minFilter),v.push(w.anisotropy),v.push(w.internalFormat),v.push(w.format),v.push(w.type),v.push(w.generateMipmaps),v.push(w.premultiplyAlpha),v.push(w.flipY),v.push(w.unpackAlignment),v.push(w.colorSpace),v.join()}function B(w,v){let P=i.get(w);if(w.isVideoTexture&&it(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&P.__version!==w.version){let q=w.image;if(q===null)Se("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Se("WebGLRenderer: Texture marked for update but image is incomplete");else{X(P,w,v);return}}else w.isExternalTexture&&(P.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,P.__webglTexture,n.TEXTURE0+v)}function H(w,v){let P=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&P.__version!==w.version){X(P,w,v);return}else w.isExternalTexture&&(P.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,P.__webglTexture,n.TEXTURE0+v)}function O(w,v){let P=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&P.__version!==w.version){X(P,w,v);return}t.bindTexture(n.TEXTURE_3D,P.__webglTexture,n.TEXTURE0+v)}function Q(w,v){let P=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&P.__version!==w.version){ne(P,w,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+v)}let Z={[pi]:n.REPEAT,[Ln]:n.CLAMP_TO_EDGE,[to]:n.MIRRORED_REPEAT},le={[Rt]:n.NEAREST,[mu]:n.NEAREST_MIPMAP_NEAREST,[ts]:n.NEAREST_MIPMAP_LINEAR,[wt]:n.LINEAR,[vo]:n.LINEAR_MIPMAP_NEAREST,[ei]:n.LINEAR_MIPMAP_LINEAR},pe={[N_]:n.NEVER,[U_]:n.ALWAYS,[P_]:n.LESS,[td]:n.LEQUAL,[L_]:n.EQUAL,[nd]:n.GEQUAL,[F_]:n.GREATER,[O_]:n.NOTEQUAL};function de(w,v){if(v.type===Dn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===wt||v.magFilter===vo||v.magFilter===ts||v.magFilter===ei||v.minFilter===wt||v.minFilter===vo||v.minFilter===ts||v.minFilter===ei)&&Se("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,Z[v.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,Z[v.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,Z[v.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,le[v.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,le[v.minFilter]),v.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,pe[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Rt||v.minFilter!==ts&&v.minFilter!==ei||v.type===Dn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){let P=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function He(w,v){let P=!1;w.__webglInit===void 0&&(w.__webglInit=!0,v.addEventListener("dispose",T));let q=v.source,Y=f.get(q);Y===void 0&&(Y={},f.set(q,Y));let $=G(v);if($!==w.__cacheKey){Y[$]===void 0&&(Y[$]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,P=!0),Y[$].usedTimes++;let me=Y[w.__cacheKey];me!==void 0&&(Y[w.__cacheKey].usedTimes--,me.usedTimes===0&&E(v)),w.__cacheKey=$,w.__webglTexture=Y[$].texture}return P}function St(w,v,P){return Math.floor(Math.floor(w/P)/v)}function xt(w,v,P,q){let $=w.updateRanges;if($.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,P,q,v.data);else{$.sort((K,ee)=>K.start-ee.start);let me=0;for(let K=1;K<$.length;K++){let ee=$[me],ge=$[K],ve=ee.start+ee.count,ue=St(ge.start,v.width,4),We=St(ee.start,v.width,4);ge.start<=ve+1&&ue===We&&St(ge.start+ge.count-1,v.width,4)===ue?ee.count=Math.max(ee.count,ge.start+ge.count-ee.start):(++me,$[me]=ge)}$.length=me+1;let ie=n.getParameter(n.UNPACK_ROW_LENGTH),Te=n.getParameter(n.UNPACK_SKIP_PIXELS),De=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let K=0,ee=$.length;K<ee;K++){let ge=$[K],ve=Math.floor(ge.start/4),ue=Math.ceil(ge.count/4),We=ve%v.width,N=Math.floor(ve/v.width),re=ue,te=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,We),n.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,We,N,re,te,P,q,v.data)}w.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ie),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Te),n.pixelStorei(n.UNPACK_SKIP_ROWS,De)}}function X(w,v,P){let q=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=n.TEXTURE_3D);let Y=He(w,v),$=v.source;t.bindTexture(q,w.__webglTexture,n.TEXTURE0+P);let me=i.get($);if($.version!==me.__version||Y===!0){t.activeTexture(n.TEXTURE0+P);let ie=Ze.getPrimaries(Ze.workingColorSpace),Te=v.colorSpace===Yi?null:Ze.getPrimaries(v.colorSpace),De=v.colorSpace===Yi||ie===Te?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let K=y(v.image,!1,r.maxTextureSize);K=gt(v,K);let ee=s.convert(v.format,v.colorSpace),ge=s.convert(v.type),ve=b(v.internalFormat,ee,ge,v.colorSpace,v.isVideoTexture);de(q,v);let ue,We=v.mipmaps,N=v.isVideoTexture!==!0,re=me.__version===void 0||Y===!0,te=$.dataReady,he=C(v,K);if(v.isDepthTexture)ve=S(v.format===Mr,v.type),re&&(N?t.texStorage2D(n.TEXTURE_2D,1,ve,K.width,K.height):t.texImage2D(n.TEXTURE_2D,0,ve,K.width,K.height,0,ee,ge,null));else if(v.isDataTexture)if(We.length>0){N&&re&&t.texStorage2D(n.TEXTURE_2D,he,ve,We[0].width,We[0].height);for(let J=0,j=We.length;J<j;J++)ue=We[J],N?te&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,ue.width,ue.height,ee,ge,ue.data):t.texImage2D(n.TEXTURE_2D,J,ve,ue.width,ue.height,0,ee,ge,ue.data);v.generateMipmaps=!1}else N?(re&&t.texStorage2D(n.TEXTURE_2D,he,ve,K.width,K.height),te&&xt(v,K,ee,ge)):t.texImage2D(n.TEXTURE_2D,0,ve,K.width,K.height,0,ee,ge,K.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){N&&re&&t.texStorage3D(n.TEXTURE_2D_ARRAY,he,ve,We[0].width,We[0].height,K.depth);for(let J=0,j=We.length;J<j;J++)if(ue=We[J],v.format!==In)if(ee!==null)if(N){if(te)if(v.layerUpdates.size>0){let ye=Zp(ue.width,ue.height,v.format,v.type);for(let Fe of v.layerUpdates){let yt=ue.data.subarray(Fe*ye/ue.data.BYTES_PER_ELEMENT,(Fe+1)*ye/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,Fe,ue.width,ue.height,1,ee,yt)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,ue.width,ue.height,K.depth,ee,ue.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,ve,ue.width,ue.height,K.depth,0,ue.data,0,0);else Se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?te&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,ue.width,ue.height,K.depth,ee,ge,ue.data):t.texImage3D(n.TEXTURE_2D_ARRAY,J,ve,ue.width,ue.height,K.depth,0,ee,ge,ue.data)}else{N&&re&&t.texStorage2D(n.TEXTURE_2D,he,ve,We[0].width,We[0].height);for(let J=0,j=We.length;J<j;J++)ue=We[J],v.format!==In?ee!==null?N?te&&t.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,ue.width,ue.height,ee,ue.data):t.compressedTexImage2D(n.TEXTURE_2D,J,ve,ue.width,ue.height,0,ue.data):Se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?te&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,ue.width,ue.height,ee,ge,ue.data):t.texImage2D(n.TEXTURE_2D,J,ve,ue.width,ue.height,0,ee,ge,ue.data)}else if(v.isDataArrayTexture)if(N){if(re&&t.texStorage3D(n.TEXTURE_2D_ARRAY,he,ve,K.width,K.height,K.depth),te)if(v.layerUpdates.size>0){let J=Zp(K.width,K.height,v.format,v.type);for(let j of v.layerUpdates){let ye=K.data.subarray(j*J/K.data.BYTES_PER_ELEMENT,(j+1)*J/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,K.width,K.height,1,ee,ge,ye)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,ee,ge,K.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ve,K.width,K.height,K.depth,0,ee,ge,K.data);else if(v.isData3DTexture)N?(re&&t.texStorage3D(n.TEXTURE_3D,he,ve,K.width,K.height,K.depth),te&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,ee,ge,K.data)):t.texImage3D(n.TEXTURE_3D,0,ve,K.width,K.height,K.depth,0,ee,ge,K.data);else if(v.isFramebufferTexture){if(re)if(N)t.texStorage2D(n.TEXTURE_2D,he,ve,K.width,K.height);else{let J=K.width,j=K.height;for(let ye=0;ye<he;ye++)t.texImage2D(n.TEXTURE_2D,ye,ve,J,j,0,ee,ge,null),J>>=1,j>>=1}}else if(We.length>0){if(N&&re){let J=xe(We[0]);t.texStorage2D(n.TEXTURE_2D,he,ve,J.width,J.height)}for(let J=0,j=We.length;J<j;J++)ue=We[J],N?te&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,ee,ge,ue):t.texImage2D(n.TEXTURE_2D,J,ve,ee,ge,ue);v.generateMipmaps=!1}else if(N){if(re){let J=xe(K);t.texStorage2D(n.TEXTURE_2D,he,ve,J.width,J.height)}te&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ee,ge,K)}else t.texImage2D(n.TEXTURE_2D,0,ve,ee,ge,K);p(v)&&m(q),me.__version=$.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function ne(w,v,P){if(v.image.length!==6)return;let q=He(w,v),Y=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+P);let $=i.get(Y);if(Y.version!==$.__version||q===!0){t.activeTexture(n.TEXTURE0+P);let me=Ze.getPrimaries(Ze.workingColorSpace),ie=v.colorSpace===Yi?null:Ze.getPrimaries(v.colorSpace),Te=v.colorSpace===Yi||me===ie?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);let De=v.isCompressedTexture||v.image[0].isCompressedTexture,K=v.image[0]&&v.image[0].isDataTexture,ee=[];for(let j=0;j<6;j++)!De&&!K?ee[j]=y(v.image[j],!0,r.maxCubemapSize):ee[j]=K?v.image[j].image:v.image[j],ee[j]=gt(v,ee[j]);let ge=ee[0],ve=s.convert(v.format,v.colorSpace),ue=s.convert(v.type),We=b(v.internalFormat,ve,ue,v.colorSpace),N=v.isVideoTexture!==!0,re=$.__version===void 0||q===!0,te=Y.dataReady,he=C(v,ge);de(n.TEXTURE_CUBE_MAP,v);let J;if(De){N&&re&&t.texStorage2D(n.TEXTURE_CUBE_MAP,he,We,ge.width,ge.height);for(let j=0;j<6;j++){J=ee[j].mipmaps;for(let ye=0;ye<J.length;ye++){let Fe=J[ye];v.format!==In?ve!==null?N?te&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye,0,0,Fe.width,Fe.height,ve,Fe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye,We,Fe.width,Fe.height,0,Fe.data):Se("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye,0,0,Fe.width,Fe.height,ve,ue,Fe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye,We,Fe.width,Fe.height,0,ve,ue,Fe.data)}}}else{if(J=v.mipmaps,N&&re){J.length>0&&he++;let j=xe(ee[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,he,We,j.width,j.height)}for(let j=0;j<6;j++)if(K){N?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ee[j].width,ee[j].height,ve,ue,ee[j].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,We,ee[j].width,ee[j].height,0,ve,ue,ee[j].data);for(let ye=0;ye<J.length;ye++){let yt=J[ye].image[j].image;N?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye+1,0,0,yt.width,yt.height,ve,ue,yt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye+1,We,yt.width,yt.height,0,ve,ue,yt.data)}}else{N?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ve,ue,ee[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,We,ve,ue,ee[j]);for(let ye=0;ye<J.length;ye++){let Fe=J[ye];N?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye+1,0,0,ve,ue,Fe.image[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye+1,We,ve,ue,Fe.image[j])}}}p(v)&&m(n.TEXTURE_CUBE_MAP),$.__version=Y.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function se(w,v,P,q,Y,$){let me=s.convert(P.format,P.colorSpace),ie=s.convert(P.type),Te=b(P.internalFormat,me,ie,P.colorSpace),De=i.get(v),K=i.get(P);if(K.__renderTarget=v,!De.__hasExternalTextures){let ee=Math.max(1,v.width>>$),ge=Math.max(1,v.height>>$);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?t.texImage3D(Y,$,Te,ee,ge,v.depth,0,me,ie,null):t.texImage2D(Y,$,Te,ee,ge,0,me,ie,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),Lt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,Y,K.__webglTexture,0,I(v)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,Y,K.__webglTexture,$),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ve(w,v,P){if(n.bindRenderbuffer(n.RENDERBUFFER,w),v.depthBuffer){let q=v.depthTexture,Y=q&&q.isDepthTexture?q.type:null,$=S(v.stencilBuffer,Y),me=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Lt(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,I(v),$,v.width,v.height):P?n.renderbufferStorageMultisample(n.RENDERBUFFER,I(v),$,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,$,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,me,n.RENDERBUFFER,w)}else{let q=v.textures;for(let Y=0;Y<q.length;Y++){let $=q[Y],me=s.convert($.format,$.colorSpace),ie=s.convert($.type),Te=b($.internalFormat,me,ie,$.colorSpace);Lt(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,I(v),Te,v.width,v.height):P?n.renderbufferStorageMultisample(n.RENDERBUFFER,I(v),Te,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Te,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ae(w,v,P){let q=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Y=i.get(v.depthTexture);if(Y.__renderTarget=v,(!Y.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),q){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,v.depthTexture.addEventListener("dispose",T)),Y.__webglTexture===void 0){Y.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),de(n.TEXTURE_CUBE_MAP,v.depthTexture);let De=s.convert(v.depthTexture.format),K=s.convert(v.depthTexture.type),ee;v.depthTexture.format===mi?ee=n.DEPTH_COMPONENT24:v.depthTexture.format===Mr&&(ee=n.DEPTH24_STENCIL8);for(let ge=0;ge<6;ge++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,ee,v.width,v.height,0,De,K,null)}}else B(v.depthTexture,0);let $=Y.__webglTexture,me=I(v),ie=q?n.TEXTURE_CUBE_MAP_POSITIVE_X+P:n.TEXTURE_2D,Te=v.depthTexture.format===Mr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===mi)Lt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Te,ie,$,0,me):n.framebufferTexture2D(n.FRAMEBUFFER,Te,ie,$,0);else if(v.depthTexture.format===Mr)Lt(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Te,ie,$,0,me):n.framebufferTexture2D(n.FRAMEBUFFER,Te,ie,$,0);else throw new Error("Unknown depthTexture format")}function Pe(w){let v=i.get(w),P=w.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==w.depthTexture){let q=w.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){let Y=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",Y)};q.addEventListener("dispose",Y),v.__depthDisposeCallback=Y}v.__boundDepthTexture=q}if(w.depthTexture&&!v.__autoAllocateDepthBuffer)if(P)for(let q=0;q<6;q++)Ae(v.__webglFramebuffer[q],w,q);else{let q=w.texture.mipmaps;q&&q.length>0?Ae(v.__webglFramebuffer[0],w,0):Ae(v.__webglFramebuffer,w,0)}else if(P){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=n.createRenderbuffer(),Ve(v.__webglDepthbuffer[q],w,!1);else{let Y=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,$)}}else{let q=w.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Ve(v.__webglDepthbuffer,w,!1);else{let Y=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,$)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ht(w,v,P){let q=i.get(w);v!==void 0&&se(q.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),P!==void 0&&Pe(w)}function tt(w){let v=w.texture,P=i.get(w),q=i.get(v);w.addEventListener("dispose",D);let Y=w.textures,$=w.isWebGLCubeRenderTarget===!0,me=Y.length>1;if(me||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=v.version,o.memory.textures++),$){P.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(v.mipmaps&&v.mipmaps.length>0){P.__webglFramebuffer[ie]=[];for(let Te=0;Te<v.mipmaps.length;Te++)P.__webglFramebuffer[ie][Te]=n.createFramebuffer()}else P.__webglFramebuffer[ie]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){P.__webglFramebuffer=[];for(let ie=0;ie<v.mipmaps.length;ie++)P.__webglFramebuffer[ie]=n.createFramebuffer()}else P.__webglFramebuffer=n.createFramebuffer();if(me)for(let ie=0,Te=Y.length;ie<Te;ie++){let De=i.get(Y[ie]);De.__webglTexture===void 0&&(De.__webglTexture=n.createTexture(),o.memory.textures++)}if(w.samples>0&&Lt(w)===!1){P.__webglMultisampledFramebuffer=n.createFramebuffer(),P.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let ie=0;ie<Y.length;ie++){let Te=Y[ie];P.__webglColorRenderbuffer[ie]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,P.__webglColorRenderbuffer[ie]);let De=s.convert(Te.format,Te.colorSpace),K=s.convert(Te.type),ee=b(Te.internalFormat,De,K,Te.colorSpace,w.isXRRenderTarget===!0),ge=I(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,ge,ee,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.RENDERBUFFER,P.__webglColorRenderbuffer[ie])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(P.__webglDepthRenderbuffer=n.createRenderbuffer(),Ve(P.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),de(n.TEXTURE_CUBE_MAP,v);for(let ie=0;ie<6;ie++)if(v.mipmaps&&v.mipmaps.length>0)for(let Te=0;Te<v.mipmaps.length;Te++)se(P.__webglFramebuffer[ie][Te],w,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Te);else se(P.__webglFramebuffer[ie],w,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);p(v)&&m(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(me){for(let ie=0,Te=Y.length;ie<Te;ie++){let De=Y[ie],K=i.get(De),ee=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ee=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ee,K.__webglTexture),de(ee,De),se(P.__webglFramebuffer,w,De,n.COLOR_ATTACHMENT0+ie,ee,0),p(De)&&m(ee)}t.unbindTexture()}else{let ie=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ie=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ie,q.__webglTexture),de(ie,v),v.mipmaps&&v.mipmaps.length>0)for(let Te=0;Te<v.mipmaps.length;Te++)se(P.__webglFramebuffer[Te],w,v,n.COLOR_ATTACHMENT0,ie,Te);else se(P.__webglFramebuffer,w,v,n.COLOR_ATTACHMENT0,ie,0);p(v)&&m(ie),t.unbindTexture()}w.depthBuffer&&Pe(w)}function st(w){let v=w.textures;for(let P=0,q=v.length;P<q;P++){let Y=v[P];if(p(Y)){let $=M(w),me=i.get(Y).__webglTexture;t.bindTexture($,me),m($),t.unbindTexture()}}}let ht=[],Ge=[];function At(w){if(w.samples>0){if(Lt(w)===!1){let v=w.textures,P=w.width,q=w.height,Y=n.COLOR_BUFFER_BIT,$=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=i.get(w),ie=v.length>1;if(ie)for(let De=0;De<v.length;De++)t.bindFramebuffer(n.FRAMEBUFFER,me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer);let Te=w.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,me.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let De=0;De<v.length;De++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),ie){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,me.__webglColorRenderbuffer[De]);let K=i.get(v[De]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,K,0)}n.blitFramebuffer(0,0,P,q,0,0,P,q,Y,n.NEAREST),c===!0&&(ht.length=0,Ge.length=0,ht.push(n.COLOR_ATTACHMENT0+De),w.depthBuffer&&w.resolveDepthBuffer===!1&&(ht.push($),Ge.push($),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ge)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ht))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ie)for(let De=0;De<v.length;De++){t.bindFramebuffer(n.FRAMEBUFFER,me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.RENDERBUFFER,me.__webglColorRenderbuffer[De]);let K=i.get(v[De]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+De,n.TEXTURE_2D,K,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){let v=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function I(w){return Math.min(r.maxSamples,w.samples)}function Lt(w){let v=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function it(w){let v=o.render.frame;u.get(w)!==v&&(u.set(w,v),w.update())}function gt(w,v){let P=w.colorSpace,q=w.format,Y=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||P!==Zt&&P!==Yi&&(Ze.getTransfer(P)===rt?(q!==In||Y!==vn)&&Se("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ce("WebGLTextures: Unsupported texture color space:",P)),v}function xe(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=U,this.resetTextureUnits=F,this.setTexture2D=B,this.setTexture2DArray=H,this.setTexture3D=O,this.setTextureCube=Q,this.rebindTextures=Ht,this.setupRenderTarget=tt,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=At,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=se,this.useMultisampledRTT=Lt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function eR(n,e){function t(i,r=Yi){let s,o=Ze.getTransfer(r);if(i===vn)return n.UNSIGNED_BYTE;if(i===yu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===vu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Bp)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Vp)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Up)return n.BYTE;if(i===kp)return n.SHORT;if(i===_o)return n.UNSIGNED_SHORT;if(i===gu)return n.INT;if(i===ti)return n.UNSIGNED_INT;if(i===Dn)return n.FLOAT;if(i===Mi)return n.HALF_FLOAT;if(i===Hp)return n.ALPHA;if(i===zp)return n.RGB;if(i===In)return n.RGBA;if(i===mi)return n.DEPTH_COMPONENT;if(i===Mr)return n.DEPTH_STENCIL;if(i===_u)return n.RED;if(i===xu)return n.RED_INTEGER;if(i===ns)return n.RG;if(i===Mu)return n.RG_INTEGER;if(i===Su)return n.RGBA_INTEGER;if(i===Ya||i===Za||i===Ka||i===Ja)if(o===rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ya)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Za)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ka)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ja)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ya)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Za)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ka)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ja)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===bu||i===Eu||i===wu||i===Tu)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===bu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Eu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===wu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Tu)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Cu||i===Au||i===Du||i===Iu||i===Ru||i===Nu||i===Pu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Cu||i===Au)return o===rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Du)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Iu)return s.COMPRESSED_R11_EAC;if(i===Ru)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Nu)return s.COMPRESSED_RG11_EAC;if(i===Pu)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Lu||i===Fu||i===Ou||i===Uu||i===ku||i===Bu||i===Vu||i===Hu||i===zu||i===Gu||i===Wu||i===ju||i===$u||i===qu)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Lu)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Fu)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ou)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Uu)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ku)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Bu)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Vu)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Hu)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===zu)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Gu)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Wu)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ju)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===$u)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===qu)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Xu||i===Yu||i===Zu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Xu)return o===rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Yu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Zu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ku||i===Ju||i===Qu||i===ed)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ku)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ju)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Qu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ed)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===xo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var tR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nR=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,um=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Pa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new An({vertexShader:tR,fragmentShader:nR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new mt(new ji(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},dm=class extends Wi{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,h=null,g=null,y=typeof XRWebGLBinding<"u",p=new um,m={},M=t.getContextAttributes(),b=null,S=null,C=[],T=[],D=new Ne,_=null,E=new Ot;E.viewport=new _t;let W=new Ot;W.viewport=new _t;let A=[E,W],F=new uu,U=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ne=C[X];return ne===void 0&&(ne=new ao,C[X]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(X){let ne=C[X];return ne===void 0&&(ne=new ao,C[X]=ne),ne.getGripSpace()},this.getHand=function(X){let ne=C[X];return ne===void 0&&(ne=new ao,C[X]=ne),ne.getHandSpace()};function B(X){let ne=T.indexOf(X.inputSource);if(ne===-1)return;let se=C[ne];se!==void 0&&(se.update(X.inputSource,X.frame,l||o),se.dispatchEvent({type:X.type,data:X.inputSource}))}function H(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",O);for(let X=0;X<C.length;X++){let ne=T[X];ne!==null&&(T[X]=null,C[X].disconnect(ne))}U=null,G=null,p.reset();for(let X in m)delete m[X];e.setRenderTarget(b),h=null,f=null,d=null,r=null,S=null,xt.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&Se("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&Se("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=function(X){return Cr(this,null,function*(){if(r=X,r!==null){if(b=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",H),r.addEventListener("inputsourceschange",O),M.xrCompatible!==!0&&(yield t.makeXRCompatible()),_=e.getPixelRatio(),e.getSize(D),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,Ve=null,Ae=null;M.depth&&(Ae=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=M.stencil?Mr:mi,Ve=M.stencil?xo:ti);let Pe={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Pe),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new wn(f.textureWidth,f.textureHeight,{format:In,type:vn,depthTexture:new yr(f.textureWidth,f.textureHeight,Ve,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let se={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),S=new wn(h.framebufferWidth,h.framebufferHeight,{format:In,type:vn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=yield r.requestReferenceSpace(a),xt.setContext(r),xt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}})},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function O(X){for(let ne=0;ne<X.removed.length;ne++){let se=X.removed[ne],Ve=T.indexOf(se);Ve>=0&&(T[Ve]=null,C[Ve].disconnect(se))}for(let ne=0;ne<X.added.length;ne++){let se=X.added[ne],Ve=T.indexOf(se);if(Ve===-1){for(let Pe=0;Pe<C.length;Pe++)if(Pe>=T.length){T.push(se),Ve=Pe;break}else if(T[Pe]===null){T[Pe]=se,Ve=Pe;break}if(Ve===-1)break}let Ae=C[Ve];Ae&&Ae.connect(se)}}let Q=new R,Z=new R;function le(X,ne,se){Q.setFromMatrixPosition(ne.matrixWorld),Z.setFromMatrixPosition(se.matrixWorld);let Ve=Q.distanceTo(Z),Ae=ne.projectionMatrix.elements,Pe=se.projectionMatrix.elements,Ht=Ae[14]/(Ae[10]-1),tt=Ae[14]/(Ae[10]+1),st=(Ae[9]+1)/Ae[5],ht=(Ae[9]-1)/Ae[5],Ge=(Ae[8]-1)/Ae[0],At=(Pe[8]+1)/Pe[0],I=Ht*Ge,Lt=Ht*At,it=Ve/(-Ge+At),gt=it*-Ge;if(ne.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(gt),X.translateZ(it),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Ae[10]===-1)X.projectionMatrix.copy(ne.projectionMatrix),X.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{let xe=Ht+it,w=tt+it,v=I-gt,P=Lt+(Ve-gt),q=st*tt/w*xe,Y=ht*tt/w*xe;X.projectionMatrix.makePerspective(v,P,q,Y,xe,w),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function pe(X,ne){ne===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ne.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let ne=X.near,se=X.far;p.texture!==null&&(p.depthNear>0&&(ne=p.depthNear),p.depthFar>0&&(se=p.depthFar)),F.near=W.near=E.near=ne,F.far=W.far=E.far=se,(U!==F.near||G!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),U=F.near,G=F.far),F.layers.mask=X.layers.mask|6,E.layers.mask=F.layers.mask&-5,W.layers.mask=F.layers.mask&-3;let Ve=X.parent,Ae=F.cameras;pe(F,Ve);for(let Pe=0;Pe<Ae.length;Pe++)pe(Ae[Pe],Ve);Ae.length===2?le(F,E,W):F.projectionMatrix.copy(E.projectionMatrix),de(X,F,Ve)};function de(X,ne,se){se===null?X.matrix.copy(ne.matrixWorld):(X.matrix.copy(se.matrixWorld),X.matrix.invert(),X.matrix.multiply(ne.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ne.projectionMatrix),X.projectionMatrixInverse.copy(ne.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Yr*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function(X){c=X,f!==null&&(f.fixedFoveation=X),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=X)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(X){return m[X]};let He=null;function St(X,ne){if(u=ne.getViewerPose(l||o),g=ne,u!==null){let se=u.views;h!==null&&(e.setRenderTargetFramebuffer(S,h.framebuffer),e.setRenderTarget(S));let Ve=!1;se.length!==F.cameras.length&&(F.cameras.length=0,Ve=!0);for(let tt=0;tt<se.length;tt++){let st=se[tt],ht=null;if(h!==null)ht=h.getViewport(st);else{let At=d.getViewSubImage(f,st);ht=At.viewport,tt===0&&(e.setRenderTargetTextures(S,At.colorTexture,At.depthStencilTexture),e.setRenderTarget(S))}let Ge=A[tt];Ge===void 0&&(Ge=new Ot,Ge.layers.enable(tt),Ge.viewport=new _t,A[tt]=Ge),Ge.matrix.fromArray(st.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(st.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(ht.x,ht.y,ht.width,ht.height),tt===0&&(F.matrix.copy(Ge.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ve===!0&&F.cameras.push(Ge)}let Ae=r.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){d=i.getBinding();let tt=d.getDepthInformation(se[0]);tt&&tt.isValid&&tt.texture&&p.init(tt,r.renderState)}if(Ae&&Ae.includes("camera-access")&&y){e.state.unbindTexture(),d=i.getBinding();for(let tt=0;tt<se.length;tt++){let st=se[tt].camera;if(st){let ht=m[st];ht||(ht=new Pa,m[st]=ht);let Ge=d.getCameraImage(st);ht.sourceTexture=Ge}}}}for(let se=0;se<C.length;se++){let Ve=T[se],Ae=C[se];Ve!==null&&Ae!==void 0&&Ae.update(Ve,ne,l||o)}He&&He(X,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),g=null}let xt=new mx;xt.setAnimationLoop(St),this.setAnimationLoop=function(X){He=X},this.dispose=function(){}}},os=new hr,iR=new Oe;function rR(n,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,qp(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,M,b,S){m.isMeshBasicMaterial?s(p,m):m.isMeshLambertMaterial?(s(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(p,m),f(p,m),m.isMeshPhysicalMaterial&&h(p,m,S)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),y(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,M,b):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===ln&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===ln&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let M=e.get(m),b=M.envMap,S=M.envMapRotation;b&&(p.envMap.value=b,os.copy(S),os.x*=-1,os.y*=-1,os.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(os.y*=-1,os.z*=-1),p.envMapRotation.value.setFromMatrix4(iR.makeRotationFromEuler(os)),p.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,M,b){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=b*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function h(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===ln&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function y(p,m){let M=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function sR(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,b){let S=b.program;i.uniformBlockBinding(M,S)}function l(M,b){let S=r[M.id];S===void 0&&(g(M),S=u(M),r[M.id]=S,M.addEventListener("dispose",p));let C=b.program;i.updateUBOMapping(M,C);let T=e.render.frame;s[M.id]!==T&&(f(M),s[M.id]=T)}function u(M){let b=d();M.__bindingPointIndex=b;let S=n.createBuffer(),C=M.__size,T=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,C,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,S),S}function d(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return Ce("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){let b=r[M.id],S=M.uniforms,C=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let T=0,D=S.length;T<D;T++){let _=Array.isArray(S[T])?S[T]:[S[T]];for(let E=0,W=_.length;E<W;E++){let A=_[E];if(h(A,T,E,C)===!0){let F=A.__offset,U=Array.isArray(A.value)?A.value:[A.value],G=0;for(let B=0;B<U.length;B++){let H=U[B],O=y(H);typeof H=="number"||typeof H=="boolean"?(A.__data[0]=H,n.bufferSubData(n.UNIFORM_BUFFER,F+G,A.__data)):H.isMatrix3?(A.__data[0]=H.elements[0],A.__data[1]=H.elements[1],A.__data[2]=H.elements[2],A.__data[3]=0,A.__data[4]=H.elements[3],A.__data[5]=H.elements[4],A.__data[6]=H.elements[5],A.__data[7]=0,A.__data[8]=H.elements[6],A.__data[9]=H.elements[7],A.__data[10]=H.elements[8],A.__data[11]=0):(H.toArray(A.__data,G),G+=O.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(M,b,S,C){let T=M.value,D=b+"_"+S;if(C[D]===void 0)return typeof T=="number"||typeof T=="boolean"?C[D]=T:C[D]=T.clone(),!0;{let _=C[D];if(typeof T=="number"||typeof T=="boolean"){if(_!==T)return C[D]=T,!0}else if(_.equals(T)===!1)return _.copy(T),!0}return!1}function g(M){let b=M.uniforms,S=0,C=16;for(let D=0,_=b.length;D<_;D++){let E=Array.isArray(b[D])?b[D]:[b[D]];for(let W=0,A=E.length;W<A;W++){let F=E[W],U=Array.isArray(F.value)?F.value:[F.value];for(let G=0,B=U.length;G<B;G++){let H=U[G],O=y(H),Q=S%C,Z=Q%O.boundary,le=Q+Z;S+=Z,le!==0&&C-le<O.storage&&(S+=C-le),F.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=S,S+=O.storage}}}let T=S%C;return T>0&&(S+=C-T),M.__size=S,M.__cache={},this}function y(M){let b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?Se("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Se("WebGLRenderer: Unsupported uniform value type.",M),b}function p(M){let b=M.target;b.removeEventListener("dispose",p);let S=o.indexOf(b.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[b.id]),delete r[b.id],delete s[b.id]}function m(){for(let M in r)n.deleteBuffer(r[M]);o=[],r={},s={}}return{bind:c,update:l,dispose:m}}var oR=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Si=null;function aR(){return Si===null&&(Si=new uo(oR,16,16,ns,Mi),Si.name="DFG_LUT",Si.minFilter=wt,Si.magFilter=wt,Si.wrapS=Ln,Si.wrapT=Ln,Si.generateMipmaps=!1,Si.needsUpdate=!0),Si}var ad=class{constructor(e={}){let{canvas:t=k_(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=vn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;let y=h,p=new Set([Su,Mu,xu]),m=new Set([vn,ti,_o,xo,yu,vu]),M=new Uint32Array(4),b=new Int32Array(4),S=null,C=null,T=[],D=[],_=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let E=this,W=!1;this._outputColorSpace=kt;let A=0,F=0,U=null,G=-1,B=null,H=new _t,O=new _t,Q=null,Z=new we(0),le=0,pe=t.width,de=t.height,He=1,St=null,xt=null,X=new _t(0,0,pe,de),ne=new _t(0,0,pe,de),se=!1,Ve=new fo,Ae=!1,Pe=!1,Ht=new Oe,tt=new R,st=new _t,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ge=!1;function At(){return U===null?He:1}let I=i;function Lt(x,L){return t.getContext(x,L)}try{let x={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${du}`),t.addEventListener("webglcontextlost",ye,!1),t.addEventListener("webglcontextrestored",Fe,!1),t.addEventListener("webglcontextcreationerror",yt,!1),I===null){let L="webgl2";if(I=Lt(L,x),I===null)throw Lt(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw Ce("WebGLRenderer: "+x.message),x}let it,gt,xe,w,v,P,q,Y,$,me,ie,Te,De,K,ee,ge,ve,ue,We,N,re,te,he;function J(){it=new mI(I),it.init(),re=new eR(I,it),gt=new aI(I,it,e,re),xe=new J1(I,it),gt.reversedDepthBuffer&&f&&xe.buffers.depth.setReversed(!0),w=new vI(I),v=new k1,P=new Q1(I,it,xe,v,gt,re,w),q=new pI(E),Y=new bC(I),te=new sI(I,Y),$=new gI(I,Y,w,te),me=new xI(I,$,Y,te,w),ue=new _I(I,gt,P),ee=new cI(v),ie=new U1(E,q,it,gt,te,ee),Te=new rR(E,v),De=new V1,K=new $1(it),ve=new rI(E,q,xe,me,g,c),ge=new K1(E,me,gt),he=new sR(I,w,gt,xe),We=new oI(I,it,w),N=new yI(I,it,w),w.programs=ie.programs,E.capabilities=gt,E.extensions=it,E.properties=v,E.renderLists=De,E.shadowMap=ge,E.state=xe,E.info=w}J(),y!==vn&&(_=new SI(y,t.width,t.height,r,s));let j=new dm(E,I);this.xr=j,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let x=it.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=it.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return He},this.setPixelRatio=function(x){x!==void 0&&(He=x,this.setSize(pe,de,!1))},this.getSize=function(x){return x.set(pe,de)},this.setSize=function(x,L,z=!0){if(j.isPresenting){Se("WebGLRenderer: Can't change size while VR device is presenting.");return}pe=x,de=L,t.width=Math.floor(x*He),t.height=Math.floor(L*He),z===!0&&(t.style.width=x+"px",t.style.height=L+"px"),_!==null&&_.setSize(t.width,t.height),this.setViewport(0,0,x,L)},this.getDrawingBufferSize=function(x){return x.set(pe*He,de*He).floor()},this.setDrawingBufferSize=function(x,L,z){pe=x,de=L,He=z,t.width=Math.floor(x*z),t.height=Math.floor(L*z),this.setViewport(0,0,x,L)},this.setEffects=function(x){if(y===vn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let L=0;L<x.length;L++)if(x[L].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}_.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(H)},this.getViewport=function(x){return x.copy(X)},this.setViewport=function(x,L,z,V){x.isVector4?X.set(x.x,x.y,x.z,x.w):X.set(x,L,z,V),xe.viewport(H.copy(X).multiplyScalar(He).round())},this.getScissor=function(x){return x.copy(ne)},this.setScissor=function(x,L,z,V){x.isVector4?ne.set(x.x,x.y,x.z,x.w):ne.set(x,L,z,V),xe.scissor(O.copy(ne).multiplyScalar(He).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(x){xe.setScissorTest(se=x)},this.setOpaqueSort=function(x){St=x},this.setTransparentSort=function(x){xt=x},this.getClearColor=function(x){return x.copy(ve.getClearColor())},this.setClearColor=function(){ve.setClearColor(...arguments)},this.getClearAlpha=function(){return ve.getClearAlpha()},this.setClearAlpha=function(){ve.setClearAlpha(...arguments)},this.clear=function(x=!0,L=!0,z=!0){let V=0;if(x){let k=!1;if(U!==null){let ae=U.texture.format;k=p.has(ae)}if(k){let ae=U.texture.type,fe=m.has(ae),ce=ve.getClearColor(),_e=ve.getClearAlpha(),be=ce.r,Ue=ce.g,je=ce.b;fe?(M[0]=be,M[1]=Ue,M[2]=je,M[3]=_e,I.clearBufferuiv(I.COLOR,0,M)):(b[0]=be,b[1]=Ue,b[2]=je,b[3]=_e,I.clearBufferiv(I.COLOR,0,b))}else V|=I.COLOR_BUFFER_BIT}L&&(V|=I.DEPTH_BUFFER_BIT),z&&(V|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&I.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ye,!1),t.removeEventListener("webglcontextrestored",Fe,!1),t.removeEventListener("webglcontextcreationerror",yt,!1),ve.dispose(),De.dispose(),K.dispose(),v.dispose(),q.dispose(),me.dispose(),te.dispose(),he.dispose(),ie.dispose(),j.dispose(),j.removeEventListener("sessionstart",zm),j.removeEventListener("sessionend",Gm),wr.stop()};function ye(x){x.preventDefault(),va("WebGLRenderer: Context Lost."),W=!0}function Fe(){va("WebGLRenderer: Context Restored."),W=!1;let x=w.autoReset,L=ge.enabled,z=ge.autoUpdate,V=ge.needsUpdate,k=ge.type;J(),w.autoReset=x,ge.enabled=L,ge.autoUpdate=z,ge.needsUpdate=V,ge.type=k}function yt(x){Ce("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function ot(x){let L=x.target;L.removeEventListener("dispose",ot),wi(L)}function wi(x){Ti(x),v.remove(x)}function Ti(x){let L=v.get(x).programs;L!==void 0&&(L.forEach(function(z){ie.releaseProgram(z)}),x.isShaderMaterial&&ie.releaseShaderCache(x))}this.renderBufferDirect=function(x,L,z,V,k,ae){L===null&&(L=ht);let fe=k.isMesh&&k.matrixWorld.determinant()<0,ce=Rx(x,L,z,V,k);xe.setMaterial(V,fe);let _e=z.index,be=1;if(V.wireframe===!0){if(_e=$.getWireframeAttribute(z),_e===void 0)return;be=2}let Ue=z.drawRange,je=z.attributes.position,Ee=Ue.start*be,ut=(Ue.start+Ue.count)*be;ae!==null&&(Ee=Math.max(Ee,ae.start*be),ut=Math.min(ut,(ae.start+ae.count)*be)),_e!==null?(Ee=Math.max(Ee,0),ut=Math.min(ut,_e.count)):je!=null&&(Ee=Math.max(Ee,0),ut=Math.min(ut,je.count));let Dt=ut-Ee;if(Dt<0||Dt===1/0)return;te.setup(k,V,ce,z,_e);let Tt,dt=We;if(_e!==null&&(Tt=Y.get(_e),dt=N,dt.setIndex(Tt)),k.isMesh)V.wireframe===!0?(xe.setLineWidth(V.wireframeLinewidth*At()),dt.setMode(I.LINES)):dt.setMode(I.TRIANGLES);else if(k.isLine){let Kt=V.linewidth;Kt===void 0&&(Kt=1),xe.setLineWidth(Kt*At()),k.isLineSegments?dt.setMode(I.LINES):k.isLineLoop?dt.setMode(I.LINE_LOOP):dt.setMode(I.LINE_STRIP)}else k.isPoints?dt.setMode(I.POINTS):k.isSprite&&dt.setMode(I.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)_a("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),dt.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(it.get("WEBGL_multi_draw"))dt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Kt=k._multiDrawStarts,Me=k._multiDrawCounts,xn=k._multiDrawCount,nt=_e?Y.get(_e).bytesPerElement:1,On=v.get(V).currentProgram.getUniforms();for(let ni=0;ni<xn;ni++)On.setValue(I,"_gl_DrawID",ni),dt.render(Kt[ni]/nt,Me[ni])}else if(k.isInstancedMesh)dt.renderInstances(Ee,Dt,k.count);else if(z.isInstancedBufferGeometry){let Kt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Me=Math.min(z.instanceCount,Kt);dt.renderInstances(Ee,Dt,Me)}else dt.render(Ee,Dt)};function Hm(x,L,z){x.transparent===!0&&x.side===un&&x.forceSinglePass===!1?(x.side=ln,x.needsUpdate=!0,sc(x,L,z),x.side=Jn,x.needsUpdate=!0,sc(x,L,z),x.side=un):sc(x,L,z)}this.compile=function(x,L,z=null){z===null&&(z=x),C=K.get(z),C.init(L),D.push(C),z.traverseVisible(function(k){k.isLight&&k.layers.test(L.layers)&&(C.pushLight(k),k.castShadow&&C.pushShadow(k))}),x!==z&&x.traverseVisible(function(k){k.isLight&&k.layers.test(L.layers)&&(C.pushLight(k),k.castShadow&&C.pushShadow(k))}),C.setupLights();let V=new Set;return x.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let ae=k.material;if(ae)if(Array.isArray(ae))for(let fe=0;fe<ae.length;fe++){let ce=ae[fe];Hm(ce,z,k),V.add(ce)}else Hm(ae,z,k),V.add(ae)}),C=D.pop(),V},this.compileAsync=function(x,L,z=null){let V=this.compile(x,L,z);return new Promise(k=>{function ae(){if(V.forEach(function(fe){v.get(fe).currentProgram.isReady()&&V.delete(fe)}),V.size===0){k(x);return}setTimeout(ae,10)}it.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let pd=null;function Ix(x){pd&&pd(x)}function zm(){wr.stop()}function Gm(){wr.start()}let wr=new mx;wr.setAnimationLoop(Ix),typeof self<"u"&&wr.setContext(self),this.setAnimationLoop=function(x){pd=x,j.setAnimationLoop(x),x===null?wr.stop():wr.start()},j.addEventListener("sessionstart",zm),j.addEventListener("sessionend",Gm),this.render=function(x,L){if(L!==void 0&&L.isCamera!==!0){Ce("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;let z=j.enabled===!0&&j.isPresenting===!0,V=_!==null&&(U===null||z)&&_.begin(E,U);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(_===null||_.isCompositing()===!1)&&(j.cameraAutoUpdate===!0&&j.updateCamera(L),L=j.getCamera()),x.isScene===!0&&x.onBeforeRender(E,x,L,U),C=K.get(x,D.length),C.init(L),D.push(C),Ht.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),Ve.setFromProjectionMatrix(Ht,Zn,L.reversedDepth),Pe=this.localClippingEnabled,Ae=ee.init(this.clippingPlanes,Pe),S=De.get(x,T.length),S.init(),T.push(S),j.enabled===!0&&j.isPresenting===!0){let fe=E.xr.getDepthSensingMesh();fe!==null&&md(fe,L,-1/0,E.sortObjects)}md(x,L,0,E.sortObjects),S.finish(),E.sortObjects===!0&&S.sort(St,xt),Ge=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,Ge&&ve.addToRenderList(S,x),this.info.render.frame++,Ae===!0&&ee.beginShadows();let k=C.state.shadowsArray;if(ge.render(k,x,L),Ae===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset(),(V&&_.hasRenderPass())===!1){let fe=S.opaque,ce=S.transmissive;if(C.setupLights(),L.isArrayCamera){let _e=L.cameras;if(ce.length>0)for(let be=0,Ue=_e.length;be<Ue;be++){let je=_e[be];jm(fe,ce,x,je)}Ge&&ve.render(x);for(let be=0,Ue=_e.length;be<Ue;be++){let je=_e[be];Wm(S,x,je,je.viewport)}}else ce.length>0&&jm(fe,ce,x,L),Ge&&ve.render(x),Wm(S,x,L)}U!==null&&F===0&&(P.updateMultisampleRenderTarget(U),P.updateRenderTargetMipmap(U)),V&&_.end(E),x.isScene===!0&&x.onAfterRender(E,x,L),te.resetDefaultState(),G=-1,B=null,D.pop(),D.length>0?(C=D[D.length-1],Ae===!0&&ee.setGlobalState(E.clippingPlanes,C.state.camera)):C=null,T.pop(),T.length>0?S=T[T.length-1]:S=null};function md(x,L,z,V){if(x.visible===!1)return;if(x.layers.test(L.layers)){if(x.isGroup)z=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(L);else if(x.isLight)C.pushLight(x),x.castShadow&&C.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||Ve.intersectsSprite(x)){V&&st.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Ht);let fe=me.update(x),ce=x.material;ce.visible&&S.push(x,fe,ce,z,st.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||Ve.intersectsObject(x))){let fe=me.update(x),ce=x.material;if(V&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),st.copy(x.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),st.copy(fe.boundingSphere.center)),st.applyMatrix4(x.matrixWorld).applyMatrix4(Ht)),Array.isArray(ce)){let _e=fe.groups;for(let be=0,Ue=_e.length;be<Ue;be++){let je=_e[be],Ee=ce[je.materialIndex];Ee&&Ee.visible&&S.push(x,fe,Ee,z,st.z,je)}}else ce.visible&&S.push(x,fe,ce,z,st.z,null)}}let ae=x.children;for(let fe=0,ce=ae.length;fe<ce;fe++)md(ae[fe],L,z,V)}function Wm(x,L,z,V){let{opaque:k,transmissive:ae,transparent:fe}=x;C.setupLightsView(z),Ae===!0&&ee.setGlobalState(E.clippingPlanes,z),V&&xe.viewport(H.copy(V)),k.length>0&&rc(k,L,z),ae.length>0&&rc(ae,L,z),fe.length>0&&rc(fe,L,z),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function jm(x,L,z,V){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[V.id]===void 0){let Ee=it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[V.id]=new wn(1,1,{generateMipmaps:!0,type:Ee?Mi:vn,minFilter:ei,samples:Math.max(4,gt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace})}let ae=C.state.transmissionRenderTarget[V.id],fe=V.viewport||H;ae.setSize(fe.z*E.transmissionResolutionScale,fe.w*E.transmissionResolutionScale);let ce=E.getRenderTarget(),_e=E.getActiveCubeFace(),be=E.getActiveMipmapLevel();E.setRenderTarget(ae),E.getClearColor(Z),le=E.getClearAlpha(),le<1&&E.setClearColor(16777215,.5),E.clear(),Ge&&ve.render(z);let Ue=E.toneMapping;E.toneMapping=Qn;let je=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),C.setupLightsView(V),Ae===!0&&ee.setGlobalState(E.clippingPlanes,V),rc(x,z,V),P.updateMultisampleRenderTarget(ae),P.updateRenderTargetMipmap(ae),it.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let ut=0,Dt=L.length;ut<Dt;ut++){let Tt=L[ut],{object:dt,geometry:Kt,material:Me,group:xn}=Tt;if(Me.side===un&&dt.layers.test(V.layers)){let nt=Me.side;Me.side=ln,Me.needsUpdate=!0,$m(dt,z,V,Kt,Me,xn),Me.side=nt,Me.needsUpdate=!0,Ee=!0}}Ee===!0&&(P.updateMultisampleRenderTarget(ae),P.updateRenderTargetMipmap(ae))}E.setRenderTarget(ce,_e,be),E.setClearColor(Z,le),je!==void 0&&(V.viewport=je),E.toneMapping=Ue}function rc(x,L,z){let V=L.isScene===!0?L.overrideMaterial:null;for(let k=0,ae=x.length;k<ae;k++){let fe=x[k],{object:ce,geometry:_e,group:be}=fe,Ue=fe.material;Ue.allowOverride===!0&&V!==null&&(Ue=V),ce.layers.test(z.layers)&&$m(ce,L,z,_e,Ue,be)}}function $m(x,L,z,V,k,ae){x.onBeforeRender(E,L,z,V,k,ae),x.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),k.onBeforeRender(E,L,z,V,x,ae),k.transparent===!0&&k.side===un&&k.forceSinglePass===!1?(k.side=ln,k.needsUpdate=!0,E.renderBufferDirect(z,L,V,k,x,ae),k.side=Jn,k.needsUpdate=!0,E.renderBufferDirect(z,L,V,k,x,ae),k.side=un):E.renderBufferDirect(z,L,V,k,x,ae),x.onAfterRender(E,L,z,V,k,ae)}function sc(x,L,z){L.isScene!==!0&&(L=ht);let V=v.get(x),k=C.state.lights,ae=C.state.shadowsArray,fe=k.state.version,ce=ie.getParameters(x,k.state,ae,L,z),_e=ie.getProgramCacheKey(ce),be=V.programs;V.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?L.environment:null,V.fog=L.fog;let Ue=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;V.envMap=q.get(x.envMap||V.environment,Ue),V.envMapRotation=V.environment!==null&&x.envMap===null?L.environmentRotation:x.envMapRotation,be===void 0&&(x.addEventListener("dispose",ot),be=new Map,V.programs=be);let je=be.get(_e);if(je!==void 0){if(V.currentProgram===je&&V.lightsStateVersion===fe)return Xm(x,ce),je}else ce.uniforms=ie.getUniforms(x),x.onBeforeCompile(ce,E),je=ie.acquireProgram(ce,_e),be.set(_e,je),V.uniforms=ce.uniforms;let Ee=V.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Ee.clippingPlanes=ee.uniform),Xm(x,ce),V.needsLights=Px(x),V.lightsStateVersion=fe,V.needsLights&&(Ee.ambientLightColor.value=k.state.ambient,Ee.lightProbe.value=k.state.probe,Ee.directionalLights.value=k.state.directional,Ee.directionalLightShadows.value=k.state.directionalShadow,Ee.spotLights.value=k.state.spot,Ee.spotLightShadows.value=k.state.spotShadow,Ee.rectAreaLights.value=k.state.rectArea,Ee.ltc_1.value=k.state.rectAreaLTC1,Ee.ltc_2.value=k.state.rectAreaLTC2,Ee.pointLights.value=k.state.point,Ee.pointLightShadows.value=k.state.pointShadow,Ee.hemisphereLights.value=k.state.hemi,Ee.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ee.spotLightMatrix.value=k.state.spotLightMatrix,Ee.spotLightMap.value=k.state.spotLightMap,Ee.pointShadowMatrix.value=k.state.pointShadowMatrix),V.currentProgram=je,V.uniformsList=null,je}function qm(x){if(x.uniformsList===null){let L=x.currentProgram.getUniforms();x.uniformsList=bo.seqWithValue(L.seq,x.uniforms)}return x.uniformsList}function Xm(x,L){let z=v.get(x);z.outputColorSpace=L.outputColorSpace,z.batching=L.batching,z.batchingColor=L.batchingColor,z.instancing=L.instancing,z.instancingColor=L.instancingColor,z.instancingMorph=L.instancingMorph,z.skinning=L.skinning,z.morphTargets=L.morphTargets,z.morphNormals=L.morphNormals,z.morphColors=L.morphColors,z.morphTargetsCount=L.morphTargetsCount,z.numClippingPlanes=L.numClippingPlanes,z.numIntersection=L.numClipIntersection,z.vertexAlphas=L.vertexAlphas,z.vertexTangents=L.vertexTangents,z.toneMapping=L.toneMapping}function Rx(x,L,z,V,k){L.isScene!==!0&&(L=ht),P.resetTextureUnits();let ae=L.fog,fe=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?L.environment:null,ce=U===null?E.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Zt,_e=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,be=q.get(V.envMap||fe,_e),Ue=V.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,je=!!z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ee=!!z.morphAttributes.position,ut=!!z.morphAttributes.normal,Dt=!!z.morphAttributes.color,Tt=Qn;V.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Tt=E.toneMapping);let dt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Kt=dt!==void 0?dt.length:0,Me=v.get(V),xn=C.state.lights;if(Ae===!0&&(Pe===!0||x!==B)){let zt=x===B&&V.id===G;ee.setState(V,x,zt)}let nt=!1;V.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==xn.state.version||Me.outputColorSpace!==ce||k.isBatchedMesh&&Me.batching===!1||!k.isBatchedMesh&&Me.batching===!0||k.isBatchedMesh&&Me.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Me.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Me.instancing===!1||!k.isInstancedMesh&&Me.instancing===!0||k.isSkinnedMesh&&Me.skinning===!1||!k.isSkinnedMesh&&Me.skinning===!0||k.isInstancedMesh&&Me.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Me.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Me.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Me.instancingMorph===!1&&k.morphTexture!==null||Me.envMap!==be||V.fog===!0&&Me.fog!==ae||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==ee.numPlanes||Me.numIntersection!==ee.numIntersection)||Me.vertexAlphas!==Ue||Me.vertexTangents!==je||Me.morphTargets!==Ee||Me.morphNormals!==ut||Me.morphColors!==Dt||Me.toneMapping!==Tt||Me.morphTargetsCount!==Kt)&&(nt=!0):(nt=!0,Me.__version=V.version);let On=Me.currentProgram;nt===!0&&(On=sc(V,L,k));let ni=!1,Tr=!1,ls=!1,pt=On.getUniforms(),Xt=Me.uniforms;if(xe.useProgram(On.program)&&(ni=!0,Tr=!0,ls=!0),V.id!==G&&(G=V.id,Tr=!0),ni||B!==x){xe.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),pt.setValue(I,"projectionMatrix",x.projectionMatrix),pt.setValue(I,"viewMatrix",x.matrixWorldInverse);let Ki=pt.map.cameraPosition;Ki!==void 0&&Ki.setValue(I,tt.setFromMatrixPosition(x.matrixWorld)),gt.logarithmicDepthBuffer&&pt.setValue(I,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&pt.setValue(I,"isOrthographic",x.isOrthographicCamera===!0),B!==x&&(B=x,Tr=!0,ls=!0)}if(Me.needsLights&&(xn.state.directionalShadowMap.length>0&&pt.setValue(I,"directionalShadowMap",xn.state.directionalShadowMap,P),xn.state.spotShadowMap.length>0&&pt.setValue(I,"spotShadowMap",xn.state.spotShadowMap,P),xn.state.pointShadowMap.length>0&&pt.setValue(I,"pointShadowMap",xn.state.pointShadowMap,P)),k.isSkinnedMesh){pt.setOptional(I,k,"bindMatrix"),pt.setOptional(I,k,"bindMatrixInverse");let zt=k.skeleton;zt&&(zt.boneTexture===null&&zt.computeBoneTexture(),pt.setValue(I,"boneTexture",zt.boneTexture,P))}k.isBatchedMesh&&(pt.setOptional(I,k,"batchingTexture"),pt.setValue(I,"batchingTexture",k._matricesTexture,P),pt.setOptional(I,k,"batchingIdTexture"),pt.setValue(I,"batchingIdTexture",k._indirectTexture,P),pt.setOptional(I,k,"batchingColorTexture"),k._colorsTexture!==null&&pt.setValue(I,"batchingColorTexture",k._colorsTexture,P));let Zi=z.morphAttributes;if((Zi.position!==void 0||Zi.normal!==void 0||Zi.color!==void 0)&&ue.update(k,z,On),(Tr||Me.receiveShadow!==k.receiveShadow)&&(Me.receiveShadow=k.receiveShadow,pt.setValue(I,"receiveShadow",k.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&L.environment!==null&&(Xt.envMapIntensity.value=L.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=aR()),Tr&&(pt.setValue(I,"toneMappingExposure",E.toneMappingExposure),Me.needsLights&&Nx(Xt,ls),ae&&V.fog===!0&&Te.refreshFogUniforms(Xt,ae),Te.refreshMaterialUniforms(Xt,V,He,de,C.state.transmissionRenderTarget[x.id]),bo.upload(I,qm(Me),Xt,P)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(bo.upload(I,qm(Me),Xt,P),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&pt.setValue(I,"center",k.center),pt.setValue(I,"modelViewMatrix",k.modelViewMatrix),pt.setValue(I,"normalMatrix",k.normalMatrix),pt.setValue(I,"modelMatrix",k.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let zt=V.uniformsGroups;for(let Ki=0,us=zt.length;Ki<us;Ki++){let Ym=zt[Ki];he.update(Ym,On),he.bind(Ym,On)}}return On}function Nx(x,L){x.ambientLightColor.needsUpdate=L,x.lightProbe.needsUpdate=L,x.directionalLights.needsUpdate=L,x.directionalLightShadows.needsUpdate=L,x.pointLights.needsUpdate=L,x.pointLightShadows.needsUpdate=L,x.spotLights.needsUpdate=L,x.spotLightShadows.needsUpdate=L,x.rectAreaLights.needsUpdate=L,x.hemisphereLights.needsUpdate=L}function Px(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(x,L,z){let V=v.get(x);V.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),v.get(x.texture).__webglTexture=L,v.get(x.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:z,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,L){let z=v.get(x);z.__webglFramebuffer=L,z.__useDefaultFramebuffer=L===void 0};let Lx=I.createFramebuffer();this.setRenderTarget=function(x,L=0,z=0){U=x,A=L,F=z;let V=null,k=!1,ae=!1;if(x){let ce=v.get(x);if(ce.__useDefaultFramebuffer!==void 0){xe.bindFramebuffer(I.FRAMEBUFFER,ce.__webglFramebuffer),H.copy(x.viewport),O.copy(x.scissor),Q=x.scissorTest,xe.viewport(H),xe.scissor(O),xe.setScissorTest(Q),G=-1;return}else if(ce.__webglFramebuffer===void 0)P.setupRenderTarget(x);else if(ce.__hasExternalTextures)P.rebindTextures(x,v.get(x.texture).__webglTexture,v.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let Ue=x.depthTexture;if(ce.__boundDepthTexture!==Ue){if(Ue!==null&&v.has(Ue)&&(x.width!==Ue.image.width||x.height!==Ue.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(x)}}let _e=x.texture;(_e.isData3DTexture||_e.isDataArrayTexture||_e.isCompressedArrayTexture)&&(ae=!0);let be=v.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(be[L])?V=be[L][z]:V=be[L],k=!0):x.samples>0&&P.useMultisampledRTT(x)===!1?V=v.get(x).__webglMultisampledFramebuffer:Array.isArray(be)?V=be[z]:V=be,H.copy(x.viewport),O.copy(x.scissor),Q=x.scissorTest}else H.copy(X).multiplyScalar(He).floor(),O.copy(ne).multiplyScalar(He).floor(),Q=se;if(z!==0&&(V=Lx),xe.bindFramebuffer(I.FRAMEBUFFER,V)&&xe.drawBuffers(x,V),xe.viewport(H),xe.scissor(O),xe.setScissorTest(Q),k){let ce=v.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+L,ce.__webglTexture,z)}else if(ae){let ce=L;for(let _e=0;_e<x.textures.length;_e++){let be=v.get(x.textures[_e]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+_e,be.__webglTexture,z,ce)}}else if(x!==null&&z!==0){let ce=v.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ce.__webglTexture,z)}G=-1},this.readRenderTargetPixels=function(x,L,z,V,k,ae,fe,ce=0){if(!(x&&x.isWebGLRenderTarget)){Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=v.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&fe!==void 0&&(_e=_e[fe]),_e){xe.bindFramebuffer(I.FRAMEBUFFER,_e);try{let be=x.textures[ce],Ue=be.format,je=be.type;if(x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ce),!gt.textureFormatReadable(Ue)){Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!gt.textureTypeReadable(je)){Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=x.width-V&&z>=0&&z<=x.height-k&&I.readPixels(L,z,V,k,re.convert(Ue),re.convert(je),ae)}finally{let be=U!==null?v.get(U).__webglFramebuffer:null;xe.bindFramebuffer(I.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=function(x,L,z,V,k,ae,fe,ce=0){return Cr(this,null,function*(){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=v.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&fe!==void 0&&(_e=_e[fe]),_e)if(L>=0&&L<=x.width-V&&z>=0&&z<=x.height-k){xe.bindFramebuffer(I.FRAMEBUFFER,_e);let be=x.textures[ce],Ue=be.format,je=be.type;if(x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ce),!gt.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!gt.textureTypeReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ee=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ee),I.bufferData(I.PIXEL_PACK_BUFFER,ae.byteLength,I.STREAM_READ),I.readPixels(L,z,V,k,re.convert(Ue),re.convert(je),0);let ut=U!==null?v.get(U).__webglFramebuffer:null;xe.bindFramebuffer(I.FRAMEBUFFER,ut);let Dt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),yield V_(I,Dt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ee),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ae),I.deleteBuffer(Ee),I.deleteSync(Dt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")})},this.copyFramebufferToTexture=function(x,L=null,z=0){let V=Math.pow(2,-z),k=Math.floor(x.image.width*V),ae=Math.floor(x.image.height*V),fe=L!==null?L.x:0,ce=L!==null?L.y:0;P.setTexture2D(x,0),I.copyTexSubImage2D(I.TEXTURE_2D,z,0,0,fe,ce,k,ae),xe.unbindTexture()};let Fx=I.createFramebuffer(),Ox=I.createFramebuffer();this.copyTextureToTexture=function(x,L,z=null,V=null,k=0,ae=0){let fe,ce,_e,be,Ue,je,Ee,ut,Dt,Tt=x.isCompressedTexture?x.mipmaps[ae]:x.image;if(z!==null)fe=z.max.x-z.min.x,ce=z.max.y-z.min.y,_e=z.isBox3?z.max.z-z.min.z:1,be=z.min.x,Ue=z.min.y,je=z.isBox3?z.min.z:0;else{let Xt=Math.pow(2,-k);fe=Math.floor(Tt.width*Xt),ce=Math.floor(Tt.height*Xt),x.isDataArrayTexture?_e=Tt.depth:x.isData3DTexture?_e=Math.floor(Tt.depth*Xt):_e=1,be=0,Ue=0,je=0}V!==null?(Ee=V.x,ut=V.y,Dt=V.z):(Ee=0,ut=0,Dt=0);let dt=re.convert(L.format),Kt=re.convert(L.type),Me;L.isData3DTexture?(P.setTexture3D(L,0),Me=I.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(P.setTexture2DArray(L,0),Me=I.TEXTURE_2D_ARRAY):(P.setTexture2D(L,0),Me=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,L.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,L.unpackAlignment);let xn=I.getParameter(I.UNPACK_ROW_LENGTH),nt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),On=I.getParameter(I.UNPACK_SKIP_PIXELS),ni=I.getParameter(I.UNPACK_SKIP_ROWS),Tr=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Tt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Tt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,be),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ue),I.pixelStorei(I.UNPACK_SKIP_IMAGES,je);let ls=x.isDataArrayTexture||x.isData3DTexture,pt=L.isDataArrayTexture||L.isData3DTexture;if(x.isDepthTexture){let Xt=v.get(x),Zi=v.get(L),zt=v.get(Xt.__renderTarget),Ki=v.get(Zi.__renderTarget);xe.bindFramebuffer(I.READ_FRAMEBUFFER,zt.__webglFramebuffer),xe.bindFramebuffer(I.DRAW_FRAMEBUFFER,Ki.__webglFramebuffer);for(let us=0;us<_e;us++)ls&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,v.get(x).__webglTexture,k,je+us),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,v.get(L).__webglTexture,ae,Dt+us)),I.blitFramebuffer(be,Ue,fe,ce,Ee,ut,fe,ce,I.DEPTH_BUFFER_BIT,I.NEAREST);xe.bindFramebuffer(I.READ_FRAMEBUFFER,null),xe.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(k!==0||x.isRenderTargetTexture||v.has(x)){let Xt=v.get(x),Zi=v.get(L);xe.bindFramebuffer(I.READ_FRAMEBUFFER,Fx),xe.bindFramebuffer(I.DRAW_FRAMEBUFFER,Ox);for(let zt=0;zt<_e;zt++)ls?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Xt.__webglTexture,k,je+zt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Xt.__webglTexture,k),pt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Zi.__webglTexture,ae,Dt+zt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Zi.__webglTexture,ae),k!==0?I.blitFramebuffer(be,Ue,fe,ce,Ee,ut,fe,ce,I.COLOR_BUFFER_BIT,I.NEAREST):pt?I.copyTexSubImage3D(Me,ae,Ee,ut,Dt+zt,be,Ue,fe,ce):I.copyTexSubImage2D(Me,ae,Ee,ut,be,Ue,fe,ce);xe.bindFramebuffer(I.READ_FRAMEBUFFER,null),xe.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else pt?x.isDataTexture||x.isData3DTexture?I.texSubImage3D(Me,ae,Ee,ut,Dt,fe,ce,_e,dt,Kt,Tt.data):L.isCompressedArrayTexture?I.compressedTexSubImage3D(Me,ae,Ee,ut,Dt,fe,ce,_e,dt,Tt.data):I.texSubImage3D(Me,ae,Ee,ut,Dt,fe,ce,_e,dt,Kt,Tt):x.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ae,Ee,ut,fe,ce,dt,Kt,Tt.data):x.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ae,Ee,ut,Tt.width,Tt.height,dt,Tt.data):I.texSubImage2D(I.TEXTURE_2D,ae,Ee,ut,fe,ce,dt,Kt,Tt);I.pixelStorei(I.UNPACK_ROW_LENGTH,xn),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,nt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,On),I.pixelStorei(I.UNPACK_SKIP_ROWS,ni),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Tr),ae===0&&L.generateMipmaps&&I.generateMipmap(Me),xe.unbindTexture()},this.initRenderTarget=function(x){v.get(x).__webglFramebuffer===void 0&&P.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?P.setTextureCube(x,0):x.isData3DTexture?P.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?P.setTexture2DArray(x,0):P.setTexture2D(x,0),xe.unbindTexture()},this.resetState=function(){A=0,F=0,U=null,xe.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}};function fm(n,e){if(e===Gp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===Mo||e===Qa){let t=n.getIndex();if(t===null){let o=[],a=n.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);n.setIndex(o),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}let i=t.count-2,r=[];if(e===Mo)for(let o=1;o<=i;o++)r.push(t.getX(0)),r.push(t.getX(o)),r.push(t.getX(o+1));else for(let o=0;o<i;o++)o%2===0?(r.push(t.getX(o)),r.push(t.getX(o+1)),r.push(t.getX(o+2))):(r.push(t.getX(o+2)),r.push(t.getX(o+1)),r.push(t.getX(o)));r.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=n.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}function xx(n){let e=new Map,t=new Map,i=n.clone();return Mx(n,i,function(r,s){e.set(s,r),t.set(r,s)}),i.traverse(function(r){if(!r.isSkinnedMesh)return;let s=r,o=e.get(r),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),i}function Mx(n,e,t){t(n,e);for(let i=0;i<n.children.length;i++)Mx(n.children[i],e.children[i],t)}var ud=class extends rs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new _m(t)}),this.register(function(t){return new xm(t)}),this.register(function(t){return new Dm(t)}),this.register(function(t){return new Im(t)}),this.register(function(t){return new Rm(t)}),this.register(function(t){return new Sm(t)}),this.register(function(t){return new bm(t)}),this.register(function(t){return new Em(t)}),this.register(function(t){return new wm(t)}),this.register(function(t){return new vm(t)}),this.register(function(t){return new Tm(t)}),this.register(function(t){return new Mm(t)}),this.register(function(t){return new Am(t)}),this.register(function(t){return new Cm(t)}),this.register(function(t){return new gm(t)}),this.register(function(t){return new dd(t,Xe.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new dd(t,Xe.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Nm(t)})}load(e,t,i,r){let s=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Xi.extractUrlBase(e);o=Xi.resolveURL(l,this.path)}else o=Xi.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){r?r(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new go(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},i,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,r){let s,o={},a={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Tx){try{o[Xe.KHR_BINARY_GLTF]=new Pm(e)}catch(d){r&&r(d);return}s=JSON.parse(o[Xe.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Vm(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){let d=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(d){case Xe.KHR_MATERIALS_UNLIT:o[d]=new ym;break;case Xe.KHR_DRACO_MESH_COMPRESSION:o[d]=new Lm(s,this.dracoLoader);break;case Xe.KHR_TEXTURE_TRANSFORM:o[d]=new Fm;break;case Xe.KHR_MESH_QUANTIZATION:o[d]=new Om;break;default:f.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(i,r)}parseAsync(e,t){let i=this;return new Promise(function(r,s){i.parse(e,t,r,s)})}};function lR(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}function Pt(n,e,t){let i=n.json.materials[e];return i.extensions&&i.extensions[t]?i.extensions[t]:null}var Xe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},gm=class{constructor(e){this.parser=e,this.name=Xe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,r=t.length;i<r;i++){let s=t[i];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,r=t.cache.get(i);if(r)return r;let s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],l,u=new we(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Zt);let d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new _r(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ha(u),l.distance=d;break;case"spot":l=new Va(u),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Ei(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),r=Promise.resolve(l),t.cache.add(i,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,s=i.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return i._getNodeRef(t.cache,a,c)})}},ym=class{constructor(){this.name=Xe.KHR_MATERIALS_UNLIT}getMaterialType(){return Cn}extendParams(e,t,i){let r=[];e.color=new we(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Zt),e.opacity=o[3]}s.baseColorTexture!==void 0&&r.push(i.assignTexture(e,"map",s.baseColorTexture,kt))}return Promise.all(r)}},vm=class{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=Pt(this.parser,e,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}},_m=class{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){let i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){let s=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ne(s,s)}return Promise.all(r)}},xm=class{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){let i=Pt(this.parser,e,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}},Mm=class{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){let i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(r)}},Sm=class{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_SHEEN}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){let i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];if(t.sheenColor=new we(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){let s=i.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],Zt)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,kt)),i.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(r)}},bm=class{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){let i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(r)}},Em=class{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_VOLUME}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){let i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;let s=i.attenuationColor||[1,1,1];return t.attenuationColor=new we().setRGB(s[0],s[1],s[2],Zt),Promise.all(r)}},wm=class{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_IOR}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){let i=Pt(this.parser,e,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5),Promise.resolve()}},Tm=class{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){let i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));let s=i.specularColorFactor||[1,1,1];return t.specularColor=new we().setRGB(s[0],s[1],s[2],Zt),i.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,kt)),Promise.all(r)}},Cm=class{constructor(e){this.parser=e,this.name=Xe.EXT_MATERIALS_BUMP}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){let i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(r)}},Am=class{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?gn:null}extendMaterialParams(e,t){let i=Pt(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(r)}},Dm=class{constructor(e){this.parser=e,this.name=Xe.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,r=i.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let s=r.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}},Im=class{constructor(e){this.parser=e,this.name=Xe.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let o=s.extensions[t],a=r.images[o.source],c=i.textureLoader;if(a.uri){let l=i.options.manager.getHandler(a.uri);l!==null&&(c=l)}return i.loadTextureImage(e,o.source,c)}},Rm=class{constructor(e){this.parser=e,this.name=Xe.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let o=s.extensions[t],a=r.images[o.source],c=i.textureLoader;if(a.uri){let l=i.options.manager.getHandler(a.uri);l!==null&&(c=l)}return i.loadTextureImage(e,o.source,c)}},dd=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let r=i.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){let c=r.byteOffset||0,l=r.byteLength||0,u=r.count,d=r.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,f,r.mode,r.filter).then(function(h){return h.buffer}):o.ready.then(function(){let h=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(h),u,d,f,r.mode,r.filter),h})})}else return null}},Nm=class{constructor(e){this.name=Xe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let r=t.meshes[i.mesh];for(let l of r.primitives)if(l.mode!==Fn.TRIANGLES&&l.mode!==Fn.TRIANGLE_STRIP&&l.mode!==Fn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=i.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let u=l.pop(),d=u.isGroup?u.children:[u],f=l[0].count,h=[];for(let g of d){let y=new Oe,p=new R,m=new En,M=new R(1,1,1),b=new Aa(g.geometry,g.material,f);for(let S=0;S<f;S++)c.TRANSLATION&&p.fromBufferAttribute(c.TRANSLATION,S),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,S),c.SCALE&&M.fromBufferAttribute(c.SCALE,S),b.setMatrixAt(S,y.compose(p,m,M));for(let S in c)if(S==="_COLOR_0"){let C=c[S];b.instanceColor=new gr(C.array,C.itemSize,C.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&g.geometry.setAttribute(S,c[S]);Nt.prototype.copy.call(b,g),this.parser.assignFinalMaterial(b),h.push(b)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}},Tx="glTF",ic=12,Sx={JSON:1313821514,BIN:5130562},Pm=class{constructor(e){this.name=Xe.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ic),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Tx)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-ic,s=new DataView(e,ic),o=0;for(;o<r;){let a=s.getUint32(o,!0);o+=4;let c=s.getUint32(o,!0);if(o+=4,c===Sx.JSON){let l=new Uint8Array(e,ic+o,a);this.content=i.decode(l)}else if(c===Sx.BIN){let l=ic+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Lm=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Xe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let u in o){let d=km[u]||u.toLowerCase();a[d]=o[u]}for(let u in e.attributes){let d=km[u]||u.toLowerCase();if(o[u]!==void 0){let f=i.accessors[e.attributes[u]],h=wo[f.componentType];l[d]=h.name,c[d]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(d,f){r.decodeDracoFile(u,function(h){for(let g in h.attributes){let y=h.attributes[g],p=c[g];p!==void 0&&(y.normalized=p)}d(h)},a,l,Zt,f)})})}},Fm=class{constructor(){this.name=Xe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Om=class{constructor(){this.name=Xe.KHR_MESH_QUANTIZATION}},fd=class extends gi{constructor(e,t,i,r){super(e,t,i,r)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let o=0;o!==r;o++)t[o]=i[s+o];return t}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=r-t,d=(i-t)/u,f=d*d,h=f*d,g=e*l,y=g-l,p=-2*h+3*f,m=h-f,M=1-p,b=m-f+d;for(let S=0;S!==a;S++){let C=o[y+S+a],T=o[y+S+c]*u,D=o[g+S+a],_=o[g+S]*u;s[S]=M*C+b*T+p*D+m*_}return s}},uR=new En,Um=class extends fd{interpolate_(e,t,i,r){let s=super.interpolate_(e,t,i,r);return uR.fromArray(s).normalize().toArray(s),s}},Fn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},wo={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},bx={9728:Rt,9729:wt,9984:mu,9985:vo,9986:ts,9987:ei},Ex={33071:Ln,33648:to,10497:pi},hm={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},km={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Er={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},dR={CUBICSPLINE:void 0,LINEAR:Xr,STEP:qr},pm={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function fR(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new qe({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Jn})),n.DefaultMaterial}function cs(n,e,t){for(let i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function Ei(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function hR(n,e,t){let i=!1,r=!1,s=!1;for(let l=0,u=e.length;l<u;l++){let d=e[l];if(d.POSITION!==void 0&&(i=!0),d.NORMAL!==void 0&&(r=!0),d.COLOR_0!==void 0&&(s=!0),i&&r&&s)break}if(!i&&!r&&!s)return Promise.resolve(n);let o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){let d=e[l];if(i){let f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):n.attributes.position;o.push(f)}if(r){let f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):n.attributes.normal;a.push(f)}if(s){let f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):n.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let u=l[0],d=l[1],f=l[2];return i&&(n.morphAttributes.position=u),r&&(n.morphAttributes.normal=d),s&&(n.morphAttributes.color=f),n.morphTargetsRelative=!0,n})}function pR(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,r=t.length;i<r;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function mR(n){let e,t=n.extensions&&n.extensions[Xe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+mm(t.attributes):e=n.indices+":"+mm(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,r=n.targets.length;i<r;i++)e+=":"+mm(n.targets[i]);return e}function mm(n){let e="",t=Object.keys(n).sort();for(let i=0,r=t.length;i<r;i++)e+=t[i]+":"+n[t[i]]+";";return e}function Bm(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function gR(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var yR=new Oe,Vm=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new lR,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,r=-1,s=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let a=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);r=i&&c?parseInt(c[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&r<17||s&&o<98?this.textureLoader=new Ua(this.options.manager):this.textureLoader=new Ga(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new go(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){let a={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:i,userData:{}};return cs(s,a,r),Ei(a,r),Promise.all(i._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){let o=t[r].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let r=0,s=e.length;r<s;r++){let o=e[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let r=i.clone(),s=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,u]of o.children.entries())s(u,a.children[l])};return s(i,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let r=e(t[i]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let r=0;r<t.length;r++){let s=e(t[r]);s&&i.push(s)}return i}getDependency(e,t){let i=e+":"+t,r=this.cache.get(i);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(i,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,o){return i.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Xe.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(s,o){i.load(Xi.resolveURL(t.uri,r.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let r=t.byteLength||0,s=t.byteOffset||0;return i.slice(s,s+r)})}loadAccessor(e){let t=this,i=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let o=hm[r.type],a=wo[r.componentType],c=r.normalized===!0,l=new a(r.count*o);return Promise.resolve(new Ut(l,o,c))}let s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(o){let a=o[0],c=hm[r.type],l=wo[r.componentType],u=l.BYTES_PER_ELEMENT,d=u*c,f=r.byteOffset||0,h=r.bufferView!==void 0?i.bufferViews[r.bufferView].byteStride:void 0,g=r.normalized===!0,y,p;if(h&&h!==d){let m=Math.floor(f/h),M="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+m+":"+r.count,b=t.cache.get(M);b||(y=new l(a,m*h,r.count*h/u),b=new Zr(y,h/u),t.cache.add(M,b)),p=new pr(b,c,f%h/u,g)}else a===null?y=new l(r.count*c):y=new l(a,f,r.count*c),p=new Ut(y,c,g);if(r.sparse!==void 0){let m=hm.SCALAR,M=wo[r.sparse.indices.componentType],b=r.sparse.indices.byteOffset||0,S=r.sparse.values.byteOffset||0,C=new M(o[1],b,r.sparse.count*m),T=new l(o[2],S,r.sparse.count*c);a!==null&&(p=new Ut(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let D=0,_=C.length;D<_;D++){let E=C[D];if(p.setX(E,T[D*c]),c>=2&&p.setY(E,T[D*c+1]),c>=3&&p.setZ(E,T[D*c+2]),c>=4&&p.setW(E,T[D*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=g}return p})}loadTexture(e){let t=this.json,i=this.options,s=t.textures[e].source,o=t.images[s],a=this.textureLoader;if(o.uri){let c=i.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,i){let r=this,s=this.json,o=s.textures[e],a=s.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,i).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let f=(s.samplers||{})[o.sampler]||{};return u.magFilter=bx[f.magFilter]||wt,u.minFilter=bx[f.minFilter]||ei,u.wrapS=Ex[f.wrapS]||pi,u.wrapT=Ex[f.wrapT]||pi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Rt&&u.minFilter!==wt,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let i=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let o=r.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=i.getDependency("bufferView",o.bufferView).then(function(d){l=!0;let f=new Blob([d],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(d){return new Promise(function(f,h){let g=f;t.isImageBitmapLoader===!0&&(g=function(y){let p=new _n(y);p.needsUpdate=!0,f(p)}),t.load(Xi.resolveURL(d,s.path),g,void 0,h)})}).then(function(d){return l===!0&&a.revokeObjectURL(c),Ei(d,o),d.userData.mimeType=o.mimeType||gR(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=u,u}assignTexture(e,t,i,r){let s=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),s.extensions[Xe.KHR_TEXTURE_TRANSFORM]){let a=i.extensions!==void 0?i.extensions[Xe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=s.associations.get(o);o=s.extensions[Xe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return r!==void 0&&(o.colorSpace=r),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,i=e.material,r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+i.uuid,c=this.cache.get(a);c||(c=new po,cn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,c.sizeAttenuation=!1,this.cache.add(a,c)),i=c}else if(e.isLine){let a="LineBasicMaterial:"+i.uuid,c=this.cache.get(a);c||(c=new ho,cn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,this.cache.add(a,c)),i=c}if(r||s||o){let a="ClonedMaterial:"+i.uuid+":";r&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=i.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),r&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(i))),i=c}e.material=i}getMaterialType(){return qe}loadMaterial(e){let t=this,i=this.json,r=this.extensions,s=i.materials[e],o,a={},c=s.extensions||{},l=[];if(c[Xe.KHR_MATERIALS_UNLIT]){let d=r[Xe.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),l.push(d.extendParams(a,s,t))}else{let d=s.pbrMetallicRoughness||{};if(a.color=new we(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){let f=d.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Zt),a.opacity=f[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",d.baseColorTexture,kt)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=un);let u=s.alphaMode||pm.OPAQUE;if(u===pm.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===pm.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Cn&&(l.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Ne(1,1),s.normalTexture.scale!==void 0)){let d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==Cn&&(l.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Cn){let d=s.emissiveFactor;a.emissive=new we().setRGB(d[0],d[1],d[2],Zt)}return s.emissiveTexture!==void 0&&o!==Cn&&l.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,kt)),Promise.all(l).then(function(){let d=new o(a);return s.name&&(d.name=s.name),Ei(d,s),t.associations.set(d,{materials:e}),s.extensions&&cs(r,d,s),d})}createUniqueName(e){let t=Et.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,r=this.primitiveCache;function s(a){return i[Xe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return wx(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],u=mR(l),d=r[u];if(d)o.push(d.promise);else{let f;l.extensions&&l.extensions[Xe.KHR_DRACO_MESH_COMPRESSION]?f=s(l):f=wx(new qt,l,t),r[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,i=this.json,r=this.extensions,s=i.meshes[e],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let u=o[c].material===void 0?fR(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],d=[];for(let h=0,g=u.length;h<g;h++){let y=u[h],p=o[h],m,M=l[h];if(p.mode===Fn.TRIANGLES||p.mode===Fn.TRIANGLE_STRIP||p.mode===Fn.TRIANGLE_FAN||p.mode===void 0)m=s.isSkinnedMesh===!0?new Ta(y,M):new mt(y,M),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),p.mode===Fn.TRIANGLE_STRIP?m.geometry=fm(m.geometry,Qa):p.mode===Fn.TRIANGLE_FAN&&(m.geometry=fm(m.geometry,Mo));else if(p.mode===Fn.LINES)m=new Da(y,M);else if(p.mode===Fn.LINE_STRIP)m=new Kr(y,M);else if(p.mode===Fn.LINE_LOOP)m=new Ia(y,M);else if(p.mode===Fn.POINTS)m=new Ra(y,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&pR(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),Ei(m,s),p.extensions&&cs(r,m,p),t.assignFinalMaterial(m),d.push(m)}for(let h=0,g=d.length;h<g;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return s.extensions&&cs(r,d[0],s),d[0];let f=new $t;s.extensions&&cs(r,f,s),t.associations.set(f,{meshes:e});for(let h=0,g=d.length;h<g;h++)f.add(d[h]);return f})}loadCamera(e){let t,i=this.json.cameras[e],r=i[i.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new Ot(Sr.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):i.type==="orthographic"&&(t=new vr(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Ei(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let r=0,s=t.joints.length;r<s;r++)i.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(r){let s=r.pop(),o=r,a=[],c=[];for(let l=0,u=o.length;l<u;l++){let d=o[l];if(d){a.push(d);let f=new Oe;s!==null&&f.fromArray(s.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Ca(a,c)})}loadAnimation(e){let t=this.json,i=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let d=0,f=r.channels.length;d<f;d++){let h=r.channels[d],g=r.samplers[h.sampler],y=h.target,p=y.node,m=r.parameters!==void 0?r.parameters[g.input]:g.input,M=r.parameters!==void 0?r.parameters[g.output]:g.output;y.node!==void 0&&(o.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",M)),l.push(g),u.push(y))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(d){let f=d[0],h=d[1],g=d[2],y=d[3],p=d[4],m=[];for(let b=0,S=f.length;b<S;b++){let C=f[b],T=h[b],D=g[b],_=y[b],E=p[b];if(C===void 0)continue;C.updateMatrix&&C.updateMatrix();let W=i._createAnimationTracks(C,T,D,_,E);if(W)for(let A=0;A<W.length;A++)m.push(W[A])}let M=new Oa(s,void 0,m);return Ei(M,r),M})}createNodeMesh(e){let t=this.json,i=this,r=t.nodes[e];return r.mesh===void 0?null:i.getDependency("mesh",r.mesh).then(function(s){let o=i._getNodeRef(i.meshCache,r.mesh,s);return r.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=r.weights.length;c<l;c++)a.morphTargetInfluences[c]=r.weights[c]}),o})}loadNode(e){let t=this.json,i=this,r=t.nodes[e],s=i._loadNodeShallow(e),o=[],a=r.children||[];for(let l=0,u=a.length;l<u;l++)o.push(i.getDependency("node",a[l]));let c=r.skin===void 0?Promise.resolve(null):i.getDependency("skin",r.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){let u=l[0],d=l[1],f=l[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,yR)});for(let h=0,g=d.length;h<g;h++)u.add(d[h]);if(u.userData.pivot!==void 0&&d.length>0){let h=u.userData.pivot,g=d[0];u.pivot=new R().fromArray(h),u.position.x-=h[0],u.position.y-=h[1],u.position.z-=h[2],g.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,i=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],o=s.name?r.createUniqueName(s.name):"",a=[],c=r._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),s.camera!==void 0&&a.push(r.getDependency("camera",s.camera).then(function(l){return r._getNodeRef(r.cameraCache,s.camera,l)})),r._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(s.isBone===!0?u=new lo:l.length>1?u=new $t:l.length===1?u=l[0]:u=new Nt,u!==l[0])for(let d=0,f=l.length;d<f;d++)u.add(l[d]);if(s.name&&(u.userData.name=s.name,u.name=o),Ei(u,s),s.extensions&&cs(i,u,s),s.matrix!==void 0){let d=new Oe;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!r.associations.has(u))r.associations.set(u,{});else if(s.mesh!==void 0&&r.meshCache.refs[s.mesh]>1){let d=r.associations.get(u);r.associations.set(u,sn({},d))}return r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],r=this,s=new $t;i.name&&(s.name=r.createUniqueName(i.name)),Ei(s,i),i.extensions&&cs(t,s,i);let o=i.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(r.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,d=c.length;u<d;u++){let f=c[u];f.parent!==null?s.add(xx(f)):s.add(f)}let l=u=>{let d=new Map;for(let[f,h]of r.associations)(f instanceof cn||f instanceof _n)&&d.set(f,h);return u.traverse(f=>{let h=r.associations.get(f);h!=null&&d.set(f,h)}),d};return r.associations=l(s),s})}_createAnimationTracks(e,t,i,r,s){let o=[],a=e.name?e.name:e.uuid,c=[];Er[s.path]===Er.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(Er[s.path]){case Er.weights:l=yi;break;case Er.rotation:l=vi;break;case Er.translation:case Er.scale:l=_i;break;default:switch(i.itemSize){case 1:l=yi;break;case 2:case 3:default:l=_i;break}break}let u=r.interpolation!==void 0?dR[r.interpolation]:Xr,d=this._getArrayFromAccessor(i);for(let f=0,h=c.length;f<h;f++){let g=new l(c[f]+"."+Er[s.path],t.array,d,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=Bm(t.constructor),r=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)r[s]=t[s]*i;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let r=this instanceof vi?Um:fd;return new r(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function vR(n,e,t){let i=e.attributes,r=new Tn;if(i.POSITION!==void 0){let a=t.json.accessors[i.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(r.set(new R(c[0],c[1],c[2]),new R(l[0],l[1],l[2])),a.normalized){let u=Bm(wo[a.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let a=new R,c=new R;for(let l=0,u=s.length;l<u;l++){let d=s[l];if(d.POSITION!==void 0){let f=t.json.accessors[d.POSITION],h=f.min,g=f.max;if(h!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(h[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(h[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(h[2]),Math.abs(g[2]))),f.normalized){let y=Bm(wo[f.componentType]);c.multiplyScalar(y)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(a)}n.boundingBox=r;let o=new pn;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,n.boundingSphere=o}function wx(n,e,t){let i=e.attributes,r=[];function s(o,a){return t.getDependency("accessor",o).then(function(c){n.setAttribute(a,c)})}for(let o in i){let a=km[o]||o.toLowerCase();a in n.attributes||r.push(s(i[o],a))}if(e.indices!==void 0&&!n.index){let o=t.getDependency("accessor",e.indices).then(function(a){n.setIndex(a)});r.push(o)}return Ze.workingColorSpace!==Zt&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`),Ei(n,e),vR(n,e,t),Promise.all(r).then(function(){return e.targets!==void 0?hR(n,e.targets,t):n})}var Rn=[-8,-10,-12,-14,-16,-18],hd=[-18,-14,-10,-6],_R=4,xR=[[35,0],[30,0],[25,0],[20,0],[15,0],[10,0],[5,0],[0,0],[-5,0],[-10,0],[-20,0],[-30,0]],MR=[[5,0],[5,-3],[5,-6],[5,-9],[5,-12],[5,-18],[5,-22]],Cx=[12597547,2719929,2600544,15105570,9323693,1482885,13849600,2899536],Ax=(()=>{class n{constructor(t){this.sim=t,this.raf=0,this.clock=new ja,this.trucks=[],this.zones=[],this.idCounter=1,this.spawnTimer=0,this.nextSpawn=5,this.z8Queue=[],this.truckTemplate=null,this.templateReady=!1,this.roadScroll=0,this.focus=new R(0,0,-8),this.dist=45,this.pitch=45,this.yaw=0,this.dragging=!1,this.lastXY={x:0,y:0},this.raycaster=new Wa,this.mouse=new Ne,this.tooltipEl=null,this.labelMap=new Map,this.screenCanvases=[],this.screenTextures=[]}init(t){let i=t.nativeElement;this.renderer=new ad({canvas:i,antialias:!0}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=fu,this.renderer.toneMapping=qa,this.renderer.toneMappingExposure=1.25,this.renderer.setSize(i.clientWidth,i.clientHeight,!1),this.scene=new Sa,this.scene.background=new we(6590664),this.scene.fog=new Ma(9087684,.005),this.camera=new Ot(58,i.clientWidth/i.clientHeight,.3,400),this.applyCamera(),this.buildLights(),this.buildGround(),this.buildMountains(),this.buildRoad(),this.buildZoneNodes(),this.buildBuildings(),this.buildZone8Lanes(),this.buildGate(),this.buildTrafficLight(),this.buildMonitoringPanel(),this.truckGroup=new $t,this.scene.add(this.truckGroup),this.loadTruckTemplate().then(()=>{this.spawnTruck()}),this.createTooltip(i),this.bindEvents(i),this.loop()}destroy(){cancelAnimationFrame(this.raf),this.renderer.dispose()}resize(t,i){this.camera.aspect=t/i,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,i,!1)}loop(){this.raf=requestAnimationFrame(()=>this.loop());let t=Math.min(this.clock.getDelta(),.1);this.sim.tickTime(t),this.sim.isPaused()||(this.tickSpawn(t),this.tickZones(t),this.tickTrucks(t),this.roadScroll+=t*.12,this.roadMat.map&&(this.roadMat.map.offset.y=this.roadScroll)),this.updateTrafficLight(),this.updatePanelMats(),this.renderer.render(this.scene,this.camera)}applyCamera(){let t=Sr.degToRad(this.yaw),i=Sr.degToRad(this.pitch),r=new R(Math.cos(i)*Math.sin(t),Math.sin(i),Math.cos(i)*Math.cos(t)).multiplyScalar(this.dist);this.camera.position.copy(this.focus).add(r),this.camera.lookAt(this.focus)}bindEvents(t){t.addEventListener("wheel",i=>{this.dist=Sr.clamp(this.dist*(i.deltaY>0?1.1:.9),5,180),this.applyCamera()},{passive:!0}),t.addEventListener("mousedown",i=>{this.dragging=!0,this.lastXY={x:i.clientX,y:i.clientY}}),window.addEventListener("mouseup",()=>{this.dragging=!1}),window.addEventListener("mousemove",i=>{if(this.dragging){let s=i.clientX-this.lastXY.x,o=i.clientY-this.lastXY.y;this.lastXY={x:i.clientX,y:i.clientY};let a=new R().crossVectors(this.camera.getWorldDirection(new R),Nt.DEFAULT_UP).normalize(),c=new R(-a.z,0,a.x).normalize();this.focus.addScaledVector(a,-s*this.dist*9e-4),this.focus.addScaledVector(c,o*this.dist*9e-4),this.applyCamera()}let r=t.getBoundingClientRect();this.mouse.x=(i.clientX-r.left)/r.width*2-1,this.mouse.y=-((i.clientY-r.top)/r.height)*2+1,this.updateTooltip(i.clientX,i.clientY)})}createTooltip(t){this.tooltipEl=document.createElement("div"),Object.assign(this.tooltipEl.style,{position:"fixed",pointerEvents:"none",zIndex:"1000",background:"rgba(10,14,24,0.92)",color:"#ccd8ee",padding:"6px 10px",borderRadius:"6px",fontSize:"12px",fontFamily:"Segoe UI, Arial, sans-serif",lineHeight:"1.5",border:"1px solid #2a3a5a",display:"none",maxWidth:"220px"}),t.parentElement.appendChild(this.tooltipEl)}updateTooltip(t,i){if(!this.tooltipEl)return;this.raycaster.setFromCamera(this.mouse,this.camera);let r="";for(let s of this.raycaster.intersectObjects(this.scene.children,!0)){let o=s.object;for(;o;){if(this.labelMap.has(o)){r=this.labelMap.get(o);break}let a=this.trucks.find(c=>c.root===o);if(a){let c=a.zoneIdx>=0&&a.zoneIdx<a.zonePath.length?`\u0417\u043E\u043D\u0430 ${a.zonePath[a.zoneIdx].id}`:"\u0422\u0440\u0430\u043D\u0437\u0438\u0442";r=`\u0422\u0421 #${a.id}
${a.inSlot?"\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430":"\u0414\u0432\u0438\u0436\u0435\u043D\u0438\u0435"}
${c}${a.laneAssigned>=0?` | \u041F.${a.laneAssigned+1}`:""}`;break}o=o.parent}if(r)break}r?(this.tooltipEl.innerHTML=r.replace(/\n/g,"<br>"),Object.assign(this.tooltipEl.style,{display:"block",left:t+14+"px",top:i+14+"px"})):this.tooltipEl.style.display="none"}registerLabel(t,i){this.labelMap.set(t,i)}M(t,i,r=0,s=0,o=0,a=!1,c=0,l=0,u=0){let d=new mt(t,i);return d.position.set(r,s,o),d.rotation.set(c,l,u),d.castShadow=a,d.receiveShadow=!0,this.scene.add(d),d}buildLights(){let t=new _r(16774376,2.8);t.position.set(35,70,25),t.castShadow=!0,t.shadow.mapSize.setScalar(2048),t.shadow.camera.near=1,t.shadow.camera.far=160,t.shadow.camera.left=t.shadow.camera.bottom=-60,t.shadow.camera.right=t.shadow.camera.top=60,t.shadow.bias=-.001,this.scene.add(t);let i=new _r(8959208,.55);i.position.set(-15,25,-10),this.scene.add(i),this.scene.add(new za(12111088,.75))}buildGround(){this.M(new ji(320,260),new qe({color:11575424,roughness:.97}),0,0,-10,!1,-Math.PI/2);let t=(i,r)=>i+Math.random()*(r-i);for(let i=0;i<55;i++){let r=t(-140,140),s=t(-120,100)-10;if(Math.abs(r)<25&&Math.abs(s+10)<30)continue;let o=t(.8,4.5),a=t(.15,1),c=t(.6,3.5),l=t(.42,.62);this.M(new et(o,a,c),new qe({color:new we(l*1.05,l,l*.88),roughness:.96,flatShading:!0}),r,a/2,s,!1,0,t(0,Math.PI))}}buildMountains(){let t=(i,r,s,o,a)=>{let c=new $t,l=(u,d,f,h,g)=>{let y=new mt(new La(f,h,7),new qe({color:u,roughness:d,flatShading:!0}));y.position.y=g,c.add(y)};l(a,.94,o,s,s/2),l(new we(a).multiplyScalar(.72).getHex(),.96,o*.65,s*.45,s*.52),l(15265528,.88,o*.35,s*.28,s*.86),c.position.set(i,0,r),this.scene.add(c)};t(-55,-85,62,34,8026224),t(-25,-95,70,42,7236712),t(12,-105,78,48,6841956),t(52,-90,62,38,7499884),t(85,-65,50,30,7894128),t(-95,-55,55,32,7368300),t(-105,-22,44,27,7631472),t(95,-22,42,24,7894642),t(-72,25,40,24,7236712),t(72,28,45,28,7368298),t(30,-125,88,55,6578784),t(-48,-115,82,50,6447200)}buildRoad(){let i=document.createElement("canvas");i.width=i.height=512;let r=i.getContext("2d");r.fillStyle="#303038",r.fillRect(0,0,512,512);for(let a=0;a<1600;a++){let c=38+Math.random()*24;r.fillStyle=`rgb(${c},${c},${c})`,r.fillRect(Math.random()*512,Math.random()*512,1.5,1.5)}r.setLineDash([68,48]),r.lineWidth=10,r.strokeStyle="rgba(255,255,170,0.48)",r.beginPath(),r.moveTo(512/2,0),r.lineTo(512/2,512),r.stroke();let s=new Jr(i);s.wrapS=s.wrapT=pi,s.repeat.set(1,4),this.roadMat=new qe({map:s,roughness:.88,metalness:.03,color:4737104});let o=a=>{for(let c=0;c<a.length-1;c++){let[l,u]=a[c],[d,f]=a[c+1],h=d-l,g=f-u,y=Math.hypot(h,g),p=new mt(new et(y,.04,3.6),this.roadMat);p.position.set((l+d)/2,.02,(u+f)/2),p.rotation.y=-Math.atan2(g,h),p.receiveShadow=!0,this.scene.add(p)}};o(xR),o(MR),o([[5,-14],[3,-15],[0,-15],[-2,-14]]),this.M(new et(8,.04,8),this.roadMat,1,.02,-13),this.M(new et(18,.04,16),this.roadMat,-9,.02,-13),this.M(new et(12,.04,6),this.roadMat,-22.5,.02,-13),this.M(new et(6,.04,14),this.roadMat,-25,.02,-7),o([[-20,-20],[-20,-13],[-25,-13],[-25,-8],[-25,-3],[-25,0]])}buildBuildings(){let t=a=>new we(a).lerp(new we(5267568),.45),i=(a,c,l,u,d,f,h,g)=>{this.M(new et(l+.35,.18,d+.35),new qe({color:9078912}),a,.09,c);let y=this.M(new et(l,u,d),new qe({color:f,roughness:.78}),a,u/2,c,!0);this.registerLabel(y,g);let p=new mt(new et(l+.2,u*.11,d+.2),new qe({color:t(f)}));p.position.set(a,u+u*.055-.02,c),p.castShadow=!0,this.scene.add(p),this.registerLabel(p,g),this.addSprite(h,a,c,u+1,2.4,.65)};i(20,-4,3,2.5,2,14212296,"\u041F\u043E\u0433\u0440\u0430\u043D.\u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C",`\u041F\u043E\u0433\u0440\u0430\u043D\u0438\u0447\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C
\u0424\u0438\u043A\u0441\u0430\u0446\u0438\u044F \u0410\u0422\u0421
\u0412\u0440\u0435\u043C\u044F: 1 \u043C\u0438\u043D`);let r=`\u0412\u0435\u0441\u044B \u21161
\u0412\u0435\u0441\u043E\u0433\u0430\u0431\u0430\u0440\u0438\u0442\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C
\u0412\u0440\u0435\u043C\u044F: 3-5 \u043C\u0438\u043D`,s=new qe({color:15261902,roughness:.78}),o=this.M(new et(1.2,3,5),s,2.5,1.5,-10,!0);this.registerLabel(o,r),this.M(new et(1.2,3,5),s,7.5,1.5,-10,!0),this.M(new et(6.5,.3,5),new qe({color:13683904,roughness:.8}),5,3.15,-10,!0),this.addSprite("\u0412\u0435\u0441\u044B",5,-10,4,2.4,.65),i(-20,-17,2.5,2.8,2,14866632,"\u0413\u041A\u041E",`\u0413\u041A\u041E
\u0413\u043E\u0441. \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0439`),i(-26,-17,3,2.5,2,14471360,"\u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0413\u0422\u0418",`\u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0413\u0422\u0418
\u0412\u0440\u0435\u043C\u044F: 2 \u043C\u0438\u043D`),this.addSprite("\u0417\u043E\u043D\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438",-10,-7,1.5,3.5,.65)}buildZone8Lanes(){let t=new qe({color:15658734,transparent:!0,opacity:.7}),i=[12638463,13430968,12638463,13430968,12638463,13430968];for(let s=0;s<Rn.length;s++){let o=Rn[s];this.M(new et(14,.05,1.4),new qe({color:i[s],transparent:!0,opacity:.35}),-9,.025,o),s<Rn.length-1&&this.M(new et(14,.02,.06),t,-9,.03,(o+Rn[s+1])/2),this.M(new et(.08,.02,1.2),t,hd[0],.03,o),this.addBooth(hd[0]-1.5,o,`\u041F.${s+1}`)}let r=Rn[0]-Rn[Rn.length-1]+3;this.M(new et(2.6,.22,r),new qe({color:2901088,roughness:.7}),hd[0]-1.5,4,(Rn[0]+Rn[Rn.length-1])/2,!0)}addBooth(t,i,r){this.M(new et(2,.15,1.6),new qe({color:2633272}),t,.08,i);let s=this.M(new et(1.8,3.6,1.4),new qe({color:4874872,roughness:.75}),t,1.85,i,!0);this.M(new et(.06,.8,.9),new qe({color:8962286,transparent:!0,opacity:.65,metalness:.35}),t+.93,2.2,i),this.registerLabel(s,`${r}
\u041A\u0430\u0431\u0438\u043D\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438
\u0412\u0440\u0435\u043C\u044F: 20-25 \u043C\u0438\u043D`)}buildBorderFence(){let t=new qe({color:12630184,roughness:.9}),i=new qe({color:11577496,roughness:.85});for(let[r,s,o]of[[-2,-6,-20],[-22,-6,-20]]){for(let c=s;c>=o;c-=2.5)this.M(new et(.18,1.6,.18),t,r,.8,c,!0);let a=Math.abs(o-s);this.M(new et(.1,.1,a),i,r,1.4,(s+o)/2),this.M(new et(.1,.1,a),i,r,.75,(s+o)/2)}}buildGate(){let t=new qe({color:1973794,roughness:.75}),i=new qe({color:14492194}),r=new qe({color:15658734});this.M(new mn(.07,.08,2,8),t,-2,1,-6,!0),this.M(new mn(.07,.08,2,8),t,-22,1,-6,!0),this.M(new mn(.06,.06,20,8),i,-12,1.95,-6,!0,0,0,Math.PI/2);for(let s=0;s<10;s++)this.M(new et(.7,.14,.14),r,-21+s*2,1.95,-5.98);this.M(new mn(.07,.08,2,8),t,-23,1,-2,!0),this.M(new mn(.07,.08,2,8),t,-27,1,-2,!0),this.M(new mn(.06,.06,4,8),i,-25,1.95,-2,!0,0,0,Math.PI/2);for(let s=0;s<3;s++)this.M(new et(.5,.14,.14),r,-26.2+s*1.2,1.95,-1.98);this.addSprite("\u0412\u043E\u0440\u043E\u0442\u0430 (\u0432\u044B\u0445\u043E\u0434)",-25,-2,2.8,3,.55)}buildTrafficLight(){let t=new $t;t.position.set(22,0,-3);let i=(r,s,o=0,a=0,c=0)=>{let l=new mt(r,s);l.position.set(o,a,c),l.castShadow=!0,t.add(l)};i(new mn(.055,.078,2.2,10),new qe({color:1710622}),0,1.1,0),i(new et(.24,.56,.2),new qe({color:921102}),0,2.15,0),this.tlRed=new qe({color:14487825,emissive:8914952,emissiveIntensity:.2,roughness:.2}),i(new mo(.078,12,8),this.tlRed,0,2.3,.11),this.tlGreen=new qe({color:1170722,emissive:567824,emissiveIntensity:1.5,roughness:.2}),i(new mo(.078,12,8),this.tlGreen,0,2.06,.11),this.scene.add(t),this.registerLabel(t,`\u0421\u0432\u0435\u0442\u043E\u0444\u043E\u0440
\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0432\u0445\u043E\u0434\u0430 \u0422\u0421`)}updateTrafficLight(){let t=this.sim.isGreen();this.tlRed.emissiveIntensity=t?.05:1.8,this.tlRed.color.set(t?4458504:16716049),this.tlGreen.emissiveIntensity=t?1.8:.05,this.tlGreen.color.set(t?1179426:541704)}buildMonitoringPanel(){let t=(i,r,s,o)=>{let a=new $t;a.position.set(...i),a.rotation.y=r;let c=(g,y,p=0,m=0,M=0)=>{let b=new mt(g,y);b.position.set(p,m,M),a.add(b)};for(let g of[-s/2-.15,s/2+.15])c(new mn(.055,.075,3.4,10),new qe({color:1973796,roughness:.7}),g,-1.1,0);let l=document.createElement("canvas");l.width=512,l.height=320;let u=l.getContext("2d");u.fillStyle="#0a0e18",u.fillRect(0,0,512,320),u.fillStyle="#88aaee",u.font="bold 28px Arial",u.textAlign="center",u.fillText("\u041F\u041E\u041B\u041E\u0421\u042B \u0420\u0415\u0413\u0418\u0421\u0422\u0420\u0410\u0426\u0418\u0418  0/24",256,32);for(let g=0;g<6;g++){let y=52+g*44;u.fillStyle="#8899bb",u.font="bold 22px Arial",u.textAlign="left",u.fillText(`\u041F.${g+1}`,10,y+20);for(let p=0;p<4;p++)u.fillStyle="#2a2a3a",u.fillRect(70+p*90,y+2,80,28);u.fillStyle="#88ccaa",u.font="20px Arial",u.textAlign="right",u.fillText("--",502,y+22)}let d=new Jr(l);d.minFilter=wt;let f=new Cn({map:d,side:un}),h=new mt(new ji(s,o),f);h.position.set(0,0,-.06),h.rotation.y=Math.PI,a.add(h),c(new et(s+.1,o+.1,.06),new qe({color:1710628,roughness:.8}),0,0,0),this.scene.add(a),this.screenCanvases.push(l),this.screenTextures.push(d),this.registerLabel(a,`\u042D\u043A\u0440\u0430\u043D-\u0440\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C
\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043F\u043E\u043B\u043E\u0441 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438`)};t([8,3,-2],Math.PI,2.6,1.6),t([2,3,-14],Math.PI,2.2,1.3),this.updatePanelMats()}updatePanelMats(){let t=this.sim.laneDetails(),i=this.sim.laneOccupancies(),r=i.reduce((s,o)=>s+o,0);for(let s=0;s<this.screenCanvases.length;s++){let o=this.screenCanvases[s],a=o.getContext("2d"),c=o.width,l=o.height;a.fillStyle="#0a0e18",a.fillRect(0,0,c,l),a.fillStyle="#88aaee",a.font="bold 28px Arial",a.textAlign="center",a.fillText(`\u041F\u041E\u041B\u041E\u0421\u042B \u0420\u0415\u0413\u0418\u0421\u0422\u0420\u0410\u0426\u0418\u0418  ${r}/24`,c/2,32);for(let u=0;u<6;u++){let d=52+u*44,f=t[u],h=i[u];a.fillStyle="#8899bb",a.font="bold 22px Arial",a.textAlign="left",a.fillText(`\u041F.${u+1}`,10,d+20);for(let g=0;g<4;g++){let y=70+g*90,p=g<h,m=g===0&&f.processing;a.fillStyle=p?m?"#22cc33":"#ff9900":"#2a2a3a",a.fillRect(y,d+2,80,28),a.strokeStyle="#1a1a2a",a.strokeRect(y,d+2,80,28)}a.fillStyle="#88ccaa",a.font="20px Arial",a.textAlign="right",a.fillText(f.processing?`${f.remaining.toFixed(0)}\u043C`:"--",c-10,d+22)}this.screenTextures[s].needsUpdate=!0}}buildFlagPoles(){let t=new qe({color:13158600,metalness:.6,roughness:.4}),i=new qe({color:13959168,side:un,roughness:.7});for(let[r,s]of[[-2,-10],[-22,-10]])this.M(new mn(.045,.055,6,8),t,r,3,s,!0),this.M(new ji(1,.62),i,r+.5,5.7,s)}addSprite(t,i,r,s,o,a){let c=document.createElement("canvas");c.width=512,c.height=128;let l=c.getContext("2d");l.fillStyle="rgba(0,0,0,0.7)",l.beginPath(),l.roundRect(8,8,496,112,16),l.fill(),l.fillStyle="#ffffff",l.font="bold 36px Arial",l.textAlign="center",l.textBaseline="middle",t.split(`
`).forEach((d,f)=>l.fillText(d,256,50+f*40));let u=new wa(new co({map:new Jr(c),depthTest:!1,transparent:!0}));u.position.set(i,s,r),u.scale.set(o,a,1),this.scene.add(u)}loadGLB(t,i,r=0){return new Promise(s=>{new ud().load(t,o=>{let a=new $t,c=o.scene;c.scale.setScalar(i),c.rotation.y=r,c.traverse(l=>{l.isMesh&&(l.castShadow=!0,l.receiveShadow=!0)}),a.add(c),s(a)},void 0,()=>s(null))})}loadTruckTemplate(){return Cr(this,null,function*(){let t=yield this.loadGLB("assets/models/truck.glb",.5);this.truckTemplate=t??this.buildProceduralTruck(13382434),this.templateReady=!0})}buildProceduralTruck(t){let i=new $t,r=.1,s=new qe({color:t,roughness:.7,metalness:.12}),o=new mt(new et(.95,.38,.48),s);o.position.set(.45,r+.19,0),o.castShadow=!0,i.add(o);let a=new mt(new et(.44,.44,.44),new qe({color:t,roughness:.42,metalness:.28}));return a.position.set(1.1,r+.22,0),a.castShadow=!0,i.add(a),i}tickSpawn(t){if(this.spawnTimer+=t,this.spawnTimer>=this.nextSpawn){if(this.spawnTimer=0,!this.sim.isGreen())return;let i=this.trucks[this.trucks.length-1];if(i&&i.root.position.x>28)return;this.spawnTruck(),this.nextSpawn=this.sim.getSpawnIntervalSeconds()}}spawnTruck(){if(!this.templateReady||this.trucks.length>=40)return;let t=this.idCounter++,i=Cx[(t-1)%Cx.length],r;this.truckTemplate?(r=this.truckTemplate.clone(),r.traverse(o=>{if(o.isMesh){let a=o.material;if(a?.isMeshStandardMaterial){let c=a.clone();c.color.lerp(new we(i),.45),o.material=c}}})):r=this.buildProceduralTruck(i),r.position.set(35,0,0),r.rotation.y=0,this.truckGroup.add(r),this.sim.truckEntered();let s={id:t,root:r,wheels:[],speed:0,heading:new R(-1,0,0),yaw:0,steeringAngle:0,target:null,wpQueue:[],wpDone:null,inSlot:!1,waitTimer:0,zoneIdx:-1,zonePath:[...this.zones],skipZ9:!1,laneAssigned:-1};this.trucks.push(s),this.advance(s)}buildZoneNodes(){let t=Rn.map(s=>hd.map(o=>new R(o,.15,s))),i=(s,o,a,c,l,u,d=[],f=!1,h=999)=>({id:s,minT:o,maxT:a,entryPt:new R(c,.15,l),preWps:d.map(([g,y])=>new R(g,.15,y)),slotsByLane:u.map(g=>g.map(([y,p])=>new R(y,.15,p))),lanes:u.map(()=>({trucks:[],elapsed:[],remaining:[]})),sequential:f,maxPerLane:h,nextLane:0});this.zones.push(i(1,.5,1,20,0,[[[20,-1.2]],[[20,1.2]]])),this.zones.push(i(2,3,5,5,-8,[[[5,-10]],[[5,-11]]],[[10,0],[7,0],[6,-1],[5,-2.5],[5,-5]],!1,1)),this.zones.push(i(3,3,5,3,-14,[[[3,-14]]],[[5,-12],[4.5,-13],[4,-14]]));let r=i(8,20,25,-2,-6,t.map(s=>s.map(o=>[o.x,o.z])),[[3,-14],[1,-14],[0,-10],[-1,-7],[-2,-6]],!1,_R);this.zones.push(r),this.zone8=r,this.zones.push(i(5,2,3,-25,-13,[[[-25,-13]]],[[-19,-13],[-22,-13]]))}tickZones(t){let i=t*this.sim.simSpeed();for(let r of this.zones)for(let s of r.lanes)if(s.trucks.length&&(s.elapsed[0]+=i,s.remaining[0]-=i,s.remaining[0]<=0)){let o=s.trucks.shift();if(s.elapsed.shift(),s.remaining.shift(),r===this.zone8){let a=o.laneAssigned,c=r.slotsByLane[Math.min(a,r.slotsByLane.length-1)];for(let l=0;l<s.trucks.length;l++){let u=c[Math.min(l,c.length-1)];this.moveTo(s.trucks[l],new R(u.x,.15,Rn[a]))}s.trucks.length&&(s.remaining[0]=this.rand(r.minT,r.maxT)+this.sim.laneDelays()[a])}else s.trucks.length&&(s.remaining[0]=this.rand(r.minT,r.maxT));this.advance(o)}this.sim.updateLanes(this.zone8.lanes.map(r=>r.trucks.length),this.zone8.lanes.map(r=>({processing:r.trucks.length>0,remaining:r.remaining[0]??0,queueCount:Math.max(0,r.trucks.length-1)})),this.z8Queue.length)}advance(t){if(t.inSlot=!1,t.zoneIdx++,t.zoneIdx>=t.zonePath.length){this.exitTruck(t);return}t.zoneIdx===1&&this.sim.truckPassedLight();let i=t.zonePath[t.zoneIdx];this.followPath(t,[...i.preWps,i.entryPt],()=>this.tryEnter(t,i))}tryEnter(t,i){if(!this.trucks.includes(t))return;let r=-1;if(i.sequential)for(let d=0;d<i.lanes.length;d++){let f=i.nextLane%i.lanes.length;if(i.nextLane++,i.lanes[f].trucks.length<i.maxPerLane){r=f;break}}else{let d=1/0;for(let f=0;f<i.lanes.length;f++){let h=i.lanes[f].trucks.length;h<i.maxPerLane&&h<d&&(d=h,r=f)}}if(r<0){if(t.waitTimer=1,i.id===8){this.z8Queue.includes(t)||this.z8Queue.push(t);let d=this.z8Queue.indexOf(t);this.moveTo(t,new R(-2+(d+1)*2.5,.15,-6))}return}i.id===8&&(this.z8Queue=this.z8Queue.filter(d=>d!==t));let s=i.lanes[r],o=s.trucks.length,a=i.slotsByLane[Math.min(r,i.slotsByLane.length-1)],c=a[Math.min(o,a.length-1)];s.trucks.push(t),s.elapsed.push(0);let l=o===0?this.rand(i.minT,i.maxT):0,u=i.id===8?this.sim.laneDelays()[r]:0;if(s.remaining.push(l+u),t.inSlot=!0,t.laneAssigned=r,i.id===8&&this.sim.logDistribution(t.id,r),i.id===8){let d=Rn[r];this.followPath(t,[new R(-2,.15,d),new R(c.x,.15,d)],()=>{})}else this.moveTo(t,c)}exitTruck(t){this.sim.truckExited(),this.followPath(t,[new R(-25,.15,-10),new R(-25,.15,-6),new R(-25,.15,-2),new R(-25.5,.15,-.5),new R(-27,.15,0),new R(-32,.15,0)],()=>{this.truckGroup.remove(t.root),this.trucks=this.trucks.filter(i=>i!==t)})}moveTo(t,i,r){t.target=i.clone(),t.wpQueue=[],r&&(t.wpDone=r)}followPath(t,i,r){t.wpQueue=i.map(s=>s.clone()),t.wpDone=r,t.target=null,this.stepPath(t)}stepPath(t){if(!t.wpQueue.length){let i=t.wpDone;t.wpDone=null,i?.();return}t.target=t.wpQueue.shift()}tickTrucks(t){let i=this.sim.simSpeed(),r=t*i,s=!this.sim.isGreen();for(let o of this.trucks){if(o.waitTimer>0){o.waitTimer-=r,o.waitTimer<=0&&this.tryEnter(o,o.zonePath[o.zoneIdx]);continue}if(s&&!o.inSlot&&o.zoneIdx<=0){o.speed=Math.max(0,o.speed-10*t);continue}if(!o.target){o.speed=Math.max(0,o.speed-10*t);continue}let a=o.target.x-o.root.position.x,c=o.target.z-o.root.position.z,l=Math.hypot(a,c);if(l<.3){if(o.root.position.x=o.target.x,o.root.position.z=o.target.z,o.speed=0,o.target=null,o.wpQueue.length)this.stepPath(o);else{let m=o.wpDone;o.wpDone=null,m?.()}continue}let u=a/l,d=c/l,f=8*i,h=Math.min(f,f*Math.min(l/2,1));o.speed+=(h-o.speed)*Math.min(5*t,.3),o.speed=Sr.clamp(o.speed,0,f);let g=o.speed*t;o.root.position.x+=u*g,o.root.position.z+=d*g;let p=Math.atan2(u,d)-o.root.rotation.y;for(;p>Math.PI;)p-=2*Math.PI;for(;p<-Math.PI;)p+=2*Math.PI;o.root.rotation.y+=p*Math.min(4*t,.2)}}rand(t,i){return t+Math.random()*(i-t)}static{this.\u0275fac=function(i){return new(i||n)(ft(ol))}}static{this.\u0275prov=Ct({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();var bR=["canvas"],ER=()=>[0,1,2,3];function wR(n,e){if(n&1&&(Re(0,"option",10),Ye(1),Le()),n&2){let t=e.$implicit,i=jn();bh("value",t)("selected",i.sim.simHour()===t),ct(),Mn("",t,":00")}}function TR(n,e){if(n&1){let t=ea();Re(0,"button",22),Li("click",function(){let r=nr(t).$implicit,s=jn();return ir(s.setIntensity(r))}),Ye(1),Le()}if(n&2){let t=e.$implicit,i=jn();Jo("active",i.sim.intensity()===t),ct(),Mn("",t,"x")}}function CR(n,e){if(n&1&&(Re(0,"div",6)(1,"span"),Ye(2,"\u0412 \u043E\u0447\u0435\u0440\u0435\u0434\u0438"),Le(),Re(3,"span",23),Ye(4),Le()()),n&2){let t=jn();ct(4),Fi(t.sim.waitingQueue())}}function AR(n,e){if(n&1&&el(0,"div",30),n&2){let t=e.$implicit,i=jn().$implicit;Qc("background",t<i.queueCount+(i.processing?1:0)?t===0&&i.processing?"#22cc33":"#ff9900":"#2a2a2a")}}function DR(n,e){if(n&1){let t=ea();Re(0,"div",14)(1,"span",24),Ye(2),Le(),Re(3,"div",25),kr(4,AR,1,2,"div",26,Qo),Le(),Re(6,"span",27),Ye(7),Le(),Re(8,"button",28),Li("click",function(){let r=nr(t).$index,s=jn();return ir(s.sim.adjustLaneDelay(r,-5))}),Ye(9,"-5"),Le(),Re(10,"span",29),Ye(11),Le(),Re(12,"button",28),Li("click",function(){let r=nr(t).$index,s=jn();return ir(s.sim.adjustLaneDelay(r,5))}),Ye(13,"+5"),Le()()}if(n&2){let t=e.$implicit,i=e.$index,r=jn();ct(2),Mn("\u041F.",i+1,""),ct(2),Br(ev(4,ER)),ct(3),Fi(t.processing?t.remaining.toFixed(0)+"\u043C":"--"),ct(4),Th("",r.sim.laneDelays()[i]>=0?"+":"","",r.sim.laneDelays()[i],"\u043C")}}function IR(n,e){n&1&&(Re(0,"div",18),Ye(1,"\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0422\u0421..."),Le())}function RR(n,e){if(n&1&&(Re(0,"div",19)(1,"span",31),Ye(2),Le(),Re(3,"span"),Ye(4),Le(),Re(5,"span",32),Ye(6),Le()()),n&2){let t=e.$implicit;ct(2),Fi(t.time),ct(2),Mn("\u0422\u0421 #",t.truckId,""),ct(2),Mn("\u041F.",t.lane+1,"")}}function NR(n,e){if(n&1){let t=ea();Re(0,"button",22),Li("click",function(){let r=nr(t).$implicit,s=jn();return ir(s.setSpeed(r))}),Ye(1),Le()}if(n&2){let t=e.$implicit,i=jn();Jo("active",i.sim.simSpeed()===t),ct(),Mn("",t,"x")}}var Dx=(()=>{class n{constructor(t,i){this.sim=t,this.scene=i}ngOnInit(){this.scene.init(this.canvasRef),new ResizeObserver(()=>{let i=this.canvasRef.nativeElement;this.scene.resize(i.clientWidth,i.clientHeight)}).observe(this.canvasRef.nativeElement)}ngOnDestroy(){this.scene.destroy()}setSpeed(t){this.sim.setSpeed(t)}togglePause(){this.sim.setPaused(!this.sim.isPaused())}setTime(t){this.sim.setTime(t)}toggleLight(){this.sim.toggleLight()}setIntensity(t){this.sim.setIntensity(t)}get speeds(){return[1,2,5,10]}get hours(){return[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]}get intensities(){return[1,2,4,6,12,24]}lightModeLabel(){let t=this.sim.manualLight();return t===null?"\u0410\u0412\u0422\u041E":t?"\u0417\u0415\u041B\u0401\u041D\u042B\u0419":"\u041A\u0420\u0410\u0421\u041D\u042B\u0419"}static{this.\u0275fac=function(i){return new(i||n)(qc(ol),qc(Ax))}}static{this.\u0275cmp=v0({type:n,selectors:[["app-root"]],viewQuery:function(i,r){if(i&1&&Zy(bR,7),i&2){let s;Ky(s=Jy())&&(r.canvasRef=s.first)}},standalone:!0,features:[Qy],decls:71,vars:16,consts:[["canvas",""],[1,"container"],[1,"viewport"],[1,"panel"],[1,"panel-title"],[1,"section-title"],[1,"stat-row"],[1,"val"],[1,"time-picker"],[3,"change"],[3,"value","selected"],[1,"speed-btns"],[3,"active"],[1,"lanes"],[1,"lane-item"],[1,"tl-status"],[1,"tl-btn",3,"click"],[1,"dist-log"],[1,"dist-empty"],[1,"dist-entry"],[1,"pause-btn",3,"click"],[1,"hint"],[3,"click"],[1,"val",2,"color","#ff9900"],[1,"lane-num"],[1,"lane-bar"],[1,"lane-slot",3,"background"],[1,"lane-time"],[1,"lane-adj",3,"click"],[1,"lane-delay"],[1,"lane-slot"],[1,"dist-time"],[1,"dist-lane"]],template:function(i,r){if(i&1){let s=ea();Re(0,"div",1),el(1,"canvas",2,0),Re(3,"div",3)(4,"div",4),Ye(5,"\u0422\u041E\u0420\u0423\u0413\u0410\u0420\u0422 \u0422\u0410\u041C\u041E\u0416\u041D\u042F"),Le(),Re(6,"div",5),Ye(7,"\u0412\u0440\u0435\u043C\u044F \u0441\u0438\u043C\u0443\u043B\u044F\u0446\u0438\u0438"),Le(),Re(8,"div",6)(9,"span"),Ye(10,"\u0422\u0435\u043A\u0443\u0449\u0435\u0435 \u0432\u0440\u0435\u043C\u044F"),Le(),Re(11,"span",7),Ye(12),Le()(),Re(13,"div",8)(14,"select",9),Li("change",function(a){return nr(s),ir(r.setTime(+a.target.value))}),kr(15,wR,2,3,"option",10,Qo),Le()(),Re(17,"div",5),Ye(18,"\u0418\u043D\u0442\u0435\u043D\u0441\u0438\u0432\u043D\u043E\u0441\u0442\u044C"),Le(),Re(19,"div",11),kr(20,TR,2,3,"button",12,Qo),Le(),Re(22,"div",5),Ye(23,"\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430"),Le(),Re(24,"div",6)(25,"span"),Ye(26,"\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043E"),Le(),Re(27,"span",7),Ye(28),Le()(),Re(29,"div",6)(30,"span"),Ye(31,"\u0412 \u0441\u0438\u0441\u0442\u0435\u043C\u0435"),Le(),Re(32,"span",7),Ye(33),Le()(),Re(34,"div",6)(35,"span"),Ye(36,"\u0417\u043E\u043D\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438"),Le(),Re(37,"span",7),Ye(38),Le()(),Re(39,"div",6)(40,"span"),Ye(41,"\u041F\u0440\u043E\u0448\u043B\u0438 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C"),Le(),Re(42,"span",7),Ye(43),Le()(),Ds(44,CR,5,1,"div",6),Re(45,"div",5),Ye(46,"\u041F\u043E\u043B\u043E\u0441\u044B \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 (6)"),Le(),Re(47,"div",13),kr(48,DR,14,5,"div",14,wh),Le(),Re(50,"div",5),Ye(51,"\u0421\u0432\u0435\u0442\u043E\u0444\u043E\u0440"),Le(),Re(52,"div",15),Ye(53),Le(),Re(54,"button",16),Li("click",function(){return nr(s),ir(r.toggleLight())}),Ye(55),Le(),Re(56,"div",5),Ye(57,"\u0420\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043F\u043E \u043F\u043E\u043B\u043E\u0441\u0430\u043C"),Le(),Re(58,"div",17),Ds(59,IR,2,0,"div",18),kr(60,RR,7,3,"div",19,wh),Le(),Re(62,"div",5),Ye(63,"\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C"),Le(),Re(64,"div",11),kr(65,NR,2,3,"button",12,Qo),Le(),Re(67,"button",20),Li("click",function(){return nr(s),ir(r.togglePause())}),Ye(68),Le(),Re(69,"div",21),Ye(70,"\u041C\u044B\u0448\u044C: \u0442\u0430\u0449\u0438 \u0434\u043B\u044F \u043F\u0430\u043D\u043E\u0440\u0430\u043C\u044B \xB7 \u041A\u043E\u043B\u0435\u0441\u043E: \u043C\u0430\u0441\u0448\u0442\u0430\u0431 \xB7 \u041D\u0430\u0432\u0435\u0434\u0438 \u043D\u0430 \u043E\u0431\u044A\u0435\u043A\u0442 \u0434\u043B\u044F \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u0435\u0439"),Le()()()}i&2&&(ct(12),Fi(r.sim.timeString()),ct(3),Br(r.hours),ct(5),Br(r.intensities),ct(8),Fi(r.sim.totalProcessed()),ct(5),Fi(r.sim.inSystem()),ct(5),Fi(r.sim.zone8Total()),ct(4),Qc("color",r.sim.trucksPastLight()>=24?"#ff3333":"#eef2ff"),ct(),Mn("",r.sim.trucksPastLight()," / 24"),ct(),Eh(44,r.sim.waitingQueue()>0?44:-1),ct(4),Br(r.sim.laneDetails()),ct(4),Jo("red",!r.sim.isGreen())("green",r.sim.isGreen()),ct(),Mn(" ",r.sim.isGreen()?"\u0417\u0415\u041B\u0401\u041D\u042B\u0419":"\u041A\u0420\u0410\u0421\u041D\u042B\u0419"," "),ct(2),Mn(" \u0420\u0435\u0436\u0438\u043C: ",r.lightModeLabel()," "),ct(4),Eh(59,r.sim.distributionLog().length===0?59:-1),ct(),Br(r.sim.distributionLog()),ct(5),Br(r.speeds),ct(3),Mn(" ",r.sim.isPaused()?"\u25B6 \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C":"\u23F8 \u041F\u0430\u0443\u0437\u0430"," "))},styles:["*[_ngcontent-%COMP%]{box-sizing:border-box;margin:0;padding:0}.container[_ngcontent-%COMP%]{width:100vw;height:100vh;display:flex;overflow:hidden;background:#0a0c10}.viewport[_ngcontent-%COMP%]{flex:1;display:block;min-width:0;height:100%}.panel[_ngcontent-%COMP%]{width:270px;min-width:270px;background:#10141c;color:#ccd8ee;padding:16px 14px;display:flex;flex-direction:column;gap:8px;font-family:Segoe UI,Arial,sans-serif;font-size:13px;overflow-y:auto;border-left:1px solid #1e2840}.panel-title[_ngcontent-%COMP%]{font-size:15px;font-weight:700;color:#8ae;letter-spacing:.5px;margin-bottom:4px;padding-bottom:8px;border-bottom:1px solid #1e2840}.section-title[_ngcontent-%COMP%]{font-size:11px;font-weight:600;color:#568;text-transform:uppercase;letter-spacing:.8px;margin-top:4px}.stat-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.val[_ngcontent-%COMP%]{font-weight:600;color:#eef2ff}.lanes[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:5px}.lane-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px}.lane-num[_ngcontent-%COMP%]{width:28px;font-size:12px;font-weight:600;color:#89b}.lane-bar[_ngcontent-%COMP%]{flex:1;display:flex}.lane-slot[_ngcontent-%COMP%]{flex:1;height:18px;border-radius:3px;transition:background .3s}.lane-time[_ngcontent-%COMP%]{font-size:11px;color:#8ca;width:26px;text-align:right}.lane-adj[_ngcontent-%COMP%]{width:22px;height:18px;padding:0;border-radius:3px;font-size:10px;border:1px solid #2a3a5a;background:#161c2c;color:#89c;cursor:pointer}.lane-adj[_ngcontent-%COMP%]:hover{background:#1e2a42}.lane-delay[_ngcontent-%COMP%]{font-size:10px;color:#f90;width:30px;text-align:center}.lane-queue[_ngcontent-%COMP%]{font-size:10px;font-weight:700;color:#f90;background:#2a2010;padding:1px 5px;border-radius:3px}.tl-status[_ngcontent-%COMP%]{padding:6px 10px;border-radius:6px;font-weight:700;font-size:12px;text-align:center;transition:all .3s}.tl-status.green[_ngcontent-%COMP%]{background:#0a3010;color:#2d4;border:1px solid #22dd44}.tl-status.red[_ngcontent-%COMP%]{background:#300a0a;color:#f33;border:1px solid #ff3333}.speed-btns[_ngcontent-%COMP%]{display:flex;gap:6px}.speed-btns[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex:1;padding:6px 0;border-radius:5px;border:1px solid #2a3a5a;background:#161c2c;color:#89c;cursor:pointer;font-size:13px;transition:all .15s}.speed-btns[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background:#1e2a42;color:#abe}.speed-btns[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]{background:#1e3a6a;color:#8cf;border-color:#48c}.pause-btn[_ngcontent-%COMP%]{padding:8px;border-radius:6px;border:1px solid #2a3a5a;background:#161c2c;color:#abe;cursor:pointer;font-size:13px;transition:all .15s;width:100%}.pause-btn[_ngcontent-%COMP%]:hover{background:#1e2a42}.time-picker[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%;padding:6px 8px;border-radius:5px;border:1px solid #2a3a5a;background:#161c2c;color:#abe;cursor:pointer;font-size:13px}.tl-btn[_ngcontent-%COMP%]{padding:6px;border-radius:5px;width:100%;border:1px solid #2a3a5a;background:#161c2c;color:#abe;cursor:pointer;font-size:12px;transition:all .15s}.tl-btn[_ngcontent-%COMP%]:hover{background:#1e2a42}.dist-log[_ngcontent-%COMP%]{max-height:130px;overflow-y:auto;display:flex;flex-direction:column;gap:3px}.dist-empty[_ngcontent-%COMP%]{font-size:11px;color:#456;font-style:italic}.dist-entry[_ngcontent-%COMP%]{display:flex;gap:6px;align-items:center;font-size:11px;color:#89b;padding:2px 4px;border-radius:3px;background:#141a28}.dist-time[_ngcontent-%COMP%]{color:#568;min-width:38px}.dist-lane[_ngcontent-%COMP%]{margin-left:auto;font-weight:600;color:#8cf;background:#1e3a6a;padding:1px 6px;border-radius:3px;font-size:10px}.hint[_ngcontent-%COMP%]{font-size:10px;color:#346;margin-top:auto;padding-top:8px;border-top:1px solid #1a2030;line-height:1.5}"],changeDetection:0})}}return n})();yv(Dx,vv).catch(n=>console.error(n));
