import CircularProgress from "@mui/material/CircularProgress";
import { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { DocOptions } from "./interfaces";

const Doks = lazy(() => import("./doks"));
export const docs = (options: DocOptions) => {
  const link = document.createElement("link");
  link.setAttribute("ref", "stylesheet");
  link.setAttribute(
    "href",
    "https://fonts.googleapis.com/css?family=Roboto:300,4 00,500,700&display=swap"
  );
  document.head.appendChild(link);
  const { targetNode = document.body, wrapDocs = (docs: JSX.Element) => docs } =
    options;
  targetNode.classList.add("docs-root");
  ReactDOM.render(
    <Suspense
      fallback={
        <CircularProgress
          sx={{ position: "absolute", top: "50%", left: "50%" }}
        ></CircularProgress>
      }
    >
      {wrapDocs(<Doks {...options}></Doks>)}
    </Suspense>,
    targetNode
  );
};
