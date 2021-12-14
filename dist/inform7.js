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
function inform7(hljs) {
  const START_BRACKET = "\\[";
  const END_BRACKET = "\\]";
  return {
    name: "Inform 7",
    aliases: ["i7"],
    case_insensitive: true,
    keywords: {
      keyword: "thing room person man woman animal container supporter backdrop door scenery open closed locked inside gender is are say understand kind of rule"
    },
    contains: [
      {
        className: "string",
        begin: '"',
        end: '"',
        relevance: 0,
        contains: [
          {
            className: "subst",
            begin: START_BRACKET,
            end: END_BRACKET
          }
        ]
      },
      {
        className: "section",
        begin: /^(Volume|Book|Part|Chapter|Section|Table)\b/,
        end: "$"
      },
      {
        begin: /^(Check|Carry out|Report|Instead of|To|Rule|When|Before|After)\b/,
        end: ":",
        contains: [
          {
            begin: "\\(This",
            end: "\\)"
          }
        ]
      },
      {
        className: "comment",
        begin: START_BRACKET,
        end: END_BRACKET,
        contains: ["self"]
      }
    ]
  };
}
var inform7_1 = inform7;
var inform7$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": inform7_1
}, [inform7_1]));
export { inform7$1 as i };
//# sourceMappingURL=inform7.js.map
