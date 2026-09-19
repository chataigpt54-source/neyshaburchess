import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { adminDeleteTournament, adminListTournaments } from "@/lib/data/admin";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/card";
import { STATUS_LABELS } from "@/lib/constants";
import { EmptyState } from "@/components/chess/empty-state";
import { useState } from "react";

export const Route = createFileRoute("/admin/tournaments/")({
  loader: () => adminListTournaments(),
  head: () => seo("مدیریت مسابقات"),
  component: AdminTournaments,
});

function AdminTournaments() {
  const initial = Route.useLoaderData();
  const [items, setItems] = useState(initial);
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">مسابقات</h2>
        <Link to="/admin/tournaments/new" className="inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-turquoise px-4 text-sm text-white">
          افزودن مسابقه
        </Link>
      </div>
      <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-line bg-white">
        {items.length === 0 ? (
          <EmptyState title="مسابقه‌ای ثبت نشده است." className="border-0 shadow-none" />
        ) : (
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-paper text-muted">
              <tr>
                <th className="p-3 text-right font-medium">عنوان</th>
                <th className="p-3 text-right font-medium">وضعیت</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id} className="border-t border-line">
                  <td className="p-3">{t.title}</td>
                  <td className="p-3"><Badge>{STATUS_LABELS[t.status]}</Badge></td>
                  <td className="p-3 text-left">
                    <Link to="/admin/tournaments/$id" params={{ id: String(t.id) }} className="ml-3 text-turquoise-dark">ویرایش</Link>
                    <Button variant="ghost" size="sm" onClick={async () => {
                      if (!confirm("این مسابقه حذف شود؟")) return;
                      await adminDeleteTournament({ data: t.id });
                      toast.success("حذف شد.");
                      setItems(await adminListTournaments());
                    }}>حذف</Button>
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
