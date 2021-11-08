import produce from "immer";
import { BehaviorSubject } from "rxjs";
import { Contents } from "./contents";

export const queuedDocuments = new BehaviorSubject<{
  docs: Map<string, Contents>;
  order: string[];
}>({
  docs: new Map(),
  order: [],
});
export const queueDocument = (
  contents: Contents,
  prioritize: boolean = false
) => {
  queuedDocuments.next(
    produce(queuedDocuments.value, (draft) => {
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
};
