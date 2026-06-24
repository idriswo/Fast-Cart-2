import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";

function useCountdown(target: number) {
  const [left, setLeft] = useState(target - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(target - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  const s = Math.max(0, Math.floor(left / 1000));
  return [
    { k: "promo.hour", v: String(Math.floor((s % 86400) / 3600)).padStart(2, "0") },
    { k: "promo.day", v: String(Math.floor(s / 86400)).padStart(2, "0") },
    { k: "promo.minute", v: String(Math.floor((s % 3600) / 60)).padStart(2, "0") },
    { k: "promo.second", v: String(s % 60).padStart(2, "0") },
  ];
}

export default function PromoBanner() {
  const { t } = useTranslation();
  const [target] = useState(() => Date.now() + 5 * 86400_000);
  const units = useCountdown(target);

  return (
    <Reveal className="my-16">
    <section className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-md bg-black px-6 py-12 text-white md:flex-row md:px-16 md:py-16">
      <div className="z-10 max-w-md text-center md:text-left">
        <span className="font-semibold text-green-400">{t("promo.tag")}</span>
        <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
          {t("promo.title")}
        </h2>
        <div className="mt-8 flex justify-center gap-4 md:justify-start">
          {units.map((u) => (
            <div
              key={u.k}
              className="grid h-16 w-16 place-items-center rounded-full bg-white text-center text-black"
            >
              <div>
                <div className="text-base font-bold tabular-nums leading-none">{u.v}</div>
                <div className="text-[10px]">{t(u.k)}</div>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/catalog"
          className="mt-8 inline-block rounded bg-green-500 px-10 py-3.5 font-medium text-white transition hover:bg-green-600"
        >
          {t("promo.buyNow")}
        </Link>
      </div>
      <img
        src="https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=900&auto=format&fit=crop"
        alt={t("promo.title")}
        className="z-10 max-h-[220px] w-auto object-contain drop-shadow-2xl"
      />
    </section>
    </Reveal>
  );
}
