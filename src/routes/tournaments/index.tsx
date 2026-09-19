import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout, PageBand } from "@/components/layout/public-layout";
import { EmptyState } from "@/components/chess/empty-state";
import { SearchBox } from "@/components/search/search-box";
import { getSiteSettings, listTournaments } from "@/lib/data/public";
import { seo } from "@/lib/seo";
import { STATUS_LABELS } from "@/lib/constants";
import { mediaUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/card";
import { formatFaDate } from "@/lib/format";
import type { TournamentStatus } from "@/lib/types";

const GROUPS: { key: TournamentStatus; title: string }[] = [
  { key: "upcoming", title: "مسابقات آینده" },
  { key: "ongoing", title: "مسابقات در حال برگزاری" },
  { key: "finished", title: "مسابقات برگزارشده" },
];

export const Route = createFileRoute("/tournaments/")({
  loader: async () => {
    const [settings, tournaments] = await Promise.all([
      getSiteSettings(),
      listTournaments({ data: {} }),
    ]);
    return { settings, tournaments };
  },
  head: () => seo("مسابقات"),
  component: TournamentsPage,
});

function TournamentsPage() {
  const { settings, tournaments } = Route.useLoaderData();
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim();
    if (!s) return tournaments;
    return tournaments.filter((t) => t.title.includes(s));
  }, [q, tournaments]);

  return (
    <PublicLayout settings={settings}>
      <PageBand title="مسابقات" subtitle="جام قهرمانان و رویدادهای شطرنج شهرستان نیشابور" />
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <SearchBox value={q} onChange={setQ} placeholder="جستجو در مسابقات" />
        <div className="mt-10 space-y-14">
          {GROUPS.map((g) => {
            const items = filtered.filter((t) => t.status === g.key);
            return (
              <div key={g.key}>
                <h2 className="mb-5 text-2xl font-semibold">{g.title}</h2>
                {items.length === 0 ? (
                  <EmptyState title="در حال حاضر مسابقه‌ای برای نمایش وجود ندارد." />
                ) : (
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((t) => (
                      <Link
                        key={t.id}
                        to="/tournaments/$slug"
                        params={{ slug: t.slug }}
                        className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-card transition-transform hover:-translate-y-0.5"
                      >
                        <div className="relative aspect-[16/10] bg-navy">
                          {t.coverMediaId ? (
                            <img
                              src={mediaUrl(t.coverMediaId) ?? ""}
                              alt=""
                              className="size-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="geo-lattice size-full" />
                          )}
                          <Badge className="absolute right-3 top-3" tone="gold">
                            {STATUS_LABELS[t.status]}
                          </Badge>
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold leading-6">{t.title}</h3>
                          {t.startDate ? (
                            <p className="mt-2 text-xs text-muted">{formatFaDate(t.startDate)}</p>
                          ) : null}
                          {t.location ? <p className="mt-1 text-xs text-muted">{t.location}</p> : null}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </PublicLayout>
  );
}
