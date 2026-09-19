import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-Bj1GyghM.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function mediaUrl(id) {
	if (!id) return null;
	return `/api/media/${id}`;
}
function externalRel() {
	return {
		target: "_blank",
		rel: "noopener noreferrer"
	};
}
function clampFileName(name, max = 120) {
	const trimmed = name.trim() || "file";
	return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}
function telHref(phone) {
	const digits = phone.replace(/\D/g, "");
	if (digits.startsWith("0")) return `tel:+98${digits.slice(1)}`;
	if (digits.startsWith("98")) return `tel:+${digits}`;
	return `tel:${digits}`;
}
//#endregion
export { telHref as a, mediaUrl as i, cn as n, externalRel as r, clampFileName as t };
