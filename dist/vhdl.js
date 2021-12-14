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
function vhdl(hljs) {
  const INTEGER_RE = "\\d(_|\\d)*";
  const EXPONENT_RE = "[eE][-+]?" + INTEGER_RE;
  const DECIMAL_LITERAL_RE = INTEGER_RE + "(\\." + INTEGER_RE + ")?(" + EXPONENT_RE + ")?";
  const BASED_INTEGER_RE = "\\w+";
  const BASED_LITERAL_RE = INTEGER_RE + "#" + BASED_INTEGER_RE + "(\\." + BASED_INTEGER_RE + ")?#(" + EXPONENT_RE + ")?";
  const NUMBER_RE = "\\b(" + BASED_LITERAL_RE + "|" + DECIMAL_LITERAL_RE + ")";
  return {
    name: "VHDL",
    case_insensitive: true,
    keywords: {
      keyword: "abs access after alias all and architecture array assert assume assume_guarantee attribute begin block body buffer bus case component configuration constant context cover disconnect downto default else elsif end entity exit fairness file for force function generate generic group guarded if impure in inertial inout is label library linkage literal loop map mod nand new next nor not null of on open or others out package parameter port postponed procedure process property protected pure range record register reject release rem report restrict restrict_guarantee return rol ror select sequence severity shared signal sla sll sra srl strong subtype then to transport type unaffected units until use variable view vmode vprop vunit wait when while with xnor xor",
      built_in: "boolean bit character integer time delay_length natural positive string bit_vector file_open_kind file_open_status std_logic std_logic_vector unsigned signed boolean_vector integer_vector std_ulogic std_ulogic_vector unresolved_unsigned u_unsigned unresolved_signed u_signed real_vector time_vector",
      literal: "false true note warning error failure line text side width"
    },
    illegal: /\{/,
    contains: [
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.COMMENT("--", "$"),
      hljs.QUOTE_STRING_MODE,
      {
        className: "number",
        begin: NUMBER_RE,
        relevance: 0
      },
      {
        className: "string",
        begin: "'(U|X|0|1|Z|W|L|H|-)'",
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        className: "symbol",
        begin: "'[A-Za-z](_?[A-Za-z0-9])*",
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };
}
var vhdl_1 = vhdl;
var vhdl$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": vhdl_1
}, [vhdl_1]));
export { vhdl$1 as v };
//# sourceMappingURL=vhdl.js.map
