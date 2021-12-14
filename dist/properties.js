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
function properties(hljs) {
  var WS0 = "[ \\t\\f]*";
  var WS1 = "[ \\t\\f]+";
  var EQUAL_DELIM = WS0 + "[:=]" + WS0;
  var WS_DELIM = WS1;
  var DELIM = "(" + EQUAL_DELIM + "|" + WS_DELIM + ")";
  var KEY_ALPHANUM = "([^\\\\\\W:= \\t\\f\\n]|\\\\.)+";
  var KEY_OTHER = "([^\\\\:= \\t\\f\\n]|\\\\.)+";
  var DELIM_AND_VALUE = {
    end: DELIM,
    relevance: 0,
    starts: {
      className: "string",
      end: /$/,
      relevance: 0,
      contains: [
        { begin: "\\\\\\\\" },
        { begin: "\\\\\\n" }
      ]
    }
  };
  return {
    name: ".properties",
    case_insensitive: true,
    illegal: /\S/,
    contains: [
      hljs.COMMENT("^\\s*[!#]", "$"),
      {
        returnBegin: true,
        variants: [
          { begin: KEY_ALPHANUM + EQUAL_DELIM, relevance: 1 },
          { begin: KEY_ALPHANUM + WS_DELIM, relevance: 0 }
        ],
        contains: [
          {
            className: "attr",
            begin: KEY_ALPHANUM,
            endsParent: true,
            relevance: 0
          }
        ],
        starts: DELIM_AND_VALUE
      },
      {
        begin: KEY_OTHER + DELIM,
        returnBegin: true,
        relevance: 0,
        contains: [
          {
            className: "meta",
            begin: KEY_OTHER,
            endsParent: true,
            relevance: 0
          }
        ],
        starts: DELIM_AND_VALUE
      },
      {
        className: "attr",
        relevance: 0,
        begin: KEY_OTHER + WS0 + "$"
      }
    ]
  };
}
var properties_1 = properties;
var properties$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": properties_1
}, [properties_1]));
export { properties$1 as p };
//# sourceMappingURL=properties.js.map
