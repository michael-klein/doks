var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
import { d as default_1$3 } from "./Menu.js";
import { i as interopRequireDefault, d as default_1$2, B as Box } from "./styled.js";
import * as React from "react";
import React__default, { memo, useMemo, useRef, useCallback, useEffect, useState } from "react";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { m as modifyDocument, d as documents$ } from "./documents.js";
import { h as htmdx, M as MarkdownRenderer } from "./markdown_renderer.js";
import { u as useParams, L as Link } from "./doks.js";
import { c as createSvgIcon, r as require$$2, T as Typography, u as useObservableState, b as useObservable, I as IconButton } from "./IconButton.js";
import { g as generateUtilityClass, f as generateUtilityClasses, s as styled, h as useThemeProps, i as _objectWithoutPropertiesLoose, _ as _extends, k as composeClasses, j as jsx, l as clsx, d as jsxs, F as Fragment, m as capitalize } from "./main.js";
import { C as ConditionalCard } from "./conditional_card.js";
import { G as Grid } from "./Grid.js";
import { T as TextField } from "./TextField.js";
import { S as Snackbar, A as Alert } from "./Alert.js";
import { C as CardHeader } from "./CardHeader.js";
import { F as FormControl } from "./Input.js";
import { u as useFormControl, F as FormControlContext } from "./InputBase.js";
import { C as Card } from "./Card.js";
import "./react-is.production.min.js";
import "./isHostComponent.js";
import "react-dom";
import "./index.js";
import "./Close.js";
function getCardContentUtilityClass(slot) {
  return generateUtilityClass("MuiCardContent", slot);
}
generateUtilityClasses("MuiCardContent", ["root"]);
const _excluded$1 = ["className", "component"];
const useUtilityClasses$1 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getCardContentUtilityClass, classes);
};
const CardContentRoot = styled("div", {
  name: "MuiCardContent",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})(() => {
  return {
    padding: 16,
    "&:last-child": {
      paddingBottom: 24
    }
  };
});
const CardContent = /* @__PURE__ */ React.forwardRef(function CardContent2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiCardContent"
  });
  const {
    className,
    component = "div"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$1);
  const ownerState = _extends({}, props, {
    component
  });
  const classes = useUtilityClasses$1(ownerState);
  return /* @__PURE__ */ jsx(CardContentRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    ownerState,
    ref
  }, other));
});
var CardContent$1 = CardContent;
const formatDate = (date) => {
  return new Date(date).toLocaleString();
};
var SubdirectoryArrowRight = {};
var _interopRequireDefault$1 = interopRequireDefault.exports;
Object.defineProperty(SubdirectoryArrowRight, "__esModule", {
  value: true
});
var default_1$1 = SubdirectoryArrowRight.default = void 0;
var _createSvgIcon$1 = _interopRequireDefault$1(createSvgIcon);
var _jsxRuntime$1 = require$$2;
var _default$1 = (0, _createSvgIcon$1.default)(/* @__PURE__ */ (0, _jsxRuntime$1.jsx)("path", {
  d: "m19 15-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"
}), "SubdirectoryArrowRight");
default_1$1 = SubdirectoryArrowRight.default = _default$1;
var removeMarkdown = function(md, options) {
  options = options || {};
  options.listUnicodeChar = options.hasOwnProperty("listUnicodeChar") ? options.listUnicodeChar : false;
  options.stripListLeaders = options.hasOwnProperty("stripListLeaders") ? options.stripListLeaders : true;
  options.gfm = options.hasOwnProperty("gfm") ? options.gfm : true;
  options.useImgAltText = options.hasOwnProperty("useImgAltText") ? options.useImgAltText : true;
  var output = md || "";
  output = output.replace(/^(-\s*?|\*\s*?|_\s*?){3,}\s*$/gm, "");
  try {
    if (options.stripListLeaders) {
      if (options.listUnicodeChar)
        output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, options.listUnicodeChar + " $1");
      else
        output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, "$1");
    }
    if (options.gfm) {
      output = output.replace(/\n={2,}/g, "\n").replace(/~{3}.*\n/g, "").replace(/~~/g, "").replace(/`{3}.*\n/g, "");
    }
    output = output.replace(/<[^>]*>/g, "").replace(/^[=\-]{2,}\s*$/g, "").replace(/\[\^.+?\](\: .*?$)?/g, "").replace(/\s{0,2}\[.*?\]: .*?$/g, "").replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, options.useImgAltText ? "$1" : "").replace(/\[(.*?)\][\[\(].*?[\]\)]/g, "$1").replace(/^\s{0,3}>\s?/g, "").replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, "").replace(/^(\n)?\s{0,}#{1,6}\s+| {0,}(\n)?\s{0,}#{0,} {0,}(\n)?\s{0,}$/gm, "$1$2$3").replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, "$2").replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, "$2").replace(/(`{3,})(.*?)\1/gm, "$2").replace(/`(.+?)`/g, "$1").replace(/\n{2,}/g, "\n\n");
  } catch (e2) {
    console.error(e2);
    return md;
  }
  return output;
};
class ErrorBoundary extends React__default.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: ""
    };
  }
  componentDidCatch(error, errorInfo) {
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error.message
    };
  }
  render() {
    if (this.state.hasError) {
      console.error("toc error", this.state.error);
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
const TOCList = default_1$2("ul")({
  listStyle: "none",
  margin: 0,
  padding: 10,
  paddingLeft: 0,
  lineHeight: "1.3em",
  maxHeight: "calc(60vh)",
  overflowY: "auto"
});
const TOCListItem = default_1$2("li")({
  fontSize: ".9em",
  "a,a:hover,a:link,a:active": {
    color: "inherit",
    textDecoration: "none",
    textAlign: "left"
  },
  "a:hover": {
    textDecoration: "underline"
  }
});
const getListItem = (level) => (props) => {
  const params = useParams();
  const linkRef = useRef();
  return /* @__PURE__ */ jsxs(TOCListItem, {
    sx: {
      marginLeft: 10 * (level - 1) + "px",
      display: "flex"
    },
    children: [/* @__PURE__ */ jsx(Box, {
      children: /* @__PURE__ */ jsx(default_1$1, {
        sx: {
          fontSize: ".8em",
          marginRight: ".2em"
        },
        className: "sub-icon"
      })
    }), /* @__PURE__ */ jsx(Box, {
      children: /* @__PURE__ */ jsx(Link, __spreadProps(__spreadValues({}, props), {
        ref: linkRef,
        to: `/docs/${params.projectSlug}/${params.contentSlug}/${props.index}`
      }))
    })]
  });
};
const TOC = memo(({
  mdx
}) => {
  const headings = useMemo(() => mdx == null ? void 0 : mdx.replace(/(<([^>]+)>)/gi, "").split("\n").filter((line) => line.startsWith("#")).map((line) => {
    for (let i22 = 0; i22 < line.length; i22++) {
      if (line.charAt(i22) !== "#") {
        return line.substr(0, i22 - 1) + removeMarkdown(line.substr(i22));
      }
    }
    return line;
  }).join("\n"), [mdx]);
  let i2 = 0;
  let hIndex = 0;
  return /* @__PURE__ */ jsx(Fragment, {
    children: headings !== void 0 ? /* @__PURE__ */ jsx(TOCList, {
      children: htmdx(headings, React__default.createElement, {
        components: {
          h1: getListItem(1),
          h2: getListItem(2),
          h3: getListItem(3),
          h4: getListItem(4),
          h6: getListItem(6),
          h7: getListItem(7),
          h8: getListItem(8),
          h10: getListItem(10)
        },
        jsxTransforms: [(type, props, children) => {
          if (!props) {
            props = {};
          }
          if (type.startsWith("h")) {
            props.index = hIndex;
            hIndex++;
          }
          props.key = i2++;
          return [type, props, children];
        }]
      })
    }) : /* @__PURE__ */ jsx(Fragment, {})
  });
});
const Wrapper = default_1$2(Box)(({
  theme
}) => __spreadProps(__spreadValues({}, theme.typography.body1), {
  width: "220px"
}));
const Header = default_1$2("h1")({
  fontSize: "1em",
  marginBottom: "-.7em",
  fontWeight: "bold"
});
const TableOfContents = ({
  mdx
}) => {
  return /* @__PURE__ */ jsxs(Wrapper, {
    children: [/* @__PURE__ */ jsx(Header, {
      children: "Table of contents"
    }), /* @__PURE__ */ jsx(ErrorBoundary, {
      children: /* @__PURE__ */ jsx(TOC, {
        mdx
      })
    }, "toc-" + mdx)]
  });
};
var ContentCopy = {};
var _interopRequireDefault = interopRequireDefault.exports;
Object.defineProperty(ContentCopy, "__esModule", {
  value: true
});
var default_1 = ContentCopy.default = void 0;
var _createSvgIcon = _interopRequireDefault(createSvgIcon);
var _jsxRuntime = require$$2;
var _default = (0, _createSvgIcon.default)(/* @__PURE__ */ (0, _jsxRuntime.jsx)("path", {
  d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
}), "ContentCopy");
default_1 = ContentCopy.default = _default;
function getInputAdornmentUtilityClass(slot) {
  return generateUtilityClass("MuiInputAdornment", slot);
}
const inputAdornmentClasses = generateUtilityClasses("MuiInputAdornment", ["root", "filled", "standard", "outlined", "positionStart", "positionEnd", "disablePointerEvents", "hiddenLabel", "sizeSmall"]);
var inputAdornmentClasses$1 = inputAdornmentClasses;
const _excluded = ["children", "className", "component", "disablePointerEvents", "disableTypography", "position", "variant"];
const overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, styles[`position${capitalize(ownerState.position)}`], ownerState.disablePointerEvents === true && styles.disablePointerEvents, styles[ownerState.variant]];
};
const useUtilityClasses = (ownerState) => {
  const {
    classes,
    disablePointerEvents,
    hiddenLabel,
    position,
    size,
    variant
  } = ownerState;
  const slots = {
    root: ["root", disablePointerEvents && "disablePointerEvents", position && `position${capitalize(position)}`, variant, hiddenLabel && "hiddenLabel", size && `size${capitalize(size)}`]
  };
  return composeClasses(slots, getInputAdornmentUtilityClass, classes);
};
const InputAdornmentRoot = styled("div", {
  name: "MuiInputAdornment",
  slot: "Root",
  overridesResolver
})(({
  theme,
  ownerState
}) => _extends({
  display: "flex",
  height: "0.01em",
  maxHeight: "2em",
  alignItems: "center",
  whiteSpace: "nowrap",
  color: theme.palette.action.active
}, ownerState.variant === "filled" && {
  [`&.${inputAdornmentClasses$1.positionStart}&:not(.${inputAdornmentClasses$1.hiddenLabel})`]: {
    marginTop: 16
  }
}, ownerState.position === "start" && {
  marginRight: 8
}, ownerState.position === "end" && {
  marginLeft: 8
}, ownerState.disablePointerEvents === true && {
  pointerEvents: "none"
}));
const InputAdornment = /* @__PURE__ */ React.forwardRef(function InputAdornment2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiInputAdornment"
  });
  const {
    children,
    className,
    component = "div",
    disablePointerEvents = false,
    disableTypography = false,
    position,
    variant: variantProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const muiFormControl = useFormControl() || {};
  let variant = variantProp;
  if (variantProp && muiFormControl.variant)
    ;
  if (muiFormControl && !variant) {
    variant = muiFormControl.variant;
  }
  const ownerState = _extends({}, props, {
    hiddenLabel: muiFormControl.hiddenLabel,
    size: muiFormControl.size,
    disablePointerEvents,
    position,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  return /* @__PURE__ */ jsx(FormControlContext.Provider, {
    value: null,
    children: /* @__PURE__ */ jsx(InputAdornmentRoot, _extends({
      as: component,
      ownerState,
      className: clsx(classes.root, className),
      ref
    }, other, {
      children: typeof children === "string" && !disableTypography ? /* @__PURE__ */ jsx(Typography, {
        color: "text.secondary",
        children
      }) : /* @__PURE__ */ jsxs(React.Fragment, {
        children: [position === "start" ? /* @__PURE__ */ jsx("span", {
          className: "notranslate",
          dangerouslySetInnerHTML: {
            __html: "&#8203;"
          }
        }) : null, children]
      })
    }))
  });
});
var InputAdornment$1 = InputAdornment;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function e(e2, t2, n, r) {
  return new (n || (n = Promise))(function(o, i2) {
    function a2(e3) {
      try {
        c2(r.next(e3));
      } catch (e4) {
        i2(e4);
      }
    }
    function u2(e3) {
      try {
        c2(r.throw(e3));
      } catch (e4) {
        i2(e4);
      }
    }
    function c2(e3) {
      var t3;
      e3.done ? o(e3.value) : (t3 = e3.value, t3 instanceof n ? t3 : new n(function(e4) {
        e4(t3);
      })).then(a2, u2);
    }
    c2((r = r.apply(e2, t2 || [])).next());
  });
}
function t(e2, t2) {
  var n, r, o, i2, a2 = { label: 0, sent: function() {
    if (1 & o[0])
      throw o[1];
    return o[1];
  }, trys: [], ops: [] };
  return i2 = { next: u2(0), throw: u2(1), return: u2(2) }, typeof Symbol == "function" && (i2[Symbol.iterator] = function() {
    return this;
  }), i2;
  function u2(i3) {
    return function(u3) {
      return function(i4) {
        if (n)
          throw new TypeError("Generator is already executing.");
        for (; a2; )
          try {
            if (n = 1, r && (o = 2 & i4[0] ? r.return : i4[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i4[1])).done)
              return o;
            switch (r = 0, o && (i4 = [2 & i4[0], o.value]), i4[0]) {
              case 0:
              case 1:
                o = i4;
                break;
              case 4:
                return a2.label++, { value: i4[1], done: false };
              case 5:
                a2.label++, r = i4[1], i4 = [0];
                continue;
              case 7:
                i4 = a2.ops.pop(), a2.trys.pop();
                continue;
              default:
                if (!(o = a2.trys, (o = o.length > 0 && o[o.length - 1]) || i4[0] !== 6 && i4[0] !== 2)) {
                  a2 = 0;
                  continue;
                }
                if (i4[0] === 3 && (!o || i4[1] > o[0] && i4[1] < o[3])) {
                  a2.label = i4[1];
                  break;
                }
                if (i4[0] === 6 && a2.label < o[1]) {
                  a2.label = o[1], o = i4;
                  break;
                }
                if (o && a2.label < o[2]) {
                  a2.label = o[2], a2.ops.push(i4);
                  break;
                }
                o[2] && a2.ops.pop(), a2.trys.pop();
                continue;
            }
            i4 = t2.call(e2, a2);
          } catch (e3) {
            i4 = [6, e3], r = 0;
          } finally {
            n = o = 0;
          }
        if (5 & i4[0])
          throw i4[1];
        return { value: i4[0] ? i4[1] : void 0, done: true };
      }([i3, u3]);
    };
  }
}
(function() {
  (console.warn || console.log).apply(console, arguments);
}).bind("[clipboard-polyfill]");
var i, a, u, c, l = typeof navigator == "undefined" ? void 0 : navigator, d = l == null ? void 0 : l.clipboard;
(i = d == null ? void 0 : d.read) === null || i === void 0 || i.bind(d), (a = d == null ? void 0 : d.readText) === null || a === void 0 ? void 0 : a.bind(d);
var f = ((u = d == null ? void 0 : d.write) === null || u === void 0 || u.bind(d), (c = d == null ? void 0 : d.writeText) === null || c === void 0 ? void 0 : c.bind(d)), p = typeof window == "undefined" ? void 0 : window, v = (p == null || p.ClipboardItem, p);
function b() {
  return typeof ClipboardEvent == "undefined" && v.clipboardData !== void 0 && v.clipboardData.setData !== void 0;
}
var m = function() {
  this.success = false;
};
function h(e2, t2, n) {
  for (var o in e2.success = true, t2) {
    var i2 = t2[o], a2 = n.clipboardData;
    a2.setData(o, i2), o === "text/plain" && a2.getData(o) !== i2 && (e2.success = false);
  }
  n.preventDefault();
}
function w(e2) {
  var t2 = new m(), n = h.bind(this, t2, e2);
  document.addEventListener("copy", n);
  try {
    document.execCommand("copy");
  } finally {
    document.removeEventListener("copy", n);
  }
  return t2.success;
}
function g(e2, t2) {
  x(e2);
  var n = w(t2);
  return E(), n;
}
function x(e2) {
  var t2 = document.getSelection();
  if (t2) {
    var n = document.createRange();
    n.selectNodeContents(e2), t2.removeAllRanges(), t2.addRange(n);
  }
}
function E() {
  var e2 = document.getSelection();
  e2 && e2.removeAllRanges();
}
function D(n) {
  return e(this, void 0, void 0, function() {
    var e2;
    return t(this, function(t2) {
      if (e2 = "text/plain" in n, b()) {
        if (!e2)
          throw new Error("No `text/plain` value was specified.");
        if (o = n["text/plain"], v.clipboardData.setData("Text", o))
          return [2, true];
        throw new Error("Copying failed, possibly because the user rejected it.");
      }
      var o;
      return w(n) ? [2, true] : navigator.userAgent.indexOf("Edge") > -1 ? [2, true] : g(document.body, n) ? [2, true] : function(e3) {
        var t3 = document.createElement("div");
        t3.setAttribute("style", "-webkit-user-select: text !important"), t3.textContent = "temporary element", document.body.appendChild(t3);
        var n2 = g(t3, e3);
        return document.body.removeChild(t3), n2;
      }(n) ? [2, true] : function(e3) {
        var t3 = document.createElement("div");
        t3.setAttribute("style", "-webkit-user-select: text !important");
        var n2 = t3;
        t3.attachShadow && (n2 = t3.attachShadow({ mode: "open" }));
        var o2 = document.createElement("span");
        o2.innerText = e3, n2.appendChild(o2), document.body.appendChild(t3), x(o2);
        var i2 = document.execCommand("copy");
        return E(), document.body.removeChild(t3), i2;
      }(n["text/plain"]) ? [2, true] : [2, false];
    });
  });
}
function C(n) {
  return e(this, void 0, void 0, function() {
    return t(this, function(e2) {
      if (f)
        return [2, f(n)];
      if (!D(function(e3) {
        var t2 = {};
        return t2["text/plain"] = e3, t2;
      }(n)))
        throw new Error("writeText() failed");
      return [2];
    });
  });
}
const ContentWrapper = default_1$2(Grid)(({
  theme
}) => ({
  display: "flex",
  alignItems: "start",
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    flexBasis: "initial"
  }
}));
const EmbedField = default_1$2(TextField)(({
  theme
}) => ({
  cursor: "grab !important",
  "*": {
    cursor: "grab !important"
  },
  ".MuiOutlinedInput-root": {
    paddingRight: "10px"
  },
  input: {
    padding: "5px",
    paddingLeft: "14px",
    paddingRight: "14px",
    fontSize: ".9em"
  },
  svg: {
    height: "0.8em",
    width: "0.8em"
  }
}));
const Content = ({
  embed
}) => {
  var _a;
  const params = useParams();
  const document2 = useObservableState(useObservable((input$) => {
    return combineLatest([input$, documents$]).pipe(map(([input, documents]) => {
      return documents.get(input[0].contentSlug);
    }));
  }, [params]));
  const toggleFav = useCallback(() => {
    modifyDocument(__spreadProps(__spreadValues({}, document2), {
      isFavourite: !document2.isFavourite
    }));
  }, [document2]);
  const contentRef = useRef();
  const scrollTimeOutRef = useRef();
  const onAfterRender = useCallback(() => {
    var _a2;
    if (params.headingIndex !== void 0) {
      const element = (_a2 = contentRef.current) == null ? void 0 : _a2.querySelector(`#heading-${params.headingIndex}`);
      if (element) {
        clearTimeout(scrollTimeOutRef.current);
        scrollTimeOutRef.current = setInterval(() => {
          requestAnimationFrame(() => {
            const offset = 60;
            const bodyRect = window.document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            if (offsetPosition > 0) {
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              });
              clearTimeout(scrollTimeOutRef.current);
            }
          });
        }, 100);
      }
    }
  }, [params.headingIndex]);
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      clearTimeout(scrollTimeOutRef.current);
    };
  }, [params.contentSlug]);
  const [openSuccess, setOpenSuccess] = useState(false);
  return /* @__PURE__ */ jsxs(ContentWrapper, {
    item: true,
    xs: embed ? false : 9,
    children: [/* @__PURE__ */ jsx(Snackbar, {
      sx: {
        marginTop: "60px"
      },
      anchorOrigin: {
        vertical: "top",
        horizontal: "right"
      },
      open: openSuccess,
      autoHideDuration: 6e3,
      onClose: () => {
        setOpenSuccess(false);
      },
      children: /* @__PURE__ */ jsx(Alert, {
        sx: {
          boxShadow: 1
        },
        severity: "success",
        onClose: () => {
          setOpenSuccess(false);
        },
        children: "Embed code copied to clipboard!"
      })
    }), /* @__PURE__ */ jsxs(ConditionalCard, {
      showCard: !embed,
      elevation: 2,
      sx: {
        padding: embed ? 1 : 2,
        textAlign: "justify",
        overflowX: "auto",
        flex: "auto",
        minHeight: "50vh",
        position: "relative"
      },
      children: [!embed && document2 && /* @__PURE__ */ jsx(CardHeader, {
        action: /* @__PURE__ */ jsxs(Box, {
          sx: {
            display: "flex",
            alignItems: "center"
          },
          children: [/* @__PURE__ */ jsx(FormControl, {
            variant: "standard",
            onMouseDown: (e2) => {
              e2.preventDefault();
            },
            onMouseUp: () => {
              C(`<iframe src="${window.location.href.replace("/#/docs", "/#/embed")}" title="Talkwalker docs: ${document2.name}"></iframe>`).then(() => {
                setOpenSuccess(true);
              }, () => {
              });
            },
            children: /* @__PURE__ */ jsx(EmbedField, {
              id: "component-simple",
              value: `<iframe src="${window.location.href.replace("/#/docs", "/#/embed")}" title="Talkwalker docs: ${document2.name}"></iframe>`,
              onChange: (e2) => {
                e2.preventDefault();
              },
              onFocus: (e2) => {
                e2.preventDefault();
              },
              variant: void 0,
              label: "embed",
              InputProps: {
                endAdornment: /* @__PURE__ */ jsx(InputAdornment$1, {
                  position: "end",
                  children: /* @__PURE__ */ jsx(default_1, {})
                })
              }
            })
          }), /* @__PURE__ */ jsx(IconButton, {
            "aria-label": "favourite",
            onClick: toggleFav,
            children: /* @__PURE__ */ jsx(default_1$3, {
              sx: {
                color: document2.isFavourite && "red"
              }
            })
          })]
        }),
        title: document2.name,
        subheader: formatDate(document2.lastModified)
      }), /* @__PURE__ */ jsx(CardContent$1, {
        ref: contentRef,
        sx: {
          display: "block",
          overflow: "auto"
        },
        children: /* @__PURE__ */ jsx(MarkdownRenderer, {
          mdx: document2 == null ? void 0 : document2.mdx,
          embed,
          onAfterRender
        })
      })]
    }), !embed && (((_a = document2 == null ? void 0 : document2.mdx) == null ? void 0 : _a.match(/#/g)) || []).length > 1 && /* @__PURE__ */ jsx(Card, {
      elevation: 2,
      sx: {
        textAlign: "justify",
        overflowX: "auto",
        marginTop: "20px",
        marginBottom: "20px",
        marginLeft: "-10px",
        overflow: "visible",
        position: "sticky",
        padding: "10px",
        paddingRight: 0,
        top: "100px",
        display: {
          sm: "none",
          md: "flex"
        }
      },
      children: /* @__PURE__ */ jsx(TableOfContents, {
        mdx: document2 == null ? void 0 : document2.mdx
      })
    })]
  });
};
export { Content, Content as default };
//# sourceMappingURL=content.js.map
