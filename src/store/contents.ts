import produce, { enableMapSet } from "immer";
import { BehaviorSubject } from "rxjs";
import { DocOptionsProject } from "../interfaces";
enableMapSet();
export interface Contents {
  name: string;
  path: string;
  slug: string;
  projectSlug: string;
  depth: number;
}
export interface Project extends DocOptionsProject {
  path: string;
  name: string;
  slug: string;
  depthMap: Map<number, number>;
}
export const projects$ = new BehaviorSubject<Map<string, Project>>(new Map());
export const contents$ = new BehaviorSubject<
  Map<string, Map<string, Contents>>
>(new Map());
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

export const addOrUpdateContents = (
  contentsIn: Contents,
  projectSlug: string
) => {
  const project = projects$.value.get(projectSlug);
  const depths = new Set(project.depthMap.keys());
  depths.add(contentsIn.depth);
  let i = 0;
  depths.forEach((depth) => {
    projects$.next(
      produce(projects$.value, (draft) => {
        draft.get(projectSlug).depthMap.set(depth, i);
      })
    );
    i++;
  });
  contents$.next(
    produce(contents$.value, (draft) => {
      if (!draft.has(projectSlug)) {
        draft.set(projectSlug, new Map());
      }
      draft.get(projectSlug).set(contentsIn.slug, contentsIn);
    })
  );
};
