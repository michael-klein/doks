function _mergeNamespaces(e,n){return n.forEach((function(n){n&&"string"!=typeof n&&!Array.isArray(n)&&Object.keys(n).forEach((function(t){if("default"!==t&&!(t in e)){var s=Object.getOwnPropertyDescriptor(n,t);Object.defineProperty(e,t,s.get?s:{enumerable:!0,get:function(){return n[t]}})}}))})),Object.freeze(e)}function moonscript(e){const n={keyword:"if then not for in while do return else elseif break continue switch and or unless when class extends super local import export from using",literal:"true false nil",built_in:"_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"},t="[A-Za-z$_][0-9A-Za-z$_]*",s={className:"subst",begin:/#\{/,end:/\}/,keywords:n},a=[e.inherit(e.C_NUMBER_MODE,{starts:{end:"(\\s*/)?",relevance:0}}),{className:"string",variants:[{begin:/'/,end:/'/,contains:[e.BACKSLASH_ESCAPE]},{begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,s]}]},{className:"built_in",begin:"@__"+e.IDENT_RE},{begin:"@"+e.IDENT_RE},{begin:e.IDENT_RE+"\\\\"+e.IDENT_RE}];s.contains=a;const r=e.inherit(e.TITLE_MODE,{begin:t}),i="(\\(.*\\)\\s*)?\\B[-=]>",o={className:"params",begin:"\\([^\\(]",returnBegin:!0,contains:[{begin:/\(/,end:/\)/,keywords:n,contains:["self"].concat(a)}]};return{name:"MoonScript",aliases:["moon"],keywords:n,illegal:/\/\*/,contains:a.concat([e.COMMENT("--","$"),{className:"function",begin:"^\\s*"+t+"\\s*=\\s*"+i,end:"[-=]>",returnBegin:!0,contains:[r,o]},{begin:/[\(,:=]\s*/,relevance:0,contains:[{className:"function",begin:i,end:"[-=]>",returnBegin:!0,contains:[o]}]},{className:"class",beginKeywords:"class",end:"$",illegal:/[:="\[\]]/,contains:[{beginKeywords:"extends",endsWithParent:!0,illegal:/[:="\[\]]/,contains:[r]},r]},{className:"name",begin:t+":",end:":",returnBegin:!0,returnEnd:!0,relevance:0}])}}var moonscript_1=moonscript,moonscript$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:moonscript_1},[moonscript_1]));export{moonscript$1 as m};