import { ThemeProvider } from "@mui/material";
import slugify from "@sindresorhus/slugify";
import { join } from "path-browserify";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { theme } from "./css/theme";
import { Docs } from "./pages/docs";
import {
  addOrUpdateContents,
  addOrUpdateProject,
  Contents,
  removeContents,
} from "./store/contents";
import "./css/reset";
import {
  getCachedDocument,
  getLastModified,
  queueDocument,
} from "./store/documents";
import { DocOptions, DocOptionsProject } from "./interfaces";
import { DocOptionsContextProvider } from "./hooks/use_doc_options_context";
import { Editor } from "./pages/editor";
const loadProjects = async (projects: DocOptionsProject[]) => {
  await Promise.all(
    projects.map(async (project) => {
      const projectSlug = slugify(project.root);
      addOrUpdateProject({
        ...project,
        path: project.root,
        slug: projectSlug,
        name: project.name,
        depthMap: new Map(),
      });
      const contentsText = await fetch(
        join(project.root, "contents.doks")
      ).then((res) => res.text());
      for (const c of contentsText.split("\n")) {
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
          isOnlyHeading: !path.includes(".md"),
        };
        addOrUpdateContents({ ...item }, projectSlug);
        if (!item.isOnlyHeading) {
          const lastModified = await getLastModified(
            join(project.root, item.path)
          );
          if (lastModified !== false) {
            const cached = getCachedDocument(item.slug);
            if (cached) {
              addOrUpdateContents({ ...item, name: cached.name }, projectSlug);
            }
            item.lastModified = lastModified;
            queueDocument(item, false);
          } else {
            removeContents(item.slug, item.projectSlug);
          }
        }
      }
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
  targetNode.classList.add("docs-root");
  loadProjects(projects);

  ReactDOM.render(
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
    </ThemeProvider>,
    targetNode
  );
};
