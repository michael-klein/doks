import * as React from "react";
import React__default, { useRef, useState, useLayoutEffect, useEffect, useDebugValue } from "react";
import { a as useTheme$1, E as defaultTheme, h as _objectWithoutPropertiesLoose, m as generateUtilityClass, n as generateUtilityClasses, o as styled, _ as _extends, y as alpha, q as useThemeProps, r as composeClasses, j as jsx, l as clsx } from "./main.js";
import { _ as _inheritsLoose, T as TransitionGroupContext } from "./jsx-runtime_commonjs-proxy.js";
import ReactDOM__default from "react-dom";
import { Subject, BehaviorSubject, isObservable } from "rxjs";
import "rxjs/operators";
function isHostComponent(element) {
  return typeof element === "string";
}
function useTheme() {
  const theme = useTheme$1(defaultTheme);
  return theme;
}
var config = {
  disabled: false
};
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
var Transition = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(Transition2, _React$Component);
  function Transition2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context;
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;
    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }
    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }
  Transition2.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;
    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }
    return null;
  };
  var _proto = Transition2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;
    if (prevProps !== this.props) {
      var status = this.state.status;
      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }
    this.updateStatus(false, nextStatus);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };
  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;
    if (timeout != null && typeof timeout !== "number") {
      exit = timeout.exit;
      enter = timeout.enter;
      appear = timeout.appear !== void 0 ? timeout.appear : enter;
    }
    return {
      exit,
      enter,
      appear
    };
  };
  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }
    if (nextStatus !== null) {
      this.cancelNextCallback();
      if (nextStatus === ENTERING) {
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };
  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;
    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;
    var _ref2 = this.props.nodeRef ? [appearing] : [ReactDOM__default.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    if (!mounting && !enter || config.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function() {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }
    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function() {
      _this2.props.onEntering(maybeNode, maybeAppearing);
      _this2.onTransitionEnd(enterTimeout, function() {
        _this2.safeSetState({
          status: ENTERED
        }, function() {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };
  _proto.performExit = function performExit() {
    var _this3 = this;
    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? void 0 : ReactDOM__default.findDOMNode(this);
    if (!exit || config.disabled) {
      this.safeSetState({
        status: EXITED
      }, function() {
        _this3.props.onExited(maybeNode);
      });
      return;
    }
    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function() {
      _this3.props.onExiting(maybeNode);
      _this3.onTransitionEnd(timeouts.exit, function() {
        _this3.safeSetState({
          status: EXITED
        }, function() {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };
  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  _proto.safeSetState = function safeSetState(nextState, callback) {
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };
  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;
    var active = true;
    this.nextCallback = function(event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };
    this.nextCallback.cancel = function() {
      active = false;
    };
    return this.nextCallback;
  };
  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM__default.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
      this.props.addEndListener(maybeNode, maybeNextCallback);
    }
    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };
  _proto.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }
    var _this$props = this.props, children = _this$props.children;
    _this$props.in;
    _this$props.mountOnEnter;
    _this$props.unmountOnExit;
    _this$props.appear;
    _this$props.enter;
    _this$props.exit;
    _this$props.timeout;
    _this$props.addEndListener;
    _this$props.onEnter;
    _this$props.onEntering;
    _this$props.onEntered;
    _this$props.onExit;
    _this$props.onExiting;
    _this$props.onExited;
    _this$props.nodeRef;
    var childProps = _objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return /* @__PURE__ */ React__default.createElement(TransitionGroupContext.Provider, {
      value: null
    }, typeof children === "function" ? children(status, childProps) : React__default.cloneElement(React__default.Children.only(children), childProps));
  };
  return Transition2;
}(React__default.Component);
Transition.contextType = TransitionGroupContext;
Transition.propTypes = {};
function noop() {
}
Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
var Transition$1 = Transition;
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
const PaperRoot = styled("div", {
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
const reflow = (node) => node.scrollTop;
function getTransitionProps(props, options) {
  var _style$transitionDura, _style$transitionTimi;
  const {
    timeout,
    easing,
    style = {}
  } = props;
  return {
    duration: (_style$transitionDura = style.transitionDuration) != null ? _style$transitionDura : typeof timeout === "number" ? timeout : timeout[options.mode] || 0,
    easing: (_style$transitionTimi = style.transitionTimingFunction) != null ? _style$transitionTimi : typeof easing === "object" ? easing[options.mode] : easing,
    delay: style.transitionDelay
  };
}
function getEmptySubject() {
  return new Subject();
}
function useRefFn(init) {
  var firstRef = useRef(true);
  var ref = useRef(null);
  if (firstRef.current) {
    firstRef.current = false;
    ref.current = init();
  }
  return ref;
}
function useForceUpdate() {
  var updateState = useState(0)[1];
  return useRef(function() {
    return updateState(increment);
  }).current;
}
function increment(n) {
  return (n + 1) % 1e6;
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined" ? useLayoutEffect : useEffect;
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
function useSubscriptionInternal(useCustomEffect, args) {
  var forceUpdate = useForceUpdate();
  var argsRef = useRef(args);
  var errorRef = useRef();
  var subscriptionRef = useRef();
  useIsomorphicLayoutEffect(function() {
    argsRef.current = args;
  });
  useCustomEffect(function() {
    errorRef.current = null;
    var input$ = argsRef.current[0];
    var subscription = input$.subscribe({
      next: function(value) {
        var _a;
        if (input$ !== argsRef.current[0]) {
          return;
        }
        var nextObserver = ((_a = argsRef.current[1]) === null || _a === void 0 ? void 0 : _a.next) || argsRef.current[1];
        if (nextObserver) {
          return nextObserver(value);
        }
      },
      error: function(error) {
        var _a;
        if (input$ !== argsRef.current[0]) {
          return;
        }
        var errorObserver = ((_a = argsRef.current[1]) === null || _a === void 0 ? void 0 : _a.error) || argsRef.current[2];
        if (errorObserver) {
          errorRef.current = null;
          return errorObserver(error);
        }
        errorRef.current = error;
        forceUpdate();
      },
      complete: function() {
        var _a;
        if (input$ !== argsRef.current[0]) {
          return;
        }
        var completeObserver = ((_a = argsRef.current[1]) === null || _a === void 0 ? void 0 : _a.complete) || argsRef.current[3];
        if (completeObserver) {
          return completeObserver();
        }
      }
    });
    subscriptionRef.current = subscription;
    return function() {
      subscription.unsubscribe();
    };
  }, [args[0]]);
  if (errorRef.current) {
    throw errorRef.current;
  }
  return subscriptionRef;
}
function useSubscription(input$, observerOrNext$, error, complete) {
  return useSubscriptionInternal(useEffect, [
    input$,
    observerOrNext$,
    error,
    complete
  ]);
}
function useObservableStateInternal(useSubscription2, state$OrInit, initialState) {
  if (isObservable(state$OrInit)) {
    var state$_1 = state$OrInit;
    var _a = useState(function() {
      if (state$_1 instanceof BehaviorSubject || state$_1.value !== void 0) {
        return state$_1.value;
      }
      if (typeof initialState === "function") {
        return initialState();
      }
      return initialState;
    }), state = _a[0], setState = _a[1];
    useSubscription2(state$_1, setState);
    useDebugValue(state);
    return state;
  } else {
    var init_1 = state$OrInit;
    var _b = useState(initialState), state_1 = _b[0], setState = _b[1];
    var input$Ref_1 = useRefFn(getEmptySubject);
    var state$ = useRefFn(function() {
      return init_1(input$Ref_1.current, state_1);
    }).current;
    var callback = useRef(function(state2) {
      return input$Ref_1.current.next(state2);
    }).current;
    useSubscription2(state$, setState);
    useDebugValue(state_1);
    return [state_1, callback];
  }
}
function useObservableState(state$OrInit, initialState) {
  return useObservableStateInternal(useSubscription, state$OrInit, initialState);
}
export { Paper$1 as P, Transition$1 as T, useObservable as a, useTheme as b, useSubscriptionInternal as c, useIsomorphicLayoutEffect as d, useObservableStateInternal as e, getTransitionProps as g, isHostComponent as i, reflow as r, useObservableState as u };
//# sourceMappingURL=use-observable-state.js.map
