import { Link } from "react-router-dom";
import SectionHead from "./SectionHead";

function Tile({
  title,
  text,
  emoji,
  className = "",
}: {
  title: string;
  text: string;
  emoji: string;
  className?: string;
}) {
  return (
    <Link
      to="/catalog"
      className={`group relative flex items-end overflow-hidden rounded-md bg-black p-6 text-white ${className}`}
    >
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-7xl opacity-80 transition-transform duration-500 group-hover:scale-110">
        {emoji}
      </span>
      <div className="z-10">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-1 max-w-[200px] text-sm text-neutral-300">{text}</p>
        <span className="mt-3 inline-block border-b border-white pb-0.5 text-sm font-medium transition-colors group-hover:border-brand group-hover:text-brand">
          Харидан
        </span>
      </div>
    </Link>
  );
}

export default function NewArrival() {
  return (
    <section className="mt-16" data-aos="fade-up">
      <SectionHead tag="Махсус" title="Маҳсулоти нав" />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Tile
          title="PlayStation 5"
          text="Версияи сиёҳу сафеди PS5 ҳозир дар фурӯш."
          emoji="🎮"
          className="min-h-[300px] md:row-span-2"
        />
        <Tile
          title="Коллексияи занона"
          text="Маҳсулоти махсус барои занон."
          emoji="👜"
          className="min-h-[140px]"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <Tile title="Динамикҳо" text="Динамикҳои бесим." emoji="🔈" className="min-h-[140px]" />
          <Tile title="Атриёт" text="Atриёти боксифат." emoji="🧴" className="min-h-[140px]" />
        </div>
      </div>
    </section>
  );
}
