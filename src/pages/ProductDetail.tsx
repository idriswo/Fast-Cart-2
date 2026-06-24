import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Loader2, Minus, Plus, ShoppingCart } from "lucide-react";
import { getProductById } from "@/api/products";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { formatPrice, imageUrl } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const liked = useWishlist((s) => (product ? s.has(product.id) : false));
  const requireAuth = useRequireAuth();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProductById(Number(id))
      .then(setProduct)
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
        <p className="text-neutral-500">Маҳсулот ёфт нашуд.</p>
        <Link to="/catalog" className="mt-4 inline-block text-brand underline">
          Бозгашт ба каталог
        </Link>
      </div>
    );

  const price = product.hasDiscount ? product.discountPrice : product.price;

  return (
    <div className="container-x py-10">
      <Link to="/catalog" className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black">
        <ArrowLeft size={16} /> Бозгашт ба каталог
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex h-[420px] items-center justify-center rounded-md bg-soft p-10">
          <img
            src={imageUrl(product.image)}
            alt={product.productName}
            className="h-full w-full object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.productName}</h1>
          <p className="mt-2 text-sm text-neutral-500">{product.categoryName}</p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-brand">{formatPrice(price)}</span>
            {product.hasDiscount && (
              <span className="text-lg text-neutral-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <p className="mt-4 text-sm">
            Ранг: <span className="font-medium">{product.color}</span>
          </p>
          <p className="mt-1 text-sm">
            Дар анбор:{" "}
            <span className={product.quantity > 0 ? "text-green-600" : "text-brand"}>
              {product.quantity > 0 ? `${product.quantity} дона` : "Нест"}
            </span>
          </p>

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

            <Button
              onClick={() =>
                requireAuth(() => {
                  for (let i = 0; i < qty; i++) add(product);
                  toast.success("Ба корзинка илова шуд");
                })
              }
              className="flex-1"
            >
              <ShoppingCart size={18} /> Ба корзинка
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => requireAuth(() => toggle(product))}
            >
              <Heart size={18} className={liked ? "fill-brand text-brand" : ""} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
