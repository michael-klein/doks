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
import { d as default_1$2 } from "./Favorite.js";
import { c as createSvgIcon, i as interopRequireDefault, r as require$$2, d as default_1$1, B as Box, H as modifyDocument, a as documents$ } from "./documents.js";
import * as React from "react";
import React__default, { memo, useMemo, useRef, useCallback, useEffect } from "react";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { h as htmdx, I as IconButton, M as MarkdownRenderer } from "./markdown_renderer.js";
import { u as useParams, L as Link } from "./doks.js";
import { m as generateUtilityClass, n as generateUtilityClasses, o as styled, q as useThemeProps, h as _objectWithoutPropertiesLoose, _ as _extends, r as composeClasses, j as jsx, l as clsx, d as jsxs, F as Fragment } from "./main.js";
import { G as Grid } from "./Button.js";
import { u as useObservableState, a as useObservable } from "./use-observable-state.js";
import { C as Card } from "./Card.js";
import { C as CardHeader } from "./CardHeader.js";
import "./index.js";
import "react-dom";
function getCardContentUtilityClass(slot) {
  return generateUtilityClass("MuiCardContent", slot);
}
generateUtilityClasses("MuiCardContent", ["root"]);
const _excluded = ["className", "component"];
const useUtilityClasses = (ownerState) => {
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
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    component
  });
  const classes = useUtilityClasses(ownerState);
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
var _interopRequireDefault = interopRequireDefault.exports;
Object.defineProperty(SubdirectoryArrowRight, "__esModule", {
  value: true
});
var default_1 = SubdirectoryArrowRight.default = void 0;
var _createSvgIcon = _interopRequireDefault(createSvgIcon);
var _jsxRuntime = require$$2;
var _default = (0, _createSvgIcon.default)(/* @__PURE__ */ (0, _jsxRuntime.jsx)("path", {
  d: "m19 15-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"
}), "SubdirectoryArrowRight");
default_1 = SubdirectoryArrowRight.default = _default;
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
  } catch (e) {
    console.error(e);
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
const TOCList = default_1$1("ul")({
  listStyle: "none",
  margin: 0,
  padding: 10,
  paddingLeft: 0,
  lineHeight: "1.3em",
  maxHeight: "calc(60vh)",
  overflowY: "auto"
});
const TOCListItem = default_1$1("li")({
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
      children: /* @__PURE__ */ jsx(default_1, {
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
    for (let i2 = 0; i2 < line.length; i2++) {
      if (line.charAt(i2) !== "#") {
        return line.substr(0, i2 - 1) + removeMarkdown(line.substr(i2));
      }
    }
    return line;
  }).join("\n"), [mdx]);
  let i = 0;
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
          props.key = i++;
          return [type, props, children];
        }]
      })
    }) : /* @__PURE__ */ jsx(Fragment, {})
  });
});
const Wrapper = default_1$1(Box)(({
  theme
}) => __spreadProps(__spreadValues({}, theme.typography.body1), {
  width: "220px"
}));
const Header = default_1$1("h1")({
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
const ContentWrapper = default_1$1(Grid)(({
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
const Content = () => {
  var _a;
  const params = useParams();
  const document = useObservableState(useObservable((input$) => {
    return combineLatest(input$, documents$).pipe(map(([input, documents]) => {
      return documents.get(input[0].contentSlug);
    }));
  }, [params]));
  const toggleFav = useCallback(() => {
    modifyDocument(__spreadProps(__spreadValues({}, document), {
      isFavourite: !document.isFavourite
    }));
  }, [document]);
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
  return /* @__PURE__ */ jsxs(ContentWrapper, {
    item: true,
    xs: 9,
    children: [/* @__PURE__ */ jsxs(Card, {
      elevation: 2,
      sx: {
        padding: 2,
        textAlign: "justify",
        overflowX: "auto"
      },
      children: [document && /* @__PURE__ */ jsx(CardHeader, {
        action: /* @__PURE__ */ jsx(IconButton, {
          "aria-label": "favourite",
          onClick: toggleFav,
          children: /* @__PURE__ */ jsx(default_1$2, {
            sx: {
              color: document.isFavourite && "red"
            }
          })
        }),
        title: document.name,
        subheader: formatDate(document.lastModified)
      }), /* @__PURE__ */ jsx(CardContent$1, {
        ref: contentRef,
        sx: {
          display: "block",
          overflow: "auto"
        },
        children: /* @__PURE__ */ jsx(MarkdownRenderer, {
          mdx: document == null ? void 0 : document.mdx,
          onAfterRender
        })
      })]
    }), (((_a = document == null ? void 0 : document.mdx) == null ? void 0 : _a.match(/#/g)) || []).length > 1 && /* @__PURE__ */ jsx(Card, {
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
        top: "100px"
      },
      children: /* @__PURE__ */ jsx(TableOfContents, {
        mdx: document == null ? void 0 : document.mdx
      })
    })]
  });
};
export { Content, Content as default };
//# sourceMappingURL=content.js.map
