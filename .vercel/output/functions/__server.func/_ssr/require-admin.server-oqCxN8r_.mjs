import { r as getSql } from "./db-B81SbFjo.mjs";
import { t as UnauthorizedError } from "./verify.server-BczJSy53.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/require-admin.server-oqCxN8r_.js
var ForbiddenError = class extends Error {
	status = 403;
	constructor() {
		super("Forbidden");
		this.name = "ForbiddenError";
	}
};
async function isAdminUser(userId) {
	return (await (await getSql())`
    select role from profiles where user_id = ${userId} limit 1
  `)[0]?.role === "admin";
}
async function requireAdmin(userId) {
	if (!userId) throw new UnauthorizedError();
	if (!await isAdminUser(userId)) throw new ForbiddenError();
}
//#endregion
export { requireAdmin as n, isAdminUser as t };
