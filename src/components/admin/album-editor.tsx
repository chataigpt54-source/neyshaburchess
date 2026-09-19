import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { adminSaveAlbum } from "@/lib/data/admin";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { MultiImageUploader } from "@/components/media/uploader";
import type { GalleryAlbum, GalleryImage } from "@/lib/types";

export function AlbumEditor({
  initial,
}: {
  initial?: GalleryAlbum & { images: GalleryImage[] };
}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [albumDate, setDate] = useState(initial?.albumDate ?? "");
  const [coverMediaId, setCover] = useState<number | null>(initial?.coverMediaId ?? null);
  const [imageIds, setIds] = useState<number[]>(initial?.images.map((i) => i.mediaId) ?? []);
  const [busy, setBusy] = useState(false);

  async function save() {
    if (!title.trim()) {
      toast.error("عنوان گالری را وارد کنید.");
      return;
    }
    setBusy(true);
    try {
      await adminSaveAlbum({
        data: {
          id: initial?.id,
          title,
          description,
          albumDate: albumDate || null,
          coverMediaId,
          imageIds,
        },
      });
      toast.success("گالری ذخیره شد.");
      await navigate({ to: "/admin/gallery" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "ذخیره ناموفق بود.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-4">
      <h2 className="text-xl font-semibold">{initial ? "ویرایش گالری" : "افزودن گالری"}</h2>
      <div>
        <Label>عنوان گالری</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <Label>توضیحات</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <Label>تاریخ</Label>
        <Input type="date" value={albumDate ?? ""} onChange={(e) => setDate(e.target.value)} />
      </div>
      <MultiImageUploader ids={imageIds} onChange={setIds} coverId={coverMediaId} onCover={setCover} />
      <Button onClick={() => void save()} disabled={busy}>{busy ? "در حال ذخیره…" : "ذخیره"}</Button>
    </div>
  );
}
