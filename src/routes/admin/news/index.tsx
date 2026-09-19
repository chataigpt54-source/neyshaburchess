import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { adminDeleteNews, adminListNews } from "@/lib/data/admin";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/card";
import { SearchBox } from "@/components/search/search-box";
import { STATUS_LABELS } from "@/lib/constants";
import { formatFaDate } from "@/lib/format";
import { EmptyState } from "@/components/chess/empty-state";

export const Route = createFileRoute("/admin/news/")({
  loader: () => adminListNews({ data: "" }),
  head: () => seo("مدیریت اخبار"),
  component: AdminNews,
});

function AdminNews() {
  const initial = Route.useLoaderData();
  const [items, setItems] = useState(initial);
  const [q, setQ] = useState("");

  async function refresh(next = q) {
    setItems(await adminListNews({ data: next }));
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">اخبار</h2>
        <Link
          to="/admin/news/new"
          className="inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-turquoise px-4 text-sm text-white"
        >
          افزودن خبر
        </Link>
      </div>
      <SearchBox
        value={q}
        onChange={(v) => {
          setQ(v);
          void refresh(v);
        }}
        placeholder="جستجو در اخبار"
      />
      <div className="mt-6 overflow-x-auto rounded-[var(--radius-lg)] border border-line bg-white">
        {items.length === 0 ? (
          <EmptyState title="هنوز خبری ثبت نشده است." className="border-0 shadow-none" />
        ) : (
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-paper text-muted">
              <tr>
                <th className="p-3 text-right font-medium">عنوان</th>
                <th className="p-3 text-right font-medium">وضعیت</th>
                <th className="p-3 text-right font-medium">تاریخ</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((n) => (
                <tr key={n.id} className="border-t border-line">
                  <td className="p-3">{n.title}</td>
                  <td className="p-3">
                    <Badge tone={n.status === "published" ? "ok" : "muted"}>
                      {STATUS_LABELS[n.status]}
                    </Badge>
                  </td>
                  <td className="p-3">{formatFaDate(n.publishedAt || n.createdAt)}</td>
                  <td className="p-3 text-left">
                    <Link to="/admin/news/$id" params={{ id: String(n.id) }} className="ml-3 text-turquoise-dark">
                      ویرایش
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={async () => {
                        if (!confirm("این خبر حذف شود؟")) return;
                        await adminDeleteNews({ data: n.id });
                        toast.success("حذف شد.");
                        void refresh();
                      }}
                    >
                      حذف
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
