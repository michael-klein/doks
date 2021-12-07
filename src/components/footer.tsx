import { Button } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const StyledFooter = styled("footer")(({ theme }) => ({
  background: theme.palette.primary.light,
  padding: 20,
  display: "flex",
  justifyContent: "flex-end",
}));
const UpButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.dark,
}));
export const Footer = () => {
  return (
    <StyledFooter>
      <UpButton
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <KeyboardArrowUpIcon></KeyboardArrowUpIcon>up
      </UpButton>
    </StyledFooter>
  );
};
