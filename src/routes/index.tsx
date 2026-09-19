import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Newspaper, Trophy } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { EmptyState } from "@/components/chess/empty-state";
import { TallyEmbed } from "@/components/tally/embed";
import { getHomePayload } from "@/lib/data/public";
import { SITE_NAME, SITE_TAGLINE, STATUS_LABELS } from "@/lib/constants";
import { seo } from "@/lib/seo";
import { mediaUrl } from "@/lib/utils";
import { formatFaDate } from "@/lib/format";
import { Badge } from "@/components/ui/card";
import type { TournamentItem } from "@/lib/types";

export const Route = createFileRoute("/")({
  loader: () => getHomePayload(),
  head: () => seo(SITE_NAME, SITE_TAGLINE),
  component: Home,
});

function Home() {
  const data = Route.useLoaderData();
  const settings = data.settings;
  const featured = data.tournaments;

  return (
    <PublicLayout settings={settings} darkHero>
      <Hero />
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHead
            kicker="مسابقات"
            title="مسابقات مهم"
            to="/tournaments"
            link="همه مسابقات"
          />
          {featured.length === 0 ? (
            <EmptyState title="در حال حاضر مسابقه‌ای برای نمایش وجود ندارد." />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((t, i) => (
                <TournamentCard key={t.id} tournament={t} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHead kicker="رسانه" title="آخرین اخبار" to="/news" link="آرشیو اخبار" />
          {data.news.length === 0 ? (
            <EmptyState title="هنوز خبری منتشر نشده است." />
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              {data.news.map((n) => (
                <Link
                  key={n.id}
                  to="/news/$slug"
                  params={{ slug: n.slug }}
                  className="group overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-card transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <div className="aspect-[16/10] bg-navy/5">
                    {n.coverMediaId ? (
                      <img
                        src={mediaUrl(n.coverMediaId) ?? ""}
                        alt=""
                        className="size-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted">{formatFaDate(n.publishedAt)}</p>
                    <h3 className="mt-1 font-semibold text-navy group-hover:text-turquoise-dark">
                      {n.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{n.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-16 text-white md:py-20">
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
          <div>
            <p className="text-xs tracking-[0.2em] text-gold">هیأت</p>
            <h2 className="mt-2 text-3xl font-semibold">معرفی هیأت</h2>
            <p className="mt-4 text-sm leading-8 text-white/70">
              {settings?.description || SITE_TAGLINE}
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm text-turquoise hover:text-white"
            >
              درباره هیأت
              <ArrowLeft className="size-4" />
            </Link>
          </div>
          <div className="gold-hairline rounded-[var(--radius-xl)] bg-white/5 p-8">
            <img src="/logo.png" alt="" className="mx-auto size-40 rounded-full object-cover" />
            <p className="mt-4 text-center text-sm text-white/60">{SITE_NAME}</p>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-20" id="suggestions">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <p className="text-xs tracking-[0.2em] text-gold-dim">ارتباط</p>
          <h2 className="mt-2 text-3xl font-semibold">پیشنهادات و انتقادات</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            نظرات، پیشنهادات و انتقادات خود را با ما در میان بگذارید.
          </p>
          <div className="mt-8 text-right">
            {settings?.tallySuggestionsUrl ? (
              <TallyEmbed url={settings.tallySuggestionsUrl} title="فرم پیشنهادات و انتقادات" />
            ) : (
              <EmptyState
                title="فرم به‌زودی فعال می‌شود."
                description="تا راه‌اندازی فرم، می‌توانید از طریق ایمیل با هیأت در ارتباط باشید."
                action={
                  settings?.email ? (
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-sm text-turquoise-dark underline-offset-4 hover:underline"
                    >
                      {settings.email}
                    </a>
                  ) : null
                }
              />
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden chess-board-bg text-white">
      <div className="navy-veil geo-lattice absolute inset-0" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 py-24 md:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.28em] text-gold"
        >
          CHESS · NEYSHABUR
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.25] md:text-6xl"
        >
          هیأت شطرنج شهرستان نیشابور
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-5 max-w-xl text-base leading-8 text-white/70 md:text-lg"
        >
          {SITE_TAGLINE}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            to="/tournaments"
            className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-sm)] bg-turquoise px-6 text-sm font-medium"
          >
            <Trophy className="size-4" />
            مشاهده مسابقات
          </Link>
          <Link
            to="/news"
            className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-sm)] border border-white/20 bg-white/5 px-6 text-sm font-medium hover:bg-white/10"
          >
            <Newspaper className="size-4" />
            آخرین اخبار
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHead({
  kicker,
  title,
  to,
  link,
}: {
  kicker: string;
  title: string;
  to: string;
  link: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="text-xs tracking-[0.18em] text-gold-dim">{kicker}</p>
        <h2 className="mt-1 text-2xl font-semibold md:text-3xl">{title}</h2>
      </div>
      <Link to={to} className="hidden items-center gap-1 text-sm text-turquoise-dark sm:inline-flex">
        {link}
        <ArrowLeft className="size-4" />
      </Link>
    </div>
  );
}

function TournamentCard({
  tournament,
  index = 0,
}: {
  tournament: TournamentItem;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index, 8) * 0.04, duration: 0.4 }}
    >
      <Link
        to="/tournaments/$slug"
        params={{ slug: tournament.slug }}
        className="block h-full overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-card transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lift"
      >
        <div className="relative aspect-[16/10] bg-navy">
          {tournament.coverMediaId ? (
            <img
              src={mediaUrl(tournament.coverMediaId) ?? ""}
              alt=""
              className="size-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="geo-lattice size-full opacity-80" />
          )}
          <Badge className="absolute right-3 top-3" tone="gold">
            {STATUS_LABELS[tournament.status]}
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-semibold leading-6">{tournament.title}</h3>
          {tournament.location ? (
            <p className="mt-2 text-xs text-muted">{tournament.location}</p>
          ) : null}
        </div>
      </Link>
    </motion.article>
  );
}
