var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var _a;
import * as React from "react";
import React__default, { lazy, memo, useCallback, useMemo, useEffect, createElement, Suspense, useLayoutEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import { m as generateUtilityClass, n as generateUtilityClasses, o as styled, g as capitalize, _ as _extends, q as useThemeProps, h as _objectWithoutPropertiesLoose, r as composeClasses, j as jsx, l as clsx, y as alpha, d as jsxs, F as Fragment, C as CircularProgress } from "./main.js";
import { b as useForkRef, k as useEnhancedEffect, s as setRef, e as extendSxProp, q as getDefaultExportFromCjs, i as interopRequireDefault, d as default_1$1, B as Box } from "./styled.js";
import { B as ButtonBase, c as createSvgIcon, r as require$$2 } from "./jsx-runtime_commonjs-proxy.js";
import { b as useTheme, T as Transition, r as reflow, g as getTransitionProps, u as useObservableState, a as useObservable } from "./use-observable-state.js";
import { p as pathBrowserify } from "./index.js";
import { useParams } from "react-router";
import { combineLatest, map, debounceTime } from "rxjs";
import { V as ValueSubject, p as projects$, d as documents$ } from "./documents.js";
import { Link as Link$1 } from "react-router-dom";
function getContainer(container) {
  return typeof container === "function" ? container() : container;
}
const Portal = /* @__PURE__ */ React.forwardRef(function Portal2(props, ref) {
  const {
    children,
    container,
    disablePortal = false
  } = props;
  const [mountNode, setMountNode] = React.useState(null);
  const handleRef = useForkRef(/* @__PURE__ */ React.isValidElement(children) ? children.ref : null, ref);
  useEnhancedEffect(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);
  useEnhancedEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode);
      return () => {
        setRef(ref, null);
      };
    }
    return void 0;
  }, [ref, mountNode, disablePortal]);
  if (disablePortal) {
    if (/* @__PURE__ */ React.isValidElement(children)) {
      return /* @__PURE__ */ React.cloneElement(children, {
        ref: handleRef
      });
    }
    return children;
  }
  return mountNode ? /* @__PURE__ */ ReactDOM.createPortal(children, mountNode) : mountNode;
});
var Portal$1 = Portal;
function getTypographyUtilityClass(slot) {
  return generateUtilityClass("MuiTypography", slot);
}
generateUtilityClasses("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]);
const _excluded$2 = ["align", "className", "component", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"];
const useUtilityClasses$1 = (ownerState) => {
  const {
    align,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ["root", variant, ownerState.align !== "inherit" && `align${capitalize(align)}`, gutterBottom && "gutterBottom", noWrap && "noWrap", paragraph && "paragraph"]
  };
  return composeClasses(slots, getTypographyUtilityClass, classes);
};
const TypographyRoot = styled("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.variant && styles2[ownerState.variant], ownerState.align !== "inherit" && styles2[`align${capitalize(ownerState.align)}`], ownerState.noWrap && styles2.noWrap, ownerState.gutterBottom && styles2.gutterBottom, ownerState.paragraph && styles2.paragraph];
  }
})(({
  theme,
  ownerState
}) => _extends({
  margin: 0
}, ownerState.variant && theme.typography[ownerState.variant], ownerState.align !== "inherit" && {
  textAlign: ownerState.align
}, ownerState.noWrap && {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, ownerState.gutterBottom && {
  marginBottom: "0.35em"
}, ownerState.paragraph && {
  marginBottom: 16
}));
const defaultVariantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  inherit: "p"
};
const colorTransformations = {
  primary: "primary.main",
  textPrimary: "text.primary",
  secondary: "secondary.main",
  textSecondary: "text.secondary",
  error: "error.main"
};
const transformDeprecatedColors = (color) => {
  return colorTransformations[color] || color;
};
const Typography = /* @__PURE__ */ React.forwardRef(function Typography2(inProps, ref) {
  const themeProps = useThemeProps({
    props: inProps,
    name: "MuiTypography"
  });
  const color = transformDeprecatedColors(themeProps.color);
  const props = extendSxProp(_extends({}, themeProps, {
    color
  }));
  const {
    align = "inherit",
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = "body1",
    variantMapping = defaultVariantMapping
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
  const ownerState = _extends({}, props, {
    align,
    color,
    className,
    component,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    variantMapping
  });
  const Component = component || (paragraph ? "p" : variantMapping[variant] || defaultVariantMapping[variant]) || "span";
  const classes = useUtilityClasses$1(ownerState);
  return /* @__PURE__ */ jsx(TypographyRoot, _extends({
    as: Component,
    ref,
    ownerState,
    className: clsx(classes.root, className)
  }, other));
});
var Typography$1 = Typography;
function getIconButtonUtilityClass(slot) {
  return generateUtilityClass("MuiIconButton", slot);
}
const iconButtonClasses = generateUtilityClasses("MuiIconButton", ["root", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "edgeStart", "edgeEnd", "sizeSmall", "sizeMedium", "sizeLarge"]);
var iconButtonClasses$1 = iconButtonClasses;
const _excluded$1 = ["edge", "children", "className", "color", "disabled", "disableFocusRipple", "size"];
const useUtilityClasses = (ownerState) => {
  const {
    classes,
    disabled,
    color,
    edge,
    size
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", color !== "default" && `color${capitalize(color)}`, edge && `edge${capitalize(edge)}`, `size${capitalize(size)}`]
  };
  return composeClasses(slots, getIconButtonUtilityClass, classes);
};
const IconButtonRoot = styled(ButtonBase, {
  name: "MuiIconButton",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.color !== "default" && styles2[`color${capitalize(ownerState.color)}`], ownerState.edge && styles2[`edge${capitalize(ownerState.edge)}`], styles2[`size${capitalize(ownerState.size)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  textAlign: "center",
  flex: "0 0 auto",
  fontSize: theme.typography.pxToRem(24),
  padding: 8,
  borderRadius: "50%",
  overflow: "visible",
  color: theme.palette.action.active,
  transition: theme.transitions.create("background-color", {
    duration: theme.transitions.duration.shortest
  }),
  "&:hover": {
    backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, ownerState.edge === "start" && {
  marginLeft: ownerState.size === "small" ? -3 : -12
}, ownerState.edge === "end" && {
  marginRight: ownerState.size === "small" ? -3 : -12
}), ({
  theme,
  ownerState
}) => _extends({}, ownerState.color === "inherit" && {
  color: "inherit"
}, ownerState.color !== "inherit" && ownerState.color !== "default" && {
  color: theme.palette[ownerState.color].main,
  "&:hover": {
    backgroundColor: alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, ownerState.size === "small" && {
  padding: 5,
  fontSize: theme.typography.pxToRem(18)
}, ownerState.size === "large" && {
  padding: 12,
  fontSize: theme.typography.pxToRem(28)
}, {
  [`&.${iconButtonClasses$1.disabled}`]: {
    backgroundColor: "transparent",
    color: theme.palette.action.disabled
  }
}));
const IconButton = /* @__PURE__ */ React.forwardRef(function IconButton2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiIconButton"
  });
  const {
    edge = false,
    children,
    className,
    color = "default",
    disabled = false,
    disableFocusRipple = false,
    size = "medium"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$1);
  const ownerState = _extends({}, props, {
    edge,
    color,
    disabled,
    disableFocusRipple,
    size
  });
  const classes = useUtilityClasses(ownerState);
  return /* @__PURE__ */ jsx(IconButtonRoot, _extends({
    className: clsx(classes.root, className),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled,
    ref,
    ownerState
  }, other, {
    children
  }));
});
var IconButton$1 = IconButton;
const _excluded = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function getScale(value) {
  return `scale(${value}, ${value ** 2})`;
}
const styles = {
  entering: {
    opacity: 1,
    transform: getScale(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
};
const Grow = /* @__PURE__ */ React.forwardRef(function Grow2(props, ref) {
  const {
    addEndListener,
    appear = true,
    children,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = "auto",
    TransitionComponent = Transition
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const timer = React.useRef();
  const autoTimeout = React.useRef();
  const theme = useTheme();
  const nodeRef = React.useRef(null);
  const foreignRef = useForkRef(children.ref, ref);
  const handleRef = useForkRef(nodeRef, foreignRef);
  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current;
      if (maybeIsAppearing === void 0) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
  const handleEntering = normalizedTransitionCallback(onEntering);
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    reflow(node);
    const {
      duration: transitionDuration,
      delay,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "enter"
    });
    let duration;
    if (timeout === "auto") {
      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration;
    } else {
      duration = transitionDuration;
    }
    node.style.transition = [theme.transitions.create("opacity", {
      duration,
      delay
    }), theme.transitions.create("transform", {
      duration: duration * 0.666,
      delay,
      easing: transitionTimingFunction
    })].join(",");
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback((node) => {
    const {
      duration: transitionDuration,
      delay,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "exit"
    });
    let duration;
    if (timeout === "auto") {
      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration;
    } else {
      duration = transitionDuration;
    }
    node.style.transition = [theme.transitions.create("opacity", {
      duration,
      delay
    }), theme.transitions.create("transform", {
      duration: duration * 0.666,
      delay: delay || duration * 0.333,
      easing: transitionTimingFunction
    })].join(",");
    node.style.opacity = "0";
    node.style.transform = getScale(0.75);
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleAddEndListener = (next) => {
    if (timeout === "auto") {
      timer.current = setTimeout(next, autoTimeout.current || 0);
    }
    if (addEndListener) {
      addEndListener(nodeRef.current, next);
    }
  };
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  return /* @__PURE__ */ jsx(TransitionComponent, _extends({
    appear,
    in: inProp,
    nodeRef,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    timeout: timeout === "auto" ? null : timeout
  }, other, {
    children: (state, childProps) => {
      return /* @__PURE__ */ React.cloneElement(children, _extends({
        style: _extends({
          opacity: 0,
          transform: getScale(0.75),
          visibility: state === "exited" && !inProp ? "hidden" : void 0
        }, styles[state], style, children.props.style),
        ref: handleRef
      }, childProps));
    }
  }));
});
Grow.muiSupportAuto = true;
var Grow$1 = Grow;
var dist = { exports: {} };
var entities$1 = {};
Object.defineProperty(entities$1, "__esModule", { value: true });
var entities = {
  Aacute: "\xC1",
  aacute: "\xE1",
  Abreve: "\u0102",
  abreve: "\u0103",
  ac: "\u223E",
  acd: "\u223F",
  acE: "\u223E\u0333",
  Acirc: "\xC2",
  acirc: "\xE2",
  acute: "\xB4",
  Acy: "\u0410",
  acy: "\u0430",
  AElig: "\xC6",
  aelig: "\xE6",
  af: "\u2061",
  Afr: "\u{1D504}",
  afr: "\u{1D51E}",
  Agrave: "\xC0",
  agrave: "\xE0",
  alefsym: "\u2135",
  aleph: "\u2135",
  Alpha: "\u0391",
  alpha: "\u03B1",
  Amacr: "\u0100",
  amacr: "\u0101",
  amalg: "\u2A3F",
  amp: "&",
  AMP: "&",
  andand: "\u2A55",
  And: "\u2A53",
  and: "\u2227",
  andd: "\u2A5C",
  andslope: "\u2A58",
  andv: "\u2A5A",
  ang: "\u2220",
  ange: "\u29A4",
  angle: "\u2220",
  angmsdaa: "\u29A8",
  angmsdab: "\u29A9",
  angmsdac: "\u29AA",
  angmsdad: "\u29AB",
  angmsdae: "\u29AC",
  angmsdaf: "\u29AD",
  angmsdag: "\u29AE",
  angmsdah: "\u29AF",
  angmsd: "\u2221",
  angrt: "\u221F",
  angrtvb: "\u22BE",
  angrtvbd: "\u299D",
  angsph: "\u2222",
  angst: "\xC5",
  angzarr: "\u237C",
  Aogon: "\u0104",
  aogon: "\u0105",
  Aopf: "\u{1D538}",
  aopf: "\u{1D552}",
  apacir: "\u2A6F",
  ap: "\u2248",
  apE: "\u2A70",
  ape: "\u224A",
  apid: "\u224B",
  apos: "'",
  ApplyFunction: "\u2061",
  approx: "\u2248",
  approxeq: "\u224A",
  Aring: "\xC5",
  aring: "\xE5",
  Ascr: "\u{1D49C}",
  ascr: "\u{1D4B6}",
  Assign: "\u2254",
  ast: "*",
  asymp: "\u2248",
  asympeq: "\u224D",
  Atilde: "\xC3",
  atilde: "\xE3",
  Auml: "\xC4",
  auml: "\xE4",
  awconint: "\u2233",
  awint: "\u2A11",
  backcong: "\u224C",
  backepsilon: "\u03F6",
  backprime: "\u2035",
  backsim: "\u223D",
  backsimeq: "\u22CD",
  Backslash: "\u2216",
  Barv: "\u2AE7",
  barvee: "\u22BD",
  barwed: "\u2305",
  Barwed: "\u2306",
  barwedge: "\u2305",
  bbrk: "\u23B5",
  bbrktbrk: "\u23B6",
  bcong: "\u224C",
  Bcy: "\u0411",
  bcy: "\u0431",
  bdquo: "\u201E",
  becaus: "\u2235",
  because: "\u2235",
  Because: "\u2235",
  bemptyv: "\u29B0",
  bepsi: "\u03F6",
  bernou: "\u212C",
  Bernoullis: "\u212C",
  Beta: "\u0392",
  beta: "\u03B2",
  beth: "\u2136",
  between: "\u226C",
  Bfr: "\u{1D505}",
  bfr: "\u{1D51F}",
  bigcap: "\u22C2",
  bigcirc: "\u25EF",
  bigcup: "\u22C3",
  bigodot: "\u2A00",
  bigoplus: "\u2A01",
  bigotimes: "\u2A02",
  bigsqcup: "\u2A06",
  bigstar: "\u2605",
  bigtriangledown: "\u25BD",
  bigtriangleup: "\u25B3",
  biguplus: "\u2A04",
  bigvee: "\u22C1",
  bigwedge: "\u22C0",
  bkarow: "\u290D",
  blacklozenge: "\u29EB",
  blacksquare: "\u25AA",
  blacktriangle: "\u25B4",
  blacktriangledown: "\u25BE",
  blacktriangleleft: "\u25C2",
  blacktriangleright: "\u25B8",
  blank: "\u2423",
  blk12: "\u2592",
  blk14: "\u2591",
  blk34: "\u2593",
  block: "\u2588",
  bne: "=\u20E5",
  bnequiv: "\u2261\u20E5",
  bNot: "\u2AED",
  bnot: "\u2310",
  Bopf: "\u{1D539}",
  bopf: "\u{1D553}",
  bot: "\u22A5",
  bottom: "\u22A5",
  bowtie: "\u22C8",
  boxbox: "\u29C9",
  boxdl: "\u2510",
  boxdL: "\u2555",
  boxDl: "\u2556",
  boxDL: "\u2557",
  boxdr: "\u250C",
  boxdR: "\u2552",
  boxDr: "\u2553",
  boxDR: "\u2554",
  boxh: "\u2500",
  boxH: "\u2550",
  boxhd: "\u252C",
  boxHd: "\u2564",
  boxhD: "\u2565",
  boxHD: "\u2566",
  boxhu: "\u2534",
  boxHu: "\u2567",
  boxhU: "\u2568",
  boxHU: "\u2569",
  boxminus: "\u229F",
  boxplus: "\u229E",
  boxtimes: "\u22A0",
  boxul: "\u2518",
  boxuL: "\u255B",
  boxUl: "\u255C",
  boxUL: "\u255D",
  boxur: "\u2514",
  boxuR: "\u2558",
  boxUr: "\u2559",
  boxUR: "\u255A",
  boxv: "\u2502",
  boxV: "\u2551",
  boxvh: "\u253C",
  boxvH: "\u256A",
  boxVh: "\u256B",
  boxVH: "\u256C",
  boxvl: "\u2524",
  boxvL: "\u2561",
  boxVl: "\u2562",
  boxVL: "\u2563",
  boxvr: "\u251C",
  boxvR: "\u255E",
  boxVr: "\u255F",
  boxVR: "\u2560",
  bprime: "\u2035",
  breve: "\u02D8",
  Breve: "\u02D8",
  brvbar: "\xA6",
  bscr: "\u{1D4B7}",
  Bscr: "\u212C",
  bsemi: "\u204F",
  bsim: "\u223D",
  bsime: "\u22CD",
  bsolb: "\u29C5",
  bsol: "\\",
  bsolhsub: "\u27C8",
  bull: "\u2022",
  bullet: "\u2022",
  bump: "\u224E",
  bumpE: "\u2AAE",
  bumpe: "\u224F",
  Bumpeq: "\u224E",
  bumpeq: "\u224F",
  Cacute: "\u0106",
  cacute: "\u0107",
  capand: "\u2A44",
  capbrcup: "\u2A49",
  capcap: "\u2A4B",
  cap: "\u2229",
  Cap: "\u22D2",
  capcup: "\u2A47",
  capdot: "\u2A40",
  CapitalDifferentialD: "\u2145",
  caps: "\u2229\uFE00",
  caret: "\u2041",
  caron: "\u02C7",
  Cayleys: "\u212D",
  ccaps: "\u2A4D",
  Ccaron: "\u010C",
  ccaron: "\u010D",
  Ccedil: "\xC7",
  ccedil: "\xE7",
  Ccirc: "\u0108",
  ccirc: "\u0109",
  Cconint: "\u2230",
  ccups: "\u2A4C",
  ccupssm: "\u2A50",
  Cdot: "\u010A",
  cdot: "\u010B",
  cedil: "\xB8",
  Cedilla: "\xB8",
  cemptyv: "\u29B2",
  cent: "\xA2",
  centerdot: "\xB7",
  CenterDot: "\xB7",
  cfr: "\u{1D520}",
  Cfr: "\u212D",
  CHcy: "\u0427",
  chcy: "\u0447",
  check: "\u2713",
  checkmark: "\u2713",
  Chi: "\u03A7",
  chi: "\u03C7",
  circ: "\u02C6",
  circeq: "\u2257",
  circlearrowleft: "\u21BA",
  circlearrowright: "\u21BB",
  circledast: "\u229B",
  circledcirc: "\u229A",
  circleddash: "\u229D",
  CircleDot: "\u2299",
  circledR: "\xAE",
  circledS: "\u24C8",
  CircleMinus: "\u2296",
  CirclePlus: "\u2295",
  CircleTimes: "\u2297",
  cir: "\u25CB",
  cirE: "\u29C3",
  cire: "\u2257",
  cirfnint: "\u2A10",
  cirmid: "\u2AEF",
  cirscir: "\u29C2",
  ClockwiseContourIntegral: "\u2232",
  CloseCurlyDoubleQuote: "\u201D",
  CloseCurlyQuote: "\u2019",
  clubs: "\u2663",
  clubsuit: "\u2663",
  colon: ":",
  Colon: "\u2237",
  Colone: "\u2A74",
  colone: "\u2254",
  coloneq: "\u2254",
  comma: ",",
  commat: "@",
  comp: "\u2201",
  compfn: "\u2218",
  complement: "\u2201",
  complexes: "\u2102",
  cong: "\u2245",
  congdot: "\u2A6D",
  Congruent: "\u2261",
  conint: "\u222E",
  Conint: "\u222F",
  ContourIntegral: "\u222E",
  copf: "\u{1D554}",
  Copf: "\u2102",
  coprod: "\u2210",
  Coproduct: "\u2210",
  copy: "\xA9",
  COPY: "\xA9",
  copysr: "\u2117",
  CounterClockwiseContourIntegral: "\u2233",
  crarr: "\u21B5",
  cross: "\u2717",
  Cross: "\u2A2F",
  Cscr: "\u{1D49E}",
  cscr: "\u{1D4B8}",
  csub: "\u2ACF",
  csube: "\u2AD1",
  csup: "\u2AD0",
  csupe: "\u2AD2",
  ctdot: "\u22EF",
  cudarrl: "\u2938",
  cudarrr: "\u2935",
  cuepr: "\u22DE",
  cuesc: "\u22DF",
  cularr: "\u21B6",
  cularrp: "\u293D",
  cupbrcap: "\u2A48",
  cupcap: "\u2A46",
  CupCap: "\u224D",
  cup: "\u222A",
  Cup: "\u22D3",
  cupcup: "\u2A4A",
  cupdot: "\u228D",
  cupor: "\u2A45",
  cups: "\u222A\uFE00",
  curarr: "\u21B7",
  curarrm: "\u293C",
  curlyeqprec: "\u22DE",
  curlyeqsucc: "\u22DF",
  curlyvee: "\u22CE",
  curlywedge: "\u22CF",
  curren: "\xA4",
  curvearrowleft: "\u21B6",
  curvearrowright: "\u21B7",
  cuvee: "\u22CE",
  cuwed: "\u22CF",
  cwconint: "\u2232",
  cwint: "\u2231",
  cylcty: "\u232D",
  dagger: "\u2020",
  Dagger: "\u2021",
  daleth: "\u2138",
  darr: "\u2193",
  Darr: "\u21A1",
  dArr: "\u21D3",
  dash: "\u2010",
  Dashv: "\u2AE4",
  dashv: "\u22A3",
  dbkarow: "\u290F",
  dblac: "\u02DD",
  Dcaron: "\u010E",
  dcaron: "\u010F",
  Dcy: "\u0414",
  dcy: "\u0434",
  ddagger: "\u2021",
  ddarr: "\u21CA",
  DD: "\u2145",
  dd: "\u2146",
  DDotrahd: "\u2911",
  ddotseq: "\u2A77",
  deg: "\xB0",
  Del: "\u2207",
  Delta: "\u0394",
  delta: "\u03B4",
  demptyv: "\u29B1",
  dfisht: "\u297F",
  Dfr: "\u{1D507}",
  dfr: "\u{1D521}",
  dHar: "\u2965",
  dharl: "\u21C3",
  dharr: "\u21C2",
  DiacriticalAcute: "\xB4",
  DiacriticalDot: "\u02D9",
  DiacriticalDoubleAcute: "\u02DD",
  DiacriticalGrave: "`",
  DiacriticalTilde: "\u02DC",
  diam: "\u22C4",
  diamond: "\u22C4",
  Diamond: "\u22C4",
  diamondsuit: "\u2666",
  diams: "\u2666",
  die: "\xA8",
  DifferentialD: "\u2146",
  digamma: "\u03DD",
  disin: "\u22F2",
  div: "\xF7",
  divide: "\xF7",
  divideontimes: "\u22C7",
  divonx: "\u22C7",
  DJcy: "\u0402",
  djcy: "\u0452",
  dlcorn: "\u231E",
  dlcrop: "\u230D",
  dollar: "$",
  Dopf: "\u{1D53B}",
  dopf: "\u{1D555}",
  Dot: "\xA8",
  dot: "\u02D9",
  DotDot: "\u20DC",
  doteq: "\u2250",
  doteqdot: "\u2251",
  DotEqual: "\u2250",
  dotminus: "\u2238",
  dotplus: "\u2214",
  dotsquare: "\u22A1",
  doublebarwedge: "\u2306",
  DoubleContourIntegral: "\u222F",
  DoubleDot: "\xA8",
  DoubleDownArrow: "\u21D3",
  DoubleLeftArrow: "\u21D0",
  DoubleLeftRightArrow: "\u21D4",
  DoubleLeftTee: "\u2AE4",
  DoubleLongLeftArrow: "\u27F8",
  DoubleLongLeftRightArrow: "\u27FA",
  DoubleLongRightArrow: "\u27F9",
  DoubleRightArrow: "\u21D2",
  DoubleRightTee: "\u22A8",
  DoubleUpArrow: "\u21D1",
  DoubleUpDownArrow: "\u21D5",
  DoubleVerticalBar: "\u2225",
  DownArrowBar: "\u2913",
  downarrow: "\u2193",
  DownArrow: "\u2193",
  Downarrow: "\u21D3",
  DownArrowUpArrow: "\u21F5",
  DownBreve: "\u0311",
  downdownarrows: "\u21CA",
  downharpoonleft: "\u21C3",
  downharpoonright: "\u21C2",
  DownLeftRightVector: "\u2950",
  DownLeftTeeVector: "\u295E",
  DownLeftVectorBar: "\u2956",
  DownLeftVector: "\u21BD",
  DownRightTeeVector: "\u295F",
  DownRightVectorBar: "\u2957",
  DownRightVector: "\u21C1",
  DownTeeArrow: "\u21A7",
  DownTee: "\u22A4",
  drbkarow: "\u2910",
  drcorn: "\u231F",
  drcrop: "\u230C",
  Dscr: "\u{1D49F}",
  dscr: "\u{1D4B9}",
  DScy: "\u0405",
  dscy: "\u0455",
  dsol: "\u29F6",
  Dstrok: "\u0110",
  dstrok: "\u0111",
  dtdot: "\u22F1",
  dtri: "\u25BF",
  dtrif: "\u25BE",
  duarr: "\u21F5",
  duhar: "\u296F",
  dwangle: "\u29A6",
  DZcy: "\u040F",
  dzcy: "\u045F",
  dzigrarr: "\u27FF",
  Eacute: "\xC9",
  eacute: "\xE9",
  easter: "\u2A6E",
  Ecaron: "\u011A",
  ecaron: "\u011B",
  Ecirc: "\xCA",
  ecirc: "\xEA",
  ecir: "\u2256",
  ecolon: "\u2255",
  Ecy: "\u042D",
  ecy: "\u044D",
  eDDot: "\u2A77",
  Edot: "\u0116",
  edot: "\u0117",
  eDot: "\u2251",
  ee: "\u2147",
  efDot: "\u2252",
  Efr: "\u{1D508}",
  efr: "\u{1D522}",
  eg: "\u2A9A",
  Egrave: "\xC8",
  egrave: "\xE8",
  egs: "\u2A96",
  egsdot: "\u2A98",
  el: "\u2A99",
  Element: "\u2208",
  elinters: "\u23E7",
  ell: "\u2113",
  els: "\u2A95",
  elsdot: "\u2A97",
  Emacr: "\u0112",
  emacr: "\u0113",
  empty: "\u2205",
  emptyset: "\u2205",
  EmptySmallSquare: "\u25FB",
  emptyv: "\u2205",
  EmptyVerySmallSquare: "\u25AB",
  emsp13: "\u2004",
  emsp14: "\u2005",
  emsp: "\u2003",
  ENG: "\u014A",
  eng: "\u014B",
  ensp: "\u2002",
  Eogon: "\u0118",
  eogon: "\u0119",
  Eopf: "\u{1D53C}",
  eopf: "\u{1D556}",
  epar: "\u22D5",
  eparsl: "\u29E3",
  eplus: "\u2A71",
  epsi: "\u03B5",
  Epsilon: "\u0395",
  epsilon: "\u03B5",
  epsiv: "\u03F5",
  eqcirc: "\u2256",
  eqcolon: "\u2255",
  eqsim: "\u2242",
  eqslantgtr: "\u2A96",
  eqslantless: "\u2A95",
  Equal: "\u2A75",
  equals: "=",
  EqualTilde: "\u2242",
  equest: "\u225F",
  Equilibrium: "\u21CC",
  equiv: "\u2261",
  equivDD: "\u2A78",
  eqvparsl: "\u29E5",
  erarr: "\u2971",
  erDot: "\u2253",
  escr: "\u212F",
  Escr: "\u2130",
  esdot: "\u2250",
  Esim: "\u2A73",
  esim: "\u2242",
  Eta: "\u0397",
  eta: "\u03B7",
  ETH: "\xD0",
  eth: "\xF0",
  Euml: "\xCB",
  euml: "\xEB",
  euro: "\u20AC",
  excl: "!",
  exist: "\u2203",
  Exists: "\u2203",
  expectation: "\u2130",
  exponentiale: "\u2147",
  ExponentialE: "\u2147",
  fallingdotseq: "\u2252",
  Fcy: "\u0424",
  fcy: "\u0444",
  female: "\u2640",
  ffilig: "\uFB03",
  fflig: "\uFB00",
  ffllig: "\uFB04",
  Ffr: "\u{1D509}",
  ffr: "\u{1D523}",
  filig: "\uFB01",
  FilledSmallSquare: "\u25FC",
  FilledVerySmallSquare: "\u25AA",
  fjlig: "fj",
  flat: "\u266D",
  fllig: "\uFB02",
  fltns: "\u25B1",
  fnof: "\u0192",
  Fopf: "\u{1D53D}",
  fopf: "\u{1D557}",
  forall: "\u2200",
  ForAll: "\u2200",
  fork: "\u22D4",
  forkv: "\u2AD9",
  Fouriertrf: "\u2131",
  fpartint: "\u2A0D",
  frac12: "\xBD",
  frac13: "\u2153",
  frac14: "\xBC",
  frac15: "\u2155",
  frac16: "\u2159",
  frac18: "\u215B",
  frac23: "\u2154",
  frac25: "\u2156",
  frac34: "\xBE",
  frac35: "\u2157",
  frac38: "\u215C",
  frac45: "\u2158",
  frac56: "\u215A",
  frac58: "\u215D",
  frac78: "\u215E",
  frasl: "\u2044",
  frown: "\u2322",
  fscr: "\u{1D4BB}",
  Fscr: "\u2131",
  gacute: "\u01F5",
  Gamma: "\u0393",
  gamma: "\u03B3",
  Gammad: "\u03DC",
  gammad: "\u03DD",
  gap: "\u2A86",
  Gbreve: "\u011E",
  gbreve: "\u011F",
  Gcedil: "\u0122",
  Gcirc: "\u011C",
  gcirc: "\u011D",
  Gcy: "\u0413",
  gcy: "\u0433",
  Gdot: "\u0120",
  gdot: "\u0121",
  ge: "\u2265",
  gE: "\u2267",
  gEl: "\u2A8C",
  gel: "\u22DB",
  geq: "\u2265",
  geqq: "\u2267",
  geqslant: "\u2A7E",
  gescc: "\u2AA9",
  ges: "\u2A7E",
  gesdot: "\u2A80",
  gesdoto: "\u2A82",
  gesdotol: "\u2A84",
  gesl: "\u22DB\uFE00",
  gesles: "\u2A94",
  Gfr: "\u{1D50A}",
  gfr: "\u{1D524}",
  gg: "\u226B",
  Gg: "\u22D9",
  ggg: "\u22D9",
  gimel: "\u2137",
  GJcy: "\u0403",
  gjcy: "\u0453",
  gla: "\u2AA5",
  gl: "\u2277",
  glE: "\u2A92",
  glj: "\u2AA4",
  gnap: "\u2A8A",
  gnapprox: "\u2A8A",
  gne: "\u2A88",
  gnE: "\u2269",
  gneq: "\u2A88",
  gneqq: "\u2269",
  gnsim: "\u22E7",
  Gopf: "\u{1D53E}",
  gopf: "\u{1D558}",
  grave: "`",
  GreaterEqual: "\u2265",
  GreaterEqualLess: "\u22DB",
  GreaterFullEqual: "\u2267",
  GreaterGreater: "\u2AA2",
  GreaterLess: "\u2277",
  GreaterSlantEqual: "\u2A7E",
  GreaterTilde: "\u2273",
  Gscr: "\u{1D4A2}",
  gscr: "\u210A",
  gsim: "\u2273",
  gsime: "\u2A8E",
  gsiml: "\u2A90",
  gtcc: "\u2AA7",
  gtcir: "\u2A7A",
  gt: ">",
  GT: ">",
  Gt: "\u226B",
  gtdot: "\u22D7",
  gtlPar: "\u2995",
  gtquest: "\u2A7C",
  gtrapprox: "\u2A86",
  gtrarr: "\u2978",
  gtrdot: "\u22D7",
  gtreqless: "\u22DB",
  gtreqqless: "\u2A8C",
  gtrless: "\u2277",
  gtrsim: "\u2273",
  gvertneqq: "\u2269\uFE00",
  gvnE: "\u2269\uFE00",
  Hacek: "\u02C7",
  hairsp: "\u200A",
  half: "\xBD",
  hamilt: "\u210B",
  HARDcy: "\u042A",
  hardcy: "\u044A",
  harrcir: "\u2948",
  harr: "\u2194",
  hArr: "\u21D4",
  harrw: "\u21AD",
  Hat: "^",
  hbar: "\u210F",
  Hcirc: "\u0124",
  hcirc: "\u0125",
  hearts: "\u2665",
  heartsuit: "\u2665",
  hellip: "\u2026",
  hercon: "\u22B9",
  hfr: "\u{1D525}",
  Hfr: "\u210C",
  HilbertSpace: "\u210B",
  hksearow: "\u2925",
  hkswarow: "\u2926",
  hoarr: "\u21FF",
  homtht: "\u223B",
  hookleftarrow: "\u21A9",
  hookrightarrow: "\u21AA",
  hopf: "\u{1D559}",
  Hopf: "\u210D",
  horbar: "\u2015",
  HorizontalLine: "\u2500",
  hscr: "\u{1D4BD}",
  Hscr: "\u210B",
  hslash: "\u210F",
  Hstrok: "\u0126",
  hstrok: "\u0127",
  HumpDownHump: "\u224E",
  HumpEqual: "\u224F",
  hybull: "\u2043",
  hyphen: "\u2010",
  Iacute: "\xCD",
  iacute: "\xED",
  ic: "\u2063",
  Icirc: "\xCE",
  icirc: "\xEE",
  Icy: "\u0418",
  icy: "\u0438",
  Idot: "\u0130",
  IEcy: "\u0415",
  iecy: "\u0435",
  iexcl: "\xA1",
  iff: "\u21D4",
  ifr: "\u{1D526}",
  Ifr: "\u2111",
  Igrave: "\xCC",
  igrave: "\xEC",
  ii: "\u2148",
  iiiint: "\u2A0C",
  iiint: "\u222D",
  iinfin: "\u29DC",
  iiota: "\u2129",
  IJlig: "\u0132",
  ijlig: "\u0133",
  Imacr: "\u012A",
  imacr: "\u012B",
  image: "\u2111",
  ImaginaryI: "\u2148",
  imagline: "\u2110",
  imagpart: "\u2111",
  imath: "\u0131",
  Im: "\u2111",
  imof: "\u22B7",
  imped: "\u01B5",
  Implies: "\u21D2",
  incare: "\u2105",
  in: "\u2208",
  infin: "\u221E",
  infintie: "\u29DD",
  inodot: "\u0131",
  intcal: "\u22BA",
  int: "\u222B",
  Int: "\u222C",
  integers: "\u2124",
  Integral: "\u222B",
  intercal: "\u22BA",
  Intersection: "\u22C2",
  intlarhk: "\u2A17",
  intprod: "\u2A3C",
  InvisibleComma: "\u2063",
  InvisibleTimes: "\u2062",
  IOcy: "\u0401",
  iocy: "\u0451",
  Iogon: "\u012E",
  iogon: "\u012F",
  Iopf: "\u{1D540}",
  iopf: "\u{1D55A}",
  Iota: "\u0399",
  iota: "\u03B9",
  iprod: "\u2A3C",
  iquest: "\xBF",
  iscr: "\u{1D4BE}",
  Iscr: "\u2110",
  isin: "\u2208",
  isindot: "\u22F5",
  isinE: "\u22F9",
  isins: "\u22F4",
  isinsv: "\u22F3",
  isinv: "\u2208",
  it: "\u2062",
  Itilde: "\u0128",
  itilde: "\u0129",
  Iukcy: "\u0406",
  iukcy: "\u0456",
  Iuml: "\xCF",
  iuml: "\xEF",
  Jcirc: "\u0134",
  jcirc: "\u0135",
  Jcy: "\u0419",
  jcy: "\u0439",
  Jfr: "\u{1D50D}",
  jfr: "\u{1D527}",
  jmath: "\u0237",
  Jopf: "\u{1D541}",
  jopf: "\u{1D55B}",
  Jscr: "\u{1D4A5}",
  jscr: "\u{1D4BF}",
  Jsercy: "\u0408",
  jsercy: "\u0458",
  Jukcy: "\u0404",
  jukcy: "\u0454",
  Kappa: "\u039A",
  kappa: "\u03BA",
  kappav: "\u03F0",
  Kcedil: "\u0136",
  kcedil: "\u0137",
  Kcy: "\u041A",
  kcy: "\u043A",
  Kfr: "\u{1D50E}",
  kfr: "\u{1D528}",
  kgreen: "\u0138",
  KHcy: "\u0425",
  khcy: "\u0445",
  KJcy: "\u040C",
  kjcy: "\u045C",
  Kopf: "\u{1D542}",
  kopf: "\u{1D55C}",
  Kscr: "\u{1D4A6}",
  kscr: "\u{1D4C0}",
  lAarr: "\u21DA",
  Lacute: "\u0139",
  lacute: "\u013A",
  laemptyv: "\u29B4",
  lagran: "\u2112",
  Lambda: "\u039B",
  lambda: "\u03BB",
  lang: "\u27E8",
  Lang: "\u27EA",
  langd: "\u2991",
  langle: "\u27E8",
  lap: "\u2A85",
  Laplacetrf: "\u2112",
  laquo: "\xAB",
  larrb: "\u21E4",
  larrbfs: "\u291F",
  larr: "\u2190",
  Larr: "\u219E",
  lArr: "\u21D0",
  larrfs: "\u291D",
  larrhk: "\u21A9",
  larrlp: "\u21AB",
  larrpl: "\u2939",
  larrsim: "\u2973",
  larrtl: "\u21A2",
  latail: "\u2919",
  lAtail: "\u291B",
  lat: "\u2AAB",
  late: "\u2AAD",
  lates: "\u2AAD\uFE00",
  lbarr: "\u290C",
  lBarr: "\u290E",
  lbbrk: "\u2772",
  lbrace: "{",
  lbrack: "[",
  lbrke: "\u298B",
  lbrksld: "\u298F",
  lbrkslu: "\u298D",
  Lcaron: "\u013D",
  lcaron: "\u013E",
  Lcedil: "\u013B",
  lcedil: "\u013C",
  lceil: "\u2308",
  lcub: "{",
  Lcy: "\u041B",
  lcy: "\u043B",
  ldca: "\u2936",
  ldquo: "\u201C",
  ldquor: "\u201E",
  ldrdhar: "\u2967",
  ldrushar: "\u294B",
  ldsh: "\u21B2",
  le: "\u2264",
  lE: "\u2266",
  LeftAngleBracket: "\u27E8",
  LeftArrowBar: "\u21E4",
  leftarrow: "\u2190",
  LeftArrow: "\u2190",
  Leftarrow: "\u21D0",
  LeftArrowRightArrow: "\u21C6",
  leftarrowtail: "\u21A2",
  LeftCeiling: "\u2308",
  LeftDoubleBracket: "\u27E6",
  LeftDownTeeVector: "\u2961",
  LeftDownVectorBar: "\u2959",
  LeftDownVector: "\u21C3",
  LeftFloor: "\u230A",
  leftharpoondown: "\u21BD",
  leftharpoonup: "\u21BC",
  leftleftarrows: "\u21C7",
  leftrightarrow: "\u2194",
  LeftRightArrow: "\u2194",
  Leftrightarrow: "\u21D4",
  leftrightarrows: "\u21C6",
  leftrightharpoons: "\u21CB",
  leftrightsquigarrow: "\u21AD",
  LeftRightVector: "\u294E",
  LeftTeeArrow: "\u21A4",
  LeftTee: "\u22A3",
  LeftTeeVector: "\u295A",
  leftthreetimes: "\u22CB",
  LeftTriangleBar: "\u29CF",
  LeftTriangle: "\u22B2",
  LeftTriangleEqual: "\u22B4",
  LeftUpDownVector: "\u2951",
  LeftUpTeeVector: "\u2960",
  LeftUpVectorBar: "\u2958",
  LeftUpVector: "\u21BF",
  LeftVectorBar: "\u2952",
  LeftVector: "\u21BC",
  lEg: "\u2A8B",
  leg: "\u22DA",
  leq: "\u2264",
  leqq: "\u2266",
  leqslant: "\u2A7D",
  lescc: "\u2AA8",
  les: "\u2A7D",
  lesdot: "\u2A7F",
  lesdoto: "\u2A81",
  lesdotor: "\u2A83",
  lesg: "\u22DA\uFE00",
  lesges: "\u2A93",
  lessapprox: "\u2A85",
  lessdot: "\u22D6",
  lesseqgtr: "\u22DA",
  lesseqqgtr: "\u2A8B",
  LessEqualGreater: "\u22DA",
  LessFullEqual: "\u2266",
  LessGreater: "\u2276",
  lessgtr: "\u2276",
  LessLess: "\u2AA1",
  lesssim: "\u2272",
  LessSlantEqual: "\u2A7D",
  LessTilde: "\u2272",
  lfisht: "\u297C",
  lfloor: "\u230A",
  Lfr: "\u{1D50F}",
  lfr: "\u{1D529}",
  lg: "\u2276",
  lgE: "\u2A91",
  lHar: "\u2962",
  lhard: "\u21BD",
  lharu: "\u21BC",
  lharul: "\u296A",
  lhblk: "\u2584",
  LJcy: "\u0409",
  ljcy: "\u0459",
  llarr: "\u21C7",
  ll: "\u226A",
  Ll: "\u22D8",
  llcorner: "\u231E",
  Lleftarrow: "\u21DA",
  llhard: "\u296B",
  lltri: "\u25FA",
  Lmidot: "\u013F",
  lmidot: "\u0140",
  lmoustache: "\u23B0",
  lmoust: "\u23B0",
  lnap: "\u2A89",
  lnapprox: "\u2A89",
  lne: "\u2A87",
  lnE: "\u2268",
  lneq: "\u2A87",
  lneqq: "\u2268",
  lnsim: "\u22E6",
  loang: "\u27EC",
  loarr: "\u21FD",
  lobrk: "\u27E6",
  longleftarrow: "\u27F5",
  LongLeftArrow: "\u27F5",
  Longleftarrow: "\u27F8",
  longleftrightarrow: "\u27F7",
  LongLeftRightArrow: "\u27F7",
  Longleftrightarrow: "\u27FA",
  longmapsto: "\u27FC",
  longrightarrow: "\u27F6",
  LongRightArrow: "\u27F6",
  Longrightarrow: "\u27F9",
  looparrowleft: "\u21AB",
  looparrowright: "\u21AC",
  lopar: "\u2985",
  Lopf: "\u{1D543}",
  lopf: "\u{1D55D}",
  loplus: "\u2A2D",
  lotimes: "\u2A34",
  lowast: "\u2217",
  lowbar: "_",
  LowerLeftArrow: "\u2199",
  LowerRightArrow: "\u2198",
  loz: "\u25CA",
  lozenge: "\u25CA",
  lozf: "\u29EB",
  lpar: "(",
  lparlt: "\u2993",
  lrarr: "\u21C6",
  lrcorner: "\u231F",
  lrhar: "\u21CB",
  lrhard: "\u296D",
  lrm: "\u200E",
  lrtri: "\u22BF",
  lsaquo: "\u2039",
  lscr: "\u{1D4C1}",
  Lscr: "\u2112",
  lsh: "\u21B0",
  Lsh: "\u21B0",
  lsim: "\u2272",
  lsime: "\u2A8D",
  lsimg: "\u2A8F",
  lsqb: "[",
  lsquo: "\u2018",
  lsquor: "\u201A",
  Lstrok: "\u0141",
  lstrok: "\u0142",
  ltcc: "\u2AA6",
  ltcir: "\u2A79",
  lt: "<",
  LT: "<",
  Lt: "\u226A",
  ltdot: "\u22D6",
  lthree: "\u22CB",
  ltimes: "\u22C9",
  ltlarr: "\u2976",
  ltquest: "\u2A7B",
  ltri: "\u25C3",
  ltrie: "\u22B4",
  ltrif: "\u25C2",
  ltrPar: "\u2996",
  lurdshar: "\u294A",
  luruhar: "\u2966",
  lvertneqq: "\u2268\uFE00",
  lvnE: "\u2268\uFE00",
  macr: "\xAF",
  male: "\u2642",
  malt: "\u2720",
  maltese: "\u2720",
  Map: "\u2905",
  map: "\u21A6",
  mapsto: "\u21A6",
  mapstodown: "\u21A7",
  mapstoleft: "\u21A4",
  mapstoup: "\u21A5",
  marker: "\u25AE",
  mcomma: "\u2A29",
  Mcy: "\u041C",
  mcy: "\u043C",
  mdash: "\u2014",
  mDDot: "\u223A",
  measuredangle: "\u2221",
  MediumSpace: "\u205F",
  Mellintrf: "\u2133",
  Mfr: "\u{1D510}",
  mfr: "\u{1D52A}",
  mho: "\u2127",
  micro: "\xB5",
  midast: "*",
  midcir: "\u2AF0",
  mid: "\u2223",
  middot: "\xB7",
  minusb: "\u229F",
  minus: "\u2212",
  minusd: "\u2238",
  minusdu: "\u2A2A",
  MinusPlus: "\u2213",
  mlcp: "\u2ADB",
  mldr: "\u2026",
  mnplus: "\u2213",
  models: "\u22A7",
  Mopf: "\u{1D544}",
  mopf: "\u{1D55E}",
  mp: "\u2213",
  mscr: "\u{1D4C2}",
  Mscr: "\u2133",
  mstpos: "\u223E",
  Mu: "\u039C",
  mu: "\u03BC",
  multimap: "\u22B8",
  mumap: "\u22B8",
  nabla: "\u2207",
  Nacute: "\u0143",
  nacute: "\u0144",
  nang: "\u2220\u20D2",
  nap: "\u2249",
  napE: "\u2A70\u0338",
  napid: "\u224B\u0338",
  napos: "\u0149",
  napprox: "\u2249",
  natural: "\u266E",
  naturals: "\u2115",
  natur: "\u266E",
  nbsp: "\xA0",
  nbump: "\u224E\u0338",
  nbumpe: "\u224F\u0338",
  ncap: "\u2A43",
  Ncaron: "\u0147",
  ncaron: "\u0148",
  Ncedil: "\u0145",
  ncedil: "\u0146",
  ncong: "\u2247",
  ncongdot: "\u2A6D\u0338",
  ncup: "\u2A42",
  Ncy: "\u041D",
  ncy: "\u043D",
  ndash: "\u2013",
  nearhk: "\u2924",
  nearr: "\u2197",
  neArr: "\u21D7",
  nearrow: "\u2197",
  ne: "\u2260",
  nedot: "\u2250\u0338",
  NegativeMediumSpace: "\u200B",
  NegativeThickSpace: "\u200B",
  NegativeThinSpace: "\u200B",
  NegativeVeryThinSpace: "\u200B",
  nequiv: "\u2262",
  nesear: "\u2928",
  nesim: "\u2242\u0338",
  NestedGreaterGreater: "\u226B",
  NestedLessLess: "\u226A",
  NewLine: "\n",
  nexist: "\u2204",
  nexists: "\u2204",
  Nfr: "\u{1D511}",
  nfr: "\u{1D52B}",
  ngE: "\u2267\u0338",
  nge: "\u2271",
  ngeq: "\u2271",
  ngeqq: "\u2267\u0338",
  ngeqslant: "\u2A7E\u0338",
  nges: "\u2A7E\u0338",
  nGg: "\u22D9\u0338",
  ngsim: "\u2275",
  nGt: "\u226B\u20D2",
  ngt: "\u226F",
  ngtr: "\u226F",
  nGtv: "\u226B\u0338",
  nharr: "\u21AE",
  nhArr: "\u21CE",
  nhpar: "\u2AF2",
  ni: "\u220B",
  nis: "\u22FC",
  nisd: "\u22FA",
  niv: "\u220B",
  NJcy: "\u040A",
  njcy: "\u045A",
  nlarr: "\u219A",
  nlArr: "\u21CD",
  nldr: "\u2025",
  nlE: "\u2266\u0338",
  nle: "\u2270",
  nleftarrow: "\u219A",
  nLeftarrow: "\u21CD",
  nleftrightarrow: "\u21AE",
  nLeftrightarrow: "\u21CE",
  nleq: "\u2270",
  nleqq: "\u2266\u0338",
  nleqslant: "\u2A7D\u0338",
  nles: "\u2A7D\u0338",
  nless: "\u226E",
  nLl: "\u22D8\u0338",
  nlsim: "\u2274",
  nLt: "\u226A\u20D2",
  nlt: "\u226E",
  nltri: "\u22EA",
  nltrie: "\u22EC",
  nLtv: "\u226A\u0338",
  nmid: "\u2224",
  NoBreak: "\u2060",
  NonBreakingSpace: "\xA0",
  nopf: "\u{1D55F}",
  Nopf: "\u2115",
  Not: "\u2AEC",
  not: "\xAC",
  NotCongruent: "\u2262",
  NotCupCap: "\u226D",
  NotDoubleVerticalBar: "\u2226",
  NotElement: "\u2209",
  NotEqual: "\u2260",
  NotEqualTilde: "\u2242\u0338",
  NotExists: "\u2204",
  NotGreater: "\u226F",
  NotGreaterEqual: "\u2271",
  NotGreaterFullEqual: "\u2267\u0338",
  NotGreaterGreater: "\u226B\u0338",
  NotGreaterLess: "\u2279",
  NotGreaterSlantEqual: "\u2A7E\u0338",
  NotGreaterTilde: "\u2275",
  NotHumpDownHump: "\u224E\u0338",
  NotHumpEqual: "\u224F\u0338",
  notin: "\u2209",
  notindot: "\u22F5\u0338",
  notinE: "\u22F9\u0338",
  notinva: "\u2209",
  notinvb: "\u22F7",
  notinvc: "\u22F6",
  NotLeftTriangleBar: "\u29CF\u0338",
  NotLeftTriangle: "\u22EA",
  NotLeftTriangleEqual: "\u22EC",
  NotLess: "\u226E",
  NotLessEqual: "\u2270",
  NotLessGreater: "\u2278",
  NotLessLess: "\u226A\u0338",
  NotLessSlantEqual: "\u2A7D\u0338",
  NotLessTilde: "\u2274",
  NotNestedGreaterGreater: "\u2AA2\u0338",
  NotNestedLessLess: "\u2AA1\u0338",
  notni: "\u220C",
  notniva: "\u220C",
  notnivb: "\u22FE",
  notnivc: "\u22FD",
  NotPrecedes: "\u2280",
  NotPrecedesEqual: "\u2AAF\u0338",
  NotPrecedesSlantEqual: "\u22E0",
  NotReverseElement: "\u220C",
  NotRightTriangleBar: "\u29D0\u0338",
  NotRightTriangle: "\u22EB",
  NotRightTriangleEqual: "\u22ED",
  NotSquareSubset: "\u228F\u0338",
  NotSquareSubsetEqual: "\u22E2",
  NotSquareSuperset: "\u2290\u0338",
  NotSquareSupersetEqual: "\u22E3",
  NotSubset: "\u2282\u20D2",
  NotSubsetEqual: "\u2288",
  NotSucceeds: "\u2281",
  NotSucceedsEqual: "\u2AB0\u0338",
  NotSucceedsSlantEqual: "\u22E1",
  NotSucceedsTilde: "\u227F\u0338",
  NotSuperset: "\u2283\u20D2",
  NotSupersetEqual: "\u2289",
  NotTilde: "\u2241",
  NotTildeEqual: "\u2244",
  NotTildeFullEqual: "\u2247",
  NotTildeTilde: "\u2249",
  NotVerticalBar: "\u2224",
  nparallel: "\u2226",
  npar: "\u2226",
  nparsl: "\u2AFD\u20E5",
  npart: "\u2202\u0338",
  npolint: "\u2A14",
  npr: "\u2280",
  nprcue: "\u22E0",
  nprec: "\u2280",
  npreceq: "\u2AAF\u0338",
  npre: "\u2AAF\u0338",
  nrarrc: "\u2933\u0338",
  nrarr: "\u219B",
  nrArr: "\u21CF",
  nrarrw: "\u219D\u0338",
  nrightarrow: "\u219B",
  nRightarrow: "\u21CF",
  nrtri: "\u22EB",
  nrtrie: "\u22ED",
  nsc: "\u2281",
  nsccue: "\u22E1",
  nsce: "\u2AB0\u0338",
  Nscr: "\u{1D4A9}",
  nscr: "\u{1D4C3}",
  nshortmid: "\u2224",
  nshortparallel: "\u2226",
  nsim: "\u2241",
  nsime: "\u2244",
  nsimeq: "\u2244",
  nsmid: "\u2224",
  nspar: "\u2226",
  nsqsube: "\u22E2",
  nsqsupe: "\u22E3",
  nsub: "\u2284",
  nsubE: "\u2AC5\u0338",
  nsube: "\u2288",
  nsubset: "\u2282\u20D2",
  nsubseteq: "\u2288",
  nsubseteqq: "\u2AC5\u0338",
  nsucc: "\u2281",
  nsucceq: "\u2AB0\u0338",
  nsup: "\u2285",
  nsupE: "\u2AC6\u0338",
  nsupe: "\u2289",
  nsupset: "\u2283\u20D2",
  nsupseteq: "\u2289",
  nsupseteqq: "\u2AC6\u0338",
  ntgl: "\u2279",
  Ntilde: "\xD1",
  ntilde: "\xF1",
  ntlg: "\u2278",
  ntriangleleft: "\u22EA",
  ntrianglelefteq: "\u22EC",
  ntriangleright: "\u22EB",
  ntrianglerighteq: "\u22ED",
  Nu: "\u039D",
  nu: "\u03BD",
  num: "#",
  numero: "\u2116",
  numsp: "\u2007",
  nvap: "\u224D\u20D2",
  nvdash: "\u22AC",
  nvDash: "\u22AD",
  nVdash: "\u22AE",
  nVDash: "\u22AF",
  nvge: "\u2265\u20D2",
  nvgt: ">\u20D2",
  nvHarr: "\u2904",
  nvinfin: "\u29DE",
  nvlArr: "\u2902",
  nvle: "\u2264\u20D2",
  nvlt: "<\u20D2",
  nvltrie: "\u22B4\u20D2",
  nvrArr: "\u2903",
  nvrtrie: "\u22B5\u20D2",
  nvsim: "\u223C\u20D2",
  nwarhk: "\u2923",
  nwarr: "\u2196",
  nwArr: "\u21D6",
  nwarrow: "\u2196",
  nwnear: "\u2927",
  Oacute: "\xD3",
  oacute: "\xF3",
  oast: "\u229B",
  Ocirc: "\xD4",
  ocirc: "\xF4",
  ocir: "\u229A",
  Ocy: "\u041E",
  ocy: "\u043E",
  odash: "\u229D",
  Odblac: "\u0150",
  odblac: "\u0151",
  odiv: "\u2A38",
  odot: "\u2299",
  odsold: "\u29BC",
  OElig: "\u0152",
  oelig: "\u0153",
  ofcir: "\u29BF",
  Ofr: "\u{1D512}",
  ofr: "\u{1D52C}",
  ogon: "\u02DB",
  Ograve: "\xD2",
  ograve: "\xF2",
  ogt: "\u29C1",
  ohbar: "\u29B5",
  ohm: "\u03A9",
  oint: "\u222E",
  olarr: "\u21BA",
  olcir: "\u29BE",
  olcross: "\u29BB",
  oline: "\u203E",
  olt: "\u29C0",
  Omacr: "\u014C",
  omacr: "\u014D",
  Omega: "\u03A9",
  omega: "\u03C9",
  Omicron: "\u039F",
  omicron: "\u03BF",
  omid: "\u29B6",
  ominus: "\u2296",
  Oopf: "\u{1D546}",
  oopf: "\u{1D560}",
  opar: "\u29B7",
  OpenCurlyDoubleQuote: "\u201C",
  OpenCurlyQuote: "\u2018",
  operp: "\u29B9",
  oplus: "\u2295",
  orarr: "\u21BB",
  Or: "\u2A54",
  or: "\u2228",
  ord: "\u2A5D",
  order: "\u2134",
  orderof: "\u2134",
  ordf: "\xAA",
  ordm: "\xBA",
  origof: "\u22B6",
  oror: "\u2A56",
  orslope: "\u2A57",
  orv: "\u2A5B",
  oS: "\u24C8",
  Oscr: "\u{1D4AA}",
  oscr: "\u2134",
  Oslash: "\xD8",
  oslash: "\xF8",
  osol: "\u2298",
  Otilde: "\xD5",
  otilde: "\xF5",
  otimesas: "\u2A36",
  Otimes: "\u2A37",
  otimes: "\u2297",
  Ouml: "\xD6",
  ouml: "\xF6",
  ovbar: "\u233D",
  OverBar: "\u203E",
  OverBrace: "\u23DE",
  OverBracket: "\u23B4",
  OverParenthesis: "\u23DC",
  para: "\xB6",
  parallel: "\u2225",
  par: "\u2225",
  parsim: "\u2AF3",
  parsl: "\u2AFD",
  part: "\u2202",
  PartialD: "\u2202",
  Pcy: "\u041F",
  pcy: "\u043F",
  percnt: "%",
  period: ".",
  permil: "\u2030",
  perp: "\u22A5",
  pertenk: "\u2031",
  Pfr: "\u{1D513}",
  pfr: "\u{1D52D}",
  Phi: "\u03A6",
  phi: "\u03C6",
  phiv: "\u03D5",
  phmmat: "\u2133",
  phone: "\u260E",
  Pi: "\u03A0",
  pi: "\u03C0",
  pitchfork: "\u22D4",
  piv: "\u03D6",
  planck: "\u210F",
  planckh: "\u210E",
  plankv: "\u210F",
  plusacir: "\u2A23",
  plusb: "\u229E",
  pluscir: "\u2A22",
  plus: "+",
  plusdo: "\u2214",
  plusdu: "\u2A25",
  pluse: "\u2A72",
  PlusMinus: "\xB1",
  plusmn: "\xB1",
  plussim: "\u2A26",
  plustwo: "\u2A27",
  pm: "\xB1",
  Poincareplane: "\u210C",
  pointint: "\u2A15",
  popf: "\u{1D561}",
  Popf: "\u2119",
  pound: "\xA3",
  prap: "\u2AB7",
  Pr: "\u2ABB",
  pr: "\u227A",
  prcue: "\u227C",
  precapprox: "\u2AB7",
  prec: "\u227A",
  preccurlyeq: "\u227C",
  Precedes: "\u227A",
  PrecedesEqual: "\u2AAF",
  PrecedesSlantEqual: "\u227C",
  PrecedesTilde: "\u227E",
  preceq: "\u2AAF",
  precnapprox: "\u2AB9",
  precneqq: "\u2AB5",
  precnsim: "\u22E8",
  pre: "\u2AAF",
  prE: "\u2AB3",
  precsim: "\u227E",
  prime: "\u2032",
  Prime: "\u2033",
  primes: "\u2119",
  prnap: "\u2AB9",
  prnE: "\u2AB5",
  prnsim: "\u22E8",
  prod: "\u220F",
  Product: "\u220F",
  profalar: "\u232E",
  profline: "\u2312",
  profsurf: "\u2313",
  prop: "\u221D",
  Proportional: "\u221D",
  Proportion: "\u2237",
  propto: "\u221D",
  prsim: "\u227E",
  prurel: "\u22B0",
  Pscr: "\u{1D4AB}",
  pscr: "\u{1D4C5}",
  Psi: "\u03A8",
  psi: "\u03C8",
  puncsp: "\u2008",
  Qfr: "\u{1D514}",
  qfr: "\u{1D52E}",
  qint: "\u2A0C",
  qopf: "\u{1D562}",
  Qopf: "\u211A",
  qprime: "\u2057",
  Qscr: "\u{1D4AC}",
  qscr: "\u{1D4C6}",
  quaternions: "\u210D",
  quatint: "\u2A16",
  quest: "?",
  questeq: "\u225F",
  quot: '"',
  QUOT: '"',
  rAarr: "\u21DB",
  race: "\u223D\u0331",
  Racute: "\u0154",
  racute: "\u0155",
  radic: "\u221A",
  raemptyv: "\u29B3",
  rang: "\u27E9",
  Rang: "\u27EB",
  rangd: "\u2992",
  range: "\u29A5",
  rangle: "\u27E9",
  raquo: "\xBB",
  rarrap: "\u2975",
  rarrb: "\u21E5",
  rarrbfs: "\u2920",
  rarrc: "\u2933",
  rarr: "\u2192",
  Rarr: "\u21A0",
  rArr: "\u21D2",
  rarrfs: "\u291E",
  rarrhk: "\u21AA",
  rarrlp: "\u21AC",
  rarrpl: "\u2945",
  rarrsim: "\u2974",
  Rarrtl: "\u2916",
  rarrtl: "\u21A3",
  rarrw: "\u219D",
  ratail: "\u291A",
  rAtail: "\u291C",
  ratio: "\u2236",
  rationals: "\u211A",
  rbarr: "\u290D",
  rBarr: "\u290F",
  RBarr: "\u2910",
  rbbrk: "\u2773",
  rbrace: "}",
  rbrack: "]",
  rbrke: "\u298C",
  rbrksld: "\u298E",
  rbrkslu: "\u2990",
  Rcaron: "\u0158",
  rcaron: "\u0159",
  Rcedil: "\u0156",
  rcedil: "\u0157",
  rceil: "\u2309",
  rcub: "}",
  Rcy: "\u0420",
  rcy: "\u0440",
  rdca: "\u2937",
  rdldhar: "\u2969",
  rdquo: "\u201D",
  rdquor: "\u201D",
  rdsh: "\u21B3",
  real: "\u211C",
  realine: "\u211B",
  realpart: "\u211C",
  reals: "\u211D",
  Re: "\u211C",
  rect: "\u25AD",
  reg: "\xAE",
  REG: "\xAE",
  ReverseElement: "\u220B",
  ReverseEquilibrium: "\u21CB",
  ReverseUpEquilibrium: "\u296F",
  rfisht: "\u297D",
  rfloor: "\u230B",
  rfr: "\u{1D52F}",
  Rfr: "\u211C",
  rHar: "\u2964",
  rhard: "\u21C1",
  rharu: "\u21C0",
  rharul: "\u296C",
  Rho: "\u03A1",
  rho: "\u03C1",
  rhov: "\u03F1",
  RightAngleBracket: "\u27E9",
  RightArrowBar: "\u21E5",
  rightarrow: "\u2192",
  RightArrow: "\u2192",
  Rightarrow: "\u21D2",
  RightArrowLeftArrow: "\u21C4",
  rightarrowtail: "\u21A3",
  RightCeiling: "\u2309",
  RightDoubleBracket: "\u27E7",
  RightDownTeeVector: "\u295D",
  RightDownVectorBar: "\u2955",
  RightDownVector: "\u21C2",
  RightFloor: "\u230B",
  rightharpoondown: "\u21C1",
  rightharpoonup: "\u21C0",
  rightleftarrows: "\u21C4",
  rightleftharpoons: "\u21CC",
  rightrightarrows: "\u21C9",
  rightsquigarrow: "\u219D",
  RightTeeArrow: "\u21A6",
  RightTee: "\u22A2",
  RightTeeVector: "\u295B",
  rightthreetimes: "\u22CC",
  RightTriangleBar: "\u29D0",
  RightTriangle: "\u22B3",
  RightTriangleEqual: "\u22B5",
  RightUpDownVector: "\u294F",
  RightUpTeeVector: "\u295C",
  RightUpVectorBar: "\u2954",
  RightUpVector: "\u21BE",
  RightVectorBar: "\u2953",
  RightVector: "\u21C0",
  ring: "\u02DA",
  risingdotseq: "\u2253",
  rlarr: "\u21C4",
  rlhar: "\u21CC",
  rlm: "\u200F",
  rmoustache: "\u23B1",
  rmoust: "\u23B1",
  rnmid: "\u2AEE",
  roang: "\u27ED",
  roarr: "\u21FE",
  robrk: "\u27E7",
  ropar: "\u2986",
  ropf: "\u{1D563}",
  Ropf: "\u211D",
  roplus: "\u2A2E",
  rotimes: "\u2A35",
  RoundImplies: "\u2970",
  rpar: ")",
  rpargt: "\u2994",
  rppolint: "\u2A12",
  rrarr: "\u21C9",
  Rrightarrow: "\u21DB",
  rsaquo: "\u203A",
  rscr: "\u{1D4C7}",
  Rscr: "\u211B",
  rsh: "\u21B1",
  Rsh: "\u21B1",
  rsqb: "]",
  rsquo: "\u2019",
  rsquor: "\u2019",
  rthree: "\u22CC",
  rtimes: "\u22CA",
  rtri: "\u25B9",
  rtrie: "\u22B5",
  rtrif: "\u25B8",
  rtriltri: "\u29CE",
  RuleDelayed: "\u29F4",
  ruluhar: "\u2968",
  rx: "\u211E",
  Sacute: "\u015A",
  sacute: "\u015B",
  sbquo: "\u201A",
  scap: "\u2AB8",
  Scaron: "\u0160",
  scaron: "\u0161",
  Sc: "\u2ABC",
  sc: "\u227B",
  sccue: "\u227D",
  sce: "\u2AB0",
  scE: "\u2AB4",
  Scedil: "\u015E",
  scedil: "\u015F",
  Scirc: "\u015C",
  scirc: "\u015D",
  scnap: "\u2ABA",
  scnE: "\u2AB6",
  scnsim: "\u22E9",
  scpolint: "\u2A13",
  scsim: "\u227F",
  Scy: "\u0421",
  scy: "\u0441",
  sdotb: "\u22A1",
  sdot: "\u22C5",
  sdote: "\u2A66",
  searhk: "\u2925",
  searr: "\u2198",
  seArr: "\u21D8",
  searrow: "\u2198",
  sect: "\xA7",
  semi: ";",
  seswar: "\u2929",
  setminus: "\u2216",
  setmn: "\u2216",
  sext: "\u2736",
  Sfr: "\u{1D516}",
  sfr: "\u{1D530}",
  sfrown: "\u2322",
  sharp: "\u266F",
  SHCHcy: "\u0429",
  shchcy: "\u0449",
  SHcy: "\u0428",
  shcy: "\u0448",
  ShortDownArrow: "\u2193",
  ShortLeftArrow: "\u2190",
  shortmid: "\u2223",
  shortparallel: "\u2225",
  ShortRightArrow: "\u2192",
  ShortUpArrow: "\u2191",
  shy: "\xAD",
  Sigma: "\u03A3",
  sigma: "\u03C3",
  sigmaf: "\u03C2",
  sigmav: "\u03C2",
  sim: "\u223C",
  simdot: "\u2A6A",
  sime: "\u2243",
  simeq: "\u2243",
  simg: "\u2A9E",
  simgE: "\u2AA0",
  siml: "\u2A9D",
  simlE: "\u2A9F",
  simne: "\u2246",
  simplus: "\u2A24",
  simrarr: "\u2972",
  slarr: "\u2190",
  SmallCircle: "\u2218",
  smallsetminus: "\u2216",
  smashp: "\u2A33",
  smeparsl: "\u29E4",
  smid: "\u2223",
  smile: "\u2323",
  smt: "\u2AAA",
  smte: "\u2AAC",
  smtes: "\u2AAC\uFE00",
  SOFTcy: "\u042C",
  softcy: "\u044C",
  solbar: "\u233F",
  solb: "\u29C4",
  sol: "/",
  Sopf: "\u{1D54A}",
  sopf: "\u{1D564}",
  spades: "\u2660",
  spadesuit: "\u2660",
  spar: "\u2225",
  sqcap: "\u2293",
  sqcaps: "\u2293\uFE00",
  sqcup: "\u2294",
  sqcups: "\u2294\uFE00",
  Sqrt: "\u221A",
  sqsub: "\u228F",
  sqsube: "\u2291",
  sqsubset: "\u228F",
  sqsubseteq: "\u2291",
  sqsup: "\u2290",
  sqsupe: "\u2292",
  sqsupset: "\u2290",
  sqsupseteq: "\u2292",
  square: "\u25A1",
  Square: "\u25A1",
  SquareIntersection: "\u2293",
  SquareSubset: "\u228F",
  SquareSubsetEqual: "\u2291",
  SquareSuperset: "\u2290",
  SquareSupersetEqual: "\u2292",
  SquareUnion: "\u2294",
  squarf: "\u25AA",
  squ: "\u25A1",
  squf: "\u25AA",
  srarr: "\u2192",
  Sscr: "\u{1D4AE}",
  sscr: "\u{1D4C8}",
  ssetmn: "\u2216",
  ssmile: "\u2323",
  sstarf: "\u22C6",
  Star: "\u22C6",
  star: "\u2606",
  starf: "\u2605",
  straightepsilon: "\u03F5",
  straightphi: "\u03D5",
  strns: "\xAF",
  sub: "\u2282",
  Sub: "\u22D0",
  subdot: "\u2ABD",
  subE: "\u2AC5",
  sube: "\u2286",
  subedot: "\u2AC3",
  submult: "\u2AC1",
  subnE: "\u2ACB",
  subne: "\u228A",
  subplus: "\u2ABF",
  subrarr: "\u2979",
  subset: "\u2282",
  Subset: "\u22D0",
  subseteq: "\u2286",
  subseteqq: "\u2AC5",
  SubsetEqual: "\u2286",
  subsetneq: "\u228A",
  subsetneqq: "\u2ACB",
  subsim: "\u2AC7",
  subsub: "\u2AD5",
  subsup: "\u2AD3",
  succapprox: "\u2AB8",
  succ: "\u227B",
  succcurlyeq: "\u227D",
  Succeeds: "\u227B",
  SucceedsEqual: "\u2AB0",
  SucceedsSlantEqual: "\u227D",
  SucceedsTilde: "\u227F",
  succeq: "\u2AB0",
  succnapprox: "\u2ABA",
  succneqq: "\u2AB6",
  succnsim: "\u22E9",
  succsim: "\u227F",
  SuchThat: "\u220B",
  sum: "\u2211",
  Sum: "\u2211",
  sung: "\u266A",
  sup1: "\xB9",
  sup2: "\xB2",
  sup3: "\xB3",
  sup: "\u2283",
  Sup: "\u22D1",
  supdot: "\u2ABE",
  supdsub: "\u2AD8",
  supE: "\u2AC6",
  supe: "\u2287",
  supedot: "\u2AC4",
  Superset: "\u2283",
  SupersetEqual: "\u2287",
  suphsol: "\u27C9",
  suphsub: "\u2AD7",
  suplarr: "\u297B",
  supmult: "\u2AC2",
  supnE: "\u2ACC",
  supne: "\u228B",
  supplus: "\u2AC0",
  supset: "\u2283",
  Supset: "\u22D1",
  supseteq: "\u2287",
  supseteqq: "\u2AC6",
  supsetneq: "\u228B",
  supsetneqq: "\u2ACC",
  supsim: "\u2AC8",
  supsub: "\u2AD4",
  supsup: "\u2AD6",
  swarhk: "\u2926",
  swarr: "\u2199",
  swArr: "\u21D9",
  swarrow: "\u2199",
  swnwar: "\u292A",
  szlig: "\xDF",
  Tab: "	",
  target: "\u2316",
  Tau: "\u03A4",
  tau: "\u03C4",
  tbrk: "\u23B4",
  Tcaron: "\u0164",
  tcaron: "\u0165",
  Tcedil: "\u0162",
  tcedil: "\u0163",
  Tcy: "\u0422",
  tcy: "\u0442",
  tdot: "\u20DB",
  telrec: "\u2315",
  Tfr: "\u{1D517}",
  tfr: "\u{1D531}",
  there4: "\u2234",
  therefore: "\u2234",
  Therefore: "\u2234",
  Theta: "\u0398",
  theta: "\u03B8",
  thetasym: "\u03D1",
  thetav: "\u03D1",
  thickapprox: "\u2248",
  thicksim: "\u223C",
  ThickSpace: "\u205F\u200A",
  ThinSpace: "\u2009",
  thinsp: "\u2009",
  thkap: "\u2248",
  thksim: "\u223C",
  THORN: "\xDE",
  thorn: "\xFE",
  tilde: "\u02DC",
  Tilde: "\u223C",
  TildeEqual: "\u2243",
  TildeFullEqual: "\u2245",
  TildeTilde: "\u2248",
  timesbar: "\u2A31",
  timesb: "\u22A0",
  times: "\xD7",
  timesd: "\u2A30",
  tint: "\u222D",
  toea: "\u2928",
  topbot: "\u2336",
  topcir: "\u2AF1",
  top: "\u22A4",
  Topf: "\u{1D54B}",
  topf: "\u{1D565}",
  topfork: "\u2ADA",
  tosa: "\u2929",
  tprime: "\u2034",
  trade: "\u2122",
  TRADE: "\u2122",
  triangle: "\u25B5",
  triangledown: "\u25BF",
  triangleleft: "\u25C3",
  trianglelefteq: "\u22B4",
  triangleq: "\u225C",
  triangleright: "\u25B9",
  trianglerighteq: "\u22B5",
  tridot: "\u25EC",
  trie: "\u225C",
  triminus: "\u2A3A",
  TripleDot: "\u20DB",
  triplus: "\u2A39",
  trisb: "\u29CD",
  tritime: "\u2A3B",
  trpezium: "\u23E2",
  Tscr: "\u{1D4AF}",
  tscr: "\u{1D4C9}",
  TScy: "\u0426",
  tscy: "\u0446",
  TSHcy: "\u040B",
  tshcy: "\u045B",
  Tstrok: "\u0166",
  tstrok: "\u0167",
  twixt: "\u226C",
  twoheadleftarrow: "\u219E",
  twoheadrightarrow: "\u21A0",
  Uacute: "\xDA",
  uacute: "\xFA",
  uarr: "\u2191",
  Uarr: "\u219F",
  uArr: "\u21D1",
  Uarrocir: "\u2949",
  Ubrcy: "\u040E",
  ubrcy: "\u045E",
  Ubreve: "\u016C",
  ubreve: "\u016D",
  Ucirc: "\xDB",
  ucirc: "\xFB",
  Ucy: "\u0423",
  ucy: "\u0443",
  udarr: "\u21C5",
  Udblac: "\u0170",
  udblac: "\u0171",
  udhar: "\u296E",
  ufisht: "\u297E",
  Ufr: "\u{1D518}",
  ufr: "\u{1D532}",
  Ugrave: "\xD9",
  ugrave: "\xF9",
  uHar: "\u2963",
  uharl: "\u21BF",
  uharr: "\u21BE",
  uhblk: "\u2580",
  ulcorn: "\u231C",
  ulcorner: "\u231C",
  ulcrop: "\u230F",
  ultri: "\u25F8",
  Umacr: "\u016A",
  umacr: "\u016B",
  uml: "\xA8",
  UnderBar: "_",
  UnderBrace: "\u23DF",
  UnderBracket: "\u23B5",
  UnderParenthesis: "\u23DD",
  Union: "\u22C3",
  UnionPlus: "\u228E",
  Uogon: "\u0172",
  uogon: "\u0173",
  Uopf: "\u{1D54C}",
  uopf: "\u{1D566}",
  UpArrowBar: "\u2912",
  uparrow: "\u2191",
  UpArrow: "\u2191",
  Uparrow: "\u21D1",
  UpArrowDownArrow: "\u21C5",
  updownarrow: "\u2195",
  UpDownArrow: "\u2195",
  Updownarrow: "\u21D5",
  UpEquilibrium: "\u296E",
  upharpoonleft: "\u21BF",
  upharpoonright: "\u21BE",
  uplus: "\u228E",
  UpperLeftArrow: "\u2196",
  UpperRightArrow: "\u2197",
  upsi: "\u03C5",
  Upsi: "\u03D2",
  upsih: "\u03D2",
  Upsilon: "\u03A5",
  upsilon: "\u03C5",
  UpTeeArrow: "\u21A5",
  UpTee: "\u22A5",
  upuparrows: "\u21C8",
  urcorn: "\u231D",
  urcorner: "\u231D",
  urcrop: "\u230E",
  Uring: "\u016E",
  uring: "\u016F",
  urtri: "\u25F9",
  Uscr: "\u{1D4B0}",
  uscr: "\u{1D4CA}",
  utdot: "\u22F0",
  Utilde: "\u0168",
  utilde: "\u0169",
  utri: "\u25B5",
  utrif: "\u25B4",
  uuarr: "\u21C8",
  Uuml: "\xDC",
  uuml: "\xFC",
  uwangle: "\u29A7",
  vangrt: "\u299C",
  varepsilon: "\u03F5",
  varkappa: "\u03F0",
  varnothing: "\u2205",
  varphi: "\u03D5",
  varpi: "\u03D6",
  varpropto: "\u221D",
  varr: "\u2195",
  vArr: "\u21D5",
  varrho: "\u03F1",
  varsigma: "\u03C2",
  varsubsetneq: "\u228A\uFE00",
  varsubsetneqq: "\u2ACB\uFE00",
  varsupsetneq: "\u228B\uFE00",
  varsupsetneqq: "\u2ACC\uFE00",
  vartheta: "\u03D1",
  vartriangleleft: "\u22B2",
  vartriangleright: "\u22B3",
  vBar: "\u2AE8",
  Vbar: "\u2AEB",
  vBarv: "\u2AE9",
  Vcy: "\u0412",
  vcy: "\u0432",
  vdash: "\u22A2",
  vDash: "\u22A8",
  Vdash: "\u22A9",
  VDash: "\u22AB",
  Vdashl: "\u2AE6",
  veebar: "\u22BB",
  vee: "\u2228",
  Vee: "\u22C1",
  veeeq: "\u225A",
  vellip: "\u22EE",
  verbar: "|",
  Verbar: "\u2016",
  vert: "|",
  Vert: "\u2016",
  VerticalBar: "\u2223",
  VerticalLine: "|",
  VerticalSeparator: "\u2758",
  VerticalTilde: "\u2240",
  VeryThinSpace: "\u200A",
  Vfr: "\u{1D519}",
  vfr: "\u{1D533}",
  vltri: "\u22B2",
  vnsub: "\u2282\u20D2",
  vnsup: "\u2283\u20D2",
  Vopf: "\u{1D54D}",
  vopf: "\u{1D567}",
  vprop: "\u221D",
  vrtri: "\u22B3",
  Vscr: "\u{1D4B1}",
  vscr: "\u{1D4CB}",
  vsubnE: "\u2ACB\uFE00",
  vsubne: "\u228A\uFE00",
  vsupnE: "\u2ACC\uFE00",
  vsupne: "\u228B\uFE00",
  Vvdash: "\u22AA",
  vzigzag: "\u299A",
  Wcirc: "\u0174",
  wcirc: "\u0175",
  wedbar: "\u2A5F",
  wedge: "\u2227",
  Wedge: "\u22C0",
  wedgeq: "\u2259",
  weierp: "\u2118",
  Wfr: "\u{1D51A}",
  wfr: "\u{1D534}",
  Wopf: "\u{1D54E}",
  wopf: "\u{1D568}",
  wp: "\u2118",
  wr: "\u2240",
  wreath: "\u2240",
  Wscr: "\u{1D4B2}",
  wscr: "\u{1D4CC}",
  xcap: "\u22C2",
  xcirc: "\u25EF",
  xcup: "\u22C3",
  xdtri: "\u25BD",
  Xfr: "\u{1D51B}",
  xfr: "\u{1D535}",
  xharr: "\u27F7",
  xhArr: "\u27FA",
  Xi: "\u039E",
  xi: "\u03BE",
  xlarr: "\u27F5",
  xlArr: "\u27F8",
  xmap: "\u27FC",
  xnis: "\u22FB",
  xodot: "\u2A00",
  Xopf: "\u{1D54F}",
  xopf: "\u{1D569}",
  xoplus: "\u2A01",
  xotime: "\u2A02",
  xrarr: "\u27F6",
  xrArr: "\u27F9",
  Xscr: "\u{1D4B3}",
  xscr: "\u{1D4CD}",
  xsqcup: "\u2A06",
  xuplus: "\u2A04",
  xutri: "\u25B3",
  xvee: "\u22C1",
  xwedge: "\u22C0",
  Yacute: "\xDD",
  yacute: "\xFD",
  YAcy: "\u042F",
  yacy: "\u044F",
  Ycirc: "\u0176",
  ycirc: "\u0177",
  Ycy: "\u042B",
  ycy: "\u044B",
  yen: "\xA5",
  Yfr: "\u{1D51C}",
  yfr: "\u{1D536}",
  YIcy: "\u0407",
  yicy: "\u0457",
  Yopf: "\u{1D550}",
  yopf: "\u{1D56A}",
  Yscr: "\u{1D4B4}",
  yscr: "\u{1D4CE}",
  YUcy: "\u042E",
  yucy: "\u044E",
  yuml: "\xFF",
  Yuml: "\u0178",
  Zacute: "\u0179",
  zacute: "\u017A",
  Zcaron: "\u017D",
  zcaron: "\u017E",
  Zcy: "\u0417",
  zcy: "\u0437",
  Zdot: "\u017B",
  zdot: "\u017C",
  zeetrf: "\u2128",
  ZeroWidthSpace: "\u200B",
  Zeta: "\u0396",
  zeta: "\u03B6",
  zfr: "\u{1D537}",
  Zfr: "\u2128",
  ZHcy: "\u0416",
  zhcy: "\u0436",
  zigrarr: "\u21DD",
  zopf: "\u{1D56B}",
  Zopf: "\u2124",
  Zscr: "\u{1D4B5}",
  zscr: "\u{1D4CF}",
  zwj: "\u200D",
  zwnj: "\u200C"
};
entities$1.default = entities;
var entities_1 = entities$1;
var re = /&(?:([a-zA-Z0-9]+)|#([0-9]{1,6})|#[xX]([a-fA-F0-9]{1,6}));/g;
function decode(str) {
  return str.replace(re, function(match, $1, $2, $3) {
    if ($1)
      return entities_1.default[$1] || match;
    if ($2)
      return String.fromCodePoint(parseInt($2));
    return String.fromCodePoint(parseInt($3, 16));
  });
}
dist.exports = decode;
dist.exports.default = decode;
Object.defineProperty(dist.exports, "__esModule", { value: true });
var decode$1 = /* @__PURE__ */ getDefaultExportFromCjs(dist.exports);
var esmEntry$1 = { exports: {} };
var defaults$5 = { exports: {} };
function getDefaults$1() {
  return {
    baseUrl: null,
    breaks: false,
    extensions: null,
    gfm: true,
    headerIds: true,
    headerPrefix: "",
    highlight: null,
    langPrefix: "language-",
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}
function changeDefaults$1(newDefaults) {
  defaults$5.exports.defaults = newDefaults;
}
defaults$5.exports = {
  defaults: getDefaults$1(),
  getDefaults: getDefaults$1,
  changeDefaults: changeDefaults$1
};
const escapeTest = /[&<>"']/;
const escapeReplace = /[&<>"']/g;
const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
const escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape$3(html2, encode) {
  if (encode) {
    if (escapeTest.test(html2)) {
      return html2.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html2)) {
      return html2.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html2;
}
const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape$1(html2) {
  return html2.replace(unescapeTest, (_, n2) => {
    n2 = n2.toLowerCase();
    if (n2 === "colon")
      return ":";
    if (n2.charAt(0) === "#") {
      return n2.charAt(1) === "x" ? String.fromCharCode(parseInt(n2.substring(2), 16)) : String.fromCharCode(+n2.substring(1));
    }
    return "";
  });
}
const caret = /(^|[^\[])\^/g;
function edit$1(regex, opt) {
  regex = regex.source || regex;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      val = val.source || val;
      val = val.replace(caret, "$1");
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}
const nonWordAndColonTest = /[^\w:]/g;
const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function cleanUrl$1(sanitize, base, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape$1(href)).replace(nonWordAndColonTest, "").toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }
  return href;
}
const baseUrls = {};
const justDomain = /^[^:]+:\/*[^/]*$/;
const protocol = /^([^:]+:)[\s\S]*$/;
const domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function resolveUrl(base, href) {
  if (!baseUrls[" " + base]) {
    if (justDomain.test(base)) {
      baseUrls[" " + base] = base + "/";
    } else {
      baseUrls[" " + base] = rtrim$1(base, "/", true);
    }
  }
  base = baseUrls[" " + base];
  const relativeBase = base.indexOf(":") === -1;
  if (href.substring(0, 2) === "//") {
    if (relativeBase) {
      return href;
    }
    return base.replace(protocol, "$1") + href;
  } else if (href.charAt(0) === "/") {
    if (relativeBase) {
      return href;
    }
    return base.replace(domain, "$1") + href;
  } else {
    return base + href;
  }
}
const noopTest$1 = { exec: function noopTest() {
} };
function merge$2(obj) {
  let i = 1, target, key;
  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }
  return obj;
}
function splitCells$1(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped = false, curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (!cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count)
      cells.push("");
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim$1(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.substr(0, l - suffLen);
}
function findClosingBracket$1(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  const l = str.length;
  let level = 0, i = 0;
  for (; i < l; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
function checkSanitizeDeprecation$1(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
  }
}
function repeatString$1(pattern, count) {
  if (count < 1) {
    return "";
  }
  let result = "";
  while (count > 1) {
    if (count & 1) {
      result += pattern;
    }
    count >>= 1;
    pattern += pattern;
  }
  return result + pattern;
}
var helpers = {
  escape: escape$3,
  unescape: unescape$1,
  edit: edit$1,
  cleanUrl: cleanUrl$1,
  resolveUrl,
  noopTest: noopTest$1,
  merge: merge$2,
  splitCells: splitCells$1,
  rtrim: rtrim$1,
  findClosingBracket: findClosingBracket$1,
  checkSanitizeDeprecation: checkSanitizeDeprecation$1,
  repeatString: repeatString$1
};
const { defaults: defaults$4 } = defaults$5.exports;
const {
  rtrim,
  splitCells,
  escape: escape$2,
  findClosingBracket
} = helpers;
function outputLink(cap, link, raw, lexer) {
  const href = link.href;
  const title = link.title ? escape$2(link.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text,
      tokens: lexer.inlineTokens(text, [])
    };
    lexer.state.inLink = false;
    return token;
  } else {
    return {
      type: "image",
      raw,
      href,
      title,
      text: escape$2(text)
    };
  }
}
function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
var Tokenizer_1$1 = class Tokenizer {
  constructor(options) {
    this.options = options || defaults$4;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap) {
      if (cap[0].length > 1) {
        return {
          type: "space",
          raw: cap[0]
        };
      }
      return { raw: "\n" };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "");
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim() : cap[2],
        text
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();
      if (/#$/.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      const token = {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: cap[0]
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ *> ?/gm, "");
      return {
        type: "blockquote",
        raw: cap[0],
        tokens: this.lexer.blockTokens(text, []),
        text
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine, line, lines, itemContents;
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?: [^\\n]*| *)(?:\\n[^\\n]*)*(?:\\n|$))`);
      while (src) {
        if (this.rules.block.hr.test(src)) {
          break;
        }
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        lines = cap[2].split("\n");
        if (this.options.pedantic) {
          indent = 2;
          itemContents = lines[0].trimLeft();
        } else {
          indent = cap[2].search(/[^ ]/);
          indent = cap[1].length + (indent > 4 ? 1 : indent);
          itemContents = lines[0].slice(indent - cap[1].length);
        }
        blankLine = false;
        raw = cap[0];
        if (!lines[0] && /^ *$/.test(lines[1])) {
          raw = cap[1] + lines.slice(0, 2).join("\n") + "\n";
          list.loose = true;
          lines = [];
        }
        const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])`);
        for (i = 1; i < lines.length; i++) {
          line = lines[i];
          if (this.options.pedantic) {
            line = line.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
          }
          if (nextBulletRegex.test(line)) {
            raw = cap[1] + lines.slice(0, i).join("\n") + "\n";
            break;
          }
          if (!blankLine) {
            if (!line.trim()) {
              blankLine = true;
            }
            if (line.search(/[^ ]/) >= indent) {
              itemContents += "\n" + line.slice(indent);
            } else {
              itemContents += "\n" + line;
            }
            continue;
          }
          if (line.search(/[^ ]/) >= indent || !line.trim()) {
            itemContents += "\n" + line.slice(indent);
            continue;
          } else {
            raw = cap[1] + lines.slice(0, i).join("\n") + "\n";
            break;
          }
        }
        if (!list.loose) {
          if (endsWithBlankLine) {
            list.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents
        });
        list.raw += raw;
        src = src.slice(raw.length);
      }
      list.items[list.items.length - 1].raw = raw.trimRight();
      list.items[list.items.length - 1].text = itemContents.trimRight();
      list.raw = list.raw.trimRight();
      const l = list.items.length;
      for (i = 0; i < l; i++) {
        this.lexer.state.top = false;
        list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
        if (list.items[i].tokens.some((t2) => t2.type === "space")) {
          list.loose = true;
          list.items[i].loose = true;
        }
      }
      return list;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        raw: cap[0],
        pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
        text: cap[0]
      };
      if (this.options.sanitize) {
        token.type = "paragraph";
        token.text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$2(cap[0]);
        token.tokens = [];
        this.lexer.inline(token.text, token.tokens);
      }
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      if (cap[3])
        cap[3] = cap[3].substring(1, cap[3].length - 1);
      const tag = cap[1].toLowerCase().replace(/\s+/g, " ");
      return {
        type: "def",
        tag,
        raw: cap[0],
        href: cap[2],
        title: cap[3]
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (cap) {
      const item = {
        type: "table",
        header: splitCells(cap[1]).map((c) => {
          return { text: c };
        }),
        align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
        rows: cap[3] ? cap[3].replace(/\n$/, "").split("\n") : []
      };
      if (item.header.length === item.align.length) {
        item.raw = cap[0];
        let l = item.align.length;
        let i, j, k, row;
        for (i = 0; i < l; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = "right";
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = "center";
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = "left";
          } else {
            item.align[i] = null;
          }
        }
        l = item.rows.length;
        for (i = 0; i < l; i++) {
          item.rows[i] = splitCells(item.rows[i], item.header.length).map((c) => {
            return { text: c };
          });
        }
        l = item.header.length;
        for (j = 0; j < l; j++) {
          item.header[j].tokens = [];
          this.lexer.inlineTokens(item.header[j].text, item.header[j].tokens);
        }
        l = item.rows.length;
        for (j = 0; j < l; j++) {
          row = item.rows[j];
          for (k = 0; k < row.length; k++) {
            row[k].tokens = [];
            this.lexer.inlineTokens(row[k].text, row[k].tokens);
          }
        }
        return item;
      }
    }
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      const token = {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const token = {
        type: "paragraph",
        raw: cap[0],
        text: cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1],
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      const token = {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: []
      };
      this.lexer.inline(token.text, token.tokens);
      return token;
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: escape$2(cap[1])
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: this.options.sanitize ? "text" : "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$2(cap[0]) : cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link) {
          href = link[1];
          title = link[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
        title: title ? title.replace(this.rules.inline._escapes, "$1") : title
      }, cap[0], this.lexer);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      let link = (cap[2] || cap[1]).replace(/\s+/g, " ");
      link = links[link.toLowerCase()];
      if (!link || !link.href) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link, cap[0], this.lexer);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrong.lDelim.exec(src);
    if (!match)
      return;
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || nextChar && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar))) {
      const lLength = match[0].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim)
          continue;
        rLength = rDelim.length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        if (Math.min(lLength, rLength) % 2) {
          const text2 = src.slice(1, lLength + match.index + rLength);
          return {
            type: "em",
            raw: src.slice(0, lLength + match.index + rLength + 1),
            text: text2,
            tokens: this.lexer.inlineTokens(text2, [])
          };
        }
        const text = src.slice(2, lLength + match.index + rLength - 1);
        return {
          type: "strong",
          raw: src.slice(0, lLength + match.index + rLength + 1),
          text,
          tokens: this.lexer.inlineTokens(text, [])
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape$2(text, true);
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2], [])
      };
    }
  }
  autolink(src, mangle2) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = escape$2(this.options.mangle ? mangle2(cap[1]) : cap[1]);
        href = "mailto:" + text;
      } else {
        text = escape$2(cap[1]);
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  url(src, mangle2) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === "@") {
        text = escape$2(this.options.mangle ? mangle2(cap[0]) : cap[0]);
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape$2(cap[0]);
        if (cap[1] === "www.") {
          href = "http://" + text;
        } else {
          href = text;
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  inlineText(src, smartypants2) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text;
      if (this.lexer.state.inRawBlock) {
        text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$2(cap[0]) : cap[0];
      } else {
        text = escape$2(this.options.smartypants ? smartypants2(cap[0]) : cap[0]);
      }
      return {
        type: "text",
        raw: cap[0],
        text
      };
    }
  }
};
const {
  noopTest: noopTest2,
  edit,
  merge: merge$1
} = helpers;
const block$1 = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)( [^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  table: noopTest2,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};
block$1._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
block$1._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block$1.def = edit(block$1.def).replace("label", block$1._label).replace("title", block$1._title).getRegex();
block$1.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block$1.listItemStart = edit(/^( *)(bull) */).replace("bull", block$1.bullet).getRegex();
block$1.list = edit(block$1.list).replace(/bull/g, block$1.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block$1.def.source + ")").getRegex();
block$1._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
block$1._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
block$1.html = edit(block$1.html, "i").replace("comment", block$1._comment).replace("tag", block$1._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
block$1.paragraph = edit(block$1._paragraph).replace("hr", block$1.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block$1._tag).getRegex();
block$1.blockquote = edit(block$1.blockquote).replace("paragraph", block$1.paragraph).getRegex();
block$1.normal = merge$1({}, block$1);
block$1.gfm = merge$1({}, block$1.normal, {
  table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
});
block$1.gfm.table = edit(block$1.gfm.table).replace("hr", block$1.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block$1._tag).getRegex();
block$1.pedantic = merge$1({}, block$1.normal, {
  html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block$1._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest2,
  paragraph: edit(block$1.normal._paragraph).replace("hr", block$1.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block$1.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
});
const inline$1 = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest2,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
  nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    rDelimAst: /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
    rDelimUnd: /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest2,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/
};
inline$1._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
inline$1.punctuation = edit(inline$1.punctuation).replace(/punctuation/g, inline$1._punctuation).getRegex();
inline$1.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
inline$1.escapedEmSt = /\\\*|\\_/g;
inline$1._comment = edit(block$1._comment).replace("(?:-->|$)", "-->").getRegex();
inline$1.emStrong.lDelim = edit(inline$1.emStrong.lDelim).replace(/punct/g, inline$1._punctuation).getRegex();
inline$1.emStrong.rDelimAst = edit(inline$1.emStrong.rDelimAst, "g").replace(/punct/g, inline$1._punctuation).getRegex();
inline$1.emStrong.rDelimUnd = edit(inline$1.emStrong.rDelimUnd, "g").replace(/punct/g, inline$1._punctuation).getRegex();
inline$1._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
inline$1._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline$1._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline$1.autolink = edit(inline$1.autolink).replace("scheme", inline$1._scheme).replace("email", inline$1._email).getRegex();
inline$1._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
inline$1.tag = edit(inline$1.tag).replace("comment", inline$1._comment).replace("attribute", inline$1._attribute).getRegex();
inline$1._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline$1._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
inline$1._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
inline$1.link = edit(inline$1.link).replace("label", inline$1._label).replace("href", inline$1._href).replace("title", inline$1._title).getRegex();
inline$1.reflink = edit(inline$1.reflink).replace("label", inline$1._label).getRegex();
inline$1.reflinkSearch = edit(inline$1.reflinkSearch, "g").replace("reflink", inline$1.reflink).replace("nolink", inline$1.nolink).getRegex();
inline$1.normal = merge$1({}, inline$1);
inline$1.pedantic = merge$1({}, inline$1.normal, {
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline$1._label).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline$1._label).getRegex()
});
inline$1.gfm = merge$1({}, inline$1.normal, {
  escape: edit(inline$1.escape).replace("])", "~|])").getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
});
inline$1.gfm.url = edit(inline$1.gfm.url, "i").replace("email", inline$1.gfm._extended_email).getRegex();
inline$1.breaks = merge$1({}, inline$1.gfm, {
  br: edit(inline$1.br).replace("{2,}", "*").getRegex(),
  text: edit(inline$1.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
});
var rules = {
  block: block$1,
  inline: inline$1
};
const Tokenizer$2 = Tokenizer_1$1;
const { defaults: defaults$3 } = defaults$5.exports;
const { block, inline } = rules;
const { repeatString } = helpers;
function smartypants(text) {
  return text.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
}
function mangle(text) {
  let out = "", i, ch;
  const l = text.length;
  for (i = 0; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = "x" + ch.toString(16);
    }
    out += "&#" + ch + ";";
  }
  return out;
}
var Lexer_1$1 = class Lexer {
  constructor(options) {
    this.tokens = [];
    this.tokens.links = Object.create(null);
    this.options = options || defaults$3;
    this.options.tokenizer = this.options.tokenizer || new Tokenizer$2();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules2 = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules2.block = block.pedantic;
      rules2.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules2.block = block.gfm;
      if (this.options.breaks) {
        rules2.inline = inline.breaks;
      } else {
        rules2.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules2;
  }
  static get rules() {
    return {
      block,
      inline
    };
  }
  static lex(src, options) {
    const lexer = new Lexer(options);
    return lexer.lex(src);
  }
  static lexInline(src, options) {
    const lexer = new Lexer(options);
    return lexer.inlineTokens(src);
  }
  lex(src) {
    src = src.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ");
    this.blockTokens(src, this.tokens);
    let next;
    while (next = this.inlineQueue.shift()) {
      this.inlineTokens(next.src, next.tokens);
    }
    return this.tokens;
  }
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/^ +$/gm, "");
    }
    let token, lastToken, cutSrc, lastParagraphClipped;
    while (src) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.type) {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens) {
    this.inlineQueue.push({ src, tokens });
  }
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
    }
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src, mangle)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
};
const { defaults: defaults$2 } = defaults$5.exports;
const {
  cleanUrl,
  escape: escape$1
} = helpers;
var Renderer_1$1 = class Renderer {
  constructor(options) {
    this.options = options || defaults$2;
  }
  code(code, infostring, escaped) {
    const lang = (infostring || "").match(/\S*/)[0];
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }
    code = code.replace(/\n$/, "") + "\n";
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="' + this.options.langPrefix + escape$1(lang, true) + '">' + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
  }
  blockquote(quote) {
    return "<blockquote>\n" + quote + "</blockquote>\n";
  }
  html(html2) {
    return html2;
  }
  heading(text, level, raw, slugger) {
    if (this.options.headerIds) {
      return "<h" + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + "</h" + level + ">\n";
    }
    return "<h" + level + ">" + text + "</h" + level + ">\n";
  }
  hr() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  }
  list(body, ordered, start) {
    const type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
  }
  listitem(text) {
    return "<li>" + text + "</li>\n";
  }
  checkbox(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
  }
  paragraph(text) {
    return "<p>" + text + "</p>\n";
  }
  table(header, body) {
    if (body)
      body = "<tbody>" + body + "</tbody>";
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow(content) {
    return "<tr>\n" + content + "</tr>\n";
  }
  tablecell(content, flags) {
    const type = flags.header ? "th" : "td";
    const tag = flags.align ? "<" + type + ' align="' + flags.align + '">' : "<" + type + ">";
    return tag + content + "</" + type + ">\n";
  }
  strong(text) {
    return "<strong>" + text + "</strong>";
  }
  em(text) {
    return "<em>" + text + "</em>";
  }
  codespan(text) {
    return "<code>" + text + "</code>";
  }
  br() {
    return this.options.xhtml ? "<br/>" : "<br>";
  }
  del(text) {
    return "<del>" + text + "</del>";
  }
  link(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a href="' + escape$1(href) + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  image(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? "/>" : ">";
    return out;
  }
  text(text) {
    return text;
  }
};
var TextRenderer_1$1 = class TextRenderer {
  strong(text) {
    return text;
  }
  em(text) {
    return text;
  }
  codespan(text) {
    return text;
  }
  del(text) {
    return text;
  }
  html(text) {
    return text;
  }
  text(text) {
    return text;
  }
  link(href, title, text) {
    return "" + text;
  }
  image(href, title, text) {
    return "" + text;
  }
  br() {
    return "";
  }
};
var Slugger_1$1 = class Slugger {
  constructor() {
    this.seen = {};
  }
  serialize(value) {
    return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
  }
  getNextSafeSlug(originalSlug, isDryRun) {
    let slug = originalSlug;
    let occurenceAccumulator = 0;
    if (this.seen.hasOwnProperty(slug)) {
      occurenceAccumulator = this.seen[originalSlug];
      do {
        occurenceAccumulator++;
        slug = originalSlug + "-" + occurenceAccumulator;
      } while (this.seen.hasOwnProperty(slug));
    }
    if (!isDryRun) {
      this.seen[originalSlug] = occurenceAccumulator;
      this.seen[slug] = 0;
    }
    return slug;
  }
  slug(value, options = {}) {
    const slug = this.serialize(value);
    return this.getNextSafeSlug(slug, options.dryrun);
  }
};
const Renderer$2 = Renderer_1$1;
const TextRenderer$2 = TextRenderer_1$1;
const Slugger$2 = Slugger_1$1;
const { defaults: defaults$1 } = defaults$5.exports;
const {
  unescape
} = helpers;
var Parser_1$1 = class Parser {
  constructor(options) {
    this.options = options || defaults$1;
    this.options.renderer = this.options.renderer || new Renderer$2();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new TextRenderer$2();
    this.slugger = new Slugger$2();
  }
  static parse(tokens, options) {
    const parser = new Parser(options);
    return parser.parse(tokens);
  }
  static parseInline(tokens, options) {
    const parser = new Parser(options);
    return parser.parseInline(tokens);
  }
  parse(tokens, top = true) {
    let out = "", i, j, k, l2, l3, row, cell, header, body, token, ordered, start, loose, itemBody, item, checked, task, checkbox, ret;
    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "space": {
          continue;
        }
        case "hr": {
          out += this.renderer.hr();
          continue;
        }
        case "heading": {
          out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
          continue;
        }
        case "code": {
          out += this.renderer.code(token.text, token.lang, token.escaped);
          continue;
        }
        case "table": {
          header = "";
          cell = "";
          l2 = token.header.length;
          for (j = 0; j < l2; j++) {
            cell += this.renderer.tablecell(this.parseInline(token.header[j].tokens), { header: true, align: token.align[j] });
          }
          header += this.renderer.tablerow(cell);
          body = "";
          l2 = token.rows.length;
          for (j = 0; j < l2; j++) {
            row = token.rows[j];
            cell = "";
            l3 = row.length;
            for (k = 0; k < l3; k++) {
              cell += this.renderer.tablecell(this.parseInline(row[k].tokens), { header: false, align: token.align[k] });
            }
            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case "blockquote": {
          body = this.parse(token.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case "list": {
          ordered = token.ordered;
          start = token.start;
          loose = token.loose;
          l2 = token.items.length;
          body = "";
          for (j = 0; j < l2; j++) {
            item = token.items[j];
            checked = item.checked;
            task = item.task;
            itemBody = "";
            if (item.task) {
              checkbox = this.renderer.checkbox(checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                  item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                    item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: "text",
                    text: checkbox
                  });
                }
              } else {
                itemBody += checkbox;
              }
            }
            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, checked);
          }
          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case "html": {
          out += this.renderer.html(token.text);
          continue;
        }
        case "paragraph": {
          out += this.renderer.paragraph(this.parseInline(token.tokens));
          continue;
        }
        case "text": {
          body = token.tokens ? this.parseInline(token.tokens) : token.text;
          while (i + 1 < l && tokens[i + 1].type === "text") {
            token = tokens[++i];
            body += "\n" + (token.tokens ? this.parseInline(token.tokens) : token.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = "", i, token, ret;
    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "escape": {
          out += renderer.text(token.text);
          break;
        }
        case "html": {
          out += renderer.html(token.text);
          break;
        }
        case "link": {
          out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
          break;
        }
        case "image": {
          out += renderer.image(token.href, token.title, token.text);
          break;
        }
        case "strong": {
          out += renderer.strong(this.parseInline(token.tokens, renderer));
          break;
        }
        case "em": {
          out += renderer.em(this.parseInline(token.tokens, renderer));
          break;
        }
        case "codespan": {
          out += renderer.codespan(token.text);
          break;
        }
        case "br": {
          out += renderer.br();
          break;
        }
        case "del": {
          out += renderer.del(this.parseInline(token.tokens, renderer));
          break;
        }
        case "text": {
          out += renderer.text(token.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
const Lexer$1 = Lexer_1$1;
const Parser$1 = Parser_1$1;
const Tokenizer$1 = Tokenizer_1$1;
const Renderer$1 = Renderer_1$1;
const TextRenderer$1 = TextRenderer_1$1;
const Slugger$1 = Slugger_1$1;
const {
  merge,
  checkSanitizeDeprecation,
  escape
} = helpers;
const {
  getDefaults,
  changeDefaults,
  defaults
} = defaults$5.exports;
function marked$1(src, opt, callback) {
  if (typeof src === "undefined" || src === null) {
    throw new Error("marked(): input parameter is undefined or null");
  }
  if (typeof src !== "string") {
    throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
  }
  if (typeof opt === "function") {
    callback = opt;
    opt = null;
  }
  opt = merge({}, marked$1.defaults, opt || {});
  checkSanitizeDeprecation(opt);
  if (callback) {
    const highlight = opt.highlight;
    let tokens;
    try {
      tokens = Lexer$1.lex(src, opt);
    } catch (e) {
      return callback(e);
    }
    const done = function(err) {
      let out;
      if (!err) {
        try {
          if (opt.walkTokens) {
            marked$1.walkTokens(tokens, opt.walkTokens);
          }
          out = Parser$1.parse(tokens, opt);
        } catch (e) {
          err = e;
        }
      }
      opt.highlight = highlight;
      return err ? callback(err) : callback(null, out);
    };
    if (!highlight || highlight.length < 3) {
      return done();
    }
    delete opt.highlight;
    if (!tokens.length)
      return done();
    let pending = 0;
    marked$1.walkTokens(tokens, function(token) {
      if (token.type === "code") {
        pending++;
        setTimeout(() => {
          highlight(token.text, token.lang, function(err, code) {
            if (err) {
              return done(err);
            }
            if (code != null && code !== token.text) {
              token.text = code;
              token.escaped = true;
            }
            pending--;
            if (pending === 0) {
              done();
            }
          });
        }, 0);
      }
    });
    if (pending === 0) {
      done();
    }
    return;
  }
  try {
    const tokens = Lexer$1.lex(src, opt);
    if (opt.walkTokens) {
      marked$1.walkTokens(tokens, opt.walkTokens);
    }
    return Parser$1.parse(tokens, opt);
  } catch (e) {
    e.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (opt.silent) {
      return "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
    }
    throw e;
  }
}
marked$1.options = marked$1.setOptions = function(opt) {
  merge(marked$1.defaults, opt);
  changeDefaults(marked$1.defaults);
  return marked$1;
};
marked$1.getDefaults = getDefaults;
marked$1.defaults = defaults;
marked$1.use = function(...args) {
  const opts = merge({}, ...args);
  const extensions = marked$1.defaults.extensions || { renderers: {}, childTokens: {} };
  let hasExtensions;
  args.forEach((pack) => {
    if (pack.extensions) {
      hasExtensions = true;
      pack.extensions.forEach((ext) => {
        if (!ext.name) {
          throw new Error("extension name required");
        }
        if (ext.renderer) {
          const prevRenderer = extensions.renderers ? extensions.renderers[ext.name] : null;
          if (prevRenderer) {
            extensions.renderers[ext.name] = function(...args2) {
              let ret = ext.renderer.apply(this, args2);
              if (ret === false) {
                ret = prevRenderer.apply(this, args2);
              }
              return ret;
            };
          } else {
            extensions.renderers[ext.name] = ext.renderer;
          }
        }
        if (ext.tokenizer) {
          if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
            throw new Error("extension level must be 'block' or 'inline'");
          }
          if (extensions[ext.level]) {
            extensions[ext.level].unshift(ext.tokenizer);
          } else {
            extensions[ext.level] = [ext.tokenizer];
          }
          if (ext.start) {
            if (ext.level === "block") {
              if (extensions.startBlock) {
                extensions.startBlock.push(ext.start);
              } else {
                extensions.startBlock = [ext.start];
              }
            } else if (ext.level === "inline") {
              if (extensions.startInline) {
                extensions.startInline.push(ext.start);
              } else {
                extensions.startInline = [ext.start];
              }
            }
          }
        }
        if (ext.childTokens) {
          extensions.childTokens[ext.name] = ext.childTokens;
        }
      });
    }
    if (pack.renderer) {
      const renderer = marked$1.defaults.renderer || new Renderer$1();
      for (const prop in pack.renderer) {
        const prevRenderer = renderer[prop];
        renderer[prop] = (...args2) => {
          let ret = pack.renderer[prop].apply(renderer, args2);
          if (ret === false) {
            ret = prevRenderer.apply(renderer, args2);
          }
          return ret;
        };
      }
      opts.renderer = renderer;
    }
    if (pack.tokenizer) {
      const tokenizer = marked$1.defaults.tokenizer || new Tokenizer$1();
      for (const prop in pack.tokenizer) {
        const prevTokenizer = tokenizer[prop];
        tokenizer[prop] = (...args2) => {
          let ret = pack.tokenizer[prop].apply(tokenizer, args2);
          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer, args2);
          }
          return ret;
        };
      }
      opts.tokenizer = tokenizer;
    }
    if (pack.walkTokens) {
      const walkTokens = marked$1.defaults.walkTokens;
      opts.walkTokens = function(token) {
        pack.walkTokens.call(this, token);
        if (walkTokens) {
          walkTokens.call(this, token);
        }
      };
    }
    if (hasExtensions) {
      opts.extensions = extensions;
    }
    marked$1.setOptions(opts);
  });
};
marked$1.walkTokens = function(tokens, callback) {
  for (const token of tokens) {
    callback.call(marked$1, token);
    switch (token.type) {
      case "table": {
        for (const cell of token.header) {
          marked$1.walkTokens(cell.tokens, callback);
        }
        for (const row of token.rows) {
          for (const cell of row) {
            marked$1.walkTokens(cell.tokens, callback);
          }
        }
        break;
      }
      case "list": {
        marked$1.walkTokens(token.items, callback);
        break;
      }
      default: {
        if (marked$1.defaults.extensions && marked$1.defaults.extensions.childTokens && marked$1.defaults.extensions.childTokens[token.type]) {
          marked$1.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
            marked$1.walkTokens(token[childTokens], callback);
          });
        } else if (token.tokens) {
          marked$1.walkTokens(token.tokens, callback);
        }
      }
    }
  }
};
marked$1.parseInline = function(src, opt) {
  if (typeof src === "undefined" || src === null) {
    throw new Error("marked.parseInline(): input parameter is undefined or null");
  }
  if (typeof src !== "string") {
    throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected");
  }
  opt = merge({}, marked$1.defaults, opt || {});
  checkSanitizeDeprecation(opt);
  try {
    const tokens = Lexer$1.lexInline(src, opt);
    if (opt.walkTokens) {
      marked$1.walkTokens(tokens, opt.walkTokens);
    }
    return Parser$1.parseInline(tokens, opt);
  } catch (e) {
    e.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (opt.silent) {
      return "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
    }
    throw e;
  }
};
marked$1.Parser = Parser$1;
marked$1.parser = Parser$1.parse;
marked$1.Renderer = Renderer$1;
marked$1.TextRenderer = TextRenderer$1;
marked$1.Lexer = Lexer$1;
marked$1.lexer = Lexer$1.lex;
marked$1.Tokenizer = Tokenizer$1;
marked$1.Slugger = Slugger$1;
marked$1.parse = marked$1;
var marked_1 = marked$1;
const marked = marked_1;
const Lexer2 = Lexer_1$1;
const Parser2 = Parser_1$1;
const Tokenizer2 = Tokenizer_1$1;
const Renderer2 = Renderer_1$1;
const TextRenderer2 = TextRenderer_1$1;
const Slugger2 = Slugger_1$1;
esmEntry$1.exports = marked;
esmEntry$1.exports.parse = marked;
esmEntry$1.exports.Parser = Parser2;
esmEntry$1.exports.parser = Parser2.parse;
esmEntry$1.exports.Renderer = Renderer2;
esmEntry$1.exports.TextRenderer = TextRenderer2;
esmEntry$1.exports.Lexer = Lexer2;
esmEntry$1.exports.lexer = Lexer2.lex;
esmEntry$1.exports.Tokenizer = Tokenizer2;
esmEntry$1.exports.Slugger = Slugger2;
var esmEntry = esmEntry$1.exports;
var n = function(t2, s, r, e) {
  var u;
  s[0] = 0;
  for (var h = 1; h < s.length; h++) {
    var p = s[h++], a = s[h] ? (s[0] |= p ? 1 : 2, r[s[h++]]) : s[++h];
    p === 3 ? e[0] = a : p === 4 ? e[1] = Object.assign(e[1] || {}, a) : p === 5 ? (e[1] = e[1] || {})[s[++h]] = a : p === 6 ? e[1][s[++h]] += a + "" : p ? (u = t2.apply(a, n(t2, a, r, ["", null])), e.push(u), a[0] ? s[0] |= 2 : (s[h - 2] = 0, s[h] = u)) : e.push(a);
  }
  return e;
}, t = new Map();
function htm(s) {
  var r = t.get(this);
  return r || (r = new Map(), t.set(this, r)), (r = n(this, r.get(s) || (r.set(s, r = function(n2) {
    for (var t2, s2, r2 = 1, e = "", u = "", h = [0], p = function(n3) {
      r2 === 1 && (n3 || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h.push(0, n3, e) : r2 === 3 && (n3 || e) ? (h.push(3, n3, e), r2 = 2) : r2 === 2 && e === "..." && n3 ? h.push(4, n3, 0) : r2 === 2 && e && !n3 ? h.push(5, 0, true, e) : r2 >= 5 && ((e || !n3 && r2 === 5) && (h.push(r2, 0, e, s2), r2 = 6), n3 && (h.push(r2, n3, 0, s2), r2 = 6)), e = "";
    }, a = 0; a < n2.length; a++) {
      a && (r2 === 1 && p(), p(a));
      for (var l = 0; l < n2[a].length; l++)
        t2 = n2[a][l], r2 === 1 ? t2 === "<" ? (p(), h = [h], r2 = 3) : e += t2 : r2 === 4 ? e === "--" && t2 === ">" ? (r2 = 1, e = "") : e = t2 + e[0] : u ? t2 === u ? u = "" : e += t2 : t2 === '"' || t2 === "'" ? u = t2 : t2 === ">" ? (p(), r2 = 1) : r2 && (t2 === "=" ? (r2 = 5, s2 = e, e = "") : t2 === "/" && (r2 < 5 || n2[a][l + 1] === ">") ? (p(), r2 === 3 && (h = h[0]), r2 = h, (h = h[0]).push(2, 0, r2), r2 = 0) : t2 === " " || t2 === "	" || t2 === "\n" || t2 === "\r" ? (p(), r2 = 2) : e += t2), r2 === 3 && e === "!--" && (r2 = 4, h = h[0]);
    }
    return p(), h;
  }(s)), r), arguments, [])).length > 1 ? r : r[0];
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n2 = Object.prototype.toString.call(o).slice(8, -1);
  if (n2 === "Object" && o.constructor)
    n2 = o.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it)
    return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it)
      o = it;
    var i = 0;
    return function() {
      if (i >= o.length)
        return {
          done: true
        };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var currentHTMLContext = {
  currentFactory: function currentFactory(type, props) {
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }
    return {
      type,
      props,
      children
    };
  },
  jsxTransforms: []
};
function setHTMLContext(context) {
  currentHTMLContext = context;
}
function applyTransforms(type, props, children) {
  var _currentHTMLContext;
  var args = [type, props, children];
  for (var _iterator = _createForOfIteratorHelperLoose(currentHTMLContext.jsxTransforms), _step; !(_step = _iterator()).done; ) {
    var transform = _step.value;
    args = transform(args[0], args[1], args[2]);
  }
  return (_currentHTMLContext = currentHTMLContext).currentFactory.apply(_currentHTMLContext, [args[0], args[1]].concat(args[2]));
}
var html = /* @__PURE__ */ htm.bind(function(type, props) {
  for (var _len2 = arguments.length, children = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    children[_key2 - 2] = arguments[_key2];
  }
  return applyTransforms(type, props, children);
});
var classNameTransform = function classNameTransform2(type, props, children) {
  if (props != null && "class" in props) {
    props.className = props["class"];
    delete props["class"];
  }
  return [type, props, children];
};
var getComponentTransform = function getComponentTransform2(components) {
  return function(type, props, children) {
    if (typeof type === "string" && components[type]) {
      type = components[type];
    }
    return [type, props, children];
  };
};
function performTransFormJSXToHTM(m) {
  return m.replace(/(```+)[\s\S]*?\2|={/g, function(str, fence) {
    return fence ? str : "=${";
  });
}
function markedToReact(m, h, options) {
  var _options$components = options.components, components = _options$components === void 0 ? {} : _options$components, _options$thisValue = options.thisValue, thisValue = _options$thisValue === void 0 ? {} : _options$thisValue, _options$transformCla = options.transformClassToClassname, transformClassToClassname = _options$transformCla === void 0 ? true : _options$transformCla, _options$jsxTransform = options.jsxTransforms, jsxTransforms = _options$jsxTransform === void 0 ? [] : _options$jsxTransform;
  m = decodeHTML(m);
  if (transformClassToClassname) {
    jsxTransforms.push(function(type, props, children) {
      if (children && typeof children[0] === "string") {
        children[0] = decode$1(children[0]);
      }
      return [type, props, children];
    });
    jsxTransforms.push(classNameTransform);
  }
  jsxTransforms.push(getComponentTransform(components));
  setHTMLContext({
    currentFactory: h,
    jsxTransforms
  });
  return new Function("html", "return html`" + m.replace(/`/g, "\\`") + "`").call(thisValue, html);
}
function decodeHTML(m) {
  m.split(/(<code+)[\s\S]*?(<\/code>+)/).forEach(function(str) {
    m = m.replace(str, decode$1(str));
  });
  return m;
}
function htmdx(m, h, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$transformJSX = _options.transformJSXToHTM, transformJSXToHTM = _options$transformJSX === void 0 ? true : _options$transformJSX, configureMarked = _options.configureMarked, _options$mdxTransform = _options.mdxTransforms, mdxTransforms = _options$mdxTransform === void 0 ? [] : _options$mdxTransform;
  esmEntry.setOptions({
    xhtml: true
  });
  if (configureMarked) {
    configureMarked(esmEntry);
  }
  if (transformJSXToHTM) {
    mdxTransforms.push(performTransFormJSXToHTM);
  }
  mdxTransforms.forEach(function(t2) {
    m = t2(m);
  });
  return markedToReact(esmEntry(m), h, options);
}
var Link = {};
var _interopRequireDefault = interopRequireDefault.exports;
Object.defineProperty(Link, "__esModule", {
  value: true
});
var default_1 = Link.default = void 0;
var _createSvgIcon = _interopRequireDefault(createSvgIcon);
var _jsxRuntime = require$$2;
var _default = (0, _createSvgIcon.default)(/* @__PURE__ */ (0, _jsxRuntime.jsx)("path", {
  d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
}), "Link");
default_1 = Link.default = _default;
const CodeSyntaxHighlighter = lazy(() => import("./syntax_highlighter.js"));
const SYNTAX_KEY = "SYNTAX";
const codeTheme$ = new ValueSubject((_a = localStorage.getItem(SYNTAX_KEY)) != null ? _a : "atomOneDark");
codeTheme$.subscribe((theme) => {
  localStorage.setItem(SYNTAX_KEY, theme);
});
class ErrorBoundary extends React__default.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: ""
    };
  }
  componentDidCatch(error, errorInfo) {
    this.props.onError();
  }
  static getDerivedStateFromError(error) {
    console.log("ERROR");
    return {
      hasError: true,
      error: error.message
    };
  }
  render() {
    if (this.state.hasError) {
      console.error("mdx error", this.state.error);
      return /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx("h1", {
          children: "MDX error:"
        }), /* @__PURE__ */ jsx("div", {
          children: this.state.error
        })]
      });
    }
    return this.props.children;
  }
}
const voidElements = ["br", "hr", "img", "area", "base", "col", "embed", "link", "meta", "param", "source", "track", "wbr"];
const removeVoidElements = (mdx) => {
  if (!mdx) {
    return void 0;
  }
  voidElements.forEach((el) => {
    mdx = mdx.replace(new RegExp(`</${el}.*>`, "ig"), ``);
    mdx = mdx.replace(new RegExp(`<${el}.*>`, "ig"), `<${el} />`);
  });
  return mdx;
};
const HWrapper = default_1$1("span")({
  display: "inline-block"
});
const MDX = memo(({
  mdx,
  onSaveMDX,
  onAfterRender,
  embed
}) => {
  let i = 0;
  const [theme] = useObservableState(() => codeTheme$);
  const params = useParams();
  const document2 = useObservableState(useObservable((input$) => {
    return combineLatest([input$, documents$]).pipe(map(([input, documents]) => {
      return documents.get(input[0].contentSlug);
    }));
  }, [params]));
  const getPath = useCallback((src) => {
    if (src.includes("http") || !document2) {
      return src;
    }
    return pathBrowserify.join(projects$.value.get(document2.projectSlug).root, document2.path.split("/").slice(0, -1).join("/"), src);
  }, [document2, params]);
  const sanitizedMDX = useMemo(() => removeVoidElements(mdx), [mdx]);
  useEffect(() => {
    onSaveMDX(mdx);
  }, [mdx]);
  useEffect(() => {
    requestAnimationFrame(() => {
      onAfterRender == null ? void 0 : onAfterRender();
    });
  }, [mdx, params.headingIndex]);
  let hIndex = 0;
  return /* @__PURE__ */ jsx(Fragment, {
    children: mdx !== void 0 ? htmdx(sanitizedMDX, React__default.createElement, {
      components: __spreadProps(__spreadValues({}, [1, 2, 3, 4, 5, 6, 6, 7, 8, 10].reduce((memo2, i2) => {
        memo2[`h${i2}`] = (props) => {
          props = __spreadProps(__spreadValues({}, props), {
            id: `heading-` + hIndex,
            children: /* @__PURE__ */ jsxs(Fragment, {
              children: [/* @__PURE__ */ jsx(HWrapper, {
                children: props.children
              }), !embed && /* @__PURE__ */ jsx(Link$1, {
                to: `/docs/${params.projectSlug}/${params.contentSlug}/${hIndex}`,
                children: /* @__PURE__ */ jsx(default_1, {
                  sx: {
                    fontSize: "1.5rem"
                  }
                })
              })]
            })
          });
          hIndex++;
          return createElement(`h` + i2, props);
        };
        return memo2;
      }, {})), {
        code: (props) => {
          var _a2;
          return /* @__PURE__ */ jsx(Suspense, {
            fallback: props.children,
            children: /* @__PURE__ */ jsx(CodeSyntaxHighlighter, {
              theme,
              language: (_a2 = props == null ? void 0 : props.className) == null ? void 0 : _a2.replace("language-", ""),
              children: props.children
            })
          });
        },
        img: (props) => {
          if (props.src) {
            props = __spreadProps(__spreadValues({}, props), {
              src: getPath(props.src)
            });
          }
          return /* @__PURE__ */ jsx("img", __spreadValues({}, props));
        }
      }),
      jsxTransforms: [(type, props, children) => {
        if (!props) {
          props = {};
        }
        props.key = i++;
        return [type, props, children];
      }]
    }) : /* @__PURE__ */ jsx(CircularProgress, {
      sx: {
        marginLeft: "calc(50% - 20px)"
      }
    })
  });
});
const Wrapper = default_1$1(Box)(({
  theme
}) => __spreadProps(__spreadValues({}, theme.typography.body1), {
  "h1, h2, h3, h4, h5, h6, h7, h8, h9, h10": {
    position: "relative",
    display: "flex",
    alignItems: "center",
    "a,a:hover,a:link,a:active": {
      color: "inherit",
      textDecoration: "none",
      textAlign: "left"
    },
    "a:hover": {
      textDecoration: "underline"
    }
  }
}));
const MarkdownRenderer = ({
  mdx,
  isEditor,
  onAfterRender,
  embed
}) => {
  const currentMDX$ = useObservable(() => new ValueSubject(mdx));
  const [debouncedMDX] = useObservableState(() => isEditor ? currentMDX$.pipe(debounceTime(500, void 0)) : currentMDX$);
  useLayoutEffect(() => {
    currentMDX$.next(mdx);
  }, [mdx]);
  const saveMDXRef = useRef("");
  const mdxIdRef = useRef(0);
  return /* @__PURE__ */ jsx(Wrapper, {
    sx: {
      textAlign: "justify"
    },
    children: /* @__PURE__ */ jsx(ErrorBoundary, {
      onError: () => {
        mdxIdRef.current++;
        if (isEditor) {
          currentMDX$.next(saveMDXRef.current);
        }
      },
      children: /* @__PURE__ */ jsx(MDX, {
        embed,
        onAfterRender,
        mdx: debouncedMDX,
        onSaveMDX: (saveMDX) => {
          saveMDXRef.current = saveMDX;
        }
      })
    }, "mdx-" + mdxIdRef.current)
  });
};
export { Grow$1 as G, IconButton$1 as I, MarkdownRenderer as M, Portal$1 as P, Typography$1 as T, codeTheme$ as c, htmdx as h };
//# sourceMappingURL=markdown_renderer.js.map
