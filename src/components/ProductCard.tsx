import { Link } from "react-router-dom";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { cn, formatPrice, imageUrl } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import toast from "react-hot-toast";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const liked = useWishlist((s) => s.has(product.id));
  const requireAuth = useRequireAuth();

  const price = product.hasDiscount ? product.discountPrice : product.price;
  const discountPct =
    product.hasDiscount && product.price > 0
      ? Math.round((1 - product.discountPrice / product.price) * 100)
      : 0;

  // рейтинги муътадил (API rating надорад) — деривативи устувор аз id
  const rating = 4 + (product.id % 2);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={(index % 4) * 100}
      className="group flex h-full flex-col"
    >
      <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-md bg-soft p-4 transition-all duration-300">
        {discountPct > 0 && (
          <span className="absolute left-3 top-3 z-10 rounded bg-brand px-3 py-1 text-xs font-semibold text-white">
            -{discountPct}%
          </span>
        )}

        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          <button
            onClick={() => requireAuth(() => toggle(product))}
            aria-label="Дӯстдошта"
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm transition-colors duration-200",
              liked ? "text-brand" : "text-neutral-700 hover:bg-brand hover:text-white"
            )}
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} />
          </button>
          <Link
            to={`/product/${product.id}`}
            aria-label="Дидан"
            className="grid h-8 w-8 place-items-center rounded-full bg-white text-neutral-700 shadow-sm transition-colors duration-200 hover:bg-black hover:text-white"
          >
            <Eye size={16} />
          </Link>
        </div>

        <Link to={`/product/${product.id}`} className="flex h-full w-full items-center justify-center">
          <img
            src={imageUrl(product.image)}
            alt={product.productName}
            loading="lazy"
            className="max-h-44 max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <button
          onClick={() =>
            requireAuth(() => {
              add(product);
              toast.success("Ба корзинка илова шуд");
            })
          }
          className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-center gap-2 bg-black py-2.5 text-sm font-medium text-white transition-transform duration-300 group-hover:translate-y-0"
        >
          <ShoppingCart size={16} /> Ба корзинка
        </button>
      </div>

      <div className="flex flex-col gap-1.5 pt-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="line-clamp-1 text-base font-bold text-neutral-800 transition-colors group-hover:text-brand">
            {product.productName}
          </h3>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-base font-bold text-brand">{formatPrice(price)}</span>
          {product.hasDiscount && (
            <span className="text-sm text-neutral-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-sm">
                {i < rating ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span className="text-xs font-semibold text-neutral-400">({product.quantity})</span>
        </div>
      </div>
    </div>
  );
}
