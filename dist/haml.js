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
function haml(hljs) {
  return {
    name: "HAML",
    case_insensitive: true,
    contains: [
      {
        className: "meta",
        begin: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
        relevance: 10
      },
      hljs.COMMENT("^\\s*(!=#|=#|-#|/).*$", false, {
        relevance: 0
      }),
      {
        begin: "^\\s*(-|=|!=)(?!#)",
        starts: {
          end: "\\n",
          subLanguage: "ruby"
        }
      },
      {
        className: "tag",
        begin: "^\\s*%",
        contains: [
          {
            className: "selector-tag",
            begin: "\\w+"
          },
          {
            className: "selector-id",
            begin: "#[\\w-]+"
          },
          {
            className: "selector-class",
            begin: "\\.[\\w-]+"
          },
          {
            begin: /\{\s*/,
            end: /\s*\}/,
            contains: [
              {
                begin: ":\\w+\\s*=>",
                end: ",\\s+",
                returnBegin: true,
                endsWithParent: true,
                contains: [
                  {
                    className: "attr",
                    begin: ":\\w+"
                  },
                  hljs.APOS_STRING_MODE,
                  hljs.QUOTE_STRING_MODE,
                  {
                    begin: "\\w+",
                    relevance: 0
                  }
                ]
              }
            ]
          },
          {
            begin: "\\(\\s*",
            end: "\\s*\\)",
            excludeEnd: true,
            contains: [
              {
                begin: "\\w+\\s*=",
                end: "\\s+",
                returnBegin: true,
                endsWithParent: true,
                contains: [
                  {
                    className: "attr",
                    begin: "\\w+",
                    relevance: 0
                  },
                  hljs.APOS_STRING_MODE,
                  hljs.QUOTE_STRING_MODE,
                  {
                    begin: "\\w+",
                    relevance: 0
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        begin: "^\\s*[=~]\\s*"
      },
      {
        begin: /#\{/,
        starts: {
          end: /\}/,
          subLanguage: "ruby"
        }
      }
    ]
  };
}
var haml_1 = haml;
var haml$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": haml_1
}, [haml_1]));
export { haml$1 as h };
//# sourceMappingURL=haml.js.map
