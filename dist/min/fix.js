function _mergeNamespaces(e,n){return n.forEach((function(n){n&&"string"!=typeof n&&!Array.isArray(n)&&Object.keys(n).forEach((function(r){if("default"!==r&&!(r in e)){var t=Object.getOwnPropertyDescriptor(n,r);Object.defineProperty(e,r,t.get?t:{enumerable:!0,get:function(){return n[r]}})}}))})),Object.freeze(e)}function fix(e){return{name:"FIX",contains:[{begin:/[^\u2401\u0001]+/,end:/[\u2401\u0001]/,excludeEnd:!0,returnBegin:!0,returnEnd:!1,contains:[{begin:/([^\u2401\u0001=]+)/,end:/=([^\u2401\u0001=]+)/,returnEnd:!0,returnBegin:!1,className:"attr"},{begin:/=/,end:/([\u2401\u0001])/,excludeEnd:!0,excludeBegin:!0,className:"string"}]}],case_insensitive:!0}}var fix_1=fix,fix$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:fix_1},[fix_1]));export{fix$1 as f};