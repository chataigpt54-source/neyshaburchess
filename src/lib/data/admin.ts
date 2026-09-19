import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin.server";
import { slugify, uniqueSlug } from "@/lib/slug";
import {
  albumSchema,
  newsSchema,
  pageSchema,
  playerSchema,
  settingsSchema,
  tournamentSchema,
} from "@/lib/validation";
import { mapAlbum, mapNews, mapPlayer, mapSettings, mapTournament } from "./mappers";
import type {
  DashboardStats,
  GalleryImage,
  NewsItem,
  PlayerAchievement,
  RegistrationItem,
  TournamentItem,
} from "@/lib/types";

async function guard(userId: string) {
  await requireAdmin(userId);
}

export const getDashboardStats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<DashboardStats> => {
    await guard(context.userId);
    const sql = await getSql();
    const [news, players, tournaments, albums, registrations] = await Promise.all([
      sql<{ n: number }>`select count(*)::int as n from news`,
      sql<{ n: number }>`select count(*)::int as n from players`,
      sql<{ n: number }>`select count(*)::int as n from tournaments`,
      sql<{ n: number }>`select count(*)::int as n from gallery_albums`,
      sql<{ n: number }>`select count(*)::int as n from tournament_registrations`,
    ]);
    return {
      news: news[0]?.n ?? 0,
      players: players[0]?.n ?? 0,
      tournaments: tournaments[0]?.n ?? 0,
      albums: albums[0]?.n ?? 0,
      registrations: registrations[0]?.n ?? 0,
    };
  });

export const adminListNews = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((q: string | undefined) => q ?? "")
  .handler(async ({ context, data: q }) => {
    await guard(context.userId);
    const sql = await getSql();
    const like = q.trim() ? `%${q.trim()}%` : null;
    const rows = like
      ? await sql`select * from news where title ilike ${like} order by updated_at desc`
      : await sql`select * from news order by updated_at desc`;
    return rows.map(mapNews);
  });

export const adminGetNews = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ context, data: id }) => {
    await guard(context.userId);
    const sql = await getSql();
    const rows = await sql`select * from news where id = ${id} limit 1`;
    if (!rows[0]) return null;
    const item = mapNews(rows[0]);
    const images = await sql<{ media_id: number }>`
      select media_id from news_images where news_id = ${id} order by sort_order
    `;
    return { ...item, imageIds: images.map((i) => Number(i.media_id)) };
  });

export const adminSaveNews = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => input as {
    id?: number;
    title: string;
    slug?: string;
    summary?: string;
    content?: string;
    coverMediaId?: number | null;
    status: "draft" | "published";
    imageIds?: number[];
  })
  .handler(async ({ context, data }): Promise<NewsItem> => {
    await guard(context.userId);
    const parsed = newsSchema.parse(data);
    const sql = await getSql();
    const base = parsed.slug?.trim() ? slugify(parsed.slug) : slugify(parsed.title);
    const slug = await uniqueSlug(base, async (s) => {
      const found = data.id
        ? await sql`select id from news where slug = ${s} and id <> ${data.id} limit 1`
        : await sql`select id from news where slug = ${s} limit 1`;
      return found.length > 0;
    });
    const publishedAt =
      parsed.status === "published" ? new Date().toISOString() : null;
    if (data.id) {
      const rows = await sql`
        update news set
          title = ${parsed.title},
          slug = ${slug},
          summary = ${parsed.summary ?? ""},
          content = ${parsed.content ?? ""},
          cover_media_id = ${parsed.coverMediaId ?? null},
          status = ${parsed.status},
          published_at = case
            when ${parsed.status} = 'published' and published_at is null then ${publishedAt}::timestamptz
            when ${parsed.status} = 'draft' then null
            else published_at
          end,
          updated_at = now()
        where id = ${data.id}
        returning *
      `;
      await sql`delete from news_images where news_id = ${data.id}`;
      const ids = data.imageIds ?? [];
      for (let i = 0; i < ids.length; i += 1) {
        await sql`insert into news_images (news_id, media_id, sort_order) values (${data.id}, ${ids[i]}, ${i})`;
      }
      return mapNews(rows[0]!);
    }
    const rows = await sql`
      insert into news (title, slug, summary, content, cover_media_id, status, published_at, created_by)
      values (
        ${parsed.title}, ${slug}, ${parsed.summary ?? ""}, ${parsed.content ?? ""},
        ${parsed.coverMediaId ?? null}, ${parsed.status},
        ${parsed.status === "published" ? publishedAt : null}::timestamptz,
        ${context.userId}
      )
      returning *
    `;
    const created = mapNews(rows[0]!);
    const ids = data.imageIds ?? [];
    for (let i = 0; i < ids.length; i += 1) {
      await sql`insert into news_images (news_id, media_id, sort_order) values (${created.id}, ${ids[i]}, ${i})`;
    }
    return created;
  });

