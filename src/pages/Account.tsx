import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useAuth } from "@/store/auth";
import { getUserProfile, updateUserProfile } from "@/api/profile";

export default function Account() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userId = (user?.sid as string) || "";

  const [firstName, setFirstName] = useState(user?.name || "");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Профилро аз API мегирем
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getUserProfile(userId)
      .then((p) => {
        if (!p) return;
        setFirstName(p.firstName || user?.name || "");
        setLastName(p.lastName || "");
        setEmail(p.email || user?.email || "");
        setPhone(p.phoneNumber || "");
        setDob(p.dob ? String(p.dob).slice(0, 10) : "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("FirstName", firstName);
      fd.append("LastName", lastName);
      fd.append("Email", email);
      fd.append("PhoneNumber", phone);
      if (dob) fd.append("Dob", dob);
      if (image) fd.append("Image", image);
      await updateUserProfile(fd);
      toast.success(t("account.saved"));
    } catch (err: any) {
      const msg =
        err?.response?.data?.errors?.join?.("\n") || t("account.saveError");
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setFirstName(user?.name || "");
    setLastName("");
    setEmail(user?.email || "");
    setPhone("");
    setDob("");
    setImage(null);
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
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-brand">{t("account.profileTitle")}</h2>
            {loading && <span className="text-sm text-neutral-400">{t("account.loading")}</span>}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Field label={t("account.firstName")} value={firstName} onChange={setFirstName} />
            <Field label={t("account.lastName")} value={lastName} onChange={setLastName} />
            <Field label={t("account.emailAddress")} value={email} onChange={setEmail} type="email" />
            <Field label={t("account.phone")} value={phone} onChange={setPhone} />
            <Field label={t("account.dob")} value={dob} onChange={setDob} type="date" />
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">{t("account.avatar")}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-md file:border-0 file:bg-brand file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-brand-dark"
              />
            </label>
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
              disabled={saving}
              className="rounded-md bg-brand px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-brand-dark active:scale-[0.99] disabled:opacity-60"
            >
              {saving ? t("account.loading") : t("account.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

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
