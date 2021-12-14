import { P as PropTypes, t as deepmerge, v as formatMuiErrorMessage, m as capitalize, i as _objectWithoutPropertiesLoose, _ as _extends$1, w as propToStyleFunction, x as styleFunctionSx$1, y as createTheme$1, z as styled$2, a as useTheme, j as jsx, l as clsx, g as generateUtilityClass, f as generateUtilityClasses, s as styled$3, h as useThemeProps, k as composeClasses, A as styledEngine } from "./main.js";
import * as React from "react";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n2) {
  if (n2.__esModule)
    return n2;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k2) {
    var d2 = Object.getOwnPropertyDescriptor(n2, k2);
    Object.defineProperty(a, k2, d2.get ? d2 : {
      enumerable: true,
      get: function() {
        return n2[k2];
      }
    });
  });
  return a;
}
function chainPropTypes(propType1, propType2) {
  {
    return () => null;
  }
}
const elementAcceptingRef = chainPropTypes(PropTypes.element);
elementAcceptingRef.isRequired = chainPropTypes(PropTypes.element.isRequired);
var elementAcceptingRef$1 = elementAcceptingRef;
var elementTypeAcceptingRef = chainPropTypes(PropTypes.elementType);
function exactProp(propTypes) {
  {
    return propTypes;
  }
}
var reactIs = { exports: {} };
var reactIs_production_min = {};
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = 60103, c = 60106, d = 60107, e = 60108, f = 60114, g = 60109, h = 60110, k = 60112, l = 60113, m = 60120, n = 60115, p = 60116, q = 60121, r = 60122, u = 60117, v = 60129, w = 60131;
if (typeof Symbol === "function" && Symbol.for) {
  var x = Symbol.for;
  b = x("react.element");
  c = x("react.portal");
  d = x("react.fragment");
  e = x("react.strict_mode");
  f = x("react.profiler");
  g = x("react.provider");
  h = x("react.context");
  k = x("react.forward_ref");
  l = x("react.suspense");
  m = x("react.suspense_list");
  n = x("react.memo");
  p = x("react.lazy");
  q = x("react.block");
  r = x("react.server.block");
  u = x("react.fundamental");
  v = x("react.debug_trace_mode");
  w = x("react.legacy_hidden");
}
function y(a) {
  if (typeof a === "object" && a !== null) {
    var t = a.$$typeof;
    switch (t) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e:
          case l:
          case m:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case h:
              case k:
              case p:
              case n:
              case g:
                return a;
              default:
                return t;
            }
        }
      case c:
        return t;
    }
  }
}
var z = g, A = b, B = k, C = d, D = p, E = n, F = c, G = f, H = e, I = l;
reactIs_production_min.ContextConsumer = h;
reactIs_production_min.ContextProvider = z;
reactIs_production_min.Element = A;
reactIs_production_min.ForwardRef = B;
reactIs_production_min.Fragment = C;
reactIs_production_min.Lazy = D;
reactIs_production_min.Memo = E;
reactIs_production_min.Portal = F;
reactIs_production_min.Profiler = G;
reactIs_production_min.StrictMode = H;
reactIs_production_min.Suspense = I;
reactIs_production_min.isAsyncMode = function() {
  return false;
};
reactIs_production_min.isConcurrentMode = function() {
  return false;
};
reactIs_production_min.isContextConsumer = function(a) {
  return y(a) === h;
};
reactIs_production_min.isContextProvider = function(a) {
  return y(a) === g;
};
reactIs_production_min.isElement = function(a) {
  return typeof a === "object" && a !== null && a.$$typeof === b;
};
reactIs_production_min.isForwardRef = function(a) {
  return y(a) === k;
};
reactIs_production_min.isFragment = function(a) {
  return y(a) === d;
};
reactIs_production_min.isLazy = function(a) {
  return y(a) === p;
};
reactIs_production_min.isMemo = function(a) {
  return y(a) === n;
};
reactIs_production_min.isPortal = function(a) {
  return y(a) === c;
};
reactIs_production_min.isProfiler = function(a) {
  return y(a) === f;
};
reactIs_production_min.isStrictMode = function(a) {
  return y(a) === e;
};
reactIs_production_min.isSuspense = function(a) {
  return y(a) === l;
};
reactIs_production_min.isValidElementType = function(a) {
  return typeof a === "string" || typeof a === "function" || a === d || a === f || a === v || a === e || a === l || a === m || a === w || typeof a === "object" && a !== null && (a.$$typeof === p || a.$$typeof === n || a.$$typeof === g || a.$$typeof === h || a.$$typeof === k || a.$$typeof === u || a.$$typeof === q || a[0] === r) ? true : false;
};
reactIs_production_min.typeOf = y;
{
  reactIs.exports = reactIs_production_min;
}
const fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function getFunctionName(fn) {
  const match = `${fn}`.match(fnNameMatchRegex);
  const name = match && match[1];
  return name || "";
}
function getFunctionComponentName(Component, fallback = "") {
  return Component.displayName || Component.name || getFunctionName(Component) || fallback;
}
function getWrappedName(outerType, innerType, wrapperName) {
  const functionName = getFunctionComponentName(innerType);
  return outerType.displayName || (functionName !== "" ? `${wrapperName}(${functionName})` : wrapperName);
}
function getDisplayName(Component) {
  if (Component == null) {
    return void 0;
  }
  if (typeof Component === "string") {
    return Component;
  }
  if (typeof Component === "function") {
    return getFunctionComponentName(Component, "Component");
  }
  if (typeof Component === "object") {
    switch (Component.$$typeof) {
      case reactIs.exports.ForwardRef:
        return getWrappedName(Component, Component.render, "ForwardRef");
      case reactIs.exports.Memo:
        return getWrappedName(Component, Component.type, "memo");
      default:
        return void 0;
    }
  }
  return void 0;
}
function HTMLElementType(props, propName, componentName, location, propFullName) {
  {
    return null;
  }
}
var ponyfillGlobal = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
const refType = PropTypes.oneOfType([PropTypes.func, PropTypes.object]);
var refType$1 = refType;
function createChainedFunction(...funcs) {
  return funcs.reduce((acc, func) => {
    if (func == null) {
      return acc;
    }
    return function chainedFunction(...args) {
      acc.apply(this, args);
      func.apply(this, args);
    };
  }, () => {
  });
}
function debounce(func, wait = 166) {
  let timeout;
  function debounced(...args) {
    const later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.clear = () => {
    clearTimeout(timeout);
  };
  return debounced;
}
function deprecatedPropType(validator, reason) {
  {
    return () => null;
  }
}
function isMuiElement(element, muiNames) {
  return /* @__PURE__ */ React.isValidElement(element) && muiNames.indexOf(element.type.muiName) !== -1;
}
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
function ownerWindow(node) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}
function requirePropFactory(componentNameInError, Component) {
  {
    return () => null;
  }
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
const useEnhancedEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
var useEnhancedEffect$1 = useEnhancedEffect;
function useId(idOverride) {
  const [defaultId, setDefaultId] = React.useState(idOverride);
  const id = idOverride || defaultId;
  React.useEffect(() => {
    if (defaultId == null) {
      setDefaultId(`mui-${Math.round(Math.random() * 1e9)}`);
    }
  }, [defaultId]);
  return id;
}
function unsupportedProp(props, propName, componentName, location, propFullName) {
  {
    return null;
  }
}
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = "value"
}) {
  const {
    current: isControlled
  } = React.useRef(controlled !== void 0);
  const [valueState, setValue] = React.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  const setValueIfUncontrolled = React.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}
