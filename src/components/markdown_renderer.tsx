import { CircularProgress, Typography } from "@mui/material";
import { htmdx } from "htmdx";
import React from "react";

const MDX = ({ mdx }: { mdx: string }) => {
  return (
    <React.Fragment>
      {mdx !== undefined ? (
        htmdx(mdx, React.createElement, {})
      ) : (
        <CircularProgress />
      )}
    </React.Fragment>
  );
};
class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>MDX error</h1>;
    }

    return this.props.children;
  }
}

export const MarkdownRenderer = ({ mdx }: { mdx: string }) => {
  return (
    <ErrorBoundary>
      <Typography sx={{ textAlign: "justify" }}>
        <MDX mdx={mdx}></MDX>
      </Typography>
    </ErrorBoundary>
  );
};
