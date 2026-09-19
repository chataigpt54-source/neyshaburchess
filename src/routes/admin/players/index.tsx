import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { adminDeletePlayer, adminListPlayers } from "@/lib/data/admin";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/search/search-box";
import { EmptyState } from "@/components/chess/empty-state";
import { playerFullName } from "@/lib/format";

export const Route = createFileRoute("/admin/players/")({
  loader: () => adminListPlayers({ data: "" }),
  head: () => seo("مدیریت بازیکنان"),
  component: AdminPlayers,
});

function AdminPlayers() {
  const initial = Route.useLoaderData();
  const [items, setItems] = useState(initial);
  const [q, setQ] = useState("");
  async function refresh(next = q) {
    setItems(await adminListPlayers({ data: next }));
  }
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">بازیکنان</h2>
        <Link to="/admin/players/new" className="inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-turquoise px-4 text-sm text-white">
          افزودن بازیکن
        </Link>
      </div>
      <SearchBox value={q} onChange={(v) => { setQ(v); void refresh(v); }} placeholder="جستجو در بازیکنان" />
      <div className="mt-6 overflow-x-auto rounded-[var(--radius-lg)] border border-line bg-white">
        {items.length === 0 ? (
          <EmptyState title="هنوز بازیکنی ثبت نشده است." className="border-0 shadow-none" />
        ) : (
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-paper text-muted">
              <tr>
                <th className="p-3 text-right font-medium">نام</th>
                <th className="p-3 text-right font-medium">آیدی فیده</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-t border-line">
                  <td className="p-3">{playerFullName(p.firstName, p.lastName)}</td>
                  <td className="p-3">{p.fideId || "—"}</td>
                  <td className="p-3 text-left">
                    <Link to="/admin/players/$id" params={{ id: String(p.id) }} className="ml-3 text-turquoise-dark">ویرایش</Link>
                    <Button variant="ghost" size="sm" onClick={async () => {
                      if (!confirm("این بازیکن حذف شود؟")) return;
                      await adminDeletePlayer({ data: p.id });
                      toast.success("حذف شد.");
                      void refresh();
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
