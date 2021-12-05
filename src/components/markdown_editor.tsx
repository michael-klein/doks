import { EditorProps } from "@monaco-editor/react";
import { Card } from "@mui/material";
import { Box, styled } from "@mui/system";
import * as React from "preact";
import { lazy } from "preact/compat";
import { useState } from "preact/hooks";
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

let Editor: React.FC<EditorProps>;
export const MarkdownEditor = () => {
  if (!Editor) {
    Editor = lazy(() => import("@monaco-editor/react"));
  }
  const [mdx, setMDX] = useState("# Hello World");
  return (
    <EditorWrapper>
      <Box>
        <Editor
          height="100%"
          theme="vs-dark"
          width="100%"
          onChange={setMDX}
          onMount={() => {
            console.log("editor mounted");
          }}
          defaultLanguage="markdown"
          defaultValue={mdx}
        ></Editor>
      </Box>
      <Box sx={{ padding: 1 }}>
        <MarkdownRenderer mdx={mdx}></MarkdownRenderer>
      </Box>
    </EditorWrapper>
  );
};
