/**
 * @license Hyphenopoly 5.0.0 - client side hyphenation for webbrowsers
 * ©2023  Mathias Nater, Güttingen (mathiasnater at gmail dot com)
 * https://github.com/mnater/Hyphenopoly
 *
 * Released under the MIT license
 * http://mnater.github.io/Hyphenopoly/LICENSE
 */
((e,t)=>{"use strict";const n=(n=>{const r=new Map([["afterElementHyphenation",[]],["beforeElementHyphenation",[]],["engineReady",[]],["error",[t=>{t.runDefault&&e.console.warn(t)}]],["hyphenopolyEnd",[]],["hyphenopolyStart",[]]]);if(n.hev){const e=new Map(t.entries(n.hev));r.forEach(((t,n)=>{e.has(n)&&t.unshift(e.get(n))}))}return{fire:(e,t)=>{t.runDefault=!0,t.preventDefault=()=>{t.runDefault=!1},r.get(e).forEach((e=>{e(t)}))}}})(Hyphenopoly);(e=>{function n(e){const t=new Map;function n(n){return t.has(n)?t.get(n):e.get(n)}function r(e,n){t.set(e,n)}return new Proxy(e,{get:(e,t)=>"set"===t?r:"get"===t?n:n(t),ownKeys:()=>[...new Set([...e.keys(),...t.keys()])]})}const r=n(new Map([["defaultLanguage","en-us"],["dontHyphenate",n(new Map("abbr,acronym,audio,br,button,code,img,input,kbd,label,math,option,pre,samp,script,style,sub,sup,svg,textarea,var,video".split(",").map((e=>[e,!0]))))],["dontHyphenateClass","donthyphenate"],["exceptions",new Map],["keepAlive",!0],["normalize",!1],["processShadows",!1],["safeCopy",!0],["substitute",new Map],["timeout",1e3]]));t.entries(e.s).forEach((([e,a])=>{switch(e){case"selectors":r.set("selectors",t.keys(a)),t.entries(a).forEach((([e,a])=>{const o=n(new Map([["compound","hyphen"],["hyphen","­"],["leftmin",0],["leftminPerLang",0],["minWordLength",6],["mixedCase",!0],["orphanControl",1],["rightmin",0],["rightminPerLang",0]]));t.entries(a).forEach((([e,n])=>{"object"==typeof n?o.set(e,new Map(t.entries(n))):o.set(e,n)})),r.set(e,o)}));break;case"dontHyphenate":case"exceptions":t.entries(a).forEach((([t,n])=>{r.get(e).set(t,n)}));break;case"substitute":t.entries(a).forEach((([e,n])=>{r.substitute.set(e,new Map(t.entries(n)))}));break;default:r.set(e,a)}})),e.c=r})(Hyphenopoly),(r=>{const a=r.c;let o=null;function s(e,t="",n=!0){return(e=e.closest("[lang]:not([lang=''])"))&&e.lang?e.lang.toLowerCase():t||(n?o:null)}function l(o=null,l=null){const i=function(){const e=new Map,t=[0];return{add:function(n,r,a){const o={element:n,selector:a};return e.has(r)||e.set(r,[]),e.get(r).push(o),t[0]+=1,o},counter:t,list:e,rem:function(r){let o=0;e.has(r)&&(o=e.get(r).length,e.delete(r),t[0]-=o,0===t[0]&&(n.fire("hyphenopolyEnd",{msg:"hyphenopolyEnd"}),a.keepAlive||(window.Hyphenopoly=null)))}}}(),c=(()=>{let e="."+a.dontHyphenateClass;return t.getOwnPropertyNames(a.dontHyphenate).forEach((t=>{a.dontHyphenate.get(t)&&(e+=","+t)})),e})(),h=a.selectors.join(",")+","+c;function p(t,o,l,c=!1){const u=s(t,o),g=r.cf.langs.get(u);"H9Y"===g?(i.add(t,u,l),!c&&a.safeCopy&&function(t){t.addEventListener("copy",(t=>{t.preventDefault();const n=e.getSelection(),r=document.createElement("div");r.appendChild(n.getRangeAt(0).cloneContents()),t.clipboardData.setData("text/plain",n.toString().replace(RegExp("­","g"),"")),t.clipboardData.setData("text/html",r.innerHTML.replace(RegExp("­","g"),""))}),!0)}(t)):g||"zxx"===u||n.fire("error",Error(`Element with '${u}' found, but '${u}.wasm' not loaded. Check language tags!`)),t.childNodes.forEach((e=>{1!==e.nodeType||e.matches(h)||p(e,u,l,!0)}))}function u(e){a.selectors.forEach((t=>{e.querySelectorAll(t).forEach((e=>{p(e,s(e),t,!1)}))}))}return null===o?(a.processShadows&&e.document.querySelectorAll("*").forEach((e=>{e.shadowRoot&&u(e.shadowRoot)})),u(e.document)):p(o,s(o),l),i}n.fire("hyphenopolyStart",{msg:"hyphenopolyStart"});const i=new Map;function c(e,t,r){const o=t+"-"+r;if(i.has(o))return i.get(o);const s=a.get(r);function l(a){let o=e.cache.get(r).get(a);var l;return o||(o=e.exc.has(a)?e.exc.get(a).replace(/-/g,s.hyphen):!s.mixedCase&&(l=a,[...l].map((e=>e===e.toLowerCase())).some(((e,t,n)=>e!==n[0])))?a:-1===a.indexOf("-")?function(r){if(r.length>61)n.fire("error",Error("Found word longer than 61 characters"));else if(!e.reNotAlphabet.test(r))return e.hyphenate(r,s.hyphen.charCodeAt(0),s.leftminPerLang.get(t),s.rightminPerLang.get(t));return r}(a):function(n){let a=null,o=null;return"auto"===s.compound||"all"===s.compound?(o=c(e,t,r),a=n.split("-").map((e=>e.length>=s.minWordLength?o(e):e)),n="auto"===s.compound?a.join("-"):a.join("-​")):n=n.replace("-","-​"),n}(a),e.cache.get(r).set(a,o)),o}return e.cache.set(r,new Map),i.set(o,l),l}const h=new Map,p=new Map;function u(e,t,o){const s=r.languages.get(e),l=a.get(t),i=l.minWordLength,u=(()=>{const t=e+i;if(p.has(t))return p.get(t);const n=RegExp(`[${s.alphabet}a-z̀-ͯ҃-҇ß-öø-þāăąćĉčďđēėęěĝğģĥīįıĵķļľłńņňōőœŕřśŝşšťūŭůűųźżžſǎǐǒǔǖǘǚǜșțʼΐά-ώϐϣϥϧϩϫϭϯϲа-яё-ќўџґүөա-օևअ-ऌएऐओ-नप-रलळव-हऽॠॡঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹઅ-ઋએઐઓ-નપ-રલળવ-હઽૠଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହୠୡஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-வஷ-ஹఅ-ఌఎ-ఐఒ-నప-ళవ-హౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡഅ-ഌഎ-ഐഒ-നപ-ഹൠൡൺ-ൿก-ฮะาำเ-ๅა-ჰሀ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏḍḷṁṃṅṇṭἀ-ἇἐ-ἕἠ-ἧἰ-ἷὀ-ὅὐ-ὗὠ-ὧὰ-ώᾀ-ᾇᾐ-ᾗᾠ-ᾧᾲ-ᾴᾶᾷῂ-ῄῆῇῒΐῖῗῢ-ῧῲ-ῴῶῷⲁⲃⲅⲇⲉⲍⲏⲑⲓⲕⲗⲙⲛⲝⲟⲡⲣⲥⲧⲩⲫⲭⲯⲱⳉⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮ­​-‍-]{${i},}`,"gui");return p.set(t,n),n})();function g(n){a.normalize&&(n=n.normalize("NFC"));let r=n.replace(u,c(s,e,t));return 1!==l.orphanControl&&(r=r.replace(/(\u0020*)(\S+)(\s*)$/,function(e){if(h.has(e))return h.get(e);const t=a.get(e);function n(e,n,r,a){return 3===t.orphanControl&&" "===n&&(n=" "),n+r.replace(RegExp(t.hyphen,"g"),"")+a}return h.set(e,n),n}(t))),r}let f=null;var d;return"string"==typeof o?f=g(o):o instanceof HTMLElement&&(d=o,n.fire("beforeElementHyphenation",{el:d,lang:e}),d.childNodes.forEach((e=>{3===e.nodeType&&/\S/.test(e.data)&&e.data.length>=i&&(e.data=g(e.data))})),r.res.els.counter[0]-=1,n.fire("afterElementHyphenation",{el:d,lang:e})),f}function g(t,o){const s=o.list.get(t);s?s.forEach((e=>{u(t,e.selector,e.element)})):n.fire("error",Error(`Engine for language '${t}' loaded, but no elements found.`)),0===o.counter[0]&&(e.clearTimeout(r.timeOutHandler),r.hide(0,null),n.fire("hyphenopolyEnd",{msg:"hyphenopolyEnd"}),a.keepAlive||(window.Hyphenopoly=null))}function f(e){let t="";return a.exceptions.has(e)&&(t=a.exceptions.get(e)),a.exceptions.has("global")&&(""===t?t=a.exceptions.get("global"):t+=", "+a.exceptions.get("global")),""===t?new Map:new Map(t.split(", ").map((e=>[e.replace(/-/g,""),e])))}r.unhyphenate=()=>(r.res.els.list.forEach((e=>{e.forEach((e=>{const t=e.element.firstChild;t.data=t.data.replace(RegExp(a[e.selector].hyphen,"g"),"")}))})),Promise.resolve(r.res.els));const d=(()=>{const e=new TextDecoder("utf-16le");return t=>e.decode(t)})();function m(e,t){const o=window.WebAssembly;e.w.then((e=>e.ok?o.instantiateStreaming&&"application/wasm"===e.headers.get("Content-Type")?o.instantiateStreaming(e):e.arrayBuffer().then((e=>o.instantiate(e))):Promise.reject(Error(`File ${t}.wasm can't be loaded from ${r.paths.patterndir}`)))).then((function(s){const l=s.instance.exports;let i=o.Global?l.lct.value:l.lct;i=function(e,n){return a.substitute.has(t)&&a.substitute.get(t).forEach(((t,r)=>{const a=r.toUpperCase(),o=a===r?0:a.charCodeAt(0);e=n.subst(r.charCodeAt(0),o,t.charCodeAt(0))})),e}(i,l),e.l.forEach((e=>{!function(e,t,o,s,l){a.selectors.forEach((t=>{const n=a.get(t);0===n.leftminPerLang&&n.set("leftminPerLang",new Map),0===n.rightminPerLang&&n.set("rightminPerLang",new Map),n.leftminPerLang.set(e,Math.max(s,n.leftmin,Number(n.leftminPerLang.get(e))||0)),n.rightminPerLang.set(e,Math.max(l,n.rightmin,Number(n.rightminPerLang.get(e))||0))})),r.languages||(r.languages=new Map),o=o.replace(/\\*-/g,"\\-"),r.languages.set(e,{alphabet:o,cache:new Map,exc:f(e),hyphenate:t,ready:!0,reNotAlphabet:RegExp(`[^${o}]`,"i")}),r.hy6ors.get(e).resolve(function(e){return(t,r=".hyphenate")=>("string"!=typeof t&&n.fire("error",Error("This use of hyphenators is deprecated. See https://mnater.github.io/Hyphenopoly/Hyphenators.html")),u(e,r,t))}(e)),n.fire("engineReady",{lang:e}),r.res.els&&g(e,r.res.els)}(e,function(e,t){const n=new Uint16Array(e,0,64);return(r,a,o,s)=>{n.set([46,...[...r].map((e=>e.charCodeAt(0))),46,0]);const l=t(o,s,a);return l>0&&(r=d(new Uint16Array(e,0,l))),r}}(l.mem.buffer,l.hyphenate),d(new Uint16Array(l.mem.buffer,1280,i)),o.Global?l.lmi.value:l.lmi,o.Global?l.rmi.value:l.rmi)}))}),(e=>{n.fire("error",e),r.res.els.rem(t)}))}r.main=()=>{r.res.DOM.then((()=>{o=s(e.document.documentElement,"",!1),o||""===a.defaultLanguage||(o=a.defaultLanguage);const t=l();r.res.els=t,t.list.forEach(((e,n)=>{r.languages&&r.languages.has(n)&&r.languages.get(n).ready&&g(n,t)}))})),r.res.he.forEach(m),Promise.all([...r.hy6ors.entries()].reduce(((e,t)=>"HTML"!==t[0]?e.concat(t[1]):e),[]).concat(r.res.DOM)).then((()=>{r.hy6ors.get("HTML").resolve(((e,t=".hyphenate")=>(l(e,t).list.forEach(((e,t)=>{e.forEach((e=>{u(t,e.selector,e.element)}))})),null)))}),(e=>{n.fire("error",e)}))},r.main()})(Hyphenopoly)})(window,Object);