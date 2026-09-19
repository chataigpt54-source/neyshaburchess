import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-B81SbFjo.mjs";
import { a as mapSettings, i as mapPlayer, o as mapTournament, r as mapNews, t as mapAlbum } from "./mappers-QAYMz-ER.mjs";
import { ensureAdminSeed } from "./seed-admin.server-DS1zKlLD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-Bxbd0ZyH.js
var getSiteSettings_createServerFn_handler = createServerRpc({
	id: "df010008139345bbbf3a642bca453995b66a7131470b17d62583d04c404cdf3a",
	name: "getSiteSettings",
	filename: "src/lib/data/public.ts"
}, (opts) => getSiteSettings.__executeServer(opts));
var getSiteSettings = createServerFn({ method: "GET" }).handler(getSiteSettings_createServerFn_handler, async () => {
	await ensureAdminSeed();
	const rows = await (await getSql())`select * from site_settings where id = 1 limit 1`;
	if (!rows[0]) return null;
	return mapSettings(rows[0]);
});
var getStaticPage_createServerFn_handler = createServerRpc({
	id: "533008cb7a07ff6fe6dc32725c0bf3f86d79699570ad0d482cdc41904805429a",
	name: "getStaticPage",
	filename: "src/lib/data/public.ts"
}, (opts) => getStaticPage.__executeServer(opts));
var getStaticPage = createServerFn({ method: "GET" }).validator((slug) => slug).handler(getStaticPage_createServerFn_handler, async ({ data: slug }) => {
	const row = (await (await getSql())`
      select slug, title, content, updated_at from static_pages where slug = ${slug} limit 1
    `)[0];
	if (!row) return null;
	return {
		slug: row.slug,
		title: row.title,
		content: row.content,
		updatedAt: row.updated_at
	};
});
var listPublishedNews_createServerFn_handler = createServerRpc({
	id: "0af27399689db4f09d0670e822fb5d7f5e0e5330717c704ca5d37e36b66c7b8e",
	name: "listPublishedNews",
	filename: "src/lib/data/public.ts"
}, (opts) => listPublishedNews.__executeServer(opts));
var listPublishedNews = createServerFn({ method: "GET" }).validator((input) => input ?? {}).handler(listPublishedNews_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const page = Math.max(1, data.page ?? 1);
	const q = data.q?.trim() ?? "";
	const offset = (page - 1) * 12;
	const like = q ? `%${q}%` : null;
	const countRows = like ? await sql`
          select count(*)::int as n from news
          where status = 'published' and (title ilike ${like} or summary ilike ${like})
        ` : await sql`select count(*)::int as n from news where status = 'published'`;
	return {
		items: (like ? await sql`
          select * from news
          where status = 'published' and (title ilike ${like} or summary ilike ${like})
          order by coalesce(published_at, created_at) desc
          limit ${12} offset ${offset}
        ` : await sql`
          select * from news where status = 'published'
          order by coalesce(published_at, created_at) desc
          limit ${12} offset ${offset}
        `).map(mapNews),
		total: countRows[0]?.n ?? 0,
		page
	};
});
var getNewsBySlug_createServerFn_handler = createServerRpc({
	id: "c6839250d04321e17a8d9677bac26f79318c2d98046776f3e5077870263f5ba7",
	name: "getNewsBySlug",
	filename: "src/lib/data/public.ts"
}, (opts) => getNewsBySlug.__executeServer(opts));
var getNewsBySlug = createServerFn({ method: "GET" }).validator((slug) => slug).handler(getNewsBySlug_createServerFn_handler, async ({ data: slug }) => {
	const sql = await getSql();
	const rows = await sql`
      select * from news where slug = ${slug} and status = 'published' limit 1
    `;
	if (!rows[0]) return null;
	const news = mapNews(rows[0]);
	const images = await sql`
      select media_id from news_images where news_id = ${news.id} order by sort_order
    `;
	return {
		...news,
		imageIds: images.map((i) => Number(i.media_id))
	};
});
var listPlayers_createServerFn_handler = createServerRpc({
	id: "ab0d81aab5538a51dd8cbe79382f1e2369270897d868c472be80735c9db85849",
	name: "listPlayers",
	filename: "src/lib/data/public.ts"
}, (opts) => listPlayers.__executeServer(opts));
var listPlayers = createServerFn({ method: "GET" }).validator((input) => input ?? {}).handler(listPlayers_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const page = Math.max(1, data.page ?? 1);
	const q = data.q?.trim() ?? "";
	const offset = (page - 1) * 12;
	const like = q ? `%${q}%` : null;
	const countRows = like ? await sql`
          select count(*)::int as n from players
          where first_name ilike ${like} or last_name ilike ${like} or coalesce(fide_id,'') ilike ${like}
        ` : await sql`select count(*)::int as n from players`;
	return {
		items: (like ? await sql`
          select * from players
          where first_name ilike ${like} or last_name ilike ${like} or coalesce(fide_id,'') ilike ${like}
          order by last_name, first_name
          limit ${12} offset ${offset}
        ` : await sql`
          select * from players order by last_name, first_name
          limit ${12} offset ${offset}
        `).map(mapPlayer),
		total: countRows[0]?.n ?? 0,
		page
	};
});
var getPlayerBySlug_createServerFn_handler = createServerRpc({
	id: "3583408a7df54fcc0917acf1958922b5d2120f1093f3a9a04c0a0a6fcc903445",
	name: "getPlayerBySlug",
	filename: "src/lib/data/public.ts"
}, (opts) => getPlayerBySlug.__executeServer(opts));
var getPlayerBySlug = createServerFn({ method: "GET" }).validator((slug) => slug).handler(getPlayerBySlug_createServerFn_handler, async ({ data: slug }) => {
	const sql = await getSql();
	const rows = await sql`select * from players where slug = ${slug} limit 1`;
	if (!rows[0]) return null;
	const player = mapPlayer(rows[0]);
	const ach = await sql`
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
			sortOrder: Number(a.sort_order)
		}))
	};
});
var listTournaments_createServerFn_handler = createServerRpc({
	id: "7b82ab4766298bac9056352a9a402328744fd6e6ba43ccffd50089c748bce2cf",
	name: "listTournaments",
	filename: "src/lib/data/public.ts"
}, (opts) => listTournaments.__executeServer(opts));
var listTournaments = createServerFn({ method: "GET" }).validator((input) => input ?? {}).handler(listTournaments_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const q = data.q?.trim() ?? "";
	const status = data.status?.trim() ?? "";
	const like = q ? `%${q}%` : null;
	if (like && status) return (await sql`
        select * from tournaments
        where status = ${status} and title ilike ${like}
        order by sort_order asc, id asc
      `).map(mapTournament);
	if (like) return (await sql`
        select * from tournaments where title ilike ${like} order by sort_order asc, id asc
      `).map(mapTournament);
	if (status) return (await sql`
        select * from tournaments where status = ${status} order by sort_order asc, id asc
      `).map(mapTournament);
	return (await sql`select * from tournaments order by sort_order asc, id asc`).map(mapTournament);
});
var getTournamentBySlug_createServerFn_handler = createServerRpc({
	id: "945079eebc00bd5c4ae95f4daa0f8eb39771d6e8fe9021e66424e9ad6c6d82d7",
	name: "getTournamentBySlug",
	filename: "src/lib/data/public.ts"
}, (opts) => getTournamentBySlug.__executeServer(opts));
var getTournamentBySlug = createServerFn({ method: "GET" }).validator((slug) => slug).handler(getTournamentBySlug_createServerFn_handler, async ({ data: slug }) => {
	const rows = await (await getSql())`select * from tournaments where slug = ${slug} limit 1`;
	if (!rows[0]) return null;
	return mapTournament(rows[0]);
});
var listGalleryAlbums_createServerFn_handler = createServerRpc({
	id: "457bb8ae33e2361330b6b6217b7d219ecf1fce1c084e7c7175d900c8d9af38cc",
	name: "listGalleryAlbums",
	filename: "src/lib/data/public.ts"
}, (opts) => listGalleryAlbums.__executeServer(opts));
var listGalleryAlbums = createServerFn({ method: "GET" }).handler(listGalleryAlbums_createServerFn_handler, async () => {
	return (await (await getSql())`
      select a.*, (select count(*)::int from gallery_images g where g.album_id = a.id) as image_count
      from gallery_albums a
      order by coalesce(a.album_date, a.created_at::date) desc, a.id desc
    `).map(mapAlbum);
});
var getGalleryAlbum_createServerFn_handler = createServerRpc({
	id: "d763f68a1393b4fa4534cb3de7a867e0a607a3edf5f8d242d4f4898cfedddc5c",
	name: "getGalleryAlbum",
	filename: "src/lib/data/public.ts"
}, (opts) => getGalleryAlbum.__executeServer(opts));
var getGalleryAlbum = createServerFn({ method: "GET" }).validator((slug) => slug).handler(getGalleryAlbum_createServerFn_handler, async ({ data: slug }) => {
	const sql = await getSql();
	const rows = await sql`select * from gallery_albums where slug = ${slug} limit 1`;
	if (!rows[0]) return null;
	const album = mapAlbum(rows[0]);
	const images = await sql`
      select * from gallery_images where album_id = ${album.id} order by sort_order, id
    `;
	return {
		...album,
		images: images.map((img) => ({
			id: Number(img.id),
			albumId: Number(img.album_id),
			mediaId: Number(img.media_id),
			sortOrder: Number(img.sort_order),
			caption: img.caption
		}))
	};
});
var getGalleryAlbumById_createServerFn_handler = createServerRpc({
	id: "bc8f1f66dbe1a6f41347f220cb714331c975a7acf0038a29bcd7dae6046c266a",
	name: "getGalleryAlbumById",
	filename: "src/lib/data/public.ts"
}, (opts) => getGalleryAlbumById.__executeServer(opts));
var getGalleryAlbumById = createServerFn({ method: "GET" }).validator((id) => id).handler(getGalleryAlbumById_createServerFn_handler, async ({ data: id }) => {
	const rows = await (await getSql())`select slug from gallery_albums where id = ${id} limit 1`;
	if (!rows[0]) return null;
	return getGalleryAlbum({ data: rows[0].slug });
});
var getHomePayload_createServerFn_handler = createServerRpc({
	id: "af9418ca9547c5d680a7e25a7246c265a2f3c4e027a105a9e73d5cff7dc9a681",
	name: "getHomePayload",
	filename: "src/lib/data/public.ts"
}, (opts) => getHomePayload.__executeServer(opts));
var getHomePayload = createServerFn({ method: "GET" }).handler(getHomePayload_createServerFn_handler, async () => {
	await ensureAdminSeed();
	const [settings, news, tournaments, about] = await Promise.all([
		getSiteSettings(),
		listPublishedNews({ data: { page: 1 } }),
		listTournaments({ data: {} }),
		getStaticPage({ data: "about" })
	]);
	return {
		settings,
		news: news.items.slice(0, 3),
		tournaments,
		about
	};
});
//#endregion
export { getGalleryAlbumById_createServerFn_handler, getGalleryAlbum_createServerFn_handler, getHomePayload_createServerFn_handler, getNewsBySlug_createServerFn_handler, getPlayerBySlug_createServerFn_handler, getSiteSettings_createServerFn_handler, getStaticPage_createServerFn_handler, getTournamentBySlug_createServerFn_handler, listGalleryAlbums_createServerFn_handler, listPlayers_createServerFn_handler, listPublishedNews_createServerFn_handler, listTournaments_createServerFn_handler };
