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
function dust(hljs) {
  const EXPRESSION_KEYWORDS = "if eq ne lt lte gt gte select default math sep";
  return {
    name: "Dust",
    aliases: ["dst"],
    case_insensitive: true,
    subLanguage: "xml",
    contains: [
      {
        className: "template-tag",
        begin: /\{[#\/]/,
        end: /\}/,
        illegal: /;/,
        contains: [{
          className: "name",
          begin: /[a-zA-Z\.-]+/,
          starts: {
            endsWithParent: true,
            relevance: 0,
            contains: [hljs.QUOTE_STRING_MODE]
          }
        }]
      },
      {
        className: "template-variable",
        begin: /\{/,
        end: /\}/,
        illegal: /;/,
        keywords: EXPRESSION_KEYWORDS
      }
    ]
  };
}
var dust_1 = dust;
var dust$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": dust_1
}, [dust_1]));
export { dust$1 as d };
//# sourceMappingURL=dust.js.map
