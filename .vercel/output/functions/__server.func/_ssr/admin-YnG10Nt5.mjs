import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-B81SbFjo.mjs";
import { t as authMiddleware } from "./middleware-BO4Pigeq.mjs";
import { a as newsSchema, c as settingsSchema, l as tournamentSchema, n as albumSchema, o as pageSchema, s as playerSchema } from "./validation-BS2fXfa3.mjs";
import { n as requireAdmin } from "./require-admin.server-oqCxN8r_.mjs";
import { a as mapSettings, i as mapPlayer, o as mapTournament, r as mapNews, t as mapAlbum } from "./mappers-QAYMz-ER.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-YnG10Nt5.js
function slugify(input) {
	return input.trim().toLowerCase().replace(/[\s_]+/g, "-").replace(/[^\u0600-\u06FFa-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "") || `item-${Date.now()}`;
}
async function uniqueSlug(base, exists) {
	let slug = slugify(base);
	let n = 2;
	while (await exists(slug)) {
		slug = `${slugify(base)}-${n}`;
		n += 1;
		if (n > 200) break;
	}
	return slug;
}
async function guard(userId) {
	await requireAdmin(userId);
}
var getDashboardStats_createServerFn_handler = createServerRpc({
	id: "193b6cc8d867206ce49c2eda627a292499c960fb8559ee2b2e83b338f59b93b7",
	name: "getDashboardStats",
	filename: "src/lib/data/admin.ts"
}, (opts) => getDashboardStats.__executeServer(opts));
var getDashboardStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getDashboardStats_createServerFn_handler, async ({ context }) => {
	await guard(context.userId);
	const sql = await getSql();
	const [news, players, tournaments, albums, registrations] = await Promise.all([
		sql`select count(*)::int as n from news`,
		sql`select count(*)::int as n from players`,
		sql`select count(*)::int as n from tournaments`,
		sql`select count(*)::int as n from gallery_albums`,
		sql`select count(*)::int as n from tournament_registrations`
	]);
	return {
		news: news[0]?.n ?? 0,
		players: players[0]?.n ?? 0,
		tournaments: tournaments[0]?.n ?? 0,
		albums: albums[0]?.n ?? 0,
		registrations: registrations[0]?.n ?? 0
	};
});
var adminListNews_createServerFn_handler = createServerRpc({
	id: "c7739256af8a48e9a0feceb53cd61e23635b3553dc5aaf9d25940223e97c462c",
	name: "adminListNews",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminListNews.__executeServer(opts));
var adminListNews = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((q) => q ?? "").handler(adminListNews_createServerFn_handler, async ({ context, data: q }) => {
	await guard(context.userId);
	const sql = await getSql();
	const like = q.trim() ? `%${q.trim()}%` : null;
	return (like ? await sql`select * from news where title ilike ${like} order by updated_at desc` : await sql`select * from news order by updated_at desc`).map(mapNews);
});
var adminGetNews_createServerFn_handler = createServerRpc({
	id: "ac8a8283dfdbf86482b7f3f5e5f9a27d4e447e628891381f24a4ced8f73dd3a6",
	name: "adminGetNews",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminGetNews.__executeServer(opts));
var adminGetNews = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(adminGetNews_createServerFn_handler, async ({ context, data: id }) => {
	await guard(context.userId);
	const sql = await getSql();
	const rows = await sql`select * from news where id = ${id} limit 1`;
	if (!rows[0]) return null;
	const item = mapNews(rows[0]);
	const images = await sql`
      select media_id from news_images where news_id = ${id} order by sort_order
    `;
	return {
		...item,
		imageIds: images.map((i) => Number(i.media_id))
	};
});
var adminSaveNews_createServerFn_handler = createServerRpc({
	id: "448ab8245d9c794d493c6c654a64d780da4f9d4b4007227a056f52e422748e8b",
	name: "adminSaveNews",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminSaveNews.__executeServer(opts));
var adminSaveNews = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(adminSaveNews_createServerFn_handler, async ({ context, data }) => {
	await guard(context.userId);
	const parsed = newsSchema.parse(data);
	const sql = await getSql();
	const slug = await uniqueSlug(parsed.slug?.trim() ? slugify(parsed.slug) : slugify(parsed.title), async (s) => {
		return (data.id ? await sql`select id from news where slug = ${s} and id <> ${data.id} limit 1` : await sql`select id from news where slug = ${s} limit 1`).length > 0;
	});
	const publishedAt = parsed.status === "published" ? (/* @__PURE__ */ new Date()).toISOString() : null;
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
		for (let i = 0; i < ids.length; i += 1) await sql`insert into news_images (news_id, media_id, sort_order) values (${data.id}, ${ids[i]}, ${i})`;
		return mapNews(rows[0]);
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
	const created = mapNews(rows[0]);
	const ids = data.imageIds ?? [];
	for (let i = 0; i < ids.length; i += 1) await sql`insert into news_images (news_id, media_id, sort_order) values (${created.id}, ${ids[i]}, ${i})`;
	return created;
});
var adminDeleteNews_createServerFn_handler = createServerRpc({
	id: "30aaeaf9fec2ddb08a6d26e67cd9844623f9eac24f91d5f6cca55901cc3fbc81",
	name: "adminDeleteNews",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminDeleteNews.__executeServer(opts));
var adminDeleteNews = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(adminDeleteNews_createServerFn_handler, async ({ context, data: id }) => {
	await guard(context.userId);
	await (await getSql())`delete from news where id = ${id}`;
	return { ok: true };
});
var adminListPlayers_createServerFn_handler = createServerRpc({
	id: "bc4c4971a54a0db85dd354f7a6d68eaace06cd4bd57a15381d1ad2067d5f2805",
	name: "adminListPlayers",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminListPlayers.__executeServer(opts));
var adminListPlayers = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((q) => q ?? "").handler(adminListPlayers_createServerFn_handler, async ({ context, data: q }) => {
	await guard(context.userId);
	const sql = await getSql();
	const like = q.trim() ? `%${q.trim()}%` : null;
	return (like ? await sql`
          select * from players
          where first_name ilike ${like} or last_name ilike ${like}
          order by last_name, first_name
        ` : await sql`select * from players order by last_name, first_name`).map(mapPlayer);
});
var adminGetPlayer_createServerFn_handler = createServerRpc({
	id: "bddc67b8c37636a2cc4dd073203f9ba2e1198469e2234afb931e546fe20520d6",
	name: "adminGetPlayer",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminGetPlayer.__executeServer(opts));
var adminGetPlayer = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(adminGetPlayer_createServerFn_handler, async ({ context, data: id }) => {
	await guard(context.userId);
	const sql = await getSql();
	const rows = await sql`select * from players where id = ${id} limit 1`;
	if (!rows[0]) return null;
	const player = mapPlayer(rows[0]);
	const ach = await sql`select * from player_achievements where player_id = ${id} order by sort_order, id`;
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
var adminSavePlayer_createServerFn_handler = createServerRpc({
	id: "408a8bebf88440e5eabba874518ea718c9d5adf5f986dfdd115d90465bf6af49",
	name: "adminSavePlayer",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminSavePlayer.__executeServer(opts));
var adminSavePlayer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(adminSavePlayer_createServerFn_handler, async ({ context, data }) => {
	await guard(context.userId);
	const parsed = playerSchema.parse(data);
	const sql = await getSql();
	const slug = await uniqueSlug(parsed.slug?.trim() ? slugify(parsed.slug) : slugify(`${parsed.firstName}-${parsed.lastName}`), async (s) => {
		return (data.id ? await sql`select id from players where slug = ${s} and id <> ${data.id} limit 1` : await sql`select id from players where slug = ${s} limit 1`).length > 0;
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
		id = Number(rows[0].id);
	}
	const list = parsed.achievements ?? [];
	for (let i = 0; i < list.length; i += 1) {
		const a = list[i];
		await sql`
        insert into player_achievements (player_id, title, year, description, sort_order)
        values (${id}, ${a.title}, ${a.year?.trim() || null}, ${a.description ?? ""}, ${i})
      `;
	}
	return { id };
});
var adminDeletePlayer_createServerFn_handler = createServerRpc({
	id: "c1e65311aca1cf5dcdb22d65f55e0ff7b7f96363043a479558d22306676bed30",
	name: "adminDeletePlayer",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminDeletePlayer.__executeServer(opts));
var adminDeletePlayer = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(adminDeletePlayer_createServerFn_handler, async ({ context, data: id }) => {
	await guard(context.userId);
	await (await getSql())`delete from players where id = ${id}`;
	return { ok: true };
});
var adminListTournaments_createServerFn_handler = createServerRpc({
	id: "8557f0f4ee9135b8442d2028d2146c387d28b8013bb8b8a5d617151b9969f4c5",
	name: "adminListTournaments",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminListTournaments.__executeServer(opts));
var adminListTournaments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(adminListTournaments_createServerFn_handler, async ({ context }) => {
	await guard(context.userId);
	return (await (await getSql())`select * from tournaments order by sort_order asc, id asc`).map(mapTournament);
});
var adminGetTournament_createServerFn_handler = createServerRpc({
	id: "4e39e05dabe665a847edce610e0ef988a13e1d8d652c143abdc80f5c63409552",
	name: "adminGetTournament",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminGetTournament.__executeServer(opts));
var adminGetTournament = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(adminGetTournament_createServerFn_handler, async ({ context, data: id }) => {
	await guard(context.userId);
	const rows = await (await getSql())`select * from tournaments where id = ${id} limit 1`;
	if (!rows[0]) return null;
	return mapTournament(rows[0]);
});
var adminSaveTournament_createServerFn_handler = createServerRpc({
	id: "370e7cd5faf72dbcbf184fc92ef8a608f847598d48346ce227925ff84b7dd87f",
	name: "adminSaveTournament",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminSaveTournament.__executeServer(opts));
var adminSaveTournament = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(adminSaveTournament_createServerFn_handler, async ({ context, data }) => {
	await guard(context.userId);
	const parsed = tournamentSchema.parse(data);
	const sql = await getSql();
	const slug = await uniqueSlug(parsed.slug?.trim() ? slugify(parsed.slug) : slugify(parsed.title), async (s) => {
		return (data.id ? await sql`select id from tournaments where slug = ${s} and id <> ${data.id} limit 1` : await sql`select id from tournaments where slug = ${s} limit 1`).length > 0;
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
		return {
			id: data.id,
			slug
		};
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
	return {
		id: Number(rows[0].id),
		slug
	};
});
var adminDeleteTournament_createServerFn_handler = createServerRpc({
	id: "2ed0d976a4390483a8ab7f30ea21a74d6f1e58cc12044a55124c8e01a0053b94",
	name: "adminDeleteTournament",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminDeleteTournament.__executeServer(opts));
var adminDeleteTournament = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(adminDeleteTournament_createServerFn_handler, async ({ context, data: id }) => {
	await guard(context.userId);
	await (await getSql())`delete from tournaments where id = ${id}`;
	return { ok: true };
});
var adminClearRulesPdf_createServerFn_handler = createServerRpc({
	id: "8dd74e496f3ba8bbd1556dd65d27af70918136b74c7f2c2b9c33b553c139912c",
	name: "adminClearRulesPdf",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminClearRulesPdf.__executeServer(opts));
var adminClearRulesPdf = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((tournamentId) => tournamentId).handler(adminClearRulesPdf_createServerFn_handler, async ({ context, data: tournamentId }) => {
	await guard(context.userId);
	await (await getSql())`update tournaments set rules_media_id = null, updated_at = now() where id = ${tournamentId}`;
	return { ok: true };
});
var adminListAlbums_createServerFn_handler = createServerRpc({
	id: "d61ea2ba5233fd220dac180cdf4aa7952a9f37e0dfea78adad3e9c52023a77f1",
	name: "adminListAlbums",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminListAlbums.__executeServer(opts));
var adminListAlbums = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(adminListAlbums_createServerFn_handler, async ({ context }) => {
	await guard(context.userId);
	return (await (await getSql())`
      select a.*, (select count(*)::int from gallery_images g where g.album_id = a.id) as image_count
      from gallery_albums a order by a.created_at desc
    `).map(mapAlbum);
});
var adminGetAlbum_createServerFn_handler = createServerRpc({
	id: "1f4393c13155898dcae888a31d84372fb9f91e31e5a27afd7bf072689b9c817b",
	name: "adminGetAlbum",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminGetAlbum.__executeServer(opts));
var adminGetAlbum = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(adminGetAlbum_createServerFn_handler, async ({ context, data: id }) => {
	await guard(context.userId);
	const sql = await getSql();
	const rows = await sql`select * from gallery_albums where id = ${id} limit 1`;
	if (!rows[0]) return null;
	const album = mapAlbum(rows[0]);
	const images = await sql`select * from gallery_images where album_id = ${id} order by sort_order, id`;
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
var adminSaveAlbum_createServerFn_handler = createServerRpc({
	id: "d0e1d09040c45140dfa0ee0f3d454803081aa9250652731cb9706aa0f98d026f",
	name: "adminSaveAlbum",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminSaveAlbum.__executeServer(opts));
var adminSaveAlbum = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(adminSaveAlbum_createServerFn_handler, async ({ context, data }) => {
	await guard(context.userId);
	const parsed = albumSchema.parse(data);
	const sql = await getSql();
	const slug = await uniqueSlug(slugify(parsed.title), async (s) => {
		return (data.id ? await sql`select id from gallery_albums where slug = ${s} and id <> ${data.id} limit 1` : await sql`select id from gallery_albums where slug = ${s} limit 1`).length > 0;
	});
	const date = parsed.albumDate?.trim() || null;
	let id = data.id;
	if (id) await sql`
        update gallery_albums set
          title = ${parsed.title},
          slug = ${slug},
          description = ${parsed.description ?? ""},
          album_date = ${date},
          cover_media_id = ${parsed.coverMediaId ?? null},
          updated_at = now()
        where id = ${id}
      `;
	else {
		const rows = await sql`
        insert into gallery_albums (title, slug, description, album_date, cover_media_id)
        values (${parsed.title}, ${slug}, ${parsed.description ?? ""}, ${date}, ${parsed.coverMediaId ?? null})
        returning id
      `;
		id = Number(rows[0].id);
	}
	if (data.imageIds) {
		await sql`delete from gallery_images where album_id = ${id}`;
		for (let i = 0; i < data.imageIds.length; i += 1) await sql`
          insert into gallery_images (album_id, media_id, sort_order)
          values (${id}, ${data.imageIds[i]}, ${i})
        `;
		if (!parsed.coverMediaId && data.imageIds[0]) await sql`update gallery_albums set cover_media_id = ${data.imageIds[0]} where id = ${id}`;
	}
	return {
		id,
		slug
	};
});
var adminDeleteAlbum_createServerFn_handler = createServerRpc({
	id: "f05dddf08f64ce6e4182c9765459f8e3970e7039dae626ae67ea153b52413c1c",
	name: "adminDeleteAlbum",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminDeleteAlbum.__executeServer(opts));
var adminDeleteAlbum = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(adminDeleteAlbum_createServerFn_handler, async ({ context, data: id }) => {
	await guard(context.userId);
	await (await getSql())`delete from gallery_albums where id = ${id}`;
	return { ok: true };
});
var adminSavePage_createServerFn_handler = createServerRpc({
	id: "d9401d5b8750aa12569f4d598b9fc3b9ddf66f332b20846e5e1961d74aa9b687",
	name: "adminSavePage",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminSavePage.__executeServer(opts));
var adminSavePage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => pageSchema.parse(input)).handler(adminSavePage_createServerFn_handler, async ({ context, data }) => {
	await guard(context.userId);
	await (await getSql())`
      insert into static_pages (slug, title, content, updated_at)
      values (${data.slug}, ${data.title}, ${data.content ?? ""}, now())
      on conflict (slug) do update set
        title = excluded.title,
        content = excluded.content,
        updated_at = now()
    `;
	return { ok: true };
});
var adminSaveSettings_createServerFn_handler = createServerRpc({
	id: "90aaad9fad309c9fd012bfd7725612526582efce5576364230e9b4b4a83a37bd",
	name: "adminSaveSettings",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminSaveSettings.__executeServer(opts));
var adminSaveSettings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => settingsSchema.parse(input)).handler(adminSaveSettings_createServerFn_handler, async ({ context, data }) => {
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
	return mapSettings((await sql`select * from site_settings where id = 1`)[0]);
});
var adminListRegistrations_createServerFn_handler = createServerRpc({
	id: "da08a48629628460cb11c513d47fa102436eb15713c7f2939af4c8aadd32c35c",
	name: "adminListRegistrations",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminListRegistrations.__executeServer(opts));
var adminListRegistrations = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(adminListRegistrations_createServerFn_handler, async ({ context }) => {
	await guard(context.userId);
	return (await (await getSql())`
      select r.id, r.tournament_id, t.title, r.user_id, r.full_name, r.email, r.phone, r.fide_id, r.source, r.created_at
      from tournament_registrations r
      join tournaments t on t.id = r.tournament_id
      order by r.created_at desc
    `).map((r) => ({
		id: Number(r.id),
		tournamentId: Number(r.tournament_id),
		tournamentTitle: r.title,
		userId: r.user_id,
		fullName: r.full_name,
		email: r.email,
		phone: r.phone,
		fideId: r.fide_id,
		source: r.source,
		createdAt: r.created_at
	}));
});
var adminDeleteRegistration_createServerFn_handler = createServerRpc({
	id: "ebddda2755a91cfc184df989e50eee01cb2387d0c8ea4e6ebb59c6d193a4659b",
	name: "adminDeleteRegistration",
	filename: "src/lib/data/admin.ts"
}, (opts) => adminDeleteRegistration.__executeServer(opts));
var adminDeleteRegistration = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(adminDeleteRegistration_createServerFn_handler, async ({ context, data: id }) => {
	await guard(context.userId);
	await (await getSql())`delete from tournament_registrations where id = ${id}`;
	return { ok: true };
});
var ingestTallyRegistration_createServerFn_handler = createServerRpc({
	id: "e255b120da1692002e244962a570423296a6712ffcb14a37dfc205f3dea73586",
	name: "ingestTallyRegistration",
	filename: "src/lib/data/admin.ts"
}, (opts) => ingestTallyRegistration.__executeServer(opts));
var ingestTallyRegistration = createServerFn({ method: "POST" }).validator((input) => input).handler(ingestTallyRegistration_createServerFn_handler, async ({ data }) => {
	await (await getSql())`
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
//#endregion
export { adminClearRulesPdf_createServerFn_handler, adminDeleteAlbum_createServerFn_handler, adminDeleteNews_createServerFn_handler, adminDeletePlayer_createServerFn_handler, adminDeleteRegistration_createServerFn_handler, adminDeleteTournament_createServerFn_handler, adminGetAlbum_createServerFn_handler, adminGetNews_createServerFn_handler, adminGetPlayer_createServerFn_handler, adminGetTournament_createServerFn_handler, adminListAlbums_createServerFn_handler, adminListNews_createServerFn_handler, adminListPlayers_createServerFn_handler, adminListRegistrations_createServerFn_handler, adminListTournaments_createServerFn_handler, adminSaveAlbum_createServerFn_handler, adminSaveNews_createServerFn_handler, adminSavePage_createServerFn_handler, adminSavePlayer_createServerFn_handler, adminSaveSettings_createServerFn_handler, adminSaveTournament_createServerFn_handler, getDashboardStats_createServerFn_handler, ingestTallyRegistration_createServerFn_handler };
