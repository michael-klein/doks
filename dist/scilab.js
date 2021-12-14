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
function scilab(hljs) {
  const COMMON_CONTAINS = [
    hljs.C_NUMBER_MODE,
    {
      className: "string",
      begin: `'|"`,
      end: `'|"`,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        {
          begin: "''"
        }
      ]
    }
  ];
  return {
    name: "Scilab",
    aliases: ["sci"],
    keywords: {
      $pattern: /%?\w+/,
      keyword: "abort break case clear catch continue do elseif else endfunction end for function global if pause return resume select try then while",
      literal: "%f %F %t %T %pi %eps %inf %nan %e %i %z %s",
      built_in: "abs and acos asin atan ceil cd chdir clearglobal cosh cos cumprod deff disp error exec execstr exists exp eye gettext floor fprintf fread fsolve imag isdef isempty isinfisnan isvector lasterror length load linspace list listfiles log10 log2 log max min msprintf mclose mopen ones or pathconvert poly printf prod pwd rand real round sinh sin size gsort sprintf sqrt strcat strcmps tring sum system tanh tan type typename warning zeros matrix"
    },
    illegal: '("|#|/\\*|\\s+/\\w+)',
    contains: [
      {
        className: "function",
        beginKeywords: "function",
        end: "$",
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          {
            className: "params",
            begin: "\\(",
            end: "\\)"
          }
        ]
      },
      {
        begin: "[a-zA-Z_][a-zA-Z_0-9]*[\\.']+",
        relevance: 0
      },
      {
        begin: "\\[",
        end: "\\][\\.']*",
        relevance: 0,
        contains: COMMON_CONTAINS
      },
      hljs.COMMENT("//", "$")
    ].concat(COMMON_CONTAINS)
  };
}
var scilab_1 = scilab;
var scilab$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": scilab_1
}, [scilab_1]));
export { scilab$1 as s };
//# sourceMappingURL=scilab.js.map
