import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./utils-Bj1GyghM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-CeZ5edYX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] text-sm font-medium transition-[transform,background-color,box-shadow,opacity] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise/70 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-turquoise text-white shadow-card hover:bg-turquoise-dark",
			navy: "bg-navy text-white hover:bg-navy-mid",
			outline: "border border-line bg-white text-navy hover:border-turquoise hover:text-turquoise-dark",
			ghost: "text-navy hover:bg-navy/5",
			gold: "bg-navy text-gold border border-gold/40 hover:border-gold",
			light: "bg-white/10 text-white border border-white/15 hover:bg-white/16",
			danger: "bg-danger text-white hover:opacity-90"
		},
		size: {
			default: "h-11 px-5",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-6 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = (0, import_react.forwardRef)(({ className, variant, size, type = "button", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	type,
	className: cn(buttonVariants({
		variant,
		size
	}), className),
	...props
}));
Button.displayName = "Button";
//#endregion
export { Button as t };
