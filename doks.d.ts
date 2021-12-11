declare module "doks" {
  export interface DocOptionsProject {
    root: string;
    name: string;
  }
  export interface DocOptions {
    title?: string;
    targetNode?: HTMLElement;
    projects: DocOptionsProject[];
  }
  export default function (options: DocOptions): void;
}
