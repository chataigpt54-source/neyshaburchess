import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as cn } from "./utils-Bj1GyghM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-Crt41rXZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = (0, import_react.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	ref,
	className: cn("flex h-11 w-full rounded-[var(--radius-sm)] border border-line bg-white px-3 text-sm text-navy placeholder:text-muted transition-shadow focus-visible:ring-2 focus-visible:ring-turquoise/60 disabled:opacity-60", className),
	...props
}));
Input.displayName = "Input";
var Textarea = (0, import_react.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("flex min-h-32 w-full rounded-[var(--radius-md)] border border-line bg-white px-3 py-2.5 text-sm text-navy placeholder:text-muted transition-shadow focus-visible:ring-2 focus-visible:ring-turquoise/60 disabled:opacity-60", className),
	...props
}));
Textarea.displayName = "Textarea";
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("mb-1.5 block text-sm font-medium text-navy", className),
		...props
	});
}
function FieldError({ children }) {
	if (!children) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-xs text-danger",
		children
	});
}
//#endregion
export { Textarea as i, Input as n, Label as r, FieldError as t };
