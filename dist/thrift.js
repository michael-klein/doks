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
function thrift(hljs) {
  const BUILT_IN_TYPES = "bool byte i16 i32 i64 double string binary";
  return {
    name: "Thrift",
    keywords: {
      keyword: "namespace const typedef struct enum service exception void oneway set list map required optional",
      built_in: BUILT_IN_TYPES,
      literal: "true false"
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: "class",
        beginKeywords: "struct enum service exception",
        end: /\{/,
        illegal: /\n/,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            starts: {
              endsWithParent: true,
              excludeEnd: true
            }
          })
        ]
      },
      {
        begin: "\\b(set|list|map)\\s*<",
        end: ">",
        keywords: BUILT_IN_TYPES,
        contains: ["self"]
      }
    ]
  };
}
var thrift_1 = thrift;
var thrift$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": thrift_1
}, [thrift_1]));
export { thrift$1 as t };
//# sourceMappingURL=thrift.js.map
