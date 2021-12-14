import { lazy, Suspense, useCallback } from "react";
import { B as Background } from "./background.js";
import { i as interopRequireDefault, d as default_1$1, C as Container } from "./styled.js";
import { c as createSvgIcon, r as require$$2 } from "./jsx-runtime_commonjs-proxy.js";
import { j as jsx, d as jsxs, F as Fragment, C as CircularProgress } from "./main.js";
import { B as Button } from "./Button.js";
import { d as documents$ } from "./documents.js";
import { R as Routes, a as Route, u as useParams, b as useNavigate } from "./doks.js";
import { G as Grid } from "./Grid.js";
import "react-dom";
import "rxjs";
var KeyboardArrowUp = {};
var _interopRequireDefault = interopRequireDefault.exports;
Object.defineProperty(KeyboardArrowUp, "__esModule", {
  value: true
});
var default_1 = KeyboardArrowUp.default = void 0;
var _createSvgIcon = _interopRequireDefault(createSvgIcon);
var _jsxRuntime = require$$2;
var _default = (0, _createSvgIcon.default)(/* @__PURE__ */ (0, _jsxRuntime.jsx)("path", {
  d: "M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"
}), "KeyboardArrowUp");
default_1 = KeyboardArrowUp.default = _default;
const StyledFooter = default_1$1("footer")(({
  theme
}) => ({
  background: theme.palette.primary.light,
  padding: 20,
  display: "flex",
  justifyContent: "flex-end"
}));
const UpButton = default_1$1(Button)(({
  theme
}) => ({
  color: theme.palette.primary.dark
}));
const Footer = () => {
  return /* @__PURE__ */ jsx(StyledFooter, {
    children: /* @__PURE__ */ jsxs(UpButton, {
      onClick: () => {
        window.scrollTo(0, 0);
      },
      children: [/* @__PURE__ */ jsx(default_1, {}), "up"]
    })
  });
};
const DocFetcher = lazy(() => import("./doc_fetcher.js"));
const Sidebar = lazy(() => import("./sidebar.js"));
const Content = lazy(() => import("./content.js"));
const Navbar = lazy(() => import("./navbar.js"));
const Project = () => {
  const params = useParams();
  return /* @__PURE__ */ jsx(Fragment, {
    children: params.contentSlug && /* @__PURE__ */ jsx(Suspense, {
      fallback: /* @__PURE__ */ jsx(CircularProgress, {
        sx: {
          position: "absolute",
          top: "50%",
          left: "50%"
        }
      }),
      children: /* @__PURE__ */ jsx(Content, {})
    })
  });
};
const Layout = ({
  children
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const onNodeSelect = useCallback((nodeId) => {
    if (documents$.value.has(nodeId)) {
      navigate(`/docs/${params.projectSlug}/${nodeId}`, {
        replace: true
      });
    }
  }, [params]);
  return /* @__PURE__ */ jsxs(Background, {
    children: [/* @__PURE__ */ jsx(DocFetcher, {
      mode: "docs"
    }), /* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Container, {
      sx: {
        paddingTop: 10,
        marginBottom: 10,
        flex: "auto"
      },
      children: /* @__PURE__ */ jsxs(Grid, {
        container: true,
        spacing: 2,
        children: [/* @__PURE__ */ jsx(Sidebar, {
          onProjectSelect: (projectSlug) => {
            navigate(`/docs/${projectSlug}`, {
              replace: true
            });
          },
          onNodeSelect,
          mode: "docs"
        }), children]
      })
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
};
const Docs = () => {
  return /* @__PURE__ */ jsxs(Routes, {
    children: [/* @__PURE__ */ jsx(Route, {
      path: "/:projectSlug",
      element: /* @__PURE__ */ jsx(Layout, {
        children: /* @__PURE__ */ jsx(Project, {})
      })
    }), /* @__PURE__ */ jsx(Route, {
      path: "/:projectSlug/:contentSlug",
      element: /* @__PURE__ */ jsx(Layout, {
        children: /* @__PURE__ */ jsx(Project, {})
      })
    }), /* @__PURE__ */ jsx(Route, {
      path: "/:projectSlug/:contentSlug/:headingIndex",
      element: /* @__PURE__ */ jsx(Layout, {
        children: /* @__PURE__ */ jsx(Project, {})
      })
    }), /* @__PURE__ */ jsx(Route, {
      path: "/",
      element: /* @__PURE__ */ jsx(Layout, {
        children: /* @__PURE__ */ jsx(Project, {})
      })
    })]
  });
};
export { Docs, Docs as default };
//# sourceMappingURL=docs.js.map
