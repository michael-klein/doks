import { join } from "path-browserify";
import removeMd from "remove-markdown";
import { Contents } from "../store/contents";
import { DoksDocument } from "../store/documents";

const fetchDocument = async (contents: Contents, projectRoot: string) => {
  const lastModified = await fetch(join(projectRoot, contents.path), {
    method: "HEAD",
  }).then((value) => {
    return value.headers.get("Last-Modified");
  });
  const mdx = await fetch("/" + join(projectRoot, contents.path)).then((res) =>
    res.text()
  );
  return {
    ...contents,
    mdx,
    plain: removeMd(mdx),
    lastModified,
  };
};

onmessage = (message) => {
  const type = message.data[0];
  const value = message.data[1];
  switch (type) {
    case "fetch":
      fetchDocument(value.contents, value.projectRoot).then((doc) => {
        console.log("fetched", doc);
        postMessage(["fetch_done", doc]);
      });
  }
};
