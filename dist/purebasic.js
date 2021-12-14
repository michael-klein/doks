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
function purebasic(hljs) {
  const STRINGS = {
    className: "string",
    begin: '(~)?"',
    end: '"',
    illegal: "\\n"
  };
  const CONSTANTS = {
    className: "symbol",
    begin: "#[a-zA-Z_]\\w*\\$?"
  };
  return {
    name: "PureBASIC",
    aliases: [
      "pb",
      "pbi"
    ],
    keywords: "Align And Array As Break CallDebugger Case CompilerCase CompilerDefault CompilerElse CompilerElseIf CompilerEndIf CompilerEndSelect CompilerError CompilerIf CompilerSelect CompilerWarning Continue Data DataSection Debug DebugLevel Declare DeclareC DeclareCDLL DeclareDLL DeclareModule Default Define Dim DisableASM DisableDebugger DisableExplicit Else ElseIf EnableASM EnableDebugger EnableExplicit End EndDataSection EndDeclareModule EndEnumeration EndIf EndImport EndInterface EndMacro EndModule EndProcedure EndSelect EndStructure EndStructureUnion EndWith Enumeration EnumerationBinary Extends FakeReturn For ForEach ForEver Global Gosub Goto If Import ImportC IncludeBinary IncludeFile IncludePath Interface List Macro MacroExpandedCount Map Module NewList NewMap Next Not Or Procedure ProcedureC ProcedureCDLL ProcedureDLL ProcedureReturn Protected Prototype PrototypeC ReDim Read Repeat Restore Return Runtime Select Shared Static Step Structure StructureUnion Swap Threaded To UndefineMacro Until Until  UnuseModule UseModule Wend While With XIncludeFile XOr",
    contains: [
      hljs.COMMENT(";", "$", {
        relevance: 0
      }),
      {
        className: "function",
        begin: "\\b(Procedure|Declare)(C|CDLL|DLL)?\\b",
        end: "\\(",
        excludeEnd: true,
        returnBegin: true,
        contains: [
          {
            className: "keyword",
            begin: "(Procedure|Declare)(C|CDLL|DLL)?",
            excludeEnd: true
          },
          {
            className: "type",
            begin: "\\.\\w*"
          },
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      STRINGS,
      CONSTANTS
    ]
  };
}
var purebasic_1 = purebasic;
var purebasic$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": purebasic_1
}, [purebasic_1]));
export { purebasic$1 as p };
//# sourceMappingURL=purebasic.js.map
