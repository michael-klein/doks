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
function flix(hljs) {
  const CHAR = {
    className: "string",
    begin: /'(.|\\[xXuU][a-zA-Z0-9]+)'/
  };
  const STRING = {
    className: "string",
    variants: [{
      begin: '"',
      end: '"'
    }]
  };
  const NAME = {
    className: "title",
    relevance: 0,
    begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/
  };
  const METHOD = {
    className: "function",
    beginKeywords: "def",
    end: /[:={\[(\n;]/,
    excludeEnd: true,
    contains: [NAME]
  };
  return {
    name: "Flix",
    keywords: {
      literal: "true false",
      keyword: "case class def else enum if impl import in lat rel index let match namespace switch type yield with"
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      CHAR,
      STRING,
      METHOD,
      hljs.C_NUMBER_MODE
    ]
  };
}
var flix_1 = flix;
var flix$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": flix_1
}, [flix_1]));
export { flix$1 as f };
//# sourceMappingURL=flix.js.map
