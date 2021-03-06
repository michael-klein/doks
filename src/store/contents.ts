import produce, { enableMapSet } from "immer";
import { DocOptionsProject } from "../interfaces";
import { ValueSubject } from "../utils/value_subject";
enableMapSet();
export interface Contents {
  name: string;
  path: string;
  slug: string;
  projectSlug: string;
  depth: number;
  isOnlyHeading?: boolean;
  lastModified?: string;
}
export interface Project extends DocOptionsProject {
  path: string;
  name: string;
  slug: string;
}
export const projects$ = new ValueSubject<Map<string, Project>>(new Map());
export const contents$ = new ValueSubject<Map<string, Map<string, Contents>>>(
  new Map()
);
export const addOrUpdateProject = (project: Project) => {
  projects$.next(
    produce(projects$.value, (draft) => {
      draft.set(project.slug, project);
    })
  );
};
export const updateContents = (
  contentsIn: Partial<Contents> & { slug: string },
  projectSlug: string
) => {
  contents$.next(
    produce(contents$.value, (draft) => {
      draft.get(projectSlug).set(contentsIn.slug, {
        ...draft.get(projectSlug).get(contentsIn.slug),
        ...contentsIn,
      });
    })
  );
};
export const removeContents = (contentsSlug: string, projectSlug: string) => {
  contents$.next(
    produce(contents$.value, (draft) => {
      draft.get(projectSlug)?.delete(contentsSlug);
    })
  );
};

export const addOrUpdateContents = (
  contentsIn: Contents,
  projectSlug: string
) => {
  contents$.next(
    produce(contents$.value, (draft) => {
      if (!draft.has(projectSlug)) {
        draft.set(projectSlug, new Map());
      }
      draft.get(projectSlug).set(contentsIn.slug, contentsIn);
    })
  );
};

export const addOrUpdateManyContents = (
  contentsIn: Contents[],
  projectSlug: string
) => {
  contents$.next(
    produce(contents$.value, (draft) => {
      if (!draft.has(projectSlug)) {
        draft.set(projectSlug, new Map());
      }
      contentsIn.forEach(contents => {
        draft.get(projectSlug).set(contents.slug, contents);
      })
    })
  );
};
