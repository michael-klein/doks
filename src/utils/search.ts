import { IndexSearchResult, Index } from "flexsearch";
import { documents$, DoksDocument } from "../store/documents";
import lunr from "lunr";

let index: lunr.Index;
documents$.subscribe((documents) => {
  index = lunr(function () {
    this.ref("slug");
    this.field("content");
    documents.forEach((document) => {
      this.add({
        slug: document.slug,
        content: document.mdx + " " + document.plain,
      });
    });
  });
});

export const searchDocuments = (query: string) => {
  if (index && query.length > 2) {
    console.time("search");
    const result = index.search(query).map((result) => {
      return documents$.value.get(result.ref);
    });
    console.timeEnd("search");
    return result;
  }
  return [];
};
