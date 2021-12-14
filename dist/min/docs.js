import*as React from"react";import{lazy,Suspense,useCallback}from"react";import{B as Background}from"./background.js";import{i as interopRequireDefault,d as default_1$2,C as Container}from"./styled.js";import{c as createSvgIcon,r as require$$2,a as createSvgIcon$1,B as ButtonBase,T as Typography}from"./IconButton.js";import{j as jsx,d as jsxs,s as styled,_ as _extends,e as emphasize,g as generateUtilityClass,f as generateUtilityClasses,h as useThemeProps,i as _objectWithoutPropertiesLoose,k as composeClasses,l as clsx,F as Fragment,C as CircularProgress}from"./main.js";import{B as Button,a as Box}from"./Button.js";import{q as queuedDocuments$,f as fetchingDocuments$,d as documents$}from"./documents.js";import{u as useObservableAndState}from"./use_observable_and_state.js";import{combineLatest,map}from"rxjs";import{R as Routes,a as Route,u as useParams,b as useNavigate}from"./doks.js";import{S as Snackbar,A as Alert}from"./Alert.js";import"./react-is.production.min.js";import{G as Grid}from"./Grid.js";import"rxjs/operators";import"react-dom";import"./Close.js";var KeyboardArrowUp={},_interopRequireDefault$1=interopRequireDefault.exports;Object.defineProperty(KeyboardArrowUp,"__esModule",{value:!0});var default_1$1=KeyboardArrowUp.default=void 0,_createSvgIcon$1=_interopRequireDefault$1(createSvgIcon),_jsxRuntime$1=require$$2,_default$1=(0,_createSvgIcon$1.default)((0,_jsxRuntime$1.jsx)("path",{d:"M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"}),"KeyboardArrowUp");default_1$1=KeyboardArrowUp.default=_default$1;const StyledFooter=default_1$2("footer")((({theme:e})=>({background:e.palette.primary.light,padding:20,display:"flex",justifyContent:"flex-end"}))),UpButton=default_1$2(Button)((({theme:e})=>({color:e.palette.primary.dark}))),Footer=()=>jsx(StyledFooter,{children:jsxs(UpButton,{onClick:()=>{window.scrollTo(0,0)},children:[jsx(default_1$1,{}),"up"]})});var MoreHorizIcon=createSvgIcon$1(jsx("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz");const BreadcrumbCollapsedButton=styled(ButtonBase,{skipSx:!0})((({theme:e})=>_extends({display:"flex",marginLeft:e.spacing(.5),marginRight:e.spacing(.5)},"light"===e.palette.mode?{backgroundColor:e.palette.grey[100],color:e.palette.grey[700]}:{backgroundColor:e.palette.grey[700],color:e.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":_extends({},"light"===e.palette.mode?{backgroundColor:e.palette.grey[200]}:{backgroundColor:e.palette.grey[600]}),"&:active":_extends({boxShadow:e.shadows[0]},"light"===e.palette.mode?{backgroundColor:emphasize(e.palette.grey[200],.12)}:{backgroundColor:emphasize(e.palette.grey[600],.12)})}))),BreadcrumbCollapsedIcon=styled(MoreHorizIcon)({width:24,height:16});function BreadcrumbCollapsed(e){return jsx("li",{children:jsx(BreadcrumbCollapsedButton,_extends({focusRipple:!0},e,{ownerState:e,children:jsx(BreadcrumbCollapsedIcon,{ownerState:e})}))})}function getBreadcrumbsUtilityClass(e){return generateUtilityClass("MuiBreadcrumbs",e)}const breadcrumbsClasses=generateUtilityClasses("MuiBreadcrumbs",["root","ol","li","separator"]);var breadcrumbsClasses$1=breadcrumbsClasses;const _excluded=["children","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],useUtilityClasses=e=>{const{classes:r}=e;return composeClasses({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},getBreadcrumbsUtilityClass,r)},BreadcrumbsRoot=styled(Typography,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:(e,r)=>[{[`& .${breadcrumbsClasses$1.li}`]:r.li},r.root]})({}),BreadcrumbsOl=styled("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:(e,r)=>r.ol})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),BreadcrumbsSeparator=styled("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:(e,r)=>r.separator})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function insertSeparators(e,r,t,s){return e.reduce(((a,o,l)=>(l<e.length-1?a=a.concat(o,jsx(BreadcrumbsSeparator,{"aria-hidden":!0,className:r,ownerState:s,children:t},`separator-${l}`)):a.push(o),a)),[])}const Breadcrumbs=React.forwardRef((function(e,r){const t=useThemeProps({props:e,name:"MuiBreadcrumbs"}),{children:s,className:a,component:o="nav",expandText:l="Show path",itemsAfterCollapse:n=1,itemsBeforeCollapse:c=1,maxItems:i=8,separator:d="/"}=t,u=_objectWithoutPropertiesLoose(t,_excluded),[p,m]=React.useState(!1),x=_extends({},t,{component:o,expanded:p,expandText:l,itemsAfterCollapse:n,itemsBeforeCollapse:c,maxItems:i,separator:d}),g=useUtilityClasses(x),h=React.useRef(null),j=React.Children.toArray(s).filter((e=>React.isValidElement(e))).map(((e,r)=>jsx("li",{className:g.li,children:e},`child-${r}`)));return jsx(BreadcrumbsRoot,_extends({ref:r,component:o,color:"text.secondary",className:clsx(g.root,a),ownerState:x},u,{children:jsx(BreadcrumbsOl,{className:g.ol,ref:h,ownerState:x,children:insertSeparators(p||i&&j.length<=i?j:(f=j,c+n>=f.length?f:[...f.slice(0,c),jsx(BreadcrumbCollapsed,{"aria-label":l,onClick:()=>{m(!0);const e=h.current.querySelector("a[href],button,[tabindex]");e&&e.focus()}},"ellipsis"),...f.slice(f.length-n,f.length)]),g.separator,d,x)})}));var f}));var Breadcrumbs$1=Breadcrumbs,Folder={},_interopRequireDefault=interopRequireDefault.exports;Object.defineProperty(Folder,"__esModule",{value:!0});var default_1=Folder.default=void 0,_createSvgIcon=_interopRequireDefault(createSvgIcon),_jsxRuntime=require$$2,_default=(0,_createSvgIcon.default)((0,_jsxRuntime.jsx)("path",{d:"M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"}),"Folder");default_1=Folder.default=_default;const DocFetcher=lazy((()=>import("./doc_fetcher.js"))),Sidebar=lazy((()=>import("./sidebar.js"))),Content=lazy((()=>import("./content.js"))),Navbar=lazy((()=>import("./navbar.js"))),Project=()=>{const e=useParams();return jsx(Fragment,{children:e.contentSlug&&jsx(Suspense,{fallback:jsx(CircularProgress,{sx:{position:"absolute",top:"50%",left:"50%"}}),children:jsx(Content,{})})})},Layout=({children:e})=>{const[r]=useObservableAndState((()=>combineLatest([queuedDocuments$,fetchingDocuments$]).pipe(map((([e,r])=>e.docs.size>0||r.size>0))))),t=useParams(),s=useNavigate(),a=useCallback((e=>{documents$.value.has(e)&&s(`/docs/${t.projectSlug}/${e}`,{replace:!0})}),[t]);return jsxs(Background,{children:[jsx(Snackbar,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:r,sx:{display:{xs:"none",sm:"block"}},children:jsx(Alert,{sx:{boxShadow:1},severity:"info",icon:!1,children:jsxs(Box,{sx:{display:"flex",alignItems:"center"},children:[jsx(CircularProgress,{size:18,sx:{marginRight:1}})," ","fetching documents in the background..."]})})}),jsx(DocFetcher,{mode:"docs"}),jsx(Navbar,{}),jsxs(Container,{sx:{paddingTop:6,marginBottom:10,flex:"auto"},children:[jsxs(Breadcrumbs$1,{"aria-label":"breadcrumb",sx:{height:50,alignItems:"center",justifyContent:"center",display:{xs:"none",sm:"flex"}},children:[jsx(default_1,{sx:{fontSize:"1.1em",color:"text.secondary",transform:"translateY(0.15em)"}}),t.projectSlug&&jsx(Typography,{color:"text.secondary",children:t.projectSlug}),t.contentSlug&&jsx(Typography,{color:"text.secondary",children:t.contentSlug}),t.headingIndex&&jsx(Typography,{color:"text.secondary",children:t.headingIndex})]}),jsxs(Grid,{container:!0,spacing:2,children:[jsx(Sidebar,{onProjectSelect:e=>{s(`/docs/${e}`,{replace:!0})},onNodeSelect:a,mode:"docs"}),e]})]}),jsx(Footer,{})]})},Docs=()=>jsxs(Routes,{children:[jsx(Route,{path:"/:projectSlug",element:jsx(Layout,{children:jsx(Project,{})})}),jsx(Route,{path:"/:projectSlug/:contentSlug",element:jsx(Layout,{children:jsx(Project,{})})}),jsx(Route,{path:"/:projectSlug/:contentSlug/:headingIndex",element:jsx(Layout,{children:jsx(Project,{})})}),jsx(Route,{path:"/",element:jsx(Layout,{children:jsx(Project,{})})})]});export{Docs,Docs as default};