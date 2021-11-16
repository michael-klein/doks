import produce from "immer";
import { join } from "path-browserify";
import { BehaviorSubject, combineLatest, throttle, throttleTime } from "rxjs";
import { DocOptionsProject } from "../main";
import { Contents, Project, projects$ } from "./contents";

export interface DoksDocument extends Contents {
  mdx: string;
}
export const documents$ = new BehaviorSubject<Map<string, DoksDocument>>(
  new Map()
);

export const queuedDocuments$ = new BehaviorSubject<{
  docs: Map<string, Contents>;
  order: string[];
}>({
  docs: new Map(),
  order: [],
});

export const fetchingDocuments$ = new BehaviorSubject(new Set<string>());

const fetchDocument = async (contents: Contents) => {
  const project = projects$.value.get(contents.projectSlug);
  fetchingDocuments$.next(
    produce(fetchingDocuments$.value, (draft) => {
      draft.add(contents.slug);
    })
  );
  await fetch(join(project.root, contents.path))
    .then((res) => res.text())
    .then((mdx) => {
      documents$.next(
        produce(documents$.value, (draft) => {
          draft.set(contents.slug, { ...contents, mdx });
        })
      );
      fetchingDocuments$.next(
        produce(fetchingDocuments$.value, (draft) => {
          draft.delete(contents.slug);
        })
      );
    });
};

const shiftQueue = () => {
  if (
    fetchingDocuments$.value.size < 4 &&
    queuedDocuments$.value.order.length > 0
  ) {
    let contents: Contents;
    queuedDocuments$.next(
      produce(queuedDocuments$.value, (draft) => {
        const slug = draft.order.shift();
        contents = queuedDocuments$.value.docs.get(slug);
        draft.docs.delete(slug);
      })
    );
    fetchDocument(contents);
  }
};

fetchingDocuments$.subscribe(shiftQueue);

export const queueDocument = (
  contents: Contents,
  prioritize: boolean = false
) => {
  if (
    documents$.value.has(contents.slug) ||
    fetchingDocuments$.value.has(contents.slug)
  ) {
    return;
  }
  console.log("queue", contents.slug);
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
  shiftQueue();
};
