(()=>{var e={559:(e,t,r)=>{e.exports=r(335)},786:(e,t,r)=>{"use strict";var n=r(266),o=r(608),i=r(159),a=r(568),s=r(943),c=r(201),u=r(745),f=r(765),l=r(477),p=r(132),d=r(392);e.exports=function(e){return new Promise((function(t,r){var h,v=e.data,m=e.headers,g=e.responseType;function b(){e.cancelToken&&e.cancelToken.unsubscribe(h),e.signal&&e.signal.removeEventListener("abort",h)}n.isFormData(v)&&n.isStandardBrowserEnv()&&delete m["Content-Type"];var y=new XMLHttpRequest;if(e.auth){var w=e.auth.username||"",E=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";m.Authorization="Basic "+btoa(w+":"+E)}var x=s(e.baseURL,e.url);function C(){if(y){var n="getAllResponseHeaders"in y?c(y.getAllResponseHeaders()):null,i={data:g&&"text"!==g&&"json"!==g?y.response:y.responseText,status:y.status,statusText:y.statusText,headers:n,config:e,request:y};o((function(e){t(e),b()}),(function(e){r(e),b()}),i),y=null}}if(y.open(e.method.toUpperCase(),a(x,e.params,e.paramsSerializer),!0),y.timeout=e.timeout,"onloadend"in y?y.onloadend=C:y.onreadystatechange=function(){y&&4===y.readyState&&(0!==y.status||y.responseURL&&0===y.responseURL.indexOf("file:"))&&setTimeout(C)},y.onabort=function(){y&&(r(new l("Request aborted",l.ECONNABORTED,e,y)),y=null)},y.onerror=function(){r(new l("Network Error",l.ERR_NETWORK,e,y,y)),y=null},y.ontimeout=function(){var t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",n=e.transitional||f;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(new l(t,n.clarifyTimeoutError?l.ETIMEDOUT:l.ECONNABORTED,e,y)),y=null},n.isStandardBrowserEnv()){var T=(e.withCredentials||u(x))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;T&&(m[e.xsrfHeaderName]=T)}"setRequestHeader"in y&&n.forEach(m,(function(e,t){void 0===v&&"content-type"===t.toLowerCase()?delete m[t]:y.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(y.withCredentials=!!e.withCredentials),g&&"json"!==g&&(y.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&y.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&y.upload&&y.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(h=function(e){y&&(r(!e||e&&e.type?new p:e),y.abort(),y=null)},e.cancelToken&&e.cancelToken.subscribe(h),e.signal&&(e.signal.aborted?h():e.signal.addEventListener("abort",h))),v||(v=null);var R=d(x);R&&-1===["http","https","file"].indexOf(R)?r(new l("Unsupported protocol "+R+":",l.ERR_BAD_REQUEST,e)):y.send(v)}))}},335:(e,t,r)=>{"use strict";var n=r(266),o=r(345),i=r(929),a=r(650),s=function e(t){var r=new i(t),s=o(i.prototype.request,r);return n.extend(s,i.prototype,r),n.extend(s,r),s.create=function(r){return e(a(t,r))},s}(r(101));s.Axios=i,s.CanceledError=r(132),s.CancelToken=r(510),s.isCancel=r(825),s.VERSION=r(992).version,s.toFormData=r(11),s.AxiosError=r(477),s.Cancel=s.CanceledError,s.all=function(e){return Promise.all(e)},s.spread=r(346),s.isAxiosError=r(276),e.exports=s,e.exports.default=s},510:(e,t,r)=>{"use strict";var n=r(132);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;this.promise.then((function(e){if(r._listeners){var t,n=r._listeners.length;for(t=0;t<n;t++)r._listeners[t](e);r._listeners=null}})),this.promise.then=function(e){var t,n=new Promise((function(e){r.subscribe(e),t=e})).then(e);return n.cancel=function(){r.unsubscribe(t)},n},e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.prototype.subscribe=function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},o.prototype.unsubscribe=function(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},132:(e,t,r)=>{"use strict";var n=r(477);function o(e){n.call(this,null==e?"canceled":e,n.ERR_CANCELED),this.name="CanceledError"}r(266).inherits(o,n,{__CANCEL__:!0}),e.exports=o},825:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},929:(e,t,r)=>{"use strict";var n=r(266),o=r(568),i=r(252),a=r(29),s=r(650),c=r(943),u=r(123),f=u.validators;function l(e){this.defaults=e,this.interceptors={request:new i,response:new i}}l.prototype.request=function(e,t){"string"==typeof e?(t=t||{}).url=e:t=e||{},(t=s(this.defaults,t)).method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var r=t.transitional;void 0!==r&&u.assertOptions(r,{silentJSONParsing:f.transitional(f.boolean),forcedJSONParsing:f.transitional(f.boolean),clarifyTimeoutError:f.transitional(f.boolean)},!1);var n=[],o=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(o=o&&e.synchronous,n.unshift(e.fulfilled,e.rejected))}));var i,c=[];if(this.interceptors.response.forEach((function(e){c.push(e.fulfilled,e.rejected)})),!o){var l=[a,void 0];for(Array.prototype.unshift.apply(l,n),l=l.concat(c),i=Promise.resolve(t);l.length;)i=i.then(l.shift(),l.shift());return i}for(var p=t;n.length;){var d=n.shift(),h=n.shift();try{p=d(p)}catch(e){h(e);break}}try{i=a(p)}catch(e){return Promise.reject(e)}for(;c.length;)i=i.then(c.shift(),c.shift());return i},l.prototype.getUri=function(e){e=s(this.defaults,e);var t=c(e.baseURL,e.url);return o(t,e.params,e.paramsSerializer)},n.forEach(["delete","get","head","options"],(function(e){l.prototype[e]=function(t,r){return this.request(s(r||{},{method:e,url:t,data:(r||{}).data}))}})),n.forEach(["post","put","patch"],(function(e){function t(t){return function(r,n,o){return this.request(s(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:r,data:n}))}}l.prototype[e]=t(),l.prototype[e+"Form"]=t(!0)})),e.exports=l},477:(e,t,r)=>{"use strict";var n=r(266);function o(e,t,r,n,o){Error.call(this),this.message=e,this.name="AxiosError",t&&(this.code=t),r&&(this.config=r),n&&(this.request=n),o&&(this.response=o)}n.inherits(o,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var i=o.prototype,a={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach((function(e){a[e]={value:e}})),Object.defineProperties(o,a),Object.defineProperty(i,"isAxiosError",{value:!0}),o.from=function(e,t,r,a,s,c){var u=Object.create(i);return n.toFlatObject(e,u,(function(e){return e!==Error.prototype})),o.call(u,e.message,t,r,a,s),u.name=e.name,c&&Object.assign(u,c),u},e.exports=o},252:(e,t,r)=>{"use strict";var n=r(266);function o(){this.handlers=[]}o.prototype.use=function(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},943:(e,t,r)=>{"use strict";var n=r(406),o=r(27);e.exports=function(e,t){return e&&!n(t)?o(e,t):t}},29:(e,t,r)=>{"use strict";var n=r(266),o=r(661),i=r(825),a=r(101),s=r(132);function c(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new s}e.exports=function(e){return c(e),e.headers=e.headers||{},e.data=o.call(e,e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||a.adapter)(e).then((function(t){return c(e),t.data=o.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(c(e),t&&t.response&&(t.response.data=o.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},650:(e,t,r)=>{"use strict";var n=r(266);e.exports=function(e,t){t=t||{};var r={};function o(e,t){return n.isPlainObject(e)&&n.isPlainObject(t)?n.merge(e,t):n.isPlainObject(t)?n.merge({},t):n.isArray(t)?t.slice():t}function i(r){return n.isUndefined(t[r])?n.isUndefined(e[r])?void 0:o(void 0,e[r]):o(e[r],t[r])}function a(e){if(!n.isUndefined(t[e]))return o(void 0,t[e])}function s(r){return n.isUndefined(t[r])?n.isUndefined(e[r])?void 0:o(void 0,e[r]):o(void 0,t[r])}function c(r){return r in t?o(e[r],t[r]):r in e?o(void 0,e[r]):void 0}var u={url:a,method:a,data:a,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:c};return n.forEach(Object.keys(e).concat(Object.keys(t)),(function(e){var t=u[e]||i,o=t(e);n.isUndefined(o)&&t!==c||(r[e]=o)})),r}},608:(e,t,r)=>{"use strict";var n=r(477);e.exports=function(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(new n("Request failed with status code "+r.status,[n.ERR_BAD_REQUEST,n.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r)):e(r)}},661:(e,t,r)=>{"use strict";var n=r(266),o=r(101);e.exports=function(e,t,r){var i=this||o;return n.forEach(r,(function(r){e=r.call(i,e,t)})),e}},101:(e,t,r)=>{"use strict";var n=r(266),o=r(490),i=r(477),a=r(765),s=r(11),c={"Content-Type":"application/x-www-form-urlencoded"};function u(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var f,l={transitional:a,adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(f=r(786)),f),transformRequest:[function(e,t){if(o(t,"Accept"),o(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e))return e;if(n.isArrayBufferView(e))return e.buffer;if(n.isURLSearchParams(e))return u(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString();var r,i=n.isObject(e),a=t&&t["Content-Type"];if((r=n.isFileList(e))||i&&"multipart/form-data"===a){var c=this.env&&this.env.FormData;return s(r?{"files[]":e}:e,c&&new c)}return i||"application/json"===a?(u(t,"application/json"),function(e,t,r){if(n.isString(e))try{return(0,JSON.parse)(e),n.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(0,JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional||l.transitional,r=t&&t.silentJSONParsing,o=t&&t.forcedJSONParsing,a=!r&&"json"===this.responseType;if(a||o&&n.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(a){if("SyntaxError"===e.name)throw i.from(e,i.ERR_BAD_RESPONSE,this,null,this.response);throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:r(689)},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],(function(e){l.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){l.headers[e]=n.merge(c)})),e.exports=l},765:e=>{"use strict";e.exports={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1}},992:e=>{e.exports={version:"0.27.2"}},345:e=>{"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},568:(e,t,r)=>{"use strict";var n=r(266);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var i;if(r)i=r(t);else if(n.isURLSearchParams(t))i=t.toString();else{var a=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),a.push(o(t)+"="+o(e))})))})),i=a.join("&")}if(i){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},27:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},159:(e,t,r)=>{"use strict";var n=r(266);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),n.isString(o)&&s.push("path="+o),n.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},406:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}},276:(e,t,r)=>{"use strict";var n=r(266);e.exports=function(e){return n.isObject(e)&&!0===e.isAxiosError}},745:(e,t,r)=>{"use strict";var n=r(266);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(t){var r=n.isString(t)?o(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},490:(e,t,r)=>{"use strict";var n=r(266);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},689:e=>{e.exports=null},201:(e,t,r)=>{"use strict";var n=r(266),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,i,a={};return e?(n.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=n.trim(e.substr(0,i)).toLowerCase(),r=n.trim(e.substr(i+1)),t){if(a[t]&&o.indexOf(t)>=0)return;a[t]="set-cookie"===t?(a[t]?a[t]:[]).concat([r]):a[t]?a[t]+", "+r:r}})),a):a}},392:e=>{"use strict";e.exports=function(e){var t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}},346:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},11:(e,t,r)=>{"use strict";var n=r(266);e.exports=function(e,t){t=t||new FormData;var r=[];function o(e){return null===e?"":n.isDate(e)?e.toISOString():n.isArrayBuffer(e)||n.isTypedArray(e)?"function"==typeof Blob?new Blob([e]):Buffer.from(e):e}return function e(i,a){if(n.isPlainObject(i)||n.isArray(i)){if(-1!==r.indexOf(i))throw Error("Circular reference detected in "+a);r.push(i),n.forEach(i,(function(r,i){if(!n.isUndefined(r)){var s,c=a?a+"."+i:i;if(r&&!a&&"object"==typeof r)if(n.endsWith(i,"{}"))r=JSON.stringify(r);else if(n.endsWith(i,"[]")&&(s=n.toArray(r)))return void s.forEach((function(e){!n.isUndefined(e)&&t.append(c,o(e))}));e(r,c)}})),r.pop()}else t.append(a,o(i))}(e),t}},123:(e,t,r)=>{"use strict";var n=r(992).version,o=r(477),i={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){i[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}}));var a={};i.transitional=function(e,t,r){function i(e,t){return"[Axios v"+n+"] Transitional option '"+e+"'"+t+(r?". "+r:"")}return function(r,n,s){if(!1===e)throw new o(i(n," has been removed"+(t?" in "+t:"")),o.ERR_DEPRECATED);return t&&!a[n]&&(a[n]=!0,console.warn(i(n," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(r,n,s)}},e.exports={assertOptions:function(e,t,r){if("object"!=typeof e)throw new o("options must be an object",o.ERR_BAD_OPTION_VALUE);for(var n=Object.keys(e),i=n.length;i-- >0;){var a=n[i],s=t[a];if(s){var c=e[a],u=void 0===c||s(c,a,e);if(!0!==u)throw new o("option "+a+" must be "+u,o.ERR_BAD_OPTION_VALUE)}else if(!0!==r)throw new o("Unknown option "+a,o.ERR_BAD_OPTION)}},validators:i}},266:(e,t,r)=>{"use strict";var n,o=r(345),i=Object.prototype.toString,a=(n=Object.create(null),function(e){var t=i.call(e);return n[t]||(n[t]=t.slice(8,-1).toLowerCase())});function s(e){return e=e.toLowerCase(),function(t){return a(t)===e}}function c(e){return Array.isArray(e)}function u(e){return void 0===e}var f=s("ArrayBuffer");function l(e){return null!==e&&"object"==typeof e}function p(e){if("object"!==a(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}var d=s("Date"),h=s("File"),v=s("Blob"),m=s("FileList");function g(e){return"[object Function]"===i.call(e)}var b=s("URLSearchParams");function y(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),c(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}var w,E=(w="undefined"!=typeof Uint8Array&&Object.getPrototypeOf(Uint8Array),function(e){return w&&e instanceof w});e.exports={isArray:c,isArrayBuffer:f,isBuffer:function(e){return null!==e&&!u(e)&&null!==e.constructor&&!u(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){var t="[object FormData]";return e&&("function"==typeof FormData&&e instanceof FormData||i.call(e)===t||g(e.toString)&&e.toString()===t)},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&f(e.buffer)},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:l,isPlainObject:p,isUndefined:u,isDate:d,isFile:h,isBlob:v,isFunction:g,isStream:function(e){return l(e)&&g(e.pipe)},isURLSearchParams:b,isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:y,merge:function e(){var t={};function r(r,n){p(t[n])&&p(r)?t[n]=e(t[n],r):p(r)?t[n]=e({},r):c(r)?t[n]=r.slice():t[n]=r}for(var n=0,o=arguments.length;n<o;n++)y(arguments[n],r);return t},extend:function(e,t,r){return y(t,(function(t,n){e[n]=r&&"function"==typeof t?o(t,r):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e},inherits:function(e,t,r,n){e.prototype=Object.create(t.prototype,n),e.prototype.constructor=e,r&&Object.assign(e.prototype,r)},toFlatObject:function(e,t,r){var n,o,i,a={};t=t||{};do{for(o=(n=Object.getOwnPropertyNames(e)).length;o-- >0;)a[i=n[o]]||(t[i]=e[i],a[i]=!0);e=Object.getPrototypeOf(e)}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},kindOf:a,kindOfTest:s,endsWith:function(e,t,r){e=String(e),(void 0===r||r>e.length)&&(r=e.length),r-=t.length;var n=e.indexOf(t,r);return-1!==n&&n===r},toArray:function(e){if(!e)return null;var t=e.length;if(u(t))return null;for(var r=new Array(t);t-- >0;)r[t]=e[t];return r},isTypedArray:E,isFileList:m}},686:(e,t,r)=>{var n=!!(r.g===r.g.window&&r.g.URL&&r.g.Blob&&r.g.Worker);function o(e,t){var o,i=this;if(t=t||{},n)return o=e.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1],new r.g.Worker(r.g.URL.createObjectURL(new r.g.Blob([o],{type:"text/javascript"})));this.self=t,this.self.postMessage=function(e){setTimeout((function(){i.onmessage({data:e})}),0)},setTimeout(e.bind(t,t),0)}o.prototype.postMessage=function(e){var t=this;setTimeout((function(){t.self.onmessage({data:e})}),0)},e.exports=o}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=[{pro:0,color:"#FFE652"},{pro:1,color:"#FCD21C"}];const t=function(){function t(){this.canvas=document.getElementById("yylive_bear")}return t.prototype.init=function(){this.canvasRender()},t.prototype.dbclick=function(e){var t=this;this.canvas.addEventListener("dblclick",(function(){var r;(r=document.createElement("audio")).src="https://web.yystatic.com/project/nearlive-static/mobile/voices/voice_02.mp3",r.autoplay=!0,document.body.appendChild(r),r.addEventListener("ended",(function(){document.body.removeChild(r)})),e();var n=t.canvas.getContext("2d");t.drawChatBox(n,5,120,150,100)}))},t.prototype.canvasRender=function(){var t=this.canvas.getContext("2d"),r=136;t.save(),t.beginPath(),t.moveTo(120,235),t.bezierCurveTo(120,235,80,250,65,310),t.bezierCurveTo(65,310,120,310,120,240),t.fillStyle="#FBC700",t.fill(),t.closePath(),t.beginPath(),t.moveTo(70,290),t.bezierCurveTo(70,290,60,310,80,310),t.bezierCurveTo(80,310,85,290,70,290),t.fillStyle="#86491C",t.fill(),t.closePath(),t.restore(),t.beginPath(),t.moveTo(125,235),t.bezierCurveTo(125,235,165,250,180,310),t.bezierCurveTo(180,310,125,310,125,235),t.fillStyle="#FBC700",t.fill(),t.closePath(),t.beginPath(),t.moveTo(160,295),t.bezierCurveTo(160,295,175,275,180,310),t.bezierCurveTo(180,310,160,310,160,295),t.fillStyle="#86491C",t.fill(),t.closePath(),o(t,121,300,38,50,"#FDD528"),o(t,121,305,20,28,"#FFEFC5"),t.save(),t.beginPath(),t.moveTo(63,251),t.bezierCurveTo(78,276,158,276,173,251),t.bezierCurveTo(173,251,198,216,133,181),t.bezierCurveTo(173,296,203,156,143,188),t.bezierCurveTo(143,188,138,184,133,181),t.bezierCurveTo(131,181,138,164,113,181),t.bezierCurveTo(113,181,108,184,105,186),t.bezierCurveTo(105,186,63,156,68,214),t.bezierCurveTo(68,214,93,196,113,181),t.bezierCurveTo(113,181,43,211,63,251),function(e,t,r,n,o,i){for(var a=e.createLinearGradient(63,251,135,135),s=0;s<i.length;s++)a.addColorStop(i[s].pro,i[s].color);e.fillStyle=a,e.fill()}(t,0,0,0,0,e),t.closePath(),t.restore(),t.save(),t.beginPath(),t.moveTo(95,191),t.bezierCurveTo(95,191,73,176,78,204),i(t,"#8D4F1F"),t.closePath(),t.restore(),t.save(),t.beginPath(),t.moveTo(168,210),t.bezierCurveTo(168,210,173,186,153,194),i(t,"#8D4F1F"),t.closePath(),t.restore(),t.save(),t.beginPath(),t.moveTo(121,216),t.bezierCurveTo(113,191,83,201,78,231),t.bezierCurveTo(78,231,73,258,103,246),t.bezierCurveTo(103,246,123,231,143,246),t.bezierCurveTo(143,246,168,261,165,232),t.bezierCurveTo(165,226,149,181,130,216),t.bezierCurveTo(130,216,127,221,121,216),t.closePath(),i(t,"#8D4F1F"),t.restore(),t.save(),t.beginPath(),o(t,103,224,10,13,"#FFF"),o(t,102,224,8,10,"#8D4F1F"),o(t,103,221,3,4,"#fff"),t.restore();var n=this.canvas;function o(e,t,r,n,o,a){var s=n>o?1/n:1/o;e.beginPath(),e.moveTo(t+n,r);for(var c=0;c<2*Math.PI;c+=s)e.lineTo(t+n*Math.cos(c),r+o*Math.sin(c));e.closePath(),i(e,a)}function i(e,t){e.fillStyle=t,e.fill()}!function(){t.save();var e=225,i=!0,a=14,s=0;function c(){0===a?i=!1:14===a&&(s++,i=!0),i?a--:a++,t.beginPath();var n=.5522848,c=10*n,u=13*n;t.moveTo(135,225),t.bezierCurveTo(135,89-u+r,102-c+43,212,145,212),t.bezierCurveTo(102+c+43,212,155,89-u+r,155,225),t.bezierCurveTo(155,89+u+r,102+c+43,238,145,238),t.bezierCurveTo(102-c+43,238,135,89+u+r,135,225),t.fillStyle="#fff",t.fill(),o(t,145,225,8,10,"#8D4F1F"),o(t,143,223,3,4,"#fff"),t.beginPath(),t.strokeStyle="#8D4F1F";for(var f=0;f<25;f++)t.moveTo(132.5+f,e-a),t.lineTo(132.5+f,e-Math.floor(23*Math.sin(Math.PI*f/25))),t.moveTo(132.5+f,e+a),t.lineTo(132.5+f,e+Math.floor(23*Math.sin(Math.PI*f/25))),t.stroke();t.closePath()}c(),n.addEventListener("dblclick",(function(){var e=setInterval((function(){3===s?(console.log(s),clearInterval(e),s=0):c()}),20)})),t.restore()}(),t.save(),t.moveTo(117,250),t.beginPath(),t.bezierCurveTo(117,250,123,260,131,250),t.closePath(),i(t,"#8D4F1F"),t.restore()},t.prototype.drawChatBox=function(e,t,r,n,o){e.beginPath(),e.moveTo(t,r+.35*o),e.quadraticCurveTo(t+.04*n,r+.02*o,t+.5*n,r),e.quadraticCurveTo(t+.96*n,r+.02*o,t+n,r+.35*o),e.quadraticCurveTo(t+n,r+.7*o,t+.58*n,r+.72*o),e.quadraticCurveTo(t+.5*n,r+.9*o,t+.6*n,r+o),e.quadraticCurveTo(t+.38*n,r+.8*o,t+.38*n,r+.72*o),e.quadraticCurveTo(t,r+.7*o,t,r+.35*o),e.closePath(),e.stroke(),e.font="14px Verdana",e.fillStyle="black",e.fillText("按着回车说话~",30,160)},t}();var n=r(559),o=r.n(n),i=r(686),a=r.n(i);const s=function(){function e(e,t){var r=this;this.config={bufferLen:4096,numChannels:2,mimeType:"audio/wav"},this.recording=!1,this.callbacks={getBuffer:[],exportWAV:[]},Object.assign(this.config,t),this.context=e.context,this.node=this.context.createScriptProcessor.call(this.context,this.config.bufferLen,this.config.numChannels,this.config.numChannels),this.node.onaudioprocess=function(e){if(r.recording){for(var t=[],n=0;n<r.config.numChannels;n++)t.push(e.inputBuffer.getChannelData(n));r.worker.postMessage({command:"record",buffer:t})}},e.connect(this.node),this.node.connect(this.context.destination),this.worker=new(a())((function(){var e,t,r=0,n=[];function o(){for(var e=0;e<t;e++)n[e]=[]}function i(e,t){for(var r=new Float32Array(t),n=0,o=0;o<e.length;o++)r.set(e[o],n),n+=e[o].length;return r}function a(e,t,r){for(var n=0;n<r.length;n++)e.setUint8(t+n,r.charCodeAt(n))}this.onmessage=function(s){switch(s.data.command){case"init":c=s.data.config,e=c.sampleRate,t=c.numChannels,o();break;case"record":!function(e){for(var o=0;o<t;o++)n[o].push(e[o]);r+=e[0].length}(s.data.buffer);break;case"exportWAV":!function(o){for(var s=[],c=0;c<t;c++)s.push(i(n[c],r));var u,f,l,p=(u=2===t?function(e,t){for(var r=e.length+t.length,n=new Float32Array(r),o=0,i=0;o<r;)n[o++]=e[i],n[o++]=t[i],i++;return n}(s[0],s[1]):1===t?function(e){for(var t=Math.ceil(e.length/1),r=new Float32Array(t),n=0,o=0;n<t;)r[n++]=e[o],o+=1;return r}(s[0]):s[0],f=new ArrayBuffer(44+2*u.length),a(l=new DataView(f),0,"RIFF"),l.setUint32(4,36+2*u.length,!0),a(l,8,"WAVE"),a(l,12,"fmt"),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,t,!0),l.setUint32(24,e,!0),l.setUint32(28,4*e,!0),l.setUint16(32,2*t,!0),l.setUint16(34,16,!0),a(l,36,"data"),l.setUint32(40,2*u.length,!0),function(e,t,r){for(var n=0;n<r.length;n++,t+=2){var o=Math.max(-1,Math.min(1,r[n]));e.setInt16(t,o<0?32768*o:32767*o,!0)}}(l,44,u),l),d=new Blob([p],{type:o});this.postMessage({command:"exportWAV",data:d})}(s.data.type);break;case"getBuffer":!function(){for(var e=[],o=0;o<t;o++)e.push(i(n[o],r));this.postMessage({command:"getBuffer",data:e})}();break;case"clear":r=0,n=[],o()}var c}}),{}),this.worker.postMessage({command:"init",config:{samleRate:this.context.sampleRate,numChannels:this.config.numChannels}}),this.worker.onmessage=function(e){var t=r.callbacks[e.data.command].pop();"function"==typeof t&&t(e.data.data)}}return e.prototype.record=function(){this.recording=!0},e.prototype.stop=function(){this.recording=!1},e.prototype.clear=function(){this.worker.postMessage({command:"clear"})},e.prototype.getBuffer=function(e){if(!(e=e||this.config.callback))throw new Error("Callbak not set");this.callbacks.getBuffer.push(e),this.worker.postMessage({command:"getBuffer"})},e.prototype.exportWAV=function(e,t){if(t=t||this.config.mimeType,!(e=e||this.config.callback))throw new Error("Callback not set");this.callbacks.exportWAV.push(e),this.worker.postMessage({command:"exportWAV",type:t})},e.prototype.forceDonload=function(e,t){var r=(window.URL||window.webkitURL).createObjectURL(e),n=window.document.createElement("a");n.href=r,n.download=t||"output.wav";var o=document.createEvent("Event");o.initEvent("click",!0,!0),n.dispatchEvent(o)},e}();var c=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{c(n.next(e))}catch(e){i(e)}}function s(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))},u=function(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},f=null,l=null;function p(e){var t=l.createMediaStreamSource(e);console.log("Media stream created."),f=new s(t,{numChannels:1,sampleRate:16e3}),console.log("Recorder initialised.")}const d={init:function(){return c(this,void 0,void 0,(function(){return u(this,(function(e){try{navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia,window.URL=window.URL||window.webkitURL,l=new AudioContext({sampleRate:16e3}),console.log(l)}catch(e){alert("No web audio support in this browser!")}return navigator.getUserMedia({audio:!0},p,(function(e){console.log("错误：",e)})),[2]}))}))},start:function(){f&&f.record()},stop:function(){f&&f.stop()},upload:function(){var e=this;if(f)return new Promise((function(t,r){f.exportWAV((function(r){return c(e,void 0,void 0,(function(){var e,n;return u(this,(function(i){switch(i.label){case 0:return(e=new FormData).append("recorder.wav",r),[4,o()({url:"http:127.0.0.1:8081/process_post",method:"post",headers:{"Content-Type":"multipart/form-data"},data:e})];case 1:return n=i.sent(),f.clear(),t(n.data),[2]}}))}))}))}))}};var h=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{c(n.next(e))}catch(e){i(e)}}function s(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))},v=function(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},m=function(){function e(){this.init()}return e.prototype.init=function(){var e=document.createElement("div");e.id="yybear_pop",e.appendChild(this.createFrag('<canvas id=\'yylive_bear\' width="200" height="300"></canvas>')),document.body.appendChild(e),this.render()},e.prototype.createFrag=function(e){return document.createRange().createContextualFragment(e)},e.prototype.render=function(){var e=this,r=new t;r.init(),r.dbclick((function(){return e.getAudioRecorder()}))},e.prototype.getAudioRecorder=function(){return h(this,void 0,void 0,(function(){var e,t=this;return v(this,(function(r){return e=!1,d.init(),window.addEventListener("keydown",(function(t){e||32!==t.keyCode||(e=!0,d.start())})),window.addEventListener("keyup",(function(r){return h(t,void 0,void 0,(function(){var t;return v(this,(function(n){switch(n.label){case 0:return e&&32===r.keyCode?(d.stop(),[4,d.upload()]):[3,2];case 1:t=n.sent(),console.log("res:",t),this.handleWord(t.result[0]),e=!1,n.label=2;case 2:return[2]}}))}))})),[2]}))}))},e.prototype.handleWord=function(e){if(e.indexOf("首页")>-1)window.location.href="https://www.yy.com";else if(e.indexOf("弹慕")>-1){var t=e.split("弹慕")[1];console.log("danmu:",t)}else e.indexOf("直播间")>-1?window.location.href="https://www.yy.com/54880976/54880976?tempId=16777217":e.indexOf("个人页")>-1?window.location.href="https://www.yy.com/u/40187":e.indexOf("礼物")>-1?console.log("送礼:"):e.indexOf("取消关注")>-1||e.indexOf("取关")>-1?console.log("取关行为"):e.indexOf("关注")>-1&&console.log("关注行为")},e}();window.onload=function(){new m}})()})();