function _mergeNamespaces(e,s){return s.forEach((function(s){s&&"string"!=typeof s&&!Array.isArray(s)&&Object.keys(s).forEach((function(t){if("default"!==t&&!(t in e)){var r=Object.getOwnPropertyDescriptor(s,t);Object.defineProperty(e,t,r.get?r:{enumerable:!0,get:function(){return s[t]}})}}))})),Object.freeze(e)}function shell(e){return{name:"Shell Session",aliases:["console"],contains:[{className:"meta",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#]/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}var shell_1=shell,shell$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:shell_1},[shell_1]));export{shell$1 as s};