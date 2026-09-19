import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as SITE_NAME } from "./constants-B4oS1R5Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-shell-DkXiGNms.js
var import_jsx_runtime = require_jsx_runtime();
function AuthShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-4 py-12 chess-board-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "navy-veil geo-lattice absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md rounded-[var(--radius-xl)] glass-card px-6 py-8 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-col items-center text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/logo.png",
					alt: "",
					className: "size-20 rounded-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-white/70",
					children: SITE_NAME
				})]
			}), children]
		})]
	});
}
//#endregion
export { AuthShell as t };
