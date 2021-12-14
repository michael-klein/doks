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
function phpTemplate(hljs) {
  return {
    name: "PHP template",
    subLanguage: "xml",
    contains: [
      {
        begin: /<\?(php|=)?/,
        end: /\?>/,
        subLanguage: "php",
        contains: [
          {
            begin: "/\\*",
            end: "\\*/",
            skip: true
          },
          {
            begin: 'b"',
            end: '"',
            skip: true
          },
          {
            begin: "b'",
            end: "'",
            skip: true
          },
          hljs.inherit(hljs.APOS_STRING_MODE, {
            illegal: null,
            className: null,
            contains: null,
            skip: true
          }),
          hljs.inherit(hljs.QUOTE_STRING_MODE, {
            illegal: null,
            className: null,
            contains: null,
            skip: true
          })
        ]
      }
    ]
  };
}
var phpTemplate_1 = phpTemplate;
var phpTemplate$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": phpTemplate_1
}, [phpTemplate_1]));
export { phpTemplate$1 as p };
//# sourceMappingURL=php-template.js.map