export const adminDeleteNews = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ context, data: id }) => {
    await guard(context.userId);
    const sql = await getSql();
    await sql`delete from news where id = ${id}`;
    return { ok: true };
  });

export const adminListPlayers = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((q: string | undefined) => q ?? "")
  .handler(async ({ context, data: q }) => {
    await guard(context.userId);
    const sql = await getSql();
    const like = q.trim() ? `%${q.trim()}%` : null;
    const rows = like
      ? await sql`
          select * from players
          where first_name ilike ${like} or last_name ilike ${like}
          order by last_name, first_name
        `
      : await sql`select * from players order by last_name, first_name`;
    return rows.map(mapPlayer);
  });

export const adminGetPlayer = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ context, data: id }) => {
    await guard(context.userId);
    const sql = await getSql();
    const rows = await sql`select * from players where id = ${id} limit 1`;
    if (!rows[0]) return null;
    const player = mapPlayer(rows[0]);
    const ach = await sql<{
      id: number;
      player_id: number;
      title: string;
      year: string | null;
      description: string;
      sort_order: number;
    }>`select * from player_achievements where player_id = ${id} order by sort_order, id`;
    return {
      ...player,
      achievements: ach.map((a) => ({
        id: Number(a.id),
        playerId: Number(a.player_id),
        title: a.title,
        year: a.year,
        description: a.description,
        sortOrder: Number(a.sort_order),
      })) satisfies PlayerAchievement[],
    };
  });

export const adminSavePlayer = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => input as {
    id?: number;
    firstName: string;
    lastName: string;
    slug?: string;
    fideId?: string;
    bio?: string;
    photoMediaId?: number | null;
    achievements?: { title: string; year?: string; description?: string }[];
  })
  .handler(async ({ context, data }) => {
    await guard(context.userId);
    const parsed = playerSchema.parse(data);
    const sql = await getSql();
    const base = parsed.slug?.trim()
      ? slugify(parsed.slug)
      : slugify(`${parsed.firstName}-${parsed.lastName}`);
    const slug = await uniqueSlug(base, async (s) => {
      const found = data.id
        ? await sql`select id from players where slug = ${s} and id <> ${data.id} limit 1`
        : await sql`select id from players where slug = ${s} limit 1`;
      return found.length > 0;
    });
    let id = data.id;
    if (id) {
      await sql`
        update players set
          first_name = ${parsed.firstName},
          last_name = ${parsed.lastName},
          slug = ${slug},
          fide_id = ${parsed.fideId?.trim() || null},
          bio = ${parsed.bio ?? ""},
          photo_media_id = ${parsed.photoMediaId ?? null},
          updated_at = now()
        where id = ${id}
      `;
      await sql`delete from player_achievements where player_id = ${id}`;
    } else {
      const rows = await sql`
        insert into players (first_name, last_name, slug, fide_id, bio, photo_media_id)
        values (
          ${parsed.firstName}, ${parsed.lastName}, ${slug},
          ${parsed.fideId?.trim() || null}, ${parsed.bio ?? ""}, ${parsed.photoMediaId ?? null}
        )
        returning id
      `;
      id = Number(rows[0]!.id);
    }
    const list = parsed.achievements ?? [];
    for (let i = 0; i < list.length; i += 1) {
      const a = list[i]!;
      await sql`
        insert into player_achievements (player_id, title, year, description, sort_order)
        values (${id}, ${a.title}, ${a.year?.trim() || null}, ${a.description ?? ""}, ${i})
      `;
    }
    return { id };
  });

export const adminDeletePlayer = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ context, data: id }) => {
    await guard(context.userId);
    const sql = await getSql();
    await sql`delete from players where id = ${id}`;
    return { ok: true };
  });

export const adminListTournaments = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await guard(context.userId);
    const sql = await getSql();
    const rows = await sql`select * from tournaments order by sort_order asc, id asc`;
    return rows.map(mapTournament);
  });

export const adminGetTournament = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ context, data: id }) => {
    await guard(context.userId);
    const sql = await getSql();
    const rows = await sql`select * from tournaments where id = ${id} limit 1`;
    if (!rows[0]) return null;
    return mapTournament(rows[0]);
  });

