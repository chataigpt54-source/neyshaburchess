import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as STATUS_LABELS } from "./constants-B4oS1R5Q.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { R as adminDeleteTournament, U as adminListTournaments, r as Route$5 } from "./router-Cg9l_e87.mjs";
import { t as Button } from "./button-CeZ5edYX.mjs";
import { t as EmptyState } from "./empty-state-x6VxJp7W.mjs";
import { t as Badge } from "./card-D-fweHyk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tournaments-DM0wpfgr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminTournaments() {
	const initial = Route$5.useLoaderData();
	const [items, setItems] = (0, import_react.useState)(initial);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl font-semibold",
			children: "مسابقات"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin/tournaments/new",
			className: "inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-turquoise px-4 text-sm text-white",
			children: "افزودن مسابقه"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-[var(--radius-lg)] border border-line bg-white",
		children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "مسابقه‌ای ثبت نشده است.",
			className: "border-0 shadow-none"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[640px] text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-paper text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 text-right font-medium",
						children: "عنوان"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 text-right font-medium",
						children: "وضعیت"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t border-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-3",
						children: t.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: STATUS_LABELS[t.status] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "p-3 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/tournaments/$id",
							params: { id: String(t.id) },
							className: "ml-3 text-turquoise-dark",
							children: "ویرایش"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: async () => {
								if (!confirm("این مسابقه حذف شود؟")) return;
								await adminDeleteTournament({ data: t.id });
								toast.success("حذف شد.");
								setItems(await adminListTournaments());
							},
							children: "حذف"
						})]
					})
				]
			}, t.id)) })]
		})
	})] });
}
//#endregion
export { AdminTournaments as component };
