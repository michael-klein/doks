function _mergeNamespaces(e,n){return n.forEach((function(n){n&&"string"!=typeof n&&!Array.isArray(n)&&Object.keys(n).forEach((function(r){if("default"!==r&&!(r in e)){var o=Object.getOwnPropertyDescriptor(n,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:function(){return n[r]}})}}))})),Object.freeze(e)}function prolog(e){const n={begin:/\(/,end:/\)/,relevance:0},r={begin:/\[/,end:/\]/},o={className:"comment",begin:/%/,end:/$/,contains:[e.PHRASAL_WORDS_MODE]},a={className:"string",begin:/`/,end:/`/,contains:[e.BACKSLASH_ESCAPE]},t=[{begin:/[a-z][A-Za-z0-9_]*/,relevance:0},{className:"symbol",variants:[{begin:/[A-Z][a-zA-Z0-9_]*/},{begin:/_[A-Za-z0-9_]*/}],relevance:0},n,{begin:/:-/},r,o,e.C_BLOCK_COMMENT_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,a,{className:"string",begin:/0'(\\'|.)/},{className:"string",begin:/0'\\s/},e.C_NUMBER_MODE];return n.contains=t,r.contains=t,{name:"Prolog",contains:t.concat([{begin:/\.$/}])}}var prolog_1=prolog,prolog$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:prolog_1},[prolog_1]));export{prolog$1 as p};