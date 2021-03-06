import * as interfaces from "./src/interfaces";
import * as main from "./src/main";
import * as components from "./src/components/components";
declare module "doks" {
  export = interfaces;
  export const docs: typeof main.docs;
  export const ComponentContextProvider: typeof components.ComponentContextProvider;
  export const defaultComponents: typeof components.defaultComponents;
  export type ComponentsContext = components.ComponentsContext;
}
