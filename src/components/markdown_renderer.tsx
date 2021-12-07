import { CircularProgress, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { htmdx } from "htmdx";
import React from "react";
import { DoksTheme } from "../css/theme";

class ErrorBoundary extends React.Component<
  any,
  { hasError: boolean; error: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      console.error("mdx error", this.state.error);
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
const MDX = ({ mdx }: { mdx: string }) => {
  let i = 0;
  return (
    <ErrorBoundary>
      {mdx !== undefined ? (
        htmdx(mdx, React.createElement, {
          jsxTransforms: [
            (type, props, children) => {
              if (!props) {
                props = {};
              }
              props.key = i++;
              return [type, props, children];
            },
          ],
        })
      ) : (
        <CircularProgress />
      )}
    </ErrorBoundary>
  );
};
const Wrapper = styled(Box)(({ theme }) => ({
  ...(theme as DoksTheme).typography.body1,
}));
export const MarkdownRenderer = ({ mdx }: { mdx: string }) => {
  return (
    <Wrapper sx={{ textAlign: "justify" }}>
      <MDX mdx={mdx}></MDX>
    </Wrapper>
  );
};
