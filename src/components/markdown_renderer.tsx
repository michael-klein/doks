import { CircularProgress, Typography } from "@mui/material";
import { htmdx } from "htmdx";
import * as React from "preact";
import { useErrorBoundary } from "preact/hooks";

const MDX = ({ mdx }: { mdx: string }) => {
  return (
    <React.Fragment>
      {mdx !== undefined ? htmdx(mdx, React.h, {}) : <CircularProgress />}
    </React.Fragment>
  );
};

export const MarkdownRenderer = ({ mdx }: { mdx: string }) => {
  const [error, resetError] = useErrorBoundary((error) =>
    console.log("mdx error", error.message)
  );
  return (
    <Typography sx={{ textAlign: "justify" }}>
      <MDX mdx={mdx}></MDX>
    </Typography>
  );
};
