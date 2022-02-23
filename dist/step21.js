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
function step21(hljs) {
  const STEP21_IDENT_RE = "[A-Z_][A-Z0-9_.]*";
  const STEP21_KEYWORDS = {
    $pattern: STEP21_IDENT_RE,
    keyword: "HEADER ENDSEC DATA"
  };
  const STEP21_START = {
    className: "meta",
    begin: "ISO-10303-21;",
    relevance: 10
  };
  const STEP21_CLOSE = {
    className: "meta",
    begin: "END-ISO-10303-21;",
    relevance: 10
  };
  return {
    name: "STEP Part 21",
    aliases: [
      "p21",
      "step",
      "stp"
    ],
    case_insensitive: true,
    keywords: STEP21_KEYWORDS,
    contains: [
      STEP21_START,
      STEP21_CLOSE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.COMMENT("/\\*\\*!", "\\*/"),
      hljs.C_NUMBER_MODE,
      hljs.inherit(hljs.APOS_STRING_MODE, {
        illegal: null
      }),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        illegal: null
      }),
      {
        className: "string",
        begin: "'",
        end: "'"
      },
      {
        className: "symbol",
        variants: [
          {
            begin: "#",
            end: "\\d+",
            illegal: "\\W"
          }
        ]
      }
    ]
  };
}
var step21_1 = step21;
var step21$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": step21_1
}, [step21_1]));
export { step21$1 as s };
//# sourceMappingURL=step21.js.map
