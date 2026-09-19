import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth/client";
import { adminLoginSchema } from "@/lib/validation";
import { noteAdminLoginResult, prepareAdminLogin, checkIsAdmin } from "@/lib/data/members";
import { signOut } from "@/lib/auth/client";
import { seo } from "@/lib/seo";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/input";

export const Route = createFileRoute("/admin/login")({
  head: () => seo("ورود مدیریت"),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const form = useForm({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { username: "", password: "" },
  });

  async function onSubmit(values: { username: string; password: string }) {
    setError(null);
    setBusy(true);
    try {
      const { email } = await prepareAdminLogin({ data: { username: values.username } });
      const { error: err } = await authClient.signIn.email({
        email,
        password: values.password,
      });
      if (err) {
        await noteAdminLoginResult({ data: { username: values.username, ok: false } });
        setError("نام کاربری یا رمز عبور صحیح نیست.");
        return;
      }
      const { admin } = await checkIsAdmin();
      if (!admin) {
        await signOut("/admin/login").catch(() => undefined);
        setError("نام کاربری یا رمز عبور صحیح نیست.");
        return;
      }
      await noteAdminLoginResult({ data: { username: values.username, ok: true } });
      await navigate({ to: "/admin" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "نام کاربری یا رمز عبور صحیح نیست.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell>
      <h1 className="text-2xl font-semibold text-white">ورود مدیران</h1>
      <p className="mt-1 text-sm text-white/55">دسترسی به پنل مدیریت هیأت</p>
      <form className="mt-8 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <Label className="text-white/80">نام کاربری</Label>
          <Input autoComplete="username" {...form.register("username")} />
          <FieldError>{form.formState.errors.username?.message}</FieldError>
        </div>
        <div>
          <Label className="text-white/80">رمز عبور</Label>
          <Input type="password" autoComplete="current-password" {...form.register("password")} />
          <FieldError>{form.formState.errors.password?.message}</FieldError>
        </div>
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "در حال ورود…" : "ورود به حساب"}
        </Button>
      </form>
    </AuthShell>
  );
}
