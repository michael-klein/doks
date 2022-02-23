import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { lazy, ReactChild, Suspense, useCallback } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useComponentContext } from "../hooks/use_component_context";
import {
  documents$,
  fetchingDocuments$,
  queuedDocuments$,
} from "../store/documents";
import { combineLatest, map } from "rxjs";
import { useObservableAndState } from "../hooks/use_observable_and_state";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
const DocFetcher = lazy(() => import("../components/doc_fetcher"));

const Project = () => {
  const { Content } = useComponentContext();
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
  const [hasDocumentsFetching] = useObservableAndState(() =>
    combineLatest([queuedDocuments$, fetchingDocuments$]).pipe(
      map(
        ([queuedDocuments, fetchingDocuments]) =>
          queuedDocuments.docs.size > 0 || fetchingDocuments.size > 0
      )
    )
  );
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
  const { Sidebar, Navbar, Background, Footer } = useComponentContext();
  return (
    <Background>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={hasDocumentsFetching}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        <Alert sx={{ boxShadow: 1 }} severity="info" icon={false}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CircularProgress
              size={18}
              sx={{ marginRight: 1 }}
            ></CircularProgress>{" "}
            fetching documents in the background...
          </Box>
        </Alert>
      </Snackbar>
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
