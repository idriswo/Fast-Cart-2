import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, LogOut, Search, ShoppingCart, User } from "lucide-react";
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
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Шумо аз ҳисоб баромадед");
    navigate("/");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/catalog?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <div className="bg-black text-neutral-100 text-sm text-center py-2.5 px-4">
        Тахфифи тобистона — то 50% барои маҳсулоти техникӣ!{" "}
        <Link to="/catalog" className="font-semibold underline">
          Харид кунед
        </Link>
      </div>

      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container-x flex h-18 items-center justify-between gap-6 py-4">
          <Link to="/" className="text-2xl font-extrabold tracking-tight">
            Fast<span className="text-brand">Cart</span>
          </Link>

          <nav className="hidden md:flex gap-8">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  cn(
                    "text-[15px] hover:text-brand transition-colors",
                    isActive && "border-b-2 border-black pb-0.5"
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <form onSubmit={submit} className="relative hidden sm:block">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ҷустуҷӯи маҳсулот..."
                className="h-9 w-56 rounded-md bg-soft pl-4 pr-9 text-sm outline-none"
              />
              <button type="submit" className="absolute right-2.5 top-2 text-neutral-500">
                <Search size={18} />
              </button>
            </form>

            <Link to="/wishlist" className="relative">
              <Heart size={22} />
              {wish > 0 && <Badge>{wish}</Badge>}
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart size={22} />
              {count > 0 && <Badge>{count}</Badge>}
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/account" className="flex items-center gap-1.5 text-sm font-medium">
                  <User size={20} />
                  <span className="hidden md:inline">{user?.name || "Профил"}</span>
                </Link>
                <button onClick={handleLogout} aria-label="Баромад" className="text-neutral-500 hover:text-brand">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
              >
                Ворид
              </Link>
            )}
          </div>
        </div>
      </header>
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
