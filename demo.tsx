import { docs } from "./src/main";

docs({
  targetNode: document.getElementById("app"),
  projects: [
    {
      root: "test_docs",
      name: "test docs",
    },
  ],
});
