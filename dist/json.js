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
function json(hljs) {
  const LITERALS = {
    literal: "true false null"
  };
  const ALLOWED_COMMENTS = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE
  ];
  const TYPES = [
    hljs.QUOTE_STRING_MODE,
    hljs.C_NUMBER_MODE
  ];
  const VALUE_CONTAINER = {
    end: ",",
    endsWithParent: true,
    excludeEnd: true,
    contains: TYPES,
    keywords: LITERALS
  };
  const OBJECT = {
    begin: /\{/,
    end: /\}/,
    contains: [
      {
        className: "attr",
        begin: /"/,
        end: /"/,
        contains: [hljs.BACKSLASH_ESCAPE],
        illegal: "\\n"
      },
      hljs.inherit(VALUE_CONTAINER, {
        begin: /:/
      })
    ].concat(ALLOWED_COMMENTS),
    illegal: "\\S"
  };
  const ARRAY = {
    begin: "\\[",
    end: "\\]",
    contains: [hljs.inherit(VALUE_CONTAINER)],
    illegal: "\\S"
  };
  TYPES.push(OBJECT, ARRAY);
  ALLOWED_COMMENTS.forEach(function(rule) {
    TYPES.push(rule);
  });
  return {
    name: "JSON",
    contains: TYPES,
    keywords: LITERALS,
    illegal: "\\S"
  };
}
var json_1 = json;
var json$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": json_1
}, [json_1]));
export { json$1 as j };
//# sourceMappingURL=json.js.map
