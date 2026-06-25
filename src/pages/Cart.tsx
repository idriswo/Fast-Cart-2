import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/store/cart";
import { formatPrice, imageUrl } from "@/lib/utils";

export default function Cart() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, setQty, remove, total, clear } = useCart();
  const [coupon, setCoupon] = useState("");

  if (items.length === 0)
    return (
      <div className="container-x py-20 text-center">
        <p className="text-lg text-neutral-500">{t("cart.empty")}</p>
        <Link to="/catalog">
          <button className="mt-6 rounded-md bg-brand px-8 py-3 font-medium text-white transition hover:bg-brand-dark">
            {t("cart.goShopping")}
          </button>
        </Link>
      </div>
    );

  return (
    <div className="container-x py-10">
      {/* Breadcrumb */}
      <nav className="mb-10 flex items-center gap-2 text-sm text-neutral-500">
        <Link to="/" className="transition-colors hover:text-brand">
          {t("nav.home")}
        </Link>
        <span>/</span>
        <span className="text-neutral-900">{t("cart.title")}</span>
      </nav>

      {/* Сарлавҳаи ҷадвал */}
      <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-4 px-8 py-2 text-neutral-500 md:grid">
        <span>{t("cart.product")}</span>
        <span className="text-center">{t("cart.price")}</span>
        <span className="text-center">{t("cart.quantity")}</span>
        <span className="text-right">{t("cart.subtotal")}</span>
        <span className="w-6" />
      </div>

      {/* Сатрҳои маҳсулот */}
      <div className="space-y-5">
        {items.map((i) => {
          const price = i.hasDiscount ? i.discountPrice : i.price;
          return (
            <div
              key={i.id}
              className="grid grid-cols-2 items-center gap-4 rounded-lg border bg-neutral-50 px-6 py-5 shadow-sm md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:px-8"
            >
              {/* Маҳсулот */}
              <div className="col-span-2 flex items-center gap-4 md:col-span-1">
                <img
                  src={imageUrl(i.image)}
                  alt={i.productName}
                  className="h-14 w-14 shrink-0 object-contain"
                />
                <span className="line-clamp-2 font-medium">{i.productName}</span>
              </div>

              {/* Нарх */}
              <span className="text-center text-sm md:text-base">{formatPrice(price)}</span>

              {/* Шумора */}
              <div className="flex justify-center">
                <div className="flex items-center gap-3 rounded-md border border-neutral-300 px-3 py-1.5">
                  <span className="w-6 text-center tabular-nums">
                    {String(i.qty).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col">
                    <button
                      onClick={() => setQty(i.id, i.qty + 1)}
                      className="text-neutral-500 transition-colors hover:text-brand"
                      aria-label="+"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      onClick={() => setQty(i.id, i.qty - 1)}
                      className="text-neutral-500 transition-colors hover:text-brand"
                      aria-label="-"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Ҷамъи қисмӣ */}
              <span className="text-right font-semibold">{formatPrice(price * i.qty)}</span>

              {/* Тоза кардан */}
              <button
                onClick={() => remove(i.id)}
                className="ml-auto grid h-6 w-6 place-items-center rounded-full bg-brand text-white transition-transform hover:scale-110"
                aria-label="remove"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Тугмаҳо */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <Link to="/catalog">
          <button className="rounded-md border border-neutral-300 px-7 py-3 text-sm font-medium transition-colors hover:border-neutral-900">
            {t("cart.returnToShop")}
          </button>
        </Link>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => toast.success(t("cart.updated"))}
            className="rounded-md border border-neutral-300 px-7 py-3 text-sm font-medium transition-colors hover:border-neutral-900"
          >
            {t("cart.updateCart")}
          </button>
          <button
            onClick={clear}
            className="rounded-md border border-brand px-7 py-3 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
          >
            {t("cart.removeAll")}
          </button>
        </div>
      </div>

      {/* Купон + Ҷамъи корзинка */}
      <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        {/* Купон */}
        <div className="flex max-w-md flex-1 gap-4">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder={t("cart.couponPlaceholder")}
            className="h-12 flex-1 rounded-md border border-neutral-300 bg-neutral-50 px-5 text-sm outline-none focus:border-neutral-900"
          />
          <button
            onClick={() => toast.error(t("cart.couponInvalid"))}
            className="rounded-md border border-brand px-7 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
          >
            {t("cart.apply")}
          </button>
        </div>

        {/* Ҷамъи корзинка */}
        <div className="w-full rounded-lg border-2 border-neutral-900 p-6 lg:w-[420px]">
          <h3 className="text-xl font-bold">{t("cart.cartTotal")}</h3>
          <div className="mt-6 flex justify-between border-b pb-4 text-sm">
            <span>{t("cart.subtotal")}:</span>
            <span>{formatPrice(total())}</span>
          </div>
          <div className="flex justify-between border-b py-4 text-sm">
            <span>{t("cart.shipping")}</span>
            <span>{t("cart.free")}</span>
          </div>
          <div className="flex justify-between py-4 text-lg font-bold">
            <span>{t("cart.total")}</span>
            <span>{formatPrice(total())}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-2 w-full rounded-md bg-brand py-3.5 font-medium text-white transition-all hover:bg-brand-dark active:scale-[0.99]"
          >
            {t("cart.proceedCheckout")}
          </button>
        </div>
      </div>
    </div>
  );
}
