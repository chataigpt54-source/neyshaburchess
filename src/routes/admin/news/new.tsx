import { createFileRoute } from "@tanstack/react-router";
import { NewsEditor } from "@/components/admin/news-editor";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/news/new")({
  head: () => seo("افزودن خبر"),
  component: () => <NewsEditor />,
});
