import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { formatPrice, imageUrl } from "@/lib/utils";

export default function Cart() {
  const { t } = useTranslation();
  const { items, setQty, remove, total, clear } = useCart();

  if (items.length === 0)
    return (
      <div className="container-x py-20 text-center">
        <p className="text-lg text-neutral-500">{t("cart.empty")}</p>
        <Link to="/catalog">
          <Button className="mt-6">{t("cart.goShopping")}</Button>
        </Link>
      </div>
    );

  return (
    <div className="container-x py-10">
      <h1 className="mb-8 text-2xl font-bold md:text-3xl">{t("cart.title")}</h1>

      <div className="space-y-4">
        {items.map((i) => {
          const price = i.hasDiscount ? i.discountPrice : i.price;
          return (
            <div key={i.id} className="flex items-center gap-4 rounded-md border p-4">
              <img
                src={imageUrl(i.image)}
                alt={i.productName}
                className="h-16 w-16 object-contain"
              />
              <div className="flex-1">
                <h3 className="font-medium">{i.productName}</h3>
                <p className="text-sm text-brand">{formatPrice(price)}</p>
              </div>
              <div className="flex items-center rounded-md border">
                <button onClick={() => setQty(i.id, i.qty - 1)} className="px-2.5 py-2">
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm">{i.qty}</span>
                <button onClick={() => setQty(i.id, i.qty + 1)} className="px-2.5 py-2">
                  <Plus size={14} />
                </button>
              </div>
              <span className="w-28 text-right font-semibold">
                {formatPrice(price * i.qty)}
              </span>
              <button onClick={() => remove(i.id)} className="text-neutral-400 hover:text-brand">
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <div className="flex w-full max-w-xs justify-between border-t pt-4 text-lg font-bold">
          <span>{t("cart.total")}</span>
          <span className="text-brand">{formatPrice(total())}</span>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={clear}>{t("cart.clear")}</Button>
          <Link to="/checkout">
            <Button>{t("cart.checkout")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
