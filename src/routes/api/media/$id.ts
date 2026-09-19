import { createFileRoute } from "@tanstack/react-router";
import { getSql } from "@/lib/db";

export const Route = createFileRoute("/api/media/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const id = Number(params.id);
        if (!Number.isFinite(id)) {
          return new Response("Not found", { status: 404 });
        }
        const sql = await getSql();
        const rows = await sql<{ mime_type: string; data: string; filename: string; kind: string }>`
          select mime_type, data, filename, kind from media where id = ${id} limit 1
        `;
        const row = rows[0];
        if (!row) return new Response("Not found", { status: 404 });
        const buf = Buffer.from(row.data, "base64");
        const headers = new Headers({
          "content-type": row.mime_type,
          "content-length": String(buf.byteLength),
          "cache-control": "public, max-age=31536000, immutable",
          "content-disposition":
            row.kind === "pdf"
              ? `inline; filename*=UTF-8''${encodeURIComponent(row.filename)}`
              : "inline",
        });
        return new Response(buf, { status: 200, headers });
      },
    },
  },
});
