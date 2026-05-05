import { en, type Dictionary } from "./locales/en";
import { az } from "./locales/az";
import type { Lang } from "./config";

export const dictionaries: Record<Lang, Dictionary> = { en, az };
export type { Dictionary };
