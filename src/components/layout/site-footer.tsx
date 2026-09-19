import { Link } from "@tanstack/react-router";
import { CONTACT_PHONES, CREDIT, NAV_ITEMS, SITE_EMAIL, SOCIAL } from "@/lib/constants";
import { externalRel, telHref } from "@/lib/utils";
import { Logo } from "./logo";
import type { SiteSettings } from "@/lib/types";

export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const email = settings?.email || SITE_EMAIL;
  const address = settings?.address;
  const instagram = settings?.instagramUrl || SOCIAL.instagram;
  const eitaa = settings?.eitaaUrl || SOCIAL.eitaa;
  const telegram = settings?.telegramUrl || SOCIAL.telegram;

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="geo-lattice pointer-events-none absolute inset-0 opacity-80" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
            {settings?.description ||
              "مرجع رسمی اخبار، مسابقات و فعالیت‌های شطرنج شهرستان نیشابور"}
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-gold">پیوندها</h2>
          <ul className="space-y-2 text-sm text-white/75">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-gold">ارتباط</h2>
          <ul className="space-y-2 text-sm text-white/75">
            {address ? <li>{address}</li> : null}
            {CONTACT_PHONES.map((c) => (
              <li key={c.phone}>
                <a href={telHref(c.phone)} className="hover:text-white">
                  {c.name} — <span dir="ltr">{c.phone}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${email}`} className="hover:text-white">
                {email}
              </a>
            </li>
            <li className="flex flex-wrap gap-3 pt-2">
              <a href={instagram} {...externalRel()} className="hover:text-turquoise">
                اینستاگرام
              </a>
              <a href={eitaa} {...externalRel()} className="hover:text-turquoise">
                ایتا
              </a>
              <a href={telegram} {...externalRel()} className="hover:text-turquoise">
                تلگرام
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-white/45 md:px-6">
          {CREDIT}
        </p>
      </div>
    </footer>
  );
}
