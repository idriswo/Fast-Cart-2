import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/auth";

export function About() {
  return (
    <div className="container-x py-16">
      <h1 className="mb-4 text-3xl font-bold">Дар бораи мо</h1>
      <p className="max-w-2xl text-neutral-600">
        FastCart — маркетплейси муосир барои хариду фурӯши маҳсулоти техникӣ дар
        Тоҷикистон. Мақсади мо пешниҳоди беҳтарин нархҳо ва хизматрасонии зуд аст.
      </p>
    </div>
  );
}

export function Contact() {
  return (
    <div className="container-x py-16">
      <h1 className="mb-4 text-3xl font-bold">Тамос</h1>
      <p className="text-neutral-600">📍 Душанбе, Тоҷикистон</p>
      <p className="text-neutral-600">✉️ support@fastcart.tj</p>
      <p className="text-neutral-600">📞 +992 00 000 0000</p>
    </div>
  );
}

export function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container-x py-16">
      <h1 className="mb-8 text-3xl font-bold">Профили ман</h1>
      <div className="max-w-md space-y-4 rounded-md border p-6">
        <Row label="Ном" value={user?.name || "—"} />
        <Row label="Email" value={user?.email || "—"} />
        <Row label="Нақш" value={user?.role || "Корбар"} />
      </div>
      <div className="mt-6 flex gap-3">
        <Link to="/cart"><Button variant="outline">Корзинка</Button></Link>
        <Button
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Баромадан
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-3 last:border-0">
      <span className="text-neutral-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <h1 className="text-7xl font-extrabold text-brand">404</h1>
      <p className="mt-4 text-neutral-500">Саҳифа ёфт нашуд.</p>
      <Link to="/">
        <Button className="mt-6">Ба саҳифаи асосӣ</Button>
      </Link>
    </div>
  );
}
