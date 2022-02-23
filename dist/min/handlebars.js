function _mergeNamespaces(e,n){return n.forEach((function(n){n&&"string"!=typeof n&&!Array.isArray(n)&&Object.keys(n).forEach((function(a){if("default"!==a&&!(a in e)){var t=Object.getOwnPropertyDescriptor(n,a);Object.defineProperty(e,a,t.get?t:{enumerable:!0,get:function(){return n[a]}})}}))})),Object.freeze(e)}function source(e){return e?"string"==typeof e?e:e.source:null}function anyNumberOfTimes(e){return concat("(",e,")*")}function optional(e){return concat("(",e,")?")}function concat(...e){return e.map((e=>source(e))).join("")}function either(...e){return"("+e.map((e=>source(e))).join("|")+")"}function handlebars(e){const n={"builtin-name":["action","bindattr","collection","component","concat","debugger","each","each-in","get","hash","if","in","input","link-to","loc","log","lookup","mut","outlet","partial","query-params","render","template","textarea","unbound","unless","view","with","yield"]},a=/\[\]|\[[^\]]+\]/,t=/[^\s!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+/,s=either(/""|"[^"]+"/,/''|'[^']+'/,a,t),r=concat(optional(/\.|\.\/|\//),s,anyNumberOfTimes(concat(/(\.|\/)/,s))),i=concat("(",a,"|",t,")(?==)"),o={begin:r,lexemes:/[\w.\/]+/},c=e.inherit(o,{keywords:{literal:["true","false","undefined","null"]}}),l={begin:/\(/,end:/\)/},m={className:"attr",begin:i,relevance:0,starts:{begin:/=/,end:/=/,starts:{contains:[e.NUMBER_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,c,l]}}},u={contains:[e.NUMBER_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,{begin:/as\s+\|/,keywords:{keyword:"as"},end:/\|/,contains:[{begin:/\w+/}]},m,c,l],returnEnd:!0},d=e.inherit(o,{className:"name",keywords:n,starts:e.inherit(u,{end:/\)/})});l.contains=[d];const b=e.inherit(o,{keywords:n,className:"name",starts:e.inherit(u,{end:/\}\}/})}),g=e.inherit(o,{keywords:n,className:"name"}),h=e.inherit(o,{className:"name",keywords:n,starts:e.inherit(u,{end:/\}\}/})});return{name:"Handlebars",aliases:["hbs","html.hbs","html.handlebars","htmlbars"],case_insensitive:!0,subLanguage:"xml",contains:[{begin:/\\\{\{/,skip:!0},{begin:/\\\\(?=\{\{)/,skip:!0},e.COMMENT(/\{\{!--/,/--\}\}/),e.COMMENT(/\{\{!/,/\}\}/),{className:"template-tag",begin:/\{\{\{\{(?!\/)/,end:/\}\}\}\}/,contains:[b],starts:{end:/\{\{\{\{\//,returnEnd:!0,subLanguage:"xml"}},{className:"template-tag",begin:/\{\{\{\{\//,end:/\}\}\}\}/,contains:[g]},{className:"template-tag",begin:/\{\{#/,end:/\}\}/,contains:[b]},{className:"template-tag",begin:/\{\{(?=else\}\})/,end:/\}\}/,keywords:"else"},{className:"template-tag",begin:/\{\{(?=else if)/,end:/\}\}/,keywords:"else if"},{className:"template-tag",begin:/\{\{\//,end:/\}\}/,contains:[g]},{className:"template-variable",begin:/\{\{\{/,end:/\}\}\}/,contains:[h]},{className:"template-variable",begin:/\{\{/,end:/\}\}/,contains:[h]}]}}var handlebars_1=handlebars,handlebars$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:handlebars_1},[handlebars_1]));export{handlebars$1 as h};