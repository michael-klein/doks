import{createContext,useContext,lazy}from"react";import{g as getRegisteredStyles,c as createCache,s as serializeStyles,i as insertStyles,j as jsx,u as useComponentContext,C as ComponentContextProvider,H as HashRouter,a as jsxs,R as Routes,b as Route}from"./main.js";import{D as DocsThemeProvider}from"./theme.js";function insertWithoutScoping(e,t){if(void 0===e.inserted[t.name])return e.insert("",t,e.sheet,!0)}function merge(e,t,o){var r=[],s=getRegisteredStyles(e,r,o);return r.length<2?o:s+t(r)}var createEmotion=function(e){var t=createCache(e);t.sheet.speedy=function(e){this.isSpeedy=e},t.compat=!0;var o=function(){for(var e=arguments.length,o=new Array(e),r=0;r<e;r++)o[r]=arguments[r];var s=serializeStyles(o,t.registered,void 0);return insertStyles(t,s,!1),t.key+"-"+s.name};return{css:o,cx:function(){for(var e=arguments.length,r=new Array(e),s=0;s<e;s++)r[s]=arguments[s];return merge(t.registered,o,classnames(r))},injectGlobal:function(){for(var e=arguments.length,o=new Array(e),r=0;r<e;r++)o[r]=arguments[r];var s=serializeStyles(o,t.registered);insertWithoutScoping(t,s)},keyframes:function(){for(var e=arguments.length,o=new Array(e),r=0;r<e;r++)o[r]=arguments[r];var s=serializeStyles(o,t.registered),i="animation-"+s.name;return insertWithoutScoping(t,{name:s.name,styles:"@keyframes "+i+"{"+s.styles+"}"}),i},hydrate:function(e){e.forEach((function(e){t.inserted[e]=!0}))},flush:function(){t.registered={},t.inserted={},t.sheet.flush()},sheet:t.sheet,cache:t,getRegisteredStyles:getRegisteredStyles.bind(null,t.registered),merge:merge.bind(null,t.registered,o)}},classnames=function e(t){for(var o="",r=0;r<t.length;r++){var s=t[r];if(null!=s){var i=void 0;switch(typeof s){case"boolean":break;case"object":if(Array.isArray(s))i=e(s);else for(var n in i="",s)s[n]&&n&&(i&&(i+=" "),i+=n);break;default:i=s}i&&(o&&(o+=" "),o+=i)}}return o},_createEmotion=createEmotion({key:"css"}),injectGlobal=_createEmotion.injectGlobal;const css=injectGlobal;css`
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body,
  html {
    min-height: 100vh;
  }

  .docs-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
  ul[role="list"],
  ol[role="list"] {
    list-style: none;
  }

  /* Set core root defaults */
  html:focus-within {
    scroll-behavior: smooth;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  img,
  picture {
    max-width: 100%;
    display: block;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  h1:not(:first-child),
  h2:not(:first-child),
  h3:not(:first-child),
  p:not(:first-child) {
    margin-top: 1em;
    margin-bottom: 0.2em;
  }
`;const docOptionsContext=createContext(void 0),{Provider:Provider}=docOptionsContext,DocOptionsContextProvider=e=>jsx(Provider,{value:e.options,children:e.children}),useDocOptions=()=>useContext(docOptionsContext),Docs=lazy((()=>import("./docs.js"))),Editor=lazy((()=>import("./editor.js"))),Embed=lazy((()=>import("./embed.js"))),Doks=e=>{const t=useComponentContext();return jsx(ComponentContextProvider,{value:t,children:jsx(DocsThemeProvider,{children:jsx(DocOptionsContextProvider,{options:e,children:jsx(HashRouter,{children:jsxs(Routes,{children:[jsx(Route,{path:"/editor/*",element:jsx(Editor,{})}),jsx(Route,{path:"/docs/*",element:jsx(Docs,{})}),jsx(Route,{path:"/embed/*",element:jsx(Embed,{})}),jsx(Route,{path:"*",element:jsx(Docs,{})})]})})})})})};var doks=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",Doks:Doks,default:Doks});export{doks as d,useDocOptions as u};