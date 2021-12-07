import { DocOptions } from "../interfaces";
import React, {
  createContext,
  ReactChild,
  ReactChildren,
  useContext,
} from "react";

const docOptionsContext = createContext<DocOptions>(undefined);
const { Provider } = docOptionsContext;
export const DocOptionsContextProvider = (props: {
  children: ReactChild | ReactChildren;
  options: DocOptions;
}) => {
  return <Provider value={props.options}>{props.children}</Provider>;
};

export const useDocOptions = () => useContext(docOptionsContext);
