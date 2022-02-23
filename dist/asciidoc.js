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
function source(re) {
  if (!re)
    return null;
  if (typeof re === "string")
    return re;
  return re.source;
}
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}
function asciidoc(hljs) {
  const HORIZONTAL_RULE = {
    begin: "^'{3,}[ \\t]*$",
    relevance: 10
  };
  const ESCAPED_FORMATTING = [
    {
      begin: /\\[*_`]/
    },
    {
      begin: /\\\\\*{2}[^\n]*?\*{2}/
    },
    {
      begin: /\\\\_{2}[^\n]*_{2}/
    },
    {
      begin: /\\\\`{2}[^\n]*`{2}/
    },
    {
      begin: /[:;}][*_`](?![*_`])/
    }
  ];
  const STRONG = [
    {
      className: "strong",
      begin: /\*{2}([^\n]+?)\*{2}/
    },
    {
      className: "strong",
      begin: concat(/\*\*/, /((\*(?!\*)|\\[^\n]|[^*\n\\])+\n)+/, /(\*(?!\*)|\\[^\n]|[^*\n\\])*/, /\*\*/),
      relevance: 0
    },
    {
      className: "strong",
      begin: /\B\*(\S|\S[^\n]*?\S)\*(?!\w)/
    },
    {
      className: "strong",
      begin: /\*[^\s]([^\n]+\n)+([^\n]+)\*/
    }
  ];
  const EMPHASIS = [
    {
      className: "emphasis",
      begin: /_{2}([^\n]+?)_{2}/
    },
    {
      className: "emphasis",
      begin: concat(/__/, /((_(?!_)|\\[^\n]|[^_\n\\])+\n)+/, /(_(?!_)|\\[^\n]|[^_\n\\])*/, /__/),
      relevance: 0
    },
    {
      className: "emphasis",
      begin: /\b_(\S|\S[^\n]*?\S)_(?!\w)/
    },
    {
      className: "emphasis",
      begin: /_[^\s]([^\n]+\n)+([^\n]+)_/
    },
    {
      className: "emphasis",
      begin: "\\B'(?!['\\s])",
      end: "(\\n{2}|')",
      contains: [{
        begin: "\\\\'\\w",
        relevance: 0
      }],
      relevance: 0
    }
  ];
  const ADMONITION = {
    className: "symbol",
    begin: "^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+",
    relevance: 10
  };
  const BULLET_LIST = {
    className: "bullet",
    begin: "^(\\*+|-+|\\.+|[^\\n]+?::)\\s+"
  };
  return {
    name: "AsciiDoc",
    aliases: ["adoc"],
    contains: [
      hljs.COMMENT("^/{4,}\\n", "\\n/{4,}$", {
        relevance: 10
      }),
      hljs.COMMENT("^//", "$", {
        relevance: 0
      }),
      {
        className: "title",
        begin: "^\\.\\w.*$"
      },
      {
        begin: "^[=\\*]{4,}\\n",
        end: "\\n^[=\\*]{4,}$",
        relevance: 10
      },
      {
        className: "section",
        relevance: 10,
        variants: [
          {
            begin: "^(={1,6})[ 	].+?([ 	]\\1)?$"
          },
          {
            begin: "^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$"
          }
        ]
      },
      {
        className: "meta",
        begin: "^:.+?:",
        end: "\\s",
        excludeEnd: true,
        relevance: 10
      },
      {
        className: "meta",
        begin: "^\\[.+?\\]$",
        relevance: 0
      },
      {
        className: "quote",
        begin: "^_{4,}\\n",
        end: "\\n_{4,}$",
        relevance: 10
      },
      {
        className: "code",
        begin: "^[\\-\\.]{4,}\\n",
        end: "\\n[\\-\\.]{4,}$",
        relevance: 10
      },
      {
        begin: "^\\+{4,}\\n",
        end: "\\n\\+{4,}$",
        contains: [{
          begin: "<",
          end: ">",
          subLanguage: "xml",
          relevance: 0
        }],
        relevance: 10
      },
      BULLET_LIST,
      ADMONITION,
      ...ESCAPED_FORMATTING,
      ...STRONG,
      ...EMPHASIS,
      {
        className: "string",
        variants: [
          {
            begin: "``.+?''"
          },
          {
            begin: "`.+?'"
          }
        ]
      },
      {
        className: "code",
        begin: /`{2}/,
        end: /(\n{2}|`{2})/
      },
      {
        className: "code",
        begin: "(`.+?`|\\+.+?\\+)",
        relevance: 0
      },
      {
        className: "code",
        begin: "^[ \\t]",
        end: "$",
        relevance: 0
      },
      HORIZONTAL_RULE,
      {
        begin: "(link:)?(http|https|ftp|file|irc|image:?):\\S+?\\[[^[]*?\\]",
        returnBegin: true,
        contains: [
          {
            begin: "(link|image:?):",
            relevance: 0
          },
          {
            className: "link",
            begin: "\\w",
            end: "[^\\[]+",
            relevance: 0
          },
          {
            className: "string",
            begin: "\\[",
            end: "\\]",
            excludeBegin: true,
            excludeEnd: true,
            relevance: 0
          }
        ],
        relevance: 10
      }
    ]
  };
}
var asciidoc_1 = asciidoc;
var asciidoc$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": asciidoc_1
}, [asciidoc_1]));
export { asciidoc$1 as a };
//# sourceMappingURL=asciidoc.js.map
