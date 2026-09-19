import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { adminSaveSettings } from "@/lib/data/admin";
import { getSiteSettings } from "@/lib/data/public";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/admin/settings")({
  loader: () => getSiteSettings(),
  head: () => seo("تنظیمات سایت"),
  component: AdminSettings,
});

function AdminSettings() {
  const initial = Route.useLoaderData();
  const [siteTitle, setTitle] = useState(initial?.siteTitle ?? "");
  const [description, setDesc] = useState(initial?.description ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [address, setAddress] = useState(initial?.address ?? "");
  const [instagramUrl, setIg] = useState(initial?.instagramUrl ?? "");
  const [eitaaUrl, setEitaa] = useState(initial?.eitaaUrl ?? "");
  const [telegramUrl, setTg] = useState(initial?.telegramUrl ?? "");
  const [tallySuggestionsUrl, setTally] = useState(initial?.tallySuggestionsUrl ?? "");
  const [mapEmbedUrl, setMap] = useState(initial?.mapEmbedUrl ?? "");
  const [busy, setBusy] = useState(false);

  return (
    <div className="max-w-2xl space-y-4">
      <h2 className="text-xl font-semibold">تنظیمات سایت</h2>
      <Field label="عنوان سایت" value={siteTitle} onChange={setTitle} />
      <div>
        <Label>توضیحات</Label>
        <Textarea value={description} onChange={(e) => setDesc(e.target.value)} />
      </div>
      <Field label="ایمیل" value={email} onChange={setEmail} />
      <Field label="تلفن" value={phone} onChange={setPhone} />
      <div>
        <Label>آدرس</Label>
        <Textarea value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <Field label="اینستاگرام" value={instagramUrl} onChange={setIg} ltr />
      <Field label="ایتا" value={eitaaUrl} onChange={setEitaa} ltr />
      <Field label="تلگرام" value={telegramUrl} onChange={setTg} ltr />
      <Field label="نشانی فرم پیشنهادات تالی" value={tallySuggestionsUrl} onChange={setTally} ltr />
      <Field label="نشانی نقشه (Embed)" value={mapEmbedUrl} onChange={setMap} ltr />
      <p className="text-xs text-muted">لوگوی رسمی از فایل ثابت سایت استفاده می‌شود و نباید تغییر شکل داده شود.</p>
      <Button
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          try {
            await adminSaveSettings({
              data: {
                siteTitle,
                description,
                email,
                phone,
                address,
                instagramUrl,
                eitaaUrl,
                telegramUrl,
                tallySuggestionsUrl,
                mapEmbedUrl,
              },
            });
            toast.success("تنظیمات ذخیره شد.");
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "ذخیره ناموفق بود.");
          } finally {
            setBusy(false);
          }
        }}
      >
        ذخیره تنظیمات
      </Button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  ltr,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  ltr?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} dir={ltr ? "ltr" : undefined} />
    </div>
  );
}
