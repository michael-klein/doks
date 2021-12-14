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
function cos(hljs) {
  const STRINGS = {
    className: "string",
    variants: [{
      begin: '"',
      end: '"',
      contains: [{
        begin: '""',
        relevance: 0
      }]
    }]
  };
  const NUMBERS = {
    className: "number",
    begin: "\\b(\\d+(\\.\\d*)?|\\.\\d+)",
    relevance: 0
  };
  const COS_KEYWORDS = "property parameter class classmethod clientmethod extends as break catch close continue do d|0 else elseif for goto halt hang h|0 if job j|0 kill k|0 lock l|0 merge new open quit q|0 read r|0 return set s|0 tcommit throw trollback try tstart use view while write w|0 xecute x|0 zkill znspace zn ztrap zwrite zw zzdump zzwrite print zbreak zinsert zload zprint zremove zsave zzprint mv mvcall mvcrt mvdim mvprint zquit zsync ascii";
  return {
    name: "Cach\xE9 Object Script",
    case_insensitive: true,
    aliases: [
      "cls"
    ],
    keywords: COS_KEYWORDS,
    contains: [
      NUMBERS,
      STRINGS,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: "comment",
        begin: /;/,
        end: "$",
        relevance: 0
      },
      {
        className: "built_in",
        begin: /(?:\$\$?|\.\.)\^?[a-zA-Z]+/
      },
      {
        className: "built_in",
        begin: /\$\$\$[a-zA-Z]+/
      },
      {
        className: "built_in",
        begin: /%[a-z]+(?:\.[a-z]+)*/
      },
      {
        className: "symbol",
        begin: /\^%?[a-zA-Z][\w]*/
      },
      {
        className: "keyword",
        begin: /##class|##super|#define|#dim/
      },
      {
        begin: /&sql\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        subLanguage: "sql"
      },
      {
        begin: /&(js|jscript|javascript)</,
        end: />/,
        excludeBegin: true,
        excludeEnd: true,
        subLanguage: "javascript"
      },
      {
        begin: /&html<\s*</,
        end: />\s*>/,
        subLanguage: "xml"
      }
    ]
  };
}
var cos_1 = cos;
var cos$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": cos_1
}, [cos_1]));
export { cos$1 as c };
//# sourceMappingURL=cos.js.map
