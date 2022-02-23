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
function apache(hljs) {
  const NUMBER_REF = {
    className: "number",
    begin: /[$%]\d+/
  };
  const NUMBER = {
    className: "number",
    begin: /\d+/
  };
  const IP_ADDRESS = {
    className: "number",
    begin: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?/
  };
  const PORT_NUMBER = {
    className: "number",
    begin: /:\d{1,5}/
  };
  return {
    name: "Apache config",
    aliases: ["apacheconf"],
    case_insensitive: true,
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        className: "section",
        begin: /<\/?/,
        end: />/,
        contains: [
          IP_ADDRESS,
          PORT_NUMBER,
          hljs.inherit(hljs.QUOTE_STRING_MODE, { relevance: 0 })
        ]
      },
      {
        className: "attribute",
        begin: /\w+/,
        relevance: 0,
        keywords: {
          nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
        },
        starts: {
          end: /$/,
          relevance: 0,
          keywords: { literal: "on off all deny allow" },
          contains: [
            {
              className: "meta",
              begin: /\s\[/,
              end: /\]$/
            },
            {
              className: "variable",
              begin: /[\$%]\{/,
              end: /\}/,
              contains: [
                "self",
                NUMBER_REF
              ]
            },
            IP_ADDRESS,
            NUMBER,
            hljs.QUOTE_STRING_MODE
          ]
        }
      }
    ],
    illegal: /\S/
  };
}
var apache_1 = apache;
var apache$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": apache_1
}, [apache_1]));
export { apache$1 as a };
//# sourceMappingURL=apache.js.map
