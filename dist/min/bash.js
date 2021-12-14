function _mergeNamespaces(e,s){return s.forEach((function(s){s&&"string"!=typeof s&&!Array.isArray(s)&&Object.keys(s).forEach((function(t){if("default"!==t&&!(t in e)){var n=Object.getOwnPropertyDescriptor(s,t);Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:function(){return s[t]}})}}))})),Object.freeze(e)}function source(e){return e?"string"==typeof e?e:e.source:null}function concat(...e){return e.map((e=>source(e))).join("")}function bash(e){const s={},t={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[s]}]};Object.assign(s,{className:"variable",variants:[{begin:concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},t]});const n={className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},a={begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},i={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,s,n]};n.contains.push(i);const c={begin:/\$\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,s]},o=e.SHEBANG({binary:`(${["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"].join("|")})`,relevance:10}),r={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0};return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z._-]+\b/,keyword:"if then else elif fi for while in do done case esac function",literal:"true false",built_in:"break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp"},contains:[o,e.SHEBANG(),r,c,e.HASH_COMMENT_MODE,a,i,{className:"",begin:/\\"/},{className:"string",begin:/'/,end:/'/},s]}}var bash_1=bash,bash$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:bash_1},[bash_1]));export{bash$1 as b};