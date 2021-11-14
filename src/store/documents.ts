import produce from "immer";
import { join } from "path-browserify";
import { BehaviorSubject } from "rxjs";
import { DocOptionsProject } from "../main";
import { Contents, Project } from "./contents";

export interface DoksDocument extends Contents {
  mdx: string;
}
export const documents$ = new BehaviorSubject<Map<string, DoksDocument>>(
  new Map()
);

documents$.subscribe((d) => {
  console.log("document", d);
});

export const queuedDocuments$ = new BehaviorSubject<{
  docs: Map<string, Contents>;
  order: string[];
}>({
  docs: new Map(),
  order: [],
});

const fetchingDocuments = new Set<string>();

const fetchDocument = async (
  contents: Contents,
  project: DocOptionsProject
) => {
  console.log("fetch", contents.path);
  await fetch(join(project.root, contents.path))
    .then((res) => res.text())
    .then((mdx) => {
      documents$.next(
        produce(documents$.value, (draft) => {
          draft.set(contents.slug, { ...contents, mdx });
        })
      );
      fetchingDocuments.delete(contents.slug);
    });
};

const shiftQueue = (project: DocOptionsProject) => {
  if (fetchingDocuments.size < 4 && queuedDocuments$.value.order.length > 0) {
    queuedDocuments$.next(
      produce(queuedDocuments$.value, (draft) => {
        const slug = draft.order.shift();
        const contents = queuedDocuments$.value.docs.get(slug);
        draft.docs.delete(slug);
        fetchDocument(contents, project);
      })
    );
  }
};
queuedDocuments$.subscribe((v) => {
  console.log("queued", v);

  if (!fetchingDocuments) {
  }
});

export const queueDocument = (
  contents: Contents,
  project: DocOptionsProject,
  prioritize: boolean = false
) => {
  if (
    documents$.value.has(contents.slug) &&
    !fetchingDocuments.has(contents.slug)
  ) {
    return;
  }
  queuedDocuments$.next(
    produce(queuedDocuments$.value, (draft) => {
      draft.docs.set(contents.slug, contents);

      if (prioritize) {
        const index = draft.order.indexOf(contents.slug);
        if (index > -1) {
          draft.order.splice(index, 1);
        }
        draft.order.unshift(contents.slug);
      } else {
        draft.order.push(contents.slug);
      }
    })
  );
  shiftQueue(project);
};
