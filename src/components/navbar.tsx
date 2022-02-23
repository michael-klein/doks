import CodeIcon from "@mui/icons-material/Code";
import EditIcon from "@mui/icons-material/Edit";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useObservableState } from "observable-hooks";
import React, { Suspense } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { combineLatest, map } from "rxjs";
import { useColorModeContext } from "../css/theme";
import { useComponentContext } from "../hooks/use_component_context";
import { useObservableAndState } from "../hooks/use_observable_and_state";
import {
  documents$,
  DoksDocument,
  fetchingDocuments$,
  queuedDocuments$,
} from "../store/documents";
import { codeTheme$ } from "../utils/code_theme";
import { ValueSubject } from "../utils/value_subject";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Button from "@mui/material/Button";

const syntaxThemes = [
  "anOldHope",
  "arta",
  "atelierDuneDark",
  "atelierDuneLight",
  "darcula",
  "far",
  "github",
  "isblEditorDark",
  "isblEditorLight",
  "sunburst",
  "gradientDark",
  "monokai",
  "nightOwl",
];

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
export const SearchProgress = styled(LinearProgress)(({ theme }) => ({
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
}));
const showSearch$ = new ValueSubject(false);
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
  const { NavbarMenu, NavbarFavButton } = useComponentContext();
  return (
    <NavbarMenu
      tooltip="Favourites"
      items={
        favDocs?.map((doc) => ({
          key: doc.slug,
          label: doc.name,
          onClick: () => onFavClicked(doc),
        })) ?? []
      }
    >
      <NavbarFavButton></NavbarFavButton>
    </NavbarMenu>
  );
};

const SyntaxMenu = () => {
  const { NavbarMenu } = useComponentContext();
  const [codeTheme] = useObservableState(() => codeTheme$);
  return (
    <NavbarMenu
      tooltip="Syntax theme"
      items={
        syntaxThemes.map((theme) => {
          return {
            key: theme,
            label: theme,
            selected: codeTheme === theme,
            onClick: () => {
              codeTheme$.next(theme);
            },
          };
        }) ?? []
      }
    >
      <CodeIcon></CodeIcon>
    </NavbarMenu>
  );
};
export const NavbarTitle = () => <>documentation</>;
const NavAppBar = styled(AppBar)(({ theme }) => ({
  "a, a:link, a:visited, a:hover, a:active": {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    textDecoration: "none",
  },
  "a:hover": {
    textDecoration: "underline",
  },
}));
function Navbar({ embed }: { embed?: boolean }) {
  const [hasDocumentsFetching] = useObservableAndState(() =>
    combineLatest([queuedDocuments$, fetchingDocuments$]).pipe(
      map(
        ([queuedDocuments, fetchingDocuments]) =>
          queuedDocuments.docs.size > 0 || fetchingDocuments.size > 0
      )
    )
  );
  const params = useParams();
  const location = useLocation();
  const { mode, toggleColorMode } = useColorModeContext();
  const {
    NavbarTitle,
    SearchProgress,
    NavbarButton,
    SearchIconWrapper,
    SearchInputWrapper,
    SearchOverlay,
  } = useComponentContext();
  return (
    <Box
      sx={{
        flex: 0,
        position: embed ? "static" : "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {hasDocumentsFetching && (
        <SearchProgress
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        />
      )}
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
            <Link to="/docs/">
              <NavbarTitle></NavbarTitle>
            </Link>
          </Typography>
          {!embed ? (
            <>
              {params.contentSlug && location.pathname.startsWith("/docs") && (
                <Tooltip title="edit current document">
                  <Link
                    to={`/editor/${params.projectSlug}/${params.contentSlug}`}
                  >
                    <NavbarButton aria-label="editor">
                      <EditIcon />
                    </NavbarButton>
                  </Link>
                </Tooltip>
              )}
              <Tooltip title="create document">
                <Link to={"/editor/" + params.projectSlug ?? ""}>
                  <NavbarButton aria-label="editor">
                    <PostAddIcon />
                  </NavbarButton>
                </Link>
              </Tooltip>
              <SyntaxMenu />
              <FavMenu />
              <NavbarButton
                aria-label="toggle dark mode"
                onClick={toggleColorMode}
              >
                {mode === "light" ? (
                  <Brightness4Icon sx={{ fontSize: 20 }} />
                ) : (
                  <Brightness7Icon sx={{ fontSize: 20 }} />
                )}
              </NavbarButton>
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
            </>
          ) : (
            <>
              <a
                href={window.location.href.replace("#/embed", "#/docs")}
                target="window"
              >
                <Button variant="contained">open in docs</Button>
              </a>
            </>
          )}
        </Toolbar>
      </NavAppBar>
      <Suspense fallback={<></>}>
        <SearchOverlay show$={showSearch$}></SearchOverlay>
      </Suspense>
    </Box>
  );
}
export default Navbar;
