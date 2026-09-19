import { createFileRoute } from "@tanstack/react-router";
import { TournamentEditor } from "@/components/admin/tournament-editor";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/tournaments/new")({
  head: () => seo("افزودن مسابقه"),
  component: () => <TournamentEditor />,
});
