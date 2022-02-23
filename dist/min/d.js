function _mergeNamespaces(e,a){return a.forEach((function(a){a&&"string"!=typeof a&&!Array.isArray(a)&&Object.keys(a).forEach((function(t){if("default"!==t&&!(t in e)){var n=Object.getOwnPropertyDescriptor(a,t);Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:function(){return a[t]}})}}))})),Object.freeze(e)}function d(e){const a={$pattern:e.UNDERSCORE_IDENT_RE,keyword:"abstract alias align asm assert auto body break byte case cast catch class const continue debug default delete deprecated do else enum export extern final finally for foreach foreach_reverse|10 goto if immutable import in inout int interface invariant is lazy macro mixin module new nothrow out override package pragma private protected public pure ref return scope shared static struct super switch synchronized template this throw try typedef typeid typeof union unittest version void volatile while with __FILE__ __LINE__ __gshared|10 __thread __traits __DATE__ __EOF__ __TIME__ __TIMESTAMP__ __VENDOR__ __VERSION__",built_in:"bool cdouble cent cfloat char creal dchar delegate double dstring float function idouble ifloat ireal long real short string ubyte ucent uint ulong ushort wchar wstring",literal:"false null true"},t="((0|[1-9][\\d_]*)|0[bB][01_]+|0[xX]([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*))",n="\\\\(['\"\\?\\\\abfnrtv]|u[\\dA-Fa-f]{4}|[0-7]{1,3}|x[\\dA-Fa-f]{2}|U[\\dA-Fa-f]{8})|&[a-zA-Z\\d]{2,};",d={className:"number",begin:"\\b"+t+"(L|u|U|Lu|LU|uL|UL)?",relevance:0},r={className:"number",begin:"\\b(((0[xX](([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)\\.([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)|\\.?([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*))[pP][+-]?(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d))|((0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)(\\.\\d*|([eE][+-]?(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)))|\\d+\\.(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)|\\.(0|[1-9][\\d_]*)([eE][+-]?(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d))?))([fF]|L|i|[fF]i|Li)?|"+t+"(i|[fF]i|Li))",relevance:0},_={className:"string",begin:"'("+n+"|.)",end:"'",illegal:"."},i={className:"string",begin:'"',contains:[{begin:n,relevance:0}],end:'"[cwd]?'},s=e.COMMENT("\\/\\+","\\+\\/",{contains:["self"],relevance:10});return{name:"D",keywords:a,contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,s,{className:"string",begin:'x"[\\da-fA-F\\s\\n\\r]*"[cwd]?',relevance:10},i,{className:"string",begin:'[rq]"',end:'"[cwd]?',relevance:5},{className:"string",begin:"`",end:"`[cwd]?"},{className:"string",begin:'q"\\{',end:'\\}"'},r,d,_,{className:"meta",begin:"^#!",end:"$",relevance:5},{className:"meta",begin:"#(line)",end:"$",relevance:5},{className:"keyword",begin:"@[a-zA-Z_][a-zA-Z_\\d]*"}]}}var d_1=d,d$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:d_1},[d_1]));export{d$1 as d};