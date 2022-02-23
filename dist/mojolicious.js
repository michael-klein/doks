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
function mojolicious(hljs) {
  return {
    name: "Mojolicious",
    subLanguage: "xml",
    contains: [
      {
        className: "meta",
        begin: "^__(END|DATA)__$"
      },
      {
        begin: "^\\s*%{1,2}={0,2}",
        end: "$",
        subLanguage: "perl"
      },
      {
        begin: "<%{1,2}={0,2}",
        end: "={0,1}%>",
        subLanguage: "perl",
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  };
}
var mojolicious_1 = mojolicious;
var mojolicious$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": mojolicious_1
}, [mojolicious_1]));
export { mojolicious$1 as m };
//# sourceMappingURL=mojolicious.js.map
