import produce from "immer";
import { join } from "path-browserify";
import { ValueSubject } from "../utils/value_subject";
import DocumentWorker from "../workers/document_worker?worker";
import { Contents, projects$, updateContents } from "./contents";

export interface DoksDocument extends Contents {
  mdx: string;
  plain: string;
  lastModified: string;
  isFavourite?: boolean;
}
export const documents$ = new ValueSubject<Map<string, DoksDocument>>(
  new Map()
);

export const queuedDocuments$ = new ValueSubject<{
  docs: Map<string, Contents>;
  order: string[];
}>({
  docs: new Map(),
  order: [],
});

export const fetchingDocuments$ = new ValueSubject(new Set<string>());

const CACHE_PREFEX = "doks-cache";
let flushCache = false;
(window as any).flushCacheOnReload = () => {
  flushCache = true;
};
const cachedDocuments = new Map<string, DoksDocument>();
export const getCachedDocument = (slug: string) => {
  if (cachedDocuments.has(slug)) {
    return cachedDocuments.get(slug);
  }
  const cachedString = localStorage.getItem(CACHE_PREFEX + slug);
  if (cachedString) {
    const doc: DoksDocument = JSON.parse(cachedString);
    cachedDocuments.set(slug, doc);
    return doc;
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
        if (docNew.mdx.trim().startsWith("#")) {
          docNew.name = docNew.mdx.split("\n")[0].replace("#", "").trim();
        }
      }
      updateContents(
        { slug: docNew.slug, name: docNew.name },
        docNew.projectSlug
      );
      draft.set(doc.slug, docNew);
    })
  );
};

const cacheDocument = (doc: DoksDocument) => {
  if (!flushCache) {
    localStorage.setItem(CACHE_PREFEX + doc.slug, JSON.stringify(doc));
  }
};

window.onunload = () => {
  if (flushCache) {
    localStorage.clear();
  }
  documents$.value.forEach((doc) => cacheDocument(doc));
};
export const getLastModified = async (src: string) => {
  try {
    return await fetch(src, {
      method: "HEAD",
    }).then((response) => {
      if (response.ok) {
        return response.headers.get("Last-Modified");
      } else {
        throw new Error("does not exist");
      }
    });
  } catch (e) {
    return false;
  }
};

const workerPool: Worker[] = [];
const spawnWorker = () => {
  const worker = new DocumentWorker();
  worker.onmessage = (event) => {
    switch (event.data[0]) {
      case "fetch_done":
        workerPool.push(worker);
        const doc = event.data[1];
        modifyDocument(doc);
        fetchingDocuments$.next(
          produce(fetchingDocuments$.value, (draft) => {
            draft.delete(doc.slug);
          })
        );
    }
  };
  return worker;
};
const sendToWorker = (type: string, payload: any) => {
  const worker = workerPool.shift() ?? spawnWorker();
  worker.postMessage([type, payload]);
};

const fetchDocument = async (contents: Contents) => {
  const project = projects$.value.get(contents.projectSlug);
  fetchingDocuments$.next(
    produce(fetchingDocuments$.value, (draft) => {
      draft.add(contents.slug);
    })
  );

  const cached = getCachedDocument(contents.slug);
  if (cached && cached.lastModified === contents.lastModified) {
    modifyDocument(cached);
    fetchingDocuments$.next(
      produce(fetchingDocuments$.value, (draft) => {
        draft.delete(contents.slug);
      })
    );
  } else {
    sendToWorker("fetch", {
      contents: { ...contents },
      projectRoot: project.root,
    });
  }
};
const MAX_QUEUE = 50;
const shiftQueue = () => {
  if (
    queuedDocuments$.value.order.length > 0 &&
    queuedDocuments$.value.docs.size < MAX_QUEUE
  ) {
    let contents: Contents;
    queuedDocuments$.next(
      produce(queuedDocuments$.value, (draft) => {
        const slug = draft.order.shift();
        contents = queuedDocuments$.value.docs.get(slug);
        draft.docs.delete(slug);
        const index = draft.order.indexOf(slug);
        if (index > -1) {
          draft.order.splice(index, 1);
        }
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
