function _mergeNamespaces(e,n){return n.forEach((function(n){n&&"string"!=typeof n&&!Array.isArray(n)&&Object.keys(n).forEach((function(t){if("default"!==t&&!(t in e)){var r=Object.getOwnPropertyDescriptor(n,t);Object.defineProperty(e,t,r.get?r:{enumerable:!0,get:function(){return n[t]}})}}))})),Object.freeze(e)}function nix(e){const n={keyword:"rec with let in inherit assert if else then",literal:"true false or and null",built_in:"import abort baseNameOf dirOf isNull builtins map removeAttrs throw toString derivation"},t={className:"subst",begin:/\$\{/,end:/\}/,keywords:n},r={className:"string",contains:[t],variants:[{begin:"''",end:"''"},{begin:'"',end:'"'}]},i=[e.NUMBER_MODE,e.HASH_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,r,{begin:/[a-zA-Z0-9-_]+(\s*=)/,returnBegin:!0,relevance:0,contains:[{className:"attr",begin:/\S+/}]}];return t.contains=i,{name:"Nix",aliases:["nixos"],keywords:n,contains:i}}var nix_1=nix,nix$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:nix_1},[nix_1]));export{nix$1 as n};