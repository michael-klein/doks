import { lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ComponentContextProvider } from "./components/components";
import "./css/reset";
import { DocsThemeProvider } from "./css/theme";
import { useComponentContext } from "./hooks/use_component_context";
import { DocOptionsContextProvider } from "./hooks/use_doc_options_context";
import { DocOptions } from "./interfaces";

const Docs = lazy(() => import("./pages/docs"));
const Editor = lazy(() => import("./pages/editor"));
const Embed = lazy(() => import("./pages/embed"));

export const Doks = (options: DocOptions) => {
  const componentContext = useComponentContext();
  return (
    <ComponentContextProvider value={componentContext}>
    <DocsThemeProvider>
      <DocOptionsContextProvider options={options}>
        <HashRouter>
          <Routes>
            <Route path="/editor/*" element={<Editor></Editor>}></Route>
            <Route path="/docs/*" element={<Docs></Docs>}></Route>
            <Route path="/embed/*" element={<Embed></Embed>}></Route>
            <Route path="*" element={<Docs></Docs>}></Route>
          </Routes>
        </HashRouter>
      </DocOptionsContextProvider>
    </DocsThemeProvider>
    </ComponentContextProvider>
  );
};
export default Doks;
