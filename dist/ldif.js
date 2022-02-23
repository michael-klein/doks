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
function ldif(hljs) {
  return {
    name: "LDIF",
    contains: [
      {
        className: "attribute",
        begin: "^dn",
        end: ": ",
        excludeEnd: true,
        starts: {
          end: "$",
          relevance: 0
        },
        relevance: 10
      },
      {
        className: "attribute",
        begin: "^\\w",
        end: ": ",
        excludeEnd: true,
        starts: {
          end: "$",
          relevance: 0
        }
      },
      {
        className: "literal",
        begin: "^-",
        end: "$"
      },
      hljs.HASH_COMMENT_MODE
    ]
  };
}
var ldif_1 = ldif;
var ldif$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": ldif_1
}, [ldif_1]));
export { ldif$1 as l };
//# sourceMappingURL=ldif.js.map
