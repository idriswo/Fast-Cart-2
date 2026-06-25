import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  DollarSign,
  Headphones,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
  Users,
} from "lucide-react";

export default function About() {
  const { t } = useTranslation();

  const stats = [
    { icon: <Store size={26} />, value: "10.5k", label: t("about.statSellers") },
    { icon: <DollarSign size={26} />, value: "33k", label: t("about.statSales") },
    { icon: <ShoppingBag size={26} />, value: "45.5k", label: t("about.statCustomers") },
    { icon: <Users size={26} />, value: "25k", label: t("about.statRevenue") },
  ];

  const services = [
    { icon: <Truck />, title: t("home.freeDeliveryTitle"), text: t("home.freeDeliveryText") },
    { icon: <Headphones />, title: t("home.supportTitle"), text: t("home.supportText") },
    { icon: <ShieldCheck />, title: t("home.guaranteeTitle"), text: t("home.guaranteeText") },
  ];

  return (
    <div className="container-x py-10">
      {/* Breadcrumb */}
      <nav className="mb-10 flex items-center gap-2 text-sm text-neutral-500">
        <Link to="/" className="transition-colors hover:text-brand">
          {t("nav.home")}
        </Link>
        <span>/</span>
        <span className="text-neutral-900">{t("about.title")}</span>
      </nav>

      {/* Қисса + расм */}
      <section className="grid items-center gap-12 lg:grid-cols-2">
        <div data-aos="fade-up">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {t("about.storyTitle")}
          </h1>
          <p className="mt-8 text-[15px] leading-relaxed text-neutral-600">
            {t("about.storyP1")}
          </p>
          <p className="mt-5 text-[15px] leading-relaxed text-neutral-600">
            {t("about.storyP2")}
          </p>
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop"
            alt={t("about.storyTitle")}
            className="h-[400px] w-full rounded-lg object-cover"
          />
        </div>
      </section>

      {/* Омор */}
      <section className="mt-20 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            data-aos="fade-up"
            className="group flex flex-col items-center rounded-lg border bg-neutral-50 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white"
          >
            <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-neutral-900 text-white ring-8 ring-neutral-200 transition-colors group-hover:bg-white group-hover:text-brand group-hover:ring-white/30">
              {s.icon}
            </span>
            <span className="text-3xl font-bold">{s.value}</span>
            <span className="mt-1 text-sm">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Хизматрасониҳо */}
      <section className="my-24 flex flex-col items-center justify-center gap-16 md:flex-row">
        {services.map((sv) => (
          <div
            key={sv.title}
            data-aos="fade-up"
            className="text-center transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full border-8 border-zinc-600 bg-black text-white">
              {sv.icon}
            </div>
            <h4 className="font-bold uppercase">{sv.title}</h4>
            <p className="mt-1 text-sm text-neutral-600">{sv.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
