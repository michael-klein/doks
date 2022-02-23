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
function monkey(hljs) {
  const NUMBER = {
    className: "number",
    relevance: 0,
    variants: [
      {
        begin: "[$][a-fA-F0-9]+"
      },
      hljs.NUMBER_MODE
    ]
  };
  return {
    name: "Monkey",
    case_insensitive: true,
    keywords: {
      keyword: "public private property continue exit extern new try catch eachin not abstract final select case default const local global field end if then else elseif endif while wend repeat until forever for to step next return module inline throw import",
      built_in: "DebugLog DebugStop Error Print ACos ACosr ASin ASinr ATan ATan2 ATan2r ATanr Abs Abs Ceil Clamp Clamp Cos Cosr Exp Floor Log Max Max Min Min Pow Sgn Sgn Sin Sinr Sqrt Tan Tanr Seed PI HALFPI TWOPI",
      literal: "true false null and or shl shr mod"
    },
    illegal: /\/\*/,
    contains: [
      hljs.COMMENT("#rem", "#end"),
      hljs.COMMENT("'", "$", {
        relevance: 0
      }),
      {
        className: "function",
        beginKeywords: "function method",
        end: "[(=:]|$",
        illegal: /\n/,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        className: "class",
        beginKeywords: "class interface",
        end: "$",
        contains: [
          {
            beginKeywords: "extends implements"
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        className: "built_in",
        begin: "\\b(self|super)\\b"
      },
      {
        className: "meta",
        begin: "\\s*#",
        end: "$",
        keywords: {
          "meta-keyword": "if else elseif endif end then"
        }
      },
      {
        className: "meta",
        begin: "^\\s*strict\\b"
      },
      {
        beginKeywords: "alias",
        end: "=",
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      hljs.QUOTE_STRING_MODE,
      NUMBER
    ]
  };
}
var monkey_1 = monkey;
var monkey$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": monkey_1
}, [monkey_1]));
export { monkey$1 as m };
//# sourceMappingURL=monkey.js.map
