import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { P as adminDeleteAlbum, k as toFaDigits, l as Route$14, z as adminListAlbums } from "./router-Cg9l_e87.mjs";
import { t as Button } from "./button-CeZ5edYX.mjs";
import { t as EmptyState } from "./empty-state-x6VxJp7W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-DFxGg4oY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminGallery() {
	const initial = Route$14.useLoaderData();
	const [items, setItems] = (0, import_react.useState)(initial);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl font-semibold",
			children: "گالری"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin/gallery/new",
			className: "inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-turquoise px-4 text-sm text-white",
			children: "افزودن گالری"
		})]
	}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "هنوز گالری‌ای ایجاد نشده است." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2",
		children: items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[var(--radius-lg)] border border-line bg-white p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold",
					children: a.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted",
					children: [toFaDigits(a.imageCount ?? 0), " تصویر"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/gallery/$id",
						params: { id: String(a.id) },
						className: "ml-3 text-sm text-turquoise-dark",
						children: "ویرایش"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: async () => {
							if (!confirm("این گالری حذف شود؟")) return;
							await adminDeleteAlbum({ data: a.id });
							toast.success("حذف شد.");
							setItems(await adminListAlbums());
						},
						children: "حذف"
					})]
				})
			]
		}, a.id))
	})] });
}
//#endregion
export { AdminGallery as component };
