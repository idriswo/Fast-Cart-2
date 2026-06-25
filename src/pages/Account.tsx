import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useAuth } from "@/store/auth";

export default function Account() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.name || "");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState("");
  const [curPass, setCurPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass && newPass !== confirmPass) {
      toast.error(t("account.passMismatch"));
      return;
    }
    toast.success(t("account.saved"));
    setCurPass("");
    setNewPass("");
    setConfirmPass("");
  };

  const reset = () => {
    setFirstName(user?.name || "");
    setLastName("");
    setEmail(user?.email || "");
    setAddress("");
    setCurPass("");
    setNewPass("");
    setConfirmPass("");
  };

  return (
    <div className="container-x py-10">
      {/* Breadcrumb */}
      <nav className="mb-10 flex items-center gap-2 text-sm text-neutral-500">
        <Link to="/" className="transition-colors hover:text-brand">
          {t("nav.home")}
        </Link>
        <span>/</span>
        <span className="text-neutral-900">{t("account.title")}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        {/* Менюи паҳлуӣ */}
        <aside className="space-y-6 text-sm">
          <div>
            <h3 className="mb-3 font-bold">{t("account.manage")}</h3>
            <ul className="space-y-2 pl-4">
              <SideLink active>{t("account.myProfile")}</SideLink>
              <SideLink>{t("account.addressBook")}</SideLink>
              <SideLink>{t("account.payment")}</SideLink>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-bold">{t("account.orders")}</h3>
            <ul className="space-y-2 pl-4">
              <SideLink>{t("account.returns")}</SideLink>
              <SideLink>{t("account.cancellations")}</SideLink>
            </ul>
          </div>
          <div>
            <Link to="/wishlist" className="font-bold transition-colors hover:text-brand">
              {t("account.wishlistNav")}
            </Link>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="pt-2 text-sm font-medium text-brand transition-all hover:pl-1"
          >
            {t("account.logout")}
          </button>
        </aside>

        {/* Корти форма */}
        <form onSubmit={onSubmit} className="rounded-lg border bg-neutral-50 p-8 shadow-sm md:p-10">
          <h2 className="text-xl font-bold text-brand">{t("account.profileTitle")}</h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Field label={t("account.firstName")} value={firstName} onChange={setFirstName} />
            <Field label={t("account.lastName")} value={lastName} onChange={setLastName} />
            <Field label={t("account.emailAddress")} value={email} onChange={setEmail} type="email" />
            <Field label={t("account.streetAddress")} value={address} onChange={setAddress} />
          </div>

          <h3 className="mt-10 font-semibold">{t("account.passwordChanges")}</h3>
          <div className="mt-5 space-y-5">
            <input
              type="password"
              placeholder={t("account.currentPassword")}
              value={curPass}
              onChange={(e) => setCurPass(e.target.value)}
              className={inp}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                type="password"
                placeholder={t("account.newPassword")}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className={inp}
              />
              <input
                type="password"
                placeholder={t("account.confirmPassword")}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className={inp}
              />
            </div>
          </div>

          <div className="mt-10 flex items-center justify-end gap-6">
            <button
              type="button"
              onClick={reset}
              className="text-sm font-medium text-neutral-700 transition-colors hover:text-brand"
            >
              {t("account.cancel")}
            </button>
            <button
              type="submit"
              className="rounded-md bg-brand px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-brand-dark active:scale-[0.99]"
            >
              {t("account.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inp =
  "h-12 w-full rounded-md border border-neutral-300 bg-soft px-4 text-sm outline-none transition-colors placeholder:text-neutral-500 focus:border-neutral-900";

function SideLink({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <li
      className={
        active
          ? "cursor-pointer font-medium text-brand"
          : "cursor-pointer text-neutral-500 transition-colors hover:text-brand"
      }
    >
      {children}
    </li>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-md border border-neutral-300 bg-neutral-50 px-4 text-sm outline-none transition-colors focus:border-neutral-900"
      />
    </label>
  );
}
