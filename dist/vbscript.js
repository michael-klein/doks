function _mergeNamespaces(n, m) {
  m.forEach(function(e) {
    e && typeof e !== "string" && !Array.isArray(e) && Object.keys(e).forEach(function(k) {
      if (k !== "default" && !(k in n)) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function() {
            return e[k];
          }
        });
      }
    });
  });
  return Object.freeze(n);
}
function source(re) {
  if (!re)
    return null;
  if (typeof re === "string")
    return re;
  return re.source;
}
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}
function either(...args) {
  const joined = "(" + args.map((x) => source(x)).join("|") + ")";
  return joined;
}
function vbscript(hljs) {
  const BUILT_IN_FUNCTIONS = "lcase month vartype instrrev ubound setlocale getobject rgb getref string weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency conversions csng timevalue second year space abs clng timeserial fixs len asc isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim strcomp int createobject loadpicture tan formatnumber mid split  cint sin datepart ltrim sqr time derived eval date formatpercent exp inputbox left ascw chrw regexp cstr err".split(" ");
  const BUILT_IN_OBJECTS = [
    "server",
    "response",
    "request",
    "scriptengine",
    "scriptenginebuildversion",
    "scriptengineminorversion",
    "scriptenginemajorversion"
  ];
  const BUILT_IN_CALL = {
    begin: concat(either(...BUILT_IN_FUNCTIONS), "\\s*\\("),
    relevance: 0,
    keywords: {
      built_in: BUILT_IN_FUNCTIONS
    }
  };
  return {
    name: "VBScript",
    aliases: ["vbs"],
    case_insensitive: true,
    keywords: {
      keyword: "call class const dim do loop erase execute executeglobal exit for each next function if then else on error option explicit new private property let get public randomize redim rem select case set stop sub while wend with end to elseif is or xor and not class_initialize class_terminate default preserve in me byval byref step resume goto",
      built_in: BUILT_IN_OBJECTS,
      literal: "true false null nothing empty"
    },
    illegal: "//",
    contains: [
      BUILT_IN_CALL,
      hljs.inherit(hljs.QUOTE_STRING_MODE, { contains: [{ begin: '""' }] }),
      hljs.COMMENT(/'/, /$/, {
        relevance: 0
      }),
      hljs.C_NUMBER_MODE
    ]
  };
}
var vbscript_1 = vbscript;
var vbscript$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": vbscript_1
}, [vbscript_1]));
export { vbscript$1 as v };
//# sourceMappingURL=vbscript.js.map
