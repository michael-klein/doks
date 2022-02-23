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
function smali(hljs) {
  const smali_instr_low_prio = [
    "add",
    "and",
    "cmp",
    "cmpg",
    "cmpl",
    "const",
    "div",
    "double",
    "float",
    "goto",
    "if",
    "int",
    "long",
    "move",
    "mul",
    "neg",
    "new",
    "nop",
    "not",
    "or",
    "rem",
    "return",
    "shl",
    "shr",
    "sput",
    "sub",
    "throw",
    "ushr",
    "xor"
  ];
  const smali_instr_high_prio = [
    "aget",
    "aput",
    "array",
    "check",
    "execute",
    "fill",
    "filled",
    "goto/16",
    "goto/32",
    "iget",
    "instance",
    "invoke",
    "iput",
    "monitor",
    "packed",
    "sget",
    "sparse"
  ];
  const smali_keywords = [
    "transient",
    "constructor",
    "abstract",
    "final",
    "synthetic",
    "public",
    "private",
    "protected",
    "static",
    "bridge",
    "system"
  ];
  return {
    name: "Smali",
    contains: [
      {
        className: "string",
        begin: '"',
        end: '"',
        relevance: 0
      },
      hljs.COMMENT("#", "$", {
        relevance: 0
      }),
      {
        className: "keyword",
        variants: [
          {
            begin: "\\s*\\.end\\s[a-zA-Z0-9]*"
          },
          {
            begin: "^[ ]*\\.[a-zA-Z]*",
            relevance: 0
          },
          {
            begin: "\\s:[a-zA-Z_0-9]*",
            relevance: 0
          },
          {
            begin: "\\s(" + smali_keywords.join("|") + ")"
          }
        ]
      },
      {
        className: "built_in",
        variants: [
          {
            begin: "\\s(" + smali_instr_low_prio.join("|") + ")\\s"
          },
          {
            begin: "\\s(" + smali_instr_low_prio.join("|") + ")((-|/)[a-zA-Z0-9]+)+\\s",
            relevance: 10
          },
          {
            begin: "\\s(" + smali_instr_high_prio.join("|") + ")((-|/)[a-zA-Z0-9]+)*\\s",
            relevance: 10
          }
        ]
      },
      {
        className: "class",
        begin: "L[^(;:\n]*;",
        relevance: 0
      },
      {
        begin: "[vp][0-9]+"
      }
    ]
  };
}
var smali_1 = smali;
var smali$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": smali_1
}, [smali_1]));
export { smali$1 as s };
//# sourceMappingURL=smali.js.map
