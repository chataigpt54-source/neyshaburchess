import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loading-DMY5oTQq.js
var import_jsx_runtime = require_jsx_runtime();
function PageLoader({ label = "در حال بارگذاری…" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[50vh] flex-col items-center justify-center gap-4 text-navy",
		role: "status",
		"aria-live": "polite",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-10 animate-spin rounded-full border-2 border-line border-t-turquoise" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: label
		})]
	});
}
//#endregion
export { PageLoader as t };
