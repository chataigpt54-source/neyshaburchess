-- هیأت شطرنج شهرستان نیشابور — application schema

create table if not exists profiles (
  user_id text primary key,
  first_name text not null default '',
  last_name text not null default '',
  phone text,
  fide_id text,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_role_chk check (role in ('member', 'admin'))
);

create table if not exists media (
  id serial primary key,
  filename text not null,
  mime_type text not null,
  kind text not null,
  size_bytes integer not null,
  data text not null,
  uploaded_by text,
  created_at timestamptz not null default now(),
  constraint media_kind_chk check (kind in ('image', 'pdf'))
);

create table if not exists news (
  id serial primary key,
  title text not null,
  slug text not null unique,
  summary text not null default '',
  content text not null default '',
  cover_media_id integer references media (id) on delete set null,
  published_at timestamptz,
  status text not null default 'draft',
  created_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint news_status_chk check (status in ('draft', 'published'))
);

create table if not exists news_images (
  id serial primary key,
  news_id integer not null references news (id) on delete cascade,
  media_id integer not null references media (id) on delete cascade,
  sort_order integer not null default 0
);

create table if not exists players (
  id serial primary key,
  first_name text not null,
  last_name text not null,
  slug text not null unique,
  photo_media_id integer references media (id) on delete set null,
  fide_id text,
  bio text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists player_achievements (
  id serial primary key,
  player_id integer not null references players (id) on delete cascade,
  title text not null,
  year text,
  description text not null default '',
  sort_order integer not null default 0
);

create table if not exists gallery_albums (
  id serial primary key,
  title text not null,
  slug text not null unique,
  description text not null default '',
  cover_media_id integer references media (id) on delete set null,
  album_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gallery_images (
  id serial primary key,
  album_id integer not null references gallery_albums (id) on delete cascade,
  media_id integer not null references media (id) on delete cascade,
  sort_order integer not null default 0,
  caption text not null default ''
);

create table if not exists tournaments (
  id serial primary key,
  title text not null,
  slug text not null unique,
  description text not null default '',
  cover_media_id integer references media (id) on delete set null,
  start_date date,
  end_date date,
  location text,
  status text not null default 'upcoming',
  tally_url text,
  chess_results_url text,
  rules_media_id integer references media (id) on delete set null,
  gallery_id integer references gallery_albums (id) on delete set null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tournaments_status_chk check (status in ('upcoming', 'ongoing', 'finished'))
);

create table if not exists tournament_registrations (
  id serial primary key,
  tournament_id integer not null references tournaments (id) on delete cascade,
  user_id text,
  full_name text,
  email text,
  phone text,
  fide_id text,
  payload jsonb,
  source text not null default 'tally',
  created_at timestamptz not null default now()
);

create table if not exists static_pages (
  slug text primary key,
  title text not null,
  content text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists site_settings (
  id integer primary key default 1,
  site_title text not null,
  description text not null default '',
  email text not null,
  phone text,
  address text not null,
  instagram_url text,
  eitaa_url text,
  telegram_url text,
  tally_suggestions_url text,
  logo_media_id integer references media (id) on delete set null,
  map_embed_url text,
  updated_at timestamptz not null default now()
);

create table if not exists login_attempts (
  key text primary key,
  attempts integer not null default 0,
  window_started_at timestamptz not null default now()
);

create index if not exists news_status_idx on news (status, published_at desc);
create index if not exists news_slug_idx on news (slug);
create index if not exists players_slug_idx on players (slug);
create index if not exists tournaments_status_idx on tournaments (status, sort_order);
create index if not exists tournaments_slug_idx on tournaments (slug);
create index if not exists gallery_albums_slug_idx on gallery_albums (slug);
create index if not exists gallery_images_album_idx on gallery_images (album_id, sort_order);
create index if not exists player_achievements_player_idx on player_achievements (player_id, sort_order);
create index if not exists registrations_tournament_idx on tournament_registrations (tournament_id, created_at desc);
create index if not exists profiles_role_idx on profiles (role);
