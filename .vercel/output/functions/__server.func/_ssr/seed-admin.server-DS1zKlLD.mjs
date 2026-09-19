import { r as getSql } from "./db-B81SbFjo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seed-admin.server-DS1zKlLD.js
var globalRef = globalThis;
function adminPassword() {
	return process.env.ADMIN_PASSWORD?.trim() || "Mazda2933";
}
function adminUsername() {
	return process.env.ADMIN_USERNAME?.trim() || "Admin";
}
function adminEmail() {
	return process.env.ADMIN_EMAIL?.trim() || "admin@chessneyshabur.ir";
}
async function seedAdminOnce() {
	const sql = await getSql();
	if ((await sql`
    select user_id from profiles where role = 'admin' limit 1
  `).length > 0) return;
	const email = adminEmail();
	const password = adminPassword();
	const name = "مدیر هیأت";
	let userId = (await sql`
    select id from "user" where email = ${email} limit 1
  `)[0]?.id;
	if (!userId) {
		const { auth } = await import("./server-lj9U9pTH.mjs").then((n) => n.l).then((n) => n.r);
		try {
			userId = (await auth.api.signUpEmail({ body: {
				email,
				password,
				name
			} }))?.user?.id;
		} catch (err) {
			console.error("[seed] admin sign-up failed, looking up existing user", err);
			userId = (await sql`
        select id from "user" where email = ${email} limit 1
      `)[0]?.id;
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
}
function ensureAdminSeed() {
	globalRef.__adminSeedPromise__ ??= seedAdminOnce().catch((err) => {
		globalRef.__adminSeedPromise__ = void 0;
		console.error("[seed] admin seed failed", err);
	});
	return globalRef.__adminSeedPromise__;
}
function getAdminLoginEmail() {
	return adminEmail();
}
function getAdminLoginUsername() {
	return adminUsername();
}
//#endregion
export { ensureAdminSeed, getAdminLoginEmail, getAdminLoginUsername };
