import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/system/Box";
import styled from "@mui/system/styled";
import { htmdx } from "htmdx";
import { useObservable, useObservableState } from "observable-hooks";
import { join } from "path-browserify";
import React, {
  createElement,
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { useParams } from "react-router";
import { combineLatest, debounceTime, map } from "rxjs";
import { DoksTheme } from "../css/theme";
import { projects$ } from "../store/contents";
import { documents$ } from "../store/documents";
import { codeTheme$ } from "../utils/code_theme";
import { ValueSubject } from "../utils/value_subject";

const CodeSyntaxHighlighter = lazy(() => import("./syntax_highlighter"));

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

export const MDX = memo(
  ({
    mdx,
    onSaveMDX,
    onAfterRender,
  }: {
    mdx: string;
    onSaveMDX: (mdx: string) => void;
    onAfterRender?: () => void;
  }) => {
    let i = 0;
    const [theme] = useObservableState(() => codeTheme$);
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
    useEffect(() => {
      requestAnimationFrame(() => {
        onAfterRender?.();
      });
    });
    let hIndex = 0;
    return (
      <>
        {mdx !== undefined ? (
          htmdx(sanitizedMDX, React.createElement, {
            components: {
              ...[1, 2, 3, 4, 5, 6, 6, 7, 8, 10].reduce((memo, i) => {
                memo[`h${i}`] = (props) => {
                  props = { ...props, id: `heading-` + hIndex };
                  hIndex++;
                  return createElement(`h` + i, props);
                };
                return memo;
              }, {}),
              code: (props: any) => {
                return (
                  <Suspense fallback={props.children}>
                    <CodeSyntaxHighlighter
                      theme={theme}
                      language={props?.className?.replace("language-", "")}
                    >
                      {props.children}
                    </CodeSyntaxHighlighter>
                  </Suspense>
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
  }
);
const Wrapper = styled(Box)(({ theme }) => ({
  ...(theme as DoksTheme).typography.body1,
}));
export const MarkdownRenderer = ({
  mdx,
  isEditor,
  onAfterRender,
}: {
  mdx: string;
  isEditor?: boolean;
  onAfterRender?: () => void;
}) => {
  const currentMDX$ = useObservable(
    () => new ValueSubject(mdx)
  ) as ValueSubject<string>;
  const [debouncedMDX] = useObservableState(() =>
    isEditor ? currentMDX$.pipe(debounceTime(500, undefined)) : currentMDX$
  );

  useLayoutEffect(() => {
    currentMDX$.next(mdx);
  }, [mdx]);
  const saveMDXRef = useRef("");
  const mdxIdRef = useRef(0);
  return (
    <Wrapper sx={{ textAlign: "justify" }}>
      <ErrorBoundary
        key={"mdx-" + mdxIdRef.current}
        onError={() => {
          mdxIdRef.current++;
          if (isEditor) {
            currentMDX$.next(saveMDXRef.current);
          }
        }}
      >
        <MDX
          onAfterRender={onAfterRender}
          mdx={debouncedMDX}
          onSaveMDX={(saveMDX) => {
            saveMDXRef.current = saveMDX;
          }}
        ></MDX>
      </ErrorBoundary>
    </Wrapper>
  );
};
