import { C as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { D as formatFaDate, m as Route$19 } from "./_ssr/router-Cg9l_e87.mjs";
import { i as mediaUrl } from "./_ssr/utils-Bj1GyghM.mjs";
import { n as PublicLayout, t as PageBand } from "./_ssr/public-layout-CHys6LrO.mjs";
import { t as renderRichText } from "./_ssr/sanitize-D7X0UZXw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CCkEK9LL.js
var import_jsx_runtime = require_jsx_runtime();
function NewsDetail() {
	const { settings, item } = Route$19.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, {
		settings,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBand, {
			title: item.title,
			subtitle: formatFaDate(item.publishedAt)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mx-auto max-w-3xl px-4 py-12 md:px-6",
			children: [
				item.coverMediaId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: mediaUrl(item.coverMediaId) ?? "",
					alt: "",
					className: "mb-8 w-full rounded-[var(--radius-lg)] object-cover"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "prose-fa",
					dangerouslySetInnerHTML: { __html: renderRichText(item.content || item.summary) }
				}),
				item.imageIds.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-4 sm:grid-cols-2",
					children: item.imageIds.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: mediaUrl(id) ?? "",
						alt: "",
						className: "rounded-[var(--radius-md)] object-cover",
						loading: "lazy"
					}, id))
				}) : null
			]
		})]
	});
}
//#endregion
export { NewsDetail as component };
