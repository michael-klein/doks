import { d as default_1, B as Box } from "./styled.js";
const Background = default_1(Box)(({
  theme
}) => ({
  background: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[100],
  flex: "auto",
  flexDirection: "column",
  display: "flex"
}));
export { Background as B };
//# sourceMappingURL=background.js.map
