function _mergeNamespaces(e,n){return n.forEach((function(n){n&&"string"!=typeof n&&!Array.isArray(n)&&Object.keys(n).forEach((function(a){if("default"!==a&&!(a in e)){var t=Object.getOwnPropertyDescriptor(n,a);Object.defineProperty(e,a,t.get?t:{enumerable:!0,get:function(){return n[a]}})}}))})),Object.freeze(e)}function jbossCli(e){const n={className:"params",begin:/\(/,end:/\)/,contains:[{begin:/[\w-]+ *=/,returnBegin:!0,relevance:0,contains:[{className:"attr",begin:/[\w-]+/}]}],relevance:0};return{name:"JBoss CLI",aliases:["wildfly-cli"],keywords:{$pattern:"[a-z-]+",keyword:"alias batch cd clear command connect connection-factory connection-info data-source deploy deployment-info deployment-overlay echo echo-dmr help history if jdbc-driver-info jms-queue|20 jms-topic|20 ls patch pwd quit read-attribute read-operation reload rollout-plan run-batch set shutdown try unalias undeploy unset version xa-data-source",literal:"true false"},contains:[e.HASH_COMMENT_MODE,e.QUOTE_STRING_MODE,{className:"params",begin:/--[\w\-=\/]+/},{className:"function",begin:/:[\w\-.]+/,relevance:0},{className:"string",begin:/\B([\/.])[\w\-.\/=]+/},n]}}var jbossCli_1=jbossCli,jbossCli$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:jbossCli_1},[jbossCli_1]));export{jbossCli$1 as j};