"use client";

import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { LANG_LABELS, SUPPORTED_LANGS, type Lang } from "@/lib/i18n/config";
import { Flag } from "@/lib/i18n/Flag";

interface LanguageSwitcherProps {
  variant?: "icon" | "full";
  className?: string;
}

export function LanguageSwitcher({ variant = "icon", className }: LanguageSwitcherProps) {
  const { lang, setLang, t } = useTranslation();
  const current = LANG_LABELS[lang];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={variant === "icon" ? "sm" : "default"}
          className={className}
          aria-label={`${t("language.label")}: ${current.native}`}
        >
          {variant === "icon" ? (
            <span className="flex items-center gap-1.5">
              <Flag lang={lang} />
              <span className="text-xs font-semibold uppercase tracking-wide">
                {lang}
              </span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Flag lang={lang} />
              <span>{current.native}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        <DropdownMenuLabel>{t("language.label")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SUPPORTED_LANGS.map((code: Lang) => {
          const meta = LANG_LABELS[code];
          const isActive = code === lang;
          return (
            <DropdownMenuItem
              key={code}
              onClick={() => setLang(code)}
              className="flex items-center justify-between gap-3"
            >
              <span className="flex items-center gap-2">
                <Flag lang={code} />
                <span>{meta.native}</span>
              </span>
              {isActive && <Check className="w-4 h-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
