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
function source(re) {
  if (!re)
    return null;
  if (typeof re === "string")
    return re;
  return re.source;
}
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}
function http(hljs) {
  const VERSION = "HTTP/(2|1\\.[01])";
  const HEADER_NAME = /[A-Za-z][A-Za-z0-9-]*/;
  const HEADER = {
    className: "attribute",
    begin: concat("^", HEADER_NAME, "(?=\\:\\s)"),
    starts: {
      contains: [
        {
          className: "punctuation",
          begin: /: /,
          relevance: 0,
          starts: {
            end: "$",
            relevance: 0
          }
        }
      ]
    }
  };
  const HEADERS_AND_BODY = [
    HEADER,
    {
      begin: "\\n\\n",
      starts: { subLanguage: [], endsWithParent: true }
    }
  ];
  return {
    name: "HTTP",
    aliases: ["https"],
    illegal: /\S/,
    contains: [
      {
        begin: "^(?=" + VERSION + " \\d{3})",
        end: /$/,
        contains: [
          {
            className: "meta",
            begin: VERSION
          },
          {
            className: "number",
            begin: "\\b\\d{3}\\b"
          }
        ],
        starts: {
          end: /\b\B/,
          illegal: /\S/,
          contains: HEADERS_AND_BODY
        }
      },
      {
        begin: "(?=^[A-Z]+ (.*?) " + VERSION + "$)",
        end: /$/,
        contains: [
          {
            className: "string",
            begin: " ",
            end: " ",
            excludeBegin: true,
            excludeEnd: true
          },
          {
            className: "meta",
            begin: VERSION
          },
          {
            className: "keyword",
            begin: "[A-Z]+"
          }
        ],
        starts: {
          end: /\b\B/,
          illegal: /\S/,
          contains: HEADERS_AND_BODY
        }
      },
      hljs.inherit(HEADER, {
        relevance: 0
      })
    ]
  };
}
var http_1 = http;
var http$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": http_1
}, [http_1]));
export { http$1 as h };
//# sourceMappingURL=http.js.map
