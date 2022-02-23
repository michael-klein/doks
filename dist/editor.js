import { R as Routes, b as Route, u as useComponentContext, d as useParams, e as useObservableAndState, h as documents$, p as pathBrowserify, s as projects$ } from "./doks.js";
import { lazy, useMemo, Fragment as Fragment$1 } from "react";
import { combineLatest, map } from "rxjs";
import { i as jsxs, j as jsx, F as Fragment, G as CircularProgress } from "./main.js";
import { C as Container } from "./Container.js";
import "react-dom";
import "rxjs/operators";
const DocFetcher = lazy(() => import("./doc_fetcher.js"));
const DocumentEditor = () => {
  const {
    MarkdownEditor
  } = useComponentContext();
  const params = useParams();
  const [document] = useObservableAndState((input$) => {
    return combineLatest([input$, documents$]).pipe(map(([input, documents]) => {
      var _a;
      return documents.get((_a = input[0]) == null ? void 0 : _a.contentSlug);
    }));
  }, [params]);
  const shouldHaveDocument = !!params.contentSlug;
  const path = useMemo(() => {
    if (document) {
      return pathBrowserify.join(projects$.value.get(params.projectSlug).path, document.path);
    }
    return void 0;
  }, [document, params]);
  return /* @__PURE__ */ jsx(Fragment, {
    children: shouldHaveDocument && !document ? /* @__PURE__ */ jsx(CircularProgress, {}) : /* @__PURE__ */ jsx(MarkdownEditor, {
      initial: shouldHaveDocument ? document.mdx : "# hello world",
      path
    }, shouldHaveDocument ? document.mdx : "# hello world")
  });
};
const Layout = ({
  children
}) => {
  const {
    Navbar,
    MarkdownEditor
  } = useComponentContext();
  return /* @__PURE__ */ jsxs(Fragment$1, {
    children: [/* @__PURE__ */ jsx(DocFetcher, {
      mode: "editor"
    }), /* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Container, {
      sx: {
        marginTop: 3,
        marginBottom: 3,
        flex: "auto",
        display: "flex",
        maxWidth: "100% !important"
      },
      children
    })]
  });
};
const Editor = () => {
  return /* @__PURE__ */ jsxs(Routes, {
    children: [/* @__PURE__ */ jsx(Route, {
      path: "/:projectSlug",
      element: /* @__PURE__ */ jsx(Layout, {
        children: /* @__PURE__ */ jsx(DocumentEditor, {})
      })
    }), /* @__PURE__ */ jsx(Route, {
      path: "/:projectSlug/:contentSlug",
      element: /* @__PURE__ */ jsx(Layout, {
        children: /* @__PURE__ */ jsx(DocumentEditor, {})
      })
    }), /* @__PURE__ */ jsx(Route, {
      path: "/",
      element: /* @__PURE__ */ jsx(Layout, {
        children: /* @__PURE__ */ jsx(DocumentEditor, {})
      })
    })]
  });
};
export { Editor, Editor as default };
//# sourceMappingURL=editor.js.map
