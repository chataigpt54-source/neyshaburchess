import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout, PageBand } from "@/components/layout/public-layout";
import { EmptyState } from "@/components/chess/empty-state";
import { getSiteSettings, getStaticPage } from "@/lib/data/public";
import { seo } from "@/lib/seo";
import { renderRichText } from "@/lib/sanitize";
import { SITE_NAME } from "@/lib/constants";

export const Route = createFileRoute("/about")({
  loader: async () => {
    const [settings, page] = await Promise.all([
      getSiteSettings(),
      getStaticPage({ data: "about" }),
    ]);
    return { settings, page };
  },
  head: () => seo("درباره هیأت"),
  component: AboutPage,
});

function AboutPage() {
  const { settings, page } = Route.useLoaderData();
  const content = page?.content?.trim() ?? "";
  return (
    <PublicLayout settings={settings}>
      <PageBand title={page?.title || "درباره هیأت"} />
      <section className="mx-auto max-w-3xl px-4 py-12 md:px-6">
        <div className="mb-10 overflow-hidden rounded-[var(--radius-xl)] border border-line bg-navy p-10 text-center text-white">
          <img src="/logo.png" alt="" className="mx-auto size-28 rounded-full object-cover" />
          <h2 className="mt-4 text-xl font-semibold">{SITE_NAME}</h2>
        </div>
        {content ? (
          <div className="prose-fa" dangerouslySetInnerHTML={{ __html: renderRichText(content) }} />
        ) : (
          <EmptyState
            title="این صفحه هنوز تکمیل نشده است."
            description="محتوای معرفی هیأت از پنل مدیریت قابل ویرایش است."
          />
        )}
      </section>
    </PublicLayout>
  );
}
