import { useObservable, useObservableState } from "observable-hooks";
import { Observable } from "rxjs";

export function useObservableAndState<TOutput>(
  init: () => Observable<TOutput>
): [TOutput, Observable<TOutput>];
export function useObservableAndState<TOutput, TInputs extends Readonly<any[]>>(
  init: (inputs$: Observable<[...TInputs]>) => Observable<TOutput>,
  inputs: [...TInputs]
): [TOutput, Observable<TOutput>];
export function useObservableAndState<TOutput, TInputs extends Readonly<any[]>>(
  init:
    | (() => Observable<TOutput>)
    | ((inputs$: Observable<[...TInputs]>) => Observable<TOutput>),
  inputs?: [...TInputs]
): [TOutput, Observable<TOutput>] {
  const observable$ = useObservable(init, inputs);
  return [useObservableState(observable$), observable$];
}
