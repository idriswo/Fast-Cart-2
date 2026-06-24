import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2, SlidersHorizontal } from "lucide-react";
import { getCategories, getProducts } from "@/api/products";
import type { Brand, Category, Color, Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

const PAGE_SIZE = 9;

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const categoryId = params.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // filterҳои локалӣ
  const [activeCat, setActiveCat] = useState<number | null>(
    categoryId ? Number(categoryId) : null
  );
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const [activeBrand, setActiveBrand] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts({
      ProductName: q || undefined,
      CategoryId: activeCat ?? undefined,
      ColorId: activeColor ?? undefined,
      BrandId: activeBrand ?? undefined,
      MaxPrice: maxPrice === "" ? undefined : Number(maxPrice),
      PageNumber: page,
      PageSize: PAGE_SIZE,
    })
      .then((res) => {
        setProducts(res.data.products ?? []);
        setColors(res.data.colors ?? []);
        setBrands(res.data.brands ?? []);
        setTotalPage(res.totalPage || 1);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [q, activeCat, activeColor, activeBrand, maxPrice, page]);

  // ҳангоми тағйири filter ба саҳифаи 1 бармегардем
  useEffect(() => setPage(1), [q, activeCat, activeColor, activeBrand, maxPrice]);

  const title = useMemo(() => {
    if (q) return `Натиҷаҳои ҷустуҷӯ: «${q}»`;
    if (activeCat)
      return categories.find((c) => c.id === activeCat)?.categoryName ?? "Каталог";
    return "Ҳамаи маҳсулот";
  }, [q, activeCat, categories]);

  const resetFilters = () => {
    setActiveCat(null);
    setActiveColor(null);
    setActiveBrand(null);
    setMaxPrice("");
    setParams({});
  };

  return (
    <div className="container-x py-10">
      <h1 className="mb-8 text-2xl font-bold md:text-3xl">{title}</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Filterҳо */}
        <aside className="w-full shrink-0 lg:w-64">
          <div className="mb-6 flex items-center justify-between">
            <span className="flex items-center gap-2 font-semibold">
              <SlidersHorizontal size={18} /> Филтрҳо
            </span>
            <button
              onClick={resetFilters}
              className="text-sm text-brand hover:underline"
            >
              Тоза кардан
            </button>
          </div>

          <FilterGroup title="Категория">
            <button
              onClick={() => setActiveCat(null)}
              className={pill(activeCat === null)}
            >
              Ҳама
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={pill(activeCat === c.id)}
              >
                {c.categoryName}
              </button>
            ))}
          </FilterGroup>

          {brands.length > 0 && (
            <FilterGroup title="Бренд">
              <button
                onClick={() => setActiveBrand(null)}
                className={pill(activeBrand === null)}
              >
                Ҳама
              </button>
              {brands.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActiveBrand(b.id)}
                  className={pill(activeBrand === b.id)}
                >
                  {b.brandName}
                </button>
              ))}
            </FilterGroup>
          )}

          {colors.length > 0 && (
            <FilterGroup title="Ранг">
              <button
                onClick={() => setActiveColor(null)}
                className={pill(activeColor === null)}
              >
                Ҳама
              </button>
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveColor(c.id)}
                  className={pill(activeColor === c.id)}
                >
                  {c.colorName}
                </button>
              ))}
            </FilterGroup>
          )}

          <FilterGroup title="Нархи максималӣ">
            <input
              type="number"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="масалан 5000"
              className="h-9 w-full rounded-md border px-3 text-sm outline-none"
            />
            {maxPrice !== "" && (
              <p className="mt-2 text-xs text-neutral-500">
                то {formatPrice(Number(maxPrice))}
              </p>
            )}
          </FilterGroup>
        </aside>

        {/* Рӯйхати маҳсулот */}
        <section className="flex-1">
          {loading ? (
            <div className="flex h-64 items-center justify-center text-neutral-400">
              <Loader2 className="animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-neutral-400">
              <p>Маҳсулот ёфт нашуд 😔</p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                Тоза кардани филтрҳо
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {totalPage > 1 && (
                <div className="mt-10 flex justify-center gap-2">
                  {Array.from({ length: totalPage }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`h-10 w-10 rounded-md text-sm ${
                        page === n
                          ? "bg-brand text-white"
                          : "border hover:bg-neutral-50"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 border-b pb-6">
      <h4 className="mb-3 font-medium">{title}</h4>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

const pill = (active: boolean) =>
  `rounded-full border px-3 py-1.5 text-sm transition-colors ${
    active
      ? "border-brand bg-brand text-white"
      : "border-neutral-300 hover:border-neutral-900"
  }`;
