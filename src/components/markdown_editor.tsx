import { Card, CardHeader, IconButton } from "@mui/material";
import { Box, styled } from "@mui/system";
import * as React from "preact";
import { StateUpdater, useCallback, useRef, useState } from "preact/hooks";
import { MarkdownRenderer } from "./markdown_renderer";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SaveIcon from "@mui/icons-material/Save";
import MenuIcon from "@mui/icons-material/Menu";
import { Sidebar, SIDEBAR_MODE } from "./sidebar";
import { EditorRenderer } from "./editor_renderer";
import { useNavigate, useParams } from "react-router";
import { documents$ } from "../store/documents";

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
        {!!height && (
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
        )}
        <Box
          ref={boxRef}
          sx={{
            flex: "auto",
            maxWidth: `${50 + 10 * editorFlex}%`,
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
