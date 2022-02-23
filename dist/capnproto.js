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
function capnproto(hljs) {
  return {
    name: "Cap\u2019n Proto",
    aliases: ["capnp"],
    keywords: {
      keyword: "struct enum interface union group import using const annotation extends in of on as with from fixed",
      built_in: "Void Bool Int8 Int16 Int32 Int64 UInt8 UInt16 UInt32 UInt64 Float32 Float64 Text Data AnyPointer AnyStruct Capability List",
      literal: "true false"
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      hljs.HASH_COMMENT_MODE,
      {
        className: "meta",
        begin: /@0x[\w\d]{16};/,
        illegal: /\n/
      },
      {
        className: "symbol",
        begin: /@\d+\b/
      },
      {
        className: "class",
        beginKeywords: "struct enum",
        end: /\{/,
        illegal: /\n/,
        contains: [hljs.inherit(hljs.TITLE_MODE, {
          starts: {
            endsWithParent: true,
            excludeEnd: true
          }
        })]
      },
      {
        className: "class",
        beginKeywords: "interface",
        end: /\{/,
        illegal: /\n/,
        contains: [hljs.inherit(hljs.TITLE_MODE, {
          starts: {
            endsWithParent: true,
            excludeEnd: true
          }
        })]
      }
    ]
  };
}
var capnproto_1 = capnproto;
var capnproto$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": capnproto_1
}, [capnproto_1]));
export { capnproto$1 as c };
//# sourceMappingURL=capnproto.js.map
