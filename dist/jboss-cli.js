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
function jbossCli(hljs) {
  const PARAM = {
    begin: /[\w-]+ *=/,
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: /[\w-]+/
      }
    ]
  };
  const PARAMSBLOCK = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    contains: [PARAM],
    relevance: 0
  };
  const OPERATION = {
    className: "function",
    begin: /:[\w\-.]+/,
    relevance: 0
  };
  const PATH = {
    className: "string",
    begin: /\B([\/.])[\w\-.\/=]+/
  };
  const COMMAND_PARAMS = {
    className: "params",
    begin: /--[\w\-=\/]+/
  };
  return {
    name: "JBoss CLI",
    aliases: ["wildfly-cli"],
    keywords: {
      $pattern: "[a-z-]+",
      keyword: "alias batch cd clear command connect connection-factory connection-info data-source deploy deployment-info deployment-overlay echo echo-dmr help history if jdbc-driver-info jms-queue|20 jms-topic|20 ls patch pwd quit read-attribute read-operation reload rollout-plan run-batch set shutdown try unalias undeploy unset version xa-data-source",
      literal: "true false"
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      COMMAND_PARAMS,
      OPERATION,
      PATH,
      PARAMSBLOCK
    ]
  };
}
var jbossCli_1 = jbossCli;
var jbossCli$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": jbossCli_1
}, [jbossCli_1]));
export { jbossCli$1 as j };
//# sourceMappingURL=jboss-cli.js.map
