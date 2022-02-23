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
function ocaml(hljs) {
  return {
    name: "OCaml",
    aliases: ["ml"],
    keywords: {
      $pattern: "[a-z_]\\w*!?",
      keyword: "and as assert asr begin class constraint do done downto else end exception external for fun function functor if in include inherit! inherit initializer land lazy let lor lsl lsr lxor match method!|10 method mod module mutable new object of open! open or private rec sig struct then to try type val! val virtual when while with parser value",
      built_in: "array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 string unit in_channel out_channel ref",
      literal: "true false"
    },
    illegal: /\/\/|>>/,
    contains: [
      {
        className: "literal",
        begin: "\\[(\\|\\|)?\\]|\\(\\)",
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
        begin: "[a-z_]\\w*'[\\w']*",
        relevance: 0
      },
      hljs.inherit(hljs.APOS_STRING_MODE, { className: "string", relevance: 0 }),
      hljs.inherit(hljs.QUOTE_STRING_MODE, { illegal: null }),
      {
        className: "number",
        begin: "\\b(0[xX][a-fA-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",
        relevance: 0
      },
      {
        begin: /->/
      }
    ]
  };
}
var ocaml_1 = ocaml;
var ocaml$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": ocaml_1
}, [ocaml_1]));
export { ocaml$1 as o };
//# sourceMappingURL=ocaml.js.map
