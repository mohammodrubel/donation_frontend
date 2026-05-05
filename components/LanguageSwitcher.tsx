"use client";

import { Globe, Check } from "lucide-react";
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
          size={variant === "icon" ? "icon" : "default"}
          className={className}
          aria-label={t("language.label")}
        >
          {variant === "icon" ? (
            <Globe className="w-5 h-5" />
          ) : (
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>{current.native}</span>
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
                <span aria-hidden>{meta.flag}</span>
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
