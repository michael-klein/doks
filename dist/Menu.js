import { w as getScrollbarSize, o as ownerDocument, h as ownerWindow, b as useForkRef, a as useEventCallback, c as createChainedFunction, i as interopRequireDefault, j as useEnhancedEffect, e as debounce } from "./styled.js";
import { c as createSvgIcon, r as require$$2 } from "./Typography.js";
import { g as generateUtilityClass, f as generateUtilityClasses, i as _objectWithoutPropertiesLoose, _ as _extends, k as composeClasses, j as jsx, l as clsx, d as jsxs, s as styled, h as useThemeProps, H as duration, B as rootShouldForwardProp } from "./main.js";
import * as React from "react";
import "./react-is.production.min.js";
import { i as isHostComponent, b as useTheme, T as Transition, r as reflow, g as getTransitionProps, P as Paper } from "./use-observable-state.js";
import { P as Portal, G as Grow } from "./markdown_renderer.js";
function getBackdropUtilityClass(slot) {
  return generateUtilityClass("MuiBackdrop", slot);
}
generateUtilityClasses("MuiBackdrop", ["root", "invisible"]);
const _excluded$8 = ["classes", "className", "invisible", "component", "components", "componentsProps", "theme"];
const useUtilityClasses$4 = (ownerState) => {
  const {
    classes,
    invisible
  } = ownerState;
  const slots = {
    root: ["root", invisible && "invisible"]
  };
  return composeClasses(slots, getBackdropUtilityClass, classes);
};
const BackdropUnstyled = /* @__PURE__ */ React.forwardRef(function BackdropUnstyled2(props, ref) {
  const {
    classes: classesProp,
    className,
    invisible = false,
    component = "div",
    components = {},
    componentsProps = {},
    theme
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$8);
  const ownerState = _extends({}, props, {
    classes: classesProp,
    invisible
  });
  const classes = useUtilityClasses$4(ownerState);
  const Root = components.Root || component;
  const rootProps = componentsProps.root || {};
  return /* @__PURE__ */ jsx(Root, _extends({
    "aria-hidden": true
  }, rootProps, !isHostComponent(Root) && {
    as: component,
    ownerState: _extends({}, ownerState, rootProps.ownerState),
    theme
  }, {
    ref
  }, other, {
    className: clsx(classes.root, rootProps.className, className)
  }));
});
var BackdropUnstyled$1 = BackdropUnstyled;
function isOverflowing(container) {
  const doc = ownerDocument(container);
  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }
  return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, show) {
  if (show) {
    element.setAttribute("aria-hidden", "true");
  } else {
    element.removeAttribute("aria-hidden");
  }
}
function getPaddingRight(element) {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude = [], show) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  const blacklistTagNames = ["TEMPLATE", "SCRIPT", "STYLE"];
  [].forEach.call(container.children, (element) => {
    if (blacklist.indexOf(element) === -1 && blacklistTagNames.indexOf(element.tagName) === -1) {
      ariaHidden(element, show);
    }
  });
}
function findIndexOf(items, callback) {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}
function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;
  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      const scrollbarSize = getScrollbarSize(ownerDocument(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: "padding-right",
        el: container
      });
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
      const fixedElements = ownerDocument(container).querySelectorAll(".mui-fixed");
      [].forEach.call(fixedElements, (element) => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: "padding-right",
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }
    const parent = container.parentElement;
    const containerWindow = ownerWindow(container);
    const scrollContainer = (parent == null ? void 0 : parent.nodeName) === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: "overflow",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: "overflow-x",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: "overflow-y",
      el: scrollContainer
    });
    scrollContainer.style.overflow = "hidden";
  }
  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property
    }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };
  return restore;
}
function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, (element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}
class ModalManager {
  constructor() {
    this.containers = void 0;
    this.modals = void 0;
    this.modals = [];
    this.containers = [];
  }
  add(modal, container) {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }
    modalIndex = this.modals.length;
    this.modals.push(modal);
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }
    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
    const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }
    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblings
    });
    return modalIndex;
  }
  mount(modal, props) {
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }
  remove(modal) {
    const modalIndex = this.modals.indexOf(modal);
    if (modalIndex === -1) {
      return modalIndex;
    }
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);
    if (containerInfo.modals.length === 0) {
      if (containerInfo.restore) {
        containerInfo.restore();
      }
      if (modal.modalRef) {
        ariaHidden(modal.modalRef, true);
      }
      ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
      this.containers.splice(containerIndex, 1);
    } else {
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }
    return modalIndex;
  }
  isTopModal(modal) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
}
const candidatesSelector = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function getTabIndex(node) {
  const tabindexAttr = parseInt(node.getAttribute("tabindex"), 10);
  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  }
  if (node.contentEditable === "true" || (node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) {
    return 0;
  }
  return node.tabIndex;
}
function isNonTabbableRadio(node) {
  if (node.tagName !== "INPUT" || node.type !== "radio") {
    return false;
  }
  if (!node.name) {
    return false;
  }
  const getRadio = (selector) => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);
  let roving = getRadio(`[name="${node.name}"]:checked`);
  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }
  return roving !== node;
}
function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || node.tagName === "INPUT" && node.type === "hidden" || isNonTabbableRadio(node)) {
    return false;
  }
  return true;
}
function defaultGetTabbable(root) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node);
    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) {
      return;
    }
    if (nodeTabIndex === 0) {
      regularTabNodes.push(node);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node
      });
    }
  });
  return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map((a) => a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
  return true;
}
function Unstable_TrapFocus(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = React.useRef();
  const sentinelStart = React.useRef(null);
  const sentinelEnd = React.useRef(null);
  const nodeToRestore = React.useRef(null);
  const reactFocusEventTarget = React.useRef(null);
  const activated = React.useRef(false);
  const rootRef = React.useRef(null);
  const handleRef = useForkRef(children.ref, rootRef);
  const lastKeydown = React.useRef(null);
  React.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  React.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute("tabIndex")) {
        rootRef.current.setAttribute("tabIndex", -1);
      }
      if (activated.current) {
        rootRef.current.focus();
      }
    }
    return () => {
      if (!disableRestoreFocus) {
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          ignoreNextEnforceFocus.current = true;
          nodeToRestore.current.focus();
        }
        nodeToRestore.current = null;
      }
    };
  }, [open]);
  React.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    const contain = (nativeEvent) => {
      const {
        current: rootElement
      } = rootRef;
      if (rootElement === null) {
        return;
      }
      if (!doc.hasFocus() || disableEnforceFocus || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }
      if (!rootElement.contains(doc.activeElement)) {
        if (nativeEvent && reactFocusEventTarget.current !== nativeEvent.target || doc.activeElement !== reactFocusEventTarget.current) {
          reactFocusEventTarget.current = null;
        } else if (reactFocusEventTarget.current !== null) {
          return;
        }
        if (!activated.current) {
          return;
        }
        let tabbable = [];
        if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
          tabbable = getTabbable(rootRef.current);
        }
        if (tabbable.length > 0) {
          var _lastKeydown$current, _lastKeydown$current2;
          const isShiftTab = Boolean(((_lastKeydown$current = lastKeydown.current) == null ? void 0 : _lastKeydown$current.shiftKey) && ((_lastKeydown$current2 = lastKeydown.current) == null ? void 0 : _lastKeydown$current2.key) === "Tab");
          const focusNext = tabbable[0];
          const focusPrevious = tabbable[tabbable.length - 1];
          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        } else {
          rootElement.focus();
        }
      }
    };
    const loopFocus = (nativeEvent) => {
      lastKeydown.current = nativeEvent;
      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") {
        return;
      }
      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        ignoreNextEnforceFocus.current = true;
        sentinelEnd.current.focus();
      }
    };
    doc.addEventListener("focusin", contain);
    doc.addEventListener("keydown", loopFocus, true);
    const interval = setInterval(() => {
      if (doc.activeElement.tagName === "BODY") {
        contain();
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener("focusin", contain);
      doc.removeEventListener("keydown", loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);
  const onFocus = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children.props.onFocus;
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const handleFocusSentinel = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
  };
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [/* @__PURE__ */ jsx("div", {
      tabIndex: 0,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-test": "sentinelStart"
    }), /* @__PURE__ */ React.cloneElement(children, {
      ref: handleRef,
      onFocus
    }), /* @__PURE__ */ jsx("div", {
      tabIndex: 0,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-test": "sentinelEnd"
    })]
  });
}
function getModalUtilityClass(slot) {
  return generateUtilityClass("MuiModal", slot);
}
generateUtilityClasses("MuiModal", ["root", "hidden"]);
const _excluded$7 = ["BackdropComponent", "BackdropProps", "children", "classes", "className", "closeAfterTransition", "component", "components", "componentsProps", "container", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "manager", "onBackdropClick", "onClose", "onKeyDown", "open", "theme", "onTransitionEnter", "onTransitionExited"];
const useUtilityClasses$3 = (ownerState) => {
  const {
    open,
    exited,
    classes
  } = ownerState;
  const slots = {
    root: ["root", !open && exited && "hidden"]
  };
  return composeClasses(slots, getModalUtilityClass, classes);
};
function getContainer(container) {
  return typeof container === "function" ? container() : container;
}
function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty("in") : false;
}
const defaultManager = new ModalManager();
const ModalUnstyled = /* @__PURE__ */ React.forwardRef(function ModalUnstyled2(props, ref) {
  const {
    BackdropComponent,
    BackdropProps,
    children,
    classes: classesProp,
    className,
    closeAfterTransition = false,
    component = "div",
    components = {},
    componentsProps = {},
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    manager = defaultManager,
    onBackdropClick,
    onClose,
    onKeyDown,
    open,
    theme,
    onTransitionEnter,
    onTransitionExited
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$7);
  const [exited, setExited] = React.useState(true);
  const modal = React.useRef({});
  const mountNodeRef = React.useRef(null);
  const modalRef = React.useRef(null);
  const handleRef = useForkRef(modalRef, ref);
  const hasTransition = getHasTransition(props);
  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current;
    modal.current.mountNode = mountNodeRef.current;
    return modal.current;
  };
  const handleMounted = () => {
    manager.mount(getModal(), {
      disableScrollLock
    });
    modalRef.current.scrollTop = 0;
  };
  const handleOpen = useEventCallback(() => {
    const resolvedContainer = getContainer(container) || getDoc().body;
    manager.add(getModal(), resolvedContainer);
    if (modalRef.current) {
      handleMounted();
    }
  });
  const isTopModal = React.useCallback(() => manager.isTopModal(getModal()), [manager]);
  const handlePortalRef = useEventCallback((node) => {
    mountNodeRef.current = node;
    if (!node) {
      return;
    }
    if (open && isTopModal()) {
      handleMounted();
    } else {
      ariaHidden(modalRef.current, true);
    }
  });
  const handleClose = React.useCallback(() => {
    manager.remove(getModal());
  }, [manager]);
  React.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);
  React.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);
  const ownerState = _extends({}, props, {
    classes: classesProp,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    exited,
    hideBackdrop,
    keepMounted
  });
  const classes = useUtilityClasses$3(ownerState);
  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }
  const handleEnter = () => {
    setExited(false);
    if (onTransitionEnter) {
      onTransitionEnter();
    }
  };
  const handleExited = () => {
    setExited(true);
    if (onTransitionExited) {
      onTransitionExited();
    }
    if (closeAfterTransition) {
      handleClose();
    }
  };
  const handleBackdropClick = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (onBackdropClick) {
      onBackdropClick(event);
    }
    if (onClose) {
      onClose(event, "backdropClick");
    }
  };
  const handleKeyDown = (event) => {
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (event.key !== "Escape" || !isTopModal()) {
      return;
    }
    if (!disableEscapeKeyDown) {
      event.stopPropagation();
      if (onClose) {
        onClose(event, "escapeKeyDown");
      }
    }
  };
  const childProps = {};
  if (children.props.tabIndex === void 0) {
    childProps.tabIndex = "-1";
  }
  if (hasTransition) {
    childProps.onEnter = createChainedFunction(handleEnter, children.props.onEnter);
    childProps.onExited = createChainedFunction(handleExited, children.props.onExited);
  }
  const Root = components.Root || component;
  const rootProps = componentsProps.root || {};
  return /* @__PURE__ */ jsx(Portal, {
    ref: handlePortalRef,
    container,
    disablePortal,
    children: /* @__PURE__ */ jsxs(Root, _extends({
      role: "presentation"
    }, rootProps, !isHostComponent(Root) && {
      as: component,
      ownerState: _extends({}, ownerState, rootProps.ownerState),
      theme
    }, other, {
      ref: handleRef,
      onKeyDown: handleKeyDown,
      className: clsx(classes.root, rootProps.className, className),
      children: [!hideBackdrop && BackdropComponent ? /* @__PURE__ */ jsx(BackdropComponent, _extends({
        open,
        onClick: handleBackdropClick
      }, BackdropProps)) : null, /* @__PURE__ */ jsx(Unstable_TrapFocus, {
        disableEnforceFocus,
        disableAutoFocus,
        disableRestoreFocus,
        isEnabled: isTopModal,
        open,
        children: /* @__PURE__ */ React.cloneElement(children, childProps)
      })]
    }))
  });
});
var ModalUnstyled$1 = ModalUnstyled;
var Favorite = {};
var _interopRequireDefault = interopRequireDefault.exports;
Object.defineProperty(Favorite, "__esModule", {
  value: true
});
var default_1 = Favorite.default = void 0;
var _createSvgIcon = _interopRequireDefault(createSvgIcon);
var _jsxRuntime = require$$2;
var _default = (0, _createSvgIcon.default)(/* @__PURE__ */ (0, _jsxRuntime.jsx)("path", {
  d: "m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
}), "Favorite");
default_1 = Favorite.default = _default;
const ListContext = /* @__PURE__ */ React.createContext({});
var ListContext$1 = ListContext;
function getListUtilityClass(slot) {
  return generateUtilityClass("MuiList", slot);
}
generateUtilityClasses("MuiList", ["root", "padding", "dense", "subheader"]);
const _excluded$6 = ["children", "className", "component", "dense", "disablePadding", "subheader"];
const useUtilityClasses$2 = (ownerState) => {
  const {
    classes,
    disablePadding,
    dense,
    subheader
  } = ownerState;
  const slots = {
    root: ["root", !disablePadding && "padding", dense && "dense", subheader && "subheader"]
  };
  return composeClasses(slots, getListUtilityClass, classes);
};
const ListRoot = styled("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, !ownerState.disablePadding && styles2.padding, ownerState.dense && styles2.dense, ownerState.subheader && styles2.subheader];
  }
})(({
  ownerState
}) => _extends({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !ownerState.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, ownerState.subheader && {
  paddingTop: 0
}));
const List = /* @__PURE__ */ React.forwardRef(function List2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiList"
  });
  const {
    children,
    className,
    component = "ul",
    dense = false,
    disablePadding = false,
    subheader
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$6);
  const context = React.useMemo(() => ({
    dense
  }), [dense]);
  const ownerState = _extends({}, props, {
    component,
    dense,
    disablePadding
  });
  const classes = useUtilityClasses$2(ownerState);
  return /* @__PURE__ */ jsx(ListContext$1.Provider, {
    value: context,
    children: /* @__PURE__ */ jsxs(ListRoot, _extends({
      as: component,
      className: clsx(classes.root, className),
      ref,
      ownerState
    }, other, {
      children: [subheader, children]
    }))
  });
});
var List$1 = List;
const _excluded$5 = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function nextItem(list, item, disableListWrap) {
  if (list === item) {
    return list.firstChild;
  }
  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }
  return disableListWrap ? null : list.firstChild;
}
function previousItem(list, item, disableListWrap) {
  if (list === item) {
    return disableListWrap ? list.firstChild : list.lastChild;
  }
  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }
  return disableListWrap ? null : list.lastChild;
}
function textCriteriaMatches(nextFocus, textCriteria) {
  if (textCriteria === void 0) {
    return true;
  }
  let text = nextFocus.innerText;
  if (text === void 0) {
    text = nextFocus.textContent;
  }
  text = text.trim().toLowerCase();
  if (text.length === 0) {
    return false;
  }
  if (textCriteria.repeating) {
    return text[0] === textCriteria.keys[0];
  }
  return text.indexOf(textCriteria.keys.join("")) === 0;
}
function moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, traversalFunction, textCriteria) {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(list, currentFocus, currentFocus ? disableListWrap : false);
  while (nextFocus) {
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) {
        return false;
      }
      wrappedOnce = true;
    }
    const nextFocusDisabled = disabledItemsFocusable ? false : nextFocus.disabled || nextFocus.getAttribute("aria-disabled") === "true";
    if (!nextFocus.hasAttribute("tabindex") || !textCriteriaMatches(nextFocus, textCriteria) || nextFocusDisabled) {
      nextFocus = traversalFunction(list, nextFocus, disableListWrap);
    } else {
      nextFocus.focus();
      return true;
    }
  }
  return false;
}
const MenuList = /* @__PURE__ */ React.forwardRef(function MenuList2(props, ref) {
  const {
    actions,
    autoFocus = false,
    autoFocusItem = false,
    children,
    className,
    disabledItemsFocusable = false,
    disableListWrap = false,
    onKeyDown,
    variant = "selectedMenu"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$5);
  const listRef = React.useRef(null);
  const textCriteriaRef = React.useRef({
    keys: [],
    repeating: true,
    previousKeyMatched: true,
    lastTime: null
  });
  useEnhancedEffect(() => {
    if (autoFocus) {
      listRef.current.focus();
    }
  }, [autoFocus]);
  React.useImperativeHandle(actions, () => ({
    adjustStyleForScrollbar: (containerElement, theme) => {
      const noExplicitWidth = !listRef.current.style.width;
      if (containerElement.clientHeight < listRef.current.clientHeight && noExplicitWidth) {
        const scrollbarSize = `${getScrollbarSize(ownerDocument(containerElement))}px`;
        listRef.current.style[theme.direction === "rtl" ? "paddingLeft" : "paddingRight"] = scrollbarSize;
        listRef.current.style.width = `calc(100% + ${scrollbarSize})`;
      }
      return listRef.current;
    }
  }), []);
  const handleKeyDown = (event) => {
    const list = listRef.current;
    const key = event.key;
    const currentFocus = ownerDocument(list).activeElement;
    if (key === "ArrowDown") {
      event.preventDefault();
      moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, nextItem);
    } else if (key === "ArrowUp") {
      event.preventDefault();
      moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, previousItem);
    } else if (key === "Home") {
      event.preventDefault();
      moveFocus(list, null, disableListWrap, disabledItemsFocusable, nextItem);
    } else if (key === "End") {
      event.preventDefault();
      moveFocus(list, null, disableListWrap, disabledItemsFocusable, previousItem);
    } else if (key.length === 1) {
      const criteria = textCriteriaRef.current;
      const lowerKey = key.toLowerCase();
      const currTime = performance.now();
      if (criteria.keys.length > 0) {
        if (currTime - criteria.lastTime > 500) {
          criteria.keys = [];
          criteria.repeating = true;
          criteria.previousKeyMatched = true;
        } else if (criteria.repeating && lowerKey !== criteria.keys[0]) {
          criteria.repeating = false;
        }
      }
      criteria.lastTime = currTime;
      criteria.keys.push(lowerKey);
      const keepFocusOnCurrent = currentFocus && !criteria.repeating && textCriteriaMatches(currentFocus, criteria);
      if (criteria.previousKeyMatched && (keepFocusOnCurrent || moveFocus(list, currentFocus, false, disabledItemsFocusable, nextItem, criteria))) {
        event.preventDefault();
      } else {
        criteria.previousKeyMatched = false;
      }
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };
  const handleRef = useForkRef(listRef, ref);
  let activeItemIndex = -1;
  React.Children.forEach(children, (child, index) => {
    if (!/* @__PURE__ */ React.isValidElement(child)) {
      return;
    }
    if (!child.props.disabled) {
      if (variant === "selectedMenu" && child.props.selected) {
        activeItemIndex = index;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index;
      }
    }
  });
  const items = React.Children.map(children, (child, index) => {
    if (index === activeItemIndex) {
      const newChildProps = {};
      if (autoFocusItem) {
        newChildProps.autoFocus = true;
      }
      if (child.props.tabIndex === void 0 && variant === "selectedMenu") {
        newChildProps.tabIndex = 0;
      }
      return /* @__PURE__ */ React.cloneElement(child, newChildProps);
    }
    return child;
  });
  return /* @__PURE__ */ jsx(List$1, _extends({
    role: "menu",
    ref: handleRef,
    className,
    onKeyDown: handleKeyDown,
    tabIndex: autoFocus ? 0 : -1
  }, other, {
    children: items
  }));
});
var MenuList$1 = MenuList;
const _excluded$4 = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
const styles = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
};
const defaultTimeout = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen
};
const Fade = /* @__PURE__ */ React.forwardRef(function Fade2(props, ref) {
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
    timeout = defaultTimeout,
    TransitionComponent = Transition
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$4);
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
    const transitionProps = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "enter"
    });
    node.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
    node.style.transition = theme.transitions.create("opacity", transitionProps);
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback((node) => {
    const transitionProps = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: "exit"
    });
    node.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
    node.style.transition = theme.transitions.create("opacity", transitionProps);
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleAddEndListener = (next) => {
    if (addEndListener) {
      addEndListener(nodeRef.current, next);
    }
  };
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
    timeout
  }, other, {
    children: (state, childProps) => {
      return /* @__PURE__ */ React.cloneElement(children, _extends({
        style: _extends({
          opacity: 0,
          visibility: state === "exited" && !inProp ? "hidden" : void 0
        }, styles[state], style, children.props.style),
        ref: handleRef
      }, childProps));
    }
  }));
});
var Fade$1 = Fade;
const _excluded$3 = ["children", "components", "componentsProps", "className", "invisible", "open", "transitionDuration", "TransitionComponent"];
const extendUtilityClasses$1 = (ownerState) => {
  const {
    classes
  } = ownerState;
  return classes;
};
const BackdropRoot = styled("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.invisible && styles2.invisible];
  }
})(({
  ownerState
}) => _extends({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent"
}, ownerState.invisible && {
  backgroundColor: "transparent"
}));
const Backdrop = /* @__PURE__ */ React.forwardRef(function Backdrop2(inProps, ref) {
  var _componentsProps$root;
  const props = useThemeProps({
    props: inProps,
    name: "MuiBackdrop"
  });
  const {
    children,
    components = {},
    componentsProps = {},
    className,
    invisible = false,
    open,
    transitionDuration,
    TransitionComponent = Fade$1
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$3);
  const ownerState = _extends({}, props, {
    invisible
  });
  const classes = extendUtilityClasses$1(ownerState);
  return /* @__PURE__ */ jsx(TransitionComponent, _extends({
    in: open,
    timeout: transitionDuration
  }, other, {
    children: /* @__PURE__ */ jsx(BackdropUnstyled$1, {
      className,
      invisible,
      components: _extends({
        Root: BackdropRoot
      }, components),
      componentsProps: {
        root: _extends({}, componentsProps.root, (!components.Root || !isHostComponent(components.Root)) && {
          ownerState: _extends({}, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.ownerState)
        })
      },
      classes,
      ref,
      children
    })
  }));
});
var Backdrop$1 = Backdrop;
const _excluded$2 = ["BackdropComponent", "closeAfterTransition", "children", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted"];
const extendUtilityClasses = (ownerState) => {
  return ownerState.classes;
};
const ModalRoot = styled("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, !ownerState.open && ownerState.exited && styles2.hidden];
  }
})(({
  theme,
  ownerState
}) => _extends({
  position: "fixed",
  zIndex: theme.zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !ownerState.open && ownerState.exited && {
  visibility: "hidden"
}));
const ModalBackdrop = styled(Backdrop$1, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (props, styles2) => {
    return styles2.backdrop;
  }
})({
  zIndex: -1
});
const Modal = /* @__PURE__ */ React.forwardRef(function Modal2(inProps, ref) {
  var _componentsProps$root;
  const props = useThemeProps({
    name: "MuiModal",
    props: inProps
  });
  const {
    BackdropComponent = ModalBackdrop,
    closeAfterTransition = false,
    children,
    components = {},
    componentsProps = {},
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
  const [exited, setExited] = React.useState(true);
  const commonProps = {
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted
  };
  const ownerState = _extends({}, props, commonProps, {
    exited
  });
  const classes = extendUtilityClasses(ownerState);
  return /* @__PURE__ */ jsx(ModalUnstyled$1, _extends({
    components: _extends({
      Root: ModalRoot
    }, components),
    componentsProps: {
      root: _extends({}, componentsProps.root, (!components.Root || !isHostComponent(components.Root)) && {
        ownerState: _extends({}, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.ownerState)
      })
    },
    BackdropComponent,
    onTransitionEnter: () => setExited(false),
    onTransitionExited: () => setExited(true),
    ref
  }, other, {
    classes
  }, commonProps, {
    children
  }));
});
var Modal$1 = Modal;
function getPopoverUtilityClass(slot) {
  return generateUtilityClass("MuiPopover", slot);
}
generateUtilityClasses("MuiPopover", ["root", "paper"]);
const _excluded$1 = ["onEntering"], _excluded2$1 = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps"];
function getOffsetTop(rect, vertical) {
  let offset = 0;
  if (typeof vertical === "number") {
    offset = vertical;
  } else if (vertical === "center") {
    offset = rect.height / 2;
  } else if (vertical === "bottom") {
    offset = rect.height;
  }
  return offset;
}
function getOffsetLeft(rect, horizontal) {
  let offset = 0;
  if (typeof horizontal === "number") {
    offset = horizontal;
  } else if (horizontal === "center") {
    offset = rect.width / 2;
  } else if (horizontal === "right") {
    offset = rect.width;
  }
  return offset;
}
function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical].map((n) => typeof n === "number" ? `${n}px` : n).join(" ");
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
const useUtilityClasses$1 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    paper: ["paper"]
  };
  return composeClasses(slots, getPopoverUtilityClass, classes);
};
const PopoverRoot = styled(Modal$1, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})({});
const PopoverPaper = styled(Paper, {
  name: "MuiPopover",
  slot: "Paper",
  overridesResolver: (props, styles2) => styles2.paper
})({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  outline: 0
});
const Popover = /* @__PURE__ */ React.forwardRef(function Popover2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiPopover"
  });
  const {
    action,
    anchorEl,
    anchorOrigin = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition,
    anchorReference = "anchorEl",
    children,
    className,
    container: containerProp,
    elevation = 8,
    marginThreshold = 16,
    open,
    PaperProps = {},
    transformOrigin = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent = Grow,
    transitionDuration: transitionDurationProp = "auto",
    TransitionProps: {
      onEntering
    } = {}
  } = props, TransitionProps = _objectWithoutPropertiesLoose(props.TransitionProps, _excluded$1), other = _objectWithoutPropertiesLoose(props, _excluded2$1);
  const paperRef = React.useRef();
  const handlePaperRef = useForkRef(paperRef, PaperProps.ref);
  const ownerState = _extends({}, props, {
    anchorOrigin,
    anchorReference,
    elevation,
    marginThreshold,
    PaperProps,
    transformOrigin,
    TransitionComponent,
    transitionDuration: transitionDurationProp,
    TransitionProps
  });
  const classes = useUtilityClasses$1(ownerState);
  const getAnchorOffset = React.useCallback(() => {
    if (anchorReference === "anchorPosition") {
      return anchorPosition;
    }
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);
    const anchorElement = resolvedAnchorEl && resolvedAnchorEl.nodeType === 1 ? resolvedAnchorEl : ownerDocument(paperRef.current).body;
    const anchorRect = anchorElement.getBoundingClientRect();
    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal)
    };
  }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical, anchorPosition, anchorReference]);
  const getTransformOrigin = React.useCallback((elemRect) => {
    return {
      vertical: getOffsetTop(elemRect, transformOrigin.vertical),
      horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal)
    };
  }, [transformOrigin.horizontal, transformOrigin.vertical]);
  const getPositioningStyle = React.useCallback((element) => {
    const elemRect = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
    const elemTransformOrigin = getTransformOrigin(elemRect);
    if (anchorReference === "none") {
      return {
        top: null,
        left: null,
        transformOrigin: getTransformOriginValue(elemTransformOrigin)
      };
    }
    const anchorOffset = getAnchorOffset();
    let top = anchorOffset.top - elemTransformOrigin.vertical;
    let left = anchorOffset.left - elemTransformOrigin.horizontal;
    const bottom = top + elemRect.height;
    const right = left + elemRect.width;
    const containerWindow = ownerWindow(resolveAnchorEl(anchorEl));
    const heightThreshold = containerWindow.innerHeight - marginThreshold;
    const widthThreshold = containerWindow.innerWidth - marginThreshold;
    if (top < marginThreshold) {
      const diff = top - marginThreshold;
      top -= diff;
      elemTransformOrigin.vertical += diff;
    } else if (bottom > heightThreshold) {
      const diff = bottom - heightThreshold;
      top -= diff;
      elemTransformOrigin.vertical += diff;
    }
    if (left < marginThreshold) {
      const diff = left - marginThreshold;
      left -= diff;
      elemTransformOrigin.horizontal += diff;
    } else if (right > widthThreshold) {
      const diff = right - widthThreshold;
      left -= diff;
      elemTransformOrigin.horizontal += diff;
    }
    return {
      top: `${Math.round(top)}px`,
      left: `${Math.round(left)}px`,
      transformOrigin: getTransformOriginValue(elemTransformOrigin)
    };
  }, [anchorEl, anchorReference, getAnchorOffset, getTransformOrigin, marginThreshold]);
  const setPositioningStyles = React.useCallback(() => {
    const element = paperRef.current;
    if (!element) {
      return;
    }
    const positioning = getPositioningStyle(element);
    if (positioning.top !== null) {
      element.style.top = positioning.top;
    }
    if (positioning.left !== null) {
      element.style.left = positioning.left;
    }
    element.style.transformOrigin = positioning.transformOrigin;
  }, [getPositioningStyle]);
  const handleEntering = (element, isAppearing) => {
    if (onEntering) {
      onEntering(element, isAppearing);
    }
    setPositioningStyles();
  };
  React.useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
  });
  React.useImperativeHandle(action, () => open ? {
    updatePosition: () => {
      setPositioningStyles();
    }
  } : null, [open, setPositioningStyles]);
  React.useEffect(() => {
    if (!open) {
      return void 0;
    }
    const handleResize = debounce(() => {
      setPositioningStyles();
    });
    const containerWindow = ownerWindow(anchorEl);
    containerWindow.addEventListener("resize", handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener("resize", handleResize);
    };
  }, [anchorEl, open, setPositioningStyles]);
  let transitionDuration = transitionDurationProp;
  if (transitionDurationProp === "auto" && !TransitionComponent.muiSupportAuto) {
    transitionDuration = void 0;
  }
  const container = containerProp || (anchorEl ? ownerDocument(resolveAnchorEl(anchorEl)).body : void 0);
  return /* @__PURE__ */ jsx(PopoverRoot, _extends({
    BackdropProps: {
      invisible: true
    },
    className: clsx(classes.root, className),
    container,
    open,
    ref,
    ownerState
  }, other, {
    children: /* @__PURE__ */ jsx(TransitionComponent, _extends({
      appear: true,
      in: open,
      onEntering: handleEntering,
      timeout: transitionDuration
    }, TransitionProps, {
      children: /* @__PURE__ */ jsx(PopoverPaper, _extends({
        elevation
      }, PaperProps, {
        ref: handlePaperRef,
        className: clsx(classes.paper, PaperProps.className),
        children
      }))
    }))
  }));
});
var Popover$1 = Popover;
function getMenuUtilityClass(slot) {
  return generateUtilityClass("MuiMenu", slot);
}
generateUtilityClasses("MuiMenu", ["root", "paper", "list"]);
const _excluded = ["onEntering"], _excluded2 = ["autoFocus", "children", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant"];
const RTL_ORIGIN = {
  vertical: "top",
  horizontal: "right"
};
const LTR_ORIGIN = {
  vertical: "top",
  horizontal: "left"
};
const useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  };
  return composeClasses(slots, getMenuUtilityClass, classes);
};
const MenuRoot = styled(Popover$1, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})({});
const MenuPaper = styled(Paper, {
  name: "MuiMenu",
  slot: "Paper",
  overridesResolver: (props, styles2) => styles2.paper
})({
  maxHeight: "calc(100% - 96px)",
  WebkitOverflowScrolling: "touch"
});
const MenuMenuList = styled(MenuList$1, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (props, styles2) => styles2.list
})({
  outline: 0
});
const Menu = /* @__PURE__ */ React.forwardRef(function Menu2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiMenu"
  });
  const {
    autoFocus = true,
    children,
    disableAutoFocusItem = false,
    MenuListProps = {},
    onClose,
    open,
    PaperProps = {},
    PopoverClasses,
    transitionDuration = "auto",
    TransitionProps: {
      onEntering
    } = {},
    variant = "selectedMenu"
  } = props, TransitionProps = _objectWithoutPropertiesLoose(props.TransitionProps, _excluded), other = _objectWithoutPropertiesLoose(props, _excluded2);
  const theme = useTheme();
  const isRtl = theme.direction === "rtl";
  const ownerState = _extends({}, props, {
    autoFocus,
    disableAutoFocusItem,
    MenuListProps,
    onEntering,
    PaperProps,
    transitionDuration,
    TransitionProps,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  const autoFocusItem = autoFocus && !disableAutoFocusItem && open;
  const menuListActionsRef = React.useRef(null);
  const handleEntering = (element, isAppearing) => {
    if (menuListActionsRef.current) {
      menuListActionsRef.current.adjustStyleForScrollbar(element, theme);
    }
    if (onEntering) {
      onEntering(element, isAppearing);
    }
  };
  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      if (onClose) {
        onClose(event, "tabKeyDown");
      }
    }
  };
  let activeItemIndex = -1;
  React.Children.map(children, (child, index) => {
    if (!/* @__PURE__ */ React.isValidElement(child)) {
      return;
    }
    if (!child.props.disabled) {
      if (variant === "selectedMenu" && child.props.selected) {
        activeItemIndex = index;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index;
      }
    }
  });
  return /* @__PURE__ */ jsx(MenuRoot, _extends({
    classes: PopoverClasses,
    onClose,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: isRtl ? "right" : "left"
    },
    transformOrigin: isRtl ? RTL_ORIGIN : LTR_ORIGIN,
    PaperProps: _extends({
      component: MenuPaper
    }, PaperProps, {
      classes: _extends({}, PaperProps.classes, {
        root: classes.paper
      })
    }),
    className: classes.root,
    open,
    ref,
    transitionDuration,
    TransitionProps: _extends({
      onEntering: handleEntering
    }, TransitionProps),
    ownerState
  }, other, {
    children: /* @__PURE__ */ jsx(MenuMenuList, _extends({
      onKeyDown: handleListKeyDown,
      actions: menuListActionsRef,
      autoFocus: autoFocus && (activeItemIndex === -1 || disableAutoFocusItem),
      autoFocusItem,
      variant
    }, MenuListProps, {
      className: clsx(classes.list, MenuListProps.className),
      children
    }))
  }));
});
var Menu$1 = Menu;
export { Backdrop$1 as B, ListContext$1 as L, Menu$1 as M, Modal$1 as a, default_1 as d };
//# sourceMappingURL=Menu.js.map
