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
function clean(hljs) {
  return {
    name: "Clean",
    aliases: [
      "icl",
      "dcl"
    ],
    keywords: {
      keyword: "if let in with where case of class instance otherwise implementation definition system module from import qualified as special code inline foreign export ccall stdcall generic derive infix infixl infixr",
      built_in: "Int Real Char Bool",
      literal: "True False"
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        begin: "->|<-[|:]?|#!?|>>=|\\{\\||\\|\\}|:==|=:|<>"
      }
    ]
  };
}
var clean_1 = clean;
var clean$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": clean_1
}, [clean_1]));
export { clean$1 as c };
//# sourceMappingURL=clean.js.map
