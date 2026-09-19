import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { PublicLayout, PageBand } from "@/components/layout/public-layout";
import { Lightbox } from "@/components/gallery/lightbox";
import { EmptyState } from "@/components/chess/empty-state";
import { getGalleryAlbum, getSiteSettings } from "@/lib/data/public";
import { seo } from "@/lib/seo";
import { mediaUrl } from "@/lib/utils";
import { formatFaDate } from "@/lib/format";

export const Route = createFileRoute("/gallery/$slug")({
  loader: async ({ params }) => {
    const [settings, album] = await Promise.all([
      getSiteSettings(),
      getGalleryAlbum({ data: params.slug }),
    ]);
    if (!album) throw notFound();
    return { settings, album };
  },
  head: ({ loaderData }) => seo(loaderData?.album.title),
  component: AlbumPage,
});

function AlbumPage() {
  const { settings, album } = Route.useLoaderData();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <PublicLayout settings={settings}>
      <PageBand title={album.title} subtitle={formatFaDate(album.albumDate) || album.description} />
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        {album.images.length === 0 ? (
          <EmptyState title="هنوز تصویری در این گالری نیست." />
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {album.images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setOpen(i)}
                className="overflow-hidden rounded-[var(--radius-md)] bg-navy/5"
              >
                <img
                  src={mediaUrl(img.mediaId) ?? ""}
                  alt={img.caption || album.title}
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </section>
      {open != null ? (
        <Lightbox images={album.images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      ) : null}
    </PublicLayout>
  );
}
