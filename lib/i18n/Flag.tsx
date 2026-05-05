import type { Lang } from "./config";
import { LANG_LABELS } from "./config";

interface FlagProps {
  lang: Lang;
  className?: string;
}

export function Flag({ lang, className = "w-5 h-[14px] rounded-sm" }: FlagProps) {
  const code = LANG_LABELS[lang].flagCode;
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      width={20}
      height={14}
      alt=""
      aria-hidden
      className={`${className} object-cover inline-block shrink-0 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]`}
    />
  );
}
