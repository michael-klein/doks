import { g as generateUtilityClass, f as generateUtilityClasses, s as styled, _ as _extends, h as useThemeProps, i as _objectWithoutPropertiesLoose, k as composeClasses, j as jsx, d as jsxs, l as clsx } from "./main.js";
import * as React from "react";
import { T as Typography } from "./IconButton.js";
function getCardHeaderUtilityClass(slot) {
  return generateUtilityClass("MuiCardHeader", slot);
}
const cardHeaderClasses = generateUtilityClasses("MuiCardHeader", ["root", "avatar", "action", "content", "title", "subheader"]);
var cardHeaderClasses$1 = cardHeaderClasses;
const _excluded = ["action", "avatar", "className", "component", "disableTypography", "subheader", "subheaderTypographyProps", "title", "titleTypographyProps"];
const useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    avatar: ["avatar"],
    action: ["action"],
    content: ["content"],
    title: ["title"],
    subheader: ["subheader"]
  };
  return composeClasses(slots, getCardHeaderUtilityClass, classes);
};
const CardHeaderRoot = styled("div", {
  name: "MuiCardHeader",
  slot: "Root",
  overridesResolver: (props, styles) => _extends({
    [`& .${cardHeaderClasses$1.title}`]: styles.title,
    [`& .${cardHeaderClasses$1.subheader}`]: styles.subheader
  }, styles.root)
})({
  display: "flex",
  alignItems: "center",
  padding: 16
});
const CardHeaderAvatar = styled("div", {
  name: "MuiCardHeader",
  slot: "Avatar",
  overridesResolver: (props, styles) => styles.avatar
})({
  display: "flex",
  flex: "0 0 auto",
  marginRight: 16
});
const CardHeaderAction = styled("div", {
  name: "MuiCardHeader",
  slot: "Action",
  overridesResolver: (props, styles) => styles.action
})({
  flex: "0 0 auto",
  alignSelf: "flex-start",
  marginTop: -4,
  marginRight: -8,
  marginBottom: -4
});
const CardHeaderContent = styled("div", {
  name: "MuiCardHeader",
  slot: "Content",
  overridesResolver: (props, styles) => styles.content
})({
  flex: "1 1 auto"
});
const CardHeader = /* @__PURE__ */ React.forwardRef(function CardHeader2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiCardHeader"
  });
  const {
    action,
    avatar,
    className,
    component = "div",
    disableTypography = false,
    subheader: subheaderProp,
    subheaderTypographyProps,
    title: titleProp,
    titleTypographyProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    component,
    disableTypography
  });
  const classes = useUtilityClasses(ownerState);
  let title = titleProp;
  if (title != null && title.type !== Typography && !disableTypography) {
    title = /* @__PURE__ */ jsx(Typography, _extends({
      variant: avatar ? "body2" : "h5",
      className: classes.title,
      component: "span",
      display: "block"
    }, titleTypographyProps, {
      children: title
    }));
  }
  let subheader = subheaderProp;
  if (subheader != null && subheader.type !== Typography && !disableTypography) {
    subheader = /* @__PURE__ */ jsx(Typography, _extends({
      variant: avatar ? "body2" : "body1",
      className: classes.subheader,
      color: "text.secondary",
      component: "span",
      display: "block"
    }, subheaderTypographyProps, {
      children: subheader
    }));
  }
  return /* @__PURE__ */ jsxs(CardHeaderRoot, _extends({
    className: clsx(classes.root, className),
    as: component,
    ref,
    ownerState
  }, other, {
    children: [avatar && /* @__PURE__ */ jsx(CardHeaderAvatar, {
      className: classes.avatar,
      ownerState,
      children: avatar
    }), /* @__PURE__ */ jsxs(CardHeaderContent, {
      className: classes.content,
      ownerState,
      children: [title, subheader]
    }), action && /* @__PURE__ */ jsx(CardHeaderAction, {
      className: classes.action,
      ownerState,
      children: action
    })]
  }));
});
var CardHeader$1 = CardHeader;
export { CardHeader$1 as C };
//# sourceMappingURL=CardHeader.js.map
