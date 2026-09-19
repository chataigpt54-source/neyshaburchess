import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Share2 } from "lucide-react";
import { PublicLayout, PageBand } from "@/components/layout/public-layout";
import { TallyEmbed } from "@/components/tally/embed";
import { getSiteSettings, getStaticPage } from "@/lib/data/public";
import { seo } from "@/lib/seo";
import { CONTACT_PHONES, SOCIAL } from "@/lib/constants";
import { externalRel, telHref } from "@/lib/utils";
import { renderRichText } from "@/lib/sanitize";

export const Route = createFileRoute("/contact")({
  loader: async () => {
    const [settings, page] = await Promise.all([
      getSiteSettings(),
      getStaticPage({ data: "contact" }),
    ]);
    return { settings, page };
  },
  head: () => seo("تماس با ما"),
  component: ContactPage,
});

function ContactPage() {
  const { settings, page } = Route.useLoaderData();
  const instagram = settings?.instagramUrl || SOCIAL.instagram;
  const eitaa = settings?.eitaaUrl || SOCIAL.eitaa;
  const telegram = settings?.telegramUrl || SOCIAL.telegram;

  return (
    <PublicLayout settings={settings}>
      <PageBand title="تماس با ما" subtitle="راه‌های ارتباط با هیأت شطرنج شهرستان نیشابور" />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-2 lg:grid-cols-4 md:px-6">
        <Info icon={<MapPin className="size-5" />} title="نشانی" body={settings?.address} />
        <Info
          icon={<Mail className="size-5" />}
          title="ایمیل"
          body={settings?.email}
          href={settings?.email ? `mailto:${settings.email}` : undefined}
        />
        <Info icon={<Phone className="size-5" />} title="تلفن">
          <ul className="mt-2 space-y-3 text-sm leading-7 text-muted">
            {CONTACT_PHONES.map((c) => (
              <li key={c.phone}>
                <p className="font-medium text-navy">{c.name}</p>
                <a href={telHref(c.phone)} className="hover:text-turquoise-dark" dir="ltr">
                  {c.phone}
                </a>
              </li>
            ))}
          </ul>
        </Info>
        <Info icon={<Share2 className="size-5" />} title="شبکه‌های اجتماعی">
          <div className="flex flex-col gap-2 text-sm">
            <a href={instagram} {...externalRel()}>اینستاگرام</a>
            <a href={eitaa} {...externalRel()}>ایتا</a>
            <a href={telegram} {...externalRel()}>تلگرام</a>
          </div>
        </Info>
      </section>
      {settings?.mapEmbedUrl ? (
        <section className="mx-auto max-w-6xl px-4 pb-8 md:px-6">
          <iframe
            title="نقشه"
            src={settings.mapEmbedUrl}
            className="h-80 w-full rounded-[var(--radius-lg)] border border-line"
            loading="lazy"
          />
        </section>
      ) : null}
      {page?.content?.trim() ? (
        <section className="mx-auto max-w-3xl px-4 pb-8 md:px-6">
          <div className="prose-fa" dangerouslySetInnerHTML={{ __html: renderRichText(page.content) }} />
        </section>
      ) : null}
      <section className="mx-auto max-w-3xl px-4 pb-16 md:px-6" id="suggestions">
        <h2 className="mb-3 text-2xl font-semibold">پیشنهادات و انتقادات</h2>
        <p className="mb-6 text-sm text-muted">
          نظرات، پیشنهادات و انتقادات خود را با ما در میان بگذارید.
        </p>
        {settings?.tallySuggestionsUrl ? (
          <TallyEmbed url={settings.tallySuggestionsUrl} title="فرم پیشنهادات" />
        ) : (
          <p className="rounded-[var(--radius-lg)] border border-dashed border-line bg-white p-8 text-sm text-muted">
            فرم هنوز تنظیم نشده است. از ایمیل {settings?.email} استفاده کنید.
          </p>
        )}
      </section>
    </PublicLayout>
  );
}

function Info({
  icon,
  title,
  body,
  href,
  children,
}: {
  icon: ReactNode;
  title: string;
  body?: string | null;
  href?: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-white p-6 shadow-card">
      <div className="mb-3 text-turquoise">{icon}</div>
      <h2 className="font-semibold">{title}</h2>
      {children ??
        (href && body ? (
          <a href={href} className="mt-2 block text-sm leading-7 text-muted">
            {body}
          </a>
        ) : (
          <p className="mt-2 text-sm leading-7 text-muted">{body || "—"}</p>
        ))}
    </div>
  );
}
