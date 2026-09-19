import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout, PageBand } from "@/components/layout/public-layout";
import { EmptyState } from "@/components/chess/empty-state";
import { getSiteSettings, listGalleryAlbums } from "@/lib/data/public";
import { seo } from "@/lib/seo";
import { mediaUrl } from "@/lib/utils";
import { formatFaDate } from "@/lib/format";
import { toFaDigits } from "@/lib/format";

export const Route = createFileRoute("/gallery/")({
  loader: async () => {
    const [settings, albums] = await Promise.all([getSiteSettings(), listGalleryAlbums()]);
    return { settings, albums };
  },
  head: () => seo("گالری"),
  component: GalleryPage,
});

function GalleryPage() {
  const { settings, albums } = Route.useLoaderData();
  return (
    <PublicLayout settings={settings}>
      <PageBand title="گالری" subtitle="آلبوم تصویرهای هیأت شطرنج نیشابور" />
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        {albums.length === 0 ? (
          <EmptyState title="هنوز گالری‌ای ایجاد نشده است." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((a) => (
              <Link
                key={a.id}
                to="/gallery/$slug"
                params={{ slug: a.slug }}
                className="group overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-card"
              >
                <div className="aspect-[4/3] bg-navy/5">
                  {a.coverMediaId ? (
                    <img
                      src={mediaUrl(a.coverMediaId) ?? ""}
                      alt=""
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <div className="p-4">
                  <h2 className="font-semibold">{a.title}</h2>
                  <p className="mt-1 text-xs text-muted">
                    {a.albumDate ? formatFaDate(a.albumDate) : ""}
                    {a.imageCount != null ? ` · ${toFaDigits(a.imageCount)} تصویر` : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </PublicLayout>
  );
}
