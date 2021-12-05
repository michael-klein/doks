import { CircularProgress, Container, Grid } from "@mui/material";
import { useObservable, useObservableState } from "observable-hooks";
import { Fragment } from "preact";
import { Suspense } from "preact/compat";
import { useEffect } from "preact/hooks";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { combineLatest, map } from "rxjs";
import { Content } from "../components/content";
import { Footer } from "../components/footer";
import { MarkdownEditor } from "../components/markdown_editor";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { contents$ } from "../store/contents";
import { documents$ } from "../store/documents";
const DocumentEditor = () => {
  const params = useParams();
  const document = useObservableState(
    useObservable(
      (input$) => {
        return combineLatest(input$, documents$).pipe(
          map(([input, documents]) => {
            return documents.get(input[0]?.contentSlug);
          })
        );
      },
      [params]
    )
  );
  const shouldHaveDocument = !!params.contentSlug;
  return (
    <Suspense fallback={<CircularProgress />}>
      {shouldHaveDocument && !document ? (
        <CircularProgress></CircularProgress>
      ) : (
        <MarkdownEditor
          initial={shouldHaveDocument ? document.mdx : "# hello world"}
        ></MarkdownEditor>
      )}
    </Suspense>
  );
};

const Layout = ({ children }: { children: ComponentChild }) => {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Container
        maxWidth="lg"
        sx={{ marginTop: 3, marginBottom: 3, flex: "auto", display: "flex" }}
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
