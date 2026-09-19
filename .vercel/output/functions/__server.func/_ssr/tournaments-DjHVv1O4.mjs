import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as STATUS_LABELS } from "./constants-B4oS1R5Q.mjs";
import { D as formatFaDate, d as Route$16 } from "./router-Cg9l_e87.mjs";
import { i as mediaUrl } from "./utils-Bj1GyghM.mjs";
import { n as PublicLayout, t as PageBand } from "./public-layout-CHys6LrO.mjs";
import { t as EmptyState } from "./empty-state-x6VxJp7W.mjs";
import { t as Badge } from "./card-D-fweHyk.mjs";
import { t as SearchBox } from "./search-box-CYu2pwC5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tournaments-DjHVv1O4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GROUPS = [
	{
		key: "upcoming",
		title: "مسابقات آینده"
	},
	{
		key: "ongoing",
		title: "مسابقات در حال برگزاری"
	},
	{
		key: "finished",
		title: "مسابقات برگزارشده"
	}
];
function TournamentsPage() {
	const { settings, tournaments } = Route$16.useLoaderData();
	const [q, setQ] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => {
		const s = q.trim();
		if (!s) return tournaments;
		return tournaments.filter((t) => t.title.includes(s));
	}, [q, tournaments]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, {
		settings,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBand, {
			title: "مسابقات",
			subtitle: "جام قهرمانان و رویدادهای شطرنج شهرستان نیشابور"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-12 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {
				value: q,
				onChange: setQ,
				placeholder: "جستجو در مسابقات"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 space-y-14",
				children: GROUPS.map((g) => {
					const items = filtered.filter((t) => t.status === g.key);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-5 text-2xl font-semibold",
						children: g.title
					}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "در حال حاضر مسابقه‌ای برای نمایش وجود ندارد." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3",
						children: items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/tournaments/$slug",
							params: { slug: t.slug },
							className: "overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-card transition-transform hover:-translate-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[16/10] bg-navy",
								children: [t.coverMediaId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: mediaUrl(t.coverMediaId) ?? "",
									alt: "",
									className: "size-full object-cover",
									loading: "lazy"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "geo-lattice size-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "absolute right-3 top-3",
									tone: "gold",
									children: STATUS_LABELS[t.status]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold leading-6",
										children: t.title
									}),
									t.startDate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted",
										children: formatFaDate(t.startDate)
									}) : null,
									t.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted",
										children: t.location
									}) : null
								]
							})]
						}, t.id))
					})] }, g.key);
				})
			})]
		})]
	});
}
//#endregion
export { TournamentsPage as component };
