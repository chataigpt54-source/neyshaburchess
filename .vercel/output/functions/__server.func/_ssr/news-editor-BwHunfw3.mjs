import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { G as adminSaveNews } from "./router-Cg9l_e87.mjs";
import { t as Button } from "./button-CeZ5edYX.mjs";
import { i as Textarea, n as Input, r as Label } from "./input-Crt41rXZ.mjs";
import { n as MultiImageUploader, t as ImageUploader } from "./uploader-MNxtFenC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-editor-BwHunfw3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewsEditor({ initial }) {
	const navigate = useNavigate();
	const [title, setTitle] = (0, import_react.useState)(initial?.title ?? "");
	const [summary, setSummary] = (0, import_react.useState)(initial?.summary ?? "");
	const [content, setContent] = (0, import_react.useState)(initial?.content ?? "");
	const [coverMediaId, setCover] = (0, import_react.useState)(initial?.coverMediaId ?? null);
	const [imageIds, setImageIds] = (0, import_react.useState)(initial?.imageIds ?? []);
	const [status, setStatus] = (0, import_react.useState)(initial?.status ?? "draft");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function save() {
		if (!title.trim()) {
			toast.error("عنوان را وارد کنید.");
			return;
		}
		setBusy(true);
		try {
			await adminSaveNews({ data: {
				id: initial?.id,
				title,
				summary,
				content,
				coverMediaId,
				status,
				imageIds
			} });
			toast.success("خبر ذخیره شد.");
			await navigate({ to: "/admin/news" });
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "ذخیره ناموفق بود.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold",
				children: initial ? "ویرایش خبر" : "افزودن خبر"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "عنوان" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: title,
				onChange: (e) => setTitle(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "خلاصه" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: summary,
				onChange: (e) => setSummary(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "متن کامل" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "min-h-48",
					value: content,
					onChange: (e) => setContent(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "از مارک‌داون ساده مانند **پررنگ** و لینک [متن](https://...) می‌توانید استفاده کنید."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
				value: coverMediaId,
				onChange: setCover,
				label: "تصویر اصلی"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-sm font-medium",
				children: "تصاویر بیشتر"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiImageUploader, {
				ids: imageIds,
				onChange: setImageIds
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "وضعیت" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: "h-11 w-full rounded-[var(--radius-sm)] border border-line bg-white px-3 text-sm",
				value: status,
				onChange: (e) => setStatus(e.target.value),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "draft",
					children: "پیش‌نویس"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "published",
					children: "انتشار"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => void save(),
				disabled: busy,
				children: busy ? "در حال ذخیره…" : "ذخیره"
			})
		]
	});
}
//#endregion
export { NewsEditor as t };
