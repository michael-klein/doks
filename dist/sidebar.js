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
import { i as interopRequireDefault, b as useForkRef, k as useEnhancedEffect, o as ownerDocument, l as useId, n as useControlled, d as default_1$4 } from "./styled.js";
import { c as createSvgIcon, r as require$$2, B as ButtonBase } from "./jsx-runtime_commonjs-proxy.js";
import { m as generateUtilityClass, n as generateUtilityClasses, o as styled, _ as _extends, q as useThemeProps, G as duration, h as _objectWithoutPropertiesLoose, r as composeClasses, j as jsx, l as clsx, d as jsxs, y as alpha, g as capitalize, D as useTheme$1, H as getThemeProps, C as CircularProgress } from "./main.js";
import * as React from "react";
import React__default, { Fragment, useState, useCallback, useEffect, useLayoutEffect } from "react";
import { u as useParams } from "./doks.js";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { u as useObservableAndState } from "./use_observable_and_state.js";
import { p as projects$, c as contents$ } from "./documents.js";
import { C as ConditionalCard } from "./conditional_card.js";
import { T as Transition, b as useTheme, g as getTransitionProps, u as useObservableState } from "./use-observable-state.js";
import { G as Grid } from "./Grid.js";
import { B as Box } from "./Box.js";
import { g as getNativeSelectUtilityClasses, N as NativeSelectInput, A as ArrowDropDownIcon, I as Input, F as FormControl, a as InputLabel } from "./Input.js";
import { u as useFormControl, f as formControlState } from "./InputBase.js";
import { B as Button } from "./Button.js";
import "react-dom";
import "./Card.js";
var ChevronRight = {};
var _interopRequireDefault$3 = interopRequireDefault.exports;
Object.defineProperty(ChevronRight, "__esModule", {
  value: true
});
var default_1$3 = ChevronRight.default = void 0;
var _createSvgIcon$3 = _interopRequireDefault$3(createSvgIcon);
var _jsxRuntime$3 = require$$2;
var _default$3 = (0, _createSvgIcon$3.default)(/* @__PURE__ */ (0, _jsxRuntime$3.jsx)("path", {
  d: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
}), "ChevronRight");
default_1$3 = ChevronRight.default = _default$3;
var Close = {};
var _interopRequireDefault$2 = interopRequireDefault.exports;
Object.defineProperty(Close, "__esModule", {
  value: true
});
var default_1$2 = Close.default = void 0;
var _createSvgIcon$2 = _interopRequireDefault$2(createSvgIcon);
var _jsxRuntime$2 = require$$2;
var _default$2 = (0, _createSvgIcon$2.default)(/* @__PURE__ */ (0, _jsxRuntime$2.jsx)("path", {
  d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), "Close");
default_1$2 = Close.default = _default$2;
var ExpandMore = {};
var _interopRequireDefault$1 = interopRequireDefault.exports;
Object.defineProperty(ExpandMore, "__esModule", {
  value: true
});
var default_1$1 = ExpandMore.default = void 0;
var _createSvgIcon$1 = _interopRequireDefault$1(createSvgIcon);
var _jsxRuntime$1 = require$$2;
var _default$1 = (0, _createSvgIcon$1.default)(/* @__PURE__ */ (0, _jsxRuntime$1.jsx)("path", {
  d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
}), "ExpandMore");
default_1$1 = ExpandMore.default = _default$1;
var Menu = {};
var _interopRequireDefault = interopRequireDefault.exports;
Object.defineProperty(Menu, "__esModule", {
  value: true
});
var default_1 = Menu.default = void 0;
var _createSvgIcon = _interopRequireDefault(createSvgIcon);
var _jsxRuntime = require$$2;
var _default = (0, _createSvgIcon.default)(/* @__PURE__ */ (0, _jsxRuntime.jsx)("path", {
  d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
}), "Menu");
default_1 = Menu.default = _default;
function getCollapseUtilityClass(slot) {
  return generateUtilityClass("MuiCollapse", slot);
}
generateUtilityClasses("MuiCollapse", ["root", "horizontal", "vertical", "entered", "hidden", "wrapper", "wrapperInner"]);
const _excluded$6 = ["addEndListener", "children", "className", "collapsedSize", "component", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "orientation", "style", "timeout", "TransitionComponent"];
const useUtilityClasses$4 = (ownerState) => {
  const {
    orientation,
    classes
  } = ownerState;
  const slots = {
    root: ["root", `${orientation}`],
    entered: ["entered"],
    hidden: ["hidden"],
    wrapper: ["wrapper", `${orientation}`],
    wrapperInner: ["wrapperInner", `${orientation}`]
  };
  return composeClasses(slots, getCollapseUtilityClass, classes);
};
const CollapseRoot = styled("div", {
  name: "MuiCollapse",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.orientation], ownerState.state === "entered" && styles.entered, ownerState.state === "exited" && !ownerState.in && ownerState.collapsedSize === "0px" && styles.hidden];
  }
})(({
  theme,
  ownerState
}) => _extends({
  height: 0,
  overflow: "hidden",
  transition: theme.transitions.create("height")
}, ownerState.orientation === "horizontal" && {
  height: "auto",
  width: 0,
  transition: theme.transitions.create("width")
}, ownerState.state === "entered" && _extends({
  height: "auto",
  overflow: "visible"
}, ownerState.orientation === "horizontal" && {
  width: "auto"
}), ownerState.state === "exited" && !ownerState.in && ownerState.collapsedSize === "0px" && {
  visibility: "hidden"
}));
const CollapseWrapper = styled("div", {
  name: "MuiCollapse",
  slot: "Wrapper",
  overridesResolver: (props, styles) => styles.wrapper
})(({
  ownerState
}) => _extends({
  display: "flex",
  width: "100%"
}, ownerState.orientation === "horizontal" && {
  width: "auto",
  height: "100%"
}));
const CollapseWrapperInner = styled("div", {
  name: "MuiCollapse",
  slot: "WrapperInner",
  overridesResolver: (props, styles) => styles.wrapperInner
})(({
  ownerState
}) => _extends({
  width: "100%"
}, ownerState.orientation === "horizontal" && {
  width: "auto",
  height: "100%"
}));
const Collapse = /* @__PURE__ */ React.forwardRef(function Collapse2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiCollapse"
  });
  const {
    addEndListener,
    children,
    className,
    collapsedSize: collapsedSizeProp = "0px",
    component,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    orientation = "vertical",
    style,
    timeout = duration.standard,
    TransitionComponent = Transition
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$6);
  const ownerState = _extends({}, props, {
    orientation,
    collapsedSize: collapsedSizeProp
  });
  const classes = useUtilityClasses$4(ownerState);
  const theme = useTheme();
  const timer = React.useRef();
  const wrapperRef = React.useRef(null);
  const autoTransitionDuration = React.useRef();
  const collapsedSize = typeof collapsedSizeProp === "number" ? `${collapsedSizeProp}px` : collapsedSizeProp;
  const isHorizontal = orientation === "horizontal";
  const size = isHorizontal ? "width" : "height";
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(ref, nodeRef);
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
  const getWrapperSize = () => wrapperRef.current ? wrapperRef.current[isHorizontal ? "clientWidth" : "clientHeight"] : 0;
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    if (wrapperRef.current && isHorizontal) {
      wrapperRef.current.style.position = "absolute";
    }
    node.style[size] = collapsedSize;
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
    const wrapperSize = getWrapperSize();
    if (wrapperRef.current && isHorizontal) {
      wrapperRef.current.style.position = "";
    }
    const {
      duration: transitionDuration,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "enter"
    });
    if (timeout === "auto") {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration = typeof transitionDuration === "string" ? transitionDuration : `${transitionDuration}ms`;
    }
    node.style[size] = `${wrapperSize}px`;
    node.style.transitionTimingFunction = transitionTimingFunction;
    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback((node, isAppearing) => {
    node.style[size] = "auto";
    if (onEntered) {
      onEntered(node, isAppearing);
    }
  });
  const handleExit = normalizedTransitionCallback((node) => {
    node.style[size] = `${getWrapperSize()}px`;
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleExiting = normalizedTransitionCallback((node) => {
    const wrapperSize = getWrapperSize();
    const {
      duration: transitionDuration,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "exit"
    });
    if (timeout === "auto") {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration = typeof transitionDuration === "string" ? transitionDuration : `${transitionDuration}ms`;
    }
    node.style[size] = collapsedSize;
    node.style.transitionTimingFunction = transitionTimingFunction;
    if (onExiting) {
      onExiting(node);
    }
  });
  const handleAddEndListener = (next) => {
    if (timeout === "auto") {
      timer.current = setTimeout(next, autoTransitionDuration.current || 0);
    }
    if (addEndListener) {
      addEndListener(nodeRef.current, next);
    }
  };
  return /* @__PURE__ */ jsx(TransitionComponent, _extends({
    in: inProp,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    nodeRef,
    timeout: timeout === "auto" ? null : timeout
  }, other, {
    children: (state, childProps) => /* @__PURE__ */ jsx(CollapseRoot, _extends({
      as: component,
      className: clsx(classes.root, className, {
        "entered": classes.entered,
        "exited": !inProp && collapsedSize === "0px" && classes.hidden
      }[state]),
      style: _extends({
        [isHorizontal ? "minWidth" : "minHeight"]: collapsedSize
      }, style),
      ownerState: _extends({}, ownerState, {
        state
      }),
      ref: handleRef
    }, childProps, {
      children: /* @__PURE__ */ jsx(CollapseWrapper, {
        ownerState: _extends({}, ownerState, {
          state
        }),
        className: classes.wrapper,
        ref: wrapperRef,
        children: /* @__PURE__ */ jsx(CollapseWrapperInner, {
          ownerState: _extends({}, ownerState, {
            state
          }),
          className: classes.wrapperInner,
          children
        })
      })
    }))
  }));
});
Collapse.muiSupportAuto = true;
var Collapse$1 = Collapse;
const TreeViewContext = /* @__PURE__ */ React.createContext({});
var TreeViewContext$1 = TreeViewContext;
const _excluded$5 = ["element"];
function findIndex(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }
  return -1;
}
function binaryFindElement(array, element) {
  let start = 0;
  let end = array.length - 1;
  while (start <= end) {
    const middle = Math.floor((start + end) / 2);
    if (array[middle].element === element) {
      return middle;
    }
    if (array[middle].element.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }
  return start;
}
const DescendantContext = /* @__PURE__ */ React.createContext({});
function usePrevious(value) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
const noop = () => {
};
function useDescendant(descendant) {
  const [, forceUpdate] = React.useState();
  const {
    registerDescendant = noop,
    unregisterDescendant = noop,
    descendants = [],
    parentId = null
  } = React.useContext(DescendantContext);
  const index = findIndex(descendants, (item) => item.element === descendant.element);
  const previousDescendants = usePrevious(descendants);
  const someDescendantsHaveChanged = descendants.some((newDescendant, position) => {
    return previousDescendants && previousDescendants[position] && previousDescendants[position].element !== newDescendant.element;
  });
  useEnhancedEffect(() => {
    if (descendant.element) {
      registerDescendant(_extends({}, descendant, {
        index
      }));
      return () => {
        unregisterDescendant(descendant.element);
      };
    }
    forceUpdate({});
    return void 0;
  }, [registerDescendant, unregisterDescendant, index, someDescendantsHaveChanged, descendant]);
  return {
    parentId,
    index
  };
}
function DescendantProvider(props) {
  const {
    children,
    id
  } = props;
  const [items, set] = React.useState([]);
  const registerDescendant = React.useCallback((_ref) => {
    let {
      element
    } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded$5);
    set((oldItems) => {
      let newItems;
      if (oldItems.length === 0) {
        return [_extends({}, other, {
          element,
          index: 0
        })];
      }
      const index = binaryFindElement(oldItems, element);
      if (oldItems[index] && oldItems[index].element === element) {
        newItems = oldItems;
      } else {
        const newItem = _extends({}, other, {
          element,
          index
        });
        newItems = oldItems.slice();
        newItems.splice(index, 0, newItem);
      }
      newItems.forEach((item, position) => {
        item.index = position;
      });
      return newItems;
    });
  }, []);
  const unregisterDescendant = React.useCallback((element) => {
    set((oldItems) => oldItems.filter((item) => element !== item.element));
  }, []);
  const value = React.useMemo(() => ({
    descendants: items,
    registerDescendant,
    unregisterDescendant,
    parentId: id
  }), [items, registerDescendant, unregisterDescendant, id]);
  return /* @__PURE__ */ jsx(DescendantContext.Provider, {
    value,
    children
  });
}
function useTreeItem(nodeId) {
  const {
    focus,
    isExpanded,
    isExpandable,
    isFocused,
    isDisabled,
    isSelected,
    multiSelect,
    selectNode,
    selectRange,
    toggleExpansion
  } = React.useContext(TreeViewContext$1);
  const expandable = isExpandable ? isExpandable(nodeId) : false;
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const disabled = isDisabled ? isDisabled(nodeId) : false;
  const selected = isSelected ? isSelected(nodeId) : false;
  const handleExpansion = (event) => {
    if (!disabled) {
      if (!focused) {
        focus(event, nodeId);
      }
      const multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);
      if (expandable && !(multiple && isExpanded(nodeId))) {
        toggleExpansion(event, nodeId);
      }
    }
  };
  const handleSelection = (event) => {
    if (!disabled) {
      if (!focused) {
        focus(event, nodeId);
      }
      const multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);
      if (multiple) {
        if (event.shiftKey) {
          selectRange(event, {
            end: nodeId
          });
        } else {
          selectNode(event, nodeId, true);
        }
      } else {
        selectNode(event, nodeId);
      }
    }
  };
  const preventSelection = (event) => {
    if (event.shiftKey || event.ctrlKey || event.metaKey || disabled) {
      event.preventDefault();
    }
  };
  return {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection
  };
}
const _excluded$4 = ["classes", "className", "displayIcon", "expansionIcon", "icon", "label", "nodeId", "onClick", "onMouseDown"];
const TreeItemContent = /* @__PURE__ */ React.forwardRef(function TreeItemContent2(props, ref) {
  const {
    classes,
    className,
    displayIcon,
    expansionIcon,
    icon: iconProp,
    label,
    nodeId,
    onClick,
    onMouseDown
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$4);
  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection
  } = useTreeItem(nodeId);
  const icon = iconProp || expansionIcon || displayIcon;
  const handleMouseDown = (event) => {
    preventSelection(event);
    if (onMouseDown) {
      onMouseDown(event);
    }
  };
  const handleClick = (event) => {
    handleExpansion(event);
    handleSelection(event);
    if (onClick) {
      onClick(event);
    }
  };
  return /* @__PURE__ */ jsxs("div", _extends({
    className: clsx(className, classes.root, expanded && classes.expanded, selected && classes.selected, focused && classes.focused, disabled && classes.disabled),
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    ref
  }, other, {
    children: [/* @__PURE__ */ jsx("div", {
      className: classes.iconContainer,
      children: icon
    }), /* @__PURE__ */ jsx("div", {
      className: classes.label,
      children: label
    })]
  }));
});
var TreeItemContent$1 = TreeItemContent;
function getTreeItemUtilityClass(slot) {
  return generateUtilityClass("MuiTreeItem", slot);
}
const treeItemClasses = generateUtilityClasses("MuiTreeItem", ["root", "group", "content", "expanded", "selected", "focused", "disabled", "iconContainer", "label"]);
var treeItemClasses$1 = treeItemClasses;
const _excluded$3 = ["children", "className", "collapseIcon", "ContentComponent", "ContentProps", "endIcon", "expandIcon", "disabled", "icon", "id", "label", "nodeId", "onClick", "onMouseDown", "TransitionComponent", "TransitionProps"];
const useUtilityClasses$3 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    content: ["content"],
    expanded: ["expanded"],
    selected: ["selected"],
    focused: ["focused"],
    disabled: ["disabled"],
    iconContainer: ["iconContainer"],
    label: ["label"],
    group: ["group"]
  };
  return composeClasses(slots, getTreeItemUtilityClass, classes);
};
const TreeItemRoot = styled("li", {
  name: "MuiTreeItem",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  listStyle: "none",
  margin: 0,
  padding: 0,
  outline: 0
});
const StyledTreeItemContent = styled(TreeItemContent$1, {
  name: "MuiTreeItem",
  slot: "Content",
  overridesResolver: (props, styles) => {
    return [styles.content, styles.iconContainer && {
      [`& .${treeItemClasses$1.iconContainer}`]: styles.iconContainer
    }, styles.label && {
      [`& .${treeItemClasses$1.label}`]: styles.label
    }];
  }
})(({
  theme
}) => ({
  padding: "0 8px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  [`&.${treeItemClasses$1.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity,
    backgroundColor: "transparent"
  },
  [`&.${treeItemClasses$1.focused}`]: {
    backgroundColor: theme.palette.action.focus
  },
  [`&.${treeItemClasses$1.selected}`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    },
    [`&.${treeItemClasses$1.focused}`]: {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  },
  [`& .${treeItemClasses$1.iconContainer}`]: {
    marginRight: 4,
    width: 15,
    display: "flex",
    flexShrink: 0,
    justifyContent: "center",
    "& svg": {
      fontSize: 18
    }
  },
  [`& .${treeItemClasses$1.label}`]: _extends({
    width: "100%",
    minWidth: 0,
    paddingLeft: 4,
    position: "relative"
  }, theme.typography.body1)
}));
const TreeItemGroup = styled(Collapse$1, {
  name: "MuiTreeItem",
  slot: "Group",
  overridesResolver: (props, styles) => styles.group
})({
  margin: 0,
  padding: 0,
  marginLeft: 17
});
const TreeItem = /* @__PURE__ */ React.forwardRef(function TreeItem2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTreeItem"
  });
  const {
    children,
    className,
    collapseIcon,
    ContentComponent = TreeItemContent$1,
    ContentProps,
    endIcon,
    expandIcon,
    disabled: disabledProp,
    icon,
    id: idProp,
    label,
    nodeId,
    onClick,
    onMouseDown,
    TransitionComponent = Collapse$1,
    TransitionProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$3);
  const {
    icons: contextIcons = {},
    focus,
    isExpanded,
    isFocused,
    isSelected,
    isDisabled,
    multiSelect,
    disabledItemsFocusable,
    mapFirstChar,
    unMapFirstChar,
    registerNode,
    unregisterNode,
    treeId
  } = React.useContext(TreeViewContext$1);
  let id = null;
  if (idProp != null) {
    id = idProp;
  } else if (treeId && nodeId) {
    id = `${treeId}-${nodeId}`;
  }
  const [treeitemElement, setTreeitemElement] = React.useState(null);
  const contentRef = React.useRef(null);
  const handleRef = useForkRef(setTreeitemElement, ref);
  const descendant = React.useMemo(() => ({
    element: treeitemElement,
    id: nodeId
  }), [nodeId, treeitemElement]);
  const {
    index,
    parentId
  } = useDescendant(descendant);
  const expandable = Boolean(Array.isArray(children) ? children.length : children);
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const selected = isSelected ? isSelected(nodeId) : false;
  const disabled = isDisabled ? isDisabled(nodeId) : false;
  const ownerState = _extends({}, props, {
    expanded,
    focused,
    selected,
    disabled
  });
  const classes = useUtilityClasses$3(ownerState);
  let displayIcon;
  let expansionIcon;
  if (expandable) {
    if (!expanded) {
      expansionIcon = expandIcon || contextIcons.defaultExpandIcon;
    } else {
      expansionIcon = collapseIcon || contextIcons.defaultCollapseIcon;
    }
  }
  if (expandable) {
    displayIcon = contextIcons.defaultParentIcon;
  } else {
    displayIcon = endIcon || contextIcons.defaultEndIcon;
  }
  React.useEffect(() => {
    if (registerNode && unregisterNode && index !== -1) {
      registerNode({
        id: nodeId,
        idAttribute: id,
        index,
        parentId,
        expandable,
        disabled: disabledProp
      });
      return () => {
        unregisterNode(nodeId);
      };
    }
    return void 0;
  }, [registerNode, unregisterNode, parentId, index, nodeId, expandable, disabledProp, id]);
  React.useEffect(() => {
    if (mapFirstChar && unMapFirstChar && label) {
      mapFirstChar(nodeId, contentRef.current.textContent.substring(0, 1).toLowerCase());
      return () => {
        unMapFirstChar(nodeId);
      };
    }
    return void 0;
  }, [mapFirstChar, unMapFirstChar, nodeId, label]);
  let ariaSelected;
  if (multiSelect) {
    ariaSelected = selected;
  } else if (selected) {
    ariaSelected = true;
  }
  function handleFocus(event) {
    if (event.target === event.currentTarget) {
      ownerDocument(event.target).getElementById(treeId).focus({
        preventScroll: true
      });
    }
    const unfocusable = !disabledItemsFocusable && disabled;
    if (!focused && event.currentTarget === event.target && !unfocusable) {
      focus(event, nodeId);
    }
  }
  return /* @__PURE__ */ jsxs(TreeItemRoot, _extends({
    className: clsx(classes.root, className),
    role: "treeitem",
    "aria-expanded": expandable ? expanded : null,
    "aria-selected": ariaSelected,
    "aria-disabled": disabled || null,
    ref: handleRef,
    id,
    tabIndex: -1
  }, other, {
    ownerState,
    onFocus: handleFocus,
    children: [/* @__PURE__ */ jsx(StyledTreeItemContent, _extends({
      as: ContentComponent,
      ref: contentRef,
      classes: {
        root: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        focused: classes.focused,
        disabled: classes.disabled,
        iconContainer: classes.iconContainer,
        label: classes.label
      },
      label,
      nodeId,
      onClick,
      onMouseDown,
      icon,
      expansionIcon,
      displayIcon,
      ownerState
    }, ContentProps)), children && /* @__PURE__ */ jsx(DescendantProvider, {
      id: nodeId,
      children: /* @__PURE__ */ jsx(TreeItemGroup, _extends({
        as: TransitionComponent,
        unmountOnExit: true,
        className: classes.group,
        in: expanded,
        component: "ul",
        role: "group"
      }, TransitionProps, {
        children
      }))
    })]
  }));
});
var TreeItem$1 = TreeItem;
function getTreeViewUtilityClass(slot) {
  return generateUtilityClass("MuiTreeView", slot);
}
generateUtilityClasses("MuiTreeView", ["root"]);
const _excluded$2 = ["children", "className", "defaultCollapseIcon", "defaultEndIcon", "defaultExpanded", "defaultExpandIcon", "defaultParentIcon", "defaultSelected", "disabledItemsFocusable", "disableSelection", "expanded", "id", "multiSelect", "onBlur", "onFocus", "onKeyDown", "onNodeFocus", "onNodeSelect", "onNodeToggle", "selected"];
const useUtilityClasses$2 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getTreeViewUtilityClass, classes);
};
const TreeViewRoot = styled("ul", {
  name: "MuiTreeView",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  padding: 0,
  margin: 0,
  listStyle: "none",
  outline: 0
});
function isPrintableCharacter(string) {
  return string && string.length === 1 && string.match(/\S/);
}
function findNextFirstChar(firstChars, startIndex, char) {
  for (let i = startIndex; i < firstChars.length; i += 1) {
    if (char === firstChars[i]) {
      return i;
    }
  }
  return -1;
}
function noopSelection() {
  return false;
}
const defaultDefaultExpanded = [];
const defaultDefaultSelected = [];
const TreeView = /* @__PURE__ */ React.forwardRef(function TreeView2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTreeView"
  });
  const {
    children,
    className,
    defaultCollapseIcon,
    defaultEndIcon,
    defaultExpanded = defaultDefaultExpanded,
    defaultExpandIcon,
    defaultParentIcon,
    defaultSelected = defaultDefaultSelected,
    disabledItemsFocusable = false,
    disableSelection = false,
    expanded: expandedProp,
    id: idProp,
    multiSelect = false,
    onBlur,
    onFocus,
    onKeyDown,
    onNodeFocus,
    onNodeSelect,
    onNodeToggle,
    selected: selectedProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
  const theme = useTheme();
  const isRtl = theme.direction === "rtl";
  const ownerState = _extends({}, props, {
    defaultExpanded,
    defaultSelected,
    disabledItemsFocusable,
    disableSelection,
    multiSelect
  });
  const classes = useUtilityClasses$2(ownerState);
  const treeId = useId(idProp);
  const treeRef = React.useRef(null);
  const handleRef = useForkRef(treeRef, ref);
  const [focusedNodeId, setFocusedNodeId] = React.useState(null);
  const nodeMap = React.useRef({});
  const firstCharMap = React.useRef({});
  const [expanded, setExpandedState] = useControlled({
    controlled: expandedProp,
    default: defaultExpanded,
    name: "TreeView",
    state: "expanded"
  });
  const [selected, setSelectedState] = useControlled({
    controlled: selectedProp,
    default: defaultSelected,
    name: "TreeView",
    state: "selected"
  });
  const isExpanded = React.useCallback((id) => Array.isArray(expanded) ? expanded.indexOf(id) !== -1 : false, [expanded]);
  const isExpandable = React.useCallback((id) => nodeMap.current[id] && nodeMap.current[id].expandable, []);
  const isSelected = React.useCallback((id) => Array.isArray(selected) ? selected.indexOf(id) !== -1 : selected === id, [selected]);
  const isDisabled = React.useCallback((id) => {
    let node = nodeMap.current[id];
    if (!node) {
      return false;
    }
    if (node.disabled) {
      return true;
    }
    while (node.parentId != null) {
      node = nodeMap.current[node.parentId];
      if (node.disabled) {
        return true;
      }
    }
    return false;
  }, []);
  const isFocused = (id) => focusedNodeId === id;
  const getChildrenIds = (id) => Object.keys(nodeMap.current).map((key) => {
    return nodeMap.current[key];
  }).filter((node) => node.parentId === id).sort((a, b) => a.index - b.index).map((child) => child.id);
  const getNavigableChildrenIds = (id) => {
    let childrenIds = getChildrenIds(id);
    if (!disabledItemsFocusable) {
      childrenIds = childrenIds.filter((node) => !isDisabled(node));
    }
    return childrenIds;
  };
  const getNextNode = (id) => {
    if (isExpanded(id) && getNavigableChildrenIds(id).length > 0) {
      return getNavigableChildrenIds(id)[0];
    }
    let node = nodeMap.current[id];
    while (node != null) {
      const siblings = getNavigableChildrenIds(node.parentId);
      const nextSibling = siblings[siblings.indexOf(node.id) + 1];
      if (nextSibling) {
        return nextSibling;
      }
      node = nodeMap.current[node.parentId];
    }
    return null;
  };
  const getPreviousNode = (id) => {
    const node = nodeMap.current[id];
    const siblings = getNavigableChildrenIds(node.parentId);
    const nodeIndex = siblings.indexOf(id);
    if (nodeIndex === 0) {
      return node.parentId;
    }
    let currentNode = siblings[nodeIndex - 1];
    while (isExpanded(currentNode) && getNavigableChildrenIds(currentNode).length > 0) {
      currentNode = getNavigableChildrenIds(currentNode).pop();
    }
    return currentNode;
  };
  const getLastNode = () => {
    let lastNode = getNavigableChildrenIds(null).pop();
    while (isExpanded(lastNode)) {
      lastNode = getNavigableChildrenIds(lastNode).pop();
    }
    return lastNode;
  };
  const getFirstNode = () => getNavigableChildrenIds(null)[0];
  const getParent = (id) => nodeMap.current[id].parentId;
  const findOrderInTremauxTree = (nodeAId, nodeBId) => {
    if (nodeAId === nodeBId) {
      return [nodeAId, nodeBId];
    }
    const nodeA = nodeMap.current[nodeAId];
    const nodeB = nodeMap.current[nodeBId];
    if (nodeA.parentId === nodeB.id || nodeB.parentId === nodeA.id) {
      return nodeB.parentId === nodeA.id ? [nodeA.id, nodeB.id] : [nodeB.id, nodeA.id];
    }
    const aFamily = [nodeA.id];
    const bFamily = [nodeB.id];
    let aAncestor = nodeA.parentId;
    let bAncestor = nodeB.parentId;
    let aAncestorIsCommon = bFamily.indexOf(aAncestor) !== -1;
    let bAncestorIsCommon = aFamily.indexOf(bAncestor) !== -1;
    let continueA = true;
    let continueB = true;
    while (!bAncestorIsCommon && !aAncestorIsCommon) {
      if (continueA) {
        aFamily.push(aAncestor);
        aAncestorIsCommon = bFamily.indexOf(aAncestor) !== -1;
        continueA = aAncestor !== null;
        if (!aAncestorIsCommon && continueA) {
          aAncestor = nodeMap.current[aAncestor].parentId;
        }
      }
      if (continueB && !aAncestorIsCommon) {
        bFamily.push(bAncestor);
        bAncestorIsCommon = aFamily.indexOf(bAncestor) !== -1;
        continueB = bAncestor !== null;
        if (!bAncestorIsCommon && continueB) {
          bAncestor = nodeMap.current[bAncestor].parentId;
        }
      }
    }
    const commonAncestor = aAncestorIsCommon ? aAncestor : bAncestor;
    const ancestorFamily = getChildrenIds(commonAncestor);
    const aSide = aFamily[aFamily.indexOf(commonAncestor) - 1];
    const bSide = bFamily[bFamily.indexOf(commonAncestor) - 1];
    return ancestorFamily.indexOf(aSide) < ancestorFamily.indexOf(bSide) ? [nodeAId, nodeBId] : [nodeBId, nodeAId];
  };
  const getNodesInRange = (nodeA, nodeB) => {
    const [first, last] = findOrderInTremauxTree(nodeA, nodeB);
    const nodes = [first];
    let current = first;
    while (current !== last) {
      current = getNextNode(current);
      nodes.push(current);
    }
    return nodes;
  };
  const focus = (event, id) => {
    if (id) {
      setFocusedNodeId(id);
      if (onNodeFocus) {
        onNodeFocus(event, id);
      }
    }
  };
  const focusNextNode = (event, id) => focus(event, getNextNode(id));
  const focusPreviousNode = (event, id) => focus(event, getPreviousNode(id));
  const focusFirstNode = (event) => focus(event, getFirstNode());
  const focusLastNode = (event) => focus(event, getLastNode());
  const focusByFirstCharacter = (event, id, char) => {
    let start;
    let index;
    const lowercaseChar = char.toLowerCase();
    const firstCharIds = [];
    const firstChars = [];
    Object.keys(firstCharMap.current).forEach((nodeId) => {
      const firstChar = firstCharMap.current[nodeId];
      const map2 = nodeMap.current[nodeId];
      const visible = map2.parentId ? isExpanded(map2.parentId) : true;
      const shouldBeSkipped = disabledItemsFocusable ? false : isDisabled(nodeId);
      if (visible && !shouldBeSkipped) {
        firstCharIds.push(nodeId);
        firstChars.push(firstChar);
      }
    });
    start = firstCharIds.indexOf(id) + 1;
    if (start >= firstCharIds.length) {
      start = 0;
    }
    index = findNextFirstChar(firstChars, start, lowercaseChar);
    if (index === -1) {
      index = findNextFirstChar(firstChars, 0, lowercaseChar);
    }
    if (index > -1) {
      focus(event, firstCharIds[index]);
    }
  };
  const toggleExpansion = (event, value = focusedNodeId) => {
    let newExpanded;
    if (expanded.indexOf(value) !== -1) {
      newExpanded = expanded.filter((id) => id !== value);
    } else {
      newExpanded = [value].concat(expanded);
    }
    if (onNodeToggle) {
      onNodeToggle(event, newExpanded);
    }
    setExpandedState(newExpanded);
  };
  const expandAllSiblings = (event, id) => {
    const map2 = nodeMap.current[id];
    const siblings = getChildrenIds(map2.parentId);
    const diff = siblings.filter((child) => isExpandable(child) && !isExpanded(child));
    const newExpanded = expanded.concat(diff);
    if (diff.length > 0) {
      setExpandedState(newExpanded);
      if (onNodeToggle) {
        onNodeToggle(event, newExpanded);
      }
    }
  };
  const lastSelectedNode = React.useRef(null);
  const lastSelectionWasRange = React.useRef(false);
  const currentRangeSelection = React.useRef([]);
  const handleRangeArrowSelect = (event, nodes) => {
    let base = selected.slice();
    const {
      start,
      next,
      current
    } = nodes;
    if (!next || !current) {
      return;
    }
    if (currentRangeSelection.current.indexOf(current) === -1) {
      currentRangeSelection.current = [];
    }
    if (lastSelectionWasRange.current) {
      if (currentRangeSelection.current.indexOf(next) !== -1) {
        base = base.filter((id) => id === start || id !== current);
        currentRangeSelection.current = currentRangeSelection.current.filter((id) => id === start || id !== current);
      } else {
        base.push(next);
        currentRangeSelection.current.push(next);
      }
    } else {
      base.push(next);
      currentRangeSelection.current.push(current, next);
    }
    if (onNodeSelect) {
      onNodeSelect(event, base);
    }
    setSelectedState(base);
  };
  const handleRangeSelect = (event, nodes) => {
    let base = selected.slice();
    const {
      start,
      end
    } = nodes;
    if (lastSelectionWasRange.current) {
      base = base.filter((id) => currentRangeSelection.current.indexOf(id) === -1);
    }
    let range = getNodesInRange(start, end);
    range = range.filter((node) => !isDisabled(node));
    currentRangeSelection.current = range;
    let newSelected = base.concat(range);
    newSelected = newSelected.filter((id, i) => newSelected.indexOf(id) === i);
    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }
    setSelectedState(newSelected);
  };
  const handleMultipleSelect = (event, value) => {
    let newSelected;
    if (selected.indexOf(value) !== -1) {
      newSelected = selected.filter((id) => id !== value);
    } else {
      newSelected = [value].concat(selected);
    }
    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }
    setSelectedState(newSelected);
  };
  const handleSingleSelect = (event, value) => {
    const newSelected = multiSelect ? [value] : value;
    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }
    setSelectedState(newSelected);
  };
  const selectNode = (event, id, multiple = false) => {
    if (id) {
      if (multiple) {
        handleMultipleSelect(event, id);
      } else {
        handleSingleSelect(event, id);
      }
      lastSelectedNode.current = id;
      lastSelectionWasRange.current = false;
      currentRangeSelection.current = [];
      return true;
    }
    return false;
  };
  const selectRange = (event, nodes, stacked = false) => {
    const {
      start = lastSelectedNode.current,
      end,
      current
    } = nodes;
    if (stacked) {
      handleRangeArrowSelect(event, {
        start,
        next: end,
        current
      });
    } else if (start != null && end != null) {
      handleRangeSelect(event, {
        start,
        end
      });
    }
    lastSelectionWasRange.current = true;
  };
  const rangeSelectToFirst = (event, id) => {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }
    const start = lastSelectionWasRange.current ? lastSelectedNode.current : id;
    selectRange(event, {
      start,
      end: getFirstNode()
    });
  };
  const rangeSelectToLast = (event, id) => {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }
    const start = lastSelectionWasRange.current ? lastSelectedNode.current : id;
    selectRange(event, {
      start,
      end: getLastNode()
    });
  };
  const selectNextNode = (event, id) => {
    if (!isDisabled(getNextNode(id))) {
      selectRange(event, {
        end: getNextNode(id),
        current: id
      }, true);
    }
  };
  const selectPreviousNode = (event, id) => {
    if (!isDisabled(getPreviousNode(id))) {
      selectRange(event, {
        end: getPreviousNode(id),
        current: id
      }, true);
    }
  };
  const selectAllNodes = (event) => {
    selectRange(event, {
      start: getFirstNode(),
      end: getLastNode()
    });
  };
  const registerNode = React.useCallback((node) => {
    const {
      id,
      index,
      parentId,
      expandable,
      idAttribute,
      disabled
    } = node;
    nodeMap.current[id] = {
      id,
      index,
      parentId,
      expandable,
      idAttribute,
      disabled
    };
  }, []);
  const unregisterNode = React.useCallback((id) => {
    const newMap = _extends({}, nodeMap.current);
    delete newMap[id];
    nodeMap.current = newMap;
    setFocusedNodeId((oldFocusedNodeId) => {
      if (oldFocusedNodeId === id && treeRef.current === ownerDocument(treeRef.current).activeElement) {
        return getChildrenIds(null)[0];
      }
      return oldFocusedNodeId;
    });
  }, []);
  const mapFirstChar = React.useCallback((id, firstChar) => {
    firstCharMap.current[id] = firstChar;
  }, []);
  const unMapFirstChar = React.useCallback((id) => {
    const newMap = _extends({}, firstCharMap.current);
    delete newMap[id];
    firstCharMap.current = newMap;
  }, []);
  const handleNextArrow = (event) => {
    if (isExpandable(focusedNodeId)) {
      if (isExpanded(focusedNodeId)) {
        focusNextNode(event, focusedNodeId);
      } else if (!isDisabled(focusedNodeId)) {
        toggleExpansion(event);
      }
    }
    return true;
  };
  const handlePreviousArrow = (event) => {
    if (isExpanded(focusedNodeId) && !isDisabled(focusedNodeId)) {
      toggleExpansion(event, focusedNodeId);
      return true;
    }
    const parent = getParent(focusedNodeId);
    if (parent) {
      focus(event, parent);
      return true;
    }
    return false;
  };
  const handleKeyDown = (event) => {
    let flag = false;
    const key = event.key;
    if (event.altKey || event.currentTarget !== event.target || !focusedNodeId) {
      return;
    }
    const ctrlPressed = event.ctrlKey || event.metaKey;
    switch (key) {
      case " ":
        if (!disableSelection && !isDisabled(focusedNodeId)) {
          if (multiSelect && event.shiftKey) {
            selectRange(event, {
              end: focusedNodeId
            });
            flag = true;
          } else if (multiSelect) {
            flag = selectNode(event, focusedNodeId, true);
          } else {
            flag = selectNode(event, focusedNodeId);
          }
        }
        event.stopPropagation();
        break;
      case "Enter":
        if (!isDisabled(focusedNodeId)) {
          if (isExpandable(focusedNodeId)) {
            toggleExpansion(event);
            flag = true;
          }
        }
        event.stopPropagation();
        break;
      case "ArrowDown":
        if (multiSelect && event.shiftKey && !disableSelection) {
          selectNextNode(event, focusedNodeId);
        }
        focusNextNode(event, focusedNodeId);
        flag = true;
        break;
      case "ArrowUp":
        if (multiSelect && event.shiftKey && !disableSelection) {
          selectPreviousNode(event, focusedNodeId);
        }
        focusPreviousNode(event, focusedNodeId);
        flag = true;
        break;
      case "ArrowRight":
        if (isRtl) {
          flag = handlePreviousArrow(event);
        } else {
          flag = handleNextArrow(event);
        }
        break;
      case "ArrowLeft":
        if (isRtl) {
          flag = handleNextArrow(event);
        } else {
          flag = handlePreviousArrow(event);
        }
        break;
      case "Home":
        if (multiSelect && ctrlPressed && event.shiftKey && !disableSelection && !isDisabled(focusedNodeId)) {
          rangeSelectToFirst(event, focusedNodeId);
        }
        focusFirstNode(event);
        flag = true;
        break;
      case "End":
        if (multiSelect && ctrlPressed && event.shiftKey && !disableSelection && !isDisabled(focusedNodeId)) {
          rangeSelectToLast(event, focusedNodeId);
        }
        focusLastNode(event);
        flag = true;
        break;
      default:
        if (key === "*") {
          expandAllSiblings(event, focusedNodeId);
          flag = true;
        } else if (multiSelect && ctrlPressed && key.toLowerCase() === "a" && !disableSelection) {
          selectAllNodes(event);
          flag = true;
        } else if (!ctrlPressed && !event.shiftKey && isPrintableCharacter(key)) {
          focusByFirstCharacter(event, focusedNodeId, key);
          flag = true;
        }
    }
    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };
  const handleFocus = (event) => {
    if (event.target === event.currentTarget) {
      const firstSelected = Array.isArray(selected) ? selected[0] : selected;
      focus(event, firstSelected || getNavigableChildrenIds(null)[0]);
    }
    if (onFocus) {
      onFocus(event);
    }
  };
  const handleBlur = (event) => {
    setFocusedNodeId(null);
    if (onBlur) {
      onBlur(event);
    }
  };
  const activeDescendant = nodeMap.current[focusedNodeId] ? nodeMap.current[focusedNodeId].idAttribute : null;
  return /* @__PURE__ */ jsx(TreeViewContext$1.Provider, {
    value: {
      icons: {
        defaultCollapseIcon,
        defaultExpandIcon,
        defaultParentIcon,
        defaultEndIcon
      },
      focus,
      toggleExpansion,
      isExpanded,
      isExpandable,
      isFocused,
      isSelected,
      isDisabled,
      selectNode: disableSelection ? noopSelection : selectNode,
      selectRange: disableSelection ? noopSelection : selectRange,
      multiSelect,
      disabledItemsFocusable,
      mapFirstChar,
      unMapFirstChar,
      registerNode,
      unregisterNode,
      treeId
    },
    children: /* @__PURE__ */ jsx(DescendantProvider, {
      children: /* @__PURE__ */ jsx(TreeViewRoot, _extends({
        role: "tree",
        id: treeId,
        "aria-activedescendant": activeDescendant,
        "aria-multiselectable": multiSelect,
        className: clsx(classes.root, className),
        ref: handleRef,
        tabIndex: 0,
        onKeyDown: handleKeyDown,
        onFocus: handleFocus,
        onBlur: handleBlur,
        ownerState
      }, other, {
        children
      }))
    })
  });
});
var TreeView$1 = TreeView;
function getFabUtilityClass(slot) {
  return generateUtilityClass("MuiFab", slot);
}
const fabClasses = generateUtilityClasses("MuiFab", ["root", "primary", "secondary", "extended", "circular", "focusVisible", "disabled", "colorInherit", "sizeSmall", "sizeMedium", "sizeLarge"]);
var fabClasses$1 = fabClasses;
const _excluded$1 = ["children", "className", "color", "component", "disabled", "disableFocusRipple", "focusVisibleClassName", "size", "variant"];
const useUtilityClasses$1 = (ownerState) => {
  const {
    color,
    variant,
    classes,
    size
  } = ownerState;
  const slots = {
    root: ["root", variant, `size${capitalize(size)}`, color === "inherit" && "colorInherit", color === "primary" && "primary", color === "secondary" && "secondary"]
  };
  return composeClasses(slots, getFabUtilityClass, classes);
};
const FabRoot = styled(ButtonBase, {
  name: "MuiFab",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`size${capitalize(ownerState.size)}`], ownerState.color === "inherit" && styles.colorInherit, ownerState.color === "primary" && styles.primary, ownerState.color === "secondary" && styles.secondary];
  }
})(({
  theme,
  ownerState
}) => _extends({}, theme.typography.button, {
  minHeight: 36,
  transition: theme.transitions.create(["background-color", "box-shadow", "border-color"], {
    duration: theme.transitions.duration.short
  }),
  borderRadius: "50%",
  padding: 0,
  minWidth: 0,
  width: 56,
  height: 56,
  boxShadow: theme.shadows[6],
  "&:active": {
    boxShadow: theme.shadows[12]
  },
  color: theme.palette.getContrastText(theme.palette.grey[300]),
  backgroundColor: theme.palette.grey[300],
  "&:hover": {
    backgroundColor: theme.palette.grey.A100,
    "@media (hover: none)": {
      backgroundColor: theme.palette.grey[300]
    },
    textDecoration: "none"
  },
  [`&.${fabClasses$1.focusVisible}`]: {
    boxShadow: theme.shadows[6]
  },
  [`&.${fabClasses$1.disabled}`]: {
    color: theme.palette.action.disabled,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.action.disabledBackground
  }
}, ownerState.size === "small" && {
  width: 40,
  height: 40
}, ownerState.size === "medium" && {
  width: 48,
  height: 48
}, ownerState.variant === "extended" && {
  borderRadius: 48 / 2,
  padding: "0 16px",
  width: "auto",
  minHeight: "auto",
  minWidth: 48,
  height: 48
}, ownerState.variant === "extended" && ownerState.size === "small" && {
  width: "auto",
  padding: "0 8px",
  borderRadius: 34 / 2,
  minWidth: 34,
  height: 34
}, ownerState.variant === "extended" && ownerState.size === "medium" && {
  width: "auto",
  padding: "0 16px",
  borderRadius: 40 / 2,
  minWidth: 40,
  height: 40
}, ownerState.color === "inherit" && {
  color: "inherit"
}), ({
  theme,
  ownerState
}) => _extends({}, ownerState.color === "primary" && {
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    "@media (hover: none)": {
      backgroundColor: theme.palette.primary.main
    }
  }
}, ownerState.color === "secondary" && {
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
    "@media (hover: none)": {
      backgroundColor: theme.palette.secondary.main
    }
  }
}));
const Fab = /* @__PURE__ */ React.forwardRef(function Fab2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFab"
  });
  const {
    children,
    className,
    color = "default",
    component = "button",
    disabled = false,
    disableFocusRipple = false,
    focusVisibleClassName,
    size = "large",
    variant = "circular"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$1);
  const ownerState = _extends({}, props, {
    color,
    component,
    disabled,
    disableFocusRipple,
    size,
    variant
  });
  const classes = useUtilityClasses$1(ownerState);
  return /* @__PURE__ */ jsx(FabRoot, _extends({
    className: clsx(classes.root, className),
    component,
    disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    ownerState,
    ref
  }, other, {
    children
  }));
});
var Fab$1 = Fab;
const _excluded = ["className", "children", "classes", "IconComponent", "input", "inputProps", "variant"], _excluded2 = ["root"];
const useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};
const defaultInput = /* @__PURE__ */ jsx(Input, {});
const NativeSelect = /* @__PURE__ */ React.forwardRef(function NativeSelect2(inProps, ref) {
  const props = useThemeProps({
    name: "MuiNativeSelect",
    props: inProps
  });
  const {
    className,
    children,
    classes: classesProp = {},
    IconComponent = ArrowDropDownIcon,
    input = defaultInput,
    inputProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["variant"]
  });
  const ownerState = _extends({}, props, {
    classes: classesProp
  });
  const classes = useUtilityClasses(ownerState);
  const otherClasses = _objectWithoutPropertiesLoose(classesProp, _excluded2);
  return /* @__PURE__ */ React.cloneElement(input, _extends({
    inputComponent: NativeSelectInput,
    inputProps: _extends({
      children,
      classes: otherClasses,
      IconComponent,
      variant: fcs.variant,
      type: void 0
    }, inputProps, input ? input.props.inputProps : {}),
    ref
  }, other, {
    className: clsx(classes.root, input.props.className, className)
  }));
});
NativeSelect.muiName = "Select";
var NativeSelect$1 = NativeSelect;
function useMediaQuery(queryInput, options = {}) {
  const theme = useTheme$1();
  const supportMatchMedia = typeof window !== "undefined" && typeof window.matchMedia !== "undefined";
  const {
    defaultMatches = false,
    matchMedia = supportMatchMedia ? window.matchMedia : null,
    noSsr = false,
    ssrMatchMedia = null
  } = getThemeProps({
    name: "MuiUseMediaQuery",
    props: options,
    theme
  });
  let query = typeof queryInput === "function" ? queryInput(theme) : queryInput;
  query = query.replace(/^@media( ?)/m, "");
  const [match, setMatch] = React.useState(() => {
    if (noSsr && supportMatchMedia) {
      return matchMedia(query).matches;
    }
    if (ssrMatchMedia) {
      return ssrMatchMedia(query).matches;
    }
    return defaultMatches;
  });
  useEnhancedEffect(() => {
    let active = true;
    if (!supportMatchMedia) {
      return void 0;
    }
    const queryList = matchMedia(query);
    const updateMatch = () => {
      if (active) {
        setMatch(queryList.matches);
      }
    };
    updateMatch();
    queryList.addListener(updateMatch);
    return () => {
      active = false;
      queryList.removeListener(updateMatch);
    };
  }, [query, matchMedia, supportMatchMedia]);
  return match;
}
const RenderTree = React__default.memo(({
  content
}) => {
  const renderContent = (contentIn) => {
    return contentIn.map((item) => {
      return /* @__PURE__ */ jsx(TreeItem$1, {
        nodeId: item.slug,
        label: item.name,
        children: renderContent(item.children)
      }, item.slug);
    });
  };
  return /* @__PURE__ */ jsx(Fragment, {
    children: content.map((item) => {
      return /* @__PURE__ */ jsx(TreeItem$1, {
        nodeId: item.slug,
        label: item.name,
        children: renderContent(item.children)
      }, item.slug);
    })
  });
});
const createTree = (contents, project) => {
  const root = {
    depth: -1,
    parent: null,
    children: []
  };
  let current = root;
  contents.forEach((content) => {
    const depth = content.depth;
    const newItem = __spreadProps(__spreadValues({}, content), {
      depth,
      children: [],
      parent: null
    });
    if (depth <= current.depth) {
      while (depth <= current.depth) {
        current = current.parent;
      }
    }
    newItem.parent = current;
    current.children.push(newItem);
    current = newItem;
  });
  return root.children;
};
const SidebarWrapper = default_1$4(Grid)(({
  theme
}) => ({
  flexGrow: 1,
  maxWidth: 400,
  position: "sticky",
  top: 60,
  "&.editor-sidebar": {
    top: 0,
    padding: "10px",
    display: "block",
    width: "200px"
  },
  "&:not(.edit-sidebar) > .MuiPaper-root": {
    maxHeight: "calc(100vh - 180px)",
    overflow: "auto"
  },
  [".menu-button"]: {
    display: "none",
    position: "fixed",
    right: 20,
    bottom: 20
  },
  ".MuiTreeItem-label": {
    paddingTop: "0.25em",
    paddingBottom: "0.25em",
    lineHeight: "1.3em !important",
    wordBreak: "break-word"
  },
  [theme.breakpoints.down("sm")]: {
    paddingRight: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    position: "fixed",
    top: "55px",
    width: "100%",
    maxWidth: "100%",
    flexBasis: "initial",
    height: "0%",
    padingRight: "10px",
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
    overflow: "hidden",
    transition: "height .3s ease",
    ["&.show"]: {
      height: "100%"
    },
    [" .menu-button"]: {
      display: "flex"
    },
    ["& > * > *"]: {
      width: "100%"
    },
    ["ul *, form *, .MuiBox-root *"]: {
      fontSize: "1.2rem !important"
    }
  }
}));
const RenderTreeWrapper = ({
  projectObservable$
}) => {
  const [content] = useObservableState(() => combineLatest([contents$, projectObservable$]).pipe(map(([contents, project]) => {
    try {
      return createTree(contents.get(project.slug), project);
    } catch (e) {
      return void 0;
    }
  })));
  return content ? /* @__PURE__ */ jsx(RenderTree, {
    content
  }) : /* @__PURE__ */ jsx(CircularProgress, {});
};
function Sidebar({
  onNodeSelect,
  mode,
  onProjectSelect
}) {
  const [expanded, setExpanded] = useState([]);
  const params = useParams();
  const handleToggle = (event, nodeIds) => {
    if (event.target.tagName === "svg") {
      setExpanded(nodeIds);
    }
  };
  const [projects] = useObservableAndState(() => projects$);
  const [project, projectObservable$] = useObservableAndState((inputs$) => combineLatest(projects$, inputs$).pipe(map(([projects2, [currentProject]]) => projects2.get(currentProject))), [params.projectSlug]);
  const handleExpandClick = useCallback(() => {
    if (project) {
      setExpanded((oldExpanded) => oldExpanded.length === 0 ? Array.from(contents$.value.get(project.slug).values()).map((i) => i.slug) : []);
    }
  }, [project]);
  const contents = useObservableState(contents$);
  useEffect(() => {
    if (project) {
      const content = contents.get(project.slug);
      if (content) {
        setExpanded(Array.from(content.values()).map((item) => item.slug));
      }
    }
  }, [project, contents]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  useLayoutEffect(() => {
    if (!matches) {
      setShowMobileSidebar(false);
    }
  }, [matches]);
  return /* @__PURE__ */ jsx(SidebarWrapper, {
    item: true,
    xs: 3,
    className: (showMobileSidebar ? "show" : "") + " " + (mode === "editor" ? "editor-sidebar" : "docs-sidebar"),
    children: /* @__PURE__ */ jsxs(ConditionalCard, {
      showCard: mode === "docs",
      sx: {
        padding: 2,
        position: "sticky",
        top: "80px"
      },
      children: [/* @__PURE__ */ jsx(Fab$1, {
        color: "secondary",
        "aria-label": "add",
        className: "menu-button",
        children: showMobileSidebar ? /* @__PURE__ */ jsx(default_1$2, {
          onClick: () => setShowMobileSidebar(false)
        }) : /* @__PURE__ */ jsx(default_1, {
          onClick: () => setShowMobileSidebar(true)
        })
      }), projects.size > 1 && /* @__PURE__ */ jsx(Box, {
        sx: {
          mb: 1
        },
        children: /* @__PURE__ */ jsxs(FormControl, {
          fullWidth: true,
          children: [/* @__PURE__ */ jsx(InputLabel, {
            variant: "standard",
            htmlFor: "uncontrolled-native",
            children: "Project"
          }), project && /* @__PURE__ */ jsx(NativeSelect$1, {
            defaultValue: project.slug,
            inputProps: {
              name: "age",
              id: "uncontrolled-native"
            },
            onChange: (e) => {
              onProjectSelect(e.target.value);
            },
            children: Array.from(projects).map(([slug, p]) => /* @__PURE__ */ jsx("option", {
              value: slug,
              children: p.name
            }, slug))
          })]
        })
      }), /* @__PURE__ */ jsx(Box, {
        sx: {
          mb: 1
        },
        children: /* @__PURE__ */ jsx(Button, {
          onClick: handleExpandClick,
          children: expanded.length === 0 ? "Expand all" : "Collapse all"
        })
      }), params.contentSlug && /* @__PURE__ */ jsx(TreeView$1, {
        "aria-label": "controlled",
        defaultCollapseIcon: /* @__PURE__ */ jsx(default_1$1, {}),
        defaultExpandIcon: /* @__PURE__ */ jsx(default_1$3, {}),
        expanded,
        onNodeToggle: handleToggle,
        onNodeSelect: (event, nodeId) => {
          if (event.target.tagName !== "svg") {
            onNodeSelect(nodeId);
          }
        },
        selected: mode !== "editor" ? params.contentSlug : "",
        children: /* @__PURE__ */ jsx(RenderTreeWrapper, {
          projectObservable$
        })
      })]
    })
  });
}
export { Sidebar, Sidebar as default };
//# sourceMappingURL=sidebar.js.map
