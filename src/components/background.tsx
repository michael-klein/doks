import styled from "@mui/system/styled";
import Box from "@mui/system/Box";

export const Background = styled(Box)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[100],
  flex: "auto",
  flexDirection: "column",
  display: "flex",
}));
