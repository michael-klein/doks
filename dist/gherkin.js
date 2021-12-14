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
function gherkin(hljs) {
  return {
    name: "Gherkin",
    aliases: ["feature"],
    keywords: "Feature Background Ability Business Need Scenario Scenarios Scenario Outline Scenario Template Examples Given And Then But When",
    contains: [
      {
        className: "symbol",
        begin: "\\*",
        relevance: 0
      },
      {
        className: "meta",
        begin: "@[^@\\s]+"
      },
      {
        begin: "\\|",
        end: "\\|\\w*$",
        contains: [
          {
            className: "string",
            begin: "[^|]+"
          }
        ]
      },
      {
        className: "variable",
        begin: "<",
        end: ">"
      },
      hljs.HASH_COMMENT_MODE,
      {
        className: "string",
        begin: '"""',
        end: '"""'
      },
      hljs.QUOTE_STRING_MODE
    ]
  };
}
var gherkin_1 = gherkin;
var gherkin$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": gherkin_1
}, [gherkin_1]));
export { gherkin$1 as g };
//# sourceMappingURL=gherkin.js.map
