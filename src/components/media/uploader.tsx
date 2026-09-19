import { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IMAGE_EXTS, IMAGE_MIMES, MAX_IMAGE_BYTES, MAX_PDF_BYTES, PDF_MIME } from "@/lib/constants";
import { uploadMedia } from "@/lib/data/media";
import { mediaUrl } from "@/lib/utils";

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function ImageUploader({
  value,
  onChange,
  multiple = false,
  label = "آپلود تصویر",
}: {
  value?: number | null;
  onChange: (id: number | null) => void;
  multiple?: boolean;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);

  const onFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;
      setBusy(true);
      try {
        const file = files[0]!;
        if (!(IMAGE_MIMES as readonly string[]).includes(file.type)) {
          toast.error("فقط تصویرهای JPG، PNG و WEBP پذیرفته می‌شوند.");
          return;
        }
        if (file.size > MAX_IMAGE_BYTES) {
          toast.error("حجم تصویر بیش از ۵ مگابایت است.");
          return;
        }
        const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
        if (!(IMAGE_EXTS as readonly string[]).includes(ext)) {
          toast.error("پسوند فایل نامعتبر است.");
          return;
        }
        const dataBase64 = await readAsDataUrl(file);
        const saved = await uploadMedia({
          data: {
            filename: file.name,
            mimeType: file.type,
            dataBase64,
            kind: "image",
          },
        });
        onChange(saved.id);
        toast.success("تصویر بارگذاری شد.");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "بارگذاری ناموفق بود.");
      } finally {
        setBusy(false);
      }
    },
    [onChange],
  );

  return (
    <div>
      <p className="mb-2 text-sm font-medium">{label}</p>
      {value ? (
        <div className="relative mb-3 overflow-hidden rounded-[var(--radius-md)] border border-line">
          <img src={mediaUrl(value) ?? ""} alt="" className="h-40 w-full object-cover" />
          <button
            type="button"
            className="absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-navy/80 text-white"
            onClick={() => onChange(null)}
            aria-label="حذف تصویر"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : null}
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-md)] border border-dashed border-line bg-paper px-4 py-6 text-sm text-muted hover:border-turquoise">
        <Upload className="size-4" />
        {busy ? "در حال بارگذاری…" : "انتخاب فایل"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          multiple={multiple}
          disabled={busy}
          onChange={(e) => void onFiles(e.target.files)}
        />
      </label>
    </div>
  );
}

export function MultiImageUploader({
  ids,
  onChange,
  coverId,
  onCover,
}: {
  ids: number[];
  onChange: (ids: number[]) => void;
  coverId?: number | null;
  onCover?: (id: number) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [dragFrom, setDragFrom] = useState<number | null>(null);

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    try {
      const next = [...ids];
      for (const file of Array.from(files)) {
        if (!(IMAGE_MIMES as readonly string[]).includes(file.type)) continue;
        if (file.size > MAX_IMAGE_BYTES) continue;
        const dataBase64 = await readAsDataUrl(file);
        const saved = await uploadMedia({
          data: {
            filename: file.name,
            mimeType: file.type,
            dataBase64,
            kind: "image",
          },
        });
        next.push(saved.id);
      }
      onChange(next);
      if (!coverId && next[0]) onCover?.(next[0]);
      toast.success("تصویرها بارگذاری شدند.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "بارگذاری ناموفق بود.");
    } finally {
      setBusy(false);
    }
  }

  function reorder(from: number, to: number) {
    if (from === to) return;
    const next = [...ids];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved!);
    onChange(next);
  }

  return (
    <div>
      <label className="mb-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] border border-dashed border-line bg-paper px-4 py-10 text-sm text-muted hover:border-turquoise">
        <Upload className="size-5" />
        {busy ? "در حال بارگذاری…" : "کشیدن و رها کردن یا انتخاب چند تصویر"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="sr-only"
          disabled={busy}
          onChange={(e) => void addFiles(e.target.files)}
        />
      </label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {ids.map((id, index) => (
          <div
            key={id}
            draggable
            onDragStart={() => setDragFrom(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragFrom != null) reorder(dragFrom, index);
              setDragFrom(null);
            }}
            className="relative overflow-hidden rounded-[var(--radius-md)] border border-line bg-white"
          >
            <img src={mediaUrl(id) ?? ""} alt="" className="aspect-square w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-navy/70 p-1.5 text-[10px] text-white">
              <button type="button" onClick={() => onCover?.(id)}>
                {coverId === id ? "جلد" : "تنظیم جلد"}
              </button>
              <button
                type="button"
                onClick={() => onChange(ids.filter((x) => x !== id))}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PdfUploader({
  value,
  onChange,
}: {
  value?: number | null;
  onChange: (id: number | null) => void;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <div>
      <p className="mb-2 text-sm font-medium">آیین‌نامه مسابقات (PDF)</p>
      {value ? (
        <div className="mb-3 flex items-center justify-between rounded-[var(--radius-sm)] border border-line bg-paper px-3 py-2 text-sm">
          <a href={mediaUrl(value) ?? "#"} className="text-turquoise-dark" target="_blank" rel="noopener noreferrer">
            مشاهده فایل فعلی
          </a>
          <Button variant="ghost" size="sm" onClick={() => onChange(null)}>
            حذف
          </Button>
        </div>
      ) : null}
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-md)] border border-dashed border-line px-4 py-6 text-sm text-muted hover:border-turquoise">
        {busy ? "در حال بارگذاری…" : "آپلود PDF"}
        <input
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          disabled={busy}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            if (file.type !== PDF_MIME || !file.name.toLowerCase().endsWith(".pdf")) {
              toast.error("فقط فایل PDF پذیرفته می‌شود.");
              return;
            }
            if (file.size > MAX_PDF_BYTES) {
              toast.error("حجم فایل بیش از ۱۰ مگابایت است.");
              return;
            }
            setBusy(true);
            try {
              const dataBase64 = await readAsDataUrl(file);
              const saved = await uploadMedia({
                data: {
                  filename: file.name,
                  mimeType: file.type,
                  dataBase64,
                  kind: "pdf",
                },
              });
              onChange(saved.id);
              toast.success("آیین‌نامه بارگذاری شد.");
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "بارگذاری ناموفق بود.");
            } finally {
              setBusy(false);
            }
          }}
        />
      </label>
    </div>
  );
}
