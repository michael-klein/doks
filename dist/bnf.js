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
function bnf(hljs) {
  return {
    name: "Backus\u2013Naur Form",
    contains: [
      {
        className: "attribute",
        begin: /</,
        end: />/
      },
      {
        begin: /::=/,
        end: /$/,
        contains: [
          {
            begin: /</,
            end: />/
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE
        ]
      }
    ]
  };
}
var bnf_1 = bnf;
var bnf$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": bnf_1
}, [bnf_1]));
export { bnf$1 as b };
//# sourceMappingURL=bnf.js.map
