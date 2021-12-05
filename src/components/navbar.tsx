import * as React from "preact";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { BehaviorSubject, combineLatest, map } from "rxjs";
import { SearchOverlay } from "./search";
import { LinearProgress, Menu, MenuItem, Tooltip } from "@mui/material";
import { useObservableAndState } from "../hooks/use_observable_and_state";
import {
  documents$,
  DoksDocument,
  fetchingDocuments$,
  queuedDocuments$,
} from "../store/documents";
import { useDocOptions } from "../hooks/use_doc_options_context";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCallback, useState } from "preact/hooks";
import { Fragment } from "react";
import { useObservableState } from "observable-hooks";
import { useNavigate, useParams } from "react-router";

const SearchInputWrapper = styled("div")(({ theme }) => ({
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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
    },
  },
}));
const Progress = styled(LinearProgress)(({ theme }) => ({
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
}));
const showSearch$ = new BehaviorSubject(false);
const FavButton = styled(FavoriteIcon)(({ theme }) => ({
  "&:hover": {
    color: "red",
  },
}));
const FavMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.target as HTMLElement);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [favDocs] = useObservableState(() =>
    documents$.pipe(
      map((docs) => Array.from(docs.values()).filter((doc) => doc.isFavourite))
    )
  );
  const navigate = useNavigate();
  const onFavClicked = (doc: DoksDocument) => {
    navigate(`/docs/${doc.projectSlug}/${doc.slug}`, {
      replace: true,
    });
    handleClose();
  };
  return favDocs?.length > 0 ? (
    <Fragment>
      <Tooltip title="favourites">
        <IconButton aria-label="favourites" onClick={handleClick}>
          <FavButton />
        </IconButton>
      </Tooltip>
      <Menu
        id="fav-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 200,
            width: "20ch",
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
        {favDocs.map((doc) => (
          <MenuItem key={doc.slug} onClick={() => onFavClicked(doc)}>
            {doc.name}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  ) : undefined;
};
export function Navbar() {
  const [hasDocumentsFetching] = useObservableAndState(() =>
    combineLatest(queuedDocuments$, fetchingDocuments$).pipe(
      map(
        ([queuedDocuments, fetchingDocuments]) =>
          queuedDocuments.docs.size > 0 || fetchingDocuments.size > 0
      )
    )
  );
  const { title = "documentation" } = useDocOptions();
  return (
    <Box sx={{ flex: 0, position: "sticky", top: 0, zIndex: 1000 }}>
      {hasDocumentsFetching && <Progress />}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {title}
          </Typography>

          <FavMenu />
          <SearchInputWrapper
            sx={{ cursor: "text" }}
            onClick={(e) => {
              e.target.blur();
              showSearch$.next(true);
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onFocus={(e) => {
                e.target.blur();
                showSearch$.next(true);
              }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </SearchInputWrapper>
        </Toolbar>
      </AppBar>
      <SearchOverlay show$={showSearch$}></SearchOverlay>
    </Box>
  );
}
