function _mergeNamespaces(e,n){return n.forEach((function(n){n&&"string"!=typeof n&&!Array.isArray(n)&&Object.keys(n).forEach((function(a){if("default"!==a&&!(a in e)){var i=Object.getOwnPropertyDescriptor(n,a);Object.defineProperty(e,a,i.get?i:{enumerable:!0,get:function(){return n[a]}})}}))})),Object.freeze(e)}function angelscript(e){var n={className:"built_in",begin:"\\b(void|bool|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|string|ref|array|double|float|auto|dictionary)"},a={className:"symbol",begin:"[a-zA-Z0-9_]+@"},i={className:"keyword",begin:"<",end:">",contains:[n,a]};return n.contains=[i],a.contains=[i],{name:"AngelScript",aliases:["asc"],keywords:"for in|0 break continue while do|0 return if else case switch namespace is cast or and xor not get|0 in inout|10 out override set|0 private public const default|0 final shared external mixin|10 enum typedef funcdef this super import from interface abstract|0 try catch protected explicit property",illegal:"(^using\\s+[A-Za-z0-9_\\.]+;$|\\bfunction\\s*[^\\(])",contains:[{className:"string",begin:"'",end:"'",illegal:"\\n",contains:[e.BACKSLASH_ESCAPE],relevance:0},{className:"string",begin:'"""',end:'"""'},{className:"string",begin:'"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE],relevance:0},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{className:"string",begin:"^\\s*\\[",end:"\\]"},{beginKeywords:"interface namespace",end:/\{/,illegal:"[;.\\-]",contains:[{className:"symbol",begin:"[a-zA-Z0-9_]+"}]},{beginKeywords:"class",end:/\{/,illegal:"[;.\\-]",contains:[{className:"symbol",begin:"[a-zA-Z0-9_]+",contains:[{begin:"[:,]\\s*",contains:[{className:"symbol",begin:"[a-zA-Z0-9_]+"}]}]}]},n,a,{className:"literal",begin:"\\b(null|true|false)"},{className:"number",relevance:0,begin:"(-?)(\\b0[xXbBoOdD][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?f?|\\.\\d+f?)([eE][-+]?\\d+f?)?)"}]}}var angelscript_1=angelscript,angelscript$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:angelscript_1},[angelscript_1]));export{angelscript$1 as a};