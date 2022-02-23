import Editor from "@monaco-editor/react";
import React, { MutableRefObject } from "react";
export type StateUpdater<T> = React.Dispatch<T>;

export const EditorRenderer = ({
  setHeight,
  setMDX,
  mdx,
  editorRef,
  boxRef,
}: {
  setHeight: StateUpdater<number>;
  setMDX: StateUpdater<string>;
  boxRef: MutableRefObject<HTMLDivElement>;
  mdx: string;
  editorRef: MutableRefObject<any>;
}) => {
  return (
    <Editor
      height="100%"
      theme="vs-dark"
      width="100%"
      onChange={setMDX}
      onMount={(editor, monaco) => {
        console.log(monaco);
        editorRef.current = editor;
        setHeight(boxRef.current.clientHeight);
      }}
      defaultLanguage="markdown"
      defaultValue={mdx}
      options={{ wordWrap: "on" }}
    ></Editor>
  );
};
