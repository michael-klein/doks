import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {
  createContext,
  ReactChild,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0d47a1",
    },
    secondary: {
      main: "#ad1457",
    },
  },
});
export type DoksTheme = typeof theme;

const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: undefined as PaletteMode,
});
export const useColorModeContext = () => {
  return useContext(ColorModeContext);
};
const COLOR_MODE_KEY = "color-mode";
export const DocsThemeProvider = ({ children }: { children: ReactChild }) => {
  const [mode, setMode] = useState<PaletteMode>(
    (localStorage.getItem(COLOR_MODE_KEY) as PaletteMode) ?? "light"
  );
  useEffect(() => {
    localStorage.setItem(COLOR_MODE_KEY, mode);
  }, [mode]);
  const value = useMemo(() => {
    return {
      toggleColorMode: () => {
        setMode((m) => (m === "light" ? "dark" : "light"));
      },
      mode,
    };
  }, [mode]);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#0d47a1",
          },
          secondary: {
            main: "#ad1457",
          },
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
