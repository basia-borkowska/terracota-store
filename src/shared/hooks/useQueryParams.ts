import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useQueryParam = <T = string>(
  key: string,
  options?: {
    parse?: (raw: string | null) => T | null;
    serialize?: (val: T) => string;
    replace?: boolean;
  }
) => {
  const { parse, serialize, replace = true } = options ?? {};
  const [params, setParams] = useSearchParams();

  const raw = params.get(key);
  const value = useMemo<T | null>(() => {
    if (parse) return parse(raw);
    return (raw as unknown as T) ?? null;
  }, [raw, parse]);

  const setValue = useCallback(
    (next: T | null | undefined) => {
      const nextParams = new URLSearchParams(params);
      if (
        next === undefined ||
        next === null ||
        next === ('' as unknown as T)
      ) {
        nextParams.delete(key);
      } else {
        const v = serialize ? serialize(next) : (String(next) as string);
        nextParams.set(key, v);
      }
      setParams(nextParams, { replace });
    },
    [key, serialize, replace, setParams, params]
  );

  return [value, setValue] as const;
};

export const parseString = (raw: string | null) => raw;
export const parseNumber = (raw: string | null) =>
  raw == null ? null : Number.isNaN(Number(raw)) ? null : Number(raw);
export const parseBoolean = (raw: string | null) =>
  raw == null ? null : raw === 'true' ? true : raw === 'false' ? false : null;
