import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Headphones, ShieldCheck, Truck } from "lucide-react";
import { getCategories, getProducts } from "@/api/products";
import type { Category, Product } from "@/types";
import Hero from "@/components/Hero";
import FlashSales from "@/components/FlashSales";
import PromoBanner from "@/components/PromoBanner";
import NewArrival from "@/components/NewArrival";
import SectionHead from "@/components/SectionHead";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { imageUrl } from "@/lib/utils";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingP, setLoadingP] = useState(true);
  const [loadingC, setLoadingC] = useState(true);

  useEffect(() => {
    getProducts({ PageSize: 12 })
      .then((r) => setProducts(r.data.products ?? []))
      .finally(() => setLoadingP(false));
    getCategories()
      .then(setCategories)
      .finally(() => setLoadingC(false));
  }, []);

  return (
    <div className="container-x">
      {/* Hero */}
      <section className="mt-8 flex flex-col gap-8 md:flex-row">
        <aside className="hidden w-60 shrink-0 flex-col gap-3 border-r pr-4 md:flex">
          {(loadingC ? Array.from({ length: 6 }) : categories.slice(0, 8)).map(
            (c: any, i) =>
              loadingC ? (
                <div key={i} className="skeleton h-5 w-32" />
              ) : (
                <Link
                  key={c.id}
                  to={`/catalog?category=${c.id}`}
                  className="text-[15px] transition-all hover:pl-1 hover:text-brand"
                >
                  {c.categoryName}
                </Link>
              )
          )}
        </aside>
        <Reveal className="flex-1">
          <Hero />
        </Reveal>
      </section>

      {/* Flash Sales */}
      <FlashSales products={products} loading={loadingP} />

      <div className="my-12 h-px bg-neutral-200" />

      {/* Категорияҳо */}
      <section className="mt-4">
        <SectionHead tag="Категорияҳо" title="Аз рӯи категория ҷустуҷӯ кунед" />
        {loadingC ? (
          <div className="mt-8 grid grid-cols-3 gap-4 md:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-32 rounded-md" />
            ))}
          </div>
        ) : (
          <Reveal className="mt-8 grid grid-cols-3 gap-4 md:grid-cols-6">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/catalog?category=${c.id}`}
                className="flex h-32 flex-col items-center justify-center gap-3 rounded-md border transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white hover:shadow-lg"
              >
                <img
                  src={imageUrl(c.categoryImage)}
                  alt={c.categoryName}
                  className="h-12 w-12 object-contain"
                />
                <span className="text-sm font-medium">{c.categoryName}</span>
              </Link>
            ))}
          </Reveal>
        )}
      </section>

      {/* Promo banner */}
      <PromoBanner />

      {/* Маҳсулоти беҳтарин */}
      <section className="mt-16">
        <div className="mb-8 flex items-end justify-between">
          <SectionHead tag="Ин моҳ" title="Маҳсулоти беҳтарин" />
          <Link to="/catalog">
            <Button>Дидани ҳама</Button>
          </Link>
        </div>
        {loadingP ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <Reveal className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Reveal>
        )}
      </section>

      {/* New Arrival */}
      <NewArrival />

      {/* Хизматрасониҳо */}
      <Reveal className="my-24 flex flex-col items-center justify-center gap-16 md:flex-row">
        <Service icon={<Truck />} title="Расонидани ройгон" text="Барои харидҳои аз 500 сомонӣ" />
        <Service icon={<Headphones />} title="Дастгирии 24/7" text="Хизматрасонии доимии муштарӣ" />
        <Service icon={<ShieldCheck />} title="Кафолати баргардонидан" text="Баргардонидани пул дар 30 рӯз" />
      </Reveal>
    </div>
  );
}

function Service({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="text-center transition-transform duration-300 hover:-translate-y-1">
      <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full border-8 border-neutral-300 bg-black text-white">
        {icon}
      </div>
      <h4 className="font-bold uppercase">{title}</h4>
      <p className="mt-1 text-sm">{text}</p>
    </div>
  );
}
