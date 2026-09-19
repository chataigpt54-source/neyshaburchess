import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as mediaUrl } from "./utils-Bj1GyghM.mjs";
import { S as ChevronLeft, t as X, x as ChevronRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lightbox-CWttBcRz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Lightbox({ images, index, onClose, onIndex }) {
	const go = (0, import_react.useCallback)((dir) => {
		if (!images.length) return;
		onIndex((index + dir + images.length) % images.length);
	}, [
		images.length,
		index,
		onIndex
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft") go(1);
			if (e.key === "ArrowRight") go(-1);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [go, onClose]);
	const [touchX, setTouchX] = (0, import_react.useState)(null);
	const img = images[index];
	if (!img) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[80] flex flex-col bg-navy-deep/95 text-white",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "نمایش تصویر",
		onClick: onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-white/70",
					children: [
						index + 1,
						" / ",
						images.length
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-11 place-items-center rounded-full hover:bg-white/10",
					onClick: onClose,
					"aria-label": "بستن",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-1 items-center justify-center px-4",
				onClick: (e) => e.stopPropagation(),
				onTouchStart: (e) => setTouchX(e.changedTouches[0]?.clientX ?? null),
				onTouchEnd: (e) => {
					const x = e.changedTouches[0]?.clientX;
					if (touchX == null || x == null) return;
					const dx = x - touchX;
					if (dx > 40) go(-1);
					if (dx < -40) go(1);
					setTouchX(null);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute right-2 grid size-11 place-items-center rounded-full bg-white/10 md:right-6",
						onClick: () => go(-1),
						"aria-label": "قبلی",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: mediaUrl(img.mediaId) ?? "",
						alt: img.caption || "تصویر گالری",
						className: "max-h-[78vh] max-w-full object-contain"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute left-2 grid size-11 place-items-center rounded-full bg-white/10 md:left-6",
						onClick: () => go(1),
						"aria-label": "بعدی",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center gap-1.5 px-4 py-4",
				children: images.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `تصویر ${i + 1}`,
					className: `size-2 rounded-full ${i === index ? "bg-turquoise" : "bg-white/30"}`,
					onClick: (e) => {
						e.stopPropagation();
						onIndex(i);
					}
				}, i))
			})
		]
	});
}
//#endregion
export { Lightbox as t };
