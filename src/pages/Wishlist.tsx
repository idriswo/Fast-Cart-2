import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useWishlist } from "@/store/wishlist";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export default function Wishlist() {
  const { t } = useTranslation();
  const items = useWishlist((s) => s.items);

  if (items.length === 0)
    return (
      <div className="container-x py-20 text-center">
        <p className="text-lg text-neutral-500">{t("wishlist.empty")}</p>
        <Link to="/catalog">
          <Button className="mt-6">{t("wishlist.goCatalog")}</Button>
        </Link>
      </div>
    );

  return (
    <div className="container-x py-10">
      <h1 className="mb-8 text-2xl font-bold md:text-3xl">{t("wishlist.title", { count: items.length })}</h1>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
