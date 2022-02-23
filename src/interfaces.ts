export interface DocOptionsProject {
  root: string;
  name: string;
}
export interface DocOptions {
  targetNode?: HTMLElement;
  projects: DocOptionsProject[];
  wrapDocs?: (docs: JSX.Element) => JSX.Element;
}
