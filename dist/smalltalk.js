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
function smalltalk(hljs) {
  const VAR_IDENT_RE = "[a-z][a-zA-Z0-9_]*";
  const CHAR = {
    className: "string",
    begin: "\\$.{1}"
  };
  const SYMBOL = {
    className: "symbol",
    begin: "#" + hljs.UNDERSCORE_IDENT_RE
  };
  return {
    name: "Smalltalk",
    aliases: ["st"],
    keywords: "self super nil true false thisContext",
    contains: [
      hljs.COMMENT('"', '"'),
      hljs.APOS_STRING_MODE,
      {
        className: "type",
        begin: "\\b[A-Z][A-Za-z0-9_]*",
        relevance: 0
      },
      {
        begin: VAR_IDENT_RE + ":",
        relevance: 0
      },
      hljs.C_NUMBER_MODE,
      SYMBOL,
      CHAR,
      {
        begin: "\\|[ ]*" + VAR_IDENT_RE + "([ ]+" + VAR_IDENT_RE + ")*[ ]*\\|",
        returnBegin: true,
        end: /\|/,
        illegal: /\S/,
        contains: [{
          begin: "(\\|[ ]*)?" + VAR_IDENT_RE
        }]
      },
      {
        begin: "#\\(",
        end: "\\)",
        contains: [
          hljs.APOS_STRING_MODE,
          CHAR,
          hljs.C_NUMBER_MODE,
          SYMBOL
        ]
      }
    ]
  };
}
var smalltalk_1 = smalltalk;
var smalltalk$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": smalltalk_1
}, [smalltalk_1]));
export { smalltalk$1 as s };
//# sourceMappingURL=smalltalk.js.map