export const adminSaveTournament = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => input as {
    id?: number;
    title: string;
    slug?: string;
    description?: string;
    coverMediaId?: number | null;
    startDate?: string | null;
    endDate?: string | null;
    location?: string;
    status: TournamentItem["status"];
    tallyUrl?: string;
    chessResultsUrl?: string;
    rulesMediaId?: number | null;
    galleryId?: number | null;
    sortOrder?: number;
  })
  .handler(async ({ context, data }) => {
    await guard(context.userId);
    const parsed = tournamentSchema.parse(data);
    const sql = await getSql();
    const base = parsed.slug?.trim() ? slugify(parsed.slug) : slugify(parsed.title);
    const slug = await uniqueSlug(base, async (s) => {
      const found = data.id
        ? await sql`select id from tournaments where slug = ${s} and id <> ${data.id} limit 1`
        : await sql`select id from tournaments where slug = ${s} limit 1`;
      return found.length > 0;
    });
    const tally = parsed.tallyUrl?.trim() || null;
    const results = parsed.chessResultsUrl?.trim() || null;
    const start = parsed.startDate?.trim() || null;
    const end = parsed.endDate?.trim() || null;
    if (data.id) {
      await sql`
        update tournaments set
          title = ${parsed.title},
          slug = ${slug},
          description = ${parsed.description ?? ""},
          cover_media_id = ${parsed.coverMediaId ?? null},
          start_date = ${start},
          end_date = ${end},
          location = ${parsed.location?.trim() || null},
          status = ${parsed.status},
          tally_url = ${tally},
          chess_results_url = ${results},
          rules_media_id = ${parsed.rulesMediaId ?? null},
          gallery_id = ${parsed.galleryId ?? null},
          sort_order = ${parsed.sortOrder ?? 0},
          updated_at = now()
        where id = ${data.id}
      `;
      return { id: data.id, slug };
    }
    const rows = await sql`
      insert into tournaments (
        title, slug, description, cover_media_id, start_date, end_date, location,
        status, tally_url, chess_results_url, rules_media_id, gallery_id, sort_order
      ) values (
        ${parsed.title}, ${slug}, ${parsed.description ?? ""}, ${parsed.coverMediaId ?? null},
        ${start}, ${end}, ${parsed.location?.trim() || null}, ${parsed.status},
        ${tally}, ${results}, ${parsed.rulesMediaId ?? null}, ${parsed.galleryId ?? null},
        ${parsed.sortOrder ?? 0}
      ) returning id
    `;
    return { id: Number(rows[0]!.id), slug };
  });

export const adminDeleteTournament = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ context, data: id }) => {
    await guard(context.userId);
    const sql = await getSql();
    await sql`delete from tournaments where id = ${id}`;
    return { ok: true };
  });

export const adminClearRulesPdf = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((tournamentId: number) => tournamentId)
  .handler(async ({ context, data: tournamentId }) => {
    await guard(context.userId);
    const sql = await getSql();
    await sql`update tournaments set rules_media_id = null, updated_at = now() where id = ${tournamentId}`;
    return { ok: true };
  });

export const adminListAlbums = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await guard(context.userId);
    const sql = await getSql();
    const rows = await sql`
      select a.*, (select count(*)::int from gallery_images g where g.album_id = a.id) as image_count
      from gallery_albums a order by a.created_at desc
    `;
    return rows.map(mapAlbum);
  });

export const adminGetAlbum = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ context, data: id }) => {
    await guard(context.userId);
    const sql = await getSql();
    const rows = await sql`select * from gallery_albums where id = ${id} limit 1`;
    if (!rows[0]) return null;
    const album = mapAlbum(rows[0]);
    const images = await sql<{
      id: number;
      album_id: number;
      media_id: number;
      sort_order: number;
      caption: string;
    }>`select * from gallery_images where album_id = ${id} order by sort_order, id`;
    return {
      ...album,
      images: images.map((img) => ({
        id: Number(img.id),
        albumId: Number(img.album_id),
        mediaId: Number(img.media_id),
        sortOrder: Number(img.sort_order),
        caption: img.caption,
      })) satisfies GalleryImage[],
    };
  });

