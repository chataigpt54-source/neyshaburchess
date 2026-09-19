import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout, PageBand } from "@/components/layout/public-layout";
import { EmptyState } from "@/components/chess/empty-state";
import { SearchBox } from "@/components/search/search-box";
import { getSiteSettings, listPlayers } from "@/lib/data/public";
import { seo } from "@/lib/seo";
import { mediaUrl } from "@/lib/utils";
import { playerFullName } from "@/lib/format";
import { PAGE_SIZE } from "@/lib/constants";

export const Route = createFileRoute("/players/")({
  loader: async () => {
    const [settings, players] = await Promise.all([
      getSiteSettings(),
      listPlayers({ data: { page: 1 } }),
    ]);
    return { settings, players };
  },
  head: () => seo("بازیکنان"),
  component: PlayersPage,
});

function PlayersPage() {
  const { settings, players } = Route.useLoaderData();
  const [q, setQ] = useState("");
  const [items, setItems] = useState(players.items);
  const [total, setTotal] = useState(players.total);
  const [page, setPage] = useState(1);

  async function run(nextQ: string, nextPage: number) {
    const res = await listPlayers({ data: { q: nextQ, page: nextPage } });
    setItems(res.items);
    setTotal(res.total);
    setPage(res.page);
  }

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <PublicLayout settings={settings}>
      <PageBand title="بازیکنان" subtitle="معرفی شطرنج‌بازان هیأت نیشابور" />
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <SearchBox
          value={q}
          placeholder="جستجو بر اساس نام یا آیدی فیده"
          onChange={(v) => {
            setQ(v);
            void run(v, 1);
          }}
        />
        <div className="mt-8">
          {items.length === 0 ? (
            <EmptyState title="هنوز بازیکنی به این بخش اضافه نشده است." />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((p) => (
                <Link
                  key={p.id}
                  to="/players/$slug"
                  params={{ slug: p.slug }}
                  className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white text-center shadow-card transition-transform hover:-translate-y-0.5"
                >
                  <div className="aspect-square bg-navy/5">
                    {p.photoMediaId ? (
                      <img
                        src={mediaUrl(p.photoMediaId) ?? ""}
                        alt={playerFullName(p.firstName, p.lastName)}
                        className="size-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="grid size-full place-items-center text-4xl font-semibold text-navy/20">
                        {p.firstName[0]}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold">{playerFullName(p.firstName, p.lastName)}</h2>
                    {p.fideId ? (
                      <p className="mt-1 text-xs text-muted">آیدی فیده: {p.fideId}</p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        {pages > 1 ? (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`size-10 rounded-full text-sm ${page === i + 1 ? "bg-navy text-white" : "border border-line"}`}
                onClick={() => void run(q, i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        ) : null}
      </section>
    </PublicLayout>
  );
}
