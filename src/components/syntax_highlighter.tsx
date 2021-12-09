import React from "react";
import * as SyntaxThemes from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";

export const CodeSyntaxHighlighter = ({
  theme,
  language,
  children,
}: {
  theme: string;
  language: string;
  children: React.ReactChild | React.ReactChild[];
}) => {
  return (
    <SyntaxHighlighter
      style={SyntaxThemes[theme]}
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
  );
};
export default CodeSyntaxHighlighter;
