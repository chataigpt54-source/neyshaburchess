import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { q as adminSavePlayer } from "./router-Cg9l_e87.mjs";
import { t as Button } from "./button-CeZ5edYX.mjs";
import { i as Textarea, n as Input, r as Label } from "./input-Crt41rXZ.mjs";
import { t as ImageUploader } from "./uploader-MNxtFenC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/player-editor-lneYHfS-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlayerEditor({ initial }) {
	const navigate = useNavigate();
	const [firstName, setFirst] = (0, import_react.useState)(initial?.firstName ?? "");
	const [lastName, setLast] = (0, import_react.useState)(initial?.lastName ?? "");
	const [fideId, setFide] = (0, import_react.useState)(initial?.fideId ?? "");
	const [bio, setBio] = (0, import_react.useState)(initial?.bio ?? "");
	const [photoMediaId, setPhoto] = (0, import_react.useState)(initial?.photoMediaId ?? null);
	const [achievements, setAchievements] = (0, import_react.useState)(initial?.achievements.map((a) => ({
		title: a.title,
		year: a.year ?? "",
		description: a.description
	})) ?? []);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function save() {
		if (!firstName.trim() || !lastName.trim()) {
			toast.error("نام و نام خانوادگی را وارد کنید.");
			return;
		}
		setBusy(true);
		try {
			await adminSavePlayer({ data: {
				id: initial?.id,
				firstName,
				lastName,
				fideId,
				bio,
				photoMediaId,
				achievements
			} });
			toast.success("بازیکن ذخیره شد.");
			await navigate({ to: "/admin/players" });
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
				children: initial ? "ویرایش بازیکن" : "افزودن بازیکن"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "نام" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: firstName,
					onChange: (e) => setFirst(e.target.value)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "نام خانوادگی" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: lastName,
					onChange: (e) => setLast(e.target.value)
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "آیدی فیده" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: fideId,
				onChange: (e) => setFide(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "بیوگرافی" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: bio,
				onChange: (e) => setBio(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
				value: photoMediaId,
				onChange: setPhoto,
				label: "عکس"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "افتخارات"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => setAchievements((a) => [...a, {
						title: "",
						year: "",
						description: ""
					}]),
					children: "افزودن افتخار"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: achievements.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-md)] border border-line p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mb-2",
							placeholder: "عنوان افتخار",
							value: a.title,
							onChange: (e) => {
								const next = [...achievements];
								next[i] = {
									...a,
									title: e.target.value
								};
								setAchievements(next);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mb-2",
							placeholder: "سال",
							value: a.year,
							onChange: (e) => {
								const next = [...achievements];
								next[i] = {
									...a,
									year: e.target.value
								};
								setAchievements(next);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							placeholder: "توضیح",
							value: a.description,
							onChange: (e) => {
								const next = [...achievements];
								next[i] = {
									...a,
									description: e.target.value
								};
								setAchievements(next);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							className: "mt-2",
							onClick: () => setAchievements(achievements.filter((_, j) => j !== i)),
							children: "حذف"
						})
					]
				}, i))
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
export { PlayerEditor as t };
