import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import React, { Fragment, useState } from "react";

export const SearchInputWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const SearchProgress = styled(LinearProgress)(({ theme }) => ({
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
}));
export const NavbarFavButton = styled(FavoriteIcon)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
  "&:hover": {
    color: "red",
  },
}));
export const NavbarButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
  "&:hover": {
    color: theme.palette.primary.dark,
  },
}));

export const NavbarMenu = ({
  items,
  children,
  tooltip,
}: {
  children: React.ReactChild;
  tooltip: string;
  items: { key: string; label: string; onClick: () => void }[];
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.target as HTMLElement);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return items?.length > 0 ? (
    <Fragment>
      <Tooltip title={tooltip}>
        <NavbarButton aria-label={tooltip} onClick={handleClick}>
          {children}
        </NavbarButton>
      </Tooltip>
      <Menu
        id="fav-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: "80vh",
            width: "100%",
            maxWidth: "200px",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {items.map(({ onClick, label, key }) => (
          <MenuItem
            key={key}
            onClick={() => {
              onClick();
              handleClose();
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  ) : (
    <></>
  );
};

export const NavbarTitle = () => <>documentation</>;
