import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as IMAGE_MIMES, i as IMAGE_EXTS } from "./constants-B4oS1R5Q.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as uploadMedia } from "./router-Cg9l_e87.mjs";
import { i as mediaUrl } from "./utils-Bj1GyghM.mjs";
import { t as Button } from "./button-CeZ5edYX.mjs";
import { a as Upload, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/uploader-MNxtFenC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function readAsDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});
}
function ImageUploader({ value, onChange, multiple = false, label = "آپلود تصویر" }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const onFiles = (0, import_react.useCallback)(async (files) => {
		if (!files?.length) return;
		setBusy(true);
		try {
			const file = files[0];
			if (!IMAGE_MIMES.includes(file.type)) {
				toast.error("فقط تصویرهای JPG، PNG و WEBP پذیرفته می‌شوند.");
				return;
			}
			if (file.size > 5242880) {
				toast.error("حجم تصویر بیش از ۵ مگابایت است.");
				return;
			}
			const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
			if (!IMAGE_EXTS.includes(ext)) {
				toast.error("پسوند فایل نامعتبر است.");
				return;
			}
			const dataBase64 = await readAsDataUrl(file);
			onChange((await uploadMedia({ data: {
				filename: file.name,
				mimeType: file.type,
				dataBase64,
				kind: "image"
			} })).id);
			toast.success("تصویر بارگذاری شد.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "بارگذاری ناموفق بود.");
		} finally {
			setBusy(false);
		}
	}, [onChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-sm font-medium",
			children: label
		}),
		value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mb-3 overflow-hidden rounded-[var(--radius-md)] border border-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: mediaUrl(value) ?? "",
				alt: "",
				className: "h-40 w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-navy/80 text-white",
				onClick: () => onChange(null),
				"aria-label": "حذف تصویر",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-md)] border border-dashed border-line bg-paper px-4 py-6 text-sm text-muted hover:border-turquoise",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }),
				busy ? "در حال بارگذاری…" : "انتخاب فایل",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					accept: "image/jpeg,image/png,image/webp",
					className: "sr-only",
					multiple,
					disabled: busy,
					onChange: (e) => void onFiles(e.target.files)
				})
			]
		})
	] });
}
function MultiImageUploader({ ids, onChange, coverId, onCover }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [dragFrom, setDragFrom] = (0, import_react.useState)(null);
	async function addFiles(files) {
		if (!files?.length) return;
		setBusy(true);
		try {
			const next = [...ids];
			for (const file of Array.from(files)) {
				if (!IMAGE_MIMES.includes(file.type)) continue;
				if (file.size > 5242880) continue;
				const dataBase64 = await readAsDataUrl(file);
				const saved = await uploadMedia({ data: {
					filename: file.name,
					mimeType: file.type,
					dataBase64,
					kind: "image"
				} });
				next.push(saved.id);
			}
			onChange(next);
			if (!coverId && next[0]) onCover?.(next[0]);
			toast.success("تصویرها بارگذاری شدند.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "بارگذاری ناموفق بود.");
		} finally {
			setBusy(false);
		}
	}
	function reorder(from, to) {
		if (from === to) return;
		const next = [...ids];
		const [moved] = next.splice(from, 1);
		next.splice(to, 0, moved);
		onChange(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mb-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] border border-dashed border-line bg-paper px-4 py-10 text-sm text-muted hover:border-turquoise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-5" }),
			busy ? "در حال بارگذاری…" : "کشیدن و رها کردن یا انتخاب چند تصویر",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				accept: "image/jpeg,image/png,image/webp",
				multiple: true,
				className: "sr-only",
				disabled: busy,
				onChange: (e) => void addFiles(e.target.files)
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4",
		children: ids.map((id, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			draggable: true,
			onDragStart: () => setDragFrom(index),
			onDragOver: (e) => e.preventDefault(),
			onDrop: () => {
				if (dragFrom != null) reorder(dragFrom, index);
				setDragFrom(null);
			},
			className: "relative overflow-hidden rounded-[var(--radius-md)] border border-line bg-white",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: mediaUrl(id) ?? "",
				alt: "",
				className: "aspect-square w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 flex items-center justify-between bg-navy/70 p-1.5 text-[10px] text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onCover?.(id),
					children: coverId === id ? "جلد" : "تنظیم جلد"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange(ids.filter((x) => x !== id)),
					children: "حذف"
				})]
			})]
		}, id))
	})] });
}
function PdfUploader({ value, onChange }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-sm font-medium",
			children: "آیین‌نامه مسابقات (PDF)"
		}),
		value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between rounded-[var(--radius-sm)] border border-line bg-paper px-3 py-2 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: mediaUrl(value) ?? "#",
				className: "text-turquoise-dark",
				target: "_blank",
				rel: "noopener noreferrer",
				children: "مشاهده فایل فعلی"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => onChange(null),
				children: "حذف"
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-md)] border border-dashed border-line px-4 py-6 text-sm text-muted hover:border-turquoise",
			children: [busy ? "در حال بارگذاری…" : "آپلود PDF", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				accept: "application/pdf,.pdf",
				className: "sr-only",
				disabled: busy,
				onChange: async (e) => {
					const file = e.target.files?.[0];
					if (!file) return;
					if (file.type !== "application/pdf" || !file.name.toLowerCase().endsWith(".pdf")) {
						toast.error("فقط فایل PDF پذیرفته می‌شود.");
						return;
					}
					if (file.size > 10485760) {
						toast.error("حجم فایل بیش از ۱۰ مگابایت است.");
						return;
					}
					setBusy(true);
					try {
						const dataBase64 = await readAsDataUrl(file);
						onChange((await uploadMedia({ data: {
							filename: file.name,
							mimeType: file.type,
							dataBase64,
							kind: "pdf"
						} })).id);
						toast.success("آیین‌نامه بارگذاری شد.");
					} catch (err) {
						toast.error(err instanceof Error ? err.message : "بارگذاری ناموفق بود.");
					} finally {
						setBusy(false);
					}
				}
			})]
		})
	] });
}
//#endregion
export { MultiImageUploader as n, PdfUploader as r, ImageUploader as t };
