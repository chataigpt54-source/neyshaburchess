import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyProfile } from "@/lib/data/members";
import { getSiteSettings } from "@/lib/data/public";
import { seo } from "@/lib/seo";
import { PublicLayout, PageBand } from "@/components/layout/public-layout";
import { PageLoader } from "@/components/chess/loading";
import type { MemberProfile } from "@/lib/types";
import type { SiteSettings } from "@/lib/types";

export const Route = createFileRoute("/account")({
  head: () => seo("پنل کاربری"),
  component: AccountPage,
});

function AccountPage() {
  const { user, isPending } = useCurrentUserState();
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    void getSiteSettings().then(setSettings);
  }, []);

  useEffect(() => {
    if (!user) return;
    void getMyProfile()
      .then(setProfile)
      .catch(() => setProfile(null));
  }, [user]);

  if (isPending) return <PageLoader />;
  if (!user) return <RedirectToSignIn />;

  return (
    <PublicLayout settings={settings}>
      <PageBand title="پنل کاربری" subtitle="اطلاعات حساب شما" />
      <section className="mx-auto max-w-xl px-4 py-12 md:px-6">
        <div className="rounded-[var(--radius-lg)] border border-line bg-white p-6 shadow-card">
          <dl className="space-y-3 text-sm">
            <Row label="نام" value={`${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim() || user.displayName} />
            <Row label="ایمیل" value={profile?.email || user.primaryEmail} />
            <Row label="تلفن" value={profile?.phone} />
            <Row label="آیدی فیده" value={profile?.fideId} />
          </dl>
        </div>
      </section>
    </PublicLayout>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line/70 py-2">
      <dt className="text-muted">{label}</dt>
      <dd>{value || "—"}</dd>
    </div>
  );
}
