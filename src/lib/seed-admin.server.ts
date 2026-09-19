import { getSql } from "@/lib/db";
import { ADMIN_EMAIL, ADMIN_USERNAME_DEFAULT } from "@/lib/constants";

const globalRef = globalThis as typeof globalThis & {
  __adminSeedPromise__?: Promise<void>;
};

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() || "Mazda2933";
}

function adminUsername(): string {
  return process.env.ADMIN_USERNAME?.trim() || ADMIN_USERNAME_DEFAULT;
}

function adminEmail(): string {
  return process.env.ADMIN_EMAIL?.trim() || ADMIN_EMAIL;
}

async function seedAdminOnce(): Promise<void> {
  const sql = await getSql();

  const email = adminEmail();
  const password = adminPassword();
  const name = "مدیر هیأت";

  const users = await sql<{ id: string }>`
    select id from "user" where email = ${email} limit 1
  `;

  let userId = users[0]?.id;
  if (!userId) {
    const { auth } = await import("@/lib/auth/server");
    try {
      const created = await auth.api.signUpEmail({
        body: { email, password, name },
      });
      userId = created?.user?.id;
    } catch (err) {
      console.error("[seed] admin sign-up failed, looking up existing user", err);
      const again = await sql<{ id: string }>`
        select id from "user" where email = ${email} limit 1
      `;
      userId = again[0]?.id;
    }
  }

  if (!userId) {
    console.error("[seed] could not create admin user");
    return;
  }

  await sql`
    insert into profiles (user_id, first_name, last_name, role)
    values (${userId}, ${adminUsername()}, ${"هیأت"}, 'admin')
    on conflict (user_id) do update set role = 'admin', updated_at = now()
  `;

  // Self-heal the credential password so the configured admin password always
  // works, even on a persistent database seeded earlier with a different one.
  await ensureAdminPassword(userId, password);
}

async function ensureAdminPassword(userId: string, password: string): Promise<void> {
  try {
    const sql = await getSql();
    const { auth } = await import("@/lib/auth/server");
    const ctx = await auth.$context;
    const hashed = await ctx.password.hash(password);

    const existing = await sql<{ id: string }>`
      select id from "account"
      where "userId" = ${userId} and "providerId" = 'credential'
      limit 1
    `;

    if (existing.length > 0) {
      await sql`
        update "account"
        set "password" = ${hashed}, "updatedAt" = now()
        where id = ${existing[0].id}
      `;
    } else {
      const id = crypto.randomUUID();
      await sql`
        insert into "account" ("id", "accountId", "providerId", "userId", "password", "createdAt", "updatedAt")
        values (${id}, ${userId}, 'credential', ${userId}, ${hashed}, now(), now())
      `;
    }
  } catch (err) {
    console.error("[seed] could not ensure admin password", err);
  }
}

export function ensureAdminSeed(): Promise<void> {
  globalRef.__adminSeedPromise__ ??= seedAdminOnce().catch((err) => {
    globalRef.__adminSeedPromise__ = undefined;
    console.error("[seed] admin seed failed", err);
  });
  return globalRef.__adminSeedPromise__;
}

export function getAdminLoginEmail(): string {
  return adminEmail();
}

export function getAdminLoginUsername(): string {
  return adminUsername();
}
