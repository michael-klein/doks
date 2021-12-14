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
function basic(hljs) {
  return {
    name: "BASIC",
    case_insensitive: true,
    illegal: "^.",
    keywords: {
      $pattern: "[a-zA-Z][a-zA-Z0-9_$%!#]*",
      keyword: "ABS ASC AND ATN AUTO|0 BEEP BLOAD|10 BSAVE|10 CALL CALLS CDBL CHAIN CHDIR CHR$|10 CINT CIRCLE CLEAR CLOSE CLS COLOR COM COMMON CONT COS CSNG CSRLIN CVD CVI CVS DATA DATE$ DEFDBL DEFINT DEFSNG DEFSTR DEF|0 SEG USR DELETE DIM DRAW EDIT END ENVIRON ENVIRON$ EOF EQV ERASE ERDEV ERDEV$ ERL ERR ERROR EXP FIELD FILES FIX FOR|0 FRE GET GOSUB|10 GOTO HEX$ IF THEN ELSE|0 INKEY$ INP INPUT INPUT# INPUT$ INSTR IMP INT IOCTL IOCTL$ KEY ON OFF LIST KILL LEFT$ LEN LET LINE LLIST LOAD LOC LOCATE LOF LOG LPRINT USING LSET MERGE MID$ MKDIR MKD$ MKI$ MKS$ MOD NAME NEW NEXT NOISE NOT OCT$ ON OR PEN PLAY STRIG OPEN OPTION BASE OUT PAINT PALETTE PCOPY PEEK PMAP POINT POKE POS PRINT PRINT] PSET PRESET PUT RANDOMIZE READ REM RENUM RESET|0 RESTORE RESUME RETURN|0 RIGHT$ RMDIR RND RSET RUN SAVE SCREEN SGN SHELL SIN SOUND SPACE$ SPC SQR STEP STICK STOP STR$ STRING$ SWAP SYSTEM TAB TAN TIME$ TIMER TROFF TRON TO USR VAL VARPTR VARPTR$ VIEW WAIT WHILE WEND WIDTH WINDOW WRITE XOR"
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.COMMENT("REM", "$", {
        relevance: 10
      }),
      hljs.COMMENT("'", "$", {
        relevance: 0
      }),
      {
        className: "symbol",
        begin: "^[0-9]+ ",
        relevance: 10
      },
      {
        className: "number",
        begin: "\\b\\d+(\\.\\d+)?([edED]\\d+)?[#!]?",
        relevance: 0
      },
      {
        className: "number",
        begin: "(&[hH][0-9a-fA-F]{1,4})"
      },
      {
        className: "number",
        begin: "(&[oO][0-7]{1,6})"
      }
    ]
  };
}
var basic_1 = basic;
var basic$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": basic_1
}, [basic_1]));
export { basic$1 as b };
//# sourceMappingURL=basic.js.map
