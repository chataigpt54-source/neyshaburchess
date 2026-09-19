import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { I as adminDeletePlayer, O as playerFullName, V as adminListPlayers, a as Route$8 } from "./router-Cg9l_e87.mjs";
import { t as Button } from "./button-CeZ5edYX.mjs";
import { t as EmptyState } from "./empty-state-x6VxJp7W.mjs";
import { t as SearchBox } from "./search-box-CYu2pwC5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/players-CYjMjLzb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPlayers() {
	const initial = Route$8.useLoaderData();
	const [items, setItems] = (0, import_react.useState)(initial);
	const [q, setQ] = (0, import_react.useState)("");
	async function refresh(next = q) {
		setItems(await adminListPlayers({ data: next }));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold",
				children: "بازیکنان"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/players/new",
				className: "inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-turquoise px-4 text-sm text-white",
				children: "افزودن بازیکن"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {
			value: q,
			onChange: (v) => {
				setQ(v);
				refresh(v);
			},
			placeholder: "جستجو در بازیکنان"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 overflow-x-auto rounded-[var(--radius-lg)] border border-line bg-white",
			children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "هنوز بازیکنی ثبت نشده است.",
				className: "border-0 shadow-none"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[560px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-paper text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3 text-right font-medium",
							children: "نام"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3 text-right font-medium",
							children: "آیدی فیده"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: playerFullName(p.firstName, p.lastName)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: p.fideId || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "p-3 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/players/$id",
								params: { id: String(p.id) },
								className: "ml-3 text-turquoise-dark",
								children: "ویرایش"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: async () => {
									if (!confirm("این بازیکن حذف شود؟")) return;
									await adminDeletePlayer({ data: p.id });
									toast.success("حذف شد.");
									refresh();
								},
								children: "حذف"
							})]
						})
					]
				}, p.id)) })]
			})
		})
	] });
}
//#endregion
export { AdminPlayers as component };
