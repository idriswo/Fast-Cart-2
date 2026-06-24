import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { login } from "@/api/auth";
import { useAuth } from "@/store/auth";

const makeSchema = (t: TFunction) =>
  z.object({
    userName: z.string().min(1, t("login.errUsername")),
    password: z.string().min(1, t("login.errPassword")),
  });
type FormData = z.infer<ReturnType<typeof makeSchema>>;

export default function Login() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuth((s) => s.setSession);
  const from = (location.state as { from?: string })?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(useMemo(() => makeSchema(t), [t])) });

  const onSubmit = async (values: FormData) => {
    try {
      const { accessToken, refreshToken } = await login(values);
      if (!accessToken) throw new Error(t("login.tokenNotFound"));
      setSession(accessToken, refreshToken);
      toast.success(t("login.welcome"));
      navigate(from, { replace: true });
    } catch (err: any) {
      const msg =
        err?.response?.data?.errors?.join?.("\n") ||
        err?.response?.data?.message ||
        t("login.invalid");
      toast.error(msg);
    }
  };

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-[371px] flex-col">
        <h2 className="mb-6 text-4xl font-medium tracking-wide">{t("login.title")}</h2>
        <p className="mb-12 text-base">{t("login.subtitle")}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <div className="relative">
            <input
              {...register("userName")}
              placeholder={t("login.username")}
              className={field(errors.userName)}
            />
            {errors.userName && <Err>{errors.userName.message}</Err>}
          </div>

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              {...register("password")}
              placeholder={t("login.password")}
              className={field(errors.password) + " pr-10"}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-0 top-1.5 text-neutral-500"
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && <Err>{errors.password.message}</Err>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-md bg-brand py-4 font-medium text-white transition-all hover:bg-brand-dark active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? t("login.waiting") : t("login.submit")}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-3 text-base">
          <span className="text-neutral-500">{t("login.noAccount")}</span>
          <Link to="/register" className="border-b border-neutral-400 font-medium hover:text-neutral-600">
            {t("login.register")}
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
