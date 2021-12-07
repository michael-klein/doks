import { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { ValueSubject } from "../utils/value_subject";

export const useParamsObservable = () => {
  const params = useParams();
  const params$ = useMemo(() => new ValueSubject(params), []);

  useEffect(() => {
    params$.next(params);
  }, [params]);

  return params$;
};
