import { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { BehaviorSubject } from "rxjs";

export const useParamsObservable = () => {
  const params = useParams();
  const params$ = useMemo(() => new BehaviorSubject(params), []);

  useEffect(() => {
    params$.next(params);
  }, [params]);

  return params$;
};
