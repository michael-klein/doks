import { E as styled, s as styleFunctionSx, a as useTheme, h as _objectWithoutPropertiesLoose, j as jsx, _ as _extends, q as clsx, k as generateUtilityClass, l as generateUtilityClasses, m as styled$1, A as alpha, n as useThemeProps, o as composeClasses } from "./main.js";
import * as React from "react";
import { useRef, useEffect } from "react";
import { e as extendSxProp, n as useRefFn } from "./documents.js";
import { BehaviorSubject } from "rxjs";
const _excluded$1 = ["className", "component"];
function createBox(options = {}) {
  const {
    defaultTheme
  } = options;
  const BoxRoot = styled("div")(styleFunctionSx);
  const Box = /* @__PURE__ */ React.forwardRef(function Box2(inProps, ref) {
    const theme = useTheme(defaultTheme);
    const _extendSxProp = extendSxProp(inProps), {
      className,
      component = "div"
    } = _extendSxProp, other = _objectWithoutPropertiesLoose(_extendSxProp, _excluded$1);
    return /* @__PURE__ */ jsx(BoxRoot, _extends({
      as: component,
      ref,
      className: clsx(className, "MuiBox-root"),
      theme
    }, other));
  });
  return Box;
}
function useObservableInternal(useCustomEffect, init, inputs) {
  if (!inputs) {
    return useRefFn(init).current;
  }
  var inputs$Ref = useRefFn(function() {
    return new BehaviorSubject(inputs);
  });
  var source$Ref = useRefFn(function() {
    return init(inputs$Ref.current);
  });
  var firstEffectRef = useRef(true);
  useCustomEffect(function() {
    if (firstEffectRef.current) {
      firstEffectRef.current = false;
      return;
    }
    inputs$Ref.current.next(inputs);
  }, inputs);
  return source$Ref.current;
}
function useObservable(init, inputs) {
  return useObservableInternal(useEffect, init, inputs);
}
function getPaperUtilityClass(slot) {
  return generateUtilityClass("MuiPaper", slot);
}
generateUtilityClasses("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const _excluded = ["className", "component", "elevation", "square", "variant"];
const getOverlayAlpha = (elevation) => {
  let alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return (alphaValue / 100).toFixed(2);
};
const useUtilityClasses = (ownerState) => {
  const {
    square,
    elevation,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ["root", variant, !square && "rounded", variant === "elevation" && `elevation${elevation}`]
  };
  return composeClasses(slots, getPaperUtilityClass, classes);
};
const PaperRoot = styled$1("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], !ownerState.square && styles.rounded, ownerState.variant === "elevation" && styles[`elevation${ownerState.elevation}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  transition: theme.transitions.create("box-shadow")
}, !ownerState.square && {
  borderRadius: theme.shape.borderRadius
}, ownerState.variant === "outlined" && {
  border: `1px solid ${theme.palette.divider}`
}, ownerState.variant === "elevation" && _extends({
  boxShadow: theme.shadows[ownerState.elevation]
}, theme.palette.mode === "dark" && {
  backgroundImage: `linear-gradient(${alpha("#fff", getOverlayAlpha(ownerState.elevation))}, ${alpha("#fff", getOverlayAlpha(ownerState.elevation))})`
})));
const Paper = /* @__PURE__ */ React.forwardRef(function Paper2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPaper"
  });
  const {
    className,
    component = "div",
    elevation = 1,
    square = false,
    variant = "elevation"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    component,
    elevation,
    square,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  return /* @__PURE__ */ jsx(PaperRoot, _extends({
    as: component,
    ownerState,
    className: clsx(classes.root, className),
    ref
  }, other));
});
var Paper$1 = Paper;
export { Paper$1 as P, createBox as c, useObservable as u };
//# sourceMappingURL=Paper.js.map
