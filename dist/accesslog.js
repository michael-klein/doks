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
function either(...args) {
  const joined = "(" + args.map((x) => source(x)).join("|") + ")";
  return joined;
}
function accesslog(_hljs) {
  const HTTP_VERBS = [
    "GET",
    "POST",
    "HEAD",
    "PUT",
    "DELETE",
    "CONNECT",
    "OPTIONS",
    "PATCH",
    "TRACE"
  ];
  return {
    name: "Apache Access Log",
    contains: [
      {
        className: "number",
        begin: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?\b/,
        relevance: 5
      },
      {
        className: "number",
        begin: /\b\d+\b/,
        relevance: 0
      },
      {
        className: "string",
        begin: concat(/"/, either(...HTTP_VERBS)),
        end: /"/,
        keywords: HTTP_VERBS,
        illegal: /\n/,
        relevance: 5,
        contains: [
          {
            begin: /HTTP\/[12]\.\d'/,
            relevance: 5
          }
        ]
      },
      {
        className: "string",
        begin: /\[\d[^\]\n]{8,}\]/,
        illegal: /\n/,
        relevance: 1
      },
      {
        className: "string",
        begin: /\[/,
        end: /\]/,
        illegal: /\n/,
        relevance: 0
      },
      {
        className: "string",
        begin: /"Mozilla\/\d\.\d \(/,
        end: /"/,
        illegal: /\n/,
        relevance: 3
      },
      {
        className: "string",
        begin: /"/,
        end: /"/,
        illegal: /\n/,
        relevance: 0
      }
    ]
  };
}
var accesslog_1 = accesslog;
var accesslog$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": accesslog_1
}, [accesslog_1]));
export { accesslog$1 as a };
//# sourceMappingURL=accesslog.js.map
