function _mergeNamespaces(e,n){return n.forEach((function(n){n&&"string"!=typeof n&&!Array.isArray(n)&&Object.keys(n).forEach((function(a){if("default"!==a&&!(a in e)){var t=Object.getOwnPropertyDescriptor(n,a);Object.defineProperty(e,a,t.get?t:{enumerable:!0,get:function(){return n[a]}})}}))})),Object.freeze(e)}const IDENT_RE="[A-Za-z$_][0-9A-Za-z$_]*",KEYWORDS=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],LITERALS=["true","false","null","undefined","NaN","Infinity"],TYPES=["Intl","DataView","Number","Math","Date","String","RegExp","Object","Function","Boolean","Error","Symbol","Set","Map","WeakSet","WeakMap","Proxy","Reflect","JSON","Promise","Float64Array","Int16Array","Int32Array","Int8Array","Uint16Array","Uint32Array","Float32Array","Array","Uint8Array","Uint8ClampedArray","ArrayBuffer","BigInt64Array","BigUint64Array","BigInt"],ERROR_TYPES=["EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],BUILT_IN_GLOBALS=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],BUILT_IN_VARIABLES=["arguments","this","super","console","window","document","localStorage","module","global"],BUILT_INS=[].concat(BUILT_IN_GLOBALS,BUILT_IN_VARIABLES,TYPES,ERROR_TYPES);function source(e){return e?"string"==typeof e?e:e.source:null}function lookahead(e){return concat("(?=",e,")")}function concat(...e){return e.map((e=>source(e))).join("")}function javascript(e){const n=IDENT_RE,a="<>",t="</>",r={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,n)=>{const a=e[0].length+e.index,t=e.input[a];"<"!==t?">"===t&&(((e,{after:n})=>{const a="</"+e[0].slice(1);return-1!==e.input.indexOf(a,n)})(e,{after:a})||n.ignoreMatch()):n.ignoreMatch()}},s={$pattern:IDENT_RE,keyword:KEYWORDS,literal:LITERALS,built_in:BUILT_INS},i="\\.([0-9](_?[0-9])*)",c="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",o={className:"number",variants:[{begin:`(\\b(${c})((${i})|\\.)?|(${i}))[eE][+-]?([0-9](_?[0-9])*)\\b`},{begin:`\\b(${c})\\b((${i})\\b|\\.)?|(${i})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},l={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},b={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,l],subLanguage:"xml"}},d={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,l],subLanguage:"css"}},g={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,l]},E={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+",contains:[{className:"type",begin:"\\{",end:"\\}",relevance:0},{className:"variable",begin:n+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},u=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,d,g,o,e.REGEXP_MODE];l.contains=u.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(u)});const _=[].concat(E,l.contains),p=_.concat([{begin:/\(/,end:/\)/,keywords:s,contains:["self"].concat(_)}]),y={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:p};return{name:"Javascript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:p},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,d,g,E,o,{begin:concat(/[{,\n]\s*/,lookahead(concat(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/,n+"\\s*:"))),relevance:0,contains:[{className:"attr",begin:n+lookahead("\\s*:"),relevance:0}]},{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",contains:[E,e.REGEXP_MODE,{className:"function",begin:"(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:p}]}]},{begin:/,/,relevance:0},{className:"",begin:/\s/,end:/\s*/,skip:!0},{variants:[{begin:a,end:t},{begin:r.begin,"on:begin":r.isTrulyOpeningTag,end:r.end}],subLanguage:"xml",contains:[{begin:r.begin,end:r.end,skip:!0,contains:["self"]}]}],relevance:0},{className:"function",beginKeywords:"function",end:/[{;]/,excludeEnd:!0,keywords:s,contains:["self",e.inherit(e.TITLE_MODE,{begin:n}),y],illegal:/%/},{beginKeywords:"while if switch catch for"},{className:"function",begin:e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,contains:[y,e.inherit(e.TITLE_MODE,{begin:n})]},{variants:[{begin:"\\."+n},{begin:"\\$"+n}],relevance:0},{className:"class",beginKeywords:"class",end:/[{;=]/,excludeEnd:!0,illegal:/[:"[\]]/,contains:[{beginKeywords:"extends"},e.UNDERSCORE_TITLE_MODE]},{begin:/\b(?=constructor)/,end:/[{;]/,excludeEnd:!0,contains:[e.inherit(e.TITLE_MODE,{begin:n}),"self",y]},{begin:"(get|set)\\s+(?="+n+"\\()",end:/\{/,keywords:"get set",contains:[e.inherit(e.TITLE_MODE,{begin:n}),{begin:/\(\)/},y]},{begin:/\$[(.]/}]}}function typescript(e){const n={$pattern:IDENT_RE,keyword:KEYWORDS.concat(["type","namespace","typedef","interface","public","private","protected","implements","declare","abstract","readonly"]),literal:LITERALS,built_in:BUILT_INS.concat(["any","void","number","boolean","string","object","never","enum"])},a={className:"meta",begin:"@[A-Za-z$_][0-9A-Za-z$_]*"},t=(e,n,a)=>{const t=e.contains.findIndex((e=>e.label===n));if(-1===t)throw new Error("can not find mode to replace");e.contains.splice(t,1,a)},r=javascript(e);Object.assign(r.keywords,n),r.exports.PARAMS_CONTAINS.push(a),r.contains=r.contains.concat([a,{beginKeywords:"namespace",end:/\{/,excludeEnd:!0},{beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:"interface extends"}]),t(r,"shebang",e.SHEBANG()),t(r,"use_strict",{className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/});return r.contains.find((e=>"function"===e.className)).relevance=0,Object.assign(r,{name:"TypeScript",aliases:["ts","tsx"]}),r}var typescript_1=typescript,typescript$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:typescript_1},[typescript_1]));export{typescript$1 as t};