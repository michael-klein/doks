import { EditorProps } from "@monaco-editor/react";
import { Card } from "@mui/material";
import { Box, height, styled } from "@mui/system";
import { useObservable, useObservableState } from "observable-hooks";
import * as React from "preact";
import { lazy } from "preact/compat";
import { useRef, useState } from "preact/hooks";
import { useParams } from "react-router";
import { combineLatest, map } from "rxjs";
import { documents$ } from "../store/documents";
import { MarkdownRenderer } from "./markdown_renderer";

const EditorWrapper = styled(Card)({
  width: "100%",
  flex: "auto",
  display: "flex",
  flexDirection: "row",
  "> *": {
    flex: 1,
  },
});
const ContentBox = styled(Box)({
  overflow: "auto",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingBottom: "20px",
});
let Editor: React.FC<EditorProps>;
export const MarkdownEditor = ({ initial }: { initial: string }) => {
  if (!Editor) {
    Editor = lazy(() => import("@monaco-editor/react"));
  }
  const [mdx, setMDX] = useState(initial);
  const [editorHeight, setEditorHeight] = useState(0);
  const boxRef = useRef<HTMLDivElement>();
  return (
    <EditorWrapper>
      <Box ref={boxRef}>
        <Editor
          height="100%"
          theme="vs-dark"
          width="100%"
          onChange={setMDX}
          onMount={() => {
            setEditorHeight(boxRef.current.clientHeight);
          }}
          defaultLanguage="markdown"
          defaultValue={mdx}
        ></Editor>
      </Box>
      <ContentBox sx={{ height: editorHeight + "px" }}>
        {!!editorHeight && <MarkdownRenderer mdx={mdx}></MarkdownRenderer>}
      </ContentBox>
    </EditorWrapper>
  );
};
