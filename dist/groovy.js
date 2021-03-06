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
function lookahead(re) {
  return concat("(?=", re, ")");
}
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}
function variants(variants2, obj = {}) {
  obj.variants = variants2;
  return obj;
}
function groovy(hljs) {
  const IDENT_RE = "[A-Za-z0-9_$]+";
  const COMMENT = variants([
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.COMMENT("/\\*\\*", "\\*/", {
      relevance: 0,
      contains: [
        {
          begin: /\w+@/,
          relevance: 0
        },
        {
          className: "doctag",
          begin: "@[A-Za-z]+"
        }
      ]
    })
  ]);
  const REGEXP = {
    className: "regexp",
    begin: /~?\/[^\/\n]+\//,
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  const NUMBER = variants([
    hljs.BINARY_NUMBER_MODE,
    hljs.C_NUMBER_MODE
  ]);
  const STRING = variants([
    {
      begin: /"""/,
      end: /"""/
    },
    {
      begin: /'''/,
      end: /'''/
    },
    {
      begin: "\\$/",
      end: "/\\$",
      relevance: 10
    },
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ], {
    className: "string"
  });
  return {
    name: "Groovy",
    keywords: {
      built_in: "this super",
      literal: "true false null",
      keyword: "byte short char int long boolean float double void def as in assert trait abstract static volatile transient public private protected synchronized final class interface enum if else for while switch case break default continue throw throws try catch finally implements extends new import package return instanceof"
    },
    contains: [
      hljs.SHEBANG({
        binary: "groovy",
        relevance: 10
      }),
      COMMENT,
      STRING,
      REGEXP,
      NUMBER,
      {
        className: "class",
        beginKeywords: "class interface trait enum",
        end: /\{/,
        illegal: ":",
        contains: [
          {
            beginKeywords: "extends implements"
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        className: "meta",
        begin: "@[A-Za-z]+",
        relevance: 0
      },
      {
        className: "attr",
        begin: IDENT_RE + "[ 	]*:",
        relevance: 0
      },
      {
        begin: /\?/,
        end: /:/,
        relevance: 0,
        contains: [
          COMMENT,
          STRING,
          REGEXP,
          NUMBER,
          "self"
        ]
      },
      {
        className: "symbol",
        begin: "^[ 	]*" + lookahead(IDENT_RE + ":"),
        excludeBegin: true,
        end: IDENT_RE + ":",
        relevance: 0
      }
    ],
    illegal: /#|<\//
  };
}
var groovy_1 = groovy;
var groovy$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": groovy_1
}, [groovy_1]));
export { groovy$1 as g };
//# sourceMappingURL=groovy.js.map
