import { CircularProgress, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { htmdx } from "htmdx";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import * as SyntaxThemes from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ValueSubject } from "../utils/value_subject";
import { useObservableState } from "observable-hooks";

const SYNTAX_KEY = "SYNTAX";
export const codeTheme$ = new ValueSubject(
  SyntaxThemes[localStorage.getItem(SYNTAX_KEY)] ?? atomOneDark
);

codeTheme$.subscribe((theme) => {
  localStorage.setItem(
    SYNTAX_KEY,
    Object.keys(SyntaxThemes).find((key) => SyntaxThemes[key] === theme)
  );
});

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
  const [codeTheme] = useObservableState(() => codeTheme$);
  return (
    <ErrorBoundary>
      {mdx !== undefined ? (
        htmdx(mdx, React.createElement, {
          components: {
            code: (props: any) => {
              return (
                <SyntaxHighlighter
                  style={codeTheme}
                  customStyle={{
                    marginLeft: "-10px",
                    marginRight: "-10px",
                    paddingLeft: "11px",
                    paddingRight: "11px",
                    borderRadius: "3px",
                  }}
                  language={props?.className?.replace("language-", "")}
                >
                  {props.children}
                </SyntaxHighlighter>
              );
            },
          },
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
        <CircularProgress sx={{ marginLeft: "calc(50% - 20px)" }} />
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
