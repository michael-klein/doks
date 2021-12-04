import lunr from "lunr";
import { documents$, DoksDocument } from "../store/documents";

let index: lunr.Index;
const projectIndizes: Map<string, lunr.Index> = new Map();

documents$.subscribe((documents) => {
  const documentsByProject = new Map<string, DoksDocument[]>();
  index = lunr(function () {
    this.ref("slug");
    this.field("content");
    documents.forEach((document) => {
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
});

export const searchDocuments = (query: string, projectSlug?: string) => {
  const indexToSeach = projectSlug ? projectIndizes.get(projectSlug) : index;
  console.log(projectSlug, indexToSeach);
  if (indexToSeach && query.length > 2) {
    console.time("search");
    const result = indexToSeach.search(query).map((result) => {
      return documents$.value.get(result.ref);
    });
    console.timeEnd("search");
    return result;
  }
  return [];
};
