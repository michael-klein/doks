function _mergeNamespaces(e,t){return t.forEach((function(t){t&&"string"!=typeof t&&!Array.isArray(t)&&Object.keys(t).forEach((function(n){if("default"!==n&&!(n in e)){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:function(){return t[n]}})}}))})),Object.freeze(e)}function ldif(e){return{name:"LDIF",contains:[{className:"attribute",begin:"^dn",end:": ",excludeEnd:!0,starts:{end:"$",relevance:0},relevance:10},{className:"attribute",begin:"^\\w",end:": ",excludeEnd:!0,starts:{end:"$",relevance:0}},{className:"literal",begin:"^-",end:"$"},e.HASH_COMMENT_MODE]}}var ldif_1=ldif,ldif$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:ldif_1},[ldif_1]));export{ldif$1 as l};