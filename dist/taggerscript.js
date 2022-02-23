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
function taggerscript(hljs) {
  const COMMENT = {
    className: "comment",
    begin: /\$noop\(/,
    end: /\)/,
    contains: [{
      begin: /\(/,
      end: /\)/,
      contains: [
        "self",
        {
          begin: /\\./
        }
      ]
    }],
    relevance: 10
  };
  const FUNCTION = {
    className: "keyword",
    begin: /\$(?!noop)[a-zA-Z][_a-zA-Z0-9]*/,
    end: /\(/,
    excludeEnd: true
  };
  const VARIABLE = {
    className: "variable",
    begin: /%[_a-zA-Z0-9:]*/,
    end: "%"
  };
  const ESCAPE_SEQUENCE = {
    className: "symbol",
    begin: /\\./
  };
  return {
    name: "Tagger Script",
    contains: [
      COMMENT,
      FUNCTION,
      VARIABLE,
      ESCAPE_SEQUENCE
    ]
  };
}
var taggerscript_1 = taggerscript;
var taggerscript$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": taggerscript_1
}, [taggerscript_1]));
export { taggerscript$1 as t };
//# sourceMappingURL=taggerscript.js.map
