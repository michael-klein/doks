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
function csp(hljs) {
  return {
    name: "CSP",
    case_insensitive: false,
    keywords: {
      $pattern: "[a-zA-Z][a-zA-Z0-9_-]*",
      keyword: "base-uri child-src connect-src default-src font-src form-action frame-ancestors frame-src img-src media-src object-src plugin-types report-uri sandbox script-src style-src"
    },
    contains: [
      {
        className: "string",
        begin: "'",
        end: "'"
      },
      {
        className: "attribute",
        begin: "^Content",
        end: ":",
        excludeEnd: true
      }
    ]
  };
}
var csp_1 = csp;
var csp$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": csp_1
}, [csp_1]));
export { csp$1 as c };
//# sourceMappingURL=csp.js.map
