import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SaveIcon from "@mui/icons-material/Save";
import { Card, CardHeader, IconButton, Tooltip } from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { documents$ } from "../store/documents";
import { EditorRenderer } from "./editor_renderer";
import { MarkdownRenderer } from "./markdown_renderer";
import { Sidebar, SIDEBAR_MODE } from "./sidebar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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

const SidebarBox = styled(Box)({
  flex: 0,
  position: "relative",
});

const MAX_FLEX_DIFF = 4;

export const MarkdownEditor = ({ initial }: { initial: string }) => {
  const [mdx, setMDX] = useState(initial);
  const [height, setHeight] = useState(0);
  const [editorFlex, setEditorFlex] = useState(-1);
  const boxRef = useRef<HTMLDivElement>();
  const editorRef = useRef<any>();

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
  const navigate = useNavigate();
  const params = useParams();
  const onProjectSelected = useCallback(
    (projectSlug: string) => {
      navigate(`/editor/${projectSlug}/${params.contentSlug ?? ""}`);
    },
    [params]
  );
  const [showPreview, setShowPreview] = useState(true);
  return (
    <EditorWrapper>
      <EditorHeader
        action={
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
            <Tooltip title="toggle preview">
              <IconButton
                sx={{ color: "inherit", marginRight: "10px" }}
                aria-label="toggle preview"
                onClick={() => {
                  setShowPreview((value) => !value);
                }}
              >
                {!showPreview ? (
                  <VisibilityIcon sx={{ fontSize: 22 }} />
                ) : (
                  <VisibilityOffIcon sx={{ fontSize: 22 }} />
                )}
              </IconButton>
            </Tooltip>
          </React.Fragment>
        }
      ></EditorHeader>
      <Box className="editor">
        {
          <SidebarBox>
            <Sidebar
              mode={SIDEBAR_MODE.EDITOR}
              onNodeSelect={(node) => {
                const doc = documents$.value.get(node);
                console.log(doc);
                const line = editorRef.current.getPosition();
                const id = { major: 1, minor: 1 };
                const text = `[${doc.name}](/docs/${doc.projectSlug}/${doc.slug})`;
                const op = {
                  identifier: id,
                  range: {
                    startLineNumber: line.lineNumber,
                    endLineNumber: line.lineNumber,
                  },
                  text: text,
                  forceMoveMarkers: true,
                };
                editorRef.current.executeEdits("my-source", [op]);
              }}
              onProjectSelect={onProjectSelected}
            ></Sidebar>
          </SidebarBox>
        }
        <Box
          ref={boxRef}
          sx={{
            flex: "auto",
            maxWidth: !showPreview ? "100%" : `${50 + 10 * editorFlex}%`,
            background: "black",
          }}
        >
          <EditorRenderer
            editorRef={editorRef}
            mdx={mdx}
            boxRef={boxRef}
            setHeight={setHeight}
            setMDX={setMDX}
          ></EditorRenderer>
        </Box>
        {showPreview && (
          <ContentBox
            sx={{
              height: height + "px",
              flex: "auto",
              maxWidth: `${50 - 10 * editorFlex}%`,
            }}
          >
            {!!height && (
              <MarkdownRenderer mdx={mdx} isEditor={true}></MarkdownRenderer>
            )}
          </ContentBox>
        )}
      </Box>
    </EditorWrapper>
  );
};
