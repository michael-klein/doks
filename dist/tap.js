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
function tap(hljs) {
  return {
    name: "Test Anything Protocol",
    case_insensitive: true,
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        className: "meta",
        variants: [
          {
            begin: "^TAP version (\\d+)$"
          },
          {
            begin: "^1\\.\\.(\\d+)$"
          }
        ]
      },
      {
        begin: /---$/,
        end: "\\.\\.\\.$",
        subLanguage: "yaml",
        relevance: 0
      },
      {
        className: "number",
        begin: " (\\d+) "
      },
      {
        className: "symbol",
        variants: [
          {
            begin: "^ok"
          },
          {
            begin: "^not ok"
          }
        ]
      }
    ]
  };
}
var tap_1 = tap;
var tap$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": tap_1
}, [tap_1]));
export { tap$1 as t };
//# sourceMappingURL=tap.js.map
