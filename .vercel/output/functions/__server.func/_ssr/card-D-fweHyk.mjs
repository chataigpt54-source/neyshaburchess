import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as cn } from "./utils-Bj1GyghM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-D-fweHyk.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "navy", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
			navy: "bg-navy text-white",
			turquoise: "bg-turquoise/12 text-turquoise-dark",
			gold: "bg-gold/15 text-navy",
			muted: "bg-paper text-muted",
			ok: "bg-ok/10 text-ok"
		}[tone], className),
		...props
	});
}
//#endregion
export { Badge as t };
