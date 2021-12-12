import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import styled from "@mui/system/styled";
import { useObservableState } from "observable-hooks";
import {
  Fragment,
  lazy,
  ReactChild,
  Suspense,
  useCallback,
  useEffect,
} from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Background } from "../components/background";
import { Footer } from "../components/footer";
import { contents$ } from "../store/contents";
import { documents$ } from "../store/documents";

const DocFetcher = lazy(() => import("../components/doc_fetcher"));
const Sidebar = lazy(() => import("../components/sidebar"));
const Content = lazy(() => import("../components/content"));
const Navbar = lazy(() => import("../components/navbar"));

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
    <>
      {params.contentSlug && (
        <Suspense
          fallback={
            <CircularProgress
              sx={{ position: "absolute", top: "50%", left: "50%" }}
            ></CircularProgress>
          }
        >
          <Content></Content>
        </Suspense>
      )}
    </>
  );
};
const Layout = ({ children }: { children: ReactChild }) => {
  const params = useParams();
  const navigate = useNavigate();
  const onNodeSelect = useCallback(
    (nodeId: string) => {
      if (documents$.value.has(nodeId)) {
        navigate(`/docs/${params.projectSlug}/${nodeId}`, {
          replace: true,
        });
      }
    },
    [params]
  );
  return (
    <Background>
      <DocFetcher mode="docs"></DocFetcher>
      <Navbar></Navbar>
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: 10,
          marginBottom: 10,
          flex: "auto",
        }}
      >
        <Grid container spacing={2}>
          <Sidebar
            onProjectSelect={(projectSlug) => {
              navigate(`/docs/${projectSlug}`, {
                replace: true,
              });
            }}
            onNodeSelect={onNodeSelect}
            mode={"docs"}
          ></Sidebar>
          {children}
        </Grid>
      </Container>
      <Footer></Footer>
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
