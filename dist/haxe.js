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
function haxe(hljs) {
  const HAXE_BASIC_TYPES = "Int Float String Bool Dynamic Void Array ";
  return {
    name: "Haxe",
    aliases: ["hx"],
    keywords: {
      keyword: "break case cast catch continue default do dynamic else enum extern for function here if import in inline never new override package private get set public return static super switch this throw trace try typedef untyped using var while " + HAXE_BASIC_TYPES,
      built_in: "trace this",
      literal: "true false null _"
    },
    contains: [
      {
        className: "string",
        begin: "'",
        end: "'",
        contains: [
          hljs.BACKSLASH_ESCAPE,
          {
            className: "subst",
            begin: "\\$\\{",
            end: "\\}"
          },
          {
            className: "subst",
            begin: "\\$",
            end: /\W\}/
          }
        ]
      },
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: "meta",
        begin: "@:",
        end: "$"
      },
      {
        className: "meta",
        begin: "#",
        end: "$",
        keywords: {
          "meta-keyword": "if else elseif end error"
        }
      },
      {
        className: "type",
        begin: ":[ 	]*",
        end: "[^A-Za-z0-9_ 	\\->]",
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0
      },
      {
        className: "type",
        begin: ":[ 	]*",
        end: "\\W",
        excludeBegin: true,
        excludeEnd: true
      },
      {
        className: "type",
        begin: "new *",
        end: "\\W",
        excludeBegin: true,
        excludeEnd: true
      },
      {
        className: "class",
        beginKeywords: "enum",
        end: "\\{",
        contains: [hljs.TITLE_MODE]
      },
      {
        className: "class",
        beginKeywords: "abstract",
        end: "[\\{$]",
        contains: [
          {
            className: "type",
            begin: "\\(",
            end: "\\)",
            excludeBegin: true,
            excludeEnd: true
          },
          {
            className: "type",
            begin: "from +",
            end: "\\W",
            excludeBegin: true,
            excludeEnd: true
          },
          {
            className: "type",
            begin: "to +",
            end: "\\W",
            excludeBegin: true,
            excludeEnd: true
          },
          hljs.TITLE_MODE
        ],
        keywords: {
          keyword: "abstract from to"
        }
      },
      {
        className: "class",
        begin: "\\b(class|interface) +",
        end: "[\\{$]",
        excludeEnd: true,
        keywords: "class interface",
        contains: [
          {
            className: "keyword",
            begin: "\\b(extends|implements) +",
            keywords: "extends implements",
            contains: [
              {
                className: "type",
                begin: hljs.IDENT_RE,
                relevance: 0
              }
            ]
          },
          hljs.TITLE_MODE
        ]
      },
      {
        className: "function",
        beginKeywords: "function",
        end: "\\(",
        excludeEnd: true,
        illegal: "\\S",
        contains: [hljs.TITLE_MODE]
      }
    ],
    illegal: /<\//
  };
}
var haxe_1 = haxe;
var haxe$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": haxe_1
}, [haxe_1]));
export { haxe$1 as h };
//# sourceMappingURL=haxe.js.map
