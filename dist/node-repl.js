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
function nodeRepl(hljs) {
  return {
    name: "Node REPL",
    contains: [
      {
        className: "meta",
        starts: {
          end: / |$/,
          starts: {
            end: "$",
            subLanguage: "javascript"
          }
        },
        variants: [
          {
            begin: /^>(?=[ ]|$)/
          },
          {
            begin: /^\.\.\.(?=[ ]|$)/
          }
        ]
      }
    ]
  };
}
var nodeRepl_1 = nodeRepl;
var nodeRepl$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": nodeRepl_1
}, [nodeRepl_1]));
export { nodeRepl$1 as n };
//# sourceMappingURL=node-repl.js.map
