import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { adminDeleteRegistration, adminListRegistrations } from "@/lib/data/admin";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/chess/empty-state";
import { formatFaDate } from "@/lib/format";

export const Route = createFileRoute("/admin/registrations")({
  loader: () => adminListRegistrations(),
  head: () => seo("ثبت‌نام‌ها"),
  component: AdminRegistrations,
});

function AdminRegistrations() {
  const initial = Route.useLoaderData();
  const [items, setItems] = useState(initial);
  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">ثبت‌نام‌ها</h2>
      <p className="mb-6 text-sm text-muted">
        ثبت‌نام مسابقات از طریق فرم تالی انجام می‌شود. این فهرست برای نمایش رکوردهای دریافتی از وب‌هوک آماده است.
      </p>
      {items.length === 0 ? (
        <EmptyState title="هنوز ثبت‌نامی دریافت نشده است." />
      ) : (
        <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-line bg-white">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-paper text-muted">
              <tr>
                <th className="p-3 text-right font-medium">مسابقه</th>
                <th className="p-3 text-right font-medium">نام</th>
                <th className="p-3 text-right font-medium">ایمیل</th>
                <th className="p-3 text-right font-medium">تاریخ</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className="border-t border-line">
                  <td className="p-3">{r.tournamentTitle}</td>
                  <td className="p-3">{r.fullName || "—"}</td>
                  <td className="p-3">{r.email || "—"}</td>
                  <td className="p-3">{formatFaDate(r.createdAt)}</td>
                  <td className="p-3">
                    <Button variant="ghost" size="sm" onClick={async () => {
                      await adminDeleteRegistration({ data: r.id });
                      toast.success("حذف شد.");
                      setItems(await adminListRegistrations());
                    }}>حذف</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
