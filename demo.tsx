import { docs } from "./src/main";

docs({
  title: "demo docs",
  targetNode: document.getElementById("app"),
  projects: [
    {
      root: "test_docs",
      name: "test docs",
    },
    {
      root: "test_docs2",
      name: "test docs 2",
    },
  ],
});
