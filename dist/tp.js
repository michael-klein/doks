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
function tp(hljs) {
  const TPID = {
    className: "number",
    begin: "[1-9][0-9]*",
    relevance: 0
  };
  const TPLABEL = {
    className: "symbol",
    begin: ":[^\\]]+"
  };
  const TPDATA = {
    className: "built_in",
    begin: "(AR|P|PAYLOAD|PR|R|SR|RSR|LBL|VR|UALM|MESSAGE|UTOOL|UFRAME|TIMER|TIMER_OVERFLOW|JOINT_MAX_SPEED|RESUME_PROG|DIAG_REC)\\[",
    end: "\\]",
    contains: [
      "self",
      TPID,
      TPLABEL
    ]
  };
  const TPIO = {
    className: "built_in",
    begin: "(AI|AO|DI|DO|F|RI|RO|UI|UO|GI|GO|SI|SO)\\[",
    end: "\\]",
    contains: [
      "self",
      TPID,
      hljs.QUOTE_STRING_MODE,
      TPLABEL
    ]
  };
  return {
    name: "TP",
    keywords: {
      keyword: "ABORT ACC ADJUST AND AP_LD BREAK CALL CNT COL CONDITION CONFIG DA DB DIV DETECT ELSE END ENDFOR ERR_NUM ERROR_PROG FINE FOR GP GUARD INC IF JMP LINEAR_MAX_SPEED LOCK MOD MONITOR OFFSET Offset OR OVERRIDE PAUSE PREG PTH RT_LD RUN SELECT SKIP Skip TA TB TO TOOL_OFFSET Tool_Offset UF UT UFRAME_NUM UTOOL_NUM UNLOCK WAIT X Y Z W P R STRLEN SUBSTR FINDSTR VOFFSET PROG ATTR MN POS",
      literal: "ON OFF max_speed LPOS JPOS ENABLE DISABLE START STOP RESET"
    },
    contains: [
      TPDATA,
      TPIO,
      {
        className: "keyword",
        begin: "/(PROG|ATTR|MN|POS|END)\\b"
      },
      {
        className: "keyword",
        begin: "(CALL|RUN|POINT_LOGIC|LBL)\\b"
      },
      {
        className: "keyword",
        begin: "\\b(ACC|CNT|Skip|Offset|PSPD|RT_LD|AP_LD|Tool_Offset)"
      },
      {
        className: "number",
        begin: "\\d+(sec|msec|mm/sec|cm/min|inch/min|deg/sec|mm|in|cm)?\\b",
        relevance: 0
      },
      hljs.COMMENT("//", "[;$]"),
      hljs.COMMENT("!", "[;$]"),
      hljs.COMMENT("--eg:", "$"),
      hljs.QUOTE_STRING_MODE,
      {
        className: "string",
        begin: "'",
        end: "'"
      },
      hljs.C_NUMBER_MODE,
      {
        className: "variable",
        begin: "\\$[A-Za-z0-9_]+"
      }
    ]
  };
}
var tp_1 = tp;
var tp$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": tp_1
}, [tp_1]));
export { tp$1 as t };
//# sourceMappingURL=tp.js.map
