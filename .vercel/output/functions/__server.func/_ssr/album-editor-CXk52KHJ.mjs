import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { W as adminSaveAlbum } from "./router-Cg9l_e87.mjs";
import { t as Button } from "./button-CeZ5edYX.mjs";
import { i as Textarea, n as Input, r as Label } from "./input-Crt41rXZ.mjs";
import { n as MultiImageUploader } from "./uploader-MNxtFenC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/album-editor-CXk52KHJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AlbumEditor({ initial }) {
	const navigate = useNavigate();
	const [title, setTitle] = (0, import_react.useState)(initial?.title ?? "");
	const [description, setDescription] = (0, import_react.useState)(initial?.description ?? "");
	const [albumDate, setDate] = (0, import_react.useState)(initial?.albumDate ?? "");
	const [coverMediaId, setCover] = (0, import_react.useState)(initial?.coverMediaId ?? null);
	const [imageIds, setIds] = (0, import_react.useState)(initial?.images.map((i) => i.mediaId) ?? []);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function save() {
		if (!title.trim()) {
			toast.error("عنوان گالری را وارد کنید.");
			return;
		}
		setBusy(true);
		try {
			await adminSaveAlbum({ data: {
				id: initial?.id,
				title,
				description,
				albumDate: albumDate || null,
				coverMediaId,
				imageIds
			} });
			toast.success("گالری ذخیره شد.");
			await navigate({ to: "/admin/gallery" });
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
				children: initial ? "ویرایش گالری" : "افزودن گالری"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "عنوان گالری" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: title,
				onChange: (e) => setTitle(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "توضیحات" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: description,
				onChange: (e) => setDescription(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "تاریخ" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "date",
				value: albumDate ?? "",
				onChange: (e) => setDate(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiImageUploader, {
				ids: imageIds,
				onChange: setIds,
				coverId: coverMediaId,
				onCover: setCover
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => void save(),
				disabled: busy,
				children: busy ? "در حال ذخیره…" : "ذخیره"
			})
		]
	});
}
//#endregion
export { AlbumEditor as t };
