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
const KEYWORDS = [
  "as",
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends"
];
const LITERALS = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
];
const TYPES = [
  "Intl",
  "DataView",
  "Number",
  "Math",
  "Date",
  "String",
  "RegExp",
  "Object",
  "Function",
  "Boolean",
  "Error",
  "Symbol",
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  "Proxy",
  "Reflect",
  "JSON",
  "Promise",
  "Float64Array",
  "Int16Array",
  "Int32Array",
  "Int8Array",
  "Uint16Array",
  "Uint32Array",
  "Float32Array",
  "Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "ArrayBuffer",
  "BigInt64Array",
  "BigUint64Array",
  "BigInt"
];
const ERROR_TYPES = [
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];
const BUILT_IN_GLOBALS = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
];
const BUILT_IN_VARIABLES = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "module",
  "global"
];
const BUILT_INS = [].concat(BUILT_IN_GLOBALS, BUILT_IN_VARIABLES, TYPES, ERROR_TYPES);
function coffeescript(hljs) {
  const COFFEE_BUILT_INS = [
    "npm",
    "print"
  ];
  const COFFEE_LITERALS = [
    "yes",
    "no",
    "on",
    "off"
  ];
  const COFFEE_KEYWORDS = [
    "then",
    "unless",
    "until",
    "loop",
    "by",
    "when",
    "and",
    "or",
    "is",
    "isnt",
    "not"
  ];
  const NOT_VALID_KEYWORDS = [
    "var",
    "const",
    "let",
    "function",
    "static"
  ];
  const excluding = (list) => (kw) => !list.includes(kw);
  const KEYWORDS$1 = {
    keyword: KEYWORDS.concat(COFFEE_KEYWORDS).filter(excluding(NOT_VALID_KEYWORDS)),
    literal: LITERALS.concat(COFFEE_LITERALS),
    built_in: BUILT_INS.concat(COFFEE_BUILT_INS)
  };
  const JS_IDENT_RE = "[A-Za-z$_][0-9A-Za-z$_]*";
  const SUBST = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: KEYWORDS$1
  };
  const EXPRESSIONS = [
    hljs.BINARY_NUMBER_MODE,
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
          begin: /'''/,
          end: /'''/,
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /'/,
          end: /'/,
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /"""/,
          end: /"""/,
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST
          ]
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
      className: "regexp",
      variants: [
        {
          begin: "///",
          end: "///",
          contains: [
            SUBST,
            hljs.HASH_COMMENT_MODE
          ]
        },
        {
          begin: "//[gim]{0,3}(?=\\W)",
          relevance: 0
        },
        {
          begin: /\/(?![ *]).*?(?![\\]).\/[gim]{0,3}(?=\W)/
        }
      ]
    },
    {
      begin: "@" + JS_IDENT_RE
    },
    {
      subLanguage: "javascript",
      excludeBegin: true,
      excludeEnd: true,
      variants: [
        {
          begin: "```",
          end: "```"
        },
        {
          begin: "`",
          end: "`"
        }
      ]
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
    contains: [{
      begin: /\(/,
      end: /\)/,
      keywords: KEYWORDS$1,
      contains: ["self"].concat(EXPRESSIONS)
    }]
  };
  return {
    name: "CoffeeScript",
    aliases: [
      "coffee",
      "cson",
      "iced"
    ],
    keywords: KEYWORDS$1,
    illegal: /\/\*/,
    contains: EXPRESSIONS.concat([
      hljs.COMMENT("###", "###"),
      hljs.HASH_COMMENT_MODE,
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
        begin: /[:\(,=]\s*/,
        relevance: 0,
        contains: [{
          className: "function",
          begin: POSSIBLE_PARAMS_RE,
          end: "[-=]>",
          returnBegin: true,
          contains: [PARAMS]
        }]
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
        begin: JS_IDENT_RE + ":",
        end: ":",
        returnBegin: true,
        returnEnd: true,
        relevance: 0
      }
    ])
  };
}
var coffeescript_1 = coffeescript;
var coffeescript$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": coffeescript_1
}, [coffeescript_1]));
export { coffeescript$1 as c };
//# sourceMappingURL=coffeescript.js.map
