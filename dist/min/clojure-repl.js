function _mergeNamespaces(e,r){return r.forEach((function(r){r&&"string"!=typeof r&&!Array.isArray(r)&&Object.keys(r).forEach((function(t){if("default"!==t&&!(t in e)){var o=Object.getOwnPropertyDescriptor(r,t);Object.defineProperty(e,t,o.get?o:{enumerable:!0,get:function(){return r[t]}})}}))})),Object.freeze(e)}function clojureRepl(e){return{name:"Clojure REPL",contains:[{className:"meta",begin:/^([\w.-]+|\s*#_)?=>/,starts:{end:/$/,subLanguage:"clojure"}}]}}var clojureRepl_1=clojureRepl,clojureRepl$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:clojureRepl_1},[clojureRepl_1]));export{clojureRepl$1 as c};