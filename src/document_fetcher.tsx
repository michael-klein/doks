import slugify from "@sindresorhus/slugify";
import { join } from "path-browserify";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useDocOptions } from "./hooks/use_doc_options_context";
import { DocOptionsProject } from "./interfaces";
import {
  addOrUpdateContents,
  addOrUpdateManyContents,
  addOrUpdateProject,
  Contents,
  contents$,
  Project,
  removeContents,
} from "./store/contents";
import {
  getCachedDocument,
  getLastModified,
  queueDocument,
} from "./store/documents";

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
const loadProjects = async (
  projects: DocOptionsProject[],
  currentProjectSlug,
  currentContentSlug
) => {
  const docProjects: Project[] = [];
  projects.forEach((project) => {
    const projectSlug = slugify(project.root);
    const docProject = {
      ...project,
      path: project.root,
      slug: projectSlug,
      name: project.name,
    };
    addOrUpdateProject(docProject);
    if (projectSlug === currentProjectSlug) {
      docProjects.unshift(docProject);
    } else {
      docProjects.push(docProject);
    }
  });
  await Promise.all(
    docProjects.map(async (project) => {
      const projectSlug = project.slug;
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
      let contents: Contents[];
      if (cached.lastModified === lastModified) {
        addOrUpdateManyContents(cached.contents, projectSlug);
        contents = cached.contents;
      } else {
        contents = contentsText.split("\n").map((c) => {
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
          return { ...item };
        });
      }
      if (projectSlug === currentProjectSlug) {
        const index = contents.findIndex((c) => c.slug === currentContentSlug);
        if (index > -1) {
          contents.unshift(contents.splice(index, 1)[0]);
        }
      }

      const deletedPaths: string[] = [];
      await Promise.all(
        contents.map((c) =>
          loadContentsDocument({ ...c }, project, projectSlug, deletedPaths)
        )
      );
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
let startedLoading = false;
export const DocumentFetcher = () => {
  const { projects } = useDocOptions();
  const params = useParams();
  useEffect(() => {
    if (!startedLoading) {
      startedLoading = true;
      loadProjects(projects, params.projectSlug, params.contentSlug);
    }
  }, []);
  return <></>;
};
