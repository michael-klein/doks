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
function actionscript(hljs) {
  const IDENT_RE = /[a-zA-Z_$][a-zA-Z0-9_$]*/;
  const IDENT_FUNC_RETURN_TYPE_RE = /([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)/;
  const AS3_REST_ARG_MODE = {
    className: "rest_arg",
    begin: /[.]{3}/,
    end: IDENT_RE,
    relevance: 10
  };
  return {
    name: "ActionScript",
    aliases: ["as"],
    keywords: {
      keyword: "as break case catch class const continue default delete do dynamic each else extends final finally for function get if implements import in include instanceof interface internal is namespace native new override package private protected public return set static super switch this throw try typeof use var void while with",
      literal: "true false null undefined"
    },
    contains: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: "class",
        beginKeywords: "package",
        end: /\{/,
        contains: [hljs.TITLE_MODE]
      },
      {
        className: "class",
        beginKeywords: "class interface",
        end: /\{/,
        excludeEnd: true,
        contains: [
          { beginKeywords: "extends implements" },
          hljs.TITLE_MODE
        ]
      },
      {
        className: "meta",
        beginKeywords: "import include",
        end: /;/,
        keywords: { "meta-keyword": "import include" }
      },
      {
        className: "function",
        beginKeywords: "function",
        end: /[{;]/,
        excludeEnd: true,
        illegal: /\S/,
        contains: [
          hljs.TITLE_MODE,
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            contains: [
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE,
              AS3_REST_ARG_MODE
            ]
          },
          { begin: concat(/:\s*/, IDENT_FUNC_RETURN_TYPE_RE) }
        ]
      },
      hljs.METHOD_GUARD
    ],
    illegal: /#/
  };
}
var actionscript_1 = actionscript;
var actionscript$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": actionscript_1
}, [actionscript_1]));
export { actionscript$1 as a };
//# sourceMappingURL=actionscript.js.map
