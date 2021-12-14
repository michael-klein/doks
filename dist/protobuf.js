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
function protobuf(hljs) {
  return {
    name: "Protocol Buffers",
    keywords: {
      keyword: "package import option optional required repeated group oneof",
      built_in: "double float int32 int64 uint32 uint64 sint32 sint64 fixed32 fixed64 sfixed32 sfixed64 bool string bytes",
      literal: "true false"
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: "class",
        beginKeywords: "message enum service",
        end: /\{/,
        illegal: /\n/,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            starts: { endsWithParent: true, excludeEnd: true }
          })
        ]
      },
      {
        className: "function",
        beginKeywords: "rpc",
        end: /[{;]/,
        excludeEnd: true,
        keywords: "rpc returns"
      },
      {
        begin: /^\s*[A-Z_]+(?=\s*=[^\n]+;$)/
      }
    ]
  };
}
var protobuf_1 = protobuf;
var protobuf$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": protobuf_1
}, [protobuf_1]));
export { protobuf$1 as p };
//# sourceMappingURL=protobuf.js.map
