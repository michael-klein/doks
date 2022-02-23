import { createContext, lazy } from "react";
import {
  NavbarTitle,
  NavbarButton,
  NavbarFavButton,
  NavbarMenu,
  SearchIconWrapper,
  SearchInputWrapper,
  SearchProgress,
} from "../components/navbar_parts";
import { Background } from "./background";
import { ConditionalCard } from "./conditional_card";
import { EditorRenderer } from "./editor_renderer";
import { Footer } from "./footer";
import {
  EditorWrapper,
  EditorContentBox,
  EditorHeader,
  EditorSidebarBox,
  MarkdownEditor,
} from "./markdown_editor";
import { MarkdownRenderer, MDX } from "./markdown_renderer";
import { SearchOverlay } from "./search";
import { TableOfContents } from "./table_of_contents";

const Sidebar = lazy(() => import("../components/sidebar"));
const Content = lazy(() => import("../components/content"));
const Navbar = lazy(() => import("../components/navbar"));

export const defaultComponents = {
  Background: Background,
  Content: Content,
  EditorRenderer: EditorRenderer,
  Footer: Footer,
  EditorWrapper: EditorWrapper,
  EditorContentBox: EditorContentBox,
  EditorHeader: EditorHeader,
  EditorSidebarBox: EditorSidebarBox,
  MarkdownEditor: MarkdownEditor,
  MarkdownRenderer: MarkdownRenderer,
  MDX: MDX,
  Sidebar: Sidebar,
  Navbar: Navbar,
  NavbarTitle: NavbarTitle,
  NavbarButton: NavbarButton,
  NavbarFavButton: NavbarFavButton,
  NavbarMenu: NavbarMenu,
  SearchIconWrapper: SearchIconWrapper,
  SearchInputWrapper: SearchInputWrapper,
  SearchProgress: SearchProgress,
  TableOfContents: TableOfContents,
  SearchOverlay: SearchOverlay,
};

export type ComponentsContext = typeof defaultComponents;
export const componentContext =
  createContext<ComponentsContext>(defaultComponents);
export const ComponentContextProvider = componentContext.Provider;
