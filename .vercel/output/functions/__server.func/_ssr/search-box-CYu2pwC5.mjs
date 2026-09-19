import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Input } from "./input-Crt41rXZ.mjs";
import { l as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-box-CYu2pwC5.js
var import_jsx_runtime = require_jsx_runtime();
function SearchBox({ value, onChange, placeholder = "جستجو…" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "relative block max-w-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: placeholder
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value,
				onChange: (e) => onChange(e.target.value),
				placeholder,
				className: "pr-10"
			})
		]
	});
}
//#endregion
export { SearchBox as t };
