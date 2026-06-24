import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/store/auth";

/**
 * requireAuth(action) — агар корбар ворид нашуда бошад,
 * паём нишон медиҳад ва ба /login равона мекунад.
 * Дар акси ҳол action-ро иҷро мекунад.
 */
export function useRequireAuth() {
  const isAuth = useAuth((s) => s.isAuthenticated);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (action: () => void) => {
    if (!isAuth) {
      toast.error(t("common.requireAuth"));
      navigate("/login");
      return;
    }
    action();
  };
}
