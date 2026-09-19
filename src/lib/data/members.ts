import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { memberRegisterSchema } from "@/lib/validation";
import { isAdminUser } from "@/lib/require-admin.server";
import { assertLoginRateLimit, resetLoginRateLimit } from "@/lib/rate-limit.server";
import { getAdminLoginEmail, getAdminLoginUsername, ensureAdminSeed } from "@/lib/seed-admin.server";
import type { MemberProfile } from "@/lib/types";

export const completeMemberProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { firstName: string; lastName: string; phone: string; fideId?: string }) =>
    memberRegisterSchema
      .pick({ firstName: true, lastName: true, phone: true, fideId: true })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into profiles (user_id, first_name, last_name, phone, fide_id, role)
      values (
        ${context.userId},
        ${data.firstName},
        ${data.lastName},
        ${data.phone},
        ${data.fideId?.trim() || null},
        'member'
      )
      on conflict (user_id) do update set
        first_name = excluded.first_name,
        last_name = excluded.last_name,
        phone = excluded.phone,
        fide_id = excluded.fide_id,
        updated_at = now()
    `;
    return { ok: true };
  });

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<MemberProfile> => {
    const sql = await getSql();
    const rows = await sql<{
      user_id: string;
      first_name: string;
      last_name: string;
      phone: string | null;
      fide_id: string | null;
      role: "member" | "admin";
    }>`select * from profiles where user_id = ${context.userId} limit 1`;
    const row = rows[0];
    if (!row) {
      const { getSessionUser } = await import("@/lib/auth/verify.server");
      const u = await getSessionUser();
      await sql`
        insert into profiles (user_id, first_name, last_name, role)
        values (${context.userId}, ${""}, ${""}, 'member')
        on conflict (user_id) do nothing
      `;
      return {
        userId: context.userId,
        firstName: "",
        lastName: "",
        phone: null,
        fideId: null,
        role: "member",
        email: u?.email ?? null,
      };
    }
    const { getSessionUser } = await import("@/lib/auth/verify.server");
    const u = await getSessionUser();
    return {
      userId: row.user_id,
      firstName: row.first_name,
      lastName: row.last_name,
      phone: row.phone,
      fideId: row.fide_id,
      role: row.role,
      email: u?.email ?? null,
    };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureAdminSeed();
    return { admin: await isAdminUser(context.userId) };
  });

export const prepareAdminLogin = createServerFn({ method: "POST" })
  .validator((input: { username: string }) => input)
  .handler(async ({ data }) => {
    await ensureAdminSeed();
    const username = data.username.trim();
    assertLoginRateLimit(`admin:${username.toLowerCase()}`);
    const expected = getAdminLoginUsername();
    if (username.toLowerCase() !== expected.toLowerCase() && username.toLowerCase() !== getAdminLoginEmail().toLowerCase()) {
      throw new Error("نام کاربری یا رمز عبور صحیح نیست.");
    }
    return { email: getAdminLoginEmail() };
  });

export const noteAdminLoginResult = createServerFn({ method: "POST" })
  .validator((input: { username: string; ok: boolean }) => input)
  .handler(async ({ data }) => {
    const key = `admin:${data.username.trim().toLowerCase()}`;
    if (data.ok) resetLoginRateLimit(key);
    return { ok: true };
  });

export const prepareMemberLogin = createServerFn({ method: "POST" })
  .validator((input: { email: string }) => input)
  .handler(async ({ data }) => {
    assertLoginRateLimit(`member:${data.email.trim().toLowerCase()}`);
    return { ok: true };
  });

export const noteMemberLoginResult = createServerFn({ method: "POST" })
  .validator((input: { email: string; ok: boolean }) => input)
  .handler(async ({ data }) => {
    const key = `member:${data.email.trim().toLowerCase()}`;
    if (data.ok) resetLoginRateLimit(key);
    return { ok: true };
  });
