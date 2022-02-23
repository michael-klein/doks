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
function dsconfig(hljs) {
  const QUOTED_PROPERTY = {
    className: "string",
    begin: /"/,
    end: /"/
  };
  const APOS_PROPERTY = {
    className: "string",
    begin: /'/,
    end: /'/
  };
  const UNQUOTED_PROPERTY = {
    className: "string",
    begin: /[\w\-?]+:\w+/,
    end: /\W/,
    relevance: 0
  };
  const VALUELESS_PROPERTY = {
    className: "string",
    begin: /\w+(\-\w+)*/,
    end: /(?=\W)/,
    relevance: 0
  };
  return {
    keywords: "dsconfig",
    contains: [
      {
        className: "keyword",
        begin: "^dsconfig",
        end: /\s/,
        excludeEnd: true,
        relevance: 10
      },
      {
        className: "built_in",
        begin: /(list|create|get|set|delete)-(\w+)/,
        end: /\s/,
        excludeEnd: true,
        illegal: "!@#$%^&*()",
        relevance: 10
      },
      {
        className: "built_in",
        begin: /--(\w+)/,
        end: /\s/,
        excludeEnd: true
      },
      QUOTED_PROPERTY,
      APOS_PROPERTY,
      UNQUOTED_PROPERTY,
      VALUELESS_PROPERTY,
      hljs.HASH_COMMENT_MODE
    ]
  };
}
var dsconfig_1 = dsconfig;
var dsconfig$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": dsconfig_1
}, [dsconfig_1]));
export { dsconfig$1 as d };
//# sourceMappingURL=dsconfig.js.map
