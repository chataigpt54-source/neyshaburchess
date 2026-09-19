import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-B81SbFjo.mjs";
import { a as IMAGE_MIMES, i as IMAGE_EXTS } from "./constants-B4oS1R5Q.mjs";
import { t as authMiddleware } from "./middleware-BO4Pigeq.mjs";
import { t as clampFileName } from "./utils-Bj1GyghM.mjs";
import { n as requireAdmin } from "./require-admin.server-oqCxN8r_.mjs";
import { n as mapMedia } from "./mappers-QAYMz-ER.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-BIC-PWQy.js
function extOf(name) {
	const i = name.lastIndexOf(".");
	return i >= 0 ? name.slice(i).toLowerCase() : "";
}
function validateUpload(filename, mimeType, size, kind) {
	const ext = extOf(filename);
	if (kind === "pdf") {
		if (mimeType !== "application/pdf" || ext !== ".pdf") throw new Error("فقط فایل PDF پذیرفته می‌شود.");
		if (size > 10485760) throw new Error("حجم فایل PDF بیش از حد مجاز است.");
		return;
	}
	if (!IMAGE_MIMES.includes(mimeType) || !IMAGE_EXTS.includes(ext)) throw new Error("فقط تصویرهای JPG، PNG و WEBP پذیرفته می‌شوند.");
	if (size > 5242880) throw new Error("حجم تصویر بیش از حد مجاز است.");
}
var uploadMedia_createServerFn_handler = createServerRpc({
	id: "7cf17c7d332408878ac256f53f198defbe4e981c8fba6c81cf3e98f14a9c68d3",
	name: "uploadMedia",
	filename: "src/lib/data/media.ts"
}, (opts) => uploadMedia.__executeServer(opts));
var uploadMedia = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(uploadMedia_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	const raw = data.dataBase64.includes(",") ? data.dataBase64.split(",")[1] : data.dataBase64;
	const size = Math.floor(raw.length * 3 / 4);
	validateUpload(data.filename, data.mimeType, size, data.kind);
	const rows = await (await getSql())`
      insert into media (filename, mime_type, kind, size_bytes, data, uploaded_by)
      values (
        ${clampFileName(data.filename)},
        ${data.mimeType},
        ${data.kind},
        ${size},
        ${raw},
        ${context.userId}
      )
      returning id, filename, mime_type, kind, size_bytes, created_at
    `;
	return mapMedia(rows[0]);
});
var listMedia_createServerFn_handler = createServerRpc({
	id: "e72c77b259a266ea88116a9b63fbfc1fd68676ec0f303f0519abb57f95eb4436",
	name: "listMedia",
	filename: "src/lib/data/media.ts"
}, (opts) => listMedia.__executeServer(opts));
var listMedia = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input) => input ?? {}).handler(listMedia_createServerFn_handler, async ({ context, data }) => {
	await requireAdmin(context.userId);
	const sql = await getSql();
	const page = Math.max(1, data.page ?? 1);
	const offset = (page - 1) * 24;
	const kind = data.kind;
	const countRows = kind ? await sql`select count(*)::int as n from media where kind = ${kind}` : await sql`select count(*)::int as n from media`;
	return {
		items: (kind ? await sql`
          select id, filename, mime_type, kind, size_bytes, created_at
          from media where kind = ${kind}
          order by created_at desc limit 24 offset ${offset}
        ` : await sql`
          select id, filename, mime_type, kind, size_bytes, created_at
          from media order by created_at desc limit 24 offset ${offset}
        `).map(mapMedia),
		total: countRows[0]?.n ?? 0,
		page
	};
});
var deleteMedia_createServerFn_handler = createServerRpc({
	id: "91dd3b62835eeb5ed114d32c1443d3320a27210476d6151c2e611a2aba04b71b",
	name: "deleteMedia",
	filename: "src/lib/data/media.ts"
}, (opts) => deleteMedia.__executeServer(opts));
var deleteMedia = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(deleteMedia_createServerFn_handler, async ({ context, data: id }) => {
	await requireAdmin(context.userId);
	await (await getSql())`delete from media where id = ${id}`;
	return { ok: true };
});
//#endregion
export { deleteMedia_createServerFn_handler, listMedia_createServerFn_handler, uploadMedia_createServerFn_handler };
