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
function pf(hljs) {
  const MACRO = {
    className: "variable",
    begin: /\$[\w\d#@][\w\d_]*/
  };
  const TABLE = {
    className: "variable",
    begin: /<(?!\/)/,
    end: />/
  };
  return {
    name: "Packet Filter config",
    aliases: ["pf.conf"],
    keywords: {
      $pattern: /[a-z0-9_<>-]+/,
      built_in: "block match pass load anchor|5 antispoof|10 set table",
      keyword: "in out log quick on rdomain inet inet6 proto from port os to route allow-opts divert-packet divert-reply divert-to flags group icmp-type icmp6-type label once probability recieved-on rtable prio queue tos tag tagged user keep fragment for os drop af-to|10 binat-to|10 nat-to|10 rdr-to|10 bitmask least-stats random round-robin source-hash static-port dup-to reply-to route-to parent bandwidth default min max qlimit block-policy debug fingerprints hostid limit loginterface optimization reassemble ruleset-optimization basic none profile skip state-defaults state-policy timeout const counters persist no modulate synproxy state|5 floating if-bound no-sync pflow|10 sloppy source-track global rule max-src-nodes max-src-states max-src-conn max-src-conn-rate overload flush scrub|5 max-mss min-ttl no-df|10 random-id",
      literal: "all any no-route self urpf-failed egress|5 unknown"
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      MACRO,
      TABLE
    ]
  };
}
var pf_1 = pf;
var pf$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": pf_1
}, [pf_1]));
export { pf$1 as p };
//# sourceMappingURL=pf.js.map
