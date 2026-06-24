import { Link } from "react-router-dom";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

function Tile({
  title,
  text,
  img,
  className = "",
}: {
  title: string;
  text: string;
  img: string;
  className?: string;
}) {
  return (
    <Link
      to="/catalog"
      className={`group relative flex items-end overflow-hidden rounded-md bg-black p-6 text-white ${className}`}
    >
      <img
        src={img}
        alt={title}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="z-10">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-1 max-w-[220px] text-sm text-neutral-200">{text}</p>
        <span className="mt-3 inline-block border-b border-white pb-0.5 text-sm font-medium transition-colors group-hover:border-brand group-hover:text-brand">
          Харидан
        </span>
      </div>
    </Link>
  );
}

export default function NewArrival() {
  return (
    <section className="mt-16">
      <SectionHead tag="Махсус" title="Маҳсулоти нав" />
      <Reveal delay={100} className="mt-8 grid gap-6 md:grid-cols-2">
        <Tile
          title="PlayStation 5"
          text="Версияи сиёҳу сафеди PS5 ҳозир дар фурӯш."
          img="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=900&auto=format&fit=crop"
          className="min-h-[300px] md:row-span-2"
        />
        <Tile
          title="Коллексияи занона"
          text="Маҳсулоти махсус барои занон."
          img="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop"
          className="min-h-[140px]"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <Tile
            title="Динамикҳо"
            text="Динамикҳои бесим."
            img="https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=600&auto=format&fit=crop"
            className="min-h-[140px]"
          />
          <Tile
            title="Атриёт"
            text="Атриёти боксифат."
            img="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop"
            className="min-h-[140px]"
          />
        </div>
      </Reveal>
    </section>
  );
}
