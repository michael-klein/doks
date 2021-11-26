import { IndexSearchResult, Index } from "flexsearch";
import { documents$, DoksDocument } from "../store/documents";
import removeMd from "remove-markdown";
import lunr from "lunr";

let index: lunr.Index;
documents$.subscribe((documents) => {
  index = lunr(function () {
    this.ref("slug");
    this.field("content");
    documents.forEach((document) => {
      this.add({
        slug: document.slug,
        content: removeMd(document.mdx + " " + document.mdx),
      });
    });
  });
});

export const searchDocuments = (query: string) => {
  if (index) {
    return index.search(query).map((result) => {
      return documents$.value.get(result.ref);
    });
  }
  return [];
};
