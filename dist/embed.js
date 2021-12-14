import { lazy, Suspense } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { B as Background } from "./background.js";
import { d as jsxs, j as jsx, F as Fragment, C as CircularProgress } from "./main.js";
import { C as Container } from "./styled.js";
import "react-dom";
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
      children: /* @__PURE__ */ jsx(Content, {
        embed: true
      })
    })
  });
};
const Layout = ({
  children
}) => {
  return /* @__PURE__ */ jsxs(Background, {
    sx: {
      background: "initial"
    },
    children: [/* @__PURE__ */ jsx(DocFetcher, {
      mode: "embed"
    }), /* @__PURE__ */ jsx(Navbar, {
      embed: true
    }), /* @__PURE__ */ jsx(Container, {
      sx: {
        paddingTop: 0,
        marginBottom: 0,
        flex: "auto"
      },
      children
    })]
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
//# sourceMappingURL=embed.js.map
