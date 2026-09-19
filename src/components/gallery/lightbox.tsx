import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { mediaUrl } from "@/lib/utils";
import type { GalleryImage } from "@/lib/types";

export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const go = useCallback(
    (dir: number) => {
      if (!images.length) return;
      onIndex((index + dir + images.length) % images.length);
    },
    [images.length, index, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(1);
      if (e.key === "ArrowRight") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const [touchX, setTouchX] = useState<number | null>(null);
  const img = images[index];
  if (!img) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-navy-deep/95 text-white"
      role="dialog"
      aria-modal="true"
      aria-label="نمایش تصویر"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm text-white/70">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full hover:bg-white/10"
          onClick={onClose}
          aria-label="بستن"
        >
          <X />
        </button>
      </div>
      <div
        className="relative flex flex-1 items-center justify-center px-4"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => setTouchX(e.changedTouches[0]?.clientX ?? null)}
        onTouchEnd={(e) => {
          const x = e.changedTouches[0]?.clientX;
          if (touchX == null || x == null) return;
          const dx = x - touchX;
          if (dx > 40) go(-1);
          if (dx < -40) go(1);
          setTouchX(null);
        }}
      >
        <button
          type="button"
          className="absolute right-2 grid size-11 place-items-center rounded-full bg-white/10 md:right-6"
          onClick={() => go(-1)}
          aria-label="قبلی"
        >
          <ChevronRight />
        </button>
        <img
          src={mediaUrl(img.mediaId) ?? ""}
          alt={img.caption || "تصویر گالری"}
          className="max-h-[78vh] max-w-full object-contain"
        />
        <button
          type="button"
          className="absolute left-2 grid size-11 place-items-center rounded-full bg-white/10 md:left-6"
          onClick={() => go(1)}
          aria-label="بعدی"
        >
          <ChevronLeft />
        </button>
      </div>
      <div className="flex justify-center gap-1.5 px-4 py-4">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`تصویر ${i + 1}`}
            className={`size-2 rounded-full ${i === index ? "bg-turquoise" : "bg-white/30"}`}
            onClick={(e) => {
              e.stopPropagation();
              onIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}
