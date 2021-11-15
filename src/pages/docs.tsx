import { Container, Grid } from "@mui/material";
import { useObservableState } from "observable-hooks";
import { Fragment } from "preact";
import { Suspense } from "preact/compat";
import { useEffect } from "preact/hooks";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Content } from "../components/content";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { contents$ } from "../store/contents";
const Project = () => {
  const params = useParams();
  const navigate = useNavigate();
  const contents = useObservableState(contents$);
  console.log(params);
  useEffect(() => {
    if (!params.projectSlug && contents.size > 0) {
      navigate(`/docs/${Array.from(contents.keys())[0]}`, {
        replace: true,
      });
    }
  }, [params, contents]);
  return (
    <Container maxWidth="lg" sx={{ marginTop: 10, marginBottom: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Suspense fallback={<div>Loading sidebar...</div>}>
            <Sidebar></Sidebar>
          </Suspense>
        </Grid>
        <Suspense fallback={<div>Loading content...</div>}>
          {params.contentSlug && <Content></Content>}
        </Suspense>
      </Grid>
    </Container>
  );
};

const Layout = ({ children }: { children: ComponentChild }) => {
  return (
    <Fragment>
      <Navbar></Navbar>
      {children}
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