function useEventCallback(fn) {
  const ref = React.useRef(fn);
  useEnhancedEffect$1(() => {
    ref.current = fn;
  });
  return React.useCallback((...args) => (0, ref.current)(...args), []);
}
function useForkRef(refA, refB) {
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}
let hadKeyboardEvent = true;
let hadFocusVisibleRecently = false;
let hadFocusVisibleRecentlyTimeout = null;
const inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  "datetime-local": true
};
function focusTriggersKeyboardModality(node) {
  const {
    type,
    tagName
  } = node;
  if (tagName === "INPUT" && inputTypesWhitelist[type] && !node.readOnly) {
    return true;
  }
  if (tagName === "TEXTAREA" && !node.readOnly) {
    return true;
  }
  if (node.isContentEditable) {
    return true;
  }
  return false;
}
function handleKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }
  hadKeyboardEvent = true;
}
function handlePointerDown() {
  hadKeyboardEvent = false;
}
function handleVisibilityChange() {
  if (this.visibilityState === "hidden") {
    if (hadFocusVisibleRecently) {
      hadKeyboardEvent = true;
    }
  }
}
function prepare(doc) {
  doc.addEventListener("keydown", handleKeyDown, true);
  doc.addEventListener("mousedown", handlePointerDown, true);
  doc.addEventListener("pointerdown", handlePointerDown, true);
  doc.addEventListener("touchstart", handlePointerDown, true);
  doc.addEventListener("visibilitychange", handleVisibilityChange, true);
}
function isFocusVisible(event) {
  const {
    target
  } = event;
  try {
    return target.matches(":focus-visible");
  } catch (error) {
  }
  return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}
