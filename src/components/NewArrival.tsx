import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
        <p className="mt-1 max-w-[220px] text-sm text-zinc-200">{text}</p>
        <span className="mt-3 inline-block border-b border-white pb-0.5 text-sm font-medium transition-colors group-hover:border-brand group-hover:text-brand">
          {t("newArrival.buy")}
        </span>
      </div>
    </Link>
  );
}

export default function NewArrival() {
  const { t } = useTranslation();
  return (
    <section className="mt-16">
      <SectionHead tag={t("newArrival.tag")} title={t("newArrival.title")} />
      <Reveal delay={100} className="mt-8 grid gap-6 md:grid-cols-2">
        <Tile
          title={t("newArrival.ps5Title")}
          text={t("newArrival.ps5Text")}
          img="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=900&auto=format&fit=crop"
          className="min-h-[300px] md:row-span-2"
        />
        <Tile
          title={t("newArrival.womenTitle")}
          text={t("newArrival.womenText")}
          img="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop"
          className="min-h-[140px]"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <Tile
            title={t("newArrival.speakersTitle")}
            text={t("newArrival.speakersText")}
            img="https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=600&auto=format&fit=crop"
            className="min-h-[140px]"
          />
          <Tile
            title={t("newArrival.perfumeTitle")}
            text={t("newArrival.perfumeText")}
            img="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop"
            className="min-h-[140px]"
          />
        </div>
      </Reveal>
    </section>
  );
}
