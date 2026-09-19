import { createFileRoute, notFound } from "@tanstack/react-router";
import { adminGetAlbum } from "@/lib/data/admin";
import { AlbumEditor } from "@/components/admin/album-editor";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/gallery/$id")({
  loader: async ({ params }) => {
    const item = await adminGetAlbum({ data: Number(params.id) });
    if (!item) throw notFound();
    return item;
  },
  head: () => seo("ویرایش گالری"),
  component: EditAlbum,
});

function EditAlbum() {
  return <AlbumEditor initial={Route.useLoaderData()} />;
}