export const adminSaveAlbum = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => input as {
    id?: number;
    title: string;
    description?: string;
    albumDate?: string | null;
    coverMediaId?: number | null;
    imageIds?: number[];
  })
  .handler(async ({ context, data }) => {
    await guard(context.userId);
    const parsed = albumSchema.parse(data);
    const sql = await getSql();
    const slug = await uniqueSlug(slugify(parsed.title), async (s) => {
      const found = data.id
        ? await sql`select id from gallery_albums where slug = ${s} and id <> ${data.id} limit 1`
        : await sql`select id from gallery_albums where slug = ${s} limit 1`;
      return found.length > 0;
    });
    const date = parsed.albumDate?.trim() || null;
    let id = data.id;
    if (id) {
      await sql`
        update gallery_albums set
          title = ${parsed.title},
          slug = ${slug},
          description = ${parsed.description ?? ""},
          album_date = ${date},
          cover_media_id = ${parsed.coverMediaId ?? null},
          updated_at = now()
        where id = ${id}
      `;
    } else {
      const rows = await sql`
        insert into gallery_albums (title, slug, description, album_date, cover_media_id)
        values (${parsed.title}, ${slug}, ${parsed.description ?? ""}, ${date}, ${parsed.coverMediaId ?? null})
        returning id
      `;
      id = Number(rows[0]!.id);
    }
    if (data.imageIds) {
      await sql`delete from gallery_images where album_id = ${id}`;
      for (let i = 0; i < data.imageIds.length; i += 1) {
        await sql`
          insert into gallery_images (album_id, media_id, sort_order)
          values (${id}, ${data.imageIds[i]}, ${i})
        `;
      }
      if (!parsed.coverMediaId && data.imageIds[0]) {
        await sql`update gallery_albums set cover_media_id = ${data.imageIds[0]} where id = ${id}`;
      }
    }
    return { id, slug };
  });

export const adminDeleteAlbum = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ context, data: id }) => {
    await guard(context.userId);
    const sql = await getSql();
    await sql`delete from gallery_albums where id = ${id}`;
    return { ok: true };
  });

export const adminSavePage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => pageSchema.parse(input))
  .handler(async ({ context, data }) => {
    await guard(context.userId);
    const sql = await getSql();
    await sql`
      insert into static_pages (slug, title, content, updated_at)
      values (${data.slug}, ${data.title}, ${data.content ?? ""}, now())
      on conflict (slug) do update set
        title = excluded.title,
        content = excluded.content,
        updated_at = now()
    `;
    return { ok: true };
  });

export const adminSaveSettings = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => settingsSchema.parse(input))
  .handler(async ({ context, data }) => {
    await guard(context.userId);
    const sql = await getSql();
    await sql`
      update site_settings set
        site_title = ${data.siteTitle},
        description = ${data.description ?? ""},
        email = ${data.email},
        phone = ${data.phone?.trim() || null},
        address = ${data.address},
        instagram_url = ${data.instagramUrl?.trim() || null},
        eitaa_url = ${data.eitaaUrl?.trim() || null},
        telegram_url = ${data.telegramUrl?.trim() || null},
        tally_suggestions_url = ${data.tallySuggestionsUrl?.trim() || null},
        map_embed_url = ${data.mapEmbedUrl?.trim() || null},
        updated_at = now()
      where id = 1
    `;
    return mapSettings((await sql`select * from site_settings where id = 1`)[0]!);
  });

export const adminListRegistrations = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<RegistrationItem[]> => {
    await guard(context.userId);
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      tournament_id: number;
      title: string;
      user_id: string | null;
      full_name: string | null;
      email: string | null;
      phone: string | null;
      fide_id: string | null;
      source: string;
      created_at: string;
    }>`
      select r.id, r.tournament_id, t.title, r.user_id, r.full_name, r.email, r.phone, r.fide_id, r.source, r.created_at
      from tournament_registrations r
      join tournaments t on t.id = r.tournament_id
      order by r.created_at desc
    `;
    return rows.map((r) => ({
      id: Number(r.id),
      tournamentId: Number(r.tournament_id),
      tournamentTitle: r.title,
      userId: r.user_id,
      fullName: r.full_name,
      email: r.email,
      phone: r.phone,
      fideId: r.fide_id,
      source: r.source,
      createdAt: r.created_at,
    }));
  });

export const adminDeleteRegistration = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ context, data: id }) => {
    await guard(context.userId);
    const sql = await getSql();
    await sql`delete from tournament_registrations where id = ${id}`;
    return { ok: true };
  });

export const ingestTallyRegistration = createServerFn({ method: "POST" })
  .validator((input: {
    tournamentId: number;
    fullName?: string;
    email?: string;
    phone?: string;
    fideId?: string;
    payload?: unknown;
  }) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      insert into tournament_registrations (tournament_id, full_name, email, phone, fide_id, payload, source)
      values (
        ${data.tournamentId},
        ${data.fullName ?? null},
        ${data.email ?? null},
        ${data.phone ?? null},
        ${data.fideId ?? null},
        ${JSON.stringify(data.payload ?? {})}::jsonb,
        'tally'
      )
    `;
    return { ok: true };
  });
