import lunr from "lunr";
import { documents$, DoksDocument } from "../store/documents";

let index: lunr.Index;
const projectIndizes: Map<string, lunr.Index> = new Map();

documents$.subscribe(() => {
  index = undefined;
});

const createIndex = () => {
  if (index) {
    return;
  }
  const documentsByProject = new Map<string, DoksDocument[]>();
  index = lunr(function () {
    this.ref("slug");
    this.field("content");
    documents$.value.forEach((document) => {
      this.add({
        slug: document.slug,
        content: document.mdx + " " + document.plain,
      });
      if (!documentsByProject.has(document.projectSlug)) {
        documentsByProject.set(document.projectSlug, []);
      }
      documentsByProject.get(document.projectSlug).push(document);
    });
  });
  projectIndizes.clear();
  documentsByProject.forEach((documents, projectSlug) => {
    projectIndizes.set(
      projectSlug,
      lunr(function () {
        this.ref("slug");
        this.field("content");
        documents.forEach((document) => {
          this.add({
            slug: document.slug,
            content: document.mdx + " " + document.plain,
          });
        });
      })
    );
  });
};

export const searchDocuments = (query: string, projectSlug?: string) => {
  if (query.length > 2) {
    createIndex();
    const indexToSeach = projectSlug ? projectIndizes.get(projectSlug) : index;
    if (indexToSeach) {
      const result = indexToSeach.search(query).map((result) => {
        return documents$.value.get(result.ref);
      });
      return result;
    }
  }
  return [];
};
