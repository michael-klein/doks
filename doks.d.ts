declare module "doks" {
  export interface DocOptionsProject {
    root: string;
    name: string;
  }
  export interface DocOptions {
    title?: string | JSX.Element | React.ReactNode;
    targetNode?: HTMLElement;
    projects: DocOptionsProject[];
  }
  export function docs(options: DocOptions): void;
}
