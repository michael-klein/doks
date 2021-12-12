import { lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./css/reset";
import { DocsThemeProvider } from "./css/theme";
import { DocOptionsContextProvider } from "./hooks/use_doc_options_context";
import { DocOptions } from "./interfaces";
const Docs = lazy(() => import("./pages/docs"));
const Editor = lazy(() => import("./pages/editor"));

export const Doks = (options: DocOptions) => {
  return (
    <DocsThemeProvider>
      <DocOptionsContextProvider options={options}>
        <HashRouter>
          <Routes>
            <Route path="/editor/*" element={<Editor></Editor>}></Route>
            <Route path="/docs/*" element={<Docs></Docs>}></Route>
            <Route path="*" element={<Docs></Docs>}></Route>
          </Routes>
        </HashRouter>
      </DocOptionsContextProvider>
    </DocsThemeProvider>
  );
};
export default Doks;
