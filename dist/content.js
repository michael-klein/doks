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
import { d as default_1, u as useObservableState, H as modifyDocument, b as documents$ } from "./documents.js";
import * as React from "react";
import { useCallback } from "react";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { I as IconButton, M as MarkdownRenderer } from "./markdown_renderer.js";
import { k as generateUtilityClass, l as generateUtilityClasses, m as styled, n as useThemeProps, h as _objectWithoutPropertiesLoose, _ as _extends, o as composeClasses, j as jsx, q as clsx, d as jsxs } from "./main.js";
import { G as Grid } from "./Button.js";
import { u as useParams } from "./doks.js";
import { u as useObservable } from "./Paper.js";
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
const ContentWrapper = default_1(Grid)(({
  theme
}) => ({
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    flexBasis: "initial"
  }
}));
const Content = () => {
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
  return /* @__PURE__ */ jsx(ContentWrapper, {
    item: true,
    xs: 9,
    children: /* @__PURE__ */ jsxs(Card, {
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
        subheader: document.lastModified
      }), /* @__PURE__ */ jsx(CardContent$1, {
        sx: {
          display: "block",
          overflow: "auto"
        },
        children: /* @__PURE__ */ jsx(MarkdownRenderer, {
          mdx: document == null ? void 0 : document.mdx
        })
      })]
    })
  });
};
export { Content, Content as default };
//# sourceMappingURL=content.js.map
