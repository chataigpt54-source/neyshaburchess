import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import {
  IMAGE_EXTS,
  IMAGE_MIMES,
  MAX_IMAGE_BYTES,
  MAX_PDF_BYTES,
  PDF_MIME,
} from "@/lib/constants";
import { requireAdmin } from "@/lib/require-admin.server";
import { clampFileName } from "@/lib/utils";
import { mapMedia } from "./mappers";
import type { MediaItem } from "@/lib/types";

function extOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i).toLowerCase() : "";
}

function validateUpload(filename: string, mimeType: string, size: number, kind: "image" | "pdf") {
  const ext = extOf(filename);
  if (kind === "pdf") {
    if (mimeType !== PDF_MIME || ext !== ".pdf") {
      throw new Error("فقط فایل PDF پذیرفته می‌شود.");
    }
    if (size > MAX_PDF_BYTES) throw new Error("حجم فایل PDF بیش از حد مجاز است.");
    return;
  }
  if (!(IMAGE_MIMES as readonly string[]).includes(mimeType) || !(IMAGE_EXTS as readonly string[]).includes(ext)) {
    throw new Error("فقط تصویرهای JPG، PNG و WEBP پذیرفته می‌شوند.");
  }
  if (size > MAX_IMAGE_BYTES) throw new Error("حجم تصویر بیش از حد مجاز است.");
}

export const uploadMedia = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { filename: string; mimeType: string; dataBase64: string; kind: "image" | "pdf" }) => input)
  .handler(async ({ context, data }): Promise<MediaItem> => {
    await requireAdmin(context.userId);
    const raw = data.dataBase64.includes(",") ? data.dataBase64.split(",")[1]! : data.dataBase64;
    const size = Math.floor((raw.length * 3) / 4);
    validateUpload(data.filename, data.mimeType, size, data.kind);
    const sql = await getSql();
    const rows = await sql`
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
    return mapMedia(rows[0]!);
  });

export const listMedia = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((input: { kind?: "image" | "pdf"; page?: number } | undefined) => input ?? {})
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const page = Math.max(1, data.page ?? 1);
    const offset = (page - 1) * 24;
    const kind = data.kind;
    const countRows = kind
      ? await sql<{ n: number }>`select count(*)::int as n from media where kind = ${kind}`
      : await sql<{ n: number }>`select count(*)::int as n from media`;
    const rows = kind
      ? await sql`
          select id, filename, mime_type, kind, size_bytes, created_at
          from media where kind = ${kind}
          order by created_at desc limit 24 offset ${offset}
        `
      : await sql`
          select id, filename, mime_type, kind, size_bytes, created_at
          from media order by created_at desc limit 24 offset ${offset}
        `;
    return { items: rows.map(mapMedia), total: countRows[0]?.n ?? 0, page };
  });

export const deleteMedia = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ context, data: id }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    await sql`delete from media where id = ${id}`;
    return { ok: true };
  });
