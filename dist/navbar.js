import { P as Paper, a as createSvgIcon, i as interopRequireDefault, r as require$$2, _ as InputBase, $ as LinearProgress, a0 as ValueSubject, e as useObservableAndState, d as useParams, a1 as useLocation, a2 as useColorModeContext, u as useComponentContext, j as Box, T as Typography, a3 as Link, a4 as Tooltip, O as Button, K as useObservableState, h as documents$, g as useNavigate, a5 as codeTheme$, q as queuedDocuments$, f as fetchingDocuments$ } from "./doks.js";
import { g as generateUtilityClass, a as generateUtilityClasses, q as styled, c as capitalize, _ as _extends, r as useThemeProps, b as _objectWithoutPropertiesLoose, e as composeClasses, j as jsx, h as clsx, F as Fragment, i as jsxs } from "./main.js";
import * as React from "react";
import { Suspense } from "react";
import { map, combineLatest } from "rxjs";
import "react-dom";
import "rxjs/operators";
function getAppBarUtilityClass(slot) {
  return generateUtilityClass("MuiAppBar", slot);
}
generateUtilityClasses("MuiAppBar", ["root", "positionFixed", "positionAbsolute", "positionSticky", "positionStatic", "positionRelative", "colorDefault", "colorPrimary", "colorSecondary", "colorInherit", "colorTransparent"]);
const _excluded$1 = ["className", "color", "enableColorOnDark", "position"];
const useUtilityClasses$1 = (ownerState) => {
  const {
    color,
    position,
    classes
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color)}`, `position${capitalize(position)}`]
  };
  return composeClasses(slots, getAppBarUtilityClass, classes);
};
const AppBarRoot = styled(Paper, {
  name: "MuiAppBar",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`position${capitalize(ownerState.position)}`], styles[`color${capitalize(ownerState.color)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  const backgroundColorDefault = theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900];
  return _extends({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
    flexShrink: 0
  }, ownerState.position === "fixed" && {
    position: "fixed",
    zIndex: theme.zIndex.appBar,
    top: 0,
    left: "auto",
    right: 0,
    "@media print": {
      position: "absolute"
    }
  }, ownerState.position === "absolute" && {
    position: "absolute",
    zIndex: theme.zIndex.appBar,
    top: 0,
    left: "auto",
    right: 0
  }, ownerState.position === "sticky" && {
    position: "sticky",
    zIndex: theme.zIndex.appBar,
    top: 0,
    left: "auto",
    right: 0
  }, ownerState.position === "static" && {
    position: "static"
  }, ownerState.position === "relative" && {
    position: "relative"
  }, ownerState.color === "default" && {
    backgroundColor: backgroundColorDefault,
    color: theme.palette.getContrastText(backgroundColorDefault)
  }, ownerState.color && ownerState.color !== "default" && ownerState.color !== "inherit" && ownerState.color !== "transparent" && {
    backgroundColor: theme.palette[ownerState.color].main,
    color: theme.palette[ownerState.color].contrastText
  }, ownerState.color === "inherit" && {
    color: "inherit"
  }, theme.palette.mode === "dark" && !ownerState.enableColorOnDark && {
    backgroundColor: null,
    color: null
  }, ownerState.color === "transparent" && _extends({
    backgroundColor: "transparent",
    color: "inherit"
  }, theme.palette.mode === "dark" && {
    backgroundImage: "none"
  }));
});
const AppBar = /* @__PURE__ */ React.forwardRef(function AppBar2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiAppBar"
  });
  const {
    className,
    color = "primary",
    enableColorOnDark = false,
    position = "fixed"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$1);
  const ownerState = _extends({}, props, {
    color,
    position,
    enableColorOnDark
  });
  const classes = useUtilityClasses$1(ownerState);
  return /* @__PURE__ */ jsx(AppBarRoot, _extends({
    square: true,
    component: "header",
    ownerState,
    elevation: 4,
    className: clsx(classes.root, className, position === "fixed" && "mui-fixed"),
    ref
  }, other));
});
var AppBar$1 = AppBar;
function getToolbarUtilityClass(slot) {
  return generateUtilityClass("MuiToolbar", slot);
}
generateUtilityClasses("MuiToolbar", ["root", "gutters", "regular", "dense"]);
const _excluded = ["className", "component", "disableGutters", "variant"];
const useUtilityClasses = (ownerState) => {
  const {
    classes,
    disableGutters,
    variant
  } = ownerState;
  const slots = {
    root: ["root", !disableGutters && "gutters", variant]
  };
  return composeClasses(slots, getToolbarUtilityClass, classes);
};
const ToolbarRoot = styled("div", {
  name: "MuiToolbar",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, !ownerState.disableGutters && styles.gutters, styles[ownerState.variant]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  position: "relative",
  display: "flex",
  alignItems: "center"
}, !ownerState.disableGutters && {
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
}, ownerState.variant === "dense" && {
  minHeight: 48
}), ({
  theme,
  ownerState
}) => ownerState.variant === "regular" && theme.mixins.toolbar);
const Toolbar = /* @__PURE__ */ React.forwardRef(function Toolbar2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiToolbar"
  });
  const {
    className,
    component = "div",
    disableGutters = false,
    variant = "regular"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    component,
    disableGutters,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  return /* @__PURE__ */ jsx(ToolbarRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    ref,
    ownerState
  }, other));
});
var Toolbar$1 = Toolbar;
var Code = {};
var _interopRequireDefault$5 = interopRequireDefault.exports;
Object.defineProperty(Code, "__esModule", {
  value: true
});
var default_1$5 = Code.default = void 0;
var _createSvgIcon$5 = _interopRequireDefault$5(createSvgIcon);
var _jsxRuntime$5 = require$$2;
var _default$5 = (0, _createSvgIcon$5.default)(/* @__PURE__ */ (0, _jsxRuntime$5.jsx)("path", {
  d: "M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
}), "Code");
default_1$5 = Code.default = _default$5;
var Edit = {};
var _interopRequireDefault$4 = interopRequireDefault.exports;
Object.defineProperty(Edit, "__esModule", {
  value: true
});
var default_1$4 = Edit.default = void 0;
var _createSvgIcon$4 = _interopRequireDefault$4(createSvgIcon);
var _jsxRuntime$4 = require$$2;
var _default$4 = (0, _createSvgIcon$4.default)(/* @__PURE__ */ (0, _jsxRuntime$4.jsx)("path", {
  d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
}), "Edit");
default_1$4 = Edit.default = _default$4;
var PostAdd = {};
var _interopRequireDefault$3 = interopRequireDefault.exports;
Object.defineProperty(PostAdd, "__esModule", {
  value: true
});
var default_1$3 = PostAdd.default = void 0;
var _createSvgIcon$3 = _interopRequireDefault$3(createSvgIcon);
var _jsxRuntime$3 = require$$2;
var _default$3 = (0, _createSvgIcon$3.default)([/* @__PURE__ */ (0, _jsxRuntime$3.jsx)("path", {
  d: "M17 19.22H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2v7.22z"
}, "0"), /* @__PURE__ */ (0, _jsxRuntime$3.jsx)("path", {
  d: "M19 2h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V7h3V5h-3V2zM7 9h8v2H7zm0 3v2h8v-2h-3zm0 3h8v2H7z"
}, "1")], "PostAdd");
default_1$3 = PostAdd.default = _default$3;
var Search = {};
var _interopRequireDefault$2 = interopRequireDefault.exports;
Object.defineProperty(Search, "__esModule", {
  value: true
});
var default_1$2 = Search.default = void 0;
var _createSvgIcon$2 = _interopRequireDefault$2(createSvgIcon);
var _jsxRuntime$2 = require$$2;
var _default$2 = (0, _createSvgIcon$2.default)(/* @__PURE__ */ (0, _jsxRuntime$2.jsx)("path", {
  d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
}), "Search");
default_1$2 = Search.default = _default$2;
var Brightness4 = {};
var _interopRequireDefault$1 = interopRequireDefault.exports;
Object.defineProperty(Brightness4, "__esModule", {
  value: true
});
var default_1$1 = Brightness4.default = void 0;
var _createSvgIcon$1 = _interopRequireDefault$1(createSvgIcon);
var _jsxRuntime$1 = require$$2;
var _default$1 = (0, _createSvgIcon$1.default)(/* @__PURE__ */ (0, _jsxRuntime$1.jsx)("path", {
  d: "M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"
}), "Brightness4");
default_1$1 = Brightness4.default = _default$1;
var Brightness7 = {};
var _interopRequireDefault = interopRequireDefault.exports;
Object.defineProperty(Brightness7, "__esModule", {
  value: true
});
var default_1 = Brightness7.default = void 0;
var _createSvgIcon = _interopRequireDefault(createSvgIcon);
var _jsxRuntime = require$$2;
var _default = (0, _createSvgIcon.default)(/* @__PURE__ */ (0, _jsxRuntime.jsx)("path", {
  d: "M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"
}), "Brightness7");
default_1 = Brightness7.default = _default;
const syntaxThemes = ["anOldHope", "arta", "atelierDuneDark", "atelierDuneLight", "darcula", "far", "github", "isblEditorDark", "isblEditorLight", "sunburst", "gradientDark", "monokai", "nightOwl"];
const StyledInputBase = styled(InputBase)(({
  theme
}) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch"
    }
  }
}));
const SearchProgress = styled(LinearProgress)(({
  theme
}) => ({
  position: "fixed",
  top: 0,
  right: 0,
  left: 0
}));
const showSearch$ = new ValueSubject(false);
const FavMenu = () => {
  var _a;
  const [favDocs] = useObservableState(() => documents$.pipe(map((docs) => Array.from(docs.values()).filter((doc) => doc.isFavourite))));
  const navigate = useNavigate();
  const onFavClicked = (doc) => {
    navigate(`/docs/${doc.projectSlug}/${doc.slug}`, {
      replace: true
    });
  };
  const {
    NavbarMenu,
    NavbarFavButton
  } = useComponentContext();
  return /* @__PURE__ */ jsx(NavbarMenu, {
    tooltip: "Favourites",
    items: (_a = favDocs == null ? void 0 : favDocs.map((doc) => ({
      key: doc.slug,
      label: doc.name,
      onClick: () => onFavClicked(doc)
    }))) != null ? _a : [],
    children: /* @__PURE__ */ jsx(NavbarFavButton, {})
  });
};
const SyntaxMenu = () => {
  var _a;
  const {
    NavbarMenu
  } = useComponentContext();
  const [codeTheme] = useObservableState(() => codeTheme$);
  return /* @__PURE__ */ jsx(NavbarMenu, {
    tooltip: "Syntax theme",
    items: (_a = syntaxThemes.map((theme) => {
      return {
        key: theme,
        label: theme,
        selected: codeTheme === theme,
        onClick: () => {
          codeTheme$.next(theme);
        }
      };
    })) != null ? _a : [],
    children: /* @__PURE__ */ jsx(default_1$5, {})
  });
};
const NavbarTitle = () => /* @__PURE__ */ jsx(Fragment, {
  children: "documentation"
});
const NavAppBar = styled(AppBar$1)(({
  theme
}) => ({
  "a, a:link, a:visited, a:hover, a:active": {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    textDecoration: "none"
  },
  "a:hover": {
    textDecoration: "underline"
  }
}));
function Navbar({
  embed
}) {
  const [hasDocumentsFetching] = useObservableAndState(() => combineLatest([queuedDocuments$, fetchingDocuments$]).pipe(map(([queuedDocuments, fetchingDocuments]) => queuedDocuments.docs.size > 0 || fetchingDocuments.size > 0)));
  const params = useParams();
  const location = useLocation();
  const {
    mode,
    toggleColorMode
  } = useColorModeContext();
  const {
    NavbarTitle: NavbarTitle2,
    SearchProgress: SearchProgress2,
    NavbarButton,
    SearchIconWrapper,
    SearchInputWrapper,
    SearchOverlay
  } = useComponentContext();
  return /* @__PURE__ */ jsxs(Box, {
    sx: {
      flex: 0,
      position: embed ? "static" : "sticky",
      top: 0,
      zIndex: 1e3
    },
    children: [hasDocumentsFetching && /* @__PURE__ */ jsx(SearchProgress2, {
      sx: {
        display: {
          xs: "block",
          sm: "none"
        }
      }
    }), /* @__PURE__ */ jsx(NavAppBar, {
      position: "static",
      children: /* @__PURE__ */ jsxs(Toolbar$1, {
        children: [/* @__PURE__ */ jsx(Typography, {
          variant: "h6",
          noWrap: true,
          component: "div",
          sx: {
            flexGrow: 1,
            display: {
              xs: "none",
              sm: "block"
            }
          },
          children: /* @__PURE__ */ jsx(Link, {
            to: "/docs/",
            children: /* @__PURE__ */ jsx(NavbarTitle2, {})
          })
        }), !embed ? /* @__PURE__ */ jsxs(Fragment, {
          children: [params.contentSlug && location.pathname.startsWith("/docs") && /* @__PURE__ */ jsx(Tooltip, {
            title: "edit current document",
            children: /* @__PURE__ */ jsx(Link, {
              to: `/editor/${params.projectSlug}/${params.contentSlug}`,
              children: /* @__PURE__ */ jsx(NavbarButton, {
                "aria-label": "editor",
                children: /* @__PURE__ */ jsx(default_1$4, {})
              })
            })
          }), /* @__PURE__ */ jsx(Tooltip, {
            title: "create document",
            children: /* @__PURE__ */ jsx(Link, {
              to: "/editor/" + params.projectSlug,
              children: /* @__PURE__ */ jsx(NavbarButton, {
                "aria-label": "editor",
                children: /* @__PURE__ */ jsx(default_1$3, {})
              })
            })
          }), /* @__PURE__ */ jsx(SyntaxMenu, {}), /* @__PURE__ */ jsx(FavMenu, {}), /* @__PURE__ */ jsx(NavbarButton, {
            "aria-label": "toggle dark mode",
            onClick: toggleColorMode,
            children: mode === "light" ? /* @__PURE__ */ jsx(default_1$1, {
              sx: {
                fontSize: 20
              }
            }) : /* @__PURE__ */ jsx(default_1, {
              sx: {
                fontSize: 20
              }
            })
          }), /* @__PURE__ */ jsxs(SearchInputWrapper, {
            sx: {
              cursor: "text"
            },
            onClick: (e) => {
              e.currentTarget.blur();
              showSearch$.next(true);
            },
            children: [/* @__PURE__ */ jsx(SearchIconWrapper, {
              children: /* @__PURE__ */ jsx(default_1$2, {})
            }), /* @__PURE__ */ jsx(StyledInputBase, {
              onFocus: (e) => {
                e.target.blur();
                showSearch$.next(true);
              },
              placeholder: "Search\u2026",
              inputProps: {
                "aria-label": "search"
              }
            })]
          })]
        }) : /* @__PURE__ */ jsx(Fragment, {
          children: /* @__PURE__ */ jsx("a", {
            href: window.location.href.replace("#/embed", "#/docs"),
            target: "window",
            children: /* @__PURE__ */ jsx(Button, {
              variant: "contained",
              children: "open in docs"
            })
          })
        })]
      })
    }), /* @__PURE__ */ jsx(Suspense, {
      fallback: /* @__PURE__ */ jsx(Fragment, {}),
      children: /* @__PURE__ */ jsx(SearchOverlay, {
        show$: showSearch$
      })
    })]
  });
}
export { NavbarTitle, SearchProgress, Navbar as default };
//# sourceMappingURL=navbar.js.map
