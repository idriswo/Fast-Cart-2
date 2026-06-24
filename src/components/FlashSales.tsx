import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import SectionHead from "./SectionHead";

function useCountdown(target: number) {
  const [left, setLeft] = useState(target - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(target - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  const s = Math.max(0, Math.floor(left / 1000));
  return {
    days: String(Math.floor(s / 86400)).padStart(2, "0"),
    hours: String(Math.floor((s % 86400) / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((s % 3600) / 60)).padStart(2, "0"),
    seconds: String(s % 60).padStart(2, "0"),
  };
}

export default function FlashSales({
  products,
  loading,
}: {
  products: Product[];
  loading: boolean;
}) {
  const { t } = useTranslation();
  const [target] = useState(() => Date.now() + 3 * 86400_000 + 23 * 3600_000);
  const { days, hours, minutes, seconds } = useCountdown(target);
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
    <section className="mt-16">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="flex flex-wrap items-end gap-10">
          <SectionHead tag={t("flash.tag")} title={t("flash.title")} />
          <div className="mb-1 hidden items-center gap-5 md:flex">
            {[
              { l: t("flash.day"), v: days },
              { l: t("flash.hour"), v: hours },
              { l: t("flash.minute"), v: minutes },
              { l: t("flash.second"), v: seconds },
            ].map((u, i) => (
              <div key={u.l} className="flex items-end gap-5">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium text-neutral-500">{u.l}</span>
                  <span className="text-2xl font-bold tabular-nums">{u.v}</span>
                </div>
                {i < 3 && <span className="animate-pulse text-xl font-bold text-brand">:</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            ref={setPrevEl}
            className="grid h-11 w-11 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            ref={setNextEl}
            className="grid h-11 w-11 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={2}
          navigation={{ prevEl, nextEl }}
          breakpoints={{ 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
          className="mySwiper"
        >
          {products.map((p, i) => (
            <SwiperSlide key={p.id} className="h-auto pb-2">
              <ProductCard product={p} index={i} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
