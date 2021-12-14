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
import { l as useId, n as useControlled, a as useEventCallback, s as setRef, u as useForkRef, t as getDefaultExportFromCjs, d as default_1 } from "./styled.js";
import * as React from "react";
import React__default, { useRef, useEffect, useCallback } from "react";
import { b as useNavigate, u as useParams } from "./doks.js";
import { combineLatest, map, debounceTime, startWith } from "rxjs";
import { u as useObservableAndState } from "./use_observable_and_state.js";
import { d as documents$, V as ValueSubject } from "./documents.js";
import { _ as _extends, g as generateUtilityClass, f as generateUtilityClasses, s as styled, m as capitalize, h as useThemeProps, i as _objectWithoutPropertiesLoose, k as composeClasses, j as jsx, l as clsx, q as alpha, d as jsxs, p as lighten, o as darken, F as Fragment } from "./main.js";
import { i as useSubscriptionInternal, j as useIsomorphicLayoutEffect, k as useObservableStateInternal, a as createSvgIcon, B as ButtonBase, I as IconButton, P as Paper, T as Typography, b as useObservable, u as useObservableState } from "./IconButton.js";
import { a as Modal, B as Backdrop } from "./Menu.js";
import { a as Box } from "./Button.js";
import { i as inputClasses, A as ArrowDropDownIcon } from "./Input.js";
import { e as inputBaseClasses, u as useFormControl } from "./InputBase.js";
import { o as outlinedInputClasses, f as filledInputClasses, T as TextField } from "./TextField.js";
import { C as ClearIcon } from "./Close.js";
import { P as Popper } from "./Tooltip.js";
import "react-dom";
import "rxjs/operators";
import "./react-is.production.min.js";
import "./isHostComponent.js";
import "./markdown_renderer.js";
import "./index.js";
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
function getListSubheaderUtilityClass(slot) {
  return generateUtilityClass("MuiListSubheader", slot);
}
generateUtilityClasses("MuiListSubheader", ["root", "colorPrimary", "colorInherit", "gutters", "inset", "sticky"]);
const _excluded$6 = ["className", "color", "component", "disableGutters", "disableSticky", "inset"];
const useUtilityClasses$6 = (ownerState) => {
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.color !== "default" && styles[`color${capitalize(ownerState.color)}`], !ownerState.disableGutters && styles.gutters, ownerState.inset && styles.inset, !ownerState.disableSticky && styles.sticky];
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$6);
  const ownerState = _extends({}, props, {
    color,
    component,
    disableGutters,
    disableSticky,
    inset
  });
  const classes = useUtilityClasses$6(ownerState);
  return /* @__PURE__ */ jsx(ListSubheaderRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    ref,
    ownerState
  }, other));
});
var ListSubheader$1 = ListSubheader;
var CancelIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}), "Cancel");
function getChipUtilityClass(slot) {
  return generateUtilityClass("MuiChip", slot);
}
const chipClasses = generateUtilityClasses("MuiChip", ["root", "sizeSmall", "sizeMedium", "colorPrimary", "colorSecondary", "disabled", "clickable", "clickableColorPrimary", "clickableColorSecondary", "deletable", "deletableColorPrimary", "deletableColorSecondary", "outlined", "filled", "outlinedPrimary", "outlinedSecondary", "avatar", "avatarSmall", "avatarMedium", "avatarColorPrimary", "avatarColorSecondary", "icon", "iconSmall", "iconMedium", "iconColorPrimary", "iconColorSecondary", "label", "labelSmall", "labelMedium", "deleteIcon", "deleteIconSmall", "deleteIconMedium", "deleteIconColorPrimary", "deleteIconColorSecondary", "deleteIconOutlinedColorPrimary", "deleteIconOutlinedColorSecondary", "focusVisible"]);
var chipClasses$1 = chipClasses;
const _excluded$5 = ["avatar", "className", "clickable", "color", "component", "deleteIcon", "disabled", "icon", "label", "onClick", "onDelete", "onKeyDown", "onKeyUp", "size", "variant"];
const useUtilityClasses$5 = (ownerState) => {
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
  overridesResolver: (props, styles) => {
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
      [`& .${chipClasses$1.avatar}`]: styles.avatar
    }, {
      [`& .${chipClasses$1.avatar}`]: styles[`avatar${capitalize(size)}`]
    }, {
      [`& .${chipClasses$1.avatar}`]: styles[`avatarColor${capitalize(color)}`]
    }, {
      [`& .${chipClasses$1.icon}`]: styles.icon
    }, {
      [`& .${chipClasses$1.icon}`]: styles[`icon${capitalize(size)}`]
    }, {
      [`& .${chipClasses$1.icon}`]: styles[`iconColor${capitalize(color)}`]
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles.deleteIcon
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles[`deleteIcon${capitalize(size)}`]
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles[`deleteIconColor${capitalize(color)}`]
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles[`deleteIconOutlinedColor${capitalize(color)}`]
    }, styles.root, styles[`size${capitalize(size)}`], styles[`color${capitalize(color)}`], clickable && styles.clickable, clickable && color !== "default" && styles[`clickableColor${capitalize(color)})`], onDelete && styles.deletable, onDelete && color !== "default" && styles[`deletableColor${capitalize(color)}`], styles[variant], variant === "outlined" && styles[`outlined${capitalize(color)}`]];
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    const {
      size
    } = ownerState;
    return [styles.label, styles[`label${capitalize(size)}`]];
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$5);
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
  const classes = useUtilityClasses$5(ownerState);
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
function getAutocompleteUtilityClass(slot) {
  return generateUtilityClass("MuiAutocomplete", slot);
}
const autocompleteClasses = generateUtilityClasses("MuiAutocomplete", ["root", "fullWidth", "focused", "focusVisible", "tag", "tagSizeSmall", "tagSizeMedium", "hasPopupIcon", "hasClearIcon", "inputRoot", "input", "inputFocused", "endAdornment", "clearIndicator", "popupIndicator", "popupIndicatorOpen", "popper", "popperDisablePortal", "paper", "listbox", "loading", "noOptions", "option", "groupLabel", "groupUl"]);
var autocompleteClasses$1 = autocompleteClasses;
var _ClearIcon, _ArrowDropDownIcon;
const _excluded$4 = ["autoComplete", "autoHighlight", "autoSelect", "blurOnSelect", "ChipProps", "className", "clearIcon", "clearOnBlur", "clearOnEscape", "clearText", "closeText", "componentsProps", "defaultValue", "disableClearable", "disableCloseOnSelect", "disabled", "disabledItemsFocusable", "disableListWrap", "disablePortal", "filterOptions", "filterSelectedOptions", "forcePopupIcon", "freeSolo", "fullWidth", "getLimitTagsText", "getOptionDisabled", "getOptionLabel", "isOptionEqualToValue", "groupBy", "handleHomeEndKeys", "id", "includeInputInList", "inputValue", "limitTags", "ListboxComponent", "ListboxProps", "loading", "loadingText", "multiple", "noOptionsText", "onChange", "onClose", "onHighlightChange", "onInputChange", "onOpen", "open", "openOnFocus", "openText", "options", "PaperComponent", "PopperComponent", "popupIcon", "renderGroup", "renderInput", "renderOption", "renderTags", "selectOnFocus", "size", "value"];
const useUtilityClasses$4 = (ownerState) => {
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
  overridesResolver: (props, styles) => {
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
      [`& .${autocompleteClasses$1.tag}`]: styles.tag
    }, {
      [`& .${autocompleteClasses$1.tag}`]: styles[`tagSize${capitalize(size)}`]
    }, {
      [`& .${autocompleteClasses$1.inputRoot}`]: styles.inputRoot
    }, {
      [`& .${autocompleteClasses$1.input}`]: styles.input
    }, {
      [`& .${autocompleteClasses$1.input}`]: inputFocused && styles.inputFocused
    }, styles.root, fullWidth && styles.fullWidth, hasPopupIcon && styles.hasPopupIcon, hasClearIcon && styles.hasClearIcon];
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
  [`& .${outlinedInputClasses.root}`]: {
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
  [`& .${outlinedInputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
    padding: 6,
    [`& .${autocompleteClasses$1.input}`]: {
      padding: "2.5px 4px 2.5px 6px"
    }
  },
  [`& .${filledInputClasses.root}`]: {
    paddingTop: 19,
    paddingLeft: 8,
    [`.${autocompleteClasses$1.hasPopupIcon}&, .${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 26 + 4 + 9
    },
    [`.${autocompleteClasses$1.hasPopupIcon}.${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 52 + 4 + 9
    },
    [`& .${filledInputClasses.input}`]: {
      padding: "7px 4px"
    },
    [`& .${autocompleteClasses$1.endAdornment}`]: {
      right: 9
    }
  },
  [`& .${filledInputClasses.root}.${inputBaseClasses.sizeSmall}`]: {
    paddingBottom: 1,
    [`& .${filledInputClasses.input}`]: {
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
  overridesResolver: (props, styles) => styles.endAdornment
})({
  position: "absolute",
  right: 0,
  top: "calc(50% - 14px)"
});
const AutocompleteClearIndicator = styled(IconButton, {
  name: "MuiAutocomplete",
  slot: "ClearIndicator",
  overridesResolver: (props, styles) => styles.clearIndicator
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
  }, styles) => _extends({}, styles.popupIndicator, ownerState.popupOpen && styles.popupIndicatorOpen)
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${autocompleteClasses$1.option}`]: styles.option
    }, styles.popper, ownerState.disablePortal && styles.popperDisablePortal];
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
  overridesResolver: (props, styles) => styles.paper
})(({
  theme
}) => _extends({}, theme.typography.body1, {
  overflow: "auto"
}));
const AutocompleteLoading = styled("div", {
  name: "MuiAutocomplete",
  slot: "Loading",
  overridesResolver: (props, styles) => styles.loading
})(({
  theme
}) => ({
  color: theme.palette.text.secondary,
  padding: "14px 16px"
}));
const AutocompleteNoOptions = styled("div", {
  name: "MuiAutocomplete",
  slot: "NoOptions",
  overridesResolver: (props, styles) => styles.noOptions
})(({
  theme
}) => ({
  color: theme.palette.text.secondary,
  padding: "14px 16px"
}));
const AutocompleteListbox = styled("div", {
  name: "MuiAutocomplete",
  slot: "Listbox",
  overridesResolver: (props, styles) => styles.listbox
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
  overridesResolver: (props, styles) => styles.groupLabel
})(({
  theme
}) => ({
  backgroundColor: theme.palette.background.paper,
  top: -8
}));
const AutocompleteGroupUl = styled("ul", {
  name: "MuiAutocomplete",
  slot: "GroupUl",
  overridesResolver: (props, styles) => styles.groupUl
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$4);
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
  const classes = useUtilityClasses$4(ownerState);
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
function getSwitchBaseUtilityClass(slot) {
  return generateUtilityClass("PrivateSwitchBase", slot);
}
generateUtilityClasses("PrivateSwitchBase", ["root", "checked", "disabled", "input", "edgeStart", "edgeEnd"]);
const _excluded$3 = ["autoFocus", "checked", "checkedIcon", "className", "defaultChecked", "disabled", "disableFocusRipple", "edge", "icon", "id", "inputProps", "inputRef", "name", "onBlur", "onChange", "onFocus", "readOnly", "required", "tabIndex", "type", "value"];
const useUtilityClasses$3 = (ownerState) => {
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$3);
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
  const classes = useUtilityClasses$3(ownerState);
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
function getFormControlLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiFormControlLabel", slot);
}
const formControlLabelClasses = generateUtilityClasses("MuiFormControlLabel", ["root", "labelPlacementStart", "labelPlacementTop", "labelPlacementBottom", "disabled", "label"]);
var formControlLabelClasses$1 = formControlLabelClasses;
const _excluded$2 = ["checked", "className", "componentsProps", "control", "disabled", "disableTypography", "inputRef", "label", "labelPlacement", "name", "onChange", "value"];
const useUtilityClasses$2 = (ownerState) => {
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${formControlLabelClasses$1.label}`]: styles.label
    }, styles.root, styles[`labelPlacement${capitalize(ownerState.labelPlacement)}`]];
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
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
  const classes = useUtilityClasses$2(ownerState);
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
const _excluded$1 = ["className", "row"];
const useUtilityClasses$1 = (ownerState) => {
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.row && styles.row];
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$1);
  const ownerState = _extends({}, props, {
    row
  });
  const classes = useUtilityClasses$1(ownerState);
  return /* @__PURE__ */ jsx(FormGroupRoot, _extends({
    className: clsx(classes.root, className),
    ownerState,
    ref
  }, other));
});
var FormGroup$1 = FormGroup;
function getSwitchUtilityClass(slot) {
  return generateUtilityClass("MuiSwitch", slot);
}
const switchClasses = generateUtilityClasses("MuiSwitch", ["root", "edgeStart", "edgeEnd", "switchBase", "colorPrimary", "colorSecondary", "sizeSmall", "sizeMedium", "checked", "disabled", "input", "thumb", "track"]);
var switchClasses$1 = switchClasses;
const _excluded = ["className", "color", "edge", "size", "sx"];
const useUtilityClasses = (ownerState) => {
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.edge && styles[`edge${capitalize(ownerState.edge)}`], styles[`size${capitalize(ownerState.size)}`]];
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.switchBase, {
      [`& .${switchClasses$1.input}`]: styles.input
    }, ownerState.color !== "default" && styles[`color${capitalize(ownerState.color)}`]];
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
  overridesResolver: (props, styles) => styles.track
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
  overridesResolver: (props, styles) => styles.thumb
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    color,
    edge,
    size
  });
  const classes = useUtilityClasses(ownerState);
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
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { "default": obj };
      }
      var _Highlighter = __webpack_require__(2);
      var _Highlighter2 = _interopRequireDefault(_Highlighter);
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
      function _interopRequireDefault(obj) {
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
      var _propTypes2 = _interopRequireDefault(_propTypes);
      var _react = __webpack_require__(14);
      var _memoizeOne = __webpack_require__(15);
      var _memoizeOne2 = _interopRequireDefault(_memoizeOne);
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
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === "function") {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
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
        } catch (e) {
          try {
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e2) {
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
        } catch (e) {
          try {
            return cachedClearTimeout.call(null, marker);
          } catch (e2) {
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
          function is(x, y) {
            if (x === y) {
              return x !== 0 || 1 / x === 1 / y;
            } else {
              return x !== x && y !== y;
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
        function invariant(condition, format, a, b, c, d, e, f) {
          if (!condition) {
            var error;
            if (format === void 0) {
              error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            } else {
              var args = [a, b, c, d, e, f];
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
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
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
      var simpleIsEqual = function simpleIsEqual2(a, b) {
        return a === b;
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
      var n = s.indexOf(lunr2.FieldRef.joiner);
      if (n === -1) {
        throw "malformed field ref string";
      }
      var fieldRef = s.slice(0, n), docRef = s.slice(n + 1);
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
      var a, b, elements, intersection = [];
      if (other === lunr2.Set.complete) {
        return this;
      }
      if (other === lunr2.Set.empty) {
        return other;
      }
      if (this.length < other.length) {
        a = this;
        b = other;
      } else {
        a = other;
        b = this;
      }
      elements = Object.keys(a.elements);
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element in b.elements) {
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
            for (var k = 0; k < result.length; k++) {
              memo.push(result[k]);
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
      var dotProduct = 0, a = this.elements, b = otherVector.elements, aLen = a.length, bLen = b.length, aVal = 0, bVal = 0, i = 0, j = 0;
      while (i < aLen && j < bLen) {
        aVal = a[i], bVal = b[j];
        if (aVal < bVal) {
          i += 2;
        } else if (aVal > bVal) {
          j += 2;
        } else if (aVal == bVal) {
          dotProduct += a[i + 1] * b[j + 1];
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
      }, c = "[^aeiou]", v = "[aeiouy]", C = c + "[^aeiouy]*", V = v + "[aeiou]*", mgr0 = "^(" + C + ")?" + V + C, meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$", mgr1 = "^(" + C + ")?" + V + C + V + C, s_v = "^(" + C + ")?" + v;
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
      var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");
      var re_1c = /^(.+?[^aeiou])y$/;
      var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
      var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
      var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
      var re2_4 = /^(.+?)(s|t)(ion)$/;
      var re_5 = /^(.+?)e$/;
      var re_5_1 = /ll$/;
      var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");
      var porterStemmer = function porterStemmer2(w) {
        var stem, suffix, firstch, re, re2, re3, re4;
        if (w.length < 3) {
          return w;
        }
        firstch = w.substr(0, 1);
        if (firstch == "y") {
          w = firstch.toUpperCase() + w.substr(1);
        }
        re = re_1a;
        re2 = re2_1a;
        if (re.test(w)) {
          w = w.replace(re, "$1$2");
        } else if (re2.test(w)) {
          w = w.replace(re2, "$1$2");
        }
        re = re_1b;
        re2 = re2_1b;
        if (re.test(w)) {
          var fp = re.exec(w);
          re = re_mgr0;
          if (re.test(fp[1])) {
            re = re_1b_2;
            w = w.replace(re, "");
          }
        } else if (re2.test(w)) {
          var fp = re2.exec(w);
          stem = fp[1];
          re2 = re_s_v;
          if (re2.test(stem)) {
            w = stem;
            re2 = re2_1b_2;
            re3 = re3_1b_2;
            re4 = re4_1b_2;
            if (re2.test(w)) {
              w = w + "e";
            } else if (re3.test(w)) {
              re = re_1b_2;
              w = w.replace(re, "");
            } else if (re4.test(w)) {
              w = w + "e";
            }
          }
        }
        re = re_1c;
        if (re.test(w)) {
          var fp = re.exec(w);
          stem = fp[1];
          w = stem + "i";
        }
        re = re_2;
        if (re.test(w)) {
          var fp = re.exec(w);
          stem = fp[1];
          suffix = fp[2];
          re = re_mgr0;
          if (re.test(stem)) {
            w = stem + step2list[suffix];
          }
        }
        re = re_3;
        if (re.test(w)) {
          var fp = re.exec(w);
          stem = fp[1];
          suffix = fp[2];
          re = re_mgr0;
          if (re.test(stem)) {
            w = stem + step3list[suffix];
          }
        }
        re = re_4;
        re2 = re2_4;
        if (re.test(w)) {
          var fp = re.exec(w);
          stem = fp[1];
          re = re_mgr1;
          if (re.test(stem)) {
            w = stem;
          }
        } else if (re2.test(w)) {
          var fp = re2.exec(w);
          stem = fp[1] + fp[2];
          re2 = re_mgr1;
          if (re2.test(stem)) {
            w = stem;
          }
        }
        re = re_5;
        if (re.test(w)) {
          var fp = re.exec(w);
          stem = fp[1];
          re = re_mgr1;
          re2 = re_meq1;
          re3 = re3_5;
          if (re.test(stem) || re2.test(stem) && !re3.test(stem)) {
            w = stem;
          }
        }
        re = re_5_1;
        re2 = re_mgr1;
        if (re.test(w) && re2.test(w)) {
          re = re_1b_2;
          w = w.replace(re, "");
        }
        if (firstch == "y") {
          w = firstch.toLowerCase() + w.substr(1);
        }
        return w;
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
    lunr2.TokenSet.prototype.intersect = function(b) {
      var output = new lunr2.TokenSet(), frame = void 0;
      var stack = [{
        qNode: b,
        output,
        node: this
      }];
      while (stack.length) {
        frame = stack.pop();
        var qEdges = Object.keys(frame.qNode.edges), qLen = qEdges.length, nEdges = Object.keys(frame.node.edges), nLen = nEdges.length;
        for (var q = 0; q < qLen; q++) {
          var qEdge = qEdges[q];
          for (var n = 0; n < nLen; n++) {
            var nEdge = nEdges[n];
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
        for (var m = 0; m < terms.length; m++) {
          var term = terms[m];
          clause.term = term;
          var termTokenSet = lunr2.TokenSet.fromClause(clause), expandedTerms = this.tokenSet.intersect(termTokenSet).toArray();
          if (expandedTerms.length === 0 && clause.presence === lunr2.Query.presence.REQUIRED) {
            for (var k = 0; k < clause.fields.length; k++) {
              var field = clause.fields[k];
              requiredMatches[field] = lunr2.Set.empty;
            }
            break;
          }
          for (var j = 0; j < expandedTerms.length; j++) {
            var expandedTerm = expandedTerms[j], posting = this.invertedIndex[expandedTerm], termIndex = posting._index;
            for (var k = 0; k < clause.fields.length; k++) {
              var field = clause.fields[k], fieldPosting = posting[field], matchingDocumentRefs = Object.keys(fieldPosting), termField = expandedTerm + "/" + field, matchingDocumentsSet = new lunr2.Set(matchingDocumentRefs);
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
              queryVectors[field].upsert(termIndex, clause.boost, function(a, b) {
                return a + b;
              });
              if (termFieldCache[termField]) {
                continue;
              }
              for (var l = 0; l < matchingDocumentRefs.length; l++) {
                var matchingDocumentRef = matchingDocumentRefs[l], matchingFieldRef = new lunr2.FieldRef(matchingDocumentRef, field), metadata = fieldPosting[matchingDocumentRef], fieldMatch;
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
          for (var k = 0; k < clause.fields.length; k++) {
            var field = clause.fields[k];
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
      return results.sort(function(a, b) {
        return b.score - a.score;
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
            for (var k = 0; k < fields.length; k++) {
              posting[fields[k]] = Object.create(null);
            }
            this.invertedIndex[term] = posting;
          }
          if (this.invertedIndex[term][fieldName][docRef] == void 0) {
            this.invertedIndex[term][fieldName][docRef] = Object.create(null);
          }
          for (var l = 0; l < this.metadataWhitelist.length; l++) {
            var metadataKey = this.metadataWhitelist[l], metadata = term.metadata[metadataKey];
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
          for (var k = 0; k < keys.length; k++) {
            var key = keys[k];
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
        var possibleFields = parser.query.allFields.map(function(f) {
          return "'" + f + "'";
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
const StyledAutocompletePopper = default_1("div")(({
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
const ProjectToggle = default_1(FormGroup$1)(({
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
  const onChange = useCallback((e, option) => {
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
            query$.next(newInputValue.split(" ").filter((q) => q.length > 2).join(" "));
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
            }), /* @__PURE__ */ jsx(TextField, __spreadProps(__spreadValues({}, params2), {
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
    children: /* @__PURE__ */ jsx(Modal, {
      open: show,
      onClose: handleClose,
      closeAfterTransition: true,
      BackdropComponent: Backdrop,
      BackdropProps: {
        timeout: 500
      },
      children: show ? renderSearch() : /* @__PURE__ */ jsx(Fragment, {})
    })
  });
};
export { SearchOverlay, SearchOverlay as default };
//# sourceMappingURL=search.js.map
