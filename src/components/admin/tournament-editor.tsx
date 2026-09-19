import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { adminClearRulesPdf, adminListAlbums, adminSaveTournament } from "@/lib/data/admin";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { ImageUploader, PdfUploader } from "@/components/media/uploader";
import type { GalleryAlbum, TournamentItem } from "@/lib/types";
import { useEffect } from "react";

export function TournamentEditor({ initial }: { initial?: TournamentItem }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [coverMediaId, setCover] = useState<number | null>(initial?.coverMediaId ?? null);
  const [startDate, setStart] = useState(initial?.startDate ?? "");
  const [endDate, setEnd] = useState(initial?.endDate ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [status, setStatus] = useState(initial?.status ?? "upcoming");
  const [tallyUrl, setTally] = useState(initial?.tallyUrl ?? "");
  const [chessResultsUrl, setResults] = useState(initial?.chessResultsUrl ?? "");
  const [rulesMediaId, setRules] = useState<number | null>(initial?.rulesMediaId ?? null);
  const [galleryId, setGallery] = useState<number | null>(initial?.galleryId ?? null);
  const [sortOrder, setSort] = useState(String(initial?.sortOrder ?? 0));
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void adminListAlbums().then(setAlbums).catch(() => undefined);
  }, []);

  async function save() {
    if (!title.trim()) {
      toast.error("عنوان را وارد کنید.");
      return;
    }
    setBusy(true);
    try {
      const saved = await adminSaveTournament({
        data: {
          id: initial?.id,
          title,
          description,
          coverMediaId,
          startDate: startDate || null,
          endDate: endDate || null,
          location,
          status,
          tallyUrl,
          chessResultsUrl,
          rulesMediaId,
          galleryId,
          sortOrder: Number(sortOrder) || 0,
        },
      });
      if (initial?.id && rulesMediaId == null && initial.rulesMediaId) {
        await adminClearRulesPdf({ data: initial.id });
      }
      toast.success("مسابقه ذخیره شد.");
      await navigate({ to: "/admin/tournaments" });
      return saved;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "ذخیره ناموفق بود.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-4">
      <h2 className="text-xl font-semibold">{initial ? "ویرایش مسابقه" : "افزودن مسابقه"}</h2>
      <div>
        <Label>عنوان</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <Label>توضیحات</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <ImageUploader value={coverMediaId} onChange={setCover} label="تصویر" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>تاریخ شروع</Label>
          <Input type="date" value={startDate ?? ""} onChange={(e) => setStart(e.target.value)} />
        </div>
        <div>
          <Label>تاریخ پایان</Label>
          <Input type="date" value={endDate ?? ""} onChange={(e) => setEnd(e.target.value)} />
        </div>
      </div>
      <div>
        <Label>محل برگزاری</Label>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div>
        <Label>وضعیت</Label>
        <select
          className="h-11 w-full rounded-[var(--radius-sm)] border border-line bg-white px-3 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
        >
          <option value="upcoming">آینده</option>
          <option value="ongoing">در حال برگزاری</option>
          <option value="finished">برگزارشده</option>
        </select>
      </div>
      <div>
        <Label>نشانی فرم ثبت‌نام تالی</Label>
        <Input value={tallyUrl} onChange={(e) => setTally(e.target.value)} placeholder="https://tally.so/r/..." dir="ltr" />
      </div>
      <div>
        <Label>نشانی Chess Results</Label>
        <Input value={chessResultsUrl} onChange={(e) => setResults(e.target.value)} dir="ltr" />
      </div>
      <PdfUploader value={rulesMediaId} onChange={setRules} />
      <div>
        <Label>گالری مرتبط</Label>
        <select
          className="h-11 w-full rounded-[var(--radius-sm)] border border-line bg-white px-3 text-sm"
          value={galleryId ?? ""}
          onChange={(e) => setGallery(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">بدون گالری</option>
          {albums.map((a) => (
            <option key={a.id} value={a.id}>{a.title}</option>
          ))}
        </select>
      </div>
      <div>
        <Label>ترتیب نمایش</Label>
        <Input value={sortOrder} onChange={(e) => setSort(e.target.value)} />
      </div>
      <Button onClick={() => void save()} disabled={busy}>{busy ? "در حال ذخیره…" : "ذخیره"}</Button>
    </div>
  );
}
