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
function profile(hljs) {
  return {
    name: "Python profiler",
    contains: [
      hljs.C_NUMBER_MODE,
      {
        begin: "[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}",
        end: ":",
        excludeEnd: true
      },
      {
        begin: "(ncalls|tottime|cumtime)",
        end: "$",
        keywords: "ncalls tottime|10 cumtime|10 filename",
        relevance: 10
      },
      {
        begin: "function calls",
        end: "$",
        contains: [hljs.C_NUMBER_MODE],
        relevance: 10
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: "string",
        begin: "\\(",
        end: "\\)$",
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0
      }
    ]
  };
}
var profile_1 = profile;
var profile$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": profile_1
}, [profile_1]));
export { profile$1 as p };
//# sourceMappingURL=profile.js.map
