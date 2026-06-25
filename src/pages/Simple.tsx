import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

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
