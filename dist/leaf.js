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
function leaf(hljs) {
  return {
    name: "Leaf",
    contains: [
      {
        className: "function",
        begin: "#+[A-Za-z_0-9]*\\(",
        end: / \{/,
        returnBegin: true,
        excludeEnd: true,
        contains: [
          {
            className: "keyword",
            begin: "#+"
          },
          {
            className: "title",
            begin: "[A-Za-z_][A-Za-z_0-9]*"
          },
          {
            className: "params",
            begin: "\\(",
            end: "\\)",
            endsParent: true,
            contains: [
              {
                className: "string",
                begin: '"',
                end: '"'
              },
              {
                className: "variable",
                begin: "[A-Za-z_][A-Za-z_0-9]*"
              }
            ]
          }
        ]
      }
    ]
  };
}
var leaf_1 = leaf;
var leaf$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": leaf_1
}, [leaf_1]));
export { leaf$1 as l };
//# sourceMappingURL=leaf.js.map
