import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@/store/auth";

/**
 * requireAuth(action) — агар корбар ворид нашуда бошад,
 * паём нишон медиҳад ва ба /login равона мекунад.
 * Дар акси ҳол action-ро иҷро мекунад.
 */
export function useRequireAuth() {
  const isAuth = useAuth((s) => s.isAuthenticated);
  const navigate = useNavigate();

  return (action: () => void) => {
    if (!isAuth) {
      toast.error("Аввал ба ҳисоб ворид шавед");
      navigate("/login");
      return;
    }
    action();
  };
}
