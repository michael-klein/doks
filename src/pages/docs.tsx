import { Container, Grid } from "@mui/material";
import { Suspense } from "preact/compat";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { BreadCrumbs } from "../components/breadcrumbs";
import { Content } from "../components/content";
import { Sidebar } from "../components/sidebar";
import { useObservable } from "../hooks/use_observable";
import { projects$ } from "../store/contents";

const Project = () => {
  const params = useParams();
  return (
    <Container maxWidth="lg" sx={{ marginTop: 10, marginBottom: 10 }}>
      <BreadCrumbs></BreadCrumbs>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Suspense fallback={<div>Loading sidebar...</div>}>
            <Sidebar></Sidebar>
          </Suspense>
        </Grid>
        {params.contentSlug && <Content></Content>}
      </Grid>
    </Container>
  );
};

export const Docs = () => {
  return (
    <Routes>
      <Route
        path="/:projectSlug/:contentSlug"
        element={<Project></Project>}
      ></Route>
      <Route path="/" element={<Project></Project>}></Route>
    </Routes>
  );
};
