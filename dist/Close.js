import { f as generateUtilityClasses, g as generateUtilityClass, s as styled, B as rootShouldForwardProp, _ as _extends, h as useThemeProps, i as _objectWithoutPropertiesLoose, m as deepmerge, j as jsx, k as composeClasses, o as capitalize, l as clsx, M as slotShouldForwardProp, n as formatMuiErrorMessage, d as jsxs } from "./main.js";
import * as React from "react";
import { n as nativeSelectSelectStyles, b as nativeSelectIconStyles, A as ArrowDropDownIcon, N as NativeSelectInput, I as Input, F as FormControl, a as InputLabel } from "./Input.js";
import "./react-is.production.min.js";
import { M as Menu } from "./Menu.js";
import { I as InputBaseRoot, r as rootOverridesResolver, b as InputBaseComponent, c as inputOverridesResolver, d as InputBase, u as useFormControl, f as formControlState, a as isFilled } from "./InputBase.js";
import { m as useControlled, b as useForkRef, o as ownerDocument } from "./styled.js";
import { a as createSvgIcon } from "./Typography.js";
function getFilledInputUtilityClass(slot) {
  return generateUtilityClass("MuiFilledInput", slot);
}
const filledInputClasses = generateUtilityClasses("MuiFilledInput", ["root", "colorSecondary", "underline", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "hiddenLabel", "input", "inputSizeSmall", "inputHiddenLabel", "inputMultiline", "inputAdornedStart", "inputAdornedEnd"]);
var filledInputClasses$1 = filledInputClasses;
const _excluded$6 = ["disableUnderline", "components", "componentsProps", "fullWidth", "hiddenLabel", "inputComponent", "multiline", "type"];
const useUtilityClasses$5 = (ownerState) => {
  const {
    classes,
    disableUnderline
  } = ownerState;
  const slots = {
    root: ["root", !disableUnderline && "underline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getFilledInputUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
const FilledInputRoot = styled(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiFilledInput",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [...rootOverridesResolver(props, styles), !ownerState.disableUnderline && styles.underline];
  }
})(({
  theme,
  ownerState
}) => {
  const light = theme.palette.mode === "light";
  const bottomLineColor = light ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  const backgroundColor = light ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)";
  return _extends({
    position: "relative",
    backgroundColor,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut
    }),
    "&:hover": {
      backgroundColor: light ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)",
      "@media (hover: none)": {
        backgroundColor
      }
    },
    [`&.${filledInputClasses$1.focused}`]: {
      backgroundColor
    },
    [`&.${filledInputClasses$1.disabled}`]: {
      backgroundColor: light ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)"
    }
  }, !ownerState.disableUnderline && {
    "&:after": {
      borderBottom: `2px solid ${theme.palette[ownerState.color].main}`,
      left: 0,
      bottom: 0,
      content: '""',
      position: "absolute",
      right: 0,
      transform: "scaleX(0)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      }),
      pointerEvents: "none"
    },
    [`&.${filledInputClasses$1.focused}:after`]: {
      transform: "scaleX(1)"
    },
    [`&.${filledInputClasses$1.error}:after`]: {
      borderBottomColor: theme.palette.error.main,
      transform: "scaleX(1)"
    },
    "&:before": {
      borderBottom: `1px solid ${bottomLineColor}`,
      left: 0,
      bottom: 0,
      content: '"\\00a0"',
      position: "absolute",
      right: 0,
      transition: theme.transitions.create("border-bottom-color", {
        duration: theme.transitions.duration.shorter
      }),
      pointerEvents: "none"
    },
    [`&:hover:not(.${filledInputClasses$1.disabled}):before`]: {
      borderBottom: `1px solid ${theme.palette.text.primary}`
    },
    [`&.${filledInputClasses$1.disabled}:before`]: {
      borderBottomStyle: "dotted"
    }
  }, ownerState.startAdornment && {
    paddingLeft: 12
  }, ownerState.endAdornment && {
    paddingRight: 12
  }, ownerState.multiline && _extends({
    padding: "25px 12px 8px"
  }, ownerState.size === "small" && {
    paddingTop: 21,
    paddingBottom: 4
  }, ownerState.hiddenLabel && {
    paddingTop: 16,
    paddingBottom: 17
  }));
});
const FilledInputInput = styled(InputBaseComponent, {
  name: "MuiFilledInput",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})(({
  theme,
  ownerState
}) => _extends({
  paddingTop: 25,
  paddingRight: 12,
  paddingBottom: 8,
  paddingLeft: 12,
  "&:-webkit-autofill": {
    WebkitBoxShadow: theme.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
    WebkitTextFillColor: theme.palette.mode === "light" ? null : "#fff",
    caretColor: theme.palette.mode === "light" ? null : "#fff",
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit"
  }
}, ownerState.size === "small" && {
  paddingTop: 21,
  paddingBottom: 4
}, ownerState.hiddenLabel && {
  paddingTop: 16,
  paddingBottom: 17
}, ownerState.multiline && {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0
}, ownerState.startAdornment && {
  paddingLeft: 0
}, ownerState.endAdornment && {
  paddingRight: 0
}, ownerState.hiddenLabel && ownerState.size === "small" && {
  paddingTop: 8,
  paddingBottom: 9
}));
const FilledInput = /* @__PURE__ */ React.forwardRef(function FilledInput2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFilledInput"
  });
  const {
    components = {},
    componentsProps: componentsPropsProp,
    fullWidth = false,
    inputComponent = "input",
    multiline = false,
    type = "text"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$6);
  const ownerState = _extends({}, props, {
    fullWidth,
    inputComponent,
    multiline,
    type
  });
  const classes = useUtilityClasses$5(props);
  const filledInputComponentsProps = {
    root: {
      ownerState
    },
    input: {
      ownerState
    }
  };
  const componentsProps = componentsPropsProp ? deepmerge(componentsPropsProp, filledInputComponentsProps) : filledInputComponentsProps;
  return /* @__PURE__ */ jsx(InputBase, _extends({
    components: _extends({
      Root: FilledInputRoot,
      Input: FilledInputInput
    }, components),
    componentsProps,
    fullWidth,
    inputComponent,
    multiline,
    ref,
    type
  }, other, {
    classes
  }));
});
FilledInput.muiName = "Input";
var FilledInput$1 = FilledInput;
const _excluded$5 = ["children", "classes", "className", "label", "notched"];
const NotchedOutlineRoot$1 = styled("fieldset")({
  textAlign: "left",
  position: "absolute",
  bottom: 0,
  right: 0,
  top: -5,
  left: 0,
  margin: 0,
  padding: "0 8px",
  pointerEvents: "none",
  borderRadius: "inherit",
  borderStyle: "solid",
  borderWidth: 1,
  overflow: "hidden",
  minWidth: "0%"
});
const NotchedOutlineLegend = styled("legend", {
  skipSx: true
})(({
  ownerState,
  theme
}) => _extends({}, ownerState.label === void 0 && {
  padding: 0,
  lineHeight: "11px",
  transition: theme.transitions.create("width", {
    duration: 150,
    easing: theme.transitions.easing.easeOut
  })
}, ownerState.label !== void 0 && _extends({
  display: "block",
  width: "auto",
  padding: 0,
  height: 11,
  fontSize: "0.75em",
  visibility: "hidden",
  maxWidth: 0.01,
  transition: theme.transitions.create("max-width", {
    duration: 50,
    easing: theme.transitions.easing.easeOut
  }),
  "& > span": {
    paddingLeft: 5,
    paddingRight: 5,
    display: "inline-block"
  }
}, ownerState.notched && {
  maxWidth: "100%",
  transition: theme.transitions.create("max-width", {
    duration: 100,
    easing: theme.transitions.easing.easeOut,
    delay: 50
  })
})));
function NotchedOutline(props) {
  const {
    className,
    label,
    notched
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$5);
  const ownerState = _extends({}, props, {
    notched,
    label
  });
  return /* @__PURE__ */ jsx(NotchedOutlineRoot$1, _extends({
    "aria-hidden": true,
    className,
    ownerState
  }, other, {
    children: /* @__PURE__ */ jsx(NotchedOutlineLegend, {
      ownerState,
      children: label ? /* @__PURE__ */ jsx("span", {
        children: label
      }) : /* @__PURE__ */ jsx("span", {
        className: "notranslate",
        dangerouslySetInnerHTML: {
          __html: "&#8203;"
        }
      })
    })
  }));
}
function getOutlinedInputUtilityClass(slot) {
  return generateUtilityClass("MuiOutlinedInput", slot);
}
const outlinedInputClasses = generateUtilityClasses("MuiOutlinedInput", ["root", "colorSecondary", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "notchedOutline", "input", "inputSizeSmall", "inputMultiline", "inputAdornedStart", "inputAdornedEnd"]);
var outlinedInputClasses$1 = outlinedInputClasses;
const _excluded$4 = ["components", "fullWidth", "inputComponent", "label", "multiline", "notched", "type"];
const useUtilityClasses$4 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    notchedOutline: ["notchedOutline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getOutlinedInputUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
const OutlinedInputRoot = styled(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiOutlinedInput",
  slot: "Root",
  overridesResolver: rootOverridesResolver
})(({
  theme,
  ownerState
}) => {
  const borderColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return _extends({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    [`&:hover .${outlinedInputClasses$1.notchedOutline}`]: {
      borderColor: theme.palette.text.primary
    },
    "@media (hover: none)": {
      [`&:hover .${outlinedInputClasses$1.notchedOutline}`]: {
        borderColor
      }
    },
    [`&.${outlinedInputClasses$1.focused} .${outlinedInputClasses$1.notchedOutline}`]: {
      borderColor: theme.palette[ownerState.color].main,
      borderWidth: 2
    },
    [`&.${outlinedInputClasses$1.error} .${outlinedInputClasses$1.notchedOutline}`]: {
      borderColor: theme.palette.error.main
    },
    [`&.${outlinedInputClasses$1.disabled} .${outlinedInputClasses$1.notchedOutline}`]: {
      borderColor: theme.palette.action.disabled
    }
  }, ownerState.startAdornment && {
    paddingLeft: 14
  }, ownerState.endAdornment && {
    paddingRight: 14
  }, ownerState.multiline && _extends({
    padding: "16.5px 14px"
  }, ownerState.size === "small" && {
    padding: "8.5px 14px"
  }));
});
const NotchedOutlineRoot = styled(NotchedOutline, {
  name: "MuiOutlinedInput",
  slot: "NotchedOutline",
  overridesResolver: (props, styles) => styles.notchedOutline
})(({
  theme
}) => ({
  borderColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"
}));
const OutlinedInputInput = styled(InputBaseComponent, {
  name: "MuiOutlinedInput",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})(({
  theme,
  ownerState
}) => _extends({
  padding: "16.5px 14px",
  "&:-webkit-autofill": {
    WebkitBoxShadow: theme.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
    WebkitTextFillColor: theme.palette.mode === "light" ? null : "#fff",
    caretColor: theme.palette.mode === "light" ? null : "#fff",
    borderRadius: "inherit"
  }
}, ownerState.size === "small" && {
  padding: "8.5px 14px"
}, ownerState.multiline && {
  padding: 0
}, ownerState.startAdornment && {
  paddingLeft: 0
}, ownerState.endAdornment && {
  paddingRight: 0
}));
const OutlinedInput = /* @__PURE__ */ React.forwardRef(function OutlinedInput2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiOutlinedInput"
  });
  const {
    components = {},
    fullWidth = false,
    inputComponent = "input",
    label,
    multiline = false,
    notched,
    type = "text"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$4);
  const classes = useUtilityClasses$4(props);
  return /* @__PURE__ */ jsx(InputBase, _extends({
    components: _extends({
      Root: OutlinedInputRoot,
      Input: OutlinedInputInput
    }, components),
    renderSuffix: (state) => /* @__PURE__ */ jsx(NotchedOutlineRoot, {
      className: classes.notchedOutline,
      label,
      notched: typeof notched !== "undefined" ? notched : Boolean(state.startAdornment || state.filled || state.focused)
    }),
    fullWidth,
    inputComponent,
    multiline,
    ref,
    type
  }, other, {
    classes: _extends({}, classes, {
      notchedOutline: null
    })
  }));
});
OutlinedInput.muiName = "Input";
var OutlinedInput$1 = OutlinedInput;
function getFormHelperTextUtilityClasses(slot) {
  return generateUtilityClass("MuiFormHelperText", slot);
}
const formHelperTextClasses = generateUtilityClasses("MuiFormHelperText", ["root", "error", "disabled", "sizeSmall", "sizeMedium", "contained", "focused", "filled", "required"]);
var formHelperTextClasses$1 = formHelperTextClasses;
const _excluded$3 = ["children", "className", "component", "disabled", "error", "filled", "focused", "margin", "required", "variant"];
const useUtilityClasses$3 = (ownerState) => {
  const {
    classes,
    contained,
    size,
    disabled,
    error,
    filled,
    focused,
    required
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", error && "error", size && `size${capitalize(size)}`, contained && "contained", focused && "focused", filled && "filled", required && "required"]
  };
  return composeClasses(slots, getFormHelperTextUtilityClasses, classes);
};
const FormHelperTextRoot = styled("p", {
  name: "MuiFormHelperText",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.size && styles[`size${capitalize(ownerState.size)}`], ownerState.contained && styles.contained, ownerState.filled && styles.filled];
  }
})(({
  theme,
  ownerState
}) => _extends({
  color: theme.palette.text.secondary
}, theme.typography.caption, {
  textAlign: "left",
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  [`&.${formHelperTextClasses$1.disabled}`]: {
    color: theme.palette.text.disabled
  },
  [`&.${formHelperTextClasses$1.error}`]: {
    color: theme.palette.error.main
  }
}, ownerState.size === "small" && {
  marginTop: 4
}, ownerState.contained && {
  marginLeft: 14,
  marginRight: 14
}));
const FormHelperText = /* @__PURE__ */ React.forwardRef(function FormHelperText2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFormHelperText"
  });
  const {
    children,
    className,
    component = "p"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$3);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["variant", "size", "disabled", "error", "filled", "focused", "required"]
  });
  const ownerState = _extends({}, props, {
    component,
    contained: fcs.variant === "filled" || fcs.variant === "outlined",
    variant: fcs.variant,
    size: fcs.size,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  });
  const classes = useUtilityClasses$3(ownerState);
  return /* @__PURE__ */ jsx(FormHelperTextRoot, _extends({
    as: component,
    ownerState,
    className: clsx(classes.root, className),
    ref
  }, other, {
    children: children === " " ? /* @__PURE__ */ jsx("span", {
      className: "notranslate",
      dangerouslySetInnerHTML: {
        __html: "&#8203;"
      }
    }) : children
  }));
});
var FormHelperText$1 = FormHelperText;
function getSelectUtilityClasses(slot) {
  return generateUtilityClass("MuiSelect", slot);
}
const selectClasses = generateUtilityClasses("MuiSelect", ["root", "select", "filled", "outlined", "standard", "disabled", "focused", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput"]);
const _excluded$2 = ["aria-describedby", "aria-label", "autoFocus", "autoWidth", "children", "className", "defaultValue", "disabled", "displayEmpty", "IconComponent", "inputRef", "labelId", "MenuProps", "multiple", "name", "onBlur", "onChange", "onClose", "onFocus", "onOpen", "open", "readOnly", "renderValue", "SelectDisplayProps", "tabIndex", "type", "value", "variant"];
const SelectSelect = styled("div", {
  name: "MuiSelect",
  slot: "Select",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [
      {
        [`&.${selectClasses.select}`]: styles.select
      },
      {
        [`&.${selectClasses.select}`]: styles[ownerState.variant]
      }
    ];
  }
})(nativeSelectSelectStyles, {
  [`&.${selectClasses.select}`]: {
    height: "auto",
    minHeight: "1.4375em",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
});
const SelectIcon = styled("svg", {
  name: "MuiSelect",
  slot: "Icon",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.icon, ownerState.variant && styles[`icon${capitalize(ownerState.variant)}`], ownerState.open && styles.iconOpen];
  }
})(nativeSelectIconStyles);
const SelectNativeInput = styled("input", {
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== "classes",
  name: "MuiSelect",
  slot: "NativeInput",
  overridesResolver: (props, styles) => styles.nativeInput
})({
  bottom: 0,
  left: 0,
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  width: "100%",
  boxSizing: "border-box"
});
function areEqualValues(a, b) {
  if (typeof b === "object" && b !== null) {
    return a === b;
  }
  return String(a) === String(b);
}
function isEmpty(display) {
  return display == null || typeof display === "string" && !display.trim();
}
const useUtilityClasses$2 = (ownerState) => {
  const {
    classes,
    variant,
    disabled,
    open
  } = ownerState;
  const slots = {
    select: ["select", variant, disabled && "disabled"],
    icon: ["icon", `icon${capitalize(variant)}`, open && "iconOpen", disabled && "disabled"],
    nativeInput: ["nativeInput"]
  };
  return composeClasses(slots, getSelectUtilityClasses, classes);
};
const SelectInput = /* @__PURE__ */ React.forwardRef(function SelectInput2(props, ref) {
  const {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    autoFocus,
    autoWidth,
    children,
    className,
    defaultValue,
    disabled,
    displayEmpty,
    IconComponent,
    inputRef: inputRefProp,
    labelId,
    MenuProps = {},
    multiple,
    name,
    onBlur,
    onChange,
    onClose,
    onFocus,
    onOpen,
    open: openProp,
    readOnly,
    renderValue,
    SelectDisplayProps = {},
    tabIndex: tabIndexProp,
    value: valueProp,
    variant = "standard"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "Select"
  });
  const inputRef = React.useRef(null);
  const displayRef = React.useRef(null);
  const [displayNode, setDisplayNode] = React.useState(null);
  const {
    current: isOpenControlled
  } = React.useRef(openProp != null);
  const [menuMinWidthState, setMenuMinWidthState] = React.useState();
  const [openState, setOpenState] = React.useState(false);
  const handleRef = useForkRef(ref, inputRefProp);
  const handleDisplayRef = React.useCallback((node) => {
    displayRef.current = node;
    if (node) {
      setDisplayNode(node);
    }
  }, []);
  React.useImperativeHandle(handleRef, () => ({
    focus: () => {
      displayRef.current.focus();
    },
    node: inputRef.current,
    value
  }), [value]);
  React.useEffect(() => {
    if (autoFocus) {
      displayRef.current.focus();
    }
  }, [autoFocus]);
  React.useEffect(() => {
    const label = ownerDocument(displayRef.current).getElementById(labelId);
    if (label) {
      const handler = () => {
        if (getSelection().isCollapsed) {
          displayRef.current.focus();
        }
      };
      label.addEventListener("click", handler);
      return () => {
        label.removeEventListener("click", handler);
      };
    }
    return void 0;
  }, [labelId]);
  const update = (open2, event) => {
    if (open2) {
      if (onOpen) {
        onOpen(event);
      }
    } else if (onClose) {
      onClose(event);
    }
    if (!isOpenControlled) {
      setMenuMinWidthState(autoWidth ? null : displayNode.clientWidth);
      setOpenState(open2);
    }
  };
  const handleMouseDown = (event) => {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    displayRef.current.focus();
    update(true, event);
  };
  const handleClose = (event) => {
    update(false, event);
  };
  const childrenArray = React.Children.toArray(children);
  const handleChange = (event) => {
    const index = childrenArray.map((child2) => child2.props.value).indexOf(event.target.value);
    if (index === -1) {
      return;
    }
    const child = childrenArray[index];
    setValueState(child.props.value);
    if (onChange) {
      onChange(event, child);
    }
  };
  const handleItemClick = (child) => (event) => {
    let newValue;
    if (!event.currentTarget.hasAttribute("tabindex")) {
      return;
    }
    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      const itemIndex = value.indexOf(child.props.value);
      if (itemIndex === -1) {
        newValue.push(child.props.value);
      } else {
        newValue.splice(itemIndex, 1);
      }
    } else {
      newValue = child.props.value;
    }
    if (child.props.onClick) {
      child.props.onClick(event);
    }
    if (value !== newValue) {
      setValueState(newValue);
      if (onChange) {
        const nativeEvent = event.nativeEvent || event;
        const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
        Object.defineProperty(clonedEvent, "target", {
          writable: true,
          value: {
            value: newValue,
            name
          }
        });
        onChange(clonedEvent, child);
      }
    }
    if (!multiple) {
      update(false, event);
    }
  };
  const handleKeyDown = (event) => {
    if (!readOnly) {
      const validKeys = [
        " ",
        "ArrowUp",
        "ArrowDown",
        "Enter"
      ];
      if (validKeys.indexOf(event.key) !== -1) {
        event.preventDefault();
        update(true, event);
      }
    }
  };
  const open = displayNode !== null && (isOpenControlled ? openProp : openState);
  const handleBlur = (event) => {
    if (!open && onBlur) {
      Object.defineProperty(event, "target", {
        writable: true,
        value: {
          value,
          name
        }
      });
      onBlur(event);
    }
  };
  delete other["aria-invalid"];
  let display;
  let displaySingle;
  const displayMultiple = [];
  let computeDisplay = false;
  if (isFilled({
    value
  }) || displayEmpty) {
    if (renderValue) {
      display = renderValue(value);
    } else {
      computeDisplay = true;
    }
  }
  const items = childrenArray.map((child) => {
    if (!/* @__PURE__ */ React.isValidElement(child)) {
      return null;
    }
    let selected;
    if (multiple) {
      if (!Array.isArray(value)) {
        throw new Error(formatMuiErrorMessage(2));
      }
      selected = value.some((v) => areEqualValues(v, child.props.value));
      if (selected && computeDisplay) {
        displayMultiple.push(child.props.children);
      }
    } else {
      selected = areEqualValues(value, child.props.value);
      if (selected && computeDisplay) {
        displaySingle = child.props.children;
      }
    }
    return /* @__PURE__ */ React.cloneElement(child, {
      "aria-selected": selected ? "true" : void 0,
      onClick: handleItemClick(child),
      onKeyUp: (event) => {
        if (event.key === " ") {
          event.preventDefault();
        }
        if (child.props.onKeyUp) {
          child.props.onKeyUp(event);
        }
      },
      role: "option",
      selected,
      value: void 0,
      "data-value": child.props.value
    });
  });
  if (computeDisplay) {
    display = multiple ? displayMultiple.join(", ") : displaySingle;
  }
  let menuMinWidth = menuMinWidthState;
  if (!autoWidth && isOpenControlled && displayNode) {
    menuMinWidth = displayNode.clientWidth;
  }
  let tabIndex;
  if (typeof tabIndexProp !== "undefined") {
    tabIndex = tabIndexProp;
  } else {
    tabIndex = disabled ? null : 0;
  }
  const buttonId = SelectDisplayProps.id || (name ? `mui-component-select-${name}` : void 0);
  const ownerState = _extends({}, props, {
    variant,
    value,
    open
  });
  const classes = useUtilityClasses$2(ownerState);
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [/* @__PURE__ */ jsx(SelectSelect, _extends({
      ref: handleDisplayRef,
      tabIndex,
      role: "button",
      "aria-disabled": disabled ? "true" : void 0,
      "aria-expanded": open ? "true" : "false",
      "aria-haspopup": "listbox",
      "aria-label": ariaLabel,
      "aria-labelledby": [labelId, buttonId].filter(Boolean).join(" ") || void 0,
      "aria-describedby": ariaDescribedby,
      onKeyDown: handleKeyDown,
      onMouseDown: disabled || readOnly ? null : handleMouseDown,
      onBlur: handleBlur,
      onFocus
    }, SelectDisplayProps, {
      ownerState,
      className: clsx(classes.select, className, SelectDisplayProps.className),
      id: buttonId,
      children: isEmpty(display) ? /* @__PURE__ */ jsx("span", {
        className: "notranslate",
        dangerouslySetInnerHTML: {
          __html: "&#8203;"
        }
      }) : display
    })), /* @__PURE__ */ jsx(SelectNativeInput, _extends({
      value: Array.isArray(value) ? value.join(",") : value,
      name,
      ref: inputRef,
      "aria-hidden": true,
      onChange: handleChange,
      tabIndex: -1,
      disabled,
      className: classes.nativeInput,
      autoFocus,
      ownerState
    }, other)), /* @__PURE__ */ jsx(SelectIcon, {
      as: IconComponent,
      className: classes.icon,
      ownerState
    }), /* @__PURE__ */ jsx(Menu, _extends({
      id: `menu-${name || ""}`,
      anchorEl: displayNode,
      open,
      onClose: handleClose,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "center"
      }
    }, MenuProps, {
      MenuListProps: _extends({
        "aria-labelledby": labelId,
        role: "listbox",
        disableListWrap: true
      }, MenuProps.MenuListProps),
      PaperProps: _extends({}, MenuProps.PaperProps, {
        style: _extends({
          minWidth: menuMinWidth
        }, MenuProps.PaperProps != null ? MenuProps.PaperProps.style : null)
      }),
      children: items
    }))]
  });
});
var SelectInput$1 = SelectInput;
var _Input, _FilledInput;
const _excluded$1 = ["autoWidth", "children", "classes", "className", "displayEmpty", "IconComponent", "id", "input", "inputProps", "label", "labelId", "MenuProps", "multiple", "native", "onClose", "onOpen", "open", "renderValue", "SelectDisplayProps", "variant"], _excluded2 = ["root"];
const useUtilityClasses$1 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getSelectUtilityClasses, classes);
};
const Select = /* @__PURE__ */ React.forwardRef(function Select2(inProps, ref) {
  const props = useThemeProps({
    name: "MuiSelect",
    props: inProps
  });
  const {
    autoWidth = false,
    children,
    classes: classesProp = {},
    className,
    displayEmpty = false,
    IconComponent = ArrowDropDownIcon,
    id,
    input,
    inputProps,
    label,
    labelId,
    MenuProps,
    multiple = false,
    native = false,
    onClose,
    onOpen,
    open,
    renderValue,
    SelectDisplayProps,
    variant: variantProps = "outlined"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$1);
  const inputComponent = native ? NativeSelectInput : SelectInput$1;
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["variant"]
  });
  const variant = fcs.variant || variantProps;
  const InputComponent = input || {
    standard: _Input || (_Input = /* @__PURE__ */ jsx(Input, {})),
    outlined: /* @__PURE__ */ jsx(OutlinedInput$1, {
      label
    }),
    filled: _FilledInput || (_FilledInput = /* @__PURE__ */ jsx(FilledInput$1, {}))
  }[variant];
  const ownerState = _extends({}, props, {
    classes: classesProp
  });
  const classes = useUtilityClasses$1(ownerState);
  const otherClasses = _objectWithoutPropertiesLoose(classesProp, _excluded2);
  const inputComponentRef = useForkRef(ref, InputComponent.ref);
  return /* @__PURE__ */ React.cloneElement(InputComponent, _extends({
    inputComponent,
    inputProps: _extends({
      children,
      IconComponent,
      variant,
      type: void 0,
      multiple
    }, native ? {
      id
    } : {
      autoWidth,
      displayEmpty,
      labelId,
      MenuProps,
      onClose,
      onOpen,
      open,
      renderValue,
      SelectDisplayProps: _extends({
        id
      }, SelectDisplayProps)
    }, inputProps, {
      classes: inputProps ? deepmerge(otherClasses, inputProps.classes) : otherClasses
    }, input ? input.props.inputProps : {})
  }, multiple && native && variant === "outlined" ? {
    notched: true
  } : {}, {
    ref: inputComponentRef,
    className: clsx(classes.root, InputComponent.props.className, className)
  }, other));
});
Select.muiName = "Select";
var Select$1 = Select;
function getTextFieldUtilityClass(slot) {
  return generateUtilityClass("MuiTextField", slot);
}
generateUtilityClasses("MuiTextField", ["root"]);
const _excluded = ["autoComplete", "autoFocus", "children", "className", "color", "defaultValue", "disabled", "error", "FormHelperTextProps", "fullWidth", "helperText", "id", "InputLabelProps", "inputProps", "InputProps", "inputRef", "label", "maxRows", "minRows", "multiline", "name", "onBlur", "onChange", "onFocus", "placeholder", "required", "rows", "select", "SelectProps", "type", "value", "variant"];
const variantComponent = {
  standard: Input,
  filled: FilledInput$1,
  outlined: OutlinedInput$1
};
const useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getTextFieldUtilityClass, classes);
};
const TextFieldRoot = styled(FormControl, {
  name: "MuiTextField",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({});
const TextField = /* @__PURE__ */ React.forwardRef(function TextField2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTextField"
  });
  const {
    autoComplete,
    autoFocus = false,
    children,
    className,
    color = "primary",
    defaultValue,
    disabled = false,
    error = false,
    FormHelperTextProps,
    fullWidth = false,
    helperText,
    id,
    InputLabelProps,
    inputProps,
    InputProps,
    inputRef,
    label,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required = false,
    rows,
    select = false,
    SelectProps,
    type,
    value,
    variant = "outlined"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    autoFocus,
    color,
    disabled,
    error,
    fullWidth,
    multiline,
    required,
    select,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  const InputMore = {};
  if (variant === "outlined") {
    if (InputLabelProps && typeof InputLabelProps.shrink !== "undefined") {
      InputMore.notched = InputLabelProps.shrink;
    }
    if (label) {
      var _InputLabelProps$requ;
      const displayRequired = (_InputLabelProps$requ = InputLabelProps == null ? void 0 : InputLabelProps.required) != null ? _InputLabelProps$requ : required;
      InputMore.label = /* @__PURE__ */ jsxs(React.Fragment, {
        children: [label, displayRequired && "\xA0*"]
      });
    }
  }
  if (select) {
    if (!SelectProps || !SelectProps.native) {
      InputMore.id = void 0;
    }
    InputMore["aria-describedby"] = void 0;
  }
  const helperTextId = helperText && id ? `${id}-helper-text` : void 0;
  const inputLabelId = label && id ? `${id}-label` : void 0;
  const InputComponent = variantComponent[variant];
  const InputElement = /* @__PURE__ */ jsx(InputComponent, _extends({
    "aria-describedby": helperTextId,
    autoComplete,
    autoFocus,
    defaultValue,
    fullWidth,
    multiline,
    name,
    rows,
    maxRows,
    minRows,
    type,
    value,
    id,
    inputRef,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    inputProps
  }, InputMore, InputProps));
  return /* @__PURE__ */ jsxs(TextFieldRoot, _extends({
    className: clsx(classes.root, className),
    disabled,
    error,
    fullWidth,
    ref,
    required,
    color,
    variant,
    ownerState
  }, other, {
    children: [label && /* @__PURE__ */ jsx(InputLabel, _extends({
      htmlFor: id,
      id: inputLabelId
    }, InputLabelProps, {
      children: label
    })), select ? /* @__PURE__ */ jsx(Select$1, _extends({
      "aria-describedby": helperTextId,
      id,
      labelId: inputLabelId,
      value,
      input: InputElement
    }, SelectProps, {
      children
    })) : InputElement, helperText && /* @__PURE__ */ jsx(FormHelperText$1, _extends({
      id: helperTextId
    }, FormHelperTextProps, {
      children: helperText
    }))]
  }));
});
var TextField$1 = TextField;
var ClearIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), "Close");
export { ClearIcon as C, TextField$1 as T, filledInputClasses$1 as f, outlinedInputClasses$1 as o };
//# sourceMappingURL=Close.js.map
