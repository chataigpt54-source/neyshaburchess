import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { PAGE_SIZE } from "@/lib/constants";
import { ensureAdminSeed } from "@/lib/seed-admin.server";
import { mapAlbum, mapNews, mapPlayer, mapSettings, mapTournament } from "./mappers";
import type {
  GalleryAlbum,
  GalleryImage,
  NewsItem,
  PlayerAchievement,
  PlayerItem,
  SiteSettings,
  StaticPage,
  TournamentItem,
} from "@/lib/types";

export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  await ensureAdminSeed();
  const sql = await getSql();
  const rows = await sql`select * from site_settings where id = 1 limit 1`;
  if (!rows[0]) return null;
  return mapSettings(rows[0]);
});

export const getStaticPage = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<StaticPage | null> => {
    const sql = await getSql();
    const rows = await sql<{ slug: string; title: string; content: string; updated_at: string }>`
      select slug, title, content, updated_at from static_pages where slug = ${slug} limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    return {
      slug: row.slug,
      title: row.title,
      content: row.content,
      updatedAt: row.updated_at,
    };
  });

export const listPublishedNews = createServerFn({ method: "GET" })
  .validator((input: { q?: string; page?: number } | undefined) => input ?? {})
  .handler(async ({ data }): Promise<{ items: NewsItem[]; total: number; page: number }> => {
    const sql = await getSql();
    const page = Math.max(1, data.page ?? 1);
    const q = data.q?.trim() ?? "";
    const offset = (page - 1) * PAGE_SIZE;
    const like = q ? `%${q}%` : null;
    const countRows = like
      ? await sql<{ n: number }>`
          select count(*)::int as n from news
          where status = 'published' and (title ilike ${like} or summary ilike ${like})
        `
      : await sql<{ n: number }>`select count(*)::int as n from news where status = 'published'`;
    const rows = like
      ? await sql`
          select * from news
          where status = 'published' and (title ilike ${like} or summary ilike ${like})
          order by coalesce(published_at, created_at) desc
          limit ${PAGE_SIZE} offset ${offset}
        `
      : await sql`
          select * from news where status = 'published'
          order by coalesce(published_at, created_at) desc
          limit ${PAGE_SIZE} offset ${offset}
        `;
    return { items: rows.map(mapNews), total: countRows[0]?.n ?? 0, page };
  });

export const getNewsBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<(NewsItem & { imageIds: number[] }) | null> => {
    const sql = await getSql();
    const rows = await sql`
      select * from news where slug = ${slug} and status = 'published' limit 1
    `;
    if (!rows[0]) return null;
    const news = mapNews(rows[0]);
    const images = await sql<{ media_id: number }>`
      select media_id from news_images where news_id = ${news.id} order by sort_order
    `;
    return { ...news, imageIds: images.map((i) => Number(i.media_id)) };
  });

export const listPlayers = createServerFn({ method: "GET" })
  .validator((input: { q?: string; page?: number } | undefined) => input ?? {})
  .handler(async ({ data }): Promise<{ items: PlayerItem[]; total: number; page: number }> => {
    const sql = await getSql();
    const page = Math.max(1, data.page ?? 1);
    const q = data.q?.trim() ?? "";
    const offset = (page - 1) * PAGE_SIZE;
    const like = q ? `%${q}%` : null;
    const countRows = like
      ? await sql<{ n: number }>`
          select count(*)::int as n from players
          where first_name ilike ${like} or last_name ilike ${like} or coalesce(fide_id,'') ilike ${like}
        `
      : await sql<{ n: number }>`select count(*)::int as n from players`;
    const rows = like
      ? await sql`
          select * from players
          where first_name ilike ${like} or last_name ilike ${like} or coalesce(fide_id,'') ilike ${like}
          order by last_name, first_name
          limit ${PAGE_SIZE} offset ${offset}
        `
      : await sql`
          select * from players order by last_name, first_name
          limit ${PAGE_SIZE} offset ${offset}
        `;
    return { items: rows.map(mapPlayer), total: countRows[0]?.n ?? 0, page };
  });

export const getPlayerBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<(PlayerItem & { achievements: PlayerAchievement[] }) | null> => {
    const sql = await getSql();
    const rows = await sql`select * from players where slug = ${slug} limit 1`;
    if (!rows[0]) return null;
    const player = mapPlayer(rows[0]);
    const ach = await sql<{
      id: number;
      player_id: number;
      title: string;
      year: string | null;
      description: string;
      sort_order: number;
    }>`
      select * from player_achievements where player_id = ${player.id} order by sort_order, id
    `;
    return {
      ...player,
      achievements: ach.map((a) => ({
        id: Number(a.id),
        playerId: Number(a.player_id),
        title: a.title,
        year: a.year,
        description: a.description,
        sortOrder: Number(a.sort_order),
      })),
    };
  });

export const listTournaments = createServerFn({ method: "GET" })
  .validator((input: { q?: string; status?: string } | undefined) => input ?? {})
  .handler(async ({ data }): Promise<TournamentItem[]> => {
    const sql = await getSql();
    const q = data.q?.trim() ?? "";
    const status = data.status?.trim() ?? "";
    const like = q ? `%${q}%` : null;
    if (like && status) {
      const rows = await sql`
        select * from tournaments
        where status = ${status} and title ilike ${like}
        order by sort_order asc, id asc
      `;
      return rows.map(mapTournament);
    }
    if (like) {
      const rows = await sql`
        select * from tournaments where title ilike ${like} order by sort_order asc, id asc
      `;
      return rows.map(mapTournament);
    }
    if (status) {
      const rows = await sql`
        select * from tournaments where status = ${status} order by sort_order asc, id asc
      `;
      return rows.map(mapTournament);
    }
    const rows = await sql`select * from tournaments order by sort_order asc, id asc`;
    return rows.map(mapTournament);
  });

export const getTournamentBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const sql = await getSql();
    const rows = await sql`select * from tournaments where slug = ${slug} limit 1`;
    if (!rows[0]) return null;
    return mapTournament(rows[0]);
  });

export const listGalleryAlbums = createServerFn({ method: "GET" }).handler(
  async (): Promise<GalleryAlbum[]> => {
    const sql = await getSql();
    const rows = await sql`
      select a.*, (select count(*)::int from gallery_images g where g.album_id = a.id) as image_count
      from gallery_albums a
      order by coalesce(a.album_date, a.created_at::date) desc, a.id desc
    `;
    return rows.map(mapAlbum);
  },
);

export const getGalleryAlbum = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<(GalleryAlbum & { images: GalleryImage[] }) | null> => {
    const sql = await getSql();
    const rows = await sql`select * from gallery_albums where slug = ${slug} limit 1`;
    if (!rows[0]) return null;
    const album = mapAlbum(rows[0]);
    const images = await sql<{
      id: number;
      album_id: number;
      media_id: number;
      sort_order: number;
      caption: string;
    }>`
      select * from gallery_images where album_id = ${album.id} order by sort_order, id
    `;
    return {
      ...album,
      images: images.map((img) => ({
        id: Number(img.id),
        albumId: Number(img.album_id),
        mediaId: Number(img.media_id),
        sortOrder: Number(img.sort_order),
        caption: img.caption,
      })),
    };
  });

export const getGalleryAlbumById = createServerFn({ method: "GET" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    const rows = await sql<{ slug: string }>`select slug from gallery_albums where id = ${id} limit 1`;
    if (!rows[0]) return null;
    return getGalleryAlbum({ data: rows[0].slug });
  });

export const getHomePayload = createServerFn({ method: "GET" }).handler(async () => {
  await ensureAdminSeed();
  const [settings, news, tournaments, about] = await Promise.all([
    getSiteSettings(),
    listPublishedNews({ data: { page: 1 } }),
    listTournaments({ data: {} }),
    getStaticPage({ data: "about" }),
  ]);
  return {
    settings,
    news: news.items.slice(0, 3),
    tournaments,
    about,
  };
});

export type HomePayload = Awaited<ReturnType<typeof getHomePayload>>;
export type { SiteSettings };
