import { createFileRoute, Link } from "@tanstack/react-router";
import { Images, Newspaper, Trophy, UserPlus, Users } from "lucide-react";
import { getDashboardStats } from "@/lib/data/admin";
import { toFaDigits } from "@/lib/format";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/")({
  loader: () => getDashboardStats(),
  head: () => seo("داشبورد مدیریت"),
  component: Dashboard,
});

function Dashboard() {
  const stats = Route.useLoaderData();
  const cards = [
    { label: "اخبار", value: stats.news, to: "/admin/news", icon: Newspaper },
    { label: "بازیکنان", value: stats.players, to: "/admin/players", icon: Users },
    { label: "مسابقات", value: stats.tournaments, to: "/admin/tournaments", icon: Trophy },
    { label: "گالری‌ها", value: stats.albums, to: "/admin/gallery", icon: Images },
    { label: "ثبت‌نام‌ها", value: stats.registrations, to: "/admin/registrations", icon: UserPlus },
  ];
  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">نمای کلی</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="rounded-[var(--radius-lg)] border border-line bg-white p-5 shadow-card transition-transform hover:-translate-y-0.5"
          >
            <c.icon className="mb-3 size-5 text-turquoise" />
            <p className="text-sm text-muted">{c.label}</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums">{toFaDigits(c.value)}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Quick to="/admin/news" label="افزودن خبر" />
        <Quick to="/admin/players" label="افزودن بازیکن" />
        <Quick to="/admin/tournaments" label="افزودن مسابقه" />
        <Quick to="/admin/gallery" label="افزودن گالری" />
      </div>
    </div>
  );
}

function Quick({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="rounded-[var(--radius-md)] border border-dashed border-line bg-white px-4 py-3 text-sm hover:border-turquoise"
    >
      {label}
    </Link>
  );
}
