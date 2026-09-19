import { createFileRoute } from "@tanstack/react-router";
import { AlbumEditor } from "@/components/admin/album-editor";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/gallery/new")({
  head: () => seo("افزودن گالری"),
  component: () => <AlbumEditor />,
});
