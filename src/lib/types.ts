export type TournamentStatus = "upcoming" | "ongoing" | "finished";
export type PublishStatus = "draft" | "published";
export type MediaKind = "image" | "pdf";

export type SiteSettings = {
  id: number;
  siteTitle: string;
  description: string;
  email: string;
  phone: string | null;
  address: string;
  instagramUrl: string | null;
  eitaaUrl: string | null;
  telegramUrl: string | null;
  tallySuggestionsUrl: string | null;
  logoMediaId: number | null;
  mapEmbedUrl: string | null;
};

export type NewsItem = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverMediaId: number | null;
  publishedAt: string | null;
  status: PublishStatus;
  createdAt: string;
  updatedAt: string;
};

export type PlayerItem = {
  id: number;
  firstName: string;
  lastName: string;
  slug: string;
  photoMediaId: number | null;
  fideId: string | null;
  bio: string;
};

export type PlayerAchievement = {
  id: number;
  playerId: number;
  title: string;
  year: string | null;
  description: string;
  sortOrder: number;
};

export type TournamentItem = {
  id: number;
  title: string;
  slug: string;
  description: string;
  coverMediaId: number | null;
  startDate: string | null;
  endDate: string | null;
  location: string | null;
  status: TournamentStatus;
  tallyUrl: string | null;
  chessResultsUrl: string | null;
  rulesMediaId: number | null;
  galleryId: number | null;
  sortOrder: number;
};

export type GalleryAlbum = {
  id: number;
  title: string;
  slug: string;
  description: string;
  coverMediaId: number | null;
  albumDate: string | null;
  imageCount?: number;
};

export type GalleryImage = {
  id: number;
  albumId: number;
  mediaId: number;
  sortOrder: number;
  caption: string;
};

export type MediaItem = {
  id: number;
  filename: string;
  mimeType: string;
  kind: MediaKind;
  sizeBytes: number;
  createdAt: string;
};

export type StaticPage = {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
};

export type DashboardStats = {
  news: number;
  players: number;
  tournaments: number;
  albums: number;
  registrations: number;
};

export type RegistrationItem = {
  id: number;
  tournamentId: number;
  tournamentTitle: string;
  userId: string | null;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  fideId: string | null;
  source: string;
  createdAt: string;
};

export type MemberProfile = {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  fideId: string | null;
  role: "member" | "admin";
  email: string | null;
};
