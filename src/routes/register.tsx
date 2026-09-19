import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth/client";
import { completeMemberProfile } from "@/lib/data/members";
import { memberRegisterSchema, type MemberRegisterInput } from "@/lib/validation";
import { seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/input";
import { AuthShell } from "@/components/layout/auth-shell";

export const Route = createFileRoute("/register")({
  head: () => seo("ثبت‌نام"),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const form = useForm<MemberRegisterInput>({
    resolver: zodResolver(memberRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      fideId: "",
    },
  });

  async function onSubmit(values: MemberRegisterInput) {
    setError(null);
    setBusy(true);
    try {
      const { error: err } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: `${values.firstName} ${values.lastName}`,
      });
      if (err) {
        setError(err.message === "User already exists" ? "این ایمیل قبلاً ثبت شده است." : "ثبت‌نام ناموفق بود.");
        return;
      }
      await completeMemberProfile({
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          fideId: values.fideId,
        },
      });
      await navigate({ to: "/account" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "ثبت‌نام ناموفق بود.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell>
      <h1 className="text-2xl font-semibold text-white">ثبت‌نام</h1>
      <form className="mt-6 grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label className="text-white/80">نام</Label>
            <Input {...form.register("firstName")} />
            <FieldError>{form.formState.errors.firstName?.message}</FieldError>
          </div>
          <div>
            <Label className="text-white/80">نام خانوادگی</Label>
            <Input {...form.register("lastName")} />
            <FieldError>{form.formState.errors.lastName?.message}</FieldError>
          </div>
        </div>
        <div>
          <Label className="text-white/80">ایمیل</Label>
          <Input type="email" {...form.register("email")} />
          <FieldError>{form.formState.errors.email?.message}</FieldError>
        </div>
        <div>
          <Label className="text-white/80">شماره تلفن</Label>
          <Input inputMode="numeric" {...form.register("phone")} placeholder="09xxxxxxxxx" />
          <FieldError>{form.formState.errors.phone?.message}</FieldError>
        </div>
        <div>
          <Label className="text-white/80">آیدی فیده (در صورت داشتن)</Label>
          <Input {...form.register("fideId")} />
        </div>
        <div>
          <Label className="text-white/80">رمز عبور</Label>
          <Input type="password" {...form.register("password")} />
          <FieldError>{form.formState.errors.password?.message}</FieldError>
        </div>
        <div>
          <Label className="text-white/80">تکرار رمز عبور</Label>
          <Input type="password" {...form.register("confirmPassword")} />
          <FieldError>{form.formState.errors.confirmPassword?.message}</FieldError>
        </div>
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "در حال ثبت‌نام…" : "ایجاد حساب"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-white/60">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <Link to="/login" className="text-turquoise">
          ورود
        </Link>
      </p>
    </AuthShell>
  );
}
