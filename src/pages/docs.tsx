import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { lazy, ReactChild, Suspense, useCallback } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Background } from "../components/background";
import { Footer } from "../components/footer";
import { documents$ } from "../store/documents";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";

const DocFetcher = lazy(() => import("../components/doc_fetcher"));
const Sidebar = lazy(() => import("../components/sidebar"));
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
        sx={{
          paddingTop: 6,
          marginBottom: 10,
          flex: "auto",
        }}
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            display: { xs: "none", sm: "flex" },
          }}
        >
          <FolderIcon
            sx={{
              fontSize: "1.1em",
              color: "text.secondary",
              transform: "translateY(0.15em)",
            }}
          ></FolderIcon>
          {params.projectSlug && (
            <Typography color="text.secondary">{params.projectSlug}</Typography>
          )}
          {params.contentSlug && (
            <Typography color="text.secondary">{params.contentSlug}</Typography>
          )}
          {params.headingIndex && (
            <Typography color="text.secondary">
              {params.headingIndex}
            </Typography>
          )}
        </Breadcrumbs>
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
