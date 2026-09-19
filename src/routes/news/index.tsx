import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout, PageBand } from "@/components/layout/public-layout";
import { EmptyState } from "@/components/chess/empty-state";
import { SearchBox } from "@/components/search/search-box";
import { getSiteSettings, listPublishedNews } from "@/lib/data/public";
import { seo } from "@/lib/seo";
import { formatFaDate } from "@/lib/format";
import { mediaUrl } from "@/lib/utils";
import { PAGE_SIZE } from "@/lib/constants";

export const Route = createFileRoute("/news/")({
  loader: async () => {
    const [settings, news] = await Promise.all([
      getSiteSettings(),
      listPublishedNews({ data: { page: 1 } }),
    ]);
    return { settings, news };
  },
  head: () => seo("اخبار"),
  component: NewsList,
});

function NewsList() {
  const { settings, news } = Route.useLoaderData();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(news.page);
  const [items, setItems] = useState(news.items);
  const [total, setTotal] = useState(news.total);
  const [busy, setBusy] = useState(false);

  async function run(nextQ: string, nextPage: number) {
    setBusy(true);
    try {
      const res = await listPublishedNews({ data: { q: nextQ, page: nextPage } });
      setItems(res.items);
      setTotal(res.total);
      setPage(res.page);
    } finally {
      setBusy(false);
    }
  }

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <PublicLayout settings={settings}>
      <PageBand title="اخبار" subtitle="آخرین رویدادها و اطلاعیه‌های هیأت شطرنج نیشابور" />
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <SearchBox
          value={q}
          onChange={(v) => {
            setQ(v);
            void run(v, 1);
          }}
          placeholder="جستجو در اخبار"
        />
        <div className="mt-8">
          {items.length === 0 ? (
            <EmptyState title="هنوز خبری منتشر نشده است." />
          ) : (
            <div className={`grid gap-5 md:grid-cols-2 lg:grid-cols-3 ${busy ? "opacity-60" : ""}`}>
              {items.map((n) => (
                <article
                  key={n.id}
                  className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-card"
                >
                  <div className="aspect-[16/10] bg-navy/5">
                    {n.coverMediaId ? (
                      <img
                        src={mediaUrl(n.coverMediaId) ?? ""}
                        alt=""
                        className="size-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-muted">{formatFaDate(n.publishedAt)}</p>
                    <h2 className="mt-1 text-lg font-semibold">{n.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{n.summary}</p>
                    <Link
                      to="/news/$slug"
                      params={{ slug: n.slug }}
                      className="mt-4 inline-block text-sm text-turquoise-dark"
                    >
                      ادامه مطلب
                    </Link>
                  </div>
                </article>
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
