import { createFileRoute, notFound } from "@tanstack/react-router";
import { adminGetNews } from "@/lib/data/admin";
import { NewsEditor } from "@/components/admin/news-editor";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/news/$id")({
  loader: async ({ params }) => {
    const item = await adminGetNews({ data: Number(params.id) });
    if (!item) throw notFound();
    return item;
  },
  head: () => seo("ویرایش خبر"),
  component: EditNews,
});

function EditNews() {
  const item = Route.useLoaderData();
  return <NewsEditor initial={item} />;
}
