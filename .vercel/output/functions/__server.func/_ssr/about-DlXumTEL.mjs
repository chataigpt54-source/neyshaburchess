import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as SITE_NAME } from "./constants-B4oS1R5Q.mjs";
import { w as Route$36 } from "./router-Cg9l_e87.mjs";
import { n as PublicLayout, t as PageBand } from "./public-layout-CHys6LrO.mjs";
import { t as EmptyState } from "./empty-state-x6VxJp7W.mjs";
import { t as renderRichText } from "./sanitize-D7X0UZXw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DlXumTEL.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	const { settings, page } = Route$36.useLoaderData();
	const content = page?.content?.trim() ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, {
		settings,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBand, { title: page?.title || "درباره هیأت" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-4 py-12 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10 overflow-hidden rounded-[var(--radius-xl)] border border-line bg-navy p-10 text-center text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/logo.png",
					alt: "",
					className: "mx-auto size-28 rounded-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: SITE_NAME
				})]
			}), content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prose-fa",
				dangerouslySetInnerHTML: { __html: renderRichText(content) }
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "این صفحه هنوز تکمیل نشده است.",
				description: "محتوای معرفی هیأت از پنل مدیریت قابل ویرایش است."
			})]
		})]
	});
}
//#endregion
export { AboutPage as component };
