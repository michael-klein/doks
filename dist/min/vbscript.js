function _mergeNamespaces(e,t){return t.forEach((function(t){t&&"string"!=typeof t&&!Array.isArray(t)&&Object.keys(t).forEach((function(r){if("default"!==r&&!(r in e)){var n=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,n.get?n:{enumerable:!0,get:function(){return t[r]}})}}))})),Object.freeze(e)}function source(e){return e?"string"==typeof e?e:e.source:null}function concat(...e){return e.map((e=>source(e))).join("")}function either(...e){return"("+e.map((e=>source(e))).join("|")+")"}function vbscript(e){const t="lcase month vartype instrrev ubound setlocale getobject rgb getref string weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency conversions csng timevalue second year space abs clng timeserial fixs len asc isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim strcomp int createobject loadpicture tan formatnumber mid split  cint sin datepart ltrim sqr time derived eval date formatpercent exp inputbox left ascw chrw regexp cstr err".split(" ");return{name:"VBScript",aliases:["vbs"],case_insensitive:!0,keywords:{keyword:"call class const dim do loop erase execute executeglobal exit for each next function if then else on error option explicit new private property let get public randomize redim rem select case set stop sub while wend with end to elseif is or xor and not class_initialize class_terminate default preserve in me byval byref step resume goto",built_in:["server","response","request","scriptengine","scriptenginebuildversion","scriptengineminorversion","scriptenginemajorversion"],literal:"true false null nothing empty"},illegal:"//",contains:[{begin:concat(either(...t),"\\s*\\("),relevance:0,keywords:{built_in:t}},e.inherit(e.QUOTE_STRING_MODE,{contains:[{begin:'""'}]}),e.COMMENT(/'/,/$/,{relevance:0}),e.C_NUMBER_MODE]}}var vbscript_1=vbscript,vbscript$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:vbscript_1},[vbscript_1]));export{vbscript$1 as v};