import * as interfaces from "./src/interfaces";
import * as main from "./src/main";
import * as components from "./src/components/components";
declare module "doks" {
  export = interfaces;
  export type docs = typeof main.docs;
  export type ComponentContextProvider =
    typeof components.ComponentContextProvider;
  export type ComponentsContext = components.ComponentsContext;
}
