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
function vala(hljs) {
  return {
    name: "Vala",
    keywords: {
      keyword: "char uchar unichar int uint long ulong short ushort int8 int16 int32 int64 uint8 uint16 uint32 uint64 float double bool struct enum string void weak unowned owned async signal static abstract interface override virtual delegate if while do for foreach else switch case break default return try catch public private protected internal using new this get set const stdout stdin stderr var",
      built_in: "DBus GLib CCode Gee Object Gtk Posix",
      literal: "false true null"
    },
    contains: [
      {
        className: "class",
        beginKeywords: "class interface namespace",
        end: /\{/,
        excludeEnd: true,
        illegal: "[^,:\\n\\s\\.]",
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: "string",
        begin: '"""',
        end: '"""',
        relevance: 5
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: "meta",
        begin: "^#",
        end: "$",
        relevance: 2
      }
    ]
  };
}
var vala_1 = vala;
var vala$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": vala_1
}, [vala_1]));
export { vala$1 as v };
//# sourceMappingURL=vala.js.map
