import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { formatPrice, imageUrl } from "@/lib/utils";

const makeSchema = (t: TFunction) =>
  z.object({
    firstName: z.string().min(2, t("checkout.errFirstName")),
    lastName: z.string().min(2, t("checkout.errLastName")),
    address: z.string().min(5, t("checkout.errAddress")),
    apartment: z.string().optional(),
    city: z.string().min(2, t("checkout.errCity")),
    phone: z.string().regex(/^\+?\d[\d\s-]{7,}$/, t("checkout.errPhone")),
    email: z.string().email(t("checkout.errEmail")),
    payment: z.enum(["bank", "cash"]),
  });

type FormData = z.infer<ReturnType<typeof makeSchema>>;

export default function CheckOut() {
  const { t } = useTranslation();
  const schema = useMemo(() => makeSchema(t), [t]);
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [coupon, setCoupon] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { payment: "cash" },
  });

  if (done)
    return (
      <div className="container-x flex flex-col items-center py-24 text-center">
        <CheckCircle2 size={72} className="text-green-500" />
        <h1 className="mt-6 text-2xl font-bold">{t("checkout.done")}</h1>
        <p className="mt-2 text-neutral-500">{t("checkout.doneText")}</p>
        <Link to="/catalog">
          <Button className="mt-8">{t("checkout.continueShopping")}</Button>
        </Link>
      </div>
    );

  if (items.length === 0)
    return (
      <div className="container-x py-20 text-center">
        <p className="text-neutral-500">{t("checkout.emptyCart")}</p>
        <Link to="/catalog">
          <Button className="mt-6">{t("checkout.toCatalog")}</Button>
        </Link>
      </div>
    );

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    clear();
    setDone(true);
  };

  return (
    <div className="container-x py-10">
      {/* Breadcrumb */}
      <nav className="mb-12 flex items-center gap-2 text-sm text-neutral-500">
        <Link to="/catalog" className="transition-colors hover:text-brand">
          {t("nav.catalog")}
        </Link>
        <span>/</span>
        <Link to="/cart" className="transition-colors hover:text-brand">
          {t("cart.title")}
        </Link>
        <span>/</span>
        <span className="text-neutral-900">{t("checkout.title")}</span>
      </nav>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-16 lg:grid-cols-2">
        {/* Чап — Billing Details */}
        <div>
          <h1 className="mb-8 text-3xl font-bold md:text-4xl">{t("checkout.billingDetails")}</h1>
          <div className="space-y-5">
            <Field error={errors.firstName?.message}>
              <input className={inp} placeholder={t("checkout.firstName")} {...register("firstName")} />
            </Field>
            <Field error={errors.lastName?.message}>
              <input className={inp} placeholder={t("checkout.lastName")} {...register("lastName")} />
            </Field>
            <Field error={errors.address?.message}>
              <input className={inp} placeholder={t("checkout.address")} {...register("address")} />
            </Field>
            <Field>
              <input className={inp} placeholder={t("checkout.apartment")} {...register("apartment")} />
            </Field>
            <Field error={errors.city?.message}>
              <input className={inp} placeholder={t("checkout.city")} {...register("city")} />
            </Field>
            <Field error={errors.phone?.message}>
              <input className={inp} placeholder={t("checkout.phone")} {...register("phone")} />
            </Field>
            <Field error={errors.email?.message}>
              <input className={inp} placeholder={t("checkout.email")} {...register("email")} />
            </Field>

            <label className="flex items-center gap-3 pt-2 text-sm">
              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5 accent-brand"
              />
              {t("checkout.saveInfo")}
            </label>
          </div>
        </div>

        {/* Рост — Хулоса */}
        <div className="lg:pl-8">
          {/* Маҳсулот */}
          <div className="space-y-5">
            {items.map((i) => {
              const price = i.hasDiscount ? i.discountPrice : i.price;
              return (
                <div key={i.id} className="flex items-center gap-4">
                  <img
                    src={imageUrl(i.image)}
                    alt={i.productName}
                    className="h-12 w-12 shrink-0 object-contain"
                  />
                  <span className="flex-1 text-sm">
                    {i.productName}
                    {i.qty > 1 && <span className="text-neutral-500"> ×{i.qty}</span>}
                  </span>
                  <span className="font-medium">{formatPrice(price * i.qty)}</span>
                </div>
              );
            })}
          </div>

          {/* Ҷамъ */}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between border-b pb-4 text-sm">
              <span>{t("cart.subtotal")}:</span>
              <span>{formatPrice(total())}</span>
            </div>
            <div className="flex justify-between border-b pb-4 text-sm">
              <span>{t("cart.shipping")}</span>
              <span>{t("cart.free")}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>{t("checkout.total")}</span>
              <span>{formatPrice(total())}</span>
            </div>
          </div>

          {/* Тарзи пардохт */}
          <div className="mt-8 space-y-4">
            <label className="flex items-center justify-between">
              <span className="flex items-center gap-3 text-sm">
                <input type="radio" value="bank" className="h-4 w-4 accent-brand" {...register("payment")} />
                {t("checkout.bank")}
              </span>
              <span className="flex items-center gap-1.5">
                <PayBadge>VISA</PayBadge>
                <PayBadge>MC</PayBadge>
                <PayBadge>bKash</PayBadge>
              </span>
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input type="radio" value="cash" className="h-4 w-4 accent-brand" {...register("payment")} />
              {t("checkout.cashOnDelivery")}
            </label>
          </div>

          {/* Купон */}
          <div className="mt-8 flex gap-4">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder={t("cart.couponPlaceholder")}
              className="h-12 flex-1 rounded-md border border-neutral-300 bg-neutral-50 px-5 text-sm outline-none focus:border-neutral-900"
            />
            <button
              type="button"
              onClick={() => toast.error(t("cart.couponInvalid"))}
              className="rounded-md border border-brand px-7 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
            >
              {t("cart.apply")}
            </button>
          </div>

          {/* Place Order */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 rounded-md bg-brand px-12 py-3.5 font-medium text-white transition-all hover:bg-brand-dark active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? t("checkout.submitting") : t("checkout.placeOrder")}
          </button>
        </div>
      </form>
    </div>
  );
}

const inp =
  "h-12 w-full rounded-md border border-neutral-300 bg-soft px-4 text-sm outline-none transition-colors placeholder:text-neutral-500 focus:border-neutral-900";

function PayBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-neutral-300 bg-neutral-50 px-1.5 py-0.5 text-[10px] font-bold text-neutral-600">
      {children}
    </span>
  );
}

function Field({ error, children }: { error?: string; children: React.ReactNode }) {
  return (
    <div>
      {children}
      {error && <p className="mt-1 text-xs text-brand">{error}</p>}
    </div>
  );
}
