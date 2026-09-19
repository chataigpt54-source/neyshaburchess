import { createFileRoute } from "@tanstack/react-router";
import { getSql } from "@/lib/db";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const sql = await getSql();
        const [news, players, tournaments, albums] = await Promise.all([
          sql<{ slug: string }>`select slug from news where status = 'published'`,
          sql<{ slug: string }>`select slug from players`,
          sql<{ slug: string }>`select slug from tournaments`,
          sql<{ slug: string }>`select slug from gallery_albums`,
        ]);
        const paths = [
          "/",
          "/news",
          "/players",
          "/tournaments",
          "/gallery",
          "/about",
          "/contact",
          ...news.map((r) => `/news/${r.slug}`),
          ...players.map((r) => `/players/${r.slug}`),
          ...tournaments.map((r) => `/tournaments/${r.slug}`),
          ...albums.map((r) => `/gallery/${r.slug}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p) => `  <url><loc>${origin}${p}</loc></url>`,
  )
  .join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
