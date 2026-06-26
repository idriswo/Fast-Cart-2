import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronUp } from "lucide-react";
import { getBrands, getCategories, getColors, getProducts } from "@/api/products";
import type { Brand, Category, Color, Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;
type Sort = "popular" | "priceLow" | "priceHigh";

export default function Catalog() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const categoryId = params.get("category");
  const subcategoryId = params.get("subcategory");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sort, setSort] = useState<Sort>("popular");

  const [activeCat, setActiveCat] = useState<number | null>(
    categoryId ? Number(categoryId) : null
  );
  const [activeSub, setActiveSub] = useState<number | null>(
    subcategoryId ? Number(subcategoryId) : null
  );
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const [activeBrand, setActiveBrand] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  // Категория/бренд/ранг — як маротиба, аз endpoint-ҳои алоҳида (рӯйхати пурра)
  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
    getBrands().then(setBrands).catch(() => setBrands([]));
    getColors().then(setColors).catch(() => setColors([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts({
      ProductName: q || undefined,
      CategoryId: activeCat ?? undefined,
      SubcategoryId: activeSub ?? undefined,
      ColorId: activeColor ?? undefined,
      BrandId: activeBrand ?? undefined,
      MinPrice: minPrice === "" ? undefined : Number(minPrice),
      MaxPrice: maxPrice === "" ? undefined : Number(maxPrice),
      PageNumber: page,
      PageSize: PAGE_SIZE,
    })
      .then((res) => {
        const list = res.data.products ?? [];
        setProducts((prev) => (page === 1 ? list : [...prev, ...list]));
        setTotalPage(res.totalPage || 1);
      })
      .catch(() => {
        if (page === 1) setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [q, activeCat, activeSub, activeColor, activeBrand, minPrice, maxPrice, page]);

  // ҳангоми тағйири ҷустуҷӯ ба саҳифаи 1
  useEffect(() => setPage(1), [q]);

  // синхронизатсия бо URL (аз flyout-и subcategory дар Home)
  useEffect(() => {
    setActiveSub(subcategoryId ? Number(subcategoryId) : null);
    if (subcategoryId) setActiveCat(null);
    setPage(1);
  }, [subcategoryId]);

  const reset1 = () => setPage(1);
  const changeCat = (v: number | null) => {
    setActiveCat(v);
    setActiveSub(null);
    reset1();
  };

  const sorted = useMemo(() => {
    const price = (p: Product) => (p.hasDiscount ? p.discountPrice : p.price);
    if (sort === "priceLow") return [...products].sort((a, b) => price(a) - price(b));
    if (sort === "priceHigh") return [...products].sort((a, b) => price(b) - price(a));
    return products;
  }, [products, sort]);

  const resetFilters = () => {
    setActiveCat(null);
    setActiveSub(null);
    setActiveColor(null);
    setActiveBrand(null);
    setMinPrice("");
    setMaxPrice("");
    setParams({});
    reset1();
  };

  return (
    <div className="container-x py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-neutral-500">
        <Link to="/" className="transition-colors hover:text-brand">
          {t("nav.home")}
        </Link>
        <span>/</span>
        <span className="text-neutral-900">
          {q ? t("catalog.searchResults", { q }) : t("catalog.explore")}
        </span>
      </nav>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full shrink-0 lg:w-64">
          {/* Category */}
          <Section title={t("catalog.category")}>
            <CatRow active={activeCat === null} onClick={() => changeCat(null)}>
              {t("catalog.allProducts")}
            </CatRow>
            {categories.map((c) => (
              <CatRow key={c.id} active={activeCat === c.id} onClick={() => changeCat(c.id)}>
                {c.categoryName}
              </CatRow>
            ))}
          </Section>

          {/* Brands */}
          {brands.length > 0 && (
            <Section title={t("catalog.brand")}>
              {brands.map((b) => (
                <CheckRow
                  key={b.id}
                  checked={activeBrand === b.id}
                  onChange={() => {
                    setActiveBrand((cur) => (cur === b.id ? null : b.id));
                    reset1();
                  }}
                >
                  {b.brandName}
                </CheckRow>
              ))}
            </Section>
          )}

          {/* Color */}
          {colors.length > 0 && (
            <Section title={t("catalog.color")}>
              {colors.map((c) => (
                <CheckRow
                  key={c.id}
                  checked={activeColor === c.id}
                  onChange={() => {
                    setActiveColor((cur) => (cur === c.id ? null : c.id));
                    reset1();
                  }}
                >
                  {c.colorName}
                </CheckRow>
              ))}
            </Section>
          )}

          {/* Price range */}
          <Section title={t("catalog.priceRange")}>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder={t("catalog.min")}
                className="h-10 w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 text-sm outline-none focus:border-neutral-900"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder={t("catalog.max")}
                className="h-10 w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 text-sm outline-none focus:border-neutral-900"
              />
            </div>
            <button
              onClick={reset1}
              className="mt-4 w-full rounded-md border border-brand py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
            >
              {t("catalog.apply")}
            </button>
          </Section>
        </aside>

        {/* Маҳсулот */}
        <section className="flex-1">
          {/* Sort bar */}
          <div className="mb-6 flex justify-end">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-11 rounded-md border border-neutral-300 bg-neutral-50 px-4 text-sm outline-none focus:border-neutral-900"
            >
              <option value="popular">{t("catalog.popular")}</option>
              <option value="priceLow">{t("catalog.priceLow")}</option>
              <option value="priceHigh">{t("catalog.priceHigh")}</option>
            </select>
          </div>

          {loading && page === 1 ? (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-neutral-400">
              <p>{t("catalog.notFound")}</p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                {t("catalog.clearFilters")}
              </Button>
            </div>
          ) : (
            <>
              <Reveal className="grid grid-cols-2 gap-6 md:grid-cols-3">
                {sorted.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </Reveal>

              {page < totalPage && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={loading}
                    className="rounded-md bg-brand px-10 py-3.5 font-medium text-white transition-all hover:bg-brand-dark active:scale-[0.99] disabled:opacity-60"
                  >
                    {loading ? "…" : t("catalog.moreProducts")}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between font-semibold"
      >
        {title}
        <ChevronUp size={18} className={cn("transition-transform", !open && "rotate-180")} />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function CatRow({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "block w-full py-1.5 text-left text-sm transition-colors",
        active ? "font-medium text-brand" : "text-neutral-600 hover:text-brand"
      )}
    >
      {children}
    </button>
  );
}

function CheckRow({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-neutral-600">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-brand" />
      {children}
    </label>
  );
}
