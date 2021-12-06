import { CircularProgress, Container, Grid } from "@mui/material";
import { useObservableState } from "observable-hooks";
import { Fragment } from "preact";
import { Suspense } from "preact/compat";
import { useEffect } from "preact/hooks";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Content } from "../components/content";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Sidebar, SIDEBAR_MODE } from "../components/sidebar";
import { useCallback } from "preact/hooks";
import { contents$ } from "../store/contents";
const Project = () => {
  const params = useParams();
  const navigate = useNavigate();
  const contents = useObservableState(contents$);
  useEffect(() => {
    if (!params.projectSlug && contents.size > 0) {
      navigate(`/docs/${Array.from(contents.keys())[0]}`, {
        replace: true,
      });
    }
  }, [params, contents]);
  return (
    <Suspense fallback={<CircularProgress />}>
      {params.contentSlug && <Content></Content>}
    </Suspense>
  );
};

const Layout = ({ children }: { children: ComponentChild }) => {
  const params = useParams();
  const navigate = useNavigate();
  const onNodeSelect = useCallback(
    (nodeId: string) => {
      navigate(`/docs/${params.projectSlug}/${nodeId}`, {
        replace: true,
      });
    },
    [params]
  );
  return (
    <Fragment>
      <Navbar></Navbar>
      <Container
        maxWidth="lg"
        sx={{ marginTop: 10, marginBottom: 10, flex: "auto" }}
      >
        <Grid container spacing={2}>
          <Suspense fallback={<CircularProgress />}>
            <Sidebar
              onProjectSelect={(projectSlug) => {
                navigate(`/docs/${projectSlug}`, {
                  replace: true,
                });
              }}
              onNodeSelect={onNodeSelect}
              mode={SIDEBAR_MODE.DOCS}
            ></Sidebar>
          </Suspense>
          {children}
        </Grid>
      </Container>
      <Footer></Footer>
    </Fragment>
  );
};

export const Docs = () => {
  return (
    <Routes>
      <Route
        path="/:projectSlug"
        element={
          <Layout>
            <Project></Project>
          </Layout>
        }
      ></Route>
      <Route
        path="/:projectSlug/:contentSlug"
        element={
          <Layout>
            <Project></Project>
          </Layout>
        }
      ></Route>
      <Route
        path="/"
        element={
          <Layout>
            <Project></Project>
          </Layout>
        }
      ></Route>
    </Routes>
  );
};
