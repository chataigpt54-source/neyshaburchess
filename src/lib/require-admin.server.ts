import { getSql } from "@/lib/db";
import { UnauthorizedError } from "@/lib/auth/verify.server";

export class ForbiddenError extends Error {
  readonly status = 403;
  constructor() {
    super("Forbidden");
    this.name = "ForbiddenError";
  }
}

export async function isAdminUser(userId: string): Promise<boolean> {
  const sql = await getSql();
  const rows = await sql<{ role: string }>`
    select role from profiles where user_id = ${userId} limit 1
  `;
  return rows[0]?.role === "admin";
}

export async function requireAdmin(userId: string): Promise<void> {
  if (!userId) throw new UnauthorizedError();
  const ok = await isAdminUser(userId);
  if (!ok) throw new ForbiddenError();
}
