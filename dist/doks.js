import * as React from "react";
import { createContext, useContext, useState, useEffect, useMemo, lazy } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { u as useTheme, j as jsx, T as ThemeContext, _ as _extends, a as useTheme$1, b as ThemeContext$1, c as createTheme, d as jsxs } from "./main.js";
const hasSymbol = typeof Symbol === "function" && Symbol.for;
var nested = hasSymbol ? Symbol.for("mui.nested") : "__THEME_NESTED__";
function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === "function") {
    const mergedTheme = localTheme(outerTheme);
    return mergedTheme;
  }
  return _extends({}, outerTheme, localTheme);
}
function ThemeProvider$1(props) {
  const {
    children,
    theme: localTheme
  } = props;
  const outerTheme = useTheme();
  const theme = React.useMemo(() => {
    const output = outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);
    if (output != null) {
      output[nested] = outerTheme !== null;
    }
    return output;
  }, [localTheme, outerTheme]);
  return /* @__PURE__ */ jsx(ThemeContext.Provider, {
    value: theme,
    children
  });
}
function InnerThemeProvider(props) {
  const theme = useTheme$1();
  return /* @__PURE__ */ jsx(ThemeContext$1.Provider, {
    value: typeof theme === "object" ? theme : {},
    children: props.children
  });
}
function ThemeProvider(props) {
  const {
    children,
    theme: localTheme
  } = props;
  return /* @__PURE__ */ jsx(ThemeProvider$1, {
    theme: localTheme,
    children: /* @__PURE__ */ jsx(InnerThemeProvider, {
      children
    })
  });
}
createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0d47a1"
    },
    secondary: {
      main: "#ad1457"
    }
  }
});
const ColorModeContext = createContext({
  toggleColorMode: () => {
  },
  mode: void 0
});
const useColorModeContext = () => {
  return useContext(ColorModeContext);
};
const COLOR_MODE_KEY = "color-mode";
const DocsThemeProvider = ({
  children
}) => {
  var _a;
  const [mode, setMode] = useState((_a = localStorage.getItem(COLOR_MODE_KEY)) != null ? _a : "light");
  useEffect(() => {
    localStorage.setItem(COLOR_MODE_KEY, mode);
  }, [mode]);
  const value = useMemo(() => {
    return {
      toggleColorMode: () => {
        setMode((m) => m === "light" ? "dark" : "light");
      },
      mode
    };
  }, [mode]);
  const theme2 = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: "#0d47a1"
      },
      secondary: {
        main: "#ad1457"
      }
    }
  }), [mode]);
  return /* @__PURE__ */ jsx(ColorModeContext.Provider, {
    value,
    children: /* @__PURE__ */ jsx(ThemeProvider, {
      theme: theme2,
      children
    })
  });
};
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
  return /* @__PURE__ */ jsx(DocsThemeProvider, {
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
  });
};
var doks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  Doks,
  "default": Doks
});
export { useColorModeContext as a, doks as d, useDocOptions as u };
//# sourceMappingURL=doks.js.map
