import { lazy, Suspense, useCallback } from "react";
import { R as Routes, a as Route, u as useParams, b as useNavigate, d as documents$, c as useComponentContext, B as Background, F as Footer } from "./doks.js";
import { i as jsxs, j as jsx, F as Fragment, G as CircularProgress } from "./main.js";
import { C as Container } from "./Container.js";
import { G as Grid } from "./Grid.js";
import "react-dom";
import "rxjs";
import "rxjs/operators";
const DocFetcher = lazy(() => import("./doc_fetcher.js"));
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
  const {
    Sidebar
  } = useComponentContext();
  return /* @__PURE__ */ jsxs(Background, {
    children: [/* @__PURE__ */ jsx(DocFetcher, {
      mode: "docs"
    }), /* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Container, {
      maxWidth: "lg",
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
