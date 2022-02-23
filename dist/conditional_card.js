import { j as jsx } from "./main.js";
import { Q as Card } from "./doks.js";
const ConditionalCard = ({
  children,
  showCard,
  elevation = 1,
  sx = {}
}) => {
  if (!showCard) {
    return children;
  }
  return /* @__PURE__ */ jsx(Card, {
    elevation,
    sx,
    children
  });
};
export { ConditionalCard as C };
//# sourceMappingURL=conditional_card.js.map
