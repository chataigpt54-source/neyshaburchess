import { createFileRoute } from "@tanstack/react-router";
import { getSql } from "@/lib/db";

export const Route = createFileRoute("/api/tally/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const tournamentId = Number(url.searchParams.get("tournamentId") || "");
        let body: Record<string, unknown> = {};
        try {
          body = (await request.json()) as Record<string, unknown>;
        } catch {
          body = {};
        }
        if (!Number.isFinite(tournamentId)) {
          return Response.json({ ok: false, error: "tournamentId required" }, { status: 400 });
        }
        const fields = (body.data as Record<string, unknown> | undefined) ?? body;
        const sql = await getSql();
        await sql`
          insert into tournament_registrations (tournament_id, full_name, email, phone, fide_id, payload, source)
          values (
            ${tournamentId},
            ${String(fields.fullName ?? fields.name ?? "") || null},
            ${String(fields.email ?? "") || null},
            ${String(fields.phone ?? "") || null},
            ${String(fields.fideId ?? fields.fide_id ?? "") || null},
            ${JSON.stringify(body)}::jsonb,
            'tally'
          )
        `;
        return Response.json({ ok: true });
      },
    },
  },
});
