import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { adminSavePage } from "@/lib/data/admin";
import { getStaticPage } from "@/lib/data/public";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/admin/pages")({
  loader: async () => {
    const [about, contact] = await Promise.all([
      getStaticPage({ data: "about" }),
      getStaticPage({ data: "contact" }),
    ]);
    return { about, contact };
  },
  head: () => seo("صفحات"),
  component: AdminPages,
});

function AdminPages() {
  const { about, contact } = Route.useLoaderData();
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <PageForm slug="about" title={about?.title ?? "درباره هیأت"} content={about?.content ?? ""} />
      <PageForm slug="contact" title={contact?.title ?? "تماس با ما"} content={contact?.content ?? ""} />
    </div>
  );
}

function PageForm({ slug, title, content }: { slug: "about" | "contact"; title: string; content: string }) {
  const [t, setT] = useState(title);
  const [c, setC] = useState(content);
  const [busy, setBusy] = useState(false);
  return (
    <div className="space-y-3 rounded-[var(--radius-lg)] border border-line bg-white p-5">
      <h2 className="text-lg font-semibold">{slug === "about" ? "درباره هیأت" : "تماس با ما"}</h2>
      <div>
        <Label>عنوان</Label>
        <Input value={t} onChange={(e) => setT(e.target.value)} />
      </div>
      <div>
        <Label>محتوا</Label>
        <Textarea className="min-h-48" value={c} onChange={(e) => setC(e.target.value)} />
      </div>
      <Button
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          try {
            await adminSavePage({ data: { slug, title: t, content: c } });
            toast.success("صفحه ذخیره شد.");
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "ذخیره ناموفق بود.");
          } finally {
            setBusy(false);
          }
        }}
      >
        ویرایش صفحه
      </Button>
    </div>
  );
}
