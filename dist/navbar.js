var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps = (a, b2) => __defProps(a, __getOwnPropDescs(b2));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
import { j as useId, h as useControlled, k as useEventCallback, s as setRef, I as getScrollbarSize, o as ownerDocument, A as ownerWindow, u as useForkRef, J as createChainedFunction, c as createSvgIcon, i as interopRequireDefault, r as require$$2, f as useEnhancedEffect, D as debounce, b as ButtonBase, G as createSvgIcon$1, g as getDefaultExportFromCjs, a as documents$, d as default_1$6, V as ValueSubject, K as queuedDocuments$, L as fetchingDocuments$ } from "./documents.js";
import { _ as _extends, m as generateUtilityClass, n as generateUtilityClasses, h as _objectWithoutPropertiesLoose, r as composeClasses, j as jsx, l as clsx, d as jsxs, v as keyframes, o as styled, g as capitalize, J as css, q as useThemeProps, K as lighten, L as darken, G as duration, A as rootShouldForwardProp, B as alpha, e as deepmerge, M as slotShouldForwardProp, f as formatMuiErrorMessage, F as Fragment } from "./main.js";
import { d as default_1$7 } from "./Favorite.js";
import * as React from "react";
import React__default, { useRef, useEffect, useCallback, useState, Fragment as Fragment$1 } from "react";
import { b as useNavigate, u as useParams, c as useDocOptions, d as useLocation, e as useColorModeContext, L as Link } from "./doks.js";
import { combineLatest, map, debounceTime, startWith } from "rxjs";
import { i as isHostComponent, a as useTheme, T as Transition, r as reflow, g as getTransitionProps, u as useObservableAndState } from "./use_observable_and_state.js";
import { I as IconButton, T as Typography, c as codeTheme$ } from "./markdown_renderer.js";
import { b as useSubscriptionInternal, c as useIsomorphicLayoutEffect, d as useObservableStateInternal, P as Paper, a as useObservable, u as useObservableState } from "./use-observable-state.js";
import { P as Portal, G as Grow, a as Popper, T as Tooltip } from "./Tooltip.js";
import { i as inputClasses, b as inputBaseClasses, A as ArrowDropDownIcon, u as useFormControl, c as InputBaseRoot, r as rootOverridesResolver, d as InputBaseComponent, e as inputOverridesResolver, h as InputBase, f as formControlState, n as nativeSelectSelectStyles, j as nativeSelectIconStyles, k as isFilled, N as NativeSelectInput, I as Input, F as FormControl, a as InputLabel, B as Box } from "./Input.js";
import "react-dom";
import "./index.js";
import "rxjs/operators";
function stripDiacritics(string) {
  return typeof string.normalize !== "undefined" ? string.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : string;
}
function createFilterOptions(config = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit,
    matchFrom = "any",
    stringify,
    trim = false
  } = config;
  return (options, {
    inputValue,
    getOptionLabel
  }) => {
    let input = trim ? inputValue.trim() : inputValue;
    if (ignoreCase) {
      input = input.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
    }
    const filteredOptions = options.filter((option) => {
      let candidate = (stringify || getOptionLabel)(option);
      if (ignoreCase) {
        candidate = candidate.toLowerCase();
      }
      if (ignoreAccents) {
        candidate = stripDiacritics(candidate);
      }
      return matchFrom === "start" ? candidate.indexOf(input) === 0 : candidate.indexOf(input) > -1;
    });
    return typeof limit === "number" ? filteredOptions.slice(0, limit) : filteredOptions;
  };
}
function findIndex(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }
  return -1;
}
const defaultFilterOptions = createFilterOptions();
const pageSize = 5;
function useAutocomplete(props) {
  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    disabled: disabledProp,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    componentName = "useAutocomplete",
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabledItemsFocusable = false,
    disableListWrap = false,
    filterOptions = defaultFilterOptions,
    filterSelectedOptions = false,
    freeSolo = false,
    getOptionDisabled,
    getOptionLabel: getOptionLabelProp = (option) => {
      var _option$label;
      return (_option$label = option.label) != null ? _option$label : option;
    },
    isOptionEqualToValue = (option, value2) => option === value2,
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    multiple = false,
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open: openProp,
    openOnFocus = false,
    options,
    selectOnFocus = !props.freeSolo,
    value: valueProp
  } = props;
  const id = useId(idProp);
  let getOptionLabel = getOptionLabelProp;
  getOptionLabel = (option) => {
    const optionLabel = getOptionLabelProp(option);
    if (typeof optionLabel !== "string") {
      return String(optionLabel);
    }
    return optionLabel;
  };
  const ignoreFocus = React.useRef(false);
  const firstFocus = React.useRef(true);
  const inputRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [focusedTag, setFocusedTag] = React.useState(-1);
  const defaultHighlighted = autoHighlight ? 0 : -1;
  const highlightedIndexRef = React.useRef(defaultHighlighted);
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: componentName
  });
  const [inputValue, setInputValueState] = useControlled({
    controlled: inputValueProp,
    default: "",
    name: componentName,
    state: "inputValue"
  });
  const [focused, setFocused] = React.useState(false);
  const resetInputValue = React.useCallback((event, newValue) => {
    const isOptionSelected = multiple ? value.length < newValue.length : newValue !== null;
    if (!isOptionSelected && !clearOnBlur) {
      return;
    }
    let newInputValue;
    if (multiple) {
      newInputValue = "";
    } else if (newValue == null) {
      newInputValue = "";
    } else {
      const optionLabel = getOptionLabel(newValue);
      newInputValue = typeof optionLabel === "string" ? optionLabel : "";
    }
    if (inputValue === newInputValue) {
      return;
    }
    setInputValueState(newInputValue);
    if (onInputChange) {
      onInputChange(event, newInputValue, "reset");
    }
  }, [getOptionLabel, inputValue, multiple, onInputChange, setInputValueState, clearOnBlur, value]);
  const prevValue = React.useRef();
  React.useEffect(() => {
    const valueChange = value !== prevValue.current;
    prevValue.current = value;
    if (focused && !valueChange) {
      return;
    }
    if (freeSolo && !valueChange) {
      return;
    }
    resetInputValue(null, value);
  }, [value, resetInputValue, focused, prevValue, freeSolo]);
  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: componentName,
    state: "open"
  });
  const [inputPristine, setInputPristine] = React.useState(true);
  const inputValueIsSelectedValue = !multiple && value != null && inputValue === getOptionLabel(value);
  const popupOpen = open;
  const filteredOptions = popupOpen ? filterOptions(options.filter((option) => {
    if (filterSelectedOptions && (multiple ? value : [value]).some((value2) => value2 !== null && isOptionEqualToValue(option, value2))) {
      return false;
    }
    return true;
  }), {
    inputValue: inputValueIsSelectedValue && inputPristine ? "" : inputValue,
    getOptionLabel
  }) : [];
  const listboxAvailable = open && filteredOptions.length > 0;
  const focusTag = useEventCallback((tagToFocus) => {
    if (tagToFocus === -1) {
      inputRef.current.focus();
    } else {
      anchorEl.querySelector(`[data-tag-index="${tagToFocus}"]`).focus();
    }
  });
  React.useEffect(() => {
    if (multiple && focusedTag > value.length - 1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
  }, [value, multiple, focusedTag, focusTag]);
  function validOptionIndex(index2, direction) {
    if (!listboxRef.current || index2 === -1) {
      return -1;
    }
    let nextFocus = index2;
    while (true) {
      if (direction === "next" && nextFocus === filteredOptions.length || direction === "previous" && nextFocus === -1) {
        return -1;
      }
      const option = listboxRef.current.querySelector(`[data-option-index="${nextFocus}"]`);
      const nextFocusDisabled = disabledItemsFocusable ? false : !option || option.disabled || option.getAttribute("aria-disabled") === "true";
      if (option && !option.hasAttribute("tabindex") || nextFocusDisabled) {
        nextFocus += direction === "next" ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }
  const setHighlightedIndex = useEventCallback(({
    event,
    index: index2,
    reason = "auto"
  }) => {
    highlightedIndexRef.current = index2;
    if (index2 === -1) {
      inputRef.current.removeAttribute("aria-activedescendant");
    } else {
      inputRef.current.setAttribute("aria-activedescendant", `${id}-option-${index2}`);
    }
    if (onHighlightChange) {
      onHighlightChange(event, index2 === -1 ? null : filteredOptions[index2], reason);
    }
    if (!listboxRef.current) {
      return;
    }
    const prev = listboxRef.current.querySelector('[role="option"].Mui-focused');
    if (prev) {
      prev.classList.remove("Mui-focused");
      prev.classList.remove("Mui-focusVisible");
    }
    const listboxNode = listboxRef.current.parentElement.querySelector('[role="listbox"]');
    if (!listboxNode) {
      return;
    }
    if (index2 === -1) {
      listboxNode.scrollTop = 0;
      return;
    }
    const option = listboxRef.current.querySelector(`[data-option-index="${index2}"]`);
    if (!option) {
      return;
    }
    option.classList.add("Mui-focused");
    if (reason === "keyboard") {
      option.classList.add("Mui-focusVisible");
    }
    if (listboxNode.scrollHeight > listboxNode.clientHeight && reason !== "mouse") {
      const element = option;
      const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
      const elementBottom = element.offsetTop + element.offsetHeight;
      if (elementBottom > scrollBottom) {
        listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
      } else if (element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0) < listboxNode.scrollTop) {
        listboxNode.scrollTop = element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0);
      }
    }
  });
  const changeHighlightedIndex = useEventCallback(({
    event,
    diff,
    direction = "next",
    reason = "auto"
  }) => {
    if (!popupOpen) {
      return;
    }
    const getNextIndex = () => {
      const maxIndex = filteredOptions.length - 1;
      if (diff === "reset") {
        return defaultHighlighted;
      }
      if (diff === "start") {
        return 0;
      }
      if (diff === "end") {
        return maxIndex;
      }
      const newIndex = highlightedIndexRef.current + diff;
      if (newIndex < 0) {
        if (newIndex === -1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap && highlightedIndexRef.current !== -1 || Math.abs(diff) > 1) {
          return 0;
        }
        return maxIndex;
      }
      if (newIndex > maxIndex) {
        if (newIndex === maxIndex + 1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap || Math.abs(diff) > 1) {
          return maxIndex;
        }
        return 0;
      }
      return newIndex;
    };
    const nextIndex = validOptionIndex(getNextIndex(), direction);
    setHighlightedIndex({
      index: nextIndex,
      reason,
      event
    });
    if (autoComplete && diff !== "reset") {
      if (nextIndex === -1) {
        inputRef.current.value = inputValue;
      } else {
        const option = getOptionLabel(filteredOptions[nextIndex]);
        inputRef.current.value = option;
        const index2 = option.toLowerCase().indexOf(inputValue.toLowerCase());
        if (index2 === 0 && inputValue.length > 0) {
          inputRef.current.setSelectionRange(inputValue.length, option.length);
        }
      }
    }
  });
  const syncHighlightedIndex = React.useCallback(() => {
    if (!popupOpen) {
      return;
    }
    const valueItem = multiple ? value[0] : value;
    if (filteredOptions.length === 0 || valueItem == null) {
      changeHighlightedIndex({
        diff: "reset"
      });
      return;
    }
    if (!listboxRef.current) {
      return;
    }
    if (valueItem != null) {
      const currentOption = filteredOptions[highlightedIndexRef.current];
      if (multiple && currentOption && findIndex(value, (val) => isOptionEqualToValue(currentOption, val)) !== -1) {
        return;
      }
      const itemIndex = findIndex(filteredOptions, (optionItem) => isOptionEqualToValue(optionItem, valueItem));
      if (itemIndex === -1) {
        changeHighlightedIndex({
          diff: "reset"
        });
      } else {
        setHighlightedIndex({
          index: itemIndex
        });
      }
      return;
    }
    if (highlightedIndexRef.current >= filteredOptions.length - 1) {
      setHighlightedIndex({
        index: filteredOptions.length - 1
      });
      return;
    }
    setHighlightedIndex({
      index: highlightedIndexRef.current
    });
  }, [
    filteredOptions.length,
    multiple ? false : value,
    filterSelectedOptions,
    changeHighlightedIndex,
    setHighlightedIndex,
    popupOpen,
    inputValue,
    multiple
  ]);
  const handleListboxRef = useEventCallback((node) => {
    setRef(listboxRef, node);
    if (!node) {
      return;
    }
    syncHighlightedIndex();
  });
  React.useEffect(() => {
    syncHighlightedIndex();
  }, [syncHighlightedIndex]);
  const handleOpen = (event) => {
    if (open) {
      return;
    }
    setOpenState(true);
    setInputPristine(true);
    if (onOpen) {
      onOpen(event);
    }
  };
  const handleClose = (event, reason) => {
    if (!open) {
      return;
    }
    setOpenState(false);
    if (onClose) {
      onClose(event, reason);
    }
  };
  const handleValue = (event, newValue, reason, details) => {
    if (value === newValue) {
      return;
    }
    if (onChange) {
      onChange(event, newValue, reason, details);
    }
    setValueState(newValue);
  };
  const isTouch = React.useRef(false);
  const selectNewValue = (event, option, reasonProp = "selectOption", origin = "options") => {
    let reason = reasonProp;
    let newValue = option;
    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      const itemIndex = findIndex(newValue, (valueItem) => isOptionEqualToValue(option, valueItem));
      if (itemIndex === -1) {
        newValue.push(option);
      } else if (origin !== "freeSolo") {
        newValue.splice(itemIndex, 1);
        reason = "removeOption";
      }
    }
    resetInputValue(event, newValue);
    handleValue(event, newValue, reason, {
      option
    });
    if (!disableCloseOnSelect && !event.ctrlKey && !event.metaKey) {
      handleClose(event, reason);
    }
    if (blurOnSelect === true || blurOnSelect === "touch" && isTouch.current || blurOnSelect === "mouse" && !isTouch.current) {
      inputRef.current.blur();
    }
  };
  function validTagIndex(index2, direction) {
    if (index2 === -1) {
      return -1;
    }
    let nextFocus = index2;
    while (true) {
      if (direction === "next" && nextFocus === value.length || direction === "previous" && nextFocus === -1) {
        return -1;
      }
      const option = anchorEl.querySelector(`[data-tag-index="${nextFocus}"]`);
      if (!option || !option.hasAttribute("tabindex") || option.disabled || option.getAttribute("aria-disabled") === "true") {
        nextFocus += direction === "next" ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }
  const handleFocusTag = (event, direction) => {
    if (!multiple) {
      return;
    }
    handleClose(event, "toggleInput");
    let nextTag = focusedTag;
    if (focusedTag === -1) {
      if (inputValue === "" && direction === "previous") {
        nextTag = value.length - 1;
      }
    } else {
      nextTag += direction === "next" ? 1 : -1;
      if (nextTag < 0) {
        nextTag = 0;
      }
      if (nextTag === value.length) {
        nextTag = -1;
      }
    }
    nextTag = validTagIndex(nextTag, direction);
    setFocusedTag(nextTag);
    focusTag(nextTag);
  };
  const handleClear = (event) => {
    ignoreFocus.current = true;
    setInputValueState("");
    if (onInputChange) {
      onInputChange(event, "", "clear");
    }
    handleValue(event, multiple ? [] : null, "clear");
  };
  const handleKeyDown = (other) => (event) => {
    if (other.onKeyDown) {
      other.onKeyDown(event);
    }
    if (event.defaultMuiPrevented) {
      return;
    }
    if (focusedTag !== -1 && ["ArrowLeft", "ArrowRight"].indexOf(event.key) === -1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
    if (event.which !== 229) {
      switch (event.key) {
        case "Home":
          if (popupOpen && handleHomeEndKeys) {
            event.preventDefault();
            changeHighlightedIndex({
              diff: "start",
              direction: "next",
              reason: "keyboard",
              event
            });
          }
          break;
        case "End":
          if (popupOpen && handleHomeEndKeys) {
            event.preventDefault();
            changeHighlightedIndex({
              diff: "end",
              direction: "previous",
              reason: "keyboard",
              event
            });
          }
          break;
        case "PageUp":
          event.preventDefault();
          changeHighlightedIndex({
            diff: -pageSize,
            direction: "previous",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "PageDown":
          event.preventDefault();
          changeHighlightedIndex({
            diff: pageSize,
            direction: "next",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowDown":
          event.preventDefault();
          changeHighlightedIndex({
            diff: 1,
            direction: "next",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowUp":
          event.preventDefault();
          changeHighlightedIndex({
            diff: -1,
            direction: "previous",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowLeft":
          handleFocusTag(event, "previous");
          break;
        case "ArrowRight":
          handleFocusTag(event, "next");
          break;
        case "Enter":
          if (highlightedIndexRef.current !== -1 && popupOpen) {
            const option = filteredOptions[highlightedIndexRef.current];
            const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
            event.preventDefault();
            if (disabled) {
              return;
            }
            selectNewValue(event, option, "selectOption");
            if (autoComplete) {
              inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
            }
          } else if (freeSolo && inputValue !== "" && inputValueIsSelectedValue === false) {
            if (multiple) {
              event.preventDefault();
            }
            selectNewValue(event, inputValue, "createOption", "freeSolo");
          }
          break;
        case "Escape":
          if (popupOpen) {
            event.preventDefault();
            event.stopPropagation();
            handleClose(event, "escape");
          } else if (clearOnEscape && (inputValue !== "" || multiple && value.length > 0)) {
            event.preventDefault();
            event.stopPropagation();
            handleClear(event);
          }
          break;
        case "Backspace":
          if (multiple && inputValue === "" && value.length > 0) {
            const index2 = focusedTag === -1 ? value.length - 1 : focusedTag;
            const newValue = value.slice();
            newValue.splice(index2, 1);
            handleValue(event, newValue, "removeOption", {
              option: value[index2]
            });
          }
          break;
      }
    }
  };
  const handleFocus = (event) => {
    setFocused(true);
    if (openOnFocus && !ignoreFocus.current) {
      handleOpen(event);
    }
  };
  const handleBlur = (event) => {
    if (listboxRef.current !== null && listboxRef.current.parentElement.contains(document.activeElement)) {
      inputRef.current.focus();
      return;
    }
    setFocused(false);
    firstFocus.current = true;
    ignoreFocus.current = false;
    if (autoSelect && highlightedIndexRef.current !== -1 && popupOpen) {
      selectNewValue(event, filteredOptions[highlightedIndexRef.current], "blur");
    } else if (autoSelect && freeSolo && inputValue !== "") {
      selectNewValue(event, inputValue, "blur", "freeSolo");
    } else if (clearOnBlur) {
      resetInputValue(event, value);
    }
    handleClose(event, "blur");
  };
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    if (inputValue !== newValue) {
      setInputValueState(newValue);
      setInputPristine(false);
      if (onInputChange) {
        onInputChange(event, newValue, "input");
      }
    }
    if (newValue === "") {
      if (!disableClearable && !multiple) {
        handleValue(event, null, "clear");
      }
    } else {
      handleOpen(event);
    }
  };
  const handleOptionMouseOver = (event) => {
    setHighlightedIndex({
      event,
      index: Number(event.currentTarget.getAttribute("data-option-index")),
      reason: "mouse"
    });
  };
  const handleOptionTouchStart = () => {
    isTouch.current = true;
  };
  const handleOptionClick = (event) => {
    const index2 = Number(event.currentTarget.getAttribute("data-option-index"));
    selectNewValue(event, filteredOptions[index2], "selectOption");
    isTouch.current = false;
  };
  const handleTagDelete = (index2) => (event) => {
    const newValue = value.slice();
    newValue.splice(index2, 1);
    handleValue(event, newValue, "removeOption", {
      option: value[index2]
    });
  };
  const handlePopupIndicator = (event) => {
    if (open) {
      handleClose(event, "toggleInput");
    } else {
      handleOpen(event);
    }
  };
  const handleMouseDown = (event) => {
    if (event.target.getAttribute("id") !== id) {
      event.preventDefault();
    }
  };
  const handleClick = () => {
    inputRef.current.focus();
    if (selectOnFocus && firstFocus.current && inputRef.current.selectionEnd - inputRef.current.selectionStart === 0) {
      inputRef.current.select();
    }
    firstFocus.current = false;
  };
  const handleInputMouseDown = (event) => {
    if (inputValue === "" || !open) {
      handlePopupIndicator(event);
    }
  };
  let dirty = freeSolo && inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : value !== null);
  let groupedOptions = filteredOptions;
  if (groupBy) {
    groupedOptions = filteredOptions.reduce((acc, option, index2) => {
      const group = groupBy(option);
      if (acc.length > 0 && acc[acc.length - 1].group === group) {
        acc[acc.length - 1].options.push(option);
      } else {
        acc.push({
          key: index2,
          index: index2,
          group,
          options: [option]
        });
      }
      return acc;
    }, []);
  }
  if (disabledProp && focused) {
    handleBlur();
  }
  return {
    getRootProps: (other = {}) => _extends({
      "aria-owns": listboxAvailable ? `${id}-listbox` : null,
      role: "combobox",
      "aria-expanded": listboxAvailable
    }, other, {
      onKeyDown: handleKeyDown(other),
      onMouseDown: handleMouseDown,
      onClick: handleClick
    }),
    getInputLabelProps: () => ({
      id: `${id}-label`,
      htmlFor: id
    }),
    getInputProps: () => ({
      id,
      value: inputValue,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onChange: handleInputChange,
      onMouseDown: handleInputMouseDown,
      "aria-activedescendant": popupOpen ? "" : null,
      "aria-autocomplete": autoComplete ? "both" : "list",
      "aria-controls": listboxAvailable ? `${id}-listbox` : null,
      autoComplete: "off",
      ref: inputRef,
      autoCapitalize: "none",
      spellCheck: "false"
    }),
    getClearProps: () => ({
      tabIndex: -1,
      onClick: handleClear
    }),
    getPopupIndicatorProps: () => ({
      tabIndex: -1,
      onClick: handlePopupIndicator
    }),
    getTagProps: ({
      index: index2
    }) => ({
      key: index2,
      "data-tag-index": index2,
      tabIndex: -1,
      onDelete: handleTagDelete(index2)
    }),
    getListboxProps: () => ({
      role: "listbox",
      id: `${id}-listbox`,
      "aria-labelledby": `${id}-label`,
      ref: handleListboxRef,
      onMouseDown: (event) => {
        event.preventDefault();
      }
    }),
    getOptionProps: ({
      index: index2,
      option
    }) => {
      const selected = (multiple ? value : [value]).some((value2) => value2 != null && isOptionEqualToValue(option, value2));
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
      return {
        key: getOptionLabel(option),
        tabIndex: -1,
        role: "option",
        id: `${id}-option-${index2}`,
        onMouseOver: handleOptionMouseOver,
        onClick: handleOptionClick,
        onTouchStart: handleOptionTouchStart,
        "data-option-index": index2,
        "aria-disabled": disabled,
        "aria-selected": selected
      };
    },
    id,
    inputValue,
    value,
    dirty,
    popupOpen,
    focused: focused || focusedTag !== -1,
    anchorEl,
    setAnchorEl,
    focusedTag,
    groupedOptions
  };
}
function getBackdropUtilityClass(slot) {
  return generateUtilityClass("MuiBackdrop", slot);
}
generateUtilityClasses("MuiBackdrop", ["root", "invisible"]);
const _excluded$q = ["classes", "className", "invisible", "component", "components", "componentsProps", "theme"];
const useUtilityClasses$l = (ownerState) => {
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$q);
  const ownerState = _extends({}, props, {
    classes: classesProp,
    invisible
  });
  const classes = useUtilityClasses$l(ownerState);
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
  items.some((item, index2) => {
    if (callback(item)) {
      idx = index2;
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
  return orderedTabNodes.sort((a, b2) => a.tabIndex === b2.tabIndex ? a.documentOrder - b2.documentOrder : a.tabIndex - b2.tabIndex).map((a) => a.node).concat(regularTabNodes);
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
const _excluded$p = ["BackdropComponent", "BackdropProps", "children", "classes", "className", "closeAfterTransition", "component", "components", "componentsProps", "container", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "manager", "onBackdropClick", "onClose", "onKeyDown", "open", "theme", "onTransitionEnter", "onTransitionExited"];
const useUtilityClasses$k = (ownerState) => {
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$p);
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
  const classes = useUtilityClasses$k(ownerState);
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
function useLayoutSubscription(input$, observerOrNext$, error, complete) {
  return useSubscriptionInternal(useIsomorphicLayoutEffect, [
    input$,
    observerOrNext$,
    error,
    complete
  ]);
}
function useLayoutObservableState(state$OrInit, initialState) {
  return useObservableStateInternal(useLayoutSubscription, state$OrInit, initialState);
}
var Code = {};
var _interopRequireDefault$5 = interopRequireDefault.exports;
Object.defineProperty(Code, "__esModule", {
  value: true
});
var default_1$5 = Code.default = void 0;
var _createSvgIcon$5 = _interopRequireDefault$5(createSvgIcon);
var _jsxRuntime$5 = require$$2;
var _default$5 = (0, _createSvgIcon$5.default)(/* @__PURE__ */ (0, _jsxRuntime$5.jsx)("path", {
  d: "M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
}), "Code");
default_1$5 = Code.default = _default$5;
var Edit = {};
var _interopRequireDefault$4 = interopRequireDefault.exports;
Object.defineProperty(Edit, "__esModule", {
  value: true
});
var default_1$4 = Edit.default = void 0;
var _createSvgIcon$4 = _interopRequireDefault$4(createSvgIcon);
var _jsxRuntime$4 = require$$2;
var _default$4 = (0, _createSvgIcon$4.default)(/* @__PURE__ */ (0, _jsxRuntime$4.jsx)("path", {
  d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
}), "Edit");
default_1$4 = Edit.default = _default$4;
var PostAdd = {};
var _interopRequireDefault$3 = interopRequireDefault.exports;
Object.defineProperty(PostAdd, "__esModule", {
  value: true
});
var default_1$3 = PostAdd.default = void 0;
var _createSvgIcon$3 = _interopRequireDefault$3(createSvgIcon);
var _jsxRuntime$3 = require$$2;
var _default$3 = (0, _createSvgIcon$3.default)([/* @__PURE__ */ (0, _jsxRuntime$3.jsx)("path", {
  d: "M17 19.22H5V7h7V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2v7.22z"
}, "0"), /* @__PURE__ */ (0, _jsxRuntime$3.jsx)("path", {
  d: "M19 2h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V7h3V5h-3V2zM7 9h8v2H7zm0 3v2h8v-2h-3zm0 3h8v2H7z"
}, "1")], "PostAdd");
default_1$3 = PostAdd.default = _default$3;
var Search = {};
var _interopRequireDefault$2 = interopRequireDefault.exports;
Object.defineProperty(Search, "__esModule", {
  value: true
});
var default_1$2 = Search.default = void 0;
var _createSvgIcon$2 = _interopRequireDefault$2(createSvgIcon);
var _jsxRuntime$2 = require$$2;
var _default$2 = (0, _createSvgIcon$2.default)(/* @__PURE__ */ (0, _jsxRuntime$2.jsx)("path", {
  d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
}), "Search");
default_1$2 = Search.default = _default$2;
function getLinearProgressUtilityClass(slot) {
  return generateUtilityClass("MuiLinearProgress", slot);
}
generateUtilityClasses("MuiLinearProgress", ["root", "colorPrimary", "colorSecondary", "determinate", "indeterminate", "buffer", "query", "dashed", "dashedColorPrimary", "dashedColorSecondary", "bar", "barColorPrimary", "barColorSecondary", "bar1Indeterminate", "bar1Determinate", "bar1Buffer", "bar2Indeterminate", "bar2Buffer"]);
const _excluded$o = ["className", "color", "value", "valueBuffer", "variant"];
let _ = (t) => t, _t, _t2, _t3, _t4, _t5, _t6;
const TRANSITION_DURATION = 4;
const indeterminate1Keyframe = keyframes(_t || (_t = _`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`));
const indeterminate2Keyframe = keyframes(_t2 || (_t2 = _`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`));
const bufferKeyframe = keyframes(_t3 || (_t3 = _`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`));
const useUtilityClasses$j = (ownerState) => {
  const {
    classes,
    variant,
    color
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color)}`, variant],
    dashed: ["dashed", `dashedColor${capitalize(color)}`],
    bar1: ["bar", `barColor${capitalize(color)}`, (variant === "indeterminate" || variant === "query") && "bar1Indeterminate", variant === "determinate" && "bar1Determinate", variant === "buffer" && "bar1Buffer"],
    bar2: ["bar", variant !== "buffer" && `barColor${capitalize(color)}`, variant === "buffer" && `color${capitalize(color)}`, (variant === "indeterminate" || variant === "query") && "bar2Indeterminate", variant === "buffer" && "bar2Buffer"]
  };
  return composeClasses(slots, getLinearProgressUtilityClass, classes);
};
const getColorShade = (theme, color) => {
  if (color === "inherit") {
    return "currentColor";
  }
  return theme.palette.mode === "light" ? lighten(theme.palette[color].main, 0.62) : darken(theme.palette[color].main, 0.5);
};
const LinearProgressRoot = styled("span", {
  name: "MuiLinearProgress",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[`color${capitalize(ownerState.color)}`], styles2[ownerState.variant]];
  }
})(({
  ownerState,
  theme
}) => _extends({
  position: "relative",
  overflow: "hidden",
  display: "block",
  height: 4,
  zIndex: 0,
  "@media print": {
    colorAdjust: "exact"
  },
  backgroundColor: getColorShade(theme, ownerState.color)
}, ownerState.color === "inherit" && ownerState.variant !== "buffer" && {
  backgroundColor: "none",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "currentColor",
    opacity: 0.3
  }
}, ownerState.variant === "buffer" && {
  backgroundColor: "transparent"
}, ownerState.variant === "query" && {
  transform: "rotate(180deg)"
}));
const LinearProgressDashed = styled("span", {
  name: "MuiLinearProgress",
  slot: "Dashed",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.dashed, styles2[`dashedColor${capitalize(ownerState.color)}`]];
  }
})(({
  ownerState,
  theme
}) => {
  const backgroundColor = getColorShade(theme, ownerState.color);
  return _extends({
    position: "absolute",
    marginTop: 0,
    height: "100%",
    width: "100%"
  }, ownerState.color === "inherit" && {
    opacity: 0.3
  }, {
    backgroundImage: `radial-gradient(${backgroundColor} 0%, ${backgroundColor} 16%, transparent 42%)`,
    backgroundSize: "10px 10px",
    backgroundPosition: "0 -23px"
  });
}, css(_t4 || (_t4 = _`
    animation: ${0} 3s infinite linear;
  `), bufferKeyframe));
const LinearProgressBar1 = styled("span", {
  name: "MuiLinearProgress",
  slot: "Bar1",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.bar, styles2[`barColor${capitalize(ownerState.color)}`], (ownerState.variant === "indeterminate" || ownerState.variant === "query") && styles2.bar1Indeterminate, ownerState.variant === "determinate" && styles2.bar1Determinate, ownerState.variant === "buffer" && styles2.bar1Buffer];
  }
})(({
  ownerState,
  theme
}) => _extends({
  width: "100%",
  position: "absolute",
  left: 0,
  bottom: 0,
  top: 0,
  transition: "transform 0.2s linear",
  transformOrigin: "left",
  backgroundColor: ownerState.color === "inherit" ? "currentColor" : theme.palette[ownerState.color].main
}, ownerState.variant === "determinate" && {
  transition: `transform .${TRANSITION_DURATION}s linear`
}, ownerState.variant === "buffer" && {
  zIndex: 1,
  transition: `transform .${TRANSITION_DURATION}s linear`
}), ({
  ownerState
}) => (ownerState.variant === "indeterminate" || ownerState.variant === "query") && css(_t5 || (_t5 = _`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `), indeterminate1Keyframe));
const LinearProgressBar2 = styled("span", {
  name: "MuiLinearProgress",
  slot: "Bar2",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.bar, styles2[`barColor${capitalize(ownerState.color)}`], (ownerState.variant === "indeterminate" || ownerState.variant === "query") && styles2.bar2Indeterminate, ownerState.variant === "buffer" && styles2.bar2Buffer];
  }
})(({
  ownerState,
  theme
}) => _extends({
  width: "100%",
  position: "absolute",
  left: 0,
  bottom: 0,
  top: 0,
  transition: "transform 0.2s linear",
  transformOrigin: "left"
}, ownerState.variant !== "buffer" && {
  backgroundColor: ownerState.color === "inherit" ? "currentColor" : theme.palette[ownerState.color].main
}, ownerState.color === "inherit" && {
  opacity: 0.3
}, ownerState.variant === "buffer" && {
  backgroundColor: getColorShade(theme, ownerState.color),
  transition: `transform .${TRANSITION_DURATION}s linear`
}), ({
  ownerState
}) => (ownerState.variant === "indeterminate" || ownerState.variant === "query") && css(_t6 || (_t6 = _`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `), indeterminate2Keyframe));
const LinearProgress = /* @__PURE__ */ React.forwardRef(function LinearProgress2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiLinearProgress"
  });
  const {
    className,
    color = "primary",
    value,
    valueBuffer,
    variant = "indeterminate"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$o);
  const ownerState = _extends({}, props, {
    color,
    variant
  });
  const classes = useUtilityClasses$j(ownerState);
  const theme = useTheme();
  const rootProps = {};
  const inlineStyles = {
    bar1: {},
    bar2: {}
  };
  if (variant === "determinate" || variant === "buffer") {
    if (value !== void 0) {
      rootProps["aria-valuenow"] = Math.round(value);
      rootProps["aria-valuemin"] = 0;
      rootProps["aria-valuemax"] = 100;
      let transform = value - 100;
      if (theme.direction === "rtl") {
        transform = -transform;
      }
      inlineStyles.bar1.transform = `translateX(${transform}%)`;
    }
  }
  if (variant === "buffer") {
    if (valueBuffer !== void 0) {
      let transform = (valueBuffer || 0) - 100;
      if (theme.direction === "rtl") {
        transform = -transform;
      }
      inlineStyles.bar2.transform = `translateX(${transform}%)`;
    }
  }
  return /* @__PURE__ */ jsxs(LinearProgressRoot, _extends({
    className: clsx(classes.root, className),
    ownerState,
    role: "progressbar"
  }, rootProps, {
    ref
  }, other, {
    children: [variant === "buffer" ? /* @__PURE__ */ jsx(LinearProgressDashed, {
      className: classes.dashed,
      ownerState
    }) : null, /* @__PURE__ */ jsx(LinearProgressBar1, {
      className: classes.bar1,
      ownerState,
      style: inlineStyles.bar1
    }), variant === "determinate" ? null : /* @__PURE__ */ jsx(LinearProgressBar2, {
      className: classes.bar2,
      ownerState,
      style: inlineStyles.bar2
    })]
  }));
});
var LinearProgress$1 = LinearProgress;
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
const ListContext = /* @__PURE__ */ React.createContext({});
var ListContext$1 = ListContext;
function getListUtilityClass(slot) {
  return generateUtilityClass("MuiList", slot);
}
generateUtilityClasses("MuiList", ["root", "padding", "dense", "subheader"]);
const _excluded$n = ["children", "className", "component", "dense", "disablePadding", "subheader"];
const useUtilityClasses$i = (ownerState) => {
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$n);
  const context = React.useMemo(() => ({
    dense
  }), [dense]);
  const ownerState = _extends({}, props, {
    component,
    dense,
    disablePadding
  });
  const classes = useUtilityClasses$i(ownerState);
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
const _excluded$m = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$m);
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
  React.Children.forEach(children, (child, index2) => {
    if (!/* @__PURE__ */ React.isValidElement(child)) {
      return;
    }
    if (!child.props.disabled) {
      if (variant === "selectedMenu" && child.props.selected) {
        activeItemIndex = index2;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index2;
      }
    }
  });
  const items = React.Children.map(children, (child, index2) => {
    if (index2 === activeItemIndex) {
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
const _excluded$l = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
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
    style: style2,
    timeout = defaultTimeout,
    TransitionComponent = Transition
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$l);
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
      style: style2,
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
      style: style2,
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
        }, styles[state], style2, children.props.style),
        ref: handleRef
      }, childProps));
    }
  }));
});
var Fade$1 = Fade;
const _excluded$k = ["children", "components", "componentsProps", "className", "invisible", "open", "transitionDuration", "TransitionComponent"];
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$k);
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
const _excluded$j = ["BackdropComponent", "closeAfterTransition", "children", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted"];
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$j);
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
const _excluded$i = ["onEntering"], _excluded2$2 = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps"];
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
  return [transformOrigin.horizontal, transformOrigin.vertical].map((n2) => typeof n2 === "number" ? `${n2}px` : n2).join(" ");
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
const useUtilityClasses$h = (ownerState) => {
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
  } = props, TransitionProps = _objectWithoutPropertiesLoose(props.TransitionProps, _excluded$i), other = _objectWithoutPropertiesLoose(props, _excluded2$2);
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
  const classes = useUtilityClasses$h(ownerState);
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
const _excluded$h = ["onEntering"], _excluded2$1 = ["autoFocus", "children", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant"];
const RTL_ORIGIN = {
  vertical: "top",
  horizontal: "right"
};
const LTR_ORIGIN = {
  vertical: "top",
  horizontal: "left"
};
const useUtilityClasses$g = (ownerState) => {
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
  } = props, TransitionProps = _objectWithoutPropertiesLoose(props.TransitionProps, _excluded$h), other = _objectWithoutPropertiesLoose(props, _excluded2$1);
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
  const classes = useUtilityClasses$g(ownerState);
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
  React.Children.map(children, (child, index2) => {
    if (!/* @__PURE__ */ React.isValidElement(child)) {
      return;
    }
    if (!child.props.disabled) {
      if (variant === "selectedMenu" && child.props.selected) {
        activeItemIndex = index2;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index2;
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
const dividerClasses = generateUtilityClasses("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "light", "vertical", "withChildren", "withChildrenVertical", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]);
var dividerClasses$1 = dividerClasses;
const listItemIconClasses = generateUtilityClasses("MuiListItemIcon", ["root", "alignItemsFlexStart"]);
var listItemIconClasses$1 = listItemIconClasses;
const listItemTextClasses = generateUtilityClasses("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]);
var listItemTextClasses$1 = listItemTextClasses;
function getMenuItemUtilityClass(slot) {
  return generateUtilityClass("MuiMenuItem", slot);
}
const menuItemClasses = generateUtilityClasses("MuiMenuItem", ["root", "focusVisible", "dense", "disabled", "divider", "gutters", "selected"]);
var menuItemClasses$1 = menuItemClasses;
const _excluded$g = ["autoFocus", "component", "dense", "divider", "disableGutters", "focusVisibleClassName", "role", "tabIndex"];
const overridesResolver = (props, styles2) => {
  const {
    ownerState
  } = props;
  return [styles2.root, ownerState.dense && styles2.dense, ownerState.divider && styles2.divider, !ownerState.disableGutters && styles2.gutters];
};
const useUtilityClasses$f = (ownerState) => {
  const {
    disabled,
    dense,
    divider,
    disableGutters,
    selected,
    classes
  } = ownerState;
  const slots = {
    root: ["root", dense && "dense", disabled && "disabled", !disableGutters && "gutters", divider && "divider", selected && "selected"]
  };
  const composedClasses = composeClasses(slots, getMenuItemUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
const MenuItemRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiMenuItem",
  slot: "Root",
  overridesResolver
})(({
  theme,
  ownerState
}) => _extends({}, theme.typography.body1, {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: "border-box",
  whiteSpace: "nowrap"
}, !ownerState.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, ownerState.divider && {
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundClip: "padding-box"
}, {
  "&:hover": {
    textDecoration: "none",
    backgroundColor: theme.palette.action.hover,
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  [`&.${menuItemClasses$1.selected}`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${menuItemClasses$1.focusVisible}`]: {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  },
  [`&.${menuItemClasses$1.selected}:hover`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  },
  [`&.${menuItemClasses$1.focusVisible}`]: {
    backgroundColor: theme.palette.action.focus
  },
  [`&.${menuItemClasses$1.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity
  },
  [`& + .${dividerClasses$1.root}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  [`& + .${dividerClasses$1.inset}`]: {
    marginLeft: 52
  },
  [`& .${listItemTextClasses$1.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${listItemTextClasses$1.inset}`]: {
    paddingLeft: 36
  },
  [`& .${listItemIconClasses$1.root}`]: {
    minWidth: 36
  }
}, !ownerState.dense && {
  [theme.breakpoints.up("sm")]: {
    minHeight: "auto"
  }
}, ownerState.dense && _extends({
  minHeight: 32,
  paddingTop: 4,
  paddingBottom: 4
}, theme.typography.body2, {
  [`& .${listItemIconClasses$1.root} svg`]: {
    fontSize: "1.25rem"
  }
})));
const MenuItem = /* @__PURE__ */ React.forwardRef(function MenuItem2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiMenuItem"
  });
  const {
    autoFocus = false,
    component = "li",
    dense = false,
    divider = false,
    disableGutters = false,
    focusVisibleClassName,
    role = "menuitem",
    tabIndex: tabIndexProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$g);
  const context = React.useContext(ListContext$1);
  const childContext = {
    dense: dense || context.dense || false,
    disableGutters
  };
  const menuItemRef = React.useRef(null);
  useEnhancedEffect(() => {
    if (autoFocus) {
      if (menuItemRef.current) {
        menuItemRef.current.focus();
      }
    }
  }, [autoFocus]);
  const ownerState = _extends({}, props, {
    dense: childContext.dense,
    divider,
    disableGutters
  });
  const classes = useUtilityClasses$f(props);
  const handleRef = useForkRef(menuItemRef, ref);
  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== void 0 ? tabIndexProp : -1;
  }
  return /* @__PURE__ */ jsx(ListContext$1.Provider, {
    value: childContext,
    children: /* @__PURE__ */ jsx(MenuItemRoot, _extends({
      ref: handleRef,
      role,
      tabIndex,
      component,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName)
    }, other, {
      ownerState,
      classes
    }))
  });
});
var MenuItem$1 = MenuItem;
function getAppBarUtilityClass(slot) {
  return generateUtilityClass("MuiAppBar", slot);
}
generateUtilityClasses("MuiAppBar", ["root", "positionFixed", "positionAbsolute", "positionSticky", "positionStatic", "positionRelative", "colorDefault", "colorPrimary", "colorSecondary", "colorInherit", "colorTransparent"]);
const _excluded$f = ["className", "color", "enableColorOnDark", "position"];
const useUtilityClasses$e = (ownerState) => {
  const {
    color,
    position,
    classes
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color)}`, `position${capitalize(position)}`]
  };
  return composeClasses(slots, getAppBarUtilityClass, classes);
};
const AppBarRoot = styled(Paper, {
  name: "MuiAppBar",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[`position${capitalize(ownerState.position)}`], styles2[`color${capitalize(ownerState.color)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  const backgroundColorDefault = theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900];
  return _extends({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
    flexShrink: 0
  }, ownerState.position === "fixed" && {
    position: "fixed",
    zIndex: theme.zIndex.appBar,
    top: 0,
    left: "auto",
    right: 0,
    "@media print": {
      position: "absolute"
    }
  }, ownerState.position === "absolute" && {
    position: "absolute",
    zIndex: theme.zIndex.appBar,
    top: 0,
    left: "auto",
    right: 0
  }, ownerState.position === "sticky" && {
    position: "sticky",
    zIndex: theme.zIndex.appBar,
    top: 0,
    left: "auto",
    right: 0
  }, ownerState.position === "static" && {
    position: "static"
  }, ownerState.position === "relative" && {
    position: "relative"
  }, ownerState.color === "default" && {
    backgroundColor: backgroundColorDefault,
    color: theme.palette.getContrastText(backgroundColorDefault)
  }, ownerState.color && ownerState.color !== "default" && ownerState.color !== "inherit" && ownerState.color !== "transparent" && {
    backgroundColor: theme.palette[ownerState.color].main,
    color: theme.palette[ownerState.color].contrastText
  }, ownerState.color === "inherit" && {
    color: "inherit"
  }, theme.palette.mode === "dark" && !ownerState.enableColorOnDark && {
    backgroundColor: null,
    color: null
  }, ownerState.color === "transparent" && _extends({
    backgroundColor: "transparent",
    color: "inherit"
  }, theme.palette.mode === "dark" && {
    backgroundImage: "none"
  }));
});
const AppBar = /* @__PURE__ */ React.forwardRef(function AppBar2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiAppBar"
  });
  const {
    className,
    color = "primary",
    enableColorOnDark = false,
    position = "fixed"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$f);
  const ownerState = _extends({}, props, {
    color,
    position,
    enableColorOnDark
  });
  const classes = useUtilityClasses$e(ownerState);
  return /* @__PURE__ */ jsx(AppBarRoot, _extends({
    square: true,
    component: "header",
    ownerState,
    elevation: 4,
    className: clsx(classes.root, className, position === "fixed" && "mui-fixed"),
    ref
  }, other));
});
var AppBar$1 = AppBar;
function getToolbarUtilityClass(slot) {
  return generateUtilityClass("MuiToolbar", slot);
}
generateUtilityClasses("MuiToolbar", ["root", "gutters", "regular", "dense"]);
const _excluded$e = ["className", "component", "disableGutters", "variant"];
const useUtilityClasses$d = (ownerState) => {
  const {
    classes,
    disableGutters,
    variant
  } = ownerState;
  const slots = {
    root: ["root", !disableGutters && "gutters", variant]
  };
  return composeClasses(slots, getToolbarUtilityClass, classes);
};
const ToolbarRoot = styled("div", {
  name: "MuiToolbar",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, !ownerState.disableGutters && styles2.gutters, styles2[ownerState.variant]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  position: "relative",
  display: "flex",
  alignItems: "center"
}, !ownerState.disableGutters && {
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
}, ownerState.variant === "dense" && {
  minHeight: 48
}), ({
  theme,
  ownerState
}) => ownerState.variant === "regular" && theme.mixins.toolbar);
const Toolbar = /* @__PURE__ */ React.forwardRef(function Toolbar2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiToolbar"
  });
  const {
    className,
    component = "div",
    disableGutters = false,
    variant = "regular"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$e);
  const ownerState = _extends({}, props, {
    component,
    disableGutters,
    variant
  });
  const classes = useUtilityClasses$d(ownerState);
  return /* @__PURE__ */ jsx(ToolbarRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    ref,
    ownerState
  }, other));
});
var Toolbar$1 = Toolbar;
function getListSubheaderUtilityClass(slot) {
  return generateUtilityClass("MuiListSubheader", slot);
}
generateUtilityClasses("MuiListSubheader", ["root", "colorPrimary", "colorInherit", "gutters", "inset", "sticky"]);
const _excluded$d = ["className", "color", "component", "disableGutters", "disableSticky", "inset"];
const useUtilityClasses$c = (ownerState) => {
  const {
    classes,
    color,
    disableGutters,
    inset,
    disableSticky
  } = ownerState;
  const slots = {
    root: ["root", color !== "default" && `color${capitalize(color)}`, !disableGutters && "gutters", inset && "inset", !disableSticky && "sticky"]
  };
  return composeClasses(slots, getListSubheaderUtilityClass, classes);
};
const ListSubheaderRoot = styled("li", {
  name: "MuiListSubheader",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.color !== "default" && styles2[`color${capitalize(ownerState.color)}`], !ownerState.disableGutters && styles2.gutters, ownerState.inset && styles2.inset, !ownerState.disableSticky && styles2.sticky];
  }
})(({
  theme,
  ownerState
}) => _extends({
  boxSizing: "border-box",
  lineHeight: "48px",
  listStyle: "none",
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(14)
}, ownerState.color === "primary" && {
  color: theme.palette.primary.main
}, ownerState.color === "inherit" && {
  color: "inherit"
}, !ownerState.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, ownerState.inset && {
  paddingLeft: 72
}, !ownerState.disableSticky && {
  position: "sticky",
  top: 0,
  zIndex: 1,
  backgroundColor: theme.palette.background.paper
}));
const ListSubheader = /* @__PURE__ */ React.forwardRef(function ListSubheader2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiListSubheader"
  });
  const {
    className,
    color = "default",
    component = "li",
    disableGutters = false,
    disableSticky = false,
    inset = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$d);
  const ownerState = _extends({}, props, {
    color,
    component,
    disableGutters,
    disableSticky,
    inset
  });
  const classes = useUtilityClasses$c(ownerState);
  return /* @__PURE__ */ jsx(ListSubheaderRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    ref,
    ownerState
  }, other));
});
var ListSubheader$1 = ListSubheader;
var CancelIcon = createSvgIcon$1(/* @__PURE__ */ jsx("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}), "Cancel");
function getChipUtilityClass(slot) {
  return generateUtilityClass("MuiChip", slot);
}
const chipClasses = generateUtilityClasses("MuiChip", ["root", "sizeSmall", "sizeMedium", "colorPrimary", "colorSecondary", "disabled", "clickable", "clickableColorPrimary", "clickableColorSecondary", "deletable", "deletableColorPrimary", "deletableColorSecondary", "outlined", "filled", "outlinedPrimary", "outlinedSecondary", "avatar", "avatarSmall", "avatarMedium", "avatarColorPrimary", "avatarColorSecondary", "icon", "iconSmall", "iconMedium", "iconColorPrimary", "iconColorSecondary", "label", "labelSmall", "labelMedium", "deleteIcon", "deleteIconSmall", "deleteIconMedium", "deleteIconColorPrimary", "deleteIconColorSecondary", "deleteIconOutlinedColorPrimary", "deleteIconOutlinedColorSecondary", "focusVisible"]);
var chipClasses$1 = chipClasses;
const _excluded$c = ["avatar", "className", "clickable", "color", "component", "deleteIcon", "disabled", "icon", "label", "onClick", "onDelete", "onKeyDown", "onKeyUp", "size", "variant"];
const useUtilityClasses$b = (ownerState) => {
  const {
    classes,
    disabled,
    size,
    color,
    onDelete,
    clickable,
    variant
  } = ownerState;
  const slots = {
    root: ["root", variant, disabled && "disabled", `size${capitalize(size)}`, `color${capitalize(color)}`, clickable && "clickable", clickable && `clickableColor${capitalize(color)}`, onDelete && "deletable", onDelete && `deletableColor${capitalize(color)}`, `${variant}${capitalize(color)}`],
    label: ["label", `label${capitalize(size)}`],
    avatar: ["avatar", `avatar${capitalize(size)}`, `avatarColor${capitalize(color)}`],
    icon: ["icon", `icon${capitalize(size)}`, `iconColor${capitalize(color)}`],
    deleteIcon: ["deleteIcon", `deleteIcon${capitalize(size)}`, `deleteIconColor${capitalize(color)}`, `deleteIconOutlinedColor${capitalize(color)}`]
  };
  return composeClasses(slots, getChipUtilityClass, classes);
};
const ChipRoot = styled("div", {
  name: "MuiChip",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    const {
      color,
      clickable,
      onDelete,
      size,
      variant
    } = ownerState;
    return [{
      [`& .${chipClasses$1.avatar}`]: styles2.avatar
    }, {
      [`& .${chipClasses$1.avatar}`]: styles2[`avatar${capitalize(size)}`]
    }, {
      [`& .${chipClasses$1.avatar}`]: styles2[`avatarColor${capitalize(color)}`]
    }, {
      [`& .${chipClasses$1.icon}`]: styles2.icon
    }, {
      [`& .${chipClasses$1.icon}`]: styles2[`icon${capitalize(size)}`]
    }, {
      [`& .${chipClasses$1.icon}`]: styles2[`iconColor${capitalize(color)}`]
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles2.deleteIcon
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles2[`deleteIcon${capitalize(size)}`]
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles2[`deleteIconColor${capitalize(color)}`]
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles2[`deleteIconOutlinedColor${capitalize(color)}`]
    }, styles2.root, styles2[`size${capitalize(size)}`], styles2[`color${capitalize(color)}`], clickable && styles2.clickable, clickable && color !== "default" && styles2[`clickableColor${capitalize(color)})`], onDelete && styles2.deletable, onDelete && color !== "default" && styles2[`deletableColor${capitalize(color)}`], styles2[variant], variant === "outlined" && styles2[`outlined${capitalize(color)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  const deleteIconColor = alpha(theme.palette.text.primary, 0.26);
  return _extends({
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(13),
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.selected,
    borderRadius: 32 / 2,
    whiteSpace: "nowrap",
    transition: theme.transitions.create(["background-color", "box-shadow"]),
    cursor: "default",
    outline: 0,
    textDecoration: "none",
    border: 0,
    padding: 0,
    verticalAlign: "middle",
    boxSizing: "border-box",
    [`&.${chipClasses$1.disabled}`]: {
      opacity: theme.palette.action.disabledOpacity,
      pointerEvents: "none"
    },
    [`& .${chipClasses$1.avatar}`]: {
      marginLeft: 5,
      marginRight: -6,
      width: 24,
      height: 24,
      color: theme.palette.mode === "light" ? theme.palette.grey[700] : theme.palette.grey[300],
      fontSize: theme.typography.pxToRem(12)
    },
    [`& .${chipClasses$1.avatarColorPrimary}`]: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.dark
    },
    [`& .${chipClasses$1.avatarColorSecondary}`]: {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.dark
    },
    [`& .${chipClasses$1.avatarSmall}`]: {
      marginLeft: 4,
      marginRight: -4,
      width: 18,
      height: 18,
      fontSize: theme.typography.pxToRem(10)
    },
    [`& .${chipClasses$1.icon}`]: _extends({
      color: theme.palette.mode === "light" ? theme.palette.grey[700] : theme.palette.grey[300],
      marginLeft: 5,
      marginRight: -6
    }, ownerState.size === "small" && {
      fontSize: 18,
      marginLeft: 4,
      marginRight: -4
    }, ownerState.color !== "default" && {
      color: "inherit"
    }),
    [`& .${chipClasses$1.deleteIcon}`]: _extends({
      WebkitTapHighlightColor: "transparent",
      color: deleteIconColor,
      fontSize: 22,
      cursor: "pointer",
      margin: "0 5px 0 -6px",
      "&:hover": {
        color: alpha(deleteIconColor, 0.4)
      }
    }, ownerState.size === "small" && {
      fontSize: 16,
      marginRight: 4,
      marginLeft: -4
    }, ownerState.color !== "default" && {
      color: alpha(theme.palette[ownerState.color].contrastText, 0.7),
      "&:hover, &:active": {
        color: theme.palette[ownerState.color].contrastText
      }
    })
  }, ownerState.size === "small" && {
    height: 24
  }, ownerState.color !== "default" && {
    backgroundColor: theme.palette[ownerState.color].main,
    color: theme.palette[ownerState.color].contrastText
  }, ownerState.onDelete && {
    [`&.${chipClasses$1.focusVisible}`]: {
      backgroundColor: alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  }, ownerState.onDelete && ownerState.color !== "default" && {
    [`&.${chipClasses$1.focusVisible}`]: {
      backgroundColor: theme.palette[ownerState.color].dark
    }
  });
}, ({
  theme,
  ownerState
}) => _extends({}, ownerState.clickable && {
  userSelect: "none",
  WebkitTapHighlightColor: "transparent",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity)
  },
  [`&.${chipClasses$1.focusVisible}`]: {
    backgroundColor: alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  },
  "&:active": {
    boxShadow: theme.shadows[1]
  }
}, ownerState.clickable && ownerState.color !== "default" && {
  [`&:hover, &.${chipClasses$1.focusVisible}`]: {
    backgroundColor: theme.palette[ownerState.color].dark
  }
}), ({
  theme,
  ownerState
}) => _extends({}, ownerState.variant === "outlined" && {
  backgroundColor: "transparent",
  border: `1px solid ${theme.palette.mode === "light" ? theme.palette.grey[400] : theme.palette.grey[700]}`,
  [`&.${chipClasses$1.clickable}:hover`]: {
    backgroundColor: theme.palette.action.hover
  },
  [`&.${chipClasses$1.focusVisible}`]: {
    backgroundColor: theme.palette.action.focus
  },
  [`& .${chipClasses$1.avatar}`]: {
    marginLeft: 4
  },
  [`& .${chipClasses$1.avatarSmall}`]: {
    marginLeft: 2
  },
  [`& .${chipClasses$1.icon}`]: {
    marginLeft: 4
  },
  [`& .${chipClasses$1.iconSmall}`]: {
    marginLeft: 2
  },
  [`& .${chipClasses$1.deleteIcon}`]: {
    marginRight: 5
  },
  [`& .${chipClasses$1.deleteIconSmall}`]: {
    marginRight: 3
  }
}, ownerState.variant === "outlined" && ownerState.color !== "default" && {
  color: theme.palette[ownerState.color].main,
  border: `1px solid ${alpha(theme.palette[ownerState.color].main, 0.7)}`,
  [`&.${chipClasses$1.clickable}:hover`]: {
    backgroundColor: alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity)
  },
  [`&.${chipClasses$1.focusVisible}`]: {
    backgroundColor: alpha(theme.palette[ownerState.color].main, theme.palette.action.focusOpacity)
  },
  [`& .${chipClasses$1.deleteIcon}`]: {
    color: alpha(theme.palette[ownerState.color].main, 0.7),
    "&:hover, &:active": {
      color: theme.palette[ownerState.color].main
    }
  }
}));
const ChipLabel = styled("span", {
  name: "MuiChip",
  slot: "Label",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    const {
      size
    } = ownerState;
    return [styles2.label, styles2[`label${capitalize(size)}`]];
  }
})(({
  ownerState
}) => _extends({
  overflow: "hidden",
  textOverflow: "ellipsis",
  paddingLeft: 12,
  paddingRight: 12,
  whiteSpace: "nowrap"
}, ownerState.size === "small" && {
  paddingLeft: 8,
  paddingRight: 8
}));
function isDeleteKeyboardEvent(keyboardEvent) {
  return keyboardEvent.key === "Backspace" || keyboardEvent.key === "Delete";
}
const Chip = /* @__PURE__ */ React.forwardRef(function Chip2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiChip"
  });
  const {
    avatar: avatarProp,
    className,
    clickable: clickableProp,
    color = "default",
    component: ComponentProp,
    deleteIcon: deleteIconProp,
    disabled = false,
    icon: iconProp,
    label,
    onClick,
    onDelete,
    onKeyDown,
    onKeyUp,
    size = "medium",
    variant = "filled"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$c);
  const chipRef = React.useRef(null);
  const handleRef = useForkRef(chipRef, ref);
  const handleDeleteIconClick = (event) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete(event);
    }
  };
  const handleKeyDown = (event) => {
    if (event.currentTarget === event.target && isDeleteKeyboardEvent(event)) {
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };
  const handleKeyUp = (event) => {
    if (event.currentTarget === event.target) {
      if (onDelete && isDeleteKeyboardEvent(event)) {
        onDelete(event);
      } else if (event.key === "Escape" && chipRef.current) {
        chipRef.current.blur();
      }
    }
    if (onKeyUp) {
      onKeyUp(event);
    }
  };
  const clickable = clickableProp !== false && onClick ? true : clickableProp;
  const small = size === "small";
  const component = clickable || onDelete ? ButtonBase : ComponentProp || "div";
  const ownerState = _extends({}, props, {
    component,
    disabled,
    size,
    color,
    onDelete: !!onDelete,
    clickable,
    variant
  });
  const classes = useUtilityClasses$b(ownerState);
  const moreProps = component === ButtonBase ? _extends({
    component: ComponentProp || "div",
    focusVisibleClassName: classes.focusVisible
  }, onDelete && {
    disableRipple: true
  }) : {};
  let deleteIcon = null;
  if (onDelete) {
    const customClasses = clsx(color !== "default" && (variant === "outlined" ? classes[`deleteIconOutlinedColor${capitalize(color)}`] : classes[`deleteIconColor${capitalize(color)}`]), small && classes.deleteIconSmall);
    deleteIcon = deleteIconProp && /* @__PURE__ */ React.isValidElement(deleteIconProp) ? /* @__PURE__ */ React.cloneElement(deleteIconProp, {
      className: clsx(deleteIconProp.props.className, classes.deleteIcon, customClasses),
      onClick: handleDeleteIconClick
    }) : /* @__PURE__ */ jsx(CancelIcon, {
      className: clsx(classes.deleteIcon, customClasses),
      onClick: handleDeleteIconClick
    });
  }
  let avatar = null;
  if (avatarProp && /* @__PURE__ */ React.isValidElement(avatarProp)) {
    avatar = /* @__PURE__ */ React.cloneElement(avatarProp, {
      className: clsx(classes.avatar, avatarProp.props.className)
    });
  }
  let icon = null;
  if (iconProp && /* @__PURE__ */ React.isValidElement(iconProp)) {
    icon = /* @__PURE__ */ React.cloneElement(iconProp, {
      className: clsx(classes.icon, iconProp.props.className)
    });
  }
  return /* @__PURE__ */ jsxs(ChipRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    disabled: clickable && disabled ? true : void 0,
    onClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    ref: handleRef,
    ownerState
  }, moreProps, other, {
    children: [avatar || icon, /* @__PURE__ */ jsx(ChipLabel, {
      className: clsx(classes.label),
      ownerState,
      children: label
    }), deleteIcon]
  }));
});
var Chip$1 = Chip;
function getOutlinedInputUtilityClass(slot) {
  return generateUtilityClass("MuiOutlinedInput", slot);
}
const outlinedInputClasses = generateUtilityClasses("MuiOutlinedInput", ["root", "colorSecondary", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "notchedOutline", "input", "inputSizeSmall", "inputMultiline", "inputAdornedStart", "inputAdornedEnd"]);
var outlinedInputClasses$1 = outlinedInputClasses;
function getFilledInputUtilityClass(slot) {
  return generateUtilityClass("MuiFilledInput", slot);
}
const filledInputClasses = generateUtilityClasses("MuiFilledInput", ["root", "colorSecondary", "underline", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "hiddenLabel", "input", "inputSizeSmall", "inputHiddenLabel", "inputMultiline", "inputAdornedStart", "inputAdornedEnd"]);
var filledInputClasses$1 = filledInputClasses;
var ClearIcon = createSvgIcon$1(/* @__PURE__ */ jsx("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), "Close");
function getAutocompleteUtilityClass(slot) {
  return generateUtilityClass("MuiAutocomplete", slot);
}
const autocompleteClasses = generateUtilityClasses("MuiAutocomplete", ["root", "fullWidth", "focused", "focusVisible", "tag", "tagSizeSmall", "tagSizeMedium", "hasPopupIcon", "hasClearIcon", "inputRoot", "input", "inputFocused", "endAdornment", "clearIndicator", "popupIndicator", "popupIndicatorOpen", "popper", "popperDisablePortal", "paper", "listbox", "loading", "noOptions", "option", "groupLabel", "groupUl"]);
var autocompleteClasses$1 = autocompleteClasses;
var _ClearIcon, _ArrowDropDownIcon;
const _excluded$b = ["autoComplete", "autoHighlight", "autoSelect", "blurOnSelect", "ChipProps", "className", "clearIcon", "clearOnBlur", "clearOnEscape", "clearText", "closeText", "componentsProps", "defaultValue", "disableClearable", "disableCloseOnSelect", "disabled", "disabledItemsFocusable", "disableListWrap", "disablePortal", "filterOptions", "filterSelectedOptions", "forcePopupIcon", "freeSolo", "fullWidth", "getLimitTagsText", "getOptionDisabled", "getOptionLabel", "isOptionEqualToValue", "groupBy", "handleHomeEndKeys", "id", "includeInputInList", "inputValue", "limitTags", "ListboxComponent", "ListboxProps", "loading", "loadingText", "multiple", "noOptionsText", "onChange", "onClose", "onHighlightChange", "onInputChange", "onOpen", "open", "openOnFocus", "openText", "options", "PaperComponent", "PopperComponent", "popupIcon", "renderGroup", "renderInput", "renderOption", "renderTags", "selectOnFocus", "size", "value"];
const useUtilityClasses$a = (ownerState) => {
  const {
    classes,
    disablePortal,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused,
    popupOpen,
    size
  } = ownerState;
  const slots = {
    root: ["root", focused && "focused", fullWidth && "fullWidth", hasClearIcon && "hasClearIcon", hasPopupIcon && "hasPopupIcon"],
    inputRoot: ["inputRoot"],
    input: ["input", inputFocused && "inputFocused"],
    tag: ["tag", `tagSize${capitalize(size)}`],
    endAdornment: ["endAdornment"],
    clearIndicator: ["clearIndicator"],
    popupIndicator: ["popupIndicator", popupOpen && "popupIndicatorOpen"],
    popper: ["popper", disablePortal && "popperDisablePortal"],
    paper: ["paper"],
    listbox: ["listbox"],
    loading: ["loading"],
    noOptions: ["noOptions"],
    option: ["option"],
    groupLabel: ["groupLabel"],
    groupUl: ["groupUl"]
  };
  return composeClasses(slots, getAutocompleteUtilityClass, classes);
};
const AutocompleteRoot = styled("div", {
  name: "MuiAutocomplete",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    const {
      fullWidth,
      hasClearIcon,
      hasPopupIcon,
      inputFocused,
      size
    } = ownerState;
    return [{
      [`& .${autocompleteClasses$1.tag}`]: styles2.tag
    }, {
      [`& .${autocompleteClasses$1.tag}`]: styles2[`tagSize${capitalize(size)}`]
    }, {
      [`& .${autocompleteClasses$1.inputRoot}`]: styles2.inputRoot
    }, {
      [`& .${autocompleteClasses$1.input}`]: styles2.input
    }, {
      [`& .${autocompleteClasses$1.input}`]: inputFocused && styles2.inputFocused
    }, styles2.root, fullWidth && styles2.fullWidth, hasPopupIcon && styles2.hasPopupIcon, hasClearIcon && styles2.hasClearIcon];
  }
})(({
  ownerState
}) => _extends({
  [`&.${autocompleteClasses$1.focused} .${autocompleteClasses$1.clearIndicator}`]: {
    visibility: "visible"
  },
  "@media (pointer: fine)": {
    [`&:hover .${autocompleteClasses$1.clearIndicator}`]: {
      visibility: "visible"
    }
  }
}, ownerState.fullWidth && {
  width: "100%"
}, {
  [`& .${autocompleteClasses$1.tag}`]: _extends({
    margin: 3,
    maxWidth: "calc(100% - 6px)"
  }, ownerState.size === "small" && {
    margin: 2,
    maxWidth: "calc(100% - 4px)"
  }),
  [`& .${autocompleteClasses$1.inputRoot}`]: {
    flexWrap: "wrap",
    [`.${autocompleteClasses$1.hasPopupIcon}&, .${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 26 + 4
    },
    [`.${autocompleteClasses$1.hasPopupIcon}.${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 52 + 4
    },
    [`& .${autocompleteClasses$1.input}`]: {
      width: 0,
      minWidth: 30
    }
  },
  [`& .${inputClasses.root}`]: {
    paddingBottom: 1,
    "& .MuiInput-input": {
      padding: "4px 4px 4px 0px"
    }
  },
  [`& .${inputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
    [`& .${inputClasses.input}`]: {
      padding: "2px 4px 3px 0"
    }
  },
  [`& .${outlinedInputClasses$1.root}`]: {
    padding: 9,
    [`.${autocompleteClasses$1.hasPopupIcon}&, .${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 26 + 4 + 9
    },
    [`.${autocompleteClasses$1.hasPopupIcon}.${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 52 + 4 + 9
    },
    [`& .${autocompleteClasses$1.input}`]: {
      padding: "7.5px 4px 7.5px 6px"
    },
    [`& .${autocompleteClasses$1.endAdornment}`]: {
      right: 9
    }
  },
  [`& .${outlinedInputClasses$1.root}.${inputBaseClasses.sizeSmall}`]: {
    padding: 6,
    [`& .${autocompleteClasses$1.input}`]: {
      padding: "2.5px 4px 2.5px 6px"
    }
  },
  [`& .${filledInputClasses$1.root}`]: {
    paddingTop: 19,
    paddingLeft: 8,
    [`.${autocompleteClasses$1.hasPopupIcon}&, .${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 26 + 4 + 9
    },
    [`.${autocompleteClasses$1.hasPopupIcon}.${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 52 + 4 + 9
    },
    [`& .${filledInputClasses$1.input}`]: {
      padding: "7px 4px"
    },
    [`& .${autocompleteClasses$1.endAdornment}`]: {
      right: 9
    }
  },
  [`& .${filledInputClasses$1.root}.${inputBaseClasses.sizeSmall}`]: {
    paddingBottom: 1,
    [`& .${filledInputClasses$1.input}`]: {
      padding: "2.5px 4px"
    }
  },
  [`& .${autocompleteClasses$1.input}`]: _extends({
    flexGrow: 1,
    textOverflow: "ellipsis",
    opacity: 0
  }, ownerState.inputFocused && {
    opacity: 1
  })
}));
const AutocompleteEndAdornment = styled("div", {
  name: "MuiAutocomplete",
  slot: "EndAdornment",
  overridesResolver: (props, styles2) => styles2.endAdornment
})({
  position: "absolute",
  right: 0,
  top: "calc(50% - 14px)"
});
const AutocompleteClearIndicator = styled(IconButton, {
  name: "MuiAutocomplete",
  slot: "ClearIndicator",
  overridesResolver: (props, styles2) => styles2.clearIndicator
})({
  marginRight: -2,
  padding: 4,
  visibility: "hidden"
});
const AutocompletePopupIndicator = styled(IconButton, {
  name: "MuiAutocomplete",
  slot: "PopupIndicator",
  overridesResolver: ({
    ownerState
  }, styles2) => _extends({}, styles2.popupIndicator, ownerState.popupOpen && styles2.popupIndicatorOpen)
})(({
  ownerState
}) => _extends({
  padding: 2,
  marginRight: -2
}, ownerState.popupOpen && {
  transform: "rotate(180deg)"
}));
const AutocompletePopper = styled(Popper, {
  name: "MuiAutocomplete",
  slot: "Popper",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${autocompleteClasses$1.option}`]: styles2.option
    }, styles2.popper, ownerState.disablePortal && styles2.popperDisablePortal];
  }
})(({
  theme,
  ownerState
}) => _extends({
  zIndex: theme.zIndex.modal
}, ownerState.disablePortal && {
  position: "absolute"
}));
const AutocompletePaper = styled(Paper, {
  name: "MuiAutocomplete",
  slot: "Paper",
  overridesResolver: (props, styles2) => styles2.paper
})(({
  theme
}) => _extends({}, theme.typography.body1, {
  overflow: "auto"
}));
const AutocompleteLoading = styled("div", {
  name: "MuiAutocomplete",
  slot: "Loading",
  overridesResolver: (props, styles2) => styles2.loading
})(({
  theme
}) => ({
  color: theme.palette.text.secondary,
  padding: "14px 16px"
}));
const AutocompleteNoOptions = styled("div", {
  name: "MuiAutocomplete",
  slot: "NoOptions",
  overridesResolver: (props, styles2) => styles2.noOptions
})(({
  theme
}) => ({
  color: theme.palette.text.secondary,
  padding: "14px 16px"
}));
const AutocompleteListbox = styled("div", {
  name: "MuiAutocomplete",
  slot: "Listbox",
  overridesResolver: (props, styles2) => styles2.listbox
})(({
  theme
}) => ({
  listStyle: "none",
  margin: 0,
  padding: "8px 0",
  maxHeight: "40vh",
  overflow: "auto",
  [`& .${autocompleteClasses$1.option}`]: {
    minHeight: 48,
    display: "flex",
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
    cursor: "pointer",
    paddingTop: 6,
    boxSizing: "border-box",
    outline: "0",
    WebkitTapHighlightColor: "transparent",
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.up("sm")]: {
      minHeight: "auto"
    },
    [`&.${autocompleteClasses$1.focused}`]: {
      backgroundColor: theme.palette.action.hover,
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    },
    '&[aria-disabled="true"]': {
      opacity: theme.palette.action.disabledOpacity,
      pointerEvents: "none"
    },
    [`&.${autocompleteClasses$1.focusVisible}`]: {
      backgroundColor: theme.palette.action.focus
    },
    '&[aria-selected="true"]': {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      [`&.${autocompleteClasses$1.focused}`]: {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
        "@media (hover: none)": {
          backgroundColor: theme.palette.action.selected
        }
      },
      [`&.${autocompleteClasses$1.focusVisible}`]: {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
      }
    }
  }
}));
const AutocompleteGroupLabel = styled(ListSubheader$1, {
  name: "MuiAutocomplete",
  slot: "GroupLabel",
  overridesResolver: (props, styles2) => styles2.groupLabel
})(({
  theme
}) => ({
  backgroundColor: theme.palette.background.paper,
  top: -8
}));
const AutocompleteGroupUl = styled("ul", {
  name: "MuiAutocomplete",
  slot: "GroupUl",
  overridesResolver: (props, styles2) => styles2.groupUl
})({
  padding: 0,
  [`& .${autocompleteClasses$1.option}`]: {
    paddingLeft: 24
  }
});
const Autocomplete = /* @__PURE__ */ React.forwardRef(function Autocomplete2(inProps, ref) {
  var _componentsProps$clea;
  const props = useThemeProps({
    props: inProps,
    name: "MuiAutocomplete"
  });
  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    ChipProps,
    className,
    clearIcon = _ClearIcon || (_ClearIcon = /* @__PURE__ */ jsx(ClearIcon, {
      fontSize: "small"
    })),
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    clearText = "Clear",
    closeText = "Close",
    componentsProps = {},
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled = false,
    disabledItemsFocusable = false,
    disableListWrap = false,
    disablePortal = false,
    filterSelectedOptions = false,
    forcePopupIcon = "auto",
    freeSolo = false,
    fullWidth = false,
    getLimitTagsText = (more) => `+${more}`,
    getOptionLabel = (option) => {
      var _option$label;
      return (_option$label = option.label) != null ? _option$label : option;
    },
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    includeInputInList = false,
    limitTags = -1,
    ListboxComponent = "ul",
    ListboxProps,
    loading = false,
    loadingText = "Loading\u2026",
    multiple = false,
    noOptionsText = "No options",
    openOnFocus = false,
    openText = "Open",
    PaperComponent = Paper,
    PopperComponent: PopperComponent2 = Popper,
    popupIcon = _ArrowDropDownIcon || (_ArrowDropDownIcon = /* @__PURE__ */ jsx(ArrowDropDownIcon, {})),
    renderGroup: renderGroupProp,
    renderInput,
    renderOption: renderOptionProp,
    renderTags,
    selectOnFocus = !props.freeSolo,
    size = "medium"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$b);
  const {
    getRootProps,
    getInputProps,
    getInputLabelProps,
    getPopupIndicatorProps,
    getClearProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    value,
    dirty,
    id,
    popupOpen,
    focused,
    focusedTag,
    anchorEl,
    setAnchorEl,
    inputValue,
    groupedOptions
  } = useAutocomplete(_extends({}, props, {
    componentName: "Autocomplete"
  }));
  const hasClearIcon = !disableClearable && !disabled && dirty;
  const hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;
  const ownerState = _extends({}, props, {
    disablePortal,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused: focusedTag === -1,
    popupOpen,
    size
  });
  const classes = useUtilityClasses$a(ownerState);
  let startAdornment;
  if (multiple && value.length > 0) {
    const getCustomizedTagProps = (params) => _extends({
      className: clsx(classes.tag),
      disabled
    }, getTagProps(params));
    if (renderTags) {
      startAdornment = renderTags(value, getCustomizedTagProps);
    } else {
      startAdornment = value.map((option, index2) => /* @__PURE__ */ jsx(Chip$1, _extends({
        label: getOptionLabel(option),
        size
      }, getCustomizedTagProps({
        index: index2
      }), ChipProps)));
    }
  }
  if (limitTags > -1 && Array.isArray(startAdornment)) {
    const more = startAdornment.length - limitTags;
    if (!focused && more > 0) {
      startAdornment = startAdornment.splice(0, limitTags);
      startAdornment.push(/* @__PURE__ */ jsx("span", {
        className: classes.tag,
        children: getLimitTagsText(more)
      }, startAdornment.length));
    }
  }
  const defaultRenderGroup = (params) => /* @__PURE__ */ jsxs("li", {
    children: [/* @__PURE__ */ jsx(AutocompleteGroupLabel, {
      className: classes.groupLabel,
      ownerState,
      component: "div",
      children: params.group
    }), /* @__PURE__ */ jsx(AutocompleteGroupUl, {
      className: classes.groupUl,
      ownerState,
      children: params.children
    })]
  }, params.key);
  const renderGroup = renderGroupProp || defaultRenderGroup;
  const defaultRenderOption = (props2, option) => /* @__PURE__ */ jsx("li", _extends({}, props2, {
    children: getOptionLabel(option)
  }));
  const renderOption = renderOptionProp || defaultRenderOption;
  const renderListOption = (option, index2) => {
    const optionProps = getOptionProps({
      option,
      index: index2
    });
    return renderOption(_extends({}, optionProps, {
      className: classes.option
    }), option, {
      selected: optionProps["aria-selected"],
      inputValue
    });
  };
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [/* @__PURE__ */ jsx(AutocompleteRoot, _extends({
      ref,
      className: clsx(classes.root, className),
      ownerState
    }, getRootProps(other), {
      children: renderInput({
        id,
        disabled,
        fullWidth: true,
        size: size === "small" ? "small" : void 0,
        InputLabelProps: getInputLabelProps(),
        InputProps: {
          ref: setAnchorEl,
          className: classes.inputRoot,
          startAdornment,
          endAdornment: /* @__PURE__ */ jsxs(AutocompleteEndAdornment, {
            className: classes.endAdornment,
            ownerState,
            children: [hasClearIcon ? /* @__PURE__ */ jsx(AutocompleteClearIndicator, _extends({}, getClearProps(), {
              "aria-label": clearText,
              title: clearText,
              ownerState
            }, componentsProps.clearIndicator, {
              className: clsx(classes.clearIndicator, (_componentsProps$clea = componentsProps.clearIndicator) == null ? void 0 : _componentsProps$clea.className),
              children: clearIcon
            })) : null, hasPopupIcon ? /* @__PURE__ */ jsx(AutocompletePopupIndicator, _extends({}, getPopupIndicatorProps(), {
              disabled,
              "aria-label": popupOpen ? closeText : openText,
              title: popupOpen ? closeText : openText,
              className: clsx(classes.popupIndicator),
              ownerState,
              children: popupIcon
            })) : null]
          })
        },
        inputProps: _extends({
          className: clsx(classes.input),
          disabled
        }, getInputProps())
      })
    })), popupOpen && anchorEl ? /* @__PURE__ */ jsx(AutocompletePopper, {
      as: PopperComponent2,
      className: clsx(classes.popper),
      disablePortal,
      style: {
        width: anchorEl ? anchorEl.clientWidth : null
      },
      ownerState,
      role: "presentation",
      anchorEl,
      open: true,
      children: /* @__PURE__ */ jsxs(AutocompletePaper, {
        as: PaperComponent,
        className: classes.paper,
        ownerState,
        children: [loading && groupedOptions.length === 0 ? /* @__PURE__ */ jsx(AutocompleteLoading, {
          className: classes.loading,
          ownerState,
          children: loadingText
        }) : null, groupedOptions.length === 0 && !freeSolo && !loading ? /* @__PURE__ */ jsx(AutocompleteNoOptions, {
          className: classes.noOptions,
          ownerState,
          role: "presentation",
          onMouseDown: (event) => {
            event.preventDefault();
          },
          children: noOptionsText
        }) : null, groupedOptions.length > 0 ? /* @__PURE__ */ jsx(AutocompleteListbox, _extends({
          as: ListboxComponent,
          className: classes.listbox,
          ownerState
        }, getListboxProps(), ListboxProps, {
          children: groupedOptions.map((option, index2) => {
            if (groupBy) {
              return renderGroup({
                key: option.key,
                group: option.group,
                children: option.options.map((option2, index22) => renderListOption(option2, option.index + index22))
              });
            }
            return renderListOption(option, index2);
          })
        })) : null]
      })
    }) : null]
  });
});
var Autocomplete$1 = Autocomplete;
function getFormControlLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiFormControlLabel", slot);
}
const formControlLabelClasses = generateUtilityClasses("MuiFormControlLabel", ["root", "labelPlacementStart", "labelPlacementTop", "labelPlacementBottom", "disabled", "label"]);
var formControlLabelClasses$1 = formControlLabelClasses;
const _excluded$a = ["checked", "className", "componentsProps", "control", "disabled", "disableTypography", "inputRef", "label", "labelPlacement", "name", "onChange", "value"];
const useUtilityClasses$9 = (ownerState) => {
  const {
    classes,
    disabled,
    labelPlacement
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", `labelPlacement${capitalize(labelPlacement)}`],
    label: ["label", disabled && "disabled"]
  };
  return composeClasses(slots, getFormControlLabelUtilityClasses, classes);
};
const FormControlLabelRoot = styled("label", {
  name: "MuiFormControlLabel",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${formControlLabelClasses$1.label}`]: styles2.label
    }, styles2.root, styles2[`labelPlacement${capitalize(ownerState.labelPlacement)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  verticalAlign: "middle",
  WebkitTapHighlightColor: "transparent",
  marginLeft: -11,
  marginRight: 16,
  [`&.${formControlLabelClasses$1.disabled}`]: {
    cursor: "default"
  }
}, ownerState.labelPlacement === "start" && {
  flexDirection: "row-reverse",
  marginLeft: 16,
  marginRight: -11
}, ownerState.labelPlacement === "top" && {
  flexDirection: "column-reverse",
  marginLeft: 16
}, ownerState.labelPlacement === "bottom" && {
  flexDirection: "column",
  marginLeft: 16
}, {
  [`& .${formControlLabelClasses$1.label}`]: {
    [`&.${formControlLabelClasses$1.disabled}`]: {
      color: theme.palette.text.disabled
    }
  }
}));
const FormControlLabel = /* @__PURE__ */ React.forwardRef(function FormControlLabel2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFormControlLabel"
  });
  const {
    className,
    componentsProps = {},
    control,
    disabled: disabledProp,
    disableTypography,
    label,
    labelPlacement = "end"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$a);
  const muiFormControl = useFormControl();
  let disabled = disabledProp;
  if (typeof disabled === "undefined" && typeof control.props.disabled !== "undefined") {
    disabled = control.props.disabled;
  }
  if (typeof disabled === "undefined" && muiFormControl) {
    disabled = muiFormControl.disabled;
  }
  const controlProps = {
    disabled
  };
  ["checked", "name", "onChange", "value", "inputRef"].forEach((key) => {
    if (typeof control.props[key] === "undefined" && typeof props[key] !== "undefined") {
      controlProps[key] = props[key];
    }
  });
  const ownerState = _extends({}, props, {
    disabled,
    label,
    labelPlacement
  });
  const classes = useUtilityClasses$9(ownerState);
  return /* @__PURE__ */ jsxs(FormControlLabelRoot, _extends({
    className: clsx(classes.root, className),
    ownerState,
    ref
  }, other, {
    children: [/* @__PURE__ */ React.cloneElement(control, controlProps), label.type === Typography || disableTypography ? label : /* @__PURE__ */ jsx(Typography, _extends({
      component: "span",
      className: classes.label
    }, componentsProps.typography, {
      children: label
    }))]
  }));
});
var FormControlLabel$1 = FormControlLabel;
function getFormGroupUtilityClass(slot) {
  return generateUtilityClass("MuiFormGroup", slot);
}
generateUtilityClasses("MuiFormGroup", ["root", "row"]);
const _excluded$9 = ["className", "row"];
const useUtilityClasses$8 = (ownerState) => {
  const {
    classes,
    row
  } = ownerState;
  const slots = {
    root: ["root", row && "row"]
  };
  return composeClasses(slots, getFormGroupUtilityClass, classes);
};
const FormGroupRoot = styled("div", {
  name: "MuiFormGroup",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.row && styles2.row];
  }
})(({
  ownerState
}) => _extends({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap"
}, ownerState.row && {
  flexDirection: "row"
}));
const FormGroup = /* @__PURE__ */ React.forwardRef(function FormGroup2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFormGroup"
  });
  const {
    className,
    row = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$9);
  const ownerState = _extends({}, props, {
    row
  });
  const classes = useUtilityClasses$8(ownerState);
  return /* @__PURE__ */ jsx(FormGroupRoot, _extends({
    className: clsx(classes.root, className),
    ownerState,
    ref
  }, other));
});
var FormGroup$1 = FormGroup;
function getSwitchBaseUtilityClass(slot) {
  return generateUtilityClass("PrivateSwitchBase", slot);
}
generateUtilityClasses("PrivateSwitchBase", ["root", "checked", "disabled", "input", "edgeStart", "edgeEnd"]);
const _excluded$8 = ["autoFocus", "checked", "checkedIcon", "className", "defaultChecked", "disabled", "disableFocusRipple", "edge", "icon", "id", "inputProps", "inputRef", "name", "onBlur", "onChange", "onFocus", "readOnly", "required", "tabIndex", "type", "value"];
const useUtilityClasses$7 = (ownerState) => {
  const {
    classes,
    checked,
    disabled,
    edge
  } = ownerState;
  const slots = {
    root: ["root", checked && "checked", disabled && "disabled", edge && `edge${capitalize(edge)}`],
    input: ["input"]
  };
  return composeClasses(slots, getSwitchBaseUtilityClass, classes);
};
const SwitchBaseRoot = styled(ButtonBase, {
  skipSx: true
})(({
  ownerState
}) => _extends({
  padding: 9,
  borderRadius: "50%"
}, ownerState.edge === "start" && {
  marginLeft: ownerState.size === "small" ? -3 : -12
}, ownerState.edge === "end" && {
  marginRight: ownerState.size === "small" ? -3 : -12
}));
const SwitchBaseInput = styled("input", {
  skipSx: true
})({
  cursor: "inherit",
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1
});
const SwitchBase = /* @__PURE__ */ React.forwardRef(function SwitchBase2(props, ref) {
  const {
    autoFocus,
    checked: checkedProp,
    checkedIcon,
    className,
    defaultChecked,
    disabled: disabledProp,
    disableFocusRipple = false,
    edge = false,
    icon,
    id,
    inputProps,
    inputRef,
    name,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    required,
    tabIndex,
    type,
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$8);
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "SwitchBase",
    state: "checked"
  });
  const muiFormControl = useFormControl();
  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };
  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };
  const handleInputChange = (event) => {
    if (event.nativeEvent.defaultPrevented) {
      return;
    }
    const newChecked = event.target.checked;
    setCheckedState(newChecked);
    if (onChange) {
      onChange(event, newChecked);
    }
  };
  let disabled = disabledProp;
  if (muiFormControl) {
    if (typeof disabled === "undefined") {
      disabled = muiFormControl.disabled;
    }
  }
  const hasLabelFor = type === "checkbox" || type === "radio";
  const ownerState = _extends({}, props, {
    checked,
    disabled,
    disableFocusRipple,
    edge
  });
  const classes = useUtilityClasses$7(ownerState);
  return /* @__PURE__ */ jsxs(SwitchBaseRoot, _extends({
    component: "span",
    className: clsx(classes.root, className),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled,
    tabIndex: null,
    role: void 0,
    onFocus: handleFocus,
    onBlur: handleBlur,
    ownerState,
    ref
  }, other, {
    children: [/* @__PURE__ */ jsx(SwitchBaseInput, _extends({
      autoFocus,
      checked: checkedProp,
      defaultChecked,
      className: classes.input,
      disabled,
      id: hasLabelFor && id,
      name,
      onChange: handleInputChange,
      readOnly,
      ref: inputRef,
      required,
      ownerState,
      tabIndex,
      type
    }, type === "checkbox" && value === void 0 ? {} : {
      value
    }, inputProps)), checked ? checkedIcon : icon]
  }));
});
var SwitchBase$1 = SwitchBase;
function getSwitchUtilityClass(slot) {
  return generateUtilityClass("MuiSwitch", slot);
}
const switchClasses = generateUtilityClasses("MuiSwitch", ["root", "edgeStart", "edgeEnd", "switchBase", "colorPrimary", "colorSecondary", "sizeSmall", "sizeMedium", "checked", "disabled", "input", "thumb", "track"]);
var switchClasses$1 = switchClasses;
const _excluded$7 = ["className", "color", "edge", "size", "sx"];
const useUtilityClasses$6 = (ownerState) => {
  const {
    classes,
    edge,
    size,
    color,
    checked,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", edge && `edge${capitalize(edge)}`, `size${capitalize(size)}`],
    switchBase: ["switchBase", `color${capitalize(color)}`, checked && "checked", disabled && "disabled"],
    thumb: ["thumb"],
    track: ["track"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getSwitchUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
const SwitchRoot = styled("span", {
  name: "MuiSwitch",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.edge && styles2[`edge${capitalize(ownerState.edge)}`], styles2[`size${capitalize(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends({
  display: "inline-flex",
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: "hidden",
  padding: 12,
  boxSizing: "border-box",
  position: "relative",
  flexShrink: 0,
  zIndex: 0,
  verticalAlign: "middle",
  "@media print": {
    colorAdjust: "exact"
  }
}, ownerState.edge === "start" && {
  marginLeft: -8
}, ownerState.edge === "end" && {
  marginRight: -8
}, ownerState.size === "small" && {
  width: 40,
  height: 24,
  padding: 7,
  [`& .${switchClasses$1.thumb}`]: {
    width: 16,
    height: 16
  },
  [`& .${switchClasses$1.switchBase}`]: {
    padding: 4,
    [`&.${switchClasses$1.checked}`]: {
      transform: "translateX(16px)"
    }
  }
}));
const SwitchSwitchBase = styled(SwitchBase$1, {
  name: "MuiSwitch",
  slot: "SwitchBase",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.switchBase, {
      [`& .${switchClasses$1.input}`]: styles2.input
    }, ownerState.color !== "default" && styles2[`color${capitalize(ownerState.color)}`]];
  }
})(({
  theme
}) => ({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 1,
  color: theme.palette.mode === "light" ? theme.palette.common.white : theme.palette.grey[300],
  transition: theme.transitions.create(["left", "transform"], {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${switchClasses$1.checked}`]: {
    transform: "translateX(20px)"
  },
  [`&.${switchClasses$1.disabled}`]: {
    color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600]
  },
  [`&.${switchClasses$1.checked} + .${switchClasses$1.track}`]: {
    opacity: 0.5
  },
  [`&.${switchClasses$1.disabled} + .${switchClasses$1.track}`]: {
    opacity: theme.palette.mode === "light" ? 0.12 : 0.2
  },
  [`& .${switchClasses$1.input}`]: {
    left: "-100%",
    width: "300%"
  }
}), ({
  theme,
  ownerState
}) => _extends({
  "&:hover": {
    backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, ownerState.color !== "default" && {
  [`&.${switchClasses$1.checked}`]: {
    color: theme.palette[ownerState.color].main,
    "&:hover": {
      backgroundColor: alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    },
    [`&.${switchClasses$1.disabled}`]: {
      color: theme.palette.mode === "light" ? lighten(theme.palette[ownerState.color].main, 0.62) : darken(theme.palette[ownerState.color].main, 0.55)
    }
  },
  [`&.${switchClasses$1.checked} + .${switchClasses$1.track}`]: {
    backgroundColor: theme.palette[ownerState.color].main
  }
}));
const SwitchTrack = styled("span", {
  name: "MuiSwitch",
  slot: "Track",
  overridesResolver: (props, styles2) => styles2.track
})(({
  theme
}) => ({
  height: "100%",
  width: "100%",
  borderRadius: 14 / 2,
  zIndex: -1,
  transition: theme.transitions.create(["opacity", "background-color"], {
    duration: theme.transitions.duration.shortest
  }),
  backgroundColor: theme.palette.mode === "light" ? theme.palette.common.black : theme.palette.common.white,
  opacity: theme.palette.mode === "light" ? 0.38 : 0.3
}));
const SwitchThumb = styled("span", {
  name: "MuiSwitch",
  slot: "Thumb",
  overridesResolver: (props, styles2) => styles2.thumb
})(({
  theme
}) => ({
  boxShadow: theme.shadows[1],
  backgroundColor: "currentColor",
  width: 20,
  height: 20,
  borderRadius: "50%"
}));
const Switch = /* @__PURE__ */ React.forwardRef(function Switch2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiSwitch"
  });
  const {
    className,
    color = "primary",
    edge = false,
    size = "medium",
    sx
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$7);
  const ownerState = _extends({}, props, {
    color,
    edge,
    size
  });
  const classes = useUtilityClasses$6(ownerState);
  const icon = /* @__PURE__ */ jsx(SwitchThumb, {
    className: classes.thumb,
    ownerState
  });
  return /* @__PURE__ */ jsxs(SwitchRoot, {
    className: clsx(classes.root, className),
    sx,
    ownerState,
    children: [/* @__PURE__ */ jsx(SwitchSwitchBase, _extends({
      type: "checkbox",
      icon,
      checkedIcon: icon,
      ref,
      ownerState
    }, other, {
      classes: _extends({}, classes, {
        root: classes.switchBase
      })
    })), /* @__PURE__ */ jsx(SwitchTrack, {
      className: classes.track,
      ownerState
    })]
  });
});
var Switch$1 = Switch;
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
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [...rootOverridesResolver(props, styles2), !ownerState.disableUnderline && styles2.underline];
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
  overridesResolver: (props, styles2) => styles2.notchedOutline
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
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.size && styles2[`size${capitalize(ownerState.size)}`], ownerState.contained && styles2.contained, ownerState.filled && styles2.filled];
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
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [
      {
        [`&.${selectClasses.select}`]: styles2.select
      },
      {
        [`&.${selectClasses.select}`]: styles2[ownerState.variant]
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
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.icon, ownerState.variant && styles2[`icon${capitalize(ownerState.variant)}`], ownerState.open && styles2.iconOpen];
  }
})(nativeSelectIconStyles);
const SelectNativeInput = styled("input", {
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== "classes",
  name: "MuiSelect",
  slot: "NativeInput",
  overridesResolver: (props, styles2) => styles2.nativeInput
})({
  bottom: 0,
  left: 0,
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  width: "100%",
  boxSizing: "border-box"
});
function areEqualValues(a, b2) {
  if (typeof b2 === "object" && b2 !== null) {
    return a === b2;
  }
  return String(a) === String(b2);
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
    const index2 = childrenArray.map((child2) => child2.props.value).indexOf(event.target.value);
    if (index2 === -1) {
      return;
    }
    const child = childrenArray[index2];
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
      selected = value.some((v2) => areEqualValues(v2, child.props.value));
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
    }), /* @__PURE__ */ jsx(Menu$1, _extends({
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
  overridesResolver: (props, styles2) => styles2.root
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
var main = { exports: {} };
(function(module) {
  module.exports = function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId])
        return installedModules[moduleId].exports;
      var module2 = installedModules[moduleId] = {
        exports: {},
        id: moduleId,
        loaded: false
      };
      modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
      module2.loaded = true;
      return module2.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "";
    return __webpack_require__(0);
  }([
    function(module2, exports, __webpack_require__) {
      module2.exports = __webpack_require__(1);
    },
    function(module2, exports, __webpack_require__) {
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _interopRequireDefault2(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var _Highlighter = __webpack_require__(2);
      var _Highlighter2 = _interopRequireDefault2(_Highlighter);
      exports["default"] = _Highlighter2["default"];
      module2.exports = exports["default"];
    },
    function(module2, exports, __webpack_require__) {
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var _extends2 = Object.assign || function(target) {
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
      exports["default"] = Highlighter2;
      function _interopRequireDefault2(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      function _objectWithoutProperties(obj, keys) {
        var target = {};
        for (var i in obj) {
          if (keys.indexOf(i) >= 0)
            continue;
          if (!Object.prototype.hasOwnProperty.call(obj, i))
            continue;
          target[i] = obj[i];
        }
        return target;
      }
      var _highlightWordsCore = __webpack_require__(3);
      var _propTypes = __webpack_require__(4);
      var _propTypes2 = _interopRequireDefault2(_propTypes);
      var _react = __webpack_require__(14);
      var _memoizeOne = __webpack_require__(15);
      var _memoizeOne2 = _interopRequireDefault2(_memoizeOne);
      Highlighter2.propTypes = {
        activeClassName: _propTypes2["default"].string,
        activeIndex: _propTypes2["default"].number,
        activeStyle: _propTypes2["default"].object,
        autoEscape: _propTypes2["default"].bool,
        className: _propTypes2["default"].string,
        findChunks: _propTypes2["default"].func,
        highlightClassName: _propTypes2["default"].oneOfType([_propTypes2["default"].object, _propTypes2["default"].string]),
        highlightStyle: _propTypes2["default"].object,
        highlightTag: _propTypes2["default"].oneOfType([_propTypes2["default"].node, _propTypes2["default"].func, _propTypes2["default"].string]),
        sanitize: _propTypes2["default"].func,
        searchWords: _propTypes2["default"].arrayOf(_propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].instanceOf(RegExp)])).isRequired,
        textToHighlight: _propTypes2["default"].string.isRequired,
        unhighlightClassName: _propTypes2["default"].string,
        unhighlightStyle: _propTypes2["default"].object
      };
      function Highlighter2(_ref) {
        var _ref$activeClassName = _ref.activeClassName;
        var activeClassName = _ref$activeClassName === void 0 ? "" : _ref$activeClassName;
        var _ref$activeIndex = _ref.activeIndex;
        var activeIndex = _ref$activeIndex === void 0 ? -1 : _ref$activeIndex;
        var activeStyle = _ref.activeStyle;
        var autoEscape = _ref.autoEscape;
        var _ref$caseSensitive = _ref.caseSensitive;
        var caseSensitive = _ref$caseSensitive === void 0 ? false : _ref$caseSensitive;
        var className = _ref.className;
        var findChunks = _ref.findChunks;
        var _ref$highlightClassName = _ref.highlightClassName;
        var highlightClassName = _ref$highlightClassName === void 0 ? "" : _ref$highlightClassName;
        var _ref$highlightStyle = _ref.highlightStyle;
        var highlightStyle = _ref$highlightStyle === void 0 ? {} : _ref$highlightStyle;
        var _ref$highlightTag = _ref.highlightTag;
        var highlightTag = _ref$highlightTag === void 0 ? "mark" : _ref$highlightTag;
        var sanitize = _ref.sanitize;
        var searchWords = _ref.searchWords;
        var textToHighlight = _ref.textToHighlight;
        var _ref$unhighlightClassName = _ref.unhighlightClassName;
        var unhighlightClassName = _ref$unhighlightClassName === void 0 ? "" : _ref$unhighlightClassName;
        var unhighlightStyle = _ref.unhighlightStyle;
        var rest = _objectWithoutProperties(_ref, ["activeClassName", "activeIndex", "activeStyle", "autoEscape", "caseSensitive", "className", "findChunks", "highlightClassName", "highlightStyle", "highlightTag", "sanitize", "searchWords", "textToHighlight", "unhighlightClassName", "unhighlightStyle"]);
        var chunks = (0, _highlightWordsCore.findAll)({
          autoEscape,
          caseSensitive,
          findChunks,
          sanitize,
          searchWords,
          textToHighlight
        });
        var HighlightTag = highlightTag;
        var highlightIndex = -1;
        var highlightClassNames = "";
        var highlightStyles = void 0;
        var lowercaseProps = function lowercaseProps2(object) {
          var mapped = {};
          for (var key in object) {
            mapped[key.toLowerCase()] = object[key];
          }
          return mapped;
        };
        var memoizedLowercaseProps = (0, _memoizeOne2["default"])(lowercaseProps);
        return (0, _react.createElement)("span", _extends2({
          className
        }, rest, {
          children: chunks.map(function(chunk, index2) {
            var text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);
            if (chunk.highlight) {
              highlightIndex++;
              var highlightClass = void 0;
              if (typeof highlightClassName === "object") {
                if (!caseSensitive) {
                  highlightClassName = memoizedLowercaseProps(highlightClassName);
                  highlightClass = highlightClassName[text.toLowerCase()];
                } else {
                  highlightClass = highlightClassName[text];
                }
              } else {
                highlightClass = highlightClassName;
              }
              var isActive = highlightIndex === +activeIndex;
              highlightClassNames = highlightClass + " " + (isActive ? activeClassName : "");
              highlightStyles = isActive === true && activeStyle != null ? Object.assign({}, highlightStyle, activeStyle) : highlightStyle;
              var props = {
                children: text,
                className: highlightClassNames,
                key: index2,
                style: highlightStyles
              };
              if (typeof HighlightTag !== "string") {
                props.highlightIndex = highlightIndex;
              }
              return (0, _react.createElement)(HighlightTag, props);
            } else {
              return (0, _react.createElement)("span", {
                children: text,
                className: unhighlightClassName,
                key: index2,
                style: unhighlightStyle
              });
            }
          })
        }));
      }
      module2.exports = exports["default"];
    },
    function(module2, exports) {
      module2.exports = function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
          if (installedModules[moduleId])
            return installedModules[moduleId].exports;
          var module3 = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
          };
          modules[moduleId].call(module3.exports, module3, module3.exports, __webpack_require__);
          module3.loaded = true;
          return module3.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.p = "";
        return __webpack_require__(0);
      }([
        function(module3, exports2, __webpack_require__) {
          module3.exports = __webpack_require__(1);
        },
        function(module3, exports2, __webpack_require__) {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          var _utils = __webpack_require__(2);
          Object.defineProperty(exports2, "combineChunks", {
            enumerable: true,
            get: function get() {
              return _utils.combineChunks;
            }
          });
          Object.defineProperty(exports2, "fillInChunks", {
            enumerable: true,
            get: function get() {
              return _utils.fillInChunks;
            }
          });
          Object.defineProperty(exports2, "findAll", {
            enumerable: true,
            get: function get() {
              return _utils.findAll;
            }
          });
          Object.defineProperty(exports2, "findChunks", {
            enumerable: true,
            get: function get() {
              return _utils.findChunks;
            }
          });
        },
        function(module3, exports2) {
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.findAll = function findAll(_ref) {
            var autoEscape = _ref.autoEscape, _ref$caseSensitive = _ref.caseSensitive, caseSensitive = _ref$caseSensitive === void 0 ? false : _ref$caseSensitive, _ref$findChunks = _ref.findChunks, findChunks = _ref$findChunks === void 0 ? defaultFindChunks : _ref$findChunks, sanitize = _ref.sanitize, searchWords = _ref.searchWords, textToHighlight = _ref.textToHighlight;
            return fillInChunks({
              chunksToHighlight: combineChunks({
                chunks: findChunks({
                  autoEscape,
                  caseSensitive,
                  sanitize,
                  searchWords,
                  textToHighlight
                })
              }),
              totalLength: textToHighlight ? textToHighlight.length : 0
            });
          };
          var combineChunks = exports2.combineChunks = function combineChunks2(_ref2) {
            var chunks = _ref2.chunks;
            chunks = chunks.sort(function(first, second) {
              return first.start - second.start;
            }).reduce(function(processedChunks, nextChunk) {
              if (processedChunks.length === 0) {
                return [nextChunk];
              } else {
                var prevChunk = processedChunks.pop();
                if (nextChunk.start <= prevChunk.end) {
                  var endIndex = Math.max(prevChunk.end, nextChunk.end);
                  processedChunks.push({ start: prevChunk.start, end: endIndex });
                } else {
                  processedChunks.push(prevChunk, nextChunk);
                }
                return processedChunks;
              }
            }, []);
            return chunks;
          };
          var defaultFindChunks = function defaultFindChunks2(_ref3) {
            var autoEscape = _ref3.autoEscape, caseSensitive = _ref3.caseSensitive, _ref3$sanitize = _ref3.sanitize, sanitize = _ref3$sanitize === void 0 ? identity : _ref3$sanitize, searchWords = _ref3.searchWords, textToHighlight = _ref3.textToHighlight;
            textToHighlight = sanitize(textToHighlight);
            return searchWords.filter(function(searchWord) {
              return searchWord;
            }).reduce(function(chunks, searchWord) {
              searchWord = sanitize(searchWord);
              if (autoEscape) {
                searchWord = escapeRegExpFn(searchWord);
              }
              var regex = new RegExp(searchWord, caseSensitive ? "g" : "gi");
              var match = void 0;
              while (match = regex.exec(textToHighlight)) {
                var start = match.index;
                var end = regex.lastIndex;
                if (end > start) {
                  chunks.push({ start, end });
                }
                if (match.index == regex.lastIndex) {
                  regex.lastIndex++;
                }
              }
              return chunks;
            }, []);
          };
          exports2.findChunks = defaultFindChunks;
          var fillInChunks = exports2.fillInChunks = function fillInChunks2(_ref4) {
            var chunksToHighlight = _ref4.chunksToHighlight, totalLength = _ref4.totalLength;
            var allChunks = [];
            var append = function append2(start, end, highlight) {
              if (end - start > 0) {
                allChunks.push({
                  start,
                  end,
                  highlight
                });
              }
            };
            if (chunksToHighlight.length === 0) {
              append(0, totalLength, false);
            } else {
              var lastIndex = 0;
              chunksToHighlight.forEach(function(chunk) {
                append(lastIndex, chunk.start, false);
                append(chunk.start, chunk.end, true);
                lastIndex = chunk.end;
              });
              append(lastIndex, totalLength, false);
            }
            return allChunks;
          };
          function identity(value) {
            return value;
          }
          function escapeRegExpFn(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
          }
        }
      ]);
    },
    function(module2, exports, __webpack_require__) {
      (function(process) {
        {
          module2.exports = __webpack_require__(13)();
        }
      }).call(exports, __webpack_require__(5));
    },
    function(module2, exports) {
      var process = module2.exports = {};
      var cachedSetTimeout;
      var cachedClearTimeout;
      function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
      }
      function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
      }
      (function() {
        try {
          if (typeof setTimeout === "function") {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e2) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === "function") {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e2) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          return cachedSetTimeout(fun, 0);
        } catch (e2) {
          try {
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e3) {
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          return clearTimeout(marker);
        }
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          return cachedClearTimeout(marker);
        } catch (e2) {
          try {
            return cachedClearTimeout.call(null, marker);
          } catch (e3) {
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;
      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }
      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }
      process.nextTick = function(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      process.title = "browser";
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = "";
      process.versions = {};
      function noop() {
      }
      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;
      process.listeners = function(name) {
        return [];
      };
      process.binding = function(name) {
        throw new Error("process.binding is not supported");
      };
      process.cwd = function() {
        return "/";
      };
      process.chdir = function(dir) {
        throw new Error("process.chdir is not supported");
      };
      process.umask = function() {
        return 0;
      };
    },
    function(module2, exports, __webpack_require__) {
      (function(process) {
        var emptyFunction = __webpack_require__(7);
        var invariant = __webpack_require__(8);
        var warning = __webpack_require__(9);
        var assign = __webpack_require__(10);
        var ReactPropTypesSecret = __webpack_require__(11);
        var checkPropTypes = __webpack_require__(12);
        module2.exports = function(isValidElement, throwOnDirectAccess) {
          var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
            if (typeof iteratorFn === "function") {
              return iteratorFn;
            }
          }
          var ANONYMOUS = "<<anonymous>>";
          var ReactPropTypes = {
            array: createPrimitiveTypeChecker("array"),
            bool: createPrimitiveTypeChecker("boolean"),
            func: createPrimitiveTypeChecker("function"),
            number: createPrimitiveTypeChecker("number"),
            object: createPrimitiveTypeChecker("object"),
            string: createPrimitiveTypeChecker("string"),
            symbol: createPrimitiveTypeChecker("symbol"),
            any: createAnyTypeChecker(),
            arrayOf: createArrayOfTypeChecker,
            element: createElementTypeChecker(),
            instanceOf: createInstanceTypeChecker,
            node: createNodeChecker(),
            objectOf: createObjectOfTypeChecker,
            oneOf: createEnumTypeChecker,
            oneOfType: createUnionTypeChecker,
            shape: createShapeTypeChecker,
            exact: createStrictShapeTypeChecker
          };
          function is(x, y2) {
            if (x === y2) {
              return x !== 0 || 1 / x === 1 / y2;
            } else {
              return x !== x && y2 !== y2;
            }
          }
          function PropTypeError(message) {
            this.message = message;
            this.stack = "";
          }
          PropTypeError.prototype = Error.prototype;
          function createChainableTypeChecker(validate) {
            function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
              componentName = componentName || ANONYMOUS;
              propFullName = propFullName || propName;
              if (secret !== ReactPropTypesSecret) {
                if (throwOnDirectAccess) {
                  invariant(false, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
                }
              }
              if (props[propName] == null) {
                if (isRequired) {
                  if (props[propName] === null) {
                    return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
                  }
                  return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
                }
                return null;
              } else {
                return validate(props, propName, componentName, location, propFullName);
              }
            }
            var chainedCheckType = checkType.bind(null, false);
            chainedCheckType.isRequired = checkType.bind(null, true);
            return chainedCheckType;
          }
          function createPrimitiveTypeChecker(expectedType) {
            function validate(props, propName, componentName, location, propFullName, secret) {
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== expectedType) {
                var preciseType = getPreciseType(propValue);
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."));
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createAnyTypeChecker() {
            return createChainableTypeChecker(emptyFunction.thatReturnsNull);
          }
          function createArrayOfTypeChecker(typeChecker) {
            function validate(props, propName, componentName, location, propFullName) {
              if (typeof typeChecker !== "function") {
                return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
              }
              var propValue = props[propName];
              if (!Array.isArray(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
              }
              for (var i = 0; i < propValue.length; i++) {
                var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
                if (error instanceof Error) {
                  return error;
                }
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createElementTypeChecker() {
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              if (!isValidElement(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createInstanceTypeChecker(expectedClass) {
            function validate(props, propName, componentName, location, propFullName) {
              if (!(props[propName] instanceof expectedClass)) {
                var expectedClassName = expectedClass.name || ANONYMOUS;
                var actualClassName = getClassName(props[propName]);
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createEnumTypeChecker(expectedValues) {
            if (!Array.isArray(expectedValues)) {
              return emptyFunction.thatReturnsNull;
            }
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              for (var i = 0; i < expectedValues.length; i++) {
                if (is(propValue, expectedValues[i])) {
                  return null;
                }
              }
              var valuesString = JSON.stringify(expectedValues);
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + propValue + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
            }
            return createChainableTypeChecker(validate);
          }
          function createObjectOfTypeChecker(typeChecker) {
            function validate(props, propName, componentName, location, propFullName) {
              if (typeof typeChecker !== "function") {
                return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
              }
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== "object") {
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
              }
              for (var key in propValue) {
                if (propValue.hasOwnProperty(key)) {
                  var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                  if (error instanceof Error) {
                    return error;
                  }
                }
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createUnionTypeChecker(arrayOfTypeCheckers) {
            if (!Array.isArray(arrayOfTypeCheckers)) {
              return emptyFunction.thatReturnsNull;
            }
            for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
              var checker = arrayOfTypeCheckers[i];
              if (typeof checker !== "function") {
                warning(false, "Invalid argument supplied to oneOfType. Expected an array of check functions, but received %s at index %s.", getPostfixForTypeWarning(checker), i);
                return emptyFunction.thatReturnsNull;
              }
            }
            function validate(props, propName, componentName, location, propFullName) {
              for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
                var checker2 = arrayOfTypeCheckers[i2];
                if (checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
                  return null;
                }
              }
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`."));
            }
            return createChainableTypeChecker(validate);
          }
          function createNodeChecker() {
            function validate(props, propName, componentName, location, propFullName) {
              if (!isNode(props[propName])) {
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createShapeTypeChecker(shapeTypes) {
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== "object") {
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
              }
              for (var key in shapeTypes) {
                var checker = shapeTypes[key];
                if (!checker) {
                  continue;
                }
                var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                if (error) {
                  return error;
                }
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createStrictShapeTypeChecker(shapeTypes) {
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== "object") {
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
              }
              var allKeys = assign({}, props[propName], shapeTypes);
              for (var key in allKeys) {
                var checker = shapeTypes[key];
                if (!checker) {
                  return new PropTypeError("Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  "));
                }
                var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                if (error) {
                  return error;
                }
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function isNode(propValue) {
            switch (typeof propValue) {
              case "number":
              case "string":
              case "undefined":
                return true;
              case "boolean":
                return !propValue;
              case "object":
                if (Array.isArray(propValue)) {
                  return propValue.every(isNode);
                }
                if (propValue === null || isValidElement(propValue)) {
                  return true;
                }
                var iteratorFn = getIteratorFn(propValue);
                if (iteratorFn) {
                  var iterator = iteratorFn.call(propValue);
                  var step;
                  if (iteratorFn !== propValue.entries) {
                    while (!(step = iterator.next()).done) {
                      if (!isNode(step.value)) {
                        return false;
                      }
                    }
                  } else {
                    while (!(step = iterator.next()).done) {
                      var entry = step.value;
                      if (entry) {
                        if (!isNode(entry[1])) {
                          return false;
                        }
                      }
                    }
                  }
                } else {
                  return false;
                }
                return true;
              default:
                return false;
            }
          }
          function isSymbol(propType, propValue) {
            if (propType === "symbol") {
              return true;
            }
            if (propValue["@@toStringTag"] === "Symbol") {
              return true;
            }
            if (typeof Symbol === "function" && propValue instanceof Symbol) {
              return true;
            }
            return false;
          }
          function getPropType(propValue) {
            var propType = typeof propValue;
            if (Array.isArray(propValue)) {
              return "array";
            }
            if (propValue instanceof RegExp) {
              return "object";
            }
            if (isSymbol(propType, propValue)) {
              return "symbol";
            }
            return propType;
          }
          function getPreciseType(propValue) {
            if (typeof propValue === "undefined" || propValue === null) {
              return "" + propValue;
            }
            var propType = getPropType(propValue);
            if (propType === "object") {
              if (propValue instanceof Date) {
                return "date";
              } else if (propValue instanceof RegExp) {
                return "regexp";
              }
            }
            return propType;
          }
          function getPostfixForTypeWarning(value) {
            var type = getPreciseType(value);
            switch (type) {
              case "array":
              case "object":
                return "an " + type;
              case "boolean":
              case "date":
              case "regexp":
                return "a " + type;
              default:
                return type;
            }
          }
          function getClassName(propValue) {
            if (!propValue.constructor || !propValue.constructor.name) {
              return ANONYMOUS;
            }
            return propValue.constructor.name;
          }
          ReactPropTypes.checkPropTypes = checkPropTypes;
          ReactPropTypes.PropTypes = ReactPropTypes;
          return ReactPropTypes;
        };
      }).call(exports, __webpack_require__(5));
    },
    function(module2, exports) {
      function makeEmptyFunction(arg) {
        return function() {
          return arg;
        };
      }
      var emptyFunction = function emptyFunction2() {
      };
      emptyFunction.thatReturns = makeEmptyFunction;
      emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
      emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
      emptyFunction.thatReturnsNull = makeEmptyFunction(null);
      emptyFunction.thatReturnsThis = function() {
        return this;
      };
      emptyFunction.thatReturnsArgument = function(arg) {
        return arg;
      };
      module2.exports = emptyFunction;
    },
    function(module2, exports, __webpack_require__) {
      (function(process) {
        function invariant(condition, format, a, b2, c2, d2, e2, f2) {
          if (!condition) {
            var error;
            if (format === void 0) {
              error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            } else {
              var args = [a, b2, c2, d2, e2, f2];
              var argIndex = 0;
              error = new Error(format.replace(/%s/g, function() {
                return args[argIndex++];
              }));
              error.name = "Invariant Violation";
            }
            error.framesToPop = 1;
            throw error;
          }
        }
        module2.exports = invariant;
      }).call(exports, __webpack_require__(5));
    },
    function(module2, exports, __webpack_require__) {
      (function(process) {
        var emptyFunction = __webpack_require__(7);
        var warning = emptyFunction;
        module2.exports = warning;
      }).call(exports, __webpack_require__(5));
    },
    function(module2, exports) {
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
            return test2[n2];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    },
    function(module2, exports) {
      var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
      module2.exports = ReactPropTypesSecret;
    },
    function(module2, exports, __webpack_require__) {
      (function(process) {
        function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
        }
        module2.exports = checkPropTypes;
      }).call(exports, __webpack_require__(5));
    },
    function(module2, exports, __webpack_require__) {
      var emptyFunction = __webpack_require__(7);
      var invariant = __webpack_require__(8);
      var ReactPropTypesSecret = __webpack_require__(11);
      module2.exports = function() {
        function shim(props, propName, componentName, location, propFullName, secret) {
          if (secret === ReactPropTypesSecret) {
            return;
          }
          invariant(false, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        }
        shim.isRequired = shim;
        function getShim() {
          return shim;
        }
        var ReactPropTypes = {
          array: shim,
          bool: shim,
          func: shim,
          number: shim,
          object: shim,
          string: shim,
          symbol: shim,
          any: shim,
          arrayOf: getShim,
          element: shim,
          instanceOf: getShim,
          node: shim,
          objectOf: getShim,
          oneOf: getShim,
          oneOfType: getShim,
          shape: getShim,
          exact: getShim
        };
        ReactPropTypes.checkPropTypes = emptyFunction;
        ReactPropTypes.PropTypes = ReactPropTypes;
        return ReactPropTypes;
      };
    },
    function(module2, exports) {
      module2.exports = React__default;
    },
    function(module2, exports) {
      var simpleIsEqual = function simpleIsEqual2(a, b2) {
        return a === b2;
      };
      function index2(resultFn) {
        var isEqual = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : simpleIsEqual;
        var lastThis = void 0;
        var lastArgs = [];
        var lastResult = void 0;
        var calledOnce = false;
        var isNewArgEqualToLast = function isNewArgEqualToLast2(newArg, index3) {
          return isEqual(newArg, lastArgs[index3]);
        };
        var result = function result2() {
          for (var _len = arguments.length, newArgs = Array(_len), _key = 0; _key < _len; _key++) {
            newArgs[_key] = arguments[_key];
          }
          if (calledOnce && lastThis === this && newArgs.length === lastArgs.length && newArgs.every(isNewArgEqualToLast)) {
            return lastResult;
          }
          calledOnce = true;
          lastThis = this;
          lastArgs = newArgs;
          lastResult = resultFn.apply(this, newArgs);
          return lastResult;
        };
        return result;
      }
      module2.exports = index2;
    }
  ]);
})(main);
var Highlighter = /* @__PURE__ */ getDefaultExportFromCjs(main.exports);
var lunr$1 = { exports: {} };
/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.9
 * Copyright (C) 2020 Oliver Nightingale
 * @license MIT
 */
(function(module, exports) {
  (function() {
    var lunr2 = function(config) {
      var builder = new lunr2.Builder();
      builder.pipeline.add(lunr2.trimmer, lunr2.stopWordFilter, lunr2.stemmer);
      builder.searchPipeline.add(lunr2.stemmer);
      config.call(builder, builder);
      return builder.build();
    };
    lunr2.version = "2.3.9";
    /*!
     * lunr.utils
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.utils = {};
    lunr2.utils.warn = function(global) {
      return function(message) {
        if (global.console && console.warn) {
          console.warn(message);
        }
      };
    }(this);
    lunr2.utils.asString = function(obj) {
      if (obj === void 0 || obj === null) {
        return "";
      } else {
        return obj.toString();
      }
    };
    lunr2.utils.clone = function(obj) {
      if (obj === null || obj === void 0) {
        return obj;
      }
      var clone = Object.create(null), keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i], val = obj[key];
        if (Array.isArray(val)) {
          clone[key] = val.slice();
          continue;
        }
        if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
          clone[key] = val;
          continue;
        }
        throw new TypeError("clone is not deep and does not support nested objects");
      }
      return clone;
    };
    lunr2.FieldRef = function(docRef, fieldName, stringValue) {
      this.docRef = docRef;
      this.fieldName = fieldName;
      this._stringValue = stringValue;
    };
    lunr2.FieldRef.joiner = "/";
    lunr2.FieldRef.fromString = function(s) {
      var n2 = s.indexOf(lunr2.FieldRef.joiner);
      if (n2 === -1) {
        throw "malformed field ref string";
      }
      var fieldRef = s.slice(0, n2), docRef = s.slice(n2 + 1);
      return new lunr2.FieldRef(docRef, fieldRef, s);
    };
    lunr2.FieldRef.prototype.toString = function() {
      if (this._stringValue == void 0) {
        this._stringValue = this.fieldName + lunr2.FieldRef.joiner + this.docRef;
      }
      return this._stringValue;
    };
    /*!
     * lunr.Set
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.Set = function(elements) {
      this.elements = Object.create(null);
      if (elements) {
        this.length = elements.length;
        for (var i = 0; i < this.length; i++) {
          this.elements[elements[i]] = true;
        }
      } else {
        this.length = 0;
      }
    };
    lunr2.Set.complete = {
      intersect: function(other) {
        return other;
      },
      union: function() {
        return this;
      },
      contains: function() {
        return true;
      }
    };
    lunr2.Set.empty = {
      intersect: function() {
        return this;
      },
      union: function(other) {
        return other;
      },
      contains: function() {
        return false;
      }
    };
    lunr2.Set.prototype.contains = function(object) {
      return !!this.elements[object];
    };
    lunr2.Set.prototype.intersect = function(other) {
      var a, b2, elements, intersection = [];
      if (other === lunr2.Set.complete) {
        return this;
      }
      if (other === lunr2.Set.empty) {
        return other;
      }
      if (this.length < other.length) {
        a = this;
        b2 = other;
      } else {
        a = other;
        b2 = this;
      }
      elements = Object.keys(a.elements);
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element in b2.elements) {
          intersection.push(element);
        }
      }
      return new lunr2.Set(intersection);
    };
    lunr2.Set.prototype.union = function(other) {
      if (other === lunr2.Set.complete) {
        return lunr2.Set.complete;
      }
      if (other === lunr2.Set.empty) {
        return this;
      }
      return new lunr2.Set(Object.keys(this.elements).concat(Object.keys(other.elements)));
    };
    lunr2.idf = function(posting, documentCount) {
      var documentsWithTerm = 0;
      for (var fieldName in posting) {
        if (fieldName == "_index")
          continue;
        documentsWithTerm += Object.keys(posting[fieldName]).length;
      }
      var x = (documentCount - documentsWithTerm + 0.5) / (documentsWithTerm + 0.5);
      return Math.log(1 + Math.abs(x));
    };
    lunr2.Token = function(str, metadata) {
      this.str = str || "";
      this.metadata = metadata || {};
    };
    lunr2.Token.prototype.toString = function() {
      return this.str;
    };
    lunr2.Token.prototype.update = function(fn) {
      this.str = fn(this.str, this.metadata);
      return this;
    };
    lunr2.Token.prototype.clone = function(fn) {
      fn = fn || function(s) {
        return s;
      };
      return new lunr2.Token(fn(this.str, this.metadata), this.metadata);
    };
    /*!
     * lunr.tokenizer
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.tokenizer = function(obj, metadata) {
      if (obj == null || obj == void 0) {
        return [];
      }
      if (Array.isArray(obj)) {
        return obj.map(function(t) {
          return new lunr2.Token(lunr2.utils.asString(t).toLowerCase(), lunr2.utils.clone(metadata));
        });
      }
      var str = obj.toString().toLowerCase(), len = str.length, tokens = [];
      for (var sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++) {
        var char = str.charAt(sliceEnd), sliceLength = sliceEnd - sliceStart;
        if (char.match(lunr2.tokenizer.separator) || sliceEnd == len) {
          if (sliceLength > 0) {
            var tokenMetadata = lunr2.utils.clone(metadata) || {};
            tokenMetadata["position"] = [sliceStart, sliceLength];
            tokenMetadata["index"] = tokens.length;
            tokens.push(new lunr2.Token(str.slice(sliceStart, sliceEnd), tokenMetadata));
          }
          sliceStart = sliceEnd + 1;
        }
      }
      return tokens;
    };
    lunr2.tokenizer.separator = /[\s\-]+/;
    /*!
     * lunr.Pipeline
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.Pipeline = function() {
      this._stack = [];
    };
    lunr2.Pipeline.registeredFunctions = Object.create(null);
    lunr2.Pipeline.registerFunction = function(fn, label) {
      if (label in this.registeredFunctions) {
        lunr2.utils.warn("Overwriting existing registered function: " + label);
      }
      fn.label = label;
      lunr2.Pipeline.registeredFunctions[fn.label] = fn;
    };
    lunr2.Pipeline.warnIfFunctionNotRegistered = function(fn) {
      var isRegistered = fn.label && fn.label in this.registeredFunctions;
      if (!isRegistered) {
        lunr2.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n", fn);
      }
    };
    lunr2.Pipeline.load = function(serialised) {
      var pipeline = new lunr2.Pipeline();
      serialised.forEach(function(fnName) {
        var fn = lunr2.Pipeline.registeredFunctions[fnName];
        if (fn) {
          pipeline.add(fn);
        } else {
          throw new Error("Cannot load unregistered function: " + fnName);
        }
      });
      return pipeline;
    };
    lunr2.Pipeline.prototype.add = function() {
      var fns = Array.prototype.slice.call(arguments);
      fns.forEach(function(fn) {
        lunr2.Pipeline.warnIfFunctionNotRegistered(fn);
        this._stack.push(fn);
      }, this);
    };
    lunr2.Pipeline.prototype.after = function(existingFn, newFn) {
      lunr2.Pipeline.warnIfFunctionNotRegistered(newFn);
      var pos = this._stack.indexOf(existingFn);
      if (pos == -1) {
        throw new Error("Cannot find existingFn");
      }
      pos = pos + 1;
      this._stack.splice(pos, 0, newFn);
    };
    lunr2.Pipeline.prototype.before = function(existingFn, newFn) {
      lunr2.Pipeline.warnIfFunctionNotRegistered(newFn);
      var pos = this._stack.indexOf(existingFn);
      if (pos == -1) {
        throw new Error("Cannot find existingFn");
      }
      this._stack.splice(pos, 0, newFn);
    };
    lunr2.Pipeline.prototype.remove = function(fn) {
      var pos = this._stack.indexOf(fn);
      if (pos == -1) {
        return;
      }
      this._stack.splice(pos, 1);
    };
    lunr2.Pipeline.prototype.run = function(tokens) {
      var stackLength = this._stack.length;
      for (var i = 0; i < stackLength; i++) {
        var fn = this._stack[i];
        var memo = [];
        for (var j = 0; j < tokens.length; j++) {
          var result = fn(tokens[j], j, tokens);
          if (result === null || result === void 0 || result === "")
            continue;
          if (Array.isArray(result)) {
            for (var k2 = 0; k2 < result.length; k2++) {
              memo.push(result[k2]);
            }
          } else {
            memo.push(result);
          }
        }
        tokens = memo;
      }
      return tokens;
    };
    lunr2.Pipeline.prototype.runString = function(str, metadata) {
      var token = new lunr2.Token(str, metadata);
      return this.run([token]).map(function(t) {
        return t.toString();
      });
    };
    lunr2.Pipeline.prototype.reset = function() {
      this._stack = [];
    };
    lunr2.Pipeline.prototype.toJSON = function() {
      return this._stack.map(function(fn) {
        lunr2.Pipeline.warnIfFunctionNotRegistered(fn);
        return fn.label;
      });
    };
    /*!
     * lunr.Vector
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.Vector = function(elements) {
      this._magnitude = 0;
      this.elements = elements || [];
    };
    lunr2.Vector.prototype.positionForIndex = function(index2) {
      if (this.elements.length == 0) {
        return 0;
      }
      var start = 0, end = this.elements.length / 2, sliceLength = end - start, pivotPoint = Math.floor(sliceLength / 2), pivotIndex = this.elements[pivotPoint * 2];
      while (sliceLength > 1) {
        if (pivotIndex < index2) {
          start = pivotPoint;
        }
        if (pivotIndex > index2) {
          end = pivotPoint;
        }
        if (pivotIndex == index2) {
          break;
        }
        sliceLength = end - start;
        pivotPoint = start + Math.floor(sliceLength / 2);
        pivotIndex = this.elements[pivotPoint * 2];
      }
      if (pivotIndex == index2) {
        return pivotPoint * 2;
      }
      if (pivotIndex > index2) {
        return pivotPoint * 2;
      }
      if (pivotIndex < index2) {
        return (pivotPoint + 1) * 2;
      }
    };
    lunr2.Vector.prototype.insert = function(insertIdx, val) {
      this.upsert(insertIdx, val, function() {
        throw "duplicate index";
      });
    };
    lunr2.Vector.prototype.upsert = function(insertIdx, val, fn) {
      this._magnitude = 0;
      var position = this.positionForIndex(insertIdx);
      if (this.elements[position] == insertIdx) {
        this.elements[position + 1] = fn(this.elements[position + 1], val);
      } else {
        this.elements.splice(position, 0, insertIdx, val);
      }
    };
    lunr2.Vector.prototype.magnitude = function() {
      if (this._magnitude)
        return this._magnitude;
      var sumOfSquares = 0, elementsLength = this.elements.length;
      for (var i = 1; i < elementsLength; i += 2) {
        var val = this.elements[i];
        sumOfSquares += val * val;
      }
      return this._magnitude = Math.sqrt(sumOfSquares);
    };
    lunr2.Vector.prototype.dot = function(otherVector) {
      var dotProduct = 0, a = this.elements, b2 = otherVector.elements, aLen = a.length, bLen = b2.length, aVal = 0, bVal = 0, i = 0, j = 0;
      while (i < aLen && j < bLen) {
        aVal = a[i], bVal = b2[j];
        if (aVal < bVal) {
          i += 2;
        } else if (aVal > bVal) {
          j += 2;
        } else if (aVal == bVal) {
          dotProduct += a[i + 1] * b2[j + 1];
          i += 2;
          j += 2;
        }
      }
      return dotProduct;
    };
    lunr2.Vector.prototype.similarity = function(otherVector) {
      return this.dot(otherVector) / this.magnitude() || 0;
    };
    lunr2.Vector.prototype.toArray = function() {
      var output = new Array(this.elements.length / 2);
      for (var i = 1, j = 0; i < this.elements.length; i += 2, j++) {
        output[j] = this.elements[i];
      }
      return output;
    };
    lunr2.Vector.prototype.toJSON = function() {
      return this.elements;
    };
    /*!
     * lunr.stemmer
     * Copyright (C) 2020 Oliver Nightingale
     * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
     */
    lunr2.stemmer = function() {
      var step2list = {
        "ational": "ate",
        "tional": "tion",
        "enci": "ence",
        "anci": "ance",
        "izer": "ize",
        "bli": "ble",
        "alli": "al",
        "entli": "ent",
        "eli": "e",
        "ousli": "ous",
        "ization": "ize",
        "ation": "ate",
        "ator": "ate",
        "alism": "al",
        "iveness": "ive",
        "fulness": "ful",
        "ousness": "ous",
        "aliti": "al",
        "iviti": "ive",
        "biliti": "ble",
        "logi": "log"
      }, step3list = {
        "icate": "ic",
        "ative": "",
        "alize": "al",
        "iciti": "ic",
        "ical": "ic",
        "ful": "",
        "ness": ""
      }, c2 = "[^aeiou]", v2 = "[aeiouy]", C2 = c2 + "[^aeiouy]*", V = v2 + "[aeiou]*", mgr0 = "^(" + C2 + ")?" + V + C2, meq1 = "^(" + C2 + ")?" + V + C2 + "(" + V + ")?$", mgr1 = "^(" + C2 + ")?" + V + C2 + V + C2, s_v = "^(" + C2 + ")?" + v2;
      var re_mgr0 = new RegExp(mgr0);
      var re_mgr1 = new RegExp(mgr1);
      var re_meq1 = new RegExp(meq1);
      var re_s_v = new RegExp(s_v);
      var re_1a = /^(.+?)(ss|i)es$/;
      var re2_1a = /^(.+?)([^s])s$/;
      var re_1b = /^(.+?)eed$/;
      var re2_1b = /^(.+?)(ed|ing)$/;
      var re_1b_2 = /.$/;
      var re2_1b_2 = /(at|bl|iz)$/;
      var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
      var re4_1b_2 = new RegExp("^" + C2 + v2 + "[^aeiouwxy]$");
      var re_1c = /^(.+?[^aeiou])y$/;
      var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
      var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
      var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
      var re2_4 = /^(.+?)(s|t)(ion)$/;
      var re_5 = /^(.+?)e$/;
      var re_5_1 = /ll$/;
      var re3_5 = new RegExp("^" + C2 + v2 + "[^aeiouwxy]$");
      var porterStemmer = function porterStemmer2(w2) {
        var stem, suffix, firstch, re, re2, re3, re4;
        if (w2.length < 3) {
          return w2;
        }
        firstch = w2.substr(0, 1);
        if (firstch == "y") {
          w2 = firstch.toUpperCase() + w2.substr(1);
        }
        re = re_1a;
        re2 = re2_1a;
        if (re.test(w2)) {
          w2 = w2.replace(re, "$1$2");
        } else if (re2.test(w2)) {
          w2 = w2.replace(re2, "$1$2");
        }
        re = re_1b;
        re2 = re2_1b;
        if (re.test(w2)) {
          var fp = re.exec(w2);
          re = re_mgr0;
          if (re.test(fp[1])) {
            re = re_1b_2;
            w2 = w2.replace(re, "");
          }
        } else if (re2.test(w2)) {
          var fp = re2.exec(w2);
          stem = fp[1];
          re2 = re_s_v;
          if (re2.test(stem)) {
            w2 = stem;
            re2 = re2_1b_2;
            re3 = re3_1b_2;
            re4 = re4_1b_2;
            if (re2.test(w2)) {
              w2 = w2 + "e";
            } else if (re3.test(w2)) {
              re = re_1b_2;
              w2 = w2.replace(re, "");
            } else if (re4.test(w2)) {
              w2 = w2 + "e";
            }
          }
        }
        re = re_1c;
        if (re.test(w2)) {
          var fp = re.exec(w2);
          stem = fp[1];
          w2 = stem + "i";
        }
        re = re_2;
        if (re.test(w2)) {
          var fp = re.exec(w2);
          stem = fp[1];
          suffix = fp[2];
          re = re_mgr0;
          if (re.test(stem)) {
            w2 = stem + step2list[suffix];
          }
        }
        re = re_3;
        if (re.test(w2)) {
          var fp = re.exec(w2);
          stem = fp[1];
          suffix = fp[2];
          re = re_mgr0;
          if (re.test(stem)) {
            w2 = stem + step3list[suffix];
          }
        }
        re = re_4;
        re2 = re2_4;
        if (re.test(w2)) {
          var fp = re.exec(w2);
          stem = fp[1];
          re = re_mgr1;
          if (re.test(stem)) {
            w2 = stem;
          }
        } else if (re2.test(w2)) {
          var fp = re2.exec(w2);
          stem = fp[1] + fp[2];
          re2 = re_mgr1;
          if (re2.test(stem)) {
            w2 = stem;
          }
        }
        re = re_5;
        if (re.test(w2)) {
          var fp = re.exec(w2);
          stem = fp[1];
          re = re_mgr1;
          re2 = re_meq1;
          re3 = re3_5;
          if (re.test(stem) || re2.test(stem) && !re3.test(stem)) {
            w2 = stem;
          }
        }
        re = re_5_1;
        re2 = re_mgr1;
        if (re.test(w2) && re2.test(w2)) {
          re = re_1b_2;
          w2 = w2.replace(re, "");
        }
        if (firstch == "y") {
          w2 = firstch.toLowerCase() + w2.substr(1);
        }
        return w2;
      };
      return function(token) {
        return token.update(porterStemmer);
      };
    }();
    lunr2.Pipeline.registerFunction(lunr2.stemmer, "stemmer");
    /*!
     * lunr.stopWordFilter
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.generateStopWordFilter = function(stopWords) {
      var words = stopWords.reduce(function(memo, stopWord) {
        memo[stopWord] = stopWord;
        return memo;
      }, {});
      return function(token) {
        if (token && words[token.toString()] !== token.toString())
          return token;
      };
    };
    lunr2.stopWordFilter = lunr2.generateStopWordFilter([
      "a",
      "able",
      "about",
      "across",
      "after",
      "all",
      "almost",
      "also",
      "am",
      "among",
      "an",
      "and",
      "any",
      "are",
      "as",
      "at",
      "be",
      "because",
      "been",
      "but",
      "by",
      "can",
      "cannot",
      "could",
      "dear",
      "did",
      "do",
      "does",
      "either",
      "else",
      "ever",
      "every",
      "for",
      "from",
      "get",
      "got",
      "had",
      "has",
      "have",
      "he",
      "her",
      "hers",
      "him",
      "his",
      "how",
      "however",
      "i",
      "if",
      "in",
      "into",
      "is",
      "it",
      "its",
      "just",
      "least",
      "let",
      "like",
      "likely",
      "may",
      "me",
      "might",
      "most",
      "must",
      "my",
      "neither",
      "no",
      "nor",
      "not",
      "of",
      "off",
      "often",
      "on",
      "only",
      "or",
      "other",
      "our",
      "own",
      "rather",
      "said",
      "say",
      "says",
      "she",
      "should",
      "since",
      "so",
      "some",
      "than",
      "that",
      "the",
      "their",
      "them",
      "then",
      "there",
      "these",
      "they",
      "this",
      "tis",
      "to",
      "too",
      "twas",
      "us",
      "wants",
      "was",
      "we",
      "were",
      "what",
      "when",
      "where",
      "which",
      "while",
      "who",
      "whom",
      "why",
      "will",
      "with",
      "would",
      "yet",
      "you",
      "your"
    ]);
    lunr2.Pipeline.registerFunction(lunr2.stopWordFilter, "stopWordFilter");
    /*!
     * lunr.trimmer
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.trimmer = function(token) {
      return token.update(function(s) {
        return s.replace(/^\W+/, "").replace(/\W+$/, "");
      });
    };
    lunr2.Pipeline.registerFunction(lunr2.trimmer, "trimmer");
    /*!
     * lunr.TokenSet
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.TokenSet = function() {
      this.final = false;
      this.edges = {};
      this.id = lunr2.TokenSet._nextId;
      lunr2.TokenSet._nextId += 1;
    };
    lunr2.TokenSet._nextId = 1;
    lunr2.TokenSet.fromArray = function(arr) {
      var builder = new lunr2.TokenSet.Builder();
      for (var i = 0, len = arr.length; i < len; i++) {
        builder.insert(arr[i]);
      }
      builder.finish();
      return builder.root;
    };
    lunr2.TokenSet.fromClause = function(clause) {
      if ("editDistance" in clause) {
        return lunr2.TokenSet.fromFuzzyString(clause.term, clause.editDistance);
      } else {
        return lunr2.TokenSet.fromString(clause.term);
      }
    };
    lunr2.TokenSet.fromFuzzyString = function(str, editDistance) {
      var root = new lunr2.TokenSet();
      var stack = [{
        node: root,
        editsRemaining: editDistance,
        str
      }];
      while (stack.length) {
        var frame = stack.pop();
        if (frame.str.length > 0) {
          var char = frame.str.charAt(0), noEditNode;
          if (char in frame.node.edges) {
            noEditNode = frame.node.edges[char];
          } else {
            noEditNode = new lunr2.TokenSet();
            frame.node.edges[char] = noEditNode;
          }
          if (frame.str.length == 1) {
            noEditNode.final = true;
          }
          stack.push({
            node: noEditNode,
            editsRemaining: frame.editsRemaining,
            str: frame.str.slice(1)
          });
        }
        if (frame.editsRemaining == 0) {
          continue;
        }
        if ("*" in frame.node.edges) {
          var insertionNode = frame.node.edges["*"];
        } else {
          var insertionNode = new lunr2.TokenSet();
          frame.node.edges["*"] = insertionNode;
        }
        if (frame.str.length == 0) {
          insertionNode.final = true;
        }
        stack.push({
          node: insertionNode,
          editsRemaining: frame.editsRemaining - 1,
          str: frame.str
        });
        if (frame.str.length > 1) {
          stack.push({
            node: frame.node,
            editsRemaining: frame.editsRemaining - 1,
            str: frame.str.slice(1)
          });
        }
        if (frame.str.length == 1) {
          frame.node.final = true;
        }
        if (frame.str.length >= 1) {
          if ("*" in frame.node.edges) {
            var substitutionNode = frame.node.edges["*"];
          } else {
            var substitutionNode = new lunr2.TokenSet();
            frame.node.edges["*"] = substitutionNode;
          }
          if (frame.str.length == 1) {
            substitutionNode.final = true;
          }
          stack.push({
            node: substitutionNode,
            editsRemaining: frame.editsRemaining - 1,
            str: frame.str.slice(1)
          });
        }
        if (frame.str.length > 1) {
          var charA = frame.str.charAt(0), charB = frame.str.charAt(1), transposeNode;
          if (charB in frame.node.edges) {
            transposeNode = frame.node.edges[charB];
          } else {
            transposeNode = new lunr2.TokenSet();
            frame.node.edges[charB] = transposeNode;
          }
          if (frame.str.length == 1) {
            transposeNode.final = true;
          }
          stack.push({
            node: transposeNode,
            editsRemaining: frame.editsRemaining - 1,
            str: charA + frame.str.slice(2)
          });
        }
      }
      return root;
    };
    lunr2.TokenSet.fromString = function(str) {
      var node = new lunr2.TokenSet(), root = node;
      for (var i = 0, len = str.length; i < len; i++) {
        var char = str[i], final = i == len - 1;
        if (char == "*") {
          node.edges[char] = node;
          node.final = final;
        } else {
          var next = new lunr2.TokenSet();
          next.final = final;
          node.edges[char] = next;
          node = next;
        }
      }
      return root;
    };
    lunr2.TokenSet.prototype.toArray = function() {
      var words = [];
      var stack = [{
        prefix: "",
        node: this
      }];
      while (stack.length) {
        var frame = stack.pop(), edges = Object.keys(frame.node.edges), len = edges.length;
        if (frame.node.final) {
          frame.prefix.charAt(0);
          words.push(frame.prefix);
        }
        for (var i = 0; i < len; i++) {
          var edge = edges[i];
          stack.push({
            prefix: frame.prefix.concat(edge),
            node: frame.node.edges[edge]
          });
        }
      }
      return words;
    };
    lunr2.TokenSet.prototype.toString = function() {
      if (this._str) {
        return this._str;
      }
      var str = this.final ? "1" : "0", labels = Object.keys(this.edges).sort(), len = labels.length;
      for (var i = 0; i < len; i++) {
        var label = labels[i], node = this.edges[label];
        str = str + label + node.id;
      }
      return str;
    };
    lunr2.TokenSet.prototype.intersect = function(b2) {
      var output = new lunr2.TokenSet(), frame = void 0;
      var stack = [{
        qNode: b2,
        output,
        node: this
      }];
      while (stack.length) {
        frame = stack.pop();
        var qEdges = Object.keys(frame.qNode.edges), qLen = qEdges.length, nEdges = Object.keys(frame.node.edges), nLen = nEdges.length;
        for (var q2 = 0; q2 < qLen; q2++) {
          var qEdge = qEdges[q2];
          for (var n2 = 0; n2 < nLen; n2++) {
            var nEdge = nEdges[n2];
            if (nEdge == qEdge || qEdge == "*") {
              var node = frame.node.edges[nEdge], qNode = frame.qNode.edges[qEdge], final = node.final && qNode.final, next = void 0;
              if (nEdge in frame.output.edges) {
                next = frame.output.edges[nEdge];
                next.final = next.final || final;
              } else {
                next = new lunr2.TokenSet();
                next.final = final;
                frame.output.edges[nEdge] = next;
              }
              stack.push({
                qNode,
                output: next,
                node
              });
            }
          }
        }
      }
      return output;
    };
    lunr2.TokenSet.Builder = function() {
      this.previousWord = "";
      this.root = new lunr2.TokenSet();
      this.uncheckedNodes = [];
      this.minimizedNodes = {};
    };
    lunr2.TokenSet.Builder.prototype.insert = function(word) {
      var node, commonPrefix = 0;
      if (word < this.previousWord) {
        throw new Error("Out of order word insertion");
      }
      for (var i = 0; i < word.length && i < this.previousWord.length; i++) {
        if (word[i] != this.previousWord[i])
          break;
        commonPrefix++;
      }
      this.minimize(commonPrefix);
      if (this.uncheckedNodes.length == 0) {
        node = this.root;
      } else {
        node = this.uncheckedNodes[this.uncheckedNodes.length - 1].child;
      }
      for (var i = commonPrefix; i < word.length; i++) {
        var nextNode = new lunr2.TokenSet(), char = word[i];
        node.edges[char] = nextNode;
        this.uncheckedNodes.push({
          parent: node,
          char,
          child: nextNode
        });
        node = nextNode;
      }
      node.final = true;
      this.previousWord = word;
    };
    lunr2.TokenSet.Builder.prototype.finish = function() {
      this.minimize(0);
    };
    lunr2.TokenSet.Builder.prototype.minimize = function(downTo) {
      for (var i = this.uncheckedNodes.length - 1; i >= downTo; i--) {
        var node = this.uncheckedNodes[i], childKey = node.child.toString();
        if (childKey in this.minimizedNodes) {
          node.parent.edges[node.char] = this.minimizedNodes[childKey];
        } else {
          node.child._str = childKey;
          this.minimizedNodes[childKey] = node.child;
        }
        this.uncheckedNodes.pop();
      }
    };
    /*!
     * lunr.Index
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.Index = function(attrs) {
      this.invertedIndex = attrs.invertedIndex;
      this.fieldVectors = attrs.fieldVectors;
      this.tokenSet = attrs.tokenSet;
      this.fields = attrs.fields;
      this.pipeline = attrs.pipeline;
    };
    lunr2.Index.prototype.search = function(queryString) {
      return this.query(function(query) {
        var parser = new lunr2.QueryParser(queryString, query);
        parser.parse();
      });
    };
    lunr2.Index.prototype.query = function(fn) {
      var query = new lunr2.Query(this.fields), matchingFields = Object.create(null), queryVectors = Object.create(null), termFieldCache = Object.create(null), requiredMatches = Object.create(null), prohibitedMatches = Object.create(null);
      for (var i = 0; i < this.fields.length; i++) {
        queryVectors[this.fields[i]] = new lunr2.Vector();
      }
      fn.call(query, query);
      for (var i = 0; i < query.clauses.length; i++) {
        var clause = query.clauses[i], terms = null, clauseMatches = lunr2.Set.empty;
        if (clause.usePipeline) {
          terms = this.pipeline.runString(clause.term, {
            fields: clause.fields
          });
        } else {
          terms = [clause.term];
        }
        for (var m2 = 0; m2 < terms.length; m2++) {
          var term = terms[m2];
          clause.term = term;
          var termTokenSet = lunr2.TokenSet.fromClause(clause), expandedTerms = this.tokenSet.intersect(termTokenSet).toArray();
          if (expandedTerms.length === 0 && clause.presence === lunr2.Query.presence.REQUIRED) {
            for (var k2 = 0; k2 < clause.fields.length; k2++) {
              var field = clause.fields[k2];
              requiredMatches[field] = lunr2.Set.empty;
            }
            break;
          }
          for (var j = 0; j < expandedTerms.length; j++) {
            var expandedTerm = expandedTerms[j], posting = this.invertedIndex[expandedTerm], termIndex = posting._index;
            for (var k2 = 0; k2 < clause.fields.length; k2++) {
              var field = clause.fields[k2], fieldPosting = posting[field], matchingDocumentRefs = Object.keys(fieldPosting), termField = expandedTerm + "/" + field, matchingDocumentsSet = new lunr2.Set(matchingDocumentRefs);
              if (clause.presence == lunr2.Query.presence.REQUIRED) {
                clauseMatches = clauseMatches.union(matchingDocumentsSet);
                if (requiredMatches[field] === void 0) {
                  requiredMatches[field] = lunr2.Set.complete;
                }
              }
              if (clause.presence == lunr2.Query.presence.PROHIBITED) {
                if (prohibitedMatches[field] === void 0) {
                  prohibitedMatches[field] = lunr2.Set.empty;
                }
                prohibitedMatches[field] = prohibitedMatches[field].union(matchingDocumentsSet);
                continue;
              }
              queryVectors[field].upsert(termIndex, clause.boost, function(a, b2) {
                return a + b2;
              });
              if (termFieldCache[termField]) {
                continue;
              }
              for (var l2 = 0; l2 < matchingDocumentRefs.length; l2++) {
                var matchingDocumentRef = matchingDocumentRefs[l2], matchingFieldRef = new lunr2.FieldRef(matchingDocumentRef, field), metadata = fieldPosting[matchingDocumentRef], fieldMatch;
                if ((fieldMatch = matchingFields[matchingFieldRef]) === void 0) {
                  matchingFields[matchingFieldRef] = new lunr2.MatchData(expandedTerm, field, metadata);
                } else {
                  fieldMatch.add(expandedTerm, field, metadata);
                }
              }
              termFieldCache[termField] = true;
            }
          }
        }
        if (clause.presence === lunr2.Query.presence.REQUIRED) {
          for (var k2 = 0; k2 < clause.fields.length; k2++) {
            var field = clause.fields[k2];
            requiredMatches[field] = requiredMatches[field].intersect(clauseMatches);
          }
        }
      }
      var allRequiredMatches = lunr2.Set.complete, allProhibitedMatches = lunr2.Set.empty;
      for (var i = 0; i < this.fields.length; i++) {
        var field = this.fields[i];
        if (requiredMatches[field]) {
          allRequiredMatches = allRequiredMatches.intersect(requiredMatches[field]);
        }
        if (prohibitedMatches[field]) {
          allProhibitedMatches = allProhibitedMatches.union(prohibitedMatches[field]);
        }
      }
      var matchingFieldRefs = Object.keys(matchingFields), results = [], matches = Object.create(null);
      if (query.isNegated()) {
        matchingFieldRefs = Object.keys(this.fieldVectors);
        for (var i = 0; i < matchingFieldRefs.length; i++) {
          var matchingFieldRef = matchingFieldRefs[i];
          var fieldRef = lunr2.FieldRef.fromString(matchingFieldRef);
          matchingFields[matchingFieldRef] = new lunr2.MatchData();
        }
      }
      for (var i = 0; i < matchingFieldRefs.length; i++) {
        var fieldRef = lunr2.FieldRef.fromString(matchingFieldRefs[i]), docRef = fieldRef.docRef;
        if (!allRequiredMatches.contains(docRef)) {
          continue;
        }
        if (allProhibitedMatches.contains(docRef)) {
          continue;
        }
        var fieldVector = this.fieldVectors[fieldRef], score = queryVectors[fieldRef.fieldName].similarity(fieldVector), docMatch;
        if ((docMatch = matches[docRef]) !== void 0) {
          docMatch.score += score;
          docMatch.matchData.combine(matchingFields[fieldRef]);
        } else {
          var match = {
            ref: docRef,
            score,
            matchData: matchingFields[fieldRef]
          };
          matches[docRef] = match;
          results.push(match);
        }
      }
      return results.sort(function(a, b2) {
        return b2.score - a.score;
      });
    };
    lunr2.Index.prototype.toJSON = function() {
      var invertedIndex = Object.keys(this.invertedIndex).sort().map(function(term) {
        return [term, this.invertedIndex[term]];
      }, this);
      var fieldVectors = Object.keys(this.fieldVectors).map(function(ref) {
        return [ref, this.fieldVectors[ref].toJSON()];
      }, this);
      return {
        version: lunr2.version,
        fields: this.fields,
        fieldVectors,
        invertedIndex,
        pipeline: this.pipeline.toJSON()
      };
    };
    lunr2.Index.load = function(serializedIndex) {
      var attrs = {}, fieldVectors = {}, serializedVectors = serializedIndex.fieldVectors, invertedIndex = Object.create(null), serializedInvertedIndex = serializedIndex.invertedIndex, tokenSetBuilder = new lunr2.TokenSet.Builder(), pipeline = lunr2.Pipeline.load(serializedIndex.pipeline);
      if (serializedIndex.version != lunr2.version) {
        lunr2.utils.warn("Version mismatch when loading serialised index. Current version of lunr '" + lunr2.version + "' does not match serialized index '" + serializedIndex.version + "'");
      }
      for (var i = 0; i < serializedVectors.length; i++) {
        var tuple = serializedVectors[i], ref = tuple[0], elements = tuple[1];
        fieldVectors[ref] = new lunr2.Vector(elements);
      }
      for (var i = 0; i < serializedInvertedIndex.length; i++) {
        var tuple = serializedInvertedIndex[i], term = tuple[0], posting = tuple[1];
        tokenSetBuilder.insert(term);
        invertedIndex[term] = posting;
      }
      tokenSetBuilder.finish();
      attrs.fields = serializedIndex.fields;
      attrs.fieldVectors = fieldVectors;
      attrs.invertedIndex = invertedIndex;
      attrs.tokenSet = tokenSetBuilder.root;
      attrs.pipeline = pipeline;
      return new lunr2.Index(attrs);
    };
    /*!
     * lunr.Builder
     * Copyright (C) 2020 Oliver Nightingale
     */
    lunr2.Builder = function() {
      this._ref = "id";
      this._fields = Object.create(null);
      this._documents = Object.create(null);
      this.invertedIndex = Object.create(null);
      this.fieldTermFrequencies = {};
      this.fieldLengths = {};
      this.tokenizer = lunr2.tokenizer;
      this.pipeline = new lunr2.Pipeline();
      this.searchPipeline = new lunr2.Pipeline();
      this.documentCount = 0;
      this._b = 0.75;
      this._k1 = 1.2;
      this.termIndex = 0;
      this.metadataWhitelist = [];
    };
    lunr2.Builder.prototype.ref = function(ref) {
      this._ref = ref;
    };
    lunr2.Builder.prototype.field = function(fieldName, attributes) {
      if (/\//.test(fieldName)) {
        throw new RangeError("Field '" + fieldName + "' contains illegal character '/'");
      }
      this._fields[fieldName] = attributes || {};
    };
    lunr2.Builder.prototype.b = function(number) {
      if (number < 0) {
        this._b = 0;
      } else if (number > 1) {
        this._b = 1;
      } else {
        this._b = number;
      }
    };
    lunr2.Builder.prototype.k1 = function(number) {
      this._k1 = number;
    };
    lunr2.Builder.prototype.add = function(doc, attributes) {
      var docRef = doc[this._ref], fields = Object.keys(this._fields);
      this._documents[docRef] = attributes || {};
      this.documentCount += 1;
      for (var i = 0; i < fields.length; i++) {
        var fieldName = fields[i], extractor = this._fields[fieldName].extractor, field = extractor ? extractor(doc) : doc[fieldName], tokens = this.tokenizer(field, {
          fields: [fieldName]
        }), terms = this.pipeline.run(tokens), fieldRef = new lunr2.FieldRef(docRef, fieldName), fieldTerms = Object.create(null);
        this.fieldTermFrequencies[fieldRef] = fieldTerms;
        this.fieldLengths[fieldRef] = 0;
        this.fieldLengths[fieldRef] += terms.length;
        for (var j = 0; j < terms.length; j++) {
          var term = terms[j];
          if (fieldTerms[term] == void 0) {
            fieldTerms[term] = 0;
          }
          fieldTerms[term] += 1;
          if (this.invertedIndex[term] == void 0) {
            var posting = Object.create(null);
            posting["_index"] = this.termIndex;
            this.termIndex += 1;
            for (var k2 = 0; k2 < fields.length; k2++) {
              posting[fields[k2]] = Object.create(null);
            }
            this.invertedIndex[term] = posting;
          }
          if (this.invertedIndex[term][fieldName][docRef] == void 0) {
            this.invertedIndex[term][fieldName][docRef] = Object.create(null);
          }
          for (var l2 = 0; l2 < this.metadataWhitelist.length; l2++) {
            var metadataKey = this.metadataWhitelist[l2], metadata = term.metadata[metadataKey];
            if (this.invertedIndex[term][fieldName][docRef][metadataKey] == void 0) {
              this.invertedIndex[term][fieldName][docRef][metadataKey] = [];
            }
            this.invertedIndex[term][fieldName][docRef][metadataKey].push(metadata);
          }
        }
      }
    };
    lunr2.Builder.prototype.calculateAverageFieldLengths = function() {
      var fieldRefs = Object.keys(this.fieldLengths), numberOfFields = fieldRefs.length, accumulator = {}, documentsWithField = {};
      for (var i = 0; i < numberOfFields; i++) {
        var fieldRef = lunr2.FieldRef.fromString(fieldRefs[i]), field = fieldRef.fieldName;
        documentsWithField[field] || (documentsWithField[field] = 0);
        documentsWithField[field] += 1;
        accumulator[field] || (accumulator[field] = 0);
        accumulator[field] += this.fieldLengths[fieldRef];
      }
      var fields = Object.keys(this._fields);
      for (var i = 0; i < fields.length; i++) {
        var fieldName = fields[i];
        accumulator[fieldName] = accumulator[fieldName] / documentsWithField[fieldName];
      }
      this.averageFieldLength = accumulator;
    };
    lunr2.Builder.prototype.createFieldVectors = function() {
      var fieldVectors = {}, fieldRefs = Object.keys(this.fieldTermFrequencies), fieldRefsLength = fieldRefs.length, termIdfCache = Object.create(null);
      for (var i = 0; i < fieldRefsLength; i++) {
        var fieldRef = lunr2.FieldRef.fromString(fieldRefs[i]), fieldName = fieldRef.fieldName, fieldLength = this.fieldLengths[fieldRef], fieldVector = new lunr2.Vector(), termFrequencies = this.fieldTermFrequencies[fieldRef], terms = Object.keys(termFrequencies), termsLength = terms.length;
        var fieldBoost = this._fields[fieldName].boost || 1, docBoost = this._documents[fieldRef.docRef].boost || 1;
        for (var j = 0; j < termsLength; j++) {
          var term = terms[j], tf = termFrequencies[term], termIndex = this.invertedIndex[term]._index, idf, score, scoreWithPrecision;
          if (termIdfCache[term] === void 0) {
            idf = lunr2.idf(this.invertedIndex[term], this.documentCount);
            termIdfCache[term] = idf;
          } else {
            idf = termIdfCache[term];
          }
          score = idf * ((this._k1 + 1) * tf) / (this._k1 * (1 - this._b + this._b * (fieldLength / this.averageFieldLength[fieldName])) + tf);
          score *= fieldBoost;
          score *= docBoost;
          scoreWithPrecision = Math.round(score * 1e3) / 1e3;
          fieldVector.insert(termIndex, scoreWithPrecision);
        }
        fieldVectors[fieldRef] = fieldVector;
      }
      this.fieldVectors = fieldVectors;
    };
    lunr2.Builder.prototype.createTokenSet = function() {
      this.tokenSet = lunr2.TokenSet.fromArray(Object.keys(this.invertedIndex).sort());
    };
    lunr2.Builder.prototype.build = function() {
      this.calculateAverageFieldLengths();
      this.createFieldVectors();
      this.createTokenSet();
      return new lunr2.Index({
        invertedIndex: this.invertedIndex,
        fieldVectors: this.fieldVectors,
        tokenSet: this.tokenSet,
        fields: Object.keys(this._fields),
        pipeline: this.searchPipeline
      });
    };
    lunr2.Builder.prototype.use = function(fn) {
      var args = Array.prototype.slice.call(arguments, 1);
      args.unshift(this);
      fn.apply(this, args);
    };
    lunr2.MatchData = function(term, field, metadata) {
      var clonedMetadata = Object.create(null), metadataKeys = Object.keys(metadata || {});
      for (var i = 0; i < metadataKeys.length; i++) {
        var key = metadataKeys[i];
        clonedMetadata[key] = metadata[key].slice();
      }
      this.metadata = Object.create(null);
      if (term !== void 0) {
        this.metadata[term] = Object.create(null);
        this.metadata[term][field] = clonedMetadata;
      }
    };
    lunr2.MatchData.prototype.combine = function(otherMatchData) {
      var terms = Object.keys(otherMatchData.metadata);
      for (var i = 0; i < terms.length; i++) {
        var term = terms[i], fields = Object.keys(otherMatchData.metadata[term]);
        if (this.metadata[term] == void 0) {
          this.metadata[term] = Object.create(null);
        }
        for (var j = 0; j < fields.length; j++) {
          var field = fields[j], keys = Object.keys(otherMatchData.metadata[term][field]);
          if (this.metadata[term][field] == void 0) {
            this.metadata[term][field] = Object.create(null);
          }
          for (var k2 = 0; k2 < keys.length; k2++) {
            var key = keys[k2];
            if (this.metadata[term][field][key] == void 0) {
              this.metadata[term][field][key] = otherMatchData.metadata[term][field][key];
            } else {
              this.metadata[term][field][key] = this.metadata[term][field][key].concat(otherMatchData.metadata[term][field][key]);
            }
          }
        }
      }
    };
    lunr2.MatchData.prototype.add = function(term, field, metadata) {
      if (!(term in this.metadata)) {
        this.metadata[term] = Object.create(null);
        this.metadata[term][field] = metadata;
        return;
      }
      if (!(field in this.metadata[term])) {
        this.metadata[term][field] = metadata;
        return;
      }
      var metadataKeys = Object.keys(metadata);
      for (var i = 0; i < metadataKeys.length; i++) {
        var key = metadataKeys[i];
        if (key in this.metadata[term][field]) {
          this.metadata[term][field][key] = this.metadata[term][field][key].concat(metadata[key]);
        } else {
          this.metadata[term][field][key] = metadata[key];
        }
      }
    };
    lunr2.Query = function(allFields) {
      this.clauses = [];
      this.allFields = allFields;
    };
    lunr2.Query.wildcard = new String("*");
    lunr2.Query.wildcard.NONE = 0;
    lunr2.Query.wildcard.LEADING = 1;
    lunr2.Query.wildcard.TRAILING = 2;
    lunr2.Query.presence = {
      OPTIONAL: 1,
      REQUIRED: 2,
      PROHIBITED: 3
    };
    lunr2.Query.prototype.clause = function(clause) {
      if (!("fields" in clause)) {
        clause.fields = this.allFields;
      }
      if (!("boost" in clause)) {
        clause.boost = 1;
      }
      if (!("usePipeline" in clause)) {
        clause.usePipeline = true;
      }
      if (!("wildcard" in clause)) {
        clause.wildcard = lunr2.Query.wildcard.NONE;
      }
      if (clause.wildcard & lunr2.Query.wildcard.LEADING && clause.term.charAt(0) != lunr2.Query.wildcard) {
        clause.term = "*" + clause.term;
      }
      if (clause.wildcard & lunr2.Query.wildcard.TRAILING && clause.term.slice(-1) != lunr2.Query.wildcard) {
        clause.term = "" + clause.term + "*";
      }
      if (!("presence" in clause)) {
        clause.presence = lunr2.Query.presence.OPTIONAL;
      }
      this.clauses.push(clause);
      return this;
    };
    lunr2.Query.prototype.isNegated = function() {
      for (var i = 0; i < this.clauses.length; i++) {
        if (this.clauses[i].presence != lunr2.Query.presence.PROHIBITED) {
          return false;
        }
      }
      return true;
    };
    lunr2.Query.prototype.term = function(term, options) {
      if (Array.isArray(term)) {
        term.forEach(function(t) {
          this.term(t, lunr2.utils.clone(options));
        }, this);
        return this;
      }
      var clause = options || {};
      clause.term = term.toString();
      this.clause(clause);
      return this;
    };
    lunr2.QueryParseError = function(message, start, end) {
      this.name = "QueryParseError";
      this.message = message;
      this.start = start;
      this.end = end;
    };
    lunr2.QueryParseError.prototype = new Error();
    lunr2.QueryLexer = function(str) {
      this.lexemes = [];
      this.str = str;
      this.length = str.length;
      this.pos = 0;
      this.start = 0;
      this.escapeCharPositions = [];
    };
    lunr2.QueryLexer.prototype.run = function() {
      var state = lunr2.QueryLexer.lexText;
      while (state) {
        state = state(this);
      }
    };
    lunr2.QueryLexer.prototype.sliceString = function() {
      var subSlices = [], sliceStart = this.start, sliceEnd = this.pos;
      for (var i = 0; i < this.escapeCharPositions.length; i++) {
        sliceEnd = this.escapeCharPositions[i];
        subSlices.push(this.str.slice(sliceStart, sliceEnd));
        sliceStart = sliceEnd + 1;
      }
      subSlices.push(this.str.slice(sliceStart, this.pos));
      this.escapeCharPositions.length = 0;
      return subSlices.join("");
    };
    lunr2.QueryLexer.prototype.emit = function(type) {
      this.lexemes.push({
        type,
        str: this.sliceString(),
        start: this.start,
        end: this.pos
      });
      this.start = this.pos;
    };
    lunr2.QueryLexer.prototype.escapeCharacter = function() {
      this.escapeCharPositions.push(this.pos - 1);
      this.pos += 1;
    };
    lunr2.QueryLexer.prototype.next = function() {
      if (this.pos >= this.length) {
        return lunr2.QueryLexer.EOS;
      }
      var char = this.str.charAt(this.pos);
      this.pos += 1;
      return char;
    };
    lunr2.QueryLexer.prototype.width = function() {
      return this.pos - this.start;
    };
    lunr2.QueryLexer.prototype.ignore = function() {
      if (this.start == this.pos) {
        this.pos += 1;
      }
      this.start = this.pos;
    };
    lunr2.QueryLexer.prototype.backup = function() {
      this.pos -= 1;
    };
    lunr2.QueryLexer.prototype.acceptDigitRun = function() {
      var char, charCode;
      do {
        char = this.next();
        charCode = char.charCodeAt(0);
      } while (charCode > 47 && charCode < 58);
      if (char != lunr2.QueryLexer.EOS) {
        this.backup();
      }
    };
    lunr2.QueryLexer.prototype.more = function() {
      return this.pos < this.length;
    };
    lunr2.QueryLexer.EOS = "EOS";
    lunr2.QueryLexer.FIELD = "FIELD";
    lunr2.QueryLexer.TERM = "TERM";
    lunr2.QueryLexer.EDIT_DISTANCE = "EDIT_DISTANCE";
    lunr2.QueryLexer.BOOST = "BOOST";
    lunr2.QueryLexer.PRESENCE = "PRESENCE";
    lunr2.QueryLexer.lexField = function(lexer) {
      lexer.backup();
      lexer.emit(lunr2.QueryLexer.FIELD);
      lexer.ignore();
      return lunr2.QueryLexer.lexText;
    };
    lunr2.QueryLexer.lexTerm = function(lexer) {
      if (lexer.width() > 1) {
        lexer.backup();
        lexer.emit(lunr2.QueryLexer.TERM);
      }
      lexer.ignore();
      if (lexer.more()) {
        return lunr2.QueryLexer.lexText;
      }
    };
    lunr2.QueryLexer.lexEditDistance = function(lexer) {
      lexer.ignore();
      lexer.acceptDigitRun();
      lexer.emit(lunr2.QueryLexer.EDIT_DISTANCE);
      return lunr2.QueryLexer.lexText;
    };
    lunr2.QueryLexer.lexBoost = function(lexer) {
      lexer.ignore();
      lexer.acceptDigitRun();
      lexer.emit(lunr2.QueryLexer.BOOST);
      return lunr2.QueryLexer.lexText;
    };
    lunr2.QueryLexer.lexEOS = function(lexer) {
      if (lexer.width() > 0) {
        lexer.emit(lunr2.QueryLexer.TERM);
      }
    };
    lunr2.QueryLexer.termSeparator = lunr2.tokenizer.separator;
    lunr2.QueryLexer.lexText = function(lexer) {
      while (true) {
        var char = lexer.next();
        if (char == lunr2.QueryLexer.EOS) {
          return lunr2.QueryLexer.lexEOS;
        }
        if (char.charCodeAt(0) == 92) {
          lexer.escapeCharacter();
          continue;
        }
        if (char == ":") {
          return lunr2.QueryLexer.lexField;
        }
        if (char == "~") {
          lexer.backup();
          if (lexer.width() > 0) {
            lexer.emit(lunr2.QueryLexer.TERM);
          }
          return lunr2.QueryLexer.lexEditDistance;
        }
        if (char == "^") {
          lexer.backup();
          if (lexer.width() > 0) {
            lexer.emit(lunr2.QueryLexer.TERM);
          }
          return lunr2.QueryLexer.lexBoost;
        }
        if (char == "+" && lexer.width() === 1) {
          lexer.emit(lunr2.QueryLexer.PRESENCE);
          return lunr2.QueryLexer.lexText;
        }
        if (char == "-" && lexer.width() === 1) {
          lexer.emit(lunr2.QueryLexer.PRESENCE);
          return lunr2.QueryLexer.lexText;
        }
        if (char.match(lunr2.QueryLexer.termSeparator)) {
          return lunr2.QueryLexer.lexTerm;
        }
      }
    };
    lunr2.QueryParser = function(str, query) {
      this.lexer = new lunr2.QueryLexer(str);
      this.query = query;
      this.currentClause = {};
      this.lexemeIdx = 0;
    };
    lunr2.QueryParser.prototype.parse = function() {
      this.lexer.run();
      this.lexemes = this.lexer.lexemes;
      var state = lunr2.QueryParser.parseClause;
      while (state) {
        state = state(this);
      }
      return this.query;
    };
    lunr2.QueryParser.prototype.peekLexeme = function() {
      return this.lexemes[this.lexemeIdx];
    };
    lunr2.QueryParser.prototype.consumeLexeme = function() {
      var lexeme = this.peekLexeme();
      this.lexemeIdx += 1;
      return lexeme;
    };
    lunr2.QueryParser.prototype.nextClause = function() {
      var completedClause = this.currentClause;
      this.query.clause(completedClause);
      this.currentClause = {};
    };
    lunr2.QueryParser.parseClause = function(parser) {
      var lexeme = parser.peekLexeme();
      if (lexeme == void 0) {
        return;
      }
      switch (lexeme.type) {
        case lunr2.QueryLexer.PRESENCE:
          return lunr2.QueryParser.parsePresence;
        case lunr2.QueryLexer.FIELD:
          return lunr2.QueryParser.parseField;
        case lunr2.QueryLexer.TERM:
          return lunr2.QueryParser.parseTerm;
        default:
          var errorMessage = "expected either a field or a term, found " + lexeme.type;
          if (lexeme.str.length >= 1) {
            errorMessage += " with value '" + lexeme.str + "'";
          }
          throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }
    };
    lunr2.QueryParser.parsePresence = function(parser) {
      var lexeme = parser.consumeLexeme();
      if (lexeme == void 0) {
        return;
      }
      switch (lexeme.str) {
        case "-":
          parser.currentClause.presence = lunr2.Query.presence.PROHIBITED;
          break;
        case "+":
          parser.currentClause.presence = lunr2.Query.presence.REQUIRED;
          break;
        default:
          var errorMessage = "unrecognised presence operator'" + lexeme.str + "'";
          throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }
      var nextLexeme = parser.peekLexeme();
      if (nextLexeme == void 0) {
        var errorMessage = "expecting term or field, found nothing";
        throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }
      switch (nextLexeme.type) {
        case lunr2.QueryLexer.FIELD:
          return lunr2.QueryParser.parseField;
        case lunr2.QueryLexer.TERM:
          return lunr2.QueryParser.parseTerm;
        default:
          var errorMessage = "expecting term or field, found '" + nextLexeme.type + "'";
          throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
      }
    };
    lunr2.QueryParser.parseField = function(parser) {
      var lexeme = parser.consumeLexeme();
      if (lexeme == void 0) {
        return;
      }
      if (parser.query.allFields.indexOf(lexeme.str) == -1) {
        var possibleFields = parser.query.allFields.map(function(f2) {
          return "'" + f2 + "'";
        }).join(", "), errorMessage = "unrecognised field '" + lexeme.str + "', possible fields: " + possibleFields;
        throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }
      parser.currentClause.fields = [lexeme.str];
      var nextLexeme = parser.peekLexeme();
      if (nextLexeme == void 0) {
        var errorMessage = "expecting term, found nothing";
        throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }
      switch (nextLexeme.type) {
        case lunr2.QueryLexer.TERM:
          return lunr2.QueryParser.parseTerm;
        default:
          var errorMessage = "expecting term, found '" + nextLexeme.type + "'";
          throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
      }
    };
    lunr2.QueryParser.parseTerm = function(parser) {
      var lexeme = parser.consumeLexeme();
      if (lexeme == void 0) {
        return;
      }
      parser.currentClause.term = lexeme.str.toLowerCase();
      if (lexeme.str.indexOf("*") != -1) {
        parser.currentClause.usePipeline = false;
      }
      var nextLexeme = parser.peekLexeme();
      if (nextLexeme == void 0) {
        parser.nextClause();
        return;
      }
      switch (nextLexeme.type) {
        case lunr2.QueryLexer.TERM:
          parser.nextClause();
          return lunr2.QueryParser.parseTerm;
        case lunr2.QueryLexer.FIELD:
          parser.nextClause();
          return lunr2.QueryParser.parseField;
        case lunr2.QueryLexer.EDIT_DISTANCE:
          return lunr2.QueryParser.parseEditDistance;
        case lunr2.QueryLexer.BOOST:
          return lunr2.QueryParser.parseBoost;
        case lunr2.QueryLexer.PRESENCE:
          parser.nextClause();
          return lunr2.QueryParser.parsePresence;
        default:
          var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
          throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
      }
    };
    lunr2.QueryParser.parseEditDistance = function(parser) {
      var lexeme = parser.consumeLexeme();
      if (lexeme == void 0) {
        return;
      }
      var editDistance = parseInt(lexeme.str, 10);
      if (isNaN(editDistance)) {
        var errorMessage = "edit distance must be numeric";
        throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }
      parser.currentClause.editDistance = editDistance;
      var nextLexeme = parser.peekLexeme();
      if (nextLexeme == void 0) {
        parser.nextClause();
        return;
      }
      switch (nextLexeme.type) {
        case lunr2.QueryLexer.TERM:
          parser.nextClause();
          return lunr2.QueryParser.parseTerm;
        case lunr2.QueryLexer.FIELD:
          parser.nextClause();
          return lunr2.QueryParser.parseField;
        case lunr2.QueryLexer.EDIT_DISTANCE:
          return lunr2.QueryParser.parseEditDistance;
        case lunr2.QueryLexer.BOOST:
          return lunr2.QueryParser.parseBoost;
        case lunr2.QueryLexer.PRESENCE:
          parser.nextClause();
          return lunr2.QueryParser.parsePresence;
        default:
          var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
          throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
      }
    };
    lunr2.QueryParser.parseBoost = function(parser) {
      var lexeme = parser.consumeLexeme();
      if (lexeme == void 0) {
        return;
      }
      var boost = parseInt(lexeme.str, 10);
      if (isNaN(boost)) {
        var errorMessage = "boost must be numeric";
        throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }
      parser.currentClause.boost = boost;
      var nextLexeme = parser.peekLexeme();
      if (nextLexeme == void 0) {
        parser.nextClause();
        return;
      }
      switch (nextLexeme.type) {
        case lunr2.QueryLexer.TERM:
          parser.nextClause();
          return lunr2.QueryParser.parseTerm;
        case lunr2.QueryLexer.FIELD:
          parser.nextClause();
          return lunr2.QueryParser.parseField;
        case lunr2.QueryLexer.EDIT_DISTANCE:
          return lunr2.QueryParser.parseEditDistance;
        case lunr2.QueryLexer.BOOST:
          return lunr2.QueryParser.parseBoost;
        case lunr2.QueryLexer.PRESENCE:
          parser.nextClause();
          return lunr2.QueryParser.parsePresence;
        default:
          var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
          throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
      }
    };
    (function(root, factory) {
      {
        module.exports = factory();
      }
    })(this, function() {
      return lunr2;
    });
  })();
})(lunr$1);
var lunr = lunr$1.exports;
let index;
const projectIndizes = new Map();
documents$.subscribe(() => {
  index = void 0;
});
const createIndex = () => {
  if (index) {
    return;
  }
  const documentsByProject = new Map();
  index = lunr(function() {
    this.ref("slug");
    this.field("content");
    documents$.value.forEach((document2) => {
      this.add({
        slug: document2.slug,
        content: document2.mdx + " " + document2.plain
      });
      if (!documentsByProject.has(document2.projectSlug)) {
        documentsByProject.set(document2.projectSlug, []);
      }
      documentsByProject.get(document2.projectSlug).push(document2);
    });
  });
  projectIndizes.clear();
  documentsByProject.forEach((documents, projectSlug) => {
    projectIndizes.set(projectSlug, lunr(function() {
      this.ref("slug");
      this.field("content");
      documents.forEach((document2) => {
        this.add({
          slug: document2.slug,
          content: document2.mdx + " " + document2.plain
        });
      });
    }));
  });
};
const searchDocuments = (query, projectSlug) => {
  if (query.length > 2) {
    createIndex();
    const indexToSeach = projectSlug ? projectIndizes.get(projectSlug) : index;
    if (indexToSeach) {
      const result = indexToSeach.search(query).map((result2) => {
        return documents$.value.get(result2.ref);
      });
      return result;
    }
  }
  return [];
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 900,
  minHeight: "60vh",
  maxHeight: "80vh",
  padding: 2,
  ["& > div"]: {
    bgcolor: "background.paper",
    border: "2px solid background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 2
  }
};
const StyledAutocompletePopper = default_1$6("div")(({
  theme
}) => ({
  [`& .${autocompleteClasses$1.paper}`]: {
    boxShadow: "none",
    margin: 0,
    color: "inherit",
    fontSize: 13,
    overflow: "visible"
  },
  [`& .${autocompleteClasses$1.listbox}`]: {
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
    padding: 0,
    maxHeight: "70vh",
    [`& .${autocompleteClasses$1.option}`]: {
      minHeight: "auto",
      alignItems: "flex-start",
      padding: 8,
      borderBottom: `1px solid  ${theme.palette.mode === "light" ? " #eaecef" : "#30363d"}`,
      border: "2px solid " + theme.palette.primary.light,
      borderRadius: "4px",
      marginTop: "5px",
      marginBottom: "5px",
      h1: {
        fontSize: "1.5em",
        margin: "0px"
      },
      h2: {
        fontSize: "1.2em",
        margin: "0px"
      },
      '&[aria-selected="true"]': {
        backgroundColor: "transparent"
      },
      '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
        backgroundColor: theme.palette.primary.light
      }
    }
  },
  [`&.${autocompleteClasses$1.popperDisablePortal}`]: {
    position: "relative"
  },
  [".meta"]: {
    backgroundColor: theme.palette.primary.light,
    padding: "8px",
    borderRadius: "4px",
    width: "100%",
    color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  [".hit"]: {
    backgroundColor: theme.palette.action.hover,
    padding: "4px",
    borderRadius: "4px",
    width: "100%"
  }
}));
const ProjectToggle = default_1$6(FormGroup$1)(({
  theme
}) => ({
  display: "flex",
  alignItems: "flex-end",
  marginTop: -10,
  marginRight: -10,
  color: "primary"
}));
function PopperComponent(props) {
  const _a = props, {
    disablePortal,
    anchorEl,
    open
  } = _a, other = __objRest(_a, [
    "disablePortal",
    "anchorEl",
    "open"
  ]);
  return /* @__PURE__ */ jsx(StyledAutocompletePopper, __spreadValues({}, other));
}
const excerptCache = new Map();
const getExcerpts = (text, query) => {
  var _a;
  const cacheId = text + query;
  if (excerptCache.has(cacheId)) {
    return excerptCache.get(cacheId);
  }
  const queryRegExp = new RegExp(query.split(" ").join("|"), "g");
  const hits = [];
  let prevSentences = [];
  let lastSeenHitIndex = 0;
  let lastHit;
  const maxHits = 3;
  for (const sentence of text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")) {
    if (((_a = sentence.match(queryRegExp)) == null ? void 0 : _a.length) > 0) {
      lastHit = prevSentences.join("") + sentence;
      prevSentences = [];
      lastSeenHitIndex = 0;
      hits.push(lastHit);
      continue;
    } else if (lastHit && lastSeenHitIndex < 3) {
      lastHit += sentence;
      lastSeenHitIndex++;
    } else if (hits.length >= maxHits) {
      break;
    }
    if (prevSentences.length < 3) {
      prevSentences.push(sentence);
    }
  }
  excerptCache.set(cacheId, hits);
  return hits;
};
const SearchOverlay = ({
  show$
}) => {
  const show = useLayoutObservableState(show$);
  const handleClose = () => show$.next(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const params = useParams();
  const [searchAll, searchAll$] = useObservableAndState(() => new ValueSubject(true));
  const query$ = useObservable(() => new ValueSubject(""));
  const searchProject$ = useObservable((inputs$) => combineLatest([inputs$, searchAll$]).pipe(map(([inputs, searchAll2]) => !searchAll2 ? inputs[0].projectSlug : void 0)), [params]);
  const [hits] = useObservableState((input$) => combineLatest([query$, searchProject$]).pipe(debounceTime(300), map(([query, searchProject]) => searchDocuments(query, searchProject)), startWith([])));
  useEffect(() => {
    if (show$.value !== false) {
      show$.next(false);
    }
  }, [params]);
  const onChange = useCallback((e2, option) => {
    if (option instanceof Object) {
      navigate(`/docs/${option.projectSlug}/${option.slug}`, {
        replace: true
      });
    }
    inputRef.current.value = "";
    show$.next(false);
  }, [params]);
  const renderSearch = () => {
    return /* @__PURE__ */ jsx(Box, {
      sx: __spreadProps(__spreadValues({}, style), {
        width: "100%"
      }),
      children: /* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsx(Autocomplete$1, {
          id: "search-input",
          freeSolo: true,
          filterOptions: (x) => x,
          onInputChange: (event, newInputValue) => {
            query$.next(newInputValue.split(" ").filter((q2) => q2.length > 2).join(" "));
          },
          onChange,
          PopperComponent,
          options: hits,
          getOptionLabel: (option) => {
            var _a;
            return (_a = option == null ? void 0 : option.name) != null ? _a : "";
          },
          renderOption: (props, option, {
            selected
          }) => /* @__PURE__ */ jsx("li", __spreadProps(__spreadValues({}, props), {
            children: /* @__PURE__ */ jsxs(Box, {
              children: [/* @__PURE__ */ jsxs("div", {
                className: "meta",
                children: [/* @__PURE__ */ jsx("h1", {
                  children: option.name
                }), /* @__PURE__ */ jsxs("h2", {
                  children: ["path: ", option.path]
                })]
              }), getExcerpts(option.plain, query$.value).map((hit) => /* @__PURE__ */ jsxs("p", {
                className: "hit",
                children: [/* @__PURE__ */ jsx("span", {
                  children: "[...] "
                }), /* @__PURE__ */ jsx(Highlighter, {
                  highlightClassName: "highlight",
                  searchWords: query$.value.split(" "),
                  autoEscape: true,
                  textToHighlight: hit
                }), /* @__PURE__ */ jsx("span", {
                  children: " [...]"
                })]
              }, hit))]
            })
          })),
          renderInput: (params2) => /* @__PURE__ */ jsxs(Box, {
            children: [/* @__PURE__ */ jsx(ProjectToggle, {
              children: /* @__PURE__ */ jsx(FormControlLabel$1, {
                control: /* @__PURE__ */ jsx(Switch$1, {
                  checked: searchAll,
                  onClick: () => {
                    searchAll$.next(!searchAll$.value);
                  }
                }),
                label: "search all projects"
              })
            }), /* @__PURE__ */ jsx(TextField$1, __spreadProps(__spreadValues({}, params2), {
              label: "Type to search...",
              inputRef,
              autoFocus: true
            }))]
          })
        })
      })
    });
  };
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx(Modal$1, {
      open: show,
      onClose: handleClose,
      closeAfterTransition: true,
      BackdropComponent: Backdrop$1,
      BackdropProps: {
        timeout: 500
      },
      children: show ? renderSearch() : /* @__PURE__ */ jsx(Fragment, {})
    })
  });
};
var Brightness4 = {};
var _interopRequireDefault$1 = interopRequireDefault.exports;
Object.defineProperty(Brightness4, "__esModule", {
  value: true
});
var default_1$1 = Brightness4.default = void 0;
var _createSvgIcon$1 = _interopRequireDefault$1(createSvgIcon);
var _jsxRuntime$1 = require$$2;
var _default$1 = (0, _createSvgIcon$1.default)(/* @__PURE__ */ (0, _jsxRuntime$1.jsx)("path", {
  d: "M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"
}), "Brightness4");
default_1$1 = Brightness4.default = _default$1;
var Brightness7 = {};
var _interopRequireDefault = interopRequireDefault.exports;
Object.defineProperty(Brightness7, "__esModule", {
  value: true
});
var default_1 = Brightness7.default = void 0;
var _createSvgIcon = _interopRequireDefault(createSvgIcon);
var _jsxRuntime = require$$2;
var _default = (0, _createSvgIcon.default)(/* @__PURE__ */ (0, _jsxRuntime.jsx)("path", {
  d: "M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"
}), "Brightness7");
default_1 = Brightness7.default = _default;
const syntaxThemes = ["a11yDark", "a11yLight", "agate", "anOldHope", "androidstudio", "arduinoLight", "arta", "ascetic", "atelierCaveDark", "atelierCaveLight", "atelierDuneDark", "atelierDuneLight", "atelierEstuaryDark", "atelierEstuaryLight", "atelierForestDark", "atelierForestLight", "atelierHeathDark", "atelierHeathLight", "atelierLakesideDark", "atelierLakesideLight", "atelierPlateauDark", "atelierPlateauLight", "atelierSavannaDark", "atelierSavannaLight", "atelierSeasideDark", "atelierSeasideLight", "atelierSulphurpoolDark", "atelierSulphurpoolLight", "atomOneDark", "atomOneDarkReasonable", "atomOneLight", "brownPaper", "codepenEmbed", "colorBrewer", "darcula", "dark", "defaultStyle", "docco", "dracula", "far", "foundation", "github", "githubGist", "gml", "googlecode", "gradientDark", "gradientLight", "grayscale", "gruvboxDark", "gruvboxLight", "hopscotch", "hybrid", "idea", "irBlack", "isblEditorDark", "isblEditorLight", "kimbieDark", "kimbieLight", "lightfair", "lioshi", "magula", "monoBlue", "monokai", "monokaiSublime", "nightOwl", "nnfx", "nnfxDark", "nord", "obsidian", "ocean", "paraisoDark", "paraisoLight", "pojoaque", "purebasic", "qtcreatorDark", "qtcreatorLight", "railscasts", "rainbow", "routeros", "schoolBook", "shadesOfPurple", "solarizedDark", "solarizedLight", "srcery", "stackoverflowDark", "stackoverflowLight", "sunburst", "tomorrow", "tomorrowNight", "tomorrowNightBlue", "tomorrowNightBright", "tomorrowNightEighties", "vs", "vs2015", "xcode", "xt256", "zenburn"];
const SearchInputWrapper = styled("div")(({
  theme
}) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto"
  }
}));
const SearchIconWrapper = styled("div")(({
  theme
}) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));
const StyledInputBase = styled(InputBase)(({
  theme
}) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch"
    }
  }
}));
const Progress = styled(LinearProgress$1)(({
  theme
}) => ({
  position: "fixed",
  top: 0,
  right: 0,
  left: 0
}));
const showSearch$ = new ValueSubject(false);
const FavButton = styled(default_1$7)(({
  theme
}) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
  "&:hover": {
    color: "red"
  }
}));
const NavButton = styled(IconButton)(({
  theme
}) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
  "&:hover": {
    color: theme.palette.primary.dark
  }
}));
const NavMenu = ({
  items,
  children,
  tooltip
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (items == null ? void 0 : items.length) > 0 ? /* @__PURE__ */ jsxs(Fragment$1, {
    children: [/* @__PURE__ */ jsx(Tooltip, {
      title: tooltip,
      children: /* @__PURE__ */ jsx(NavButton, {
        "aria-label": tooltip,
        onClick: handleClick,
        children
      })
    }), /* @__PURE__ */ jsx(Menu$1, {
      id: "fav-menu",
      anchorEl,
      open,
      onClose: handleClose,
      PaperProps: {
        style: {
          maxHeight: "80vh",
          width: "100%",
          maxWidth: "200px"
        }
      },
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right"
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "right"
      },
      children: items.map(({
        onClick,
        label,
        key
      }) => /* @__PURE__ */ jsx(MenuItem$1, {
        onClick: () => {
          onClick();
          handleClose();
        },
        children: label
      }, key))
    })]
  }) : /* @__PURE__ */ jsx(Fragment, {});
};
const FavMenu = () => {
  var _a;
  const [favDocs] = useObservableState(() => documents$.pipe(map((docs) => Array.from(docs.values()).filter((doc) => doc.isFavourite))));
  const navigate = useNavigate();
  const onFavClicked = (doc) => {
    navigate(`/docs/${doc.projectSlug}/${doc.slug}`, {
      replace: true
    });
  };
  return /* @__PURE__ */ jsx(NavMenu, {
    tooltip: "Favourites",
    items: (_a = favDocs == null ? void 0 : favDocs.map((doc) => ({
      key: doc.slug,
      label: doc.name,
      onClick: () => onFavClicked(doc)
    }))) != null ? _a : [],
    children: /* @__PURE__ */ jsx(FavButton, {})
  });
};
const SyntaxMenu = () => {
  var _a;
  return /* @__PURE__ */ jsx(NavMenu, {
    tooltip: "Syntax theme",
    items: (_a = syntaxThemes.map((theme) => {
      return {
        key: theme,
        label: theme,
        onClick: () => {
          codeTheme$.next(theme);
        }
      };
    })) != null ? _a : [],
    children: /* @__PURE__ */ jsx(default_1$5, {})
  });
};
const NavAppBar = styled(AppBar$1)(({
  theme
}) => ({
  "a, a:link, a:visited, a:hover, a:active": {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    textDecoration: "none"
  },
  "a:hover": {
    textDecoration: "underline"
  }
}));
function Navbar() {
  const [hasDocumentsFetching] = useObservableAndState(() => combineLatest(queuedDocuments$, fetchingDocuments$).pipe(map(([queuedDocuments, fetchingDocuments]) => queuedDocuments.docs.size > 0 || fetchingDocuments.size > 0)));
  const {
    title = "documentation"
  } = useDocOptions();
  const params = useParams();
  const location = useLocation();
  const {
    mode,
    toggleColorMode
  } = useColorModeContext();
  return /* @__PURE__ */ jsxs(Box, {
    sx: {
      flex: 0,
      position: "sticky",
      top: 0,
      zIndex: 1e3
    },
    children: [hasDocumentsFetching && /* @__PURE__ */ jsx(Progress, {}), /* @__PURE__ */ jsx(NavAppBar, {
      position: "static",
      children: /* @__PURE__ */ jsxs(Toolbar$1, {
        children: [/* @__PURE__ */ jsx(Typography, {
          variant: "h6",
          noWrap: true,
          component: "div",
          sx: {
            flexGrow: 1,
            display: {
              xs: "none",
              sm: "block"
            }
          },
          children: /* @__PURE__ */ jsx(Link, {
            to: "/docs/",
            children: title
          })
        }), params.contentSlug && location.pathname.startsWith("/docs") && /* @__PURE__ */ jsx(Tooltip, {
          title: "edit current document",
          children: /* @__PURE__ */ jsx(Link, {
            to: `/editor/${params.projectSlug}/${params.contentSlug}`,
            children: /* @__PURE__ */ jsx(NavButton, {
              "aria-label": "editor",
              children: /* @__PURE__ */ jsx(default_1$4, {})
            })
          })
        }), /* @__PURE__ */ jsx(Tooltip, {
          title: "create document",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/editor/" + params.projectSlug,
            children: /* @__PURE__ */ jsx(NavButton, {
              "aria-label": "editor",
              children: /* @__PURE__ */ jsx(default_1$3, {})
            })
          })
        }), /* @__PURE__ */ jsx(SyntaxMenu, {}), /* @__PURE__ */ jsx(FavMenu, {}), /* @__PURE__ */ jsx(NavButton, {
          "aria-label": "toggle dark mode",
          onClick: toggleColorMode,
          children: mode === "light" ? /* @__PURE__ */ jsx(default_1$1, {
            sx: {
              fontSize: 20
            }
          }) : /* @__PURE__ */ jsx(default_1, {
            sx: {
              fontSize: 20
            }
          })
        }), /* @__PURE__ */ jsxs(SearchInputWrapper, {
          sx: {
            cursor: "text"
          },
          onClick: (e2) => {
            e2.currentTarget.blur();
            showSearch$.next(true);
          },
          children: [/* @__PURE__ */ jsx(SearchIconWrapper, {
            children: /* @__PURE__ */ jsx(default_1$2, {})
          }), /* @__PURE__ */ jsx(StyledInputBase, {
            onFocus: (e2) => {
              e2.target.blur();
              showSearch$.next(true);
            },
            placeholder: "Search\u2026",
            inputProps: {
              "aria-label": "search"
            }
          })]
        })]
      })
    }), /* @__PURE__ */ jsx(SearchOverlay, {
      show$: showSearch$
    })]
  });
}
export { Navbar, Navbar as default };
//# sourceMappingURL=navbar.js.map
