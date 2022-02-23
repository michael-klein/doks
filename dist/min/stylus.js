function _mergeNamespaces(e,t){return t.forEach((function(t){t&&"string"!=typeof t&&!Array.isArray(t)&&Object.keys(t).forEach((function(o){if("default"!==o&&!(o in e)){var i=Object.getOwnPropertyDescriptor(t,o);Object.defineProperty(e,o,i.get?i:{enumerable:!0,get:function(){return t[o]}})}}))})),Object.freeze(e)}const MODES=e=>({IMPORTANT:{className:"meta",begin:"!important"},HEXCOLOR:{className:"number",begin:"#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})"},ATTRIBUTE_SELECTOR_MODE:{className:"selector-attr",begin:/\[/,end:/\]/,illegal:"$",contains:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]}}),TAGS=["a","abbr","address","article","aside","audio","b","blockquote","body","button","canvas","caption","cite","code","dd","del","details","dfn","div","dl","dt","em","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","html","i","iframe","img","input","ins","kbd","label","legend","li","main","mark","menu","nav","object","ol","p","q","quote","samp","section","span","strong","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","ul","var","video"],MEDIA_FEATURES=["any-hover","any-pointer","aspect-ratio","color","color-gamut","color-index","device-aspect-ratio","device-height","device-width","display-mode","forced-colors","grid","height","hover","inverted-colors","monochrome","orientation","overflow-block","overflow-inline","pointer","prefers-color-scheme","prefers-contrast","prefers-reduced-motion","prefers-reduced-transparency","resolution","scan","scripting","update","width","min-width","max-width","min-height","max-height"],PSEUDO_CLASSES=["active","any-link","blank","checked","current","default","defined","dir","disabled","drop","empty","enabled","first","first-child","first-of-type","fullscreen","future","focus","focus-visible","focus-within","has","host","host-context","hover","indeterminate","in-range","invalid","is","lang","last-child","last-of-type","left","link","local-link","not","nth-child","nth-col","nth-last-child","nth-last-col","nth-last-of-type","nth-of-type","only-child","only-of-type","optional","out-of-range","past","placeholder-shown","read-only","read-write","required","right","root","scope","target","target-within","user-invalid","valid","visited","where"],PSEUDO_ELEMENTS=["after","backdrop","before","cue","cue-region","first-letter","first-line","grammar-error","marker","part","placeholder","selection","slotted","spelling-error"],ATTRIBUTES=["align-content","align-items","align-self","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","auto","backface-visibility","background","background-attachment","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","clear","clip","clip-path","color","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","content","counter-increment","counter-reset","cursor","direction","display","empty-cells","filter","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","font","font-display","font-family","font-feature-settings","font-kerning","font-language-override","font-size","font-size-adjust","font-smoothing","font-stretch","font-style","font-variant","font-variant-ligatures","font-variation-settings","font-weight","height","hyphens","icon","image-orientation","image-rendering","image-resolution","ime-mode","inherit","initial","justify-content","left","letter-spacing","line-height","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","marks","mask","max-height","max-width","min-height","min-width","nav-down","nav-index","nav-left","nav-right","nav-up","none","normal","object-fit","object-position","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page-break-after","page-break-before","page-break-inside","perspective","perspective-origin","pointer-events","position","quotes","resize","right","src","tab-size","table-layout","text-align","text-align-last","text-decoration","text-decoration-color","text-decoration-line","text-decoration-style","text-indent","text-overflow","text-rendering","text-shadow","text-transform","text-underline-position","top","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","vertical-align","visibility","white-space","widows","width","word-break","word-spacing","word-wrap","z-index"].reverse();function stylus(e){const t=MODES(e),o={className:"variable",begin:"\\$"+e.IDENT_RE},i="(?=[.\\s\\n[:,(])";return{name:"Stylus",aliases:["styl"],case_insensitive:!1,keywords:"if else for in",illegal:"("+["\\?","(\\bReturn\\b)","(\\bEnd\\b)","(\\bend\\b)","(\\bdef\\b)",";","#\\s","\\*\\s","===\\s","\\|","%"].join("|")+")",contains:[e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,t.HEXCOLOR,{begin:"\\.[a-zA-Z][a-zA-Z0-9_-]*(?=[.\\s\\n[:,(])",className:"selector-class"},{begin:"#[a-zA-Z][a-zA-Z0-9_-]*(?=[.\\s\\n[:,(])",className:"selector-id"},{begin:"\\b("+TAGS.join("|")+")"+i,className:"selector-tag"},{className:"selector-pseudo",begin:"&?:("+PSEUDO_CLASSES.join("|")+")"+i},{className:"selector-pseudo",begin:"&?::("+PSEUDO_ELEMENTS.join("|")+")"+i},t.ATTRIBUTE_SELECTOR_MODE,{className:"keyword",begin:/@media/,starts:{end:/[{;}]/,keywords:{$pattern:/[a-z-]+/,keyword:"and or not only",attribute:MEDIA_FEATURES.join(" ")},contains:[e.CSS_NUMBER_MODE]}},{className:"keyword",begin:"@((-(o|moz|ms|webkit)-)?("+["charset","css","debug","extend","font-face","for","import","include","keyframes","media","mixin","page","warn","while"].join("|")+"))\\b"},o,e.CSS_NUMBER_MODE,{className:"function",begin:"^[a-zA-Z][a-zA-Z0-9_-]*\\(.*\\)",illegal:"[\\n]",returnBegin:!0,contains:[{className:"title",begin:"\\b[a-zA-Z][a-zA-Z0-9_-]*"},{className:"params",begin:/\(/,end:/\)/,contains:[t.HEXCOLOR,o,e.APOS_STRING_MODE,e.CSS_NUMBER_MODE,e.QUOTE_STRING_MODE]}]},{className:"attribute",begin:"\\b("+ATTRIBUTES.join("|")+")\\b",starts:{end:/;|$/,contains:[t.HEXCOLOR,o,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,e.CSS_NUMBER_MODE,e.C_BLOCK_COMMENT_MODE,t.IMPORTANT],illegal:/\./,relevance:0}}]}}var stylus_1=stylus,stylus$1=Object.freeze(_mergeNamespaces({__proto__:null,[Symbol.toStringTag]:"Module",default:stylus_1},[stylus_1]));export{stylus$1 as s};