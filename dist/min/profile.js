function _mergeNamespaces(e,n){return n.forEach((function(n){n&&"string"!=typeof n&&!Array.isArray(n)&&Object.keys(n).forEach((function(r){if("default"!==r&&!(r in e)){var t=Object.getOwnPropertyDescriptor(n,r);Object.defineProperty(e,r,t.get?t:{enumerable:!0,get:function(){return n[r]}})}}))})),Object.freeze(e)}function profile(e){return{name:"Python profiler",contains:[e.C_NUMBER_MODE,{begin:"[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}",end:":",excludeEnd:!0},{begin:"(ncalls|tottime|cumtime)",end:"$",keywords:"ncalls tottime|10 cumtime|10 filename",relevance:10},{begin:"function calls",end:"$",contains:[e.C_NUMBER_MODE],relevance:10},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,{className:"string",begin:"\\(",end:"\\)$",excludeBegin:!0,excludeEnd:!0,relevance:0}]}}var profile_1=profile,profile$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:profile_1},[profile_1]));export{profile$1 as p};