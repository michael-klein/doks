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
function erlang(hljs) {
  const BASIC_ATOM_RE = "[a-z'][a-zA-Z0-9_']*";
  const FUNCTION_NAME_RE = "(" + BASIC_ATOM_RE + ":" + BASIC_ATOM_RE + "|" + BASIC_ATOM_RE + ")";
  const ERLANG_RESERVED = {
    keyword: "after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun if let not of orelse|10 query receive rem try when xor",
    literal: "false true"
  };
  const COMMENT = hljs.COMMENT("%", "$");
  const NUMBER = {
    className: "number",
    begin: "\\b(\\d+(_\\d+)*#[a-fA-F0-9]+(_[a-fA-F0-9]+)*|\\d+(_\\d+)*(\\.\\d+(_\\d+)*)?([eE][-+]?\\d+)?)",
    relevance: 0
  };
  const NAMED_FUN = {
    begin: "fun\\s+" + BASIC_ATOM_RE + "/\\d+"
  };
  const FUNCTION_CALL = {
    begin: FUNCTION_NAME_RE + "\\(",
    end: "\\)",
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        begin: FUNCTION_NAME_RE,
        relevance: 0
      },
      {
        begin: "\\(",
        end: "\\)",
        endsWithParent: true,
        returnEnd: true,
        relevance: 0
      }
    ]
  };
  const TUPLE = {
    begin: /\{/,
    end: /\}/,
    relevance: 0
  };
  const VAR1 = {
    begin: "\\b_([A-Z][A-Za-z0-9_]*)?",
    relevance: 0
  };
  const VAR2 = {
    begin: "[A-Z][a-zA-Z0-9_]*",
    relevance: 0
  };
  const RECORD_ACCESS = {
    begin: "#" + hljs.UNDERSCORE_IDENT_RE,
    relevance: 0,
    returnBegin: true,
    contains: [
      {
        begin: "#" + hljs.UNDERSCORE_IDENT_RE,
        relevance: 0
      },
      {
        begin: /\{/,
        end: /\}/,
        relevance: 0
      }
    ]
  };
  const BLOCK_STATEMENTS = {
    beginKeywords: "fun receive if try case",
    end: "end",
    keywords: ERLANG_RESERVED
  };
  BLOCK_STATEMENTS.contains = [
    COMMENT,
    NAMED_FUN,
    hljs.inherit(hljs.APOS_STRING_MODE, {
      className: ""
    }),
    BLOCK_STATEMENTS,
    FUNCTION_CALL,
    hljs.QUOTE_STRING_MODE,
    NUMBER,
    TUPLE,
    VAR1,
    VAR2,
    RECORD_ACCESS
  ];
  const BASIC_MODES = [
    COMMENT,
    NAMED_FUN,
    BLOCK_STATEMENTS,
    FUNCTION_CALL,
    hljs.QUOTE_STRING_MODE,
    NUMBER,
    TUPLE,
    VAR1,
    VAR2,
    RECORD_ACCESS
  ];
  FUNCTION_CALL.contains[1].contains = BASIC_MODES;
  TUPLE.contains = BASIC_MODES;
  RECORD_ACCESS.contains[1].contains = BASIC_MODES;
  const DIRECTIVES = [
    "-module",
    "-record",
    "-undef",
    "-export",
    "-ifdef",
    "-ifndef",
    "-author",
    "-copyright",
    "-doc",
    "-vsn",
    "-import",
    "-include",
    "-include_lib",
    "-compile",
    "-define",
    "-else",
    "-endif",
    "-file",
    "-behaviour",
    "-behavior",
    "-spec"
  ];
  const PARAMS = {
    className: "params",
    begin: "\\(",
    end: "\\)",
    contains: BASIC_MODES
  };
  return {
    name: "Erlang",
    aliases: ["erl"],
    keywords: ERLANG_RESERVED,
    illegal: "(</|\\*=|\\+=|-=|/\\*|\\*/|\\(\\*|\\*\\))",
    contains: [
      {
        className: "function",
        begin: "^" + BASIC_ATOM_RE + "\\s*\\(",
        end: "->",
        returnBegin: true,
        illegal: "\\(|#|//|/\\*|\\\\|:|;",
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, {
            begin: BASIC_ATOM_RE
          })
        ],
        starts: {
          end: ";|\\.",
          keywords: ERLANG_RESERVED,
          contains: BASIC_MODES
        }
      },
      COMMENT,
      {
        begin: "^-",
        end: "\\.",
        relevance: 0,
        excludeEnd: true,
        returnBegin: true,
        keywords: {
          $pattern: "-" + hljs.IDENT_RE,
          keyword: DIRECTIVES.map((x) => `${x}|1.5`).join(" ")
        },
        contains: [PARAMS]
      },
      NUMBER,
      hljs.QUOTE_STRING_MODE,
      RECORD_ACCESS,
      VAR1,
      VAR2,
      TUPLE,
      {
        begin: /\.$/
      }
    ]
  };
}
var erlang_1 = erlang;
var erlang$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": erlang_1
}, [erlang_1]));
export { erlang$1 as e };
//# sourceMappingURL=erlang.js.map
