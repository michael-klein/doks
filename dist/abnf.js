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
function abnf(hljs) {
  const regexes = {
    ruleDeclaration: /^[a-zA-Z][a-zA-Z0-9-]*/,
    unexpectedChars: /[!@#$^&',?+~`|:]/
  };
  const keywords = [
    "ALPHA",
    "BIT",
    "CHAR",
    "CR",
    "CRLF",
    "CTL",
    "DIGIT",
    "DQUOTE",
    "HEXDIG",
    "HTAB",
    "LF",
    "LWSP",
    "OCTET",
    "SP",
    "VCHAR",
    "WSP"
  ];
  const commentMode = hljs.COMMENT(/;/, /$/);
  const terminalBinaryMode = {
    className: "symbol",
    begin: /%b[0-1]+(-[0-1]+|(\.[0-1]+)+){0,1}/
  };
  const terminalDecimalMode = {
    className: "symbol",
    begin: /%d[0-9]+(-[0-9]+|(\.[0-9]+)+){0,1}/
  };
  const terminalHexadecimalMode = {
    className: "symbol",
    begin: /%x[0-9A-F]+(-[0-9A-F]+|(\.[0-9A-F]+)+){0,1}/
  };
  const caseSensitivityIndicatorMode = {
    className: "symbol",
    begin: /%[si]/
  };
  const ruleDeclarationMode = {
    className: "attribute",
    begin: concat(regexes.ruleDeclaration, /(?=\s*=)/)
  };
  return {
    name: "Augmented Backus-Naur Form",
    illegal: regexes.unexpectedChars,
    keywords,
    contains: [
      ruleDeclarationMode,
      commentMode,
      terminalBinaryMode,
      terminalDecimalMode,
      terminalHexadecimalMode,
      caseSensitivityIndicatorMode,
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE
    ]
  };
}
var abnf_1 = abnf;
var abnf$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": abnf_1
}, [abnf_1]));
export { abnf$1 as a };
//# sourceMappingURL=abnf.js.map
