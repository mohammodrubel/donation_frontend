export const SUPPORTED_LANGS = ["en", "az"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: Lang = "en";
export const RTL_LANGS: Lang[] = [];

export const LANG_LABELS: Record<Lang, { name: string; native: string; flag: string }> = {
  en: { name: "English", native: "English", flag: "🇬🇧" },
  az: { name: "Azerbaijani", native: "Azərbaycan", flag: "🇦🇿" },
};

export const isRTL = (lang: Lang) => RTL_LANGS.includes(lang);
