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
function roboconf(hljs) {
  const IDENTIFIER = "[a-zA-Z-_][^\\n{]+\\{";
  const PROPERTY = {
    className: "attribute",
    begin: /[a-zA-Z-_]+/,
    end: /\s*:/,
    excludeEnd: true,
    starts: {
      end: ";",
      relevance: 0,
      contains: [
        {
          className: "variable",
          begin: /\.[a-zA-Z-_]+/
        },
        {
          className: "keyword",
          begin: /\(optional\)/
        }
      ]
    }
  };
  return {
    name: "Roboconf",
    aliases: [
      "graph",
      "instances"
    ],
    case_insensitive: true,
    keywords: "import",
    contains: [
      {
        begin: "^facet " + IDENTIFIER,
        end: /\}/,
        keywords: "facet",
        contains: [
          PROPERTY,
          hljs.HASH_COMMENT_MODE
        ]
      },
      {
        begin: "^\\s*instance of " + IDENTIFIER,
        end: /\}/,
        keywords: "name count channels instance-data instance-state instance of",
        illegal: /\S/,
        contains: [
          "self",
          PROPERTY,
          hljs.HASH_COMMENT_MODE
        ]
      },
      {
        begin: "^" + IDENTIFIER,
        end: /\}/,
        contains: [
          PROPERTY,
          hljs.HASH_COMMENT_MODE
        ]
      },
      hljs.HASH_COMMENT_MODE
    ]
  };
}
var roboconf_1 = roboconf;
var roboconf$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": roboconf_1
}, [roboconf_1]));
export { roboconf$1 as r };
//# sourceMappingURL=roboconf.js.map
