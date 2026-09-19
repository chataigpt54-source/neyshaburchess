import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import type { SiteSettings } from "@/lib/types";

export function PublicLayout({
  children,
  settings,
  darkHero = false,
}: {
  children: ReactNode;
  settings: SiteSettings | null;
  darkHero?: boolean;
}) {
  return (
    <div className={darkHero ? "bg-navy" : "bg-paper"}>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter settings={settings} />
    </div>
  );
}

export function PageBand({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy chess-board-bg">
      <div className="navy-veil geo-lattice absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <p className="mb-3 text-xs tracking-[0.22em] text-gold/80">NEYSHABUR CHESS</p>
        <h1 className="text-3xl font-semibold text-white md:text-4xl">{title}</h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
