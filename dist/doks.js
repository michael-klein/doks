import { createContext, useContext, lazy } from "react";
import { g as getRegisteredStyles, c as createCache, s as serializeStyles, i as insertStyles, j as jsx, u as useComponentContext, C as ComponentContextProvider, H as HashRouter, a as jsxs, R as Routes, b as Route } from "./main.js";
import { D as DocsThemeProvider } from "./theme.js";
function insertWithoutScoping(cache, serialized) {
  if (cache.inserted[serialized.name] === void 0) {
    return cache.insert("", serialized, cache.sheet, true);
  }
}
function merge(registered, css2, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
  if (registeredStyles.length < 2) {
    return className;
  }
  return rawClassName + css2(registeredStyles);
}
var createEmotion = function createEmotion2(options) {
  var cache = createCache(options);
  cache.sheet.speedy = function(value) {
    this.isSpeedy = value;
  };
  cache.compat = true;
  var css2 = function css3() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var serialized = serializeStyles(args, cache.registered, void 0);
    insertStyles(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };
  var keyframes = function keyframes2() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var serialized = serializeStyles(args, cache.registered);
    var animation = "animation-" + serialized.name;
    insertWithoutScoping(cache, {
      name: serialized.name,
      styles: "@keyframes " + animation + "{" + serialized.styles + "}"
    });
    return animation;
  };
  var injectGlobal2 = function injectGlobal3() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    var serialized = serializeStyles(args, cache.registered);
    insertWithoutScoping(cache, serialized);
  };
  var cx = function cx2() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return merge(cache.registered, css2, classnames(args));
  };
  return {
    css: css2,
    cx,
    injectGlobal: injectGlobal2,
    keyframes,
    hydrate: function hydrate(ids) {
      ids.forEach(function(key) {
        cache.inserted[key] = true;
      });
    },
    flush: function flush() {
      cache.registered = {};
      cache.inserted = {};
      cache.sheet.flush();
    },
    sheet: cache.sheet,
    cache,
    getRegisteredStyles: getRegisteredStyles.bind(null, cache.registered),
    merge: merge.bind(null, cache.registered, css2)
  };
};
var classnames = function classnames2(args) {
  var cls = "";
  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg == null)
      continue;
    var toAdd = void 0;
    switch (typeof arg) {
      case "boolean":
        break;
      case "object": {
        if (Array.isArray(arg)) {
          toAdd = classnames2(arg);
        } else {
          toAdd = "";
          for (var k in arg) {
            if (arg[k] && k) {
              toAdd && (toAdd += " ");
              toAdd += k;
            }
          }
        }
        break;
      }
      default: {
        toAdd = arg;
      }
    }
    if (toAdd) {
      cls && (cls += " ");
      cls += toAdd;
    }
  }
  return cls;
};
var _createEmotion = createEmotion({
  key: "css"
}), injectGlobal = _createEmotion.injectGlobal;
const css = injectGlobal;
css`
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
`;
const docOptionsContext = createContext(void 0);
const {
  Provider
} = docOptionsContext;
const DocOptionsContextProvider = (props) => {
  return /* @__PURE__ */ jsx(Provider, {
    value: props.options,
    children: props.children
  });
};
const useDocOptions = () => useContext(docOptionsContext);
const Docs = lazy(() => import("./docs.js"));
const Editor = lazy(() => import("./editor.js"));
const Embed = lazy(() => import("./embed.js"));
const Doks = (options) => {
  const componentContext = useComponentContext();
  return /* @__PURE__ */ jsx(ComponentContextProvider, {
    value: componentContext,
    children: /* @__PURE__ */ jsx(DocsThemeProvider, {
      children: /* @__PURE__ */ jsx(DocOptionsContextProvider, {
        options,
        children: /* @__PURE__ */ jsx(HashRouter, {
          children: /* @__PURE__ */ jsxs(Routes, {
            children: [/* @__PURE__ */ jsx(Route, {
              path: "/editor/*",
              element: /* @__PURE__ */ jsx(Editor, {})
            }), /* @__PURE__ */ jsx(Route, {
              path: "/docs/*",
              element: /* @__PURE__ */ jsx(Docs, {})
            }), /* @__PURE__ */ jsx(Route, {
              path: "/embed/*",
              element: /* @__PURE__ */ jsx(Embed, {})
            }), /* @__PURE__ */ jsx(Route, {
              path: "*",
              element: /* @__PURE__ */ jsx(Docs, {})
            })]
          })
        })
      })
    })
  });
};
var doks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  Doks,
  "default": Doks
});
export { doks as d, useDocOptions as u };
//# sourceMappingURL=doks.js.map
