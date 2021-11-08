import { StateUpdater, useEffect, useRef, useState } from "preact/hooks";
import { BehaviorSubject, Observable, Subscription } from "rxjs";

class Suspended extends Error {}
const suspend = <T>(): undefined => {
  return new Suspended("") as any;
};
export const useObservable = <OBS extends Observable<any>>(
  o: OBS | ((suspend: () => undefined) => OBS),
  options?: {
    canSuspend?: boolean;
  }
): [OBS extends Observable<infer T> ? T : unknown, OBS] => {
  const { canSuspend = false } = options || {};
  const setValueRef =
    useRef<StateUpdater<OBS extends Observable<infer T> ? T : unknown>>();
  const observableRef = useRef<OBS>();
  const subscriptionRef = useRef<Subscription>();

  const resolveSuspenseRef = useRef<() => void>();
  const suspensePromiseRef = useRef<Promise<void>>();

  const [value, setValue] = useState<
    OBS extends Observable<infer T> ? T : unknown
  >(() => {
    observableRef.current = typeof o === "function" ? o(suspend) : o;
    let initivalValue: OBS extends Observable<infer T> ? T : unknown =
      observableRef.current instanceof BehaviorSubject
        ? observableRef.current.value
        : canSuspend
        ? suspend()
        : undefined;
    let init = true;

    subscriptionRef.current = observableRef.current.subscribe({
      next: (v) => {
        initivalValue = v;
        if (
          !init &&
          suspensePromiseRef.current &&
          (v as any) instanceof Suspended
        ) {
          suspensePromiseRef.current = undefined;
          resolveSuspenseRef.current?.();
          resolveSuspenseRef.current = undefined;
          setValueRef?.current?.(v);
        }
      },
      error: (e) => {
        console.error(e);
      },
    });
    init = false;
    return initivalValue;
  });
  setValueRef.current = setValue;

  if ((value as any) instanceof Suspended) {
    if (suspensePromiseRef.current) {
      throw suspensePromiseRef.current;
    }
    suspensePromiseRef.current = new Promise((resolve) => {
      resolveSuspenseRef.current = resolve;
    });
    throw suspensePromiseRef.current;
  }

  useEffect(() => {
    return () => {
      subscriptionRef?.current?.unsubscribe();
    };
  }, []);

  return [value, observableRef.current];
};
