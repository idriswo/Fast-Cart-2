import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, LogOut, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useAuth } from "@/store/auth";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Асосӣ" },
  { to: "/catalog", label: "Каталог" },
  { to: "/about", label: "Дар бораи мо" },
  { to: "/contact", label: "Тамос" },
];

export default function Header() {
  const count = useCart((s) => s.count());
  const wish = useWishlist((s) => s.items.length);
  const { isAuthenticated, user, logout } = useAuth();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Шумо аз ҳисоб баромадед");
    navigate("/");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/catalog?q=${encodeURIComponent(q)}`);
    setOpen(false);
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative text-[15px] font-medium transition-colors duration-300 hover:text-brand",
      "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-brand after:transition-transform after:duration-300 after:ease-out",
      isActive ? "text-brand after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
    );

  return (
    <>
      <div className="bg-black px-4 py-2.5 text-center text-xs text-neutral-100 sm:text-sm">
        Тахфифи тобистона — то 50% барои маҳсулоти техникӣ!{" "}
        <Link to="/catalog" className="font-semibold underline">
          Харид кунед
        </Link>
      </div>

      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-18">
          {/* Hamburger (мобилӣ) */}
          <button
            onClick={() => setOpen(true)}
            className="p-1 transition-transform active:scale-90 md:hidden"
            aria-label="Меню"
          >
            <Menu size={24} />
          </button>

          <Link to="/" className="text-xl font-extrabold tracking-tight md:text-2xl">
            Fast<span className="text-brand">Cart</span>
          </Link>

          <nav className="hidden gap-10 md:flex">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} className={linkClass}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <form onSubmit={submit} className="relative hidden sm:block">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ҷустуҷӯи маҳсулот..."
                className="h-9 w-40 rounded-md bg-soft pl-4 pr-9 text-sm outline-none lg:w-56"
              />
              <button type="submit" className="absolute right-2.5 top-2 text-neutral-500">
                <Search size={18} />
              </button>
            </form>

            <Link to="/wishlist" className="group relative">
              <Heart
                size={22}
                className="transition-all duration-300 group-hover:scale-110 group-hover:text-brand active:scale-95"
              />
              {wish > 0 && <Badge>{wish}</Badge>}
            </Link>
            <Link to="/cart" className="group relative">
              <ShoppingCart
                size={22}
                className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 active:scale-95"
              />
              {count > 0 && <Badge>{count}</Badge>}
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/account" className="flex items-center gap-1.5 text-sm font-medium">
                  <User size={20} />
                  <span className="hidden md:inline">{user?.name || "Профил"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  aria-label="Баромад"
                  className="text-neutral-500 hover:text-brand"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-md bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-brand-dark md:px-4"
              >
                Ворид
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Менюи мобилӣ — drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-[70] flex h-full w-[280px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b p-5">
          <span className="text-xl font-extrabold">
            Fast<span className="text-brand">Cart</span>
          </span>
          <button onClick={() => setOpen(false)} aria-label="Пӯшидан">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <form onSubmit={submit} className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ҷустуҷӯи маҳсулот..."
              className="h-10 w-full rounded-md bg-soft pl-4 pr-9 text-sm outline-none"
            />
            <button type="submit" className="absolute right-2.5 top-2.5 text-neutral-500">
              <Search size={18} />
            </button>
          </form>

          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="border-b border-neutral-100 py-2 text-[15px] font-medium transition-all hover:pl-2 hover:text-brand"
            >
              {n.label}
            </NavLink>
          ))}

          {!isAuthenticated ? (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-brand py-2.5 text-center text-sm font-medium text-white"
            >
              Ворид шудан
            </Link>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="py-2 text-left text-[15px] font-semibold text-brand transition-all hover:pl-2"
            >
              Баромадан
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -top-2 -right-2 grid h-4 w-4 place-items-center rounded-full bg-brand text-[10px] text-white">
      {children}
    </span>
  );
}
