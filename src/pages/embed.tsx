import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { lazy, ReactChild, Suspense, useCallback } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Background } from "../components/background";
import { Footer } from "../components/footer";
import { documents$ } from "../store/documents";

const DocFetcher = lazy(() => import("../components/doc_fetcher"));
const Content = lazy(() => import("../components/content"));
const Navbar = lazy(() => import("../components/navbar"));

const Project = () => {
  const params = useParams();
  return (
    <>
      {params.contentSlug && (
        <Suspense
          fallback={
            <CircularProgress
              sx={{ position: "absolute", top: "50%", left: "50%" }}
            ></CircularProgress>
          }
        >
          <Content embed={true}></Content>
        </Suspense>
      )}
    </>
  );
};
const Layout = ({ children }: { children: ReactChild }) => {
  return (
    <Background sx={{ background: "initial" }}>
      <DocFetcher mode="embed"></DocFetcher>
      <Navbar embed={true}></Navbar>
      <Container
        sx={{
          paddingTop: 0,
          marginBottom: 0,
          flex: "auto",
        }}
      >
        {children}
      </Container>
    </Background>
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
        path="/:projectSlug/:contentSlug/:headingIndex"
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
export default Docs;
