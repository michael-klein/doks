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
function ebnf(hljs) {
  const commentMode = hljs.COMMENT(/\(\*/, /\*\)/);
  const nonTerminalMode = {
    className: "attribute",
    begin: /^[ ]*[a-zA-Z]+([\s_-]+[a-zA-Z]+)*/
  };
  const specialSequenceMode = {
    className: "meta",
    begin: /\?.*\?/
  };
  const ruleBodyMode = {
    begin: /=/,
    end: /[.;]/,
    contains: [
      commentMode,
      specialSequenceMode,
      {
        className: "string",
        variants: [
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          {
            begin: "`",
            end: "`"
          }
        ]
      }
    ]
  };
  return {
    name: "Extended Backus-Naur Form",
    illegal: /\S/,
    contains: [
      commentMode,
      nonTerminalMode,
      ruleBodyMode
    ]
  };
}
var ebnf_1 = ebnf;
var ebnf$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": ebnf_1
}, [ebnf_1]));
export { ebnf$1 as e };
//# sourceMappingURL=ebnf.js.map
