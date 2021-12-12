import { ThemeProvider } from "@mui/material/styles";
import { lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./css/reset";
import { theme } from "./css/theme";
import { DocOptionsContextProvider } from "./hooks/use_doc_options_context";
import { DocOptions } from "./interfaces";
const Docs = lazy(() => import("./pages/docs"));
const Editor = lazy(() => import("./pages/editor"));

export const Doks = (options: DocOptions) => {
  return (
    <ThemeProvider theme={theme}>
      <DocOptionsContextProvider options={options}>
        <HashRouter>
          <Routes>
            <Route path="/editor/*" element={<Editor></Editor>}></Route>
            <Route path="/docs/*" element={<Docs></Docs>}></Route>
            <Route path="*" element={<Docs></Docs>}></Route>
          </Routes>
        </HashRouter>
      </DocOptionsContextProvider>
    </ThemeProvider>
  );
};
export default Doks;
