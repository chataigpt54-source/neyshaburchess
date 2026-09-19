import { createFileRoute } from "@tanstack/react-router";
import { PlayerEditor } from "@/components/admin/player-editor";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/players/new")({
  head: () => seo("افزودن بازیکن"),
  component: () => <PlayerEditor />,
});
