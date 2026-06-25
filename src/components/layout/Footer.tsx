import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-20 bg-black text-zinc-400">
      <div className="container-x grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
        <div>
          <Link to="/" className="text-2xl font-extrabold text-white">
            Fast<span className="text-brand">Cart</span>
          </Link>
          <p className="mt-4 text-sm">{t("footer.tagline")}</p>
        </div>
        <div>
          <h5 className="mb-4 text-lg font-semibold text-white">{t("footer.support")}</h5>
          <p className="text-sm">{t("footer.address")}</p>
          <p className="mt-2 text-sm">support@fastcart.tj</p>
          <p className="mt-2 text-sm">+992 00 000 0000</p>
        </div>
        <div>
          <h5 className="mb-4 text-lg font-semibold text-white">{t("footer.account")}</h5>
          <FootLink to="/account">{t("footer.myProfile")}</FootLink>
          <FootLink to="/cart">{t("footer.cart")}</FootLink>
          <FootLink to="/wishlist">{t("footer.wishlist")}</FootLink>
        </div>
        <div>
          <h5 className="mb-4 text-lg font-semibold text-white">{t("footer.links")}</h5>
          <FootLink to="/catalog">{t("nav.catalog")}</FootLink>
          <FootLink to="/about">{t("nav.about")}</FootLink>
          <FootLink to="/contact">{t("nav.contact")}</FootLink>
        </div>
      </div>
      <div className="border-t border-zinc-800 py-5 text-center text-sm text-zinc-500">
        {t("footer.rights")}
      </div>
    </footer>
  );
}

function FootLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="block py-1 text-sm hover:text-white">
      {children}
    </Link>
  );
}
