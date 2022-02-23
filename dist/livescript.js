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
function livescript(hljs) {
  const LIVESCRIPT_BUILT_INS = [
    "npm",
    "print"
  ];
  const LIVESCRIPT_LITERALS = [
    "yes",
    "no",
    "on",
    "off",
    "it",
    "that",
    "void"
  ];
  const LIVESCRIPT_KEYWORDS = [
    "then",
    "unless",
    "until",
    "loop",
    "of",
    "by",
    "when",
    "and",
    "or",
    "is",
    "isnt",
    "not",
    "it",
    "that",
    "otherwise",
    "from",
    "to",
    "til",
    "fallthrough",
    "case",
    "enum",
    "native",
    "list",
    "map",
    "__hasProp",
    "__extends",
    "__slice",
    "__bind",
    "__indexOf"
  ];
  const KEYWORDS$1 = {
    keyword: KEYWORDS.concat(LIVESCRIPT_KEYWORDS),
    literal: LITERALS.concat(LIVESCRIPT_LITERALS),
    built_in: BUILT_INS.concat(LIVESCRIPT_BUILT_INS)
  };
  const JS_IDENT_RE = "[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*";
  const TITLE = hljs.inherit(hljs.TITLE_MODE, {
    begin: JS_IDENT_RE
  });
  const SUBST = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: KEYWORDS$1
  };
  const SUBST_SIMPLE = {
    className: "subst",
    begin: /#[A-Za-z$_]/,
    end: /(?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*/,
    keywords: KEYWORDS$1
  };
  const EXPRESSIONS = [
    hljs.BINARY_NUMBER_MODE,
    {
      className: "number",
      begin: "(\\b0[xX][a-fA-F0-9_]+)|(\\b\\d(\\d|_\\d)*(\\.(\\d(\\d|_\\d)*)?)?(_*[eE]([-+]\\d(_\\d|\\d)*)?)?[_a-z]*)",
      relevance: 0,
      starts: {
        end: "(\\s*/)?",
        relevance: 0
      }
    },
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
            SUBST,
            SUBST_SIMPLE
          ]
        },
        {
          begin: /"/,
          end: /"/,
          contains: [
            hljs.BACKSLASH_ESCAPE,
            SUBST,
            SUBST_SIMPLE
          ]
        },
        {
          begin: /\\/,
          end: /(\s|$)/,
          excludeEnd: true
        }
      ]
    },
    {
      className: "regexp",
      variants: [
        {
          begin: "//",
          end: "//[gim]*",
          contains: [
            SUBST,
            hljs.HASH_COMMENT_MODE
          ]
        },
        {
          begin: /\/(?![ *])(\\.|[^\\\n])*?\/[gim]*(?=\W)/
        }
      ]
    },
    {
      begin: "@" + JS_IDENT_RE
    },
    {
      begin: "``",
      end: "``",
      excludeBegin: true,
      excludeEnd: true,
      subLanguage: "javascript"
    }
  ];
  SUBST.contains = EXPRESSIONS;
  const PARAMS = {
    className: "params",
    begin: "\\(",
    returnBegin: true,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS$1,
        contains: ["self"].concat(EXPRESSIONS)
      }
    ]
  };
  const SYMBOLS = {
    begin: "(#=>|=>|\\|>>|-?->|!->)"
  };
  return {
    name: "LiveScript",
    aliases: ["ls"],
    keywords: KEYWORDS$1,
    illegal: /\/\*/,
    contains: EXPRESSIONS.concat([
      hljs.COMMENT("\\/\\*", "\\*\\/"),
      hljs.HASH_COMMENT_MODE,
      SYMBOLS,
      {
        className: "function",
        contains: [
          TITLE,
          PARAMS
        ],
        returnBegin: true,
        variants: [
          {
            begin: "(" + JS_IDENT_RE + "\\s*(?:=|:=)\\s*)?(\\(.*\\)\\s*)?\\B->\\*?",
            end: "->\\*?"
          },
          {
            begin: "(" + JS_IDENT_RE + "\\s*(?:=|:=)\\s*)?!?(\\(.*\\)\\s*)?\\B[-~]{1,2}>\\*?",
            end: "[-~]{1,2}>\\*?"
          },
          {
            begin: "(" + JS_IDENT_RE + "\\s*(?:=|:=)\\s*)?(\\(.*\\)\\s*)?\\B!?[-~]{1,2}>\\*?",
            end: "!?[-~]{1,2}>\\*?"
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
        begin: JS_IDENT_RE + ":",
        end: ":",
        returnBegin: true,
        returnEnd: true,
        relevance: 0
      }
    ])
  };
}
var livescript_1 = livescript;
var livescript$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": livescript_1
}, [livescript_1]));
export { livescript$1 as l };
//# sourceMappingURL=livescript.js.map
