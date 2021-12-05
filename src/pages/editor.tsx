import { CircularProgress, Container, Grid } from "@mui/material";
import { useObservableState } from "observable-hooks";
import { Fragment } from "preact";
import { Suspense } from "preact/compat";
import { useEffect } from "preact/hooks";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Content } from "../components/content";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { contents$ } from "../store/contents";
const DocumentEditor = () => {
  return <Suspense fallback={<CircularProgress />}>hello</Suspense>;
};

const Layout = ({ children }: { children: ComponentChild }) => {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Container
        maxWidth="lg"
        sx={{ marginTop: 10, marginBottom: 10, flex: "auto" }}
      >
        <Grid container spacing={2}>
          {children}
        </Grid>
      </Container>
    </Fragment>
  );
};

export const Editor = () => {
  return (
    <Routes>
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
