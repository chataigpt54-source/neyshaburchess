import { D as _enum, F as object, M as literal, P as number, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/validation-BS2fXfa3.js
var memberRegisterSchema = object({
	firstName: string().trim().min(2, "نام را وارد کنید."),
	lastName: string().trim().min(2, "نام خانوادگی را وارد کنید."),
	email: string().trim().email("ایمیل معتبر نیست."),
	phone: string().trim().min(1, "شماره تلفن را وارد کنید.").regex(/^0\d{10}$/, "شماره تلفن باید ۱۱ رقم و با صفر شروع شود."),
	password: string().min(8, "رمز عبور حداقل ۸ کاراکتر باشد."),
	confirmPassword: string().min(8, "تکرار رمز عبور را وارد کنید."),
	fideId: string().trim().optional()
}).refine((d) => d.password === d.confirmPassword, {
	message: "رمز عبور و تکرار آن یکسان نیست.",
	path: ["confirmPassword"]
});
var memberLoginSchema = object({
	email: string().trim().email("ایمیل معتبر نیست."),
	password: string().min(1, "رمز عبور را وارد کنید.")
});
var adminLoginSchema = object({
	username: string().trim().min(1, "نام کاربری را وارد کنید."),
	password: string().min(1, "رمز عبور را وارد کنید.")
});
var newsSchema = object({
	title: string().trim().min(2, "عنوان را وارد کنید."),
	slug: string().trim().optional(),
	summary: string().trim().max(500, "خلاصه حداکثر ۵۰۰ کاراکتر است.").optional(),
	content: string().optional(),
	coverMediaId: number().int().nullable().optional(),
	status: _enum(["draft", "published"]),
	publishedAt: string().optional()
});
var playerSchema = object({
	firstName: string().trim().min(1, "نام را وارد کنید."),
	lastName: string().trim().min(1, "نام خانوادگی را وارد کنید."),
	slug: string().trim().optional(),
	fideId: string().trim().optional(),
	bio: string().optional(),
	photoMediaId: number().int().nullable().optional(),
	achievements: array(object({
		title: string().trim().min(1, "عنوان افتخار را وارد کنید."),
		year: string().trim().optional(),
		description: string().optional()
	})).optional()
});
var tournamentSchema = object({
	title: string().trim().min(2, "عنوان را وارد کنید."),
	slug: string().trim().optional(),
	description: string().optional(),
	coverMediaId: number().int().nullable().optional(),
	startDate: string().nullable().optional(),
	endDate: string().nullable().optional(),
	location: string().optional(),
	status: _enum([
		"upcoming",
		"ongoing",
		"finished"
	]),
	tallyUrl: string().trim().url("نشانی فرم معتبر نیست.").optional().or(literal("")),
	chessResultsUrl: string().trim().url("نشانی نتایج معتبر نیست.").optional().or(literal("")),
	rulesMediaId: number().int().nullable().optional(),
	galleryId: number().int().nullable().optional(),
	sortOrder: number().int().optional()
});
var albumSchema = object({
	title: string().trim().min(2, "عنوان گالری را وارد کنید."),
	description: string().optional(),
	albumDate: string().nullable().optional(),
	coverMediaId: number().int().nullable().optional()
});
var settingsSchema = object({
	siteTitle: string().trim().min(2),
	description: string().optional(),
	email: string().trim().email("ایمیل معتبر نیست."),
	phone: string().optional(),
	address: string().trim().min(2, "آدرس را وارد کنید."),
	instagramUrl: string().optional(),
	eitaaUrl: string().optional(),
	telegramUrl: string().optional(),
	tallySuggestionsUrl: string().optional(),
	mapEmbedUrl: string().optional()
});
var pageSchema = object({
	slug: _enum(["about", "contact"]),
	title: string().trim().min(1),
	content: string().optional()
});
//#endregion
export { newsSchema as a, settingsSchema as c, memberRegisterSchema as i, tournamentSchema as l, albumSchema as n, pageSchema as o, memberLoginSchema as r, playerSchema as s, adminLoginSchema as t };
