function _mergeNamespaces(e,n){return n.forEach((function(n){n&&"string"!=typeof n&&!Array.isArray(n)&&Object.keys(n).forEach((function(a){if("default"!==a&&!(a in e)){var i=Object.getOwnPropertyDescriptor(n,a);Object.defineProperty(e,a,i.get?i:{enumerable:!0,get:function(){return n[a]}})}}))})),Object.freeze(e)}function csharp(e){const n={keyword:["abstract","as","base","break","case","class","const","continue","do","else","event","explicit","extern","finally","fixed","for","foreach","goto","if","implicit","in","interface","internal","is","lock","namespace","new","operator","out","override","params","private","protected","public","readonly","record","ref","return","sealed","sizeof","stackalloc","static","struct","switch","this","throw","try","typeof","unchecked","unsafe","using","virtual","void","volatile","while"].concat(["add","alias","and","ascending","async","await","by","descending","equals","from","get","global","group","init","into","join","let","nameof","not","notnull","on","or","orderby","partial","remove","select","set","unmanaged","value|0","var","when","where","with","yield"]),built_in:["bool","byte","char","decimal","delegate","double","dynamic","enum","float","int","long","nint","nuint","object","sbyte","short","string","ulong","uint","ushort"],literal:["default","false","null","true"]},a=e.inherit(e.TITLE_MODE,{begin:"[a-zA-Z](\\.?\\w)*"}),i={className:"number",variants:[{begin:"\\b(0b[01']+)"},{begin:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"},{begin:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],relevance:0},r={className:"string",begin:'@"',end:'"',contains:[{begin:'""'}]},t=e.inherit(r,{illegal:/\n/}),s={className:"subst",begin:/\{/,end:/\}/,keywords:n},c=e.inherit(s,{illegal:/\n/}),l={className:"string",begin:/\$"/,end:'"',illegal:/\n/,contains:[{begin:/\{\{/},{begin:/\}\}/},e.BACKSLASH_ESCAPE,c]},o={className:"string",begin:/\$@"/,end:'"',contains:[{begin:/\{\{/},{begin:/\}\}/},{begin:'""'},s]},d=e.inherit(o,{illegal:/\n/,contains:[{begin:/\{\{/},{begin:/\}\}/},{begin:'""'},c]});s.contains=[o,l,r,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,i,e.C_BLOCK_COMMENT_MODE],c.contains=[d,l,t,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,i,e.inherit(e.C_BLOCK_COMMENT_MODE,{illegal:/\n/})];const g={variants:[o,l,r,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},_={begin:"<",end:">",contains:[{beginKeywords:"in out"},a]},b=e.IDENT_RE+"(<"+e.IDENT_RE+"(\\s*,\\s*"+e.IDENT_RE+")*>)?(\\[\\])?",E={begin:"@"+e.IDENT_RE,relevance:0};return{name:"C#",aliases:["cs","c#"],keywords:n,illegal:/::/,contains:[e.COMMENT("///","$",{returnBegin:!0,contains:[{className:"doctag",variants:[{begin:"///",relevance:0},{begin:"\x3c!--|--\x3e"},{begin:"</?",end:">"}]}]}),e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{className:"meta",begin:"#",end:"$",keywords:{"meta-keyword":"if else elif endif define undef warning error line region endregion pragma checksum"}},g,i,{beginKeywords:"class interface",relevance:0,end:/[{;=]/,illegal:/[^\s:,]/,contains:[{beginKeywords:"where class"},a,_,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{beginKeywords:"namespace",relevance:0,end:/[{;=]/,illegal:/[^\s:]/,contains:[a,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{beginKeywords:"record",relevance:0,end:/[{;=]/,illegal:/[^\s:]/,contains:[a,_,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{className:"meta",begin:"^\\s*\\[",excludeBegin:!0,end:"\\]",excludeEnd:!0,contains:[{className:"meta-string",begin:/"/,end:/"/}]},{beginKeywords:"new return throw await else",relevance:0},{className:"function",begin:"("+b+"\\s+)+"+e.IDENT_RE+"\\s*(<.+>\\s*)?\\(",returnBegin:!0,end:/\s*[{;=]/,excludeEnd:!0,keywords:n,contains:[{beginKeywords:["public","private","protected","static","internal","protected","abstract","async","extern","override","unsafe","virtual","new","sealed","partial"].join(" "),relevance:0},{begin:e.IDENT_RE+"\\s*(<.+>\\s*)?\\(",returnBegin:!0,contains:[e.TITLE_MODE,_],relevance:0},{className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:n,relevance:0,contains:[g,i,e.C_BLOCK_COMMENT_MODE]},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},E]}}var csharp_1=csharp,csharp$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:csharp_1},[csharp_1]));export{csharp$1 as c};