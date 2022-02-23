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
function nix(hljs) {
  const NIX_KEYWORDS = {
    keyword: "rec with let in inherit assert if else then",
    literal: "true false or and null",
    built_in: "import abort baseNameOf dirOf isNull builtins map removeAttrs throw toString derivation"
  };
  const ANTIQUOTE = {
    className: "subst",
    begin: /\$\{/,
    end: /\}/,
    keywords: NIX_KEYWORDS
  };
  const ATTRS = {
    begin: /[a-zA-Z0-9-_]+(\s*=)/,
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: /\S+/
      }
    ]
  };
  const STRING = {
    className: "string",
    contains: [ANTIQUOTE],
    variants: [
      {
        begin: "''",
        end: "''"
      },
      {
        begin: '"',
        end: '"'
      }
    ]
  };
  const EXPRESSIONS = [
    hljs.NUMBER_MODE,
    hljs.HASH_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    STRING,
    ATTRS
  ];
  ANTIQUOTE.contains = EXPRESSIONS;
  return {
    name: "Nix",
    aliases: ["nixos"],
    keywords: NIX_KEYWORDS,
    contains: EXPRESSIONS
  };
}
var nix_1 = nix;
var nix$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": nix_1
}, [nix_1]));
export { nix$1 as n };
//# sourceMappingURL=nix.js.map
