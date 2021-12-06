import Editor from "@monaco-editor/react";
import { RefObject } from "preact";
import { StateUpdater } from "preact/hooks";

export const EditorRenderer = ({
  setHeight,
  setMDX,
  mdx,
  editorRef,
  boxRef,
}: {
  setHeight: StateUpdater<number>;
  setMDX: StateUpdater<string>;
  boxRef: RefObject<HTMLDivElement>;
  mdx: string;
  editorRef: RefObject<any>;
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
export default EditorRenderer;
