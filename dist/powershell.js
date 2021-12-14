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
function powershell(hljs) {
  const TYPES = [
    "string",
    "char",
    "byte",
    "int",
    "long",
    "bool",
    "decimal",
    "single",
    "double",
    "DateTime",
    "xml",
    "array",
    "hashtable",
    "void"
  ];
  const VALID_VERBS = "Add|Clear|Close|Copy|Enter|Exit|Find|Format|Get|Hide|Join|Lock|Move|New|Open|Optimize|Pop|Push|Redo|Remove|Rename|Reset|Resize|Search|Select|Set|Show|Skip|Split|Step|Switch|Undo|Unlock|Watch|Backup|Checkpoint|Compare|Compress|Convert|ConvertFrom|ConvertTo|Dismount|Edit|Expand|Export|Group|Import|Initialize|Limit|Merge|Mount|Out|Publish|Restore|Save|Sync|Unpublish|Update|Approve|Assert|Build|Complete|Confirm|Deny|Deploy|Disable|Enable|Install|Invoke|Register|Request|Restart|Resume|Start|Stop|Submit|Suspend|Uninstall|Unregister|Wait|Debug|Measure|Ping|Repair|Resolve|Test|Trace|Connect|Disconnect|Read|Receive|Send|Write|Block|Grant|Protect|Revoke|Unblock|Unprotect|Use|ForEach|Sort|Tee|Where";
  const COMPARISON_OPERATORS = "-and|-as|-band|-bnot|-bor|-bxor|-casesensitive|-ccontains|-ceq|-cge|-cgt|-cle|-clike|-clt|-cmatch|-cne|-cnotcontains|-cnotlike|-cnotmatch|-contains|-creplace|-csplit|-eq|-exact|-f|-file|-ge|-gt|-icontains|-ieq|-ige|-igt|-ile|-ilike|-ilt|-imatch|-in|-ine|-inotcontains|-inotlike|-inotmatch|-ireplace|-is|-isnot|-isplit|-join|-le|-like|-lt|-match|-ne|-not|-notcontains|-notin|-notlike|-notmatch|-or|-regex|-replace|-shl|-shr|-split|-wildcard|-xor";
  const KEYWORDS = {
    $pattern: /-?[A-z\.\-]+\b/,
    keyword: "if else foreach return do while until elseif begin for trap data dynamicparam end break throw param continue finally in switch exit filter try process catch hidden static parameter",
    built_in: "ac asnp cat cd CFS chdir clc clear clhy cli clp cls clv cnsn compare copy cp cpi cpp curl cvpa dbp del diff dir dnsn ebp echo|0 epal epcsv epsn erase etsn exsn fc fhx fl ft fw gal gbp gc gcb gci gcm gcs gdr gerr ghy gi gin gjb gl gm gmo gp gps gpv group gsn gsnp gsv gtz gu gv gwmi h history icm iex ihy ii ipal ipcsv ipmo ipsn irm ise iwmi iwr kill lp ls man md measure mi mount move mp mv nal ndr ni nmo npssc nsn nv ogv oh popd ps pushd pwd r rbp rcjb rcsn rd rdr ren ri rjb rm rmdir rmo rni rnp rp rsn rsnp rujb rv rvpa rwmi sajb sal saps sasv sbp sc scb select set shcm si sl sleep sls sort sp spjb spps spsv start stz sujb sv swmi tee trcm type wget where wjb write"
  };
  const TITLE_NAME_RE = /\w[\w\d]*((-)[\w\d]+)*/;
  const BACKTICK_ESCAPE = {
    begin: "`[\\s\\S]",
    relevance: 0
  };
  const VAR = {
    className: "variable",
    variants: [
      {
        begin: /\$\B/
      },
      {
        className: "keyword",
        begin: /\$this/
      },
      {
        begin: /\$[\w\d][\w\d_:]*/
      }
    ]
  };
  const LITERAL = {
    className: "literal",
    begin: /\$(null|true|false)\b/
  };
  const QUOTE_STRING = {
    className: "string",
    variants: [
      {
        begin: /"/,
        end: /"/
      },
      {
        begin: /@"/,
        end: /^"@/
      }
    ],
    contains: [
      BACKTICK_ESCAPE,
      VAR,
      {
        className: "variable",
        begin: /\$[A-z]/,
        end: /[^A-z]/
      }
    ]
  };
  const APOS_STRING = {
    className: "string",
    variants: [
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /@'/,
        end: /^'@/
      }
    ]
  };
  const PS_HELPTAGS = {
    className: "doctag",
    variants: [
      {
        begin: /\.(synopsis|description|example|inputs|outputs|notes|link|component|role|functionality)/
      },
      {
        begin: /\.(parameter|forwardhelptargetname|forwardhelpcategory|remotehelprunspace|externalhelp)\s+\S+/
      }
    ]
  };
  const PS_COMMENT = hljs.inherit(hljs.COMMENT(null, null), {
    variants: [
      {
        begin: /#/,
        end: /$/
      },
      {
        begin: /<#/,
        end: /#>/
      }
    ],
    contains: [PS_HELPTAGS]
  });
  const CMDLETS = {
    className: "built_in",
    variants: [
      {
        begin: "(".concat(VALID_VERBS, ")+(-)[\\w\\d]+")
      }
    ]
  };
  const PS_CLASS = {
    className: "class",
    beginKeywords: "class enum",
    end: /\s*[{]/,
    excludeEnd: true,
    relevance: 0,
    contains: [hljs.TITLE_MODE]
  };
  const PS_FUNCTION = {
    className: "function",
    begin: /function\s+/,
    end: /\s*\{|$/,
    excludeEnd: true,
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        begin: "function",
        relevance: 0,
        className: "keyword"
      },
      {
        className: "title",
        begin: TITLE_NAME_RE,
        relevance: 0
      },
      {
        begin: /\(/,
        end: /\)/,
        className: "params",
        relevance: 0,
        contains: [VAR]
      }
    ]
  };
  const PS_USING = {
    begin: /using\s/,
    end: /$/,
    returnBegin: true,
    contains: [
      QUOTE_STRING,
      APOS_STRING,
      {
        className: "keyword",
        begin: /(using|assembly|command|module|namespace|type)/
      }
    ]
  };
  const PS_ARGUMENTS = {
    variants: [
      {
        className: "operator",
        begin: "(".concat(COMPARISON_OPERATORS, ")\\b")
      },
      {
        className: "literal",
        begin: /(-)[\w\d]+/,
        relevance: 0
      }
    ]
  };
  const HASH_SIGNS = {
    className: "selector-tag",
    begin: /@\B/,
    relevance: 0
  };
  const PS_METHODS = {
    className: "function",
    begin: /\[.*\]\s*[\w]+[ ]??\(/,
    end: /$/,
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        className: "keyword",
        begin: "(".concat(KEYWORDS.keyword.toString().replace(/\s/g, "|"), ")\\b"),
        endsParent: true,
        relevance: 0
      },
      hljs.inherit(hljs.TITLE_MODE, {
        endsParent: true
      })
    ]
  };
  const GENTLEMANS_SET = [
    PS_METHODS,
    PS_COMMENT,
    BACKTICK_ESCAPE,
    hljs.NUMBER_MODE,
    QUOTE_STRING,
    APOS_STRING,
    CMDLETS,
    VAR,
    LITERAL,
    HASH_SIGNS
  ];
  const PS_TYPE = {
    begin: /\[/,
    end: /\]/,
    excludeBegin: true,
    excludeEnd: true,
    relevance: 0,
    contains: [].concat("self", GENTLEMANS_SET, {
      begin: "(" + TYPES.join("|") + ")",
      className: "built_in",
      relevance: 0
    }, {
      className: "type",
      begin: /[\.\w\d]+/,
      relevance: 0
    })
  };
  PS_METHODS.contains.unshift(PS_TYPE);
  return {
    name: "PowerShell",
    aliases: [
      "ps",
      "ps1"
    ],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: GENTLEMANS_SET.concat(PS_CLASS, PS_FUNCTION, PS_USING, PS_ARGUMENTS, PS_TYPE)
  };
}
var powershell_1 = powershell;
var powershell$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": powershell_1
}, [powershell_1]));
export { powershell$1 as p };
//# sourceMappingURL=powershell.js.map
