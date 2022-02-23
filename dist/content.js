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
import { x as default_1, u as useParams, z as useObservableState, J as useObservable, K as modifyDocument, c as useComponentContext, H as Card, L as CardHeader, O as IconButton, P as default_1$1, d as documents$ } from "./doks.js";
import * as React from "react";
import { useCallback, useRef } from "react";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { g as generateUtilityClass, a as generateUtilityClasses, q as styled, r as useThemeProps, b as _objectWithoutPropertiesLoose, _ as _extends, e as composeClasses, j as jsx, h as clsx, i as jsxs } from "./main.js";
import { G as Grid } from "./Grid.js";
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
  const {
    TableOfContents,
    MarkdownRenderer
  } = useComponentContext();
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
