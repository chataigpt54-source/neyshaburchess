import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { K as adminSavePage, b as Route$25 } from "./router-Cg9l_e87.mjs";
import { t as Button } from "./button-CeZ5edYX.mjs";
import { i as Textarea, n as Input, r as Label } from "./input-Crt41rXZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pages-BR9MLb1A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPages() {
	const { about, contact } = Route$25.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-10 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageForm, {
			slug: "about",
			title: about?.title ?? "درباره هیأت",
			content: about?.content ?? ""
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageForm, {
			slug: "contact",
			title: contact?.title ?? "تماس با ما",
			content: contact?.content ?? ""
		})]
	});
}
function PageForm({ slug, title, content }) {
	const [t, setT] = (0, import_react.useState)(title);
	const [c, setC] = (0, import_react.useState)(content);
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 rounded-[var(--radius-lg)] border border-line bg-white p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				children: slug === "about" ? "درباره هیأت" : "تماس با ما"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "عنوان" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: t,
				onChange: (e) => setT(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "محتوا" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				className: "min-h-48",
				value: c,
				onChange: (e) => setC(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: busy,
				onClick: async () => {
					setBusy(true);
					try {
						await adminSavePage({ data: {
							slug,
							title: t,
							content: c
						} });
						toast.success("صفحه ذخیره شد.");
					} catch (e) {
						toast.error(e instanceof Error ? e.message : "ذخیره ناموفق بود.");
					} finally {
						setBusy(false);
					}
				},
				children: "ویرایش صفحه"
			})
		]
	});
}
//#endregion
export { AdminPages as component };
