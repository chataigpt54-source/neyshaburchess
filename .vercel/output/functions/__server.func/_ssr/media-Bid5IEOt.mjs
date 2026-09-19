import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as deleteMedia, E as formatBytes, j as listMedia, x as Route$26 } from "./router-Cg9l_e87.mjs";
import { i as mediaUrl } from "./utils-Bj1GyghM.mjs";
import { t as Button } from "./button-CeZ5edYX.mjs";
import { t as EmptyState } from "./empty-state-x6VxJp7W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-Bid5IEOt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminMedia() {
	const initial = Route$26.useLoaderData();
	const [data, setData] = (0, import_react.useState)(initial);
	async function refresh() {
		setData(await listMedia({ data: { page: data.page } }));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mb-6 text-xl font-semibold",
		children: "رسانه‌ها"
	}), data.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "رسانه‌ای بارگذاری نشده است." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
		children: data.items.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-[var(--radius-md)] border border-line bg-white",
			children: [m.kind === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: mediaUrl(m.id) ?? "",
				alt: "",
				className: "aspect-square w-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid aspect-square place-items-center bg-paper text-sm",
				children: "PDF"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-3 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate",
						children: m.filename
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: formatBytes(m.sizeBytes)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						className: "mt-1",
						onClick: async () => {
							if (!confirm("حذف شود؟")) return;
							await deleteMedia({ data: m.id });
							toast.success("حذف شد.");
							refresh();
						},
						children: "حذف"
					})
				]
			})]
		}, m.id))
	})] });
}
//#endregion
export { AdminMedia as component };
