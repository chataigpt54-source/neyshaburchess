import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { N as adminClearRulesPdf, Y as adminSaveTournament, z as adminListAlbums } from "./router-Cg9l_e87.mjs";
import { t as Button } from "./button-CeZ5edYX.mjs";
import { i as Textarea, n as Input, r as Label } from "./input-Crt41rXZ.mjs";
import { r as PdfUploader, t as ImageUploader } from "./uploader-MNxtFenC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tournament-editor-B00niZOD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TournamentEditor({ initial }) {
	const navigate = useNavigate();
	const [title, setTitle] = (0, import_react.useState)(initial?.title ?? "");
	const [description, setDescription] = (0, import_react.useState)(initial?.description ?? "");
	const [coverMediaId, setCover] = (0, import_react.useState)(initial?.coverMediaId ?? null);
	const [startDate, setStart] = (0, import_react.useState)(initial?.startDate ?? "");
	const [endDate, setEnd] = (0, import_react.useState)(initial?.endDate ?? "");
	const [location, setLocation] = (0, import_react.useState)(initial?.location ?? "");
	const [status, setStatus] = (0, import_react.useState)(initial?.status ?? "upcoming");
	const [tallyUrl, setTally] = (0, import_react.useState)(initial?.tallyUrl ?? "");
	const [chessResultsUrl, setResults] = (0, import_react.useState)(initial?.chessResultsUrl ?? "");
	const [rulesMediaId, setRules] = (0, import_react.useState)(initial?.rulesMediaId ?? null);
	const [galleryId, setGallery] = (0, import_react.useState)(initial?.galleryId ?? null);
	const [sortOrder, setSort] = (0, import_react.useState)(String(initial?.sortOrder ?? 0));
	const [albums, setAlbums] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		adminListAlbums().then(setAlbums).catch(() => void 0);
	}, []);
	async function save() {
		if (!title.trim()) {
			toast.error("عنوان را وارد کنید.");
			return;
		}
		setBusy(true);
		try {
			const saved = await adminSaveTournament({ data: {
				id: initial?.id,
				title,
				description,
				coverMediaId,
				startDate: startDate || null,
				endDate: endDate || null,
				location,
				status,
				tallyUrl,
				chessResultsUrl,
				rulesMediaId,
				galleryId,
				sortOrder: Number(sortOrder) || 0
			} });
			if (initial?.id && rulesMediaId == null && initial.rulesMediaId) await adminClearRulesPdf({ data: initial.id });
			toast.success("مسابقه ذخیره شد.");
			await navigate({ to: "/admin/tournaments" });
			return saved;
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "ذخیره ناموفق بود.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold",
				children: initial ? "ویرایش مسابقه" : "افزودن مسابقه"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "عنوان" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: title,
				onChange: (e) => setTitle(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "توضیحات" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: description,
				onChange: (e) => setDescription(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
				value: coverMediaId,
				onChange: setCover,
				label: "تصویر"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "تاریخ شروع" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "date",
					value: startDate ?? "",
					onChange: (e) => setStart(e.target.value)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "تاریخ پایان" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "date",
					value: endDate ?? "",
					onChange: (e) => setEnd(e.target.value)
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "محل برگزاری" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: location,
				onChange: (e) => setLocation(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "وضعیت" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: "h-11 w-full rounded-[var(--radius-sm)] border border-line bg-white px-3 text-sm",
				value: status,
				onChange: (e) => setStatus(e.target.value),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "upcoming",
						children: "آینده"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "ongoing",
						children: "در حال برگزاری"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "finished",
						children: "برگزارشده"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "نشانی فرم ثبت‌نام تالی" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: tallyUrl,
				onChange: (e) => setTally(e.target.value),
				placeholder: "https://tally.so/r/...",
				dir: "ltr"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "نشانی Chess Results" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: chessResultsUrl,
				onChange: (e) => setResults(e.target.value),
				dir: "ltr"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PdfUploader, {
				value: rulesMediaId,
				onChange: setRules
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "گالری مرتبط" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: "h-11 w-full rounded-[var(--radius-sm)] border border-line bg-white px-3 text-sm",
				value: galleryId ?? "",
				onChange: (e) => setGallery(e.target.value ? Number(e.target.value) : null),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "بدون گالری"
				}), albums.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: a.id,
					children: a.title
				}, a.id))]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ترتیب نمایش" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: sortOrder,
				onChange: (e) => setSort(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => void save(),
				disabled: busy,
				children: busy ? "در حال ذخیره…" : "ذخیره"
			})
		]
	});
}
//#endregion
export { TournamentEditor as t };
