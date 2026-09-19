import { createFileRoute, notFound } from "@tanstack/react-router";
import { adminGetTournament } from "@/lib/data/admin";
import { TournamentEditor } from "@/components/admin/tournament-editor";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/tournaments/$id")({
  loader: async ({ params }) => {
    const item = await adminGetTournament({ data: Number(params.id) });
    if (!item) throw notFound();
    return item;
  },
  head: () => seo("ویرایش مسابقه"),
  component: EditTournament,
});

function EditTournament() {
  return <TournamentEditor initial={Route.useLoaderData()} />;
}
