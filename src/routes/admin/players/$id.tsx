import { createFileRoute, notFound } from "@tanstack/react-router";
import { adminGetPlayer } from "@/lib/data/admin";
import { PlayerEditor } from "@/components/admin/player-editor";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/players/$id")({
  loader: async ({ params }) => {
    const item = await adminGetPlayer({ data: Number(params.id) });
    if (!item) throw notFound();
    return item;
  },
  head: () => seo("ویرایش بازیکن"),
  component: () => <PlayerEditor initial={Route.useLoaderData()} />,
});
