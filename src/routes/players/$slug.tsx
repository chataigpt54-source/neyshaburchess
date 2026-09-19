import { createFileRoute, notFound } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/public-layout";
import { getPlayerBySlug, getSiteSettings } from "@/lib/data/public";
import { seo } from "@/lib/seo";
import { mediaUrl } from "@/lib/utils";
import { playerFullName } from "@/lib/format";
import { renderRichText } from "@/lib/sanitize";
import { EmptyState } from "@/components/chess/empty-state";

export const Route = createFileRoute("/players/$slug")({
  loader: async ({ params }) => {
    const [settings, player] = await Promise.all([
      getSiteSettings(),
      getPlayerBySlug({ data: params.slug }),
    ]);
    if (!player) throw notFound();
    return { settings, player };
  },
  head: ({ loaderData }) =>
    seo(playerFullName(loaderData?.player.firstName ?? "", loaderData?.player.lastName ?? "")),
  component: PlayerDetail,
});

function PlayerDetail() {
  const { settings, player } = Route.useLoaderData();
  const name = playerFullName(player.firstName, player.lastName);
  return (
    <PublicLayout settings={settings}>
      <section className="bg-navy chess-board-bg text-white">
        <div className="navy-veil geo-lattice" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-[280px_1fr] md:px-6">
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-white/5">
            {player.photoMediaId ? (
              <img src={mediaUrl(player.photoMediaId) ?? ""} alt={name} className="w-full object-cover" />
            ) : (
              <div className="grid aspect-square place-items-center text-6xl text-white/20">{player.firstName[0]}</div>
            )}
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] text-gold">بازیکن</p>
            <h1 className="mt-2 text-4xl font-semibold">{name}</h1>
            {player.fideId ? (
              <p className="mt-3 text-sm text-white/70">آیدی فیده: {player.fideId}</p>
            ) : null}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div className="md:col-span-2">
          <h2 className="mb-4 text-xl font-semibold">بیوگرافی</h2>
          {player.bio.trim() ? (
            <div className="prose-fa" dangerouslySetInnerHTML={{ __html: renderRichText(player.bio) }} />
          ) : (
            <p className="text-sm text-muted">بیوگرافی هنوز ثبت نشده است.</p>
          )}
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold">افتخارات</h2>
          {player.achievements.length === 0 ? (
            <EmptyState title="افتخاری ثبت نشده است." className="py-10" />
          ) : (
            <ul className="space-y-3">
              {player.achievements.map((a) => (
                <li key={a.id} className="rounded-[var(--radius-md)] border border-line bg-white p-4">
                  <p className="font-medium">{a.title}</p>
                  {a.year ? <p className="mt-1 text-xs text-muted">{a.year}</p> : null}
                  {a.description ? <p className="mt-2 text-sm text-muted">{a.description}</p> : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
