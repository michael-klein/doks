import { k as useEnhancedEffect, u as useForkRef, i as interopRequireDefault } from "./styled.js";
import { P as Paper, d as useTheme, B as ButtonBase, c as createSvgIcon, r as require$$2, I as IconButton, T as Typography, u as useObservableState } from "./IconButton.js";
import { g as generateUtilityClass, f as generateUtilityClasses, s as styled, m as capitalize, _ as _extends, h as useThemeProps, i as _objectWithoutPropertiesLoose, k as composeClasses, j as jsx, l as clsx, D as keyframes, N as css, d as jsxs, p as lighten, o as darken, r as rootShouldForwardProp, q as alpha, F as Fragment } from "./main.js";
import { L as ListContext, d as default_1$6, M as Menu } from "./Menu.js";
import * as React from "react";
import { lazy, Suspense, useState, Fragment as Fragment$1 } from "react";
import { c as useDocOptions, u as useParams, d as useLocation, e as useColorModeContext, L as Link, b as useNavigate } from "./doks.js";
import { map, combineLatest } from "rxjs";
import { u as useObservableAndState } from "./use_observable_and_state.js";
import { V as ValueSubject, d as documents$, q as queuedDocuments$, f as fetchingDocuments$ } from "./documents.js";
import { c as codeTheme$ } from "./markdown_renderer.js";
import { d as InputBase } from "./InputBase.js";
import { a as Box, B as Button } from "./Button.js";
import { T as Tooltip } from "./Tooltip.js";
import "rxjs/operators";
import "react-dom";
import "./react-is.production.min.js";
import "./isHostComponent.js";
import "./index.js";
function getAppBarUtilityClass(slot) {
  return generateUtilityClass("MuiAppBar", slot);
}
generateUtilityClasses("MuiAppBar", ["root", "positionFixed", "positionAbsolute", "positionSticky", "positionStatic", "positionRelative", "colorDefault", "colorPrimary", "colorSecondary", "colorInherit", "colorTransparent"]);
const _excluded$3 = ["className", "color", "enableColorOnDark", "position"];
const useUtilityClasses$3 = (ownerState) => {
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$3);
  const ownerState = _extends({}, props, {
    color,
    position,
    enableColorOnDark
  });
  const classes = useUtilityClasses$3(ownerState);
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
const dividerClasses = generateUtilityClasses("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "light", "vertical", "withChildren", "withChildrenVertical", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]);
var dividerClasses$1 = dividerClasses;
function getLinearProgressUtilityClass(slot) {
  return generateUtilityClass("MuiLinearProgress", slot);
}
generateUtilityClasses("MuiLinearProgress", ["root", "colorPrimary", "colorSecondary", "determinate", "indeterminate", "buffer", "query", "dashed", "dashedColorPrimary", "dashedColorSecondary", "bar", "barColorPrimary", "barColorSecondary", "bar1Indeterminate", "bar1Determinate", "bar1Buffer", "bar2Indeterminate", "bar2Buffer"]);
const _excluded$2 = ["className", "color", "value", "valueBuffer", "variant"];
let _ = (t) => t, _t, _t2, _t3, _t4, _t5, _t6;
const TRANSITION_DURATION = 4;
const indeterminate1Keyframe = keyframes(_t || (_t = _`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`));
const indeterminate2Keyframe = keyframes(_t2 || (_t2 = _`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`));
const bufferKeyframe = keyframes(_t3 || (_t3 = _`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`));
const useUtilityClasses$2 = (ownerState) => {
  const {
    classes,
    variant,
    color
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color)}`, variant],
    dashed: ["dashed", `dashedColor${capitalize(color)}`],
    bar1: ["bar", `barColor${capitalize(color)}`, (variant === "indeterminate" || variant === "query") && "bar1Indeterminate", variant === "determinate" && "bar1Determinate", variant === "buffer" && "bar1Buffer"],
    bar2: ["bar", variant !== "buffer" && `barColor${capitalize(color)}`, variant === "buffer" && `color${capitalize(color)}`, (variant === "indeterminate" || variant === "query") && "bar2Indeterminate", variant === "buffer" && "bar2Buffer"]
  };
  return composeClasses(slots, getLinearProgressUtilityClass, classes);
};
const getColorShade = (theme, color) => {
  if (color === "inherit") {
    return "currentColor";
  }
  return theme.palette.mode === "light" ? lighten(theme.palette[color].main, 0.62) : darken(theme.palette[color].main, 0.5);
};
const LinearProgressRoot = styled("span", {
  name: "MuiLinearProgress",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`color${capitalize(ownerState.color)}`], styles[ownerState.variant]];
  }
})(({
  ownerState,
  theme
}) => _extends({
  position: "relative",
  overflow: "hidden",
  display: "block",
  height: 4,
  zIndex: 0,
  "@media print": {
    colorAdjust: "exact"
  },
  backgroundColor: getColorShade(theme, ownerState.color)
}, ownerState.color === "inherit" && ownerState.variant !== "buffer" && {
  backgroundColor: "none",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "currentColor",
    opacity: 0.3
  }
}, ownerState.variant === "buffer" && {
  backgroundColor: "transparent"
}, ownerState.variant === "query" && {
  transform: "rotate(180deg)"
}));
const LinearProgressDashed = styled("span", {
  name: "MuiLinearProgress",
  slot: "Dashed",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.dashed, styles[`dashedColor${capitalize(ownerState.color)}`]];
  }
})(({
  ownerState,
  theme
}) => {
  const backgroundColor = getColorShade(theme, ownerState.color);
  return _extends({
    position: "absolute",
    marginTop: 0,
    height: "100%",
    width: "100%"
  }, ownerState.color === "inherit" && {
    opacity: 0.3
  }, {
    backgroundImage: `radial-gradient(${backgroundColor} 0%, ${backgroundColor} 16%, transparent 42%)`,
    backgroundSize: "10px 10px",
    backgroundPosition: "0 -23px"
  });
}, css(_t4 || (_t4 = _`
    animation: ${0} 3s infinite linear;
  `), bufferKeyframe));
const LinearProgressBar1 = styled("span", {
  name: "MuiLinearProgress",
  slot: "Bar1",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.bar, styles[`barColor${capitalize(ownerState.color)}`], (ownerState.variant === "indeterminate" || ownerState.variant === "query") && styles.bar1Indeterminate, ownerState.variant === "determinate" && styles.bar1Determinate, ownerState.variant === "buffer" && styles.bar1Buffer];
  }
})(({
  ownerState,
  theme
}) => _extends({
  width: "100%",
  position: "absolute",
  left: 0,
  bottom: 0,
  top: 0,
  transition: "transform 0.2s linear",
  transformOrigin: "left",
  backgroundColor: ownerState.color === "inherit" ? "currentColor" : theme.palette[ownerState.color].main
}, ownerState.variant === "determinate" && {
  transition: `transform .${TRANSITION_DURATION}s linear`
}, ownerState.variant === "buffer" && {
  zIndex: 1,
  transition: `transform .${TRANSITION_DURATION}s linear`
}), ({
  ownerState
}) => (ownerState.variant === "indeterminate" || ownerState.variant === "query") && css(_t5 || (_t5 = _`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `), indeterminate1Keyframe));
const LinearProgressBar2 = styled("span", {
  name: "MuiLinearProgress",
  slot: "Bar2",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.bar, styles[`barColor${capitalize(ownerState.color)}`], (ownerState.variant === "indeterminate" || ownerState.variant === "query") && styles.bar2Indeterminate, ownerState.variant === "buffer" && styles.bar2Buffer];
  }
})(({
  ownerState,
  theme
}) => _extends({
  width: "100%",
  position: "absolute",
  left: 0,
  bottom: 0,
  top: 0,
  transition: "transform 0.2s linear",
  transformOrigin: "left"
}, ownerState.variant !== "buffer" && {
  backgroundColor: ownerState.color === "inherit" ? "currentColor" : theme.palette[ownerState.color].main
}, ownerState.color === "inherit" && {
  opacity: 0.3
}, ownerState.variant === "buffer" && {
  backgroundColor: getColorShade(theme, ownerState.color),
  transition: `transform .${TRANSITION_DURATION}s linear`
}), ({
  ownerState
}) => (ownerState.variant === "indeterminate" || ownerState.variant === "query") && css(_t6 || (_t6 = _`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `), indeterminate2Keyframe));
const LinearProgress = /* @__PURE__ */ React.forwardRef(function LinearProgress2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiLinearProgress"
  });
  const {
    className,
    color = "primary",
    value,
    valueBuffer,
    variant = "indeterminate"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
  const ownerState = _extends({}, props, {
    color,
    variant
  });
  const classes = useUtilityClasses$2(ownerState);
  const theme = useTheme();
  const rootProps = {};
  const inlineStyles = {
    bar1: {},
    bar2: {}
  };
  if (variant === "determinate" || variant === "buffer") {
    if (value !== void 0) {
      rootProps["aria-valuenow"] = Math.round(value);
      rootProps["aria-valuemin"] = 0;
      rootProps["aria-valuemax"] = 100;
      let transform = value - 100;
      if (theme.direction === "rtl") {
        transform = -transform;
      }
      inlineStyles.bar1.transform = `translateX(${transform}%)`;
    }
  }
  if (variant === "buffer") {
    if (valueBuffer !== void 0) {
      let transform = (valueBuffer || 0) - 100;
      if (theme.direction === "rtl") {
        transform = -transform;
      }
      inlineStyles.bar2.transform = `translateX(${transform}%)`;
    }
  }
  return /* @__PURE__ */ jsxs(LinearProgressRoot, _extends({
    className: clsx(classes.root, className),
    ownerState,
    role: "progressbar"
  }, rootProps, {
    ref
  }, other, {
    children: [variant === "buffer" ? /* @__PURE__ */ jsx(LinearProgressDashed, {
      className: classes.dashed,
      ownerState
    }) : null, /* @__PURE__ */ jsx(LinearProgressBar1, {
      className: classes.bar1,
      ownerState,
      style: inlineStyles.bar1
    }), variant === "determinate" ? null : /* @__PURE__ */ jsx(LinearProgressBar2, {
      className: classes.bar2,
      ownerState,
      style: inlineStyles.bar2
    })]
  }));
});
var LinearProgress$1 = LinearProgress;
const listItemIconClasses = generateUtilityClasses("MuiListItemIcon", ["root", "alignItemsFlexStart"]);
var listItemIconClasses$1 = listItemIconClasses;
const listItemTextClasses = generateUtilityClasses("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]);
var listItemTextClasses$1 = listItemTextClasses;
function getMenuItemUtilityClass(slot) {
  return generateUtilityClass("MuiMenuItem", slot);
}
const menuItemClasses = generateUtilityClasses("MuiMenuItem", ["root", "focusVisible", "dense", "disabled", "divider", "gutters", "selected"]);
var menuItemClasses$1 = menuItemClasses;
const _excluded$1 = ["autoFocus", "component", "dense", "divider", "disableGutters", "focusVisibleClassName", "role", "tabIndex"];
const overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, ownerState.dense && styles.dense, ownerState.divider && styles.divider, !ownerState.disableGutters && styles.gutters];
};
const useUtilityClasses$1 = (ownerState) => {
  const {
    disabled,
    dense,
    divider,
    disableGutters,
    selected,
    classes
  } = ownerState;
  const slots = {
    root: ["root", dense && "dense", disabled && "disabled", !disableGutters && "gutters", divider && "divider", selected && "selected"]
  };
  const composedClasses = composeClasses(slots, getMenuItemUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
const MenuItemRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiMenuItem",
  slot: "Root",
  overridesResolver
})(({
  theme,
  ownerState
}) => _extends({}, theme.typography.body1, {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: "border-box",
  whiteSpace: "nowrap"
}, !ownerState.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, ownerState.divider && {
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundClip: "padding-box"
}, {
  "&:hover": {
    textDecoration: "none",
    backgroundColor: theme.palette.action.hover,
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  [`&.${menuItemClasses$1.selected}`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${menuItemClasses$1.focusVisible}`]: {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  },
  [`&.${menuItemClasses$1.selected}:hover`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  },
  [`&.${menuItemClasses$1.focusVisible}`]: {
    backgroundColor: theme.palette.action.focus
  },
  [`&.${menuItemClasses$1.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity
  },
  [`& + .${dividerClasses$1.root}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  [`& + .${dividerClasses$1.inset}`]: {
    marginLeft: 52
  },
  [`& .${listItemTextClasses$1.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${listItemTextClasses$1.inset}`]: {
    paddingLeft: 36
  },
  [`& .${listItemIconClasses$1.root}`]: {
    minWidth: 36
  }
}, !ownerState.dense && {
  [theme.breakpoints.up("sm")]: {
    minHeight: "auto"
  }
}, ownerState.dense && _extends({
  minHeight: 32,
  paddingTop: 4,
  paddingBottom: 4
}, theme.typography.body2, {
  [`& .${listItemIconClasses$1.root} svg`]: {
    fontSize: "1.25rem"
  }
})));
const MenuItem = /* @__PURE__ */ React.forwardRef(function MenuItem2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiMenuItem"
  });
  const {
    autoFocus = false,
    component = "li",
    dense = false,
    divider = false,
    disableGutters = false,
    focusVisibleClassName,
    role = "menuitem",
    tabIndex: tabIndexProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$1);
  const context = React.useContext(ListContext);
  const childContext = {
    dense: dense || context.dense || false,
    disableGutters
  };
  const menuItemRef = React.useRef(null);
  useEnhancedEffect(() => {
    if (autoFocus) {
      if (menuItemRef.current) {
        menuItemRef.current.focus();
      }
    }
  }, [autoFocus]);
  const ownerState = _extends({}, props, {
    dense: childContext.dense,
    divider,
    disableGutters
  });
  const classes = useUtilityClasses$1(props);
  const handleRef = useForkRef(menuItemRef, ref);
  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== void 0 ? tabIndexProp : -1;
  }
  return /* @__PURE__ */ jsx(ListContext.Provider, {
    value: childContext,
    children: /* @__PURE__ */ jsx(MenuItemRoot, _extends({
      ref: handleRef,
      role,
      tabIndex,
      component,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName)
    }, other, {
      ownerState,
      classes
    }))
  });
});
var MenuItem$1 = MenuItem;
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
const SearchOverlay = lazy(() => import("./search.js"));
const syntaxThemes = ["anOldHope", "arta", "atelierDuneDark", "atelierDuneLight", "darcula", "far", "github", "isblEditorDark", "isblEditorLight", "sunburst", "gradientDark", "monokai", "nightOwl"];
const SearchInputWrapper = styled("div")(({
  theme
}) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto"
  }
}));
const SearchIconWrapper = styled("div")(({
  theme
}) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));
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
const Progress = styled(LinearProgress$1)(({
  theme
}) => ({
  position: "fixed",
  top: 0,
  right: 0,
  left: 0
}));
const showSearch$ = new ValueSubject(false);
const FavButton = styled(default_1$6)(({
  theme
}) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
  "&:hover": {
    color: "red"
  }
}));
const NavButton = styled(IconButton)(({
  theme
}) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
  "&:hover": {
    color: theme.palette.primary.dark
  }
}));
const NavMenu = ({
  items,
  children,
  tooltip
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (items == null ? void 0 : items.length) > 0 ? /* @__PURE__ */ jsxs(Fragment$1, {
    children: [/* @__PURE__ */ jsx(Tooltip, {
      title: tooltip,
      children: /* @__PURE__ */ jsx(NavButton, {
        "aria-label": tooltip,
        onClick: handleClick,
        children
      })
    }), /* @__PURE__ */ jsx(Menu, {
      id: "fav-menu",
      anchorEl,
      open,
      onClose: handleClose,
      PaperProps: {
        style: {
          maxHeight: "80vh",
          width: "100%",
          maxWidth: "200px"
        }
      },
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right"
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "right"
      },
      children: items.map(({
        onClick,
        label,
        key,
        selected
      }) => /* @__PURE__ */ jsx(MenuItem$1, {
        selected,
        onClick: () => {
          onClick();
          handleClose();
        },
        children: label
      }, key))
    })]
  }) : /* @__PURE__ */ jsx(Fragment, {});
};
const FavMenu = () => {
  var _a;
  const [favDocs] = useObservableState(() => documents$.pipe(map((docs) => Array.from(docs.values()).filter((doc) => doc.isFavourite))));
  const navigate = useNavigate();
  const onFavClicked = (doc) => {
    navigate(`/docs/${doc.projectSlug}/${doc.slug}`, {
      replace: true
    });
  };
  return /* @__PURE__ */ jsx(NavMenu, {
    tooltip: "Favourites",
    items: (_a = favDocs == null ? void 0 : favDocs.map((doc) => ({
      key: doc.slug,
      label: doc.name,
      onClick: () => onFavClicked(doc)
    }))) != null ? _a : [],
    children: /* @__PURE__ */ jsx(FavButton, {})
  });
};
const SyntaxMenu = () => {
  var _a;
  const [codeTheme] = useObservableState(() => codeTheme$);
  return /* @__PURE__ */ jsx(NavMenu, {
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
  const {
    title = "documentation"
  } = useDocOptions();
  const params = useParams();
  const location = useLocation();
  const {
    mode,
    toggleColorMode
  } = useColorModeContext();
  return /* @__PURE__ */ jsxs(Box, {
    sx: {
      flex: 0,
      position: embed ? "static" : "sticky",
      top: 0,
      zIndex: 1e3
    },
    children: [hasDocumentsFetching && /* @__PURE__ */ jsx(Progress, {
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
            children: title
          })
        }), !embed ? /* @__PURE__ */ jsxs(Fragment, {
          children: [params.contentSlug && location.pathname.startsWith("/docs") && /* @__PURE__ */ jsx(Tooltip, {
            title: "edit current document",
            children: /* @__PURE__ */ jsx(Link, {
              to: `/editor/${params.projectSlug}/${params.contentSlug}`,
              children: /* @__PURE__ */ jsx(NavButton, {
                "aria-label": "editor",
                children: /* @__PURE__ */ jsx(default_1$4, {})
              })
            })
          }), /* @__PURE__ */ jsx(Tooltip, {
            title: "create document",
            children: /* @__PURE__ */ jsx(Link, {
              to: "/editor/" + params.projectSlug,
              children: /* @__PURE__ */ jsx(NavButton, {
                "aria-label": "editor",
                children: /* @__PURE__ */ jsx(default_1$3, {})
              })
            })
          }), /* @__PURE__ */ jsx(SyntaxMenu, {}), /* @__PURE__ */ jsx(FavMenu, {}), /* @__PURE__ */ jsx(NavButton, {
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
export { Navbar, Navbar as default };
//# sourceMappingURL=navbar.js.map
