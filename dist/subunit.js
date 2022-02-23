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
function subunit(hljs) {
  const DETAILS = {
    className: "string",
    begin: "\\[\n(multipart)?",
    end: "\\]\n"
  };
  const TIME = {
    className: "string",
    begin: "\\d{4}-\\d{2}-\\d{2}(\\s+)\\d{2}:\\d{2}:\\d{2}.\\d+Z"
  };
  const PROGRESSVALUE = {
    className: "string",
    begin: "(\\+|-)\\d+"
  };
  const KEYWORDS = {
    className: "keyword",
    relevance: 10,
    variants: [
      {
        begin: "^(test|testing|success|successful|failure|error|skip|xfail|uxsuccess)(:?)\\s+(test)?"
      },
      {
        begin: "^progress(:?)(\\s+)?(pop|push)?"
      },
      {
        begin: "^tags:"
      },
      {
        begin: "^time:"
      }
    ]
  };
  return {
    name: "SubUnit",
    case_insensitive: true,
    contains: [
      DETAILS,
      TIME,
      PROGRESSVALUE,
      KEYWORDS
    ]
  };
}
var subunit_1 = subunit;
var subunit$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": subunit_1
}, [subunit_1]));
export { subunit$1 as s };
//# sourceMappingURL=subunit.js.map
