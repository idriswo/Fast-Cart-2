import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  {
    tagKey: "hero.s1Tag",
    titleKey: "hero.s1Title",
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop",
    link: "/catalog",
  },
  {
    tagKey: "hero.s2Tag",
    titleKey: "hero.s2Title",
    img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
    link: "/catalog",
  },
  {
    tagKey: "hero.s3Tag",
    titleKey: "hero.s3Title",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    link: "/catalog",
  },
  {
    tagKey: "hero.s4Tag",
    titleKey: "hero.s4Title",
    img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop",
    link: "/catalog",
  },
];

export default function Hero() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p === SLIDES.length - 1 ? 0 : p + 1)),
      4000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex min-h-[340px] w-full select-none items-center overflow-hidden rounded bg-black text-white md:min-h-[380px]">
      {SLIDES.map((slide, i) => {
        const active = i === current;
        return (
          <div
            key={i}
            className={`absolute inset-0 flex flex-col items-center justify-between px-8 py-10 transition-all duration-700 ease-in-out md:flex-row md:px-14 ${
              active
                ? "scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0"
            }`}
          >
            <div className="z-10 flex flex-1 flex-col items-start text-left">
              <p className="mb-4 text-sm tracking-wide text-neutral-300">{t(slide.tagKey)}</p>
              <h2 className="mb-6 max-w-[360px] text-3xl font-bold leading-snug tracking-tight md:text-5xl">
                {t(slide.titleKey)}
              </h2>
              <Link
                to={slide.link}
                className="group/btn flex items-center gap-2 border-b border-neutral-400 pb-1 text-base font-medium transition-all duration-300 hover:border-brand hover:text-brand"
              >
                {t("hero.shopNow")}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <img
                src={slide.img}
                alt={t(slide.tagKey)}
                className="max-h-[140px] w-auto rounded-xl object-cover shadow-2xl md:max-h-[260px]"
              />
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-5 left-0 right-0 z-20 flex items-center justify-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={t("hero.slide", { n: i + 1 })}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "h-3 w-3 scale-110 border-2 border-white bg-brand"
                : "h-2 w-2 bg-neutral-50 hover:bg-neutral-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
