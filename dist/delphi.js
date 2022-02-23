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
function delphi(hljs) {
  const KEYWORDS = "exports register file shl array record property for mod while set ally label uses raise not stored class safecall var interface or private static exit index inherited to else stdcall override shr asm far resourcestring finalization packed virtual out and protected library do xorwrite goto near function end div overload object unit begin string on inline repeat until destructor write message program with read initialization except default nil if case cdecl in downto threadvar of try pascal const external constructor type public then implementation finally published procedure absolute reintroduce operator as is abstract alias assembler bitpacked break continue cppdecl cvar enumerator experimental platform deprecated unimplemented dynamic export far16 forward generic helper implements interrupt iochecks local name nodefault noreturn nostackframe oldfpccall otherwise saveregisters softfloat specialize strict unaligned varargs ";
  const COMMENT_MODES = [
    hljs.C_LINE_COMMENT_MODE,
    hljs.COMMENT(/\{/, /\}/, {
      relevance: 0
    }),
    hljs.COMMENT(/\(\*/, /\*\)/, {
      relevance: 10
    })
  ];
  const DIRECTIVE = {
    className: "meta",
    variants: [
      {
        begin: /\{\$/,
        end: /\}/
      },
      {
        begin: /\(\*\$/,
        end: /\*\)/
      }
    ]
  };
  const STRING = {
    className: "string",
    begin: /'/,
    end: /'/,
    contains: [{
      begin: /''/
    }]
  };
  const NUMBER = {
    className: "number",
    relevance: 0,
    variants: [
      {
        begin: "\\$[0-9A-Fa-f]+"
      },
      {
        begin: "&[0-7]+"
      },
      {
        begin: "%[01]+"
      }
    ]
  };
  const CHAR_STRING = {
    className: "string",
    begin: /(#\d+)+/
  };
  const CLASS = {
    begin: hljs.IDENT_RE + "\\s*=\\s*class\\s*\\(",
    returnBegin: true,
    contains: [hljs.TITLE_MODE]
  };
  const FUNCTION = {
    className: "function",
    beginKeywords: "function constructor destructor procedure",
    end: /[:;]/,
    keywords: "function constructor|10 destructor|10 procedure|10",
    contains: [
      hljs.TITLE_MODE,
      {
        className: "params",
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        contains: [
          STRING,
          CHAR_STRING,
          DIRECTIVE
        ].concat(COMMENT_MODES)
      },
      DIRECTIVE
    ].concat(COMMENT_MODES)
  };
  return {
    name: "Delphi",
    aliases: [
      "dpr",
      "dfm",
      "pas",
      "pascal",
      "freepascal",
      "lazarus",
      "lpr",
      "lfm"
    ],
    case_insensitive: true,
    keywords: KEYWORDS,
    illegal: /"|\$[G-Zg-z]|\/\*|<\/|\|/,
    contains: [
      STRING,
      CHAR_STRING,
      hljs.NUMBER_MODE,
      NUMBER,
      CLASS,
      FUNCTION,
      DIRECTIVE
    ].concat(COMMENT_MODES)
  };
}
var delphi_1 = delphi;
var delphi$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": delphi_1
}, [delphi_1]));
export { delphi$1 as d };
//# sourceMappingURL=delphi.js.map
