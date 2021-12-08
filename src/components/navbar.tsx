import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SearchIcon from "@mui/icons-material/Search";
import { combineLatest, map } from "rxjs";
import EditIcon from "@mui/icons-material/Edit";
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
import { Fragment } from "react";
import { useObservableState } from "observable-hooks";
import { useNavigate, useParams, useLocation } from "react-router";
import { Link } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import { ValueSubject } from "../utils/value_subject";
import * as SyntaxThemes from "react-syntax-highlighter/dist/esm/styles/hljs";
import { codeTheme$ } from "./markdown_renderer";

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
const showSearch$ = new ValueSubject(false);
const FavButton = styled(FavoriteIcon)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
  "&:hover": {
    color: "red",
  },
}));
const NavButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
  "&:hover": {
    color: theme.palette.primary.dark,
  },
}));

const NavMenu = ({
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
        <NavButton aria-label={tooltip} onClick={handleClick}>
          {children}
        </NavButton>
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
const FavMenu = () => {
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
  };
  return (
    <NavMenu
      tooltip="Favourites"
      items={
        favDocs?.map((doc) => ({
          key: doc.slug,
          label: doc.name,
          onClick: () => onFavClicked(doc),
        })) ?? []
      }
    >
      <FavButton></FavButton>
    </NavMenu>
  );
};

const SyntaxMenu = () => {
  return (
    <NavMenu
      tooltip="Syntax theme"
      items={
        Object.keys(SyntaxThemes).map((key) => {
          const theme = SyntaxThemes[key];
          return {
            key,
            label: key,
            onClick: () => {
              codeTheme$.next(theme);
            },
          };
        }) ?? []
      }
    >
      <CodeIcon></CodeIcon>
    </NavMenu>
  );
};
const NavAppBar = styled(AppBar)(({ theme }) => ({
  "a, a:link, a:visited, a:hover, a:active": {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    textDecoration: "none",
  },
  "a:hover": {
    textDecoration: "underline",
  },
}));
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
  const params = useParams();
  const location = useLocation();
  return (
    <Box sx={{ flex: 0, position: "sticky", top: 0, zIndex: 1000 }}>
      {hasDocumentsFetching && <Progress />}
      <NavAppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Link to="/docs/">{title}</Link>
          </Typography>

          {params.contentSlug && location.pathname.startsWith("/docs") && (
            <Tooltip title="edit current document">
              <Link to={`/editor/${params.projectSlug}/${params.contentSlug}`}>
                <NavButton aria-label="editor">
                  <EditIcon />
                </NavButton>
              </Link>
            </Tooltip>
          )}
          <Tooltip title="create document">
            <Link to={"/editor/" + params.projectSlug ?? ""}>
              <NavButton aria-label="editor">
                <PostAddIcon />
              </NavButton>
            </Link>
          </Tooltip>
          <SyntaxMenu />
          <FavMenu />
          <SearchInputWrapper
            sx={{ cursor: "text" }}
            onClick={(e: React.MouseEvent<HTMLInputElement>) => {
              e.currentTarget.blur();
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
      </NavAppBar>
      <SearchOverlay show$={showSearch$}></SearchOverlay>
    </Box>
  );
}
