import { m as generateUtilityClass, n as generateUtilityClasses, o as styled, _ as _extends, B as alpha, q as useThemeProps, h as _objectWithoutPropertiesLoose, r as composeClasses, j as jsx, l as clsx } from "./main.js";
import * as React from "react";
import { useRef, useState, useLayoutEffect, useEffect, useDebugValue } from "react";
import { Subject, BehaviorSubject, isObservable } from "rxjs";
import "rxjs/operators";
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
export { Paper$1 as P, useObservable as a, useSubscriptionInternal as b, useIsomorphicLayoutEffect as c, useObservableStateInternal as d, useObservableState as u };
//# sourceMappingURL=use-observable-state.js.map
