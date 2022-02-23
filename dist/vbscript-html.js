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
function vbscriptHtml(hljs) {
  return {
    name: "VBScript in HTML",
    subLanguage: "xml",
    contains: [
      {
        begin: "<%",
        end: "%>",
        subLanguage: "vbscript"
      }
    ]
  };
}
var vbscriptHtml_1 = vbscriptHtml;
var vbscriptHtml$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": vbscriptHtml_1
}, [vbscriptHtml_1]));
export { vbscriptHtml$1 as v };
//# sourceMappingURL=vbscript-html.js.map
