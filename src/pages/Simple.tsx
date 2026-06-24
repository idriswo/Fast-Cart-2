import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/auth";

export function About() {
  const { t } = useTranslation();
  return (
    <div className="container-x py-16">
      <h1 className="mb-4 text-3xl font-bold">{t("about.title")}</h1>
      <p className="max-w-2xl text-neutral-600">{t("about.text")}</p>
    </div>
  );
}

export function Contact() {
  const { t } = useTranslation();
  return (
    <div className="container-x py-16">
      <h1 className="mb-4 text-3xl font-bold">{t("contact.title")}</h1>
      <p className="text-neutral-600">📍 {t("footer.address")}</p>
      <p className="text-neutral-600">✉️ support@fastcart.tj</p>
      <p className="text-neutral-600">📞 +992 00 000 0000</p>
    </div>
  );
}

export function Account() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container-x py-16">
      <h1 className="mb-8 text-3xl font-bold">{t("account.title")}</h1>
      <div className="max-w-md space-y-4 rounded-md border p-6">
        <Row label={t("account.name")} value={user?.name || "—"} />
        <Row label={t("account.email")} value={user?.email || "—"} />
        <Row label={t("account.role")} value={user?.role || t("account.defaultRole")} />
      </div>
      <div className="mt-6 flex gap-3">
        <Link to="/cart"><Button variant="outline">{t("account.cart")}</Button></Link>
        <Button
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          {t("account.logout")}
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-3 last:border-0">
      <span className="text-neutral-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="container-x py-24 text-center">
      <h1 className="text-7xl font-extrabold text-brand">404</h1>
      <p className="mt-4 text-neutral-500">{t("notFound.text")}</p>
      <Link to="/">
        <Button className="mt-6">{t("notFound.toHome")}</Button>
      </Link>
    </div>
  );
}
