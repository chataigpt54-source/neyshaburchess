import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as formatFaDate, Q as listPublishedNews, h as Route$20 } from "./router-Cg9l_e87.mjs";
import { i as mediaUrl } from "./utils-Bj1GyghM.mjs";
import { n as PublicLayout, t as PageBand } from "./public-layout-CHys6LrO.mjs";
import { t as EmptyState } from "./empty-state-x6VxJp7W.mjs";
import { t as SearchBox } from "./search-box-CYu2pwC5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-Dbt0D4ss.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewsList() {
	const { settings, news } = Route$20.useLoaderData();
	const [q, setQ] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(news.page);
	const [items, setItems] = (0, import_react.useState)(news.items);
	const [total, setTotal] = (0, import_react.useState)(news.total);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function run(nextQ, nextPage) {
		setBusy(true);
		try {
			const res = await listPublishedNews({ data: {
				q: nextQ,
				page: nextPage
			} });
			setItems(res.items);
			setTotal(res.total);
			setPage(res.page);
		} finally {
			setBusy(false);
		}
	}
	const pages = Math.max(1, Math.ceil(total / 12));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, {
		settings,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBand, {
			title: "اخبار",
			subtitle: "آخرین رویدادها و اطلاعیه‌های هیأت شطرنج نیشابور"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-12 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {
					value: q,
					onChange: (v) => {
						setQ(v);
						run(v, 1);
					},
					placeholder: "جستجو در اخبار"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "هنوز خبری منتشر نشده است." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `grid gap-5 md:grid-cols-2 lg:grid-cols-3 ${busy ? "opacity-60" : ""}`,
						children: items.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[16/10] bg-navy/5",
								children: n.coverMediaId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: mediaUrl(n.coverMediaId) ?? "",
									alt: "",
									className: "size-full object-cover",
									loading: "lazy"
								}) : null
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: formatFaDate(n.publishedAt)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-1 text-lg font-semibold",
										children: n.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 line-clamp-3 text-sm leading-6 text-muted",
										children: n.summary
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/news/$slug",
										params: { slug: n.slug },
										className: "mt-4 inline-block text-sm text-turquoise-dark",
										children: "ادامه مطلب"
									})
								]
							})]
						}, n.id))
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
export { NewsList as component };
