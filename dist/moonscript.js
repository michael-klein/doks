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
function moonscript(hljs) {
  const KEYWORDS = {
    keyword: "if then not for in while do return else elseif break continue switch and or unless when class extends super local import export from using",
    literal: "true false nil",
    built_in: "_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"
  };
  const JS_IDENT_RE = "[A-Za-z$_][0-9A-Za-z$_]*";
  const SUBST = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: KEYWORDS
  };
  const EXPRESSIONS = [
    hljs.inherit(hljs.C_NUMBER_MODE, {
      starts: {
        end: "(\\s*/)?",
        relevance: 0
      }
    }),
    {
      className: "string",
      variants: [
        {
          begin: /'/,
          end: /'/,
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /"/,
          end: /"/,
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST
          ]
        }
      ]
    },
    {
      className: "built_in",
      begin: "@__" + hljs.IDENT_RE
    },
    {
      begin: "@" + hljs.IDENT_RE
    },
    {
      begin: hljs.IDENT_RE + "\\\\" + hljs.IDENT_RE
    }
  ];
  SUBST.contains = EXPRESSIONS;
  const TITLE = hljs.inherit(hljs.TITLE_MODE, {
    begin: JS_IDENT_RE
  });
  const POSSIBLE_PARAMS_RE = "(\\(.*\\)\\s*)?\\B[-=]>";
  const PARAMS = {
    className: "params",
    begin: "\\([^\\(]",
    returnBegin: true,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        contains: ["self"].concat(EXPRESSIONS)
      }
    ]
  };
  return {
    name: "MoonScript",
    aliases: ["moon"],
    keywords: KEYWORDS,
    illegal: /\/\*/,
    contains: EXPRESSIONS.concat([
      hljs.COMMENT("--", "$"),
      {
        className: "function",
        begin: "^\\s*" + JS_IDENT_RE + "\\s*=\\s*" + POSSIBLE_PARAMS_RE,
        end: "[-=]>",
        returnBegin: true,
        contains: [
          TITLE,
          PARAMS
        ]
      },
      {
        begin: /[\(,:=]\s*/,
        relevance: 0,
        contains: [
          {
            className: "function",
            begin: POSSIBLE_PARAMS_RE,
            end: "[-=]>",
            returnBegin: true,
            contains: [PARAMS]
          }
        ]
      },
      {
        className: "class",
        beginKeywords: "class",
        end: "$",
        illegal: /[:="\[\]]/,
        contains: [
          {
            beginKeywords: "extends",
            endsWithParent: true,
            illegal: /[:="\[\]]/,
            contains: [TITLE]
          },
          TITLE
        ]
      },
      {
        className: "name",
        begin: JS_IDENT_RE + ":",
        end: ":",
        returnBegin: true,
        returnEnd: true,
        relevance: 0
      }
    ])
  };
}
var moonscript_1 = moonscript;
var moonscript$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": moonscript_1
}, [moonscript_1]));
export { moonscript$1 as m };
//# sourceMappingURL=moonscript.js.map
