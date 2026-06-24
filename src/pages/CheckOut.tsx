import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { formatPrice, imageUrl } from "@/lib/utils";

const schema = z.object({
  firstName: z.string().min(2, "Ном камаш 2 ҳарф"),
  lastName: z.string().min(2, "Насаб камаш 2 ҳарф"),
  phone: z
    .string()
    .regex(/^\+?\d[\d\s-]{7,}$/, "Рақами телефон нодуруст"),
  city: z.string().min(2, "Шаҳрро ворид кунед"),
  address: z.string().min(5, "Суроғаро пурра ворид кунед"),
  payment: z.enum(["cash", "card"]),
  note: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CheckOut() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

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
        <h1 className="mt-6 text-2xl font-bold">Фармоиш қабул шуд! 🎉</h1>
        <p className="mt-2 text-neutral-500">
          Ба зудӣ оператори мо бо шумо тамос мегирад.
        </p>
        <Link to="/catalog">
          <Button className="mt-8">Идомаи харид</Button>
        </Link>
      </div>
    );

  if (items.length === 0)
    return (
      <div className="container-x py-20 text-center">
        <p className="text-neutral-500">Корзинка холӣ аст.</p>
        <Link to="/catalog">
          <Button className="mt-6">Ба каталог</Button>
        </Link>
      </div>
    );

  const onSubmit = async (data: FormData) => {
    // TODO Phase 4: фиристодан ба API-и фармоиш бо токени корбар
    await new Promise((r) => setTimeout(r, 800));
    console.log("Фармоиш:", { ...data, items, total: total() });
    clear();
    setDone(true);
  };

  return (
    <div className="container-x py-10">
      <h1 className="mb-8 text-2xl font-bold md:text-3xl">Расмигардонии фармоиш</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-10 lg:grid-cols-[1fr_380px]"
      >
        {/* Форма */}
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Ном" error={errors.firstName?.message}>
              <input className={inp} {...register("firstName")} />
            </Field>
            <Field label="Насаб" error={errors.lastName?.message}>
              <input className={inp} {...register("lastName")} />
            </Field>
          </div>

          <Field label="Телефон" error={errors.phone?.message}>
            <input className={inp} placeholder="+992 ..." {...register("phone")} />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Шаҳр" error={errors.city?.message}>
              <input className={inp} {...register("city")} />
            </Field>
            <Field label="Суроға" error={errors.address?.message}>
              <input className={inp} {...register("address")} />
            </Field>
          </div>

          <Field label="Тарзи пардохт">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" value="cash" {...register("payment")} /> Нақд
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" value="card" {...register("payment")} /> Корти бонкӣ
              </label>
            </div>
          </Field>

          <Field label="Эзоҳ (ихтиёрӣ)">
            <textarea rows={3} className={inp} {...register("note")} />
          </Field>
        </div>

        {/* Хулоса */}
        <aside className="h-fit rounded-md border p-6">
          <h3 className="mb-4 font-semibold">Фармоиши шумо</h3>
          <div className="space-y-3">
            {items.map((i) => {
              const price = i.hasDiscount ? i.discountPrice : i.price;
              return (
                <div key={i.id} className="flex items-center gap-3 text-sm">
                  <img
                    src={imageUrl(i.image)}
                    alt={i.productName}
                    className="h-10 w-10 object-contain"
                  />
                  <span className="flex-1 line-clamp-1">{i.productName}</span>
                  <span className="text-neutral-500">×{i.qty}</span>
                  <span className="font-medium">{formatPrice(price * i.qty)}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
            <span>Ҳамагӣ:</span>
            <span className="text-brand">{formatPrice(total())}</span>
          </div>
          <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Фиристода истодааст..." : "Тасдиқи фармоиш"}
          </Button>
        </aside>
      </form>
    </div>
  );
}

const inp =
  "h-10 w-full rounded-md border border-neutral-300 px-3 text-sm outline-none focus:ring-2 focus:ring-neutral-400";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-brand">{error}</p>}
    </div>
  );
}
