import { EditorProps } from "@monaco-editor/react";
import { Card, CardHeader, IconButton } from "@mui/material";
import { Box, styled } from "@mui/system";
import * as React from "preact";
import { lazy } from "preact/compat";
import { useCallback, useErrorBoundary, useRef, useState } from "preact/hooks";
import { MarkdownRenderer } from "./markdown_renderer";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SaveIcon from "@mui/icons-material/Save";

const EditorWrapper = styled(Card)({
  width: "100%",
  flex: "auto",
  display: "flex",
  flexDirection: "column",
  ".editor": {
    width: "100%",
    flex: "auto",
    display: "flex",
    flexDirection: "row",
  },
});
const EditorHeader = styled(CardHeader)(({ theme }) => ({
  background: theme.palette.primary.dark,
  color: theme.palette.getContrastText(theme.palette.primary.dark),
  padding: 2,
  height: "44px",
}));
const ContentBox = styled(Box)({
  overflow: "auto",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingBottom: "20px",
});
const Editor: React.FC<EditorProps> = lazy(
  () => import("@monaco-editor/react")
);
const MAX_FLEX_DIFF = 4;
export const MarkdownEditor = ({ initial }: { initial: string }) => {
  const [mdx, setMDX] = useState(initial);
  const [height, setHeight] = useState(0);
  const [editorFlex, setEditorFlex] = useState(0);
  const boxRef = useRef<HTMLDivElement>();

  const saveMDX = useCallback(() => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(mdx)
    );
    element.setAttribute("download", "document.mdx");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }, [mdx]);

  return (
    <EditorWrapper>
      <EditorHeader
        action={
          !!height && (
            <React.Fragment>
              <IconButton
                sx={{ color: "inherit" }}
                aria-label="increase preview size"
                onClick={saveMDX}
              >
                <SaveIcon sx={{ fontSize: 22 }} />
              </IconButton>
              <IconButton
                sx={{ color: "inherit" }}
                aria-label="increase preview size"
                onClick={() => {
                  setEditorFlex((value) =>
                    Math.max(-(MAX_FLEX_DIFF - 1), value - 1)
                  );
                }}
              >
                <ArrowLeftIcon sx={{ fontSize: 32 }} />
              </IconButton>
              <IconButton
                sx={{ color: "inherit" }}
                aria-label="decrease preview size"
                onClick={() => {
                  setEditorFlex((value) =>
                    Math.min(MAX_FLEX_DIFF - 1, value + 1)
                  );
                }}
              >
                <ArrowRightIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </React.Fragment>
          )
        }
      ></EditorHeader>
      <Box className="editor">
        <Box
          ref={boxRef}
          sx={{ flex: "auto", maxWidth: `${50 + 10 * editorFlex}%` }}
        >
          <Editor
            height="100%"
            theme="vs-dark"
            width="100%"
            onChange={setMDX}
            onMount={() => {
              setHeight(boxRef.current.clientHeight);
            }}
            defaultLanguage="markdown"
            defaultValue={mdx}
          ></Editor>
        </Box>
        <ContentBox
          sx={{
            height: height + "px",
            flex: "auto",
            maxWidth: `${50 - 10 * editorFlex}%`,
          }}
        >
          {!!height && <MarkdownRenderer mdx={mdx}></MarkdownRenderer>}
        </ContentBox>
      </Box>
    </EditorWrapper>
  );
};
