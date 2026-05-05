"use client";

import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dictionaries, type Dictionary } from "./dictionaries";
import { DEFAULT_LANG, isRTL, type Lang } from "./config";
import { setLang as setLangAction } from "@/lib/reudx/fetchers/lang/langSlice";
import type { RootState } from "@/lib/reudx/store";

type Primitive = string | number | boolean;

// Path<T> builds a dotted-key union of all string-leaf paths in the dictionary.
type Path<T, P extends string = ""> = T extends Primitive
  ? P
  : T extends readonly (infer U)[]
  ? P | Path<U, `${P}.${number}`>
  : T extends object
  ? {
      [K in keyof T & string]: Path<T[K], P extends "" ? K : `${P}.${K}`>;
    }[keyof T & string]
  : P;

export type TKey = Path<Dictionary>;

const getByPath = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
};

const interpolate = (template: string, vars?: Record<string, Primitive>) => {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : `{${k}}`));
};

export function useTranslation() {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.lang?.lang ?? DEFAULT_LANG) as Lang;

  const dict = useMemo(() => dictionaries[lang] ?? dictionaries[DEFAULT_LANG], [lang]);
  const fallback = dictionaries[DEFAULT_LANG];

  const t = useCallback(
    (key: TKey, vars?: Record<string, Primitive>): string => {
      const value = getByPath(dict, key) ?? getByPath(fallback, key) ?? key;
      if (typeof value === "string") return interpolate(value, vars);
      return String(value);
    },
    [dict, fallback]
  );

  // tArr: read an array value (for steps, testimonials, partners, stats items).
  const tArr = useCallback(
    <T = unknown>(key: TKey): T[] => {
      const value = getByPath(dict, key) ?? getByPath(fallback, key);
      return Array.isArray(value) ? (value as T[]) : [];
    },
    [dict, fallback]
  );

  const setLang = useCallback(
    (next: Lang) => {
      dispatch(setLangAction(next));
    },
    [dispatch]
  );

  return {
    t,
    tArr,
    lang,
    setLang,
    dir: isRTL(lang) ? ("rtl" as const) : ("ltr" as const),
    isRTL: isRTL(lang),
  };
}
