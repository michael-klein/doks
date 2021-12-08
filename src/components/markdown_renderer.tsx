import { CircularProgress, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { htmdx } from "htmdx";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import * as SyntaxThemes from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ValueSubject } from "../utils/value_subject";
import { useObservable, useObservableState } from "observable-hooks";

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
import { combineLatest, map } from "rxjs";
import { documents$ } from "../store/documents";
import { useParams } from "react-router";
import { join } from "path-browserify";
import { projects$ } from "../store/contents";
import { useDocOptions } from "../hooks/use_doc_options_context";

class ErrorBoundary extends React.Component<
  { onError: () => void },
  { hasError: boolean; error: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  componentDidCatch(error, errorInfo) {
    this.props.onError();
  }

  static getDerivedStateFromError(error: any) {
    console.log("ERROR");
    return { hasError: true, error: error.message };
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
const voidElements = [
  "br",
  "hr",
  "img",
  "area",
  "base",
  "col",
  "embed",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];
const removeVoidElements = (mdx: string) => {
  if (!mdx) {
    return undefined;
  }
  voidElements.forEach((el) => {
    mdx = mdx.replace(new RegExp(`</${el}.*>`, "ig"), ``);
    mdx = mdx.replace(new RegExp(`<${el}.*>`, "ig"), `<${el} />`);
  });
  return mdx;
};
const MDX = ({
  mdx,
  onSaveMDX,
}: {
  mdx: string;
  onSaveMDX: (mdx: string) => void;
}) => {
  let i = 0;
  const [codeTheme] = useObservableState(() => codeTheme$);
  const params = useParams();
  const document = useObservableState(
    useObservable(
      (input$) => {
        return combineLatest([input$, documents$]).pipe(
          map(([input, documents]) => {
            return documents.get(input[0].contentSlug);
          })
        );
      },
      [params]
    )
  );
  const getPath = useCallback(
    (src: string) => {
      if (src.includes("http") || !document) {
        return src;
      }
      return join(
        projects$.value.get(document.projectSlug).root,
        document.path.split("/").slice(0, -1).join("/"),
        src
      );
    },
    [document, params]
  );
  const sanitizedMDX = useMemo(() => removeVoidElements(mdx), [mdx]);
  useEffect(() => {
    onSaveMDX(mdx);
  }, [mdx]);
  return (
    <>
      {mdx !== undefined ? (
        htmdx(sanitizedMDX, React.createElement, {
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
            img: (props: any) => {
              if (props.src) {
                props = { ...props, src: getPath(props.src) };
              }
              return <img {...props} />;
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
    </>
  );
};
const Wrapper = styled(Box)(({ theme }) => ({
  ...(theme as DoksTheme).typography.body1,
}));
export const MarkdownRenderer = ({
  mdx,
  isEditor,
}: {
  mdx: string;
  isEditor?: boolean;
}) => {
  const [currentMDX, setCurrentMDX] = useState(mdx);
  useLayoutEffect(() => {
    setCurrentMDX(mdx);
  }, [mdx]);
  const saveMDXRef = useRef("");
  const mdxIdRef = useRef(0);
  return (
    <Wrapper sx={{ textAlign: "justify" }}>
      <ErrorBoundary
        key={"mdx-" + mdxIdRef.current}
        onError={() => {
          if (isEditor) {
            mdxIdRef.current++;
            setCurrentMDX(saveMDXRef.current);
          }
        }}
      >
        <MDX
          mdx={currentMDX}
          onSaveMDX={(saveMDX) => {
            saveMDXRef.current = saveMDX;
          }}
        ></MDX>
      </ErrorBoundary>
    </Wrapper>
  );
};