function useIsFocusVisible() {
  const ref = React.useCallback((node) => {
    if (node != null) {
      prepare(node.ownerDocument);
    }
  }, []);
  const isFocusVisibleRef = React.useRef(false);
  function handleBlurVisible() {
    if (isFocusVisibleRef.current) {
      hadFocusVisibleRecently = true;
      window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
        hadFocusVisibleRecently = false;
      }, 100);
      isFocusVisibleRef.current = false;
      return true;
    }
    return false;
  }
  function handleFocusVisible(event) {
    if (isFocusVisible(event)) {
      isFocusVisibleRef.current = true;
      return true;
    }
    return false;
  }
  return {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref
  };
}
function getScrollbarSize(doc) {
  const documentWidth = doc.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}
let cachedType;
function detectScrollType() {
  if (cachedType) {
    return cachedType;
  }
  const dummy = document.createElement("div");
  const container = document.createElement("div");
  container.style.width = "10px";
  container.style.height = "1px";
  dummy.appendChild(container);
  dummy.dir = "rtl";
  dummy.style.fontSize = "14px";
  dummy.style.width = "4px";
  dummy.style.height = "1px";
  dummy.style.position = "absolute";
  dummy.style.top = "-1000px";
  dummy.style.overflow = "scroll";
  document.body.appendChild(dummy);
  cachedType = "reverse";
  if (dummy.scrollLeft > 0) {
    cachedType = "default";
  } else {
    dummy.scrollLeft = 1;
    if (dummy.scrollLeft === 0) {
      cachedType = "negative";
    }
  }
  document.body.removeChild(dummy);
  return cachedType;
}
function getNormalizedScrollLeft(element, direction) {
  const scrollLeft = element.scrollLeft;
  if (direction !== "rtl") {
    return scrollLeft;
  }
  const type = detectScrollType();
  switch (type) {
    case "negative":
      return element.scrollWidth - element.clientWidth + scrollLeft;
    case "reverse":
      return element.scrollWidth - element.clientWidth - scrollLeft;
    default:
      return scrollLeft;
  }
}
const usePreviousProps = (value) => {
  const ref = React.useRef({});
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
var usePreviousProps$1 = usePreviousProps;
const visuallyHidden = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px"
};
var visuallyHidden$1 = visuallyHidden;
function validatorNoop() {
  return null;
}
validatorNoop.isRequired = validatorNoop;
var integerPropType = validatorNoop;
var esm = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  chainPropTypes,
  deepmerge,
  elementAcceptingRef: elementAcceptingRef$1,
  elementTypeAcceptingRef,
  exactProp,
  formatMuiErrorMessage,
  getDisplayName,
  HTMLElementType,
  ponyfillGlobal,
  refType: refType$1,
  unstable_capitalize: capitalize,
  unstable_createChainedFunction: createChainedFunction,
  unstable_debounce: debounce,
  unstable_deprecatedPropType: deprecatedPropType,
  unstable_isMuiElement: isMuiElement,
  unstable_ownerDocument: ownerDocument,
  unstable_ownerWindow: ownerWindow,
  unstable_requirePropFactory: requirePropFactory,
  unstable_setRef: setRef,
  unstable_useEnhancedEffect: useEnhancedEffect$1,
  unstable_useId: useId,
  unstable_unsupportedProp: unsupportedProp,
  unstable_useControlled: useControlled,
  unstable_useEventCallback: useEventCallback,
  unstable_useForkRef: useForkRef,
  unstable_useIsFocusVisible: useIsFocusVisible,
  unstable_getScrollbarSize: getScrollbarSize,
  unstable_detectScrollType: detectScrollType,
  unstable_getNormalizedScrollLeft: getNormalizedScrollLeft,
  usePreviousProps: usePreviousProps$1,
  visuallyHidden: visuallyHidden$1,
  integerPropType
});
const _excluded$4 = ["sx"];
const splitProps = (props) => {
  const result = {
    systemProps: {},
    otherProps: {}
  };
  Object.keys(props).forEach((prop) => {
    if (propToStyleFunction[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });
  return result;
};
function extendSxProp(props) {
  const {
    sx: inSx
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$4);
  const {
    systemProps,
    otherProps
  } = splitProps(other);
  return _extends$1({}, otherProps, {
    sx: _extends$1({}, systemProps, inSx)
  });
}
var styleFunctionSx = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": styleFunctionSx$1,
  extendSxProp
});
var createTheme = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": createTheme$1
});
const _excluded$3 = ["className", "component"];
function createBox(options = {}) {
  const {
    defaultTheme
  } = options;
  const BoxRoot = styled$2("div")(styleFunctionSx$1);
  const Box2 = /* @__PURE__ */ React.forwardRef(function Box3(inProps, ref) {
    const theme = useTheme(defaultTheme);
    const _extendSxProp = extendSxProp(inProps), {
      className,
      component = "div"
    } = _extendSxProp, other = _objectWithoutPropertiesLoose(_extendSxProp, _excluded$3);
    return /* @__PURE__ */ jsx(BoxRoot, _extends$1({
      as: component,
      ref,
      className: clsx(className, "MuiBox-root"),
      theme
    }, other));
  });
  return Box2;
}
const Box = createBox();
var Box$1 = Box;
function getContainerUtilityClass(slot) {
  return generateUtilityClass("MuiContainer", slot);
}
generateUtilityClasses("MuiContainer", ["root", "disableGutters", "fixed", "maxWidthXs", "maxWidthSm", "maxWidthMd", "maxWidthLg", "maxWidthXl"]);
const _excluded$2 = ["className", "component", "disableGutters", "fixed", "maxWidth"];
const useUtilityClasses = (ownerState) => {
  const {
    classes,
    fixed,
    disableGutters,
    maxWidth
  } = ownerState;
  const slots = {
    root: ["root", maxWidth && `maxWidth${capitalize(String(maxWidth))}`, fixed && "fixed", disableGutters && "disableGutters"]
  };
  return composeClasses(slots, getContainerUtilityClass, classes);
};
const ContainerRoot = styled$3("div", {
  name: "MuiContainer",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`maxWidth${capitalize(String(ownerState.maxWidth))}`], ownerState.fixed && styles.fixed, ownerState.disableGutters && styles.disableGutters];
  }
})(({
  theme,
  ownerState
}) => _extends$1({
  width: "100%",
  marginLeft: "auto",
  boxSizing: "border-box",
  marginRight: "auto",
  display: "block"
}, !ownerState.disableGutters && {
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
}), ({
  theme,
  ownerState
}) => ownerState.fixed && Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
  const value = theme.breakpoints.values[breakpoint];
  if (value !== 0) {
    acc[theme.breakpoints.up(breakpoint)] = {
      maxWidth: `${value}${theme.breakpoints.unit}`
    };
  }
  return acc;
}, {}), ({
  theme,
  ownerState
}) => _extends$1({}, ownerState.maxWidth === "xs" && {
  [theme.breakpoints.up("xs")]: {
    maxWidth: Math.max(theme.breakpoints.values.xs, 444)
  }
}, ownerState.maxWidth && ownerState.maxWidth !== "xs" && {
  [theme.breakpoints.up(ownerState.maxWidth)]: {
    maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`
  }
}));
const Container = /* @__PURE__ */ React.forwardRef(function Container2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiContainer"
  });
  const {
    className,
    component = "div",
    disableGutters = false,
    fixed = false,
    maxWidth = "lg"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
  const ownerState = _extends$1({}, props, {
    component,
    disableGutters,
    fixed,
    maxWidth
  });
  const classes = useUtilityClasses(ownerState);
  return /* @__PURE__ */ jsx(ContainerRoot, _extends$1({
    as: component,
    ownerState,
    className: clsx(classes.root, className),
    ref
  }, other));
});
var Container$1 = Container;
var styled$1 = {};
var interopRequireDefault = { exports: {} };
(function(module) {
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  module.exports = _interopRequireDefault2;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
})(interopRequireDefault);
var createStyled$1 = {};
var _extends = { exports: {} };
(function(module) {
  function _extends3() {
    module.exports = _extends3 = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    module.exports["default"] = module.exports, module.exports.__esModule = true;
    return _extends3.apply(this, arguments);
  }
  module.exports = _extends3;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
})(_extends);
var objectWithoutPropertiesLoose = { exports: {} };
(function(module) {
  function _objectWithoutPropertiesLoose3(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  module.exports = _objectWithoutPropertiesLoose3;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
})(objectWithoutPropertiesLoose);
var require$$3 = /* @__PURE__ */ getAugmentedNamespace(styledEngine);
var require$$4 = /* @__PURE__ */ getAugmentedNamespace(esm);
var require$$5 = /* @__PURE__ */ getAugmentedNamespace(createTheme);
var require$$6 = /* @__PURE__ */ getAugmentedNamespace(styleFunctionSx);
var propsToClassKey$1 = {};
var _interopRequireDefault$2 = interopRequireDefault.exports;
Object.defineProperty(propsToClassKey$1, "__esModule", {
  value: true
});
propsToClassKey$1.default = propsToClassKey;
var _objectWithoutPropertiesLoose2$1 = _interopRequireDefault$2(objectWithoutPropertiesLoose.exports);
var _utils = require$$4;
const _excluded$1 = ["variant"];
function isEmpty$1(string) {
  return string.length === 0;
}
function propsToClassKey(props) {
  const {
    variant
  } = props, other = (0, _objectWithoutPropertiesLoose2$1.default)(props, _excluded$1);
  let classKey = variant || "";
  Object.keys(other).sort().forEach((key) => {
    if (key === "color") {
      classKey += isEmpty$1(classKey) ? props[key] : (0, _utils.unstable_capitalize)(props[key]);
    } else {
      classKey += `${isEmpty$1(classKey) ? key : (0, _utils.unstable_capitalize)(key)}${(0, _utils.unstable_capitalize)(props[key].toString())}`;
    }
  });
  return classKey;
}
var _interopRequireDefault$1 = interopRequireDefault.exports;
Object.defineProperty(createStyled$1, "__esModule", {
  value: true
});
createStyled$1.default = createStyled;
createStyled$1.shouldForwardProp = shouldForwardProp;
createStyled$1.systemDefaultTheme = void 0;
var _extends2 = _interopRequireDefault$1(_extends.exports);
var _objectWithoutPropertiesLoose2 = _interopRequireDefault$1(objectWithoutPropertiesLoose.exports);
var _styledEngine = _interopRequireDefault$1(require$$3);
var _createTheme = _interopRequireDefault$1(require$$5);
var _styleFunctionSx = _interopRequireDefault$1(require$$6);
var _propsToClassKey = _interopRequireDefault$1(propsToClassKey$1);
const _excluded = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"], _excluded2 = ["theme"], _excluded3 = ["theme"];
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
const getStyleOverrides = (name, theme) => {
  if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    return theme.components[name].styleOverrides;
  }
  return null;
};
const getVariantStyles = (name, theme) => {
  let variants = [];
  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }
  const variantsStyles = {};
  variants.forEach((definition) => {
    const key = (0, _propsToClassKey.default)(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
};
const variantsResolver = (props, styles, theme, name) => {
  var _theme$components, _theme$components$nam;
  const {
    ownerState = {}
  } = props;
  const variantsStyles = [];
  const themeVariants = theme == null ? void 0 : (_theme$components = theme.components) == null ? void 0 : (_theme$components$nam = _theme$components[name]) == null ? void 0 : _theme$components$nam.variants;
  if (themeVariants) {
    themeVariants.forEach((themeVariant) => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach((key) => {
        if (ownerState[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });
      if (isMatch) {
        variantsStyles.push(styles[(0, _propsToClassKey.default)(themeVariant.props)]);
      }
    });
  }
  return variantsStyles;
};
function shouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
const systemDefaultTheme = (0, _createTheme.default)();
createStyled$1.systemDefaultTheme = systemDefaultTheme;
function createStyled(input = {}) {
  const {
    defaultTheme = systemDefaultTheme,
    rootShouldForwardProp = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp
  } = input;
  return (tag, inputOptions = {}) => {
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver
    } = inputOptions, options = (0, _objectWithoutPropertiesLoose2.default)(inputOptions, _excluded);
    const skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : componentSlot && componentSlot !== "Root" || false;
    const skipSx = inputSkipSx || false;
    let label;
    let shouldForwardPropOption = shouldForwardProp;
    if (componentSlot === "Root") {
      shouldForwardPropOption = rootShouldForwardProp;
    } else if (componentSlot) {
      shouldForwardPropOption = slotShouldForwardProp;
    }
    const defaultStyledResolver = (0, _styledEngine.default)(tag, (0, _extends2.default)({
      shouldForwardProp: shouldForwardPropOption,
      label
    }, options));
    const muiStyledResolver = (styleArg, ...expressions) => {
      const expressionsWithDefaultTheme = expressions ? expressions.map((stylesArg) => {
        return typeof stylesArg === "function" && stylesArg.__emotion_real !== stylesArg ? (_ref) => {
          let {
            theme: themeInput
          } = _ref, other = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded2);
          return stylesArg((0, _extends2.default)({
            theme: isEmpty(themeInput) ? defaultTheme : themeInput
          }, other));
        } : stylesArg;
      }) : [];
      let transformedStyleArg = styleArg;
      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          const styleOverrides = getStyleOverrides(componentName, theme);
          if (styleOverrides) {
            return overridesResolver(props, styleOverrides);
          }
          return null;
        });
      }
      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          return variantsResolver(props, getVariantStyles(componentName, theme), theme, componentName);
        });
      }
      if (!skipSx) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          return (0, _styleFunctionSx.default)((0, _extends2.default)({}, props, {
            theme
          }));
        });
      }
      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;
      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill("");
        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      } else if (typeof styleArg === "function") {
        transformedStyleArg = (_ref2) => {
          let {
            theme: themeInput
          } = _ref2, other = (0, _objectWithoutPropertiesLoose2.default)(_ref2, _excluded3);
          return styleArg((0, _extends2.default)({
            theme: isEmpty(themeInput) ? defaultTheme : themeInput
          }, other));
        };
      }
      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);
      return Component;
    };
    return muiStyledResolver;
  };
}
var _interopRequireDefault = interopRequireDefault.exports;
Object.defineProperty(styled$1, "__esModule", {
  value: true
});
var default_1 = styled$1.default = void 0;
var _createStyled = _interopRequireDefault(createStyled$1);
const styled = (0, _createStyled.default)();
var _default = styled;
default_1 = styled$1.default = _default;
export { Box$1 as B, Container$1 as C, useEventCallback as a, useIsFocusVisible as b, createBox as c, default_1 as d, createChainedFunction as e, debounce as f, deprecatedPropType as g, isMuiElement as h, interopRequireDefault as i, ownerWindow as j, useEnhancedEffect$1 as k, useId as l, unsupportedProp as m, useControlled as n, ownerDocument as o, getAugmentedNamespace as p, extendSxProp as q, requirePropFactory as r, setRef as s, getDefaultExportFromCjs as t, useForkRef as u, commonjsGlobal as v, getScrollbarSize as w };
//# sourceMappingURL=styled.js.map
