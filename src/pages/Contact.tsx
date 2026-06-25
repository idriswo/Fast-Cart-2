import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { Mail, Phone } from "lucide-react";
import toast from "react-hot-toast";

const makeSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(2, t("contact.errName")),
    email: z.string().email(t("contact.errEmail")),
    phone: z.string().optional(),
    message: z.string().min(5, t("contact.errMessage")),
  });

type FormData = z.infer<ReturnType<typeof makeSchema>>;

export default function Contact() {
  const { t } = useTranslation();
  const schema = useMemo(() => makeSchema(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success(t("contact.success"));
    reset();
  };

  return (
    <div className="container-x py-10">
      {/* Breadcrumb */}
      <nav className="mb-10 flex items-center gap-2 text-sm text-neutral-500">
        <Link to="/" className="transition-colors hover:text-brand">
          {t("nav.home")}
        </Link>
        <span>/</span>
        <span className="text-neutral-900">{t("contact.title")}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
        {/* Корти чап — маълумоти тамос */}
        <div className="rounded-lg border bg-neutral-50 p-8 shadow-sm">
          {/* Call To Us */}
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand text-white">
              <Phone size={20} />
            </span>
            <h3 className="text-lg font-bold">{t("contact.callTitle")}</h3>
          </div>
          <p className="mt-5 text-sm">{t("contact.callText")}</p>
          <p className="mt-3 text-sm">{t("contact.phone")}</p>

          <div className="my-8 h-px bg-neutral-200" />

          {/* Write To Us */}
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand text-white">
              <Mail size={20} />
            </span>
            <h3 className="text-lg font-bold">{t("contact.writeTitle")}</h3>
          </div>
          <p className="mt-5 text-sm">{t("contact.writeText")}</p>
          <p className="mt-3 text-sm">{t("contact.email1")}</p>
          <p className="mt-2 text-sm">{t("contact.email2")}</p>
        </div>

        {/* Корти рост — форма */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg border bg-neutral-50 p-8 shadow-sm"
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <input className={inp} placeholder={t("contact.name")} {...register("name")} />
              {errors.name && <Err>{errors.name.message}</Err>}
            </div>
            <div>
              <input
                className={inp}
                placeholder={t("contact.emailPlaceholder")}
                {...register("email")}
              />
              {errors.email && <Err>{errors.email.message}</Err>}
            </div>
            <div>
              <input
                className={inp}
                placeholder={t("contact.phonePlaceholder")}
                {...register("phone")}
              />
            </div>
          </div>

          <div className="mt-5">
            <textarea
              rows={8}
              className={inp + " resize-none"}
              placeholder={t("contact.message")}
              {...register("message")}
            />
            {errors.message && <Err>{errors.message.message}</Err>}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-brand px-10 py-3.5 font-medium text-white transition-all hover:bg-brand-dark active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? t("contact.sending") : t("contact.send")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inp =
  "h-12 w-full rounded-md border border-neutral-300 bg-neutral-50 px-4 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900";

function Err({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs text-brand">{children}</p>;
}
