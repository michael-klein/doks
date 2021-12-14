var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,t,r)=>t in e?__defProp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,__spreadValues=(e,t)=>{for(var r in t||(t={}))__hasOwnProp.call(t,r)&&__defNormalProp(e,r,t[r]);if(__getOwnPropSymbols)for(var r of __getOwnPropSymbols(t))__propIsEnum.call(t,r)&&__defNormalProp(e,r,t[r]);return e},__spreadProps=(e,t)=>__defProps(e,__getOwnPropDescs(t));import{d as default_1$3}from"./Menu.js";import{i as interopRequireDefault,d as default_1$2,B as Box}from"./styled.js";import*as React from"react";import React__default,{memo,useMemo,useRef,useCallback,useEffect,useState}from"react";import{combineLatest}from"rxjs";import{map}from"rxjs/operators";import{m as modifyDocument,d as documents$}from"./documents.js";import{h as htmdx,M as MarkdownRenderer}from"./markdown_renderer.js";import{u as useParams,L as Link}from"./doks.js";import{c as createSvgIcon,r as require$$2,T as Typography,u as useObservableState,b as useObservable,I as IconButton}from"./IconButton.js";import{g as generateUtilityClass,f as generateUtilityClasses,s as styled,h as useThemeProps,i as _objectWithoutPropertiesLoose,_ as _extends,k as composeClasses,j as jsx,l as clsx,d as jsxs,F as Fragment,m as capitalize}from"./main.js";import{C as ConditionalCard}from"./conditional_card.js";import{G as Grid}from"./Grid.js";import{T as TextField}from"./TextField.js";import{S as Snackbar,A as Alert}from"./Alert.js";import{C as CardHeader}from"./CardHeader.js";import{F as FormControl}from"./Input.js";import{u as useFormControl,F as FormControlContext}from"./InputBase.js";import{C as Card}from"./Card.js";import"./react-is.production.min.js";import"./isHostComponent.js";import"react-dom";import"./index.js";import"./Close.js";function getCardContentUtilityClass(e){return generateUtilityClass("MuiCardContent",e)}generateUtilityClasses("MuiCardContent",["root"]);const _excluded$1=["className","component"],useUtilityClasses$1=e=>{const{classes:t}=e;return composeClasses({root:["root"]},getCardContentUtilityClass,t)},CardContentRoot=styled("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}}))),CardContent=React.forwardRef((function(e,t){const r=useThemeProps({props:e,name:"MuiCardContent"}),{className:n,component:o="div"}=r,a=_objectWithoutPropertiesLoose(r,_excluded$1),i=_extends({},r,{component:o}),s=useUtilityClasses$1(i);return jsx(CardContentRoot,_extends({as:o,className:clsx(s.root,n),ownerState:i,ref:t},a))}));var CardContent$1=CardContent;const formatDate=e=>new Date(e).toLocaleString();var SubdirectoryArrowRight={},_interopRequireDefault$1=interopRequireDefault.exports;Object.defineProperty(SubdirectoryArrowRight,"__esModule",{value:!0});var default_1$1=SubdirectoryArrowRight.default=void 0,_createSvgIcon$1=_interopRequireDefault$1(createSvgIcon),_jsxRuntime$1=require$$2,_default$1=(0,_createSvgIcon$1.default)((0,_jsxRuntime$1.jsx)("path",{d:"m19 15-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"}),"SubdirectoryArrowRight");default_1$1=SubdirectoryArrowRight.default=_default$1;var removeMarkdown=function(e,t){(t=t||{}).listUnicodeChar=!!t.hasOwnProperty("listUnicodeChar")&&t.listUnicodeChar,t.stripListLeaders=!t.hasOwnProperty("stripListLeaders")||t.stripListLeaders,t.gfm=!t.hasOwnProperty("gfm")||t.gfm,t.useImgAltText=!t.hasOwnProperty("useImgAltText")||t.useImgAltText;var r=e||"";r=r.replace(/^(-\s*?|\*\s*?|_\s*?){3,}\s*$/gm,"");try{t.stripListLeaders&&(r=t.listUnicodeChar?r.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm,t.listUnicodeChar+" $1"):r.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm,"$1")),t.gfm&&(r=r.replace(/\n={2,}/g,"\n").replace(/~{3}.*\n/g,"").replace(/~~/g,"").replace(/`{3}.*\n/g,"")),r=r.replace(/<[^>]*>/g,"").replace(/^[=\-]{2,}\s*$/g,"").replace(/\[\^.+?\](\: .*?$)?/g,"").replace(/\s{0,2}\[.*?\]: .*?$/g,"").replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g,t.useImgAltText?"$1":"").replace(/\[(.*?)\][\[\(].*?[\]\)]/g,"$1").replace(/^\s{0,3}>\s?/g,"").replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g,"").replace(/^(\n)?\s{0,}#{1,6}\s+| {0,}(\n)?\s{0,}#{0,} {0,}(\n)?\s{0,}$/gm,"$1$2$3").replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g,"$2").replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g,"$2").replace(/(`{3,})(.*?)\1/gm,"$2").replace(/`(.+?)`/g,"$1").replace(/\n{2,}/g,"\n\n")}catch(t){return console.error(t),e}return r};class ErrorBoundary extends React__default.Component{constructor(e){super(e),this.state={hasError:!1,error:""}}componentDidCatch(e,t){}static getDerivedStateFromError(e){return{hasError:!0,error:e.message}}render(){return this.state.hasError?(console.error("toc error",this.state.error),jsxs(Fragment,{children:[jsx("h1",{children:"MDX error:"}),jsx("div",{children:this.state.error})]})):this.props.children}}const TOCList=default_1$2("ul")({listStyle:"none",margin:0,padding:10,paddingLeft:0,lineHeight:"1.3em",maxHeight:"calc(60vh)",overflowY:"auto"}),TOCListItem=default_1$2("li")({fontSize:".9em","a,a:hover,a:link,a:active":{color:"inherit",textDecoration:"none",textAlign:"left"},"a:hover":{textDecoration:"underline"}}),getListItem=e=>t=>{const r=useParams(),n=useRef();return jsxs(TOCListItem,{sx:{marginLeft:10*(e-1)+"px",display:"flex"},children:[jsx(Box,{children:jsx(default_1$1,{sx:{fontSize:".8em",marginRight:".2em"},className:"sub-icon"})}),jsx(Box,{children:jsx(Link,__spreadProps(__spreadValues({},t),{ref:n,to:`/docs/${r.projectSlug}/${r.contentSlug}/${t.index}`}))})]})},TOC=memo((({mdx:e})=>{const t=useMemo((()=>null==e?void 0:e.replace(/(<([^>]+)>)/gi,"").split("\n").filter((e=>e.startsWith("#"))).map((e=>{for(let t=0;t<e.length;t++)if("#"!==e.charAt(t))return e.substr(0,t-1)+removeMarkdown(e.substr(t));return e})).join("\n")),[e]);let r=0,n=0;return jsx(Fragment,{children:void 0!==t?jsx(TOCList,{children:htmdx(t,React__default.createElement,{components:{h1:getListItem(1),h2:getListItem(2),h3:getListItem(3),h4:getListItem(4),h6:getListItem(6),h7:getListItem(7),h8:getListItem(8),h10:getListItem(10)},jsxTransforms:[(e,t,o)=>(t||(t={}),e.startsWith("h")&&(t.index=n,n++),t.key=r++,[e,t,o])]})}):jsx(Fragment,{})})})),Wrapper=default_1$2(Box)((({theme:e})=>__spreadProps(__spreadValues({},e.typography.body1),{width:"220px"}))),Header=default_1$2("h1")({fontSize:"1em",marginBottom:"-.7em",fontWeight:"bold"}),TableOfContents=({mdx:e})=>jsxs(Wrapper,{children:[jsx(Header,{children:"Table of contents"}),jsx(ErrorBoundary,{children:jsx(TOC,{mdx:e})},"toc-"+e)]});var ContentCopy={},_interopRequireDefault=interopRequireDefault.exports;Object.defineProperty(ContentCopy,"__esModule",{value:!0});var default_1=ContentCopy.default=void 0,_createSvgIcon=_interopRequireDefault(createSvgIcon),_jsxRuntime=require$$2,_default=(0,_createSvgIcon.default)((0,_jsxRuntime.jsx)("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"}),"ContentCopy");function getInputAdornmentUtilityClass(e){return generateUtilityClass("MuiInputAdornment",e)}default_1=ContentCopy.default=_default;const inputAdornmentClasses=generateUtilityClasses("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]);var inputAdornmentClasses$1=inputAdornmentClasses;const _excluded=["children","className","component","disablePointerEvents","disableTypography","position","variant"],overridesResolver=(e,t)=>{const{ownerState:r}=e;return[t.root,t[`position${capitalize(r.position)}`],!0===r.disablePointerEvents&&t.disablePointerEvents,t[r.variant]]},useUtilityClasses=e=>{const{classes:t,disablePointerEvents:r,hiddenLabel:n,position:o,size:a,variant:i}=e,s={root:["root",r&&"disablePointerEvents",o&&`position${capitalize(o)}`,i,n&&"hiddenLabel",a&&`size${capitalize(a)}`]};return composeClasses(s,getInputAdornmentUtilityClass,t)},InputAdornmentRoot=styled("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:overridesResolver})((({theme:e,ownerState:t})=>_extends({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:e.palette.action.active},"filled"===t.variant&&{[`&.${inputAdornmentClasses$1.positionStart}&:not(.${inputAdornmentClasses$1.hiddenLabel})`]:{marginTop:16}},"start"===t.position&&{marginRight:8},"end"===t.position&&{marginLeft:8},!0===t.disablePointerEvents&&{pointerEvents:"none"}))),InputAdornment=React.forwardRef((function(e,t){const r=useThemeProps({props:e,name:"MuiInputAdornment"}),{children:n,className:o,component:a="div",disablePointerEvents:i=!1,disableTypography:s=!1,position:l,variant:d}=r,c=_objectWithoutPropertiesLoose(r,_excluded),u=useFormControl()||{};let p=d;d&&u.variant,u&&!p&&(p=u.variant);const m=_extends({},r,{hiddenLabel:u.hiddenLabel,size:u.size,disablePointerEvents:i,position:l,variant:p}),f=useUtilityClasses(m);return jsx(FormControlContext.Provider,{value:null,children:jsx(InputAdornmentRoot,_extends({as:a,ownerState:m,className:clsx(f.root,o),ref:t},c,{children:"string"!=typeof n||s?jsxs(React.Fragment,{children:["start"===l?jsx("span",{className:"notranslate",dangerouslySetInnerHTML:{__html:"&#8203;"}}):null,n]}):jsx(Typography,{color:"text.secondary",children:n})}))})}));var InputAdornment$1=InputAdornment;
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
***************************************************************************** */function e(e,t,r,n){return new(r||(r=Promise))((function(o,a){function i(e){try{l(n.next(e))}catch(e){a(e)}}function s(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,s)}l((n=n.apply(e,t||[])).next())}))}function t(e,t){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,n=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}(function(){(console.warn||console.log).apply(console,arguments)}).bind("[clipboard-polyfill]");var i,a,u,c,l="undefined"==typeof navigator?void 0:navigator,d=null==l?void 0:l.clipboard;null===(i=null==d?void 0:d.read)||void 0===i||i.bind(d),null===(a=null==d?void 0:d.readText)||void 0===a||a.bind(d);var f=(null===(u=null==d?void 0:d.write)||void 0===u||u.bind(d),null===(c=null==d?void 0:d.writeText)||void 0===c?void 0:c.bind(d)),p="undefined"==typeof window?void 0:window,v=(null==p||p.ClipboardItem,p);function b(){return"undefined"==typeof ClipboardEvent&&void 0!==v.clipboardData&&void 0!==v.clipboardData.setData}var m=function(){this.success=!1};function h(e,t,r){for(var n in e.success=!0,t){var o=t[n],a=r.clipboardData;a.setData(n,o),"text/plain"===n&&a.getData(n)!==o&&(e.success=!1)}r.preventDefault()}function w(e){var t=new m,r=h.bind(this,t,e);document.addEventListener("copy",r);try{document.execCommand("copy")}finally{document.removeEventListener("copy",r)}return t.success}function g(e,t){x(e);var r=w(t);return E(),r}function x(e){var t=document.getSelection();if(t){var r=document.createRange();r.selectNodeContents(e),t.removeAllRanges(),t.addRange(r)}}function E(){var e=document.getSelection();e&&e.removeAllRanges()}function D(r){return e(this,void 0,void 0,(function(){var e;return t(this,(function(t){if(e="text/plain"in r,b()){if(!e)throw new Error("No `text/plain` value was specified.");if(n=r["text/plain"],v.clipboardData.setData("Text",n))return[2,!0];throw new Error("Copying failed, possibly because the user rejected it.")}var n;return w(r)||navigator.userAgent.indexOf("Edge")>-1||g(document.body,r)||function(e){var t=document.createElement("div");t.setAttribute("style","-webkit-user-select: text !important"),t.textContent="temporary element",document.body.appendChild(t);var r=g(t,e);return document.body.removeChild(t),r}(r)||function(e){var t=document.createElement("div");t.setAttribute("style","-webkit-user-select: text !important");var r=t;t.attachShadow&&(r=t.attachShadow({mode:"open"}));var n=document.createElement("span");n.innerText=e,r.appendChild(n),document.body.appendChild(t),x(n);var o=document.execCommand("copy");return E(),document.body.removeChild(t),o}(r["text/plain"])?[2,!0]:[2,!1]}))}))}function C(r){return e(this,void 0,void 0,(function(){return t(this,(function(e){if(f)return[2,f(r)];if(!D((t=r,n={},n["text/plain"]=t,n)))throw new Error("writeText() failed");var t,n;return[2]}))}))}const ContentWrapper=default_1$2(Grid)((({theme:e})=>({display:"flex",alignItems:"start",flexDirection:"row",[e.breakpoints.down("sm")]:{maxWidth:"100%",flexBasis:"initial"}}))),EmbedField=default_1$2(TextField)((({theme:e})=>({cursor:"grab !important","*":{cursor:"grab !important"},".MuiOutlinedInput-root":{paddingRight:"10px"},input:{padding:"5px",paddingLeft:"14px",paddingRight:"14px",fontSize:".9em"},svg:{height:"0.8em",width:"0.8em"}}))),Content=({embed:e})=>{var t;const r=useParams(),n=useObservableState(useObservable((e=>combineLatest([e,documents$]).pipe(map((([e,t])=>t.get(e[0].contentSlug))))),[r])),o=useCallback((()=>{modifyDocument(__spreadProps(__spreadValues({},n),{isFavourite:!n.isFavourite}))}),[n]),a=useRef(),i=useRef(),s=useCallback((()=>{var e;if(void 0!==r.headingIndex){const t=null==(e=a.current)?void 0:e.querySelector(`#heading-${r.headingIndex}`);t&&(clearTimeout(i.current),i.current=setInterval((()=>{requestAnimationFrame((()=>{const e=window.document.body.getBoundingClientRect().top,r=t.getBoundingClientRect().top-e-60;r>0&&(window.scrollTo({top:r,behavior:"smooth"}),clearTimeout(i.current))}))}),100))}}),[r.headingIndex]);useEffect((()=>(window.scrollTo(0,0),()=>{clearTimeout(i.current)})),[r.contentSlug]);const[l,d]=useState(!1);return jsxs(ContentWrapper,{item:!0,xs:!e&&9,children:[jsx(Snackbar,{sx:{marginTop:"60px"},anchorOrigin:{vertical:"top",horizontal:"right"},open:l,autoHideDuration:6e3,onClose:()=>{d(!1)},children:jsx(Alert,{sx:{boxShadow:1},severity:"success",onClose:()=>{d(!1)},children:"Embed code copied to clipboard!"})}),jsxs(ConditionalCard,{showCard:!e,elevation:2,sx:{padding:e?1:2,textAlign:"justify",overflowX:"auto",flex:"auto",minHeight:"50vh",position:"relative"},children:[!e&&n&&jsx(CardHeader,{action:jsxs(Box,{sx:{display:"flex",alignItems:"center"},children:[jsx(FormControl,{variant:"standard",onMouseDown:e=>{e.preventDefault()},onMouseUp:()=>{C(`<iframe src="${window.location.href.replace("/#/docs","/#/embed")}" title="Talkwalker docs: ${n.name}"></iframe>`).then((()=>{d(!0)}),(()=>{}))},children:jsx(EmbedField,{id:"component-simple",value:`<iframe src="${window.location.href.replace("/#/docs","/#/embed")}" title="Talkwalker docs: ${n.name}"></iframe>`,onChange:e=>{e.preventDefault()},onFocus:e=>{e.preventDefault()},variant:void 0,label:"embed",InputProps:{endAdornment:jsx(InputAdornment$1,{position:"end",children:jsx(default_1,{})})}})}),jsx(IconButton,{"aria-label":"favourite",onClick:o,children:jsx(default_1$3,{sx:{color:n.isFavourite&&"red"}})})]}),title:n.name,subheader:(c=n.lastModified,new Date(c).toLocaleString())}),jsx(CardContent$1,{ref:a,sx:{display:"block",overflow:"auto"},children:jsx(MarkdownRenderer,{mdx:null==n?void 0:n.mdx,embed:e,onAfterRender:s})})]}),!e&&((null==(t=null==n?void 0:n.mdx)?void 0:t.match(/#/g))||[]).length>1&&jsx(Card,{elevation:2,sx:{textAlign:"justify",overflowX:"auto",marginTop:"20px",marginBottom:"20px",marginLeft:"-10px",overflow:"visible",position:"sticky",padding:"10px",paddingRight:0,top:"100px",display:{sm:"none",md:"flex"}},children:jsx(TableOfContents,{mdx:null==n?void 0:n.mdx})})]});var c};export{Content,Content as default};