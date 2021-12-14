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
function prolog(hljs) {
  const ATOM = {
    begin: /[a-z][A-Za-z0-9_]*/,
    relevance: 0
  };
  const VAR = {
    className: "symbol",
    variants: [
      {
        begin: /[A-Z][a-zA-Z0-9_]*/
      },
      {
        begin: /_[A-Za-z0-9_]*/
      }
    ],
    relevance: 0
  };
  const PARENTED = {
    begin: /\(/,
    end: /\)/,
    relevance: 0
  };
  const LIST = {
    begin: /\[/,
    end: /\]/
  };
  const LINE_COMMENT = {
    className: "comment",
    begin: /%/,
    end: /$/,
    contains: [hljs.PHRASAL_WORDS_MODE]
  };
  const BACKTICK_STRING = {
    className: "string",
    begin: /`/,
    end: /`/,
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  const CHAR_CODE = {
    className: "string",
    begin: /0'(\\'|.)/
  };
  const SPACE_CODE = {
    className: "string",
    begin: /0'\\s/
  };
  const PRED_OP = {
    begin: /:-/
  };
  const inner = [
    ATOM,
    VAR,
    PARENTED,
    PRED_OP,
    LIST,
    LINE_COMMENT,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.APOS_STRING_MODE,
    BACKTICK_STRING,
    CHAR_CODE,
    SPACE_CODE,
    hljs.C_NUMBER_MODE
  ];
  PARENTED.contains = inner;
  LIST.contains = inner;
  return {
    name: "Prolog",
    contains: inner.concat([
      {
        begin: /\.$/
      }
    ])
  };
}
var prolog_1 = prolog;
var prolog$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": prolog_1
}, [prolog_1]));
export { prolog$1 as p };
//# sourceMappingURL=prolog.js.map
