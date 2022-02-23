import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { lazy, ReactChild, Suspense } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { useComponentContext } from "../hooks/use_component_context";
const DocFetcher = lazy(() => import("../components/doc_fetcher"));

const Project = () => {
  const params = useParams();
  const { Content } = useComponentContext();
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
  const { Navbar, Background } = useComponentContext();
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
