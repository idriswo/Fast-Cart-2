import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGS } from "@/i18n";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const activeCode = i18n.resolvedLanguage ?? i18n.language;
  const current = LANGS.find((l) => l.code === activeCode) ?? LANGS[0];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand"
        aria-label="Language"
      >
        <Globe size={18} />
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-md border bg-neutral-50 shadow-lg">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                i18n.changeLanguage(l.code);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-soft",
                l.code === current.code && "font-semibold text-brand"
              )}
            >
              {l.name}
              <span className="text-xs text-neutral-400">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
