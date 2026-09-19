import { createFileRoute, notFound } from "@tanstack/react-router";
import { PublicLayout, PageBand } from "@/components/layout/public-layout";
import { getNewsBySlug, getSiteSettings } from "@/lib/data/public";
import { seo } from "@/lib/seo";
import { formatFaDate } from "@/lib/format";
import { mediaUrl } from "@/lib/utils";
import { renderRichText } from "@/lib/sanitize";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    const [settings, item] = await Promise.all([
      getSiteSettings(),
      getNewsBySlug({ data: params.slug }),
    ]);
    if (!item) throw notFound();
    return { settings, item };
  },
  head: ({ loaderData }) => seo(loaderData?.item.title, loaderData?.item.summary),
  component: NewsDetail,
});

function NewsDetail() {
  const { settings, item } = Route.useLoaderData();
  return (
    <PublicLayout settings={settings}>
      <PageBand title={item.title} subtitle={formatFaDate(item.publishedAt)} />
      <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
        {item.coverMediaId ? (
          <img
            src={mediaUrl(item.coverMediaId) ?? ""}
            alt=""
            className="mb-8 w-full rounded-[var(--radius-lg)] object-cover"
          />
        ) : null}
        <div
          className="prose-fa"
          dangerouslySetInnerHTML={{ __html: renderRichText(item.content || item.summary) }}
        />
        {item.imageIds.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {item.imageIds.map((id) => (
              <img
                key={id}
                src={mediaUrl(id) ?? ""}
                alt=""
                className="rounded-[var(--radius-md)] object-cover"
                loading="lazy"
              />
            ))}
          </div>
        ) : null}
      </article>
    </PublicLayout>
  );
}
