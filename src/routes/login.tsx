import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { memberLoginSchema } from "@/lib/validation";
import { noteMemberLoginResult, prepareMemberLogin } from "@/lib/data/members";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/input";
import { AuthShell } from "@/components/layout/auth-shell";

export const Route = createFileRoute("/login")({
  head: () => seo("ورود"),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const form = useForm({
    resolver: zodResolver(memberLoginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: { email: string; password: string }) {
    setError(null);
    setBusy(true);
    try {
      await prepareMemberLogin({ data: { email: values.email } });
      const { error: err } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });
      await noteMemberLoginResult({ data: { email: values.email, ok: !err } });
      if (err) {
        setError("نام کاربری یا رمز عبور صحیح نیست.");
        return;
      }
      await navigate({ to: "/account" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "ورود ناموفق بود.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell>
      <h1 className="text-2xl font-semibold text-white">ورود به حساب</h1>
      <p className="mt-1 text-sm text-white/60">ورود اعضای هیأت شطرنج نیشابور</p>
      <form className="mt-8 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <Label className="text-white/80">ایمیل</Label>
          <Input type="email" autoComplete="email" {...form.register("email")} />
          <FieldError>{form.formState.errors.email?.message}</FieldError>
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
      {authEnabled ? (
        <div className="mt-6 space-y-2">
          <p className="text-center text-xs text-white/40">یا ورود با</p>
          {GROK_PROVIDERS.map((p) => (
            <button
              key={p.providerId}
              type="button"
              onClick={() => void signIn(p.providerId, { callbackURL: "/account" })}
              className="w-full rounded-[var(--radius-sm)] border border-white/15 px-4 py-2.5 text-sm text-white/80 hover:bg-white/8"
            >
              ورود با {p.label === "Google" ? "گوگل" : "X"}
            </button>
          ))}
        </div>
      ) : null}
      <p className="mt-6 text-center text-sm text-white/60">
        حساب ندارید؟{" "}
        <Link to="/register" className="text-turquoise">
          ثبت‌نام
        </Link>
      </p>
      <p className="mt-3 text-center text-xs text-white/40">
        ورود مدیران:{" "}
        <Link to="/admin/login" className="text-gold">
          پنل مدیریت
        </Link>
      </p>
    </AuthShell>
  );
}
