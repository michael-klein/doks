function _mergeNamespaces(e,n){return n.forEach((function(n){n&&"string"!=typeof n&&!Array.isArray(n)&&Object.keys(n).forEach((function(a){if("default"!==a&&!(a in e)){var t=Object.getOwnPropertyDescriptor(n,a);Object.defineProperty(e,a,t.get?t:{enumerable:!0,get:function(){return n[a]}})}}))})),Object.freeze(e)}function source(e){return e?"string"==typeof e?e:e.source:null}function lookahead(e){return concat("(?=",e,")")}function concat(...e){return e.map((e=>source(e))).join("")}function variants(e,n={}){return n.variants=e,n}function groovy(e){const n="[A-Za-z0-9_$]+",a=variants([e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{begin:/\w+@/,relevance:0},{className:"doctag",begin:"@[A-Za-z]+"}]})]),t={className:"regexp",begin:/~?\/[^\/\n]+\//,contains:[e.BACKSLASH_ESCAPE]},r=variants([e.BINARY_NUMBER_MODE,e.C_NUMBER_MODE]),o=variants([{begin:/"""/,end:/"""/},{begin:/'''/,end:/'''/},{begin:"\\$/",end:"/\\$",relevance:10},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE],{className:"string"});return{name:"Groovy",keywords:{built_in:"this super",literal:"true false null",keyword:"byte short char int long boolean float double void def as in assert trait abstract static volatile transient public private protected synchronized final class interface enum if else for while switch case break default continue throw throws try catch finally implements extends new import package return instanceof"},contains:[e.SHEBANG({binary:"groovy",relevance:10}),a,o,t,r,{className:"class",beginKeywords:"class interface trait enum",end:/\{/,illegal:":",contains:[{beginKeywords:"extends implements"},e.UNDERSCORE_TITLE_MODE]},{className:"meta",begin:"@[A-Za-z]+",relevance:0},{className:"attr",begin:n+"[ \t]*:",relevance:0},{begin:/\?/,end:/:/,relevance:0,contains:[a,o,t,r,"self"]},{className:"symbol",begin:"^[ \t]*"+lookahead(n+":"),excludeBegin:!0,end:n+":",relevance:0}],illegal:/#|<\//}}var groovy_1=groovy,groovy$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:groovy_1},[groovy_1]));export{groovy$1 as g};