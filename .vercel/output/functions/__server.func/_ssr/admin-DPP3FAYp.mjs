import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Route$28, k as toFaDigits } from "./router-Cg9l_e87.mjs";
import { _ as Images, d as Newspaper, i as UserPlus, n as Users, o as Trophy } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DPP3FAYp.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const stats = Route$28.useLoaderData();
	const cards = [
		{
			label: "اخبار",
			value: stats.news,
			to: "/admin/news",
			icon: Newspaper
		},
		{
			label: "بازیکنان",
			value: stats.players,
			to: "/admin/players",
			icon: Users
		},
		{
			label: "مسابقات",
			value: stats.tournaments,
			to: "/admin/tournaments",
			icon: Trophy
		},
		{
			label: "گالری‌ها",
			value: stats.albums,
			to: "/admin/gallery",
			icon: Images
		},
		{
			label: "ثبت‌نام‌ها",
			value: stats.registrations,
			to: "/admin/registrations",
			icon: UserPlus
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-6 text-xl font-semibold",
			children: "نمای کلی"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
			children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: c.to,
				className: "rounded-[var(--radius-lg)] border border-line bg-white p-5 shadow-card transition-transform hover:-translate-y-0.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "mb-3 size-5 text-turquoise" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: c.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-3xl font-semibold tabular-nums",
						children: toFaDigits(c.value)
					})
				]
			}, c.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
					to: "/admin/news",
					label: "افزودن خبر"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
					to: "/admin/players",
					label: "افزودن بازیکن"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
					to: "/admin/tournaments",
					label: "افزودن مسابقه"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quick, {
					to: "/admin/gallery",
					label: "افزودن گالری"
				})
			]
		})
	] });
}
function Quick({ to, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: "rounded-[var(--radius-md)] border border-dashed border-line bg-white px-4 py-3 text-sm hover:border-turquoise",
		children: label
	});
}
//#endregion
export { Dashboard as component };
