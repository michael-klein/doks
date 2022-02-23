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
function sml(hljs) {
  return {
    name: "SML (Standard ML)",
    aliases: ["ml"],
    keywords: {
      $pattern: "[a-z_]\\w*!?",
      keyword: "abstype and andalso as case datatype do else end eqtype exception fn fun functor handle if in include infix infixr let local nonfix of op open orelse raise rec sharing sig signature struct structure then type val with withtype where while",
      built_in: "array bool char exn int list option order real ref string substring vector unit word",
      literal: "true false NONE SOME LESS EQUAL GREATER nil"
    },
    illegal: /\/\/|>>/,
    contains: [
      {
        className: "literal",
        begin: /\[(\|\|)?\]|\(\)/,
        relevance: 0
      },
      hljs.COMMENT("\\(\\*", "\\*\\)", {
        contains: ["self"]
      }),
      {
        className: "symbol",
        begin: "'[A-Za-z_](?!')[\\w']*"
      },
      {
        className: "type",
        begin: "`[A-Z][\\w']*"
      },
      {
        className: "type",
        begin: "\\b[A-Z][\\w']*",
        relevance: 0
      },
      {
        begin: "[a-z_]\\w*'[\\w']*"
      },
      hljs.inherit(hljs.APOS_STRING_MODE, {
        className: "string",
        relevance: 0
      }),
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        illegal: null
      }),
      {
        className: "number",
        begin: "\\b(0[xX][a-fA-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",
        relevance: 0
      },
      {
        begin: /[-=]>/
      }
    ]
  };
}
var sml_1 = sml;
var sml$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": sml_1
}, [sml_1]));
export { sml$1 as s };
//# sourceMappingURL=sml.js.map
