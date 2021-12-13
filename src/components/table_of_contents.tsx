import Box from "@mui/system/Box";
import styled from "@mui/system/styled";
import { htmdx } from "htmdx";
import React, { memo, ReactChild, useMemo } from "react";
import { Link } from "react-router-dom";
import { DoksTheme } from "../css/theme";
import { useParams } from "react-router";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import removeMd from "remove-markdown";
import { ChildCareRounded } from "@mui/icons-material";

class ErrorBoundary extends React.Component<
  { children: ReactChild },
  { hasError: boolean; error: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  componentDidCatch(error, errorInfo) {}

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error.message };
  }

  render() {
    if (this.state.hasError) {
      console.error("toc error", this.state.error);
      // You can render any custom fallback UI
      return (
        <>
          <h1>MDX error:</h1>
          <div>{this.state.error}</div>
        </>
      );
    }

    return this.props.children;
  }
}
const TOCList = styled("ul")({
  listStyle: "none",
  margin: 0,
  padding: 10,
  paddingLeft: 0,
  lineHeight: "1.3em",
  maxHeight: "calc(60vh)",
  overflowY: "auto",
});
const TOCListItem = styled("li")({
  fontSize: ".9em",
  "a,a:hover,a:link,a:active": {
    color: "inherit",
    textDecoration: "none",
    textAlign: "left",
  },
  "a:hover": {
    textDecoration: "underline",
  },
});
const getListItem = (level: number) => (props: any) => {
  const params = useParams();
  return (
    <TOCListItem sx={{ marginLeft: 10 * (level - 1) + "px" }}>
      <SubdirectoryArrowRightIcon
        sx={{ fontSize: ".8em", marginRight: ".2em" }}
        className="sub-icon"
      ></SubdirectoryArrowRightIcon>
      <Link
        {...props}
        to={`/docs/${params.projectSlug}/${params.contentSlug}/${props.index}`}
      ></Link>
    </TOCListItem>
  );
};
const TOC = memo(({ mdx }: { mdx: string }) => {
  const headings = useMemo(
    () =>
      mdx
        ?.replace(/(<([^>]+)>)/gi, "")
        .split("\n")
        .filter((line) => line.includes("#"))
        .join("\n"),
    [mdx]
  );
  let i = 0;
  let hIndex = 0;
  return (
    <>
      {headings !== undefined ? (
        <TOCList>
          {htmdx(headings, React.createElement, {
            components: {
              h1: getListItem(1),
              h2: getListItem(2),
              h3: getListItem(3),
              h4: getListItem(4),
              h6: getListItem(6),
              h7: getListItem(7),
              h8: getListItem(8),
              h10: getListItem(10),
            },
            jsxTransforms: [
              (type, props, children) => {
                if (!props) {
                  props = {};
                }
                if (type.startsWith("h")) {
                  props.index = hIndex;
                  hIndex++;
                }
                props.key = i++;
                return [type, props, children];
              },
            ],
          })}
        </TOCList>
      ) : (
        <></>
      )}
    </>
  );
});
const Wrapper = styled(Box)(({ theme }) => ({
  ...(theme as DoksTheme).typography.body1,
  width: "220px",
}));
const Header = styled("h1")({
  fontSize: "1em",
  marginBottom: "-.7em",
  fontWeight: "bold",
});
export const TableOfContents = ({ mdx }: { mdx: string }) => {
  return (
    <Wrapper>
      <Header>Table of contents</Header>
      <ErrorBoundary key={"toc-" + mdx}>
        <TOC mdx={mdx}></TOC>
      </ErrorBoundary>
    </Wrapper>
  );
};
