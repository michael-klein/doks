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
function fsharp(hljs) {
  const TYPEPARAM = {
    begin: "<",
    end: ">",
    contains: [
      hljs.inherit(hljs.TITLE_MODE, {
        begin: /'[a-zA-Z0-9_]+/
      })
    ]
  };
  return {
    name: "F#",
    aliases: ["fs"],
    keywords: "abstract and as assert base begin class default delegate do done downcast downto elif else end exception extern false finally for fun function global if in inherit inline interface internal lazy let match member module mutable namespace new null of open or override private public rec return sig static struct then to true try type upcast use val void when while with yield",
    illegal: /\/\*/,
    contains: [
      {
        className: "keyword",
        begin: /\b(yield|return|let|do)!/
      },
      {
        className: "string",
        begin: '@"',
        end: '"',
        contains: [
          {
            begin: '""'
          }
        ]
      },
      {
        className: "string",
        begin: '"""',
        end: '"""'
      },
      hljs.COMMENT("\\(\\*(\\s)", "\\*\\)", {
        contains: ["self"]
      }),
      {
        className: "class",
        beginKeywords: "type",
        end: "\\(|=|$",
        excludeEnd: true,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          TYPEPARAM
        ]
      },
      {
        className: "meta",
        begin: "\\[<",
        end: ">\\]",
        relevance: 10
      },
      {
        className: "symbol",
        begin: "\\B('[A-Za-z])\\b",
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        illegal: null
      }),
      hljs.C_NUMBER_MODE
    ]
  };
}
var fsharp_1 = fsharp;
var fsharp$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": fsharp_1
}, [fsharp_1]));
export { fsharp$1 as f };
//# sourceMappingURL=fsharp.js.map
