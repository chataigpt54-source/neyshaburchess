import { r as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { t as authMiddleware } from "./middleware-BO4Pigeq.mjs";
import { i as memberRegisterSchema } from "./validation-BS2fXfa3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/members-CAFPfs50.js
var completeMemberProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => memberRegisterSchema.pick({
	firstName: true,
	lastName: true,
	phone: true,
	fideId: true
}).parse(input)).handler(createSsrRpc("5dd0ba5c84cddbd6013004a76599be2c53118b5b38f84196a6aab2a1f76e6cc6"));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("ea64dcda73aa0596160a95a6de152c9d81118161cc1f67df4353222d4185230d"));
var checkIsAdmin = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b6b38e9ee8c2f4f628b35d0331cdad5550a96c4057a949439be269798bb9d49c"));
var prepareAdminLogin = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("fac33be751c9374daad5ae5430b026017718248ca2304a64fcfbe0566ef2c03c"));
var noteAdminLoginResult = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("cb42f757bf26f484868a7aab17250eb628add4667fff7bba91956ae46bb8efdf"));
var prepareMemberLogin = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("5aa2be124be8aac18c8a10a4c676582799238ec5be7f9676a520bde59940c406"));
var noteMemberLoginResult = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("50c51f4f87dd2a83e21b51e68b96e25bf6568c3dcb8d9d08766d30e3833f0aab"));
//#endregion
export { noteMemberLoginResult as a, noteAdminLoginResult as i, completeMemberProfile as n, prepareAdminLogin as o, getMyProfile as r, prepareMemberLogin as s, checkIsAdmin as t };
