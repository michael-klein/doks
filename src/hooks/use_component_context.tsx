import { useContext } from "react";
import { componentContext } from "../components/components";

export const useComponentContext = () => useContext(componentContext);
