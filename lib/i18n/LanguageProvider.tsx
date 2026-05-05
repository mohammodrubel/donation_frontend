"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_LANG, isRTL, type Lang } from "./config";
import type { RootState } from "@/lib/reudx/store";
import { baseApi } from "@/lib/reudx/api/baseApi";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSelector((state: RootState) => state.lang?.lang ?? DEFAULT_LANG) as Lang;
  const dispatch = useDispatch();
  const previousLang = useRef<Lang | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    html.lang = lang;
    html.dir = isRTL(lang) ? "rtl" : "ltr";

    // Reset API cache when language switches so new requests fetch translated data.
    if (previousLang.current && previousLang.current !== lang) {
      dispatch(baseApi.util.resetApiState());
    }
    previousLang.current = lang;
  }, [lang, dispatch]);

  return <>{children}</>;
}
