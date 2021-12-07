import {
  ObservableResource,
  useObservable,
  useObservableSuspense,
} from "observable-hooks";
import React, { useMemo } from "react";
import { BehaviorSubject, Observable } from "rxjs";

export function useObservableWithSuspense<TOutput>(
  init: () => Observable<TOutput>
): TOutput {
  const ressource = useMemo(
    () => new ObservableResource(init(), (v) => v !== undefined),
    []
  );
  return useObservableSuspense(ressource);
}
