import {
  ComponentContextProvider,
  defaultComponents,
} from "./src/components/components";
import { docs } from "./src/main";

docs({
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
  wrapDocs: (docs) => {
    return (
      <ComponentContextProvider
        value={{ ...defaultComponents, NavbarTitle: () => <>"demo docs"</> }}
      >
        {docs}
      </ComponentContextProvider>
    );
  },
});
