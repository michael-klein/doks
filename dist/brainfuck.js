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
function brainfuck(hljs) {
  const LITERAL = {
    className: "literal",
    begin: /[+-]/,
    relevance: 0
  };
  return {
    name: "Brainfuck",
    aliases: ["bf"],
    contains: [
      hljs.COMMENT("[^\\[\\]\\.,\\+\\-<> \r\n]", "[\\[\\]\\.,\\+\\-<> \r\n]", {
        returnEnd: true,
        relevance: 0
      }),
      {
        className: "title",
        begin: "[\\[\\]]",
        relevance: 0
      },
      {
        className: "string",
        begin: "[\\.,]",
        relevance: 0
      },
      {
        begin: /(?:\+\+|--)/,
        contains: [LITERAL]
      },
      LITERAL
    ]
  };
}
var brainfuck_1 = brainfuck;
var brainfuck$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": brainfuck_1
}, [brainfuck_1]));
export { brainfuck$1 as b };
//# sourceMappingURL=brainfuck.js.map
