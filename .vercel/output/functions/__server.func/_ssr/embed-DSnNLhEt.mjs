import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/embed-DSnNLhEt.js
var import_jsx_runtime = require_jsx_runtime();
function TallyEmbed({ url, title }) {
	const src = toEmbed(url);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			src,
			title,
			className: "min-h-[28rem] w-full",
			loading: "lazy"
		})
	});
}
function toEmbed(url) {
	try {
		const u = new URL(url);
		if (u.hostname.includes("tally.so") && !u.pathname.includes("/embed/")) {
			const id = u.pathname.split("/").filter(Boolean).pop();
			if (id) return `https://tally.so/embed/${id}?alignLeft=1&hideTitle=1&transparentBackground=1`;
		}
		return url;
	} catch {
		return url;
	}
}
//#endregion
export { TallyEmbed as t };
