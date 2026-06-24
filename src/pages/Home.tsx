import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Headphones, ShieldCheck, Truck } from "lucide-react";
import { getCategories, getProducts } from "@/api/products";
import type { Category, Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { imageUrl } from "@/lib/utils";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getProducts({ PageSize: 8 }).then((r) => setProducts(r.data.products ?? []));
    getCategories().then(setCategories);
  }, []);

  return (
    <div className="container-x">
      {/* Hero */}
      <section className="mt-8 flex flex-col gap-8 md:flex-row">
        <aside className="hidden w-60 shrink-0 flex-col gap-3 border-r pr-4 md:flex">
          {categories.slice(0, 8).map((c) => (
            <Link
              key={c.id}
              to={`/catalog?category=${c.id}`}
              className="text-[15px] hover:text-brand hover:pl-1 transition-all"
            >
              {c.categoryName}
            </Link>
          ))}
        </aside>

        <div className="flex flex-1 items-center justify-between rounded bg-black px-10 py-14 text-white">
          <div>
            <p className="mb-4 text-sm text-neutral-300">Серияи нав</p>
            <h1 className="max-w-md text-4xl font-bold leading-tight md:text-5xl">
              Маҳсулоти техникӣ бо нархи беҳтарин
            </h1>
            <Link to="/catalog">
              <Button variant="dark" className="mt-7 border-b border-white pb-1 px-0 hover:bg-transparent">
                Ҳозир харид кунед <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
          <div className="hidden text-7xl md:block">🛒</div>
        </div>
      </section>

      {/* Категорияҳо */}
      <section className="mt-20">
        <SectionHead tag="Категорияҳо" title="Аз рӯи категория ҷустуҷӯ кунед" />
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/catalog?category=${c.id}`}
              className="flex h-32 flex-col items-center justify-center gap-3 rounded-md border transition-colors hover:bg-brand hover:text-white"
            >
              <img
                src={imageUrl(c.categoryImage)}
                alt={c.categoryName}
                className="h-12 w-12 object-contain"
              />
              <span className="text-sm font-medium">{c.categoryName}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Маҳсулоти беҳтарин */}
      <section className="mt-20">
        <div className="flex items-end justify-between">
          <SectionHead tag="Маҳсулот" title="Маҳсулоти беҳтарин" />
          <Link to="/catalog">
            <Button variant="outline" size="sm">Ҳама</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Хизматрасониҳо */}
      <section className="my-24 flex flex-col items-center justify-center gap-16 md:flex-row">
        <Service icon={<Truck />} title="Расонидани ройгон" text="Барои харидҳои аз 500 сомонӣ" />
        <Service icon={<Headphones />} title="Дастгирии 24/7" text="Хизматрасонии доимии муштарӣ" />
        <Service icon={<ShieldCheck />} title="Кафолати баргардонидан" text="Баргардонидани пул дар 30 рӯз" />
      </section>
    </div>
  );
}

function SectionHead({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-3">
        <span className="h-8 w-4 rounded bg-brand" />
        <span className="font-semibold text-brand">{tag}</span>
      </div>
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
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
    <div className="text-center">
      <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full border-8 border-neutral-300 bg-black text-white">
        {icon}
      </div>
      <h4 className="font-bold uppercase">{title}</h4>
      <p className="mt-1 text-sm">{text}</p>
    </div>
  );
}
