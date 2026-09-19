import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { adminDeleteAlbum, adminListAlbums } from "@/lib/data/admin";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/chess/empty-state";
import { toFaDigits } from "@/lib/format";

export const Route = createFileRoute("/admin/gallery/")({
  loader: () => adminListAlbums(),
  head: () => seo("مدیریت گالری"),
  component: AdminGallery,
});

function AdminGallery() {
  const initial = Route.useLoaderData();
  const [items, setItems] = useState(initial);
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">گالری</h2>
        <Link to="/admin/gallery/new" className="inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-turquoise px-4 text-sm text-white">
          افزودن گالری
        </Link>
      </div>
      {items.length === 0 ? (
        <EmptyState title="هنوز گالری‌ای ایجاد نشده است." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((a) => (
            <div key={a.id} className="rounded-[var(--radius-lg)] border border-line bg-white p-4">
              <h3 className="font-semibold">{a.title}</h3>
              <p className="mt-1 text-xs text-muted">{toFaDigits(a.imageCount ?? 0)} تصویر</p>
              <div className="mt-3">
                <Link to="/admin/gallery/$id" params={{ id: String(a.id) }} className="ml-3 text-sm text-turquoise-dark">ویرایش</Link>
                <Button variant="ghost" size="sm" onClick={async () => {
                  if (!confirm("این گالری حذف شود؟")) return;
                  await adminDeleteAlbum({ data: a.id });
                  toast.success("حذف شد.");
                  setItems(await adminListAlbums());
                }}>حذف</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
