import { u as useObservableState, b as useObservable } from "./IconButton.js";
function useObservableAndState(init, inputs) {
  const observable$ = useObservable(init, inputs);
  return [useObservableState(observable$), observable$];
}
export { useObservableAndState as u };
//# sourceMappingURL=use_observable_and_state.js.map
