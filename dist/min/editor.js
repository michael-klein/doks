var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,t,r)=>t in e?__defProp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,__spreadValues=(e,t)=>{for(var r in t||(t={}))__hasOwnProp.call(t,r)&&__defNormalProp(e,r,t[r]);if(__getOwnPropSymbols)for(var r of __getOwnPropSymbols(t))__propIsEnum.call(t,r)&&__defNormalProp(e,r,t[r]);return e},__spreadProps=(e,t)=>__defProps(e,__getOwnPropDescs(t));import React__default,{memo,useEffect,useRef,useState,useCallback,lazy,Suspense,Fragment as Fragment$1}from"react";import{combineLatest,map}from"rxjs";import{c as createSvgIcon,i as interopRequireDefault,r as require$$2,d as default_1$5,b as documents$,C as Container}from"./documents.js";import{P as PropTypes,j as jsx,d as jsxs,F as Fragment,C as CircularProgress}from"./main.js";import{b as useNavigate,u as useParams,R as Routes,a as Route}from"./doks.js";import{B as Box,I as IconButton,M as MarkdownRenderer}from"./markdown_renderer.js";import{C as Card}from"./Card.js";import{C as CardHeader}from"./CardHeader.js";import{T as Tooltip}from"./Tooltip.js";import{u as useObservableAndState}from"./use_observable_and_state.js";import"rxjs/operators";import"react-dom";import"./index.js";import"./Paper.js";var ArrowLeft={},_interopRequireDefault$4=interopRequireDefault.exports;Object.defineProperty(ArrowLeft,"__esModule",{value:!0});var default_1$4=ArrowLeft.default=void 0,_createSvgIcon$4=_interopRequireDefault$4(createSvgIcon),_jsxRuntime$4=require$$2,_default$4=(0,_createSvgIcon$4.default)((0,_jsxRuntime$4.jsx)("path",{d:"m14 7-5 5 5 5V7z"}),"ArrowLeft");default_1$4=ArrowLeft.default=_default$4;var ArrowRight={},_interopRequireDefault$3=interopRequireDefault.exports;Object.defineProperty(ArrowRight,"__esModule",{value:!0});var default_1$3=ArrowRight.default=void 0,_createSvgIcon$3=_interopRequireDefault$3(createSvgIcon),_jsxRuntime$3=require$$2,_default$3=(0,_createSvgIcon$3.default)((0,_jsxRuntime$3.jsx)("path",{d:"m10 17 5-5-5-5v10z"}),"ArrowRight");default_1$3=ArrowRight.default=_default$3;var Save={},_interopRequireDefault$2=interopRequireDefault.exports;Object.defineProperty(Save,"__esModule",{value:!0});var default_1$2=Save.default=void 0,_createSvgIcon$2=_interopRequireDefault$2(createSvgIcon),_jsxRuntime$2=require$$2,_default$2=(0,_createSvgIcon$2.default)((0,_jsxRuntime$2.jsx)("path",{d:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"}),"Save");default_1$2=Save.default=_default$2;var Visibility={},_interopRequireDefault$1=interopRequireDefault.exports;Object.defineProperty(Visibility,"__esModule",{value:!0});var default_1$1=Visibility.default=void 0,_createSvgIcon$1=_interopRequireDefault$1(createSvgIcon),_jsxRuntime$1=require$$2,_default$1=(0,_createSvgIcon$1.default)((0,_jsxRuntime$1.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");default_1$1=Visibility.default=_default$1;var VisibilityOff={},_interopRequireDefault=interopRequireDefault.exports;Object.defineProperty(VisibilityOff,"__esModule",{value:!0});var default_1=VisibilityOff.default=void 0,_createSvgIcon=_interopRequireDefault(createSvgIcon),_jsxRuntime=require$$2,_default=(0,_createSvgIcon.default)((0,_jsxRuntime.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");function _defineProperty$1(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ownKeys$1(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread2$1(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys$1(Object(r),!0).forEach((function(t){_defineProperty$1(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys$1(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _iterableToArrayLimit(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==s.return||s.return()}finally{if(o)throw a}}return r}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){_defineProperty(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function compose$1(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return t.reduceRight((function(e,t){return t(e)}),e)}}function curry$1(e){return function t(){for(var r=this,n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return o.length>=e.length?e.apply(this,o):function(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return t.apply(r,[].concat(o,n))}}}function isObject$1(e){return{}.toString.call(e).includes("Object")}function isEmpty(e){return!Object.keys(e).length}function isFunction(e){return"function"==typeof e}function hasOwnProperty(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function validateChanges(e,t){return isObject$1(t)||errorHandler$1("changeType"),Object.keys(t).some((function(t){return!hasOwnProperty(e,t)}))&&errorHandler$1("changeField"),t}function validateSelector(e){isFunction(e)||errorHandler$1("selectorType")}function validateHandler(e){isFunction(e)||isObject$1(e)||errorHandler$1("handlerType"),isObject$1(e)&&Object.values(e).some((function(e){return!isFunction(e)}))&&errorHandler$1("handlersType")}function validateInitial(e){e||errorHandler$1("initialIsRequired"),isObject$1(e)||errorHandler$1("initialType"),isEmpty(e)&&errorHandler$1("initialContent")}function throwError$1(e,t){throw new Error(e[t]||e.default)}default_1=VisibilityOff.default=_default;var errorMessages$1={initialIsRequired:"initial state is required",initialType:"initial state should be an object",initialContent:"initial state shouldn't be an empty object",handlerType:"handler should be an object or a function",handlersType:"all handlers should be a functions",selectorType:"selector should be a function",changeType:"provided value of changes should be an object",changeField:'it seams you want to change a field in the state which is not specified in the "initial" state',default:"an unknown error accured in `state-local` package"},errorHandler$1=curry$1(throwError$1)(errorMessages$1),validators$1={changes:validateChanges,selector:validateSelector,handler:validateHandler,initial:validateInitial};function create(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};validators$1.initial(e),validators$1.handler(t);var r={current:e},n=curry$1(didStateUpdate)(r,t),o=curry$1(updateState)(r),a=curry$1(validators$1.changes)(e),i=curry$1(extractChanges)(r);function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(e){return e};return validators$1.selector(e),e(r.current)}function c(e){compose$1(n,o,a,i)(e)}return[s,c]}function extractChanges(e,t){return isFunction(t)?t(e.current):t}function updateState(e,t){return e.current=_objectSpread2(_objectSpread2({},e.current),t),t}function didStateUpdate(e,t,r){return isFunction(t)?t(e.current):Object.keys(r).forEach((function(r){var n;return null===(n=t[r])||void 0===n?void 0:n.call(t,e.current[r])})),r}var index$1={create:create},config$1={paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.28.1/min/vs"}};function curry(e){return function t(){for(var r=this,n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return o.length>=e.length?e.apply(this,o):function(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return t.apply(r,[].concat(o,n))}}}function isObject(e){return{}.toString.call(e).includes("Object")}function validateConfig(e){return e||errorHandler("configIsRequired"),isObject(e)||errorHandler("configType"),e.urls?(informAboutDeprecation(),{paths:{vs:e.urls.monacoBase}}):e}function informAboutDeprecation(){console.warn(errorMessages.deprecation)}function throwError(e,t){throw new Error(e[t]||e.default)}var errorMessages={configIsRequired:"the configuration object is required",configType:"the configuration object should be an object",default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:"Deprecation warning!\n    You are using deprecated way of configuration.\n\n    Instead of using\n      monaco.config({ urls: { monacoBase: '...' } })\n    use\n      monaco.config({ paths: { vs: '...' } })\n\n    For more please check the link https://github.com/suren-atoyan/monaco-loader#config\n  "},errorHandler=curry(throwError)(errorMessages),validators={config:validateConfig},compose=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return t.reduceRight((function(e,t){return t(e)}),e)}};function merge(e,t){return Object.keys(t).forEach((function(r){t[r]instanceof Object&&e[r]&&Object.assign(t[r],merge(e[r],t[r]))})),_objectSpread2$1(_objectSpread2$1({},e),t)}var CANCELATION_MESSAGE={type:"cancelation",msg:"operation is manually canceled"};function makeCancelable(e){var t=!1,r=new Promise((function(r,n){e.then((function(e){return t?n(CANCELATION_MESSAGE):r(e)})),e.catch(n)}));return r.cancel=function(){return t=!0},r}var _state$create=index$1.create({config:config$1,isInitialized:!1,resolve:null,reject:null,monaco:null}),_state$create2=_slicedToArray(_state$create,2),getState=_state$create2[0],setState=_state$create2[1];function config(e){setState((function(t){return{config:merge(t.config,validators.config(e))}}))}function init(){if(!getState((function(e){return{isInitialized:e.isInitialized}})).isInitialized){if(window.monaco&&window.monaco.editor)return storeMonacoInstance(window.monaco),makeCancelable(Promise.resolve(window.monaco));compose(injectScripts,getMonacoLoaderScript)(configureLoader),setState({isInitialized:!0})}return makeCancelable(wrapperPromise)}function injectScripts(e){return document.body.appendChild(e)}function createScript(e){var t=document.createElement("script");return e&&(t.src=e),t}function getMonacoLoaderScript(e){var t=getState((function(e){return{config:e.config,reject:e.reject}})),r=createScript("".concat(t.config.paths.vs,"/loader.js"));return r.onload=function(){return e()},r.onerror=t.reject,r}function configureLoader(){var e=getState((function(e){return{config:e.config,resolve:e.resolve,reject:e.reject}})),t=window.require;t.config(e.config),t(["vs/editor/editor.main"],(function(t){storeMonacoInstance(t),e.resolve(t)}),(function(t){e.reject(t)}))}function storeMonacoInstance(e){getState().monaco||setState({monaco:e})}function __getMonacoInstance(){return getState((function(e){return e.monaco}))}var wrapperPromise=new Promise((function(e,t){return setState({resolve:e,reject:t})})),loader={config:config,init:init,__getMonacoInstance:__getMonacoInstance};function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}const loadingStyles={display:"flex",height:"100%",width:"100%",justifyContent:"center",alignItems:"center"};function Loading({content:e}){return React__default.createElement("div",{style:loadingStyles},e)}const styles={wrapper:{display:"flex",position:"relative",textAlign:"initial"},fullWidth:{width:"100%"},hide:{display:"none"}};function MonacoContainer$1({width:e,height:t,isEditorReady:r,loading:n,_ref:o,className:a,wrapperProps:i}){return React__default.createElement("section",_extends({style:__spreadProps(__spreadValues({},styles.wrapper),{width:e,height:t})},i),!r&&React__default.createElement(Loading,{content:n}),React__default.createElement("div",{ref:o,style:__spreadValues(__spreadValues({},styles.fullWidth),!r&&styles.hide),className:a}))}MonacoContainer$1.propTypes={width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]).isRequired,height:PropTypes.oneOfType([PropTypes.number,PropTypes.string]).isRequired,loading:PropTypes.oneOfType([PropTypes.element,PropTypes.string]).isRequired,isEditorReady:PropTypes.bool.isRequired,className:PropTypes.string,wrapperProps:PropTypes.object};var MonacoContainer=memo(MonacoContainer$1);function useMount(e){useEffect(e,[])}function useUpdate(e,t,r=!0){const n=useRef(!0);useEffect(n.current||!r?()=>{n.current=!1}:e,t)}function noop(){}function getOrCreateModel(e,t,r,n){return getModel(e,n)||createModel(e,t,r,n)}function getModel(e,t){return e.editor.getModel(createModelUri(e,t))}function createModel(e,t,r,n){return e.editor.createModel(t,r,n&&createModelUri(e,n))}function createModelUri(e,t){return e.Uri.parse(t)}function isUndefined(e){return void 0===e}function usePrevious(e){const t=useRef();return useEffect((()=>{t.current=e}),[e]),t.current}PropTypes.string,PropTypes.string,PropTypes.string,PropTypes.string,PropTypes.string,PropTypes.string,PropTypes.string,PropTypes.bool,PropTypes.bool,PropTypes.string,PropTypes.oneOfType([PropTypes.element,PropTypes.string]),PropTypes.object,PropTypes.oneOfType([PropTypes.number,PropTypes.string]),PropTypes.oneOfType([PropTypes.number,PropTypes.string]),PropTypes.string,PropTypes.object,PropTypes.func,PropTypes.func;const viewStates=new Map;function Editor$1({defaultValue:e,defaultLanguage:t,defaultPath:r,value:n,language:o,path:a,theme:i,line:s,loading:c,options:u,overrideServices:l,saveViewState:d,keepCurrentModel:p,width:f,height:g,className:y,wrapperProps:m,beforeMount:h,onMount:b,onChange:v,onValidate:_}){const[j,P]=useState(!1),[w,x]=useState(!0),$=useRef(null),S=useRef(null),O=useRef(null),T=useRef(b),M=useRef(h),R=useRef(null),C=useRef(n),E=usePrevious(a);useMount((()=>{const e=loader.init();return e.then((e=>($.current=e)&&x(!1))).catch((e=>"cancelation"!==(null==e?void 0:e.type)&&console.error("Monaco initialization: error:",e))),()=>S.current?function(){var e,t;null===(e=R.current)||void 0===e||e.dispose(),p?d&&viewStates.set(a,S.current.saveViewState()):null===(t=S.current.getModel())||void 0===t||t.dispose();S.current.dispose()}():e.cancel()})),useUpdate((()=>{const r=getOrCreateModel($.current,e||n,t||o,a);r!==S.current.getModel()&&(d&&viewStates.set(E,S.current.saveViewState()),S.current.setModel(r),d&&S.current.restoreViewState(viewStates.get(a)))}),[a],j),useUpdate((()=>{S.current.updateOptions(u)}),[u],j),useUpdate((()=>{S.current.getOption($.current.editor.EditorOption.readOnly)?S.current.setValue(n):n!==S.current.getValue()&&(S.current.executeEdits("",[{range:S.current.getModel().getFullModelRange(),text:n,forceMoveMarkers:!0}]),S.current.pushUndoStop())}),[n],j),useUpdate((()=>{$.current.editor.setModelLanguage(S.current.getModel(),o)}),[o],j),useUpdate((()=>{isUndefined(s)||S.current.revealLine(s)}),[s],j),useUpdate((()=>{$.current.editor.setTheme(i)}),[i],j);const I=useCallback((()=>{M.current($.current);const s=a||r,c=getOrCreateModel($.current,n||e,t||o,s);S.current=$.current.editor.create(O.current,__spreadValues({model:c,automaticLayout:!0},u),l),d&&S.current.restoreViewState(viewStates.get(s)),$.current.editor.setTheme(i),P(!0)}),[e,t,r,n,o,a,u,l,d,i]);return useEffect((()=>{j&&T.current(S.current,$.current)}),[j]),useEffect((()=>{!w&&!j&&I()}),[w,j,I]),C.current=n,useEffect((()=>{var e,t;j&&v&&(null===(e=R.current)||void 0===e||e.dispose(),R.current=null===(t=S.current)||void 0===t?void 0:t.onDidChangeModelContent((e=>{const t=S.current.getValue();C.current!==t&&v(t,e)})))}),[j,v]),useEffect((()=>{if(j){const e=$.current.editor.onDidChangeMarkers((e=>{var t;const r=null===(t=S.current.getModel())||void 0===t?void 0:t.uri;if(r){if(e.find((e=>e.path===r.path))){const e=$.current.editor.getModelMarkers({resource:r});null==_||_(e)}}}));return()=>{null==e||e.dispose()}}}),[j,_]),jsx(MonacoContainer,{width:f,height:g,isEditorReady:j,loading:c,_ref:O,className:y,wrapperProps:m})}Editor$1.propTypes={defaultValue:PropTypes.string,defaultPath:PropTypes.string,defaultLanguage:PropTypes.string,value:PropTypes.string,language:PropTypes.string,path:PropTypes.string,theme:PropTypes.string,line:PropTypes.number,loading:PropTypes.oneOfType([PropTypes.element,PropTypes.string]),options:PropTypes.object,overrideServices:PropTypes.object,saveViewState:PropTypes.bool,keepCurrentModel:PropTypes.bool,width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),height:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),className:PropTypes.string,wrapperProps:PropTypes.object,beforeMount:PropTypes.func,onMount:PropTypes.func,onChange:PropTypes.func,onValidate:PropTypes.func},Editor$1.defaultProps={theme:"light",loading:"Loading...",options:{},overrideServices:{},saveViewState:!0,keepCurrentModel:!1,width:"100%",height:"100%",wrapperProps:{},beforeMount:noop,onMount:noop,onValidate:noop};var index=memo(Editor$1);const EditorRenderer=({setHeight:e,setMDX:t,mdx:r,editorRef:n,boxRef:o})=>jsx(index,{height:"100%",theme:"vs-dark",width:"100%",onChange:t,onMount:(t,r)=>{console.log(r),n.current=t,e(o.current.clientHeight)},defaultLanguage:"markdown",defaultValue:r,options:{wordWrap:"on"}}),Sidebar=lazy((()=>import("./sidebar.js"))),EditorWrapper=default_1$5(Card)({width:"100%",flex:"auto",display:"flex",flexDirection:"column",".editor":{width:"100%",flex:"auto",display:"flex",flexDirection:"row"}}),EditorHeader=default_1$5(CardHeader)((({theme:e})=>({background:e.palette.primary.dark,color:e.palette.getContrastText(e.palette.primary.dark),padding:2,height:"44px"}))),ContentBox=default_1$5(Box)({overflow:"auto",paddingLeft:"20px",paddingRight:"20px",paddingBottom:"20px"}),SidebarBox=default_1$5(Box)({flex:0,position:"relative"}),MAX_FLEX_DIFF=4,MarkdownEditor=({initial:e})=>{const[t,r]=useState(e),[n,o]=useState(0),[a,i]=useState(-1),s=useRef(),c=useRef(),u=useCallback((()=>{const e=document.createElement("a");e.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(t)),e.setAttribute("download","document.mdx"),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e)}),[t]),l=useNavigate(),d=useParams(),p=useCallback((e=>{var t;l(`/editor/${e}/${null!=(t=d.contentSlug)?t:""}`)}),[d]),[f,g]=useState(!0);return jsxs(EditorWrapper,{children:[jsx(EditorHeader,{action:jsxs(React__default.Fragment,{children:[jsx(IconButton,{sx:{color:"inherit"},"aria-label":"increase preview size",onClick:u,children:jsx(default_1$2,{sx:{fontSize:22}})}),jsx(IconButton,{sx:{color:"inherit"},"aria-label":"increase preview size",onClick:()=>{i((e=>Math.max(-3,e-1)))},children:jsx(default_1$4,{sx:{fontSize:32}})}),jsx(IconButton,{sx:{color:"inherit"},"aria-label":"decrease preview size",onClick:()=>{i((e=>Math.min(3,e+1)))},children:jsx(default_1$3,{sx:{fontSize:32}})}),jsx(Tooltip,{title:"toggle preview",children:jsx(IconButton,{sx:{color:"inherit",marginRight:"10px"},"aria-label":"toggle preview",onClick:()=>{g((e=>!e))},children:jsx(f?default_1:default_1$1,{sx:{fontSize:22}})})})]})}),jsxs(Box,{className:"editor",children:[jsx(SidebarBox,{children:jsx(Suspense,{fallback:jsx(Fragment,{}),children:jsx(Sidebar,{mode:"editor",onNodeSelect:e=>{const t=documents$.value.get(e);console.log(t);const r=c.current.getPosition(),n=`[${t.name}](/docs/${t.projectSlug}/${t.slug})`,o={identifier:{major:1,minor:1},range:{startLineNumber:r.lineNumber,endLineNumber:r.lineNumber},text:n,forceMoveMarkers:!0};c.current.executeEdits("my-source",[o])},onProjectSelect:p})})}),jsx(Box,{ref:s,sx:{flex:"auto",maxWidth:f?50+10*a+"%":"100%",background:"black"},children:jsx(EditorRenderer,{editorRef:c,mdx:t,boxRef:s,setHeight:o,setMDX:r})}),f&&jsx(ContentBox,{sx:{height:n+"px",flex:"auto",maxWidth:50-10*a+"%"},children:!!n&&jsx(MarkdownRenderer,{mdx:t,isEditor:!0})})]})]})},DocFetcher=lazy((()=>import("./doc_fetcher.js"))),Navbar=lazy((()=>import("./navbar.js"))),DocumentEditor=()=>{const e=useParams(),[t]=useObservableAndState((e=>combineLatest([e,documents$]).pipe(map((([e,t])=>{var r;return t.get(null==(r=e[0])?void 0:r.contentSlug)})))),[e]),r=!!e.contentSlug;return jsx(Fragment,{children:r&&!t?jsx(CircularProgress,{}):jsx(MarkdownEditor,{initial:r?t.mdx:"# hello world"},r?t.mdx:"# hello world")})},Layout=({children:e})=>jsxs(Fragment$1,{children:[jsx(DocFetcher,{mode:"editor"}),jsx(Navbar,{}),jsx(Container,{sx:{marginTop:3,marginBottom:3,flex:"auto",display:"flex",maxWidth:"100% !important"},children:e})]}),Editor=()=>jsxs(Routes,{children:[jsx(Route,{path:"/:projectSlug",element:jsx(Layout,{children:jsx(DocumentEditor,{})})}),jsx(Route,{path:"/:projectSlug/:contentSlug",element:jsx(Layout,{children:jsx(DocumentEditor,{})})}),jsx(Route,{path:"/",element:jsx(Layout,{children:jsx(DocumentEditor,{})})})]});export{Editor,Editor as default};