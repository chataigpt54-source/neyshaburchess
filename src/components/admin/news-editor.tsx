import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { adminSaveNews } from "@/lib/data/admin";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { ImageUploader, MultiImageUploader } from "@/components/media/uploader";
import type { NewsItem } from "@/lib/types";

export function NewsEditor({
  initial,
}: {
  initial?: NewsItem & { imageIds?: number[] };
}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [coverMediaId, setCover] = useState<number | null>(initial?.coverMediaId ?? null);
  const [imageIds, setImageIds] = useState<number[]>(initial?.imageIds ?? []);
  const [status, setStatus] = useState<"draft" | "published">(initial?.status ?? "draft");
  const [busy, setBusy] = useState(false);

  async function save() {
    if (!title.trim()) {
      toast.error("عنوان را وارد کنید.");
      return;
    }
    setBusy(true);
    try {
      await adminSaveNews({
        data: {
          id: initial?.id,
          title,
          summary,
          content,
          coverMediaId,
          status,
          imageIds,
        },
      });
      toast.success("خبر ذخیره شد.");
      await navigate({ to: "/admin/news" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "ذخیره ناموفق بود.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-4">
      <h2 className="text-xl font-semibold">{initial ? "ویرایش خبر" : "افزودن خبر"}</h2>
      <div>
        <Label>عنوان</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <Label>خلاصه</Label>
        <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} />
      </div>
      <div>
        <Label>متن کامل</Label>
        <Textarea className="min-h-48" value={content} onChange={(e) => setContent(e.target.value)} />
        <p className="mt-1 text-xs text-muted">از مارک‌داون ساده مانند **پررنگ** و لینک [متن](https://...) می‌توانید استفاده کنید.</p>
      </div>
      <ImageUploader value={coverMediaId} onChange={setCover} label="تصویر اصلی" />
      <div>
        <p className="mb-2 text-sm font-medium">تصاویر بیشتر</p>
        <MultiImageUploader ids={imageIds} onChange={setImageIds} />
      </div>
      <div>
        <Label>وضعیت</Label>
        <select
          className="h-11 w-full rounded-[var(--radius-sm)] border border-line bg-white px-3 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value as "draft" | "published")}
        >
          <option value="draft">پیش‌نویس</option>
          <option value="published">انتشار</option>
        </select>
      </div>
      <Button onClick={() => void save()} disabled={busy}>
        {busy ? "در حال ذخیره…" : "ذخیره"}
      </Button>
    </div>
  );
}
