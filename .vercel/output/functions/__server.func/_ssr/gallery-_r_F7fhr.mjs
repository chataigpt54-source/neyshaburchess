import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as formatFaDate, _ as Route$22, k as toFaDigits } from "./router-Cg9l_e87.mjs";
import { i as mediaUrl } from "./utils-Bj1GyghM.mjs";
import { n as PublicLayout, t as PageBand } from "./public-layout-CHys6LrO.mjs";
import { t as EmptyState } from "./empty-state-x6VxJp7W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-_r_F7fhr.js
var import_jsx_runtime = require_jsx_runtime();
function GalleryPage() {
	const { settings, albums } = Route$22.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, {
		settings,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBand, {
			title: "گالری",
			subtitle: "آلبوم تصویرهای هیأت شطرنج نیشابور"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-12 md:px-6",
			children: albums.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "هنوز گالری‌ای ایجاد نشده است." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: albums.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/gallery/$slug",
					params: { slug: a.slug },
					className: "group overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/3] bg-navy/5",
						children: a.coverMediaId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: mediaUrl(a.coverMediaId) ?? "",
							alt: "",
							className: "size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]",
							loading: "lazy"
						}) : null
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: a.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [a.albumDate ? formatFaDate(a.albumDate) : "", a.imageCount != null ? ` · ${toFaDigits(a.imageCount)} تصویر` : ""]
						})]
					})]
				}, a.id))
			})
		})]
	});
}
//#endregion
export { GalleryPage as component };
