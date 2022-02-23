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
function cal(hljs) {
  const KEYWORDS = "div mod in and or not xor asserterror begin case do downto else end exit for if of repeat then to until while with var";
  const LITERALS = "false true";
  const COMMENT_MODES = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.COMMENT(/\{/, /\}/, {
      relevance: 0
    }),
    hljs.COMMENT(/\(\*/, /\*\)/, {
      relevance: 10
    })
  ];
  const STRING = {
    className: "string",
    begin: /'/,
    end: /'/,
    contains: [{
      begin: /''/
    }]
  };
  const CHAR_STRING = {
    className: "string",
    begin: /(#\d+)+/
  };
  const DATE = {
    className: "number",
    begin: "\\b\\d+(\\.\\d+)?(DT|D|T)",
    relevance: 0
  };
  const DBL_QUOTED_VARIABLE = {
    className: "string",
    begin: '"',
    end: '"'
  };
  const PROCEDURE = {
    className: "function",
    beginKeywords: "procedure",
    end: /[:;]/,
    keywords: "procedure|10",
    contains: [
      hljs.TITLE_MODE,
      {
        className: "params",
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        contains: [
          STRING,
          CHAR_STRING
        ]
      }
    ].concat(COMMENT_MODES)
  };
  const OBJECT = {
    className: "class",
    begin: "OBJECT (Table|Form|Report|Dataport|Codeunit|XMLport|MenuSuite|Page|Query) (\\d+) ([^\\r\\n]+)",
    returnBegin: true,
    contains: [
      hljs.TITLE_MODE,
      PROCEDURE
    ]
  };
  return {
    name: "C/AL",
    case_insensitive: true,
    keywords: {
      keyword: KEYWORDS,
      literal: LITERALS
    },
    illegal: /\/\*/,
    contains: [
      STRING,
      CHAR_STRING,
      DATE,
      DBL_QUOTED_VARIABLE,
      hljs.NUMBER_MODE,
      OBJECT,
      PROCEDURE
    ]
  };
}
var cal_1 = cal;
var cal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": cal_1
}, [cal_1]));
export { cal$1 as c };
//# sourceMappingURL=cal.js.map
