import produce from "immer";
import { join } from "path-browserify";
import { BehaviorSubject } from "rxjs";
import DocumentWorker from "../workers/document_worker?worker";
import { Contents, projects$, updateContents } from "./contents";

const documentWorker = new DocumentWorker();

export interface DoksDocument extends Contents {
  mdx: string;
  plain: string;
  lastModified: string;
  isFavourite?: boolean;
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

const CACHE_PREFEX = "doks-cache-";
const getCachedDocument = (slug: string, lastModified: string) => {
  const cachedString = localStorage.getItem(CACHE_PREFEX + slug);
  if (cachedString) {
    const doc: DoksDocument = JSON.parse(cachedString);
    if (doc.lastModified === lastModified) {
      return doc;
    }
  }
  return undefined;
};

export const modifyDocument = (
  doc: Partial<DoksDocument> & { slug: string }
) => {
  documents$.next(
    produce(documents$.value, (draft) => {
      const docNew: DoksDocument = {
        ...(documents$.value.get(doc.slug) ?? ({} as DoksDocument)),
        ...doc,
      };
      if (docNew.name === docNew.path) {
        if (docNew.mdx.startsWith("#")) {
          docNew.name = docNew.mdx.split("\n")[0].replace("#", "").trim();
          updateContents(
            { slug: docNew.slug, name: docNew.name },
            docNew.projectSlug
          );
        }
      }
      cacheDocument(docNew);
      draft.set(doc.slug, docNew);
    })
  );
};

const cacheDocument = (doc: DoksDocument) =>
  localStorage.setItem(CACHE_PREFEX + doc.slug, JSON.stringify(doc));
documentWorker.onmessage = (event) => {
  switch (event.data[0]) {
    case "fetch_done":
      const doc = event.data[1];
      modifyDocument(doc);
      fetchingDocuments$.next(
        produce(fetchingDocuments$.value, (draft) => {
          draft.delete(doc.slug);
        })
      );
  }
};
const fetchDocument = async (contents: Contents) => {
  const project = projects$.value.get(contents.projectSlug);
  fetchingDocuments$.next(
    produce(fetchingDocuments$.value, (draft) => {
      draft.add(contents.slug);
    })
  );

  const lastModified = await fetch(join(project.root, contents.path), {
    method: "HEAD",
  }).then((value) => {
    return value.headers.get("Last-Modified");
  });
  const cached = getCachedDocument(contents.slug, lastModified);
  if (cached) {
    modifyDocument(cached);
    fetchingDocuments$.next(
      produce(fetchingDocuments$.value, (draft) => {
        draft.delete(contents.slug);
      })
    );
  } else {
    documentWorker.postMessage([
      "fetch",
      { contents: { ...contents, lastModified }, projectRoot: project.root },
    ]);
  }
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
