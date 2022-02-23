var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,t,n)=>t in e?__defProp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,__spreadValues=(e,t)=>{for(var n in t||(t={}))__hasOwnProp.call(t,n)&&__defNormalProp(e,n,t[n]);if(__getOwnPropSymbols)for(var n of __getOwnPropSymbols(t))__propIsEnum.call(t,n)&&__defNormalProp(e,n,t[n]);return e},__spreadProps=(e,t)=>__defProps(e,__getOwnPropDescs(t));import{m as generateUtilityClass,n as generateUtilityClasses,o as styled,p as useThemeProps,v as _objectWithoutPropertiesLoose,_ as _extends,w as composeClasses,j as jsx,z as clsx,k as createSvgIcon,l as interopRequireDefault,r as require$$2,K as useFormControl,a8 as FormControlContext,a9 as Typography,a as jsxs,J as capitalize,U as default_1$1,aa as TextField,V as useParams,Z as useObservableState,ab as useObservable,ac as modifyDocument,u as useComponentContext,ad as CardHeader,ae as Box,a0 as FormControl,af as IconButton,ag as default_1$2,a4 as Card,ah as documents$}from"./main.js";import*as React from"react";import{useCallback,useRef,useEffect,useState}from"react";import{combineLatest}from"rxjs";import{map}from"rxjs/operators";import{C as ConditionalCard}from"./conditional_card.js";import{G as Grid}from"./Grid.js";import{S as Snackbar,A as Alert}from"./Snackbar.js";import"react-dom";function getCardContentUtilityClass(e){return generateUtilityClass("MuiCardContent",e)}generateUtilityClasses("MuiCardContent",["root"]);const _excluded$1=["className","component"],useUtilityClasses$1=e=>{const{classes:t}=e;return composeClasses({root:["root"]},getCardContentUtilityClass,t)},CardContentRoot=styled("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}}))),CardContent=React.forwardRef((function(e,t){const n=useThemeProps({props:e,name:"MuiCardContent"}),{className:o,component:r="div"}=n,a=_objectWithoutPropertiesLoose(n,_excluded$1),i=_extends({},n,{component:r}),s=useUtilityClasses$1(i);return jsx(CardContentRoot,_extends({as:r,className:clsx(s.root,o),ownerState:i,ref:t},a))}));var CardContent$1=CardContent;const formatDate=e=>new Date(e).toLocaleString();var ContentCopy={},_interopRequireDefault=interopRequireDefault.exports;Object.defineProperty(ContentCopy,"__esModule",{value:!0});var default_1=ContentCopy.default=void 0,_createSvgIcon=_interopRequireDefault(createSvgIcon),_jsxRuntime=require$$2,_default=(0,_createSvgIcon.default)((0,_jsxRuntime.jsx)("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"}),"ContentCopy");function getInputAdornmentUtilityClass(e){return generateUtilityClass("MuiInputAdornment",e)}default_1=ContentCopy.default=_default;const inputAdornmentClasses=generateUtilityClasses("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]);var inputAdornmentClasses$1=inputAdornmentClasses;const _excluded=["children","className","component","disablePointerEvents","disableTypography","position","variant"],overridesResolver=(e,t)=>{const{ownerState:n}=e;return[t.root,t[`position${capitalize(n.position)}`],!0===n.disablePointerEvents&&t.disablePointerEvents,t[n.variant]]},useUtilityClasses=e=>{const{classes:t,disablePointerEvents:n,hiddenLabel:o,position:r,size:a,variant:i}=e,s={root:["root",n&&"disablePointerEvents",r&&`position${capitalize(r)}`,i,o&&"hiddenLabel",a&&`size${capitalize(a)}`]};return composeClasses(s,getInputAdornmentUtilityClass,t)},InputAdornmentRoot=styled("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:overridesResolver})((({theme:e,ownerState:t})=>_extends({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:e.palette.action.active},"filled"===t.variant&&{[`&.${inputAdornmentClasses$1.positionStart}&:not(.${inputAdornmentClasses$1.hiddenLabel})`]:{marginTop:16}},"start"===t.position&&{marginRight:8},"end"===t.position&&{marginLeft:8},!0===t.disablePointerEvents&&{pointerEvents:"none"}))),InputAdornment=React.forwardRef((function(e,t){const n=useThemeProps({props:e,name:"MuiInputAdornment"}),{children:o,className:r,component:a="div",disablePointerEvents:i=!1,disableTypography:s=!1,position:l,variant:d}=n,c=_objectWithoutPropertiesLoose(n,_excluded),u=useFormControl()||{};let p=d;d&&u.variant,u&&!p&&(p=u.variant);const m=_extends({},n,{hiddenLabel:u.hiddenLabel,size:u.size,disablePointerEvents:i,position:l,variant:p}),f=useUtilityClasses(m);return jsx(FormControlContext.Provider,{value:null,children:jsx(InputAdornmentRoot,_extends({as:a,ownerState:m,className:clsx(f.root,r),ref:t},c,{children:"string"!=typeof o||s?jsxs(React.Fragment,{children:["start"===l?jsx("span",{className:"notranslate",dangerouslySetInnerHTML:{__html:"&#8203;"}}):null,o]}):jsx(Typography,{color:"text.secondary",children:o})}))})}));var InputAdornment$1=InputAdornment;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function e(e,t,n,o){return new(n||(n=Promise))((function(r,a){function i(e){try{l(o.next(e))}catch(e){a(e)}}function s(e){try{l(o.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}l((o=o.apply(e,t||[])).next())}))}function t(e,t){var n,o,r,a,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,o&&(r=2&a[0]?o.return:a[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,a[1])).done)return r;switch(o=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,o=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((r=(r=i.trys).length>0&&r[r.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){i.label=a[1];break}if(6===a[0]&&i.label<r[1]){i.label=r[1],r=a;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(a);break}r[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],o=0}finally{n=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}(function(){(console.warn||console.log).apply(console,arguments)}).bind("[clipboard-polyfill]");var i,a,u,c,l="undefined"==typeof navigator?void 0:navigator,d=null==l?void 0:l.clipboard;null===(i=null==d?void 0:d.read)||void 0===i||i.bind(d),null===(a=null==d?void 0:d.readText)||void 0===a||a.bind(d);var f=(null===(u=null==d?void 0:d.write)||void 0===u||u.bind(d),null===(c=null==d?void 0:d.writeText)||void 0===c?void 0:c.bind(d)),p="undefined"==typeof window?void 0:window,v=(null==p||p.ClipboardItem,p);function b(){return"undefined"==typeof ClipboardEvent&&void 0!==v.clipboardData&&void 0!==v.clipboardData.setData}var m=function(){this.success=!1};function h(e,t,n){for(var o in e.success=!0,t){var r=t[o],a=n.clipboardData;a.setData(o,r),"text/plain"===o&&a.getData(o)!==r&&(e.success=!1)}n.preventDefault()}function w(e){var t=new m,n=h.bind(this,t,e);document.addEventListener("copy",n);try{document.execCommand("copy")}finally{document.removeEventListener("copy",n)}return t.success}function g(e,t){x(e);var n=w(t);return E(),n}function x(e){var t=document.getSelection();if(t){var n=document.createRange();n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n)}}function E(){var e=document.getSelection();e&&e.removeAllRanges()}function D(n){return e(this,void 0,void 0,(function(){var e;return t(this,(function(t){if(e="text/plain"in n,b()){if(!e)throw new Error("No `text/plain` value was specified.");if(o=n["text/plain"],v.clipboardData.setData("Text",o))return[2,!0];throw new Error("Copying failed, possibly because the user rejected it.")}var o;return w(n)||navigator.userAgent.indexOf("Edge")>-1||g(document.body,n)||function(e){var t=document.createElement("div");t.setAttribute("style","-webkit-user-select: text !important"),t.textContent="temporary element",document.body.appendChild(t);var n=g(t,e);return document.body.removeChild(t),n}(n)||function(e){var t=document.createElement("div");t.setAttribute("style","-webkit-user-select: text !important");var n=t;t.attachShadow&&(n=t.attachShadow({mode:"open"}));var o=document.createElement("span");o.innerText=e,n.appendChild(o),document.body.appendChild(t),x(o);var r=document.execCommand("copy");return E(),document.body.removeChild(t),r}(n["text/plain"])?[2,!0]:[2,!1]}))}))}function C(n){return e(this,void 0,void 0,(function(){return t(this,(function(e){if(f)return[2,f(n)];if(!D((t=n,o={},o["text/plain"]=t,o)))throw new Error("writeText() failed");var t,o;return[2]}))}))}const ContentWrapper=default_1$1(Grid)((({theme:e})=>({display:"flex",alignItems:"start",flexDirection:"row",[e.breakpoints.down("sm")]:{maxWidth:"100%",flexBasis:"initial"}}))),EmbedField=default_1$1(TextField)((({theme:e})=>({cursor:"grab !important","*":{cursor:"grab !important"},".MuiOutlinedInput-root":{paddingRight:"10px"},input:{padding:"5px",paddingLeft:"14px",paddingRight:"14px",fontSize:".9em"},svg:{height:"0.8em",width:"0.8em"}}))),Content=({embed:e})=>{var t;const n=useParams(),o=useObservableState(useObservable((e=>combineLatest([e,documents$]).pipe(map((([e,t])=>t.get(e[0].contentSlug))))),[n])),r=useCallback((()=>{modifyDocument(__spreadProps(__spreadValues({},o),{isFavourite:!o.isFavourite}))}),[o]),a=useRef(),i=useRef(),s=useCallback((()=>{var e;if(void 0!==n.headingIndex){const t=null==(e=a.current)?void 0:e.querySelector(`#heading-${n.headingIndex}`);t&&(clearTimeout(i.current),i.current=setInterval((()=>{requestAnimationFrame((()=>{const e=window.document.body.getBoundingClientRect().top,n=t.getBoundingClientRect().top-e-60;n>0&&(window.scrollTo({top:n,behavior:"smooth"}),clearTimeout(i.current))}))}),100))}}),[n.headingIndex]),{TableOfContents:l,MarkdownRenderer:d}=useComponentContext();useEffect((()=>(window.scrollTo(0,0),()=>{clearTimeout(i.current)})),[n.contentSlug]);const[c,u]=useState(!1);return jsxs(ContentWrapper,{item:!0,xs:!e&&9,children:[jsx(Snackbar,{sx:{marginTop:"60px"},anchorOrigin:{vertical:"top",horizontal:"right"},open:c,autoHideDuration:6e3,onClose:()=>{u(!1)},children:jsx(Alert,{sx:{boxShadow:1},severity:"success",onClose:()=>{u(!1)},children:"Embed code copied to clipboard!"})}),jsxs(ConditionalCard,{showCard:!e,elevation:2,sx:{padding:e?1:2,textAlign:"justify",overflowX:"auto",flex:"auto",minHeight:"50vh",position:"relative"},children:[!e&&o&&jsx(CardHeader,{action:jsxs(Box,{sx:{display:"flex",alignItems:"center"},children:[jsx(FormControl,{variant:"standard",onMouseDown:e=>{e.preventDefault()},onMouseUp:()=>{C(`<iframe src="${window.location.href.replace("/#/docs","/#/embed")}" title="Talkwalker docs: ${o.name}"></iframe>`).then((()=>{u(!0)}),(()=>{}))},children:jsx(EmbedField,{id:"component-simple",value:`<iframe src="${window.location.href.replace("/#/docs","/#/embed")}" title="Talkwalker docs: ${o.name}"></iframe>`,onChange:e=>{e.preventDefault()},onFocus:e=>{e.preventDefault()},variant:void 0,label:"embed",InputProps:{endAdornment:jsx(InputAdornment$1,{position:"end",children:jsx(default_1,{})})}})}),jsx(IconButton,{"aria-label":"favourite",onClick:r,children:jsx(default_1$2,{sx:{color:o.isFavourite&&"red"}})})]}),title:o.name,subheader:(p=o.lastModified,new Date(p).toLocaleString())}),jsx(CardContent$1,{ref:a,sx:{display:"block",overflow:"auto"},children:jsx(d,{mdx:null==o?void 0:o.mdx,embed:e,onAfterRender:s})})]}),!e&&((null==(t=null==o?void 0:o.mdx)?void 0:t.match(/#/g))||[]).length>1&&jsx(Card,{elevation:2,sx:{textAlign:"justify",overflowX:"auto",marginTop:"20px",marginBottom:"20px",marginLeft:"-10px",overflow:"visible",position:"sticky",padding:"10px",paddingRight:0,top:"100px",display:{sm:"none",md:"flex"}},children:jsx(l,{mdx:null==o?void 0:o.mdx})})]});var p};export{Content,Content as default};