import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useAuth } from "@/store/auth";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "@/components/UserMenu";

export default function Header() {
  const { t } = useTranslation();
  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/catalog", label: t("nav.catalog") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];
  const count = useCart((s) => s.count());
  const wish = useWishlist((s) => s.items.length);
  const { isAuthenticated, logout } = useAuth();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success(t("header.logoutToast"));
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
      <header className="sticky top-0 z-50 border-b bg-neutral-50">
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-18">
          {/* Hamburger (мобилӣ) */}
          <button
            onClick={() => setOpen(true)}
            className="p-1 transition-transform active:scale-90 md:hidden"
            aria-label={t("header.menu")}
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
                placeholder={t("header.searchPlaceholder")}
                className="h-9 w-40 rounded-md bg-soft pl-4 pr-9 text-sm outline-none lg:w-56"
              />
              <button type="submit" className="absolute right-2.5 top-2 text-neutral-500">
                <Search size={18} />
              </button>
            </form>

            <ThemeToggle />

            <LanguageSwitcher />

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
              <UserMenu />
            ) : (
              <Link
                to="/login"
                className="rounded-md bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-brand-dark md:px-4"
              >
                {t("header.login")}
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
          "fixed left-0 top-0 z-[70] flex h-full w-[280px] flex-col bg-neutral-50 shadow-2xl transition-transform duration-300 ease-out md:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b p-5">
          <span className="text-xl font-extrabold">
            Fast<span className="text-brand">Cart</span>
          </span>
          <button onClick={() => setOpen(false)} aria-label={t("header.close")}>
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <form onSubmit={submit} className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("header.searchPlaceholder")}
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

          <div className="flex items-center justify-between border-b border-neutral-100 py-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {!isAuthenticated ? (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-brand py-2.5 text-center text-sm font-medium text-white"
            >
              {t("header.loginFull")}
            </Link>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="py-2 text-left text-[15px] font-semibold text-brand transition-all hover:pl-2"
            >
              {t("header.logout")}
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
