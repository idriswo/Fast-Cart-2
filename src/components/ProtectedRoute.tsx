import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/store/auth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = useAuth((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
}
