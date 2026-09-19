import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { deleteMedia, listMedia } from "@/lib/data/media";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/chess/empty-state";
import { formatBytes } from "@/lib/format";
import { mediaUrl } from "@/lib/utils";

export const Route = createFileRoute("/admin/media")({
  loader: () => listMedia({ data: { page: 1 } }),
  head: () => seo("رسانه‌ها"),
  component: AdminMedia,
});

function AdminMedia() {
  const initial = Route.useLoaderData();
  const [data, setData] = useState(initial);
  async function refresh() {
    setData(await listMedia({ data: { page: data.page } }));
  }
  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">رسانه‌ها</h2>
      {data.items.length === 0 ? (
        <EmptyState title="رسانه‌ای بارگذاری نشده است." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((m) => (
            <div key={m.id} className="overflow-hidden rounded-[var(--radius-md)] border border-line bg-white">
              {m.kind === "image" ? (
                <img src={mediaUrl(m.id) ?? ""} alt="" className="aspect-square w-full object-cover" />
              ) : (
                <div className="grid aspect-square place-items-center bg-paper text-sm">PDF</div>
              )}
              <div className="p-3 text-xs">
                <p className="truncate">{m.filename}</p>
                <p className="text-muted">{formatBytes(m.sizeBytes)}</p>
                <Button variant="ghost" size="sm" className="mt-1" onClick={async () => {
                  if (!confirm("حذف شود؟")) return;
                  await deleteMedia({ data: m.id });
                  toast.success("حذف شد.");
                  void refresh();
                }}>حذف</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
