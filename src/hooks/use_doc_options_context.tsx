import { createContext, ComponentChildren } from "preact";
import { useContext } from "preact/hooks";
import { DocOptions } from "../interfaces";

const docOptionsContext = createContext<DocOptions>(undefined);
const { Provider } = docOptionsContext;
export const DocOptionsContextProvider = (props: {
  children: ComponentChildren;
  options: DocOptions;
}) => {
  return <Provider value={props.options}>{props.children}</Provider>;
};

export const useDocOptions = () => useContext(docOptionsContext);
