import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heart, Loader2, Minus, Plus, RotateCcw, Truck } from "lucide-react";
import { getProductById, getProducts } from "@/api/products";
import type { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { cn, formatPrice, imageUrl } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import toast from "react-hot-toast";

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState("M");
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const liked = useWishlist((s) => (product ? s.has(product.id) : false));
  const requireAuth = useRequireAuth();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setActiveImg(0);
    setQty(1);
    getProductById(Number(id))
      .then((p) => {
        setProduct(p);
        if (p?.categoryId) {
          getProducts({ CategoryId: p.categoryId, PageSize: 5 })
            .then((r) => setRelated((r.data.products ?? []).filter((x) => x.id !== p.id).slice(0, 4)))
            .catch(() => setRelated([]));
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex h-96 items-center justify-center text-neutral-400">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (!product)
    return (
      <div className="container-x py-20 text-center">
        <p className="text-neutral-500">{t("product.notFound")}</p>
        <Link to="/catalog" className="mt-4 inline-block text-brand underline">
          {t("product.backToCatalog")}
        </Link>
      </div>
    );

  const price = product.hasDiscount ? product.discountPrice : product.price;
  const rating = 4 + (product.id % 2);
  const reviews = 50 + (product.id % 200);
  const gallery = product.images?.length ? product.images : [product.image];
  const desc = (product as any).description as string | undefined;

  const buyNow = () =>
    requireAuth(() => {
      for (let i = 0; i < qty; i++) add(product);
      navigate("/cart");
    });

  return (
    <div className="container-x py-8">
      {/* Breadcrumb */}
      <nav className="mb-10 flex items-center gap-2 text-sm text-neutral-500">
        <Link to="/" className="transition-colors hover:text-brand">
          {t("nav.home")}
        </Link>
        <span>/</span>
        <Link to={`/catalog?category=${product.categoryId}`} className="transition-colors hover:text-brand">
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-neutral-900">{product.productName}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Галерея */}
        <div className="flex gap-4">
          {gallery.length > 1 && (
            <div className="flex w-24 flex-col gap-4">
              {gallery.slice(0, 4).map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "grid h-24 place-items-center rounded-md bg-soft p-2 transition dark:bg-neutral-100",
                    activeImg === i ? "ring-2 ring-brand" : "hover:opacity-80"
                  )}
                >
                  <img src={imageUrl(g)} alt="" className="max-h-full object-contain" />
                </button>
              ))}
            </div>
          )}
          <div className="flex flex-1 items-center justify-center rounded-md bg-soft p-10 dark:bg-neutral-100">
            <img
              src={imageUrl(gallery[activeImg] ?? gallery[0])}
              alt={product.productName}
              className="max-h-[420px] w-full object-contain"
            />
          </div>
        </div>

        {/* Маълумот */}
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">{product.productName}</h1>

          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < rating ? "★" : "☆"}</span>
              ))}
            </span>
            <span className="text-neutral-400">({t("product.reviews", { count: reviews })})</span>
            <span className="text-neutral-300">|</span>
            <span className={product.quantity > 0 ? "text-green-600" : "text-brand"}>
              {product.quantity > 0 ? t("product.inStockLabel") : t("product.outOfStockLabel")}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold">{formatPrice(price)}</span>
            {product.hasDiscount && (
              <span className="text-lg text-neutral-400 line-through">{formatPrice(product.price)}</span>
            )}
          </div>

          {desc && <p className="mt-4 text-sm leading-relaxed text-neutral-600">{desc}</p>}

          <div className="my-6 h-px bg-neutral-200" />

          {/* Рангҳо */}
          <div className="flex items-center gap-4">
            <span className="text-sm">{t("product.colours")}</span>
            <div className="flex gap-2">
              <span className="h-5 w-5 rounded-full border border-neutral-300 bg-sky-300" />
              <span className="h-5 w-5 rounded-full border border-neutral-300 bg-brand" />
            </div>
            {product.color && <span className="text-sm text-neutral-500">{product.color}</span>}
          </div>

          {/* Андоза */}
          <div className="mt-5 flex items-center gap-4">
            <span className="text-sm">{t("product.size")}</span>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-md border text-sm font-medium transition-colors",
                    size === s
                      ? "border-brand bg-brand text-white"
                      : "border-neutral-300 hover:border-neutral-900"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* qty + Buy Now + wishlist */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-md border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2.5">
                <Minus size={16} />
              </button>
              <span className="w-12 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2.5">
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={buyNow}
              className="flex-1 rounded-md bg-brand py-2.5 font-medium text-white transition-all hover:bg-brand-dark active:scale-[0.99]"
            >
              {t("product.buyNow")}
            </button>

            <button
              onClick={() => requireAuth(() => toggle(product))}
              className="grid h-11 w-11 place-items-center rounded-md border transition-colors hover:border-brand"
              aria-label={t("card.wishlist")}
            >
              <Heart size={18} className={liked ? "fill-brand text-brand" : ""} />
            </button>
          </div>

          {/* Расонидан */}
          <div className="mt-8 rounded-md border">
            <div className="flex items-center gap-4 border-b p-4">
              <Truck size={26} />
              <div>
                <p className="text-sm font-semibold">{t("product.freeDelivery")}</p>
                <p className="text-xs text-neutral-500 underline">{t("product.freeDeliveryDesc")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <RotateCcw size={26} />
              <div>
                <p className="text-sm font-semibold">{t("product.returnDelivery")}</p>
                <p className="text-xs text-neutral-500">{t("product.returnDeliveryDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Маҳсулоти монанд */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-8 w-4 rounded-sm bg-brand" />
            <h2 className="text-xl font-bold text-brand">{t("product.related")}</h2>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
