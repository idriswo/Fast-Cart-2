import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 bg-black text-neutral-300">
      <div className="container-x grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
        <div>
          <Link to="/" className="text-2xl font-extrabold text-white">
            Fast<span className="text-brand">Cart</span>
          </Link>
          <p className="mt-4 text-sm">
            Маркетплейси №1 барои маҳсулоти техникӣ дар Тоҷикистон.
          </p>
        </div>
        <div>
          <h5 className="mb-4 text-lg font-semibold text-white">Дастгирӣ</h5>
          <p className="text-sm">Душанбе, Тоҷикистон</p>
          <p className="mt-2 text-sm">support@fastcart.tj</p>
          <p className="mt-2 text-sm">+992 00 000 0000</p>
        </div>
        <div>
          <h5 className="mb-4 text-lg font-semibold text-white">Ҳисоб</h5>
          <FootLink to="/account">Профили ман</FootLink>
          <FootLink to="/cart">Корзинка</FootLink>
          <FootLink to="/wishlist">Дӯстдошта</FootLink>
        </div>
        <div>
          <h5 className="mb-4 text-lg font-semibold text-white">Пайвандҳо</h5>
          <FootLink to="/catalog">Каталог</FootLink>
          <FootLink to="/about">Дар бораи мо</FootLink>
          <FootLink to="/contact">Тамос</FootLink>
        </div>
      </div>
      <div className="border-t border-neutral-800 py-5 text-center text-sm text-neutral-500">
        © 2026 FastCart. Ҳамаи ҳуқуқҳо ҳифз шудаанд.
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
