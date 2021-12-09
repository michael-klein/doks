import slugify from "@sindresorhus/slugify";
import { join } from "path-browserify";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./css/reset";
import { DocOptions, DocOptionsProject } from "./interfaces";
import {
  addOrUpdateContents,
  addOrUpdateManyContents,
  addOrUpdateProject,
  Contents,
  contents$,
  removeContents,
} from "./store/contents";
import {
  getCachedDocument,
  getLastModified,
  queueDocument,
} from "./store/documents";
import CircularProgress from "@mui/material/CircularProgress";

interface ProjectCacheItem {
  contents: Contents[];
  lastModified: string;
}
const loadContentsDocument = async (
  item: Contents,
  project: DocOptionsProject,
  projectSlug,
  deletedPaths: string[]
) => {
  if (!item.isOnlyHeading) {
    const lastModified = await getLastModified(join(project.root, item.path));
    if (lastModified !== false) {
      const cached = getCachedDocument(item.slug);
      if (cached) {
        addOrUpdateContents({ ...item, name: cached.name }, projectSlug);
      }
      item.lastModified = lastModified;
      queueDocument(item, false);
    } else {
      deletedPaths.push(item.path);
      removeContents(item.slug, item.projectSlug);
    }
  }
};
const loadProjects = async (projects: DocOptionsProject[]) => {
  await Promise.all(
    projects.map(async (project) => {
      const projectSlug = slugify(project.root);
      addOrUpdateProject({
        ...project,
        path: project.root,
        slug: projectSlug,
        name: project.name,
      });
      let lastModified: string;
      const contentsText = await fetch(
        join(project.root, "contents.doks")
      ).then((res) => {
        lastModified = res.headers.get("last-modified");
        return res.text();
      });
      const cached: ProjectCacheItem = JSON.parse(
        localStorage.getItem("CACHE__" + projectSlug) ?? "{}"
      );
      const deletedPaths: string[] = [];
      if (cached.lastModified === lastModified) {
        addOrUpdateManyContents(cached.contents, projectSlug);
        await Promise.all(
          cached.contents.map((c) =>
            loadContentsDocument({ ...c }, project, projectSlug, deletedPaths)
          )
        );
      } else {
        await Promise.all(
          contentsText.split("\n").map(async (c) => {
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
            loadContentsDocument(
              { ...item },
              project,
              projectSlug,
              deletedPaths
            );
          })
        );
      }
      const cacheItem: ProjectCacheItem = {
        lastModified,
        contents: Array.from(contents$.value.get(projectSlug).values()),
      };
      localStorage.setItem("CACHE__" + projectSlug, JSON.stringify(cacheItem));
      if (deletedPaths.length > 0) {
        console.warn(
          `The following paths seem to have been deleted in ${project.name}: }`,
          deletedPaths
        );
      }
    })
  );
};
const Doks = lazy(() => import("./doks"));
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
    <Suspense
      fallback={
        <CircularProgress
          sx={{ position: "absolute", top: "50%", left: "50%" }}
        ></CircularProgress>
      }
    >
      <Doks {...options}></Doks>
    </Suspense>,
    targetNode
  );
};
