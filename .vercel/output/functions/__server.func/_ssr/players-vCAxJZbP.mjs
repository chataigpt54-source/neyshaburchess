import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as playerFullName, Z as listPlayers, p as Route$18 } from "./router-Cg9l_e87.mjs";
import { i as mediaUrl } from "./utils-Bj1GyghM.mjs";
import { n as PublicLayout, t as PageBand } from "./public-layout-CHys6LrO.mjs";
import { t as EmptyState } from "./empty-state-x6VxJp7W.mjs";
import { t as SearchBox } from "./search-box-CYu2pwC5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/players-vCAxJZbP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlayersPage() {
	const { settings, players } = Route$18.useLoaderData();
	const [q, setQ] = (0, import_react.useState)("");
	const [items, setItems] = (0, import_react.useState)(players.items);
	const [total, setTotal] = (0, import_react.useState)(players.total);
	const [page, setPage] = (0, import_react.useState)(1);
	async function run(nextQ, nextPage) {
		const res = await listPlayers({ data: {
			q: nextQ,
			page: nextPage
		} });
		setItems(res.items);
		setTotal(res.total);
		setPage(res.page);
	}
	const pages = Math.max(1, Math.ceil(total / 12));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, {
		settings,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBand, {
			title: "بازیکنان",
			subtitle: "معرفی شطرنج‌بازان هیأت نیشابور"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-12 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {
					value: q,
					placeholder: "جستجو بر اساس نام یا آیدی فیده",
					onChange: (v) => {
						setQ(v);
						run(v, 1);
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "هنوز بازیکنی به این بخش اضافه نشده است." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
						children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/players/$slug",
							params: { slug: p.slug },
							className: "overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white text-center shadow-card transition-transform hover:-translate-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-square bg-navy/5",
								children: p.photoMediaId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: mediaUrl(p.photoMediaId) ?? "",
									alt: playerFullName(p.firstName, p.lastName),
									className: "size-full object-cover",
									loading: "lazy"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-full place-items-center text-4xl font-semibold text-navy/20",
									children: p.firstName[0]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-semibold",
									children: playerFullName(p.firstName, p.lastName)
								}), p.fideId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted",
									children: ["آیدی فیده: ", p.fideId]
								}) : null]
							})]
						}, p.id))
					})
				}),
				pages > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex justify-center gap-2",
					children: Array.from({ length: pages }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `size-10 rounded-full text-sm ${page === i + 1 ? "bg-navy text-white" : "border border-line"}`,
						onClick: () => void run(q, i + 1),
						children: i + 1
					}, i))
				}) : null
			]
		})]
	});
}
//#endregion
export { PlayersPage as component };
