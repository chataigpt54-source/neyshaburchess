import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { adminSavePlayer } from "@/lib/data/admin";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { ImageUploader } from "@/components/media/uploader";
import type { PlayerAchievement, PlayerItem } from "@/lib/types";

type Ach = { title: string; year: string; description: string };

export function PlayerEditor({
  initial,
}: {
  initial?: PlayerItem & { achievements: PlayerAchievement[] };
}) {
  const navigate = useNavigate();
  const [firstName, setFirst] = useState(initial?.firstName ?? "");
  const [lastName, setLast] = useState(initial?.lastName ?? "");
  const [fideId, setFide] = useState(initial?.fideId ?? "");
  const [bio, setBio] = useState(initial?.bio ?? "");
  const [photoMediaId, setPhoto] = useState<number | null>(initial?.photoMediaId ?? null);
  const [achievements, setAchievements] = useState<Ach[]>(
    initial?.achievements.map((a) => ({ title: a.title, year: a.year ?? "", description: a.description })) ?? [],
  );
  const [busy, setBusy] = useState(false);

  async function save() {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("نام و نام خانوادگی را وارد کنید.");
      return;
    }
    setBusy(true);
    try {
      await adminSavePlayer({
        data: {
          id: initial?.id,
          firstName,
          lastName,
          fideId,
          bio,
          photoMediaId,
          achievements,
        },
      });
      toast.success("بازیکن ذخیره شد.");
      await navigate({ to: "/admin/players" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "ذخیره ناموفق بود.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-4">
      <h2 className="text-xl font-semibold">{initial ? "ویرایش بازیکن" : "افزودن بازیکن"}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>نام</Label>
          <Input value={firstName} onChange={(e) => setFirst(e.target.value)} />
        </div>
        <div>
          <Label>نام خانوادگی</Label>
          <Input value={lastName} onChange={(e) => setLast(e.target.value)} />
        </div>
      </div>
      <div>
        <Label>آیدی فیده</Label>
        <Input value={fideId} onChange={(e) => setFide(e.target.value)} />
      </div>
      <div>
        <Label>بیوگرافی</Label>
        <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </div>
      <ImageUploader value={photoMediaId} onChange={setPhoto} label="عکس" />
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium">افتخارات</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAchievements((a) => [...a, { title: "", year: "", description: "" }])}
          >
            افزودن افتخار
          </Button>
        </div>
        <div className="space-y-3">
          {achievements.map((a, i) => (
            <div key={i} className="rounded-[var(--radius-md)] border border-line p-3">
              <Input className="mb-2" placeholder="عنوان افتخار" value={a.title} onChange={(e) => {
                const next = [...achievements];
                next[i] = { ...a, title: e.target.value };
                setAchievements(next);
              }} />
              <Input className="mb-2" placeholder="سال" value={a.year} onChange={(e) => {
                const next = [...achievements];
                next[i] = { ...a, year: e.target.value };
                setAchievements(next);
              }} />
              <Textarea placeholder="توضیح" value={a.description} onChange={(e) => {
                const next = [...achievements];
                next[i] = { ...a, description: e.target.value };
                setAchievements(next);
              }} />
              <Button variant="ghost" size="sm" className="mt-2" onClick={() => setAchievements(achievements.filter((_, j) => j !== i))}>
                حذف
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={() => void save()} disabled={busy}>{busy ? "در حال ذخیره…" : "ذخیره"}</Button>
    </div>
  );
}
