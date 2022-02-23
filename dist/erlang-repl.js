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
function erlangRepl(hljs) {
  return {
    name: "Erlang REPL",
    keywords: {
      built_in: "spawn spawn_link self",
      keyword: "after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if let not of or orelse|10 query receive rem try when xor"
    },
    contains: [
      {
        className: "meta",
        begin: "^[0-9]+> ",
        relevance: 10
      },
      hljs.COMMENT("%", "$"),
      {
        className: "number",
        begin: "\\b(\\d+(_\\d+)*#[a-fA-F0-9]+(_[a-fA-F0-9]+)*|\\d+(_\\d+)*(\\.\\d+(_\\d+)*)?([eE][-+]?\\d+)?)",
        relevance: 0
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        begin: concat(/\?(::)?/, /([A-Z]\w*)/, /((::)[A-Z]\w*)*/)
      },
      {
        begin: "->"
      },
      {
        begin: "ok"
      },
      {
        begin: "!"
      },
      {
        begin: "(\\b[a-z'][a-zA-Z0-9_']*:[a-z'][a-zA-Z0-9_']*)|(\\b[a-z'][a-zA-Z0-9_']*)",
        relevance: 0
      },
      {
        begin: "[A-Z][a-zA-Z0-9_']*",
        relevance: 0
      }
    ]
  };
}
var erlangRepl_1 = erlangRepl;
var erlangRepl$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": erlangRepl_1
}, [erlangRepl_1]));
export { erlangRepl$1 as e };
//# sourceMappingURL=erlang-repl.js.map
