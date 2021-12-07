import { CircularProgress, Container } from "@mui/material";
import React, { Fragment, ReactChild } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { combineLatest, map } from "rxjs";
import { MarkdownEditor } from "../components/markdown_editor";
import { Navbar } from "../components/navbar";
import { useObservableAndState } from "../hooks/use_observable_and_state";
import { documents$ } from "../store/documents";
const DocumentEditor = () => {
  const params = useParams();
  const [document] = useObservableAndState(
    (input$) => {
      return combineLatest([input$, documents$]).pipe(
        map(([input, documents]) => {
          return documents.get(input[0]?.contentSlug);
        })
      );
    },
    [params]
  );
  const shouldHaveDocument = !!params.contentSlug;
  return (
    <>
      {shouldHaveDocument && !document ? (
        <CircularProgress></CircularProgress>
      ) : (
        <MarkdownEditor
          key={shouldHaveDocument ? document.mdx : "# hello world"}
          initial={shouldHaveDocument ? document.mdx : "# hello world"}
        ></MarkdownEditor>
      )}
    </>
  );
};

const Layout = ({ children }: { children: ReactChild }) => {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Container
        sx={{
          marginTop: 3,
          marginBottom: 3,
          flex: "auto",
          display: "flex",
          maxWidth: "100% !important",
        }}
      >
        {children}
      </Container>
    </Fragment>
  );
};

export const Editor = () => {
  return (
    <Routes>
      <Route
        path="/:projectSlug"
        element={
          <Layout>
            <DocumentEditor></DocumentEditor>
          </Layout>
        }
      ></Route>
      <Route
        path="/:projectSlug/:contentSlug"
        element={
          <Layout>
            <DocumentEditor></DocumentEditor>
          </Layout>
        }
      ></Route>
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
