import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function useCountdown(target: number) {
  const [left, setLeft] = useState(target - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(target - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  const s = Math.max(0, Math.floor(left / 1000));
  return [
    { l: "Соат", v: String(Math.floor((s % 86400) / 3600)).padStart(2, "0") },
    { l: "Рӯз", v: String(Math.floor(s / 86400)).padStart(2, "0") },
    { l: "Дақиқа", v: String(Math.floor((s % 3600) / 60)).padStart(2, "0") },
    { l: "Сония", v: String(s % 60).padStart(2, "0") },
  ];
}

export default function PromoBanner() {
  const [target] = useState(() => Date.now() + 5 * 86400_000);
  const units = useCountdown(target);

  return (
    <section
      data-aos="fade-up"
      className="relative my-16 flex flex-col items-center justify-between gap-8 overflow-hidden rounded-md bg-black px-6 py-12 text-white md:flex-row md:px-16 md:py-16"
    >
      <div className="z-10 max-w-md text-center md:text-left">
        <span className="font-semibold text-green-400">Категорияҳо</span>
        <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
          Аз мусиқӣ лаззат баред
        </h2>
        <div className="mt-8 flex justify-center gap-4 md:justify-start">
          {units.map((u) => (
            <div
              key={u.l}
              className="grid h-16 w-16 place-items-center rounded-full bg-white text-center text-black"
            >
              <div>
                <div className="text-base font-bold tabular-nums leading-none">{u.v}</div>
                <div className="text-[10px]">{u.l}</div>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/catalog"
          className="mt-8 inline-block rounded bg-green-500 px-10 py-3.5 font-medium text-white transition hover:bg-green-600"
        >
          Ҳозир харидан
        </Link>
      </div>
      <div className="z-10 text-[120px] drop-shadow-2xl md:text-[160px]">🔊</div>
    </section>
  );
}
