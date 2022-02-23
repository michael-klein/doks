import React, { useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/light-async";

const styleMap: Map<string, any> = new Map();

const getStyle = async (style: string) => {
  if (!styleMap.has(style)) {
    let styleFetcher: Promise<any>;
    switch (style) {
      case "anOldHope":
        styleFetcher = import(
          "react-syntax-highlighter/dist/cjs/styles/hljs/an-old-hope"
        );
        break;
      case "arta":
        styleFetcher = import(
          "react-syntax-highlighter/dist/cjs/styles/hljs/arta"
        );
        break;
      case "atelierDuneDark":
        styleFetcher = import(
          "react-syntax-highlighter/dist/cjs/styles/hljs/atelier-dune-dark"
        );
        break;
      case "atelierDuneLight":
        styleFetcher = import(
          "react-syntax-highlighter/dist/cjs/styles/hljs/atelier-dune-light"
        );
        break;
      case "darcula":
        styleFetcher = import(
          "react-syntax-highlighter/dist/cjs/styles/hljs/darcula"
        );
        break;
      case "far":
        styleFetcher = import(
          "react-syntax-highlighter/dist/cjs/styles/hljs/far"
        );
        break;
      case "github":
        styleFetcher = import(
          "react-syntax-highlighter/dist/cjs/styles/hljs/github"
        );
        break;
      case "gradientDark":
        styleFetcher = import(
          "react-syntax-highlighter/dist/cjs/styles/hljs/gradient-dark"
        );
        break;
      case "isblEditorDark":
        styleFetcher = import(
          "react-syntax-highlighter/dist/cjs/styles/hljs/isbl-editor-dark"
        );
        break;
      case "isblEditorLight":
        styleFetcher = import(
          "react-syntax-highlighter/dist/cjs/styles/hljs/isbl-editor-light"
        );
        break;
      case "monokai":
        styleFetcher = import(
          "react-syntax-highlighter/dist/cjs/styles/hljs/monokai"
        );
        break;
      case "sunburst":
        styleFetcher = import(
          "react-syntax-highlighter/dist/cjs/styles/hljs/sunburst"
        );
        break;
      case "nightOwl":
        styleFetcher = import(
          "react-syntax-highlighter/dist/cjs/styles/hljs/night-owl"
        );
        break;
    }
    styleMap.set(style, styleFetcher);
  }
  return styleMap.get(style);
};

export const CodeSyntaxHighlighter = ({
  theme,
  language,
  children,
}: {
  theme: string;
  language: string;
  children: React.ReactChild | React.ReactChild[];
}) => {
  const [style, setStyle] = React.useState<any>(null);

  useEffect(() => {
    let apply = true;
    getStyle(theme).then((style) => {
      if (apply) {
        setStyle(style.default);
      }
    });
    return () => {
      apply = false;
    };
  }, [theme]);

  return style ? (
    <SyntaxHighlighter
      style={style}
      customStyle={{
        marginLeft: "-10px",
        marginRight: "-10px",
        paddingLeft: "11px",
        paddingRight: "11px",
        borderRadius: "3px",
      }}
      language={language}
    >
      {children}
    </SyntaxHighlighter>
  ) : (
    <code>{children}</code>
  );
};

export default CodeSyntaxHighlighter;
