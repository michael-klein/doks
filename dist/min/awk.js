function _mergeNamespaces(e,n){return n.forEach((function(n){n&&"string"!=typeof n&&!Array.isArray(n)&&Object.keys(n).forEach((function(r){if("default"!==r&&!(r in e)){var a=Object.getOwnPropertyDescriptor(n,r);Object.defineProperty(e,r,a.get?a:{enumerable:!0,get:function(){return n[r]}})}}))})),Object.freeze(e)}function awk(e){return{name:"Awk",keywords:{keyword:"BEGIN END if else while do for in break continue delete next nextfile function func exit|10"},contains:[{className:"variable",variants:[{begin:/\$[\w\d#@][\w\d_]*/},{begin:/\$\{(.*?)\}/}]},{className:"string",contains:[e.BACKSLASH_ESCAPE],variants:[{begin:/(u|b)?r?'''/,end:/'''/,relevance:10},{begin:/(u|b)?r?"""/,end:/"""/,relevance:10},{begin:/(u|r|ur)'/,end:/'/,relevance:10},{begin:/(u|r|ur)"/,end:/"/,relevance:10},{begin:/(b|br)'/,end:/'/},{begin:/(b|br)"/,end:/"/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},e.REGEXP_MODE,e.HASH_COMMENT_MODE,e.NUMBER_MODE]}}var awk_1=awk,awk$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:awk_1},[awk_1]));export{awk$1 as a};