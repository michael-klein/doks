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
function parser3(hljs) {
  const CURLY_SUBCOMMENT = hljs.COMMENT(/\{/, /\}/, {
    contains: ["self"]
  });
  return {
    name: "Parser3",
    subLanguage: "xml",
    relevance: 0,
    contains: [
      hljs.COMMENT("^#", "$"),
      hljs.COMMENT(/\^rem\{/, /\}/, {
        relevance: 10,
        contains: [CURLY_SUBCOMMENT]
      }),
      {
        className: "meta",
        begin: "^@(?:BASE|USE|CLASS|OPTIONS)$",
        relevance: 10
      },
      {
        className: "title",
        begin: "@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$"
      },
      {
        className: "variable",
        begin: /\$\{?[\w\-.:]+\}?/
      },
      {
        className: "keyword",
        begin: /\^[\w\-.:]+/
      },
      {
        className: "number",
        begin: "\\^#[0-9a-fA-F]+"
      },
      hljs.C_NUMBER_MODE
    ]
  };
}
var parser3_1 = parser3;
var parser3$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": parser3_1
}, [parser3_1]));
export { parser3$1 as p };
//# sourceMappingURL=parser3.js.map
