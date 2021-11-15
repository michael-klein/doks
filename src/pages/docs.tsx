import { Container, Grid } from "@mui/material";
import { Suspense } from "preact/compat";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { Content } from "../components/content";
import { Sidebar } from "../components/sidebar";
import { contents$, projects$ } from "../store/contents";
import { useCallback, useState, useEffect } from "preact/hooks";
import { useObservable, useObservableState } from "observable-hooks";

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

export const Docs = () => {
  return (
    <Routes>
      <Route path="/:projectSlug" element={<Project></Project>}></Route>
      <Route
        path="/:projectSlug/:contentSlug"
        element={<Project></Project>}
      ></Route>
      <Route path="/" element={<Project></Project>}></Route>
    </Routes>
  );
};
