import { u as useObservableState, a as useObservable } from "./use-observable-state.js";
function useObservableAndState(init, inputs) {
  const observable$ = useObservable(init, inputs);
  return [useObservableState(observable$), observable$];
}
export { useObservableAndState as u };
//# sourceMappingURL=use_observable_and_state.js.map
