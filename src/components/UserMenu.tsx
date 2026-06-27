import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LogOut, User } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/store/auth";

export default function UserMenu() {
  const { t } = useTranslation();
  const { user, profileName, logout } = useAuth();
  const displayName = profileName || user?.name;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success(t("header.logoutToast"));
    setOpen(false);
    navigate("/");
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t("header.profile")}
        className="grid h-9 w-9 place-items-center rounded-full text-neutral-700 transition-colors hover:text-brand"
      >
        <User size={22} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-md border bg-neutral-50 shadow-lg">
          {displayName && (
            <div className="border-b px-4 py-2.5 text-sm font-semibold">{displayName}</div>
          )}
          <Link
            to="/account"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-soft hover:text-brand"
          >
            <User size={18} />
            {t("header.profile")}
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-brand transition-colors hover:bg-soft"
          >
            <LogOut size={18} />
            {t("header.logout")}
          </button>
        </div>
      )}
    </div>
  );
}
