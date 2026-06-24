import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  {
    tag: "Серияи iPhone 15",
    title: "То 10% тахфиф бо ваучер",
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop",
    link: "/catalog",
  },
  {
    tag: "Samsung Galaxy AI",
    title: "Давраи нави Galaxy",
    img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
    link: "/catalog",
  },
  {
    tag: "MacBook Pro M3",
    title: "Иҷроиши ҳайратангез",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    link: "/catalog",
  },
  {
    tag: "Sony WH-1000XM5",
    title: "Ҷаҳони шумо. Дигар ҳеҷ",
    img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop",
    link: "/catalog",
  },
];

export default function Hero() {
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
              <p className="mb-4 text-sm tracking-wide text-neutral-300">{slide.tag}</p>
              <h2 className="mb-6 max-w-[360px] text-3xl font-bold leading-snug tracking-tight md:text-5xl">
                {slide.title}
              </h2>
              <Link
                to={slide.link}
                className="group/btn flex items-center gap-2 border-b border-neutral-400 pb-1 text-base font-medium transition-all duration-300 hover:border-brand hover:text-brand"
              >
                Ҳозир харид кунед
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <img
                src={slide.img}
                alt={slide.tag}
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
            aria-label={`Слайди ${i + 1}`}
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
