!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.textTrack=e():(t.xgplayer=t.xgplayer||{},t.xgplayer.PlayerControls=t.xgplayer.PlayerControls||{},t.xgplayer.PlayerControls.textTrack=e())}(window,(function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=5)}([function(t,e,r){var n=r(1);"string"==typeof n&&(n=[[t.i,n,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};r(3)(n,o);n.locals&&(t.exports=n.locals)},function(t,e,r){(t.exports=r(2)(!1)).push([t.i,".xgplayer-skin-default .xgplayer-texttrack{-webkit-order:7;-moz-box-ordinal-group:8;order:7;width:60px;height:150px;z-index:18;position:relative;outline:none;display:none;cursor:default;margin-top:-119px}.xgplayer-skin-default .xgplayer-texttrack ul{display:none;list-style:none;min-width:78px;background:rgba(0,0,0,.54);border-radius:1px;position:absolute;bottom:30px;text-align:center;white-space:nowrap;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;z-index:26;cursor:pointer}.xgplayer-skin-default .xgplayer-texttrack ul li{opacity:.7;font-family:PingFangSC-Regular;font-size:11px;color:hsla(0,0%,100%,.8);width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;margin:auto;padding:6px 13px}.xgplayer-skin-default .xgplayer-texttrack ul li.selected,.xgplayer-skin-default .xgplayer-texttrack ul li:hover{color:#fff;opacity:1}.xgplayer-skin-default .xgplayer-texttrack .name{text-align:center;font-family:PingFangSC-Regular;font-size:13px;cursor:pointer;color:hsla(0,0%,100%,.8);position:absolute;bottom:0;width:60px;height:20px;line-height:20px;background:rgba(0,0,0,.38);border-radius:10px;display:inline-block;vertical-align:middle}.xgplayer-skin-default .xgplayer-texttrack.xgplayer-texttrack-hide{display:none}xg-text-track{transition:bottom .3s ease}.xgplayer-skin-default.xgplayer-is-texttrack .xgplayer-texttrack,.xgplayer-skin-default.xgplayer-texttrack-active .xgplayer-texttrack ul{display:block}",""])},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r=function(t,e){var r=t[1]||"",n=t[3];if(!n)return r;if(e&&"function"==typeof btoa){var o=(i=n,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),a=n.sources.map((function(t){return"/*# sourceURL="+n.sourceRoot+t+" */"}));return[r].concat(a).concat([o]).join("\n")}var i;return[r].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+r+"}":r})).join("")},e.i=function(t,r){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(n[a]=!0)}for(o=0;o<t.length;o++){var i=t[o];"number"==typeof i[0]&&n[i[0]]||(r&&!i[2]?i[2]=r:r&&(i[2]="("+i[2]+") and ("+r+")"),e.push(i))}},e}},function(t,e,r){var n,o,a={},i=(n=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=n.apply(this,arguments)),o}),s=function(t){return document.querySelector(t)},l=function(t){var e={};return function(t){if("function"==typeof t)return t();if(void 0===e[t]){var r=s.call(this,t);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}e[t]=r}return e[t]}}(),c=null,u=0,f=[],p=r(4);function d(t,e){for(var r=0;r<t.length;r++){var n=t[r],o=a[n.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](n.parts[i]);for(;i<n.parts.length;i++)o.parts.push(v(n.parts[i],e))}else{var s=[];for(i=0;i<n.parts.length;i++)s.push(v(n.parts[i],e));a[n.id]={id:n.id,refs:1,parts:s}}}}function g(t,e){for(var r=[],n={},o=0;o<t.length;o++){var a=t[o],i=e.base?a[0]+e.base:a[0],s={css:a[1],media:a[2],sourceMap:a[3]};n[i]?n[i].parts.push(s):r.push(n[i]={id:i,parts:[s]})}return r}function x(t,e){var r=l(t.insertInto);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var n=f[f.length-1];if("top"===t.insertAt)n?n.nextSibling?r.insertBefore(e,n.nextSibling):r.appendChild(e):r.insertBefore(e,r.firstChild),f.push(e);else if("bottom"===t.insertAt)r.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=l(t.insertInto+" "+t.insertAt.before);r.insertBefore(e,o)}}function y(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=f.indexOf(t);e>=0&&f.splice(e,1)}function h(t){var e=document.createElement("style");return t.attrs.type="text/css",m(e,t.attrs),x(t,e),e}function m(t,e){Object.keys(e).forEach((function(r){t.setAttribute(r,e[r])}))}function v(t,e){var r,n,o,a;if(e.transform&&t.css){if(!(a=e.transform(t.css)))return function(){};t.css=a}if(e.singleton){var i=u++;r=c||(c=h(e)),n=w.bind(null,r,i,!1),o=w.bind(null,r,i,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(r=function(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",m(e,t.attrs),x(t,e),e}(e),n=T.bind(null,r,e),o=function(){y(r),r.href&&URL.revokeObjectURL(r.href)}):(r=h(e),n=L.bind(null,r),o=function(){y(r)});return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else o()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=i()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var r=g(t,e);return d(r,e),function(t){for(var n=[],o=0;o<r.length;o++){var i=r[o];(s=a[i.id]).refs--,n.push(s)}t&&d(g(t,e),e);for(o=0;o<n.length;o++){var s;if(0===(s=n[o]).refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete a[s.id]}}}};var b,k=(b=[],function(t,e){return b[t]=e,b.filter(Boolean).join("\n")});function w(t,e,r,n){var o=r?"":n.css;if(t.styleSheet)t.styleSheet.cssText=k(e,o);else{var a=document.createTextNode(o),i=t.childNodes;i[e]&&t.removeChild(i[e]),i.length?t.insertBefore(a,i[e]):t.appendChild(a)}}function L(t,e){var r=e.css,n=e.media;if(n&&t.setAttribute("media",n),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}function T(t,e,r){var n=r.css,o=r.sourceMap,a=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||a)&&(n=p(n)),o&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var i=new Blob([n],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(i),s&&URL.revokeObjectURL(s)}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var r=e.protocol+"//"+e.host,n=r+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(t,e){var o,a=e.trim().replace(/^"(.*)"$/,(function(t,e){return e})).replace(/^'(.*)'$/,(function(t,e){return e}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(a)?t:(o=0===a.indexOf("//")?a:0===a.indexOf("/")?r+a:n+a.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")}))}},function(t,e,r){"use strict";r.r(e);function n(t="div",e="",r={},n=""){let o=document.createElement(t);return o.className=n,o.innerHTML=e,Object.keys(r).forEach(e=>{let n=e,a=r[e];"video"===t||"audio"===t?a&&o.setAttribute(n,a):o.setAttribute(n,a)}),o}function o(t,e){return!!t&&(t.classList?Array.prototype.some.call(t.classList,t=>t===e):!!t.className&&!!t.className.match(new RegExp("(\\s|^)"+e+"(\\s|$)")))}function a(t,e){t&&(t.classList?e.replace(/(^\s+|\s+$)/g,"").split(/\s+/g).forEach(e=>{e&&t.classList.add(e)}):o(t,e)||(t.className+=" "+e))}function i(t,e){t&&(t.classList?e.split(/\s+/g).forEach(e=>{t.classList.remove(e)}):o(t,e)&&e.split(/\s+/g).forEach(e=>{let r=new RegExp("(\\s|^)"+e+"(\\s|$)");t.className=t.className.replace(r," ")}))}r(0);function s(t,e,r,n){if(0===e.length)return void(t.innerHTML="");let o=[];o.push(`<li data-type="off" class="${n?"":"selected"}">${r}</li>`),e.forEach(t=>{o.push(`<li data-id=${t.id} data-language=${t.language} class="${t.isDefault&&n?"selected":""}">${t.label}</li>`)}),t.innerHTML=o.join("")}var l={name:"s_textTrack",method:function(){let t=this;if(!this.config.textTrack)return;let e=this.config.textTrack;const r=n("xg-texttrack",`<ul></ul><p class="name">${t.lang.TEXTTRACK}</p>`,{tabindex:7},"xgplayer-texttrack");const l=function(n){if(!n.isListUpdate)return;const o=r.getElementsByTagName("ul")[0];e=n.list,s(o,n.list,t.lang.OFF,t.textTrackShowDefault),n.list.length>0?a(t.root,"xgplayer-is-texttrack"):i(t.root,"xgplayer-is-texttrack"),0===n.list.length?a(r,"xgplayer-texttrack-hide"):i(r,"xgplayer-texttrack-hide")};e&&Array.isArray(e)&&(e.length>0&&a(t.root,"xgplayer-is-texttrack"),t.once("canplay",(function(){if(!t.root.querySelector(".xgplayer-texttrack")){t.controls.appendChild(r);const e=r.querySelector(".name");t.config.textTrackActive&&"hover"!==t.config.textTrackActive?e.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),o(t.root,"xgplayer-texttrack-active")?i(t.root,"xgplayer-texttrack-active"):a(t.root,"xgplayer-texttrack-active")}):(e.addEventListener("mouseenter",e=>{e.preventDefault(),e.stopPropagation(),a(t.root,"xgplayer-texttrack-active"),r.focus()}),r.addEventListener("mouseleave",e=>{e.preventDefault(),e.stopPropagation(),i(t.root,"xgplayer-texttrack-active")}))}["touchend","click"].forEach(e=>{r.addEventListener(e,(function(e){e.preventDefault(),e.stopPropagation();let r=e.target||e.srcElement;if(r&&"li"===r.tagName.toLocaleLowerCase()){const e=r.getAttribute("data-id"),n=r.getAttribute("data-type"),o=r.getAttribute("data-language");Array.prototype.forEach.call(r.parentNode.childNodes,t=>{i(t,"selected")}),a(r,"selected"),"off"===n?(t.switchOffSubtile(),i(t.root,"xgplayer-texttrack-active")):(t.switchSubTitle({id:e,language:o}),a(t.root,"xgplayer-texttrack-active"))}}))}),s(r.getElementsByTagName("ul")[0],e,t.lang.OFF,t.textTrackShowDefault),0===e.length?a(r,"xgplayer-texttrack-hide"):i(r,"xgplayer-texttrack-hide")})),t.on("subtitle_change",l))}};e.default={name:"textTrack",method:function(){l.method.call(this)}}}])}));