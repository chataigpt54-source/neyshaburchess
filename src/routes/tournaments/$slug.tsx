import { createFileRoute, notFound } from "@tanstack/react-router";
import { FileText, Trophy } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { TallyEmbed } from "@/components/tally/embed";
import { getGalleryAlbumById, getSiteSettings, getTournamentBySlug } from "@/lib/data/public";
import { seo } from "@/lib/seo";
import { STATUS_LABELS } from "@/lib/constants";
import { mediaUrl, externalRel } from "@/lib/utils";
import { formatFaDate } from "@/lib/format";
import { renderRichText } from "@/lib/sanitize";
import { Badge } from "@/components/ui/card";
import { Lightbox } from "@/components/gallery/lightbox";
import { useState } from "react";

export const Route = createFileRoute("/tournaments/$slug")({
  loader: async ({ params }) => {
    const [settings, tournament] = await Promise.all([
      getSiteSettings(),
      getTournamentBySlug({ data: params.slug }),
    ]);
    if (!tournament) throw notFound();
    const gallery = tournament.galleryId
      ? await getGalleryAlbumById({ data: tournament.galleryId })
      : null;
    return { settings, tournament, album: gallery };
  },
  head: ({ loaderData }) => seo(loaderData?.tournament.title),
  component: TournamentDetail,
});

function TournamentDetail() {
  const { settings, tournament, album } = Route.useLoaderData();
  const [open, setOpen] = useState<number | null>(null);
  const dates = [formatFaDate(tournament.startDate), formatFaDate(tournament.endDate)]
    .filter(Boolean)
    .join(" تا ");

  return (
    <PublicLayout settings={settings}>
      <section className="relative overflow-hidden bg-navy chess-board-bg text-white">
        <div className="navy-veil geo-lattice absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <Badge tone="gold">{STATUS_LABELS[tournament.status]}</Badge>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold md:text-5xl">{tournament.title}</h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            {dates ? <span>{dates}</span> : null}
            {tournament.location ? <span>{tournament.location}</span> : null}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {tournament.tallyUrl ? (
              <a
                href="#register"
                className="inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-turquoise px-5 text-sm font-medium"
              >
                ثبت‌نام در مسابقه
              </a>
            ) : null}
            {tournament.chessResultsUrl ? (
              <a
                href={tournament.chessResultsUrl}
                {...externalRel()}
                className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-sm)] border border-white/20 px-5 text-sm"
              >
                <Trophy className="size-4" />
                مشاهده نتایج
              </a>
            ) : null}
            {tournament.rulesMediaId ? (
              <>
                <a
                  href={mediaUrl(tournament.rulesMediaId) ?? "#"}
                  {...externalRel()}
                  className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-sm)] border border-white/20 px-5 text-sm"
                >
                  <FileText className="size-4" />
                  مشاهده آیین‌نامه
                </a>
                <a
                  href={mediaUrl(tournament.rulesMediaId) ?? "#"}
                  download
                  className="inline-flex h-11 items-center rounded-[var(--radius-sm)] px-5 text-sm text-gold"
                >
                  دانلود آیین‌نامه
                </a>
              </>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 md:px-6">
        {tournament.coverMediaId ? (
          <img
            src={mediaUrl(tournament.coverMediaId) ?? ""}
            alt=""
            className="mb-8 w-full rounded-[var(--radius-lg)] object-cover"
          />
        ) : null}
        {tournament.description.trim() ? (
          <div className="prose-fa" dangerouslySetInnerHTML={{ __html: renderRichText(tournament.description) }} />
        ) : null}

        {tournament.tallyUrl ? (
          <div id="register" className="mt-12">
            <h2 className="mb-4 text-xl font-semibold">ثبت‌نام مسابقه</h2>
            <TallyEmbed url={tournament.tallyUrl} title={`ثبت‌نام ${tournament.title}`} />
          </div>
        ) : null}

        {album?.images?.length ? (
          <div className="mt-12">
            <h2 className="mb-4 text-xl font-semibold">گالری مسابقه</h2>
            <div className="grid grid-cols-2 gap-3">
              {album.images.map((img, i) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setOpen(i)}
                  className="overflow-hidden rounded-[var(--radius-md)]"
                >
                  <img src={mediaUrl(img.mediaId) ?? ""} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
            {open != null ? (
              <Lightbox
                images={album.images}
                index={open}
                onIndex={setOpen}
                onClose={() => setOpen(null)}
              />
            ) : null}
          </div>
        ) : null}
      </section>
    </PublicLayout>
  );
}
