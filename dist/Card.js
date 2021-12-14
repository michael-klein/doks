import { g as generateUtilityClass, f as generateUtilityClasses, s as styled, h as useThemeProps, i as _objectWithoutPropertiesLoose, _ as _extends, k as composeClasses, j as jsx, l as clsx } from "./main.js";
import * as React from "react";
import { P as Paper } from "./IconButton.js";
function getCardUtilityClass(slot) {
  return generateUtilityClass("MuiCard", slot);
}
generateUtilityClasses("MuiCard", ["root"]);
const _excluded = ["className", "raised"];
const useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getCardUtilityClass, classes);
};
const CardRoot = styled(Paper, {
  name: "MuiCard",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})(() => {
  return {
    overflow: "hidden"
  };
});
const Card = /* @__PURE__ */ React.forwardRef(function Card2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiCard"
  });
  const {
    className,
    raised = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    raised
  });
  const classes = useUtilityClasses(ownerState);
  return /* @__PURE__ */ jsx(CardRoot, _extends({
    className: clsx(classes.root, className),
    elevation: raised ? 8 : void 0,
    ref,
    ownerState
  }, other));
});
var Card$1 = Card;
export { Card$1 as C };
//# sourceMappingURL=Card.js.map
