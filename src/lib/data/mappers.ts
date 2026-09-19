import type {
  GalleryAlbum,
  MediaItem,
  NewsItem,
  PlayerItem,
  SiteSettings,
  TournamentItem,
} from "@/lib/types";

export function mapSettings(row: Record<string, unknown>): SiteSettings {
  return {
    id: Number(row.id),
    siteTitle: String(row.site_title ?? ""),
    description: String(row.description ?? ""),
    email: String(row.email ?? ""),
    phone: (row.phone as string | null) ?? null,
    address: String(row.address ?? ""),
    instagramUrl: (row.instagram_url as string | null) ?? null,
    eitaaUrl: (row.eitaa_url as string | null) ?? null,
    telegramUrl: (row.telegram_url as string | null) ?? null,
    tallySuggestionsUrl: (row.tally_suggestions_url as string | null) ?? null,
    logoMediaId: row.logo_media_id == null ? null : Number(row.logo_media_id),
    mapEmbedUrl: (row.map_embed_url as string | null) ?? null,
  };
}

export function mapNews(row: Record<string, unknown>): NewsItem {
  return {
    id: Number(row.id),
    title: String(row.title),
    slug: String(row.slug),
    summary: String(row.summary ?? ""),
    content: String(row.content ?? ""),
    coverMediaId: row.cover_media_id == null ? null : Number(row.cover_media_id),
    publishedAt: (row.published_at as string | null) ?? null,
    status: (row.status as NewsItem["status"]) ?? "draft",
    createdAt: String(row.created_at ?? ""),
    updatedAt: String(row.updated_at ?? ""),
  };
}

export function mapPlayer(row: Record<string, unknown>): PlayerItem {
  return {
    id: Number(row.id),
    firstName: String(row.first_name),
    lastName: String(row.last_name),
    slug: String(row.slug),
    photoMediaId: row.photo_media_id == null ? null : Number(row.photo_media_id),
    fideId: (row.fide_id as string | null) ?? null,
    bio: String(row.bio ?? ""),
  };
}

export function mapTournament(row: Record<string, unknown>): TournamentItem {
  return {
    id: Number(row.id),
    title: String(row.title),
    slug: String(row.slug),
    description: String(row.description ?? ""),
    coverMediaId: row.cover_media_id == null ? null : Number(row.cover_media_id),
    startDate: (row.start_date as string | null) ?? null,
    endDate: (row.end_date as string | null) ?? null,
    location: (row.location as string | null) ?? null,
    status: (row.status as TournamentItem["status"]) ?? "upcoming",
    tallyUrl: (row.tally_url as string | null) ?? null,
    chessResultsUrl: (row.chess_results_url as string | null) ?? null,
    rulesMediaId: row.rules_media_id == null ? null : Number(row.rules_media_id),
    galleryId: row.gallery_id == null ? null : Number(row.gallery_id),
    sortOrder: Number(row.sort_order ?? 0),
  };
}

export function mapAlbum(row: Record<string, unknown>): GalleryAlbum {
  return {
    id: Number(row.id),
    title: String(row.title),
    slug: String(row.slug),
    description: String(row.description ?? ""),
    coverMediaId: row.cover_media_id == null ? null : Number(row.cover_media_id),
    albumDate: (row.album_date as string | null) ?? null,
    imageCount: row.image_count == null ? undefined : Number(row.image_count),
  };
}

export function mapMedia(row: Record<string, unknown>): MediaItem {
  return {
    id: Number(row.id),
    filename: String(row.filename),
    mimeType: String(row.mime_type),
    kind: row.kind === "pdf" ? "pdf" : "image",
    sizeBytes: Number(row.size_bytes ?? 0),
    createdAt: String(row.created_at ?? ""),
  };
}
