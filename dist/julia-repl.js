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
function juliaRepl(hljs) {
  return {
    name: "Julia REPL",
    contains: [
      {
        className: "meta",
        begin: /^julia>/,
        relevance: 10,
        starts: {
          end: /^(?![ ]{6})/,
          subLanguage: "julia"
        },
        aliases: ["jldoctest"]
      }
    ]
  };
}
var juliaRepl_1 = juliaRepl;
var juliaRepl$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": juliaRepl_1
}, [juliaRepl_1]));
export { juliaRepl$1 as j };
//# sourceMappingURL=julia-repl.js.map
