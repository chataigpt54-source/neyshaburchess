import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as STATUS_LABELS } from "./constants-B4oS1R5Q.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as adminListNews, D as formatFaDate, F as adminDeleteNews, s as Route$11 } from "./router-Cg9l_e87.mjs";
import { t as Button } from "./button-CeZ5edYX.mjs";
import { t as EmptyState } from "./empty-state-x6VxJp7W.mjs";
import { t as Badge } from "./card-D-fweHyk.mjs";
import { t as SearchBox } from "./search-box-CYu2pwC5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-BA2U4sPI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminNews() {
	const initial = Route$11.useLoaderData();
	const [items, setItems] = (0, import_react.useState)(initial);
	const [q, setQ] = (0, import_react.useState)("");
	async function refresh(next = q) {
		setItems(await adminListNews({ data: next }));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold",
				children: "اخبار"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/news/new",
				className: "inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-turquoise px-4 text-sm text-white",
				children: "افزودن خبر"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {
			value: q,
			onChange: (v) => {
				setQ(v);
				refresh(v);
			},
			placeholder: "جستجو در اخبار"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 overflow-x-auto rounded-[var(--radius-lg)] border border-line bg-white",
			children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "هنوز خبری ثبت نشده است.",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3 text-right font-medium",
							children: "تاریخ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: n.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: n.status === "published" ? "ok" : "muted",
								children: STATUS_LABELS[n.status]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: formatFaDate(n.publishedAt || n.createdAt)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "p-3 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/news/$id",
								params: { id: String(n.id) },
								className: "ml-3 text-turquoise-dark",
								children: "ویرایش"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: async () => {
									if (!confirm("این خبر حذف شود؟")) return;
									await adminDeleteNews({ data: n.id });
									toast.success("حذف شد.");
									refresh();
								},
								children: "حذف"
							})]
						})
					]
				}, n.id)) })]
			})
		})
	] });
}
//#endregion
export { AdminNews as component };
