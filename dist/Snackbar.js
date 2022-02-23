import { g as generateUtilityClass, a as generateUtilityClasses, j as jsx, q as styled, c as capitalize, A as darken, z as lighten, _ as _extends, r as useThemeProps, b as _objectWithoutPropertiesLoose, e as composeClasses, i as jsxs, h as clsx, K as emphasize, B as duration } from "./main.js";
import * as React from "react";
import { c as createSvgIcon, P as Paper, I as IconButton, C as CloseIcon, k as useForkRef, l as useEventCallback, o as ownerDocument, G as Grow, m as useTheme } from "./doks.js";
function getAlertUtilityClass(slot) {
  return generateUtilityClass("MuiAlert", slot);
}
const alertClasses = generateUtilityClasses("MuiAlert", ["root", "action", "icon", "message", "filled", "filledSuccess", "filledInfo", "filledWarning", "filledError", "outlined", "outlinedSuccess", "outlinedInfo", "outlinedWarning", "outlinedError", "standard", "standardSuccess", "standardInfo", "standardWarning", "standardError"]);
var alertClasses$1 = alertClasses;
var SuccessOutlinedIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
}), "SuccessOutlined");
var ReportProblemOutlinedIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
}), "ReportProblemOutlined");
var ErrorOutlineIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), "ErrorOutline");
var InfoOutlinedIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
}), "InfoOutlined");
var _CloseIcon;
const _excluded$2 = ["action", "children", "className", "closeText", "color", "icon", "iconMapping", "onClose", "role", "severity", "variant"];
const useUtilityClasses$2 = (ownerState) => {
  const {
    variant,
    color,
    severity,
    classes
  } = ownerState;
  const slots = {
    root: ["root", `${variant}${capitalize(color || severity)}`, `${variant}`],
    icon: ["icon"],
    message: ["message"],
    action: ["action"]
  };
  return composeClasses(slots, getAlertUtilityClass, classes);
};
const AlertRoot = styled(Paper, {
  name: "MuiAlert",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`${ownerState.variant}${capitalize(ownerState.color || ownerState.severity)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  const getColor = theme.palette.mode === "light" ? darken : lighten;
  const getBackgroundColor = theme.palette.mode === "light" ? lighten : darken;
  const color = ownerState.color || ownerState.severity;
  return _extends({}, theme.typography.body2, {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "transparent",
    display: "flex",
    padding: "6px 16px"
  }, color && ownerState.variant === "standard" && {
    color: getColor(theme.palette[color].light, 0.6),
    backgroundColor: getBackgroundColor(theme.palette[color].light, 0.9),
    [`& .${alertClasses$1.icon}`]: {
      color: theme.palette.mode === "dark" ? theme.palette[color].main : theme.palette[color].light
    }
  }, color && ownerState.variant === "outlined" && {
    color: getColor(theme.palette[color].light, 0.6),
    border: `1px solid ${theme.palette[color].light}`,
    [`& .${alertClasses$1.icon}`]: {
      color: theme.palette.mode === "dark" ? theme.palette[color].main : theme.palette[color].light
    }
  }, color && ownerState.variant === "filled" && {
    color: "#fff",
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.mode === "dark" ? theme.palette[color].dark : theme.palette[color].main
  });
});
const AlertIcon = styled("div", {
  name: "MuiAlert",
  slot: "Icon",
  overridesResolver: (props, styles) => styles.icon
})({
  marginRight: 12,
  padding: "7px 0",
  display: "flex",
  fontSize: 22,
  opacity: 0.9
});
const AlertMessage = styled("div", {
  name: "MuiAlert",
  slot: "Message",
  overridesResolver: (props, styles) => styles.message
})({
  padding: "8px 0"
});
const AlertAction = styled("div", {
  name: "MuiAlert",
  slot: "Action",
  overridesResolver: (props, styles) => styles.action
})({
  display: "flex",
  alignItems: "flex-start",
  padding: "4px 0 0 16px",
  marginLeft: "auto",
  marginRight: -8
});
const defaultIconMapping = {
  success: /* @__PURE__ */ jsx(SuccessOutlinedIcon, {
    fontSize: "inherit"
  }),
  warning: /* @__PURE__ */ jsx(ReportProblemOutlinedIcon, {
    fontSize: "inherit"
  }),
  error: /* @__PURE__ */ jsx(ErrorOutlineIcon, {
    fontSize: "inherit"
  }),
  info: /* @__PURE__ */ jsx(InfoOutlinedIcon, {
    fontSize: "inherit"
  })
};
const Alert = /* @__PURE__ */ React.forwardRef(function Alert2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiAlert"
  });
  const {
    action,
    children,
    className,
    closeText = "Close",
    color,
    icon,
    iconMapping = defaultIconMapping,
    onClose,
    role = "alert",
    severity = "success",
    variant = "standard"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
  const ownerState = _extends({}, props, {
    color,
    severity,
    variant
  });
  const classes = useUtilityClasses$2(ownerState);
  return /* @__PURE__ */ jsxs(AlertRoot, _extends({
    role,
    square: true,
    elevation: 0,
    ownerState,
    className: clsx(classes.root, className),
    ref
  }, other, {
    children: [icon !== false ? /* @__PURE__ */ jsx(AlertIcon, {
      ownerState,
      className: classes.icon,
      children: icon || iconMapping[severity] || defaultIconMapping[severity]
    }) : null, /* @__PURE__ */ jsx(AlertMessage, {
      ownerState,
      className: classes.message,
      children
    }), action != null ? /* @__PURE__ */ jsx(AlertAction, {
      className: classes.action,
      children: action
    }) : null, action == null && onClose ? /* @__PURE__ */ jsx(AlertAction, {
      ownerState,
      className: classes.action,
      children: /* @__PURE__ */ jsx(IconButton, {
        size: "small",
        "aria-label": closeText,
        title: closeText,
        color: "inherit",
        onClick: onClose,
        children: _CloseIcon || (_CloseIcon = /* @__PURE__ */ jsx(CloseIcon, {
          fontSize: "small"
        }))
      })
    }) : null]
  }));
});
var Alert$1 = Alert;
function mapEventPropToEvent(eventProp) {
  return eventProp.substring(2).toLowerCase();
}
function clickedRootScrollbar(event, doc) {
  return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}
function ClickAwayListener(props) {
  const {
    children,
    disableReactTree = false,
    mouseEvent = "onClick",
    onClickAway,
    touchEvent = "onTouchEnd"
  } = props;
  const movedRef = React.useRef(false);
  const nodeRef = React.useRef(null);
  const activatedRef = React.useRef(false);
  const syntheticEventRef = React.useRef(false);
  React.useEffect(() => {
    setTimeout(() => {
      activatedRef.current = true;
    }, 0);
    return () => {
      activatedRef.current = false;
    };
  }, []);
  const handleRef = useForkRef(children.ref, nodeRef);
  const handleClickAway = useEventCallback((event) => {
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;
    const doc = ownerDocument(nodeRef.current);
    if (!activatedRef.current || !nodeRef.current || "clientX" in event && clickedRootScrollbar(event, doc)) {
      return;
    }
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    let insideDOM;
    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
    }
    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onClickAway(event);
    }
  });
  const createHandleSynthetic = (handlerName) => (event) => {
    syntheticEventRef.current = true;
    const childrenPropsHandler = children.props[handlerName];
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const childrenProps = {
    ref: handleRef
  };
  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }
  React.useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);
      const doc = ownerDocument(nodeRef.current);
      const handleTouchMove = () => {
        movedRef.current = true;
      };
      doc.addEventListener(mappedTouchEvent, handleClickAway);
      doc.addEventListener("touchmove", handleTouchMove);
      return () => {
        doc.removeEventListener(mappedTouchEvent, handleClickAway);
        doc.removeEventListener("touchmove", handleTouchMove);
      };
    }
    return void 0;
  }, [handleClickAway, touchEvent]);
  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }
  React.useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      const doc = ownerDocument(nodeRef.current);
      doc.addEventListener(mappedMouseEvent, handleClickAway);
      return () => {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }
    return void 0;
  }, [handleClickAway, mouseEvent]);
  return /* @__PURE__ */ jsx(React.Fragment, {
    children: /* @__PURE__ */ React.cloneElement(children, childrenProps)
  });
}
function getSnackbarContentUtilityClass(slot) {
  return generateUtilityClass("MuiSnackbarContent", slot);
}
generateUtilityClasses("MuiSnackbarContent", ["root", "message", "action"]);
const _excluded$1 = ["action", "className", "message", "role"];
const useUtilityClasses$1 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    action: ["action"],
    message: ["message"]
  };
  return composeClasses(slots, getSnackbarContentUtilityClass, classes);
};
const SnackbarContentRoot = styled(Paper, {
  name: "MuiSnackbarContent",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => {
  const emphasis = theme.palette.mode === "light" ? 0.8 : 0.98;
  const backgroundColor = emphasize(theme.palette.background.default, emphasis);
  return _extends({}, theme.typography.body2, {
    color: theme.palette.getContrastText(backgroundColor),
    backgroundColor,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "6px 16px",
    borderRadius: theme.shape.borderRadius,
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      flexGrow: "initial",
      minWidth: 288
    }
  });
});
const SnackbarContentMessage = styled("div", {
  name: "MuiSnackbarContent",
  slot: "Message",
  overridesResolver: (props, styles) => styles.message
})({
  padding: "8px 0"
});
const SnackbarContentAction = styled("div", {
  name: "MuiSnackbarContent",
  slot: "Action",
  overridesResolver: (props, styles) => styles.action
})({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  paddingLeft: 16,
  marginRight: -8
});
const SnackbarContent = /* @__PURE__ */ React.forwardRef(function SnackbarContent2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiSnackbarContent"
  });
  const {
    action,
    className,
    message,
    role = "alert"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$1);
  const ownerState = props;
  const classes = useUtilityClasses$1(ownerState);
  return /* @__PURE__ */ jsxs(SnackbarContentRoot, _extends({
    role,
    square: true,
    elevation: 6,
    className: clsx(classes.root, className),
    ownerState,
    ref
  }, other, {
    children: [/* @__PURE__ */ jsx(SnackbarContentMessage, {
      className: classes.message,
      ownerState,
      children: message
    }), action ? /* @__PURE__ */ jsx(SnackbarContentAction, {
      className: classes.action,
      ownerState,
      children: action
    }) : null]
  }));
});
var SnackbarContent$1 = SnackbarContent;
function getSnackbarUtilityClass(slot) {
  return generateUtilityClass("MuiSnackbar", slot);
}
generateUtilityClasses("MuiSnackbar", ["root", "anchorOriginTopCenter", "anchorOriginBottomCenter", "anchorOriginTopRight", "anchorOriginBottomRight", "anchorOriginTopLeft", "anchorOriginBottomLeft"]);
const _excluded = ["onEnter", "onExited"], _excluded2 = ["action", "anchorOrigin", "autoHideDuration", "children", "className", "ClickAwayListenerProps", "ContentProps", "disableWindowBlurListener", "message", "onClose", "onMouseEnter", "onMouseLeave", "open", "resumeHideDuration", "TransitionComponent", "transitionDuration", "TransitionProps"];
const useUtilityClasses = (ownerState) => {
  const {
    classes,
    anchorOrigin
  } = ownerState;
  const slots = {
    root: ["root", `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}`]
  };
  return composeClasses(slots, getSnackbarUtilityClass, classes);
};
const SnackbarRoot = styled("div", {
  name: "MuiSnackbar",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`anchorOrigin${capitalize(ownerState.anchorOrigin.vertical)}${capitalize(ownerState.anchorOrigin.horizontal)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  const center = _extends({}, !ownerState.isRtl && {
    left: "50%",
    right: "auto",
    transform: "translateX(-50%)"
  }, ownerState.isRtl && {
    right: "50%",
    left: "auto",
    transform: "translateX(50%)"
  });
  return _extends({
    zIndex: theme.zIndex.snackbar,
    position: "fixed",
    display: "flex",
    left: 8,
    right: 8,
    justifyContent: "center",
    alignItems: "center"
  }, ownerState.anchorOrigin.vertical === "top" ? {
    top: 8
  } : {
    bottom: 8
  }, ownerState.anchorOrigin.horizontal === "left" && {
    justifyContent: "flex-start"
  }, ownerState.anchorOrigin.horizontal === "right" && {
    justifyContent: "flex-end"
  }, {
    [theme.breakpoints.up("sm")]: _extends({}, ownerState.anchorOrigin.vertical === "top" ? {
      top: 24
    } : {
      bottom: 24
    }, ownerState.anchorOrigin.horizontal === "center" && center, ownerState.anchorOrigin.horizontal === "left" && _extends({}, !ownerState.isRtl && {
      left: 24,
      right: "auto"
    }, ownerState.isRtl && {
      right: 24,
      left: "auto"
    }), ownerState.anchorOrigin.horizontal === "right" && _extends({}, !ownerState.isRtl && {
      right: 24,
      left: "auto"
    }, ownerState.isRtl && {
      left: 24,
      right: "auto"
    }))
  });
});
const Snackbar = /* @__PURE__ */ React.forwardRef(function Snackbar2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiSnackbar"
  });
  const {
    action,
    anchorOrigin: {
      vertical,
      horizontal
    } = {
      vertical: "bottom",
      horizontal: "left"
    },
    autoHideDuration = null,
    children,
    className,
    ClickAwayListenerProps,
    ContentProps,
    disableWindowBlurListener = false,
    message,
    onClose,
    onMouseEnter,
    onMouseLeave,
    open,
    resumeHideDuration,
    TransitionComponent = Grow,
    transitionDuration = {
      enter: duration.enteringScreen,
      exit: duration.leavingScreen
    },
    TransitionProps: {
      onEnter,
      onExited
    } = {}
  } = props, TransitionProps = _objectWithoutPropertiesLoose(props.TransitionProps, _excluded), other = _objectWithoutPropertiesLoose(props, _excluded2);
  const theme = useTheme();
  const isRtl = theme.direction === "rtl";
  const ownerState = _extends({}, props, {
    anchorOrigin: {
      vertical,
      horizontal
    },
    isRtl
  });
  const classes = useUtilityClasses(ownerState);
  const timerAutoHide = React.useRef();
  const [exited, setExited] = React.useState(true);
  const handleClose = useEventCallback((...args) => {
    if (onClose) {
      onClose(...args);
    }
  });
  const setAutoHideTimer = useEventCallback((autoHideDurationParam) => {
    if (!onClose || autoHideDurationParam == null) {
      return;
    }
    clearTimeout(timerAutoHide.current);
    timerAutoHide.current = setTimeout(() => {
      handleClose(null, "timeout");
    }, autoHideDurationParam);
  });
  React.useEffect(() => {
    if (open) {
      setAutoHideTimer(autoHideDuration);
    }
    return () => {
      clearTimeout(timerAutoHide.current);
    };
  }, [open, autoHideDuration, setAutoHideTimer]);
  const handlePause = () => {
    clearTimeout(timerAutoHide.current);
  };
  const handleResume = React.useCallback(() => {
    if (autoHideDuration != null) {
      setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);
  const handleMouseEnter = (event) => {
    if (onMouseEnter) {
      onMouseEnter(event);
    }
    handlePause();
  };
  const handleMouseLeave = (event) => {
    if (onMouseLeave) {
      onMouseLeave(event);
    }
    handleResume();
  };
  const handleClickAway = (event) => {
    if (onClose) {
      onClose(event, "clickaway");
    }
  };
  const handleExited = (node) => {
    setExited(true);
    if (onExited) {
      onExited(node);
    }
  };
  const handleEnter = (node, isAppearing) => {
    setExited(false);
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };
  React.useEffect(() => {
    if (!disableWindowBlurListener && open) {
      window.addEventListener("focus", handleResume);
      window.addEventListener("blur", handlePause);
      return () => {
        window.removeEventListener("focus", handleResume);
        window.removeEventListener("blur", handlePause);
      };
    }
    return void 0;
  }, [disableWindowBlurListener, handleResume, open]);
  if (!open && exited) {
    return null;
  }
  return /* @__PURE__ */ jsx(ClickAwayListener, _extends({
    onClickAway: handleClickAway
  }, ClickAwayListenerProps, {
    children: /* @__PURE__ */ jsx(SnackbarRoot, _extends({
      className: clsx(classes.root, className),
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      ownerState,
      ref
    }, other, {
      children: /* @__PURE__ */ jsx(TransitionComponent, _extends({
        appear: true,
        in: open,
        timeout: transitionDuration,
        direction: vertical === "top" ? "down" : "up",
        onEnter: handleEnter,
        onExited: handleExited
      }, TransitionProps, {
        children: children || /* @__PURE__ */ jsx(SnackbarContent$1, _extends({
          message,
          action
        }, ContentProps))
      }))
    }))
  }));
});
var Snackbar$1 = Snackbar;
export { Alert$1 as A, Snackbar$1 as S };
//# sourceMappingURL=Snackbar.js.map
