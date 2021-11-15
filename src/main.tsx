import { ThemeProvider } from "@mui/material";
import slugify from "@sindresorhus/slugify";
import { join } from "path-browserify";
import { render, ComponentChild, Fragment } from "preact";
import { HashRouter, Route, Routes } from "react-router-dom";
import { theme } from "./css/theme";
import { Docs } from "./pages/docs";
import {
  addOrUpdateContents,
  addOrUpdateProject,
  Contents,
} from "./store/contents";
import "./css/reset";
import { queueDocument } from "./store/documents";
import { Navbar } from "./components/navbar";

export interface DocOptionsProject {
  root: string;
  name: string;
}
export interface DocOptions {
  targetNode?: HTMLElement;
  projects: DocOptionsProject[];
}

const loadProjects = async (projects: DocOptionsProject[]) => {
  await Promise.all(
    projects.map(async (project) => {
      const projectSlug = slugify(project.root);
      addOrUpdateProject({
        path: project.root,
        slug: projectSlug,
        name: project.name,
        depthMap: new Map(),
      });
      await fetch(join(project.root, "contents.doks"))
        .then((res) => res.text())
        .then((contentsText) => {
          contentsText.split("\n").forEach((c) => {
            const [path, name] = c.split("|");
            let depth = 0;
            while (path.charAt(depth) && path.charAt(depth).search(/\s/) > -1) {
              depth++;
            }
            const item: Contents = {
              path: path.trim(),
              name: name?.trim() || path.trim(),
              depth,
              slug: slugify(projectSlug + "-" + path.trim()),
              projectSlug,
            };
            addOrUpdateContents(item, projectSlug);
            queueDocument(item, project, false);
          });
        });
    })
  );
};
export const docs = (options: DocOptions) => {
  const link = document.createElement("link");
  link.setAttribute("ref", "stylesheet");
  link.setAttribute(
    "href",
    "https://fonts.googleapis.com/css?family=Roboto:300,4 00,500,700&display=swap"
  );
  document.head.appendChild(link);
  const { targetNode = document.body, projects } = options;

  loadProjects(projects);

  render(
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/docs/*" element={<Docs></Docs>}></Route>
          <Route path="*" element={<Docs></Docs>}></Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>,
    targetNode
  );
};
