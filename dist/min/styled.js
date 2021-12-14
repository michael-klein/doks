import{P as PropTypes,e as deepmerge,f as formatMuiErrorMessage,g as capitalize,h as _objectWithoutPropertiesLoose,_ as _extends$1,p as propToStyleFunction,s as styleFunctionSx$1,i as createTheme$1,k as styled$2,a as useTheme,j as jsx,l as clsx,m as generateUtilityClass,n as generateUtilityClasses,o as styled$3,q as useThemeProps,r as composeClasses,t as styledEngine}from"./main.js";import*as React from"react";var commonjsGlobal="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function getDefaultExportFromCjs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function getAugmentedNamespace(e){if(e.__esModule)return e;var t=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(e).forEach((function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})})),t}function chainPropTypes(e,t){return()=>null}const elementAcceptingRef=chainPropTypes(PropTypes.element);elementAcceptingRef.isRequired=chainPropTypes(PropTypes.element.isRequired);var elementAcceptingRef$1=elementAcceptingRef,elementTypeAcceptingRef=chainPropTypes(PropTypes.elementType);function exactProp(e){return e}var reactIs={exports:{}},reactIs_production_min={},b=60103,c=60106,d=60107,e=60108,f=60114,g=60109,h=60110,k=60112,l=60113,m=60120,n=60115,p=60116,q=60121,r=60122,u=60117,v=60129,w=60131;if("function"==typeof Symbol&&Symbol.for){var x=Symbol.for;b=x("react.element"),c=x("react.portal"),d=x("react.fragment"),e=x("react.strict_mode"),f=x("react.profiler"),g=x("react.provider"),h=x("react.context"),k=x("react.forward_ref"),l=x("react.suspense"),m=x("react.suspense_list"),n=x("react.memo"),p=x("react.lazy"),q=x("react.block"),r=x("react.server.block"),u=x("react.fundamental"),v=x("react.debug_trace_mode"),w=x("react.legacy_hidden")}function y(t){if("object"==typeof t&&null!==t){var r=t.$$typeof;switch(r){case b:switch(t=t.type){case d:case f:case e:case l:case m:return t;default:switch(t=t&&t.$$typeof){case h:case k:case p:case n:case g:return t;default:return r}}case c:return r}}}var z=g,A=b,B=k,C=d,D=p,E=n,F=c,G=f,H=e,I=l;reactIs_production_min.ContextConsumer=h,reactIs_production_min.ContextProvider=z,reactIs_production_min.Element=A,reactIs_production_min.ForwardRef=B,reactIs_production_min.Fragment=C,reactIs_production_min.Lazy=D,reactIs_production_min.Memo=E,reactIs_production_min.Portal=F,reactIs_production_min.Profiler=G,reactIs_production_min.StrictMode=H,reactIs_production_min.Suspense=I,reactIs_production_min.isAsyncMode=function(){return!1},reactIs_production_min.isConcurrentMode=function(){return!1},reactIs_production_min.isContextConsumer=function(e){return y(e)===h},reactIs_production_min.isContextProvider=function(e){return y(e)===g},reactIs_production_min.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===b},reactIs_production_min.isForwardRef=function(e){return y(e)===k},reactIs_production_min.isFragment=function(e){return y(e)===d},reactIs_production_min.isLazy=function(e){return y(e)===p},reactIs_production_min.isMemo=function(e){return y(e)===n},reactIs_production_min.isPortal=function(e){return y(e)===c},reactIs_production_min.isProfiler=function(e){return y(e)===f},reactIs_production_min.isStrictMode=function(t){return y(t)===e},reactIs_production_min.isSuspense=function(e){return y(e)===l},reactIs_production_min.isValidElementType=function(t){return"string"==typeof t||"function"==typeof t||t===d||t===f||t===v||t===e||t===l||t===m||t===w||"object"==typeof t&&null!==t&&(t.$$typeof===p||t.$$typeof===n||t.$$typeof===g||t.$$typeof===h||t.$$typeof===k||t.$$typeof===u||t.$$typeof===q||t[0]===r)},reactIs_production_min.typeOf=y,reactIs.exports=reactIs_production_min;const fnNameMatchRegex=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function getFunctionName(e){const t=`${e}`.match(fnNameMatchRegex);return t&&t[1]||""}function getFunctionComponentName(e,t=""){return e.displayName||e.name||getFunctionName(e)||t}function getWrappedName(e,t,r){const o=getFunctionComponentName(t);return e.displayName||(""!==o?`${r}(${o})`:r)}function getDisplayName(e){if(null!=e){if("string"==typeof e)return e;if("function"==typeof e)return getFunctionComponentName(e,"Component");if("object"==typeof e)switch(e.$$typeof){case reactIs.exports.ForwardRef:return getWrappedName(e,e.render,"ForwardRef");case reactIs.exports.Memo:return getWrappedName(e,e.type,"memo");default:return}}}function HTMLElementType(e,t,r,o,n){return null}var ponyfillGlobal="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();const refType=PropTypes.oneOfType([PropTypes.func,PropTypes.object]);var refType$1=refType;function createChainedFunction(...e){return e.reduce(((e,t)=>null==t?e:function(...r){e.apply(this,r),t.apply(this,r)}),(()=>{}))}function debounce(e,t=166){let r;function o(...o){clearTimeout(r),r=setTimeout((()=>{e.apply(this,o)}),t)}return o.clear=()=>{clearTimeout(r)},o}function deprecatedPropType(e,t){return()=>null}function isMuiElement(e,t){return React.isValidElement(e)&&-1!==t.indexOf(e.type.muiName)}function ownerDocument(e){return e&&e.ownerDocument||document}function ownerWindow(e){return ownerDocument(e).defaultView||window}function requirePropFactory(e,t){return()=>null}function setRef(e,t){"function"==typeof e?e(t):e&&(e.current=t)}const useEnhancedEffect="undefined"!=typeof window?React.useLayoutEffect:React.useEffect;var useEnhancedEffect$1=useEnhancedEffect;function useId(e){const[t,r]=React.useState(e),o=e||t;return React.useEffect((()=>{null==t&&r(`mui-${Math.round(1e9*Math.random())}`)}),[t]),o}function unsupportedProp(e,t,r,o,n){return null}function useControlled({controlled:e,default:t,name:r,state:o="value"}){const{current:n}=React.useRef(void 0!==e),[s,a]=React.useState(t);return[n?e:s,React.useCallback((e=>{n||a(e)}),[])]}function useEventCallback(e){const t=React.useRef(e);return useEnhancedEffect$1((()=>{t.current=e})),React.useCallback(((...e)=>(0,t.current)(...e)),[])}function useForkRef(e,t){return React.useMemo((()=>null==e&&null==t?null:r=>{setRef(e,r),setRef(t,r)}),[e,t])}let hadKeyboardEvent=!0,hadFocusVisibleRecently=!1,hadFocusVisibleRecentlyTimeout=null;const inputTypesWhitelist={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function focusTriggersKeyboardModality(e){const{type:t,tagName:r}=e;return!("INPUT"!==r||!inputTypesWhitelist[t]||e.readOnly)||("TEXTAREA"===r&&!e.readOnly||!!e.isContentEditable)}function handleKeyDown(e){e.metaKey||e.altKey||e.ctrlKey||(hadKeyboardEvent=!0)}function handlePointerDown(){hadKeyboardEvent=!1}function handleVisibilityChange(){"hidden"===this.visibilityState&&hadFocusVisibleRecently&&(hadKeyboardEvent=!0)}function prepare(e){e.addEventListener("keydown",handleKeyDown,!0),e.addEventListener("mousedown",handlePointerDown,!0),e.addEventListener("pointerdown",handlePointerDown,!0),e.addEventListener("touchstart",handlePointerDown,!0),e.addEventListener("visibilitychange",handleVisibilityChange,!0)}function isFocusVisible(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch(e){}return hadKeyboardEvent||focusTriggersKeyboardModality(t)}function useIsFocusVisible(){const e=React.useCallback((e=>{null!=e&&prepare(e.ownerDocument)}),[]),t=React.useRef(!1);return{isFocusVisibleRef:t,onFocus:function(e){return!!isFocusVisible(e)&&(t.current=!0,!0)},onBlur:function(){return!!t.current&&(hadFocusVisibleRecently=!0,window.clearTimeout(hadFocusVisibleRecentlyTimeout),hadFocusVisibleRecentlyTimeout=window.setTimeout((()=>{hadFocusVisibleRecently=!1}),100),t.current=!1,!0)},ref:e}}function getScrollbarSize(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}let cachedType;function detectScrollType(){if(cachedType)return cachedType;const e=document.createElement("div"),t=document.createElement("div");return t.style.width="10px",t.style.height="1px",e.appendChild(t),e.dir="rtl",e.style.fontSize="14px",e.style.width="4px",e.style.height="1px",e.style.position="absolute",e.style.top="-1000px",e.style.overflow="scroll",document.body.appendChild(e),cachedType="reverse",e.scrollLeft>0?cachedType="default":(e.scrollLeft=1,0===e.scrollLeft&&(cachedType="negative")),document.body.removeChild(e),cachedType}function getNormalizedScrollLeft(e,t){const r=e.scrollLeft;if("rtl"!==t)return r;switch(detectScrollType()){case"negative":return e.scrollWidth-e.clientWidth+r;case"reverse":return e.scrollWidth-e.clientWidth-r;default:return r}}const usePreviousProps=e=>{const t=React.useRef({});return React.useEffect((()=>{t.current=e})),t.current};var usePreviousProps$1=usePreviousProps;const visuallyHidden={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:-1,overflow:"hidden",padding:0,position:"absolute",whiteSpace:"nowrap",width:"1px"};var visuallyHidden$1=visuallyHidden;function validatorNoop(){return null}validatorNoop.isRequired=validatorNoop;var integerPropType=validatorNoop,esm=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",chainPropTypes:chainPropTypes,deepmerge:deepmerge,elementAcceptingRef:elementAcceptingRef$1,elementTypeAcceptingRef:elementTypeAcceptingRef,exactProp:exactProp,formatMuiErrorMessage:formatMuiErrorMessage,getDisplayName:getDisplayName,HTMLElementType:HTMLElementType,ponyfillGlobal:ponyfillGlobal,refType:refType$1,unstable_capitalize:capitalize,unstable_createChainedFunction:createChainedFunction,unstable_debounce:debounce,unstable_deprecatedPropType:deprecatedPropType,unstable_isMuiElement:isMuiElement,unstable_ownerDocument:ownerDocument,unstable_ownerWindow:ownerWindow,unstable_requirePropFactory:requirePropFactory,unstable_setRef:setRef,unstable_useEnhancedEffect:useEnhancedEffect$1,unstable_useId:useId,unstable_unsupportedProp:unsupportedProp,unstable_useControlled:useControlled,unstable_useEventCallback:useEventCallback,unstable_useForkRef:useForkRef,unstable_useIsFocusVisible:useIsFocusVisible,unstable_getScrollbarSize:getScrollbarSize,unstable_detectScrollType:detectScrollType,unstable_getNormalizedScrollLeft:getNormalizedScrollLeft,usePreviousProps:usePreviousProps$1,visuallyHidden:visuallyHidden$1,integerPropType:integerPropType});const _excluded$4=["sx"],splitProps=e=>{const t={systemProps:{},otherProps:{}};return Object.keys(e).forEach((r=>{propToStyleFunction[r]?t.systemProps[r]=e[r]:t.otherProps[r]=e[r]})),t};function extendSxProp(e){const{sx:t}=e,r=_objectWithoutPropertiesLoose(e,_excluded$4),{systemProps:o,otherProps:n}=splitProps(r);return _extends$1({},n,{sx:_extends$1({},o,t)})}var styleFunctionSx=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:styleFunctionSx$1,extendSxProp:extendSxProp}),createTheme=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:createTheme$1});const _excluded$3=["className","component"];function createBox(e={}){const{defaultTheme:t}=e,r=styled$2("div")(styleFunctionSx$1);return React.forwardRef((function(e,o){const n=useTheme(t),s=extendSxProp(e),{className:a,component:i="div"}=s,u=_objectWithoutPropertiesLoose(s,_excluded$3);return jsx(r,_extends$1({as:i,ref:o,className:clsx(a,"MuiBox-root"),theme:n},u))}))}const Box=createBox();var Box$1=Box;function getContainerUtilityClass(e){return generateUtilityClass("MuiContainer",e)}generateUtilityClasses("MuiContainer",["root","disableGutters","fixed","maxWidthXs","maxWidthSm","maxWidthMd","maxWidthLg","maxWidthXl"]);const _excluded$2=["className","component","disableGutters","fixed","maxWidth"],useUtilityClasses=e=>{const{classes:t,fixed:r,disableGutters:o,maxWidth:n}=e,s={root:["root",n&&`maxWidth${capitalize(String(n))}`,r&&"fixed",o&&"disableGutters"]};return composeClasses(s,getContainerUtilityClass,t)},ContainerRoot=styled$3("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[`maxWidth${capitalize(String(r.maxWidth))}`],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}})((({theme:e,ownerState:t})=>_extends$1({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}})),(({theme:e,ownerState:t})=>t.fixed&&Object.keys(e.breakpoints.values).reduce(((t,r)=>{const o=e.breakpoints.values[r];return 0!==o&&(t[e.breakpoints.up(r)]={maxWidth:`${o}${e.breakpoints.unit}`}),t}),{})),(({theme:e,ownerState:t})=>_extends$1({},"xs"===t.maxWidth&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[e.breakpoints.up(t.maxWidth)]:{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`}}))),Container=React.forwardRef((function(e,t){const r=useThemeProps({props:e,name:"MuiContainer"}),{className:o,component:n="div",disableGutters:s=!1,fixed:a=!1,maxWidth:i="lg"}=r,u=_objectWithoutPropertiesLoose(r,_excluded$2),c=_extends$1({},r,{component:n,disableGutters:s,fixed:a,maxWidth:i}),l=useUtilityClasses(c);return jsx(ContainerRoot,_extends$1({as:n,ownerState:c,className:clsx(l.root,o),ref:t},u))}));var Container$1=Container,styled$1={},interopRequireDefault={exports:{}};!function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.default=e.exports,e.exports.__esModule=!0}(interopRequireDefault);var createStyled$1={},_extends={exports:{}};!function(e){function t(){return e.exports=t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},e.exports.default=e.exports,e.exports.__esModule=!0,t.apply(this,arguments)}e.exports=t,e.exports.default=e.exports,e.exports.__esModule=!0}(_extends);var objectWithoutPropertiesLoose={exports:{}};!function(e){e.exports=function(e,t){if(null==e)return{};var r,o,n={},s=Object.keys(e);for(o=0;o<s.length;o++)r=s[o],t.indexOf(r)>=0||(n[r]=e[r]);return n},e.exports.default=e.exports,e.exports.__esModule=!0}(objectWithoutPropertiesLoose);var require$$3=getAugmentedNamespace(styledEngine),require$$4=getAugmentedNamespace(esm),require$$5=getAugmentedNamespace(createTheme),require$$6=getAugmentedNamespace(styleFunctionSx),propsToClassKey$1={},_interopRequireDefault$2=interopRequireDefault.exports;Object.defineProperty(propsToClassKey$1,"__esModule",{value:!0}),propsToClassKey$1.default=propsToClassKey;var _objectWithoutPropertiesLoose2$1=_interopRequireDefault$2(objectWithoutPropertiesLoose.exports),_utils=require$$4;const _excluded$1=["variant"];function isEmpty$1(e){return 0===e.length}function propsToClassKey(e){const{variant:t}=e,r=(0,_objectWithoutPropertiesLoose2$1.default)(e,_excluded$1);let o=t||"";return Object.keys(r).sort().forEach((t=>{o+="color"===t?isEmpty$1(o)?e[t]:(0,_utils.unstable_capitalize)(e[t]):`${isEmpty$1(o)?t:(0,_utils.unstable_capitalize)(t)}${(0,_utils.unstable_capitalize)(e[t].toString())}`})),o}var _interopRequireDefault$1=interopRequireDefault.exports;Object.defineProperty(createStyled$1,"__esModule",{value:!0}),createStyled$1.default=createStyled,createStyled$1.shouldForwardProp=shouldForwardProp,createStyled$1.systemDefaultTheme=void 0;var _extends2=_interopRequireDefault$1(_extends.exports),_objectWithoutPropertiesLoose2=_interopRequireDefault$1(objectWithoutPropertiesLoose.exports),_styledEngine=_interopRequireDefault$1(require$$3),_createTheme=_interopRequireDefault$1(require$$5),_styleFunctionSx=_interopRequireDefault$1(require$$6),_propsToClassKey=_interopRequireDefault$1(propsToClassKey$1);const _excluded=["name","slot","skipVariantsResolver","skipSx","overridesResolver"],_excluded2=["theme"],_excluded3=["theme"];function isEmpty(e){return 0===Object.keys(e).length}const getStyleOverrides=(e,t)=>t.components&&t.components[e]&&t.components[e].styleOverrides?t.components[e].styleOverrides:null,getVariantStyles=(e,t)=>{let r=[];t&&t.components&&t.components[e]&&t.components[e].variants&&(r=t.components[e].variants);const o={};return r.forEach((e=>{const t=(0,_propsToClassKey.default)(e.props);o[t]=e.style})),o},variantsResolver=(e,t,r,o)=>{var n,s;const{ownerState:a={}}=e,i=[],u=null==r||null==(n=r.components)||null==(s=n[o])?void 0:s.variants;return u&&u.forEach((r=>{let o=!0;Object.keys(r.props).forEach((t=>{a[t]!==r.props[t]&&e[t]!==r.props[t]&&(o=!1)})),o&&i.push(t[(0,_propsToClassKey.default)(r.props)])})),i};function shouldForwardProp(e){return"ownerState"!==e&&"theme"!==e&&"sx"!==e&&"as"!==e}const systemDefaultTheme=(0,_createTheme.default)();function createStyled(e={}){const{defaultTheme:t=systemDefaultTheme,rootShouldForwardProp:r=shouldForwardProp,slotShouldForwardProp:o=shouldForwardProp}=e;return(e,n={})=>{const{name:s,slot:a,skipVariantsResolver:i,skipSx:u,overridesResolver:c}=n,l=(0,_objectWithoutPropertiesLoose2.default)(n,_excluded),d=void 0!==i?i:a&&"Root"!==a||!1,p=u||!1;let f=shouldForwardProp;"Root"===a?f=r:a&&(f=o);const m=(0,_styledEngine.default)(e,(0,_extends2.default)({shouldForwardProp:f,label:undefined},l));return(e,...r)=>{const o=r?r.map((e=>"function"==typeof e&&e.__emotion_real!==e?r=>{let{theme:o}=r,n=(0,_objectWithoutPropertiesLoose2.default)(r,_excluded2);return e((0,_extends2.default)({theme:isEmpty(o)?t:o},n))}:e)):[];let n=e;s&&c&&o.push((e=>{const r=isEmpty(e.theme)?t:e.theme,o=getStyleOverrides(s,r);return o?c(e,o):null})),s&&!d&&o.push((e=>{const r=isEmpty(e.theme)?t:e.theme;return variantsResolver(e,getVariantStyles(s,r),r,s)})),p||o.push((e=>{const r=isEmpty(e.theme)?t:e.theme;return(0,_styleFunctionSx.default)((0,_extends2.default)({},e,{theme:r}))}));const a=o.length-r.length;if(Array.isArray(e)&&a>0){const t=new Array(a).fill("");n=[...e,...t],n.raw=[...e.raw,...t]}else"function"==typeof e&&(n=r=>{let{theme:o}=r,n=(0,_objectWithoutPropertiesLoose2.default)(r,_excluded3);return e((0,_extends2.default)({theme:isEmpty(o)?t:o},n))});return m(n,...o)}}}createStyled$1.systemDefaultTheme=systemDefaultTheme;var _interopRequireDefault=interopRequireDefault.exports;Object.defineProperty(styled$1,"__esModule",{value:!0});var default_1=styled$1.default=void 0,_createStyled=_interopRequireDefault(createStyled$1);const styled=(0,_createStyled.default)();var _default=styled;default_1=styled$1.default=_default;export{Box$1 as B,Container$1 as C,useEventCallback as a,useForkRef as b,createChainedFunction as c,default_1 as d,extendSxProp as e,debounce as f,deprecatedPropType as g,isMuiElement as h,interopRequireDefault as i,ownerWindow as j,useEnhancedEffect$1 as k,useId as l,unsupportedProp as m,useControlled as n,ownerDocument as o,getAugmentedNamespace as p,getDefaultExportFromCjs as q,requirePropFactory as r,setRef as s,commonjsGlobal as t,useIsFocusVisible as u,createBox as v,getScrollbarSize as w};