import * as React from "react";
import { lazy, Suspense, useCallback } from "react";
import { B as Background } from "./background.js";
import { i as interopRequireDefault, d as default_1$2, C as Container } from "./styled.js";
import { c as createSvgIcon, r as require$$2, a as createSvgIcon$1, B as ButtonBase, T as Typography } from "./IconButton.js";
import { j as jsx, d as jsxs, s as styled, _ as _extends, e as emphasize, g as generateUtilityClass, f as generateUtilityClasses, h as useThemeProps, i as _objectWithoutPropertiesLoose, k as composeClasses, l as clsx, F as Fragment, C as CircularProgress } from "./main.js";
import { B as Button, a as Box } from "./Button.js";
import { q as queuedDocuments$, f as fetchingDocuments$, d as documents$ } from "./documents.js";
import { u as useObservableAndState } from "./use_observable_and_state.js";
import { combineLatest, map } from "rxjs";
import { R as Routes, a as Route, u as useParams, b as useNavigate } from "./doks.js";
import { S as Snackbar, A as Alert } from "./Alert.js";
import "./react-is.production.min.js";
import { G as Grid } from "./Grid.js";
import "rxjs/operators";
import "react-dom";
import "./Close.js";
var KeyboardArrowUp = {};
var _interopRequireDefault$1 = interopRequireDefault.exports;
Object.defineProperty(KeyboardArrowUp, "__esModule", {
  value: true
});
var default_1$1 = KeyboardArrowUp.default = void 0;
var _createSvgIcon$1 = _interopRequireDefault$1(createSvgIcon);
var _jsxRuntime$1 = require$$2;
var _default$1 = (0, _createSvgIcon$1.default)(/* @__PURE__ */ (0, _jsxRuntime$1.jsx)("path", {
  d: "M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"
}), "KeyboardArrowUp");
default_1$1 = KeyboardArrowUp.default = _default$1;
const StyledFooter = default_1$2("footer")(({
  theme
}) => ({
  background: theme.palette.primary.light,
  padding: 20,
  display: "flex",
  justifyContent: "flex-end"
}));
const UpButton = default_1$2(Button)(({
  theme
}) => ({
  color: theme.palette.primary.dark
}));
const Footer = () => {
  return /* @__PURE__ */ jsx(StyledFooter, {
    children: /* @__PURE__ */ jsxs(UpButton, {
      onClick: () => {
        window.scrollTo(0, 0);
      },
      children: [/* @__PURE__ */ jsx(default_1$1, {}), "up"]
    })
  });
};
var MoreHorizIcon = createSvgIcon$1(/* @__PURE__ */ jsx("path", {
  d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
}), "MoreHoriz");
const BreadcrumbCollapsedButton = styled(ButtonBase, {
  skipSx: true
})(({
  theme
}) => _extends({
  display: "flex",
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(0.5)
}, theme.palette.mode === "light" ? {
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.grey[700]
} : {
  backgroundColor: theme.palette.grey[700],
  color: theme.palette.grey[100]
}, {
  borderRadius: 2,
  "&:hover, &:focus": _extends({}, theme.palette.mode === "light" ? {
    backgroundColor: theme.palette.grey[200]
  } : {
    backgroundColor: theme.palette.grey[600]
  }),
  "&:active": _extends({
    boxShadow: theme.shadows[0]
  }, theme.palette.mode === "light" ? {
    backgroundColor: emphasize(theme.palette.grey[200], 0.12)
  } : {
    backgroundColor: emphasize(theme.palette.grey[600], 0.12)
  })
}));
const BreadcrumbCollapsedIcon = styled(MoreHorizIcon)({
  width: 24,
  height: 16
});
function BreadcrumbCollapsed(props) {
  const ownerState = props;
  return /* @__PURE__ */ jsx("li", {
    children: /* @__PURE__ */ jsx(BreadcrumbCollapsedButton, _extends({
      focusRipple: true
    }, props, {
      ownerState,
      children: /* @__PURE__ */ jsx(BreadcrumbCollapsedIcon, {
        ownerState
      })
    }))
  });
}
function getBreadcrumbsUtilityClass(slot) {
  return generateUtilityClass("MuiBreadcrumbs", slot);
}
const breadcrumbsClasses = generateUtilityClasses("MuiBreadcrumbs", ["root", "ol", "li", "separator"]);
var breadcrumbsClasses$1 = breadcrumbsClasses;
const _excluded = ["children", "className", "component", "expandText", "itemsAfterCollapse", "itemsBeforeCollapse", "maxItems", "separator"];
const useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    li: ["li"],
    ol: ["ol"],
    separator: ["separator"]
  };
  return composeClasses(slots, getBreadcrumbsUtilityClass, classes);
};
const BreadcrumbsRoot = styled(Typography, {
  name: "MuiBreadcrumbs",
  slot: "Root",
  overridesResolver: (props, styles) => {
    return [{
      [`& .${breadcrumbsClasses$1.li}`]: styles.li
    }, styles.root];
  }
})({});
const BreadcrumbsOl = styled("ol", {
  name: "MuiBreadcrumbs",
  slot: "Ol",
  overridesResolver: (props, styles) => styles.ol
})({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  padding: 0,
  margin: 0,
  listStyle: "none"
});
const BreadcrumbsSeparator = styled("li", {
  name: "MuiBreadcrumbs",
  slot: "Separator",
  overridesResolver: (props, styles) => styles.separator
})({
  display: "flex",
  userSelect: "none",
  marginLeft: 8,
  marginRight: 8
});
function insertSeparators(items, className, separator, ownerState) {
  return items.reduce((acc, current, index) => {
    if (index < items.length - 1) {
      acc = acc.concat(current, /* @__PURE__ */ jsx(BreadcrumbsSeparator, {
        "aria-hidden": true,
        className,
        ownerState,
        children: separator
      }, `separator-${index}`));
    } else {
      acc.push(current);
    }
    return acc;
  }, []);
}
const Breadcrumbs = /* @__PURE__ */ React.forwardRef(function Breadcrumbs2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiBreadcrumbs"
  });
  const {
    children,
    className,
    component = "nav",
    expandText = "Show path",
    itemsAfterCollapse = 1,
    itemsBeforeCollapse = 1,
    maxItems = 8,
    separator = "/"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const [expanded, setExpanded] = React.useState(false);
  const ownerState = _extends({}, props, {
    component,
    expanded,
    expandText,
    itemsAfterCollapse,
    itemsBeforeCollapse,
    maxItems,
    separator
  });
  const classes = useUtilityClasses(ownerState);
  const listRef = React.useRef(null);
  const renderItemsBeforeAndAfter = (allItems2) => {
    const handleClickExpand = () => {
      setExpanded(true);
      const focusable = listRef.current.querySelector("a[href],button,[tabindex]");
      if (focusable) {
        focusable.focus();
      }
    };
    if (itemsBeforeCollapse + itemsAfterCollapse >= allItems2.length) {
      return allItems2;
    }
    return [...allItems2.slice(0, itemsBeforeCollapse), /* @__PURE__ */ jsx(BreadcrumbCollapsed, {
      "aria-label": expandText,
      onClick: handleClickExpand
    }, "ellipsis"), ...allItems2.slice(allItems2.length - itemsAfterCollapse, allItems2.length)];
  };
  const allItems = React.Children.toArray(children).filter((child) => {
    return /* @__PURE__ */ React.isValidElement(child);
  }).map((child, index) => /* @__PURE__ */ jsx("li", {
    className: classes.li,
    children: child
  }, `child-${index}`));
  return /* @__PURE__ */ jsx(BreadcrumbsRoot, _extends({
    ref,
    component,
    color: "text.secondary",
    className: clsx(classes.root, className),
    ownerState
  }, other, {
    children: /* @__PURE__ */ jsx(BreadcrumbsOl, {
      className: classes.ol,
      ref: listRef,
      ownerState,
      children: insertSeparators(expanded || maxItems && allItems.length <= maxItems ? allItems : renderItemsBeforeAndAfter(allItems), classes.separator, separator, ownerState)
    })
  }));
});
var Breadcrumbs$1 = Breadcrumbs;
var Folder = {};
var _interopRequireDefault = interopRequireDefault.exports;
Object.defineProperty(Folder, "__esModule", {
  value: true
});
var default_1 = Folder.default = void 0;
var _createSvgIcon = _interopRequireDefault(createSvgIcon);
var _jsxRuntime = require$$2;
var _default = (0, _createSvgIcon.default)(/* @__PURE__ */ (0, _jsxRuntime.jsx)("path", {
  d: "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
}), "Folder");
default_1 = Folder.default = _default;
const DocFetcher = lazy(() => import("./doc_fetcher.js"));
const Sidebar = lazy(() => import("./sidebar.js"));
const Content = lazy(() => import("./content.js"));
const Navbar = lazy(() => import("./navbar.js"));
const Project = () => {
  const params = useParams();
  return /* @__PURE__ */ jsx(Fragment, {
    children: params.contentSlug && /* @__PURE__ */ jsx(Suspense, {
      fallback: /* @__PURE__ */ jsx(CircularProgress, {
        sx: {
          position: "absolute",
          top: "50%",
          left: "50%"
        }
      }),
      children: /* @__PURE__ */ jsx(Content, {})
    })
  });
};
const Layout = ({
  children
}) => {
  const [hasDocumentsFetching] = useObservableAndState(() => combineLatest([queuedDocuments$, fetchingDocuments$]).pipe(map(([queuedDocuments, fetchingDocuments]) => queuedDocuments.docs.size > 0 || fetchingDocuments.size > 0)));
  const params = useParams();
  const navigate = useNavigate();
  const onNodeSelect = useCallback((nodeId) => {
    if (documents$.value.has(nodeId)) {
      navigate(`/docs/${params.projectSlug}/${nodeId}`, {
        replace: true
      });
    }
  }, [params]);
  return /* @__PURE__ */ jsxs(Background, {
    children: [/* @__PURE__ */ jsx(Snackbar, {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
      },
      open: hasDocumentsFetching,
      sx: {
        display: {
          xs: "none",
          sm: "block"
        }
      },
      children: /* @__PURE__ */ jsx(Alert, {
        sx: {
          boxShadow: 1
        },
        severity: "info",
        icon: false,
        children: /* @__PURE__ */ jsxs(Box, {
          sx: {
            display: "flex",
            alignItems: "center"
          },
          children: [/* @__PURE__ */ jsx(CircularProgress, {
            size: 18,
            sx: {
              marginRight: 1
            }
          }), " ", "fetching documents in the background..."]
        })
      })
    }), /* @__PURE__ */ jsx(DocFetcher, {
      mode: "docs"
    }), /* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsxs(Container, {
      sx: {
        paddingTop: 6,
        marginBottom: 10,
        flex: "auto"
      },
      children: [/* @__PURE__ */ jsxs(Breadcrumbs$1, {
        "aria-label": "breadcrumb",
        sx: {
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          display: {
            xs: "none",
            sm: "flex"
          }
        },
        children: [/* @__PURE__ */ jsx(default_1, {
          sx: {
            fontSize: "1.1em",
            color: "text.secondary",
            transform: "translateY(0.15em)"
          }
        }), params.projectSlug && /* @__PURE__ */ jsx(Typography, {
          color: "text.secondary",
          children: params.projectSlug
        }), params.contentSlug && /* @__PURE__ */ jsx(Typography, {
          color: "text.secondary",
          children: params.contentSlug
        }), params.headingIndex && /* @__PURE__ */ jsx(Typography, {
          color: "text.secondary",
          children: params.headingIndex
        })]
      }), /* @__PURE__ */ jsxs(Grid, {
        container: true,
        spacing: 2,
        children: [/* @__PURE__ */ jsx(Sidebar, {
          onProjectSelect: (projectSlug) => {
            navigate(`/docs/${projectSlug}`, {
              replace: true
            });
          },
          onNodeSelect,
          mode: "docs"
        }), children]
      })]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
};
const Docs = () => {
  return /* @__PURE__ */ jsxs(Routes, {
    children: [/* @__PURE__ */ jsx(Route, {
      path: "/:projectSlug",
      element: /* @__PURE__ */ jsx(Layout, {
        children: /* @__PURE__ */ jsx(Project, {})
      })
    }), /* @__PURE__ */ jsx(Route, {
      path: "/:projectSlug/:contentSlug",
      element: /* @__PURE__ */ jsx(Layout, {
        children: /* @__PURE__ */ jsx(Project, {})
      })
    }), /* @__PURE__ */ jsx(Route, {
      path: "/:projectSlug/:contentSlug/:headingIndex",
      element: /* @__PURE__ */ jsx(Layout, {
        children: /* @__PURE__ */ jsx(Project, {})
      })
    }), /* @__PURE__ */ jsx(Route, {
      path: "/",
      element: /* @__PURE__ */ jsx(Layout, {
        children: /* @__PURE__ */ jsx(Project, {})
      })
    })]
  });
};
export { Docs, Docs as default };
//# sourceMappingURL=docs.js.map
