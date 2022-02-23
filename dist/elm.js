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
function elm(hljs) {
  const COMMENT = {
    variants: [
      hljs.COMMENT("--", "$"),
      hljs.COMMENT(/\{-/, /-\}/, {
        contains: ["self"]
      })
    ]
  };
  const CONSTRUCTOR = {
    className: "type",
    begin: "\\b[A-Z][\\w']*",
    relevance: 0
  };
  const LIST = {
    begin: "\\(",
    end: "\\)",
    illegal: '"',
    contains: [
      {
        className: "type",
        begin: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
      },
      COMMENT
    ]
  };
  const RECORD = {
    begin: /\{/,
    end: /\}/,
    contains: LIST.contains
  };
  const CHARACTER = {
    className: "string",
    begin: "'\\\\?.",
    end: "'",
    illegal: "."
  };
  return {
    name: "Elm",
    keywords: "let in if then else case of where module import exposing type alias as infix infixl infixr port effect command subscription",
    contains: [
      {
        beginKeywords: "port effect module",
        end: "exposing",
        keywords: "port effect module where command subscription exposing",
        contains: [
          LIST,
          COMMENT
        ],
        illegal: "\\W\\.|;"
      },
      {
        begin: "import",
        end: "$",
        keywords: "import as exposing",
        contains: [
          LIST,
          COMMENT
        ],
        illegal: "\\W\\.|;"
      },
      {
        begin: "type",
        end: "$",
        keywords: "type alias",
        contains: [
          CONSTRUCTOR,
          LIST,
          RECORD,
          COMMENT
        ]
      },
      {
        beginKeywords: "infix infixl infixr",
        end: "$",
        contains: [
          hljs.C_NUMBER_MODE,
          COMMENT
        ]
      },
      {
        begin: "port",
        end: "$",
        keywords: "port",
        contains: [COMMENT]
      },
      CHARACTER,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      CONSTRUCTOR,
      hljs.inherit(hljs.TITLE_MODE, {
        begin: "^[_a-z][\\w']*"
      }),
      COMMENT,
      {
        begin: "->|<-"
      }
    ],
    illegal: /;/
  };
}
var elm_1 = elm;
var elm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": elm_1
}, [elm_1]));
export { elm$1 as e };
//# sourceMappingURL=elm.js.map
