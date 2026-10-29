(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();/*! Capacitor: https://capacitorjs.com/ - MIT License */var dn;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(dn||(dn={}));class Di extends Error{constructor(e,t,r){super(e),this.message=e,this.code=t,this.data=r}}const Jd=n=>{var e,t;return n?.androidBridge?"android":!((t=(e=n?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},Xd=n=>{const e=n.CapacitorCustomPlatform||null,t=n.Capacitor||{},r=t.Plugins=t.Plugins||{},s=()=>e!==null?e.name:Jd(n),i=()=>s()!=="web",a=y=>{const A=d.get(y);return!!(A?.platforms.has(s())||l(y))},l=y=>{var A;return(A=t.PluginHeaders)===null||A===void 0?void 0:A.find(S=>S.name===y)},u=y=>n.console.error(y),d=new Map,p=(y,A={})=>{const S=d.get(y);if(S)return console.warn(`Capacitor plugin "${y}" already registered. Cannot register plugins twice.`),S.proxy;const D=s(),V=l(y);let P;const M=async()=>(!P&&D in A?P=typeof A[D]=="function"?P=await A[D]():P=A[D]:e!==null&&!P&&"web"in A&&(P=typeof A.web=="function"?P=await A.web():P=A.web),P),B=(m,g)=>{var v,E;if(V){const T=V?.methods.find(_=>g===_.name);if(T)return T.rtype==="promise"?_=>t.nativePromise(y,g.toString(),_):(_,Oe)=>t.nativeCallback(y,g.toString(),_,Oe);if(m)return(v=m[g])===null||v===void 0?void 0:v.bind(m)}else{if(m)return(E=m[g])===null||E===void 0?void 0:E.bind(m);throw new Di(`"${y}" plugin is not implemented on ${D}`,dn.Unimplemented)}},L=m=>{let g;const v=(...E)=>{const T=M().then(_=>{const Oe=B(_,m);if(Oe){const He=Oe(...E);return g=He?.remove,He}else throw new Di(`"${y}.${m}()" is not implemented on ${D}`,dn.Unimplemented)});return m==="addListener"&&(T.remove=async()=>g()),T};return v.toString=()=>`${m.toString()}() { [capacitor code] }`,Object.defineProperty(v,"name",{value:m,writable:!1,configurable:!1}),v},G=L("addListener"),se=L("removeListener"),Z=(m,g)=>{const v=G({eventName:m},g),E=async()=>{const _=await v;se({eventName:m,callbackId:_},g)},T=new Promise(_=>v.then(()=>_({remove:E})));return T.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await E()},T},w=new Proxy({},{get(m,g){switch(g){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return V?Z:G;case"removeListener":return se;default:return L(g)}}});return r[y]=w,d.set(y,{name:y,proxy:w,platforms:new Set([...Object.keys(A),...V?[D]:[]])}),w};return t.convertFileSrc||(t.convertFileSrc=y=>y),t.getPlatform=s,t.handleError=u,t.isNativePlatform=i,t.isPluginAvailable=a,t.registerPlugin=p,t.Exception=Di,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},Zd=n=>n.Capacitor=Xd(n),ms=Zd(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Tr=ms.registerPlugin;class Fl{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let r=!1;this.listeners[e]||(this.listeners[e]=[],r=!0),this.listeners[e].push(t);const i=this.windowListeners[e];i&&!i.registered&&this.addWindowListener(i),r&&this.sendRetainedArgumentsForEvent(e);const a=async()=>this.removeListener(e,t);return Promise.resolve({remove:a})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,r){const s=this.listeners[e];if(!s){if(r){let i=this.retainedEventArguments[e];i||(i=[]),i.push(t),this.retainedEventArguments[e]=i}return}s.forEach(i=>i(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:r=>{this.notifyListeners(t,r)}}}unimplemented(e="not implemented"){return new ms.Exception(e,dn.Unimplemented)}unavailable(e="not available"){return new ms.Exception(e,dn.Unavailable)}async removeListener(e,t){const r=this.listeners[e];if(!r)return;const s=r.indexOf(t);this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(r=>{this.notifyListeners(e,r)}))}}const mc=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),gc=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class ef extends Fl{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(r=>{if(r.length<=0)return;let[s,i]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=gc(s).trim(),i=gc(i).trim(),t[s]=i}),t}async setCookie(e){try{const t=mc(e.key),r=mc(e.value),s=e.expires?`; expires=${e.expires.replace("expires=","")}`:"",i=(e.path||"/").replace("path=",""),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${r||""}${s}; path=${i}; ${a};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}Tr("CapacitorCookies",{web:()=>new ef});const tf=async n=>new Promise((e,t)=>{const r=new FileReader;r.onload=()=>{const s=r.result;e(s.indexOf(",")>=0?s.split(",")[1]:s)},r.onerror=s=>t(s),r.readAsDataURL(n)}),nf=(n={})=>{const e=Object.keys(n);return Object.keys(n).map(s=>s.toLocaleLowerCase()).reduce((s,i,a)=>(s[i]=n[e[a]],s),{})},rf=(n,e=!0)=>n?Object.entries(n).reduce((r,s)=>{const[i,a]=s;let l,u;return Array.isArray(a)?(u="",a.forEach(d=>{l=e?encodeURIComponent(d):d,u+=`${i}=${l}&`}),u.slice(0,-1)):(l=e?encodeURIComponent(a):a,u=`${i}=${l}`),`${r}&${u}`},"").substr(1):null,sf=(n,e={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},e),s=nf(n.headers)["content-type"]||"";if(typeof n.data=="string")t.body=n.data;else if(s.includes("application/x-www-form-urlencoded")){const i=new URLSearchParams;for(const[a,l]of Object.entries(n.data||{}))i.set(a,l);t.body=i.toString()}else if(s.includes("multipart/form-data")||n.data instanceof FormData){const i=new FormData;if(n.data instanceof FormData)n.data.forEach((l,u)=>{i.append(u,l)});else for(const l of Object.keys(n.data))i.append(l,n.data[l]);t.body=i;const a=new Headers(t.headers);a.delete("content-type"),t.headers=a}else(s.includes("application/json")||typeof n.data=="object")&&(t.body=JSON.stringify(n.data));return t};class of extends Fl{async request(e){const t=sf(e,e.webFetchExtra),r=rf(e.params,e.shouldEncodeUrlParams),s=r?`${e.url}?${r}`:e.url,i=await fetch(s,t),a=i.headers.get("content-type")||"";let{responseType:l="text"}=i.ok?e:{};a.includes("application/json")&&(l="json");let u,d;switch(l){case"arraybuffer":case"blob":d=await i.blob(),u=await tf(d);break;case"json":u=await i.json();break;case"document":case"text":default:u=await i.text()}const p={};return i.headers.forEach((y,A)=>{p[A]=y}),{data:u,headers:p,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}Tr("CapacitorHttp",{web:()=>new of});const af="modulepreload",cf=function(n){return"/"+n},_c={},wo=function(e,t,r){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");s=Promise.allSettled(t.map(u=>{if(u=cf(u),u in _c)return;_c[u]=!0;const d=u.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const y=document.createElement("link");if(y.rel=d?"stylesheet":af,d||(y.as="script"),y.crossOrigin="",y.href=u,l&&y.setAttribute("nonce",l),document.head.appendChild(y),d)return new Promise((A,S)=>{y.addEventListener("load",A),y.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return s.then(a=>{for(const l of a||[])l.status==="rejected"&&i(l.reason);return e().catch(i)})};function lf(n){n.CapacitorUtils.Synapse=new Proxy({},{get(e,t){return new Proxy({},{get(r,s){return(i,a,l)=>{const u=n.Capacitor.Plugins[t];if(u===void 0){l(new Error(`Capacitor plugin ${t} not found`));return}if(typeof u[s]!="function"){l(new Error(`Method ${s} not found in Capacitor plugin ${t}`));return}(async()=>{try{const d=await u[s](i);a(d)}catch(d){l(d)}})()}}})}})}function uf(n){n.CapacitorUtils.Synapse=new Proxy({},{get(e,t){return n.cordova.plugins[t]}})}function hf(n=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!n?lf(window):window.cordova!==void 0&&uf(window))}var Hi;(function(n){n.Documents="DOCUMENTS",n.Data="DATA",n.Library="LIBRARY",n.Cache="CACHE",n.External="EXTERNAL",n.ExternalStorage="EXTERNAL_STORAGE",n.ExternalCache="EXTERNAL_CACHE",n.LibraryNoCloud="LIBRARY_NO_CLOUD",n.Temporary="TEMPORARY"})(Hi||(Hi={}));var zi;(function(n){n.UTF8="utf8",n.ASCII="ascii",n.UTF16="utf16"})(zi||(zi={}));const df=Tr("Filesystem",{web:()=>wo(()=>import("./web-uvbHHtcO.js"),[]).then(n=>new n.FilesystemWeb)});hf();const ff=Tr("Share",{web:()=>wo(()=>import("./web-BcGvvQdx.js"),[]).then(n=>new n.ShareWeb)}),yc=n=>String(n).padStart(2,"0"),zn=n=>n.getFullYear()+"-"+yc(n.getMonth()+1)+"-"+yc(n.getDate()),vc=n=>new Date(n+"T00:00:00"),Zr=n=>new Date(n.getFullYear(),n.getMonth(),n.getDate()+1),Ec=n=>Math.round((Number(n)||0)*100),Vt=n=>n/100;function pf(n,e=new Date){const t=(n.rates||[]).filter(L=>L&&L.from&&L.amount>0).slice().sort((L,G)=>L.from.localeCompare(G.from));if(!t.length)return null;const r=vc(zn(e)),s=vc(t[0].from);if(s>r)return null;const a=((Number.isInteger(n.weekStart)?n.weekStart:6)+6)%7,l={};(n.tx||[]).forEach(L=>{L.type==="expense"&&(l[L.date]=(l[L.date]||0)+Ec(L.amount))});let u=0;const d=L=>{for(;u+1<t.length&&t[u+1].from<=L;)u++;return Ec(t[u].amount)};let p=0,y=0,A=0;const S=[];for(let L=s;L<r;L=Zr(L)){const G=zn(L),se=d(G)-(l[G]||0);S.push({date:G,net:se}),p+=se;const Z=Zr(L).getDate()===1;(L.getDay()===a||Z)&&(y+=p,p=0),Z&&(A+=y,y=0)}const D=zn(r),V=d(D),P=V-(l[D]||0);S.push({date:D,net:P});let M=null,B=null;for(let L=r,G=0;G<40&&(!M||!B);L=Zr(L),G++){const se=Zr(L).getDate()===1;!M&&(L.getDay()===a||se)&&(M=zn(L)),!B&&se&&(B=zn(L))}return{daily:Vt(P),week:Vt(p),month:Vt(y),year:Vt(A),total:Vt(P+p+y+A),allowance:Vt(V),start:t[0].from,last7:S.slice(-7).map(L=>({date:L.date,net:Vt(L.net)})),weekRollsOn:M,monthRollsOn:B}}var wc;(function(n){n.IndexedDbLocal="INDEXED_DB_LOCAL",n.InMemory="IN_MEMORY",n.BrowserLocal="BROWSER_LOCAL",n.BrowserSession="BROWSER_SESSION"})(wc||(wc={}));var Tc;(function(n){n.APPLE="apple.com",n.FACEBOOK="facebook.com",n.GAME_CENTER="gc.apple.com",n.GITHUB="github.com",n.GOOGLE="google.com",n.MICROSOFT="microsoft.com",n.PLAY_GAMES="playgames.google.com",n.TWITTER="twitter.com",n.YAHOO="yahoo.com",n.PASSWORD="password",n.PHONE="phone"})(Tc||(Tc={}));const mf=Tr("FirebaseAuthentication",{web:()=>wo(()=>import("./web-pQkIBkQr.js"),[]).then(n=>new n.FirebaseAuthenticationWeb)});var Ic={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bl=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},gf=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],l=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},jl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,l=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,p=i>>2,y=(i&3)<<4|l>>4;let A=(l&15)<<2|d>>6,S=d&63;u||(S=64,a||(A=64)),r.push(t[p],t[y],t[A],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Bl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):gf(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const y=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||d==null||y==null)throw new _f;const A=i<<2|l>>4;if(r.push(A),d!==64){const S=l<<4&240|d>>2;if(r.push(S),y!==64){const D=d<<6&192|y;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class _f extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const yf=function(n){const e=Bl(n);return jl.encodeByteArray(e,!0)},gs=function(n){return yf(n).replace(/\./g,"")},$l=function(n){try{return jl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ef=()=>vf().__FIREBASE_DEFAULTS__,wf=()=>{if(typeof process>"u"||typeof Ic>"u")return;const n=Ic.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Tf=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&$l(n[1]);return e&&JSON.parse(e)},Ms=()=>{try{return Ef()||wf()||Tf()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ql=n=>{var e,t;return(t=(e=Ms())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},If=n=>{const e=ql(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Wl=()=>{var n;return(n=Ms())===null||n===void 0?void 0:n.config},Hl=n=>{var e;return(e=Ms())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rf(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[gs(JSON.stringify(t)),gs(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Se(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function bf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Se())}function Pf(){var n;const e=(n=Ms())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Sf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Cf(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function kf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Df(){const n=Se();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Nf(){return!Pf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Of(){try{return typeof indexedDB=="object"}catch{return!1}}function Vf(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lf="FirebaseError";class ut extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Lf,Object.setPrototypeOf(this,ut.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ir.prototype.create)}}class Ir{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Mf(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new ut(s,l,r)}}function Mf(n,e){return n.replace(xf,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const xf=/\{\$([^}]+)}/g;function Uf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function _s(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Ac(i)&&Ac(a)){if(!_s(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Ac(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tn(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Kn(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Qn(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Ff(n,e){const t=new Bf(n,e);return t.subscribe.bind(t)}class Bf{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");jf(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Ni),s.error===void 0&&(s.error=Ni),s.complete===void 0&&(s.complete=Ni);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function jf(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ni(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(n){return n&&n._delegate?n._delegate:n}class qt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Af;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Wf(e))try{this.getOrInitializeService({instanceIdentifier:Lt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Lt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Lt){return this.instances.has(e)}getOptions(e=Lt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:qf(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Lt){return this.component?this.component.multipleInstances?e:Lt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function qf(n){return n===Lt?void 0:n}function Wf(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hf{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new $f(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var H;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(H||(H={}));const zf={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},Gf=H.INFO,Kf={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},Qf=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Kf[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class To{constructor(e){this.name=e,this._logLevel=Gf,this._logHandler=Qf,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?zf[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}}const Yf=(n,e)=>e.some(t=>n instanceof t);let Rc,bc;function Jf(){return Rc||(Rc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Xf(){return bc||(bc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const zl=new WeakMap,Gi=new WeakMap,Gl=new WeakMap,Oi=new WeakMap,Io=new WeakMap;function Zf(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Tt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&zl.set(t,n)}).catch(()=>{}),Io.set(e,n),e}function ep(n){if(Gi.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Gi.set(n,e)}let Ki={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Gi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Gl.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Tt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function tp(n){Ki=n(Ki)}function np(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Vi(this),e,...t);return Gl.set(r,e.sort?e.sort():[e]),Tt(r)}:Xf().includes(n)?function(...e){return n.apply(Vi(this),e),Tt(zl.get(this))}:function(...e){return Tt(n.apply(Vi(this),e))}}function rp(n){return typeof n=="function"?np(n):(n instanceof IDBTransaction&&ep(n),Yf(n,Jf())?new Proxy(n,Ki):n)}function Tt(n){if(n instanceof IDBRequest)return Zf(n);if(Oi.has(n))return Oi.get(n);const e=rp(n);return e!==n&&(Oi.set(n,e),Io.set(e,n)),e}const Vi=n=>Io.get(n);function sp(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),l=Tt(a);return r&&a.addEventListener("upgradeneeded",u=>{r(Tt(a.result),u.oldVersion,u.newVersion,Tt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const ip=["get","getKey","getAll","getAllKeys","count"],op=["put","add","delete","clear"],Li=new Map;function Pc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Li.get(e))return Li.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=op.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||ip.includes(t)))return;const i=async function(a,...l){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[t](...l),s&&u.done]))[0]};return Li.set(e,i),i}tp(n=>({...n,get:(e,t,r)=>Pc(e,t)||n.get(e,t,r),has:(e,t)=>!!Pc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(cp(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function cp(n){const e=n.getComponent();return e?.type==="VERSION"}const Qi="@firebase/app",Sc="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it=new To("@firebase/app"),lp="@firebase/app-compat",up="@firebase/analytics-compat",hp="@firebase/analytics",dp="@firebase/app-check-compat",fp="@firebase/app-check",pp="@firebase/auth",mp="@firebase/auth-compat",gp="@firebase/database",_p="@firebase/data-connect",yp="@firebase/database-compat",vp="@firebase/functions",Ep="@firebase/functions-compat",wp="@firebase/installations",Tp="@firebase/installations-compat",Ip="@firebase/messaging",Ap="@firebase/messaging-compat",Rp="@firebase/performance",bp="@firebase/performance-compat",Pp="@firebase/remote-config",Sp="@firebase/remote-config-compat",Cp="@firebase/storage",kp="@firebase/storage-compat",Dp="@firebase/firestore",Np="@firebase/vertexai-preview",Op="@firebase/firestore-compat",Vp="firebase",Lp="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yi="[DEFAULT]",Mp={[Qi]:"fire-core",[lp]:"fire-core-compat",[hp]:"fire-analytics",[up]:"fire-analytics-compat",[fp]:"fire-app-check",[dp]:"fire-app-check-compat",[pp]:"fire-auth",[mp]:"fire-auth-compat",[gp]:"fire-rtdb",[_p]:"fire-data-connect",[yp]:"fire-rtdb-compat",[vp]:"fire-fn",[Ep]:"fire-fn-compat",[wp]:"fire-iid",[Tp]:"fire-iid-compat",[Ip]:"fire-fcm",[Ap]:"fire-fcm-compat",[Rp]:"fire-perf",[bp]:"fire-perf-compat",[Pp]:"fire-rc",[Sp]:"fire-rc-compat",[Cp]:"fire-gcs",[kp]:"fire-gcs-compat",[Dp]:"fire-fst",[Op]:"fire-fst-compat",[Np]:"fire-vertex","fire-js":"fire-js",[Vp]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ys=new Map,xp=new Map,Ji=new Map;function Cc(n,e){try{n.container.addComponent(e)}catch(t){it.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function fn(n){const e=n.name;if(Ji.has(e))return it.debug(`There were multiple attempts to register component ${e}.`),!1;Ji.set(e,n);for(const t of ys.values())Cc(t,n);for(const t of xp.values())Cc(t,n);return!0}function Ao(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function _e(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Up={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},It=new Ir("app","Firebase",Up);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new qt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw It.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const In=Lp;function Kl(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Yi,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw It.create("bad-app-name",{appName:String(s)});if(t||(t=Wl()),!t)throw It.create("no-options");const i=ys.get(s);if(i){if(_s(t,i.options)&&_s(r,i.config))return i;throw It.create("duplicate-app",{appName:s})}const a=new Hf(s);for(const u of Ji.values())a.addComponent(u);const l=new Fp(t,r,a);return ys.set(s,l),l}function Ql(n=Yi){const e=ys.get(n);if(!e&&n===Yi&&Wl())return Kl();if(!e)throw It.create("no-app",{appName:n});return e}function At(n,e,t){var r;let s=(r=Mp[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),it.warn(l.join(" "));return}fn(new qt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bp="firebase-heartbeat-database",jp=1,ar="firebase-heartbeat-store";let Mi=null;function Yl(){return Mi||(Mi=sp(Bp,jp,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ar)}catch(t){console.warn(t)}}}}).catch(n=>{throw It.create("idb-open",{originalErrorMessage:n.message})})),Mi}async function $p(n){try{const t=(await Yl()).transaction(ar),r=await t.objectStore(ar).get(Jl(n));return await t.done,r}catch(e){if(e instanceof ut)it.warn(e.message);else{const t=It.create("idb-get",{originalErrorMessage:e?.message});it.warn(t.message)}}}async function kc(n,e){try{const r=(await Yl()).transaction(ar,"readwrite");await r.objectStore(ar).put(e,Jl(n)),await r.done}catch(t){if(t instanceof ut)it.warn(t.message);else{const r=It.create("idb-set",{originalErrorMessage:t?.message});it.warn(r.message)}}}function Jl(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qp=1024,Wp=30*24*60*60*1e3;class Hp{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Gp(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Dc();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const l=new Date(a.date).valueOf();return Date.now()-l<=Wp}),this._storage.overwrite(this._heartbeatsCache))}catch(r){it.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Dc(),{heartbeatsToSend:r,unsentEntries:s}=zp(this._heartbeatsCache.heartbeats),i=gs(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return it.warn(t),""}}}function Dc(){return new Date().toISOString().substring(0,10)}function zp(n,e=qp){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Nc(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Nc(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Gp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Of()?Vf().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await $p(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return kc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return kc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Nc(n){return gs(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kp(n){fn(new qt("platform-logger",e=>new ap(e),"PRIVATE")),fn(new qt("heartbeat",e=>new Hp(e),"PRIVATE")),At(Qi,Sc,n),At(Qi,Sc,"esm2017"),At("fire-js","")}Kp("");var Qp="firebase",Yp="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */At(Qp,Yp,"app");function Ro(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Xl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Jp=Xl,Zl=new Ir("auth","Firebase",Xl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vs=new To("@firebase/auth");function Xp(n,...e){vs.logLevel<=H.WARN&&vs.warn(`Auth (${In}): ${n}`,...e)}function is(n,...e){vs.logLevel<=H.ERROR&&vs.error(`Auth (${In}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(n,...e){throw Po(n,...e)}function Ve(n,...e){return Po(n,...e)}function bo(n,e,t){const r=Object.assign(Object.assign({},Jp()),{[e]:t});return new Ir("auth","Firebase",r).create(e,{appName:n.name})}function Ne(n){return bo(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function xs(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Fe(n,"argument-error"),bo(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Po(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Zl.create(n,...e)}function O(n,e,...t){if(!n)throw Po(e,...t)}function tt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw is(e),new Error(e)}function ot(n,e){n||tt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cr(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function So(){return Oc()==="http:"||Oc()==="https:"}function Oc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(So()||Cf()||"connection"in navigator)?navigator.onLine:!0}function em(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(e,t){this.shortDelay=e,this.longDelay=t,ot(t>e,"Short delay should be less than long delay!"),this.isMobile=bf()||kf()}get(){return Zp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Co(n,e){ot(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;tt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;tt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;tt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tm={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nm=new Ar(3e4,6e4);function he(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function de(n,e,t,r,s={}){return tu(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=Tn(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:u},i);return Sf()||(d.referrerPolicy="no-referrer"),eu.fetch()(nu(n,n.config.apiHost,t,l),d)})}async function tu(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},tm),e);try{const s=new sm(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Yn(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[u,d]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Yn(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Yn(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw Yn(n,"user-disabled",a);const p=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw bo(n,p,d);Fe(n,p)}}catch(s){if(s instanceof ut)throw s;Fe(n,"network-request-failed",{message:String(s)})}}async function ht(n,e,t,r,s={}){const i=await de(n,e,t,r,s);return"mfaPendingCredential"in i&&Fe(n,"multi-factor-auth-required",{_serverResponse:i}),i}function nu(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?Co(n.config,s):`${n.config.apiScheme}://${s}`}function rm(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class sm{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ve(this.auth,"network-request-failed")),nm.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Yn(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Ve(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vc(n){return n!==void 0&&n.getResponse!==void 0}function Lc(n){return n!==void 0&&n.enterprise!==void 0}class im{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return rm(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function om(n){return(await de(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function am(n,e){return de(n,"GET","/v2/recaptchaConfig",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cm(n,e){return de(n,"POST","/v1/accounts:delete",e)}async function lm(n,e){return de(n,"POST","/v1/accounts:update",e)}async function ru(n,e){return de(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function um(n,e=!1){const t=Y(n),r=await t.getIdToken(e),s=Us(r);O(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:tr(xi(s.auth_time)),issuedAtTime:tr(xi(s.iat)),expirationTime:tr(xi(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function xi(n){return Number(n)*1e3}function Us(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return is("JWT malformed, contained fewer than 3 sections"),null;try{const s=$l(t);return s?JSON.parse(s):(is("Failed to decode base64 JWT payload"),null)}catch(s){return is("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Mc(n){const e=Us(n);return O(e,"internal-error"),O(typeof e.exp<"u","internal-error"),O(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wt(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof ut&&hm(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function hm({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=tr(this.lastLoginAt),this.creationTime=tr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lr(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Wt(n,ru(t,{idToken:r}));O(s?.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?su(i.providerUserInfo):[],l=pm(n.providerData,a),u=n.isAnonymous,d=!(n.email&&i.passwordHash)&&!l?.length,p=u?d:!1,y={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new Xi(i.createdAt,i.lastLoginAt),isAnonymous:p};Object.assign(n,y)}async function fm(n){const e=Y(n);await lr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function pm(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function su(n){return n.map(e=>{var{providerId:t}=e,r=Ro(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mm(n,e){const t=await tu(n,{},async()=>{const r=Tn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=nu(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",eu.fetch()(a,{method:"POST",headers:l,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function gm(n,e){return de(n,"POST","/v2/accounts:revokeToken",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){O(e.idToken,"internal-error"),O(typeof e.idToken<"u","internal-error"),O(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Mc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){O(e.length!==0,"internal-error");const t=Mc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(O(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await mm(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new on;return r&&(O(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(O(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(O(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new on,this.toJSON())}_performRefresh(){return tt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gt(n,e){O(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class nt{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=Ro(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new dm(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Xi(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Wt(this,this.stsTokenManager.getToken(this.auth,e));return O(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return um(this,e)}reload(){return fm(this)}_assign(e){this!==e&&(O(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new nt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){O(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await lr(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(_e(this.auth.app))return Promise.reject(Ne(this.auth));const e=await this.getIdToken();return await Wt(this,cm(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,a,l,u,d,p;const y=(r=t.displayName)!==null&&r!==void 0?r:void 0,A=(s=t.email)!==null&&s!==void 0?s:void 0,S=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,D=(a=t.photoURL)!==null&&a!==void 0?a:void 0,V=(l=t.tenantId)!==null&&l!==void 0?l:void 0,P=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,M=(d=t.createdAt)!==null&&d!==void 0?d:void 0,B=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:L,emailVerified:G,isAnonymous:se,providerData:Z,stsTokenManager:w}=t;O(L&&w,e,"internal-error");const m=on.fromJSON(this.name,w);O(typeof L=="string",e,"internal-error"),gt(y,e.name),gt(A,e.name),O(typeof G=="boolean",e,"internal-error"),O(typeof se=="boolean",e,"internal-error"),gt(S,e.name),gt(D,e.name),gt(V,e.name),gt(P,e.name),gt(M,e.name),gt(B,e.name);const g=new nt({uid:L,auth:e,email:A,emailVerified:G,displayName:y,isAnonymous:se,photoURL:D,phoneNumber:S,tenantId:V,stsTokenManager:m,createdAt:M,lastLoginAt:B});return Z&&Array.isArray(Z)&&(g.providerData=Z.map(v=>Object.assign({},v))),P&&(g._redirectEventId=P),g}static async _fromIdTokenResponse(e,t,r=!1){const s=new on;s.updateFromServerResponse(t);const i=new nt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await lr(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];O(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?su(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,l=new on;l.updateFromIdToken(r);const u=new nt({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Xi(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xc=new Map;function rt(n){ot(n instanceof Function,"Expected a class definition");let e=xc.get(n);return e?(ot(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,xc.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}iu.type="NONE";const Uc=iu;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function os(n,e,t){return`firebase:${n}:${e}:${t}`}class an{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=os(this.userKey,s.apiKey,i),this.fullPersistenceKey=os("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?nt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new an(rt(Uc),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||rt(Uc);const a=os(r,e.config.apiKey,e.name);let l=null;for(const d of t)try{const p=await d._get(a);if(p){const y=nt._fromJSON(e,p);d!==i&&(l=y),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new an(i,e,r):(i=u[0],l&&await i._set(a,l.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new an(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(lu(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ou(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(hu(e))return"Blackberry";if(du(e))return"Webos";if(au(e))return"Safari";if((e.includes("chrome/")||cu(e))&&!e.includes("edge/"))return"Chrome";if(uu(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function ou(n=Se()){return/firefox\//i.test(n)}function au(n=Se()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function cu(n=Se()){return/crios\//i.test(n)}function lu(n=Se()){return/iemobile/i.test(n)}function uu(n=Se()){return/android/i.test(n)}function hu(n=Se()){return/blackberry/i.test(n)}function du(n=Se()){return/webos/i.test(n)}function ko(n=Se()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function _m(n=Se()){var e;return ko(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function ym(){return Df()&&document.documentMode===10}function fu(n=Se()){return ko(n)||uu(n)||du(n)||hu(n)||/windows phone/i.test(n)||lu(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pu(n,e=[]){let t;switch(n){case"Browser":t=Fc(Se());break;case"Worker":t=`${Fc(Se())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${In}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,l)=>{try{const u=e(i);a(u)}catch(u){l(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Em(n,e={}){return de(n,"GET","/v2/passwordPolicy",he(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wm=6;class Tm{constructor(e){var t,r,s,i;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:wm,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,a,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Im{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Bc(this),this.idTokenSubscription=new Bc(this),this.beforeStateQueue=new vm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Zl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=rt(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await an.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ru(this,{idToken:e}),r=await nt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(_e(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=s?._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&u?.user&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return O(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await lr(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=em()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(_e(this.app))return Promise.reject(Ne(this));const t=e?Y(e):null;return t&&O(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&O(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return _e(this.app)?Promise.reject(Ne(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return _e(this.app)?Promise.reject(Ne(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(rt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Em(this),t=new Tm(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ir("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await gm(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&rt(e)||this._popupRedirectResolver;O(t,this,"argument-error"),this.redirectPersistenceManager=await an.create(this,[rt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(O(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return O(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=pu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Xp(`Error while retrieving App Check token: ${t.error}`),t?.token}}function Ee(n){return Y(n)}class Bc{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ff(t=>this.observer=t)}get next(){return O(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Am(n){Rr=n}function Do(n){return Rr.loadJS(n)}function Rm(){return Rr.recaptchaV2Script}function bm(){return Rr.recaptchaEnterpriseScript}function Pm(){return Rr.gapiScript}function mu(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const Sm="recaptcha-enterprise",Cm="NO_RECAPTCHA";class km{constructor(e){this.type=Sm,this.auth=Ee(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,l)=>{am(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const d=new im(u);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,a(d.siteKey)}}).catch(u=>{l(u)})})}function s(i,a,l){const u=window.grecaptcha;Lc(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(d=>{a(d)}).catch(()=>{a(Cm)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,a)=>{r(this.auth).then(l=>{if(!t&&Lc(window.grecaptcha))s(l,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=bm();u.length!==0&&(u+=l),Do(u).then(()=>{s(l,i,a)}).catch(d=>{a(d)})}}).catch(l=>{a(l)})})}}async function jc(n,e,t,r=!1){const s=new km(n);let i;try{i=await s.verify(t)}catch{i=await s.verify(t,!0)}const a=Object.assign({},e);return r?Object.assign(a,{captchaResp:i}):Object.assign(a,{captchaResponse:i}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function ur(n,e,t,r){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await jc(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await jc(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gu(n,e){const t=Ao(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(_s(i,e??{}))return s;Fe(s,"already-initialized")}return t.initialize({options:e})}function Dm(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(rt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Nm(n,e,t){const r=Ee(n);O(r._canInitEmulator,r,"emulator-config-failed"),O(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=_u(e),{host:a,port:l}=Om(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${a}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),Vm()}function _u(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Om(n){const e=_u(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:$c(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:$c(a)}}}function $c(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Vm(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return tt("not implemented")}_getIdTokenResponse(e){return tt("not implemented")}_linkToIdToken(e,t){return tt("not implemented")}_getReauthenticationResolver(e){return tt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lm(n,e){return de(n,"POST","/v1/accounts:resetPassword",he(n,e))}async function Mm(n,e){return de(n,"POST","/v1/accounts:update",e)}async function xm(n,e){return de(n,"POST","/v1/accounts:signUp",e)}async function Um(n,e){return de(n,"POST","/v1/accounts:update",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fm(n,e){return ht(n,"POST","/v1/accounts:signInWithPassword",he(n,e))}async function Bs(n,e){return de(n,"POST","/v1/accounts:sendOobCode",he(n,e))}async function Bm(n,e){return Bs(n,e)}async function jm(n,e){return Bs(n,e)}async function $m(n,e){return Bs(n,e)}async function qm(n,e){return Bs(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wm(n,e){return ht(n,"POST","/v1/accounts:signInWithEmailLink",he(n,e))}async function Hm(n,e){return ht(n,"POST","/v1/accounts:signInWithEmailLink",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr extends Fs{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new hr(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new hr(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ur(e,t,"signInWithPassword",Fm);case"emailLink":return Wm(e,{email:this._email,oobCode:this._password});default:Fe(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ur(e,r,"signUpPassword",xm);case"emailLink":return Hm(e,{idToken:t,email:this._email,oobCode:this._password});default:Fe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cn(n,e){return ht(n,"POST","/v1/accounts:signInWithIdp",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zm="http://localhost";class at extends Fs{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new at(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Fe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=Ro(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new at(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return cn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,cn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,cn(e,t)}buildRequest(){const e={requestUri:zm,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Tn(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gm(n,e){return de(n,"POST","/v1/accounts:sendVerificationCode",he(n,e))}async function Km(n,e){return ht(n,"POST","/v1/accounts:signInWithPhoneNumber",he(n,e))}async function Qm(n,e){const t=await ht(n,"POST","/v1/accounts:signInWithPhoneNumber",he(n,e));if(t.temporaryProof)throw Yn(n,"account-exists-with-different-credential",t);return t}const Ym={USER_NOT_FOUND:"user-not-found"};async function Jm(n,e){const t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return ht(n,"POST","/v1/accounts:signInWithPhoneNumber",he(n,t),Ym)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr extends Fs{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new nr({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new nr({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Km(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Qm(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Jm(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:s}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i}=e;return!r&&!t&&!s&&!i?null:new nr({verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xm(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Zm(n){const e=Kn(Qn(n)).link,t=e?Kn(Qn(e)).deep_link_id:null,r=Kn(Qn(n)).deep_link_id;return(r?Kn(Qn(r)).link:null)||r||t||e||n}class js{constructor(e){var t,r,s,i,a,l;const u=Kn(Qn(e)),d=(t=u.apiKey)!==null&&t!==void 0?t:null,p=(r=u.oobCode)!==null&&r!==void 0?r:null,y=Xm((s=u.mode)!==null&&s!==void 0?s:null);O(d&&p&&y,"argument-error"),this.apiKey=d,this.operation=y,this.code=p,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(a=u.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(l=u.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const t=Zm(e);try{return new js(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(){this.providerId=Kt.PROVIDER_ID}static credential(e,t){return hr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=js.parseLink(t);return O(r,"argument-error"),hr._fromEmailAndCode(e,r.code,r.tenantId)}}Kt.PROVIDER_ID="password";Kt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Kt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn extends An{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class as extends Rn{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return O("providerId"in t&&"signInMethod"in t,"argument-error"),at._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return O(e.idToken||e.accessToken,"argument-error"),at._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return as.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return as.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:s,pendingToken:i,nonce:a,providerId:l}=e;if(!r&&!s&&!t&&!i||!l)return null;try{return new as(l)._credential({idToken:t,accessToken:r,nonce:a,pendingToken:i})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t extends Rn{constructor(){super("facebook.com")}static credential(e){return at._fromParams({providerId:_t.PROVIDER_ID,signInMethod:_t.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _t.credentialFromTaggedObject(e)}static credentialFromError(e){return _t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _t.credential(e.oauthAccessToken)}catch{return null}}}_t.FACEBOOK_SIGN_IN_METHOD="facebook.com";_t.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je extends Rn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return at._fromParams({providerId:je.PROVIDER_ID,signInMethod:je.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return je.credentialFromTaggedObject(e)}static credentialFromError(e){return je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return je.credential(t,r)}catch{return null}}}je.GOOGLE_SIGN_IN_METHOD="google.com";je.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt extends Rn{constructor(){super("github.com")}static credential(e){return at._fromParams({providerId:yt.PROVIDER_ID,signInMethod:yt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return yt.credentialFromTaggedObject(e)}static credentialFromError(e){return yt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return yt.credential(e.oauthAccessToken)}catch{return null}}}yt.GITHUB_SIGN_IN_METHOD="github.com";yt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt extends Rn{constructor(){super("twitter.com")}static credential(e,t){return at._fromParams({providerId:vt.PROVIDER_ID,signInMethod:vt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return vt.credentialFromTaggedObject(e)}static credentialFromError(e){return vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return vt.credential(t,r)}catch{return null}}}vt.TWITTER_SIGN_IN_METHOD="twitter.com";vt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yu(n,e){return ht(n,"POST","/v1/accounts:signUp",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await nt._fromIdTokenResponse(e,r,s),a=qc(r);return new Ke({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=qc(r);return new Ke({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function qc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pw(n){var e;if(_e(n.app))return Promise.reject(Ne(n));const t=Ee(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new Ke({user:t.currentUser,providerId:null,operationType:"signIn"});const r=await yu(t,{returnSecureToken:!0}),s=await Ke._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es extends ut{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Es.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Es(e,t,r,s)}}function vu(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Es._fromErrorAndOperation(n,i,e,r):i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eu(n){return new Set(n.map(({providerId:e})=>e).filter(e=>!!e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mw(n,e){const t=Y(n);await $s(!0,t,e);const{providerUserInfo:r}=await lm(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),s=Eu(r||[]);return t.providerData=t.providerData.filter(i=>s.has(i.providerId)),s.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function wu(n,e,t=!1){const r=await Wt(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Ke._forOperation(n,"link",r)}async function $s(n,e,t){await lr(e);const r=Eu(e.providerData),s=n===!1?"provider-already-linked":"no-such-provider";O(r.has(t)===n,e.auth,s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eg(n,e,t=!1){const{auth:r}=n;if(_e(r.app))return Promise.reject(Ne(r));const s="reauthenticate";try{const i=await Wt(n,vu(r,s,e,n),t);O(i.idToken,r,"internal-error");const a=Us(i.idToken);O(a,r,"internal-error");const{sub:l}=a;return O(n.uid===l,r,"user-mismatch"),Ke._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&Fe(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tu(n,e,t=!1){if(_e(n.app))return Promise.reject(Ne(n));const r="signIn",s=await vu(n,r,e),i=await Ke._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function qs(n,e){return Tu(Ee(n),e)}async function tg(n,e){const t=Y(n);return await $s(!1,t,e.providerId),wu(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ng(n,e){return ht(n,"POST","/v1/accounts:signInWithCustomToken",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gw(n,e){if(_e(n.app))return Promise.reject(Ne(n));const t=Ee(n),r=await ng(t,{token:e,returnSecureToken:!0}),s=await Ke._fromIdTokenResponse(t,"signIn",r);return await t._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ws(n,e,t){var r;O(((r=t.url)===null||r===void 0?void 0:r.length)>0,n,"invalid-continue-uri"),O(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(O(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(O(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function No(n){const e=Ee(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function _w(n,e,t){const r=Ee(n),s={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&Ws(r,s,t),await ur(r,s,"getOobCode",jm)}async function yw(n,e,t){await Lm(Y(n),{oobCode:e,newPassword:t}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&No(n),r})}async function vw(n,e){await Um(Y(n),{oobCode:e})}async function rg(n,e,t){if(_e(n.app))return Promise.reject(Ne(n));const r=Ee(n),a=await ur(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",yu).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&No(n),u}),l=await Ke._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(l.user),l}function sg(n,e,t){return _e(n.app)?Promise.reject(Ne(n)):qs(Y(n),Kt.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&No(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ew(n,e,t){const r=Ee(n),s={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function i(a,l){O(l.handleCodeInApp,r,"argument-error"),l&&Ws(r,a,l)}i(s,t),await ur(r,s,"getOobCode",$m)}function ww(n,e){const t=js.parseLink(e);return t?.operation==="EMAIL_SIGNIN"}async function Tw(n,e,t){if(_e(n.app))return Promise.reject(Ne(n));const r=Y(n),s=Kt.credentialWithLink(e,t||cr());return O(s._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),qs(r,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ig(n,e){return de(n,"POST","/v1/accounts:createAuthUri",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Iw(n,e){const t=So()?cr():"http://localhost",r={identifier:e,continueUri:t},{signinMethods:s}=await ig(Y(n),r);return s||[]}async function Aw(n,e){const t=Y(n),s={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&Ws(t.auth,s,e);const{email:i}=await Bm(t.auth,s);i!==n.email&&await n.reload()}async function Rw(n,e,t){const r=Y(n),i={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await n.getIdToken(),newEmail:e};t&&Ws(r.auth,i,t);const{email:a}=await qm(r.auth,i);a!==n.email&&await n.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function og(n,e){return de(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ag(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=Y(n),i={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},a=await Wt(r,og(r.auth,i));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;const l=r.providerData.find(({providerId:u})=>u==="password");l&&(l.displayName=r.displayName,l.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}function bw(n,e){const t=Y(n);return _e(t.auth.app)?Promise.reject(Ne(t.auth)):Iu(t,e,null)}function Pw(n,e){return Iu(Y(n),null,e)}async function Iu(n,e,t){const{auth:r}=n,i={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(i.email=e),t&&(i.password=t);const a=await Wt(n,Mm(r,i));await n._updateTokensIfNecessary(a,!0)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cg(n){var e,t;if(!n)return null;const{providerId:r}=n,s=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},i=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!r&&n?.idToken){const a=(t=(e=Us(n.idToken))===null||e===void 0?void 0:e.firebase)===null||t===void 0?void 0:t.sign_in_provider;if(a){const l=a!=="anonymous"&&a!=="custom"?a:null;return new ln(i,l)}}if(!r)return null;switch(r){case"facebook.com":return new lg(i,s);case"github.com":return new ug(i,s);case"google.com":return new hg(i,s);case"twitter.com":return new dg(i,s,n.screenName||null);case"custom":case"anonymous":return new ln(i,null);default:return new ln(i,r,s)}}class ln{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class Au extends ln{constructor(e,t,r,s){super(e,t,r),this.username=s}}class lg extends ln{constructor(e,t){super(e,"facebook.com",t)}}class ug extends Au{constructor(e,t){super(e,"github.com",t,typeof t?.login=="string"?t?.login:null)}}class hg extends ln{constructor(e,t){super(e,"google.com",t)}}class dg extends Au{constructor(e,t,r){super(e,"twitter.com",t,r)}}function Sw(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:cg(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cw(n,e){return Y(n).setPersistence(e)}function fg(n,e,t,r){return Y(n).onIdTokenChanged(e,t,r)}function pg(n,e,t){return Y(n).beforeAuthStateChanged(e,t)}function mg(n,e,t,r){return Y(n).onAuthStateChanged(e,t,r)}function Ru(n){return Y(n).signOut()}function kw(n,e){return Ee(n).revokeAccessToken(e)}async function Dw(n){return Y(n).delete()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gg(n,e){return de(n,"POST","/v2/accounts/mfaEnrollment:start",he(n,e))}const ws="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ws,"1"),this.storage.removeItem(ws),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _g=1e3,yg=10;class Pu extends bu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=fu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);ym()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,yg):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},_g)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Pu.type="LOCAL";const vg=Pu;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su extends bu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Su.type="SESSION";const Cu=Su;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eg(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Hs(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async d=>d(t.origin,i)),u=await Eg(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Hs.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zs(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wg{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,u)=>{const d=zs("",20);s.port1.start();const p=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(y){const A=y;if(A.data.eventId===d)switch(A.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(A.data.response);break;default:clearTimeout(p),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ae(){return window}function Tg(n){ae().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oo(){return typeof ae().WorkerGlobalScope<"u"&&typeof ae().importScripts=="function"}async function Ig(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ag(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Rg(){return Oo()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ku="firebaseLocalStorageDb",bg=1,Ts="firebaseLocalStorage",Du="fbase_key";class br{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Gs(n,e){return n.transaction([Ts],e?"readwrite":"readonly").objectStore(Ts)}function Pg(){const n=indexedDB.deleteDatabase(ku);return new br(n).toPromise()}function Zi(){const n=indexedDB.open(ku,bg);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Ts,{keyPath:Du})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Ts)?e(r):(r.close(),await Pg(),e(await Zi()))})})}async function Wc(n,e,t){const r=Gs(n,!0).put({[Du]:e,value:t});return new br(r).toPromise()}async function Sg(n,e){const t=Gs(n,!1).get(e),r=await new br(t).toPromise();return r===void 0?null:r.value}function Hc(n,e){const t=Gs(n,!0).delete(e);return new br(t).toPromise()}const Cg=800,kg=3;class Nu{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Zi(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>kg)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Oo()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Hs._getInstance(Rg()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Ig(),!this.activeServiceWorker)return;this.sender=new wg(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ag()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Zi();return await Wc(e,ws,"1"),await Hc(e,ws),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Wc(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Sg(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Hc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Gs(s,!1).getAll();return new br(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Cg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Nu.type="LOCAL";const Ou=Nu;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dg(n,e){return de(n,"POST","/v2/accounts/mfaSignIn:start",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ng=500,Og=6e4,es=1e12;class Vg{constructor(e){this.auth=e,this.counter=es,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new Lg(e,this.auth.name,t||{})),this.counter++,r}reset(e){var t;const r=e||es;(t=this._widgets.get(r))===null||t===void 0||t.delete(),this._widgets.delete(r)}getResponse(e){var t;const r=e||es;return((t=this._widgets.get(r))===null||t===void 0?void 0:t.getResponse())||""}async execute(e){var t;const r=e||es;return(t=this._widgets.get(r))===null||t===void 0||t.execute(),""}}class Lg{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const s=typeof e=="string"?document.getElementById(e):e;O(s,"argument-error",{appName:t}),this.container=s,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=Mg(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},Og)},Ng))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function Mg(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ui=mu("rcb"),xg=new Ar(3e4,6e4);class Ug{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=ae().grecaptcha)===null||e===void 0)&&e.render)}load(e,t=""){return O(Fg(t),e,"argument-error"),this.shouldResolveImmediately(t)&&Vc(ae().grecaptcha)?Promise.resolve(ae().grecaptcha):new Promise((r,s)=>{const i=ae().setTimeout(()=>{s(Ve(e,"network-request-failed"))},xg.get());ae()[Ui]=()=>{ae().clearTimeout(i),delete ae()[Ui];const l=ae().grecaptcha;if(!l||!Vc(l)){s(Ve(e,"internal-error"));return}const u=l.render;l.render=(d,p)=>{const y=u(d,p);return this.counter++,y},this.hostLanguage=t,r(l)};const a=`${Rm()}?${Tn({onload:Ui,render:"explicit",hl:t})}`;Do(a).catch(()=>{clearTimeout(i),s(Ve(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(!((t=ae().grecaptcha)===null||t===void 0)&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function Fg(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class Bg{async load(e){return new Vg(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vu="recaptcha",jg={theme:"light",type:"image"};class Nw{constructor(e,t,r=Object.assign({},jg)){this.parameters=r,this.type=Vu,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=Ee(e),this.isInvisible=this.parameters.size==="invisible",O(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const s=typeof t=="string"?document.getElementById(t):t;O(s,this.auth,"argument-error"),this.container=s,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new Bg:new Ug,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(s=>{const i=a=>{a&&(this.tokenChangeListeners.delete(i),s(a))};this.tokenChangeListeners.add(i),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){O(!this.parameters.sitekey,this.auth,"argument-error"),O(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),O(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=ae()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){O(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){O(So()&&!Oo(),this.auth,"internal-error"),await $g(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await om(this.auth);O(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return O(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function $g(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lu{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=nr._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function Ow(n,e,t){if(_e(n.app))return Promise.reject(Ne(n));const r=Ee(n),s=await Mu(r,e,Y(t));return new Lu(s,i=>qs(r,i))}async function Vw(n,e,t){const r=Y(n);await $s(!1,r,"phone");const s=await Mu(r.auth,e,Y(t));return new Lu(s,i=>tg(r,i))}async function Mu(n,e,t){var r;const s=await t.verify();try{O(typeof s=="string",n,"argument-error"),O(t.type===Vu,n,"argument-error");let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){const a=i.session;if("phoneNumber"in i)return O(a.type==="enroll",n,"internal-error"),(await gg(n,{idToken:a.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,recaptchaToken:s}})).phoneSessionInfo.sessionInfo;{O(a.type==="signin",n,"internal-error");const l=((r=i.multiFactorHint)===null||r===void 0?void 0:r.uid)||i.multiFactorUid;return O(l,n,"missing-multi-factor-info"),(await Dg(n,{mfaPendingCredential:a.credential,mfaEnrollmentId:l,phoneSignInInfo:{recaptchaToken:s}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:a}=await Gm(n,{phoneNumber:i.phoneNumber,recaptchaToken:s});return a}}finally{t._reset()}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pr(n,e){return e?rt(e):(O(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo extends Fs{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return cn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return cn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return cn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function qg(n){return Tu(n.auth,new Vo(n),n.bypassAuthState)}function Wg(n){const{auth:e,user:t}=n;return O(t,e,"internal-error"),eg(t,new Vo(n),n.bypassAuthState)}async function Hg(n){const{auth:e,user:t}=n;return O(t,e,"internal-error"),wu(t,new Vo(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return qg;case"linkViaPopup":case"linkViaRedirect":return Hg;case"reauthViaPopup":case"reauthViaRedirect":return Wg;default:Fe(this.auth,"internal-error")}}resolve(e){ot(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ot(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zg=new Ar(2e3,1e4);async function Gg(n,e,t){if(_e(n.app))return Promise.reject(Ve(n,"operation-not-supported-in-this-environment"));const r=Ee(n);xs(n,e,An);const s=Pr(r,t);return new Et(r,"signInViaPopup",e,s).executeNotNull()}async function Lw(n,e,t){const r=Y(n);xs(r.auth,e,An);const s=Pr(r.auth,t);return new Et(r.auth,"linkViaPopup",e,s,r).executeNotNull()}class Et extends xu{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Et.currentPopupAction&&Et.currentPopupAction.cancel(),Et.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return O(e,this.auth,"internal-error"),e}async onExecution(){ot(this.filter.length===1,"Popup operations only handle one event");const e=zs();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ve(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ve(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Et.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ve(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,zg.get())};e()}}Et.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg="pendingRedirect",cs=new Map;class Qg extends xu{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=cs.get(this.auth._key());if(!e){try{const r=await Yg(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}cs.set(this.auth._key(),e)}return this.bypassAuthState||cs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Yg(n,e){const t=Bu(e),r=Fu(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}async function Uu(n,e){return Fu(n)._set(Bu(e),"true")}function Jg(n,e){cs.set(n._key(),e)}function Fu(n){return rt(n._redirectPersistence)}function Bu(n){return os(Kg,n.config.apiKey,n.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xg(n,e,t){return Zg(n,e,t)}async function Zg(n,e,t){if(_e(n.app))return Promise.reject(Ne(n));const r=Ee(n);xs(n,e,An),await r._initializationPromise;const s=Pr(r,t);return await Uu(s,r),s._openRedirect(r,e,"signInViaRedirect")}function Mw(n,e,t){return e_(n,e,t)}async function e_(n,e,t){const r=Y(n);xs(r.auth,e,An),await r.auth._initializationPromise;const s=Pr(r.auth,t);await $s(!1,r,e.providerId),await Uu(s,r.auth);const i=await t_(r);return s._openRedirect(r.auth,e,"linkViaRedirect",i)}async function xw(n,e){return await Ee(n)._initializationPromise,ju(n,e,!1)}async function ju(n,e,t=!1){if(_e(n.app))return Promise.reject(Ne(n));const r=Ee(n),s=Pr(r,e),a=await new Qg(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}async function t_(n){const e=zs(`${n.uid}:::`);return n._redirectEventId=e,await n.auth._setRedirectUser(n),await n.auth._persistUserIfCurrent(n),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n_=10*60*1e3;class r_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!s_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!$u(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ve(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=n_&&this.cachedEventUids.clear(),this.cachedEventUids.has(zc(e))}saveEventToCache(e){this.cachedEventUids.add(zc(e)),this.lastProcessedEventTime=Date.now()}}function zc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function $u({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function s_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return $u(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function i_(n,e={}){return de(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,a_=/^https?/;async function c_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await i_(n);for(const t of e)try{if(l_(t))return}catch{}Fe(n,"unauthorized-domain")}function l_(n){const e=cr(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!a_.test(t))return!1;if(o_.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u_=new Ar(3e4,6e4);function Gc(){const n=ae().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function h_(n){return new Promise((e,t)=>{var r,s,i;function a(){Gc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Gc(),t(Ve(n,"network-request-failed"))},timeout:u_.get()})}if(!((s=(r=ae().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=ae().gapi)===null||i===void 0)&&i.load)a();else{const l=mu("iframefcb");return ae()[l]=()=>{gapi.load?a():t(Ve(n,"network-request-failed"))},Do(`${Pm()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw ls=null,e})}let ls=null;function d_(n){return ls=ls||h_(n),ls}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f_=new Ar(5e3,15e3),p_="__/auth/iframe",m_="emulator/auth/iframe",g_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},__=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function y_(n){const e=n.config;O(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Co(e,m_):`https://${n.config.authDomain}/${p_}`,r={apiKey:e.apiKey,appName:n.name,v:In},s=__.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Tn(r).slice(1)}`}async function v_(n){const e=await d_(n),t=ae().gapi;return O(t,n,"internal-error"),e.open({where:document.body,url:y_(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:g_,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Ve(n,"network-request-failed"),l=ae().setTimeout(()=>{i(a)},f_.get());function u(){ae().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},w_=500,T_=600,I_="_blank",A_="http://localhost";class Kc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function R_(n,e,t,r=w_,s=T_){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},E_),{width:r.toString(),height:s.toString(),top:i,left:a}),d=Se().toLowerCase();t&&(l=cu(d)?I_:t),ou(d)&&(e=e||A_,u.scrollbars="yes");const p=Object.entries(u).reduce((A,[S,D])=>`${A}${S}=${D},`,"");if(_m(d)&&l!=="_self")return b_(e||"",l),new Kc(null);const y=window.open(e||"",l,p);O(y,n,"popup-blocked");try{y.focus()}catch{}return new Kc(y)}function b_(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P_="__/auth/handler",S_="emulator/auth/handler",C_=encodeURIComponent("fac");async function Qc(n,e,t,r,s,i){O(n.config.authDomain,n,"auth-domain-config-required"),O(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:In,eventId:s};if(e instanceof An){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Uf(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,y]of Object.entries({}))a[p]=y}if(e instanceof Rn){const p=e.getScopes().filter(y=>y!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const p of Object.keys(l))l[p]===void 0&&delete l[p];const u=await n._getAppCheckToken(),d=u?`#${C_}=${encodeURIComponent(u)}`:"";return`${k_(n)}?${Tn(l).slice(1)}${d}`}function k_({config:n}){return n.emulator?Co(n,S_):`https://${n.authDomain}/${P_}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fi="webStorageSupport";class D_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Cu,this._completeRedirectFn=ju,this._overrideRedirectResult=Jg}async _openPopup(e,t,r,s){var i;ot((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await Qc(e,t,r,cr(),s);return R_(e,a,zs())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Qc(e,t,r,cr(),s);return Tg(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(ot(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await v_(e),r=new r_(e);return t.register("authEvent",s=>(O(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Fi,{type:Fi},s=>{var i;const a=(i=s?.[0])===null||i===void 0?void 0:i[Fi];a!==void 0&&t(!!a),Fe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=c_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return fu()||au()||ko()}}const N_=D_;var Yc="@firebase/auth",Jc="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){O(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function L_(n){fn(new qt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;O(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:pu(n)},d=new Im(r,s,i,u);return Dm(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),fn(new qt("auth-internal",e=>{const t=Ee(e.getProvider("auth").getImmediate());return(r=>new O_(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),At(Yc,Jc,V_(n)),At(Yc,Jc,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M_=5*60,x_=Hl("authIdTokenMaxAge")||M_;let Xc=null;const U_=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>x_)return;const s=t?.token;Xc!==s&&(Xc=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function F_(n=Ql()){const e=Ao(n,"auth");if(e.isInitialized())return e.getImmediate();const t=gu(n,{popupRedirectResolver:N_,persistence:[Ou,vg,Cu]}),r=Hl("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=U_(i.toString());pg(t,a,()=>a(t.currentUser)),fg(t,l=>a(l))}}const s=ql("auth");return s&&Nm(t,`http://${s}`),t}function B_(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Am({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Ve("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",B_().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});L_("Browser");var Zc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bt,qu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,m){function g(){}g.prototype=m.prototype,w.D=m.prototype,w.prototype=new g,w.prototype.constructor=w,w.C=function(v,E,T){for(var _=Array(arguments.length-2),Oe=2;Oe<arguments.length;Oe++)_[Oe-2]=arguments[Oe];return m.prototype[E].apply(v,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,m,g){g||(g=0);var v=Array(16);if(typeof m=="string")for(var E=0;16>E;++E)v[E]=m.charCodeAt(g++)|m.charCodeAt(g++)<<8|m.charCodeAt(g++)<<16|m.charCodeAt(g++)<<24;else for(E=0;16>E;++E)v[E]=m[g++]|m[g++]<<8|m[g++]<<16|m[g++]<<24;m=w.g[0],g=w.g[1],E=w.g[2];var T=w.g[3],_=m+(T^g&(E^T))+v[0]+3614090360&4294967295;m=g+(_<<7&4294967295|_>>>25),_=T+(E^m&(g^E))+v[1]+3905402710&4294967295,T=m+(_<<12&4294967295|_>>>20),_=E+(g^T&(m^g))+v[2]+606105819&4294967295,E=T+(_<<17&4294967295|_>>>15),_=g+(m^E&(T^m))+v[3]+3250441966&4294967295,g=E+(_<<22&4294967295|_>>>10),_=m+(T^g&(E^T))+v[4]+4118548399&4294967295,m=g+(_<<7&4294967295|_>>>25),_=T+(E^m&(g^E))+v[5]+1200080426&4294967295,T=m+(_<<12&4294967295|_>>>20),_=E+(g^T&(m^g))+v[6]+2821735955&4294967295,E=T+(_<<17&4294967295|_>>>15),_=g+(m^E&(T^m))+v[7]+4249261313&4294967295,g=E+(_<<22&4294967295|_>>>10),_=m+(T^g&(E^T))+v[8]+1770035416&4294967295,m=g+(_<<7&4294967295|_>>>25),_=T+(E^m&(g^E))+v[9]+2336552879&4294967295,T=m+(_<<12&4294967295|_>>>20),_=E+(g^T&(m^g))+v[10]+4294925233&4294967295,E=T+(_<<17&4294967295|_>>>15),_=g+(m^E&(T^m))+v[11]+2304563134&4294967295,g=E+(_<<22&4294967295|_>>>10),_=m+(T^g&(E^T))+v[12]+1804603682&4294967295,m=g+(_<<7&4294967295|_>>>25),_=T+(E^m&(g^E))+v[13]+4254626195&4294967295,T=m+(_<<12&4294967295|_>>>20),_=E+(g^T&(m^g))+v[14]+2792965006&4294967295,E=T+(_<<17&4294967295|_>>>15),_=g+(m^E&(T^m))+v[15]+1236535329&4294967295,g=E+(_<<22&4294967295|_>>>10),_=m+(E^T&(g^E))+v[1]+4129170786&4294967295,m=g+(_<<5&4294967295|_>>>27),_=T+(g^E&(m^g))+v[6]+3225465664&4294967295,T=m+(_<<9&4294967295|_>>>23),_=E+(m^g&(T^m))+v[11]+643717713&4294967295,E=T+(_<<14&4294967295|_>>>18),_=g+(T^m&(E^T))+v[0]+3921069994&4294967295,g=E+(_<<20&4294967295|_>>>12),_=m+(E^T&(g^E))+v[5]+3593408605&4294967295,m=g+(_<<5&4294967295|_>>>27),_=T+(g^E&(m^g))+v[10]+38016083&4294967295,T=m+(_<<9&4294967295|_>>>23),_=E+(m^g&(T^m))+v[15]+3634488961&4294967295,E=T+(_<<14&4294967295|_>>>18),_=g+(T^m&(E^T))+v[4]+3889429448&4294967295,g=E+(_<<20&4294967295|_>>>12),_=m+(E^T&(g^E))+v[9]+568446438&4294967295,m=g+(_<<5&4294967295|_>>>27),_=T+(g^E&(m^g))+v[14]+3275163606&4294967295,T=m+(_<<9&4294967295|_>>>23),_=E+(m^g&(T^m))+v[3]+4107603335&4294967295,E=T+(_<<14&4294967295|_>>>18),_=g+(T^m&(E^T))+v[8]+1163531501&4294967295,g=E+(_<<20&4294967295|_>>>12),_=m+(E^T&(g^E))+v[13]+2850285829&4294967295,m=g+(_<<5&4294967295|_>>>27),_=T+(g^E&(m^g))+v[2]+4243563512&4294967295,T=m+(_<<9&4294967295|_>>>23),_=E+(m^g&(T^m))+v[7]+1735328473&4294967295,E=T+(_<<14&4294967295|_>>>18),_=g+(T^m&(E^T))+v[12]+2368359562&4294967295,g=E+(_<<20&4294967295|_>>>12),_=m+(g^E^T)+v[5]+4294588738&4294967295,m=g+(_<<4&4294967295|_>>>28),_=T+(m^g^E)+v[8]+2272392833&4294967295,T=m+(_<<11&4294967295|_>>>21),_=E+(T^m^g)+v[11]+1839030562&4294967295,E=T+(_<<16&4294967295|_>>>16),_=g+(E^T^m)+v[14]+4259657740&4294967295,g=E+(_<<23&4294967295|_>>>9),_=m+(g^E^T)+v[1]+2763975236&4294967295,m=g+(_<<4&4294967295|_>>>28),_=T+(m^g^E)+v[4]+1272893353&4294967295,T=m+(_<<11&4294967295|_>>>21),_=E+(T^m^g)+v[7]+4139469664&4294967295,E=T+(_<<16&4294967295|_>>>16),_=g+(E^T^m)+v[10]+3200236656&4294967295,g=E+(_<<23&4294967295|_>>>9),_=m+(g^E^T)+v[13]+681279174&4294967295,m=g+(_<<4&4294967295|_>>>28),_=T+(m^g^E)+v[0]+3936430074&4294967295,T=m+(_<<11&4294967295|_>>>21),_=E+(T^m^g)+v[3]+3572445317&4294967295,E=T+(_<<16&4294967295|_>>>16),_=g+(E^T^m)+v[6]+76029189&4294967295,g=E+(_<<23&4294967295|_>>>9),_=m+(g^E^T)+v[9]+3654602809&4294967295,m=g+(_<<4&4294967295|_>>>28),_=T+(m^g^E)+v[12]+3873151461&4294967295,T=m+(_<<11&4294967295|_>>>21),_=E+(T^m^g)+v[15]+530742520&4294967295,E=T+(_<<16&4294967295|_>>>16),_=g+(E^T^m)+v[2]+3299628645&4294967295,g=E+(_<<23&4294967295|_>>>9),_=m+(E^(g|~T))+v[0]+4096336452&4294967295,m=g+(_<<6&4294967295|_>>>26),_=T+(g^(m|~E))+v[7]+1126891415&4294967295,T=m+(_<<10&4294967295|_>>>22),_=E+(m^(T|~g))+v[14]+2878612391&4294967295,E=T+(_<<15&4294967295|_>>>17),_=g+(T^(E|~m))+v[5]+4237533241&4294967295,g=E+(_<<21&4294967295|_>>>11),_=m+(E^(g|~T))+v[12]+1700485571&4294967295,m=g+(_<<6&4294967295|_>>>26),_=T+(g^(m|~E))+v[3]+2399980690&4294967295,T=m+(_<<10&4294967295|_>>>22),_=E+(m^(T|~g))+v[10]+4293915773&4294967295,E=T+(_<<15&4294967295|_>>>17),_=g+(T^(E|~m))+v[1]+2240044497&4294967295,g=E+(_<<21&4294967295|_>>>11),_=m+(E^(g|~T))+v[8]+1873313359&4294967295,m=g+(_<<6&4294967295|_>>>26),_=T+(g^(m|~E))+v[15]+4264355552&4294967295,T=m+(_<<10&4294967295|_>>>22),_=E+(m^(T|~g))+v[6]+2734768916&4294967295,E=T+(_<<15&4294967295|_>>>17),_=g+(T^(E|~m))+v[13]+1309151649&4294967295,g=E+(_<<21&4294967295|_>>>11),_=m+(E^(g|~T))+v[4]+4149444226&4294967295,m=g+(_<<6&4294967295|_>>>26),_=T+(g^(m|~E))+v[11]+3174756917&4294967295,T=m+(_<<10&4294967295|_>>>22),_=E+(m^(T|~g))+v[2]+718787259&4294967295,E=T+(_<<15&4294967295|_>>>17),_=g+(T^(E|~m))+v[9]+3951481745&4294967295,w.g[0]=w.g[0]+m&4294967295,w.g[1]=w.g[1]+(E+(_<<21&4294967295|_>>>11))&4294967295,w.g[2]=w.g[2]+E&4294967295,w.g[3]=w.g[3]+T&4294967295}r.prototype.u=function(w,m){m===void 0&&(m=w.length);for(var g=m-this.blockSize,v=this.B,E=this.h,T=0;T<m;){if(E==0)for(;T<=g;)s(this,w,T),T+=this.blockSize;if(typeof w=="string"){for(;T<m;)if(v[E++]=w.charCodeAt(T++),E==this.blockSize){s(this,v),E=0;break}}else for(;T<m;)if(v[E++]=w[T++],E==this.blockSize){s(this,v),E=0;break}}this.h=E,this.o+=m},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var m=1;m<w.length-8;++m)w[m]=0;var g=8*this.o;for(m=w.length-8;m<w.length;++m)w[m]=g&255,g/=256;for(this.u(w),w=Array(16),m=g=0;4>m;++m)for(var v=0;32>v;v+=8)w[g++]=this.g[m]>>>v&255;return w};function i(w,m){var g=l;return Object.prototype.hasOwnProperty.call(g,w)?g[w]:g[w]=m(w)}function a(w,m){this.h=m;for(var g=[],v=!0,E=w.length-1;0<=E;E--){var T=w[E]|0;v&&T==m||(g[E]=T,v=!1)}this.g=g}var l={};function u(w){return-128<=w&&128>w?i(w,function(m){return new a([m|0],0>m?-1:0)}):new a([w|0],0>w?-1:0)}function d(w){if(isNaN(w)||!isFinite(w))return y;if(0>w)return P(d(-w));for(var m=[],g=1,v=0;w>=g;v++)m[v]=w/g|0,g*=4294967296;return new a(m,0)}function p(w,m){if(w.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(w.charAt(0)=="-")return P(p(w.substring(1),m));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=d(Math.pow(m,8)),v=y,E=0;E<w.length;E+=8){var T=Math.min(8,w.length-E),_=parseInt(w.substring(E,E+T),m);8>T?(T=d(Math.pow(m,T)),v=v.j(T).add(d(_))):(v=v.j(g),v=v.add(d(_)))}return v}var y=u(0),A=u(1),S=u(16777216);n=a.prototype,n.m=function(){if(V(this))return-P(this).m();for(var w=0,m=1,g=0;g<this.g.length;g++){var v=this.i(g);w+=(0<=v?v:4294967296+v)*m,m*=4294967296}return w},n.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(D(this))return"0";if(V(this))return"-"+P(this).toString(w);for(var m=d(Math.pow(w,6)),g=this,v="";;){var E=G(g,m).g;g=M(g,E.j(m));var T=((0<g.g.length?g.g[0]:g.h)>>>0).toString(w);if(g=E,D(g))return T+v;for(;6>T.length;)T="0"+T;v=T+v}},n.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function D(w){if(w.h!=0)return!1;for(var m=0;m<w.g.length;m++)if(w.g[m]!=0)return!1;return!0}function V(w){return w.h==-1}n.l=function(w){return w=M(this,w),V(w)?-1:D(w)?0:1};function P(w){for(var m=w.g.length,g=[],v=0;v<m;v++)g[v]=~w.g[v];return new a(g,~w.h).add(A)}n.abs=function(){return V(this)?P(this):this},n.add=function(w){for(var m=Math.max(this.g.length,w.g.length),g=[],v=0,E=0;E<=m;E++){var T=v+(this.i(E)&65535)+(w.i(E)&65535),_=(T>>>16)+(this.i(E)>>>16)+(w.i(E)>>>16);v=_>>>16,T&=65535,_&=65535,g[E]=_<<16|T}return new a(g,g[g.length-1]&-2147483648?-1:0)};function M(w,m){return w.add(P(m))}n.j=function(w){if(D(this)||D(w))return y;if(V(this))return V(w)?P(this).j(P(w)):P(P(this).j(w));if(V(w))return P(this.j(P(w)));if(0>this.l(S)&&0>w.l(S))return d(this.m()*w.m());for(var m=this.g.length+w.g.length,g=[],v=0;v<2*m;v++)g[v]=0;for(v=0;v<this.g.length;v++)for(var E=0;E<w.g.length;E++){var T=this.i(v)>>>16,_=this.i(v)&65535,Oe=w.i(E)>>>16,He=w.i(E)&65535;g[2*v+2*E]+=_*He,B(g,2*v+2*E),g[2*v+2*E+1]+=T*He,B(g,2*v+2*E+1),g[2*v+2*E+1]+=_*Oe,B(g,2*v+2*E+1),g[2*v+2*E+2]+=T*Oe,B(g,2*v+2*E+2)}for(v=0;v<m;v++)g[v]=g[2*v+1]<<16|g[2*v];for(v=m;v<2*m;v++)g[v]=0;return new a(g,0)};function B(w,m){for(;(w[m]&65535)!=w[m];)w[m+1]+=w[m]>>>16,w[m]&=65535,m++}function L(w,m){this.g=w,this.h=m}function G(w,m){if(D(m))throw Error("division by zero");if(D(w))return new L(y,y);if(V(w))return m=G(P(w),m),new L(P(m.g),P(m.h));if(V(m))return m=G(w,P(m)),new L(P(m.g),m.h);if(30<w.g.length){if(V(w)||V(m))throw Error("slowDivide_ only works with positive integers.");for(var g=A,v=m;0>=v.l(w);)g=se(g),v=se(v);var E=Z(g,1),T=Z(v,1);for(v=Z(v,2),g=Z(g,2);!D(v);){var _=T.add(v);0>=_.l(w)&&(E=E.add(g),T=_),v=Z(v,1),g=Z(g,1)}return m=M(w,E.j(m)),new L(E,m)}for(E=y;0<=w.l(m);){for(g=Math.max(1,Math.floor(w.m()/m.m())),v=Math.ceil(Math.log(g)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),T=d(g),_=T.j(m);V(_)||0<_.l(w);)g-=v,T=d(g),_=T.j(m);D(T)&&(T=A),E=E.add(T),w=M(w,_)}return new L(E,w)}n.A=function(w){return G(this,w).h},n.and=function(w){for(var m=Math.max(this.g.length,w.g.length),g=[],v=0;v<m;v++)g[v]=this.i(v)&w.i(v);return new a(g,this.h&w.h)},n.or=function(w){for(var m=Math.max(this.g.length,w.g.length),g=[],v=0;v<m;v++)g[v]=this.i(v)|w.i(v);return new a(g,this.h|w.h)},n.xor=function(w){for(var m=Math.max(this.g.length,w.g.length),g=[],v=0;v<m;v++)g[v]=this.i(v)^w.i(v);return new a(g,this.h^w.h)};function se(w){for(var m=w.g.length+1,g=[],v=0;v<m;v++)g[v]=w.i(v)<<1|w.i(v-1)>>>31;return new a(g,w.h)}function Z(w,m){var g=m>>5;m%=32;for(var v=w.g.length-g,E=[],T=0;T<v;T++)E[T]=0<m?w.i(T+g)>>>m|w.i(T+g+1)<<32-m:w.i(T+g);return new a(E,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,qu=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,Bt=a}).apply(typeof Zc<"u"?Zc:typeof self<"u"?self:typeof window<"u"?window:{});var ts=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Wu,Jn,Hu,us,eo,zu,Gu,Ku;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,h){return o==Array.prototype||o==Object.prototype||(o[c]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof ts=="object"&&ts];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,c){if(c)e:{var h=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var I=o[f];if(!(I in h))break e;h=h[I]}o=o[o.length-1],f=h[o],c=c(f),c!=f&&c!=null&&e(h,o,{configurable:!0,writable:!0,value:c})}}function i(o,c){o instanceof String&&(o+="");var h=0,f=!1,I={next:function(){if(!f&&h<o.length){var R=h++;return{value:c(R,o[R]),done:!1}}return f=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}s("Array.prototype.values",function(o){return o||function(){return i(this,function(c,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function u(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function d(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function p(o,c,h){return o.call.apply(o.bind,arguments)}function y(o,c,h){if(!o)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,f),o.apply(c,I)}}return function(){return o.apply(c,arguments)}}function A(o,c,h){return A=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:y,A.apply(null,arguments)}function S(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function D(o,c){function h(){}h.prototype=c.prototype,o.aa=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(f,I,R){for(var N=Array(arguments.length-2),X=2;X<arguments.length;X++)N[X-2]=arguments[X];return c.prototype[I].apply(f,N)}}function V(o){const c=o.length;if(0<c){const h=Array(c);for(let f=0;f<c;f++)h[f]=o[f];return h}return[]}function P(o,c){for(let h=1;h<arguments.length;h++){const f=arguments[h];if(u(f)){const I=o.length||0,R=f.length||0;o.length=I+R;for(let N=0;N<R;N++)o[I+N]=f[N]}else o.push(f)}}class M{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function B(o){return/^[\s\xa0]*$/.test(o)}function L(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function G(o){return G[" "](o),o}G[" "]=function(){};var se=L().indexOf("Gecko")!=-1&&!(L().toLowerCase().indexOf("webkit")!=-1&&L().indexOf("Edge")==-1)&&!(L().indexOf("Trident")!=-1||L().indexOf("MSIE")!=-1)&&L().indexOf("Edge")==-1;function Z(o,c,h){for(const f in o)c.call(h,o[f],f,o)}function w(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function m(o){const c={};for(const h in o)c[h]=o[h];return c}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(o,c){let h,f;for(let I=1;I<arguments.length;I++){f=arguments[I];for(h in f)o[h]=f[h];for(let R=0;R<g.length;R++)h=g[R],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function E(o){var c=1;o=o.split(":");const h=[];for(;0<c&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function T(o){l.setTimeout(()=>{throw o},0)}function _(){var o=ai;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class Oe{constructor(){this.h=this.g=null}add(c,h){const f=He.get();f.set(c,h),this.h?this.h.next=f:this.g=f,this.h=f}}var He=new M(()=>new gd,o=>o.reset());class gd{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let kn,Dn=!1,ai=new Oe,ma=()=>{const o=l.Promise.resolve(void 0);kn=()=>{o.then(_d)}};var _d=()=>{for(var o;o=_();){try{o.h.call(o.g)}catch(h){T(h)}var c=He;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}Dn=!1};function dt(){this.s=this.s,this.C=this.C}dt.prototype.s=!1,dt.prototype.ma=function(){this.s||(this.s=!0,this.N())},dt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function we(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}we.prototype.h=function(){this.defaultPrevented=!0};var yd=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};l.addEventListener("test",h,c),l.removeEventListener("test",h,c)}catch{}return o}();function Nn(o,c){if(we.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(se){e:{try{G(c.nodeName);var I=!0;break e}catch{}I=!1}I||(c=null)}}else h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement);this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:vd[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Nn.aa.h.call(this)}}D(Nn,we);var vd={2:"touch",3:"pen",4:"mouse"};Nn.prototype.h=function(){Nn.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Vr="closure_listenable_"+(1e6*Math.random()|0),Ed=0;function wd(o,c,h,f,I){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!f,this.ha=I,this.key=++Ed,this.da=this.fa=!1}function Lr(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Mr(o){this.src=o,this.g={},this.h=0}Mr.prototype.add=function(o,c,h,f,I){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var N=li(o,c,f,I);return-1<N?(c=o[N],h||(c.fa=!1)):(c=new wd(c,this.src,R,!!f,I),c.fa=h,o.push(c)),c};function ci(o,c){var h=c.type;if(h in o.g){var f=o.g[h],I=Array.prototype.indexOf.call(f,c,void 0),R;(R=0<=I)&&Array.prototype.splice.call(f,I,1),R&&(Lr(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function li(o,c,h,f){for(var I=0;I<o.length;++I){var R=o[I];if(!R.da&&R.listener==c&&R.capture==!!h&&R.ha==f)return I}return-1}var ui="closure_lm_"+(1e6*Math.random()|0),hi={};function ga(o,c,h,f,I){if(Array.isArray(c)){for(var R=0;R<c.length;R++)ga(o,c[R],h,f,I);return null}return h=va(h),o&&o[Vr]?o.K(c,h,d(f)?!!f.capture:!1,I):Td(o,c,h,!1,f,I)}function Td(o,c,h,f,I,R){if(!c)throw Error("Invalid event type");var N=d(I)?!!I.capture:!!I,X=fi(o);if(X||(o[ui]=X=new Mr(o)),h=X.add(c,h,f,N,R),h.proxy)return h;if(f=Id(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)yd||(I=N),I===void 0&&(I=!1),o.addEventListener(c.toString(),f,I);else if(o.attachEvent)o.attachEvent(ya(c.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Id(){function o(h){return c.call(o.src,o.listener,h)}const c=Ad;return o}function _a(o,c,h,f,I){if(Array.isArray(c))for(var R=0;R<c.length;R++)_a(o,c[R],h,f,I);else f=d(f)?!!f.capture:!!f,h=va(h),o&&o[Vr]?(o=o.i,c=String(c).toString(),c in o.g&&(R=o.g[c],h=li(R,h,f,I),-1<h&&(Lr(R[h]),Array.prototype.splice.call(R,h,1),R.length==0&&(delete o.g[c],o.h--)))):o&&(o=fi(o))&&(c=o.g[c.toString()],o=-1,c&&(o=li(c,h,f,I)),(h=-1<o?c[o]:null)&&di(h))}function di(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[Vr])ci(c.i,o);else{var h=o.type,f=o.proxy;c.removeEventListener?c.removeEventListener(h,f,o.capture):c.detachEvent?c.detachEvent(ya(h),f):c.addListener&&c.removeListener&&c.removeListener(f),(h=fi(c))?(ci(h,o),h.h==0&&(h.src=null,c[ui]=null)):Lr(o)}}}function ya(o){return o in hi?hi[o]:hi[o]="on"+o}function Ad(o,c){if(o.da)o=!0;else{c=new Nn(c,this);var h=o.listener,f=o.ha||o.src;o.fa&&di(o),o=h.call(f,c)}return o}function fi(o){return o=o[ui],o instanceof Mr?o:null}var pi="__closure_events_fn_"+(1e9*Math.random()>>>0);function va(o){return typeof o=="function"?o:(o[pi]||(o[pi]=function(c){return o.handleEvent(c)}),o[pi])}function Te(){dt.call(this),this.i=new Mr(this),this.M=this,this.F=null}D(Te,dt),Te.prototype[Vr]=!0,Te.prototype.removeEventListener=function(o,c,h,f){_a(this,o,c,h,f)};function Ce(o,c){var h,f=o.F;if(f)for(h=[];f;f=f.F)h.push(f);if(o=o.M,f=c.type||c,typeof c=="string")c=new we(c,o);else if(c instanceof we)c.target=c.target||o;else{var I=c;c=new we(f,o),v(c,I)}if(I=!0,h)for(var R=h.length-1;0<=R;R--){var N=c.g=h[R];I=xr(N,f,!0,c)&&I}if(N=c.g=o,I=xr(N,f,!0,c)&&I,I=xr(N,f,!1,c)&&I,h)for(R=0;R<h.length;R++)N=c.g=h[R],I=xr(N,f,!1,c)&&I}Te.prototype.N=function(){if(Te.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var h=o.g[c],f=0;f<h.length;f++)Lr(h[f]);delete o.g[c],o.h--}}this.F=null},Te.prototype.K=function(o,c,h,f){return this.i.add(String(o),c,!1,h,f)},Te.prototype.L=function(o,c,h,f){return this.i.add(String(o),c,!0,h,f)};function xr(o,c,h,f){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var I=!0,R=0;R<c.length;++R){var N=c[R];if(N&&!N.da&&N.capture==h){var X=N.listener,pe=N.ha||N.src;N.fa&&ci(o.i,N),I=X.call(pe,f)!==!1&&I}}return I&&!f.defaultPrevented}function Ea(o,c,h){if(typeof o=="function")h&&(o=A(o,h));else if(o&&typeof o.handleEvent=="function")o=A(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(o,c||0)}function wa(o){o.g=Ea(()=>{o.g=null,o.i&&(o.i=!1,wa(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class Rd extends dt{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:wa(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function On(o){dt.call(this),this.h=o,this.g={}}D(On,dt);var Ta=[];function Ia(o){Z(o.g,function(c,h){this.g.hasOwnProperty(h)&&di(c)},o),o.g={}}On.prototype.N=function(){On.aa.N.call(this),Ia(this)},On.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var mi=l.JSON.stringify,bd=l.JSON.parse,Pd=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function gi(){}gi.prototype.h=null;function Aa(o){return o.h||(o.h=o.i())}function Ra(){}var Vn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function _i(){we.call(this,"d")}D(_i,we);function yi(){we.call(this,"c")}D(yi,we);var kt={},ba=null;function Ur(){return ba=ba||new Te}kt.La="serverreachability";function Pa(o){we.call(this,kt.La,o)}D(Pa,we);function Ln(o){const c=Ur();Ce(c,new Pa(c))}kt.STAT_EVENT="statevent";function Sa(o,c){we.call(this,kt.STAT_EVENT,o),this.stat=c}D(Sa,we);function ke(o){const c=Ur();Ce(c,new Sa(c,o))}kt.Ma="timingevent";function Ca(o,c){we.call(this,kt.Ma,o),this.size=c}D(Ca,we);function Mn(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},c)}function xn(){this.g=!0}xn.prototype.xa=function(){this.g=!1};function Sd(o,c,h,f,I,R){o.info(function(){if(o.g)if(R)for(var N="",X=R.split("&"),pe=0;pe<X.length;pe++){var K=X[pe].split("=");if(1<K.length){var Ie=K[0];K=K[1];var Ae=Ie.split("_");N=2<=Ae.length&&Ae[1]=="type"?N+(Ie+"="+K+"&"):N+(Ie+"=redacted&")}}else N=null;else N=R;return"XMLHTTP REQ ("+f+") [attempt "+I+"]: "+c+`
`+h+`
`+N})}function Cd(o,c,h,f,I,R,N){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+I+"]: "+c+`
`+h+`
`+R+" "+N})}function Jt(o,c,h,f){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+Dd(o,h)+(f?" "+f:"")})}function kd(o,c){o.info(function(){return"TIMEOUT: "+c})}xn.prototype.info=function(){};function Dd(o,c){if(!o.g)return c;if(!c)return null;try{var h=JSON.parse(c);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var f=h[o];if(!(2>f.length)){var I=f[1];if(Array.isArray(I)&&!(1>I.length)){var R=I[0];if(R!="noop"&&R!="stop"&&R!="close")for(var N=1;N<I.length;N++)I[N]=""}}}}return mi(h)}catch{return c}}var Fr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ka={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},vi;function Br(){}D(Br,gi),Br.prototype.g=function(){return new XMLHttpRequest},Br.prototype.i=function(){return{}},vi=new Br;function ft(o,c,h,f){this.j=o,this.i=c,this.l=h,this.R=f||1,this.U=new On(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Da}function Da(){this.i=null,this.g="",this.h=!1}var Na={},Ei={};function wi(o,c,h){o.L=1,o.v=Wr(Xe(c)),o.m=h,o.P=!0,Oa(o,null)}function Oa(o,c){o.F=Date.now(),jr(o),o.A=Xe(o.v);var h=o.A,f=o.R;Array.isArray(f)||(f=[String(f)]),Ga(h.i,"t",f),o.C=0,h=o.j.J,o.h=new Da,o.g=hc(o.j,h?c:null,!o.m),0<o.O&&(o.M=new Rd(A(o.Y,o,o.g),o.O)),c=o.U,h=o.g,f=o.ca;var I="readystatechange";Array.isArray(I)||(I&&(Ta[0]=I.toString()),I=Ta);for(var R=0;R<I.length;R++){var N=ga(h,I[R],f||c.handleEvent,!1,c.h||c);if(!N)break;c.g[N.key]=N}c=o.H?m(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),Ln(),Sd(o.i,o.u,o.A,o.l,o.R,o.m)}ft.prototype.ca=function(o){o=o.target;const c=this.M;c&&Ze(o)==3?c.j():this.Y(o)},ft.prototype.Y=function(o){try{if(o==this.g)e:{const Ae=Ze(this.g);var c=this.g.Ba();const en=this.g.Z();if(!(3>Ae)&&(Ae!=3||this.g&&(this.h.h||this.g.oa()||ec(this.g)))){this.J||Ae!=4||c==7||(c==8||0>=en?Ln(3):Ln(2)),Ti(this);var h=this.g.Z();this.X=h;t:if(Va(this)){var f=ec(this.g);o="";var I=f.length,R=Ze(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Dt(this),Un(this);var N="";break t}this.h.i=new l.TextDecoder}for(c=0;c<I;c++)this.h.h=!0,o+=this.h.i.decode(f[c],{stream:!(R&&c==I-1)});f.length=0,this.h.g+=o,this.C=0,N=this.h.g}else N=this.g.oa();if(this.o=h==200,Cd(this.i,this.u,this.A,this.l,this.R,Ae,h),this.o){if(this.T&&!this.K){t:{if(this.g){var X,pe=this.g;if((X=pe.g?pe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!B(X)){var K=X;break t}}K=null}if(h=K)Jt(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ii(this,h);else{this.o=!1,this.s=3,ke(12),Dt(this),Un(this);break e}}if(this.P){h=!0;let Be;for(;!this.J&&this.C<N.length;)if(Be=Nd(this,N),Be==Ei){Ae==4&&(this.s=4,ke(14),h=!1),Jt(this.i,this.l,null,"[Incomplete Response]");break}else if(Be==Na){this.s=4,ke(15),Jt(this.i,this.l,N,"[Invalid Chunk]"),h=!1;break}else Jt(this.i,this.l,Be,null),Ii(this,Be);if(Va(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ae!=4||N.length!=0||this.h.h||(this.s=1,ke(16),h=!1),this.o=this.o&&h,!h)Jt(this.i,this.l,N,"[Invalid Chunked Response]"),Dt(this),Un(this);else if(0<N.length&&!this.W){this.W=!0;var Ie=this.j;Ie.g==this&&Ie.ba&&!Ie.M&&(Ie.j.info("Great, no buffering proxy detected. Bytes received: "+N.length),Ci(Ie),Ie.M=!0,ke(11))}}else Jt(this.i,this.l,N,null),Ii(this,N);Ae==4&&Dt(this),this.o&&!this.J&&(Ae==4?ac(this.j,this):(this.o=!1,jr(this)))}else Qd(this.g),h==400&&0<N.indexOf("Unknown SID")?(this.s=3,ke(12)):(this.s=0,ke(13)),Dt(this),Un(this)}}}catch{}finally{}};function Va(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Nd(o,c){var h=o.C,f=c.indexOf(`
`,h);return f==-1?Ei:(h=Number(c.substring(h,f)),isNaN(h)?Na:(f+=1,f+h>c.length?Ei:(c=c.slice(f,f+h),o.C=f+h,c)))}ft.prototype.cancel=function(){this.J=!0,Dt(this)};function jr(o){o.S=Date.now()+o.I,La(o,o.I)}function La(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Mn(A(o.ba,o),c)}function Ti(o){o.B&&(l.clearTimeout(o.B),o.B=null)}ft.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(kd(this.i,this.A),this.L!=2&&(Ln(),ke(17)),Dt(this),this.s=2,Un(this)):La(this,this.S-o)};function Un(o){o.j.G==0||o.J||ac(o.j,o)}function Dt(o){Ti(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,Ia(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function Ii(o,c){try{var h=o.j;if(h.G!=0&&(h.g==o||Ai(h.h,o))){if(!o.K&&Ai(h.h,o)&&h.G==3){try{var f=h.Da.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var I=f;if(I[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)Yr(h),Kr(h);else break e;Si(h),ke(18)}}else h.za=I[1],0<h.za-h.T&&37500>I[2]&&h.F&&h.v==0&&!h.C&&(h.C=Mn(A(h.Za,h),6e3));if(1>=Ua(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Ot(h,11)}else if((o.K||h.g==o)&&Yr(h),!B(c))for(I=h.Da.g.parse(c),c=0;c<I.length;c++){let K=I[c];if(h.T=K[0],K=K[1],h.G==2)if(K[0]=="c"){h.K=K[1],h.ia=K[2];const Ie=K[3];Ie!=null&&(h.la=Ie,h.j.info("VER="+h.la));const Ae=K[4];Ae!=null&&(h.Aa=Ae,h.j.info("SVER="+h.Aa));const en=K[5];en!=null&&typeof en=="number"&&0<en&&(f=1.5*en,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const Be=o.g;if(Be){const Xr=Be.g?Be.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Xr){var R=f.h;R.g||Xr.indexOf("spdy")==-1&&Xr.indexOf("quic")==-1&&Xr.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Ri(R,R.h),R.h=null))}if(f.D){const ki=Be.g?Be.g.getResponseHeader("X-HTTP-Session-Id"):null;ki&&(f.ya=ki,ee(f.I,f.D,ki))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var N=o;if(f.qa=uc(f,f.J?f.ia:null,f.W),N.K){Fa(f.h,N);var X=N,pe=f.L;pe&&(X.I=pe),X.B&&(Ti(X),jr(X)),f.g=N}else ic(f);0<h.i.length&&Qr(h)}else K[0]!="stop"&&K[0]!="close"||Ot(h,7);else h.G==3&&(K[0]=="stop"||K[0]=="close"?K[0]=="stop"?Ot(h,7):Pi(h):K[0]!="noop"&&h.l&&h.l.ta(K),h.v=0)}}Ln(4)}catch{}}var Od=class{constructor(o,c){this.g=o,this.map=c}};function Ma(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function xa(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Ua(o){return o.h?1:o.g?o.g.size:0}function Ai(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Ri(o,c){o.g?o.g.add(c):o.h=c}function Fa(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}Ma.prototype.cancel=function(){if(this.i=Ba(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Ba(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.D);return c}return V(o.i)}function Vd(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var c=[],h=o.length,f=0;f<h;f++)c.push(o[f]);return c}c=[],h=0;for(f in o)c[h++]=o[f];return c}function Ld(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var c=[];o=o.length;for(var h=0;h<o;h++)c.push(h);return c}c=[],h=0;for(const f in o)c[h++]=f;return c}}}function ja(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var h=Ld(o),f=Vd(o),I=f.length,R=0;R<I;R++)c.call(void 0,f[R],h&&h[R],o)}var $a=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Md(o,c){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var f=o[h].indexOf("="),I=null;if(0<=f){var R=o[h].substring(0,f);I=o[h].substring(f+1)}else R=o[h];c(R,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function Nt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Nt){this.h=o.h,$r(this,o.j),this.o=o.o,this.g=o.g,qr(this,o.s),this.l=o.l;var c=o.i,h=new jn;h.i=c.i,c.g&&(h.g=new Map(c.g),h.h=c.h),qa(this,h),this.m=o.m}else o&&(c=String(o).match($a))?(this.h=!1,$r(this,c[1]||"",!0),this.o=Fn(c[2]||""),this.g=Fn(c[3]||"",!0),qr(this,c[4]),this.l=Fn(c[5]||"",!0),qa(this,c[6]||"",!0),this.m=Fn(c[7]||"")):(this.h=!1,this.i=new jn(null,this.h))}Nt.prototype.toString=function(){var o=[],c=this.j;c&&o.push(Bn(c,Wa,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(Bn(c,Wa,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Bn(h,h.charAt(0)=="/"?Fd:Ud,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Bn(h,jd)),o.join("")};function Xe(o){return new Nt(o)}function $r(o,c,h){o.j=h?Fn(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function qr(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function qa(o,c,h){c instanceof jn?(o.i=c,$d(o.i,o.h)):(h||(c=Bn(c,Bd)),o.i=new jn(c,o.h))}function ee(o,c,h){o.i.set(c,h)}function Wr(o){return ee(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Fn(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Bn(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,xd),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function xd(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Wa=/[#\/\?@]/g,Ud=/[#\?:]/g,Fd=/[#\?]/g,Bd=/[#\?@]/g,jd=/#/g;function jn(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function pt(o){o.g||(o.g=new Map,o.h=0,o.i&&Md(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}n=jn.prototype,n.add=function(o,c){pt(this),this.i=null,o=Xt(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function Ha(o,c){pt(o),c=Xt(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function za(o,c){return pt(o),c=Xt(o,c),o.g.has(c)}n.forEach=function(o,c){pt(this),this.g.forEach(function(h,f){h.forEach(function(I){o.call(c,I,f,this)},this)},this)},n.na=function(){pt(this);const o=Array.from(this.g.values()),c=Array.from(this.g.keys()),h=[];for(let f=0;f<c.length;f++){const I=o[f];for(let R=0;R<I.length;R++)h.push(c[f])}return h},n.V=function(o){pt(this);let c=[];if(typeof o=="string")za(this,o)&&(c=c.concat(this.g.get(Xt(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)c=c.concat(o[h])}return c},n.set=function(o,c){return pt(this),this.i=null,o=Xt(this,o),za(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function Ga(o,c,h){Ha(o,c),0<h.length&&(o.i=null,o.g.set(Xt(o,c),V(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(var h=0;h<c.length;h++){var f=c[h];const R=encodeURIComponent(String(f)),N=this.V(f);for(f=0;f<N.length;f++){var I=R;N[f]!==""&&(I+="="+encodeURIComponent(String(N[f]))),o.push(I)}}return this.i=o.join("&")};function Xt(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function $d(o,c){c&&!o.j&&(pt(o),o.i=null,o.g.forEach(function(h,f){var I=f.toLowerCase();f!=I&&(Ha(this,f),Ga(this,I,h))},o)),o.j=c}function qd(o,c){const h=new xn;if(l.Image){const f=new Image;f.onload=S(mt,h,"TestLoadImage: loaded",!0,c,f),f.onerror=S(mt,h,"TestLoadImage: error",!1,c,f),f.onabort=S(mt,h,"TestLoadImage: abort",!1,c,f),f.ontimeout=S(mt,h,"TestLoadImage: timeout",!1,c,f),l.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else c(!1)}function Wd(o,c){const h=new xn,f=new AbortController,I=setTimeout(()=>{f.abort(),mt(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:f.signal}).then(R=>{clearTimeout(I),R.ok?mt(h,"TestPingServer: ok",!0,c):mt(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(I),mt(h,"TestPingServer: error",!1,c)})}function mt(o,c,h,f,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),f(h)}catch{}}function Hd(){this.g=new Pd}function zd(o,c,h){const f=h||"";try{ja(o,function(I,R){let N=I;d(I)&&(N=mi(I)),c.push(f+R+"="+encodeURIComponent(N))})}catch(I){throw c.push(f+"type="+encodeURIComponent("_badmap")),I}}function Hr(o){this.l=o.Ub||null,this.j=o.eb||!1}D(Hr,gi),Hr.prototype.g=function(){return new zr(this.l,this.j)},Hr.prototype.i=function(o){return function(){return o}}({});function zr(o,c){Te.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(zr,Te),n=zr.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,qn(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,$n(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,qn(this)),this.g&&(this.readyState=3,qn(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ka(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ka(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?$n(this):qn(this),this.readyState==3&&Ka(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,$n(this))},n.Qa=function(o){this.g&&(this.response=o,$n(this))},n.ga=function(){this.g&&$n(this)};function $n(o){o.readyState=4,o.l=null,o.j=null,o.v=null,qn(o)}n.setRequestHeader=function(o,c){this.u.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function qn(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(zr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Qa(o){let c="";return Z(o,function(h,f){c+=f,c+=":",c+=h,c+=`\r
`}),c}function bi(o,c,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=Qa(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):ee(o,c,h))}function ne(o){Te.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(ne,Te);var Gd=/^https?$/i,Kd=["POST","PUT"];n=ne.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,c,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():vi.g(),this.v=this.o?Aa(this.o):Aa(vi),this.g.onreadystatechange=A(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(R){Ya(this,R);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var I in f)h.set(I,f[I]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const R of f.keys())h.set(R,f.get(R));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),I=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Kd,c,void 0))||f||I||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,N]of h)this.g.setRequestHeader(R,N);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Za(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){Ya(this,R)}};function Ya(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,Ja(o),Gr(o)}function Ja(o){o.A||(o.A=!0,Ce(o,"complete"),Ce(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Ce(this,"complete"),Ce(this,"abort"),Gr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Gr(this,!0)),ne.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Xa(this):this.bb())},n.bb=function(){Xa(this)};function Xa(o){if(o.h&&typeof a<"u"&&(!o.v[1]||Ze(o)!=4||o.Z()!=2)){if(o.u&&Ze(o)==4)Ea(o.Ea,0,o);else if(Ce(o,"readystatechange"),Ze(o)==4){o.h=!1;try{const N=o.Z();e:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var h;if(!(h=c)){var f;if(f=N===0){var I=String(o.D).match($a)[1]||null;!I&&l.self&&l.self.location&&(I=l.self.location.protocol.slice(0,-1)),f=!Gd.test(I?I.toLowerCase():"")}h=f}if(h)Ce(o,"complete"),Ce(o,"success");else{o.m=6;try{var R=2<Ze(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",Ja(o)}}finally{Gr(o)}}}}function Gr(o,c){if(o.g){Za(o);const h=o.g,f=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||Ce(o,"ready");try{h.onreadystatechange=f}catch{}}}function Za(o){o.I&&(l.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function Ze(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<Ze(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),bd(c)}};function ec(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Qd(o){const c={};o=(o.g&&2<=Ze(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(B(o[f]))continue;var h=E(o[f]);const I=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const R=c[I]||[];c[I]=R,R.push(h)}w(c,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Wn(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function tc(o){this.Aa=0,this.i=[],this.j=new xn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Wn("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Wn("baseRetryDelayMs",5e3,o),this.cb=Wn("retryDelaySeedMs",1e4,o),this.Wa=Wn("forwardChannelMaxRetries",2,o),this.wa=Wn("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Ma(o&&o.concurrentRequestLimit),this.Da=new Hd,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=tc.prototype,n.la=8,n.G=1,n.connect=function(o,c,h,f){ke(0),this.W=o,this.H=c||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=uc(this,null,this.W),Qr(this)};function Pi(o){if(nc(o),o.G==3){var c=o.U++,h=Xe(o.I);if(ee(h,"SID",o.K),ee(h,"RID",c),ee(h,"TYPE","terminate"),Hn(o,h),c=new ft(o,o.j,c),c.L=2,c.v=Wr(Xe(h)),h=!1,l.navigator&&l.navigator.sendBeacon)try{h=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!h&&l.Image&&(new Image().src=c.v,h=!0),h||(c.g=hc(c.j,null),c.g.ea(c.v)),c.F=Date.now(),jr(c)}lc(o)}function Kr(o){o.g&&(Ci(o),o.g.cancel(),o.g=null)}function nc(o){Kr(o),o.u&&(l.clearTimeout(o.u),o.u=null),Yr(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function Qr(o){if(!xa(o.h)&&!o.s){o.s=!0;var c=o.Ga;kn||ma(),Dn||(kn(),Dn=!0),ai.add(c,o),o.B=0}}function Yd(o,c){return Ua(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Mn(A(o.Ga,o,c),cc(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const I=new ft(this,this.j,o);let R=this.o;if(this.S&&(R?(R=m(R),v(R,this.S)):R=this.S),this.m!==null||this.O||(I.H=R,R=null),this.P)e:{for(var c=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,4096<c){c=h;break e}if(c===4096||h===this.i.length-1){c=h+1;break e}}c=1e3}else c=1e3;c=sc(this,I,c),h=Xe(this.I),ee(h,"RID",o),ee(h,"CVER",22),this.D&&ee(h,"X-HTTP-Session-Id",this.D),Hn(this,h),R&&(this.O?c="headers="+encodeURIComponent(String(Qa(R)))+"&"+c:this.m&&bi(h,this.m,R)),Ri(this.h,I),this.Ua&&ee(h,"TYPE","init"),this.P?(ee(h,"$req",c),ee(h,"SID","null"),I.T=!0,wi(I,h,null)):wi(I,h,c),this.G=2}}else this.G==3&&(o?rc(this,o):this.i.length==0||xa(this.h)||rc(this))};function rc(o,c){var h;c?h=c.l:h=o.U++;const f=Xe(o.I);ee(f,"SID",o.K),ee(f,"RID",h),ee(f,"AID",o.T),Hn(o,f),o.m&&o.o&&bi(f,o.m,o.o),h=new ft(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),c&&(o.i=c.D.concat(o.i)),c=sc(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Ri(o.h,h),wi(h,f,c)}function Hn(o,c){o.H&&Z(o.H,function(h,f){ee(c,f,h)}),o.l&&ja({},function(h,f){ee(c,f,h)})}function sc(o,c,h){h=Math.min(o.i.length,h);var f=o.l?A(o.l.Na,o.l,o):null;e:{var I=o.i;let R=-1;for(;;){const N=["count="+h];R==-1?0<h?(R=I[0].g,N.push("ofs="+R)):R=0:N.push("ofs="+R);let X=!0;for(let pe=0;pe<h;pe++){let K=I[pe].g;const Ie=I[pe].map;if(K-=R,0>K)R=Math.max(0,I[pe].g-100),X=!1;else try{zd(Ie,N,"req"+K+"_")}catch{f&&f(Ie)}}if(X){f=N.join("&");break e}}}return o=o.i.splice(0,h),c.D=o,f}function ic(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;kn||ma(),Dn||(kn(),Dn=!0),ai.add(c,o),o.v=0}}function Si(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Mn(A(o.Fa,o),cc(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,oc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Mn(A(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ke(10),Kr(this),oc(this))};function Ci(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function oc(o){o.g=new ft(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=Xe(o.qa);ee(c,"RID","rpc"),ee(c,"SID",o.K),ee(c,"AID",o.T),ee(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&ee(c,"TO",o.ja),ee(c,"TYPE","xmlhttp"),Hn(o,c),o.m&&o.o&&bi(c,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=Wr(Xe(c)),h.m=null,h.P=!0,Oa(h,o)}n.Za=function(){this.C!=null&&(this.C=null,Kr(this),Si(this),ke(19))};function Yr(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function ac(o,c){var h=null;if(o.g==c){Yr(o),Ci(o),o.g=null;var f=2}else if(Ai(o.h,c))h=c.D,Fa(o.h,c),f=1;else return;if(o.G!=0){if(c.o)if(f==1){h=c.m?c.m.length:0,c=Date.now()-c.F;var I=o.B;f=Ur(),Ce(f,new Ca(f,h)),Qr(o)}else ic(o);else if(I=c.s,I==3||I==0&&0<c.X||!(f==1&&Yd(o,c)||f==2&&Si(o)))switch(h&&0<h.length&&(c=o.h,c.i=c.i.concat(h)),I){case 1:Ot(o,5);break;case 4:Ot(o,10);break;case 3:Ot(o,6);break;default:Ot(o,2)}}}function cc(o,c){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*c}function Ot(o,c){if(o.j.info("Error code "+c),c==2){var h=A(o.fb,o),f=o.Xa;const I=!f;f=new Nt(f||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||$r(f,"https"),Wr(f),I?qd(f.toString(),h):Wd(f.toString(),h)}else ke(2);o.G=0,o.l&&o.l.sa(c),lc(o),nc(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),ke(2)):(this.j.info("Failed to ping google.com"),ke(1))};function lc(o){if(o.G=0,o.ka=[],o.l){const c=Ba(o.h);(c.length!=0||o.i.length!=0)&&(P(o.ka,c),P(o.ka,o.i),o.h.i.length=0,V(o.i),o.i.length=0),o.l.ra()}}function uc(o,c,h){var f=h instanceof Nt?Xe(h):new Nt(h);if(f.g!="")c&&(f.g=c+"."+f.g),qr(f,f.s);else{var I=l.location;f=I.protocol,c=c?c+"."+I.hostname:I.hostname,I=+I.port;var R=new Nt(null);f&&$r(R,f),c&&(R.g=c),I&&qr(R,I),h&&(R.l=h),f=R}return h=o.D,c=o.ya,h&&c&&ee(f,h,c),ee(f,"VER",o.la),Hn(o,f),f}function hc(o,c,h){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new ne(new Hr({eb:h})):new ne(o.pa),c.Ha(o.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function dc(){}n=dc.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Jr(){}Jr.prototype.g=function(o,c){return new Me(o,c)};function Me(o,c){Te.call(this),this.g=new tc(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!B(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!B(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new Zt(this)}D(Me,Te),Me.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Me.prototype.close=function(){Pi(this.g)},Me.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=mi(o),o=h);c.i.push(new Od(c.Ya++,o)),c.G==3&&Qr(c)},Me.prototype.N=function(){this.g.l=null,delete this.j,Pi(this.g),delete this.g,Me.aa.N.call(this)};function fc(o){_i.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const h in c){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}D(fc,_i);function pc(){yi.call(this),this.status=1}D(pc,yi);function Zt(o){this.g=o}D(Zt,dc),Zt.prototype.ua=function(){Ce(this.g,"a")},Zt.prototype.ta=function(o){Ce(this.g,new fc(o))},Zt.prototype.sa=function(o){Ce(this.g,new pc)},Zt.prototype.ra=function(){Ce(this.g,"b")},Jr.prototype.createWebChannel=Jr.prototype.g,Me.prototype.send=Me.prototype.o,Me.prototype.open=Me.prototype.m,Me.prototype.close=Me.prototype.close,Ku=function(){return new Jr},Gu=function(){return Ur()},zu=kt,eo={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Fr.NO_ERROR=0,Fr.TIMEOUT=8,Fr.HTTP_ERROR=6,us=Fr,ka.COMPLETE="complete",Hu=ka,Ra.EventType=Vn,Vn.OPEN="a",Vn.CLOSE="b",Vn.ERROR="c",Vn.MESSAGE="d",Te.prototype.listen=Te.prototype.K,Jn=Ra,ne.prototype.listenOnce=ne.prototype.L,ne.prototype.getLastError=ne.prototype.Ka,ne.prototype.getLastErrorCode=ne.prototype.Ba,ne.prototype.getStatus=ne.prototype.Z,ne.prototype.getResponseJson=ne.prototype.Oa,ne.prototype.getResponseText=ne.prototype.oa,ne.prototype.send=ne.prototype.ea,ne.prototype.setWithCredentials=ne.prototype.Ha,Wu=ne}).apply(typeof ts<"u"?ts:typeof self<"u"?self:typeof window<"u"?window:{});const el="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}be.UNAUTHENTICATED=new be(null),be.GOOGLE_CREDENTIALS=new be("google-credentials-uid"),be.FIRST_PARTY=new be("first-party-uid"),be.MOCK_USER=new be("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bn="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ht=new To("@firebase/firestore");function Gn(){return Ht.logLevel}function x(n,...e){if(Ht.logLevel<=H.DEBUG){const t=e.map(Lo);Ht.debug(`Firestore (${bn}): ${n}`,...t)}}function ct(n,...e){if(Ht.logLevel<=H.ERROR){const t=e.map(Lo);Ht.error(`Firestore (${bn}): ${n}`,...t)}}function pn(n,...e){if(Ht.logLevel<=H.WARN){const t=e.map(Lo);Ht.warn(`Firestore (${bn}): ${n}`,...t)}}function Lo(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(n="Unexpected state"){const e=`FIRESTORE (${bn}) INTERNAL ASSERTION FAILED: `+n;throw ct(e),new Error(e)}function J(n,e){n||j()}function q(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends ut{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class j_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(be.UNAUTHENTICATED))}shutdown(){}}class $_{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class q_{constructor(e){this.t=e,this.currentUser=be.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){J(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Rt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Rt,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Rt)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(J(typeof r.accessToken=="string"),new Qu(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return J(e===null||typeof e=="string"),new be(e)}}class W_{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=be.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class H_{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new W_(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(be.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class z_{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class G_{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){J(this.o===void 0);const r=i=>{i.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.R;return this.R=i.token,x("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(J(typeof t.token=="string"),this.R=t.token,new z_(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K_(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=K_(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%e.length))}return r}}function Q(n,e){return n<e?-1:n>e?1:0}function mn(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new U(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ue.fromMillis(Date.now())}static fromDate(e){return ue.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new ue(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Q(this.nanoseconds,e.nanoseconds):Q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e){this.timestamp=e}static fromTimestamp(e){return new $(e)}static min(){return new $(new ue(0,0))}static max(){return new $(new ue(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(e,t,r){t===void 0?t=0:t>e.length&&j(),r===void 0?r=e.length-t:r>e.length-t&&j(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return dr.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof dr?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=e.get(s),a=t.get(s);if(i<a)return-1;if(i>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class re extends dr{construct(e,t,r){return new re(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(k.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new re(t)}static emptyPath(){return new re([])}}const Q_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ge extends dr{construct(e,t,r){return new ge(e,t,r)}static isValidIdentifier(e){return Q_.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ge.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ge(["__name__"])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new U(k.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new U(k.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new U(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new U(k.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ge(t)}static emptyPath(){return new ge([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.path=e}static fromPath(e){return new F(re.fromString(e))}static fromName(e){return new F(re.fromString(e).popFirst(5))}static empty(){return new F(re.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&re.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return re.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new F(new re(e.slice()))}}function Y_(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=$.fromTimestamp(r===1e9?new ue(t+1,0):new ue(t,r));return new Pt(s,F.empty(),e)}function J_(n){return new Pt(n.readTime,n.key,-1)}class Pt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Pt($.min(),F.empty(),-1)}static max(){return new Pt($.max(),F.empty(),-1)}}function X_(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=F.comparator(n.documentKey,e.documentKey),t!==0?t:Q(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z_="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ey{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sr(n){if(n.code!==k.FAILED_PRECONDITION||n.message!==Z_)throw n;x("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&j(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new C((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof C?t:C.resolve(t)}catch(t){return C.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):C.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):C.reject(t)}static resolve(e){return new C((t,r)=>{t(e)})}static reject(e){return new C((t,r)=>{r(e)})}static waitFor(e){return new C((t,r)=>{let s=0,i=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=C.resolve(!1);for(const r of e)t=t.next(s=>s?C.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new C((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next(p=>{a[d]=p,++l,l===i&&r(a)},p=>s(p))}})}static doWhile(e,t){return new C((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function ty(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Cr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Mo.oe=-1;function Ks(n){return n==null}function Is(n){return n===0&&1/n==-1/0}function ny(n){return typeof n=="number"&&Number.isInteger(n)&&!Is(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Pn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Ju(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e,t){this.comparator=e,this.root=t||me.EMPTY}insert(e,t){return new te(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,me.BLACK,null,null))}remove(e){return new te(this.comparator,this.root.remove(e,this.comparator).copy(null,null,me.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ns(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ns(this.root,e,this.comparator,!1)}getReverseIterator(){return new ns(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ns(this.root,e,this.comparator,!0)}}class ns{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class me{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??me.RED,this.left=s??me.EMPTY,this.right=i??me.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new me(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return me.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return me.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,me.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,me.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw j();const e=this.left.check();if(e!==this.right.check())throw j();return e+(this.isRed()?0:1)}}me.EMPTY=null,me.RED=!0,me.BLACK=!1;me.EMPTY=new class{constructor(){this.size=0}get key(){throw j()}get value(){throw j()}get color(){throw j()}get left(){throw j()}get right(){throw j()}copy(e,t,r,s,i){return this}insert(e,t,r){return new me(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(e){this.comparator=e,this.data=new te(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new nl(this.data.getIterator())}getIteratorFrom(e){return new nl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ye)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ye(this.comparator);return t.data=e,t}}class nl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e){this.fields=e,e.sort(ge.comparator)}static empty(){return new $e([])}unionWith(e){let t=new ye(ge.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new $e(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return mn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Xu("Invalid base64 string: "+i):i}}(e);return new ve(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new ve(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ve.EMPTY_BYTE_STRING=new ve("");const ry=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function St(n){if(J(!!n),typeof n=="string"){let e=0;const t=ry.exec(n);if(J(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ie(n.seconds),nanos:ie(n.nanos)}}function ie(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function zt(n){return typeof n=="string"?ve.fromBase64String(n):ve.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xo(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Uo(n){const e=n.mapValue.fields.__previous_value__;return xo(e)?Uo(e):e}function fr(n){const e=St(n.mapValue.fields.__local_write_time__.timestampValue);return new ue(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sy{constructor(e,t,r,s,i,a,l,u,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=d}}class pr{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new pr("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof pr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rs={mapValue:{}};function Gt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?xo(n)?4:oy(n)?9007199254740991:iy(n)?10:11:j()}function Qe(n,e){if(n===e)return!0;const t=Gt(n);if(t!==Gt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return fr(n).isEqual(fr(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=St(s.timestampValue),l=St(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return zt(s.bytesValue).isEqual(zt(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return ie(s.geoPointValue.latitude)===ie(i.geoPointValue.latitude)&&ie(s.geoPointValue.longitude)===ie(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return ie(s.integerValue)===ie(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ie(s.doubleValue),l=ie(i.doubleValue);return a===l?Is(a)===Is(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return mn(n.arrayValue.values||[],e.arrayValue.values||[],Qe);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(tl(a)!==tl(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!Qe(a[u],l[u])))return!1;return!0}(n,e);default:return j()}}function mr(n,e){return(n.values||[]).find(t=>Qe(t,e))!==void 0}function gn(n,e){if(n===e)return 0;const t=Gt(n),r=Gt(e);if(t!==r)return Q(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return Q(n.booleanValue,e.booleanValue);case 2:return function(i,a){const l=ie(i.integerValue||i.doubleValue),u=ie(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(n,e);case 3:return rl(n.timestampValue,e.timestampValue);case 4:return rl(fr(n),fr(e));case 5:return Q(n.stringValue,e.stringValue);case 6:return function(i,a){const l=zt(i),u=zt(a);return l.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const l=i.split("/"),u=a.split("/");for(let d=0;d<l.length&&d<u.length;d++){const p=Q(l[d],u[d]);if(p!==0)return p}return Q(l.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const l=Q(ie(i.latitude),ie(a.latitude));return l!==0?l:Q(ie(i.longitude),ie(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return sl(n.arrayValue,e.arrayValue);case 10:return function(i,a){var l,u,d,p;const y=i.fields||{},A=a.fields||{},S=(l=y.value)===null||l===void 0?void 0:l.arrayValue,D=(u=A.value)===null||u===void 0?void 0:u.arrayValue,V=Q(((d=S?.values)===null||d===void 0?void 0:d.length)||0,((p=D?.values)===null||p===void 0?void 0:p.length)||0);return V!==0?V:sl(S,D)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===rs.mapValue&&a===rs.mapValue)return 0;if(i===rs.mapValue)return 1;if(a===rs.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),d=a.fields||{},p=Object.keys(d);u.sort(),p.sort();for(let y=0;y<u.length&&y<p.length;++y){const A=Q(u[y],p[y]);if(A!==0)return A;const S=gn(l[u[y]],d[p[y]]);if(S!==0)return S}return Q(u.length,p.length)}(n.mapValue,e.mapValue);default:throw j()}}function rl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Q(n,e);const t=St(n),r=St(e),s=Q(t.seconds,r.seconds);return s!==0?s:Q(t.nanos,r.nanos)}function sl(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=gn(t[s],r[s]);if(i)return i}return Q(t.length,r.length)}function _n(n){return to(n)}function to(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=St(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return zt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return F.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=to(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${to(t.fields[a])}`;return s+"}"}(n.mapValue):j()}function no(n){return!!n&&"integerValue"in n}function Fo(n){return!!n&&"arrayValue"in n}function il(n){return!!n&&"nullValue"in n}function ol(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function hs(n){return!!n&&"mapValue"in n}function iy(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function rr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Pn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=rr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=rr(n.arrayValue.values[t]);return e}return Object.assign({},n)}function oy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.value=e}static empty(){return new xe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!hs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=rr(t)}setAll(e){let t=ge.emptyPath(),r={},s=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=rr(a):s.push(l.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());hs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Qe(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];hs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Pn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new xe(rr(this.value))}}function Zu(n){const e=[];return Pn(n.fields,(t,r)=>{const s=new ge([t]);if(hs(r)){const i=Zu(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new $e(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e,t,r,s,i,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new Pe(e,0,$.min(),$.min(),$.min(),xe.empty(),0)}static newFoundDocument(e,t,r,s){return new Pe(e,1,t,$.min(),r,s,0)}static newNoDocument(e,t){return new Pe(e,2,t,$.min(),$.min(),xe.empty(),0)}static newUnknownDocument(e,t){return new Pe(e,3,t,$.min(),$.min(),xe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual($.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=xe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=xe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=$.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Pe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Pe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e,t){this.position=e,this.inclusive=t}}function al(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=F.comparator(F.fromName(a.referenceValue),t.key):r=gn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function cl(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Qe(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(e,t="asc"){this.field=e,this.dir=t}}function ay(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{}class le extends eh{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new ly(e,t,r):t==="array-contains"?new dy(e,r):t==="in"?new fy(e,r):t==="not-in"?new py(e,r):t==="array-contains-any"?new my(e,r):new le(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new uy(e,r):new hy(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(gn(t,this.value)):t!==null&&Gt(this.value)===Gt(t)&&this.matchesComparison(gn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return j()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ye extends eh{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new Ye(e,t)}matches(e){return th(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function th(n){return n.op==="and"}function nh(n){return cy(n)&&th(n)}function cy(n){for(const e of n.filters)if(e instanceof Ye)return!1;return!0}function ro(n){if(n instanceof le)return n.field.canonicalString()+n.op.toString()+_n(n.value);if(nh(n))return n.filters.map(e=>ro(e)).join(",");{const e=n.filters.map(t=>ro(t)).join(",");return`${n.op}(${e})`}}function rh(n,e){return n instanceof le?function(r,s){return s instanceof le&&r.op===s.op&&r.field.isEqual(s.field)&&Qe(r.value,s.value)}(n,e):n instanceof Ye?function(r,s){return s instanceof Ye&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,l)=>i&&rh(a,s.filters[l]),!0):!1}(n,e):void j()}function sh(n){return n instanceof le?function(t){return`${t.field.canonicalString()} ${t.op} ${_n(t.value)}`}(n):n instanceof Ye?function(t){return t.op.toString()+" {"+t.getFilters().map(sh).join(" ,")+"}"}(n):"Filter"}class ly extends le{constructor(e,t,r){super(e,t,r),this.key=F.fromName(r.referenceValue)}matches(e){const t=F.comparator(e.key,this.key);return this.matchesComparison(t)}}class uy extends le{constructor(e,t){super(e,"in",t),this.keys=ih("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class hy extends le{constructor(e,t){super(e,"not-in",t),this.keys=ih("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function ih(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>F.fromName(r.referenceValue))}class dy extends le{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Fo(t)&&mr(t.arrayValue,this.value)}}class fy extends le{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&mr(this.value.arrayValue,t)}}class py extends le{constructor(e,t){super(e,"not-in",t)}matches(e){if(mr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!mr(this.value.arrayValue,t)}}class my extends le{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Fo(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>mr(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gy{constructor(e,t=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.ue=null}}function ll(n,e=null,t=[],r=[],s=null,i=null,a=null){return new gy(n,e,t,r,s,i,a)}function Bo(n){const e=q(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>ro(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Ks(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>_n(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>_n(r)).join(",")),e.ue=t}return e.ue}function jo(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!ay(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!rh(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!cl(n.startAt,e.startAt)&&cl(n.endAt,e.endAt)}function so(n){return F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(e,t=null,r=[],s=[],i=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function _y(n,e,t,r,s,i,a,l){return new Qs(n,e,t,r,s,i,a,l)}function $o(n){return new Qs(n)}function ul(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function yy(n){return n.collectionGroup!==null}function sr(n){const e=q(n);if(e.ce===null){e.ce=[];const t=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new ye(ge.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(l=l.add(d.field))})}),l})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.ce.push(new Rs(i,r))}),t.has(ge.keyField().canonicalString())||e.ce.push(new Rs(ge.keyField(),r))}return e.ce}function ze(n){const e=q(n);return e.le||(e.le=vy(e,sr(n))),e.le}function vy(n,e){if(n.limitType==="F")return ll(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Rs(s.field,i)});const t=n.endAt?new As(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new As(n.startAt.position,n.startAt.inclusive):null;return ll(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function io(n,e,t){return new Qs(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Ys(n,e){return jo(ze(n),ze(e))&&n.limitType===e.limitType}function oh(n){return`${Bo(ze(n))}|lt:${n.limitType}`}function tn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>sh(s)).join(", ")}]`),Ks(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>_n(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>_n(s)).join(",")),`Target(${r})`}(ze(n))}; limitType=${n.limitType})`}function Js(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):F.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of sr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,l,u){const d=al(a,l,u);return a.inclusive?d<=0:d<0}(r.startAt,sr(r),s)||r.endAt&&!function(a,l,u){const d=al(a,l,u);return a.inclusive?d>=0:d>0}(r.endAt,sr(r),s))}(n,e)}function Ey(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function ah(n){return(e,t)=>{let r=!1;for(const s of sr(n)){const i=wy(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function wy(n,e,t){const r=n.field.isKeyField()?F.comparator(e.key,t.key):function(i,a,l){const u=a.data.field(i),d=l.data.field(i);return u!==null&&d!==null?gn(u,d):j()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return j()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Pn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Ju(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ty=new te(F.comparator);function lt(){return Ty}const ch=new te(F.comparator);function Xn(...n){let e=ch;for(const t of n)e=e.insert(t.key,t);return e}function lh(n){let e=ch;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Ut(){return ir()}function uh(){return ir()}function ir(){return new Sn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Iy=new te(F.comparator),Ay=new ye(F.comparator);function W(...n){let e=Ay;for(const t of n)e=e.add(t);return e}const Ry=new ye(Q);function by(){return Ry}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Is(e)?"-0":e}}function hh(n){return{integerValue:""+n}}function Py(n,e){return ny(e)?hh(e):qo(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(){this._=void 0}}function Sy(n,e,t){return n instanceof gr?function(s,i){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&xo(i)&&(i=Uo(i)),i&&(a.fields.__previous_value__=i),{mapValue:a}}(t,e):n instanceof _r?fh(n,e):n instanceof yr?ph(n,e):function(s,i){const a=dh(s,i),l=hl(a)+hl(s.Pe);return no(a)&&no(s.Pe)?hh(l):qo(s.serializer,l)}(n,e)}function Cy(n,e,t){return n instanceof _r?fh(n,e):n instanceof yr?ph(n,e):t}function dh(n,e){return n instanceof bs?function(r){return no(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class gr extends Xs{}class _r extends Xs{constructor(e){super(),this.elements=e}}function fh(n,e){const t=mh(e);for(const r of n.elements)t.some(s=>Qe(s,r))||t.push(r);return{arrayValue:{values:t}}}class yr extends Xs{constructor(e){super(),this.elements=e}}function ph(n,e){let t=mh(e);for(const r of n.elements)t=t.filter(s=>!Qe(s,r));return{arrayValue:{values:t}}}class bs extends Xs{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function hl(n){return ie(n.integerValue||n.doubleValue)}function mh(n){return Fo(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ky{constructor(e,t){this.field=e,this.transform=t}}function Dy(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof _r&&s instanceof _r||r instanceof yr&&s instanceof yr?mn(r.elements,s.elements,Qe):r instanceof bs&&s instanceof bs?Qe(r.Pe,s.Pe):r instanceof gr&&s instanceof gr}(n.transform,e.transform)}class Ny{constructor(e,t){this.version=e,this.transformResults=t}}class st{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new st}static exists(e){return new st(void 0,e)}static updateTime(e){return new st(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ds(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Zs{}function gh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new yh(n.key,st.none()):new kr(n.key,n.data,st.none());{const t=n.data,r=xe.empty();let s=new ye(ge.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Qt(n.key,r,new $e(s.toArray()),st.none())}}function Oy(n,e,t){n instanceof kr?function(s,i,a){const l=s.value.clone(),u=fl(s.fieldTransforms,i,a.transformResults);l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof Qt?function(s,i,a){if(!ds(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=fl(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(_h(s)),u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function or(n,e,t,r){return n instanceof kr?function(i,a,l,u){if(!ds(i.precondition,a))return l;const d=i.value.clone(),p=pl(i.fieldTransforms,u,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof Qt?function(i,a,l,u){if(!ds(i.precondition,a))return l;const d=pl(i.fieldTransforms,u,a),p=a.data;return p.setAll(_h(i)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(y=>y.field))}(n,e,t,r):function(i,a,l){return ds(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function Vy(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=dh(r.transform,s||null);i!=null&&(t===null&&(t=xe.empty()),t.set(r.field,i))}return t||null}function dl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&mn(r,s,(i,a)=>Dy(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class kr extends Zs{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Qt extends Zs{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function _h(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function fl(n,e,t){const r=new Map;J(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,Cy(a,l,t[s]))}return r}function pl(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Sy(i,a,e))}return r}class yh extends Zs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Ly extends Zs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class My{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Oy(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=or(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=or(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=uh();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=t.has(s.key)?null:l;const u=gh(a,l);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument($.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),W())}isEqual(e){return this.batchId===e.batchId&&mn(this.mutations,e.mutations,(t,r)=>dl(t,r))&&mn(this.baseMutations,e.baseMutations,(t,r)=>dl(t,r))}}class Wo{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){J(e.mutations.length===r.length);let s=function(){return Iy}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Wo(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xy{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uy{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oe,z;function Fy(n){switch(n){default:return j();case k.CANCELLED:case k.UNKNOWN:case k.DEADLINE_EXCEEDED:case k.RESOURCE_EXHAUSTED:case k.INTERNAL:case k.UNAVAILABLE:case k.UNAUTHENTICATED:return!1;case k.INVALID_ARGUMENT:case k.NOT_FOUND:case k.ALREADY_EXISTS:case k.PERMISSION_DENIED:case k.FAILED_PRECONDITION:case k.ABORTED:case k.OUT_OF_RANGE:case k.UNIMPLEMENTED:case k.DATA_LOSS:return!0}}function vh(n){if(n===void 0)return ct("GRPC error has no .code"),k.UNKNOWN;switch(n){case oe.OK:return k.OK;case oe.CANCELLED:return k.CANCELLED;case oe.UNKNOWN:return k.UNKNOWN;case oe.DEADLINE_EXCEEDED:return k.DEADLINE_EXCEEDED;case oe.RESOURCE_EXHAUSTED:return k.RESOURCE_EXHAUSTED;case oe.INTERNAL:return k.INTERNAL;case oe.UNAVAILABLE:return k.UNAVAILABLE;case oe.UNAUTHENTICATED:return k.UNAUTHENTICATED;case oe.INVALID_ARGUMENT:return k.INVALID_ARGUMENT;case oe.NOT_FOUND:return k.NOT_FOUND;case oe.ALREADY_EXISTS:return k.ALREADY_EXISTS;case oe.PERMISSION_DENIED:return k.PERMISSION_DENIED;case oe.FAILED_PRECONDITION:return k.FAILED_PRECONDITION;case oe.ABORTED:return k.ABORTED;case oe.OUT_OF_RANGE:return k.OUT_OF_RANGE;case oe.UNIMPLEMENTED:return k.UNIMPLEMENTED;case oe.DATA_LOSS:return k.DATA_LOSS;default:return j()}}(z=oe||(oe={}))[z.OK=0]="OK",z[z.CANCELLED=1]="CANCELLED",z[z.UNKNOWN=2]="UNKNOWN",z[z.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",z[z.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",z[z.NOT_FOUND=5]="NOT_FOUND",z[z.ALREADY_EXISTS=6]="ALREADY_EXISTS",z[z.PERMISSION_DENIED=7]="PERMISSION_DENIED",z[z.UNAUTHENTICATED=16]="UNAUTHENTICATED",z[z.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",z[z.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",z[z.ABORTED=10]="ABORTED",z[z.OUT_OF_RANGE=11]="OUT_OF_RANGE",z[z.UNIMPLEMENTED=12]="UNIMPLEMENTED",z[z.INTERNAL=13]="INTERNAL",z[z.UNAVAILABLE=14]="UNAVAILABLE",z[z.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function By(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jy=new Bt([4294967295,4294967295],0);function ml(n){const e=By().encode(n),t=new qu;return t.update(e),new Uint8Array(t.digest())}function gl(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Bt([t,r],0),new Bt([s,i],0)]}class Ho{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Zn(`Invalid padding: ${t}`);if(r<0)throw new Zn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Zn(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Zn(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Bt.fromNumber(this.Ie)}Ee(e,t,r){let s=e.add(t.multiply(Bt.fromNumber(r)));return s.compare(jy)===1&&(s=new Bt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=ml(e),[r,s]=gl(t);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);if(!this.de(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Ho(i,s,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.Ie===0)return;const t=ml(e),[r,s]=gl(t);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);this.Ae(a)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Zn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Dr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ei($.min(),s,new te(Q),lt(),W())}}class Dr{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Dr(r,t,W(),W(),W())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs{constructor(e,t,r,s){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=s}}class Eh{constructor(e,t){this.targetId=e,this.me=t}}class wh{constructor(e,t,r=ve.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class _l{constructor(){this.fe=0,this.ge=vl(),this.pe=ve.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=W(),t=W(),r=W();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:j()}}),new Dr(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=vl()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,J(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class $y{constructor(e){this.Le=e,this.Be=new Map,this.ke=lt(),this.qe=yl(),this.Qe=new te(Q)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:j()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,s)=>{this.ze(s)&&t(s)})}He(e){const t=e.targetId,r=e.me.count,s=this.Je(t);if(s){const i=s.target;if(so(i))if(r===0){const a=new F(i.path);this.Ue(t,a,Pe.newNoDocument(a,$.min()))}else J(r===1);else{const a=this.Ye(t);if(a!==r){const l=this.Ze(e),u=l?this.Xe(l,e,a):1;if(u!==0){this.je(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,d)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,l;try{a=zt(r).toUint8Array()}catch(u){if(u instanceof Xu)return pn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Ho(a,s,i)}catch(u){return pn(u instanceof Zn?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.Le.tt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(t,i,null),s++)}),s}rt(e){const t=new Map;this.Be.forEach((i,a)=>{const l=this.Je(a);if(l){if(i.current&&so(l.target)){const u=new F(l.target.path);this.ke.get(u)!==null||this.it(a,u)||this.Ue(a,u,Pe.newNoDocument(u,e))}i.be&&(t.set(a,i.ve()),i.Ce())}});let r=W();this.qe.forEach((i,a)=>{let l=!0;a.forEachWhile(u=>{const d=this.Je(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ke.forEach((i,a)=>a.setReadTime(e));const s=new ei(e,t,this.Qe,this.ke,r);return this.ke=lt(),this.qe=yl(),this.Qe=new te(Q),s}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,t)?s.Fe(t,1):s.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new _l,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new ye(Q),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||x("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new _l),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function yl(){return new te(F.comparator)}function vl(){return new te(F.comparator)}const qy={asc:"ASCENDING",desc:"DESCENDING"},Wy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Hy={and:"AND",or:"OR"};class zy{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function oo(n,e){return n.useProto3Json||Ks(e)?e:{value:e}}function Ps(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Th(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Gy(n,e){return Ps(n,e.toTimestamp())}function Ge(n){return J(!!n),$.fromTimestamp(function(t){const r=St(t);return new ue(r.seconds,r.nanos)}(n))}function zo(n,e){return ao(n,e).canonicalString()}function ao(n,e){const t=function(s){return new re(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Ih(n){const e=re.fromString(n);return J(Sh(e)),e}function co(n,e){return zo(n.databaseId,e.path)}function Bi(n,e){const t=Ih(e);if(t.get(1)!==n.databaseId.projectId)throw new U(k.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(k.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new F(Rh(t))}function Ah(n,e){return zo(n.databaseId,e)}function Ky(n){const e=Ih(n);return e.length===4?re.emptyPath():Rh(e)}function lo(n){return new re(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Rh(n){return J(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function El(n,e,t){return{name:co(n,e),fields:t.value.mapValue.fields}}function Qy(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:j()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,p){return d.useProto3Json?(J(p===void 0||typeof p=="string"),ve.fromBase64String(p||"")):(J(p===void 0||p instanceof Buffer||p instanceof Uint8Array),ve.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(d){const p=d.code===void 0?k.UNKNOWN:vh(d.code);return new U(p,d.message||"")}(a);t=new wh(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Bi(n,r.document.name),i=Ge(r.document.updateTime),a=r.document.createTime?Ge(r.document.createTime):$.min(),l=new xe({mapValue:{fields:r.document.fields}}),u=Pe.newFoundDocument(s,i,a,l),d=r.targetIds||[],p=r.removedTargetIds||[];t=new fs(d,p,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Bi(n,r.document),i=r.readTime?Ge(r.readTime):$.min(),a=Pe.newNoDocument(s,i),l=r.removedTargetIds||[];t=new fs([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Bi(n,r.document),i=r.removedTargetIds||[];t=new fs([],i,s,null)}else{if(!("filter"in e))return j();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new Uy(s,i),l=r.targetId;t=new Eh(l,a)}}return t}function Yy(n,e){let t;if(e instanceof kr)t={update:El(n,e.key,e.value)};else if(e instanceof yh)t={delete:co(n,e.key)};else if(e instanceof Qt)t={update:El(n,e.key,e.data),updateMask:iv(e.fieldMask)};else{if(!(e instanceof Ly))return j();t={verify:co(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const l=a.transform;if(l instanceof gr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof _r)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof yr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof bs)return{fieldPath:a.field.canonicalString(),increment:l.Pe};throw j()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:Gy(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:j()}(n,e.precondition)),t}function Jy(n,e){return n&&n.length>0?(J(e!==void 0),n.map(t=>function(s,i){let a=s.updateTime?Ge(s.updateTime):Ge(i);return a.isEqual($.min())&&(a=Ge(i)),new Ny(a,s.transformResults||[])}(t,e))):[]}function Xy(n,e){return{documents:[Ah(n,e.path)]}}function Zy(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Ah(n,s);const i=function(d){if(d.length!==0)return Ph(Ye.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(p=>function(A){return{field:nn(A.field),direction:nv(A.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=oo(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{_t:t,parent:s}}function ev(n){let e=Ky(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){J(r===1);const p=t.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];t.where&&(i=function(y){const A=bh(y);return A instanceof Ye&&nh(A)?A.getFilters():[A]}(t.where));let a=[];t.orderBy&&(a=function(y){return y.map(A=>function(D){return new Rs(rn(D.field),function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(A))}(t.orderBy));let l=null;t.limit&&(l=function(y){let A;return A=typeof y=="object"?y.value:y,Ks(A)?null:A}(t.limit));let u=null;t.startAt&&(u=function(y){const A=!!y.before,S=y.values||[];return new As(S,A)}(t.startAt));let d=null;return t.endAt&&(d=function(y){const A=!y.before,S=y.values||[];return new As(S,A)}(t.endAt)),_y(e,s,a,i,l,"F",u,d)}function tv(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return j()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function bh(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=rn(t.unaryFilter.field);return le.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=rn(t.unaryFilter.field);return le.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=rn(t.unaryFilter.field);return le.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=rn(t.unaryFilter.field);return le.create(a,"!=",{nullValue:"NULL_VALUE"});default:return j()}}(n):n.fieldFilter!==void 0?function(t){return le.create(rn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return j()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ye.create(t.compositeFilter.filters.map(r=>bh(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return j()}}(t.compositeFilter.op))}(n):j()}function nv(n){return qy[n]}function rv(n){return Wy[n]}function sv(n){return Hy[n]}function nn(n){return{fieldPath:n.canonicalString()}}function rn(n){return ge.fromServerFormat(n.fieldPath)}function Ph(n){return n instanceof le?function(t){if(t.op==="=="){if(ol(t.value))return{unaryFilter:{field:nn(t.field),op:"IS_NAN"}};if(il(t.value))return{unaryFilter:{field:nn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ol(t.value))return{unaryFilter:{field:nn(t.field),op:"IS_NOT_NAN"}};if(il(t.value))return{unaryFilter:{field:nn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:nn(t.field),op:rv(t.op),value:t.value}}}(n):n instanceof Ye?function(t){const r=t.getFilters().map(s=>Ph(s));return r.length===1?r[0]:{compositeFilter:{op:sv(t.op),filters:r}}}(n):j()}function iv(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Sh(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e,t,r,s,i=$.min(),a=$.min(),l=ve.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new wt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new wt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new wt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new wt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ov{constructor(e){this.ct=e}}function av(n){const e=ev({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?io(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cv{constructor(){this.un=new lv}addToCollectionParentIndex(e,t){return this.un.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(Pt.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(Pt.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}}class lv{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ye(re.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ye(re.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new yn(0)}static kn(){return new yn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uv{constructor(){this.changes=new Sn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Pe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hv{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dv{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&or(r.mutation,s,$e.empty(),ue.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,W()).next(()=>r))}getLocalViewOfDocuments(e,t,r=W()){const s=Ut();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=Xn();return i.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Ut();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,W()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,s){let i=lt();const a=ir(),l=function(){return ir()}();return t.forEach((u,d)=>{const p=r.get(d.key);s.has(d.key)&&(p===void 0||p.mutation instanceof Qt)?i=i.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),or(p.mutation,d,p.mutation.getFieldMask(),ue.now())):a.set(d.key,$e.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>{var y;return l.set(d,new hv(p,(y=a.get(d))!==null&&y!==void 0?y:null))}),l))}recalculateAndSaveOverlays(e,t){const r=ir();let s=new te((a,l)=>a-l),i=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let p=r.get(u)||$e.empty();p=l.applyToLocalView(d,p),r.set(u,p);const y=(s.get(l.batchId)||W()).add(u);s=s.insert(l.batchId,y)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),d=u.key,p=u.value,y=uh();p.forEach(A=>{if(!i.has(A)){const S=gh(t.get(A),r.get(A));S!==null&&y.set(A,S),i=i.add(A)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,y))}return C.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return F.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):yy(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):C.resolve(Ut());let l=-1,u=i;return a.next(d=>C.forEach(d,(p,y)=>(l<y.largestBatchId&&(l=y.largestBatchId),i.get(p)?C.resolve():this.remoteDocumentCache.getEntry(e,p).next(A=>{u=u.insert(p,A)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,W())).next(p=>({batchId:l,changes:lh(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new F(t)).next(r=>{let s=Xn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Xn();return this.indexManager.getCollectionParents(e,i).next(l=>C.forEach(l,u=>{const d=function(y,A){return new Qs(A,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(p=>{p.forEach((y,A)=>{a=a.insert(y,A)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,Pe.newInvalidDocument(p)))});let l=Xn();return a.forEach((u,d)=>{const p=i.get(u);p!==void 0&&or(p.mutation,d,$e.empty(),ue.now()),Js(t,d)&&(l=l.insert(u,d))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fv{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return C.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Ge(s.createTime)}}(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(s){return{name:s.name,query:av(s.bundledQuery),readTime:Ge(s.readTime)}}(t)),C.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pv{constructor(){this.overlays=new te(F.comparator),this.Ir=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Ut();return C.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.ht(e,t,i)}),C.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){const s=Ut(),i=t.length+1,a=new F(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return C.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new te((d,p)=>d-p);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=i.get(d.largestBatchId);p===null&&(p=Ut(),i=i.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const l=Ut(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,p)=>l.set(d,p)),!(l.size()>=s)););return C.resolve(l)}ht(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new xy(t,r));let i=this.Ir.get(t);i===void 0&&(i=W(),this.Ir.set(t,i)),this.Ir.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mv{constructor(){this.sessionToken=ve.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Go{constructor(){this.Tr=new ye(fe.Er),this.dr=new ye(fe.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new fe(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new fe(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new F(new re([])),r=new fe(t,e),s=new fe(t,e+1),i=[];return this.dr.forEachInRange([r,s],a=>{this.Vr(a),i.push(a.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new F(new re([])),r=new fe(t,e),s=new fe(t,e+1);let i=W();return this.dr.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new fe(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class fe{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return F.comparator(e.key,t.key)||Q(e.wr,t.wr)}static Ar(e,t){return Q(e.wr,t.wr)||F.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gv{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new ye(fe.Er)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new My(i,t,r,s);this.mutationQueue.push(a);for(const l of s)this.br=this.br.add(new fe(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return C.resolve(a)}lookupMutationBatch(e,t){return C.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.vr(r),i=s<0?0:s;return C.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new fe(t,0),s=new fe(t,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],a=>{const l=this.Dr(a.wr);i.push(l)}),C.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ye(Q);return t.forEach(s=>{const i=new fe(s,0),a=new fe(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,a],l=>{r=r.add(l.wr)})}),C.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;F.isDocumentKey(i)||(i=i.child(""));const a=new fe(new F(i),0);let l=new ye(Q);return this.br.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(u.wr)),!0)},a),C.resolve(this.Cr(l))}Cr(e){const t=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){J(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return C.forEach(t.mutations,s=>{const i=new fe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new fe(t,0),s=this.br.firstAfterOrEqual(r);return C.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _v{constructor(e){this.Mr=e,this.docs=function(){return new te(F.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():Pe.newInvalidDocument(t))}getEntries(e,t){let r=lt();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Pe.newInvalidDocument(s))}),C.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=lt();const a=t.path,l=new F(a.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:d,value:{document:p}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||X_(J_(p),r)<=0||(s.has(p.key)||Js(t,p))&&(i=i.insert(p.key,p.mutableCopy()))}return C.resolve(i)}getAllFromCollectionGroup(e,t,r,s){j()}Or(e,t){return C.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new yv(this)}getSize(e){return C.resolve(this.size)}}class yv extends uv{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),C.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vv{constructor(e){this.persistence=e,this.Nr=new Sn(t=>Bo(t),jo),this.lastRemoteSnapshotVersion=$.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Go,this.targetCount=0,this.kr=yn.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,s)=>t(s)),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),C.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new yn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.Kn(t),C.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Nr.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.Nr.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),C.waitFor(i).next(()=>s)}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),C.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),C.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),C.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ev{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Mo(0),this.Kr=!1,this.Kr=!0,this.$r=new mv,this.referenceDelegate=e(this),this.Ur=new vv(this),this.indexManager=new cv,this.remoteDocumentCache=function(s){return new _v(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new ov(t),this.Gr=new fv(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new pv,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new gv(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){x("MemoryPersistence","Starting transaction:",e);const s=new wv(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,t){return C.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class wv extends ey{constructor(e){super(),this.currentSequenceNumber=e}}class Ko{constructor(e){this.persistence=e,this.Jr=new Go,this.Yr=null}static Zr(e){return new Ko(e)}get Xr(){if(this.Yr)return this.Yr;throw j()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),C.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.Xr,r=>{const s=F.fromPath(r);return this.ei(e,s).next(i=>{i||t.removeEntry(s,$.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return C.or([()=>C.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=s}static Wi(e,t){let r=W(),s=W();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Qo(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iv{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return Nf()?8:ty(Se())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.Yi(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.Zi(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Tv;return this.Xi(e,t,a).next(l=>{if(i.result=l,this.zi)return this.es(e,t,a,l.size)})}).next(()=>i.result)}es(e,t,r,s){return r.documentReadCount<this.ji?(Gn()<=H.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",tn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),C.resolve()):(Gn()<=H.DEBUG&&x("QueryEngine","Query:",tn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(Gn()<=H.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",tn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ze(t))):C.resolve())}Yi(e,t){if(ul(t))return C.resolve(null);let r=ze(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=io(t,null,"F"),r=ze(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=W(...i);return this.Ji.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.ts(t,l);return this.ns(t,d,a,u.readTime)?this.Yi(e,io(t,null,"F")):this.rs(e,d,t,u)}))})))}Zi(e,t,r,s){return ul(t)||s.isEqual($.min())?C.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const a=this.ts(t,i);return this.ns(t,a,r,s)?C.resolve(null):(Gn()<=H.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),tn(t)),this.rs(e,a,t,Y_(s,-1)).next(l=>l))})}ts(e,t){let r=new ye(ah(e));return t.forEach((s,i)=>{Js(e,i)&&(r=r.add(i))}),r}ns(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,t,r){return Gn()<=H.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",tn(t)),this.Ji.getDocumentsMatchingQuery(e,t,Pt.min(),r)}rs(e,t,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Av{constructor(e,t,r,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new te(Q),this._s=new Sn(i=>Bo(i),jo),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new dv(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function Rv(n,e,t,r){return new Av(n,e,t,r)}async function Ch(n,e){const t=q(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],l=[];let u=W();for(const d of s){a.push(d.batchId);for(const p of d.mutations)u=u.add(p.key)}for(const d of i){l.push(d.batchId);for(const p of d.mutations)u=u.add(p.key)}return t.localDocuments.getDocuments(r,u).next(d=>({hs:d,removedBatchIds:a,addedBatchIds:l}))})})}function bv(n,e){const t=q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,d,p){const y=d.batch,A=y.keys();let S=C.resolve();return A.forEach(D=>{S=S.next(()=>p.getEntry(u,D)).next(V=>{const P=d.docVersions.get(D);J(P!==null),V.version.compareTo(P)<0&&(y.applyToRemoteDocument(V,d),V.isValidDocument()&&(V.setReadTime(d.commitVersion),p.addEntry(V)))})}),S.next(()=>l.mutationQueue.removeMutationBatch(u,y))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=W();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(u=u.add(l.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function kh(n){const e=q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function Pv(n,e){const t=q(n),r=e.snapshotVersion;let s=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.cs.newChangeBuffer({trackRemovals:!0});s=t.os;const l=[];e.targetChanges.forEach((p,y)=>{const A=s.get(y);if(!A)return;l.push(t.Ur.removeMatchingKeys(i,p.removedDocuments,y).next(()=>t.Ur.addMatchingKeys(i,p.addedDocuments,y)));let S=A.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(y)!==null?S=S.withResumeToken(ve.EMPTY_BYTE_STRING,$.min()).withLastLimboFreeSnapshotVersion($.min()):p.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(p.resumeToken,r)),s=s.insert(y,S),function(V,P,M){return V.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=3e8?!0:M.addedDocuments.size+M.modifiedDocuments.size+M.removedDocuments.size>0}(A,S,p)&&l.push(t.Ur.updateTargetData(i,S))});let u=lt(),d=W();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,p))}),l.push(Sv(i,a,e.documentUpdates).next(p=>{u=p.Ps,d=p.Is})),!r.isEqual($.min())){const p=t.Ur.getLastRemoteSnapshotVersion(i).next(y=>t.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(p)}return C.waitFor(l).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.os=s,i))}function Sv(n,e,t){let r=W(),s=W();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=lt();return t.forEach((l,u)=>{const d=i.get(l);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual($.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):x("LocalStore","Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",u.version)}),{Ps:a,Is:s}})}function Cv(n,e){const t=q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function kv(n,e){const t=q(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Ur.getTargetData(r,e).next(i=>i?(s=i,C.resolve(s)):t.Ur.allocateTargetId(r).next(a=>(s=new wt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r})}async function uo(n,e,t){const r=q(n),s=r.os.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Cr(a))throw a;x("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function wl(n,e,t){const r=q(n);let s=$.min(),i=W();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,p){const y=q(u),A=y._s.get(p);return A!==void 0?C.resolve(y.os.get(A)):y.Ur.getTargetData(d,p)}(r,a,ze(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(a,l.targetId).next(u=>{i=u})}).next(()=>r.ss.getDocumentsMatchingQuery(a,e,t?s:$.min(),t?i:W())).next(l=>(Dv(r,Ey(e),l),{documents:l,Ts:i})))}function Dv(n,e,t){let r=n.us.get(e)||$.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.us.set(e,r)}class Tl{constructor(){this.activeTargetIds=by()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Nv{constructor(){this.so=new Tl,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Tl,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ov{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Il{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){x("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){x("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ss=null;function ji(){return ss===null?ss=function(){return 268435456+Math.round(2147483648*Math.random())}():ss++,"0x"+ss.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lv{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Re="WebChannelConnection";class Mv extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(t,r,s,i,a){const l=ji(),u=this.xo(t,r.toUriEncodedString());x("RestConnection",`Sending RPC '${t}' ${l}:`,u,s);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,i,a),this.No(t,u,d,s).then(p=>(x("RestConnection",`Received RPC '${t}' ${l}: `,p),p),p=>{throw pn("RestConnection",`RPC '${t}' ${l} failed with error: `,p,"url: ",u,"request:",s),p})}Lo(t,r,s,i,a,l){return this.Mo(t,r,s,i,a)}Oo(t,r,s){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+bn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,a)=>t[a]=i),s&&s.headers.forEach((i,a)=>t[a]=i)}xo(t,r){const s=Vv[t];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,s){const i=ji();return new Promise((a,l)=>{const u=new Wu;u.setWithCredentials(!0),u.listenOnce(Hu.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case us.NO_ERROR:const p=u.getResponseJson();x(Re,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(p)),a(p);break;case us.TIMEOUT:x(Re,`RPC '${e}' ${i} timed out`),l(new U(k.DEADLINE_EXCEEDED,"Request time out"));break;case us.HTTP_ERROR:const y=u.getStatus();if(x(Re,`RPC '${e}' ${i} failed with status:`,y,"response text:",u.getResponseText()),y>0){let A=u.getResponseJson();Array.isArray(A)&&(A=A[0]);const S=A?.error;if(S&&S.status&&S.message){const D=function(P){const M=P.toLowerCase().replace(/_/g,"-");return Object.values(k).indexOf(M)>=0?M:k.UNKNOWN}(S.status);l(new U(D,S.message))}else l(new U(k.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new U(k.UNAVAILABLE,"Connection failed."));break;default:j()}}finally{x(Re,`RPC '${e}' ${i} completed.`)}});const d=JSON.stringify(s);x(Re,`RPC '${e}' ${i} sending request:`,s),u.send(t,"POST",d,r,15)})}Bo(e,t,r){const s=ji(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Ku(),l=Gu(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const p=i.join("");x(Re,`Creating RPC '${e}' stream ${s}: ${p}`,u);const y=a.createWebChannel(p,u);let A=!1,S=!1;const D=new Lv({Io:P=>{S?x(Re,`Not sending because RPC '${e}' stream ${s} is closed:`,P):(A||(x(Re,`Opening RPC '${e}' stream ${s} transport.`),y.open(),A=!0),x(Re,`RPC '${e}' stream ${s} sending:`,P),y.send(P))},To:()=>y.close()}),V=(P,M,B)=>{P.listen(M,L=>{try{B(L)}catch(G){setTimeout(()=>{throw G},0)}})};return V(y,Jn.EventType.OPEN,()=>{S||(x(Re,`RPC '${e}' stream ${s} transport opened.`),D.yo())}),V(y,Jn.EventType.CLOSE,()=>{S||(S=!0,x(Re,`RPC '${e}' stream ${s} transport closed`),D.So())}),V(y,Jn.EventType.ERROR,P=>{S||(S=!0,pn(Re,`RPC '${e}' stream ${s} transport errored:`,P),D.So(new U(k.UNAVAILABLE,"The operation could not be completed")))}),V(y,Jn.EventType.MESSAGE,P=>{var M;if(!S){const B=P.data[0];J(!!B);const L=B,G=L.error||((M=L[0])===null||M===void 0?void 0:M.error);if(G){x(Re,`RPC '${e}' stream ${s} received error:`,G);const se=G.status;let Z=function(g){const v=oe[g];if(v!==void 0)return vh(v)}(se),w=G.message;Z===void 0&&(Z=k.INTERNAL,w="Unknown error status: "+se+" with message "+G.message),S=!0,D.So(new U(Z,w)),y.close()}else x(Re,`RPC '${e}' stream ${s} received:`,B),D.bo(B)}}),V(l,zu.STAT_EVENT,P=>{P.stat===eo.PROXY?x(Re,`RPC '${e}' stream ${s} detected buffering proxy`):P.stat===eo.NOPROXY&&x(Re,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{D.wo()},0),D}}function $i(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ti(n){return new zy(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{constructor(e,t,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-r);s>0&&x("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nh{constructor(e,t,r,s,i,a,l,u){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Dh(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===k.RESOURCE_EXHAUSTED?(ct(t.toString()),ct("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===k.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===t&&this.P_(r,s)},r=>{e(()=>{const s=new U(k.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return x("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(x("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class xv extends Nh{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=Qy(this.serializer,e),r=function(i){if(!("targetChange"in i))return $.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?$.min():a.readTime?Ge(a.readTime):$.min()}(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=lo(this.serializer),t.addTarget=function(i,a){let l;const u=a.target;if(l=so(u)?{documents:Xy(i,u)}:{query:Zy(i,u)._t},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=Th(i,a.resumeToken);const d=oo(i,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo($.min())>0){l.readTime=Ps(i,a.snapshotVersion.toTimestamp());const d=oo(i,a.expectedCount);d!==null&&(l.expectedCount=d)}return l}(this.serializer,e);const r=tv(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=lo(this.serializer),t.removeTarget=e,this.a_(t)}}class Uv extends Nh{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return J(!!e.streamToken),this.lastStreamToken=e.streamToken,J(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){J(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=Jy(e.writeResults,e.commitTime),r=Ge(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=lo(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Yy(this.serializer,r))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fv extends class{}{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new U(k.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Mo(e,ao(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new U(k.UNKNOWN,i.toString())})}Lo(e,t,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Lo(e,ao(t,r),s,a,l,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new U(k.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class Bv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(ct(t),this.D_=!1):x("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jv{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(a=>{r.enqueueAndForget(async()=>{Yt(this)&&(x("RemoteStore","Restarting streams for network reachability change."),await async function(u){const d=q(u);d.L_.add(4),await Nr(d),d.q_.set("Unknown"),d.L_.delete(4),await ni(d)}(this))})}),this.q_=new Bv(r,s)}}async function ni(n){if(Yt(n))for(const e of n.B_)await e(!0)}async function Nr(n){for(const e of n.B_)await e(!1)}function Oh(n,e){const t=q(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),Zo(t)?Xo(t):Cn(t).r_()&&Jo(t,e))}function Yo(n,e){const t=q(n),r=Cn(t);t.N_.delete(e),r.r_()&&Vh(t,e),t.N_.size===0&&(r.r_()?r.o_():Yt(t)&&t.q_.set("Unknown"))}function Jo(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo($.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Cn(n).A_(e)}function Vh(n,e){n.Q_.xe(e),Cn(n).R_(e)}function Xo(n){n.Q_=new $y({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),Cn(n).start(),n.q_.v_()}function Zo(n){return Yt(n)&&!Cn(n).n_()&&n.N_.size>0}function Yt(n){return q(n).L_.size===0}function Lh(n){n.Q_=void 0}async function $v(n){n.q_.set("Online")}async function qv(n){n.N_.forEach((e,t)=>{Jo(n,e)})}async function Wv(n,e){Lh(n),Zo(n)?(n.q_.M_(e),Xo(n)):n.q_.set("Unknown")}async function Hv(n,e,t){if(n.q_.set("Online"),e instanceof wh&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.N_.delete(l),s.Q_.removeTarget(l))}(n,e)}catch(r){x("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ss(n,r)}else if(e instanceof fs?n.Q_.Ke(e):e instanceof Eh?n.Q_.He(e):n.Q_.We(e),!t.isEqual($.min()))try{const r=await kh(n.localStore);t.compareTo(r)>=0&&await function(i,a){const l=i.Q_.rt(a);return l.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const p=i.N_.get(d);p&&i.N_.set(d,p.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,d)=>{const p=i.N_.get(u);if(!p)return;i.N_.set(u,p.withResumeToken(ve.EMPTY_BYTE_STRING,p.snapshotVersion)),Vh(i,u);const y=new wt(p.target,u,d,p.sequenceNumber);Jo(i,y)}),i.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){x("RemoteStore","Failed to raise snapshot:",r),await Ss(n,r)}}async function Ss(n,e,t){if(!Cr(e))throw e;n.L_.add(1),await Nr(n),n.q_.set("Offline"),t||(t=()=>kh(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{x("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await ni(n)})}function Mh(n,e){return e().catch(t=>Ss(n,t,e))}async function ri(n){const e=q(n),t=Ct(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;zv(e);)try{const s=await Cv(e.localStore,r);if(s===null){e.O_.length===0&&t.o_();break}r=s.batchId,Gv(e,s)}catch(s){await Ss(e,s)}xh(e)&&Uh(e)}function zv(n){return Yt(n)&&n.O_.length<10}function Gv(n,e){n.O_.push(e);const t=Ct(n);t.r_()&&t.V_&&t.m_(e.mutations)}function xh(n){return Yt(n)&&!Ct(n).n_()&&n.O_.length>0}function Uh(n){Ct(n).start()}async function Kv(n){Ct(n).p_()}async function Qv(n){const e=Ct(n);for(const t of n.O_)e.m_(t.mutations)}async function Yv(n,e,t){const r=n.O_.shift(),s=Wo.from(r,e,t);await Mh(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await ri(n)}async function Jv(n,e){e&&Ct(n).V_&&await async function(r,s){if(function(a){return Fy(a)&&a!==k.ABORTED}(s.code)){const i=r.O_.shift();Ct(r).s_(),await Mh(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await ri(r)}}(n,e),xh(n)&&Uh(n)}async function Al(n,e){const t=q(n);t.asyncQueue.verifyOperationInProgress(),x("RemoteStore","RemoteStore received new credentials");const r=Yt(t);t.L_.add(3),await Nr(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await ni(t)}async function Xv(n,e){const t=q(n);e?(t.L_.delete(2),await ni(t)):e||(t.L_.add(2),await Nr(t),t.q_.set("Unknown"))}function Cn(n){return n.K_||(n.K_=function(t,r,s){const i=q(t);return i.w_(),new xv(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Eo:$v.bind(null,n),Ro:qv.bind(null,n),mo:Wv.bind(null,n),d_:Hv.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),Zo(n)?Xo(n):n.q_.set("Unknown")):(await n.K_.stop(),Lh(n))})),n.K_}function Ct(n){return n.U_||(n.U_=function(t,r,s){const i=q(t);return i.w_(),new Uv(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:Kv.bind(null,n),mo:Jv.bind(null,n),f_:Qv.bind(null,n),g_:Yv.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await ri(n)):(await n.U_.stop(),n.O_.length>0&&(x("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Rt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,l=new ea(e,t,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(k.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ta(n,e){if(ct("AsyncQueue",`${e}: ${n}`),Cr(n))return new U(k.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e){this.comparator=e?(t,r)=>e(t,r)||F.comparator(t.key,r.key):(t,r)=>F.comparator(t.key,r.key),this.keyedMap=Xn(),this.sortedSet=new te(this.comparator)}static emptySet(e){return new un(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof un)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new un;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(){this.W_=new te(F.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):j():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,r)=>{e.push(r)}),e}}class vn{constructor(e,t,r,s,i,a,l,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new vn(e,t,un.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ys(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zv{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class eE{constructor(){this.queries=bl(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const s=q(t),i=s.queries;s.queries=bl(),i.forEach((a,l)=>{for(const u of l.j_)u.onError(r)})})(this,new U(k.ABORTED,"Firestore shutting down"))}}function bl(){return new Sn(n=>oh(n),Ys)}async function tE(n,e){const t=q(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new Zv,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await t.onListen(s,!0);break;case 1:i.z_=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=ta(a,`Initialization of query '${tn(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.j_.push(e),e.Z_(t.onlineState),i.z_&&e.X_(i.z_)&&na(t)}async function nE(n,e){const t=q(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.j_.indexOf(e);a>=0&&(i.j_.splice(a,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function rE(n,e){const t=q(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const l of a.j_)l.X_(s)&&(r=!0);a.z_=s}}r&&na(t)}function sE(n,e,t){const r=q(n),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(t);r.queries.delete(e)}function na(n){n.Y_.forEach(e=>{e.next()})}var ho,Pl;(Pl=ho||(ho={})).ea="default",Pl.Cache="cache";class iE{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new vn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=vn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==ho.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fh{constructor(e){this.key=e}}class Bh{constructor(e){this.key=e}}class oE{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=W(),this.mutatedKeys=W(),this.Aa=ah(e),this.Ra=new un(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new Rl,s=t?t.Ra:this.Ra;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((p,y)=>{const A=s.get(p),S=Js(this.query,y)?y:null,D=!!A&&this.mutatedKeys.has(A.key),V=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let P=!1;A&&S?A.data.isEqual(S.data)?D!==V&&(r.track({type:3,doc:S}),P=!0):this.ga(A,S)||(r.track({type:2,doc:S}),P=!0,(u&&this.Aa(S,u)>0||d&&this.Aa(S,d)<0)&&(l=!0)):!A&&S?(r.track({type:0,doc:S}),P=!0):A&&!S&&(r.track({type:1,doc:A}),P=!0,(u||d)&&(l=!0)),P&&(S?(a=a.add(S),i=V?i.add(p):i.delete(p)):(a=a.delete(p),i=i.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),i=i.delete(p.key),r.track({type:1,doc:p})}return{Ra:a,fa:r,ns:l,mutatedKeys:i}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort((p,y)=>function(S,D){const V=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return j()}};return V(S)-V(D)}(p.type,y.type)||this.Aa(p.doc,y.doc)),this.pa(r),s=s!=null&&s;const l=t&&!s?this.ya():[],u=this.da.size===0&&this.current&&!s?1:0,d=u!==this.Ea;return this.Ea=u,a.length!==0||d?{snapshot:new vn(this.query,e.Ra,i,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Rl,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=W(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const t=[];return e.forEach(r=>{this.da.has(r)||t.push(new Bh(r))}),this.da.forEach(r=>{e.has(r)||t.push(new Fh(r))}),t}ba(e){this.Ta=e.Ts,this.da=W();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return vn.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class aE{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class cE{constructor(e){this.key=e,this.va=!1}}class lE{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new Sn(l=>oh(l),Ys),this.Ma=new Map,this.xa=new Set,this.Oa=new te(F.comparator),this.Na=new Map,this.La=new Go,this.Ba={},this.ka=new Map,this.qa=yn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function uE(n,e,t=!0){const r=zh(n);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await jh(r,e,t,!0),s}async function hE(n,e){const t=zh(n);await jh(t,e,!0,!1)}async function jh(n,e,t,r){const s=await kv(n.localStore,ze(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await dE(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Oh(n.remoteStore,s),l}async function dE(n,e,t,r,s){n.Ka=(y,A,S)=>async function(V,P,M,B){let L=P.view.ma(M);L.ns&&(L=await wl(V.localStore,P.query,!1).then(({documents:w})=>P.view.ma(w,L)));const G=B&&B.targetChanges.get(P.targetId),se=B&&B.targetMismatches.get(P.targetId)!=null,Z=P.view.applyChanges(L,V.isPrimaryClient,G,se);return Cl(V,P.targetId,Z.wa),Z.snapshot}(n,y,A,S);const i=await wl(n.localStore,e,!0),a=new oE(e,i.Ts),l=a.ma(i.documents),u=Dr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(l,n.isPrimaryClient,u);Cl(n,t,d.wa);const p=new aE(e,t,a);return n.Fa.set(e,p),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),d.snapshot}async function fE(n,e,t){const r=q(n),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(a=>!Ys(a,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await uo(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Yo(r.remoteStore,s.targetId),fo(r,s.targetId)}).catch(Sr)):(fo(r,s.targetId),await uo(r.localStore,s.targetId,!0))}async function pE(n,e){const t=q(n),r=t.Fa.get(e),s=t.Ma.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Yo(t.remoteStore,r.targetId))}async function mE(n,e,t){const r=TE(n);try{const s=await function(a,l){const u=q(a),d=ue.now(),p=l.reduce((S,D)=>S.add(D.key),W());let y,A;return u.persistence.runTransaction("Locally write mutations","readwrite",S=>{let D=lt(),V=W();return u.cs.getEntries(S,p).next(P=>{D=P,D.forEach((M,B)=>{B.isValidDocument()||(V=V.add(M))})}).next(()=>u.localDocuments.getOverlayedDocuments(S,D)).next(P=>{y=P;const M=[];for(const B of l){const L=Vy(B,y.get(B.key).overlayedDocument);L!=null&&M.push(new Qt(B.key,L,Zu(L.value.mapValue),st.exists(!0)))}return u.mutationQueue.addMutationBatch(S,d,M,l)}).next(P=>{A=P;const M=P.applyToLocalDocumentSet(y,V);return u.documentOverlayCache.saveOverlays(S,P.batchId,M)})}).then(()=>({batchId:A.batchId,changes:lh(y)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,u){let d=a.Ba[a.currentUser.toKey()];d||(d=new te(Q)),d=d.insert(l,u),a.Ba[a.currentUser.toKey()]=d}(r,s.batchId,t),await Or(r,s.changes),await ri(r.remoteStore)}catch(s){const i=ta(s,"Failed to persist write");t.reject(i)}}async function $h(n,e){const t=q(n);try{const r=await Pv(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Na.get(i);a&&(J(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?J(a.va):s.removedDocuments.size>0&&(J(a.va),a.va=!1))}),await Or(t,r,e)}catch(r){await Sr(r)}}function Sl(n,e,t){const r=q(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Fa.forEach((i,a)=>{const l=a.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(a,l){const u=q(a);u.onlineState=l;let d=!1;u.queries.forEach((p,y)=>{for(const A of y.j_)A.Z_(l)&&(d=!0)}),d&&na(u)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function gE(n,e,t){const r=q(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Na.get(e),i=s&&s.key;if(i){let a=new te(F.comparator);a=a.insert(i,Pe.newNoDocument(i,$.min()));const l=W().add(i),u=new ei($.min(),new Map,new te(Q),a,l);await $h(r,u),r.Oa=r.Oa.remove(i),r.Na.delete(e),ra(r)}else await uo(r.localStore,e,!1).then(()=>fo(r,e,t)).catch(Sr)}async function _E(n,e){const t=q(n),r=e.batch.batchId;try{const s=await bv(t.localStore,e);Wh(t,r,null),qh(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Or(t,s)}catch(s){await Sr(s)}}async function yE(n,e,t){const r=q(n);try{const s=await function(a,l){const u=q(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return u.mutationQueue.lookupMutationBatch(d,l).next(y=>(J(y!==null),p=y.keys(),u.mutationQueue.removeMutationBatch(d,y))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,p,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>u.localDocuments.getDocuments(d,p))})}(r.localStore,e);Wh(r,e,t),qh(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Or(r,s)}catch(s){await Sr(s)}}function qh(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function Wh(n,e,t){const r=q(n);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function fo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(r=>{n.La.containsKey(r)||Hh(n,r)})}function Hh(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(Yo(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),ra(n))}function Cl(n,e,t){for(const r of t)r instanceof Fh?(n.La.addReference(r.key,e),vE(n,r)):r instanceof Bh?(x("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||Hh(n,r.key)):j()}function vE(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||(x("SyncEngine","New document in limbo: "+t),n.xa.add(r),ra(n))}function ra(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new F(re.fromString(e)),r=n.qa.next();n.Na.set(r,new cE(t)),n.Oa=n.Oa.insert(t,r),Oh(n.remoteStore,new wt(ze($o(t.path)),r,"TargetPurposeLimboResolution",Mo.oe))}}async function Or(n,e,t){const r=q(n),s=[],i=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{a.push(r.Ka(u,e,t).then(d=>{var p;if((d||t)&&r.isPrimaryClient){const y=d?!d.fromCache:(p=t?.targetChanges.get(u.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(u.targetId,y?"current":"not-current")}if(d){s.push(d);const y=Qo.Wi(u.targetId,d);i.push(y)}}))}),await Promise.all(a),r.Ca.d_(s),await async function(u,d){const p=q(u);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",y=>C.forEach(d,A=>C.forEach(A.$i,S=>p.persistence.referenceDelegate.addReference(y,A.targetId,S)).next(()=>C.forEach(A.Ui,S=>p.persistence.referenceDelegate.removeReference(y,A.targetId,S)))))}catch(y){if(!Cr(y))throw y;x("LocalStore","Failed to update sequence numbers: "+y)}for(const y of d){const A=y.targetId;if(!y.fromCache){const S=p.os.get(A),D=S.snapshotVersion,V=S.withLastLimboFreeSnapshotVersion(D);p.os=p.os.insert(A,V)}}}(r.localStore,i))}async function EE(n,e){const t=q(n);if(!t.currentUser.isEqual(e)){x("SyncEngine","User change. New user:",e.toKey());const r=await Ch(t.localStore,e);t.currentUser=e,function(i,a){i.ka.forEach(l=>{l.forEach(u=>{u.reject(new U(k.CANCELLED,a))})}),i.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Or(t,r.hs)}}function wE(n,e){const t=q(n),r=t.Na.get(e);if(r&&r.va)return W().add(r.key);{let s=W();const i=t.Ma.get(e);if(!i)return s;for(const a of i){const l=t.Fa.get(a);s=s.unionWith(l.view.Va)}return s}}function zh(n){const e=q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=$h.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=wE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=gE.bind(null,e),e.Ca.d_=rE.bind(null,e.eventManager),e.Ca.$a=sE.bind(null,e.eventManager),e}function TE(n){const e=q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=_E.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=yE.bind(null,e),e}class Cs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ti(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Rv(this.persistence,new Iv,e.initialUser,this.serializer)}Ga(e){return new Ev(Ko.Zr,this.serializer)}Wa(e){return new Nv}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Cs.provider={build:()=>new Cs};class po{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Sl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=EE.bind(null,this.syncEngine),await Xv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new eE}()}createDatastore(e){const t=ti(e.databaseInfo.databaseId),r=function(i){return new Mv(i)}(e.databaseInfo);return function(i,a,l,u){return new Fv(i,a,l,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,l){return new jv(r,s,i,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Sl(this.syncEngine,t,0),function(){return Il.D()?new Il:new Ov}())}createSyncEngine(e,t){return function(s,i,a,l,u,d,p){const y=new lE(s,i,a,l,u,d);return p&&(y.Qa=!0),y}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=q(s);x("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await Nr(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}po.provider={build:()=>new po};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IE{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):ct("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AE{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=be.UNAUTHENTICATED,this.clientId=Yu.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{x("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(x("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Rt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=ta(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function qi(n,e){n.asyncQueue.verifyOperationInProgress(),x("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Ch(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function kl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await RE(n);x("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Al(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Al(e.remoteStore,s)),n._onlineComponents=e}async function RE(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){x("FirestoreClient","Using user provided OfflineComponentProvider");try{await qi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===k.FAILED_PRECONDITION||s.code===k.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;pn("Error using user provided cache. Falling back to memory cache: "+t),await qi(n,new Cs)}}else x("FirestoreClient","Using default OfflineComponentProvider"),await qi(n,new Cs);return n._offlineComponents}async function Gh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(x("FirestoreClient","Using user provided OnlineComponentProvider"),await kl(n,n._uninitializedComponentsProvider._online)):(x("FirestoreClient","Using default OnlineComponentProvider"),await kl(n,new po))),n._onlineComponents}function bE(n){return Gh(n).then(e=>e.syncEngine)}async function PE(n){const e=await Gh(n),t=e.eventManager;return t.onListen=uE.bind(null,e.syncEngine),t.onUnlisten=fE.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=hE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=pE.bind(null,e.syncEngine),t}function SE(n,e,t={}){const r=new Rt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,l,u,d){const p=new IE({next:A=>{p.Za(),a.enqueueAndForget(()=>nE(i,y));const S=A.docs.has(l);!S&&A.fromCache?d.reject(new U(k.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&A.fromCache&&u&&u.source==="server"?d.reject(new U(k.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(A)},error:A=>d.reject(A)}),y=new iE($o(l.path),p,{includeMetadataChanges:!0,_a:!0});return tE(i,y)}(await PE(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kh(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dl=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CE(n,e,t){if(!t)throw new U(k.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function kE(n,e,t,r){if(e===!0&&r===!0)throw new U(k.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Nl(n){if(!F.isDocumentKey(n))throw new U(k.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function sa(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":j()}function vr(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=sa(n);throw new U(k.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new U(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new U(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}kE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Kh((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new U(k.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new U(k.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new U(k.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ia{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ol({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ol(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new j_;switch(r.type){case"firstParty":return new H_(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Dl.get(t);r&&(x("ComponentProvider","Removing Datastore"),Dl.delete(t),r.terminate())}(this),Promise.resolve()}}function DE(n,e,t,r={}){var s;const i=(n=vr(n,ia))._getSettings(),a=`${e}:${t}`;if(i.host!=="firestore.googleapis.com"&&i.host!==a&&pn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},i),{host:a,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=be.MOCK_USER;else{l=Rf(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new U(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new be(d)}n._authCredentials=new $_(new Qu(l,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new oa(this.firestore,e,this._query)}}class Ue{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Er(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ue(this.firestore,e,this._key)}}class Er extends oa{constructor(e,t,r){super(e,t,$o(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ue(this.firestore,null,new F(e))}withConverter(e){return new Er(this.firestore,e,this._path)}}function NE(n,e,...t){if(n=Y(n),arguments.length===1&&(e=Yu.newId()),CE("doc","path",e),n instanceof ia){const r=re.fromString(e,...t);return Nl(r),new Ue(n,null,new F(r))}{if(!(n instanceof Ue||n instanceof Er))throw new U(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(re.fromString(e,...t));return Nl(r),new Ue(n.firestore,n instanceof Er?n.converter:null,new F(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Dh(this,"async_queue_retry"),this.Vu=()=>{const r=$i();r&&x("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=$i();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=$i();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new Rt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Cr(e))throw e;x("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(a){let l=a.message||"";return a.stack&&(l=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),l}(r);throw ct("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=ea.createAndSchedule(this,e,t,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&j()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class aa extends ia{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Vl,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Vl(e),this._firestoreClient=void 0,await e}}}function OE(n,e){const t=typeof n=="object"?n:Ql(),r=typeof n=="string"?n:"(default)",s=Ao(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=If("firestore");i&&DE(s,...i)}return s}function Qh(n){if(n._terminated)throw new U(k.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||VE(n),n._firestoreClient}function VE(n){var e,t,r;const s=n._freezeSettings(),i=function(l,u,d,p){return new sy(l,u,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Kh(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new AE(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(l){const u=l?._online.build();return{_offline:l?._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(e){this._byteString=e}static fromBase64String(e){try{return new En(ve.fromBase64String(e))}catch(t){throw new U(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new En(ve.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ge(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Q(this._lat,e._lat)||Q(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LE=/^__.*__$/;class ME{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Qt(e,this.data,this.fieldMask,t,this.fieldTransforms):new kr(e,this.data,t,this.fieldTransforms)}}function Yh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw j()}}class da{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new da(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return ks(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Yh(this.Cu)&&LE.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class xE{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ti(e)}Qu(e,t,r,s=!1){return new da({Cu:e,methodName:t,qu:r,path:ge.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function UE(n){const e=n._freezeSettings(),t=ti(n._databaseId);return new xE(n._databaseId,!!e.ignoreUndefinedProperties,t)}function FE(n,e,t,r,s,i={}){const a=n.Qu(i.merge||i.mergeFields?2:0,e,t,s);ed("Data must be an object, but it was:",a,r);const l=Xh(r,a);let u,d;if(i.merge)u=new $e(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const p=[];for(const y of i.mergeFields){const A=BE(e,y,t);if(!a.contains(A))throw new U(k.INVALID_ARGUMENT,`Field '${A}' is specified in your field mask but missing from your input data.`);$E(p,A)||p.push(A)}u=new $e(p),d=a.fieldTransforms.filter(y=>u.covers(y.field))}else u=null,d=a.fieldTransforms;return new ME(new xe(l),u,d)}class fa extends la{_toFieldTransform(e){return new ky(e.path,new gr)}isEqual(e){return e instanceof fa}}function Jh(n,e){if(Zh(n=Y(n)))return ed("Unsupported field value:",e,n),Xh(n,e);if(n instanceof la)return function(r,s){if(!Yh(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const l of r){let u=Jh(l,s.Lu(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Y(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Py(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ue.fromDate(r);return{timestampValue:Ps(s.serializer,i)}}if(r instanceof ue){const i=new ue(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ps(s.serializer,i)}}if(r instanceof ua)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof En)return{bytesValue:Th(s.serializer,r._byteString)};if(r instanceof Ue){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:zo(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof ha)return function(a,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return qo(l.serializer,u)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${sa(r)}`)}(n,e)}function Xh(n,e){const t={};return Ju(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Pn(n,(r,s)=>{const i=Jh(s,e.Mu(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function Zh(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ue||n instanceof ua||n instanceof En||n instanceof Ue||n instanceof la||n instanceof ha)}function ed(n,e,t){if(!Zh(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=sa(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function BE(n,e,t){if((e=Y(e))instanceof ca)return e._internalPath;if(typeof e=="string")return td(n,e);throw ks("Field path arguments must be of type string or ",n,!1,void 0,t)}const jE=new RegExp("[~\\*/\\[\\]]");function td(n,e,t){if(e.search(jE)>=0)throw ks(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new ca(...e.split("."))._internalPath}catch{throw ks(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ks(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new U(k.INVALID_ARGUMENT,l+n+u)}function $E(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ue(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new qE(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(rd("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class qE extends nd{data(){return super.data()}}function rd(n,e){return typeof e=="string"?td(n,e):e instanceof ca?e._internalPath:e._delegate._internalPath}class WE{convertValue(e,t="none"){switch(Gt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ie(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(zt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw j()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Pn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>ie(a.doubleValue));return new ha(i)}convertGeoPoint(e){return new ua(ie(e.latitude),ie(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Uo(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(fr(e));default:return null}}convertTimestamp(e){const t=St(e);return new ue(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=re.fromString(e);J(Sh(r));const s=new pr(r.get(1),r.get(3)),i=new F(r.popFirst(5));return s.isEqual(t)||ct(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HE(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zE{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class sd extends nd{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new GE(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(rd("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class GE extends sd{data(e={}){return super.data(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KE(n){n=vr(n,Ue);const e=vr(n.firestore,aa);return SE(Qh(e),n._key).then(t=>JE(e,n,t))}class QE extends WE{constructor(e){super(),this.firestore=e}convertBytes(e){return new En(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ue(this.firestore,null,t)}}function id(n,e,t){n=vr(n,Ue);const r=vr(n.firestore,aa),s=HE(n.converter,e,t);return YE(r,[FE(UE(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,st.none())])}function YE(n,e){return function(r,s){const i=new Rt;return r.asyncQueue.enqueueAndForget(async()=>mE(await bE(r),s,i)),i.promise}(Qh(n),e)}function JE(n,e,t){const r=t.docs.get(e._key),s=new QE(n);return new sd(n,s,e._key,r,new zE(t.hasPendingWrites,t.fromCache),e.converter)}function mo(){return new fa("serverTimestamp")}(function(e,t=!0){(function(s){bn=s})(In),fn(new qt("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new aa(new q_(r.getProvider("auth-internal")),new G_(r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new U(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new pr(d.options.projectId,p)}(a,s),a);return i=Object.assign({useFetchStreams:t},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),At(el,"4.7.3",e),At(el,"4.7.3","esm2017")})();const Ds=ms.isNativePlatform(),XE={apiKey:"AIzaSyAv0T-gsygVQfVhvU0iyE3F7cU-CPbsydU",authDomain:"money-traker7.firebaseapp.com",projectId:"money-traker7",storageBucket:"money-traker7.firebasestorage.app",messagingSenderId:"1020688892818",appId:"1:1020688892818:web:292f464edf08a42401774b"},go=Kl(XE),bt=Ds?gu(go,{persistence:Ou}):F_(go),ZE=OE(go),b=n=>document.getElementById(n),Ns=n=>String(n).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),qe=(n,e)=>{const t=Number(n)||0,r=Math.abs(t).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});return(t<0?"-":e?"+":"")+"EGP "+r},et=n=>"EGP "+Math.round(Number(n)||0).toLocaleString("en-US"),_o=n=>String(n).padStart(2,"0"),wn=n=>n.getFullYear()+"-"+_o(n.getMonth()+1)+"-"+_o(n.getDate()),Mt=n=>n.slice(0,7),si=n=>new Date(n+"T00:00:00").toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),Ll=n=>new Date(n+"-01T00:00:00").toLocaleDateString("en-GB",{month:"short",year:"numeric"});let Wi;function ce(n,e,t){const r=b("toast");if(r.textContent=n,t){const s=document.createElement("button");s.className="act",s.type="button",s.textContent=t.label,s.onclick=()=>{clearTimeout(Wi),r.classList.remove("show","has-act"),t.run()},r.appendChild(s)}r.className="toast show"+(e?" err":"")+(t?" has-act":""),clearTimeout(Wi),Wi=setTimeout(()=>r.classList.remove("show","has-act"),t?5e3:2800)}function ps(n,e,t){const r=Number(e)||0,s=De?De.uid:"",i=n._v==null||n._u!==s?r:n._v;if(n._v=r,n._u=s,cancelAnimationFrame(n._raf),i===r||matchMedia("(prefers-reduced-motion: reduce)").matches){n.textContent=t(r);return}const a=performance.now(),l=450,u=d=>{const p=Math.min(1,(d-a)/l),y=1-Math.pow(1-p,3);n.textContent=t(p<1?i+(r-i)*y:r),p<1&&(n._raf=requestAnimationFrame(u))};n._raf=requestAnimationFrame(u)}const Os=n=>({tx:n.tx||[],budget:n.budget||0,seq:n.seq||1,rates:Array.isArray(n.rates)?n.rates:[],weekStart:Number.isInteger(n.weekStart)?n.weekStart:6});function od(n,e){try{const t=localStorage.getItem(n);return t?JSON.parse(t):e}catch{return e}}function ew(n,e){try{localStorage.setItem(n,JSON.stringify(e))}catch{ce("Could not save — browser storage is blocked.",!0)}}let De=null,hn=null,jt=null;const Vs=b("authModal");let ad="login";function pa(n,e){ad=n,b("authError").className="form-error",b("authForm").reset();const t=n==="signup";b("nameField").style.display=t?"":"none",b("confirmField").style.display=t?"":"none",b("aPass").autocomplete=t?"new-password":"current-password",b("authTitle").textContent=t?"Create your account":"Welcome back",b("authSub").textContent=e||(t?"Start tracking your money in EGP — it takes 30 seconds.":"Log in to see your money."),b("authSubmit").textContent=t?"Create account":"Log in",b("authSwitch").innerHTML=t?'Already have an account? <a id="swLink">Log in</a>':`Don't have an account? <a id="swLink">Sign up</a>`,b("swLink").onclick=()=>pa(t?"login":"signup"),Vs.classList.add("open"),setTimeout(()=>b(t?"aName":"aEmail").focus(),50)}function ii(){Vs.classList.remove("open")}function sn(n){const e=b("authError");e.textContent=n,e.className="form-error show"}document.querySelectorAll("[data-auth]").forEach(n=>n.addEventListener("click",e=>{e.preventDefault(),pa(n.dataset.auth)}));b("authClose").onclick=ii;Vs.addEventListener("mousedown",n=>{n.target===Vs&&ii()});addEventListener("keydown",n=>{n.key==="Escape"&&ii()});b("pwToggle").onclick=()=>{const n=b("aPass"),e=n.type==="password";n.type=e?"text":"password",b("pwToggle").textContent=e?"Hide":"Show"};function cd(n){switch(n&&n.code){case"auth/email-already-in-use":return"This email is already registered. Try logging in.";case"auth/invalid-email":return"Please enter a valid email address.";case"auth/weak-password":return"Password must be at least 6 characters.";case"auth/user-not-found":case"auth/wrong-password":case"auth/invalid-credential":case"auth/invalid-login-credentials":return"Wrong email or password.";case"auth/too-many-requests":return"Too many attempts. Please wait a bit and try again.";case"auth/network-request-failed":return"Network error. Check your internet connection.";case"auth/operation-not-allowed":return"This sign-in method is not enabled yet in the Firebase console.";case"auth/unauthorized-domain":return"This domain is not authorized. Add it in Firebase → Authentication → Settings → Authorized domains.";default:return n&&n.message||"Something went wrong. Please try again."}}b("authForm").addEventListener("submit",async n=>{n.preventDefault();const e=b("aEmail").value.trim().toLowerCase(),t=b("aPass").value;if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))return sn("Please enter a valid email address.");if(t.length<6)return sn("Password must be at least 6 characters.");const r=b("authSubmit");r.disabled=!0;try{if(ad==="signup"){const s=b("aName").value.trim();if(s.length<2)return r.disabled=!1,sn("Please enter your name.");if(t!==b("aConfirm").value)return r.disabled=!1,sn("Passwords don't match.");jt="new";const i=await rg(bt,e,t);await ag(i.user,{displayName:s}),De&&(De.name=s)}else jt="back",await sg(bt,e,t)}catch(s){jt=null,sn(cd(s))}finally{r.disabled=!1}});b("googleBtn").addEventListener("click",async()=>{const n=b("googleBtn");n.disabled=!0,jt="back";try{if(Ds){const e=await mf.signInWithGoogle({skipNativeAuth:!0}),t=je.credential(e.credential&&e.credential.idToken);await qs(bt,t)}else{const e=new je;e.setCustomParameters({prompt:"select_account"}),await Gg(bt,e)}}catch(e){if(jt=null,!Ds&&e.code==="auth/popup-blocked")try{await Xg(bt,new je);return}catch(r){e=r}const t=String(e&&(e.code||e.message)||"");/popup-closed-by-user|cancelled-popup-request|canceled|cancelled/i.test(t)||sn(cd(e))}finally{n.disabled=!1}});const yo=n=>NE(ZE,"users",n);async function tw(n){const e=await KE(yo(n.uid));if(e.exists()){const r=e.data();hn=Os(r);return}const t=od("mt_data_"+(n.email||"").toLowerCase(),null);hn=Os(t&&t.tx?t:{}),await id(yo(n.uid),{name:n.name,email:n.email,...hn,createdAt:mo(),updatedAt:mo()}),t&&t.tx&&t.tx.length&&setTimeout(()=>ce("Your earlier data from this device was imported ✅"),1500)}mg(bt,async n=>{if(!n)return hn=null,ld();const e=n.email||"";De={uid:n.uid,email:e,name:n.displayName||e.split("@")[0]||"Friend",photo:n.photoURL||""};try{await tw(De)}catch(t){console.error(t);const r=t.code==="permission-denied"?"Firestore rules are blocking access — publish the rules from firestore.rules.":t.code==="not-found"||t.code==="failed-precondition"?"Firestore database is not created yet — create it in the Firebase console.":"Check your connection. ("+(t.code||t.message)+")";ce("Could not load your data. "+r,!0);try{await Ru(bt)}catch{}return}ii(),nw(jt),jt=null});function nw(n){const e=De;if(!e)return ld();document.body.classList.add("authed"),b("logoutBtn").style.display="";const t=e.name.split(" ")[0];b("navName").textContent=t,b("appName").textContent=t;const r=b("navAvatar");if(e.photo){r.textContent="";const s=document.createElement("img");s.src=e.photo,s.alt=e.name,s.referrerPolicy="no-referrer",s.style.cssText="width:100%;height:100%;border-radius:50%;object-fit:cover",r.appendChild(s)}else r.textContent=e.name.trim()[0].toUpperCase();b("appDate").textContent=new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"}),b("fDate").value=wn(new Date),b("rlFrom").value=b("rlFrom").max=wn(new Date),b("rlAmount").dataset.dirty="",b("fMonth").dataset.touched="",ud("expense"),We(),scrollTo(0,0),n==="new"?ce("Account created. Welcome! 🎉"):n==="back"&&ce("Logged in successfully ✅")}function ld(){De=null,document.body.classList.remove("authed"),b("logoutBtn").style.display="none",scrollTo(0,0)}b("logoutBtn").onclick=async()=>{try{await Ru(bt)}catch{}ce("Logged out")};b("logoLink").addEventListener("click",()=>{De&&scrollTo({top:0,behavior:"smooth"})});const Le=()=>hn||Os({});function Je(n){hn=n,De&&id(yo(De.uid),{name:De.name,email:De.email,tx:n.tx,budget:n.budget,seq:n.seq,rates:n.rates||[],weekStart:Number.isInteger(n.weekStart)?n.weekStart:6,updatedAt:mo()},{merge:!0}).catch(e=>{console.error(e),ce("Could not save to the cloud. Check your connection.",!0)})}const wr={income:1,deposit:1,expense:-1,withdraw:-1,transfer:-1},rw=["Food & Dining","Transport","Shopping","Entertainment","Bills","Other"],Ml={"Food & Dining":"#3b82f6",Transport:"#a855f7",Shopping:"#14e6b0",Entertainment:"#f59e0b",Bills:"#ef4444",Other:"#facc15"},sw=["Salary","Freelance","Gift","Other"],iw=["Visa","Meeza","Vodafone Cash","InstaPay","Fawry","Bank account"],vo={expense:{label:"Expense",color:"#e5384a",icon:"−"},income:{label:"Income",color:"#14c996",icon:"+"},deposit:{label:"Deposit",color:"#3b82f6",icon:"↓"},withdraw:{label:"Withdraw",color:"#f59e0b",icon:"↑"},transfer:{label:"Transfer",color:"#0ea5a4",icon:"⇄"}};let xt="expense";function ud(n){xt=n,[...b("typeTabs").children].forEach(t=>t.classList.toggle("on",t.dataset.t===n));const e=n==="expense"?rw:n==="income"?sw:iw;b("fCatLabel").textContent=n==="expense"||n==="income"?"Category":"Method",b("fCat").innerHTML=e.map(t=>`<option>${Ns(t)}</option>`).join(""),b("txError").className="form-error"}b("typeTabs").addEventListener("click",n=>{const e=n.target.closest("button");e&&ud(e.dataset.t)});b("txForm").addEventListener("submit",n=>{n.preventDefault();const e=Math.round(parseFloat(b("fAmount").value)*100)/100,t=b("fDate").value,r=b("txError");if(!(e>0)){r.textContent="Enter an amount greater than zero.",r.className="form-error show";return}if(!t){r.textContent="Pick a date.",r.className="form-error show";return}const s=Le();if(wr[xt]<0&&(xt==="withdraw"||xt==="transfer")){const i=s.tx.reduce((a,l)=>a+wr[l.type]*l.amount,0);if(e>i){r.textContent=`Not enough balance. You have ${qe(i)}.`,r.className="form-error show";return}}s.tx.push({id:s.seq++,date:t,type:xt,cat:b("fCat").value,desc:b("fDesc").value.trim()||vo[xt].label,amount:e}),Je(s),b("fAmount").value="",b("fDesc").value="",r.className="form-error",We(),ce(`${vo[xt].label} of ${qe(e)} added ✅`)});b("saveBudget").onclick=()=>{const n=parseFloat(b("budgetInput").value);if(!(n>=0))return ce("Enter a valid budget amount.",!0);const e=Le();e.budget=n,Je(e),We(),ce("Budget saved ✅")};["fSearch","fType","fMonth"].forEach(n=>b(n).addEventListener("input",()=>{n==="fMonth"&&(b("fMonth").dataset.touched="1"),hd()}));b("txBody").addEventListener("click",n=>{const e=n.target.closest(".del");if(!e)return;const t=Le(),r=Number(e.dataset.id),s=t.tx.find(i=>i.id===r);s&&(t.tx=t.tx.filter(i=>i.id!==r),Je(t),We(),ce("Transaction deleted",!1,{label:"Undo",run:()=>{const i=Le();i.tx.some(a=>a.id===s.id)||(i.tx.push(s),Je(i),We(),ce("Transaction restored ✅"))}}))});b("resetBtn").onclick=()=>{confirm("Delete ALL your transactions and budget? This cannot be undone.")&&(Je(Os({weekStart:Le().weekStart})),We(),ce("All data cleared"))};b("sampleBtn").onclick=()=>{const n=Le(),e=new Date,t=(s,i)=>{const a=new Date(e.getFullYear(),e.getMonth()-s,i);return wn(a>e?e:a)},r=[];for(let s=5;s>=0;s--)r.push(["income","Salary","Monthly salary",15e3,t(s,1)]),r.push(["expense","Bills","Electricity & internet",700+s*37%200,t(s,5)]),r.push(["expense","Food & Dining","Groceries",2200+s*211%700,t(s,8)]),r.push(["expense","Transport","Uber & fuel",900+s*97%400,t(s,12)]),r.push(["expense","Shopping","Clothes",800+s*313%1200,t(s,16)]),r.push(["expense","Entertainment","Netflix & cinema",199+s*53%300,t(s,20)]),r.push(["expense","Food & Dining","Restaurants",600+s*71%500,t(s,24)]);r.forEach(s=>n.tx.push({id:n.seq++,type:s[0],cat:s[1],desc:s[2],amount:s[3],date:s[4]})),n.budget||(n.budget=12e3),n.rates.length||(n.rates=[{from:t(0,1),amount:Math.round(n.budget/30)}]),Je(n),We(),ce("Sample data loaded")};b("exportBtn").onclick=async()=>{const n=Le();if(!n.tx.length)return ce("Nothing to export yet.",!0);const e=a=>'"'+String(a).replace(/"/g,'""')+'"',r="\uFEFF"+["Date,Type,Category,Description,Amount (EGP)"].concat(n.tx.slice().sort((a,l)=>a.date.localeCompare(l.date)).map(a=>[a.date,a.type,e(a.cat),e(a.desc),(wr[a.type]*a.amount).toFixed(2)].join(","))).join(`
`);if(Ds){try{const a=await df.writeFile({path:"money-tracker.csv",data:r,directory:Hi.Cache,encoding:zi.UTF8});await ff.share({title:"Money Tracker",text:"Money Tracker export",url:a.uri,dialogTitle:"Export transactions"})}catch(a){/cancel/i.test(String(a&&a.message))||ce("Could not export the file.",!0)}return}const s=new Blob([r],{type:"text/csv;charset=utf-8"}),i=document.createElement("a");i.href=URL.createObjectURL(s),i.download="money-tracker.csv",i.click(),URL.revokeObjectURL(i.href)};function We(){if(!De)return;const n=Le(),e=new Date,t=Mt(wn(e)),r=n.tx.reduce((P,M)=>P+wr[M.type]*M.amount,0),s=n.tx.filter(P=>P.type==="income"&&Mt(P.date)===t).reduce((P,M)=>P+M.amount,0),i=n.tx.filter(P=>P.type==="expense"&&Mt(P.date)===t).reduce((P,M)=>P+M.amount,0),a=n.budget-i;ps(b("stBalance"),r,qe),b("stBalance").className=r<0?"neg":"",ps(b("stIncome"),s,qe),ps(b("stExpense"),i,qe),b("stLeft").textContent=n.budget?qe(a):"—",b("stLeft").className=n.budget&&a<0?"neg":"",b("budgetInput").value=n.budget||"",b("bgSpent").textContent=et(i)+" spent",b("bgTotal").textContent="of "+et(n.budget);const l=n.budget?Math.min(100,i/n.budget*100):0;b("bgBar").firstElementChild.style.width=l+"%",b("bgBar").classList.toggle("over",n.budget>0&&i>n.budget),b("bgNote").textContent=n.budget?i>n.budget?`⚠ You are over budget by ${et(i-n.budget)}.`:`${Math.round(l)}% used — ${et(a)} left this month.`:"Set a monthly budget to track your spending.";const u={};n.tx.filter(P=>P.type==="expense"&&Mt(P.date)===t).forEach(P=>u[P.cat]=(u[P.cat]||0)+P.amount);const d=Object.keys(u).sort((P,M)=>u[M]-u[P]);if(b("donutTotal").textContent=Math.round(i).toLocaleString("en-US"),!d.length)b("bigDonut").style.background="#16303f",b("bigLegend").innerHTML='<li class="muted">No expenses this month yet.</li>';else{let P=0,M=[];d.forEach(B=>{const L=u[B]/i*100;M.push(`${Ml[B]||"#888"} ${P}% ${P+L}%`),P+=L}),b("bigDonut").style.background=`conic-gradient(${M.join(",")})`,b("bigLegend").innerHTML=d.map(B=>`<li><i style="background:${Ml[B]||"#888"}"></i>${Ns(B)}<span>${Math.round(u[B]/i*100)}%</span></li>`).join("")}const p=[];for(let P=5;P>=0;P--){const M=new Date(e.getFullYear(),e.getMonth()-P,1);p.push(M.getFullYear()+"-"+_o(M.getMonth()+1))}const y=p.map(P=>n.tx.filter(M=>M.type==="expense"&&Mt(M.date)===P).reduce((M,B)=>M+B.amount,0)),A=Math.max(...y,1);b("monthBars").innerHTML=p.map((P,M)=>`<div title="${Ll(P)}: ${et(y[M])}"><span>${y[M]?Math.round(y[M]/1e3*10)/10+"k":""}</span><i style="height:${y[M]/A*100}%"></i><span>${new Date(P+"-01T00:00:00").toLocaleDateString("en-GB",{month:"short"})}</span></div>`).join("");const S=b("fMonth"),D=S.value,V=[...new Set(n.tx.map(P=>Mt(P.date)).concat([t]))].sort().reverse();S.innerHTML='<option value="all">All months</option>'+V.map(P=>`<option value="${P}">${Ll(P)}</option>`).join(""),S.value=V.includes(D)||D==="all"?D:"all",ow(n,e),hd()}const xl=n=>new Date(n+"T00:00:00").toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"});function Ft(n){const e=b("rlError");e.textContent=n,e.className="form-error"+(n?" show":"")}function ow(n,e){const t=pf(n,e);document.activeElement!==b("rlWeekStart")&&(b("rlWeekStart").value=String(n.weekStart));const r=b("rlAmount");if(document.activeElement!==r&&!r.dataset.dirty&&(r.value=t?t.allowance:""),b("rlOff").style.display=n.rates.length?"":"none",!t){["rlDay","rlWeek","rlMonth","rlYear","rlTotal"].forEach(a=>{const l=b(a);cancelAnimationFrame(l._raf),l._v=null,l.textContent="—",l.className=""}),b("rlDayNote").textContent="Set a daily allowance to start — no top-ups needed.",["rlWeekNote","rlMonthNote","rlYearNote"].forEach(a=>b(a).textContent=""),b("rlBars").innerHTML='<div class="muted" style="justify-content:center">Your last 7 days will show up here.</div>';return}const s=(a,l)=>{ps(b(a),l,qe),b(a).className=l<0?"neg":""};s("rlDay",t.daily),s("rlWeek",t.week),s("rlMonth",t.month),s("rlYear",t.year),s("rlTotal",t.total),b("rlDayNote").textContent=t.daily>=0?`of ${et(t.allowance)} · rolls into your week at midnight`:`${et(-t.daily)} over today · comes out of your week at midnight`,b("rlWeekNote").textContent="Rolls into the month after "+xl(t.weekRollsOn),b("rlMonthNote").textContent="Rolls into the year after "+xl(t.monthRollsOn),b("rlYearNote").textContent="Carries over, year after year";const i=Math.max(...t.last7.map(a=>Math.abs(a.net)),1);b("rlBars").innerHTML=t.last7.map((a,l)=>`<div class="${l===t.last7.length-1?"today":""}" title="${si(a.date)}: ${qe(a.net,!0)}"><span>${a.net===0?"0":(a.net>0?"+":"−")+Math.round(Math.abs(a.net))}</span><i class="${a.net<0?"neg":""}" style="height:${Math.abs(a.net)/i*100}%"></i><span>${new Date(a.date+"T00:00:00").toLocaleDateString("en-GB",{weekday:"short"})}</span></div>`).join("")}b("rlAmount").addEventListener("input",()=>{b("rlAmount").dataset.dirty="1",Ft("")});b("rlAmount").addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),b("rlSave").click())});b("rlUseBudget").onclick=()=>{const n=Le();if(!(n.budget>0))return Ft("Set a monthly budget first — then it can be divided by the days in the month.");const e=new Date,t=new Date(e.getFullYear(),e.getMonth()+1,0).getDate();b("rlAmount").value=Math.max(1,Math.round(n.budget/t)),b("rlAmount").dataset.dirty="1",Ft("")};b("rlWeekStart").onchange=()=>{const n=Le();n.weekStart=Number(b("rlWeekStart").value),Je(n),We(),ce("Week now starts on "+b("rlWeekStart").selectedOptions[0].textContent)};b("rlSave").onclick=()=>{const n=Math.round(parseFloat(b("rlAmount").value)*100)/100,e=wn(new Date),t=b("rlFrom").value||e;if(!(n>0))return Ft("Enter a daily allowance greater than zero.");if(t>e)return Ft("The start date can't be in the future.");const r=Le(),s=r.rates[r.rates.length-1];if(s&&t<s.from)return Ft("Pick a date on or after "+si(s.from)+" — earlier days keep their old allowance.");r.weekStart=Number(b("rlWeekStart").value),r.rates=s&&s.from===t?r.rates.slice(0,-1).concat([{from:t,amount:n}]):r.rates.concat([{from:t,amount:n}]),Je(r),b("rlAmount").dataset.dirty="",b("rlFrom").value=e,Ft(""),We(),ce("Daily allowance set to "+et(n)+" ✅")};b("rlOff").onclick=()=>{const n=Le();if(!n.rates.length)return;const e=n.rates;n.rates=[],Je(n),b("rlAmount").dataset.dirty="",We(),ce("Rollover turned off",!1,{label:"Undo",run:()=>{const t=Le();t.rates=e,Je(t),We(),ce("Rollover restored ✅")}})};function hd(){const n=Le(),e=b("fSearch").value.trim().toLowerCase(),t=b("fType").value,r=b("fMonth").value,s=n.tx.filter(a=>(t==="all"||a.type===t)&&(r==="all"||Mt(a.date)===r)&&(!e||(a.desc+" "+a.cat).toLowerCase().includes(e))).sort((a,l)=>l.date.localeCompare(a.date)||l.id-a.id);b("txBody").innerHTML=s.map(a=>{const l=vo[a.type],u=wr[a.type]*a.amount;return`<tr><td>${si(a.date)}</td>
      <td><span class="type"><i style="background:${l.color}">${l.icon}</i>${l.label}</span></td>
      <td>${Ns(a.cat)}</td><td>${Ns(a.desc)}</td>
      <td class="${u<0?"neg":"pos"}">${qe(u,!0)}</td>
      <td><button class="del" data-id="${a.id}" title="Delete" aria-label="Delete">🗑</button></td></tr>`}).join("");const i=s.length===0;if(b("txEmpty").style.display=i?"":"none",b("txBody").closest("table").style.display=i?"none":"",i){const a=n.tx.length>0;b("txEmptyMsg").textContent=a?"No transactions match your filters.":"No transactions yet — add your first one on the left.",b("sampleBtn").style.display=a?"none":""}}const aw=b("burger"),Ls=b("navLinks");aw.addEventListener("click",()=>Ls.classList.toggle("open"));Ls.querySelectorAll("a").forEach(n=>n.addEventListener("click",()=>Ls.classList.remove("open")));const Eo=b("themeBtn");function dd(n){const e=document.documentElement.style;n?(e.setProperty("--bg","#f3f7f9"),e.setProperty("--bg2","#e8eff3"),e.setProperty("--card","#ffffff"),e.setProperty("--text","#0b1a25"),e.setProperty("--muted","#5b6f7c"),e.setProperty("--line","rgba(0,0,0,.1)"),Eo.textContent="☾"):(["--bg","--bg2","--card","--text","--muted","--line"].forEach(t=>e.removeProperty(t)),Eo.textContent="☀")}let er=od("mt_light",!1);dd(er);Eo.addEventListener("click",()=>{er=!er,ew("mt_light",er),dd(er)});(function(){const n=t=>{const r=new Date;return r.setDate(r.getDate()-t),si(wn(r))},e=[[1,"#e5384a","N","Expense","Netflix Subscription",-199],[2,"#14c996","£","Income","Salary",12e3],[3,"#f59e0b","🛒","Expense","Grocery",-450],[5,"#0ea5a4","⇄","Transfer","Bank Transfer",-2e3],[7,"#e5384a","U","Expense","Uber",-85]];b("demoRows").innerHTML=e.map(t=>`<tr><td>${n(t[0])}</td><td><span class="type"><i style="background:${t[1]}">${t[2]}</i>${t[3]}</span></td><td>${t[4]}</td><td class="${t[5]<0?"neg":"pos"}">${qe(t[5],!0)}</td><td><span class="status">Completed</span></td><td class="dots">⋮</td></tr>`).join("")})();const Ul=b("seg"),fd=b("chips"),$t=b("amt"),cw=b("okTitle"),lw=b("okAmt"),uw=b("okNote"),hw=b("payBtn"),dw={Daily:{days:1,title:"Your daily allowance",ok:"Daily balance",note:"Unspent money rolls into<br>your weekly balance"},Weekly:{days:7,title:"Your weekly balance",ok:"Weekly balance",note:"Unspent weeks roll into<br>your monthly balance"},Monthly:{days:30,title:"Your monthly balance",ok:"Monthly balance",note:"Unspent months roll into<br>your annual balance"},Annual:{days:365,title:"Your annual balance",ok:"Annual balance",note:"Your savings keep<br>growing year after year"}};let pd="Daily";function oi(){const n=dw[pd],e=Number($t.value)||0;lw.textContent=qe(e*n.days),cw.textContent=n.ok,uw.innerHTML=n.note,b("boxTitle").textContent=n.title+(n.days>1?" if you save it all":""),[...fd.children].forEach(t=>t.classList.toggle("on",t.dataset.v===String($t.value)))}Ul.addEventListener("click",n=>{const e=n.target.closest("button");e&&([...Ul.children].forEach(t=>t.classList.remove("on")),e.classList.add("on"),pd=e.dataset.mode,oi())});fd.addEventListener("click",n=>{const e=n.target.closest("button");e&&($t.value=e.dataset.v,oi())});$t.addEventListener("input",oi);hw.addEventListener("click",()=>{if(!(Number($t.value)>0)){$t.focus();return}pa("signup","Create a free account to start your "+et($t.value)+" a day rollover balance.")});oi();const md=new IntersectionObserver(n=>n.forEach(e=>{e.isIntersecting&&(e.target.classList.add("in"),md.unobserve(e.target))}),{threshold:.12});document.querySelectorAll(".reveal").forEach(n=>md.observe(n));const fw=["home","features","about","pricing","contact"].map(n=>b(n));addEventListener("scroll",()=>{if(De)return;let n="home";fw.forEach(e=>{e&&scrollY>=e.offsetTop-120&&(n=e.id)}),Ls.querySelectorAll("a").forEach(e=>e.classList.toggle("active",e.getAttribute("href")==="#"+n))});export{Pw as A,ag as B,Nm as C,Rw as D,zi as E,_t as F,yt as G,Xg as H,Gg as I,Mw as J,Lw as K,tg as L,at as M,Sw as N,as as O,Tc as P,Uc as Q,Nw as R,Ou as S,vt as T,Cu as U,vg as V,Fl as W,vw as a,sf as b,rg as c,yw as d,Dw as e,Iw as f,F_ as g,xw as h,ww as i,Kt as j,je as k,Vw as l,kw as m,_w as n,Ew as o,wc as p,Cw as q,fm as r,Aw as s,pw as t,gw as u,sg as v,Tw as w,Ow as x,mw as y,bw as z};
