import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { join } from "path-browserify";
import React, { Fragment, lazy, ReactChild, useMemo } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { combineLatest, map } from "rxjs";
import { useObservableAndState } from "../hooks/use_observable_and_state";
import { projects$ } from "../store/contents";
import { documents$ } from "../store/documents";
const DocFetcher = lazy(() => import("../components/doc_fetcher"));
import { useComponentContext } from "../hooks/use_component_context";

const DocumentEditor = () => {
  const { MarkdownEditor } = useComponentContext();
  const params = useParams();
  const [document] = useObservableAndState(
    (input$) => {
      return combineLatest([input$, documents$]).pipe(
        map(([input, documents]) => {
          return documents.get(input[0]?.contentSlug);
        })
      );
    },
    [params]
  );
  const shouldHaveDocument = !!params.contentSlug;
  const path: string = useMemo(() => {
    if (document) {
      return join(projects$.value.get(params.projectSlug).path, document.path);
    }
    return undefined;
  }, [document, params]);
  return (
    <>
      {shouldHaveDocument && !document ? (
        <CircularProgress></CircularProgress>
      ) : (
        <MarkdownEditor
          key={shouldHaveDocument ? document.mdx : "# hello world"}
          initial={shouldHaveDocument ? document.mdx : "# hello world"}
          path={path}
        ></MarkdownEditor>
      )}
    </>
  );
};

const Layout = ({ children }: { children: ReactChild }) => {
  const { Navbar, MarkdownEditor } = useComponentContext();
  return (
    <Fragment>
      <DocFetcher mode="editor"></DocFetcher>
      <Navbar></Navbar>
      <Container
        sx={{
          marginTop: 3,
          marginBottom: 3,
          flex: "auto",
          display: "flex",
          maxWidth: "100% !important",
        }}
      >
        {children}
      </Container>
    </Fragment>
  );
};

export const Editor = () => {
  return (
    <Routes>
      <Route
        path="/:projectSlug"
        element={
          <Layout>
            <DocumentEditor></DocumentEditor>
          </Layout>
        }
      ></Route>
      <Route
        path="/:projectSlug/:contentSlug"
        element={
          <Layout>
            <DocumentEditor></DocumentEditor>
          </Layout>
        }
      ></Route>
      <Route
        path="/"
        element={
          <Layout>
            <DocumentEditor></DocumentEditor>
          </Layout>
        }
      ></Route>
    </Routes>
  );
};
export default Editor;
