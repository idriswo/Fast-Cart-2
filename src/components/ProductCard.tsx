import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { cn, formatPrice, imageUrl } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const liked = useWishlist((s) => s.has(product.id));
  const requireAuth = useRequireAuth();

  const price = product.hasDiscount ? product.discountPrice : product.price;
  const discountPct =
    product.hasDiscount && product.price > 0
      ? Math.round((1 - product.discountPrice / product.price) * 100)
      : 0;

  return (
    <div className="group">
      <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-md bg-soft">
        {product.hasDiscount && (
          <span className="absolute left-3 top-3 rounded bg-brand px-2.5 py-1 text-xs text-white">
            -{discountPct}%
          </span>
        )}
        <button
          onClick={() => requireAuth(() => toggle(product))}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm"
          aria-label="Дӯстдошта"
        >
          <Heart
            size={18}
            className={cn(liked && "fill-brand text-brand")}
          />
        </button>

        <Link to={`/product/${product.id}`} className="h-full w-full p-6">
          <img
            src={imageUrl(product.image)}
            alt={product.productName}
            className="h-full w-full object-contain transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        <button
          onClick={() =>
            requireAuth(() => {
              add(product);
              toast.success("Ба корзинка илова шуд");
            })
          }
          className="absolute bottom-0 left-0 flex w-full items-center justify-center gap-2 bg-black py-2.5 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          <ShoppingCart size={16} /> Ба корзинка
        </button>
      </div>

      <Link to={`/product/${product.id}`}>
        <h3 className="mt-3 line-clamp-1 font-medium">{product.productName}</h3>
      </Link>
      <div className="mt-1 flex items-center gap-3">
        <span className="font-semibold text-brand">{formatPrice(price)}</span>
        {product.hasDiscount && (
          <span className="text-sm text-neutral-400 line-through">
            {formatPrice(product.price)}
          </span>
        )}
      </div>
      <p className="mt-0.5 text-xs text-neutral-400">{product.categoryName}</p>
    </div>
  );
}
