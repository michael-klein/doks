import { ValueSubject } from "./value_subject";

const SYNTAX_KEY = "SYNTAX";
export const codeTheme$ = new ValueSubject(
  localStorage.getItem(SYNTAX_KEY) ?? "atomOneDark"
);

codeTheme$.subscribe((theme) => {
  localStorage.setItem(SYNTAX_KEY, theme);
});
