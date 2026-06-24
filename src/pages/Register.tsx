import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { register as registerApi } from "@/api/auth";

const makeSchema = (t: TFunction) =>
  z
    .object({
      name: z.string().min(2, t("register.errName")),
      email: z.string().email(t("register.errEmail")),
      countryCode: z.string(),
      phone: z
        .string()
        .regex(/^\d+$/, t("register.errPhoneDigits"))
        .min(7, t("register.errPhoneMin"))
        .max(15, t("register.errPhoneMax")),
      password: z.string().min(6, t("register.errPassword")),
      confirmPassword: z.string(),
    })
    .refine((d) => d.password === d.confirmPassword, {
      message: t("register.errMatch"),
      path: ["confirmPassword"],
    });

type FormData = z.infer<ReturnType<typeof makeSchema>>;

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(useMemo(() => makeSchema(t), [t])),
    defaultValues: { countryCode: "+992" },
  });

  const onSubmit = async (v: FormData) => {
    try {
      await registerApi({
        userName: v.name,
        email: v.email,
        phoneNumber: v.countryCode + v.phone,
        password: v.password,
        confirmPassword: v.confirmPassword,
      });
      toast.success(t("register.success"));
      navigate("/login");
    } catch (err: any) {
      const data = err?.response?.data?.errors;
      const msg = data
        ? Array.isArray(data)
          ? data.join("\n")
          : Object.values(data).flat().join("\n")
        : t("register.error");
      toast.error(msg);
    }
  };

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-[371px] flex-col">
        <h2 className="mb-6 text-4xl font-medium tracking-wide">{t("register.title")}</h2>
        <p className="mb-12 text-base">{t("register.subtitle")}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <div className="relative">
            <input {...register("name")} placeholder={t("register.name")} className={field(errors.name)} />
            {errors.name && <Err>{errors.name.message}</Err>}
          </div>

          <div className="relative">
            <input {...register("email")} placeholder={t("register.email")} className={field(errors.email)} />
            {errors.email && <Err>{errors.email.message}</Err>}
          </div>

          <div className="relative">
            <div
              className={`flex items-center border-b pb-2 ${
                errors.phone ? "border-brand" : "border-neutral-400 focus-within:border-neutral-900"
              }`}
            >
              <select
                {...register("countryCode")}
                className="cursor-pointer bg-transparent pr-2 font-medium outline-none"
              >
                <option value="+992">+992</option>
                <option value="+7">+7</option>
              </select>
              <input
                {...register("phone")}
                placeholder={t("register.phone")}
                className="w-full bg-transparent text-base outline-none placeholder:text-neutral-400"
              />
            </div>
            {errors.phone && <Err>{errors.phone.message}</Err>}
          </div>

          <div className="relative">
            <input
              type="password"
              {...register("password")}
              placeholder={t("register.password")}
              className={field(errors.password)}
            />
            {errors.password && <Err>{errors.password.message}</Err>}
          </div>

          <div className="relative">
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder={t("register.confirmPassword")}
              className={field(errors.confirmPassword)}
            />
            {errors.confirmPassword && <Err>{errors.confirmPassword.message}</Err>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-md bg-brand py-4 font-medium text-white transition-all hover:bg-brand-dark active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? t("register.waiting") : t("register.submit")}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-3 text-base">
          <span className="text-neutral-500">{t("register.haveAccount")}</span>
          <Link to="/login" className="border-b border-neutral-400 font-medium hover:text-neutral-600">
            {t("register.login")}
          </Link>
        </div>
      </div>
    </div>
  );
}

const field = (error: unknown) =>
  `w-full border-b pb-2 text-base outline-none transition-colors placeholder:text-neutral-400 ${
    error ? "border-brand" : "border-neutral-400 focus:border-neutral-900"
  }`;

function Err({ children }: { children: React.ReactNode }) {
  return <span className="absolute -bottom-5 left-0 text-xs text-brand">{children}</span>;
}
