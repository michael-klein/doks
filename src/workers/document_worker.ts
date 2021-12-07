import { join } from "path-browserify";
import removeMd from "remove-markdown";
import { Contents } from "../store/contents";

const fetchDocumentInWorker = async (
  contents: Contents,
  projectRoot: string
) => {
  const mdx = await fetch("/" + join(projectRoot, contents.path)).then((res) =>
    res.text()
  );
  return {
    ...contents,
    mdx,
    plain: removeMd(mdx),
  };
};

onmessage = (message) => {
  const type = message.data[0];
  const value = message.data[1];
  switch (type) {
    case "fetch":
      fetchDocumentInWorker(value.contents, value.projectRoot).then((doc) => {
        postMessage(["fetch_done", doc]);
      });
  }
};
