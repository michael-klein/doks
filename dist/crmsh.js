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
function crmsh(hljs) {
  const RESOURCES = "primitive rsc_template";
  const COMMANDS = "group clone ms master location colocation order fencing_topology rsc_ticket acl_target acl_group user role tag xml";
  const PROPERTY_SETS = "property rsc_defaults op_defaults";
  const KEYWORDS = "params meta operations op rule attributes utilization";
  const OPERATORS = "read write deny defined not_defined in_range date spec in ref reference attribute type xpath version and or lt gt tag lte gte eq ne \\";
  const TYPES = "number string";
  const LITERALS = "Master Started Slave Stopped start promote demote stop monitor true false";
  return {
    name: "crmsh",
    aliases: [
      "crm",
      "pcmk"
    ],
    case_insensitive: true,
    keywords: {
      keyword: KEYWORDS + " " + OPERATORS + " " + TYPES,
      literal: LITERALS
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        beginKeywords: "node",
        starts: {
          end: "\\s*([\\w_-]+:)?",
          starts: {
            className: "title",
            end: "\\s*[\\$\\w_][\\w_-]*"
          }
        }
      },
      {
        beginKeywords: RESOURCES,
        starts: {
          className: "title",
          end: "\\s*[\\$\\w_][\\w_-]*",
          starts: {
            end: "\\s*@?[\\w_][\\w_\\.:-]*"
          }
        }
      },
      {
        begin: "\\b(" + COMMANDS.split(" ").join("|") + ")\\s+",
        keywords: COMMANDS,
        starts: {
          className: "title",
          end: "[\\$\\w_][\\w_-]*"
        }
      },
      {
        beginKeywords: PROPERTY_SETS,
        starts: {
          className: "title",
          end: "\\s*([\\w_-]+:)?"
        }
      },
      hljs.QUOTE_STRING_MODE,
      {
        className: "meta",
        begin: "(ocf|systemd|service|lsb):[\\w_:-]+",
        relevance: 0
      },
      {
        className: "number",
        begin: "\\b\\d+(\\.\\d+)?(ms|s|h|m)?",
        relevance: 0
      },
      {
        className: "literal",
        begin: "[-]?(infinity|inf)",
        relevance: 0
      },
      {
        className: "attr",
        begin: /([A-Za-z$_#][\w_-]+)=/,
        relevance: 0
      },
      {
        className: "tag",
        begin: "</?",
        end: "/?>",
        relevance: 0
      }
    ]
  };
}
var crmsh_1 = crmsh;
var crmsh$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": crmsh_1
}, [crmsh_1]));
export { crmsh$1 as c };
//# sourceMappingURL=crmsh.js.map
