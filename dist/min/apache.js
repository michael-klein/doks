function _mergeNamespaces(e,a){return a.forEach((function(a){a&&"string"!=typeof a&&!Array.isArray(a)&&Object.keys(a).forEach((function(n){if("default"!==n&&!(n in e)){var r=Object.getOwnPropertyDescriptor(a,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:function(){return a[n]}})}}))})),Object.freeze(e)}function apache(e){const a={className:"number",begin:/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?/};return{name:"Apache config",aliases:["apacheconf"],case_insensitive:!0,contains:[e.HASH_COMMENT_MODE,{className:"section",begin:/<\/?/,end:/>/,contains:[a,{className:"number",begin:/:\d{1,5}/},e.inherit(e.QUOTE_STRING_MODE,{relevance:0})]},{className:"attribute",begin:/\w+/,relevance:0,keywords:{nomarkup:"order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"},starts:{end:/$/,relevance:0,keywords:{literal:"on off all deny allow"},contains:[{className:"meta",begin:/\s\[/,end:/\]$/},{className:"variable",begin:/[\$%]\{/,end:/\}/,contains:["self",{className:"number",begin:/[$%]\d+/}]},a,{className:"number",begin:/\d+/},e.QUOTE_STRING_MODE]}}],illegal:/\S/}}var apache_1=apache,apache$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:apache_1},[apache_1]));export{apache$1 as a};