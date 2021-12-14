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
function ceylon(hljs) {
  const KEYWORDS = "assembly module package import alias class interface object given value assign void function new of extends satisfies abstracts in out return break continue throw assert dynamic if else switch case for while try catch finally then let this outer super is exists nonempty";
  const DECLARATION_MODIFIERS = "shared abstract formal default actual variable late native deprecated final sealed annotation suppressWarnings small";
  const DOCUMENTATION = "doc by license see throws tagged";
  const SUBST = {
    className: "subst",
    excludeBegin: true,
    excludeEnd: true,
    begin: /``/,
    end: /``/,
    keywords: KEYWORDS,
    relevance: 10
  };
  const EXPRESSIONS = [
    {
      className: "string",
      begin: '"""',
      end: '"""',
      relevance: 10
    },
    {
      className: "string",
      begin: '"',
      end: '"',
      contains: [SUBST]
    },
    {
      className: "string",
      begin: "'",
      end: "'"
    },
    {
      className: "number",
      begin: "#[0-9a-fA-F_]+|\\$[01_]+|[0-9_]+(?:\\.[0-9_](?:[eE][+-]?\\d+)?)?[kMGTPmunpf]?",
      relevance: 0
    }
  ];
  SUBST.contains = EXPRESSIONS;
  return {
    name: "Ceylon",
    keywords: {
      keyword: KEYWORDS + " " + DECLARATION_MODIFIERS,
      meta: DOCUMENTATION
    },
    illegal: "\\$[^01]|#[^0-9a-fA-F]",
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.COMMENT("/\\*", "\\*/", {
        contains: ["self"]
      }),
      {
        className: "meta",
        begin: '@[a-z]\\w*(?::"[^"]*")?'
      }
    ].concat(EXPRESSIONS)
  };
}
var ceylon_1 = ceylon;
var ceylon$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": ceylon_1
}, [ceylon_1]));
export { ceylon$1 as c };
//# sourceMappingURL=ceylon.js.map
