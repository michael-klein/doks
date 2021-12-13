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
import { d as default_1$1 } from "./Favorite.js";
import { d as default_1, B as Box, H as modifyDocument, a as documents$ } from "./documents.js";
import * as React from "react";
import React__default, { memo, useMemo, useCallback, useRef } from "react";
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
const TOCList = default_1("ul")({
  listStyle: "none",
  margin: 0,
  padding: 10,
  lineHeight: "1.6em"
});
const TOCListItem = default_1("li")({
  fontSize: "1.1em",
  "a,a:hover,a:link,a:active": {
    color: "inherit",
    textDecoration: "none"
  },
  "a:hover": {
    textDecoration: "underline"
  }
});
const getListItem = (level) => (props) => {
  const params = useParams();
  return /* @__PURE__ */ jsx(TOCListItem, {
    sx: {
      paddingLeft: 10 * (level - 1) + "px"
    },
    children: /* @__PURE__ */ jsx(Link, __spreadProps(__spreadValues({}, props), {
      to: `/${params.projectSlug}/${params.contentSlug}/${props.index}`
    }))
  });
};
const TOC = memo(({
  mdx
}) => {
  const headings = useMemo(() => mdx == null ? void 0 : mdx.replace(/(<([^>]+)>)/gi, "").split("\n").filter((line) => line.includes("#")).join("\n"), [mdx]);
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
const Wrapper = default_1(Box)(({
  theme
}) => __spreadValues({}, theme.typography.body1));
const Header = default_1("h1")({
  fontSize: "1.2em",
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
const ContentWrapper = default_1(Grid)(({
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
  const onAfterRender = useCallback(() => {
    var _a2;
    if (params.headingIndex !== void 0) {
      const element = (_a2 = contentRef.current) == null ? void 0 : _a2.querySelector(`#heading-${params.headingIndex}`);
      if (element) {
        const offset = 60;
        const bodyRect = window.document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        console.log(offsetPosition);
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  }, [params.headingIndex]);
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
          children: /* @__PURE__ */ jsx(default_1$1, {
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
    }), ((_a = document == null ? void 0 : document.mdx) == null ? void 0 : _a.includes("#")) && /* @__PURE__ */ jsx(Card, {
      elevation: 2,
      sx: {
        padding: 2,
        textAlign: "justify",
        overflowX: "auto",
        marginTop: "20px",
        marginBottom: "20px",
        marginLeft: "-10px",
        whiteSpace: "pre",
        overflow: "visible",
        position: "sticky",
        top: "80px"
      },
      children: /* @__PURE__ */ jsx(TableOfContents, {
        mdx: document == null ? void 0 : document.mdx
      })
    })]
  });
};
export { Content, Content as default };
//# sourceMappingURL=content.js.map
