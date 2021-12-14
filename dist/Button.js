import { c as createTheme, f as generateUtilityClasses, g as generateUtilityClass, s as styled, r as rootShouldForwardProp, m as capitalize, _ as _extends, q as alpha, h as useThemeProps, i as _objectWithoutPropertiesLoose, j as jsx, d as jsxs, l as clsx, k as composeClasses } from "./main.js";
import { c as createBox } from "./styled.js";
import * as React from "react";
import { B as ButtonBase } from "./IconButton.js";
const defaultTheme = createTheme();
const Box = createBox({
  defaultTheme
});
var Box$1 = Box;
function getButtonUtilityClass(slot) {
  return generateUtilityClass("MuiButton", slot);
}
const buttonClasses = generateUtilityClasses("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "contained", "containedInherit", "containedPrimary", "containedSecondary", "disableElevation", "focusVisible", "disabled", "colorInherit", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]);
var buttonClasses$1 = buttonClasses;
const _excluded = ["children", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"];
const useUtilityClasses = (ownerState) => {
  const {
    color,
    disableElevation,
    fullWidth,
    size,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ["root", variant, `${variant}${capitalize(color)}`, `size${capitalize(size)}`, `${variant}Size${capitalize(size)}`, color === "inherit" && "colorInherit", disableElevation && "disableElevation", fullWidth && "fullWidth"],
    label: ["label"],
    startIcon: ["startIcon", `iconSize${capitalize(size)}`],
    endIcon: ["endIcon", `iconSize${capitalize(size)}`]
  };
  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
const commonIconStyles = (ownerState) => _extends({}, ownerState.size === "small" && {
  "& > *:nth-of-type(1)": {
    fontSize: 18
  }
}, ownerState.size === "medium" && {
  "& > *:nth-of-type(1)": {
    fontSize: 20
  }
}, ownerState.size === "large" && {
  "& > *:nth-of-type(1)": {
    fontSize: 22
  }
});
const ButtonRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`${ownerState.variant}${capitalize(ownerState.color)}`], styles[`size${capitalize(ownerState.size)}`], styles[`${ownerState.variant}Size${capitalize(ownerState.size)}`], ownerState.color === "inherit" && styles.colorInherit, ownerState.disableElevation && styles.disableElevation, ownerState.fullWidth && styles.fullWidth];
  }
})(({
  theme,
  ownerState
}) => _extends({}, theme.typography.button, {
  minWidth: 64,
  padding: "6px 16px",
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
    duration: theme.transitions.duration.short
  }),
  "&:hover": _extends({
    textDecoration: "none",
    backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }, ownerState.variant === "text" && ownerState.color !== "inherit" && {
    backgroundColor: alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }, ownerState.variant === "outlined" && ownerState.color !== "inherit" && {
    border: `1px solid ${theme.palette[ownerState.color].main}`,
    backgroundColor: alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }, ownerState.variant === "contained" && {
    backgroundColor: theme.palette.grey.A100,
    boxShadow: theme.shadows[4],
    "@media (hover: none)": {
      boxShadow: theme.shadows[2],
      backgroundColor: theme.palette.grey[300]
    }
  }, ownerState.variant === "contained" && ownerState.color !== "inherit" && {
    backgroundColor: theme.palette[ownerState.color].dark,
    "@media (hover: none)": {
      backgroundColor: theme.palette[ownerState.color].main
    }
  }),
  "&:active": _extends({}, ownerState.variant === "contained" && {
    boxShadow: theme.shadows[8]
  }),
  [`&.${buttonClasses$1.focusVisible}`]: _extends({}, ownerState.variant === "contained" && {
    boxShadow: theme.shadows[6]
  }),
  [`&.${buttonClasses$1.disabled}`]: _extends({
    color: theme.palette.action.disabled
  }, ownerState.variant === "outlined" && {
    border: `1px solid ${theme.palette.action.disabledBackground}`
  }, ownerState.variant === "outlined" && ownerState.color === "secondary" && {
    border: `1px solid ${theme.palette.action.disabled}`
  }, ownerState.variant === "contained" && {
    color: theme.palette.action.disabled,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.action.disabledBackground
  })
}, ownerState.variant === "text" && {
  padding: "6px 8px"
}, ownerState.variant === "text" && ownerState.color !== "inherit" && {
  color: theme.palette[ownerState.color].main
}, ownerState.variant === "outlined" && {
  padding: "5px 15px",
  border: `1px solid ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`
}, ownerState.variant === "outlined" && ownerState.color !== "inherit" && {
  color: theme.palette[ownerState.color].main,
  border: `1px solid ${alpha(theme.palette[ownerState.color].main, 0.5)}`
}, ownerState.variant === "contained" && {
  color: theme.palette.getContrastText(theme.palette.grey[300]),
  backgroundColor: theme.palette.grey[300],
  boxShadow: theme.shadows[2]
}, ownerState.variant === "contained" && ownerState.color !== "inherit" && {
  color: theme.palette[ownerState.color].contrastText,
  backgroundColor: theme.palette[ownerState.color].main
}, ownerState.color === "inherit" && {
  color: "inherit",
  borderColor: "currentColor"
}, ownerState.size === "small" && ownerState.variant === "text" && {
  padding: "4px 5px",
  fontSize: theme.typography.pxToRem(13)
}, ownerState.size === "large" && ownerState.variant === "text" && {
  padding: "8px 11px",
  fontSize: theme.typography.pxToRem(15)
}, ownerState.size === "small" && ownerState.variant === "outlined" && {
  padding: "3px 9px",
  fontSize: theme.typography.pxToRem(13)
}, ownerState.size === "large" && ownerState.variant === "outlined" && {
  padding: "7px 21px",
  fontSize: theme.typography.pxToRem(15)
}, ownerState.size === "small" && ownerState.variant === "contained" && {
  padding: "4px 10px",
  fontSize: theme.typography.pxToRem(13)
}, ownerState.size === "large" && ownerState.variant === "contained" && {
  padding: "8px 22px",
  fontSize: theme.typography.pxToRem(15)
}, ownerState.fullWidth && {
  width: "100%"
}), ({
  ownerState
}) => ownerState.disableElevation && {
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none"
  },
  [`&.${buttonClasses$1.focusVisible}`]: {
    boxShadow: "none"
  },
  "&:active": {
    boxShadow: "none"
  },
  [`&.${buttonClasses$1.disabled}`]: {
    boxShadow: "none"
  }
});
const ButtonStartIcon = styled("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.startIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4
}, ownerState.size === "small" && {
  marginLeft: -2
}, commonIconStyles(ownerState)));
const ButtonEndIcon = styled("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.endIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8
}, ownerState.size === "small" && {
  marginRight: -2
}, commonIconStyles(ownerState)));
const Button = /* @__PURE__ */ React.forwardRef(function Button2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiButton"
  });
  const {
    children,
    color = "primary",
    component = "button",
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    size = "medium",
    startIcon: startIconProp,
    type,
    variant = "text"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    size,
    type,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  const startIcon = startIconProp && /* @__PURE__ */ jsx(ButtonStartIcon, {
    className: classes.startIcon,
    ownerState,
    children: startIconProp
  });
  const endIcon = endIconProp && /* @__PURE__ */ jsx(ButtonEndIcon, {
    className: classes.endIcon,
    ownerState,
    children: endIconProp
  });
  return /* @__PURE__ */ jsxs(ButtonRoot, _extends({
    ownerState,
    component,
    disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    ref,
    type
  }, other, {
    classes,
    children: [startIcon, children, endIcon]
  }));
});
var Button$1 = Button;
export { Button$1 as B, Box$1 as a };
//# sourceMappingURL=Button.js.map
