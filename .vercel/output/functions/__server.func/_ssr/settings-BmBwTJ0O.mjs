import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { J as adminSaveSettings, v as Route$23 } from "./router-Cg9l_e87.mjs";
import { t as Button } from "./button-CeZ5edYX.mjs";
import { i as Textarea, n as Input, r as Label } from "./input-Crt41rXZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BmBwTJ0O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminSettings() {
	const initial = Route$23.useLoaderData();
	const [siteTitle, setTitle] = (0, import_react.useState)(initial?.siteTitle ?? "");
	const [description, setDesc] = (0, import_react.useState)(initial?.description ?? "");
	const [email, setEmail] = (0, import_react.useState)(initial?.email ?? "");
	const [phone, setPhone] = (0, import_react.useState)(initial?.phone ?? "");
	const [address, setAddress] = (0, import_react.useState)(initial?.address ?? "");
	const [instagramUrl, setIg] = (0, import_react.useState)(initial?.instagramUrl ?? "");
	const [eitaaUrl, setEitaa] = (0, import_react.useState)(initial?.eitaaUrl ?? "");
	const [telegramUrl, setTg] = (0, import_react.useState)(initial?.telegramUrl ?? "");
	const [tallySuggestionsUrl, setTally] = (0, import_react.useState)(initial?.tallySuggestionsUrl ?? "");
	const [mapEmbedUrl, setMap] = (0, import_react.useState)(initial?.mapEmbedUrl ?? "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold",
				children: "تنظیمات سایت"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "عنوان سایت",
				value: siteTitle,
				onChange: setTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "توضیحات" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: description,
				onChange: (e) => setDesc(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "ایمیل",
				value: email,
				onChange: setEmail
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "تلفن",
				value: phone,
				onChange: setPhone
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "آدرس" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: address,
				onChange: (e) => setAddress(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "اینستاگرام",
				value: instagramUrl,
				onChange: setIg,
				ltr: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "ایتا",
				value: eitaaUrl,
				onChange: setEitaa,
				ltr: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "تلگرام",
				value: telegramUrl,
				onChange: setTg,
				ltr: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "نشانی فرم پیشنهادات تالی",
				value: tallySuggestionsUrl,
				onChange: setTally,
				ltr: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "نشانی نقشه (Embed)",
				value: mapEmbedUrl,
				onChange: setMap,
				ltr: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "لوگوی رسمی از فایل ثابت سایت استفاده می‌شود و نباید تغییر شکل داده شود."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: busy,
				onClick: async () => {
					setBusy(true);
					try {
						await adminSaveSettings({ data: {
							siteTitle,
							description,
							email,
							phone,
							address,
							instagramUrl,
							eitaaUrl,
							telegramUrl,
							tallySuggestionsUrl,
							mapEmbedUrl
						} });
						toast.success("تنظیمات ذخیره شد.");
					} catch (e) {
						toast.error(e instanceof Error ? e.message : "ذخیره ناموفق بود.");
					} finally {
						setBusy(false);
					}
				},
				children: "ذخیره تنظیمات"
			})
		]
	});
}
function Field({ label, value, onChange, ltr }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		value,
		onChange: (e) => onChange(e.target.value),
		dir: ltr ? "ltr" : void 0
	})] });
}
//#endregion
export { AdminSettings as component };
